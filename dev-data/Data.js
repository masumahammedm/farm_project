const fs = require("fs");
class Data {
  rowData = JSON.parse(fs.readFileSync("dev-data/data.json", "utf8"));

  cardTemp = fs.readFileSync("templates/cardTemp.html", "utf8");

  overview = fs.readFileSync("templates/overview.html", "utf8");

  product = fs.readFileSync("templates/product.html", "utf8");

  replaceTemplate(templat, data) {
    let output = templat.replace(/{%IMAGE%}/g, data.image);
    output = output.replace(/{%PRODUCTNAME%}/g, data.productName);
    output = output.replace(/{%ID%}/g, data.id);
    output = output.replace(/{%FROM%}/g, data.from);
    output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
    output = output.replace(/{%QUANTITY%}/g, data.quantity);
    output = output.replace(/{%PRICE%}/g, data.price);
    output = output.replace(/{%DESCRIPTION%}/g, data.description);
    if (!data.organic) {
      output = output.replace(/{%ORGANIC%}/g, "not-organic");
    }

    return output;
  }
}
module.exports = new Data();
