# modeliNNg

modeliNNg is a comprehensive platform for creating, editing, and visualizing structured JSON-based models. It consists of two main modules: a powerful editor for creating and managing structured documents, and a streamlined viewer for navigating and visualizing these documents.

## Project Components

### Editor Module (StruML)

The Editor module, also known as StruML (Structured Modeling Language), is a comprehensive single-page application designed to empower users to create, manage, and visualize structured documents with hierarchical items, tags, and inter-item relationships.

**Key Features:**
- Document management with creation, deletion, import/export capabilities
- Hierarchical item structure with rich content editing
- Multi-tag support with enhanced filtering
- Interactive relations and matrix visualizations
- Extensible UI with sidebar navigation and modal dialogs

[Learn more about the Editor module](editor/README.md)

### Viewer Module

The Viewer module is a configurable JSON viewer application that allows users to load, navigate, and interact with structured JSON data in a user-friendly interface. It serves as the visualization component of the modeliNNg project.

**Key Features:**
- Multiple ways to load JSON data (drag & drop, file selection, URL parameter)
- Tree-based navigation with content display area
- Special field rendering with Markdown support
- Tag display and relation navigation
- Export capabilities to Markdown and HTML formats

[Learn more about the Viewer module](viewer/README.md)

## Integration

While both modules can function independently, they are designed to work together as part of an integrated system for structured document creation and visualization. The integration allows for:

- Shared document model between editor and viewer
- Seamless transition between editing and viewing modes
- Independent operation when needed

For more details on how the modules can be integrated, see the [integration guide](integration.md).

## Getting Started

1. Clone this repository
2. Open either module directly in your browser:
   - For editing: `editor/index.html`
   - For viewing: `viewer/index.html`
   - For integrated experience: `index.html` (after setting up integration)

## License

This project is released under the MIT License.
