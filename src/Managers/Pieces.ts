import Loaders from "./Loaders";
import { Group, Mesh } from "three";

export default class Pieces {
    x: number;
    y: number;

    defaultColor: number;
    color: number;

    scene: Mesh;

    loader: Loaders;

    mesh: Group | undefined;

    size: number;

    selected: boolean;

    constructor(x: number, y: number, color: 0 | 1, checkboard: Mesh, loader: Loaders, size?: number) {
        this.x = x;
        this.y = y;

        this.defaultColor = color ? 0xdcdeaf : 0x424242;
        this.color = this.defaultColor;
        this.scene = checkboard;

        this.loader = loader;

        this.size = size || 1;

        this.selected = false;

        loader.loadObject('/pieces.glb', gltf => this.onLoaded(gltf));
    }

    private adaptColor() {
        if (this.selected) {
            this.color = 0xff0000;
        } else {
            this.color = this.defaultColor;
        }
    }

    public toggleSelected() {
        this.selected = !this.selected;
        this.adaptColor();

        return this;
    }

    public setSelected(value: boolean) {
        this.selected = value;
        this.adaptColor();

        return this;
    }

    private async onLoaded(obj: Group) {
        this.mesh = obj;

        this.mesh.position.x += this.x * 10 + 1;
        this.mesh.position.z += this.y * 10 + 5.5;
        this.mesh.position.y += 0;

        this.mesh.scale.x = 4;
        this.mesh.scale.z = 4;
        this.mesh.scale.y = this.size;

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