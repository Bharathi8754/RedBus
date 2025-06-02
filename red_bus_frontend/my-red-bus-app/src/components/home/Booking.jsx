import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Box, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import '../../assets/style/home.css';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import passengerIcon from '../../assets/passenger.png';
import contactIcon from '../../assets/contact.png';
import ticketIcon from '../../assets/ticket.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useMutation } from '@tanstack/react-query';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Booking() {

  const MySwal = withReactContent(Swal)

  const navigate = useNavigate()

  const [seatInput, setSeatInput] = useState(0);
  const[singelBus,setSingelBus] = useState([])
  const[userId,setUserId] = useState()
  const[errors,setError] = useState(null)
  const{booking_bus_id} = useParams()

  const[userInputField,setUserInputField] = useState({
      userName: '',
      age: '',
      gender: '',
      phoneNumber: '',
      emailAddress: ''
  })
  const handelUserCreation = (e)=>{
      const{value,name} = e.target
      setUserInputField((prevState)=>{
          return(
            {
              ...prevState,
              [name]:value
            }
          )
      })
  }

   const handelApiCreateUser = async()=>{
    const fullUserDatas = {
      ...userInputField,
      noSeats: seatInput,
      busId: singelBus.bus_id,
    }

  console.log(fullUserDatas);

      try {
        const res = await axiosInstance.post("/addusers",fullUserDatas)
        setUserId(res.data.userId)
        return res.data
      } catch (error) {
          throw error 
      }
      
  }

  const {mutate,isLoading,error,isSuccess} = useMutation({
    mutationFn : handelApiCreateUser,
  })
  
   if(isLoading){
        return (
            <div className="loading">
                <CircularProgress size="3rem" />
            </div>
        )
  }

  useEffect(()=>{
      if(isSuccess){
          navigate(`/success/${userId}`)

          setUserInputField({
            userName: '',
            age: '',
            gender: '',
            phoneNumber: '',
            emailAddress: ''
          });
          setSeatInput(0);
      }
  
      if(error){
        MySwal.fire({
          title: "Error!",
          text: 
            error?.response?.data?.message ||
            error.message ||
            'Something went wrong!',
          icon: "error"
        });
      }
    },[error,isSuccess])

    const handelCreateUserFrom = (e)=>{
    e.preventDefault()

    if (!userInputField.userName || !userInputField.age || !userInputField.gender || !userInputField.phoneNumber || !userInputField.emailAddress ) {
      MySwal.fire({
        title: 'Validation Error',
        text: 'Input fields are required.',
        icon: 'question'
      });
      return;
    }

    mutate()
  }
  
  const handelFetchBusIdDate = async ()=>{
      try {
        const response = await axiosInstance.get(`/busbyid/${booking_bus_id}`)
        setSingelBus(response.data)
      } catch (error) {
        setError(error)
      }
  }
  useEffect(()=>{
    handelFetchBusIdDate()
  },[])

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
  
  const handleIncrement = () => {
    setSeatInput((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setSeatInput((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleSeatInput = (e) => {
    const value = parseInt(e.target.value);
    setSeatInput(isNaN(value) ? 0 : value);
  };

  const TICKET_PRICE_PER_SEAT = singelBus.ticket_price;
  const totalPrice = seatInput * TICKET_PRICE_PER_SEAT;
  
  return (
    <div>
        <div className="breadcrambs_container">
          <div className="bread_1">
             <Stack spacing={2}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  <Link underline="hover" key="1" color="inherit" href="/">Home</Link>
                  <Typography className='bread_show_station' key="3" sx={{ color: 'text.primary' }}>{`${singelBus.source_station} to ${singelBus.destination_station}`}</Typography>
                </Breadcrumbs>
              </Stack>
              <div className="station">{singelBus.source_station}&nbsp;<TrendingFlatIcon />&nbsp;{singelBus.destination_station}&nbsp;<span><DateRangeIcon style={{fontSize:"16px",margin:"0px 5px"}}/>{handelDate(singelBus.departure_time)}&nbsp;&nbsp;<AccessTimeIcon style={{fontSize:"16px",margin:"0px 5px"}}/>{handelTime(singelBus.departure_time)}</span></div>
          </div>
        </div>

        <div className="form_container">
          <form action="" onSubmit={handelCreateUserFrom}>
          <div className="input_grid_container">
            <div className="input_div_title">
              <img src={passengerIcon} alt="passenger" />
                Passenger Details
            </div>

            <div className="input_grid">
              <div class="inputContainer">
                <input required="required" id="inputField" placeholder="Username" type="text" name="userName" value={userInputField.userName} onChange={handelUserCreation} />
                <label class="usernameLabel" for="inputField">Passenger Name</label>
                 <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-person-fill inputIcon" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
              </div>
            </div>

            <div className="age_gender">
              <div className="input_grid" style={{width:"50%"}}>
                <div class="inputContainer">
                  <input required="required" id="inputField" placeholder="Username" type="number" name="age" value={userInputField.age} onChange={handelUserCreation} />
                  <label class="usernameLabel" for="inputField">Age</label>
                   <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-anthropic inputIcon" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M9.218 2h2.402L16 12.987h-2.402zM4.379 2h2.512l4.38 10.987H8.82l-.895-2.308h-4.58l-.896 2.307H0L4.38 2.001zm2.755 6.64L5.635 4.777 4.137 8.64z"/>
</svg>
                </div>
              </div>
              
              <div className="input_grid" style={{width:"50%"}}>
                <div class="gender_container">
                  <label><input name="gender" type="radio" value="Male" checked={userInputField.gender === "Male"} onChange={handelUserCreation}/> Male</label>
                  <label><input name="gender" type="radio" value="Female" checked={userInputField.gender === "Female"} onChange={handelUserCreation}/> Female</label>
                  <label><input name="gender" type="radio" value="Other" checked={userInputField.gender === "Other"} onChange={handelUserCreation}/> Other</label>
                </div>
              </div>
            </div>

            <div className='divider'></div>

            <div className="input_div_title">
              <img src={contactIcon} alt="contact" />
                Contact Details
            </div>
            <div className="input_grid">
              <div class="inputContainer">
                <input required="required" id="inputField" placeholder="Username" type="text" name="phoneNumber" value={userInputField.phoneNumber} onChange={handelUserCreation} />
                <label class="usernameLabel" for="inputField">Phone Number</label>
               <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-telephone-fill inputIcon" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
</svg>
              </div>
            </div>
            <div className="" style={{margin:"50px 0px"}}></div>
            <div className="input_grid">
              <div class="inputContainer">
                <input required="required" id="inputField" placeholder="Username" type="text" name="emailAddress" value={userInputField.emailAddress} onChange={handelUserCreation} />
                <label class="usernameLabel" for="inputField">Email Address</label>
                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-envelope-at-fill inputIcon" viewBox="0 0 16 16">
                <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"/>
                <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"/>
              </svg>
              </div>
            </div>

            <div className='divider'></div>

            <div className="input_div_title">
              <img src={ticketIcon} alt="ticket" />
                Ticket Details
            </div>
            
            <div className="ticket_price">
              <div className="input_grid">
              <div class="inputContainer">
                <label class="usernameLabel" for="inputField" style={{whiteSpace:"nowrap"}}>Number Of Seats</label>
                 <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-luggage-fill inputIcon" viewBox="0 0 16 16">
                  <path d="M2 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V5h.5A1.5 1.5 0 0 1 8 6.5V7H7v-.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5H4v1H2.5v.25a.75.75 0 0 1-1.5 0v-.335A1.5 1.5 0 0 1 0 13.5v-7A1.5 1.5 0 0 1 1.5 5H2zM3 5h2V2H3z"/>
                  <path d="M2.5 7a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m10 1v-.5A1.5 1.5 0 0 0 11 6h-1a1.5 1.5 0 0 0-1.5 1.5V8H8v8h5V8zM10 7h1a.5.5 0 0 1 .5.5V8h-2v-.5A.5.5 0 0 1 10 7M5 9.5A1.5 1.5 0 0 1 6.5 8H7v8h-.5A1.5 1.5 0 0 1 5 14.5zm9 6.5V8h.5A1.5 1.5 0 0 1 16 9.5v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                </svg>
                <div className="add_seats">
                  <IconButton color="error" aria-label="add to shopping cart" onClick={handleDecrement}>
                    <RemoveIcon />
                  </IconButton>
                  <input type="text" class="seat_count_input" value={seatInput} onChange={handleSeatInput} />
                  <IconButton color="success" aria-label="add to shopping cart" onClick={handleIncrement}>
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
              </div>
            </div>


            <div className="payment_container">
               <div className="input_grid">
                  <div className="ticket_price"><span>Ticket Price :&nbsp;</span>₹ {totalPrice}</div>
              </div>


              <div class="pay_container" onClick={handelCreateUserFrom}>
                <div class="pay_left-side">
                  <div class="pay_card">
                    <div class="pay_card-line"></div>
                    <div class="pay_buttons"></div>
                  </div>
                  <div class="pay_post">
                    <div class="pay_post-line"></div>
                    <div class="pay_screen">
                      <div class="pay_icon">!</div>
                    </div>
                    <div class="pay_numbers"></div>
                    <div class="pay_numbers-line2"></div>
                  </div>
                </div>
                <div class="pay_right-side">
                  <div class="pay_new">Proceed to Pay</div>
                  <svg class="pay_arrow" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 451.846 451.847">
                    <path
                      d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"
                      class="active-path"
                      fill="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

          </div>
          </form>
        </div>
           
            
    </div>
  )
}

export default Booking