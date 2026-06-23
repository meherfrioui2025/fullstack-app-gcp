import { Request, Response } from 'express';
import User from '../models/User';

// GET /api/users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ data: users, total: users.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// POST /api/users
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      res.status(409).json({ error: 'Email already in use' });
      return;
    }

    const user = await User.create({ firstName, lastName, email });
    res.status(201).json({ data: user, message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// PUT /api/users/:id
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email } = req.body;

  try {
    if (email) {
      const existingUser = await User.findOne({ 
        email: email.trim().toLowerCase(),
        _id: { $ne: req.params.id }
      });
      if (existingUser) {
        res.status(409).json({ error: 'Email already in use' });
        return;
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ data: user, message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
