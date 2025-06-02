package com.redbusapp.redbus.repository;

import com.redbusapp.redbus.entity.BusEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface BusRepository extends JpaRepository<BusEntity,Integer> {
    @Query("SELECT b FROM BusEntity b WHERE LOWER(b.source_station) LIKE LOWER(CONCAT('%',:source,'%'))")
    List<BusEntity> findBySourceStation(@Param("source") String source);

    @Query("SELECT b FROM BusEntity b WHERE LOWER(b.destination_station) LIKE LOWER(CONCAT('%',:destination,'%'))")
    List<BusEntity> findByDestinationStation(@Param("destination") String destination);

    @Query("SELECT b FROM BusEntity b WHERE LOWER(b.source_station) LIKE LOWER(CONCAT('%', :source, '%')) AND LOWER(b.destination_station) LIKE LOWER(CONCAT('%', :destination, '%'))")
    List<BusEntity> findBySourceAndDestination(@Param("source") String source,@Param("destination") String destination);
}
