import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Fetch user data from the backend
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user information logic
    fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => alert('Profile updated!'));
  };

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
