import React from "react";

export default function Home(): JSX.Element {
    return (
        <section>
            <h1>欢迎 — Huawei DevConsole</h1>
            <p>这是执行面板的主页。顶部导航可前往 Bookmarks 与 MR 面板。</p>
            <div className="card">
                <h2>快速操作</h2>
                <ul>
                    <li>查看 Chrome 书签（Bookmarks 页面）</li>
                    <li>提交代码 / 创建 MR / MR 加分（MR 页面）</li>
                </ul>
            </div>
        </section>
    );
}
