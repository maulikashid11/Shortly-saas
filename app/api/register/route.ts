import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db/connect';
import User from '../../../models/User';

type UserBody = {
  email: string;
  image?: string;
  name?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: UserBody = await request.json();
    const { email, image, name } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 409 }
      );
    }

    const createdUser = await User.create({ email, image, name });

    return NextResponse.json(
      { success: true, message: 'User registered.', user: createdUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
