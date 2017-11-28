//Declare Main Canvas
mainCanvas = document.getElementById("main_canvas");
ctx = mainCanvas.getContext("2d");
//Declare Header Canvas
headerCanvas = document.getElementById("header_canvas");
ctxHeader = headerCanvas.getContext("2d");

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//Main Background
var bgImage = new Image();
bgImage.src = "images/background.jpg";
//Header Background
var bgHeaderImage = new Image();
bgHeaderImage.src = "images/headerbg.png";

//Header Pause
var pauseImage = new Image();
pauseImage.src = "images/pause.png";
//Header Reset
var resetImage = new Image();
resetImage.src = "images/reset.png";
//Header Bomb
var bombImage = new Image();
bombImage.src = "images/bomb.png";
//Header Heart
var heartImage = new Image();
heartImage.src = "images/heart.png";
//blood
var bloodImage = new Image();
bloodImage.src = "images/blood.png";

var Game = function() {
	this.end;
	this.running;

	this.score;
	this.heart;
	this.boom;
	this.level;
	this.speed;
	this.distance;
	this.monsters = new Array();
	this.arrSrcMonster = new Array();
	this.sizeMonster;
	this.arrPointMonster = new Array();
	this.bloods = new Array();
	this.sizeBlood;

	let seft = this;

	/* Method */
	this.init = function() {
		this.end = false;
		this.running = true;

		this.score = 0;
		this.heart = 3;
		this.boom = 3;
		this.level = 1;
		this.speed = 1;
		this.monsters.splice(0, this.monsters.length);
		this.arrSrcMonster = getArrSrcMonster();
		this.sizeMonster = 90;
		this.arrPointMonster = getArrPointMonster();
		this.distance = 250;
		this.bloods.splice(0, this.bloods.length);
		this.sizeBlood = 80;
	}

	this.newMonster = function() {
		if (seft.running) {
			var monster = randomMonster();
			seft.monsters.push(monster);
		}
	}

	function randomMonster() {
		var avatar = new Image();
		avatar.src = seft.arrSrcMonster[Math.floor(Math.random() * seft.arrSrcMonster.length)];

		/* Starting point */
		var iPoint = Math.floor(Math.random() * seft.arrPointMonster.length);
		var x = seft.arrPointMonster[iPoint].x;
		var y = seft.arrPointMonster[iPoint].y;

		/* direction move */
		var directionX = 1;
		var directionY = 1;
		// center: move freely
		if ((x === (mainCanvas.width - seft.sizeMonster) / 2) && (y === (mainCanvas.height - seft.sizeMonster) / 2)) {
			 while(directionX === 0 && directionY === 0); { // x and y are equal to 0 -> reset
				directionX = Math.floor(Math.random() * 3 - 1);							// -1, 0, 1
				directionY = Math.floor(Math.random() * 3 - 1);							// -1, 0, 1
			}
		// border case
		} else {
			if (x >= (mainCanvas.width - seft.sizeMonster) / 2) {
				directionX = (x === (mainCanvas.width - seft.sizeMonster) / 2) ? 0 : -1;
			}
			if (y >= (mainCanvas.height - seft.sizeMonster) / 2) {
				directionY = (y === (mainCanvas.height - seft.sizeMonster) / 2) ? 0 : -1;
			}
		}

		/* Nếu là Monster trung tâm thì không cần đảo hướng. Ngược lại, đảo hướng 1 lần */
		var reverse = ((x === (mainCanvas.width - seft.sizeMonster) / 2) &&
									(y === (mainCanvas.height - seft.sizeMonster) / 2))
									? 0 : 1;

		return new Monster(avatar, seft.sizeMonster, x, y, directionX, directionY, reverse);
	}

	function getArrSrcMonster() {
		var arrSrc = new Array();
		var dir = "images/monster/";
		for (let i = 1; i <= 9; i++) {
			arrSrc.push(dir + i + ".png");
		}
		return arrSrc;
	}

	/* create array 9 position monster entry */
	function getArrPointMonster() {
		var arrPoint = new Array();
		for (let jY = 0; jY <= mainCanvas.height - seft.sizeMonster; jY += (mainCanvas.height - seft.sizeMonster) / 2) {
			for (let iX = 0; iX <= mainCanvas.width - seft.sizeMonster; iX += (mainCanvas.width - seft.sizeMonster) / 2) {
				arrPoint.push({ x: iX, y: jY });
			}
		}
		return arrPoint;
	}

	this.start = function() {
		if (!seft.end) {
			if (seft.heart <= 0 || seft.score < 0) {
				gameOver();
			} else if (seft.running) {
				seft.display();
				seft.process();
			}
		}
		requestAnimationFrame(seft.start);
	}

	function gameOver() {
		drawHeader();
		drawMain();
		seft.end = true;
		seft.running = false;
		ctx.fillStyle = "#F1F1F1";
		ctx.font = "30px Arial"
		ctx.fillText("SCORE: " + seft.score, 160, 160);
		ctx.fillText("GAME OVER", 150, 200);
	}

	this.display = function() {
		drawHeader();
		drawMain();
	}

	function drawHeader() {
	    ctxHeader.drawImage(bgHeaderImage, 0, 0);
		ctxHeader.fillStyle = "#F1F1F1";
	    ctxHeader.font = "15pt Arial";
		ctxHeader.fillText("SCORE: " + seft.score, 15, 25);
		ctxHeader.fillText("LEVEL: " + seft.level, 150, 25);
		ctxHeader.drawImage(pauseImage, 10, 50, 45, 45);
		ctxHeader.drawImage(resetImage, 60, 50, 45, 45);
		ctxHeader.fillText(seft.boom,435, 80);
		ctxHeader.drawImage(bombImage, 450, 50, 40, 40);

		var xHeart = 280;
		for(hi = 1; hi <= seft.heart; hi++) {
			ctxHeader.drawImage(heartImage, xHeart, 5, 30, 30);
				xHeart += 34;
		}
	}

	function drawMain() {
		ctx.drawImage(bgImage, 0, 0);

		// Draw bloods
		for(let iBlood = 0; iBlood < seft.bloods.length; iBlood++){
			if(seft.bloods.length < 6){
				ctx.drawImage(bloodImage, seft.bloods[iBlood].x, seft.bloods[iBlood].y, seft.sizeBlood, seft.sizeBlood);
			}
			else {
				seft.bloods.splice(iBlood, 1);
				continue;
			}
		}

		// Draw monsters
		seft.monsters.forEach(function(ele) {
			ctx.drawImage(ele.avatar, ele.currentX, ele.currentY, ele.size, ele.size);
		});
	}

	this.process = function() {
		updateMonsters();
		updateLevel();
	}

	/* Update monsters */
	function updateMonsters() {
		let iMon = 0;
		while (iMon < seft.monsters.length) {
			seft.monsters[iMon].update(seft.speed, seft.distance, mainCanvas);
			if (!seft.monsters[iMon].exist) {
				seft.heart--;
				seft.score--;
				seft.monsters.splice(iMon, 1);
				continue;
			}
			iMon++;
		}
	}

	/* Update level */
	function updateLevel() {
		if (seft.level <= Math.floor(seft.score / 100)) {
			if (seft.heart < 5) {
				seft.heart++;
			}

			if (seft.level < 10) {
				var level_old = seft.level;
				seft.level = Math.floor(seft.score / 100) + 1;
				if (seft.level > level_old) {
					seft.speed += .5;
				}
			}
		}
	}

	this.addEventClick = function() {
		headerClick();
		mainClick();
	}

	function headerClick() {
		headerCanvas.addEventListener("click", function(e) {
			let xPosition = e.pageX - this.offsetLeft;
			let yPosition = e.pageY - this.offsetTop;

			if (!seft.end)	{
				if ((xPosition >= 450 && xPosition <= 490) && (yPosition >= 50 && yPosition <= 90)) {
					if (seft.running && (seft.boom > 0)) {
						seft.score += seft.monsters.length * 10;
						while (seft.monsters.length != 0) {
							seft.bloods.push({ x: seft.monsters[0].currentX, y: seft.monsters[0].currentY,
																timeDie: Date.now() });
							seft.monsters.splice(0, 1);
						}
						seft.boom--;
					}
				}

				if ((xPosition >= 10 && xPosition <= 55) && (yPosition >= 50. && yPosition <= 95)) {
					seft.running = !seft.running;
				}
			}

			if ((xPosition >= 60 && xPosition <= 105) && (yPosition >= 50 && yPosition <= 95)) {
				seft.init();
			}
		});
	}

	function mainClick() {
		mainCanvas.addEventListener("click", function(e) {
			if (seft.running) {
				let xPosition = e.pageX - this.offsetLeft;
				let yPosition = e.pageY - this.offsetTop;

				var target = -1;
				seft.monsters.forEach(function(element) {
					if ((xPosition >= element.currentX && xPosition <= element.currentX + element.size) &&
							(yPosition >= element.currentY && yPosition <= element.currentY + element.size)) {
						target = seft.monsters.indexOf(element);
						seft.monsters[target].exist = false;
					}
				});

				if (target != -1) {
					seft.score += 10;
					seft.bloods.push({ x: seft.monsters[target].currentX, y: seft.monsters[target].currentY});
					seft.monsters.splice(target, 1);
				} else {
					seft.score = (seft.score >= 5) ? seft.score - 5 : 0;
					seft.heart--;
				}
			}
		});
	}
}