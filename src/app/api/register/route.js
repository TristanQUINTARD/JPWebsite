import User from "../../../../lib/models/User";
import { ConnectDB } from "../../../../lib/config/db";
import bcrypt from "bcryptjs"; // https://www.npmjs.com/package/bcryptjs npm install bcryptjs
import { NextResponse } from "next/server";

const LoadDB = async () => {
    ConnectDB();
};


export const POST = async (request) => {
    const { name, email, password } = await request.json();

    await LoadDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return new NextResponse("Email is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        return new NextResponse("User is registered", { status: 200 });
    } catch (err) {
        return new NextResponse("Server error", { status: 500 });
    }
};
