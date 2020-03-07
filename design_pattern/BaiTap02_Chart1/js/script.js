var Data = {
    data : [80, 20],
    dataTitle : ["ĐÃ ĐẠT", "CHƯA ĐẠT"]
};

var options = {
    canvas: mainCanvas,
    data : Data.data,
    dataTitle : Data.dataTitle,
    colors : ["#009ED5", "#456AA4", "#FF0000", "#E4322B"]
};

var chart = (function(){
	var canvas = options.canvas;
	var data = options.data;
    var dataTitle = options.dataTitle;
	var colors = options.colors;
	canvas.width = 700;
	canvas.height = 500;
	var ctx = canvas.getContext("2d");
	var centerX = canvas.width / 2;
    var centerY = canvas.height - 100;
    var xScale = 1;
	var yScale = 0.5;
	var radius = Math.min(canvas.width / 2, canvas.height / 2);
	var space = 18;
	var success = 0;
	var total = 0;
	var tmp = 0;
	var flag = true;

    //check input
	for (var i in data) {
		if (data[i] < 0 || data[i] > 100) {
			flag = false;
		}
		
		var categ, checkTotal = 0;
		
		for(categ in options.data) {
			val = options.data[categ];
			checkTotal += val;
		}
		
		if(checkTotal !== 100) {
		flag = false; 
		}
	}
	
	/*------------private function--------------*/
    
	//function draw success slice or fail slice
	var privateDrawChart2D = function (space, color, start_angle, end_angle, numDraw) {
        ctx.save();	 // save default state
        ctx.scale(xScale, yScale); //scale pie from circle to elipse
        ctx.beginPath();
        ctx.arc(centerX + space, centerY - space + numDraw, radius, start_angle, end_angle);
        ctx.lineTo(centerX + space, centerY - space + numDraw); //distance between 2 slice
        ctx.restore();

        if(numDraw === 1) {
        	ctx.fillStyle = colors[color];
        } else {
        	ctx.fillStyle = colors[color + 1];
        }
        ctx.fill();
    };
	
	//draw chart 3D
    var privateDrawChart3D = function () {
        var i;
		for (categ in data) {
            total += data[categ];
        }
        success = 2 * Math.PI * data[0] / total;
        if(data[0] !== 100 && data[1] !== 100) {
            for (i = 100; i > 0; i--) {
                privateDrawChart2D(0, 0, 0, success, i);
                privateDrawChart2D(space, 2, success, -0.01, i);
            }
        } else if(data[0] === 100){
            for (i = 100; i > 0; i--) {
                privateDrawChart2D(0, 0, 0, success, i);
             }
        } else if (data[1] === 100) {
            for (i = 100; i > 0; i--) {
                privateDrawChart2D(0, 2, success, 2 * Math.PI, i);
            }
        }
	};
	
	//Draw the percentage line of data
	var privateDrawLine = function(firstX, firstY, secondX, secondY, width, color) {
		ctx.strokeStyle = color;
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(firstX, firstY);
		ctx.lineTo (firstX + width, firstY);
		ctx.lineTo (secondX ,secondY);
		ctx.stroke();
	}
	
	//draw detail title for each slice
	var privateDrawText = function(){
		var radian = 0;
		var val = data[categ];
		var percent = val / total;
		var lableSpace1 = 0;
		var lableSpace2 = 0;
		var lableX1 = 0;
		var lableX2 = 0;
		var lableY1 = 0;
		var lableY2 = 0;
		if (val >= 0.5) {
			radian = 1 - val;
			lableSpace1 = (radius*2 / 3) * xScale * Math.cos(2 * Math.PI *radian + 0.01) ;
		    lableSpace2 = (radius*2 / 3)*yScale * Math.sin(2 * Math.PI * radian + 0.01) ;
			lableX1 = (centerX + space*2 + 8) * xScale + lableSpace1;
			lableY1 = (centerY - space*2 + 8) * yScale - lableSpace2;
			lableX2 = 2 * centerX * xScale - lableX1;
			lableY2 = 2 * centerY * yScale - lableY1;
			privateDrawLine(60, 80, lableX2 + 90, lableY2 - 60, 90, colors[1]); // block success
			privateDrawLine(670, 40, lableX1 - 70, lableY1 -50, -100, colors[3]); //block fail
		} else {
			lableSpace1 = (radius*2 / 3) * xScale * Math.cos(2 * Math.PI *radian + 0.01) ;
		    lableSpace2 = (radius*2 / 3)*yScale * Math.sin(2 * Math.PI * radian + 0.01) ;
			lableX1 = (centerX + space*2 + 13) * xScale + lableSpace1;
			lableY1 = (centerY - space*2 + 13) * yScale - lableSpace2;
			lableX2 = 2 * centerX * xScale - lableX1;
			lableY2 = 2 * centerY * yScale - lableY1;
			privateDrawLine(60, 80, lableX2 + 90, lableY2 - 60, 90, colors[1]); // block success
			privateDrawLine(670, 40, lableX1 - 70, lableY1 -50, -100, colors[3]); //block fail
		}
		
		//draw name chart
		ctx.fillStyle = "#4CB9E0";
		ctx.font = "20px Arial";
		ctx.fillText("BIỂU ĐỒ TỔNG QUÁT KHUNG NĂNG LỰC", 160, 430);

		//draw name block
		ctx.fillStyle = "#000";
		ctx.font = "16px Arial";
		ctx.fillText(100 - Math.round(percent * 100) + "% " + dataTitle[0] , 50, 70);
		ctx.fillText(Math.round(percent * 100) + "% " + dataTitle[1], 570, 30);
	}

	var publicDrawChart3D = function(){
		if(flag){
			privateDrawChart3D();
			privateDrawText();
		} else {
			alert("Wrong input !!!");
		}
	}

	return {
		draw : publicDrawChart3D
	}
})();

chart.draw();