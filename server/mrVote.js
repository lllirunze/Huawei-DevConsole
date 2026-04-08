import http from 'http';
import https from 'https';

function fetchNode(url, options = {}) {
  if (typeof fetch === 'function') return fetch(url, options);
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const lib = u.protocol === 'https:' ? https : http;
    const opts = { hostname: u.hostname, port: u.port || (u.protocol === 'https:' ? 443 : 80), path: u.pathname + u.search, method: options.method || 'GET', headers: options.headers || {} };
    const req = lib.request(opts, (res) => {
      let data = '';
      res.on('data', d => data += d.toString());
      res.on('end', () => {
        resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, text: async () => data, json: async () => { try { return JSON.parse(data || '{}'); } catch(e) { return { raw: data }; } } });
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

const VOTE_API_URL = 'http://100.102.146.243:3000/codehub/mr/vote';

export async function voteMR(body) {
  const { url } = body || {};
  if (!url || typeof url !== 'string') throw new Error('url is required');

  const payload = JSON.stringify({ url });
  const resp = await fetchNode(VOTE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  });

  const data = await resp.json();
  if (!resp.ok) throw new Error(`vote API error ${resp.status}: ${JSON.stringify(data)}`);
  return { ok: true, data };
}
