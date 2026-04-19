import React from "react";
import "../styles/bookmarks.css";
import BookmarkNode from "../components/BookmarkNode";
import { chromeBookmarks } from "../data/bookmarks";

export default function Bookmarks(): JSX.Element {
    const roots = chromeBookmarks.roots;

    return (
        <section className="bookmarks-root">
            <h1>Bookmarks</h1>
            <p className="muted">真实 Chrome 书签结构（支持无限嵌套）</p>

            <div className="bookmark-tree">

                {/* 书签栏 */}
                <BookmarkNode node={roots.bookmark_bar} />

                {/* 其他书签 */}
                <BookmarkNode node={roots.other} />

                {/* 同步书签 */}
                <BookmarkNode node={roots.synced} />

            </div>
        </section>
    );
}