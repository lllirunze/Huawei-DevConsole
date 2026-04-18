import React, { type JSX } from "react";
import "../styles/repo.css";
import { repos } from "../data/repositories";

export default function RepoDropdown(): JSX.Element {
    const [open, setOpen] = React.useState(false);

    let timeout: any = null;

    function handleEnter() {
        clearTimeout(timeout);
        setOpen(true);
    }

    function handleLeave() {
        timeout = setTimeout(() => {
            setOpen(false);
        }, 150); // 防抖，避免闪烁
    }

    function handleClick(url: string) {
        window.open(url, "_blank");
    }

    return (
        <div
            className="repo-dropdown"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {/* ⭐ 关键：直接用 <a>，吃到 .nav a 样式 */}
            <a className="repo-trigger">
                Repos ▾
            </a>

            {open && (
                <div className="repo-menu">
                    {repos.length === 0 ? (
                        <div className="repo-empty">No repositories</div>
                    ) : (
                        repos.map(repo => (
                            <div
                                key={repo.id}
                                className="repo-item"
                                onClick={() => handleClick(repo.url)}
                            >
                                📁 {repo.name}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}