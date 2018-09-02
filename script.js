// from http://jsfiddle.net/3fnB6/29/

let o = {
  x: 500,
  y: 500,
  z: 500,
  c : [0, 1], // c = x + iy will be [x, y]
  maxIterate : 550,
  canvas : null
}

let hex = 110
let switched = false

function point(pos, color) {
  // let c = 105 - Math.floor((10 + Math.log(color) / Math.log(o.maxIterate) * 11) * 4)
  let c = 145 - Math.floor((0.5 + Math.sin(color * 210) / Math.log(o.maxIterate) * 11) * 30)
  c = c.toString(16)

  if (c.x === 1) {
    o.ctx.fillStyle = '#1' + c
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
 
    o.ctx.fillStyle = '#' + c.split('').reverse().join('') + hex.toString(16) + c

    o.ctx.fillRect(pos[0], pos[1], 0.5, 0.5)
  }
}

function conversion(x, y, R, mult) {
  const m = R / o.x / mult
  const x1 = m * (2 * x - o.x)
  const y2 = m * (o.x - 2 * y)
  return [x1, y2]
}

function f(z, c) {
  return [z[0]*z[0] - z[1] * z[1] + c[0], 2 * z[0] * z[1] + c[1]]
}

function abs(z) {
  return Math.sqrt(z[0] * z[0] + z[1] * z[1])
}

let R = 12.2
let z, x = 0, y = 0, i
let count = 0

function init() {
  o.canvas = document.querySelector('canvas')
  o.ctx = o.canvas.getContext('2d')
  o.ctx.imageSmoothingEnabled = true
  o.canvas.width = o.x
  o.canvas.height = o.y
}

let mult = 1
let flip = false

function render() {
  //R -= 0.00005
  for (let j = 0; j < 5010; j++) {
    x = Math.random() * o.x
    y = Math.random() * o.y

    i = 0
    z = conversion(x, y, R, mult)
    
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
        //R = 15
      } else {
        mult += 0.05 
      }
    }
    
    if (count >= 1700000) {
      flip = !flip
      count = 0
    }
    
    if (i) {
      point([x, y], i / o.maxIterate)
    }
  }

  requestAnimationFrame(render) 
}

init()
render()