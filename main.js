import * as THREE from 'three';
import loadCheckBoard from "./src/Checkboard";
import Pieces from "./src/Pieces";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onElementLoad, textureLoader } from "./src/Loaders";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffddaa, 3);
light.position.set(0, 75, 0);
light.target.position.set(0, 0, 0);
scene.add(light);
scene.add(light.target);

scene.background = 0xffffff;

renderer.setClearColor(0xffffff);

camera.position.set(0, 75, 0);
camera.rotateX(-1.5707953267948966);

function animate() {
    renderer.render(scene, camera);
}

const checkBoard = loadCheckBoard(scene, animate, textureLoader);
new Pieces(0, 0, 0, checkBoard);
new Pieces(1, 0, 1, checkBoard);

window.addEventListener('resize', onWindowResize);


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    animate()
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => animate());
controls.update();

onElementLoad(animate);
