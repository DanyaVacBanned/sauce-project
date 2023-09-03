const { body } = require('express-validator')




const registerValidation =
[
    body('email', 'Почта не индефицированна').isEmail(),
    body('password', 'Пароль должен содержать от 4 до 32 символов').isLength({ min: 4, max: 32 }),
    body('fullName', 'Имя должно состоять от 2 до 32 символов').isLength({ min: 2, max: 32 }),
    body('city'),


]
const loginValidation =
[
    // body('email', 'Почта не индефицированна').isEmail(),
    body('password', 'Пароль должен состоять от 4 до 64 символов').isLength({ min: 4, max: 64 }),
]
const updateValidation =
[
    // body('email', 'Почта не индефицированна').isEmail(),
    body('password', 'Пароль должен состоять от 4 до 32 символов').isLength({ min: 4, max: 32 }),
    body('fullName', 'Имя должно состоять от 2 до 32 символов').isLength({ min: 2, max: 32 }),
    body('city'),
    body('phone', 'Не являеться мобьльным телефоном').optional().isMobilePhone(),
    body('infoText', 'Текст должен состоять от 0 до 282 символов').optional().isLength({ min: 0, max: 282 }),
    body('imageUrl', 'Не являеться URL').optional().isURL(),

    body('stage').optional(),
    body('allObject').optional(),
    body('cityzship', 'Гражданство должно состоять от 4 до 32 символов').optional().isLength({ min: 4, max: 32 }),
    body('specional', 'Не являеться массивом').optional().isArray(),
    body('addressObject', 'Адресс должен состоять от 4 до 64 символов').optional().isLength({ min: 4, max: 64 }),
]
const createApplicateValidation = 
[
    body('title', 'Название должно содеражть в себя от 3 до 28 символов').isLength({ min: 3, max: 28 }),
    body('text', 'Текст должен содеражть от 3 до 1000 символов').isLength({ min: 3, max: 1000 }),
]
const createPostValidation = 
[
    body('title', 'Название должно содеражть в себя от 2 до 28 символов').isLength({ min: 3, max: 28 }),
    body('text', 'Текст должен содеражть от 3 до 1000 символов').isLength({ min: 3, max: 1000 }),
]

module.exports.createApplicateValidation = createApplicateValidation
module.exports.createPostValidation = createPostValidation
module.exports.loginValidation = loginValidation
module.exports.registerValidation = registerValidation
module.exports.updateValidation = updateValidation
