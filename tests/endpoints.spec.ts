import test from 'japa';
import supertest from 'supertest';
import Env from '@ioc:Adonis/Core/Env'
// import { ApplicationContract } from '@ioc:Adonis/Core/Application';
// import User from 'App/Models/User';
// import Author from 'App/Models/Author';
// import Book from 'App/Models/Book';

let BASE_URL = `http://${Env.get('HOST')}:${Env.get('PORT')}`;
let userToken: string;

test.group('Authentication', () => {
  test('Register User: Should create a new user', async (assert) => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
      password_confirmation: 'testpassword'
    };

    const { body } = await supertest(BASE_URL).post('/users').send(userData).expect(201);
    assert.exists(body.id);
  });

  test('Login User: Should login an existing user', async (assert) => {
    const userCredentials = {
      username: 'testuser',
      password: 'testpassword',
    };

    const { body } = await supertest(BASE_URL).post('/login').send(userCredentials).expect(200);
    assert.exists(body.token);
    userToken = body.token; 
  });
});

test.group('Authors', () => {
  test('Fetch Authors: Should fetch authors with book count', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/authors').set('Authorization', `Bearer ${userToken}`).expect(200);
    assert.isArray(body);
  });

  test('Create Author: Should create a new author', async (assert) => {
    const authorData = {
      name: 'Test Author',
    };

    const { body } = await supertest(BASE_URL)
      .post('/authors')
      .set('Authorization', `Bearer ${userToken}`)
      .send(authorData)
      .expect(201);

    assert.exists(body.id);
  });

});

test.group('Books', () => {
  test('Fetch Books: Should fetch books with author details', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/books').set('Authorization', `Bearer ${userToken}`).expect(200);
    assert.isArray(body);
  });

  test('Create Book: Should create a new book', async (assert) => {
    const bookData = {
      name: 'Test Book',
      authorId: 1
    };

    const { body } = await supertest(BASE_URL)
      .post('/books')
      .set('Authorization', `Bearer ${userToken}`)
      .send(bookData)
      .expect(201);

    assert.exists(body.id);
  });

});
