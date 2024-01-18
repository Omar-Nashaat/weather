// today
let todayName = document.getElementById('todayName');
let todayNum = document.getElementById('todayNum');
let todayMonth = document.getElementById('todayMonth');
let todayLocation = document.getElementById('todayLocation');
let todayTemp = document.getElementById('todayTemp');
let todayImg = document.getElementById('todayImg');
let todayText = document.getElementById('todayText');
let humadity = document.getElementById('humadity');
let wind = document.getElementById('wind');
let direction = document.getElementById('direction');

// next day
let nextDayName = document.getElementById('nextDayName');
let nextDayImg = document.getElementById('nextDayImg');
let nextDayMaxTemp = document.getElementById('nextDayMaxTemp');
let nextDayMinTemp = document.getElementById('nextDayMinTemp');
let nextDayText = document.getElementById('nextDayText');

//after next day
let afterNextDayName = document.getElementById('afterNextDayName');
let afterNextDayImg = document.getElementById('afterNextDayImg');
let afterNextDayMaxTemp = document.getElementById('afterNextDayMaxTemp');
let afterNextDayMinTemp = document.getElementById('afterNextDayMinTemp');
let afterNextDayText = document.getElementById('afterNextDayText');

// search input
let search = document.getElementById('search');


async function getWeatherData(search) {
    let weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6635a3633e2047d3812221506241701&q=${search}&days=3`);
    let weatherdata = await weatherResponse.json();
    return weatherdata;
}


function displayTodayData(data) {
    todayLocation.innerHTML = data.location.name;
    todayImg.setAttribute("src", 'https:' + data.current.condition.icon);
    todayText.innerHTML = data.current.condition.text;
    todayTemp.innerHTML = data.current.temp_c + '°C';
    humadity.innerHTML = data.current.humidity + '%';
    wind.innerHTML = data.current.wind_kph + 'km/h';
    direction.innerHTML = data.current.wind_dir;
    let forecastData = data.forecast.forecastday;
    let todayDate = new Date(forecastData[0].date);
    todayNum.innerHTML = todayDate.getDate(forecastData[0].date);
    todayName.innerHTML = todayDate.toLocaleDateString('en-US', { weekday: 'long' });
    todayMonth.innerHTML = todayDate.toLocaleDateString('en-US', { month: 'long' });
}


function displayNextData(data) {
    let forecastData = data.forecast.forecastday;
    nextDayMaxTemp.innerHTML = forecastData[1].day.maxtemp_c + '°C';
    nextDayMinTemp.innerHTML = forecastData[1].day.mintemp_c + '°C';
    nextDayText.innerHTML = forecastData[1].day.condition.text;
    nextDayImg.setAttribute('src', 'https:' + forecastData[1].day.condition.icon);
    let nextDate = new Date(forecastData[1].date);
    nextDayName.innerHTML = nextDate.toLocaleDateString('en-US', { weekday: 'long' });

}


function displayAfterNextData(data) {
    let forecastData = data.forecast.forecastday;
    afterNextDayMaxTemp.innerHTML = forecastData[2].day.maxtemp_c + '°C';
    afterNextDayMinTemp.innerHTML = forecastData[2].day.mintemp_c + '°C';
    afterNextDayText.innerHTML = forecastData[2].day.condition.text;
    afterNextDayImg.setAttribute('src', 'https:' + forecastData[2].day.condition.icon);
    let AfterNextDate = new Date(forecastData[2].date);
    afterNextDayName.innerHTML = AfterNextDate.toLocaleDateString('en-US', { weekday: 'long' });
}


async function run(search = 'cairo') {
    let weatherData = await getWeatherData(search);
    if (!weatherData.error) {
        displayTodayData(weatherData);
        displayNextData(weatherData);
        displayAfterNextData(weatherData);
    }
}


search.addEventListener('keyup', function () {
    run(search.value);
})


run();