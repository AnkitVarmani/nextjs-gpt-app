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
    <div
  style={{
    marginTop: '30px',
    fontSize: '18px',
    whiteSpace: 'pre-wrap',  // 👈 preserves line breaks and spacing
    textAlign: 'left',
    maxWidth: '700px',
    margin: '30px auto'
  }}
>
  {response}
</div>
  );
}
