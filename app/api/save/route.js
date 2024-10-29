import Interview from '@/models/Interview';
import connectMongo from '@/utils/connectMongo';

export async function POST(req) {
    try {
        await connectMongo();
        const { topic, jobDescription, conversation, feedback, username } = await req.json();
        const interview = new Interview({ topic, jobDescription, conversation, feedback, username });
        await interview.save();
        return new Response(JSON.stringify(interview), { status: 201 });
    } catch (error) {
        return new Response('Error saving interview', { status: 500 });
    }
}
