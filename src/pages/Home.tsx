import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home(): JSX.Element {
    return (
        <section>
            <h1>欢迎 — Huawei DevConsole</h1>
            <div className="home-hero">
                <div className="home-intro">
                    <p>这是执行面板的主页。顶部导航可前往 Bookmarks 与 MR 面板。</p>
                    <div className="home-quick">
                        <Link to="/bookmarks" className="home-card chip">快速查看书签</Link>
                        <Link to="/mr" className="home-card chip">发起 MR</Link>
                        <Link to="/todo" className="home-card chip">Todo</Link>
                    </div>
                </div>
                <img src="/src/assets/hero.png" alt="hero" />
            </div>
        </section>
    );
}
