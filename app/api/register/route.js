import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);

  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    // return NextResponse.json({ message: "Email already exists" }, { status: 200 });
    return NextResponse.json({ message: "Email already exists", code: 10 });
  }

  const createdUser = await User.create(body);
  return NextResponse.json(createdUser);
}
