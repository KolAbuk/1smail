export type message = {
    id: number;
    from: string;
    subject: string;
    date: string;
};
export type messageData = {
    id: number;
    from: string;
    subject: string;
    date: string;
    attachments: {
        filename: string;
        contentType: string;
        size: number;
    }[];
    body: string;
    textBody: string;
    htmlBody: string;
};
export declare class TempMail {
    private address;
    private domain;
    private lastMessageId;
    constructor(address: string, domain: string);
    static init: (address?: string, domain?: string) => Promise<TempMail>;
    getAddress: () => string;
    getMessages: (awaitNew?: boolean) => Promise<message[]>;
    getMessageData: (messageID: number) => Promise<messageData>;
    getLinksToFiles: (message: messageData) => string[];
}
