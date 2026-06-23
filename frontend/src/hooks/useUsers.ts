import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import { User, UserCreateInput, UserUpdateInput } from "../types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getUsers();
      if (res.data) setUsers(res.data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = async (data: UserCreateInput) => {
    const res = await api.createUser(data);
    if (res.data) setUsers((prev) => [res.data as User, ...prev]);
    return res;
  };

  const updateUser = async (id: string, data: UserUpdateInput) => {
    const res = await api.updateUser(id, data);
    if (res.data) {
      setUsers((prev) => prev.map((u) => (u.id === id ? (res.data as User) : u)));
    }
    return res;
  };

  const deleteUser = async (id: string) => {
    await api.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
}
