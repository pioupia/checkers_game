import * as THREE from "three";

export default function loadCheckBoard(scene, animate, loader) {
    const geometry_checkboard = new THREE.BoxGeometry(100, 1, 100);
    const checkboard_texture = loader.load('/checkboard.jpg');

    checkboard_texture.repeat.set(5, 5);
    checkboard_texture.wrapS = THREE.RepeatWrapping;
    checkboard_texture.wrapT = THREE.RepeatWrapping;

    const materials_checkboard = [
        new THREE.MeshBasicMaterial( { color: 0x6a4643 }),
        new THREE.MeshBasicMaterial( { color: 0x6a4643 }),
        new THREE.MeshBasicMaterial({
            map: checkboard_texture
        }),
        new THREE.MeshBasicMaterial( { color: 0x6a4643 }),
        new THREE.MeshBasicMaterial( { color: 0x6a4643 }),
        new THREE.MeshBasicMaterial( { color: 0x6a4643 })
    ]

    const checkboard = new THREE.Mesh(geometry_checkboard, materials_checkboard);
    scene.add(checkboard);

    return checkboard;
}
