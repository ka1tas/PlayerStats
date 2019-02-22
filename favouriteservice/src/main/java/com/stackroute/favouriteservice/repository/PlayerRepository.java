package com.stackroute.favouriteservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stackroute.favouriteservice.domain.Player;

public interface PlayerRepository extends JpaRepository<Player, Integer> {


	Player getPlayerByPidAndUserEmail(int id, String userEmail);

	List<Player> findByUserEmail(String string);
	
	
}
