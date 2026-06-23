import React, { useState, useEffect } from "react";
import { User, UserCreateInput } from "../types";

const EMPTY: UserCreateInput = { firstName: "", lastName: "", email: "" };

interface UserFormProps {
  onSubmit: (data: UserCreateInput) => Promise<void>;
  editingUser?: User | null;
  onCancel: () => void;
}

export default function UserForm({ onSubmit, editingUser, onCancel }: UserFormProps) {
  const [form, setForm] = useState<UserCreateInput>(EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(
      editingUser
        ? {
            firstName: editingUser.firstName,
            lastName: editingUser.lastName,
            email: editingUser.email,
          }
        : EMPTY
    );
    setError("");
  }, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit(form);
      if (!editingUser) setForm(EMPTY);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form" noValidate>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      {error && <div className="form-error">{error}</div>}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Jane"
            required
            maxLength={50}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
            maxLength={50}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving…" : editingUser ? "Save changes" : "Add user"}
        </button>
        {editingUser && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
