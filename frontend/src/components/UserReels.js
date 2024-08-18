import React, { useEffect, useState } from 'react';

const UserReels = ({ userId }) => {
    const [reels, setReels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userId) {
            const fetchReels = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(`/api/reels/${userId}`);
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Failed to fetch reels');
                    }
                    const data = await response.json();
                    setReels(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchReels();
        }
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {reels.length > 0 ? (
                <ul>
                    {reels.map((reel, index) => (
                        <li key={index}>{reel.title || 'Untitled Reel'}</li>
                    ))}
                </ul>
            ) : (
                <div>No reels found.</div>
            )}
        </div>
    );
};

export default UserReels;
