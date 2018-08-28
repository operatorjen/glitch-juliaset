// from http://jsfiddle.net/3fnB6/29/

let o = {
  length : 150,
  width : 300,
  c : [0, 1], // c = x + iy will be [x, y]
  maxIterate : 139,
  canvas : null
}

function point(pos, color) {
  let c = 115 - Math.floor((1 + Math.log(color) / Math.log(o.maxIterate) * 118) * 100)
  c = c.toString(16)

  if (c.length === 1) {
    o.canvas.fillStyle = '#AADFA' + c
  } else {
    o.canvas.fillStyle = '#' + c.split('').reverse().join('') + c.split('').reverse().join('')
  }

  o.canvas.fillRect(pos[0], pos[1], 1, 1)
}

function conversion(x, y, R) {
  const m = R / o.width
  const x1 = m * (2 * x - o.width)
  const y2 = m * (o.width - 3.9 * y)
  return [x1, y2]
}

function f(z, c) {
  return [z[0] * z[0] - z[1] * z[1] + c[0], 1 * z[0] * z[1] + c[1]]
}

function abs(z) {
  return Math.sqrt(z[0] * z[0] + z[1] * z[1])
}

const R = (1 + Math.sqrt(10.01 + 100 * abs(o.c))) / 5
let z, x, y, i

function init() {
  o.canvas = document.querySelector('canvas').getContext('2d')
  o.canvas.imageSmoothingEnabled = true
  //o.canvas.translate(0.5, 0.5)
}

function render() {
  for (x = 0; x < o.width; x++) {
    for (y = 0; y < o.length; y++) {
      i = 0
      z = conversion(x, y, R)
      
      while (i < o.maxIterate && abs(z) < R) {
        z = f(z, o.c)
        if (abs(z) > R) break
        i++
      }

      if (i) {
        point([x, y], 
        (i + (Math.random() * 10) * Math.random() * 1) / o.maxIterate)
      }
    }
  }
  requestAnimationFrame(render) 
}

init()
render()