import React from "react";

export type TaskType = '需求' | '问题' | '版本' | '文档' | '其他';

export interface Task {
    id: string;
    type: TaskType;
    title: string;
    link?: string;
    stage: number; // 0..3
}

type Props = {
    task: Task;
    onAdvance: (id: string) => void;
    onRevert: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
};

const typeColors: Record<TaskType, string> = {
    需求: '#f6c4b8',
    问题: '#f7d9a7',
    版本: '#cfe4d6',
    文档: '#d7d7f0',
    其他: '#e8e8e8'
};

export default function TaskCard({ task, onAdvance, onRevert, onDelete, onEdit }: Props) {
    const [open, setOpen] = React.useState(false);
    const isFirst = task.stage === 0;
    const isLast = task.stage === 3;

    return (
        <div className="task-card-row">
            <div className="task-type" style={{ background: typeColors[task.type] }}>{task.type[0]}</div>

            <div className="task-main">
                <div className="task-title" title={task.title}>{task.title}</div>
                {task.link ? <a className="task-link" href={task.link} target="_blank" rel="noreferrer">link</a> : null}
            </div>

            <div className="task-more">
                <button className="more-btn" onClick={() => setOpen(s => !s)} aria-label="更多操作">⋯</button>
                {open && (
                    <div className="more-menu">
                        <button onClick={() => { setOpen(false); onEdit(task.id); }}>修改</button>
                        {!isLast && <button onClick={() => { setOpen(false); onAdvance(task.id); }}>推进</button>}
                        {!isFirst && <button onClick={() => { setOpen(false); onRevert(task.id); }}>回退</button>}
                        <button onClick={() => { setOpen(false); onDelete(task.id); }}>删除</button>
                    </div>
                )}
            </div>
        </div>
    );
}
