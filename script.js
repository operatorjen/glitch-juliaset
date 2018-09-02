// from http://jsfiddle.net/3fnB6/29/

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: false,
  alpha: false
})

renderer.setSize(window.innerWidth, window.innerHeight)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

const orbit = new THREE.OrbitControls(camera, renderer.domElement)
orbit.autoRotate = true
//orbit.rotateSpeed = 30
orbit.enableZoom = true

const light = new THREE.AmbientLight(0x404040)
scene.add(light)

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
let geometry, material, mesh

function point(pos, color, mult) {
  // let c = 105 - Math.floor((10 + Math.log(color) / Math.log(o.maxIterate) * 11) * 4)
  let c = 215 - Math.floor((0.5 + Math.sin(color * 210) / Math.log(o.maxIterate) * 11) * 30)
  c = c.toString(16)
 // console.log(c)
  if (c.x === 1) {
 //   o.ctx.fillStyle = '#1111' + c
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
    
    geometry = new THREE.PlaneGeometry(10, 10, 10) 
    material = new THREE.MeshBasicMaterial({
      color: '#2d' + c.split('').reverse().join('') + hex.toString(16),
      side: THREE.DoubleSide
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = pos[0]
    mesh.position.y = pos[1]
    mesh.position.z = pos[2
                        
    scene.add(new THREE.Mesh(geometry, material))
/*
    geometry = new THREE.PlaneGeometry(10, 10, 10)
  //  console.log('5a', c.split('').reverse().join('') + hex.toString(16))
    material = new THREE.MeshBasicMaterial({
      color: '#fd' + c.split('').reverse().join('') + hex.toString(16),
      side: THREE.DoubleSide
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = pos[0]
    mesh.position.y = pos[1]
    mesh.position.z = pos[2][1]
    
    geometry.merge(mesh.geometry, mesh.matrix)
    scene.add(mesh)
    */
   // o.ctx.fillStyle = '#' + c.split('').reverse().join('') + hex.toString(16)
  }
  //pos[0], pos[1], pos[2])
}

function conversion(x, y, z, R, mult) {
  const m = R / o.x / mult
  const x1 = m * (2 * x - o.x)
  const y2 = m * (o.x - 2 * y)
  const z3 = m * (2 * y - z)
  return [x1, y2, z3]
}

function f(z, c) {
  return [z[0] * z[0] + z[1] * z[1] + c[0] - z[1], 
          z[0] * z[1] - c[1],
          z[0] * z[2] - c[2]]
}

function abs(z) {
  return Math.sqrt(z[0] * z[0] + z[1] * z[1] + z[2] * z[2])
}

let R = 11.2
let z, w, x = 0, y = 0, i
let count = 0

function init() {
  /*
  o.canvas = document.querySelector('canvas')
  o.ctx = o.canvas.getContext('2d')
  o.ctx.imageSmoothingEnabled = true
  o.canvas.width = o.width
  o.canvas.height = o.length
  */
 // renderer.autoClearColor = false
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff, 0)
  document.body.appendChild(renderer.domElement)
  scene.add(camera)
}

let mult = 1
let flip = false

function render() {
  R -= 0.00005
  orbit.update()
  for (let j = 0; j < 510; j++) {
  
    x = Math.random() * o.x
    y = Math.random() * o.y
    z = Math.random() * o.z

    i = 0
    w = conversion(x, y, z, R, mult)
    
    while (i < o.maxIterate && abs(w) < (R * 1000)) {
      w = f(w, o.c)
      
      if (abs(w) > R) {
        break
      }

      i++
    }

    if (i) {
      point([x, y, z, w], i / o.maxIterate, mult)
    }
  
  }
  
 // point([10, 10, [10, 0]], 0.00410)
  orbit.target.set(camera.position.x + 5, y, 1, w)
  scene.position.z++
  renderer.render(scene, camera)
  window.requestAnimationFrame(render)
}

window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight)
}

init()
render()