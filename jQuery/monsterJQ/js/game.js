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
	this.pos;
	this.bloodNum;

	let seft = this;

	var mon1 = $("#mon1");
	var mon2 = $("#mon2");
	var mon3 = $("#mon3");
	var mon4 = $("#mon4");
	var mon5 = $("#mon5");
	var mon6 = $("#mon6");
	var mon7 = $("#mon7");
	var mon8 = $("#mon8");

	this.init = function(){
		this.GAME_OVER = "GAME OVER";
		this.PAUSE = "PAUSE";
		this.BLOOD_SRC = "images/blood.png";

		this.score = 0;
		this.speed = 1000;
		this.heart = 3;
		this.level = 1;

		this.bloodNum = 0;
		this.bomb = 3;
		this.running = true;
		this.end = false;
		this.highScore = 0;
		this.mainSize = 500;
		this.sizeMonster = 90;
		this.pos = null;
		this.monsters_arr;

	}

	this.start = function(){
		initMonster();
		update();
	}

	function initMonster(){
		this.monster1 = new monsterPosition(0, 0, 100, 100, true);
		this.monster2 = new monsterPosition(200, 0, 200, 100, false);
		this.monster3 = new monsterPosition(400, 0, 300, 100, false);
		this.monster4 = new monsterPosition(0, 200, 100, 200, false);
		this.monster5 = new monsterPosition(400, 200, 300, 200, false);
		this.monster6 = new monsterPosition(0, 400, 100, 300, false);
		this.monster7 = new monsterPosition(200, 400, 200, 300, false);
		this.monster8 = new monsterPosition(400, 400, 300, 300, false);

		//add monster's position when create to array and random it.
		let mon_pos = [this.monster1, this,monster2, this.monster3, this.monster4, this.monster5,
		this.monster6, this.monster7, this.monster8];

		this.monster1.setStartLocation(mon1, this.monster1);
		this.monster2.setStartLocation(mon2, this.monster2);
		this.monster3.setStartLocation(mon3, this.monster3);
		this.monster4.setStartLocation(mon4, this.monster4);
		this.monster5.setStartLocation(mon5, this.monster5);
		this.monster6.setStartLocation(mon6, this.monster6);
		this.monster7.setStartLocation(mon7, this.monster7);
		this.monster8.setStartLocation(mon8, this.monster8);
	}

	//update the monster's position when it move
	function update() {
		seft.pos = Math.floor((Math.random() * 8) + 1);
		switch(seft.pos) {
			case 1:
			if(!mon1.visible) {
				mon1.show();
				this.monster1.moveMonster(mon1, this.monster1);
			}
			break;
			case 2:
			if(!mon2.visible) {
				mon2.show();
				this.monster2.moveMonster(mon2, this.monster2);
			}
			break;
			case 3:
			if(!mon3.visible) {
				mon3.show();
				this.monster3.moveMonster(mon3, this.monster3);
			}
			break;
			case 4:
			if(!mon4.visible) {
				mon4.show();
				this.monster4.moveMonster(mon4, this.monster4);
			}
			break;
			case 5:
			if(!mon5.visible) {
				mon5.show();
				this.monster5.moveMonster(mon5, this.monster5);
			}
			break;
			case 6:
			if(!mon6.visible) {
				mon6.show();
				this.monster6.moveMonster(mon6, this.monster6);
			}
			break;
			case 7:
			if(!mon7.visible) {
				mon7.show();
				this.monster7.moveMonster(mon7, this.monster7);
			}
			break;
			case 8:
			if(!mon8.visible) {
				mon8.show();
				this.monster8.moveMonster(mon8, this.monster8);
			}
			break;
		}
	}

	function monsterPosition (initX, initY, toX, toY, visible){
		this.initX = initX;
		this.initY = initY;

		this.toX = toX;
		this.toY = toY;

		this.visible = visible;
	}

	monsterPosition.prototype.setStartLocation = function(monster, monsterProp) {
		monster.css({
			"left" : monsterProp.initX,
			"top" : monsterProp.initY
		});
		if(!monster.visible) {
			monster.hide();
		}
	}

	monsterPosition.prototype.moveMonster = function(monster, monsterProp) {
		if(seft.running) {
			monster.animate({
				left : monsterProp.toX,
				top : monsterProp.toY,
			}, seft.speed, function() {
				monster.animate({
					left :monsterProp.initX,
					top : monsterProp.initY
				}, seft.speed, function() {
					monster.hide();
					update();
				});
			});
		}
	}


	function onClickMonster(monster) {
		if(seft.running) {
			monster.finish();
			seft.score += 10;
			updateScore();
			inscreaseLevel();
		}
	}

	// $("#monster").click(function() {
	// 	if(seft.running) {
	// 		seft.score -= 10;
	// 		seft.heart--;
	// 		updateScore();
	// 		updateHeart();
	// 	}
	// });

	function updateScore() {
		$("#score-value").html(seft.score);
	}
	function updatelevel() {
		$("#level-value").html(seft.level);
	}

	var offset = $("#monster").offset();

	mon1.click(function(e) {
		onClickMonster(mon1);
		var xCoor = e.pageX - offset.left;
		var yCoor = e.pageY - offset.top;
		setBlood(xCoor, yCoor);
	});
	mon2.click(function(e) {
		onClickMonster(mon2);
		var xCoor = e.pageX - offset.left;
		var yCoor = e.pageY - offset.top;
		setBlood(xCoor, yCoor);
	});
	mon3.click(function(e) {
		onClickMonster(mon3);
		var xCoor = e.pageX - offset.left;
		var yCoor = e.pageY - offset.top;
		setBlood(xCoor, yCoor);
	});
	mon4.click(function(e) {
		onClickMonster(mon4);
		var xCoor = e.pageX - offset.left;
		var yCoor = e.pageY - offset.top;
		setBlood(xCoor, yCoor);
	});
	mon5.click(function(e) {
		onClickMonster(mon5);
		var xCoor = e.pageX - offset.left;
		var yCoor = e.pageY - offset.top;
		setBlood(xCoor, yCoor);
	});
	mon6.click(function(e) {
		onClickMonster(mon6);
		var xCoor = e.pageX - offset.left;
		var yCoor = e.pageY - offset.top;
		setBlood(xCoor, yCoor);
	});
	mon7.click(function(e) {
		onClickMonster(mon7);
		var xCoor = e.pageX - offset.left;
		var yCoor = e.pageY - offset.top;
		setBlood(xCoor, yCoor);
	});
	mon8.click(function(e) {
		onClickMonster(mon8);
		var xCoor = e.pageX - offset.left;
		var yCoor = e.pageY - offset.top;
		setBlood(xCoor, yCoor);
	});

	function setBlood(x, y) {
		if(seft.running) {
			seft.bloodNum++;
			if(seft.bloodNum > 5) {
				$("#blood" + (seft.bloodNum - 5)).hide();
			}
			$("<img id='blood" + seft.bloodNum +"' src='" + seft.BLOOD_SRC + "'>").appendTo("#monster");
			$("#blood" + seft.bloodNum).css({
				"position" : "absolute",
				"left" : (x - 50) + "px",
				"top" : (y - 50) + "px",
				"width" : "80px",
				"height" : "80px;",
			});
		}
	}

	function inscreaseLevel() {
		var oldLevel = seft.level;
		if(seft.score % 100 == 0) {
			seft.level++;
			seft.heart++;
			updateHeart();
		}
		if(oldLevel > seft.level) {
			seft.level = oldLevel;
		} else if(seft.level > oldLevel) {
			seft.speed -= 200;
		}
		updatelevel();
	}

	function updateHeart() {
		if(seft.heart > 0) {
			$("#heart").html("<span>" + seft.heart + "</span>");
		}
		if(seft.heart <= 0) {
			stopMonsters();
			$("#status").html(seft.GAME_OVER);
			$("#status").fadeIn();

			seft.running = false;
			seft.gameover = true;
		}
	}

	function stopMonsters() {
		if(mon1.visible) {
			mon1.pause();
		}
		if(mon2.visible) {
			mon2.pause();
		}
		if(mon3.visible) {
			mon3.pause();
		}
		if(mon4.visible) {
			mon4.pause();
		}
		if(mon5.visible) {
			mon5.pause();
		}
		if(mon6.visible) {
			mon6.pause();
		}
		if(mon7.visible) {
			mon7.pause();
		}
		if(mon8.visible) {
			mon8.pause();
		}
	}
}
