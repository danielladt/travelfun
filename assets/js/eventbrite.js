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

                results.innerHTML = ''

                console.log(envs)

                Object.keys(envs).forEach(function(key) {

                    if (key === 'count') {
                        return
                    }

                    let output = `
                    <div class="column is-3">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                            <img src="${envs[key].img}" alt="Travel Fun!">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">${envs[key].name}</p>
                                    <p class="subtitle is-6"><a href="${envs[key].url}" target="_blank" title="To Event Brite!">Event URL</a></p>
                                </div>
                            </div>

                            <div class="content">
                            ${envs[key].description}
                            <time datetime="2016-1-1">${envs[key].time.start}</time>
                            </div>
                        </div>
                    </div></div>
                    `

                    // let li = document.createElement('LI')
                    // li.innerHTML = `<h3>${envs[key].name}</h3>`
                    // li.dataset.id = key
                    // results.appendChild(li)

                    if (!output) {
                        return
                    }

                    results.innerHTML += output
                });
                results.style.display = 'none'
                setTimeout(function () {
                    document.body.className = ""
                    results.style.display = 'inline-flex'
                    results.style.flexWrap = 'wrap'
                    
                    //greensock to stagger the lis
                    let tl = new TimelineLite()
                    tl.staggerFrom(results.children, 0.3, {
                        y: -15,
                        autoAlpha: 0,
                        ease: Power1.easeOut
                    }, 0.5)
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
    url += "&start_date.range_start=2017-12-31T19:00:00&start_date.range_end=2018-01-31T19:00:00&location.latitude=40.329555&location.longitude=-74.061529&categories=" + catVal + "&location.within=5mi"
    console.log(url)
    results.innerHTML = ""
    loadEBApi(url)
})