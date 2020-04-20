console.log("start");

function getWeather(input){

    let data = null;
    let city = input;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=f61845cc2a438aef2ac2289b15f69307";
    console.log("url= "+url);
    let xhr = new XMLHttpRequest();

    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            let weatherObj = JSON.parse(this.responseText);
                console.log('Country: ' + weatherObj.name);
                console.log('Current temp: ' + weatherObj.main.temp + '°');
                return weatherObj;
        }
    });
    
    xhr.open("GET", url);
    
    xhr.send(data);
}

function getLocation() {
    let input = document.getElementById("locationInput").value;
    console.log(input);
    getWeather(input);
}
