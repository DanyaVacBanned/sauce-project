const jwt = require('jsonwebtoken');

  module.exports = function (req, res, next){
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

      req.userId = decoded.id;
      next();
    } catch (e) {
      console.log(e)
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};
