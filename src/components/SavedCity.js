import React from 'react';

const SavedCity = ({ savedCities, remove }) => {
    return (
        <div className="container mt-4">
            <table className="table table-dark table-hover table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>Ciudad</th>
                        <th>Temperatura</th>
                        <th>Temp. Máxima</th>
                        <th>Temp. Mínima</th>
                        <th>Humedad</th>
                        <th>Velocidad del Viento</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {savedCities.map((city, id) => (
                        <tr key={id}>
                            <td>{city.name}</td>
                            <td>{(city.main.temp - 273.15).toFixed(1)}°C</td>
                            <td>{(city.main.temp_max - 273.15).toFixed(1)}°C</td>
                            <td>{(city.main.temp_min - 273.15).toFixed(1)}°C</td>
                            <td>{city.main.humidity}%</td>
                            <td>{city.wind.speed} m/S</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => remove(city.name)}
                                >
                                    x
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SavedCity;
