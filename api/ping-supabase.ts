import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Environment check:', {
      hasUrl: !!process.env.SUPABASE_URL,
      hasKey: !!process.env.SUPABASE_ANON_KEY
    });

    // Write to heartbeat table
    const { data, error } = await supabase
      .from('heartbeat')
      .insert({ 
        timestamp: new Date().toISOString() 
      });

    if (error) {
      console.error('Detailed error:', error);
      return res.status(500).json({ 
        ok: false, 
        error: error.message,
        code: error.code,
        details: error.details,
        action: 'heartbeat_write_failed'
      });
    }

    return res.status(200).json({ 
      ok: true, 
      action: 'heartbeat_written',
      timestamp: new Date().toISOString(),
      data
    });

  } catch (error) {
    console.error('Exception:', error);
    return res.status(500).json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'heartbeat_exception'
    });
  }
}