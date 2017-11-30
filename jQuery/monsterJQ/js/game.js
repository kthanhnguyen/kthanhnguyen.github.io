var game = function(){
	this.GAME_OVER;
	this.PAUSE;
	this.BLOOD_SRC;

	this.score;
	this.speed;
	this.heart;
	this.level;
	this.running;
	this.end;
	this.bomb;
	this.highScore;
	this.mainSize;
	this.sizeMonster;

	this.monsters_arr = new Array();
	this.bloodList = new Array();
	this.speed_arr = new Array();

	this.mon1;
	this.mon2;
	this.mon3;
	this.mon4;
	this.mon5;
	this.mon6;
	this.mon7;
	this.mon8;

	let seft = this;

	this.init = function(){
		this.GAME_OVER = "GAME OVER";
		this.PAUSE = "PAUSE";
		this.BLOOD_SRC = "images/blood.png";

		this.score = 0;
		this.speed = 1800;
		this.heart = 3;
		this.level = 1;
		this.running = true;
		this.end = false;
		this.bomb = 3;
		this.highScore = 0;
		this.mainSize = 500;
		this.sizeMonster = 90;

		this.monsters_arr;
		this.bloodList;
		this.speed_arr

		this.mon1 = $("#mon1");
		this.mon2 = $("#mon2");
		this.mon3 = $("#mon3");
		this.mon4 = $("#mon4");
		this.mon5 = $("#mon5");
		this.mon6 = $("#mon6");
		this.mon7 = $("#mon7");
		this.mon8 = $("#mon8");
	}

	this.start = function(){
		var mon = new monster();
		mon.initMonster();
		mon.update();
	}

}

// setStartLocatio(mon1);
//  moveMonster(mon1);

// function setStartLocatio (monster) {
// 		monster.css({
// 			"left" : '0',
// 			"top" : '0'
// 		});
// 		if(monster !== mon1) {
// 			monster.hide();
// 		}
// 	}

// function moveMonster(monster) {
// 	if(running) {
// 		monster.animate({
// 			top:'100', left:'100'
// 		}, speed, function() {
// 			monster.animate({
// 				top:'0', left:'0'
// 			}, speed, function() {
// 				monster.hide();
// 			});
// 		});
// 	}
// }
