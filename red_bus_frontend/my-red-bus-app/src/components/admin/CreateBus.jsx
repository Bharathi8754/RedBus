import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import axiosInstance from '../../api/axiosInstance';

import { useMutation } from '@tanstack/react-query';
import '../../assets/style/createBus.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function CreateBus() {
  const MySwal = withReactContent(Swal)

  const[busInputFields,setBusInputFields] = useState({
    bus_name : '',
    bus_number : '',
    available_seats : '',
    source_station : '',
    destination_station : '',
    departure_time : '',
    arrival_time : '',
    ticket_price : ''
  })
  const handelBusCreation = (e)=>{
      const {name,value} = e.target
      setBusInputFields((prevState)=>{
        return(
          {
            ...prevState,
            [name] : value
          }
        )
      })      
  }
  
  const handelApiCreateBus = async()=>{
      try {
        const res = await axiosInstance.post("/addbus",busInputFields)
        return res.data
      } catch (error) {
          throw error 
      }
  }

  const {mutate,isLoading,error,isSuccess} = useMutation({
    mutationFn : handelApiCreateBus,
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
      MySwal.fire({
        title: "Bus Created!",
        text: "The bus has been added successfully.",
        icon: "success"
      });
      setBusInputFields({
        bus_name : '',
        bus_number : '',
        available_seats : '',
        source_station : '',
        destination_station : '',
        departure_time : '',
        arrival_time : '',
        ticket_price : ''
      });
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

  const handelCreateBusFrom = (e)=>{
    e.preventDefault()

    if (!busInputFields.bus_name || !busInputFields.bus_number || !busInputFields.available_seats || !busInputFields.departure_time || !busInputFields.arrival_time || !busInputFields.source_station || !busInputFields.destination_station || !busInputFields.ticket_price) {
      MySwal.fire({
        title: 'Validation Error',
        text: 'Input fields are required.',
        icon: 'question'
      });
      return;
    }

    mutate()
  }
  
  return (
    <div className='form-container'>
        <div className="form_box">
          <form action="" onSubmit={handelCreateBusFrom}>
              <div className="input-container">
                <TextField id="outlined-basic" name='bus_name' value={busInputFields.bus_name} label="Bus Name" variant="outlined" className='input_field' type='text' onChange={handelBusCreation} />
                <TextField id="outlined-basic" name='bus_number' value={busInputFields.bus_number} label="Bus Number" variant="outlined" className='input_field' type='text' onChange={handelBusCreation} />
                <TextField id="outlined-basic" name='available_seats' value={busInputFields.available_seats} label="Available Seats" variant="outlined" className='input_field' type='number' onChange={handelBusCreation} />
                <TextField id="outlined-basic" name='source_station' value={busInputFields.source_station} label="Source Station" variant="outlined" className='input_field' type='text' onChange={handelBusCreation} />
                <TextField id="outlined-basic" name='destination_station' value={busInputFields.destination_station} label="Destination Station" variant="outlined" className='input_field' type='text' onChange={handelBusCreation} />
                <TextField id="outlined-basic" name='departure_time' value={busInputFields.departure_time} label="Departure Time" variant="outlined" className='input_field' type='text' onChange={handelBusCreation} />
                <TextField id="outlined-basic" name='arrival_time' value={busInputFields.arrival_time} label="Arrival Time" variant="outlined" className='input_field' type='text' onChange={handelBusCreation} />
                <TextField id="outlined-basic" name='ticket_price' value={busInputFields.ticket_price} label="Ticket Price" variant="outlined" className='input_field' type='text' onChange={handelBusCreation} />
                <div className="create-bus-btn">
                  <Button variant="contained" type='submit'>Submit</Button>
                </div>
              </div>
          </form>
        </div>
    </div>
  )
}

