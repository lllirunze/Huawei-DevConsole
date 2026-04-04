import React from "react";
import "../styles/mr.css";

export default function MR(): JSX.Element {
    return (
        <section>
            <h1>MR Pipeline</h1>
            <p className="muted">三个阶段：Patch 提交 → 创建合入请求 → MR 加分（UI 框架）</p>

            <div className="pipeline-wrapper">
                <div className="pipeline">
                    <div className="stage">
                        <div className="stage-title">1. Submit Patch</div>
                        <div className="stage-body">
                            <PatchSubmit />
                        </div>
                    </div>

                    <div className="stage">
                        <div className="stage-title">2. Create MR</div>
                        <div className="stage-body">
                            <CreateMR />
                        </div>
                    </div>

                    <div className="stage">
                        <div className="stage-title">3. +1 Score</div>
                        <div className="stage-body">
                            <AddScore />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PatchSubmit(): JSX.Element {
    const repoMap: Record<string, string> = {
        'frontend-app': '/repos/frontend',
        'service-api': '/repos/api',
        'utils-lib': '/repos/utils'
    };

    const [repoKey, setRepoKey] = React.useState<string>(Object.keys(repoMap)[0]);
    const [branch, setBranch] = React.useState<string>('feature/my-branch');
    const [file, setFile] = React.useState<File | null>(null);
    const [fileName, setFileName] = React.useState<string>('');
    const [commitText, setCommitText] = React.useState<string>(
        '【合入描述】\n【问题单号or需求单号】\n【问题根因】\n【修改或实现方案】\n【是否需要补充DT】'
    );
    const [errors, setErrors] = React.useState<string | null>(null);
    const [status, setStatus] = React.useState<string | null>(null);
    const [busy, setBusy] = React.useState(false);

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    function onSelectFileClick() {
        fileInputRef.current?.click();
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files && e.target.files[0];
        if (f) handleFilePicked(f);
    }

    function handleFilePicked(f: File) {
        const allowed = ['.patch', '.diff'];
        const name = f.name.toLowerCase();
        const ok = allowed.some(ext => name.endsWith(ext)) || f.type === 'text/x-patch' || f.type === 'text/plain';
        if (!ok) {
            setErrors('文件类型必须是 .patch 或 .diff');
            return;
        }
        setFile(f);
        setFileName(f.name);
        setErrors(null);
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        const f = e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) handleFilePicked(f);
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    function validate(): boolean {
        if (!repoKey) { setErrors('请选择代码仓'); return false; }
        if (!branch.trim()) { setErrors('请填写分支名称'); return false; }
        if (!file) { setErrors('请添加 patch 文件 (.patch / .diff)'); return false; }
        const lines = commitText.split(/\r?\n/).map(l => l.trim());
        if (lines.length < 5) { setErrors('Commit 内容需包含 5 行模板'); return false; }
        for (let i = 0; i < 5; i++) {
            if (!lines[i]) { setErrors(`Commit 第 ${i + 1} 行不能为空`); return false; }
        }
        setErrors(null);
        return true;
    }

    async function handleSubmit() {
        setStatus(null);
        if (!validate()) return;
        setBusy(true);
        setErrors(null);
        setStatus('开始执行 patch 提交流程（模拟）...');

        try {
            // 模拟一系列 git 操作（UI 层面不执行真实 git）
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('找到仓：', repoMap[repoKey]);
            await new Promise(resolve => setTimeout(resolve, 800));
            console.log('checkout', branch);
            await new Promise(resolve => setTimeout(resolve, 800));
            console.log('apply patch', fileName);
            await new Promise(resolve => setTimeout(resolve, 900));
            console.log('git add & commit', commitText);
            await new Promise(resolve => setTimeout(resolve, 900));
            console.log('git push');

            setStatus('Patch 已成功提交到远程（模拟）。');
        } catch (err) {
            console.error(err);
            setErrors('提交过程中发生错误（模拟）：' + String(err));
        } finally {
            setBusy(false);
        }
    }

    return (
        <div>
            <div className="muted">将代码以 patch 上传到个人分支</div>

            <div style={{ marginTop: 12 }}>
                <label>仓库</label>
                <div>
                    <select value={repoKey} onChange={e => setRepoKey(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 6 }}>
                        {Object.keys(repoMap).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <label>目标分支</label>
                <div>
                    <input value={branch} onChange={e => setBranch(e.target.value)} placeholder="要合入的分支名" style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 6 }} />
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <label>Patch 文件</label>
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="dropzone"
                    style={{ marginTop: 6, padding: 20, border: '2px dashed rgba(31,41,51,0.08)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: 180, cursor: 'pointer' }}
                    onClick={onSelectFileClick}
                >
                    <input ref={fileInputRef} type="file" accept=".patch,.diff,text/plain" style={{ display: 'none' }} onChange={handleFileChange} />
                    {fileName ? <div>{fileName}</div> : <div className="muted">拖拽 patch 到此或点击选择文件</div>}
                    <button type="button" className="btn" style={{ marginTop: 8 }} onClick={onSelectFileClick}>选择文件</button>
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <label>Commit 内容（必须遵循模板，5 行）</label>
                <div>
                    <textarea value={commitText} onChange={e => setCommitText(e.target.value)} rows={6} style={{ width: '100%', padding: 10, borderRadius: 8, marginTop: 6, fontFamily: 'monospace' }} />
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <button className="btn full-width" onClick={handleSubmit} disabled={busy}>{busy ? '提交中...' : '提交 Patch'}</button>
                {errors && <div style={{ color: '#c8102e' }}>{errors}</div>}
                {status && <div style={{ color: '#0a7a07' }}>{status}</div>}
            </div>
        </div>
    );
}

function CreateMR(): JSX.Element {
    const repoMap: Record<string, string> = {
        'frontend-app': 'proj-123',
        'service-api': 'proj-456',
        'utils-lib': 'proj-789'
    };

    const [repoKey, setRepoKey] = React.useState<string>(Object.keys(repoMap)[0]);
    const [sourceBranch, setSourceBranch] = React.useState<string>('feature/my-branch');
    const [targetBranch, setTargetBranch] = React.useState<string>('develop');
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>(
        '【合入描述】\n【问题单号or需求单号】\n【问题根因】\n【修改或实现方案】\n【是否需要补充DT】'
    );
    const [errors, setErrors] = React.useState<string | null>(null);
    const [status, setStatus] = React.useState<string | null>(null);
    const [busy, setBusy] = React.useState(false);

    function validate(): boolean {
        if (!repoKey) { setErrors('请选择代码仓'); return false; }
        if (!sourceBranch.trim()) { setErrors('请填写源分支'); return false; }
        if (!targetBranch.trim()) { setErrors('请填写目标分支'); return false; }
        if (!title.trim()) { setErrors('请填写 MR 标题'); return false; }
        const lines = description.split(/\r?\n/).map(l => l.trim());
        if (lines.length < 5) { setErrors('MR 描述需包含 5 行模板'); return false; }
        for (let i = 0; i < 5; i++) {
            if (!lines[i]) { setErrors(`描述第 ${i + 1} 行不能为空`); return false; }
        }
        setErrors(null);
        return true;
    }

    async function handleCreate() {
        setStatus(null);
        if (!validate()) return;
        setBusy(true);
        setStatus('创建 MR（模拟）...');
        try {
            // 模拟 API 调用
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('调用创建 MR API', { projectId: repoMap[repoKey], sourceBranch, targetBranch, title, description });
            setStatus('MR 创建成功（模拟）。');
        } catch (err) {
            console.error(err);
            setErrors('创建 MR 失败（模拟）：' + String(err));
        } finally {
            setBusy(false);
        }
    }

    return (
        <div>
            <div className="muted">创建合入请求（Create MR）</div>

            <div style={{ marginTop: 12 }}>
                <label>仓库</label>
                <div>
                    <select value={repoKey} onChange={e => setRepoKey(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 6 }}>
                        {Object.keys(repoMap).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <label>源分支 (source)</label>
                <div>
                    <input value={sourceBranch} onChange={e => setSourceBranch(e.target.value)} placeholder="源分支名" style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 6 }} />
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <label>目标分支 (target)</label>
                <div>
                    <input value={targetBranch} onChange={e => setTargetBranch(e.target.value)} placeholder="目标分支名" style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 6 }} />
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <label>MR 标题</label>
                <div>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="MR 标题" style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 6 }} />
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <label>MR 描述（必须遵循模板，5 行）</label>
                <div>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={6} style={{ width: '100%', padding: 10, borderRadius: 8, marginTop: 6, fontFamily: 'monospace' }} />
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <button className="btn full-width" onClick={handleCreate} disabled={busy}>{busy ? '创建中...' : '创建 MR'}</button>
                {errors && <div style={{ color: '#c8102e' }}>{errors}</div>}
                {status && <div style={{ color: '#0a7a07' }}>{status}</div>}
            </div>
        </div>
    );
}

function AddScore(): JSX.Element {
    const [mrUrl, setMrUrl] = React.useState<string>('');
    const [errors, setErrors] = React.useState<string | null>(null);
    const [status, setStatus] = React.useState<string | null>(null);
    const [busy, setBusy] = React.useState(false);

    function validate(): boolean {
        if (!mrUrl.trim()) { setErrors('请输入要加分的 MR 链接'); return false; }
        try {
            const u = new URL(mrUrl);
            if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new Error('协议不支持');
        } catch (err) {
            setErrors('请输入有效的 http(s) 链接');
            return false;
        }
        setErrors(null);
        return true;
    }

    async function handleAdd() {
        setStatus(null);
        if (!validate()) return;
        setBusy(true);
        setStatus('正在加分（模拟）...');
        try {
            // 模拟 API 请求
            await new Promise(resolve => setTimeout(resolve, 800));
            console.log('调用加分 API, mrUrl=', mrUrl);
            setStatus('+1 加分成功（模拟）');
        } catch (err) {
            console.error(err);
            setErrors('加分失败（模拟）：' + String(err));
        } finally {
            setBusy(false);
        }
    }

    return (
        <div>
            <div className="muted">对指定 MR 添加 1 分（仅示意）</div>

            <div style={{ marginTop: 12 }}>
                <label>MR 链接</label>
                <div>
                    <input value={mrUrl} onChange={e => setMrUrl(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 6 }} />
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <button className="btn full-width" onClick={handleAdd} disabled={busy}>{busy ? '请求中...' : '加 1 分'}</button>
                {errors && <div style={{ color: '#c8102e' }}>{errors}</div>}
                {status && <div style={{ color: '#0a7a07' }}>{status}</div>}
            </div>
        </div>
    );
}

