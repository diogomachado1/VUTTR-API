/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import { createTokenAndUser } from '../util/functions';

async function createTools() {
  const { token } = await createTokenAndUser();
  const tool = await factory.attrs('Tool');

  const response = await request(app)
    .post('/tools')
    .set('Authorization', `bearer ${token}`)
    .send(tool);
  return { tool: response.body, token };
}

describe('Tools', () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  it('should return tools', async () => {
    const { tool, token } = await createTools();

    const response = await request(app)
      .get('/tools')
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toMatchObject([tool]);
  });

  it('should return tools with tags', async () => {
    const { tool, token } = await createTools();

    const response = await request(app)
      .get(`/tools?tag=${tool.tags[0]}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toMatchObject([tool]);
  });

  it('should be able to create a tool', async () => {
    const { token } = await createTokenAndUser();
    const tool = await factory.attrs('Tool');

    const response = await request(app)
      .post('/tools')
      .set('Authorization', `bearer ${token}`)
      .send(tool);

    expect(response.body).toMatchObject(tool);
  });

  it('should have a title to create a tool', async () => {
    const { token } = await createTokenAndUser();
    const tool = await factory.attrs('Tool', {
      title: undefined,
    });

    const response = await request(app)
      .post('/tools')
      .set('Authorization', `bearer ${token}`)
      .send(tool);

    expect(response.status).toBe(400);
  });

  it('should have a array of strings in tags to create a tool', async () => {
    const { token } = await createTokenAndUser();
    const tool = await factory.attrs('Tool', {
      tags: {},
    });

    const response = await request(app)
      .post('/tools')
      .set('Authorization', `bearer ${token}`)
      .send(tool);
    expect(response.status).toBe(400);
  });

  it('should have a array of strings in tags to create a tool', async () => {
    const { token } = await createTokenAndUser();
    const tool = await factory.attrs('Tool', {
      tags: {},
    });

    const response = await request(app)
      .post('/tools')
      .set('Authorization', `bearer ${token}`)
      .send(tool);
    expect(response.status).toBe(400);
  });

  it('should be able to update a tool', async () => {
    const { tool, token } = await createTools();

    const newTool = {
      title: 'testTitle',
      description: 'testDescription',
      link: 'testLink',
      tags: ['test1', 'test2'],
    };
    const response = await request(app)
      .put(`/tools/${tool.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newTool);

    expect(response.body).toMatchObject(newTool);
  });

  it('should have title to update a tool', async () => {
    const { tool, token } = await createTools();

    const newTool = {
      title: undefined,
      description: 'testDescription',
      link: 'testLink',
      tags: ['test1', 'test2'],
    };
    const response = await request(app)
      .put(`/tools/${tool.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newTool);

    expect(response.status).toBe(400);
  });

  it('should have valid id to update a tool', async () => {
    const { tool, token } = await createTools();

    const newTool = {
      title: 'testTitle',
      description: 'testDescription',
      link: 'testLink',
      tags: ['test1', 'test2'],
    };
    const response = await request(app)
      .put(`/tools/${tool.id + 1}`)
      .set('Authorization', `bearer ${token}`)
      .send(newTool);

    expect(response.status).toBe(404);
  });

  it('should be able to delete a tool', async () => {
    const { tool, token } = await createTools();

    const response = await request(app)
      .delete(`/tools/${tool.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('should have valid id to delete a tool', async () => {
    const { tool, token } = await createTools();

    const response = await request(app)
      .delete(`/tools/${tool.id + 1}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
