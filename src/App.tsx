import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ImageList } from './components/images/ImageList';
import { OSList } from './components/os/OSList';
import { OSFamilyList } from './components/os/OSFamilyList';
import { ProviderList } from './components/providers/ProviderList';
import { PublicDashboard } from './components/public/PublicDashboard';
import { Settings } from './components/settings/Settings';
import { Documentation } from './components/docs/Documentation';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PublicDashboard />} />
          <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/images" element={<ImageList />} />
          <Route path="/os" element={<OSList />} />
          <Route path="/os-family" element={<OSFamilyList />} />
          <Route path="/providers" element={<ProviderList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/docs" element={<Documentation />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
