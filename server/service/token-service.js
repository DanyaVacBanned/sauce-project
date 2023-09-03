
const jwt = require('jsonwebtoken')

const tokenModel = require('../models/token-model')
class TokenService {
    
    generationTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '120d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '390d'})

        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({ user: userId })
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({ user: userId, refreshToken})
        return token
    }
    async removeToken(refreshToken){
        const tokenData = await tokenModel.deleteOne({ refreshToken })
        return tokenData
    }
    async validateAcceessToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
            return userData
        }catch(err){
            return null
        }
    }
    async validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
            return userData
        }catch(err){
            return null
        }
    }
    async findToken(refreshToken){
        const tokenData = await tokenModel.findOne({ refreshToken })
        return tokenData
    }
}








module.exports = new TokenService()