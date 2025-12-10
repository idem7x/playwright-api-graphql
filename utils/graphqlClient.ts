import { APIRequestContext, expect } from '@playwright/test';
import { GraphQLResponse } from '@constants/interfaces';

export class GraphQLClient {
  private request: APIRequestContext;
  private readonly endpoint: string;

  constructor(request: APIRequestContext, endpoint: string) {
    this.request = request;
    this.endpoint = endpoint;
  }

  async query<T = any>(
    query: string,
    variables?: Record<string, any>,
    expectedStatus = 200
  ): Promise<GraphQLResponse<T>> {
    const response = await this.request.post(this.endpoint, {
      data: {
        query,
        variables
      }
    });

    expect(response.status()).toBe(expectedStatus);
    
    const responseData = await response.json();
    return responseData as GraphQLResponse<T>;
  }

  async mutation<T = any>(
    mutation: string,
    variables?: Record<string, any>,
    expectedStatus = 200
  ): Promise<GraphQLResponse<T>> {
    return this.query<T>(mutation, variables, expectedStatus);
  }

  async queryWithErrors<T = any>(
    query: string,
    variables?: Record<string, any>
  ): Promise<GraphQLResponse<T>> {
    const response = await this.request.post(this.endpoint, {
      data: {
        query,
        variables
      }
    });

    const responseData = await response.json();
    return responseData as GraphQLResponse<T>;
  }

  async batchQuery<T = any>(
    queries: { query: string; variables?: Record<string, any> }[]
  ): Promise<GraphQLResponse<T>[]> {
    const promises = queries.map(({ query, variables }) =>
      this.query<T>(query, variables)
    );
    return Promise.all(promises);
  }
}
