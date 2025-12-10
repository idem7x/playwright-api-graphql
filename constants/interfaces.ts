export interface User {
  id: number;
  name: string;
  email: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  dueOn: string;
  status: 'pending' | 'completed';
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface Connection<T> {
  nodes: T[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: {
    code?: string;
    [key: string]: any;
  };
}

export interface CreateUserInput {
  name: string;
  email: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
}

export interface UpdateUserInput {
  id: number;
  name?: string;
  email?: string;
  gender?: 'male' | 'female';
  status?: 'active' | 'inactive';
}

export interface DeleteUserInput {
  id: number;
}

export interface CreatePostInput {
  userId: number;
  title: string;
  body: string;
}

export interface UpdatePostInput {
  id: number;
  userId?: number;
  title?: string;
  body?: string;
}

export interface CreateTodoInput {
  userId: number;
  title: string;
  dueOn: string;
  status: 'pending' | 'completed';
}

export interface UpdateTodoInput {
  id: number;
  userId?: number;
  title?: string;
  dueOn?: string;
  status?: 'pending' | 'completed';
}
