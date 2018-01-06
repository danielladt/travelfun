let token = 'ZLJFN27KYX3JQFOV64BA';
let endpoint = 'events/search';
let url = `https://www.eventbriteapi.com/v3/${endpoint}/?token=${token}`;
let res;
let loader = document.querySelector('#loader');
let cats = {};
let envs = {};
let catVal;
var elem = document.getElementById('root');
let results = document.getElementById('eventbrite-mount');

/**
 * @param {*} res type object
 * @return {*} cats type object
 * @description Takes the json response from the EventBrite Categories API and creates an object with the category name and the category ID so that we may query the Events endpoint with a category ID while supplying the user a category name
 * @see https://www.eventbrite.com/developer/v3/endpoints/categories/
 */
function handleCategoriesEndpointResponse(res) {
    let categories = res.categories;

    document.querySelector('#root').innerHTML = '';
    categories.forEach( category  => {

        cats[category.id] = category.short_name;
    });
    return cats;
}

/**
 * 
 * @param {res} type object
 * @return {envs} type object, see @prop
 * @prop {name: "name.text", description: "description.text", url : "url" time: {start: "start.utc", end: ...}, capacity, img} assumes event
 * @description Takes the json response from the EventBrite Events API and creates a nested object struct separated by event ID
 * @see https://www.eventbrite.com/developer/v3/endpoints/events/
 */
function handleEventsEndpointResponse(res) {
    let events = res.events;

    events.forEach( event  => {

        if (!event.logo) {
            let img = false;
        } else {
            img = event.logo.original.url;
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
    envs["count"] = res.pagination.object_count;
    return envs;
}

/**
 * 
 * @param {string} url
 * @requires endpoint, token
 * @returns output for HTML
 * @description Handles, prepares, and executes XMLHttpRequest to the EventBrite API. Looks for endpoint to be set before entering function and passed into the url param. By default, a loader will populate the area of the viewport until the onload function has handled its request
 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onload
 */
function loadEBApi(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    /**
     * 
     * @param {*} e event
     * @prop {e} assumes request has been sent
     * @see ./assets/css/style.css
     */
    xhr.onprogress = function (e) {
        document.body.className = "loading";
    }

    xhr.onload = function () {
        //use the xhr object property status to check the result of the request
        status = this.status;
        if ((status >= 200 && status < 300) || status == 304) {
            //status was good, parse into JSON
            res = JSON.parse(this.responseText);
            envs = {};
            results.innerHTML = '';
            handleEventsEndpointResponse(res);

            //take the envs {events} and output them to the screen
            Object.keys(envs).forEach(function(key) {

                //count used internally, not for user
                if (key === 'count') {
                    console.log(envs[key]);
                    return
                }
                
                /**
                 * @see https://bulma.io/documentation/components/card/
                 */
                let output = `
                <div class="tile is-vertical">
                    <div class="tile">
                    <div class="tile is-parent is-horizontal">
                        <article class="tile is-child notification">
                        <p class="title has-text-dark"> ${envs[key].name} </p>
                        <div class="box">
                            <article class="media">
                            <figure class="media-left">
                                <p class="image is-128x128">
                                <img src=${envs[key].img}">
                                </p>
                            </figure>
                            <div class="media-content">
                                <div class="content">
                                <h4 id="title"> Event </h4>
                                <p id="description"> Description </p>
                                <p id="time-capacity"> Time: ${envs[key].time.start}
                                <span> Capacity: ${envs[key].capacity}</span>
                                </p>
                                <p id="event-url"> <a href="${envs[key].url}">Event Website</a></p>
                                </div>
                            </div>
                            </article>
                        </div>
                        </article>
                    </div>
                    </div>
                </div>
                `

                //if there has been an issue with output, no time to handle errors
                if (!output) {
                    return
                }

                results.innerHTML += output;
            });
            //hide the results and use the loader for default of 0.5s
            results.style.display = 'none';
            setTimeout(function () {
                document.body.className = "";
                results.style.display = 'inline-flex';
                results.style.flexWrap = 'wrap';
                
                /**
                 * @name TimelineLite
                 * @see https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TimelineLite.min.js
                 * @description makes javascript triggered CSS animations easier
                 */
                let tl = new TimelineLite();
                tl.staggerFrom(results.children, 0.3, {
                    y: -15,
                    autoAlpha: 0,
                    ease: Power1.easeOut
                }, 1.5);
            }, 1500);

            
        } else {
            loader.innerHTML = 'Not Found';
        }
    }

    //need better error reporting in future
    xhr.onerror = function () {
        console.log('Request Error')
    }

    xhr.send();
}
if (selection === 'event') {
    loadEBApi(url);
}


//wait for event to trigger
$(document).ready( function () {
    var lat = localStorage.getItem('latitude');
    var lon = localStorage.getItem('longitude');
    endpoint = 'events/search'
    url = `https://www.eventbriteapi.com/v3/${endpoint}/?token=${token}`
    url += `&start_date.range_start=2017-12-31T19:00:00&start_date.range_end=2018-01-31T19:00:00&location.latitude=${lat}&location.longitude=${lon}&&location.within=5mi`
    loadEBApi(url)
})
