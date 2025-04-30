
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add the fonts
const head = document.getElementsByTagName('head')[0];

// Add Poppins font
const poppinsLink = document.createElement('link');
poppinsLink.rel = 'stylesheet';
poppinsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
head.appendChild(poppinsLink);

// Add Inter font
const interLink = document.createElement('link');
interLink.rel = 'stylesheet';
interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap';
head.appendChild(interLink);

createRoot(document.getElementById("root")!).render(<App />);
