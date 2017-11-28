var currentIndex = 1;
var run;
var slideshow = $(".slide_img");
var index_menu = $(".circle");

$(document).ready(function() {
   showImage();
});

function showImage() {
	if (currentIndex > 4) {
		currentIndex = 0;
	}

	if (currentIndex < 0) {
		currentIndex = 4;
	}

	slideshow.slideUp();
	slideshow.eq(currentIndex).fadeIn();
	currentImage();
	clearTimeout(run);
	run = setTimeout(function() {
		currentIndex++;
		console.log(currentIndex);
		showImage();
	}, 2000);
}

function currentImage() {
	index_menu.removeClass("active");
	index_menu.eq(currentIndex).addClass("active");
}

$("#prev").click(function() {
	currentIndex--;
	console.log("prev: ",currentIndex);
	showImage();
});

$("#next").click(function() {
	currentIndex++;
	console.log("next: ",currentIndex);
	showImage();
});

//event when click image index (the ball).
$(".circle").click(function() {
	currentIndex = index_menu.index(this);
	console.log("click index:", currentIndex);
	showImage();
});