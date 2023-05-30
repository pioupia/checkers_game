import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import createGeneralLights from "./Elements/Lights";
import Loaders from "./Managers/Loaders";
import Checkboard from "./Managers/Checkboard";
import Player from "./Managers/Players";


class Game {
    scene: Scene;
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    loaders: Loaders;
    checkboard: Checkboard;

    players: Player[];

    constructor() {
        this.onWindowResize = this.onWindowResize.bind(this);
        this.animate = this.animate.bind(this);

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer({ antialias: true });

        this.loaders = new Loaders(this.animate);
        this.checkboard = new Checkboard(this.scene, this.loaders.textureLoader);

        this.players = [];

        this.init();
    }

    private init() {
        // Set the pixel ratio
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // THe canvas size
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Set the default bg color
        this.renderer.setClearColor(0xffe899);

        // Edit the camera properties
        this.camera.position.set(0, 75, 0);
        this.camera.rotateX(- Math.PI / 2);

        // Create two players
        this.players = [
            new Player(true, this.checkboard, this.loaders),
            new Player(false, this.checkboard, this.loaders)
        ];

        // And append it to the DOM
        document.body.appendChild(this.renderer.domElement);

        createGeneralLights(this.scene);

        window.addEventListener('resize', this.onWindowResize);
    }

    public animate() {
        this.renderer.render(this.scene, this.camera);
    }

    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.animate();
    }
}

new Game();
