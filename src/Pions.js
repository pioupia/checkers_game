import * as THREE from "three";

export default class Pions {
    /**
     * Allows you to create a pion
     * @param {number} x
     * @param {number} y
     * @param {Mesh} checkboard
     */
    constructor(x, y, checkboard) {
        this.x = x;
        this.y = y;

        this.geometry = new THREE.CylinderGeometry(4, 4, 3, 8);
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

        this.mesh = new THREE.Mesh(this.geometry, material);

        this.mesh.position.x += 5;
        this.mesh.position.z += 5


        checkboard.add(this.mesh);
    }

}