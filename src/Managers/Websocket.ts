export default class Socket extends WebSocket {
    location: string;

    constructor(location: string) {
        super(location);

        this.location = location;

        this.onerror = this.onError.bind(this);
        this.onclose = this.onClose.bind(this);
        this.onmessage = this.onMessage.bind(this);
    }

    private onClose() {
        new Socket(this.location)
    }

    private onError(err: Event) {
        console.log("[WebSocket] Got an error:", err);
    }

    private onMessage(ev: Event) {
        console.log(ev);
    }
}