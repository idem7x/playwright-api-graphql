export const QueryFields = {
    USER: `
    id
    name
    email
    gender
    status
  `,
    POST: `
    id
    title
    body
    userId
  `,
    TODO: `
    id
    title
    status
    dueOn
    userId
  `,
    COMMENT: `
    id
    name
    email
    body
    postId
  `,
    PAGE_INFO: `
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  `
} as const;

export const Queries = {
  GET_USERS: `
    query GetUsers($first: Int, $after: String) {
      users(first: $first, after: $after) {
        nodes {
          ${QueryFields.USER}
        }
        pageInfo {
          ${QueryFields.PAGE_INFO}
        }
        totalCount
      }
    }
  `,
  
  GET_USER_BY_ID: `
    query GetUser($id: ID!) {
      user(id: $id) {
        ${QueryFields.USER}
      }
    }
  `,

  GET_POSTS: `
    query GetPosts($first: Int, $after: String) {
      posts(first: $first, after: $after) {
        nodes {
          ${QueryFields.POST}
        }
        pageInfo {
          ${QueryFields.PAGE_INFO}
        }
        totalCount
      }
    }
  `,

  GET_POST_BY_ID: `
    query GetPost($id: ID!) {
      post(id: $id) {
        ${QueryFields.POST}
        user {
          ${QueryFields.USER}
        }
      }
    }
  `,

  GET_TODOS: `
    query GetTodos($first: Int) {
      todos(first: $first) {
        nodes {
          ${QueryFields.TODO}
        }
        totalCount
      }
    }
  `,

  GET_TODO_BY_ID: `
    query GetTodo($id: ID!) {
      todo(id: $id) {
        ${QueryFields.TODO}
      }
    }
  `,

  GET_COMMENTS: `
    query GetComments($first: Int) {
      comments(first: $first) {
        nodes {
          ${QueryFields.COMMENT}
        }
        totalCount
      }
    }
  `
};

export const Mutations = {
  CREATE_USER: `
    mutation CreateUser($input: createUserInput!) {
      createUser(input: $input) {
        user {
          ${QueryFields.USER}
        }
      }
    }
  `,

  UPDATE_USER: `
    mutation UpdateUser($input: updateUserInput!) {
      updateUser(input: $input) {
        user {
          ${QueryFields.USER}
        }
      }
    }
  `,

  DELETE_USER: `
    mutation DeleteUser($input: deleteUserInput!) {
      deleteUser(input: $input) {
        user {
          ${QueryFields.USER}
        }
      }
    }
  `,

  CREATE_POST: `
    mutation CreatePost($input: createPostInput!) {
      createPost(input: $input) {
        post {
          ${QueryFields.POST}
        }
      }
    }
  `,

  UPDATE_POST: `
    mutation UpdatePost($input: updatePostInput!) {
      updatePost(input: $input) {
        post {
          ${QueryFields.POST}
        }
      }
    }
  `,

  DELETE_POST: `
    mutation DeletePost($input: deletePostInput!) {
      deletePost(input: $input) {
        post {
          ${QueryFields.POST}
        }
      }
    }
  `,

  CREATE_TODO: `
    mutation CreateTodo($input: createTodoInput!) {
      createTodo(input: $input) {
        todo {
          ${QueryFields.TODO}
        }
      }
    }
  `,

  UPDATE_TODO: `
    mutation UpdateTodo($input: updateTodoInput!) {
      updateTodo(input: $input) {
        todo {
          ${QueryFields.TODO}
        }
      }
    }
  `,

  DELETE_TODO: `
    mutation DeleteTodo($input: deleteTodoInput!) {
      deleteTodo(input: $input) {
        todo {
          ${QueryFields.TODO}
        }
      }
    }
  `
};
