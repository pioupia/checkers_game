import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

scene.background = 0xffffff;

renderer.setClearColor(0xffffff);

camera.position.set(0, 15, 0);
camera.rotateX(-1.5707953267948966);

const loader = new GLTFLoader();

let obj = null;

loader.load('/plateau.glb', function (gltf) {
    scene.add(gltf.scene);
    obj = gltf.scene;
    animate()
}, undefined, function (error) {
    console.error(error);
});

function animate() {
    renderer.render(scene, camera);

    if (obj) {
        console.log(camera, obj)
    }
}

animate();

window.addEventListener('resize', onWindowResize);


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    animate()
}