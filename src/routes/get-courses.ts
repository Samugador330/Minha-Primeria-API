import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from  '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'
import id from 'zod/v4/locales/id.js'

//ROTA DE BUSCA DA APLICAÇÃO QUE LISTA TODOS OS CURSOS
export const getCoursesRoute: FastifyPluginAsyncZod = async (server)  =>{
  server.get('/courses', {
    schema: {
      tags: ['courses'],
      summary: 'Get all courses',
      response: {
        200: z.object({
          courses: z.array(z.object({
            id: z.uuid(),
            title: z.string(),
          })
        )
        })
      }
    }
  }, async (request, reply) => {

//METODO HTTP//CAMINHO
    const result = await db.select({
      id: courses.id,
      title: courses.title,
    }).from(courses)

    return reply.send({ courses: result })

  })
}
