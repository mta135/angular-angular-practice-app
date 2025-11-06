import { EmailSettingModel } from "./email-setting.model";

export interface EmailMessageModel {

    rowCount: number;

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

    error: string

    emailSetting: EmailSettingModel;
}