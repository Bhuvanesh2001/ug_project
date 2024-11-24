import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

const sns = new AWS.SNS({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

interface OtpRequestBody {
  phoneNumber: string;
  otp: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { phoneNumber, otp } = req.body as OtpRequestBody;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: 'Phone number and OTP are required.' });
  }

  const params = {
    Message: `Your OTP is: ${otp}`,
    PhoneNumber: phoneNumber,
  };

  try {
    const result = await sns.publish(params).promise();
    return res.status(200).json({
      message: 'OTP sent successfully!',
      snsResponse: result,
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ error: 'Failed to send OTP', details: error });
  }
}
