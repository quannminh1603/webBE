// const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv')
// dotenv.config()

// const authMiddleWare = (req, res, next) => {
//     const token = req.headers.token.split(' ')[1]
//     const userId = req.params.id
//     jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
//         if (err) {
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//         if (!user?.role || user?.id === userId) {
//             next()
//         } else {
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//     });
// }

// const authUserMiddleWare = (req, res, next) => {
//     const token = req.headers.token.split(' ')[1]
//     const userId = req.params.id
//     jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
//         if (err) {
//             return res.status(404).json({
//                 message: 'The authemtication111',
//                 status: 'ERROR'
//             })
//         }
//         if (user?.role || user?.id === userId) {
//             next()
//         } else {
//             return res.status(404).json({
//                 message: 'The authemtication123',
//                 status: 'ERROR'
//             })
//         }
//     });
// }

// module.exports = {
//     authMiddleWare,
//     authUserMiddleWare
// }


// test
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication1',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication2',
                status: 'ERROR'
            })
        }
    });
}

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication3',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication4',
                status: 'ERROR'
            })
        }
    });
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}