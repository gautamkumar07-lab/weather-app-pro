alert("Script Loaded Successfully");

const API_KEY = "5cfe9d65b6ea88b4e4f485f832cb7120";

/* Search Weather */

async function getWeather() {

    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Enter City Name");
        return;
    }

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        console.log(data);

        if (data.cod == "404") {
            alert("City Not Found");
            return;
        }

        if (data.cod == 401) {
            alert("Invalid API Key");
            return;
        }

        updateWeatherUI(data);

    } catch (error) {

        console.error(error);
        alert("Weather Data Loading Failed");

    }
}

/* My Location Weather */

async function getLocationWeather() {

    if (!navigator.geolocation) {
        alert("Geolocation Not Supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        async function(position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );

                const data = await response.json();

                updateWeatherUI(data);

            } catch (error) {

                console.error(error);
                alert("Location Weather Failed");

            }

        },

        function() {
            alert("Location Permission Denied");
        }

    );
}

/* Update Weather UI */

function updateWeatherUI(data) {

    if (!data || !data.main) return;

    document.getElementById("cityName").innerText =
        data.name;

    document.getElementById("temp").innerText =
        Math.round(data.main.temp) + "°C";

    document.getElementById("humidity").innerText =
        data.main.humidity + "%";

    document.getElementById("wind").innerText =
        data.wind.speed + " km/h";

    document.getElementById("description").innerText =
        data.weather[0].description;

    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    setBackground(data.weather[0].main);
}

/* Dark Mode */

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
    );
}

/* Load Theme */

function loadTheme() {

    if (localStorage.getItem("theme") === "true") {

        document.body.classList.add("dark");

    }
}

/* Dynamic Background */

function setBackground(weather) {

    document.body.classList.remove(
        "sunny",
        "rainy",
        "cloudy"
    );

    if (weather.includes("Clear")) {

        document.body.classList.add("sunny");

    } else if (weather.includes("Rain")) {

        document.body.classList.add("rainy");

    } else {

        document.body.classList.add("cloudy");

    }
}

/* Load Saved Theme */

loadTheme();