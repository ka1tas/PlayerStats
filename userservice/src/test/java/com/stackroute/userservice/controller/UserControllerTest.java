package com.stackroute.userservice.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.userservice.domain.User;
import com.stackroute.userservice.services.SecurityTokenGenerator;
import com.stackroute.userservice.services.UserService;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {

	@Autowired
	private transient MockMvc mockMvc;

	@MockBean
	private transient UserService service;

	@MockBean
	private SecurityTokenGenerator securityTokenGenerator;

	private transient User user;

	@InjectMocks
	private UserController controller;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		user = new User(01, "Kukuakr Kukreti", "kuk@kreti.com", "12345");
	}

	@Test
	public void testRegisterUser() throws Exception {
		when(service.saveUser(user)).thenReturn(true);
		mockMvc.perform(post("/api/v1/userservice/adduser").contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON).content(jsonToString(user))).andExpect(status()
						.isCreated()).andDo(print());
		verify(service, times(1)).saveUser(Mockito.any(User.class));
		verifyNoMoreInteractions(service);
	}

	@Test
	public void testLoginUser() throws Exception {
		when(service.saveUser(user)).thenReturn(true);
		when(service.findByEmailAndPassword("kuk@kreti.com", "12345")).thenReturn(user);

		mockMvc.perform(post("/api/v1/userservice/login").contentType(MediaType.APPLICATION_JSON)
				.content(jsonToString(user))).andExpect(status().isOk());

		verify(service, times(1)).findByEmailAndPassword(user.getEmail(), user.getPassword());
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
