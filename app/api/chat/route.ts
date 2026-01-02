import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // PASTE YOUR N8N WEBHOOK URL HERE INSIDE THE QUOTES
    const n8nUrl = 'https://n8n.codevantage.io/webhook/chat';

    const response = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`n8n responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { reply: "I'm having trouble connecting to the brain right now." },
      { status: 500 }
    );
  }
}