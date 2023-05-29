import { Scene, DirectionalLight } from "three";


export default function createGeneralLights(scene: Scene) {
    // Create a directional light power 3
    const light = new DirectionalLight(0xffddaa, 3);

    // Set it position
    light.position.set(0, 75, 0);

    // And its target position
    light.target.position.set(0, 0, 0);

    scene.add(light);
    scene.add(light.target);
}