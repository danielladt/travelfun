let token = 'ZLJFN27KYX3JQFOV64BA'
let endpoint = 'categories'
let url = `https://www.eventbriteapi.com/v3/${endpoint}/?token=${token}`
let res
let loader = document.querySelector('#loader')
let cats = {}
let envs = {}
let catVal
var elem = document.getElementById('root');
let results = document.getElementById('results')

function handleCategoriesEndpointResponse(res) {
    let categories = res.categories

    document.querySelector('#root').innerHTML = '';
    categories.forEach( category  => {

        cats[category.id] = category.short_name
    });
    return cats
}

function handleEventsEndpointResponse(res) {
    let events = res.events

    events.forEach( event  => {

        if (!event.logo) {
            let img = false
        } else {
            img = event.logo.original.url
        }

        envs[event.id] = {
            name: event.name.text,
            description: event.description.text,
            url: event.url,
            time: {
                start: event.start.utc,
                end: event.end.utc
            },
            capacity: event.capacity,
            img: img
        }
    });
    envs["count"] = res.pagination.object_count
    return envs
}

function loadEBApi(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)
    xhr.onprogress = function (e) {
        document.body.className = "loading"
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
                  document.body.className = ""
            } else {
                handleEventsEndpointResponse(res)

                console.log(envs)

                Object.keys(envs).forEach(function(key) {

                    if (key === 'count') {
                        return
                    }

                    let li = document.createElement('LI')
                    li.innerHTML = `<h3>${envs[key].name}</h3>`
                    li.dataset.id = key
                    results.appendChild(li)
                });
                results.style.display = 'none'
                setTimeout(function () {
                    document.body.className = ""
                    results.style.display = 'block'
                    
                    //greensock to stagger the lis
                    let tl = new TimelineLite()
                    tl.staggerFrom(results.children, 0.3, {
                        y: -15,
                        autoAlpha: 0,
                        ease: Power1.easeOut
                    }, 0.05)
                }, 1500)
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