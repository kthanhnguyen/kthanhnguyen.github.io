var quesion = $(".listQA .nameItem");
var answer = $(".listQA .infoItem");
var item = $("ul.listQA li a");
var popup = $(".popup");
var popupContent = $("div.popup-item"); //content in popup
var close = $(".close");
var more = $(".more");

$(document).ready(function(){
	//Hide answers
	answer.hide();

	//Popup	
	//The click event will show the current popup
	$(item).click(function() {
	    //current position when clicked
		var cur_item = item.index(this);

	    //get the current child tags in the tag a
	    var nameItem = item.eq(cur_item).children("p.nameItem");
	    var infoItem = item.eq(cur_item).children("p.infoItem");

	    //get children tags in popup
		var titlePop = popupContent.children("p.nameItem");
		var infoPop = popupContent.children("p.infoItem");

	    popup.show();

	    //Assign the values of each of the tags in the tag a to the corresponding tags 
	    //and output to the screen
	    popupContent.children("p").html(item.eq(cur_item).children("p").html());
	    titlePop.html(nameItem.html());
	    infoPop.html(infoItem.html());
	});

	//event click, close popup
	$(close).click(function (){
		popup.hide();
	});

	//display button more
	$(more).css({'display': 'block'});;

	size_li = $(".listQA li").size();
    x = 10; //tag li number will appear

    //displays 10 items
    $('.listQA li:lt(10)').show();
    $(more).click(function () {
        x= (x+x <= size_li) ? x+x : size_li;
        $('.listQA li:lt('+x+')').show();
        if(x == 30){
        	$(more).hide();
        }

       $('.container').animate({ scrollTop: $('.container')[0].scrollHeight}, 500);
        return false;
    });



});