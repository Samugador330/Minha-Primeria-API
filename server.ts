 //const fastify = require('fastify')
// const crypto = require('crypto')
    
    import fastify from 'fastify'
    import crypto from 'node:crypto'

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

  const courses = [
    {id: '1', title: 'Curso de Node.js'},
    {id: '2', title: 'Curso de React Native'},
    {id: '3', title: 'Curso de React'}
  ]

  server.get('/courses', () => { 
    return { courses }

  })

  server.get('/courses/:id', (request, reply) => {
    type Params = {
      id: string  
    }
    const params  = request.params as Params
    const courseId = params.id

    const course = courses.find(course => course.id === courseId)

    if (course) {
      return { course }
    }

    return reply.status(404).send({ error: 'Course not found!' })
  })

  server.post('/courses', (request, reply) => {
    type Body = {
      title: string  
    }
      const courseID = crypto.randomUUID()
      const body = request.body as Body
      const courseTitle = body.title

      if (!courseTitle) {
        return reply.status(400).send({ message: 'Título obrigatóio !' })
      }

      courses.push({id: courseID, title: courseTitle })
      
      return reply.status(201).send({ courseID })
  })
  
  server.listen({ port: 3333}).then(() => {
    console.log('HTTP server running !')
  })
 