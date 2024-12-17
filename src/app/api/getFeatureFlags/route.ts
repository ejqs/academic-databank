import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/util/dbConnect";
import Flags from "@/models/Flags";

export async function GET() {
  await dbConnect();
  try {
    const flags = await Flags.find().sort({ _id: -1 }).limit(10); // Get latest feature flag
    return NextResponse.json(flags);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch flags", details: error.message },
      { status: 500 }
    );
  }
}
