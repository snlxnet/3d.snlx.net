import * as THREE from 'three'
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// scene.background = new THREE.Color(0x181825)

const geo = new THREE.BoxGeometry(1, 1, 1)
const mat = new THREE.MeshToonMaterial({color: 0xfab387})
const cube = new THREE.Mesh(geo, mat)
scene.add(cube)
camera.position.z = 2
camera.position.y = -5
camera.rotation.x = deg(80)

const light = new THREE.DirectionalLight(0xffffff, 3)
light.position.set(0, -4, 2)
scene.add(light)

const effect = new OutlineEffect(renderer)
function animate(time) {
  cube.rotation.z = time / 1000
  effect.render(scene, camera)
}
renderer.setAnimationLoop(animate)

function deg(rad) {
  return rad*Math.PI/180
}
