import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from  '../database/client.ts'
import { courses } from '../database/schema.ts'

//ROTA DE BUSCA DA APLICAÇÃO QUE LISTA TODOS OS CURSOS
export const getCoursesRoute: FastifyPluginAsyncZod =  async (server) => {
  
//METODO HTTP//CAMINHO
  server.get('/courses', async (request, reply) => { 
    const result = await db.select({
      id: courses.id,
      title: courses.title,
    }).from(courses)

    return reply.send({ courses: result })

  })
}
