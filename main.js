import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

scene.background = new THREE.Color(0x181825)
const controls = new OrbitControls(camera, renderer.domElement)
camera.position.set(0, -5, 5)
camera.rotation.x = deg(45)
controls.update()

const loader = new GLTFLoader()
loader.load('cube.glb', (gltf) => {
  gltf.scene.children[0].material = new THREE.MeshBasicMaterial({color: 0xffffff})
  console.log('loaded', gltf.scene)
  scene.add(gltf.scene)
}, undefined, console.error)

function animate(time) {
  // cube.rotation.z = time / 1000
  // console.log({p: camera.position, r: camera.rotation})
  renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)

function deg(rad) {
  return rad*Math.PI/180
}
