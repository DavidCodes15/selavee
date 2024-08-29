import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    secure: true,
    port: 465,
    auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY
    }
})

export const sendVerificationEmail = async (email: string, code: string) => {
    // const verificationUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-email?token=${token}`;

    await transporter.sendMail({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'verify your email address',
        html: `<p>Please verify your email by entering the following code: ${code}`
    })
}