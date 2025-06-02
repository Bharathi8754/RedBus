import React, { useEffect, useState } from 'react'
import paymentSuccess from '../../assets/payment_success.gif';
import '../../assets/style/success.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';

export default function BookingSuccess() {
    // const MySwal = withReactContent(Swal)
    // MySwal.fire({
    //       title: "Booking Confirmed!",
    //       text: "Your bus ticket has been successfully booked.",
    //       icon: "success"
    // });

    const {user_id} = useParams()
    const [user,setUser] = useState({})
    const [bus,setBus] = useState({})
    const [error, setError] = useState(null);

    const handelFetchUserIdDate = async ()=>{
      try {
        const response = await axiosInstance.get(`/userbyid/${user_id}`)
        setUser(response.data)
      } catch (error) {
        setError(error)
      }
    }
    const handelFetchBusIdDate = async (busId)=>{
      try {
        const response = await axiosInstance.get(`/busbyid/${busId}`)
        setBus(response.data)
      } catch (error) {
        setError(error)
      }
    }
    useEffect(()=>{
        handelFetchUserIdDate()
    },[])

    useEffect(() => {
        if (user?.busId) {
        handelFetchBusIdDate(user.busId);
        }
    }, [user]);

    console.log(user);
    console.log(bus);
    console.log(error);
    

    const handelDate = (dateTime) => {
        const dateObj = new Date(dateTime);
        const formattedDate = dateObj.toLocaleDateString();
        return formattedDate;
    };

    const handelTime = (dateTime) => {
        const dateObj = new Date(dateTime);
        const formattedTime = dateObj.toLocaleTimeString();
        return formattedTime;
    };
  return (
    <div className='success_container'>
        <div className="key_sections">
            Your bus ticket has been successfully booked.
        </div>
        <div className="gif_con">
            <img src={paymentSuccess} alt="paymentSuccess" />
        </div>
        <div className="booking_details">
            <table>
                <tr>
                    <td className='booking_title'>passenger Name</td>
                    <td className='booking_info'>{user.userName}</td>
                </tr>
                <tr>
                    <td className='booking_title'>Bus Name</td>
                    <td className='booking_info'>{bus.bus_name}</td>
                </tr>
                <tr>
                    <td className='booking_title'>Bus No</td>
                    <td className='booking_info'>{bus.bus_number}</td>
                </tr>
                <tr>
                    <td className='booking_title'>Route</td>
                    <td className='booking_info'>{bus.bus_name} → {bus.bus_name}</td>
                </tr>
                <tr>
                    <td className='booking_title'>Departure</td>
                    <td className='booking_info'>{bus.destination_station}, {bus.source_station}</td>
                </tr>
                <tr>
                    <td className='booking_title'>Seats Booked</td>
                    <td className='booking_info'>{bus.available_seats}</td>
                </tr>
                <tr>
                    <td className='booking_title'>Total</td>
                    <td className='booking_info'>₹{bus.ticket_price}</td>
                </tr>
            </table>
        </div>
        <div className="msg_con">
            You will receive a confirmation email shortly. Please be at your boarding point at least 15 minutes before departure.
        </div>
        <Button variant="outlined" color="success"><Link href="/" underline="none">Go Back</Link></Button>
        

    </div>
  )
}
 