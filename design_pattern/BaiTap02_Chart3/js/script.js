var data = {
	"Xuất sắc" : 10,
	"Tốt" : 20,
	"Trung bình" : 10,
	"Kém": 60
};

var options = {
	canvas : mainCanvas,
	data: data,
	colors : ["#4267B1", "#DB3D26", "#F8991D", "#189747"],
	doughnutHoleSize: 0.5,
	detail: detail
};

var chart = (function(){
	var canvas = options.canvas;
	canvas.width = 400;
	canvas.height = 400;
	var ctx = canvas.getContext("2d");
	var colors = options.colors;

	var flag = true;
	var val;
	
	//Check input
	for (categ in options.data) {
		if (options.data[categ] < 0 || options.data[categ] > 100) {
			flag = false;
		}
		
		var categ, total = 0;
		
		for(categ in options.data) {
			val = options.data[categ];
			total += val;
		}
		
		if(total !== 100) {
			flag = false;
		}
	}

	var drawPieSlice = function(ctx,centerX, centerY, radius, startAngle, endAngle, color){
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(centerX,centerY);
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.closePath();
		ctx.fill();
	}
	
	/*----------private function--------*/
	//Draw Chart
	var privateDrawChart = function(){
		var total = 0;
		var color_index = 0;

		for(categ in options.data) {
			val = options.data[categ];
			total += val;
		}

		var start_angle = 1.5 * Math.PI;

		for (categ in options.data) {
			val = options.data[categ];
			var sliceAngle = 2 * Math.PI * val / total;

			drawPieSlice(
				ctx,
				canvas.width / 2,
				canvas.height / 2,
				Math.min(canvas.width / 2, canvas.height / 2),
				start_angle,
				start_angle + sliceAngle,
				colors[color_index % colors.length]
			);

			start_angle += sliceAngle;
			color_index++;

			//drawing a white circle over the chart
			//to create the doughnut chart
			if(options.doughnutHoleSize) {
				drawPieSlice(
					ctx,
					canvas.width/2,
					canvas.height/2,
					options.doughnutHoleSize * Math.min(canvas.width / 2, canvas.height / 2),
					0,
					2 * Math.PI,
					"#FFFFFF"
				);
			}
		}
	}

	//Draw the proportions in the figure
	var privateDrawLabel = function(){
		var start_angle = 1.5 * Math.PI; //draw label for each slice

		for (categ in options.data){
			var val = options.data[categ];
			sliceAngle = 2 * Math.PI * val / total;

			var pieRadius = Math.min(canvas.width / 2, canvas.height / 2);
			var labelX = canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + sliceAngle / 2);
			var labelY = canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + sliceAngle / 2);

			if (options.doughnutHoleSize) {
				var offset = (pieRadius * options.doughnutHoleSize) / 2;
				
				//determine position of label lay at center position in a slice
				//x = R * cos(angle), y = R * sin(angle)
				labelX = canvas.width / 2 + (offset + pieRadius / 2) * Math.cos(start_angle + sliceAngle / 2);
				labelY = canvas.height / 2 + (offset + pieRadius / 2) * Math.sin(start_angle + sliceAngle / 2);
			}
			
			var labelText = Math.round(100 * val / total);
			ctx.fillStyle = "black";
			ctx.font = "bold 20px Arial";
			ctx.fillText(labelText + "%", labelX, labelY);
			start_angle += sliceAngle;
		}
	}
	
	//Draw detailed information
	var privateDrawDetail = function(){
		if (options.detail){
			color_index = 0;
			var detailHTML = "";
			for (categ in options.data){
				detailHTML +=
				"<div style='margin-bottom:25px;'><span style='display:inline-block; width:22px; background-color:"
				+ colors[color_index++]+"; margin-right: 12px;'>&nbsp;</span> "+ categ +"</div>";
			}
			options.detail.innerHTML = detailHTML;
		}
	}

	/*----------public function--------*/
	var publicDrawChart = function(){
		if(flag){
			privateDrawChart();
			privateDrawLabel();
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