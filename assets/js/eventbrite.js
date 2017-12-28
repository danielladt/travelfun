let token = 'ZLJFN27KYX3JQFOV64BA'
let endpoint = 'categories'
let url = `https://www.eventbriteapi.com/v3/${endpoint}/?token=${token}`
let res
let loader = document.querySelector('#loader')
let cats = {}
let catVal
var elem = document.getElementById('root');

function handleResponse(res) {
    let categories = res.categories

    document.querySelector('#root').innerHTML = '';
    categories.forEach( category  => {

        cats[category.id] = category.name
    });
    return cats
}

function loadEBApi() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)
    xhr.onprogress = function () {
        loader.innerHTML = 'loading'
    }

    xhr.onload = function () {
        status = this.status
        if ((status >= 200 && status < 300) || status == 304) {
            res = JSON.parse(this.responseText)
            handleResponse(res)
            

            Object.keys(cats).forEach(function(key) {

                let opt = document.createElement("OPTION")
                opt.value = key
                opt.innerHTML = cats[key]
                elem.appendChild(opt)
              
              });
              catVal = elem.value
              loader.innerHTML = ''
            
        } else {
            loader.innerHTML = 'Not Found'
        }
    }

    xhr.onerror = function () {
        console.log('Request Error')
    }

    xhr.send();
}

loadEBApi();



elem.addEventListener('change', function() {
    console.log(elem.value)
}, false);