const http = require('http')

function compose(middleList) {
    return function (ctx) {
        function dispatch(i) {
            const fn = middleList[i]
            try {
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i + 1))
                )
            } catch (e) {
                return Promise.reject(e)
            }
        }

        return dispatch(0)
    }
}

class LikeKoa {
    constructor() {
        this.middlelist = []
    }

    use(fn) {
        this.middlelist.push(fn)
        return this
    }

    createCtx(req, res) {
        const ctx = {
            req,
            res
        }

        ctx.query = req.query
        return ctx
    }

    createHandle (ctx, fn) {
        return fn(ctx)
    }

    handleback() {
        const fn = compose(this.middlelist)
        return (req, res) => {
            const ctx = this.createCtx(req, res)
            return this.createHandle(ctx, fn)
        }
    }

    listen(...args) {
        const server = http.createServer(this.handleback())
        server.listen(...args)
    }
}

module.exports = LikeKoa
