/**
 * DocumentModel.js
 * 
 * This file implements a shared document model that can be accessed by both
 * the Editor and Viewer modules. It provides methods for loading, retrieving,
 * and updating documents, as well as a listener system for notifying components
 * about document changes.
 */

class DocumentModel {
    constructor() {
        this.document = null;
        this.listeners = [];
    }

    /**
     * Load document from JSON
     * @param {string|object} jsonData - JSON string or object to load
     * @returns {boolean} - Success status
     */
    loadDocument(jsonData) {
        try {
            this.document = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            this.notifyListeners();
            return true;
        } catch (error) {
            console.error('Error loading document:', error);
            return false;
        }
    }

    /**
     * Get the current document
     * @returns {object|null} - The current document or null if none is loaded
     */
    getDocument() {
        return this.document;
    }

    /**
     * Update the document (from editor)
     * @param {object} newDocument - The updated document
     */
    updateDocument(newDocument) {
        this.document = newDocument;
        this.notifyListeners();
    }

    /**
     * Add a listener for document changes
     * @param {function} callback - Function to call when document changes
     */
    addListener(callback) {
        this.listeners.push(callback);
    }

    /**
     * Remove a listener
     * @param {function} callback - Function to remove from listeners
     */
    removeListener(callback) {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    /**
     * Notify all listeners of document changes
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.document));
    }
}

// Create a singleton instance
const documentModel = new DocumentModel();

// Check if we're in a module environment
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = documentModel;
} else {
    // Otherwise expose to window
    window.documentModel = documentModel;
}
