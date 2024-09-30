import React, { useEffect, useMemo, useState } from 'react';
import Form from './Form';
import Card from './Card';
import SavedCity from './SavedCity';

const WeatherPanel = () => {
    let urlWeather = "https://api.openweathermap.org/data/2.5/weather?appid=834ffe11e78f5e2b532974b784e9c00e&lang=es";
    let cityUrl = "&q=";
    let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?appid=834ffe11e78f5e2b532974b784e9c00e&lang=es";

    const LS = () => {
        const localStorageSavedCities = localStorage.getItem('savedCities');
        return localStorageSavedCities ? JSON.parse(localStorageSavedCities) : [];
    }

    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState("");
    const [savedCities, setSavedCities] = useState(LS);

    const getLocation = async (loc) => {
        setLoading(true);
        setLocation(loc);

        urlWeather = urlWeather + cityUrl + loc

        await fetch(urlWeather).then((response) => {
            if (!response.ok) throw { response }
            return response.json();
        }).then((weatherData) => {
            setWeather(weatherData);
        }).catch(error => {
            console.log(error);
            setLoading(false);
            setShow(false)
        });

        urlForecast = urlForecast + cityUrl + loc;

        await fetch(urlForecast).then((response) => {
            if (!response.ok) throw { response }
            return response.json();
        }).then((forecastData) => {
            setForecast(forecastData);

            setLoading(false);
            setShow(true);

        }).catch(error => {
            console.log(error);
            setLoading(false);
            setShow(false)
        });

    }

    const handleSaveCity = () => {
        if (!weather.name || savedCities.find(city => city.name === weather.name)) return
        setSavedCities([...savedCities, weather])
    }

    useEffect(() => {
        localStorage.setItem('savedCities', JSON.stringify(savedCities))
    }, [savedCities])

    const remove = (cityName) => {
        setSavedCities(prevSavedCities => prevSavedCities.filter(city => city.name !== cityName));
    }

    const isEmpty = useMemo(() => savedCities.length === 0, [savedCities])


    return (
        <>
            <Form
                newLocation={getLocation}
            />
            <Card
                showData={show}
                loadingData={loading}
                weather={weather}
                forecast={forecast}
                handleSaveCity={handleSaveCity}
            />
            <div className="container mt-4">
                <h3 className="text-light">Ciudades Guardadas</h3 >
                {isEmpty ? (
                    <p className='text-light alert'>
                        no hay ciudades guardadas
                    </p>
                ) : (
                    <SavedCity
                        savedCities={savedCities}
                        weather={weather}
                        remove={remove}
                    />
                )}
            </div >

        </>
    )
}

export default WeatherPanel