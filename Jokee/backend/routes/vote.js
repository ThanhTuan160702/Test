
const router = require("express").Router()
const ctrls = require('../controllers/vote')

router.post('/', ctrls.CreateVote)

module.exports = router