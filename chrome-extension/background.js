chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "convertToPDF",
      title: "Convert to PDF",
      contexts: ["page", "selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    const selectedText = info.selectionText || null;
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: sendTextToServer,
      args: [selectedText]
    });
  });
  
  function sendTextToServer(selectedText) {
    const text = selectedText || document.body.innerText;
  
    fetch('http://localhost:3000/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: text }) // ✅ Match the server's expected field
    })
      .then(res => res.json())
      .then(data => {
        const filename = data.filename;
        const fileUrl = `http://localhost:3000/${filename}`;
  
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = filename;
        a.click();
      })
      .catch(err => console.error("PDF generation failed:", err));
  }
  