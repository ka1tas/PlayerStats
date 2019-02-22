package com.stackroute.favouriteservice.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.stackroute.favouriteservice.domain.Player;
import com.stackroute.favouriteservice.exception.PlayerAlreadyExistsException;
import com.stackroute.favouriteservice.exception.PlayerNotFoundException;
import com.stackroute.favouriteservice.repository.PlayerRepository;

public class PlayerServiceImplTest {

	@Mock
	private transient PlayerRepository playerRepo;

	private transient Player player;

	@InjectMocks
	private transient PlayerServiceImpl playerServiceImpl;

	transient Optional<Player> options;

	@Before
	public void setupMock() {
		MockitoAnnotations.initMocks(this);
		player = new Player(1, "Saynik", 10, "www.abc.com");
		options = Optional.of(player);
	}

	@Test
	public void testMockCreation() {
		assertNotNull("JpaRepository creation failed: use @InjectMocks on playerServiceImpl", player);
	}

	@Test
	public void testSavePlayerSuccessfullt() throws PlayerAlreadyExistsException {
		when(playerRepo.save(player)).thenReturn(player);
		final boolean flag = playerServiceImpl.savePlayer(player);
		assertTrue("saving player failed", flag);
		verify(playerRepo, times(1)).save(player);
	}

	@Test(expected = PlayerAlreadyExistsException.class)
	public void testfailedtoSavePlayer() throws PlayerAlreadyExistsException {
		when(playerRepo.getPlayerByPidAndUserEmail(10, "www.abc.com")).thenReturn(player);
		when(playerRepo.save(player)).thenReturn(player);
		final boolean flag = playerServiceImpl.savePlayer(player);
		assertTrue("saving player failed", flag);
		verify(playerRepo, times(0)).save(player);
	}

	@Test
	public void testDeletePlayer() throws PlayerNotFoundException {
		when(playerRepo.findById(1)).thenReturn(options);
		doNothing().when(playerRepo).delete(player);
		final boolean flag = playerServiceImpl.deletePlayerById(1);
		assertTrue("deleting player failed", flag);
		verify(playerRepo, times(1)).delete(player);
		verify(playerRepo, times(1)).findById(player.getId());
	}

	@Test
	public void testgettingAllPlayersForAUser() throws PlayerNotFoundException {
		final List<Player> players = new ArrayList<>();
		players.add(player);
		when(playerRepo.findByUserEmail(player.getUserEmail())).thenReturn(players);
		final List<Player> players1 = playerServiceImpl.getUsersPlayers("www.abc.com");
		assertEquals(players, players1);
		verify(playerRepo, times(1)).findByUserEmail("www.abc.com");
	}

}
