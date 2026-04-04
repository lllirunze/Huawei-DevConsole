# Huawei-DevConsole 外部接口文档

## 📌 一、概览

本系统涉及两个外部接口：

1. CodeHub 创建 MR 接口
2. MR 加分接口（内网）

## 🚀 二、创建 MR 接口（CodeHub）

### 基本信息

- 方法：POST
- URL：https://codehub-g.huawei.com/api/v4/projects/{project_id}/isource/merge_requests

### 请求头（Headers）

| 参数 | 必填 | 说明 |
|------|------|------|
| Private-Token | ✅ | 用户身份凭证 |
| source_branch | ✅ | 源分支 |
| target_branch | ✅ | 目标分支 |
| project_id | ✅ | 项目ID |

### 请求体（Body）

```json
{
  "title": "【修改描述】测试",
  "target_project_id": 1945822,
  "description": "【合入描述】xxx\n【问题单号or需求单号】xxx\n【问题根因】xxx\n【修改或实现方案】xxx\n【是否需要补充DT】xxx",
  "assignee_ids": "",
  "reviewer_ids": "",
  "source_branch": "dev_xxx",
  "target_branch": "master"
}
```

### 响应体

```json
{
  "id": 1446,
  "web_url": "https://codehub-g.huawei.com/.../merge_requests/1446"
}
```

## 🚀 三、MR 加分接口（内网）

基本信息
- 方法：POST
- URL：http://100.102.146.243:3000/codehub/mr/vote

### 请求体（Body）

```json
{
  "url": "https://codehub-g.huawei.com/.../merge_requests/1446"
}
```