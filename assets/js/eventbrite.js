let token = 'ZLJFN27KYX3JQFOV64BA'
let endpoint = 'categories'
let url = `https://www.eventbriteapi.com/v3/${endpoint}/?token=${token}`
let res
let loader = document.querySelector('#loader')
let cats = {}
let catVal
var elem = document.getElementById('root');

function handleCategoriesEndpointResponse(res) {
    let categories = res.categories

    document.querySelector('#root').innerHTML = '';
    categories.forEach( category  => {

        cats[category.id] = category.short_name
    });
    return cats
}

function loadEBApi(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)
    xhr.onprogress = function () {
        loader.innerHTML = 'loading'
    }

    xhr.onload = function () {
        status = this.status
        if ((status >= 200 && status < 300) || status == 304) {
            res = JSON.parse(this.responseText)

            if (endpoint == 'categories') {
                handleCategoriesEndpointResponse(res)
    
                Object.keys(cats).forEach(function(key) {
    
                    let opt = document.createElement("OPTION")
                    opt.value = key
                    opt.innerHTML = cats[key]
                    elem.appendChild(opt)
                  
                  });
    
                  catVal = elem.value
                  loader.innerHTML = ''
            } else {
                console.log(res)
            }

            
        } else {
            loader.innerHTML = 'Not Found'
        }
    }

    xhr.onerror = function () {
        console.log('Request Error')
    }

    xhr.send();
}

loadEBApi(url);



elem.addEventListener('change', function() {
    catVal = elem.value
}, false);

document.querySelector('#butt').addEventListener('click', function () {
    endpoint = 'events/search'
    url = `https://www.eventbriteapi.com/v3/${endpoint}/?token=${token}`
    url += "&start_date.range_start=2017-12-31T19:00:00&start_date.range_end=2018-01-31T19:00:00&location.latitude=40.329555&location.longitude=-74.061529&categories=" + catVal + "&location.within=20mi"
    console.log(url)
    loadEBApi(url)
})