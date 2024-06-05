import { createContext, useContext, useState, useEffect } from "react";

const BASE_URL = "https://world-wise-json-server-dmgz.onrender.com";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  async function getCity(id) {
    const res = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await res.json();

    setCurrentCity(data);
  }
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      setCities([...cities, data]);
    } catch {
      alert("Failed to create city");
    } finally {
      setIsLoading(false);
    }
  }
  // delete cities
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities(cities.filter((city) => city.id !== id));
    } catch {
      alert("Failed to delete city");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Failed to fetch cities ");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  const value = {
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    deleteCity,
  };
  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
