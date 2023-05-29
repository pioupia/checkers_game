import { loadObject } from "./Loaders";
import * as THREE from "three";

export default class Pieces {
    /**
     * Allows you to create a pion
     * @param {number} x
     * @param {number} y
     * @param {0|1} color
     * @param {Mesh} checkboard
     */
    constructor(x, y, color, checkboard) {
        this.x = x;
        this.y = y;

        this.color = color ? 0xdcdeaf : 0x424242;
        this.scene = checkboard;

        loadObject('/pieces.glb', gltf => this.#onLoaded(gltf));
    }

    async #onLoaded(obj) {
        this.mesh = obj;

        this.mesh.position.x += this.x * 10 + 1;
        this.mesh.position.z += this.y * 10 + 5.5;
        this.mesh.position.y += 0;

        this.mesh.scale.x = 4;
        this.mesh.scale.z = 4;

        this.mesh.children.forEach(node => {
            if (!node.isMesh) return;
            node.material.color.set(
                this.color
            );
        });

        this.scene.add(this.mesh);
    }

}