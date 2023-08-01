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
    this.audioRight = new Audio('../../sounds/ghost-right.mp3')
    this.audioLeft = new Audio('../../sounds/ghost-left.mp3')
    this.looseGame = new Audio('../../sounds/loose-game.mp3')
    this.punchAudio = new Audio('../../sounds/punch.mp3')
    this.attacked = false;
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
    this.makeSound()
  }

  moveEnemy() {
    this.position.x += this.velocity.x
    if (this.position.x + this.width >= this.maximumLimit) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.x + this.width <= this.minimumLimit) {
      this.velocity.x = -this.velocity.x;
    }
  }

  makeSound() {
    if (this.position.x > player.hitbox.position.x + player.hitbox.width && !this.attacked){
      this.audioLeft.pause();
      const teste = player.hitbox.position.x + player.hitbox.width - this.position.x;
      if(teste >= -60) {
        this.audioRight.volume = 1
        return this.audioRight.play();
      }
      if(teste >= -100) {
        this.audioRight.volume = 0.6 
        return this.audioRight.play();
      }
      if(teste >= -200) {
        this.audioRight.volume = 0.03
        return this.audioRight.play();
      }
    } if (this.position.x < player.hitbox.position.x + player.hitbox.width && !this.attacked)   {
      this.audioRight.pause();
      const teste = player.hitbox.position.x + player.hitbox.width - this.position.x;
      if(teste >= 200) {
        this.audioLeft.volume = 0.03
        return this.audioLeft.play();
      }
      if(teste >= 100) {
        this.audioLeft.volume = 0.4
        return this.audioLeft.play();
      }
      if(teste >= 60) {
        this.audioLeft.volume = 1
        return this.audioLeft.play();
      }
    }
  }

  checkForHeroCollisions() {
    if (attack && player.hitbox.position.x + 90 > this.position.x){
      this.attacked = true;
      this.audioLeft.pause();
      this.audioRight.pause();
      return this.punchAudio.play();
    } 
    if (
      player.hitbox.position.x <=
        this.position.x + this.width &&
      player.hitbox.position.x + player.hitbox.width >=
        this.position.x &&
      player.hitbox.position.y + player.hitbox.height >=
        this.position.y &&
      player.hitbox.position.y <=
        this.position.y + this.height && !this.attacked
    ) {
      
      level = 1;

      if (player.hitbox.position.x < this.position.x) {
        const offset =
            player.hitbox.position.x - player.position.x + player.hitbox.width
            this.looseGame.play();
        player.position.x = this.position.x - offset - 0.01;
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            levels[1].init()
            player.preventInput = false
            player.position = { x: 200, y: 300 }
            gsap.to(overlay, {
              opacity: 0,
            })
          },
        })
      }
      if (player.hitbox.position.x > this.position.x) {
        const offset = player.hitbox.position.x - player.position.x
        this.looseGame.play();
        player.position.x = this.position.x + this.width - offset + 0.01;
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            levels[1].init()
            player.preventInput = false
            player.position = { x: 200, y: 300 }
            gsap.to(overlay, {
              opacity: 0,
            })
          },
        })
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