import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'

import CircularProgress from '@mui/material/CircularProgress';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button, TextField } from '@mui/material';

import '../../assets/style/createBus.css';

export default function EditBus() {
    const {bus_id} = useParams()
    const MySwal = withReactContent(Swal)

    const navigate = useNavigate()

    const[singelbusInputFields,setSingelBusInputFields] = useState({
        bus_id: '',
        bus_name: '',
        bus_number: '',
        created_at: '',
        departure_time: '',
        destination_station: '',
        route_id: '',
        source_station: '',
        ticket_price: '',
        updated_at: '',
    })

    const handelShowSingelBus = async ()=>{
        const res = await axiosInstance.get(`/busbyid/${bus_id}`)
        return res.data
    }

    const {data,isLoading,error} = useQuery({
        queryKey :["showSingelBus",bus_id],
        queryFn: handelShowSingelBus
    })
    
    useEffect(()=>{
        if(data){
            setSingelBusInputFields(data)
        }
    },[data])
    
    useEffect(()=>{
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
    },[error])


    const handelSingelBusEdit = (e)=>{
        const{name,value} = e.target
        setSingelBusInputFields((prevState)=>{
            return(
                {
                    ...prevState,
                    [name]:value
                }
            )
        })
    }
    
    const handelSingelBusFrom = async (e)=>{
        e.preventDefault()
        try {
            const updateRes = await axiosInstance.put(`/updatebus/${bus_id}`,singelbusInputFields)
            MySwal.fire({
                title: 'Success!',
                text: 'Bus updated successfully!',
                icon: 'success'
            })
            navigate('/admin/businfo')
        } catch (error) {
            MySwal.fire({
                title: 'Error!',
                text:
                  error?.response?.data?.message ||
                  error.message ||
                  'Failed to update bus!',
                icon: 'error'
              })
        }
    }


    if(isLoading){
        return <CircularProgress />
    }
  return (
    <div className='form-container'>
            <div className="form_box">
              <form action="" onSubmit={handelSingelBusFrom}>
                  <div className="input-container">
                    <TextField id="outlined-basic" name='bus_name' value={singelbusInputFields.bus_name} label="Bus Name" variant="outlined" className='input_field' type='text' onChange={handelSingelBusEdit} />
                    <TextField id="outlined-basic" name='bus_number' value={singelbusInputFields.bus_number} label="Bus Number" variant="outlined" className='input_field' type='text' onChange={handelSingelBusEdit} />
                    <TextField id="outlined-basic" name='available_seats' value={singelbusInputFields.available_seats} label="Available Seats" variant="outlined" className='input_field' type='number' onChange={handelSingelBusEdit} />
                    <TextField id="outlined-basic" name='source_station' value={singelbusInputFields.source_station} label="Source Station" variant="outlined" className='input_field' type='text' onChange={handelSingelBusEdit} />
                    <TextField id="outlined-basic" name='destination_station' value={singelbusInputFields.destination_station} label="Destination Station" variant="outlined" className='input_field' type='text' onChange={handelSingelBusEdit} />
                    <TextField id="outlined-basic" name='departure_time' value={singelbusInputFields.departure_time} label="Departure Time" variant="outlined" className='input_field' type='text' onChange={handelSingelBusEdit} />
                    <TextField id="outlined-basic" name='arrival_time' value={singelbusInputFields.arrival_time} label="Arrival Time" variant="outlined" className='input_field' type='text' onChange={handelSingelBusEdit} />
                    <TextField id="outlined-basic" name='ticket_price' value={singelbusInputFields.ticket_price} label="Ticket Price" variant="outlined" className='input_field' type='text' onChange={handelSingelBusEdit} />
                    <div className="create-bus-btn">
                      <Button variant="contained" type='submit'>Submit</Button>
                    </div>
                  </div>
              </form>
            </div>
        </div>
  )
}
