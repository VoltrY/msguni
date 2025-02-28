import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

export const setupSecurity = (app) => {
  // Basic security headers
  app.use(helmet());

  // Rate limiting
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many login attempts, please try again later'
  });

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  });

  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
  app.use('/api', apiLimiter);
};