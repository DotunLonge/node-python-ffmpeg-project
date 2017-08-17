var fs = require('fs')


function mergeValues(values, content) {

    for (var key in values) {
        content = content.replace("{{options." + key + "}}", values[key]);
    }

    return content;
}

function View(templateName, values, response) {

    var fileContent = fs.readFileSync("./views/" + templateName + ".html", { encoding: "utf8" })
    fileContent = mergeValues(values, fileContent)

    response.write(fileContent)

}


module.exports.view = View;