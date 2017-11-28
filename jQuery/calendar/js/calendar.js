var date_now = new Date();
var current_month = date_now.getMonth();
var current_day = date_now.getDate();
var current_year = date_now.getFullYear();

var select_year = $("#years");
var select_month = $("#months");
var day_td = $("td");

var curTime = $("#date_now");
var table_calendar = $("#table_calendar");

fillMonthYear();
hiddenTableCalendar();


function createCalendar(month, year){
	var table_calendar;
	var startIndex = new Date(year, month, 1).getDay(); /* First day of Month*/
	var endIndex = new Date(year, month + 1, 0).getDate(); /* Total day in month */
	var indexDay = 13 + startIndex;
	var i;

	for (i = 13; i < 55; i++) {
		day_td.eq(i).html("");
	 	day_td.eq(i).css("background", "#FBFCFC");
	}
	for (i = 1; i <= endIndex; i++) {
		day_td.eq(indexDay).html(i);
		indexDay++;
	}

	if (year === new Date().getFullYear()) {
		console.log("year: ", year);
		if (month === new Date().getMonth()) {
			var cur_Day = 12 + startIndex + date_now.getDate();
			day_td.eq(cur_Day).css("background", "#00ACE6");
		}
	}
	select_year.val(current_year);
	select_month.val(current_month);
}



/* Fill auto month and year to option in selection */
function fillMonthYear() {
	var i, j;
	var month_arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	for (i = 0; i < month_arr.length; i++) {
		select_month.append("<option value='" + i + "'>" + month_arr[i] + "</option>");
	}
	for (j = 1920; j < 2101; j++){
		select_year.append("<option value='" + j + "'>" + j + "</option>");
	}
	createCalendar(current_month, current_year);
}


/*Select the month*/
select_month.on("change", function() {
	current_month = parseInt(select_month.val());
	createCalendar(current_month, current_year);
});

/*Select the month*/
select_year.on("change", function() {
	current_year = parseInt(select_year.val());
	createCalendar(current_month, current_year);
});

/*pre or next the month*/
$("#pre_Month").on("click", function() {
	current_month = parseInt(current_month) - parseInt(1);

	if(current_month < 0){
		current_month = 11;
		current_year -= parseInt(1);
	}

	createCalendar(current_month, current_year);
});

$("#next_Month").on("click", function() {
	current_month = parseInt(current_month) + parseInt(1);

	if(current_month > 11){
		current_month = 0;
		current_year+= parseInt(1);
	}
	createCalendar(current_month, current_year);
});

/*pre or next the Year*/
$("#pre_Year").on("click", function() {
	current_year = parseInt(current_year) - parseInt(1);

	if(current_year < 1920){
		current_year = 2100;
	}
	else{
		if(current_year > 2100){
			current_year = 1920;
		}
	}
	createCalendar(current_month, current_year);
});

$("#next_Year").on("click", function() {
	current_year = parseInt(current_year) + parseInt(1);

	if(current_year < 1920){
		current_year = 2100;
	}
	else{
		if(current_year > 2100){
			current_year = 1920;
		}
	}
	createCalendar(current_month, current_year);
});

curTime.on("click",function() {
	table_calendar.css("display", "block");

	/*add event click to td element had index 13-52*/
	for (var i = 13; i < 55; i++) {
		day_td.eq(i).on("click", function() {
			var check_day = this.innerHTML;

			if (check_day != "") {
				console.log(check_day);
				curTime.val(check_day + "/" + current_month + "/"+ current_year);
				table_calendar.css("display", "none");
			}
		});
	}

	/*add event mouse to td element had index 13-52*/
	for (var i = 13; i < 55; i++) {
		day_td.eq(i).on("mouseover", function() {
			var check_day = this;
			check_day.className = "select_day";
		});
		day_td.eq(i).on("mouseout", function() {
			var check_day = this;
			check_day.className = "";
		});
	}
});

/*hidden the table calendar when user click button input calendar but not using, enter to input date.*/
function hiddenTableCalendar() {
	table_calendar.css("display", "none");
}