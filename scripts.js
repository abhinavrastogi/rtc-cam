(function() {
	var streaming = false;
	var video = document.createElement('video');
	var width = 320;
	var height = 240;
    var feed = document.getElementById('feed');
    var feedContext = feed.getContext('2d');
    var output = document.getElementById('output');
    var outputContext = output.getContext('2d');
    var imageData;

	navigator.getMedia = ( 
		navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );

	navigator.getMedia({video: true}, getStream, someError);

	function getStream(stream) {
		video.src = window.URL.createObjectURL(stream);
		video.play();
		feed.width = output.width = width;
		feed.height = output.height = height;	
		streamFeed();
	}

	function someError(e) {
		console.error(e);
	}

	window.requestAnimationFrame ||
	(window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( callback ){
        window.setTimeout(callback, 1000 / 60);
    });

    function streamFeed() {
        requestAnimationFrame(streamFeed);
        feedContext.drawImage(video, 0, 0, width, height);
        imageData = feedContext.getImageData(0, 0, width, height);
        //imageData.data = addEffects(imageData.data); //call this to add effects to the output stream
		outputContext.putImageData(imageData, 0, 0);
    }

    function addEffects(data) {
        /*for (var i = 0, l = data.length; i < l; i += 4) {
			//use this loop to add effects to the output stream
        }*/
        return data;
    }
})();