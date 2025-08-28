 //const fastify = require('fastify')
// const crypto = require('crypto')
    import { eq } from 'drizzle-orm'
    import fastify from 'fastify'
    import { db } from './src/database/client.ts'
    import { courses } from './src/database/schema.ts'

  const server = fastify({ 
    logger: {
      transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
   },
 })

  // const courses = [
    //{id: '1', title: 'Curso de Node.js'},
    //{id: '2', title: 'Curso de React Native'},
   // {id: '3', title: 'Curso de React'}
  //]

//ROTA DE LISTAGEM DE CURSOS
  server.get('/courses', async (request, reply) => { 
    const result = await db.select().from(courses)

    return reply.send({ courses: result })

  })
//////////////*/////////////////////*/////////////////////

//ROTA DE LISTAGEM E DETALHAMENTO DE UM ÚNICO CURSO
  server.get('/courses/:id', async (request, reply) => {    
  
   type Params = {
      id: string  
    }

    const params  = request.params as Params
    const courseId = params.id

    const result = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))

    if (result.length > 0) {
      return { course: result[0] }
    }
  
   return reply.status(404).send()
  
})
///////////////////////////////////////////////////////
//ROTA DE CADASTRO DE NOVO CURSO
  server.post('/courses', async (request, reply) => {
   type Body = {
      title: string  
    }
      
      const body = request.body as Body
      const courseTitle = body.title

      if (!courseTitle) {
        return reply.status(400).send({ message: 'Título obrigatóio !' })
      }

     const result = await db
     .insert(courses)
     .values({ title: courseTitle,})
     .returning()

   
      
      return reply.status(201).send({ courseID: result[0].id })
  })
  
  server.listen({ port: 3333}).then(() => {
    console.log('HTTP server running !')
})
 