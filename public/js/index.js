console.log('uid')
//let uid = document.cookie('uid')
function addtab() {
    alert(`javascript:window.location.href='https://tab.hhxxa.tk/bookmark/addtab?uid=${uid}&url=${location.href}&name=${document.title}'`)
}
function alltab() {
    alert(`https://tab.hhxxa.tk/bookmark/getall?uid=${uid}`)
}
function uploadBookmark() {
    let files = document.getElementById('htmlFile').files[0]
    let data = new FormData()
    data.append('html', files)
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText)
        }
    };
    xhr.open('POST', '/bookmark/upload');
    xhr.send(data)
}
function downloadBookmark() {
    let ajax = new XMLHttpRequest()
    // ajax.onreadystatechange = function () {
    //     if (ajax.readyState == 4 && ajax.status == 200) {

    //     }
    // }
    ajax.open("GET", "https://tab.hhxxa.tk/bookmark/download", true)
    ajax.send()
}
//http://127.0.0.1:3000/bookmark/getall?uid=1620405685
function print(data) {
    // let len = data.length
    // for(let i = 0; i < len; i++) {
    //     if(data[i].type === 'href') {
    //         console.log(data[i].href)
    //     } else {
    //         print(data[i].children)
    //     }
    // }
    console.log(data)
}
        //print({{allTab}})