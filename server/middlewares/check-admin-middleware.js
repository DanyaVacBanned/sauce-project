const jwt = require('jsonwebtoken');

const UserModel = require('../models/user-model')


  module.exports = async function (req, res, next){

  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    try{
        if(decoded.role === 3){
            req.userId = decoded.id;
            next();
        }else{
            res.status(403).json({
                message: 'У вас недостаточно прав'
            })
        }

        
    }catch(err){
        console.log(err)
        res.status(501).json({
            message: 'нет доступа'
        })
    }
  
};
