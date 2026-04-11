export const chromeBookmarks = {
    "checksum": "abc123",
    "roots": {
        "bookmark_bar": {
            "name": "书签栏",
            "type": "folder",
            "children": [
                {
                    "type": "folder",
                    "name": "开发工具",
                    "children": [
                        {
                            "type": "url",
                            "name": "GitHub",
                            "url": "https://github.com"
                        },
                        {
                            "type": "folder",
                            "name": "前端",
                            "children": [
                                {
                                    "type": "url",
                                    "name": "React",
                                    "url": "https://react.dev"
                                },
                                {
                                    "type": "folder",
                                    "name": "UI组件",
                                    "children": [
                                        {
                                            "type": "url",
                                            "name": "Ant Design",
                                            "url": "https://ant.design"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "other": {
            "name": "其他书签",
            "type": "folder",
            "children": [
                {
                    "type": "url",
                    "name": "StackOverflow",
                    "url": "https://stackoverflow.com"
                }
            ]
        },
        "synced": {
            "name": "移动设备书签",
            "type": "folder",
            "children": []
        }
    }
};