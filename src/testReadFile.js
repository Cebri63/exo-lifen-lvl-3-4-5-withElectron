const fs = require("fs");

fs.readFile("./FHIR/lifen.pdf", (err, data) => {
  if (err) {
    console.log("erreur : ", err);
  }
  console.log(data);
});
