import Interview from '@/models/Interview';
import connectMongo from '@/utils/connectMongo';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username') || 'guest';

    try {
        await connectMongo();
        
        const interviews = await Interview.find({ username }).sort({ createdAt: -1 });
        
        return new Response(JSON.stringify(interviews), { status: 200 });
    } catch (error) {
        return new Response('Error fetching interviews', { status: 500 });
    }
}
