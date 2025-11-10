import React, { useState, useEffect, useCallback } from "react"; // ✅ 1. Import useCallback
import "./Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [sellerBooks, setSellerBooks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', bio: '', profile_picture: '' });

    // !! IMPORTANT !!
    // Replace this with your actual Render backend URL
    //const BACKEND_URL = "https://YOUR-BACKEND-URL.onrender.com";
    // ✅ --- START OF FIX ---
    // This URL was pointing to a placeholder.
    // It should point to your local backend.
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    // ✅ --- END OF FIX ---

    // ✅ 2. Wrap this function in useCallback
    const fetchUserProfile = useCallback((userId, token) => {
        // Use the public backend URL
        fetch(`${BACKEND_URL}/api/users/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => { // ✅ Added error handling
            if (!res.ok) {
                throw new Error('Failed to fetch user profile');
            }
            return res.json();
        })
        .then(data => {
            if(!data.error) {
                setUser(data);
                setFormData({ name: data.name, bio: data.bio || '', profile_picture: data.profile_picture || '' });
            }
        })
        .catch(console.error);
    }, [BACKEND_URL]); // Dependency

    // ✅ 3. Wrap this function in useCallback
    const fetchSellerBooks = useCallback((sellerId, token) => {
        // Use the public backend URL
        fetch(`${BACKEND_URL}/api/books?seller_id=${sellerId}`, {
             headers: { 'Authorization': `Bearer ${token}` }
        })
       .then(res => res.json())
       .then(data => {
           if(!data.error) setSellerBooks(data);
        })
       .catch(console.error);
    }, [BACKEND_URL]); // Dependency

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('user'));

        if (token && userData) {
            fetchUserProfile(userData.id, token);
            fetchSellerBooks(userData.id, token);
        }
    // ✅ 4. Add the memoized functions to the dependency array
    }, [fetchUserProfile, fetchSellerBooks]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const token = localStorage.getItem('token');
        // Use the public backend URL
        fetch(`${BACKEND_URL}/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                setUser(prev => ({...prev, ...formData}));
                setIsEditing(false);
            }
        })
        .catch(console.error);
    };

    if (!user) {
        return <div>Loading... (Note: You must be logged in to see your profile)</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={formData.profile_picture} alt="Profile" className="profile-pic" />
                <div className="profile-info">
                    {isEditing ? (
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="profile-name-input"/>
                    ) : (
                        <h1>{user.name}</h1>
                    )}
                    <p>{user.email}</p>
                    {isEditing ? (
                        <textarea name="bio" value={formData.bio} onChange={handleInputChange} className="profile-bio-input"></textarea>
                    ) : (
                        <p className="profile-bio">{user.bio || "No bio yet."}</p>
                    )}
                     {isEditing && (
                        <input type="text" name="profile_picture" value={formData.profile_picture} onChange={handleInputChange} placeholder="Image URL" className="profile-pic-input"/>
                    )}
                </div>
                {isEditing ? (
                    <button className="profile-action-btn" onClick={handleSave}>Save</button>
                ) : (
                    <button className="profile-action-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
            </div>
            
            <div className="profile-tabs">
                <div className="tab-content">
                    <h2>Your Listings</h2>
                    <div className="book-list">
                        {sellerBooks.length > 0 ? sellerBooks.map(book => (
                            <div className="book-card" key={book.id}>
                                <img src={book.image_url} alt={book.title} />
                                <h3>{book.title}</h3>
                                <p>${book.price}</p>
                            </div>
                        )) : <p>You haven't listed any books yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
