import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book';

export default class extends BaseSeeder {
  public async run () {
    await Book.createMany([
      {
        name: 'Green Hornet',
        authorId: 2,
        pages: 100
      },
      {
        name: 'Blue Spider',
        authorId: 1,
        pages: 50
      },
    ]);
  }
}
