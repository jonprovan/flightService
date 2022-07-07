import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import flightIcon from '../../images/flight-icon.png'

export const FlightList = () => {

    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    // GET all flights
    const flightInfo = () => {
        axios.get('http://localhost:8085/flights')
            .then(res => setFlights(res.data));
    }

    // force refresh of component
    useEffect(() => {
        flightInfo();
    }, []);

    // format dates to look nice
    const displayDate = (date) => {
        date = date.slice(5, 7) + '•' + date.slice(8) + '•' + date.slice(0, 4);
        return date;
    }

    // format times to look nice
    const displayTime = (time) => {
        if (parseInt(time.slice(0, 2)) < 13) {
            if (time.slice(0, 2) === '00') {
                time = '12' + time.slice(2)
            } else if (time.charAt(0) === '0') {
                time = time.slice(1);
            }
            time = time + ' AM';
        } else {
            time = parseInt(time.slice(0, 2)) - 12 + time.slice(2) + ' PM';
        }
        return time;
    }

    // send selected flight to Update Flight page
    const updateFlight=(flight)=>{
        navigate('/updateFlight', {state:{flight}});
    }

    // DELETE selected flight
    const handleDelete = async (flightNumberToDelete) => {
        try {
            await axios.delete(`http://localhost:8085/flights/${flightNumberToDelete}`);
            // navigate('../flights', {replace: true});
            flightInfo();
        } catch (error) {
            console.log('Flight deletion unsuccessful!');
        }
    }
    
    // sort flights by flight number
    const sortedFlights = [...flights];
    sortedFlights.sort((a, b) => {
        if (a.flightNumber < b.flightNumber) {
            return -1;
        }
        if (a.flightNumber > b.flightNumber) {
            return 1;
        }
        return 0;
    });

    // // sort flights by departure date/time
    // const sortedFlights = [...flights];
    // sortedFlights.sort((a, b) => {
    //     if (parseInt((a.departureDate.replace(/-/g, '') + a.departureTime.replace(':', ''))) 
    //       < parseInt((b.departureDate.replace(/-/g, '') + b.departureTime.replace(':', '')))) {
    //         return -1;
    //     }
    //     if (parseInt((a.departureDate.replace(/-/g, '') + a.departureTime.replace(':', ''))) 
    //       > parseInt((b.departureDate.replace(/-/g, '') + b.departureTime.replace(':', '')))) {
    //         return 1;
    //     }
    //     return 0;
    // });

    // display flexgrid of flight cards
    return (
        <div className='flightList'>
            {sortedFlights.map(flight => {
                return (
                    <div className='flightListItem' key={flight._id}>
                        <div>
                            <input type={"button"} onClick={() => {updateFlight(flight)}}></input>
                            <input type={"button"} onClick={e => {e.preventDefault(); handleDelete(flight.flightNumber)}}></input>
                        </div>
                        <h2>Flight #{flight.flightNumber}<img src={flightIcon} alt="Flight Icon"/></h2>
                        <section>
                            <h3>➤ Departs: {flight.departureAirport}</h3>
                            <p>{displayDate(flight.departureDate)} @ {displayTime(flight.departureTime)}</p>
                        </section>
                        <section>
                            <h3>⇥ Arrives: {flight.arrivalAirport}</h3>
                            <p>{displayDate(flight.arrivalDate)} @ {displayTime(flight.arrivalTime)}</p>
                        </section>
                        <h4><span>☻</span>Passengers: {flight.currentPassengers}<span>(Max: {flight.capacity})</span></h4>
                    </div>
                );
            })}
        </div>
    );
}