package com.stackroute.favouriteservice.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.favouriteservice.domain.Player;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Transactional
public class PlayerRepoTest {

	@Autowired
	private transient PlayerRepository repo;

	public void setRepo(PlayerRepository repo) {
		this.repo = repo;
	}

	@Test
	public void testSavingPlayer() throws Exception {
		Player testPlayer = new Player(0, "jaguar", 03, "www.abc.com");
		final Player savedplayer = repo.save(testPlayer);
		assertThat(testPlayer.getPid()).isEqualTo(savedplayer.getPid());
	}

	@Test
	public void testDeletePlayer() throws Exception {
		repo.save(new Player(0, "lion", 05, "www.abc.com"));
		final Player player = repo.getPlayerByPidAndUserEmail(05, "www.abc.com");
		assertEquals("lion", player.getName());
		repo.delete(player);
		assertEquals(null, repo.getPlayerByPidAndUserEmail(05, "www.abc.com"));
	}

}
