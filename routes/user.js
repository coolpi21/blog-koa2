const router = require('koa-router')()
const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/baseModel')

router.prefix('/api/user')
router.post('/login', async (ctx, next) => {
    const {username, password} = ctx.request.body
    if (username && password) {
        const userData = await login(username, password)
        if (userData.username) {
            ctx.session.username = userData.username
            ctx.session.password = userData.password
            ctx.body = new SuccessModel('登录成功')
            return
        }
        ctx.body = new ErrorModel('登录失败')

    }
})



module.exports = router
