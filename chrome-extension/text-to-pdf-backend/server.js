const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const cors = require('cors');

const app = express();
const PORT = 3000;
const PDF_DIR = path.join(__dirname, 'pdfs');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PDF_DIR)); // Static serving of PDFs
app.set('view engine', 'ejs');

// Ensure the 'pdfs' directory exists
if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR);

// POST /generate-pdf : Accepts text and creates a PDF
app.post('/generate-pdf', (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: 'Content required' });

  const timestamp = Date.now();
  const filename = `document-${timestamp}.pdf`;
  const filePath = path.join(PDF_DIR, filename);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));
  doc.font('Times-Roman').fontSize(14).text(content, { align: 'left' });
  doc.end();

  res.json({ message: 'PDF created', filename });
});

// GET /pdfs : Redirect to the list of available PDFs
app.get('/pdfs', (req, res) => {
  res.redirect('/allpdfs');
});

// GET /allpdfs : Show a list of available PDFs
app.get('/allpdfs', (req, res) => {
  fs.readdir(PDF_DIR, (err, files) => {
    if (err) return res.status(500).send('Error reading directory');

    const pdfs = files.filter(f => f.endsWith('.pdf')).map(file => {
      const stats = fs.statSync(path.join(PDF_DIR, file));
      return {
        name: file,
        size: (stats.size / 1024).toFixed(1), // in KB
        date: stats.mtime.toLocaleString()
      };
    });

    res.render('allpdfs', { files: pdfs });
  });
});

// Serve PDF files
app.get('/pdfs/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(PDF_DIR, filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath, { headers: { 'Content-Type': 'application/pdf' } });  // Send the PDF file to the client with correct MIME type
  } else {
    res.status(404).send('PDF not found');
  }
});

// DELETE /delete-pdf/:filename : Removes a specific PDF
app.delete('/delete-pdf/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(PDF_DIR, filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ message: `${filename} deleted successfully` });
  } else {
    res.status(404).json({ message: 'PDF not found' });
  }
});

// DELETE /delete-all-pdfs : Removes all PDFs
app.delete('/delete-all-pdfs', (req, res) => {
  fs.readdir(PDF_DIR, (err, files) => {
    if (err) return res.status(500).json({ message: 'Error reading directory' });

    files.forEach(file => {
      if (file.endsWith('.pdf')) {
        fs.unlinkSync(path.join(PDF_DIR, file));
      }
    });

    res.json({ message: 'All PDFs deleted' });
  });
});

// Fallback for root
app.get('/', (req, res) => {
  res.redirect('/pdfs');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
