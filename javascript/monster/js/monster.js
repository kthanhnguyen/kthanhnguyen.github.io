function Monster(avatar, size, x, y, directionX, directionY, reverse) {
	this.avatar = avatar;
	this.size = size;

	this.startX = x;
	this.startY = y;

	this.currentX = this.startX;
	this.currentY = this.startY;

	this.directionX = directionX;
	this.directionY = directionY;

	// number of reversals
	this.reverse = reverse;

	// Check exist
	this.exist = true;
}

Monster.prototype.update = function(speed, distance, layout) {
	if (this.currentX + this.size < 0 || this.currentX > layout.width ||
			this.currentY + this.size < 0 || this.currentY > layout.height) {
		this.exist = false
		return;
	}

	if (this.reverse > 0) {
		if (Math.abs(this.currentX - this.startX) >= Math.abs(this.directionX * distance) &&
				Math.abs(this.currentY - this.startY) >= Math.abs(this.directionY * distance)) {

			this.startX = this.currentX;
			this.startY = this.currentY;

			this.directionX = -this.directionX;
			this.directionY = -this.directionY;

			this.reverse--;
		}
	}
	this.currentX += this.directionX * speed;
	this.currentY += this.directionY * speed;
}