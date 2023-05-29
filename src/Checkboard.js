import * as THREE from "three";
import { load } from "three/addons/libs/opentype.module";


function loadTable(scene, loader) {
    const geometry = new THREE.PlaneGeometry(300, 300);
    const texture = loader.load('/table.jpg');
    const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        map: texture
    }));

    plane.rotateX(-Math.PI / 2);

    scene.add(plane);
}

export default function loadCheckBoard(scene, animate, loader) {
    loadTable(scene, loader);

    const geometry_checkboard = new THREE.BoxGeometry(100, 1, 100);
    const checkboard_texture = loader.load('/checkboard.jpg');

    checkboard_texture.repeat.set(5, 5);
    checkboard_texture.wrapS = THREE.RepeatWrapping;
    checkboard_texture.wrapT = THREE.RepeatWrapping;

    const materials_checkboard = [
        new THREE.MeshBasicMaterial({ color: 0x6a4643 }),
        new THREE.MeshBasicMaterial({ color: 0x6a4643 }),
        new THREE.MeshBasicMaterial({
            map: checkboard_texture
        }),
        new THREE.MeshBasicMaterial({ color: 0x6a4643 }),
        new THREE.MeshBasicMaterial({ color: 0x6a4643 }),
        new THREE.MeshBasicMaterial({ color: 0x6a4643 })
    ]

    const checkboard = new THREE.Mesh(geometry_checkboard, materials_checkboard);
    scene.add(checkboard);

    return checkboard;
}
