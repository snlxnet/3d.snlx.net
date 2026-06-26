import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geo = new THREE.BoxGeometry(1, 1, 1)
const mat = new THREE.MeshBasicMaterial({color: 0x00ff00})
const cube = new THREE.Mesh(geo, mat)
scene.add(cube)
camera.position.z = 2
camera.position.y = -5
camera.rotation.x = deg(80)

function animate(time) {
  cube.rotation.z = time / 1000
  renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)

function deg(rad) {
  return rad*Math.PI/180
}
