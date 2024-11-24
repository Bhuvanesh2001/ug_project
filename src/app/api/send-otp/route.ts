import { NextRequest, NextResponse } from "next/server";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION, // Replace with your region
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, otp }: { phoneNumber: string; otp: string } =
      await req.json();

    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { error: "Phone number and OTP are required." },
        { status: 400 }
      );
    }

    const command = new PublishCommand({
      Message: `Your OTP is: ${otp}.

Developed by Bhuvanesh Gangisetty alias Bhu`,
      PhoneNumber: phoneNumber,
    });

    await snsClient.send(command);

    return NextResponse.json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
