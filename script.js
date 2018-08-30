// from http://jsfiddle.net/3fnB6/29/

let o = {
  length : 500,
  width : 900,
  c : [0, 1], // c = x + iy will be [x, y]
  maxIterate : 50,
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

  o.ctx.fillRect(pos[0], pos[1] + 1, 12, 12)
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
let z, x = 1, y = 1, i = 1
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
  if (y > o.length) {
    x ++ 
    y = 1
  }
  
  if (x > o.width) {
    x = 1 
  }
    
  z = conversion(x, y, R)
  //console.log(abs(z), R)
  while (i < o.maxIterate && abs(z) > R) {
    z = f(z, o.c)
    if (abs(z) > R) {
      break
    }
    
    i++
  }

  console.log(x, y, i)
  if (i) {
    point([x, y], 
    i / o.maxIterate)
  }
  
  y++

  setTimeout(() => {
    requestAnimationFrame(render)
  }, 0.05)
}

init()
render()