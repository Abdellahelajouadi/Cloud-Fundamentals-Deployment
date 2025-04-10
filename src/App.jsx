import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {
  // State variables to manage weather data, loading status, and error messages
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [City, setCity] = useState("Agadir");

  // API Key and URL for fetching weather data
  const API_KEY = "2f0656f61a0b4d84f491ba5eb16b974e";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  // Function to fetch weather data based on city name
  const fetchWeather = async (city) => {
    if (loading) return;
    setLoading(true); 
    setError(""); 
    try {
      const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const res = await axios.get(url);
      console.log(res.data); 
      setWeather(res.data); 
    } catch (error) {
      
      if (error.response && error.response.status === 404) {
        setError("City not Found. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      setWeather(null); 
    } finally {
      setLoading(false); 
    }
  };

  
  useEffect(() => {
    fetchWeather("Agadir");
  },[City]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 relative">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/vidio22.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Dark overlay to improve readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-1"></div>
      {/* Main content container */}
      <div className="bg-black/75 text-white rounded-lg shadow-lg p-8 max-w-md w-full z-1000 relative">
        <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>
        {/* Search bar component */}
        <SearchBar
          fetchWeather={fetchWeather}
          setCity={setCity}
          disabled={loading}
        />
        {/* Display loading message when fetching data */}
        {loading && (
          <p className="text-center mt-4 font-semibold">Loading...</p>
        )}
        {/* Display error message if any */}
        {error && (
          <p className="text-red-600 text-center mt-4 font-semibold">{error}</p>
        )}
        {/* Display weather information when data is available */}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
