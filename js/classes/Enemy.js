class Enemy {
  constructor({ collisionBlocks = [] }) {
    this.height = 25
    this.width = 25
    this.position = {
      x: 470,
      y: 220,
    }

    this.velocity = {
      x: 2,
      y: 0,
    }

    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.gravity = 1
    this.collisionBlocks = collisionBlocks;
  }

  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0.5)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update(player) {
    this.moveEnemy();
    this.checkForHeroCollisions(player)
    this.applyGravity()
  //   this.updateHitbox()
    this.checkForVerticalCollisions()
    

  }

  moveEnemy() {
    this.position.x += this.velocity.x
    if (this.position.x + this.width >= 630) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.x + this.width <= 470) {
      this.velocity.x = -this.velocity.x;
    }
  }

  checkForHeroCollisions(player) {
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