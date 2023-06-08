import {PerspectiveCamera} from "three";

enum RESPONSE_CODE {
    close_connection,
    first,
    second
}


export default class Socket extends WebSocket {
    location: string;
    camera: PerspectiveCamera;

    constructor(location: string, camera: PerspectiveCamera) {
        super(location);

        this.location = location;
        this.camera = camera;

        this.onerror = this.onError.bind(this);
        this.onclose = this.onClose.bind(this);
        this.onmessage = this.onMessage.bind(this);
    }

    private onClose() {
        new Socket(this.location, this.camera);
    }

    private onError(err: Event) {
        console.log("[WebSocket] Got an error:", err);
    }

    private onMessage(ev: MessageEvent) {
        const type = RESPONSE_CODE[+ev.data];

        switch (type) {
            case 'second': {
                this.camera.rotateZ(Math.PI);
            }
        }
    }
}