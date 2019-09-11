const router = require('koa-router')()

router.prefix('/api/blog')
router.get('/list', async (ctx, next) => {
    ctx.body = {
        errno: 0,
        msg: '获取博客列表'
    }
})

router.get('/session-test', async (ctx, next) => {
    if (ctx.session.viewNum == null) {
        ctx.session.viewNum = 0
    }
    ctx.session.viewNum++
    ctx.body = {
        errno: 0,
        viewNum: ctx.session.viewNum
    }
})


module.exports = router
