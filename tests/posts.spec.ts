import {test, expect} from '@fixtures/graphqlFixture';
import { Queries, Mutations } from '@constants/queries';
import { TestDataFactory } from '@utils/testData';
import { validator } from '@utils/schemaValidator';
import { postSchema, connectionSchema } from '@schemas/schemas';
import { User, Post, Connection } from '@constants/interfaces';

test.describe('Post Operations', () => {
  let testPostId: number;
  let testUserId: number;

  test('should fetch list of posts', async ({ createGraphQlClient }) => {

    const response = await createGraphQlClient.query<{ posts: Connection<Post> }>(
      Queries.GET_POSTS,
      { first: 10 }
    );

    expect(response.errors).toBeUndefined();
    expect(Array.isArray(response.data?.posts.nodes)).toBe(true);
    expect(response.data?.posts.totalCount).toBeGreaterThan(0);

    const validation = validator.validate(
      connectionSchema(postSchema),
      response.data?.posts
    );
    expect(validation.valid).toBeTruthy();
  });

  test('should create a new post', async ({ createGraphQlClient, createGraphQlUser }) => {
    const {user} = createGraphQlUser;
    testUserId = user.id;

    const postData = TestDataFactory.createPostInput(testUserId);

    const response = await createGraphQlClient.mutation<{ createPost: { post: Post } }>(
      Mutations.CREATE_POST,
      { input: postData }
    );

    expect(response.errors).toBeUndefined();
    expect(response.data?.createPost.post).toBeDefined();
    expect(response.data?.createPost.post.title).toBe(postData.title);
    expect(response.data?.createPost.post.body).toBe(postData.body);
    expect(response.data?.createPost.post.userId).toBe(testUserId);

    testPostId = response.data!.createPost.post.id;
  });

  test('should fetch post by ID with user details', async ({ createGraphQlClient }) => {
    const postData = TestDataFactory.createPostInput(testUserId);

    const responsePost = await createGraphQlClient.mutation<{ createPost: { post: Post } }>(
        Mutations.CREATE_POST,
        { input: postData }
    );

    const response = await createGraphQlClient.query<{ post: Post & { user: User } }>(
      Queries.GET_POST_BY_ID,
      { id: responsePost.data!.createPost.post.id }
    );

    expect(response.errors).toBeUndefined();
    expect(response.data?.post.id).toBe(responsePost.data!.createPost.post.id);
    expect(response.data?.post.user).toBeDefined();
    expect(response.data?.post.user.id).toBe(testUserId);
  });

  test('should update a post', async ({ createGraphQlClient }) => {
    const updatedTitle = 'Updated Title ' + Date.now();

    const response = await createGraphQlClient.mutation<{ updatePost: { post: Post } }>(
      Mutations.UPDATE_POST,
      {
        input: {
          id: testPostId,
          title: updatedTitle
        }
      }
    );

    expect(response.errors).toBeUndefined();
    expect(response.data?.updatePost.post.title).toBe(updatedTitle);
  });

  test('should delete a post', async ({ createGraphQlClient }) => {
    const response = await createGraphQlClient.mutation<{ deletePost: { post: Post | null } }>(
      Mutations.DELETE_POST,
      { input: { id: testPostId } }
    );

    expect(response.errors).toBeUndefined();
  });
});
