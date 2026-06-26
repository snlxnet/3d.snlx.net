import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 1, 10000)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

scene.background = new THREE.Color(0xffffff)
const controls = new OrbitControls(camera, renderer.domElement)
camera.position.set(1047, 684, -442)
camera.rotation.set(-3, 0, 2)
const initZ = camera.rotation.z
controls.update()

const loader = new GLTFLoader()
let objects = []
loader.load('imrk.glb', (gltf) => {
  objects = gltf.scene.children
  console.log('loaded', gltf.scene)
  scene.add(gltf.scene)
}, undefined, console.error)

function animate(time) {
  renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)

document.addEventListener("keypress", (event) => {
  if (event.key !== " ") {
    return
  }

  const code = `camera.position.set(${fmt(camera.position)})\ncamera.rotation.set(${fmt(camera.rotation)})`

  navigator.clipboard.writeText(code)
  console.log("Coordinates of the camera copied")
})

function fmt(vector) {
  return [vector.x, vector.y, vector.z]
    .map(axis => Math.floor(axis))
    .join(", ")
}
