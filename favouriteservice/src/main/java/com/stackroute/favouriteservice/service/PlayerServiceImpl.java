package com.stackroute.favouriteservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.favouriteservice.domain.Player;
import com.stackroute.favouriteservice.exception.PlayerAlreadyExistsException;
import com.stackroute.favouriteservice.exception.PlayerNotFoundException;
import com.stackroute.favouriteservice.repository.PlayerRepository;

@Service
public class PlayerServiceImpl implements PlayerService {

	private final transient PlayerRepository playerRepo;

	@Autowired
	public PlayerServiceImpl(PlayerRepository playerRepo) {
		super();
		this.playerRepo = playerRepo;
	}

	@Override
	public boolean savePlayer(Player player) throws PlayerAlreadyExistsException {
		final Player object = playerRepo.getPlayerByPidAndUserEmail(player.getPid(), player.getUserEmail());
		if (object!=null) {
			throw new PlayerAlreadyExistsException("Player already exists");
		}
		else{
		playerRepo.save(player);
		return true;
		}
	}



	@Override
	public boolean deletePlayerById(int id) throws PlayerNotFoundException {
		
		final Player player = playerRepo.findById(id).orElse(null);
		
		if (player == null) {
			throw new PlayerNotFoundException("Player not found");
		}
		playerRepo.delete(player);
		return true;
	}


	@Override
	public List<Player> getUsersPlayers(String userEmail) {
		return playerRepo.findByUserEmail(userEmail);
	}

}
