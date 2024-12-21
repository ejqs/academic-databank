import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/util/dbConnect";
import User from "@/features/users/models/User";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const personalEmail = searchParams.get("personalEmail"); // Check if there's a paper ID provided in the query

  if (personalEmail) {
    try {
      const founduser = await User.findOne({ personal_email: personalEmail });
      if (founduser) {
        return NextResponse.json({ value: true }, { status: 201 });
      } else {
        return NextResponse.json({ value: false }, { status: 201 });
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch user", details: error.message },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: "Need personalEmail" }, { status: 500 });
  }
}
