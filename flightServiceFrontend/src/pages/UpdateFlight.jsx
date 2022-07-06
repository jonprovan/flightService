import { AirportSelector } from '../components/AirportSelector';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import updateFlightImage from '../images/update-flight.jpg';

export const UpdateFlight = () => {

    const location = useLocation();
    const flightToUpdate = {...location.state};

    const [flightId] = useState(flightToUpdate.flight?._id || 1138);
    const [flightNumber, setFlightNumber] = useState(flightToUpdate.flight?.flightNumber || 1138);
    const [departureAirport, setDepartureAirport] = useState(flightToUpdate.flight?.departureAirport || 'EWR');
    const [departureDate, setDepartureDate] = useState(flightToUpdate.flight?.departureDate || '2022-05-15');
    const [departureTime, setDepartureTime] = useState(flightToUpdate.flight?.departureTime || '06:00');
    const [arrivalAirport, setArrivalAirport] = useState(flightToUpdate.flight?.arrivalAirport || 'RDU');
    const [arrivalDate, setArrivalDate] = useState(flightToUpdate.flight?.arrivalDate || '2022-05-15');
    const [arrivalTime, setArrivalTime] = useState(flightToUpdate.flight?.arrivalTime || '12:00');
    const [currentPassengers, setCurrentPassengers] = useState(flightToUpdate.flight?.currentPassengers || 0);
    const [capacity, setCapacity] = useState(flightToUpdate.flight?.capacity || 545);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put('http://localhost:8085/flights',
                {
                    _id: flightId,
                    flightNumber: flightNumber,
                    departureAirport: departureAirport, 
                    departureDate: departureDate, 
                    departureTime: departureTime, 
                    arrivalAirport: arrivalAirport, 
                    arrivalDate: arrivalDate, 
                    arrivalTime: arrivalTime, 
                    currentPassengers: currentPassengers, 
                    capacity: capacity
                });
            navigate('../flights', {replace: true});
        } catch (error) {
            document.getElementById('errorMessage').innerText = error.response.data;
        }
    }

    return (
        <div className='container'>
            <h1>Update Flight</h1>
            <form className='addFlightForm' onSubmit={handleSubmit} action="#">
                <div className='labels'>
                    <label for="flightNumber"><strong>FLIGHT NUMBER: </strong></label>
                    <label for="departureAirport"><strong>➤ Departs: </strong></label>
                    <label for="departureDate">On: </label>
                    <label for="departureTime">At: </label>
                    <label for="arrivalAirport"><strong>⇥ Arrives: </strong></label>
                    <label for="arrivalDate">On: </label>
                    <label for="arrivalTime">At: </label>
                    <label for="currentPassengers"><strong>Passengers: </strong></label>
                    <label for="capacity">Max: </label>
                </div>
                <div className='inputs'>
                    <input id="flightNumber" type={"number"} min={0} value={flightNumber} onChange={e => setFlightNumber(e.target.value)}></input>
                    <select id="departureAirport" value={departureAirport} onChange={e => setDepartureAirport(e.target.value)}>
                        <AirportSelector />
                    </select>
                    <input id="departureDate" type={"date"} value={departureDate} onChange={e => setDepartureDate(e.target.value)}></input>
                    <input id="departureTime" type={"time"} value={departureTime} onChange={e => setDepartureTime(e.target.value)}></input>
                    <select id="arrivalAirport" value={arrivalAirport} onChange={e => setArrivalAirport(e.target.value)}>
                        <AirportSelector />
                    </select>
                    <input id="arrivalDate" type={"date"} value={arrivalDate} onChange={e => setArrivalDate(e.target.value)}></input>
                    <input id="arrivalTime" type={"time"} value={arrivalTime} onChange={e => setArrivalTime(e.target.value)}></input>
                    <input id="currentPassengers" type={"number"} min={0} value={currentPassengers} onChange={e => setCurrentPassengers(e.target.value)}></input>
                    <input id="capacity" type={"number"} min={0} value={capacity} onChange={e => setCapacity(e.target.value)}></input>
                </div>
                <div className='errorInput'>
                    <p id='errorMessage'></p>
                    <input type={"submit"} value="Update Flight"></input>
                </div>
                <img src={updateFlightImage} alt="Update Flight" />
            </form>
        </div>
    )
}