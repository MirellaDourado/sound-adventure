class Enemy {
  constructor({ collisionBlocks = [], position, velocity, minimumLimit, maximumLimit }) {
    this.height = 25
    this.width = 25
    this.position = position;

    this.velocity = velocity

    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.gravity = 1
    this.collisionBlocks = collisionBlocks;
    this.minimumLimit = minimumLimit;
    this.maximumLimit = maximumLimit;
  }

  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0.5)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  setCollision(c) {
    this.collisionBlocks = c;
  }

  update(player) {
    this.moveEnemy();
    this.checkForHeroCollisions(player)
    this.applyGravity()
    this.checkForVerticalCollisions()
  }

  moveEnemy() {
    console.log(this.maximumLimit, this.minimumLimit )
    this.position.x += this.velocity.x
    if (this.position.x + this.width >= this.maximumLimit) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.x + this.width <= this.minimumLimit) {
      this.velocity.x = -this.velocity.x;
    }
  }

  checkForHeroCollisions() {
    if (
      player.hitbox.position.x <=
        this.position.x + this.width &&
      player.hitbox.position.x + player.hitbox.width >=
        this.position.x &&
      player.hitbox.position.y + player.hitbox.height >=
        this.position.y &&
      player.hitbox.position.y <=
        this.position.y + this.height
    ) {
      if (player.hitbox.position.x < this.position.x) {
        const offset =
            player.hitbox.position.x - player.position.x + player.hitbox.width
        player.position.x = this.position.x - offset - 0.01;
      }
      if (player.hitbox.position.x > this.position.x) {
        const offset = player.hitbox.position.x - player.position.x
        player.position.x = this.position.x + this.width - offset + 0.01;
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      // if a collision exists
      if (
        this.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >=
          collisionBlock.position.x &&
        this.position.y + this.height >=
          collisionBlock.position.y &&
        this.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.position.y - this.position.y
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0
          const offset =
            this.position.y - this.position.y + this.height
          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }
}