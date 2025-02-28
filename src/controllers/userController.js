import { User } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    // Check if username or email already exists
    if (username || email) {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email: email || '' },
            { username: username || '' }
          ],
          id: { [Op.ne]: req.user.id }
        }
      });

      if (existingUser) {
        throw new ApiError(400, 'Username or email already exists');
      }
    }

    const updatedUser = await req.user.update(req.body);

    res.json({
      status: 'success',
      data: {
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          avatar_url: updatedUser.avatar_url,
          status: updatedUser.status
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['online', 'offline', 'idle', 'dnd'].includes(status)) {
      throw new ApiError(400, 'Invalid status');
    }

    await req.user.update({ status });

    res.json({
      status: 'success',
      data: { status }
    });
  } catch (error) {
    next(error);
  }
};