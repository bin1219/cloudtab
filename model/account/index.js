const accountModel = require('./schema')

const accountAddTab = (data) => {
    let { name, url } = data
    let tab = { name, url }
    accountModel.findOne({ uid: data.uid }, (err, docs) => {
        docs.tmpBookmark.push(tab)
        docs.markModified('tmpBookmark')
        docs.save()
    })
}

const accountDeleteTab = (data) => {
    accountModel.findOne({ uid: data.uid }, (err, docs) => {
        docs.tmpBookmark.splice(data.urlID, 1)
        docs.markModified('tmpBookmark')
        docs.save()
    })
}

const accountGetAllTab = (data) => {
    return new Promise((resolve, reject) => {
        accountModel.findOne({ uid: data.uid }, (err, docs) => {
            //保存历史上传书签记录方式
            // let alltab = { tmpTab: docs.tmpBookmark, allTab: docs.allBookmark[docs.allBookmark.length-1] }
            let alltab = { tmpTab: docs.tmpBookmark, allTab: docs.allBookmark }
            resolve(alltab)
            reject({ code: 0 })
        })
    })
}

const accountNewUser = (data) => {
    let user = new accountModel(data)
    user.save()
}

const accountAddFile = (data) => {
    accountModel.findOne({ uid: data.uid }, (err, docs) => {
        docs.filepath.push(data.tabpath)
        docs.markModified('filepath')
        docs.save()
    })
}

const accountGetLastBookmark = (data) => {
    return new Promise((resolve, reject) => {
        accountModel.findOne({ uid: data.uid }, (err, docs) => {
            let lastBookmark = docs.filepath[docs.filepath.length-1]
            resolve(lastBookmark)
            reject({code: 0})
        })
    })
}

const accountUpdateBookmark = (data) => {
    //保存历史上传书签记录方式
    // accountModel.findOne({ uid: data.uid}, (err, docs) => {
    //     docs.allBookmark.push(data.resJson)
    //     docs.markModified('allBookmark')
    //     docs.save()
    // })
    accountModel.findOneAndUpdate({uid: data.uid}, {
        $set: {
            allBookmark: data.resJson
        }
    }, (err, docs) => {
        if (err) {
            console.log(err)
        }
    })
}
module.exports = {
    accountAddTab,
    accountNewUser,
    accountDeleteTab,
    accountGetAllTab,
    accountAddFile,
    accountGetLastBookmark,
    accountUpdateBookmark
}