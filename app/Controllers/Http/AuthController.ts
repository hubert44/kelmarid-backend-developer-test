import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
    public async signup({request, response}: HttpContextContract){
        const signupSchema = schema.create({
            username: schema.string({}, [
                rules.unique({ table: 'users', column: 'username'})
            ]),
            password: schema.string({}, [
                rules.confirmed()
            ])
        })

        const payload = await request.validate({ schema: signupSchema })

        await User.create(payload)

        return response.status(201).json({message: "User created"})
    }

    public async login({request, auth}: HttpContextContract){
        const token = await auth.attempt(request.input("username"), request.input("password"))
        return token.toJSON()
    }
}
