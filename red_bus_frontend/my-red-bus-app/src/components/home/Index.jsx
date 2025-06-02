import { Alert, Box, Grid, LinearProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance';
import '../../assets/style/home.css';
import homeBanner from '../../assets/home_banner.webp';
import enterBus from '../../assets/enter_bus.png';
import exitBus from '../../assets/exit_bus.png';
import routemap from '../../assets/destination.png';
import notFound from '../../assets/not_found.gif';
import netWork from '../../assets/network_error.gif';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   const navigate = useNavigate();

  useEffect(() => {
    fetchBusData();
  }, []);

  useEffect(()=>{
    const delay = setTimeout(()=>{
      fetchBusData()
    },500)
    return ()=> clearTimeout(delay)
  },[source, destination])

  const fetchBusData = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get("/searchbysourceanddestination", {
        params: {
          source: source !== '' ? source : undefined,
          destination: destination !== '' ? destination : undefined
        },
      });
      setBuses(response.data);
    } catch (error) {
      setError(error)
    }finally{
      setLoading(false)
    }
  };

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
  const handelTimeDifference = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffInMs = endDate - startDate;

    const totalMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h : ${minutes}m`;
  };
  
  const handelNavigate = (busId)=>{
      navigate(`/booking/${busId}`)
  }
  
  return (
    <div className='home_container'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <div className="image_container">
            <img src={homeBanner} alt="" srcset="" />
          </div>
          {
            error &&(
              <div className='alert'>
                <Alert severity="error">{error.message}</Alert>
              </div>
            )
          }
          <Grid size={{xs:12}} className="search_container">
              <Grid container spacing={2} display="flex" justifyContent= "center" alignItems= "center">
                <Grid size={12} className="banner_title">
                    India's No. 1 Online Bus Ticket Booking Site
                </Grid>
                <Grid size={{xs:12, md:4}}>
                    <div class="search_input_group">
                      <img className="icon" src={enterBus} alt="enterBus" />
                      <input class="search_input" placeholder="From" value={source} type='text' onChange={(e)=>setSource(e.target.value)} />
                    </div>
                </Grid>
                <Grid size={{xs:12, md:4}}>
                    <div class="search_input_group">
                      <img className="icon" src={exitBus} alt="enterBus" />
                      <input class="search_input" placeholder="To" value={destination} type='text' onChange={(e)=>setDestination(e.target.value)} />
                    </div>
                </Grid>
              </Grid>
          </Grid>

          <Grid size={{xs:12}} className="search_result_container">
            <Grid container spacing={2} display="flex" justifyContent= "center" alignItems= "center">
              <Grid size={{xs:12, md:10}}>
                <div className="search_result">
                  <div className="search_title">{buses.length} Buses found</div>
                    {(loading || error || !buses.length > 0) && (
                      <LinearProgress /> 
                    )}
                 {
                  buses.length > 0 ? (
                    buses.map((bus, index) => (
                      <div className="search_card" key={index}>
                        <div className="part_1">
                          <div className="bus_name">{bus.bus_name}</div>
                          <div className="bus_no">{bus.bus_number}</div>
                        </div>

                        <div className="part_2">
                          <div className="start_station">
                            <span>Source - </span>{bus.source_station}
                          </div>
                          <div className="route_map">
                            <img src={routemap} alt="routeMap" />
                          </div>
                          <div className="end_station">
                            <span>Destination - </span>{bus.destination_station}
                          </div>
                        </div>

                        <div className="part_3">
                          <div className="start_time">
                            {handelDate(bus.departure_time)} - {handelTime(bus.departure_time)}
                          </div>
                          <div className="time_difference">
                            {handelTimeDifference(bus.departure_time, bus.arrival_time)} Travel
                          </div>
                          <div className="end_time">
                            {handelDate(bus.arrival_time)} - {handelTime(bus.arrival_time)}
                          </div>
                        </div>

                        <div className="part_4">
                          <div className="avaliable_seats">
                            <span>Available seats - </span>{bus.available_seats}
                          </div>
                          <div className="ticket_price">
                            <span>Ticket - </span>₹ {bus.ticket_price}
                          </div>
                          <div className="book_ticket">
                            <button className="btn_booking" onClick={()=>handelNavigate(bus.bus_id)}>
                              <i className="animation"></i>Book your tickets<i className="animation"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    error ? (
                     <div className="network_container">
                        <img src={netWork} alt="not found" srcset="" />
                        <p>
                          Network Error.
                        </p>
                      </div>
                    ):(
                      <div className="notfound_container">
                        <img src={notFound} alt="not found" srcset="" />
                        <p>
                          No buses found.
                        </p>
                      </div>
                    )
                  )
                }
                </div>
                
              </Grid>
            </Grid>
          </Grid>
          

        </Grid>
      </Box>
    </div>
  )
}
