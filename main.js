console.log("start");

var data = null;

var xhr = new XMLHttpRequest();
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

xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&appid=f61845cc2a438aef2ac2289b15f69307");

xhr.send(data);