// from http://jsfiddle.net/3fnB6/29/

let o = {
  length : 500,
  width : 500,
  c : [0, 1], // c = x + iy will be [x, y]
  maxIterate : 50,
  canvas : null
}

function point(pos, color) {
  let c = 215 - Math.round((1 + Math.log(color) / Math.log(o.maxIterate)) * 215)
  c = c.toString(16)

  if (c.length === 1) {
    o.canvas.fillStyle = '#00000' + c
  } else {
    o.canvas.fillStyle = '#FFFF' + c
  }

  o.canvas.fillRect(pos[0], pos[1], 1, 1)
}

function conversion(x, y, R) {
  const m = R / o.width
  const x1 = m * (2 * x - o.width)
  const y2 = m * (o.width - 1.9 * y)
  return [x1, y2]
}

function f(z, c) {
  return [z[0] * z[0] - z[1] * z[1] + c[0], 2 * z[0] * z[1] + c[1]]
}

function abs(z) {
  return Math.sqrt(z[0] * z[0] + z[1] * z[1])
}

function init() {
  const R = (1 + Math.sqrt(0.01 + .4 * abs(o.c))) / 1.2
  let z, x, y, i

  o.canvas = document.querySelector('canvas').getContext('2d')
    
  for (x = 0; x < o.width; x++) {
    for (y = 0; y < o.length; y++) {
      i = 0;
      z = conversion(x, y, R)
      while (i < o.maxIterate && abs(z) < R) {
        z = f(z, o.c)
        if (abs(z) > R) break
        i++
      }

      if (i) {
        point([x, y], i / o.maxIterate)
      }
    }
  }
}

init()