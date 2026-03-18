export default async function handler(req, res) {
  // Allow the browser to call this endpoint
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate'); // cache 1h on Vercel

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  // If no API key is set, return the hardcoded fallback silently
  if (!apiKey) {
    return res.status(200).json({ rating: 5.0, total: 52, source: 'fallback' });
  }

  try {
    // Find place by name + location (no place_id needed)
    const url =
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
      `?input=Mianno+Sushi+%26+Grill+Remseck+am+Neckar` +
      `&inputtype=textquery` +
      `&fields=rating,user_ratings_total` +
      `&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.candidates?.[0]) {
      const place = data.candidates[0];
      return res.status(200).json({
        rating: place.rating ?? 5.0,
        total: place.user_ratings_total ?? 52,
        source: 'live',
      });
    }

    // Google returned an error — fall back gracefully
    return res.status(200).json({ rating: 5.0, total: 52, source: 'fallback' });
  } catch (_) {
    return res.status(200).json({ rating: 5.0, total: 52, source: 'fallback' });
  }
}
