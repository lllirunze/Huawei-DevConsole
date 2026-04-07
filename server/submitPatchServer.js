import http from 'http';
import { spawn } from 'child_process';
import fs from 'fs';
import fsp from 'fs/promises';
import os from 'os';
import path from 'path';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// Server-side allowed repo mapping. Only accept repo keys listed here.
// Edit these paths to match actual repository locations on your machine.
const repoMap = {
    'frontend-app': 'D:/repos/frontend',
    'service-api': 'D:/repos/api',
    'utils-lib': 'D:/repos/utils'
};

function sendJSON(res, status, obj) {
    const s = JSON.stringify(obj);
    res.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.end(s);
}

function runCmd(cmd, args, opts = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args, { shell: false, ...opts });
        let stdout = '';
        let stderr = '';
        child.stdout.on('data', d => { stdout += d.toString(); });
        child.stderr.on('data', d => { stderr += d.toString(); });
        child.on('error', err => reject({ code: -1, err }));
        child.on('close', code => resolve({ code, stdout, stderr }));
    });
}

async function handleSubmit(body) {
    const { repoKey, branch, patchContent, patchFilename, commitText } = body;
    if (!repoKey || !branch || !patchContent || !commitText || !patchFilename) {
        throw new Error('缺少必要参数');
    }

    const repoPath = repoMap[repoKey];
    if (!repoPath) throw new Error('未知的 repoKey');
    if (!fs.existsSync(repoPath)) throw new Error(`Repo 路径不存在: ${repoPath}`);

    const tmpDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'patch-'));
    const patchPath = path.join(tmpDir, patchFilename);
    const commitMsgPath = path.join(tmpDir, 'commit_msg.txt');

    await fsp.writeFile(patchPath, patchContent, { encoding: 'utf8' });
    await fsp.writeFile(commitMsgPath, commitText, { encoding: 'utf8' });

    const logs = [];
    const opts = { cwd: repoPath, env: process.env };

    // Run sequence: checkout, pull, git am, commit --amend -F, push
    logs.push(`进入仓库: ${repoPath}`);
    let res;

    res = await runCmd('git', ['status', '--porcelain'], opts);
    logs.push(`git status => code ${res.code}\n${res.stdout}${res.stderr}`);
    if (res.code !== 0) {
        throw new Error('git status 失败，检查仓库状态与权限');
    }

    res = await runCmd('git', ['checkout', branch], opts);
    logs.push(`git checkout ${branch} => code ${res.code}\n${res.stdout}${res.stderr}`);
    if (res.code !== 0) {
        throw new Error('git checkout 失败：' + res.stderr);
    }

    res = await runCmd('git', ['pull'], opts);
    logs.push(`git pull => code ${res.code}\n${res.stdout}${res.stderr}`);
    if (res.code !== 0) {
        throw new Error('git pull 失败：' + res.stderr);
    }

    // apply patch
    res = await runCmd('git', ['am', patchPath], opts);
    logs.push(`git am ${patchFilename} => code ${res.code}\n${res.stdout}${res.stderr}`);
    if (res.code !== 0) {
        // try to abort am to restore repo
        try { await runCmd('git', ['am', '--abort'], opts); logs.push('git am aborted'); } catch (e) { }
        throw new Error('git am 失败：' + res.stderr);
    }

    // amend commit message
    res = await runCmd('git', ['commit', '--amend', '-F', commitMsgPath], opts);
    logs.push(`git commit --amend -F commit_msg.txt => code ${res.code}\n${res.stdout}${res.stderr}`);
    if (res.code !== 0) {
        throw new Error('git commit --amend 失败：' + res.stderr);
    }

    // push
    res = await runCmd('git', ['push'], opts);
    logs.push(`git push => code ${res.code}\n${res.stdout}${res.stderr}`);
    if (res.code !== 0) {
        throw new Error('git push 失败：' + res.stderr);
    }

    // cleanup temp
    try { await fsp.rm(tmpDir, { recursive: true, force: true }); } catch (e) { }

    return logs;
}

// Exported function to be called by a central server/router.
// Returns an object { ok: true, logs: string[] } on success, otherwise throws.
export async function submitPatch(body) {
    const logs = await handleSubmit(body);
    return { ok: true, logs };
}

// Expose repoMap so the host server can adjust paths if needed.
export { repoMap };
