# WEB-TEXT-TO-PDF-CONVERTER-CHROME-EXTENSION

This Chrome extension lets users convert selected text or webpage content into downloadable PDFs. With a simple interface, users can create PDFs and manage previously generated files, offering a quick way to save and share web content as PDF documents.

## Description

The **Web Text to PDF Converter** Chrome Extension allows users to easily convert selected text or entire webpage content into downloadable PDF documents. The extension provides a simple user interface where users can select text, click a button, and generate a PDF. It also allows users to view and delete previously generated PDFs.

## Features

- Convert selected text or webpage content into PDF
- View and manage previously generated PDFs
- Simple, user-friendly interface
- Uses Node.js and PDFKit for PDF generation

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/web-text-to-pdf-converter.git
```
### 2. Load the Extension
1.  Open Chrome and go to chrome://extensions/
2.  Enable Developer mode at the top right.
3.  Click on Load Unpacked and select the folder where this project is located.

### 3. Backend Setup
To use the backend(for handling PDF creation):
1. Install dependencies in the backend directory:
   ``` npm install ```
2. Start the server:
   ``` npm start ```
3. The server will run at http://localhost:3000.


## Usage
1. Once the extension is added, click on the extension icon in the toolbar.
2. Select the text on any webpage that you want to convert to a PDF.
3. Click the Convert Selected Text button to generate the PDF.
4. Check the Recent PDFs section for your generated PDFs. You can also delete all PDFs from here.

## Technologies Used
- Chrome Extensions API
- Node.js ( Backend server )
- PDFKit ( For generating PDFs )
- EJS ( For rendering the list of PDFs )
- Express.js ( For server-side handling )

## License
This project is licensed under the MIT License - see the LICENSE file for details.
