let token = 'ZLJFN27KYX3JQFOV64BA'
let endpoint = 'categories'
let url = `https://www.eventbriteapi.com/v3/${endpoint}/?token=${token}`
let res
let cats = {}

function handleResponse(res) {
    let categories = res.categories

    document.querySelector('#root').innerHTML = '';
    categories.forEach( category  => {
        cats[category.name] = category.name
    });
    return cats
}

function loadEBApi() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)
    xhr.onprogress = function () {
        document.querySelector('#loader').innerHTML = 'loading'
    }

    xhr.onload = function () {
        status = this.status
        if ((status >= 200 && status < 300) || status == 304) {
            res = JSON.parse(this.responseText)
            handleResponse(res)

            for (var id in cats) {
                let opt = document.createElement("OPTION")
                opt.value = cats[id]
                opt.innerHTML = cats[id]
                document.querySelector('#root').appendChild(opt)
            }
            document.querySelector('#loader').innerHTML = ''
        } else {
            document.querySelector('#loader').innerHTML = 'Not Found'
        }
    }

    xhr.onerror = function () {
        console.log('Request Error')
    }

    xhr.send();
}

loadEBApi();