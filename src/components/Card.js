import React from 'react'
import Spinner from './Spinner'

const Card = ({ loadingData, showData, forecast, weather, handleSaveCity }) => {

    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var date = day + '/' + month + '/' + year;
    var url = "";
    var iconUrl = "";

    if (loadingData) {
        return <Spinner />;
    }

    if (showData) {
        url = "http://openweathermap.org/img/w/";
        iconUrl = url + weather.weather[0].icon + ".png"
    }



    return (
        <div className='mt-5'>
            {
                showData === true ? (
                    <div className='container'>
                        <div className='card mb-3 mx-auto bg-dark text-light'>
                            <div className='row g-0'>
                                <div className='col-md-4'>
                                    <h3 className='card-title'>
                                        {weather.name}
                                    </h3>
                                    <p className='card-date'>
                                        {date}
                                    </p>
                                    <h1 className='card-temp'>
                                        {(weather.main.temp - 273.15).toFixed(1)}°C
                                    </h1>
                                    <p className='card-desc'>
                                        <img
                                            src={iconUrl}
                                            alt='icono clima'
                                        ></img>
                                        {weather.weather[0].description}
                                    </p>
                                    <img
                                        src='https://images.pexels.com/photos/1123972/pexels-photo-1123972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                                        className='img-fluid rounded-start'
                                        alt='imagen ciudad'
                                    ></img>
                                </div>
                                <div className='col-md-8'>
                                    <div className='card-body text-start mt-2'>
                                        <h5 className='card-text'>
                                            temperatura maxima: {(weather.main.temp_max - 273.15).toFixed(1)} °C
                                        </h5>
                                        <h5 className='card-text'>
                                            temperatura minima: {(weather.main.temp_min - 273.15).toFixed(1)} °C
                                        </h5>
                                        <h5 className='card-text'>
                                            humedad: {weather.main.humidity}%
                                        </h5>
                                        <h5 className='card-text'>
                                            velocidad: {weather.wind.speed} m/S
                                        </h5>
                                        <button
                                            onClick={handleSaveCity}
                                            className='btn btn-success mt-2'
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h2 className='text-light'>
                        Sin Datos
                    </h2>
                )
            }
        </div>
    )
}

export default Card