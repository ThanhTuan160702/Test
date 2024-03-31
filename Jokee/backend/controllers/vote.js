const Vote = require('../models/vote')
const asyncHandler = require('express-async-handler')

const CreateVote = asyncHandler(async(req, res) => {
    const response = await Vote.create({idJoke: req.body.idJoke, vote: req.body.vote === true ? 'like' : 'dislike'})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

module.exports = {
    CreateVote
}