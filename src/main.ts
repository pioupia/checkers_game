import { Scene, PerspectiveCamera, WebGLRenderer, Raycaster, Vector2 } from "three";
import createGeneralLights from "./Elements/Lights";
import Loaders from "./Managers/Loaders";
import Checkboard from "./Managers/Checkboard";
import Player from "./Managers/Players";
import Socket from "./Managers/Websocket";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import Events from "./Managers/Events";


export class Game {
    scene: Scene;
    camera: PerspectiveCamera;
    composer: EffectComposer;
    renderer: WebGLRenderer;
    loaders: Loaders;
    checkboard: Checkboard;
    socket: Socket;
    raycaster: Raycaster;
    pointer: Vector2;

    players: Player[];

    playerIndex: 0 | 1;

    constructor() {
        this.onWindowResize = this.onWindowResize.bind(this);
        this.animate = this.animate.bind(this);

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer({ antialias: true });
        this.composer = new EffectComposer(this.renderer);

        this.composer.addPass(
            new RenderPass(this.scene, this.camera)
        );

        this.loaders = new Loaders(this.animate);
        this.checkboard = new Checkboard(this.scene, this.loaders.textureLoader);

        this.socket = new Socket(
            "ws://localhost:8000/",
            this.camera,
            this.setPlayerIndex.bind(this)
        );

        this.players = [];
        this.playerIndex = 0;

        this.init();

        this.raycaster = new Raycaster();
        this.pointer = new Vector2();

        new Events(this);
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
        this.camera.rotateX(-Math.PI / 2);

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

    private setPlayerIndex(index: 0 | 1) {
        this.playerIndex = index;
    }

    public animate() {
        this.raycaster.setFromCamera(this.pointer, this.camera);

        const intersects = this.raycaster.intersectObjects(this.checkboard.mesh.children, true);

        let object = intersects[0]?.object;
        let found = false;

        if (object) {
            while (object.name !== 'pion' && object.parent) {
                object = object.parent;
            }

            found = this.players[this.playerIndex].setHoverPiece(object.uuid);
        }

        if (!found) this.players[this.playerIndex].removeHoveredPiece();

        this.composer.render();
    }

    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.animate();
    }
}

new Game();
