const input = document.getElementById('location').addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getLocation();
    }
});

function getLocation() {
    let name = document.getElementById('location').value;
    getWeather(name);
}

const getWeather = async function(arg){
    let location = arg;
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=metric&appid=f61845cc2a438aef2ac2289b15f69307";
    let response = await fetch(url);
    if(response.ok){
        let data = await response.json();
        //console.log(data);
        hydrateWeatherCard(data);
        setIcon(data);
    }else{
        console.log("Server response with = " + response.status);
    }
};


function hydrateWeatherCard(data){
    name = data.name + ", ";
    country = data.sys.country;
    temp = data.main.temp + "°";
    document.getElementById("temp").textContent = temp;
    document.getElementById("name").textContent = name;
    document.getElementById("country").textContent = country;
    document.getElementById("weather-card").classList.remove("d-none");
}

function setIcon(data){
    let conditions = data.weather[0].main;
    let icon = document.getElementById('icon');

    let margin = "mr-5";
    let icoDisplay = "display-1"
    let iconFamily = "wi"
    let iconClass = "";
    

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

