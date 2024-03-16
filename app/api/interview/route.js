import { config } from 'dotenv';

config();

const { API_KEY } = process.env;

export const POST = async (req, res) => {
    try {
        const data = await req.json();
        const conversation = data?.conversation || [];
        
        if (!conversation.length) {
            return new Response("Error: Empty Conversation.", { status: 400 });
        }

        const generateContent = async (conversation) => {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
            const headers = { 'Content-Type': 'application/json' };
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify({ contents: conversation })
            });
            const content = await response.json();
            const candidates = content.candidates || [];
            
            if (candidates.length > 0) {
                const modelResponse = candidates[0].content;
                return [modelResponse];
            }
            return [];
        };
        console.log(conversation)

        const response = await generateContent(conversation);
        console.log(response)
        
        if (response.length > 0) {
            return new Response(JSON.stringify(response), { status: 200 });
        } else {
            return new Response("Error: No response from API.", { status: 500 });
        }
    } catch (error) {
        return new Response("Error: " + error.message, { status: 400 });
    }
};
