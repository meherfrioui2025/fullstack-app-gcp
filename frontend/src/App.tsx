import React, { useState } from 'react';
import { useUsers } from './hooks/useUsers';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import { User, UserCreateInput } from './types';
import './App.css';

export default function App() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleSubmit = async (data: UserCreateInput) => {
    if (editingUser) {
      await updateUser(editingUser.id, data);
      setEditingUser(null);
    } else {
      await createUser(data);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">⬡</span>
            <span className="logo-text">UserVault</span>
          </div>
          <span className="user-count">{users.length} user{users.length !== 1 ? 's' : ''}</span>
        </div>
      </header>

      <main className="app-main">
        <div className="content-grid">
          <aside className="form-panel">
            <UserForm
              onSubmit={handleSubmit}
              editingUser={editingUser}
              onCancel={() => setEditingUser(null)}
            />
          </aside>

          <section className="table-panel">
            <div className="panel-header">
              <h2>All Users</h2>
            </div>
            {loading && <div className="loading-state">Loading users…</div>}
            {error   && <div className="error-banner">⚠ {error}</div>}
            {!loading && !error && (
              <UserTable
                users={users}
                onEdit={setEditingUser}
                onDelete={deleteUser}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
