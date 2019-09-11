const router = require('koa-router')()
const {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/baseModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')
router.get('/list', async (ctx, next) => {
    let {author, keyword} = ctx.query

    if (ctx.query.isadmin) {
        // 管理员界面
        if (ctx.session.username == null) {
            ctx.body = new SuccessModel('未登录')
            return
        }
        author = ctx.session.username
    }
    const listData = await getBlogList(author, keyword)
    ctx.body = new SuccessModel(listData)

})

router.get('/detail', async (ctx, next) => {
    if (ctx.query.id) {
        const data = await getBlogDetail(ctx.query.id)
        ctx.body = new SuccessModel(data)
    }
})

router.post('/new', async (ctx, next) => {
    let body = ctx.request.body
    body.author = ctx.session.username

    const data = await newBlog(body)
    ctx.body = new SuccessModel(data)

})

router.post('/update', async (ctx, next) => {
    const val = await updateBlog(ctx.query.id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新博客失败')
    }

})

router.post('/del', async (ctx, next) => {
    const author = ctx.session.username
    const val = await delBlog(ctx.query.id, author)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('删除博客失败')
    }
})

// router.get('/session-test', async (ctx, next) => {
//     if (ctx.session.viewNum == null) {
//         ctx.session.viewNum = 0
//     }
//     ctx.session.viewNum++
//     ctx.body = {
//         errno: 0,
//         viewNum: ctx.session.viewNum
//     }
// })


module.exports = router
