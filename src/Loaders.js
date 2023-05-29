import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";
import { LoadingManager, TextureLoader } from "three";

// Create the load manager
const loadManager = new LoadingManager();

// Create the texture loader
const textureLoader = new TextureLoader(loadManager);

// And the GLTFLoader
const gltfLoader = new GLTFLoader(loadManager);
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Set the onLoad callback
 * @param {() => void} cb
 */
function onElementLoad(cb) {
    loadManager.onLoad = cb;
}

/**
 * Allows you to load 3D objects
 * @param {string} path
 * @param {(scene) => void} cb
 * @returns {void}
 */
function loadObject(path, cb) {
    gltfLoader.load(path, (gltf) => {
        cb(gltf.scene);

        loadManager.onLoad();
    }, null, console.error);
}

export {
    gltfLoader,
    textureLoader,
    onElementLoad,
    loadObject
}