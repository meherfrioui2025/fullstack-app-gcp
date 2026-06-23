export interface User {
  id: string; // Since we changed mongoose to return id from _id via transform
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type UserCreateInput = Pick<User, 'firstName' | 'lastName' | 'email'>;
export type UserUpdateInput = Partial<UserCreateInput>;

export interface ApiResponse<T> {
  data?: T;
  total?: number;
  message?: string;
}
