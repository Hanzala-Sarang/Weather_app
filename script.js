
const W_APIKEY = "1bd1b4366bda8689f7157f4cd6e802aa";
const W_APIURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&q=";

const T_APIKEY = "4FEGIXOH28Z0";
const T_APIURL = "https://api.timezonedb.com/v2.1/get-time-zone?key=4FEGIXOH28Z0&format=json&by=position"


const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){

    const response = await fetch(W_APIURL + city + `&appid=${W_APIKEY}`)

    const data = await response.json()


    if(response.status === "404"){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else{
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    
        if (data.weather[0].main == "Clouds"){
            weatherIcon.src = "assets/clouds.png"
        }
        else if (data.weather[0].main == "Clear"){
            weatherIcon.src = "assets/clear.png"
        }
        else if (data.weather[0].main == "Drizzle"){
            weatherIcon.src = "assets/drizzle.png"
        }
        else if (data.weather[0].main == "Snow"){
            weatherIcon.src = "assets/snow.png"
        }
        else if (data.weather[0].main == "Rain"){
            weatherIcon.src = "assets/rain.png"
        }
        else if (data.weather[0].main == "Mist"){
            weatherIcon.src = "assets/mist.png"
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    return data
}

async function getTimezone(city){

    const w_data = await checkWeather(city)
    
    const response = await fetch(T_APIURL + `&lat=${w_data.coord.lat}&lng=${w_data.coord.lon}`)

    const data = await response.json()

    console.log(data)

    const datetime = data.formatted

    const [date , time] = datetime.split(" ")

    const formattedDate = new Date(date).toLocaleDateString('en-GB').split('-').reverse().join('-');


    document.querySelector(".date").innerHTML = formattedDate;
    document.querySelector(".time").innerHTML = time;

}

searchBtn.addEventListener("click" , async ()=>{
   await checkWeather(searchBox.value);
   await getTimezone(searchBox.value);
})
