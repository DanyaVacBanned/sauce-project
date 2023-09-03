const jwt = require('jsonwebtoken')

const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token-service')
module.exports = function (req, res, next){
    try{
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader){
            return next(ApiError.UnauthorizerError())
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken){
            return next(ApiError.UnauthorizerError())
        }
        const userData = tokenService.validateAcceessToken(accessToken)
        if(!userData){
            return next(ApiError.UnauthorizerError())
        }
        req.user = userData
        next()
    }catch(err){
        return next(ApiError.UnauthorizerError())
    }
}