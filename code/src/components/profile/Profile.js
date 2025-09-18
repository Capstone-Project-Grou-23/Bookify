import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [sellerBooks, setSellerBooks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', bio: '', profile_picture: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('user'));

        if (token && userData) {
            fetchUserProfile(userData.id, token);
            fetchSellerBooks(userData.id, token);
        }
    }, []);

    const fetchUserProfile = (userId, token) => {
        fetch(`http://localhost:5000/api/users/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if(!data.error) {
                setUser(data);
                setFormData({ name: data.name, bio: data.bio || '', profile_picture: data.profile_picture || '' });
            }
        })
        .catch(console.error);
    };

    const fetchSellerBooks = (sellerId, token) => {
        fetch(`http://localhost:5000/api/books?seller_id=${sellerId}`, {
             headers: { 'Authorization': `Bearer ${token}` }
        })
       .then(res => res.json())
       .then(data => {
           if(!data.error) setSellerBooks(data);
        })
       .catch(console.error);
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/users/${user.id}`, {
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
        return <div>Loading...</div>;
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
