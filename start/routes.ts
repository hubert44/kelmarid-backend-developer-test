/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post("/signup", "AuthController.signup")
  Route.post("/login", "AuthController.login")

  Route.group(() => {
    Route.get('/authors', 'AuthorsController.index')
    Route.post('/authors', 'AuthorsController.store')
    Route.get('/authors/:id', 'AuthorsController.show')
    Route.put('/authors/:id', 'AuthorsController.update')
    Route.delete('/authors/:id', 'AuthorsController.destroy')
  
    Route.get('/books', 'BooksController.index')
    Route.post('/books', 'BooksController.store')
    Route.put('/books/:id', 'BooksController.update')
  }).middleware('auth')
}).prefix("api");
