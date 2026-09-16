import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ArtisanDashboard = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/artworks');
      const data = await res.json();
      // In a real app, filter by this artisan's ID or have a specific API endpoint
      setArtworks(data.filter(art => art.artisan?._id === user._id || art.artisan === user._id || art.artisan?.name === user.name));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const res = await fetch('http://localhost:5000/api/artworks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (res.ok) {
        alert('Artwork uploaded successfully!');
        setTitle('');
        setDescription('');
        setImage(null);
        fetchArtworks();
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading artwork');
    }
  };

  return (
    <div className="pt-32 px-12 min-h-screen bg-background text-text-primary">
      <h1 className="text-4xl font-cinzel mb-8">Artisan Dashboard</h1>
      <p className="mb-8">Welcome, {user.name}. Showcase your traditional arts and crafts here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-surface p-8 rounded-lg">
          <h2 className="text-2xl font-cinzel mb-4">Upload New Artwork</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-background border border-white/10 p-2 rounded text-white" required />
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-background border border-white/10 p-2 rounded text-white" required />
            </div>
            <div>
              <label className="block mb-2">Upload Photo</label>
              <input type="file" onChange={e => setImage(e.target.files[0])} className="w-full text-white" required accept="image/*" />
            </div>
            <button type="submit" className="bg-primary text-background px-6 py-2 rounded font-medium hover:bg-primary/90 transition-colors">
              Submit Artwork
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-cinzel mb-4">Your Portfolio</h2>
          <div className="grid grid-cols-2 gap-4">
            {artworks.map((art) => (
              <div key={art._id} className="bg-surface p-4 rounded-lg">
                <img src={`http://localhost:5000${art.imageUrl}`} alt={art.title} className="w-full h-32 object-cover rounded mb-2" />
                <h3 className="font-medium text-lg">{art.title}</h3>
              </div>
            ))}
            {artworks.length === 0 && <p className="text-text-secondary">No artworks uploaded yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;
