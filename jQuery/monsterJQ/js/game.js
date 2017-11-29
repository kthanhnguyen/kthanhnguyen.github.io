const GAME_OVER = "GAME OVER";
const PAUSE = "PAUSE";
const BLOOD_SRC = "images/bloodstain.png";

var score = 0;
var speed = 1000;
var heart = 3;
var level = 1;
var running = true;
var gameover = false;
var bomb = 3;
var bloodNum = 0;
var highScore = 0;
var mainSize = 500;
var sizeMonster = 90;


var monsters = new Array();
var bloodList = new Array();
var arrPointMonster = new Array();


var mon1 = $("#mon1");
var mon2 = $("#mon2");
var mon3 = $("#mon3");
var mon4 = $("#mon4");
var mon5 = $("#mon5");
var mon6 = $("#mon6");
var mon7 = $("#mon7");
var mon8 = $("#mon8");



setStartLocation(mon1);
moveMonster(mon1);


function setStartLocation(monster) {
	monster.css({
		"left" : '0',
		"top" : '0'
	});
	if(monster !== mon1) {
		monster.hide();
	}
}

function moveMonster(monster) {
	if(running) {
		monster.animate({
			top:'100', left:'100'
		}, speed, function() {
			monster.animate({
				top:'0', left:'0'
			}, speed, function() {
				monster.hide();
			});
		});
	}
}