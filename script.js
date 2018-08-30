// from http://jsfiddle.net/3fnB6/29/

let o = {
  length : 150,
  width : 300,
  c : [0, 1], // c = x + iy will be [x, y]
  maxIterate : 5,
  canvas : null
}

function point(pos, color) {
  let c = 200 - Math.floor((1 + Math.log(color) / Math.log(o.maxIterate) * 12) * 110)
  c = c.toString(16)

  if (c.length === 1) {
    o.canvas.fillStyle = '#AADFA' + c
  } else {
    o.canvas.fillStyle = '#' + c.split('').reverse().join('') + c
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

const R = 2.0
let z, x, y, i
let currMax = 10
let iterate = 0.1
let reverse = false
let count = 0

function init() {
  o.canvas = document.querySelector('canvas').getContext('2d')
  o.canvas.imageSmoothingEnabled = true
  //o.canvas.translate(0.5, 0.5)
}

function render() {
  let x = count
  let y = [count, count + 1, count + 2]
  console.log(x, y)
  i = 0
  z = conversion(x, y, R)

  while (i < o.maxIterate && abs(z) < R) {
    z = f(z, o.c)
    if (abs(z) > R) break
    i++

    if (o.maxIterate > currMax) {
      o.maxIterate = 2
      currMax -= iterate * 10^i
      //iterate += iterate * 10^i
    } else {
      o.maxIterate += iterate
    }

    if (currMax < 2) {
      currMax = 10
    }
  }

  if (i) {
    point([x, y], i / o.maxIterate)
  }
  
  count++
  
  if (count > o.width * o.length) {
    count = 0 
  }
  requestAnimationFrame(render) 
}

init()
render()