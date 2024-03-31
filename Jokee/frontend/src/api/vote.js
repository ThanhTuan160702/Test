import axios from '../axios'

export const apiCreateVote = async(data) => axios({
    url: '/vote/',
    method: 'post',
    data
})
