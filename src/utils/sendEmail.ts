import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || '',
    domain: "sandbox4e0ee1f66de54c87a921f4437eadd987.mailgun.org"
});

const sendEmail = ( subject: string, html: string) => {
    const emailData = {
        from: "sg.guspo@gmail.com",
        to: "albatroscom@naver.com",
        subject,
        html
    };
    return mailGunClient.messages().send(emailData);
}

export const sendVerificationEmail = (fullName: string, key: string) => {
    let emailSubject = `Hello ${fullName}, please vefify your email`;
    let emailBody = `Verify your email by clicking <a href="http://www.naver.com/verification/${key}/">here</a>`;
    return sendEmail(emailSubject, emailBody);
}