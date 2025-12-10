import {test, expect} from '@fixtures/graphqlFixture';
import {Queries, Mutations} from '@constants/queries';
import {TestDataFactory} from '@utils/testData';
import {validator} from '@utils/schemaValidator';
import {todoSchema} from '@schemas/schemas';
import { Todo} from '@constants/interfaces';

test.describe('Todo Operations', () => {
    let testUserId: number;
    let testTodoId: number;

    test('should create a new todo', async ({createGraphQlClient, createGraphQlUser}) => {

        const {user} = createGraphQlUser;
        testUserId = user.id;

        const todoData = TestDataFactory.createTodoInput(testUserId);
        const response = await createGraphQlClient.mutation<{ createTodo: { todo: Todo } }>(
            Mutations.CREATE_TODO,
            {input: todoData}
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.createTodo.todo).toBeDefined();
        expect(response.data?.createTodo.todo.title).toBe(todoData.title);
        expect(response.data?.createTodo.todo.status).toBe(todoData.status);
        expect(response.data?.createTodo.todo.userId).toBe(testUserId);

        const validation = validator.validate(todoSchema, response.data?.createTodo.todo);
        expect(validation.valid).toBeTruthy();

        testTodoId = response.data!.createTodo.todo.id;
    });

    test('should fetch todo by ID', async ({createGraphQlClient}) => {
        const response = await createGraphQlClient.query<{ todo: Todo }>(
            Queries.GET_TODO_BY_ID,
            {id: testTodoId}
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.todo.id).toBe(testTodoId);
        expect(response.data?.todo.userId).toBe(testUserId);
    });

    test('should update todo status', async ({createGraphQlClient}) => {
        const response = await createGraphQlClient.mutation<{ updateTodo: { todo: Todo } }>(
            Mutations.UPDATE_TODO,
            {
                input: {
                    id: testTodoId,
                    status: 'completed'
                }
            }
        );

        expect(response.errors).toBeUndefined();
        expect(response.data?.updateTodo.todo.status).toBe('completed');
    });

    test('should delete a todo', async ({createGraphQlClient}) => {
        const response = await createGraphQlClient.mutation<{ deleteTodo: { todo: Todo | null } }>(
            Mutations.DELETE_TODO,
            {input: {id: testTodoId}}
        );

        expect(response.errors).toBeUndefined();
    });
});
