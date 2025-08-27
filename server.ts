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

  server.get('/courses', async (request, reply) => { 
    const result = await db.select().from(courses)

    return reply.send({ courses: result })

  })

  server.get('/courses/:id', async (request, reply) => {
   type Params = {
      id: string  
    }

    const params  = request.params as Params
    const courseId = params.id

    const course = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))

    if (result.length > 0) {
      return { course: result[0] }
    }

    return reply.status(404).send()
  })

  //server.post('/courses', (request, reply) => {
  // type Body = {
   //   title: string  
  //  }
     // const courseID = crypto.randomUUID()
     // const body = request.body as Body
     // const courseTitle = body.title

      //if (!courseTitle) {
      //  return reply.status(400).send({ message: 'Título obrigatóio !' })
     // }

     // courses.push({id: courseID, title: courseTitle })
      
     // return reply.status(201).send({ courseID })
//  })
  
  server.listen({ port: 3333}).then(() => {
    console.log('HTTP server running !')
})
 