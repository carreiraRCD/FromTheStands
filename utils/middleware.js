const logger = require('./logger')

const requestLogger = (req, res, next) => {
  
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  if(req.method === "POST"){
    logger.info('Body:  ', req.body)
  }
  logger.info('---')
  
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error collection')) {
    return res.status(400).json({ error: 'expected `username` must be unique'})
  } else if (error.name === 'Error' && error.message.includes('data and salt arguments required')) {
    return res.status(400).json({ error: 'expected required arguments was empty'})
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}