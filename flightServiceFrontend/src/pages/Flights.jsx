import { FlightList } from "../components/FlightList"
import { useNavigate } from "react-router-dom"

export const Flights = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="container">
                <h1>Currently Scheduled Flights<button onClick={() => navigate('../addFlight', {replace: true})} href="/addFlight">Create A New Flight</button></h1>
                <FlightList />
            </div>
        </>
    )
}