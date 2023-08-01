Array.prototype.parse2D = function () {
  const rows = []
  for (let i = 0; i < this.length; i += 16) {
    rows.push(this.slice(i, i + 16))
  }

  return rows
}

Array.prototype.createObjectsFrom2D = function () {
  const objects = []
  this.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 292 || symbol === 250) {
        // push a new collision into collisionblocks array
        objects.push(
          new CollisionBlock({
            position: {
              x: x * 64,
              y: y * 64,
            },
          })
        )
      }
    })
  })

  return objects
}

Array.prototype.drawEnemies = function () {
  const obj = []
  this.forEach(({ position, velocity, maximumLimit, minimumLimit }) => { 
    obj.push(
      new Enemy({ position: {y: position.y, x: position.x}, velocity: {y:velocity.y, x:velocity.x}, maximumLimit, minimumLimit })
    )
  })
  return obj;
}