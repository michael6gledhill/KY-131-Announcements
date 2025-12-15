import React from 'react';
import AnnouncementsPage from './AnnouncementsPage';
import CreatorPage from './CreatorPage';
import Layout from '../components/Layout';
import '../styles/tailwind.css';
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
    <Layout>
      {page === 'announcements' ? <AnnouncementsPage /> : <CreatorPage />}
    </Layout>
  );
};
export default App;
