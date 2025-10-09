import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Write to heartbeat table (hits Postgres write path - more effective than reads)
    const { error } = await supabase
      .from('heartbeat')
      .insert({ 
        timestamp: new Date().toISOString() 
      });

    if (error) {
      console.error('Heartbeat failed:', error.message);
      return res.status(500).json({ 
        ok: false, 
        error: error.message,
        action: 'heartbeat_write_failed'
      });
    }

    // Optional: Clean up old heartbeats (keep only last 30 days)
    await supabase
      .from('heartbeat')
      .delete()
      .lt('timestamp', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    return res.status(200).json({ 
      ok: true, 
      action: 'heartbeat_written',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Heartbeat error:', error);
    return res.status(500).json({ 
      ok: false, 
      error: 'Unexpected error',
      action: 'heartbeat_exception'
    });
  }
}