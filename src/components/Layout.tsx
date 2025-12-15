import React from 'react';

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
    <header className="flex items-center gap-6 px-6 py-8 bg-white shadow-md">
      <img src="/logo.png" alt="KY-131 Logo" className="w-16 h-16 rounded-full object-cover shadow" />
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-1">KY-131 Heartland Composite Squadron</h1>
        <div className="text-purple-600 text-lg font-medium">Civil Air Patrol • U.S. Air Force Auxiliary</div>
      </div>
    </header>
    <nav className="flex gap-8 bg-blue-600 text-white px-8 py-3 text-lg font-semibold">
      <a href="#announcements" className="hover:text-yellow-300 transition">Announcements</a>
      <a href="#creator" className="hover:text-yellow-300 transition">Editor</a>
      <a href="#docs" className="hover:text-yellow-300 transition">Docs</a>
    </nav>
    <main className="flex-1 w-full max-w-3xl mx-auto py-8 px-4">{children}</main>
    <footer className="bg-white text-blue-700 text-center py-6 border-t border-blue-100 mt-8">
      <div className="font-semibold">KY-131 Heartland Composite Squadron</div>
      <div className="text-sm">Civil Air Patrol • U.S. Air Force Auxiliary</div>
    </footer>
  </div>
);

export default Layout;
