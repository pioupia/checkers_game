import Pieces from "./Pieces";
import Loaders from "./Loaders";
import Checkboard from "./Checkboard";

export default class Player {
    pieceColor: 0 | 1;
    sign: -1 | 1;
    startingCase: number[];

    pionsCount: number;
    pions: Pieces[];

    loaders: Loaders;
    checkboard: Checkboard;

    constructor(isFirstPlayer: boolean, checkboard: Checkboard, loaders: Loaders) {
        this.pieceColor = +isFirstPlayer as 1 | 0;

        this.sign = isFirstPlayer ? 1 : -1;
        this.startingCase = isFirstPlayer ? [-5, 4] : [4, -5];

        this.pionsCount = 20;
        this.pions = [];

        this.checkboard = checkboard;
        this.loaders = loaders;

        this.init();
    }

    private init() {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 4; y++) {
                const offset = y % 2 === 0 ? 0 : this.sign;

                this.pions.push(
                    new Pieces(
                        this.startingCase[0] + x * this.sign * 2 + offset,
                        this.startingCase[1] + y * -this.sign,
                        this.pieceColor,
                        this.checkboard.mesh,
                        this.loaders
                    )
                );
            }
        }
    }

}