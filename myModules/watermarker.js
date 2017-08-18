function Watermarker(songPath, tagPath, exportAs, intervalTime, lengthTime, callback, res, trigger, imageFile = null) {
    var PythonShell = require('python-shell');
    var pyshell = new PythonShell('./myModules/python.py');
    var videoMaker = require("./videoMaker.js");

    let songLink = songPath;
    let tagLink = tagPath;
    let exportLink = `exports/${exportAs}.mp3`;
    let interval = intervalTime;
    let length = lengthTime;
    let link;
    pyshell.send(songLink);
    pyshell.send(tagLink);
    pyshell.send(interval);
    pyshell.send(exportLink);
    pyshell.send(length);

    pyshell.on('message', function(message) {
        // received a message sent from the Python script (a simple "print" statement)
        if (trigger == "do") {
            return res.download(callback(message, exportLink));
        } else if (trigger == "dont") {
            link = callback(message, exportLink);
        }
    });

    // end the input stream and allow the process to exit
    pyshell.end(function(err) {
        if (err) throw err;
        videoMaker(imageFile, link, length, exportAs, res);

        // res.status(204).end();
    })
}

module.exports = Watermarker;