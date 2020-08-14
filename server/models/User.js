import { Model } from 'objection';
import objectionUnique from 'objection-unique';
import encrypt from '../lib/secure.js';

const unique = objectionUnique({ fields: ['email'] });

export default class User extends unique(Model) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        first_name: { type: 'string', maxLength: 255 },
        second_name: { type: 'string', maxLength: 255 },
        email: { type: 'string', format: 'email' },
        password_digest: { type: 'string', minLength: 3 },
      },
    };
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }
}
