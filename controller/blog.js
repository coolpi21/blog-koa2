const {exec} = require('../db/db')
const getBlogList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `

    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`

    return await exec(sql)


}

const getBlogDetail = async (id) => {
    const sql = `select * from blogs where id='${id}'`

    const rows = await exec(sql)
    return rows[0]
    
}

// 新建博客
const newBlog = async (blogData) => {
    const title = blogData.title
    const author = blogData.author
    const content = blogData.content
    const createtime = Date.now()

    const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createtime}', '${author}');`

    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id, blogData) => {
    const {title, content} = blogData
    const sql = `update blogs set title='${title}', content='${content}' where id='${id}';`

    const updateResult = await exec(sql)
    if (updateResult.affectedRows > 0) {
        return true
    }
    return false
    // return exec(sql).then(updateResult => {
    //     if (updateResult.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })

}

const delBlog = async (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}'`
    const delResult = await exec(sql)
    if (delResult.affectedRows > 0) {
        return true
    }
    return false
    // return exec(sql).then(delResult => {
    //     if (delResult.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })
}

module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog
}
