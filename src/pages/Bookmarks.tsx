import React from "react";
import "../styles/bookmarks.css";

export default function Bookmarks(): JSX.Element {
    return (
        <section className="bookmarks-root">
            <h1>Bookmarks</h1>
            <p className="muted">此处将展示来自 Windows Chrome 的书签（稍后接入）。</p>

            <div className="bookmark-list">
                <div className="bookmark-item">
                    <img className="bookmark-favicon" src="/favicon.svg" alt="f" />
                    <div className="bookmark-meta">
                        <div className="bookmark-title">示例书签标题</div>
                        <div className="bookmark-url">https://example.com/path</div>
                    </div>
                </div>
                <div className="bookmark-item">
                    <img className="bookmark-favicon" src="/favicon.svg" alt="f" />
                    <div className="bookmark-meta">
                        <div className="bookmark-title">另一个书签</div>
                        <div className="bookmark-url">https://another.example/</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
