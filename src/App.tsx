import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks";
import MR from "./pages/MR";
import "./styles/huawei.css";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <header className="huawei-header">
        <div className="container">
          <div className="brand">Huawei DevConsole</div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/bookmarks">Bookmarks</Link>
            <Link to="/mr">MR Panel</Link>
          </nav>
        </div>
      </header>

      <main className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/mr" element={<MR />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
