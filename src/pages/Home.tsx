import React from "react";
import "../styles/home.css";

export default function Home(): JSX.Element {
    return (
        <section>
            <h1>欢迎 — Huawei DevConsole</h1>
            <div className="home-hero">
                <div className="home-intro">
                    <p>这是执行面板的主页。顶部导航可前往 Bookmarks 与 MR 面板。</p>
                    <div className="home-quick">
                        <div className="home-card chip">快速查看书签</div>
                        <div className="home-card chip">发起 MR</div>
                        <div className="home-card chip">查看流水线</div>
                    </div>
                </div>
                <img src="/src/assets/hero.png" alt="hero" />
            </div>
        </section>
    );
}
