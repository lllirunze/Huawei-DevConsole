import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks";
import MR from "./pages/MR";
import Todo from "./pages/Todo";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/components.css";

export default function App(): JSX.Element {
  const [theme, setTheme] = useState<string>(() => {
    try { return localStorage.getItem('theme') || 'light' } catch { return 'light' }
  });

  useEffect(() => {
    try { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  function toggleTheme(){ setTheme(t => t === 'light' ? 'dark' : 'light') }

  return (
    <BrowserRouter>
      <header className="huawei-header">
        <div className="container">
          <div className="brand">Huawei DevConsole</div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/bookmarks">Bookmarks</Link>
            <Link to="/mr">MR Panel</Link>
            <Link to="/todo">Todo</Link>
            <button aria-label="切换日间/夜间模式" title="切换日间/夜间模式" className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀︎'}
            </button>
          </nav>
        </div>
      </header>

      <main className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/mr" element={<MR />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
