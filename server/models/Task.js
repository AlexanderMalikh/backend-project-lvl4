import { Model } from 'objection';
import objectionUnique from 'objection-unique';

const unique = objectionUnique({ fields: ['name'] });

export default class Task extends unique(Model) {
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId', 'authorId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 255, minLength: 1 },
        status_id: { type: 'integer', minLength: 1 },
        author_id: { type: 'integer' },
        executor_id: { type: 'integer' },
        created_at: { type: 'timestamp' },
        description: { type: 'string' },
        tag_id: { type: 'integer' },
      },
    };
  }
}
