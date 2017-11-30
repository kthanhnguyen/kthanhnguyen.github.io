var monster = function(game){
	this.game = game;
	this.pos = null;
	this.speed = 1800;
	this.running = true;

	this.mon1 = $("#mon1");
	this.mon2 = $("#mon2");
	this.mon3 = $("#mon3");
	this.mon4 = $("#mon4");
	this.mon5 = $("#mon5");
	this.mon6 = $("#mon6");
	this.mon7 = $("#mon7");
	this.mon8 = $("#mon8");

	this.initMonster = function(){
		this.monster1 = new monsterPosition(0, 0, 0, 0, 100, 100, true);
		this.monster2 = new monsterPosition(200, 0, 200, 0, 200, 100, false);
		this.monster3 = new monsterPosition(400, 0, 400, 0, 300, 100, false);
		this.monster4 = new monsterPosition(0, 200, 0, 200, 100, 200, false);
		this.monster5 = new monsterPosition(400, 200, 400, 200, 300, 200, false);
		this.monster6 = new monsterPosition(0, 400, 0, 400, 100, 300, false);
		this.monster7 = new monsterPosition(200, 400, 200, 400, 200, 300, false);
		this.monster8 = new monsterPosition(400, 400, 400, 400, 300, 300, false);

		//add monster's position when create to array and random it.
		let mon_pos = [this.monster1, this.monster2, this.monster3, this.monster4,
		this.monster5, this.monster6, this.monster7, this.monster8];

		//random monster's position when creat monster.
		//this.pos = mon_pos[this.getRandom(0, 7)];
	}


	//update the monster's position when it move
	this.update = function() {
		// if (!this.pos.visible) {
		// 	//this.pos.show();
		// 	this.pos.moveMonster(this.pos, mon1);
		// }
		this.pos = Math.floor((Math.random() * 8) + 1);
		switch(this.pos) {
		case 1:
		if(!mon1.visible) {
			this.mon1.show();
			this.moveMonster(this.mon1, this.monster1);
		}
		break;
		case 2:
		if(!mon2.visible) {
			this.mon2.show();
			this.moveMonster(this.mon2, this.monster2);
		}
		break;
		case 3:
		if(!mon3.visible) {
			this.mon3.show();
			this.moveMonster(this.mon3, this.monster3);
		}
		break;
		case 4:
		if(!mon4.visible) {
			this.mon4.show();
			this.moveMonster(this.mon4, this.monster4);
		}
		break;
		case 5:
		if(!mon5.visible) {
			this.mon5.show();
			this.moveMonster(this.mon5, this.monster5);
		}
		break;
		case 6:
		if(!mon6.visible) {
			this.mon6.show();
			this.moveMonster(this.mon6, this.monster6);
		}
		break;
		case 7:
		if(!mon7.visible) {
			this.mon7.show();
			this.moveMonster(this.mon7, this.monster7);
		}
		break;
		case 8:
		if(!mon8.visible) {
			this.mon8.show();
			this.moveMonster(this.mon8, this.monster8);
		}
		break;
	}
	}

	function monsterPosition (initX, initY ,x, y, toX, toY, visible){
		this.initX = initX;
		this.initY = initY;

		this.x = x;
		this.y = y;

		this.toX = toX;
		this.toY = toY;

		this.visible = visible;
	}

	this.moveMonster = function(monster, monsterProp) {
		monster.css({
			"left" : monsterProp.initX,
			"top" : monsterProp.initY
		});
		if(monster !== mon1) {
			monster.hide();
		}

		if(this.running) {
			monster.animate({
				"left" : monsterProp.toX,
				"top" : monsterProp.toY,
			}, this.speed, function() {
				monster.animate({
					"left" :monsterProp.initX,
					"top" : monsterProp.initY
				}, this.speed, function() {
					monster.hide();
					this.update();
					// randomMonster();
				});
			});
		}
	}
}




