import { LoadingManager, TextureLoader, Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default class Loaders {
    animate: () => void;

    loadManager: LoadingManager;
    textureLoader: TextureLoader;
    gltfLoader: GLTFLoader;

    constructor(animate: () => void) {
        this.animate = animate;

        // Create the load manager
        this.loadManager = new LoadingManager();

        // Create the texture loader
        this.textureLoader = new TextureLoader(this.loadManager);

        // And the GLTFLoader
        this.gltfLoader = new GLTFLoader(this.loadManager);

        this.onLoad = this.onLoad.bind(this);

        this.init();
    }

    private init() {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
        this.gltfLoader.setDRACOLoader(dracoLoader);

        this.loadManager.onLoad = this.onLoad;
    }

    private onLoad() {
        return this.animate();
    }

    public loadObject(path: string, cb: (scene: Group) => void) {
        this.gltfLoader.load(path, (gltf) => {
            cb(gltf.scene);

            this.onLoad();
        }, undefined, console.error);
    }
}