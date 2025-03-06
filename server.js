const http = require("http");
const { v4 } = require("uuid");

const server = http.createServer((req, res) => {
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
    res.writeHead(200, { "Content-Type": "application/json" });
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
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ uuid: v4() }));
  } else if (req.url.startsWith("/status/")) {
    const statusCode = parseInt(req.url.split("/")[2], 10);
    if (![100, 200, 300, 400, 500].includes(statusCode)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      return res.end("Invalid status code");
    }
    res.writeHead(statusCode);
    res.end(`Response with status code ${statusCode}`);
  } else if (req.url.startsWith("/delay/")) {
    const delay = parseInt(req.url.split("/")[2], 10);
    if (isNaN(delay) || delay < 0) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      return res.end("Invalid delay value");
    }
    setTimeout(() => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Response after ${delay} seconds delay`);
    }, delay * 1000);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
