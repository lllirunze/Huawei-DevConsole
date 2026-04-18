import React from "react";
import { type Tool } from "../data/tools";

type Props = {
    tool: Tool;
};

export default function ToolCard({ tool }: Props): JSX.Element {

    function handleClick() {
        window.open(tool.link, "_blank");
    }

    return (
        <div className="tool-card" onClick={handleClick}>
            <div className="tool-card-content">

                <div className="tool-title">
                    {tool.name}
                </div>

                <div className="tool-subtitle">
                    {tool.subtitle}
                </div>

                {tool.description && (
                    <div className="tool-desc">
                        {tool.description}
                    </div>
                )}

            </div>
        </div>
    );
}