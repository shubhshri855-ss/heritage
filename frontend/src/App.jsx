import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import AIGuide from './pages/AIGuide';
import PlaceholderPage from './pages/PlaceholderPage';
import StateHeritagePage from './pages/StateHeritagePage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ArtisanDashboard from './pages/dashboards/ArtisanDashboard';
import OrganizationDashboard from './pages/dashboards/OrganizationDashboard';
import ExpertDashboard from './pages/dashboards/ExpertDashboard';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import CollageBackground from './components/CollageBackground';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SmoothScroll>
          <CollageBackground />
          <CustomCursor />
          <Routes>
            {/* Layout wraps all routes to provide Navbar and Footer */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
          
          {/* Individual Monument Explore View */}
          <Route path="explore/:id" element={<Explore />} />
          
          {/* State Heritage View */}
          <Route path="state/:stateId" element={<StateHeritagePage />} />
          
          {/* Placeholder Routes */}
          <Route path="explore" element={<PlaceholderPage title="Explore Heritage" />} />
          <Route path="heritage-map" element={<PlaceholderPage title="Heritage Map" />} />
          <Route path="ancient-scripts" element={<PlaceholderPage title="Ancient Scripts" />} />
          <Route path="crafts" element={<PlaceholderPage title="Living Crafts" />} />
          <Route path="heritage-quest" element={<PlaceholderPage title="Heritage Quest" />} />
          <Route path="ai-guide" element={<AIGuide />} />
          <Route path="vr" element={<PlaceholderPage title="VR Experience" />} />
          
          {/* Dashboard Routes (RBAC) */}
          <Route 
            path="dashboard/artisan" 
            element={
              <ProtectedRoute allowedRoles={['artisan', 'admin']}>
                <ArtisanDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="dashboard/organization" 
            element={
              <ProtectedRoute allowedRoles={['organization', 'admin']}>
                <OrganizationDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="dashboard/expert" 
            element={
              <ProtectedRoute allowedRoles={['expert', 'admin']}>
                <ExpertDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
        </Route>
      </Routes>
      </SmoothScroll>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
