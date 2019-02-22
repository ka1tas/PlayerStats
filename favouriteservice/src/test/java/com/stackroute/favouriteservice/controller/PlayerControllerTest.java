package com.stackroute.favouriteservice.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.favouriteservice.domain.Player;
import com.stackroute.favouriteservice.service.PlayerService;

@RunWith(SpringRunner.class)
@WebMvcTest(PlayerController.class)
public class PlayerControllerTest {

	@Autowired
	private transient MockMvc mvc;

	@MockBean
	private transient PlayerService service;

	private transient Player player;

	@InjectMocks
	private PlayerController controller;

	static List<Player> players;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);

		mvc = MockMvcBuilders.standaloneSetup(controller).build();
		players = new ArrayList<>();
		player = new Player(3, "radm", 003, "s@g.com");
		Player player1 = new Player(1, "Saikat", 001, "s@g.com");
		players.add(player1);
		Player player2 = new Player(2, "sam", 002, "s@g.com");
		players.add(player2);
	}

	@Test
	public void testSuccessfullAddingofPlayer() throws Exception {
		String token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzQGcuY29tIiwiaWF0IjoxNTUwNzMwNjQyfQ.zzUb1bZKMJaVudSm2hZT5DG-Gzb5rf8l56HgwtiVhSv6BCEefJqnY586enCXHDVN";

		when(service.savePlayer(player)).thenReturn(true);
		mvc.perform(post("/api/v1/playerservice/player").header("authorization", "token " + token)
				.contentType(MediaType.APPLICATION_JSON).content(jsonToString(player))).andExpect(status().isCreated());
		verify(service, times(1)).savePlayer(Mockito.any(Player.class));
		verifyNoMoreInteractions(service);
	}

	@Test
	public void testSuccessfullyDeletingPlayer() throws Exception {
		when(service.deletePlayerById(1)).thenReturn(true);
		mvc.perform(delete("/api/v1/playerservice/player/{id}", 1)).andExpect(status().isOk());
		verify(service, times(1)).deletePlayerById(1);
		verifyNoMoreInteractions(service);
	}

	@Test
	public void testFetchingAllplayersofaUser() throws Exception {
		String token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzQGcuY29tIiwiaWF0IjoxNTUwNzMwNjQyfQ.zzUb1bZKMJaVudSm2hZT5DG-Gzb5rf8l56HgwtiVhSv6BCEefJqnY586enCXHDVN";
		when(service.getUsersPlayers("s@g.com")).thenReturn(players);
		mvc.perform(get("/api/v1/playerservice/player").header("authorization", "token " + token)
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		verify(service, times(1)).getUsersPlayers("s@g.com");
		verifyNoMoreInteractions(service);
	}

	private String jsonToString(final Object object) {
		String result;
		try {
			final ObjectMapper mapper = new ObjectMapper();
			result = mapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			result = "Json processing error";
		}
		return result;
	}
}
