var videoshow = require('videoshow')
var mp3Duration = require('mp3-duration');

function createVideo(imagePath, songPath, length, nameOfVideo, res) {
    //   length = length * 10000;
    var image = [imagePath];

    mp3Duration(songPath, function(err, duration) {

        if (err) return console.log(err.message);

        console.log('Your file is ' + duration + ' seconds long');

        var videoOptions = {
            fps: 5,
            loop: duration,
            transition: false,
            transitionDuration: 1,
            videoBitrate: 1024,
            videoCodec: 'libx264',
            size: '640x?',
            audioBitrate: '128k',
            audioChannels: 2,
            format: 'mp4',
            pixelFormat: 'yuv420p'
        }

        videoshow(image, videoOptions)
            .audio(songPath)
            .save('exports/videos/' + nameOfVideo + ".mp4")
            .on('start', function(command) {
                console.log('ffmpeg process started:', command)
            })
            .on('error', function(err, stdout, stderr) {
                console.error('Error:', err)
                console.error('ffmpeg stderr:', stderr)
            })
            .on('end', function(output) {
                console.error('Video created in:', output);
                res.download(__dirname.replace("/myModules", '/exports/videos/' + nameOfVideo + '.mp4'));
            })

    });

}

module.exports = createVideo;