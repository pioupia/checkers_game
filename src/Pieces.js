import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
loader.setDRACOLoader(dracoLoader);

export default class Pieces {
    /**
     * Allows you to create a pion
     * @param {number} x
     * @param {number} y
     * @param {Mesh} checkboard
     */
    constructor(x, y, checkboard) {
        this.x = x;
        this.y = y;

        loader.load('/pieces.glb', function (gltf) {
            gltf.scene.position.x += 5;
            gltf.scene.position.z += 5;
            gltf.scene.position.y += 1;

            checkboard.add(gltf.scene);
        }, null, err => {
            console.error(err);
        });

        /*this.geometry = new THREE.CylinderGeometry(4, 4, 2, 8);
        const material = new THREE.MeshBasicMaterial({ color: 0xfac98c });

        this.mesh = new THREE.Mesh(this.geometry, material);

        this.mesh.position.x += 5;
        this.mesh.position.z += 5;
        this.mesh.position.y += 1;*/

        // White color: #fac98c
        // Black color: #60463f


        // checkboard.add(this.mesh);
    }

}