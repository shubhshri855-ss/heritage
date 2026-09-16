import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const OrganizationDashboard = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Monument');
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contributions');
      const data = await res.json();
      setContributions(data.filter(c => c.submittedBy?._id === user._id || c.submittedBy === user._id || c.submittedBy?.name === user.name));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, content, category })
      });

      if (res.ok) {
        alert('Information contributed successfully!');
        setTitle('');
        setContent('');
        fetchContributions();
      } else {
        alert('Submission failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error contributing information');
    }
  };

  return (
    <div className="pt-32 px-12 min-h-screen bg-background text-text-primary">
      <h1 className="text-4xl font-cinzel mb-8">Cultural Organization Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-surface p-8 rounded-lg">
          <h2 className="text-2xl font-cinzel mb-4">Contribute New Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Title / Subject</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-background border border-white/10 p-2 rounded text-white" required />
            </div>
            <div>
              <label className="block mb-2">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-background border border-white/10 p-2 rounded text-white">
                <option>Monument</option>
                <option>Festival</option>
                <option>Tradition</option>
                <option>Artwork</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Detailed Information</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full bg-background border border-white/10 p-2 rounded text-white h-32" required />
            </div>
            <button type="submit" className="bg-primary text-background px-6 py-2 rounded font-medium hover:bg-primary/90 transition-colors">
              Submit for Verification
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-cinzel mb-4">Your Contributions</h2>
          <div className="space-y-4">
            {contributions.map((c) => (
              <div key={c._id} className="bg-surface p-4 rounded-lg border border-white/5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg text-primary">{c.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${c.verificationStatus === 'Approved' ? 'bg-green-900/50 text-green-400' : c.verificationStatus === 'Rejected' ? 'bg-red-900/50 text-red-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
                    {c.verificationStatus}
                  </span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-2">{c.content}</p>
              </div>
            ))}
            {contributions.length === 0 && <p className="text-text-secondary">No contributions submitted yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
