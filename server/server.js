import express from "express";
import { submitPatch } from "./submitPatchServer.js";
import { createMR } from "./createMR.js";
import { voteMR } from "./mrVote.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// ✅ 自动解析 JSON（替代你原来的手动 body 拼接）
app.use(express.json());

// ================= API =================

// submit patch
app.post("/submit-patch", async (req, res) => {
    try {
        const result = await submitPatch(req.body);
        res.json(result);
    } catch (err) {
        console.error("submit-patch failed", err);
        res.status(500).json({
            ok: false,
            error: err?.message || String(err),
        });
    }
});

// create MR
app.post("/create-mr", async (req, res) => {
    try {
        const result = await createMR(req.body);
        res.json(result);
    } catch (err) {
        console.error("create-mr failed", err);
        res.status(500).json({
            ok: false,
            error: err?.message || String(err),
        });
    }
});

// vote MR
app.post("/vote-mr", async (req, res) => {
    try {
        const result = await voteMR(req.body);
        res.json(result);
    } catch (err) {
        console.error("vote-mr failed", err);
        res.status(500).json({
            ok: false,
            error: err?.message || String(err),
        });
    }
});

// ================= 404 =================

app.use((req, res) => {
    res.status(404).send("Not Found");
});

// ================= 启动 =================

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});