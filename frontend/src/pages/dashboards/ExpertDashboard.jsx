import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ExpertDashboard = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contributions');
      const data = await res.json();
      setContributions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerify = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/contributions/${id}/verify`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        alert(`Contribution ${status}!`);
        fetchContributions();
      } else {
        alert('Verification failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error verifying contribution');
    }
  };

  const pendingContributions = contributions.filter(c => c.verificationStatus === 'Pending');

  return (
    <div className="pt-32 px-12 min-h-screen bg-background text-text-primary">
      <h1 className="text-4xl font-cinzel mb-8">Cultural Expert Dashboard</h1>
      <p className="mb-8">Review and authenticate submitted cultural information.</p>
      
      <div className="bg-surface p-8 rounded-lg max-w-4xl">
        <h2 className="text-2xl font-cinzel mb-6">Pending Verifications ({pendingContributions.length})</h2>
        
        <div className="space-y-6">
          {pendingContributions.map((c) => (
            <div key={c._id} className="border border-white/10 p-6 rounded-lg bg-background/50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-xl text-primary">{c.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">Submitted by: {c.submittedBy?.name || 'Unknown Organization'} | Category: {c.category}</p>
                </div>
              </div>
              <p className="text-white/80 mb-6 bg-surface p-4 rounded">{c.content}</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleVerify(c._id, 'Approved')}
                  className="bg-green-600/20 text-green-400 border border-green-600/50 hover:bg-green-600/40 px-6 py-2 rounded transition-colors"
                >
                  Authenticate & Approve
                </button>
                <button 
                  onClick={() => handleVerify(c._id, 'Rejected')}
                  className="bg-red-600/20 text-red-400 border border-red-600/50 hover:bg-red-600/40 px-6 py-2 rounded transition-colors"
                >
                  Reject Content
                </button>
              </div>
            </div>
          ))}
          {pendingContributions.length === 0 && <p className="text-text-secondary">No pending contributions to verify.</p>}
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;
