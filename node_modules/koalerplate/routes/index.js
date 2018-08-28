module.exports = (router) => {
  router.prefix('/v1')
  router.use('/app', require('./app'))
}
