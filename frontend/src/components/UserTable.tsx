import React, { useState } from "react";
import { User } from "../types";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this user?")) return;
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (!users.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👤</div>
        <p>No users yet. Add your first one above.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <div className="user-avatar">
                  <span className="avatar-initials">
                    {u.firstName[0]}
                    {u.lastName[0]}
                  </span>
                  <span>
                    {u.firstName} {u.lastName}
                  </span>
                </div>
              </td>
              <td className="email-cell">{u.email}</td>
              <td className="date-cell">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
              <td className="actions-cell">
                <button
                  className="btn btn-sm btn-edit"
                  onClick={() => onEdit(u)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(u.id)}
                  disabled={deletingId === u.id}
                >
                  {deletingId === u.id ? "…" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
