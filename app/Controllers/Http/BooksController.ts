import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book';

export default class BooksController {
    public async index({ request, response }: HttpContextContract) {
        const { page = 1, perPage = 10, search = '' } = request.all();
    
        const books = await Book.query()
            .leftJoin('authors', 'books.author_id', 'authors.id')
            .select('books.*', 'authors.name as authorName')
            .preload('author')
            .where((query) => {
                query.where('books.name', 'LIKE', `%${search}%`)
                .orWhere('authors.name', 'LIKE', `%${search}%`);
            })
            .paginate(page, perPage);
           
    
        return response.status(200).json(books.all());
    }

    public async store({ request, response }: HttpContextContract) {
        const { name, authorId, pages } = request.only(['name', 'authorId', 'pages'])
    
        await Book.create({ name, authorId, pages })
    
        return response.status(201).json({message: "Book created"})
    }
    
    public async update({ params, request, response }: HttpContextContract) {
        const { name } = request.only(['name']);
    
        const book = await Book.findOrFail(params.id);
        book.name = name;
        await book.save();
    
        return response.status(200).json(book)
    }
}
