import { fastifySwagger } from '@fastify/swagger'
import fastify from 'fastify'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { createCourseRoute } from './src/routes/create-courses.ts'
import { getCourseByIdRoute } from './src/routes/get-course-by-id.ts';
import { getCoursesRoute } from './src/routes/get-courses.ts'
import scalarAPIreference from '@scalar/fastify-api-reference'
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

if (process.env.NODE_ENV === 'development') {
   server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Desafio Node.js API',
      version: '1.0.0',
    }
  },
  transform: jsonSchemaTransform
  })

  server.register(scalarAPIreference, {
    routePrefix: '/docs',
    configuration: {
      theme: 'kepler',
    }
    
  })
  
}

 server.setSerializerCompiler(serializerCompiler)
 server.setValidatorCompiler(validatorCompiler)

 server.register(createCourseRoute)
 server.register(getCourseByIdRoute)
 server.register(getCoursesRoute)

  //ESSE CÓDIGO ABAIXO FAZ O SERVIDOR OUVIR A PORTA 3333
  server.listen({ port: 3333}).then(() => {
    console.log('HTTP server running !')
})
 

