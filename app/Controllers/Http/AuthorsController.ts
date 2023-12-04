import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author from 'App/Models/Author';

export default class AuthorsController {
    public async index({ request, response }: HttpContextContract) {
        const { page = 1, perPage = 10, search = '' } = request.all();
    
        const authors = await Author.query()
          .preload('books')
          .where('name', 'LIKE', `%${search}%`)
          .paginate(page, perPage)
    
        return response.status(200).json(authors.all())
    }

    public async store({ request, response }: HttpContextContract) {
        const { name } = request.only(['name'])
    
        await Author.create({ name })
    
        return response.status(201).json({message: "Author created"})
    }

    public async update({ params, request, response }: HttpContextContract) {
        const { name } = request.only(['name'])
    
        const author = await Author.findOrFail(params.id)
        author.name = name
        await author.save()
    
        return response.status(200).json(author)
    }

    public async destroy({ params, response }: HttpContextContract) {
        const author = await Author.findOrFail(params.id)
        await author.delete()
    
        return response.status(202).json({Message: "Author deleted"})
    }
}
