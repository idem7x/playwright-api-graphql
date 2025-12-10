export const userSchema = {
  type: 'object',
  required: ['id', 'name', 'email', 'gender', 'status'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    gender: { type: 'string', enum: ['male', 'female'] },
    status: { type: 'string', enum: ['active', 'inactive'] }
  },
  additionalProperties: false
};

export const postSchema = {
  type: 'object',
  required: ['id', 'userId', 'title', 'body'],
  properties: {
    id: { type: 'number' },
    userId: { type: 'number' },
    title: { type: 'string', minLength: 1 },
    body: { type: 'string', minLength: 1 }
  },
  additionalProperties: false
};

export const todoSchema = {
  type: 'object',
  required: ['id', 'userId', 'title', 'status'],
  properties: {
    id: { type: 'number' },
    userId: { type: 'number' },
    title: { type: 'string', minLength: 1 },
    dueOn: { type: ['string', 'null'], format: 'date-time' },
    status: { type: 'string', enum: ['pending', 'completed'] }
  },
  additionalProperties: false
};

export const commentSchema = {
  type: 'object',
  required: ['id', 'postId', 'name', 'email', 'body'],
  properties: {
    id: { type: 'number' },
    postId: { type: 'number' },
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    body: { type: 'string', minLength: 1 }
  },
  additionalProperties: false
};

export const pageInfoSchema = {
  type: 'object',
  required: ['hasNextPage', 'hasPreviousPage'],
  properties: {
    hasNextPage: { type: 'boolean' },
    hasPreviousPage: { type: 'boolean' },
    startCursor: { type: ['string', 'null'] },
    endCursor: { type: ['string', 'null'] }
  },
  additionalProperties: false
};

export const connectionSchema = (itemSchema: object) => ({
  type: 'object',
  required: ['nodes', 'pageInfo', 'totalCount'],
  properties: {
    nodes: {
      type: 'array',
      items: itemSchema
    },
    pageInfo: pageInfoSchema,
    totalCount: { type: 'number' }
  },
  additionalProperties: false
});

export const graphQLErrorSchema = {
  type: 'object',
  required: ['message'],
  properties: {
    message: { type: 'string' },
    locations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          line: { type: 'number' },
          column: { type: 'number' }
        }
      }
    },
    path: {
      type: 'array',
      items: { type: 'string' }
    },
    extensions: { type: 'object' }
  }
};
