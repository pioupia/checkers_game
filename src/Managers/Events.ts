import { Game } from "../main";

export default class Events {
    game: Game;

    constructor(game: Game) {
        this.game = game;

        this.game.pointer.x = 0;
        this.game.pointer.y = 0;

        document.documentElement.onpointermove = this.onMouseMove.bind(this);
    }

    onMouseMove(ev: MouseEvent) {
        /*const { clientX, clientY } = ev;
        const { width, height } = this.game.renderer.domElement;

        const center = width / 2;
        const middle = height / 2;

        const vectorX = clientX - center;
        const vectorY = clientY - middle;

        console.log(clientX, clientY, vectorX, vectorY);*/

        this.game.pointer.x = (ev.clientX / window.innerWidth) * 2 - 1;
        this.game.pointer.y = -(ev.clientY / window.innerHeight) * 2 + 1;

        this.game.animate();
    }
}