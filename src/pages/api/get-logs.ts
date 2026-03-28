import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const DATABASE_URL = import.meta.env.DATABASE_URL || import.meta.env.POSTGRES_URL;
    
    if (!DATABASE_URL) {
      return new Response(JSON.stringify({ error: 'Database not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sql = neon(DATABASE_URL);
    
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const logs = await sql`
      SELECT id, query, created_at
      FROM chatbot_logs
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const total = await sql`
      SELECT COUNT(*) as count
      FROM chatbot_logs
    `;

    return new Response(JSON.stringify({ 
      success: true,
      logs,
      total: parseInt(total[0].count),
      limit,
      offset
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching logs:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch logs',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
