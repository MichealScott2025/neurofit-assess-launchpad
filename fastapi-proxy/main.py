from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import urllib.request
import json
import logging
import traceback

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("minimal-proxy")

# Create FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    logger.info("Health check endpoint called")
    return {"status": "ok"}

@app.post("/api/chat")
async def chat(request: Request):
    logger.info("Chat endpoint called")
    try:
        # Parse request body
        body = await request.json()
        logger.info(f"Received request body: {json.dumps(body)}")
        
        # Check if request is in ChatCompletion format
        if "messages" in body:
            logger.info("Request is in ChatCompletion format")
            
            # Extract the last message from the messages array
            user_message = body["messages"][-1]["content"] if body["messages"] else ""
            model = body.get("model", "mistral:latest")
            
            # Create payload for Ollama's generate endpoint
            ollama_payload = {
                "model": model,
                "prompt": user_message,
                "stream": False
            }
            
            logger.info(f"Converted payload for Ollama: {json.dumps(ollama_payload)}")
        else:
            # Just use the request body as is
            logger.info("Request is not in ChatCompletion format, using as is")
            ollama_payload = body
        
        # Make request to Ollama
        logger.info("Sending request to Ollama generate endpoint")
        req = urllib.request.Request(
            "http://host.docker.internal:11434/api/generate",
            data=json.dumps(ollama_payload).encode('utf-8'),
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        
        try:
            with urllib.request.urlopen(req, timeout=60) as response:
                logger.info(f"Received response from Ollama with status: {response.status}")
                response_data = response.read().decode('utf-8')
                logger.info(f"Raw response data: {response_data[:200]}...")
                
                try:
                    # Parse JSON response
                    result = json.loads(response_data)
                    logger.info(f"Parsed result: {json.dumps(result)[:200]}...")
                    
                    # Format the response for the frontend
                    if "response" in result:
                        # Already in the expected format
                        logger.info("Response already in expected format with 'response' field")
                        return JSONResponse(content=result)
                    else:
                        # Need to convert to expected format
                        response_text = ""
                        
                        if "message" in result and isinstance(result["message"], dict):
                            response_text = result["message"].get("content", "")
                        else:
                            # Try other possible fields
                            for field in ["text", "content", "completion", "output"]:
                                if field in result:
                                    response_text = result[field]
                                    break
                        
                        # If still no text found, use a default message
                        if not response_text:
                            logger.warning("No response text found in Ollama response")
                            response_text = "I received your message but couldn't generate a proper response."
                        
                        # Return in the format expected by the frontend
                        logger.info(f"Returning converted response: {{'response': '{response_text[:50]}...'}}")
                        return JSONResponse(content={"response": response_text})
                
                except json.JSONDecodeError as e:
                    logger.error(f"Invalid JSON from Ollama: {e}")
                    return JSONResponse(content={"response": "I received your message but couldn't parse the response."})
        
        except urllib.error.URLError as e:
            logger.error(f"Error connecting to Ollama: {e}")
            return JSONResponse(content={"response": f"Error connecting to the language model: {str(e)}"})
            
    except Exception as e:
        logger.error(f"Unhandled exception: {e}")
        logger.error(traceback.format_exc())
        return JSONResponse(content={"response": f"Sorry, I encountered an error: {str(e)}"})

# Debug endpoint
@app.get("/debug")
async def debug():
    logger.info("Debug endpoint called")
    try:
        # Try to connect to Ollama
        ollama_health_url = "http://host.docker.internal:11434/api/tags"
        req = urllib.request.Request(
            ollama_health_url,
            method="GET"
        )
        
        try:
            with urllib.request.urlopen(req, timeout=5) as response:
                response_data = response.read().decode('utf-8')
                result = json.loads(response_data)
                return {
                    "status": "connected",
                    "ollama_status": "available",
                    "models": result
                }
        except urllib.error.URLError as e:
            return {
                "status": "error",
                "ollama_status": "unavailable",
                "error": str(e)
            }
            
    except Exception as e:
        return {
            "status": "error",
            "exception": str(e)
        }