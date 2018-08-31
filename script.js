// from http://jsfiddle.net/3fnB6/29/

let o = {
  length : 600,
  width : 600,
  c : [0, 1], // c = x + iy will be [x, y]
  maxIterate : 550,
  canvas : null
}

let hex = 110
let switched = false

function point(pos, color) {
  let c = 110 - Math.floor((1 + Math.log(color) / Math.log(o.maxIterate) * 10) * 210)
  c = c.toString(16)

  if (c.length === 1) {
    o.ctx.fillStyle = '#AADFA' + c
  } else {
    if (switched) {
      hex--
    } else {
      hex++
    }
    
    if (hex > 255) {
      switched = true
    }
          
    if (hex < 10) {
      switched = false      
    }
    o.ctx.fillStyle = '#' + c + parseInt(hex, 16)
  }

  o.ctx.fillRect(pos[0], pos[1], 1, 1)
}

function conversion(x, y, R) {
  const m = R / o.width
  const x1 = m * (4.2 * x - 2.1 * o.width)
  const y2 = m * (o.width - 2.1 * y)
  return [x1, y2]
}

function f(z, c) {
  return [z[0] * z[0] - z[1] * z[1] + c[0], 1 * z[0] * z[1] + c[1]]
}

function abs(z) {
  return Math.sqrt(z[0] * z[0] + z[1] * z[1])
}

let R = 1.2
let z, x = 0, y = 0, i
let count = 0

function init() {
  o.canvas = document.querySelector('canvas')
  o.ctx = o.canvas.getContext('2d')
  o.ctx.imageSmoothingEnabled = true
  o.canvas.width = o.width
  o.canvas.height = o.length

  //o.ctx.translate(0.5, 0.5)
}

function render() {
  R += 0.005
  for (let j = 0; j < 2050; j++) {
    x = Math.random() * o.width
    y = Math.random() * o.length
    //R -= 0.0001

    i = 0
    z = conversion(x, y, R)
    //console.log(abs(z), R)
    while (i < o.maxIterate && abs(z) < R) {
      z = f(z, o.c)
      
      if (abs(z) > R) {
        break
      }

      i++
      //o.maxIterate -= 0.001
    }
    
    //o.maxIterate += 0.0000111111

    if (i) {
      point([x, y], i / o.maxIterate)
    }
  }

  requestAnimationFrame(render) 
}

init()
render()