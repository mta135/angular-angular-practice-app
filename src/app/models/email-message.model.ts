import { EmailSettingModel } from "./email-setting.model";

export interface EmailMessageModel {
    mailFrom: string;

    toRecipients: string;

    subject: string;

    body: string;
    attachmentPath: string;

    ccRecipients: string;
    status: string;

    header: string;

    footer: string;
    bodyAsHtml: string;

    emailSetting: EmailSettingModel;
}