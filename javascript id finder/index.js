const request = require("request");
var fs = require('fs');
var list = fs.readFileSync("listed.txt", "utf-8").split("\n");
var i;
 
for (i of list) {
  (function(id) {
    request({
      method: "GET",
      url: "https://steamcommunity.com/id/" + id,
    }, (error, response, body) => {
      if (body.match("The specified profile could not be found.")) {
        console.log(id + " not taken");
    fs.appendFileSync("working.txt", id + "\n");
      } else {
        console.log(id + " taken");
      }
    })
  })(i);
}