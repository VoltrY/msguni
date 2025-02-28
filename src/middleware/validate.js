import { ApiError } from '../utils/ApiError.js';

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new ApiError(400, error.details[0].message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};