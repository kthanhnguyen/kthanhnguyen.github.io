var options = {
	canvas : mainCanvas,
	colorLine: "#00AEEF",
	colorLineChart: "black",
};

var chart = (function(){
	var canvas = options.canvas;
	margin = { top: 40, left: 75, right: 0, bottom: 75 },
	canvas.width = 700;
	canvas.height = 500;
	var ctx = canvas.getContext("2d");
})();