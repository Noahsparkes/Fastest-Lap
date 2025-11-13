import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const timestamp = new Date().toISOString();
    
    console.log('Multi-activity heartbeat starting:', timestamp);

    // Strategy 1: Write to heartbeat table
    const { error: insertError } = await supabase
      .from('heartbeat')
      .insert({ timestamp });

    // Strategy 2: Read from laps table (simulate user activity)
    const { error: readError } = await supabase
      .from('laps')
      .select('id')
      .limit(1);

    // Strategy 3: Update heartbeat record (more DB activity)
    const { error: updateError } = await supabase
      .from('heartbeat')
      .update({ timestamp })
      .eq('id', 1);

    // Strategy 4: Delete old heartbeat records (cleanup + activity)
    const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { error: deleteError } = await supabase
      .from('heartbeat')
      .delete()
      .lt('timestamp', cutoffDate);

    // Strategy 5: Count records (another read operation)
    const { count, error: countError } = await supabase
      .from('laps')
      .select('*', { count: 'exact', head: true });

    const activities = {
      insert: !insertError,
      read: !readError,
      update: !updateError,
      delete: !deleteError,
      count: !countError,
      lapCount: count,
      timestamp
    };

    console.log('Multi-activity results:', activities);

    return res.status(200).json({ 
      ok: true, 
      action: 'multi_heartbeat_complete',
      activities,
      message: `Performed 5 database operations at ${timestamp}`
    });

  } catch (error) {
    console.error('Exception:', error);
    return res.status(500).json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      action: 'multi_heartbeat_exception'
    });
  }
}