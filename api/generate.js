export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = req.body.prompt; 

    try {
        const response = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const apiRes = await fetch(response, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ contents: [{ parts: [{text: prompt}] }] })
        });

        const data = await apiRes.json();
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: 'Failed to generate content' });
    }
}
