const readline = require("readline");  // Import readline module
const WeatherService = require("../services/weatherService");
const { start } = require("repl");

// create cliController methods
// 1) start method - starts the cli controller, and allows it to listen for user input, 2) 

// Function to start the interactive console
function startCLI() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Database Console Started. Type 'help' for commands.");

    rl.setPrompt("> ");
    console.log("1");
    rl.prompt();
    console.log("2");


    rl.on("line", async (line) => {
        const command = line.trim().toLowerCase();

        switch (command) {
            case "fetchweather":
                rl.question("Enter latitude : ", (lat) => {
                    rl.question("Enter longitude : ", async (lon) => {
                        console.log(`Fetching weather data for Latitude: ${lat}, Longitude: ${lon}...`);

                        fetch(`http://localhost:3001/fetch-weather`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json', // Add the content type header
                            },
                            body: JSON.stringify({
                                lat: lat,  // The data to send in the body
                                lon: lon,
                            }),
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then(data => console.log("Fetch weather successful:", data))
                            .catch(error => console.error("Error uploading file:", error));

                    })
                });
                break;
            case "getweather":
                const result = await WeatherService.getPreviousWeatherData();
                for (let i = 0; i < result.rows.length; i++) {
                    console.log("Weather : ", result.rows[i].weather, " Lat : ", result.rows[i].lat, " Lon : ", result.rows[i].lon, " Created at : ", result.rows[i].created_at);
                }
                break;

            case "exit":
                console.log("Exiting console...");
                rl.close();
                process.exit(0);
                break;

            case "help":
                console.log("Available commands:");
                console.log("  fetchweather - Fetch weather data from API");
                console.log("  exit - Close the console");
                break;

            default:
                console.log("Unknown command. Type 'help' for a list of commands.");
        }

        rl.prompt();
    });

    rl.on("close", () => {
        console.log("Console closed.");
        process.exit(0);
    });
}

module.exports = { startCLI };