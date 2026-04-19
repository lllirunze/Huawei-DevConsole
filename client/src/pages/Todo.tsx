import React from "react";
import "../styles/todo.css";
import TaskCard, { type Task } from "../components/TaskCard";

const initial: Task[] = [
    { id: 't-1', type: '需求', title: '实现登录页', link: '', stage: 0 },
    { id: 't-2', type: '问题', title: '修复支付回调异常导致重复扣款', link: '', stage: 1 },
    { id: 't-3', type: '文档', title: '撰写发布说明', link: '', stage: 2 },
    { id: 't-4', type: '版本', title: '2.3.0 发布准备', link: '', stage: 3 }
];

export default function Todo(): JSX.Element {
    const [tasks, setTasks] = React.useState<Task[]>(() => {
        try { const raw = localStorage.getItem('todo.tasks'); return raw ? JSON.parse(raw) as Task[] : initial; } catch { return initial }
    });

    React.useEffect(() => { try { localStorage.setItem('todo.tasks', JSON.stringify(tasks)); } catch {} }, [tasks]);

    function advance(id: string){ setTasks(ts => ts.map(t => t.id === id ? ({...t, stage: Math.min(3, t.stage+1)}) : t)); }
    function revert(id: string){ setTasks(ts => ts.map(t => t.id === id ? ({...t, stage: Math.max(0, t.stage-1)}) : t)); }
    function remove(id: string){ setTasks(ts => ts.filter(t => t.id !== id)); }
    function edit(id: string){
        const t = tasks.find(x => x.id === id); if(!t) return;
        const title = window.prompt('任务标题', t.title) || t.title;
        const type = (window.prompt('工作性质 (需求/问题/版本/文档/其他)', t.type) as Task['type']) || t.type;
        const link = window.prompt('链接 (可选)', t.link || '') || '';
        setTasks(ts => ts.map(x => x.id === id ? ({...x, title, type, link}) : x));
    }

    const columns = [
        { idx: 0, title: '未启动（Todo）' },
        { idx: 1, title: '进行中（Doing）' },
        { idx: 2, title: '转测中（Testing）' },
        { idx: 3, title: '已完成（Done）' }
    ];

    return (
        <section className="todo-page">
            <h1>Pipeline</h1>
            <p className="muted">管理任务生命周期，采用看板式流水线。本地创建任务并在阶段间流转。</p>

            <div className="todo-board">
                {columns.map(col => (
                    <div className="todo-column" key={col.idx}>
                        <div className="stage-title">{col.title}</div>
                        <div className="task-list">
                            {tasks.filter(t => t.stage === col.idx).map(t => (
                                <TaskCard key={t.id} task={t} onAdvance={advance} onRevert={revert} onDelete={remove} onEdit={edit} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
