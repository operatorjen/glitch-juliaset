// from http://jsfiddle.net/3fnB6/29/

let o = {
  length : 500,
  width : 900,
  c : [0, 1], // c = x + iy will be [x, y]
  maxIterate : 500,
  canvas : null
}

function point(pos, color) {
  let c = 200 - Math.floor((1 + Math.log(color) / Math.log(o.maxIterate) * 12) * 110)
  c = c.toString(16)

  if (c.length === 1) {
    o.ctx.fillStyle = '#AADFA' + c
  } else {
    o.ctx.fillStyle = '#' + c.split('').reverse().join('') + c
  }

  o.ctx.fillRect(pos[0], pos[1] + 1, 2, 2)
}

function conversion(x, y, R) {
  const m = R / o.width
  const x1 = m * (2 * x - o.width)
  const y2 = m * (o.width - 2.9 * y)
  return [x1, y2]
}

function f(z, c) {
  return [z[0] * z[0] - z[1] * z[1] + c[0], 1 * z[0] * z[1] + c[1]]
}

function abs(z) {
  return Math.sqrt(z[0] * z[0] + z[1] * z[1])
}

const R = 2.0
let z, x = 0, y = 0, i = 0
let currMax = 100
let iterate = 0.1
let count = 0

function init() {
  o.canvas = document.querySelector('canvas')
  o.ctx = o.canvas.getContext('2d')
  o.ctx.imageSmoothingEnabled = true
  o.canvas.width = 900
  o.canvas.height = 500

  //o.canvas.translate(0.5, 0.5)
}

function render() {
  if (x > o.width) {
    x = 0
    y++
  }
  
  if (y > o.length) {
    y = 0
    x++
  }

  z = conversion(x, y, R)
  //console.log(abs(z), R)
  while (i < o.maxIterate && abs(z) < R) {
    z = f(z, o.c)
    if (abs(z) > R) {
      break
    }
    
    i++
  
  }
  x++
  console.log(x, y, i)
  if (i) {
    point([Math.random(), Math.random()], 
    i / o.maxIterate)
  }

  requestAnimationFrame(render) 
}

init()
render()