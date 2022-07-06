import { FlightList } from "../components/FlightList"

export const Flights = () => {
    return (
        <>
            <div className="container">
                <h1>Currently Scheduled Flights<a href="/addFlight">Create A New Flight</a></h1>
                <FlightList />
            </div>
        </>
    )
}