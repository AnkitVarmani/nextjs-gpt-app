import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing query input.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
You are Fermi Analyst, a research assistant that helps users break down complex business and financial problems.

- Be concise but clear
- Use bullet points where appropriate
- Include a short summary at the end if needed
- Always sound professional and thoughtful
          `
        },
        { role: 'user', content: query }
      ],
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error('GPT API Error:', error);
    res.status(500).json({
      error: 'Failed to contact OpenAI API.',
      details: error?.response?.data || error.message
    });
  }
}
