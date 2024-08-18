import React, { useState } from 'react';
import UserReels from './components/UserReels';

function App() {
    const [userId, setUserId] = useState('');

    const handleInputChange = (e) => {
        setUserId(e.target.value);
    };

    return (
        <div className="App">
            <h1>Instagram Reels Scraper</h1>
            <input 
                type="text" 
                placeholder="Enter User ID" 
                value={userId} 
                onChange={handleInputChange} 
            />
            <UserReels userId={userId} />
        </div>
    );
}

export default App;
