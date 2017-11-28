var currentIndex = 1;
var indexLength = countChildDiv();
var sliderDiv = $(".slideshow");
var index_img = $(".index_img");

setInterval(next,3000);

function countChildDiv() {
	return $(".slideshow > div").length;
}

function next() {
	hideImage(currentIndex);
	if (currentIndex < indexLength) {
		currentIndex++;
	} else if(currentIndex == indexLength) {
		currentIndex = 1;
	}
	showImage(currentIndex);
}

function prev() {
	hideImage(currentIndex);
	if (currentIndex > 1) {
		currentIndex--;
	} else if(currentIndex == 1) {
		currentIndex = indexLength;
	}
	showImage(currentIndex);
}

function showImage(index) {
	$("#item" + index).fadeIn();
	$("#index" + index).css('border','#4px solid #00ccff');
}

function hideImage(index) {
	$("#item" + index).slideUp();
	$("#index" + index).css('border','#4px solid #555');
}


function onClickIndex(foo) {
	var prevIndex;
	var id = foo.id;
	currentIndex = id.substr(5,1);	
	if(currentIndex == 1) {
		prevIndex = 5;
	} else {
		prevIndex = currentIndex - 1;
	}
	hideImage(prevIndex);
	showImage(currentIndex);
	for(i = 1; i <= indexLength; i++) {
		if (i == currentIndex) {
			$("#index" + i).css('border','#4px solid #00ccff');
		} else {
			$("#index" + i).css('border','#4px solid #555');
		}
	}
}