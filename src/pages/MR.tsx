import React from "react";
import "../styles/mr.css";

export default function MR(): JSX.Element {
    return (
        <section>
            <h1>MR Pipeline</h1>
            <p className="muted">三个阶段：Patch 提交 → 创建合入请求 → MR 加分（UI 框架）</p>

            <div className="pipeline-wrapper">
                <div className="pipeline">
                    <div className="stage">
                        <div className="stage-title">1. Submit Patch</div>
                        <div className="stage-body">
                            <p className="muted">将代码以 patch 上传到个人分支</p>
                            <button className="btn">模拟提交</button>
                        </div>
                    </div>

                    <div className="stage">
                        <div className="stage-title">2. Create MR</div>
                        <div className="stage-body">
                            <p className="muted">选择仓库 / 源分支 / 目标分支 / 填写标题与描述</p>
                            <button className="btn">模拟创建</button>
                        </div>
                    </div>

                    <div className="stage">
                        <div className="stage-title">3. +1 Score</div>
                        <div className="stage-body">
                            <p className="muted">对指定 MR 添加 1 分（仅示意）</p>
                            <button className="btn">加分</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

