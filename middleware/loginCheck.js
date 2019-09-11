const {ErrorModel} = require('../model/baseModel')

module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        await next()
        return
    }
    ctx.body = new ErrorModel('登录失败')
    // if (req.session.username) {
    //     next()
    //     return
    // }
    // res.json(
    //     new ErrorModel('登录失败')
    // )
}
