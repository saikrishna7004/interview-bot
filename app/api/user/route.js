import User from '@/models/User';
import { NextResponse } from 'next/server';
import connectMongo from '@/utils/connectMongo';
import { getServerSession } from 'next-auth';

export async function GET() {
    await connectMongo();
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
}

export async function PUT(req) {
    await connectMongo();
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const formData = await req.formData();
    const preferredTopics = formData.get('preferredTopics');
    const jobDescription = formData.get('jobDescription');
    const resumePdf = formData.get('resumePdf');

    const user = await User.findOneAndUpdate(
        { email: session.user.email },
        { preferredTopics, jobDescription, resumePdf },
        { new: true }
    );

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
}