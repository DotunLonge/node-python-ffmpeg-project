var videoshow = require('videoshow')

function createVideo(imagePath, songPath, length, nameOfVideo, res) {
    //   length = length * 10000;
    var image = [imagePath];

    var videoOptions = {
        fps: 25,
        loop: length, // seconds
        transition: true,
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
}

module.exports = createVideo;