package com.redbusapp.redbus.contoller;

import com.redbusapp.redbus.entity.BusEntity;
import com.redbusapp.redbus.entity.UserEntity;
import com.redbusapp.redbus.exception.ResourceNotFoundException;
import com.redbusapp.redbus.repository.BusRepository;
import com.redbusapp.redbus.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://redbus-bn.netlify.app/"
})
@RestController
@RequestMapping("/api/redbus")
public class UserController {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BusRepository busRepo;

    @GetMapping("/allusers")
    public List<UserEntity> getAllUsers(){
        return userRepo.findAll();
    }

    @GetMapping("/userbyid/{user_id}")
    public UserEntity getUserById(@PathVariable Long user_id){
        return userRepo.findById(user_id).orElseThrow(()->new ResourceNotFoundException("Selected User was not found"));
    }

    @PostMapping("/addusers")
    public ResponseEntity<UserEntity> createusers(@RequestBody UserEntity user){
        int busId = user.getBusId().intValue();
        int no_Seats = user.getNoSeats();

        BusEntity bus = busRepo.findById(busId).orElseThrow(() -> new ResourceNotFoundException("Bus not found with ID: " + busId));

        if(bus.getAvailable_seats() < no_Seats){
            throw new IllegalArgumentException("Not enough seats available.");
        }

        bus.setAvailable_seats(bus.getAvailable_seats() - no_Seats);
        bus.setUpdated_at(LocalDateTime.now());
        busRepo.save(bus);

        user.setCreatedTime(LocalDateTime.now());
        user.setUpdatedTime(LocalDateTime.now());
        UserEntity saveUser =  userRepo.save(user);

        return ResponseEntity.ok(saveUser);
    }
}
