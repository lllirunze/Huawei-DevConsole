export type Repo = {
    id: string;
    name: string;
    url: string;
};

export const repos: Repo[] = [
    {
        id: "devconsole",
        name: "Huawei DevConsole",
        url: "https://codehub.huawei.com/"
    },
    {
        id: "iguard",
        name: "iGuard Uploader",
        url: "https://codehub.huawei.com/"
    },
    {
        id: "network",
        name: "Network Tools",
        url: "https://codehub.huawei.com/"
    }
];