var slider = (function(){
	var currentIndex = 1;
	var run;
	var privateSlideshow = $(".slide_img");
	var privateThumb = $(".thumbnails_img");

	function showImage() {
		if (currentIndex > privateSlideshow.length - 1) {
			currentIndex = 0;
		} else if (currentIndex < 0) {
			currentIndex = privateSlideshow.length - 1;
		}

		privateSlideshow.hide();
		privateSlideshow.eq(currentIndex).show();
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

	function privatePrev() {
		currentIndex--;
		showImage();
	}

	function privateNext() {
		currentIndex++;
		showImage();
	}

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