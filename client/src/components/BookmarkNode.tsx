import React, { useState } from "react";

interface ChromeNode {
    type: "folder" | "url";
    name: string;
    url?: string;
    children?: ChromeNode[];
}

interface Props {
    node: ChromeNode;
    level?: number;
}

export default function BookmarkNode({ node, level = 0 }: Props) {
    const isFolder = node.type === "folder";
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        if (isFolder) {
            setOpen(!open);
        } else if (node.url) {
            window.open(node.url, "_blank");
        }
    };

    return (
        <div className={`bookmark-card level-${level}`}>

            {/* 标题（统一点击入口） */}
            <div
                className="bookmark-card-header clickable"
                onClick={handleClick}
            >
                <span>{isFolder ? (open ? "📂" : "📁") : "🔗"}</span>
                <span className="bookmark-card-title">{node.name}</span>
            </div>

            {/* 子节点 */}
            {isFolder && open && node.children && (
                <div className="bookmark-children">
                    {node.children.map((child, index) => (
                        <BookmarkNode key={index} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}