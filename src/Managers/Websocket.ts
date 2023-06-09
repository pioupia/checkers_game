import { PerspectiveCamera } from "three";
import { playerIndexCallback } from "../types/Players";

enum RESPONSE_CODE {
    close_connection,
    first,
    second
}


export default class Socket extends WebSocket {
    location: string;
    camera: PerspectiveCamera;

    setPlayerIndex: playerIndexCallback;

    constructor(location: string, camera: PerspectiveCamera, setPlayerIndex: playerIndexCallback) {
        super(location);

        this.location = location;
        this.camera = camera;

        this.onerror = this.onError.bind(this);
        this.onclose = this.onClose.bind(this);
        this.onmessage = this.onMessage.bind(this);

        this.setPlayerIndex = setPlayerIndex;
    }

    private onClose() {
        new Socket(this.location, this.camera, this.setPlayerIndex);
    }

    private onError(err: Event) {
        console.log("[WebSocket] Got an error:", err);
    }

    private onMessage(ev: MessageEvent) {
        const type = RESPONSE_CODE[+ev.data];

        switch (type) {
            case 'second': {
                this.camera.rotateZ(Math.PI);
                this.setPlayerIndex(1);
                break;
            }
        }
    }
}