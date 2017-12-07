var options = {
	canvas : mainCanvas,
	dataOy: [0, 1, 2, 3, 4],
	dataLine: [1.5, 3.5, 1.5, 3.5, 2.5, 3.2, 3.5]
};

var chart = (function(){
	var canvas = options.canvas;
	canvas.width = 550;
	canvas.height = 350;
	var ctx = canvas.getContext("2d");
	var columnSpace = 70;
	var rowSpace = 30;
	var space = 2;
	var maxValue = options.dataOy.length - 1;
	var xScale;
	var yScale;
	var stepSize = 1;
	var y;
	var count = 0;
	var scale = 0;
	var flag = true;

    for (var i in options.dataLine) {
		if (options.dataLine[i] < 0 || options.dataLine[i] >= 4) {
			flag = false;
		}
	}


	var privateDrawChart = function(){
		xScale = (canvas.width - rowSpace) / options.dataLine.length;
		yScale = (canvas.height - columnSpace - space) / maxValue;

		//Set value Oy
		ctx.beginPath();
		ctx.fillStyle = options.colorLineChart;
		ctx.font = "20px Arial";

		for(scale = maxValue; scale >= 1; scale = scale - stepSize){
			y = columnSpace / 2 + (yScale * count * stepSize);
			ctx.fillText(scale, space, y + space - 5);
			count++;
		}

		//Draw Line Oy
		ctx.beginPath();
		var locationOy // exactly location of OY
		locationOy = y = columnSpace / 2 + (yScale * count * stepSize);
		ctx.fillText(scale, space, y + space - 5);
		ctx.moveTo(rowSpace, y); //begin of line
		ctx.lineTo(rowSpace, columnSpace / 4 );
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		ctx.stroke();

		//Draw Line Ox
		ctx.beginPath();
		y = columnSpace / 2 + (yScale * count * stepSize);
		ctx.fillText(scale, space, y + space - 5);
		ctx.moveTo(rowSpace, y); //begin of line
		ctx.lineTo(canvas.width, y);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		ctx.stroke();

		//Draw curve chart
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.strokeStyle = "#00AEEF";
		ctx.moveTo(xScale * (0.7), locationOy - (yScale * options.dataLine[0] * stepSize));

		var i;
		for (i = 0; i < options.dataLine.length - 1; i++) {
			//control curvature of curve
			var maskX = Math.abs(options.dataLine[i] - options.dataLine[i + 1]) / 4;
			var maskY = Math.abs(options.dataLine[i] - options.dataLine[i + 1]) / 40;

			if(options.dataLine[i] < options.dataLine[i + 1]) {
				ctx.bezierCurveTo (xScale * (i + 0.7 + maskX), locationOy - (yScale * (options.dataLine[i] + maskY)),
								   xScale * (i + 1 + 0.7 - maskX), locationOy - (yScale * (options.dataLine[i + 1]) - maskY),
								   xScale * (i + 1 + 0.7), locationOy - (yScale * options.dataLine[i + 1] * stepSize));
			} else {
				ctx.bezierCurveTo  (xScale * (i + 0.7 + maskX) ,locationOy - (yScale * (options.dataLine[i] - maskY )),
									xScale * (i + 1 + 0.7 - maskX), locationOy - (yScale * (options.dataLine[i + 1] + maskY )),
									xScale * (i + 1 + 0.7), locationOy - (yScale * options.dataLine[i + 1] * stepSize));
			}
		}
		ctx.stroke();
	}

	var publicDrawChart = function(){
		if(flag){
			privateDrawChart();
		} else{
			alert("Input data is empty");
		}
	}

	return{
		draw: publicDrawChart
	}


})();

// $(document).ready( function () {
//     chart.draw();
// });
chart.draw();