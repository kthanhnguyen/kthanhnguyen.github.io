var totalImage = 5;
var currentImage = 1;
var move;
var thumbnails_img = document.getElementsByClassName("thumbnails_img");
var ID_Images1 = document.getElementById("img_1");
var ID_Images2 = document.getElementById("img_2");
var ID_Images3 = document.getElementById("img_3");
var ID_Images4 = document.getElementById("img_4");
var ID_Images5 = document.getElementById("img_5");

function changeImage() {
	move = setInterval(function(){next()}, 1800);
	
	var clear_next = next();
	var clear_back = back();
	
	if (clear_next) 
    {
        clearInterval(move);
    }
	if (clear_back) 
    {
        clearInterval(move);
    }
}

function next(){
	switch(currentImage) {
		case 1:
			ID_Images5.style.border = "4px solid #555";
			ID_Images1.style.border = "4px solid #00ccff";
			document.images['currentImage'].src = "images" + "/" + currentImage +".jpg";
			currentImage++;					
			break;
		case 2:
			ID_Images1.style.border = "4px solid #555";
			ID_Images2.style.border = "4px solid #00ccff";
			document.images['currentImage'].src = "images" + "/" + currentImage +".jpg";
			currentImage++;
			break;
		case 3:
			ID_Images2.style.border = "4px solid #555";
			ID_Images3.style.border = "4px solid #00ccff";
			document.images['currentImage'].src = "images" + "/" + currentImage +".jpg";
			currentImage++;
			break;
		case 4:
			ID_Images3.style.border = "4px solid #555";
			ID_Images4.style.border = "4px solid #00ccff";
			document.images['currentImage'].src = "images" + "/" + currentImage +".jpg";
			currentImage++;
			break;
		case 5:
			ID_Images4.style.border = "4px solid #555";
			ID_Images5.style.border = "4px solid #00ccff";
			document.images['currentImage'].src = "images" + "/" + currentImage +".jpg";
			currentImage = 1;
			break;
		default:
			ID_Images1.style.border = "4px solid #00ccff";
			document.images['currentImage'].src = "images" + "/" + currentImage +".jpg";
			currentImage++;	
	}
}

function back(){
	if(currentImage == 1){
			currentImage = 5;
		}
	else{
		if(currentImage <= 5 && currentImage > 1){
			currentImage--;
		}
	}
	document.images['currentImage'].src = "images" + "/" + currentImage +".jpg";
}

function mouseDown(id){
	document.images['currentImage'].src = "images" + "/" + id +".jpg";
}
