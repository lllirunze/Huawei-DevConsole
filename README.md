# Huawei DevConsole

Huawei DevConsole is a lightweight developer productivity tool designed to streamline common engineering workflows such as patch submission, merge request creation, and internal tooling access.

## ✨ Features

* 📦 Patch Submission
  * Submit and apply patch files to remote repositories
* 🔀 Merge Request Automation
  * Create merge requests via API integration
* 👍 MR Voting / Scoring
  * Support internal scoring workflows for merge requests
* 📚 Bookmarks Dashboard
  * Centralized access to frequently used development resources

## 🏗️ Project Structure

```
Huawei-DevConsole
├── client/          # Frontend (React + Vite + TypeScript)
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── server/          # Backend (Node.js + Express)
│   ├── server.js
│   ├── createMR.js
│   ├── mrVote.js
│   └── submitPatchServer.js
│
├── Dockerfile       # Docker configuration
├── package.json     # Root-level scripts (dev orchestration)
└── README.md
```

## 🚀 Getting Started

Frontend

```bash
cd client
npm install
npm run dev
```

Backend

```bash
cd server
npm install
npm start
```

Run Both Services Together (Recommended)

```bash
npm install
npm run dev
```

Access

* Frontend: http://localhost:5173
* Backend: http://localhost:4000
