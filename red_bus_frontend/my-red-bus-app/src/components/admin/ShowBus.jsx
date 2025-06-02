import React from 'react'

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Skeleton from '@mui/material/Skeleton';

import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../api/axiosInstance'
import routeImage from '../../assets/route.png';
import '../../assets/style/showBus.css';
import { useNavigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function ShowBus() {
    const MySwal = withReactContent(Swal)

    const navigate = useNavigate()
    const skeleton_loading = [1,2,3,4,5,6,7,8]
    const handelAllBusInfo = async ()=>{
        const res = await axiosInstance.get("/allbuses")
        return res.data
    }
    
    const {data,isLoading,error} = useQuery({
        queryKey : ["busInfo"],
        queryFn : handelAllBusInfo,
    })
    
    if(isLoading){
        return (
            <div className="container">
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {skeleton_loading.map((data, index) => (
                        <Grid size={{ md: 3, xs: 12 }}>
                            <div className="card" key={index}>
                                <Skeleton variant="rounded" className='skeleton_con' height={40} />
                                <Skeleton variant="rounded" className='skeleton_con' height={40} />
                                <Skeleton variant="rounded" className='skeleton_con' height={30} />
                                <Skeleton variant="rounded" className='skeleton_con' height={150} />
                            </div>
                        </Grid>
                    ))}
                </Grid>
                </Box>
            </div>
        )
    }

    if(error){
        return (
        <div className="container">
            <div className='alert'>
                <Alert severity="error">{error.message}</Alert>
            </div>
            <Grid container spacing={2}>
                    {skeleton_loading.map((data, index) => (
                        <Grid size={{ md: 3, xs: 12 }}>
                            <div className="card" key={index}>
                                <Skeleton variant="rounded" className='skeleton_con' height={40} />
                                <Skeleton variant="rounded" className='skeleton_con' height={40} />
                                <Skeleton variant="rounded" className='skeleton_con' height={30} />
                                <Skeleton variant="rounded" className='skeleton_con' height={150} />
                            </div>
                        </Grid>
                    ))}
                </Grid>
        </div>
        )
    }

    const handelDeleteBus = async (busId) => {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/deletebus/${busId}`);
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "The bus has been deleted.",
          icon: "success"
        });
        window.location.reload();
      } catch (error) {
        swalWithBootstrapButtons.fire({
          title: "Error!",
          text: error?.response?.data?.message || error.message || "Failed to delete the bus.",
          icon: "error"
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your bus data is safe.",
        icon: "error"
      });
    }
  });
};

  return (
    <div className="container">
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            {data.map((bus, index) => (
                <Grid size={{ md: 3, xs: 12 }}>
                    <div className="card">
                    <h3 className='bus-name'>{bus.bus_name}</h3>
                    <p>Bus no - {bus.bus_number}</p>
                    <div className="seats">
                        <AirlineSeatReclineExtraIcon /> <span>{bus.available_seats}</span>
                    </div>
                    <div className="start-to-end-point">
                        <div className="start-point">{bus.source_station}</div>
                        <img src={routeImage} alt="Route" />
                        <div className="end-point">{bus.destination_station}</div>
                    </div>
                    <div className="departure-time">
                        Departure Time - <span>{bus.departure_time}</span>
                    </div>
                    <div className="arrival-time">
                        Arrival Time - <span>{bus.arrival_time}</span>
                    </div>
                    <div className="ticket-price">Ticket - <span>{bus.ticket_price}</span></div>
                    <div className="action-btn">
                    <Button variant="contained" startIcon={<EditIcon />} onClick={()=>navigate(`/admin/editbus/${bus.bus_id}`)}>Edit</Button>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={()=>handelDeleteBus(bus.bus_id)} >Delete</Button>
                    </div>
                    </div>
                </Grid>
            ))}
            </Grid>
            </Box>
  </div>
  )
}
