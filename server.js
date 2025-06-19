const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Homepage with form
app.get('/', (req, res) => {
  res.send(`
    <h2>🌐 Karibu Secroxy 2.0</h2>
    <form method="GET" action="/go">
      <input type="text" name="url" placeholder="https://example.com" style="width: 300px;" required />
      <button type="submit">Browse</button>
    </form>
  `);
});

// Middleware to proxy to any URL
app.use('/go', (req, res, next) => {
  const target = req.query.url;
  if (!target || !target.startsWith('http')) {
    return res.status(400).send('❌ URL is invalid or missing.');
  }

  // Create dynamic proxy
  createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/go': '' },
    onError(err, req, res) {
      console.error('❌ Proxy error:', err.message);
      res.status(500).send('❌ Proxy failed: Could not connect to target.');
    },
  })(req, res, next);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Secroxy 2.0 live on http://localhost:${PORT}`);
});
