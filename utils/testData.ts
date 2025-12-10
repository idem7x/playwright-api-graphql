import { CreateUserInput, CreatePostInput, CreateTodoInput } from '@constants/interfaces';

export class TestDataFactory {
  static createUserInput(overrides?: Partial<CreateUserInput>): CreateUserInput {
    const timestamp = Date.now();
    return {
      name: `Test User ${timestamp}`,
      email: `test.user.${timestamp}@example.com`,
      gender: 'male',
      status: 'active',
      ...overrides
    };
  }

  static createPostInput(userId: number, overrides?: Partial<CreatePostInput>): CreatePostInput {
    const timestamp = Date.now();
    return {
      userId,
      title: `Test Post ${timestamp}`,
      body: `This is test post content created at ${new Date().toISOString()}`,
      ...overrides
    };
  }

  static createTodoInput(userId: number, overrides?: Partial<CreateTodoInput>): CreateTodoInput {
    const timestamp = Date.now();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return {
      userId,
      title: `Test Todo ${timestamp}`,
      dueOn: tomorrow.toISOString(),
      status: 'pending',
      ...overrides
    };
  }
}
