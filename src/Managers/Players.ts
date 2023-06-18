import Pieces from "./Pieces";
import Loaders from "./Loaders";
import Checkboard from "./Checkboard";

export default class Player {
    pieceColor: 0 | 1;
    sign: -1 | 1;
    startingCase: number[];

    pionsCount: number;
    pions: Pieces[];

    hoverPiece: Pieces | undefined;

    loaders: Loaders;
    checkboard: Checkboard;

    constructor(isFirstPlayer: boolean, checkboard: Checkboard, loaders: Loaders) {
        this.pieceColor = +isFirstPlayer as 1 | 0;

        this.sign = isFirstPlayer ? 1 : -1;
        this.startingCase = isFirstPlayer ? [-5, 4] : [4, -5];

        this.pionsCount = 20;
        this.pions = new Array(this.pionsCount);

        this.checkboard = checkboard;
        this.loaders = loaders;

        this.init();
    }

    private init() {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 5; x++) {
                const offset = y % 2 === 0 ? 0 : this.sign;

                this.pions[x + y * 5] = new Pieces(
                    this.startingCase[0] + x * this.sign * 2 + offset,
                    this.startingCase[1] + y * -this.sign,
                    this.pieceColor,
                    this.checkboard.mesh,
                    this.loaders
                );
            }
        }
    }

    public setHoverPiece(uuid: string): boolean {
        // Find the piece
        for (const piece of this.pions) {
            if (piece.mesh?.uuid !== uuid) continue;

            if (this.hoverPiece) {
                this.hoverPiece.changeColor();
            }

            this.hoverPiece = piece;
            piece.changeColor(0xFC9C9C);

            return true;
        }

        return false;
    }

    public removeHoveredPiece() {
        if (!this.hoverPiece) return;

        this.hoverPiece.changeColor();
        this.hoverPiece = undefined;
    }
}