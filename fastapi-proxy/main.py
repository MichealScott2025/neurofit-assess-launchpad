from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import urllib.request
import json
import logging

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
        logger.info(f"Received request body: {body}")
        
        # Prepare request to Ollama
        ollama_url = "http://host.docker.internal:11434/api/chat"
        headers = {"Content-Type": "application/json"}
        data = json.dumps(body).encode('utf-8')
        
        logger.info(f"Preparing request to Ollama at {ollama_url}")
        
        # Create request object
        req = urllib.request.Request(
            ollama_url,
            data=data,
            headers=headers,
            method="POST"
        )
        
        logger.info("Sending request to Ollama")
        # Send request to Ollama
        try:
            with urllib.request.urlopen(req, timeout=60) as response:
                logger.info("Received response from Ollama")
                # Read and parse response
                response_data = response.read().decode('utf-8')
                logger.info(f"Response data: {response_data}")
                result = json.loads(response_data)
                return JSONResponse(content=result)
        except urllib.error.URLError as e:
            logger.error(f"URLError: {str(e)}")
            raise HTTPException(status_code=502, detail=f"Error communicating with Ollama: {str(e)}")
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")