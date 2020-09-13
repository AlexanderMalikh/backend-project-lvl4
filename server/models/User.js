import { Model } from 'objection';
import objectionUnique from 'objection-unique';
import encrypt from '../lib/secure.js';

const unique = objectionUnique({ fields: ['email'] });

export default class User extends unique(Model) {
  static get tableName() {
    return 'users';
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', maxLength: 255, minLength: 3 },
        lastName: { type: 'string', maxLength: 255, minLength: 3 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }
}
