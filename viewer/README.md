# Configurable JSON Viewer

## Introduction

This application is a configurable JSON viewer. It allows users to load, navigate, and interact with JSON data in a user-friendly interface.

The current focus of this viewer is to serve as a browser for the **iNNitiatives Process Guide**, a framework for innovation management.

## For Users

### Loading Data

There are several ways to load JSON data into the viewer:

*   **Drag & Drop**: Drag a JSON file from your computer and drop it onto the application window.
*   **File Selection**: Click on the designated "Load File" button (if available) to open a file dialog and select a JSON file.
*   **Default File (URL Parameter)**: The application can be configured to load a default JSON file automatically. This is specified using the `defaultFile` URL parameter (e.g., `index.html?defaultFile=path/to/your/data.json`).

### Navigating Data

The application provides two main ways to navigate the loaded JSON data:

*   **Tree Sidebar**: A hierarchical tree structure is displayed in the sidebar, representing the nested nature of the JSON data. Click on nodes in the tree to view their content.
*   **Content Display Area**: The main area of the application displays the content of the selected JSON node.
    *   **Special Fields**: Certain field names (e.g., `title`, `content`) may be rendered in specific ways for better readability.
    *   **Markdown**: Content within fields designated for rich text (typically a "content" field) will be rendered as Markdown, allowing for formatted text, lists, links, etc.
    *   **Tags**: Items can have associated tags, which are displayed and can be used for filtering or highlighting (future potential).

### Interacting with Content

*   **Relation Tags**: The application supports special "relation tags" that can link different parts of the JSON data. Clicking on these tags might navigate to the related item (this functionality may be further developed).

### Exporting Data

Users can export the currently viewed content in the following formats:

*   **Markdown**: Exports the content as a Markdown file.
*   **HTML**: Exports the content as an HTML file.

## For Technical Users/Developers

### Application Stack

The application is built using the following technologies:

*   **Vue.js**: A progressive JavaScript framework for building user interfaces.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **Lucide Icons**: A clean and consistent icon set.

### Configuration

The application can be configured through the `APP_CONFIG` JavaScript object within the `index.html` file. URL parameters can override these settings.

*   **`APP_CONFIG` in `index.html`**:
    *   `appName` (String): The name of the application, displayed in the header.
    *   `version` (String): The application version, displayed in the footer.
    *   `showHeader` (Boolean): Toggles the visibility of the header.
    *   `showFooter` (Boolean): Toggles the visibility of the footer.
    *   `showSidebar` (Boolean): Toggles the visibility of the sidebar.
    *   `defaultFile` (String): URL or path to a JSON file to load by default.
    *   `logoUrl` (String): URL or path to an image file to be used as the logo in the header.

*   **URL Parameters for Override**:
    *   Example: `index.html?appName=MyCustomViewer&defaultFile=data/my_data.json`

### Data Format (referencing `sample.json`)

The viewer expects JSON data in a specific, though flexible, hierarchical structure. Refer to the `sample.json` file for a concrete example.

*   **Expected JSON Structure**: Typically an array of objects, where each object can have child objects (often in a `children` array), forming a tree.
*   **Special Field Rendering**:
    *   `id`: A unique identifier for an item. Used for linking and navigation.
    *   `title`: The primary display name for an item, often shown in the tree and as a heading in the content view.
    *   `content`: A field containing the main information, typically rendered as Markdown.
    *   `tags`: An array of strings representing tags associated with the item.
*   **Tag Format**:
    *   Simple tags: `key::value` (e.g., `status::active`)
    *   Relation tags: `relationKey>>targetId` (e.g., `relatedProcess>>PROC-001`). These tags can be used to create navigable links between different items in the JSON data.
*   **Markdown in Content Fields**: Fields named `content` (or configured alternative) are parsed as Markdown, allowing for rich text formatting.

### How to Run

1.  Ensure you have a modern web browser.
2.  Clone or download the application files.
3.  Open the `index.html` file directly in your web browser.

### Customization

The application is designed to be customizable:

*   **Vue Components**: Key components like `TreeNode.js` (for rendering individual nodes in the tree) and `ContentViewer.js` (for displaying the content of a selected node) can be modified to change their appearance or behavior.
*   **Styling**: Tailwind CSS classes can be adjusted in the HTML templates of the Vue components or in `index.html`.

## Project Purpose (iNNitiatives context from `sample.json`)

*   **Viewer's Initial Use-Case**: This JSON viewer was initially developed to navigate and understand the **"iNNitiatives Process Guide"**.
*   **Brief on iNNitiatives Process Guide**: The iNNitiatives Process Guide is a comprehensive framework for managing innovation within an organization. It details:
    *   **Program Structure**: The overall organization of innovation efforts.
    *   **Roles**: Responsibilities and expectations for individuals involved in the innovation process.
    *   **Opportunities**: Identifying and evaluating potential areas for innovation.
    *   **Initiatives**: The lifecycle and management of specific innovation projects.

The `sample.json` file provides an example of how this guide is structured and represented in JSON format for use with this viewer.
