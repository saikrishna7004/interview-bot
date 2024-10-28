import Interview from '@/models/Interview';
import connectMongo from '@/utils/connectMongo';

export async function GET(req, { params }) {
    const { id } = params;

    try {
        await connectMongo();
        const interview = await Interview.findById(id);
        
        if (!interview) {
            return new Response('Interview not found', { status: 404 });
        }
        
        return new Response(JSON.stringify(interview), { status: 200 });
    } catch (error) {
        return new Response('Error fetching interview', { status: 500 });
    }
}
