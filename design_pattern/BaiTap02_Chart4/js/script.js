var ColumnData = {
    data: [2, 0.05, 3, 4, 4]
};

var options = {
    canvas : mainCanvas,
    data : ColumnData.data,
    detail : description,
    color : ["#3366CC"],
    columnName : ["A", "B", "C", "D", "E"]
};

var chart = (function(){
	var canvas = options.canvas;
	canvas.width = 550;
	canvas.height = 350;
	var ctx = canvas.getContext("2d");
	var data = options.data;
	var detail = options.detail;
	var color = options.color;
	var columnName = options.columnName;

	var colPosition = 50; //the first position at Ox-acis of column
	var stepSize = 1;
	var maxValue = 0;
	var flag = true;

	//check input
	for (categ in data) {
		if(data[categ] > maxValue) {
			maxValue = data[categ] + 1;
		}
	}

	var space = 10; //Distance of draw letters
	var xScale = (canvas.width - colPosition) / data.length; //width x of column
	var yScale = (canvas.height - colPosition - space) / maxValue;  //distance between each honrizontal line

	for (var categ in data) {
		if(data[categ] < 0 || data[categ] > 4) {
			flag = false;
		}
	}
	/*----------private function--------*/
	//function draw chart
	privateDrawChart = function () {
		var scale;
		var i;
		var temp = 1;

		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.font = "18px Arial";

        //Write numbers and line on 0y
		for (scale = 0; scale < maxValue ;scale += stepSize) {
			var distance = yScale * temp * stepSize;
			var y = canvas.height - distance; //position y will draw next
			ctx.fillText(scale, space, y);
			ctx.moveTo(colPosition, y);
			ctx.lineTo(canvas.width, y);
			temp++;
        }

        //draw letters on Ox
		for (i = 0; i < data.length ;i++) {
			var x = (i + 0.7) * xScale; //position x will draw next
			ctx.fillText(columnName[i % columnName.length], x, canvas.height - colPosition + space);
		}

		ctx.stroke();

		//draw column chart
		//translate column because y scale with yScale
		ctx.translate(colPosition, canvas.height - (yScale * stepSize)); //draw first column is started from this coordinate
		ctx.scale(xScale, -yScale); //Invert the column which following y-axis, because y-axis is a top line of screen
		ctx.beginPath();
		ctx.fillStyle = color;
		for (i = 0; i < data.length; i++) {
			ctx.fillRect(i, 0, 0.5, data[i]);
		}
	}

	//function draw detail chart
	var privateDrawDetail = function(){
		var color_index = 0;
		 var detailHTML = "";
		detailHTML = "<div style = 'width: 70px; text-align: left;'><span style='display: block;"
					+"width: 60px; height:30px; margin-right:10px; margin-bottom:20%; background-color:"
					+ color + "'>&nbsp; </span><b>LEVEL </br></br> OF </br></br> POSITION</b></div>";
		detail.innerHTML = detailHTML;
	}

	/*----------public function--------*/
	var publicDrawChart = function(){
		if(flag){
			privateDrawChart();
			privateDrawDetail();
		} else {
			alert("Wrong input");
		}
	}

	return{
		draw: publicDrawChart
	}

})();

chart.draw();