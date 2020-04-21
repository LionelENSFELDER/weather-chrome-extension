console.log("start");

const input = document.getElementById('location');
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getLocation();
    }
});

function getWeather(inputValue){

    let data = null;
    let city = inputValue;
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=f61845cc2a438aef2ac2289b15f69307";
    let xhr = new XMLHttpRequest();

    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            let weatherObj = JSON.parse(this.responseText);
            hydrateWeatherCard(weatherObj);
            setIcon(weatherObj);
        }else{
            
        }
    });
    
    xhr.open("GET", url);
    
    xhr.send(data);
}

function getLocation() {
    let inputValue = document.getElementById("location").value;
    getWeather(inputValue);
}

function hydrateWeatherCard(weatherObj){
    document.getElementById("weather-card").classList.remove("d-none");
    name = weatherObj.name + ", ";
    country = weatherObj.sys.country;
    temp = weatherObj.main.temp + "°";
    document.getElementById("temp").textContent = temp;
    document.getElementById("name").textContent = name;
    document.getElementById("country").textContent = country;
}

function setIcon(weatherObj){
    //cases : sun, rain, clouds, storm, bolt, snowflake, wind
    let conditions = weatherObj.weather[0].main;
    let margin = "mr-5";
    let icoDisplay = "display-1"
    let iconFamily = "wi"
    let iconClass = "";
    let icon = document.getElementById('icon');
    icon.className = "";

    switch(conditions){
        case 'Clear':
            iconClass = 'wi-day-sunny';
            break;
        case 'Clouds':
            iconClass = 'wi-cloud';
            break;
        case 'Rain':
            iconClass = 'wi-rain';
            break; 
        case 'Snow':
            iconClass = 'wi-snowflake-cold';
            break; 
        case 'Thunderstorm':
            iconClass = 'wi-lightning';
            break; 
        case 'Mist':
            iconClass = 'wi-fog';
            break; 
    }

    icon.classList.add(margin, icoDisplay, iconFamily, iconClass);
}

