package com.redbusapp.redbus.contoller;

import com.redbusapp.redbus.entity.BusEntity;
import com.redbusapp.redbus.exception.ResourceNotFoundException;
import com.redbusapp.redbus.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://redbus-bn.netlify.app/"
})
@RestController
@RequestMapping("/api/redbus")
public class BusContoller {
    @Autowired
    private BusRepository busRepo;

    @GetMapping("/allbuses")
    public List<BusEntity> getAllBuses(){
        return busRepo.findAll();
    }

    @GetMapping("/busbyid/{bus_id}")
    public BusEntity getBusById(@PathVariable int bus_id){
        return busRepo.findById(bus_id).orElseThrow(()->new ResourceNotFoundException("Selected bus was not found"));
    }

    @PostMapping("/addbus")
    public BusEntity createBus(@RequestBody BusEntity bus){
        return busRepo.save(bus);
    }

    @PutMapping("/updatebus/{bus_id}")
    public BusEntity UpdateBus(@PathVariable int bus_id,@RequestBody BusEntity bus){
        BusEntity bus_data = busRepo.findById(bus_id).orElseThrow(()->new ResourceNotFoundException("Selected bus was not found"));
        if (bus.getBus_name() != null) bus_data.setBus_name(bus.getBus_name());
        if (bus.getBus_number() != null) bus_data.setBus_number(bus.getBus_number());
        if (bus.getAvailable_seats() != 0) bus_data.setAvailable_seats(bus.getAvailable_seats());
        if (bus.getSource_station() != null) bus_data.setSource_station(bus.getSource_station());
        if (bus.getDestination_station() != null) bus_data.setDestination_station(bus.getDestination_station());
        if (bus.getDeparture_time() != null) bus_data.setDeparture_time(bus.getDeparture_time());
        if (bus.getTicket_price() != 0) bus_data.setTicket_price(bus.getTicket_price());
        return busRepo.save(bus_data);
    }

    @DeleteMapping("/deletebus/{bus_id}")
    public ResponseEntity<?> DeleteBus(@PathVariable int bus_id){
        BusEntity bus_data = busRepo.findById(bus_id).orElseThrow(()->new ResourceNotFoundException("Selected bus was not found"));
        busRepo.delete(bus_data);
        return ResponseEntity.ok().body("Bus with ID"+bus_id+"has been successfully deleted.");
    }

    @GetMapping("/searchbysourceanddestination")
    public List<BusEntity> getBySourceAndDestination(@RequestParam(required = false) String source, @RequestParam(required = false) String destination){
        if(source != null && destination != null){
            return busRepo.findBySourceAndDestination(source,destination); 
        } else if (source != null) {
            return busRepo.findBySourceStation(source);
        } else if (destination != null) {
            return busRepo.findByDestinationStation(destination);
        }else {
            return busRepo.findAll();
        }
    }
}
