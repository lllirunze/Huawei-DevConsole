export type Tool = {
    id: string;
    name: string;
    subtitle: string;
    description?: string;
    link: string;
};

export const tools: Tool[] = [
    {
        id: "scrcpy",
        name: "scrcpy",
        subtitle: "Android 投屏工具",
        description: "通过 USB 实时镜像手机屏幕并支持控制",
        link: "https://github.com/Genymobile/scrcpy"
    },
    {
        id: "iguard",
        name: "iGuard Uploader",
        subtitle: "灵眸版本管理工具",
        description: "上传固件并管理 iGuard 版本信息",
        link: "https://codehub.huawei.com/"
    },
    {
        id: "devconsole",
        name: "Huawei DevConsole",
        subtitle: "开发效率工具平台",
        description: "整合 MR、书签、任务管理等开发工具",
        link: "https://github.com/"
    },
    {
        id: "iguard",
        name: "iGuard Uploader",
        subtitle: "灵眸版本管理工具",
        description: "上传固件并管理 iGuard 版本信息",
        link: "https://codehub.huawei.com/"
    },
    {
        id: "devconsole",
        name: "Huawei DevConsole",
        subtitle: "开发效率工具平台",
        description: "整合 MR、书签、任务管理等开发工具",
        link: "https://github.com/"
    }
];