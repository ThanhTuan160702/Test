const voteRouter = require('./vote')

const initRoutes = (app) => {
    app.use("/api/vote", voteRouter)
}

module.exports = initRoutes