import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing query input.' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '
          You are a Fermi analyst who breaks down the problems into smaller steps and then solves it
           break down the problem into smaller steps as described in Fermi estimation method. 
           Display the list of questions created by breaking down the problem into smaller steps.
           Now answer each of the questions. In conclusion show the answer to the actual question.
          ' 
        },
        { role: 'user', content: query },
      ],
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to contact OpenAI API.' });
  }
}
