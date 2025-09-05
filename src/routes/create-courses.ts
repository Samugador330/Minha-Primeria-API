import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from  '../database/client.ts'
import { courses } from '../database/schema.ts'
import z  from 'zod';

//ROTA DE CADASTRO DE NOVO CURSO
export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
//Validação de Dados com type Zod e Fastify onde o type Zod faz a validação e documentação
  server.post('/courses', {
    schema: {
      tags: ['courses'],
      summary: 'Create a new course',
      body: z.object({
        title: z.string().min(5, 'O título precisa ter  5 caracteres'),
      }),
      response: {
        201: z.object({
          courseID: z.uuid(),
        })
      }
    },
   }, async (request, reply) => {
     const courseTitle = request.body.title

  

     const result = await db
     .insert(courses)
     .values({ title: courseTitle,})
     .returning()

   
      
      return reply.status(201).send({ courseID: result[0].id })
  })
}
