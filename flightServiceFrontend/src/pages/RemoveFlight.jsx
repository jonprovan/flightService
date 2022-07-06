import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const RemoveFlight = () => {

    const flightNumberRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`http://localhost:8085/flights/${flightNumberRef.current.value}`);
            navigate('../flights', {replace: true});
        } catch (error) {
            console.log('Something went wrong!');
        }
    }

    return (
        <>
            <div className='container'>
                <h1>Remove Flight</h1>
                <form className='removalForm' onSubmit={handleSubmit}>
                    <input type={'text'} ref={flightNumberRef}></input>
                    <input type={'submit'} value="Remove Flight"></input>
                </form>
            </div>
        </>
    )
}