// source : internet

const fs = require('fs')
const cheerio = require('cheerio')

const getRoot = (body) => {
    let h3 = body.find('h3').first()
    let isChrome = typeof h3.attr('personal_toolbar_folder') === 'string'
    if(isChrome) {
        return body.children('dl').first()
    }
    let isSafari = typeof h3.attr('folded') === 'string'
    if(isSafari) {
        return body
    }
    let isIE = typeof h3.attr('item_id') === 'string'
    if(isIE) {
        return body.children('dl').first()
    }
    let isFirefox = h3.text() === 'Mozilla Firefox'
    if(isFirefox) {
        return body.children('dl').first()
    }
    return body.children('dl').first()
}

const parseByString = (content) => {
    let $ = cheerio.load(content, {
        decodeEntities: false
    })
    let body = $('body')
    let root = []
    let rdt = getRoot(body).children('dt')
    let parseNode = (node) => {
        let eq0 = node.children().eq(0)
        let name = eq0.html() || ''
        let type = 'site'
        let href = ''
        let icon = ''
        let children = []
        switch(eq0[0].name) {
            case 'h3':
                type = 'folder'
                let dl = node.children('dl').first()
                let dts = dl.children()
                let ls = dts.toArray().map((ele) => {
                    if(ele.name !== 'dt')
                        return null
                    return parseNode($(ele))
                })
                children = ls.filter((item) => {
                    return item !== null
                })
            case 'a':
                href = eq0.attr('href') || ''
                icon = eq0.attr('icon') || ''
        }
        return {
            name: name,
            type: type,
            href: href,
            //icon: icon,
            children: children
        }
    }
    rdt.each((_, item) => {
        let node = $(item)
        let child = parseNode(node)
        root.push(child)
    })
    return root
}
const parseByPath = (path) => {
    let content = fs.readFileSync(path, 'utf-8')
    return parseByString(content)
}

module.exports = parseByPath