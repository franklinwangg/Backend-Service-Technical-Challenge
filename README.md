# Backend-Service-Technical-Challenge
  > This project fetches weather data from the OpenWeather API, processes it, and stores it in a Supabase-based PostgreSQL database. Users can retrieve three-hour interval weather forecasts for a given location.

---

### **2. Features**  
Functionalities :  
    Fetches 5-day / 3-hour interval weather forecasts  
    Stores weather data in PostgreSQL database
    Prevents duplicate entries (ensures only unique data per time slot)  
    Provides API endpoints to retrieve stored weather data  

---

### **3. Installation & Setup**  
#### **Prerequisites**  
- Node.js (`>=16.x`)  
- PostgreSQL  
- API key from OpenWeather  

#### **Installation Steps**  
1. **Clone the repository**:  
   ```sh
   git clone https://github.com/your-username/weather-app.git
   cd server
   ```  
2. **Install dependencies**:  
   ```sh
   npm install
   ```  
3. **Set up environment variables**:  
   Create a `.env` file inside the \server directory and paste the secret keys into it

4. **Run the project**:  
   cd server
   npm start
   
5. **Commands**:  
   Type "fetchweather" to post the weather data(including weather, time of day, latitude, longitude, and temperature) of London, England for three-hour increments for the next twenty-four hours to the database. (You will trigger an error if 24 hours has not passed since the last time this endpoint was triggered)

   Type "getweather" to print a table of all the elements in the weather database so far. 

---

### **4. API Endpoints**  

| Method | Endpoint | Description |
|--------|---------|------------|
| `POST` | `fetch-weather` | posts the weather data(including weather, time of day, latitude, longitude, and temperature) of London, England for three-hour increments for the next twenty-four hours to the database 
| `GET` | `get-weather` | Prints a table of all the elements in the weather database so far 

---

### **5. Database Schema**  
CREATE TABLE weather_data (
    date text,
    weather text,
    lat float8,
    lon float8,
    temperature float8
);

---