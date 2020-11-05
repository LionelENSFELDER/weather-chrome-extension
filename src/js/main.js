document.addEventListener('DOMContentLoaded', function () {
    init();
    // const primary = document.getElementById('primary');
    // primary.addEventListener('click', ()=>{
    //     init();
    // })
});

function hydrateWeatherCard(data){
    let name = data.name;
    let country = ", " + data.sys.country;
    const regex = /(\w{2,})/g;
    let tempArray = data.main.temp.toString().match(regex);
    let temp = tempArray[0] + "°";
    let humidity = data.main.humidity + " %";
    let pressure = data.main.pressure + " Pa";
    let wind = data.wind.speed + " m/s";
    //
    document.getElementById("temp").textContent = temp;
    document.getElementById("name").textContent = name;
    document.getElementById("country").textContent = country;
    document.getElementById("humidity-data").textContent = humidity;
    document.getElementById("pressure-data").textContent = pressure;
    document.getElementById("wind-data").textContent = wind;
    //
    document.getElementById("weather-card").classList.remove("d-none");
}

function setIcon(data){
    let conditions = data.weather[0].main;
    const icon = document.getElementById('icon');
    let classes = icon.classList;
    let iconClass = "";

    //Regex pattern to match when itérate on icon.classList Object
    var pattern1 = new RegExp("wi-[a-z]*");
    var pattern2 = new RegExp("wi-[a-z]*-[a-z]*");
    
    for(let value of classes){
        var result1 = pattern1.test(value);
        var result2 = pattern2.test(value);
        
        if(result1 === true || result2 === true){
            icon.classList.remove(value);
        }
    }
    
    const conditionsArray = {
        'Clear': 'wi-day-sunny',
        'Clouds': 'wi-cloud',
        'Rain': 'wi-rain',
        'Snow': 'wi-snowflake-cold',
        'Thunderstorm': 'wi-lightning',
        'Mist': 'wi-fog'
    }

    for(let key in conditionsArray){
        if(key == conditions){
            iconClass = conditionsArray[key];
            icon.classList.add(iconClass);
        }
    }
}

const capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('');

class Toast{
    constructor(cod, message){ 
        this.cod = cod;
        this.message = capitalize(message);
        this.createElement();
    }
    
    createElement(){

        let wrapper = document.createElement('div');

        wrapper.innerHTML = `
        <div id="toast" role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="true" data-delay="3000" style="position: absolute; right: 20px; top: 20px;">
        <div class="toast-header">
        <strong class="mr-auto">Warning !!</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="toast-body">
            <p>
            ${this.message}, server response with error code: ${this.cod}.
            </p>
        </div>
        </div>
        `;
        document.body.appendChild(wrapper);
    }
}

function showNotification(cod, message){
    let toast = new Toast(cod, message);
    $('#toast').toast('show'); // boostrap (+jQuery)
}

function getPosition(){
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
      
    function success(pos) {
        const crd = pos.coords;
        getWeather = async function(){
            //let location = arg;
            let lat = crd.latitude;
            let lon = crd.longitude;
            let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=f61845cc2a438aef2ac2289b15f69307";
            console.log(url);
            let response = await fetch(url);
            if(response.ok){
                let data = await response.json();
                console.log(data);
                hydrateWeatherCard(data);
                setIcon(data);
            }else{
                let data = await response.json();
                let cod = data.cod;
                let message = data.message;
                showNotification(cod, message);
            }
        }
        getWeather();
    }
    
    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function init(){
    if(window.isSecureContext){
        console.log("Secured context !");
        if (navigator.geolocation) { 
            console.log("Geolocation granted !");
            getPosition();
            }else{
            console.log("Geolocation denied !");
            let cod = "404";
            let message = "Geolocation denied !";
            showNotification(cod, message);
        }
    }
}

// ()=>{
//     if(window.isSecureContext){
//         console.log("Secured context !");
//         if (navigator.geolocation) { 
//             console.log("Geolocation granted !");
//             getPosition();
//           }else{
//             console.log("Geolocation denied !");
//             let cod = "404";
//             let message = "Geolocation denied !";
//             showNotification(cod, message);
//         }
//     }
// }

// function getLocation() {
//     let name = document.getElementById('location').value;
//     getWeather(name);
// }

// const getWeather = async function(arg){
//     let location = arg;
//     let url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=metric&appid=f61845cc2a438aef2ac2289b15f69307";
//     let response = await fetch(url);
//     if(response.ok){
//         let data = await response.json();
//         console.log(data);
//         hydrateWeatherCard(data);
//         setIcon(data);
//     }else{
//         let data = await response.json();
//         let cod = data.cod;
//         let message = data.message;
//         showNotification(cod, message);
//     }
// };
