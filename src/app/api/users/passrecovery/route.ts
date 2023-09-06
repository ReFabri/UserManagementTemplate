import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, token, password } = reqBody;

    if (email && !token) {
      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json(
          {
            error: "No user registered with this email",
          },
          { status: 400 }
        );
      }

      sendEmail({ email, emailType: "RESET", userId: user._id });

      return NextResponse.json(
        {
          message: "A recovery email was sent, please check your email inbox",
          success: true,
        },
        { status: 200 }
      );
    } else if (token && !email) {
      const user = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
      });

      if (!user) {
        return NextResponse.json(
          {
            error: "Invalid token",
            success: false,
          },
          { status: 400 }
        );
      }
      if (!password) {
        return NextResponse.json(
          {
            error: "Invalid password",
            success: false,
          },
          { status: 400 }
        );
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      (user.password = hashedPassword), (user.forgotPasswordToken = undefined);
      user.forgotPasswordTokenExpiry = undefined;
      await user.save();

      return NextResponse.json(
        {
          message: "Email verified successfully",
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: `Invalid ${email ? "email" : "token"}`,
          success: false,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
