import { PerspectiveCamera } from "three";
import { playerIndexCallback } from "../types/Players";

enum RESPONSE_CODE {
    close_connection,
    first,
    second
}


export default class Socket {
    // @ts-ignore
    socket: WebSocket;
    location: string;
    camera: PerspectiveCamera;

    setPlayerIndex: playerIndexCallback;

    timeoutDuration: number;

    constructor(location: string, camera: PerspectiveCamera, setPlayerIndex: playerIndexCallback) {
        this.location = location;
        this.camera = camera;

        this.init();

        this.setPlayerIndex = setPlayerIndex;

        this.timeoutDuration = 1000;
    }

    private init() {
        this.socket = new WebSocket(this.location);

        this.socket.onerror = this.onError.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onopen = this.onOpen.bind(this);

        setTimeout(() => {
            if (this.socket.readyState === this.socket.CONNECTING) {
                this.socket.close();
            }
        }, 2000);
    }

    private onClose() {
        console.log("[WebSocket] Connection closed");

        setTimeout(() => {
            console.log("[WebSocket] Renew connection");

            this.init();
            if (this.timeoutDuration < 64000) this.timeoutDuration = this.timeoutDuration * 2;
            console.log(this.timeoutDuration)
        }, this.timeoutDuration);
    }

    private onError(err: Event) {
        console.log("[WebSocket] Got an error:", err);
    }

    private onOpen() {
        this.timeoutDuration = 1000;
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