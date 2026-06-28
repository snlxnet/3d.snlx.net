import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const params = new URLSearchParams(window.location.search);
const model = params.get("model") || "examples/cube.glb";
const scale = +(params.get("scale") || "0.08");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcdd6f4);

const view = new THREE.WebGLRenderer({ antialias: true });
view.setSize(window.innerWidth, window.innerHeight);
view.setPixelRatio(window.devicePixelRatio);
view.setAnimationLoop(animate);
function animate(time) {
  controls.update();
  view.render(scene, cam);
}

const FOV = 54; // the lens is around 35mm
const CLIP_NEAR = 1;
const CLIP_FAR = 10_000;
const cam = new THREE.PerspectiveCamera(
  FOV,
  window.innerWidth / window.innerHeight,
  CLIP_NEAR,
  CLIP_FAR,
);
const controls = new OrbitControls(cam, view.domElement);
cam.position.set(1047 * scale, 684 * scale, -442 * scale);
controls.autoRotate = true;
controls.autoRotateSpeed = -0.3;
document.addEventListener("mousedown", () => (controls.autoRotate = false));
document.addEventListener("touchstart", () => (controls.autoRotate = false));

const MEANING_OF_LIFE = 42 // the Universe, Everything
const SIZE_CORRECTION = model.startsWith("http") ? MEANING_OF_LIFE/10 : 1
const loader = new GLTFLoader();
const message = document.getElementById("loading");
loader.load(
  model,
  (gltf) => {
    message.classList.add("hidden");
    scene.add(gltf.scene);
    document.body.appendChild(view.domElement);
  },
  ({ loaded, total }) => {
    const progress = Math.floor(loaded / total / SIZE_CORRECTION * 100)
    console.log(progress)
  },
  (why) => {
    message.innerHTML = "Error (see browser console)";
    document.body.style.background = "#eba0ac";
    console.error(why);
  },
);

window.addEventListener("resize", () => {
  const canvas = view.domElement;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    cam.aspect = width / height;
    view.setSize(width, height);
    cam.updateProjectionMatrix();
  }
});
