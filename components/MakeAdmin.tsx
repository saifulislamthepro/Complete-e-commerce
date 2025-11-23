'use client';

import { useState } from 'react';

export default function MakeAdmin() {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<{ name: string, role: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Search user by email
  const handleSearch = async () => {
    if (!email) return alert('Enter an email');

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/search-user/${email}`);
      if (!res.ok) throw new Error('User not found');

      const data = await res.json();
      setUser(data);
    } catch (err) {
      alert('User not found');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Make user admin
  const handleMakeAdmin = async () => {
    if (!user) return;

    const confirmAction = confirm(`Are you sure you want to make ${user.name} an admin?`);
    if (!confirmAction) return;

    try {
      const res = await fetch(`/api/admin/make-admin/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert(`${user.name} is now an admin!`);
        setUser({ ...user, role: 'admin' });
      } else {
        alert('Failed to update role');
      }
    } catch (err) {
      alert('Error updating role');
    }
  };

  return (
    <div className='sub-heading make-admin'>
      <h3><i className='fa-solid fa-code-pull-request'></i> Make Admin</h3>

      <div className='input-container flex column'>
        <strong>Email:</strong>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>

        {user && (
          <>
            <strong>Name: {user.name} </strong>
            <strong>Current Role: {user.role}</strong>
            {user.role !== 'admin' && (
              <button onClick={handleMakeAdmin}>Make Admin</button>
            )}
            {user.role === 'admin' && <p>This user is already an admin.</p>}
          </>
        )}
      </div>
    </div>
  );
}
