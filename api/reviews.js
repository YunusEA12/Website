import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  try {
    const config = JSON.parse(
      readFileSync(join(__dirname, '..', 'reviews-config.json'), 'utf8')
    );
    return res.status(200).json({
      rating: config.rating ?? 5.0,
      total:  config.total  ?? 52,
      source: 'config',
    });
  } catch (_) {
    return res.status(200).json({ rating: 5.0, total: 52, source: 'fallback' });
  }
}
