
import React from 'react';
import AnnouncementsPage from './AnnouncementsPage';
import CreatorPage from './CreatorPage';
import '../styles/global.css';

const App: React.FC = () => {
  // Simple router: show either announcements or creator based on hash
  const [page, setPage] = React.useState<string>(window.location.hash.replace('#','') || 'announcements');
  React.useEffect(() => {
    const onHashChange = () => setPage(window.location.hash.replace('#','') || 'announcements');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return (
    <div>
      <nav style={{padding:'1em',background:'#667eea',color:'#fff',display:'flex',gap:'1em'}}>
        <span style={{fontWeight:700}}>KY-131 Announcements</span>
        <a href="#announcements" style={{color:'#fff'}}>Announcements</a>
        <a href="#creator" style={{color:'#fff'}}>Creator</a>
      </nav>
      {page === 'announcements' ? <AnnouncementsPage /> : <CreatorPage />}
    </div>
  );
};
export default App;
