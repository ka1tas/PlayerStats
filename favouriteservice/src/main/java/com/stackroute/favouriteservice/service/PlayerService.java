package com.stackroute.favouriteservice.service;

import java.util.List;

import com.stackroute.favouriteservice.domain.Player;
import com.stackroute.favouriteservice.exception.PlayerAlreadyExistsException;
import com.stackroute.favouriteservice.exception.PlayerNotFoundException;

public interface PlayerService {

	boolean savePlayer(Player movie) throws PlayerAlreadyExistsException;

	boolean deletePlayerById(int id) throws PlayerNotFoundException;

	List<Player> getUsersPlayers(String userEmail);
}
