import crypto from 'crypto';

export const isAuth = (reply) => {
  if (!reply.request.signedIn) {
    
  }
};

export const encrypt = (value) => crypto.createHash('sha256')
  .update(value)
  .digest('hex');
