import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const DATABASE_URL = import.meta.env.DATABASE_URL || import.meta.env.POSTGRES_URL;
    
    if (!DATABASE_URL) {
      return new Response(JSON.stringify({ 
        error: 'DATABASE_URL not configured',
        message: 'Please set DATABASE_URL in your .env file'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sql = neon(DATABASE_URL);

    await sql`
      CREATE TABLE IF NOT EXISTS chatbot_logs (
        id SERIAL PRIMARY KEY,
        query TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_chatbot_logs_created_at 
      ON chatbot_logs(created_at DESC)
    `;

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Database initialized successfully',
      table: 'chatbot_logs created with index on created_at'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error initializing database:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to initialize database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
