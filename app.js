const http = require("http");
const url = require("url");
const {
  cardTemp,
  product,
  rowData,
  overview,
  replaceTemplate,
} = require("./dev-data/Data");
const { PORT, HOST } = require("./config");
// Main Server
const server = http.createServer((req, res) => {
  // Get URl
  const mainUrl = url.parse(req.url);
  const currentUrl = mainUrl.pathname;
  const id = url.parse(req.url, true).query.id;

  // Home Page
  if (currentUrl === "/" || currentUrl === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const allProduct = rowData
      .map((el) => {
        return replaceTemplate(cardTemp, el);
      })
      .join("");
    res.end(overview.replace("{%cardTemp%}", allProduct));

    // Product page
  } else if (currentUrl === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const currentData = rowData.find((val) => val.id == id);
    res.end(replaceTemplate(product, currentData));

    // 4o4 Not Found Page
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>Page Not Found</h1>");
  }
});

// Server Listenr
server.listen(PORT, HOST, () => {
  console.log(`Server is rouning on http://${HOST}:${PORT}`);
});
