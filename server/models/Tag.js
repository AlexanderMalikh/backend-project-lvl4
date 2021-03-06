import { Model } from 'objection';
import objectionUnique from 'objection-unique';

const unique = objectionUnique({ fields: ['name'] });

export default class Tag extends unique(Model) {
  static get tableName() {
    return 'tags';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 255, minLength: 1 },
      },
    };
  }
}
