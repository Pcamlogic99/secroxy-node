const express = require("express");
const unblocker = require("unblocker");
const app = express();

app.use(unblocker({
  prefix: '/proxy/',
  responseMiddleware: [
    unblocker.defaults.contentSecurityPolicy,
    unblocker.defaults.removeScripts
  ]
}));

app.get("/", (req, res) => {
  res.send(`
    <h2> Karibu Secroxy (Node Edition)</h2>
    <form method="GET" action="/proxy/">
      <input type="text" name="url" placeholder="https://example.com" style="width: 300px;">
      <button type="submit">Browse</button>
    </form>
  `);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Secroxy is live on http://localhost:3000");
})
