import Interview from '@/models/Interview';
import connectMongo from '@/utils/connectMongo';

export async function GET(req) {
    try {
        await connectMongo();
        const interviews = await Interview.find({}).sort({ createdAt: -1 });
        return new Response(JSON.stringify(interviews), { status: 200 });
    } catch (error) {
        return new Response('Error fetching interviews', { status: 500 });
    }
}
