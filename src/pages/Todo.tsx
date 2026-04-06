import React from "react";
import "../styles/todo.css";

export default function Todo(): JSX.Element {
    return (
        <section className="todo-page">
            <h1>Todo</h1>
            <p className="muted">管理任务生命周期，采用看板式流水线。本地创建任务并在阶段间流转。</p>

            <div className="todo-board">
                <div className="todo-column">
                    <div className="stage-title">未启动（Todo）</div>
                    <div className="task-list">
                        <div className="task-card">
                            <div className="task-title">示例任务 A</div>
                            <div className="task-meta">#123 · 小明</div>
                        </div>
                    </div>
                </div>

                <div className="todo-column">
                    <div className="stage-title">进行中（Doing）</div>
                    <div className="task-list">
                        <div className="task-card">
                            <div className="task-title">示例任务 B</div>
                            <div className="task-meta">#124 · 小红</div>
                        </div>
                    </div>
                </div>

                <div className="todo-column">
                    <div className="stage-title">转测中（Testing）</div>
                    <div className="task-list">
                        <div className="task-card">
                            <div className="task-title">示例任务 C</div>
                            <div className="task-meta">#125 · 小刚</div>
                        </div>
                    </div>
                </div>

                <div className="todo-column">
                    <div className="stage-title">已完成（Done）</div>
                    <div className="task-list">
                        <div className="task-card">
                            <div className="task-title">示例任务 D</div>
                            <div className="task-meta">#126 · 小李</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
