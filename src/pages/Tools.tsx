import React from "react";
import "../styles/tools.css";
import ToolCard from "../components/ToolCard";
import { tools } from "../data/tools";

export default function Tools(): JSX.Element {

    return (
        <section className="tools-page">

            {/* 标题区（保持统一） */}
            <h1>Tools</h1>
            <p className="muted">
                提升开发效率的个人工具集合
            </p>

            {/* 卡片区域 */}
            <div className="tools-grid">
                {tools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>

        </section>
    );
}