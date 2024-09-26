import { NextResponse } from 'next/server';
import { generateStoryElements, processPlayerAction } from '../../lib/gemini';

export async function POST(request) {
  const { action, gameState } = await request.json();

  try {
    if (action === 'generateStory') {
      const storyElements = await generateStoryElements();
      return NextResponse.json({ storyElements });
    } else if (action === 'processAction') {
      const result = await processPlayerAction(gameState, action);
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in AI API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}