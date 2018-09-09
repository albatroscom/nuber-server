import Twilio from 'twilio';

const twilioClient = Twilio(
    process.env.TWILIO_SID, 
    process.env.TWILIO_TOKEN
);

// 어떤 번호로든 어떤본문과 함께 텍스트 메세지를 보낼수 있는 함수
export const sendSMS = (to: string, body: string) => {
    return twilioClient.messages.create({
        body, 
        to, 
        from: process.env.TWILIO_PHONE
    });
};

// 정해진 내용을 user에게 보내는 함수
export const sendVerificationSMS = (to: string, key: string) => 
    sendSMS(to, `Your verification key is : ${key}`);