// from http://jsfiddle.net/3fnB6/29/

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: false,
  alpha: true
})

renderer.setSize(window.innerWidth, window.innerHeight)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

const orbit = new THREE.OrbitControls(camera, renderer.domElement)
orbit.autoRotate = true
//orbit.rotateSpeed = 30
orbit.enableZoom = true

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
let geometry, material

function point(pos, color) {
  // let c = 105 - Math.floor((10 + Math.log(color) / Math.log(o.maxIterate) * 11) * 4)
  let c = 115 - Math.floor((0.5 + Math.sin(color * 210) / Math.log(o.maxIterate) * 11) * 30)
  c = c.toString(16)

  if (c.x === 1) {
 //   o.ctx.fillStyle = '#1111' + c
  } else {
  /*  if (switched) {
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
    */
    geometry = new THREE.BoxGeometry(10, 10, 10)
  //  console.log('5a', c.split('').reverse().join('') + hex.toString(16))
    material = new THREE.MeshBasicMaterial({
      color: '#2d' + c.split('').reverse().join('') + hex.toString(16)
    })
    let cube = new THREE.Mesh(geometry, material)
    cube.position.x = pos[0]
    cube.position.y = pos[1]
    cube.p
    scene.add(cube)
    console.log(cube)
   // o.ctx.fillStyle = '#' + c.split('').reverse().join('') + hex.toString(16)
  }
  //pos[0], pos[1], pos[2])
}

function conversion(x, y, R, mult) {
  const m = R / o.x / mult
  const x1 = m * (2 * x - o.x)
  const y2 = m * (o.x - 2 * y)
  return [x1, y2]
}

function f(z, c) {
  return [z[0] * z[0] + z[1] * z[1] + c[0] - z[1], z[0] * z[1] - c[1]]
}

function abs(z) {
  return Math.sqrt(z[0] * z[0] + z[1] * z[1])
}

let R = 2.2
let z, x = 0, y = 0, i
let count = 0

function init() {
  /*
  o.canvas = document.querySelector('canvas')
  o.ctx = o.canvas.getContext('2d')
  o.ctx.imageSmoothingEnabled = true
  o.canvas.width = o.width
  o.canvas.height = o.length
  */
  renderer.autoClearColor = false
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff, 0)
  document.body.appendChild(renderer.domElement)
  scene.add(camera)
}

let mult = 1
let flip = false

function render() {
  //R -= 0.00005
  orbit.update()
 // for (let j = 0; j < 10; j++) {
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
      console.log(i)
    }
    
    count++
    
    if (count % 4000 === 0) {
      if (flip) {
        //mult -= 0.005
        //R = 15
      } else {
        mult += 0.0005 
      }
    }
    
    if (count >= 1700000) {
      flip = !flip
      count = 0
    }
    
    if (i) {
      point([x, y], i / o.maxIterate)
    }
 // }

  requestAnimationFrame(render) 
}

init()
render()