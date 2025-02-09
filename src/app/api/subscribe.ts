import { NextApiRequest, NextApiResponse } from 'next';
import Resend from 'resend';

const resend = new (Resend as any)(process.env.RESEND_API_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    const EMAIL_FROM = process.env.EMAIL_USER;
    const EMAIL_TO = process.env.EMAIL_USER;

    try {
      const response = await resend.emails.send({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: 'New Subscription',
        html: `<p>New subscription with email: ${email}</p>`,
      });

      if (response?.id) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false, error: 'Failed to send email' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
};

export default handler;