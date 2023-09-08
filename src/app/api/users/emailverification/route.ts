import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, userData } = reqBody;

    if (userData && !token) {
      const { email, emailType, userId } = userData;
      await sendEmail({ email, emailType, userId });
      return NextResponse.json(
        { message: "Verification email sent", emailSuccess: true },
        { status: 200 }
      );
    } else if (token && !userData) {
      const user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiry: { $gt: Date.now() },
      });

      if (!user) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });
      }

      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
      await user.save();

      return NextResponse.json({
        message: "Email verified successfully",
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
