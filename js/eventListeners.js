const doorAudio = new Audio('./sounds/open-door.mp3');


window.addEventListener('keydown', (event) => {
  if (player.preventInput) return
  switch (event.key) {
    case 'w':
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i]

        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0
          player.velocity.y = 0
          player.preventInput = true
          player.switchSprite('enterDoor')
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioCtx.createMediaElementSource(doorAudio);
          const panNode = audioCtx.createStereoPanner();
          source.connect(panNode);
          panNode.connect(audioCtx.destination);
          doorAudio.play()
          door.play()
          return
        }
      }
      if (player.velocity.y === 0) {
        const audio = new Audio('./sounds/jump.mp3');
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaElementSource(audio);
        const panNode = audioCtx.createStereoPanner();
        source.connect(panNode);
        panNode.connect(audioCtx.destination);
        audio.play()
        player.velocity.y = -25
      }
      break
    case 'a':
      // move player to the left
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      keys.a.pressed = true
      break
    case 'd':
      // move player to the right
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      keys.d.pressed = true
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a':
      // move player to the left
      keys.a.pressed = false

      break
    case 'd':
      // move player to the right
      keys.d.pressed = false

      break
  }
})