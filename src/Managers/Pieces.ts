import Loaders from "./Loaders";
import { Group, Mesh } from "three";

export default class Pieces {
    x: number;
    y: number;

    color: number;
    scene: Mesh;

    loader: Loaders;

    mesh: Group | undefined;

    constructor(x: number, y: number, color: 0 | 1, checkboard: Mesh, loader: Loaders) {
        this.x = x;
        this.y = y;

        this.color = color ? 0xdcdeaf : 0x424242;
        this.scene = checkboard;

        this.loader = loader;

        loader.loadObject('/pieces.glb', gltf => this.onLoaded(gltf));
    }

    private async onLoaded(obj: Group) {
        this.mesh = obj;

        this.mesh.position.x += this.x * 10 + 1;
        this.mesh.position.z += this.y * 10 + 5.5;
        this.mesh.position.y += 0;

        this.mesh.scale.x = 4;
        this.mesh.scale.z = 4;

        this.mesh.children.forEach(node => {
            // @ts-ignore
            if (!node.isMesh) return;

            // @ts-ignore
            node.material.color.set(
                this.color
            );
        });

        this.scene.add(this.mesh);
    }
}