/**
 * integration.js
 * 
 * This file implements the integration controller for the modeliNNg project.
 * It manages the communication between the Editor and Viewer modules and
 * provides the UI for switching between them in integrated mode.
 */

// Import the document model (or use the global instance)
const documentModel = window.documentModel || {};

/**
 * Integration Controller class
 * Manages the integration between the Editor and Viewer modules
 */
class IntegrationController {
    constructor() {
        this.editorFrame = null;
        this.viewerFrame = null;
        this.activeModule = null;
    }

    /**
     * Initialize the integrated mode
     */
    initIntegratedMode() {
        // Create the layout
        this.createLayout();
        
        // Load the modules in iframes
        this.loadEditor();
        this.loadViewer();
        
        // Set up communication between frames
        this.setupCommunication();
    }

    /**
     * Create the layout for integrated mode
     */
    createLayout() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="flex flex-col h-screen">
                <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
                    <h1 class="text-xl font-bold">modeliNNg</h1>
                    <div class="flex space-x-4">
                        <button id="editorBtn" class="px-4 py-2 rounded bg-blue-600">Editor</button>
                        <button id="viewerBtn" class="px-4 py-2 rounded bg-gray-600">Viewer</button>
                        <button id="exitBtn" class="px-4 py-2 rounded bg-red-600">Exit</button>
                    </div>
                </header>
                <div class="flex-grow flex">
                    <div id="editorContainer" class="w-full h-full"></div>
                    <div id="viewerContainer" class="w-full h-full hidden"></div>
                </div>
            </div>
        `;

        // Add event listeners for buttons
        document.getElementById('editorBtn').addEventListener('click', () => this.switchToEditor());
        document.getElementById('viewerBtn').addEventListener('click', () => this.switchToViewer());
        document.getElementById('exitBtn').addEventListener('click', () => this.exitIntegratedMode());
    }

    /**
     * Load the editor in an iframe
     */
    loadEditor() {
        const container = document.getElementById('editorContainer');
        this.editorFrame = document.createElement('iframe');
        this.editorFrame.src = 'editor/index.html?integrated=true';
        this.editorFrame.className = 'w-full h-full border-0';
        container.appendChild(this.editorFrame);
        this.activeModule = 'editor';
    }

    /**
     * Load the viewer in an iframe
     */
    loadViewer() {
        const container = document.getElementById('viewerContainer');
        this.viewerFrame = document.createElement('iframe');
        this.viewerFrame.src = 'viewer/index.html?integrated=true';
        this.viewerFrame.className = 'w-full h-full border-0';
        container.appendChild(this.viewerFrame);
    }

    /**
     * Set up communication between frames
     */
    setupCommunication() {
        window.addEventListener('message', (event) => {
            // Handle messages from editor or viewer
            if (event.data.type === 'documentUpdated') {
                documentModel.updateDocument(event.data.document);
            }
        });

        // Listen for document model changes
        documentModel.addListener((document) => {
            // Send updated document to both frames
            if (this.editorFrame && this.editorFrame.contentWindow) {
                this.editorFrame.contentWindow.postMessage({
                    type: 'documentUpdate',
                    document: document
                }, '*');
            }
            
            if (this.viewerFrame && this.viewerFrame.contentWindow) {
                this.viewerFrame.contentWindow.postMessage({
                    type: 'documentUpdate',
                    document: document
                }, '*');
            }
        });
    }

    /**
     * Switch to editor view
     */
    switchToEditor() {
        document.getElementById('editorContainer').classList.remove('hidden');
        document.getElementById('viewerContainer').classList.add('hidden');
        document.getElementById('editorBtn').classList.replace('bg-gray-600', 'bg-blue-600');
        document.getElementById('viewerBtn').classList.replace('bg-green-600', 'bg-gray-600');
        this.activeModule = 'editor';
    }

    /**
     * Switch to viewer view
     */
    switchToViewer() {
        document.getElementById('viewerContainer').classList.remove('hidden');
        document.getElementById('editorContainer').classList.add('hidden');
        document.getElementById('viewerBtn').classList.replace('bg-gray-600', 'bg-green-600');
        document.getElementById('editorBtn').classList.replace('bg-blue-600', 'bg-gray-600');
        this.activeModule = 'viewer';
    }

    /**
     * Exit integrated mode
     */
    exitIntegratedMode() {
        window.location.href = 'index.html';
    }
}

// Initialize the controller
const controller = new IntegrationController();

// Event listeners for the landing page
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    
    // Handle file selection
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const jsonData = e.target.result;
                
                // Store in localStorage for now (in a full implementation, this would use the document model)
                localStorage.setItem('modeliNNg_document', jsonData);
                
                // Redirect based on the active button
                const activeButton = document.activeElement;
                if (activeButton.id === 'loadToEditor') {
                    window.location.href = 'editor/index.html';
                } else if (activeButton.id === 'loadToViewer') {
                    window.location.href = 'viewer/index.html';
                }
            };
            reader.readAsText(file);
        }
    });
    
    // Load to editor button
    document.getElementById('loadToEditor')?.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Load to viewer button
    document.getElementById('loadToViewer')?.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Start integrated mode button
    document.getElementById('startIntegrated')?.addEventListener('click', () => {
        // For now, just show an alert
        alert('Integrated mode is coming soon! This feature is currently under development.');
        
        // In a full implementation, this would launch the integrated mode
        // controller.initIntegratedMode();
    });
});

// Export the controller for use in other scripts
window.integrationController = controller;
