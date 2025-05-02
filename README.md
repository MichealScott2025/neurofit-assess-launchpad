# NeuroFit Assessment Platform

A comprehensive platform for personality, cognitive, and cultural fit assessments powered by AI to help companies find their perfect candidates faster and fairer.

## Features

- **AI-Powered Assessment Tools**: Comprehensive evaluations for personality, cognitive abilities, and cultural fit.
- **Integrated AI Chatbot**: Using Mistral AI for intelligent, context-aware responses about NeuroFit services.
- **User-Friendly Interface**: Clean, modern design with responsive layout.
- **Docker Integration**: Easy deployment with containerized services.

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI Integration**: Ollama with Mistral model
- **Containerization**: Docker and Docker Compose
- **Styling**: Tailwind CSS with custom animations

## Installation

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Git

### Setup Steps

1. Clone the repository:
   ```
   git clone https://github.com/YourUsername/neurofit-assess-launchpad.git
   cd neurofit-assess-launchpad
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Docker containers:
   ```
   docker-compose up -d
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. The application should now be running at `http://localhost:5173`

## AI Chatbot

The platform includes an integrated AI chatbot powered by Mistral through Ollama:

- **Direct Chat Widget**: Floating chat interface for quick inquiries
- **Standalone Chat**: Full-page interface for more in-depth conversations
- **FAQ Knowledge Base**: Pre-loaded with NeuroFit assessment information

## License

[MIT License](LICENSE)

## Contact

For more information, please contact [your-email@example.com]