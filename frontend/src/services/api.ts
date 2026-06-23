import { User, UserCreateInput, UserUpdateInput, ApiResponse } from '../types';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Request failed');
  return json as T;
}

export const api = {
  getUsers:   () => request<ApiResponse<User[]>>('/users'),
  getUser:    (id: string) => request<ApiResponse<User>>(`/users/${id}`),
  createUser: (body: UserCreateInput) => request<ApiResponse<User>>('/users', { method: 'POST', body: JSON.stringify(body) }),
  updateUser: (id: string, body: UserUpdateInput) => request<ApiResponse<User>>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteUser: (id: string) => request<{ message: string }>(`/users/${id}`, { method: 'DELETE' }),
};
