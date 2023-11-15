const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const genneralAccessToken = async (payload) => {
    console.log('playload', payload)
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, {expiresIn: '30s'})

    return access_token
}

const genneralRefreshToken = async (payload) => {
    console.log('playload', payload)
    const refresh_token = jwt.sign({
        payload
    }, process.env.refresh_token, {expiresIn: '365d'})

    return refresh_token
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('token', token)
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if(err) {
                    resolve({
                        status: 'ERROR',
                        message: 'The authemtication'
                    })
                }
                const { payload } = user
                const access_token = await genneralAccessToken({
                    id: payload?.id,
                    role: payload?.role
                })
                console.log('Access token: ', access_token)
                resolve({
                    status: "OK",
                    message: "Success",
                    access_token
                })
            })
        }

        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}