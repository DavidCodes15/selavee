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
//html: `
        
//<p>Please verify your email by entering the following code: ${code}
        
        
export const sendVerificationEmail = async (email: string, code: string) => {
    // const verificationUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-email?token=${token}`;

    await transporter.sendMail({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Please Verify Your Email - Selavee.com',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="${process.env.NEXT_PUBLIC_SERVER_URL}/black_logo.png" alt="Selavee Logo" style="width: 100px; height: auto;" />
                </div>
                <div style="font-size: 16px; color: #333;">
                    <p>Hello,</p>
                    <p>Thank you for signing up at <strong>Selavee.com</strong>! To complete your registration, please verify your email address by entering the verification code below:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="font-size: 24px; font-weight: bold; background-color: #f4f4f4; padding: 10px 20px; border-radius: 5px; color: #333;">${code}</span>
                    </div>
                    <p>If you did not sign up for an account, you can ignore this email.</p>
                    <p>Thank you!</p>
                    <p style="margin-top: 20px;">Best regards,<br />The Selavee Team</p>
                </div>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
                <footer style="font-size: 12px; text-align: center; color: #888;">
                    <p>This email was sent to <a href="mailto:${email}" style="color: #888;">${email}</a>. If you did not request this, please contact us at support@selavee.com.</p>
                    <p>&copy; ${new Date().getFullYear()} Selavee. All rights reserved.</p>
                </footer>
            </div>
        `,
        
    })
}
