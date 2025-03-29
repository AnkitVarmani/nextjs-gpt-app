import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const askGPT = async () => {
    setResponse('Thinking...');
    try {
      const res = await fetch('/api/ask-gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });

      const data = await res.json();
      setResponse(data.reply || 'No response from GPT');
    } catch (err) {
      console.error(err);
      setResponse('Error contacting GPT API.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1>Ask GPT</h1>
      <textarea
        style={{ width: '400px', height: '100px', padding: '10px', fontSize: '16px' }}
        placeholder="Type your question here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      /><br />
      <button
        style={{ padding: '10px 20px', marginTop: '10px', fontSize: '16px' }}
        onClick={askGPT}
      >
        Submit
      </button>
      <div style={{ marginTop: '30px', fontSize: '18px' }}>{response}</div>
    </div>
  );
}
