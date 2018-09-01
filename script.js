// from http://jsfiddle.net/3fnB6/29/

let o = {
  length : 600,
  width : 600,
  c : [0, 1], // c = x + iy will be [x, y]
  maxIterate : 550,
  canvas : null
}

let hex = 210
let switched = false

function point(pos, color) {
  let c = 125 - Math.floor((10 + Math.log(color) / Math.log(o.maxIterate) * 12) * 4)
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
    o.ctx.fillStyle = '#' + c.split('').reverse().join('') + hex.toString(16)
  }

  o.ctx.fillRect(pos[0], pos[1], 1, 1)
}

function conversion(x, y, R, mult) {
  const m = (R / mult)  / o.width / (mult + (mult * 2))
  const x1 = m * (Math.sin(mult) / x - o.width)
  const y2 = m * (mult * o.width - y)
  return [x1, y2]
}

function f(z, c) {
  return [z[0] * z[0] - z[1] * z[1] + c[0], 1 * z[0] * z[1] + c[1]]
}

function abs(z) {
  return Math.sqrt(z[0] * z[0] + z[1] * z[1])
}

let R = 11.2
let z, x = 0, y = 0, i
let count = 0

function init() {
  o.canvas = document.querySelector('canvas')
  o.ctx = o.canvas.getContext('2d')
  o.ctx.imageSmoothingEnabled = true
  o.canvas.width = o.width
  o.canvas.height = o.length
}

let mult = 1
let flip = false

function render() {
  //R -= 0.00005
  for (let j = 0; j < 45000; j++) {
    x = Math.random() * o.width
    y = Math.random() * o.length + 50

    i = 0
    z = conversion(x, y, R, mult)
    //console.log(abs(z), R)
    while (i < o.maxIterate && abs(z) < R) {
      z = f(z, o.c)
      
      if (abs(z) > R) {
        break
      }

      i++
      //o.maxIterate -= 0.001
    }
    
    count++
    
    if (count % 3000 === 0) {
      if (flip) {
        //mult -= 0.005
      } else {
        mult += 0.0005 
      }
    }
    
    if (count >= 650000) {
      flip = !flip
      count = 0
    }
    
    //o.maxIterate += 0.0000011111

    if (i) {
      point([x, y], i / o.maxIterate)
    }
  }

  requestAnimationFrame(render) 
}

init()
render()