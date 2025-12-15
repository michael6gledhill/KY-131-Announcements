import React from 'react';
import '../styles/layout.css';

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="layout-root">
    <header className="layout-header">
      <img src="/logo.png" alt="KY-131 Logo" className="layout-logo" />
      <div>
        <h1 className="layout-title">KY-131 Heartland Composite Squadron</h1>
        <div className="layout-subtitle">Civil Air Patrol • U.S. Air Force Auxiliary</div>
      </div>
    </header>
    <nav className="layout-nav">
      <a href="#announcements">Announcements</a>
      <a href="#creator">Editor</a>
      <a href="#docs">Docs</a>
    </nav>
    <main className="layout-main">{children}</main>
    <footer className="layout-footer">
      <div>KY-131 Heartland Composite Squadron</div>
      <div>Civil Air Patrol • U.S. Air Force Auxiliary</div>
    </footer>
  </div>
);

export default Layout;
