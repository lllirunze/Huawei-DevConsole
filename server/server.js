import http from 'http';
import { submitPatch } from './submitPatchServer.js';
import { createMR } from './createMR.js';
import { voteMR } from './mrVote.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

function sendJSON(res, status, obj) {
    const s = JSON.stringify(obj);
    res.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.end(s);
}

const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
        return res.end();
    }

    if (req.method === 'POST' && req.url === '/submit-patch') {
        try {
            let body = '';
            for await (const chunk of req) body += chunk;
            const data = JSON.parse(body);
            const result = await submitPatch(data);
            sendJSON(res, 200, result);
        } catch (err) {
            console.error('submit-patch failed', err);
            sendJSON(res, 500, { ok: false, error: String(err && err.message ? err.message : err) });
        }
        return;
    }

    if (req.method === 'POST' && req.url === '/create-mr') {
        try {
            let body = '';
            for await (const chunk of req) body += chunk;
            const data = JSON.parse(body);
            const result = await createMR(data);
            sendJSON(res, 200, result);
        } catch (err) {
            console.error('create-mr failed', err);
            sendJSON(res, 500, { ok: false, error: String(err && err.message ? err.message : err) });
        }
        return;
    }

    if (req.method === 'POST' && req.url === '/vote-mr') {
        try {
            let body = '';
            for await (const chunk of req) body += chunk;
            const data = JSON.parse(body);
            const result = await voteMR(data);
            sendJSON(res, 200, result);
        } catch (err) {
            console.error('vote-mr failed', err);
            sendJSON(res, 500, { ok: false, error: String(err && err.message ? err.message : err) });
        }
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
