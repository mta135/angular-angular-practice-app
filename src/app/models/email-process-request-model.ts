import { EmailMessageModel } from "./email-message.model";

export class EmailProcessRequest {

    public emails: EmailMessageModel[];

    public connectionId: string;

    constructor(emails: EmailMessageModel[], connectionId: string) {
        this.emails = emails;
        this.connectionId = connectionId;
    }
}