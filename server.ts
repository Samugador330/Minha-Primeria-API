import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastify from 'fastify'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { createCoursesRoute } from './src/routes/create-courses.ts'
import { getCourseByIdRoute } from './src/routes/get-course-by-id.ts'
import { getCoursesRoute } from './src/routes/get-courses.ts'
//FASTIFY framework
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
 }).withTypeProvider<ZodTypeProvider>()

 server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Desafio Node.js API',
      version: '1.0.0',
    }
  },
  transform: jsonSchemaTransform
  })

  server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    
  })

 server.setSerializerCompiler(serializerCompiler)
 server.setValidatorCompiler(validatorCompiler)

 server.register(createCoursesRoute)
 server.register(getCourseByIdRoute)
 server.register(getCoursesRoute)

  //ESSE CÓDIGO ABAIXO FAZ O SERVIDOR OUVIR A PORTA 3333
  server.listen({ port: 3333}).then(() => {
    console.log('HTTP server running !')
})
 