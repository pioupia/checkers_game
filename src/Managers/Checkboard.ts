import {
    Mesh,
    PlaneGeometry,
    Scene,
    TextureLoader,
    MeshBasicMaterial,
    BoxGeometry,
    RepeatWrapping
} from "three";


export default class Checkboard {
    loader: TextureLoader;
    scene: Scene;
    mesh: Mesh;

    constructor(scene: Scene, loader: TextureLoader) {
        this.loader = loader;
        this.scene = scene;

        this.loadTable();
        this.mesh = this.loadCheckboard();
    }

    private loadTable() {
        const tableGeometry = new PlaneGeometry(300, 300);
        const textureGeometry = this.loader.load('/table.jpg');
        const planeGeometry = new Mesh(tableGeometry, new MeshBasicMaterial({
            map: textureGeometry
        }));

        planeGeometry.rotateX(-Math.PI / 2);

        this.scene.add(planeGeometry);
    }

    private loadCheckboard() {
        const geometry_checkboard = new BoxGeometry(100, 1, 100);
        const checkboard_texture = this.loader.load('/checkboard.jpg');

        checkboard_texture.repeat.set(5, 5);
        checkboard_texture.wrapS = RepeatWrapping;
        checkboard_texture.wrapT = RepeatWrapping;

        const materials_checkboard = [
            new MeshBasicMaterial({ color: 0x6a4643 }),
            new MeshBasicMaterial({ color: 0x6a4643 }),
            new MeshBasicMaterial({
                map: checkboard_texture
            }),
            new MeshBasicMaterial({ color: 0x6a4643 }),
            new MeshBasicMaterial({ color: 0x6a4643 }),
            new MeshBasicMaterial({ color: 0x6a4643 })
        ]

        const checkboard = new Mesh(geometry_checkboard, materials_checkboard);
        this.scene.add(checkboard);

        return checkboard;
    }
}