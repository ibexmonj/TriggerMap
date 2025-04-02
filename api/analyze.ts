import type { VercelRequest, VercelResponse } from '@vercel/node';

let requestCount = 0;
const MAX_REQUESTS_PER_MINUTE = 10;
const MAX_PROMPT_LENGTH = 1000;

export default async (req: VercelRequest, res: VercelResponse) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'https://triggermap.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  // Allow only POST requests
  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', 'https://triggermap.app');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set CORS headers on the actual response
  res.setHeader('Access-Control-Allow-Origin', 'https://triggermap.app');

  // Extract prompt from the request body
  const { prompt } = req.body;

  // Validate prompt input
  if (!prompt || typeof prompt !== 'string' || prompt.length > MAX_PROMPT_LENGTH) {
    return res.status(400).json({ error: 'Invalid prompt: must be a string and not exceed maximum length.' });
  }

  // Basic rate limiting (in-memory; note: this resets per instance)
  requestCount++;
  if (requestCount > MAX_REQUESTS_PER_MINUTE) {
    return res.status(429).json({ error: 'Too many requests, please try again later.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Organization': process.env.OPENAI_ORG_ID || '',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an empathetic mental fitness assistant.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    console.log('OpenAI response:', data);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in serverless function:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};