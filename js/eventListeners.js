const rightStep = new Audio('../sounds/right-step.mp3')
const leftStep = new Audio('../sounds/left-step.mp3')

window.addEventListener('keydown', (event) => {
  if (player.preventInput) return
  switch (event.key) {
    case 'ArrowUp':
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i]
        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.rightAudio.pause();
          player.leftAudio.pause()
          const doorAudio = new Audio('./sounds/open-door.mp3');
          doorAudio.play()
          player.velocity.x = 0
          player.velocity.y = 0
          player.preventInput = true
          player.switchSprite('enterDoor')
          door.play()
          return
        }
      }
      if (player.velocity.y === 0) {
        const audio = new Audio('./sounds/jump.mp3');
        audio.play()
        player.velocity.y = -25
      }
      break
    case 'ArrowLeft':
      leftStep.play();
      leftStep.volume = 1
      keys.ArrowLeft.pressed = true
      break
    case 'ArrowRight':
      rightStep.play()
      keys.ArrowRight.pressed = true
      break
      case ' ': 
      attack = true;
      break;
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
  }
})