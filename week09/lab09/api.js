// Function to update the webpage with weather data
function displayWeather(response) {
    if (response !== 'error') {
        const weatherData = JSON.parse(response); // Convert JSON response to JS object
        let temperature = weatherData.current_weather.temperature;
        let precipitation = weatherData.current_weather.precipitation;
        let cloudCover = weatherData.current_weather.cloudcover;

        // Display data on webpage
        document.getElementById('temperature').innerHTML = `Temperature: ${temperature}°F`;
        document.getElementById('precipitation').innerHTML = `Precipitation: ${precipitation} inches`;
        
        // Cloud cover emoji logic
        let cloudEmoji = cloudCover > 50 ? "☁️" : "☀️";
        document.getElementById('cloudcover').innerHTML = cloudEmoji;
            } else {
                document.getElementById('temperature').innerHTML = "Error loading weather data.";
                document.getElementById('precipitation').innerHTML = "";
                document.getElementById('cloudcover').innerHTML = "";
            }
        }

        // Define API endpoint (Open-Meteo)
        let endpoint = 'https://api.open-meteo.com/v1/forecast?latitude=43.0481&longitude=-76.1474&current_weather=true&temperature_unit=fahrenheit&precipitation_unit=inch';

        // Step 1 - Create Request object
        const request = new XMLHttpRequest();

        // Step 2 - EventListener - Check Request status
        request.addEventListener('readystatechange', () => {  // 
            if (request.readyState === 4 && request.status === 200) {  // listening for request complete
                displayWeather(request.responseText); // Process response
            } else if (request.readyState === 4) {                        // if finished and didn't get statues 200 
                displayWeather('error'); // Handle errors
            }
        });

        // Step 3 - Open endpoint & send request
        request.open('GET', endpoint);    // 'open' - setup kind of request & endpoint
        request.send();    // 'send' - actually getting data.