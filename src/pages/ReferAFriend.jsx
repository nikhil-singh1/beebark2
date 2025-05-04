// src/pages/ReferAFriend.jsx
import React, { useState } from 'react';

const ReferAFriend = () => {
  const [friendEmail, setFriendEmail] = useState('');

  const handleRefer = () => {
    // Logic to handle the referral (e.g., send an email to the friend)
    console.log('Referred friend with email:', friendEmail);
  };

  return (
    <div>
      <h2>Refer a Friend</h2>
      <input
        type="email"
        value={friendEmail}
        onChange={(e) => setFriendEmail(e.target.value)}
        placeholder="Friend's email"
      />
      <button onClick={handleRefer}>Refer</button>
    </div>
  );
};

export default ReferAFriend;
