var slider = (function(){
	var currentIndex = 1; //image current
	var run;
	var privateSlideShow = $(".slide_img");
	var privateThumb = $(".thumbnails_img");

	function showImage() {
		if (currentIndex > privateSlideShow.length - 1) {
			currentIndex = 0;
		} else if (currentIndex < 0) {
			currentIndex = privateSlideShow.length - 1;
		}

		privateSlideShow.hide();
		privateSlideShow.eq(currentIndex).show();
		currentImage();
		clearTimeout(run);
		run = setTimeout(function() {
			currentIndex++;
			showImage();
		}, 2000);
	}

	function currentImage() {
		privateThumb.removeClass("active");
		privateThumb.eq(currentIndex).addClass("active");
	}
	/*-------private function------*/
	//previous button event
	function privatePrev() {
		currentIndex--;
		showImage();
	}

	//next button event
	function privateNext() {
		currentIndex++;
		showImage();
	}
	
	//photo click event
	function privateClick_Thumb(value) {
		currentIndex = privateThumb.index(value);
		console.log(currentIndex);
		showImage();
	}

	/*-------public function------*/
	function publicShowImage() {
	  showImage();
	}
	function publicPrev() {
	  privatePrev();
	}
	function publicNext() {
	  privateNext();
	}
	function publicClick_Thumb(value) {
	  privateClick_Thumb(value);
	}

	return {
		auto : publicShowImage,
		prev : publicPrev,
		next : publicNext,
		thumbnails: publicClick_Thumb
	}

})();

$(document).ready(function () {
	slider.auto();
	
	$("#prev").on("click", function () {
	  slider.prev();
	});
	
	$("#next").on("click", function () {
	  slider.next();
	});
	
	$(".thumbnails_img").on("click", function () {
	  slider.thumbnails(this);
	});
});