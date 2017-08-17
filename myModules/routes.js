var renderer = require("./renderer.js")
var qs = require('querystring');
const bodyParser = require('body-parser');


routes = {
    home: (request, response) => {
        response.writeHead(200, { "Content-Type": "text/html" });

        var options = {
            thirtySec: "thirty seconds",
            aMinute: "one minute",
            twoMinutes: "two minutes",
            whole: "entire song duration"
        }

        renderer.view("shared/header", {}, response);
        renderer.view("home/input", options, response);
        renderer.view("shared/footer", {}, response);


        response.end();
    },
    lost: (request, response) => {
        response.writeHead(400, { "Content-Type": "text/html" });
        renderer.view("shared/header", {}, response);
        renderer.view("errors/lost", {}, response);
        renderer.view("shared/footer", {}, response);
        response.end();

    },
    merger: (request, response) => {
        if (request.url === "/merger") {
            response.writeHead(200, { "Content-Type": "text/html" })
            renderer.view("shared/header", {}, response);
            renderer.view("merger/input", {}, response);
            renderer.view("shared/footer", {}, response);

        }
        response.end();
    }
}

module.exports.routes = routes