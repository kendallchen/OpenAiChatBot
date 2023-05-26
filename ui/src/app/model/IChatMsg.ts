
export enum MessageType {
    Send = 1,
    Receive = 2
}

export interface IChatMsg {
    type: MessageType,
    message: string
}