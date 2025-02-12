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
                fetch(`http://localhost:3001/fetch-weather`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', // Add the content type header
                    },
                    body: JSON.stringify({
                        lat: 38.9047,  // The data to send in the body
                        lon: -77.0164,
                    }),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then(data => console.log("Fetch weather successful:", data))
                    .catch(error => console.error("Error uploading file:", error));

                break;
            case "getweather":
                fetch(`http://localhost:3001/get-weather`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Get weather successful:");
                        console.table(data);  // Display data in a table format
                    })
                    .catch(error => console.error("Get weather failed:", error));
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