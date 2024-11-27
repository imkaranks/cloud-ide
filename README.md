# Cloud IDE

## Overview

This project is a basic and incomplete implementation of a cloud-based IDE (Integrated Development Environment) that allows users to interact with a terminal and explore files. It is built using the following technologies:

- **Client**: React (Frontend)
- **Server**: Node.js with Express
- **Testing**: Jest
- **Real-time communication**: Socket.IO

Currently, the IDE supports a minimal set of features, including a terminal interface, basic file explorer, and a simple text editor for editing files. The project is a work-in-progress, and future updates will focus on improving functionality and adding features such as real-time collaboration, more sophisticated file storage, and a more advanced code editor.

## Project Structure

The project is divided into two main directories:

- **client**: Contains the React-based frontend.
- **server**: Contains the Node.js and Express backend.

### Client (Frontend)

- **React**: The frontend is built with React, allowing users to interact with the terminal, file explorer, and text editor.
- **Socket.IO Client**: Used for real-time communication with the server, specifically for executing terminal commands and streaming the output.

### Server (Backend)

- **Node.js & Express**: The backend is built with Express to handle HTTP requests.
- **Socket.IO Server**: Handles real-time communication with the client. It listens for terminal commands from the frontend and executes them on the server, sending the output back to the client.
- **Terminal Execution (Not Recommended for Production)**: For simplicity, the server directly executes commands received from the client in the terminal. This implementation is not recommended for production use due to security risks.

### File System (Temporary Solution)

- **File Explorer**: The current file explorer reads files from a temporary `tmp` folder. In the future, this will be moved to an object storage solution (such as Amazon S3) for more scalability and accessibility.
- **File Content Loading**: The contents of files are sent to the frontend when requested via the file explorer.
- **Text Editor**: A simple text area is provided for editing files. This will eventually be replaced by a prebuilt solution or custom-built editor.

### Key Features (Currently Implemented)

- **Terminal Interface**: The client can send terminal commands to the server through a simple interface. The output of the commands is streamed back to the frontend in real-time using Socket.IO.
- **File Explorer**: Users can view the contents of the `tmp` folder on the server. Files are listed, and the content can be viewed and edited.
- **Basic Text Editor**: A text area is provided to edit files. The editor debounces changes and sends the entire content to the server when the user stops typing. Future improvements may include sending only the diff content to minimize data transfer.

### Planned Improvements

- **File Storage**: Transition from storing files in the `tmp` folder to a scalable object storage solution such as Amazon S3. The frontend will access files via API endpoints.
- **Diff-based Editing**: Rather than sending the entire file content on each edit, the plan is to send only the differences (diff) between the current and previous content. This will help reduce the amount of data being transferred and enable potential collaboration features in the future.
- **Code Editor**: The current simple text area editor will be replaced by a more advanced solution. This could either be a prebuilt library or a custom-built editor designed for coding.
- **Real-time Collaboration**: Future versions will allow multiple users to collaborate on the same file in real-time, potentially using technologies like WebRTC or WebSockets.

## Getting Started

### Prerequisites

Before getting started, ensure you have the following software installed:

- **Node.js** (version >= 16.x)
- **npm** (Node package manager)
- **React** (Frontend development environment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/imkaranks/cloud-ide.git
   cd cloud-ide
   ```

2. Install dependencies for both client and server:

   - For the **client**:
     ```bash
     cd client
     npm install
     ```
   - For the **server**:
     ```bash
     cd ../server
     npm install
     ```

3. Start both the client and the server:

   - In one terminal, run the server:
     ```bash
     cd server
     npm start
     ```
   - In another terminal, run the client:
     ```bash
     cd client
     npm start
     ```

4. Open the browser and navigate to `http://localhost:5173` to start using the IDE.

### Running Tests

The project uses **Jest** for testing. To run the tests:

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Run the tests:
   ```bash
   npm test
   ```

### Future Development

- **Security Considerations**: As mentioned, executing terminal commands directly from the client to the server is not recommended for production. In the future, this will be replaced with a more secure execution model.
- **Real-time Collaboration**: Enhancing the collaboration features, allowing multiple users to edit files simultaneously with real-time updates.
- **Object Storage Integration**: Replace the temporary `tmp` folder with an object storage system like Amazon S3 for storing files.
- **Advanced Code Editor**: Replace the basic text area with a more sophisticated code editor (e.g., Monaco Editor or Ace Editor).

---

Thank you for checking out the Cloud IDE project!
