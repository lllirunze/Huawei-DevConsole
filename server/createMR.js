import https from 'https';

function fetchNode(url, options = {}) {
    // Use global fetch if available (Node 18+), otherwise fallback to https.request
    if (typeof fetch === 'function') return fetch(url, options);

    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const isJson = options.headers && options.headers['Content-Type'] === 'application/json';
        const body = options.body;
        const req = https.request({ hostname: u.hostname, path: u.pathname + u.search, method: options.method || 'GET', headers: options.headers }, (res) => {
            let data = '';
            res.on('data', d => data += d.toString());
            res.on('end', () => {
                resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, text: async () => data, json: async () => JSON.parse(data || '{}') });
            });
        });
        req.on('error', reject);
        if (body) req.write(body);
        req.end();
    });
}

export async function createMR(body) {
    const { projectId, title, description, source_branch, target_branch } = body;
    if (!projectId) throw new Error('projectId required');
    if (!title) throw new Error('title required');
    if (!description) throw new Error('description required');
    if (!source_branch) throw new Error('source_branch required');
    if (!target_branch) throw new Error('target_branch required');

    const token = process.env.PRIVATE_TOKEN;
    if (!token) throw new Error('PRIVATE_TOKEN not set in environment');

    const url = `https://codehub-g.huawei.com/api/v4/projects/${encodeURIComponent(projectId)}/isource/merge_requests`;

    const payload = {
        title,
        target_project_id: projectId,
        description,
        assignee_ids: '',
        reviewer_ids: '',
        source_branch,
        target_branch
    };

    const resp = await fetchNode(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Private-Token': token,
            'source_branch': source_branch,
            'target_branch': target_branch,
            'project_id': projectId
        },
        body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (!resp.ok) {
        throw new Error(`CodeHub API error ${resp.status}: ${JSON.stringify(data)}`);
    }

    return { ok: true, data };
}
