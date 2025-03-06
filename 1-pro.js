let http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/html" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
            <!DOCTYPE html>
            <html>
            <head></head>
            <body>
                <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
                <p> - Martin Fowler</p>
            </body>
            </html>
        `);
  } else if (req.url === "/json" && req.method === "GET") {
    res.writeHead(200, { "content-type": "/json" });
    res.end(
      JSON.stringify({
        slideshow: {
          author: "Yours Truly",
          date: "date of publication",
          slides: [
            {
              title: "Wake up to WonderWidgets!",
              type: "all",
            },
            {
              items: [
                "Why <em>WonderWidgets</em> are great",
                "Who <em>buys</em> WonderWidgets",
              ],
              title: "Overview",
              type: "all",
            },
          ],
          title: "Sample Slide Show",
        },
      })
    );
  } else if (req.url === "/uuid" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text" });
    res.end(JSON.stringify({ uuid: uuidv4() }));
  }
});
server.listen(4000, () => {
  console.log(`Server running at http://localhost:5000/html`);
});
