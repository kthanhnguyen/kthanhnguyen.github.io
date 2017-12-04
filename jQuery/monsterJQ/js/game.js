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

	let mon1 = $("#mon1");
	let mon2 = $("#mon2");
	let mon3 = $("#mon3");
	let mon4 = $("#mon4");
	let mon5 = $("#mon5");
	let mon6 = $("#mon6");
	let mon7 = $("#mon7");
	let mon8 = $("#mon8");

	if(sessionStorage.getItem("highscore") == null) {
		sessionStorage.setItem("highscore", 0);
	} else {
		seft.highScore = sessionStorage.getItem("highScore");
	}

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
		this.monster1 = new monsterPosition(0, 0, 100, 100);
		this.monster2 = new monsterPosition(200, 0, 200, 100);
		this.monster3 = new monsterPosition(400, 0, 300, 100);
		this.monster4 = new monsterPosition(0, 200, 100, 200,);
		this.monster5 = new monsterPosition(400, 200, 300, 200);
		this.monster6 = new monsterPosition(0, 400, 100, 300);
		this.monster7 = new monsterPosition(200, 400, 200, 300);
		this.monster8 = new monsterPosition(400, 400, 300, 300);

		//set Start Location của monster
		this.monster1.setStartLocation(mon1, this.monster1);
		this.monster2.setStartLocation(mon2, this.monster2);
		this.monster3.setStartLocation(mon3, this.monster3);
		this.monster4.setStartLocation(mon4, this.monster4);
		this.monster5.setStartLocation(mon5, this.monster5);
		this.monster6.setStartLocation(mon6, this.monster6);
		this.monster7.setStartLocation(mon7, this.monster7);
		this.monster8.setStartLocation(mon8, this.monster8);
	}

	//update random location monster
	function update() {
		seft.pos = Math.floor((Math.random() * 8) + 1);
		switch(seft.pos) {
			case 1:
			if(!mon1.is(":visible")) {
				mon1.show();
				this.monster1.moveMonster(mon1, this.monster1);
			}
			break;
			case 2:
			if(!mon2.is(":visible")) {
				mon2.show();
				this.monster2.moveMonster(mon2, this.monster2);
			}
			break;
			case 3:
			if(!mon3.is(":visible")) {
				mon3.show();
				this.monster3.moveMonster(mon3, this.monster3);
			}
			break;
			case 4:
			if(!mon4.is(":visible")) {
				mon4.show();
				this.monster4.moveMonster(mon4, this.monster4);
			}
			break;
			case 5:
			if(!mon5.is(":visible")) {
				mon5.show();
				this.monster5.moveMonster(mon5, this.monster5);
			}
			break;
			case 6:
			if(!mon6.is(":visible")) {
				mon6.show();
				this.monster6.moveMonster(mon6, this.monster6);
			}
			break;
			case 7:
			if(!mon7.is(":visible")) {
				mon7.show();
				this.monster7.moveMonster(mon7, this.monster7);
			}
			break;
			case 8:
			if(!mon8.is(":visible")) {
				mon8.show();
				this.monster8.moveMonster(mon8, this.monster8);
			}
			break;
		}
	}
/*===============monster position==================*/
	function monsterPosition (initX, initY, toX, toY){
		this.initX = initX;
		this.initY = initY;

		this.toX = toX;
		this.toY = toY;
	}
	monsterPosition.prototype.setStartLocation = function(monster, monsterProp) {
		monster.css({
			"left" : monsterProp.initX,
			"top" : monsterProp.initY
		});
		if(monster) {
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
					var monsterNum = calculateVisibleMonster();
					monster.hide();
					while(monsterNum <= seft.level) {
					update();
					monsterNum++;
					}
				});
			});
		}
	}

	function calculateVisibleMonster() {
		var count = 0;
		if(mon1.is(":visible")) {
			count++;
		}
		if(mon2.is(":visible")) {
			count++;
		}
		if(mon3.is(":visible")) {
			count++;
		}
		if(mon4.is(":visible")) {
			count++;
		}
		if(mon5.is(":visible")) {
			count++;
		}
		if(mon6.is(":visible")) {
			count++;
		}
		if(mon7.is(":visible")) {
			count++;
		}
		if(mon8.is(":visible")) {
			count++;
		}
		return count;
	}
/*==============Event update====================*/
	function updateHighScore() {
		sessionStorage.setItem("highScore", seft.highScore);
	}

	function getHighScore() {
		return sessionStorage.getItem("highScore");
	}

	function updateScore() {
		$("#score-value").html(seft.score);
	}

	function showlevel() {
		$("#level-value").html(seft.level);
	}

	function updateBomb() {
		$("#bomb").html("<span>" + seft.bomb + "</span>");
	}

	function updateLevel() {
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
		showlevel();
	}

	function updateHeart() {
		if(seft.heart >= 0) {
			$("#heart").html("<span>" + seft.heart + "</span>");
		}
		if(seft.heart < 0) {
			pauseMonster();
			$("#status").html(seft.GAME_OVER);
			$("#status").fadeIn();

			if(seft.highScore < seft.score) {
				seft.highScore = seft.score;
				updateHighScore();
			}
			$("#status").append("<p>High score: " + seft.highScore + "</p>")
			seft.running = false;
			seft.gameover = true;
		}
	}
/*=================Event Click=================*/
	function onClickMonster(monster) {
		if(seft.running) {
			monster.finish();
			seft.score += 20;
			seft.heart++;
			updateScore();
			updateLevel();
		}
	}
	$("#monster").click(function() {
		if(seft.running) {
			seft.score -= 10;
			seft.heart--;
			updateScore();
			updateHeart();
		}
	});


	var offset = $("#monster").offset();

	mon1.click(function(e) {
		onClickMonster(mon1);
		xPos = e.pageX - offset.left;
		yPos = e.pageY - offset.top;
		setBlood(xPos, yPos);
	});
	mon2.click(function(e) {
		onClickMonster(mon2);
		xPos = e.pageX - offset.left;
		yPos = e.pageY - offset.top;
		setBlood(xPos, yPos);
	});
	mon3.click(function(e) {
		onClickMonster(mon3);
		xPos = e.pageX - offset.left;
		yPos = e.pageY - offset.top;
		setBlood(xPos, yPos);
	});
	mon4.click(function(e) {
		onClickMonster(mon4);
		xPos = e.pageX - offset.left;
		yPos = e.pageY - offset.top;
		setBlood(xPos, yPos);
	});
	mon5.click(function(e) {
		onClickMonster(mon5);
		xPos = e.pageX - offset.left;
		yPos = e.pageY - offset.top;
		setBlood(xPos, yPos);
	});
	mon6.click(function(e) {
		onClickMonster(mon6);
		xPos = e.pageX - offset.left;
		yPos = e.pageY - offset.top;
		setBlood(xPos, yPos);
	});
	mon7.click(function(e) {
		onClickMonster(mon7);
		xPos = e.pageX - offset.left;
		yPos = e.pageY - offset.top;
		setBlood(xPos, yPos);
	});
	mon8.click(function(e) {
		onClickMonster(mon8);
		xPos = e.pageX - offset.left;
		yPos = e.pageY - offset.top;
		setBlood(xPos, yPos);
	});
/*========================draw blood===================*/
	function setBlood(x, y) {
		if(seft.running) {
			seft.bloodNum++;
			if(seft.bloodNum > 6) {
				$("#blood" + (seft.bloodNum - 6)).hide();
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
/*==============boom function==============*/
	$("#bomb").click(function(){
		if(seft.bomb > 0) {
			seft.bomb--;
			updateBomb();
			killAllMonster();
		}
	});
	function killAllMonster() {
		var sum = 0;
		if(mon1.is(":visible")) {
			var position = mon1.position();
			setBlood(position.left + 50, position.top + 50);
			setTimeout(function() {
				mon1.finish();
			},1);
			sum++;
		}
		if(mon2.is(":visible")) {
			var position = mon2.position();
			setBlood(position.left + 50, position.top + 50);
			setTimeout(function() {
				mon2.finish();
			},1);
			sum++;
		}
		if(mon3.is(":visible")) {
			var position = mon3.position();
			setBlood(position.left + 50, position.top + 50);
			setTimeout(function() {
				mon3.finish();
			},1);
			sum++;
		}
		if(mon4.is(":visible")) {
			var position = mon4.position();
			setBlood(position.left + 50, position.top + 50);
			setTimeout(function() {
				mon4.finish();
			},1);
			sum++;
		}
		if(mon5.is(":visible")) {
			var position = mon5.position();
			setBlood(position.left + 50, position.top + 50);
			setTimeout(function() {
				mon5.finish();
			},1);
			sum++;
		}
		if(mon6.is(":visible")) {
			var position = mon6.position();
			setBlood(position.left + 50, position.top + 50);
			setTimeout(function() {
				mon6.finish();
			},1);
			sum++;
		}
		if(mon7.is(":visible")) {
			var position = mon7.position();
			setBlood(position.left + 50, position.top + 50);
			setTimeout(function() {
				mon7.finish();
			},1);
			sum++;
		}
		if(mon8.is(":visible")) {
			var position = mon8.position();
			setBlood(position.left + 50, position.top + 50);
			setTimeout(function() {
				mon8.finish();
			},1);
			sum++;
		}
		seft.score += (10 * sum);
		updateScore();
	}
/*==============pause function==============*/
	$("#pause").click(function() {
		if(seft.running && !seft.end) {
			pauseMonster();
			$("#status").html(seft.PAUSE);
			$("#status").show();
		}
		if(!seft.running && !seft.end) {
			resumeMonster();

			$("#status").hide();
		}
		seft.running = !seft.running;
	});

	function pauseMonster() {
		if(mon1.is(":visible")) {
			mon1.pause();
		}
		if(mon2.is(":visible")) {
			mon2.pause();
		}
		if(mon3.is(":visible")) {
			mon3.pause();
		}
		if(mon4.is(":visible")) {
			mon4.pause();
		}
		if(mon5.is(":visible")) {
			mon5.pause();
		}
		if(mon6.is(":visible")) {
			mon6.pause();
		}
		if(mon7.is(":visible")) {
			mon7.pause();
		}
		if(mon8.is(":visible")) {
			mon8.pause();
		}
	}

	function resumeMonster() {
		if(mon1.is(":visible")) {
			mon1.resume();
		}
		if(mon2.is(":visible")) {
			mon2.resume();
		}
		if(mon3.is(":visible")) {
			mon3.resume();
		}
		if(mon4.is(":visible")) {
			mon4.resume();
		}
		if(mon5.is(":visible")) {
			mon5.resume();
		}
		if(mon6.is(":visible")) {
			mon6.resume();
		}
		if(mon7.is(":visible")) {
			mon7.resume();
		}
		if(mon8.is(":visible")) {
			mon8.resume();
		}
	}
/*==============restart function==============*/
	$("#reset").click(function() {
		hideAllMonster();
		$("#status").hide();
		seft.speed = 1000;
		seft.score = 0;
		seft.level = 1;
		removeBloods();
		seft.bloodNum = 0;
		updateScore();
		seft.bomb = 3;
		updateBomb();
		seft.heart = 3;
		updateHeart();
		seft.running = true;
		initMonster();
		update();
	});
	function hideAllMonster() {
		seft.running = false;
		if(mon1.is(":visible")) {
			mon1.stop();
			mon1.hide();
		}
		if(mon2.is(":visible")) {
			mon2.stop();
			mon1.hide();
		}
		if(mon3.is(":visible")) {
			mon3.stop();
			mon1.hide();
		}
		if(mon4.is(":visible")) {
			mon4.stop();
			mon1.hide();
		}
		if(mon5.is(":visible")) {
			mon5.stop();
			mon1.hide();
		}
		if(mon6.is(":visible")) {
			mon6.stop();
			mon1.hide();
		}
		if(mon7.is(":visible")) {
			mon7.stop();
			mon1.hide();
		}
		if(mon8.is(":visible")) {
			mon8.stop();
			mon1.hide();
		}
	}
	function removeBloods() {
		for(i = 1; i <= seft.bloodNum; i++) {
			$("#blood" + i).remove();
		}
	}
}
