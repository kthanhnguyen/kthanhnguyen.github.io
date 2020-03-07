var date_now = new Date();
var current_month = date_now.getMonth();
var current_day = date_now.getDate();
var current_year = date_now.getFullYear();

var select_year = document.getElementById("years");
var select_month = document.getElementById("months");
var day_td = document.getElementsByTagName("td");

var curTime = document.getElementById("date_now");
var table_calendar = document.getElementById("table_calendar");

fillMonthYear();
hiddenTableCalendar();


function createCalendar(month, year){
	var table_calendar;
	
	var startIndex = new Date(year, month, 1).getDay(); /* First day of Month*/
	var endIndex = new Date(year, month, 0).getDate(); /* Total day in month */
	var indexDay = 13 + startIndex;
	

	for (i = 13; i < 55; i++) {
		day_td[i].innerHTML = "";
		day_td[i].style.background = "#FBFCFC"; /*set #FBFCFC background to td element from 21 to 61*/
	}
	for (i = 1; i <= endIndex; i++) {
		day_td[indexDay].innerHTML = i;
		indexDay++;
	}

	if (year === new Date().getFullYear()) {
		console.log("year: ", year);
		if (month === new Date().getMonth()) {
			//month+=1;
			console.log("month: ", month);
			var cur_Day = 12 + startIndex + date_now.getDate();
			day_td[cur_Day].style.background = "#00ACE6";
		}		
	}
	
	select_year.value = current_year;
	select_month.value = current_month;
}



/* Fill auto month and year to option in selection */
function fillMonthYear() {
	var i, j;
	var month_arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	for (i = 0; i < month_arr.length; i++) {
		select_month.innerHTML += "<option value='" + i + "'>" + month_arr[i] + "</option";
	}
	for (j = 1920; j < 2101; j++){
		select_year.innerHTML += "<option value='" + j + "'>" + j + "</option";
	}
	createCalendar(current_month, current_year);
}


/*Select the month*/
function selectMonth() {
	current_month = parseInt(select_month.value);
	createCalendar(current_month, current_year);
}

/*Select the month*/
function selectYear() {
	current_year = parseInt(select_year.value);
	createCalendar(current_month, current_year);
}

/*pre or next the month*/
function pre_nextMonth(month) {
	current_month = parseInt(current_month) + parseInt(month);
	
	
	if(current_month > 11){
		current_month = 0;
		current_year+= parseInt(1);
	}
	else{
		if(current_month < 0){
			current_month = 11;
			current_year -= parseInt(1);
		}
	}
	createCalendar(current_month, current_year);
}

/*pre or next the Year*/
function pre_nextYear(year) {
	current_year = parseInt(current_year) + parseInt(year);
	
	
	if(current_year < 1920){
		current_year = 2100;
	}
	else{
		if(current_year > 2100){
			current_year = 1920;
		}
	}
	createCalendar(current_month, current_year);
}

function inputTime(){
	table_calendar.style.display = "block"; //when click icon calendar, table calendar display.
	
	/*add event click to td element had index 13-52*/
	for (var i = 13; i < 55; i++) {
		day_td[i].addEventListener("click", function() {
			var check_day = this.innerHTML;
			
			if (check_day != "") {
				console.log(check_day);
				curTime.value = check_day + "/" + current_month + "/"+ current_year;
				
				table_calendar.style.display = "none";
			}
		});
	}
	
	
	/*add event mouse to td element had index 13-52*/
	for (var i = 13; i < 55; i++) {
		day_td[i].addEventListener("mouseover", function() {
			var check_day = this;
			check_day.className = "select_day";
		});
		day_td[i].addEventListener("mouseout", function() {
			var check_day = this;
			check_day.className = "";
		});
	}
	
}

/*hidden the table calendar when user click button input calendar but not using, enter to input date.*/
function hiddenTableCalendar() {
	var table_calendar = document.getElementById("table_calendar");
	table_calendar.style.display = "none";
}
