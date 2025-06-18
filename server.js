const express = require("express");
const unblocker = require("unblocker");

const app = express();

// Tumia unblocker bila defaults zilizofutwa kwenye version mpya
app.use(unblocker({
  prefix: '/proxy/'
}));

// Homepage ya Secroxy
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Secroxy (Node Edition)</title>
    </head>
    <body style="font-family:sans-serif;text-align:center;margin-top:5rem;">
      <h2>🌐 Karibu Secroxy (Node Edition)</h2>
      <p>Ingiza URL unayotaka ku-browse kwa njia ya siri:</p>
      <form method="GET" action="/proxy/">
        <input 
          type="text" 
          name="url" 
          placeholder="https://example.com" 
          style="width: 300px; padding: 8px; font-size: 16px;" 
          required
        />
        <br /><br />
        <button type="submit" style="padding: 10px 20px; font-size: 16px;">
          Browse Anonymously
        </button>
      </form>
    </body>
    </html>
  `);
});

// Start server kwenye PORT environment au default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Secroxy is live on http://localhost:${PORT}`);
})
