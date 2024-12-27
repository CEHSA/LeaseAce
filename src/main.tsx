import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global Error:', { message, source, lineno, colno, error });
  return false;
};

window.onunhandledrejection = function(event) {
  console.error('Unhandled Promise Rejection:', event.reason);
};

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} catch (error) {
  console.error('Error rendering app:', error);
  rootElement.innerHTML = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      padding: 20px;
      text-align: center;
      font-family: system-ui, -apple-system, sans-serif;
    ">
      <h1 style="color: #EF4444; margin-bottom: 1rem;">Application Error</h1>
      <p style="color: #374151; max-width: 500px;">
        Sorry, something went wrong while loading the application. 
        Please try refreshing the page.
      </p>
      ${error instanceof Error ? `<pre style="
        margin-top: 1rem;
        padding: 1rem;
        background: #F3F4F6;
        border-radius: 0.5rem;
        overflow-x: auto;
        font-size: 0.875rem;
        color: #374151;
      ">${error.message}</pre>` : ''}
    </div>
  `;
}
