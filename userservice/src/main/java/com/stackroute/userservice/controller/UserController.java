
package com.stackroute.userservice.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.userservice.domain.User;
import com.stackroute.userservice.services.SecurityTokenGenerator;
import com.stackroute.userservice.services.UserService;

@RestController
@RequestMapping("/api/v1/userservice")
@CrossOrigin
public class UserController {

	private final static Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private SecurityTokenGenerator tokenCreator;

	@PostMapping("/adduser")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		LOGGER.debug("User Object:" + user);
		try {

			userService.saveUser(user);
			return new ResponseEntity<String>("{ \"message\": \"" + "User signuped successfully" + "\"}", HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<String>("{ \"message\": \"" + e.getMessage() + "\"}", HttpStatus.CONFLICT);
		}

	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		LOGGER.debug("User Object:" + user);

		try {
			if (null == user.getEmail() || null == user.getPassword()) {
				throw new Exception("Email or Password shouldnot be empty.");
			}

			User actulaUser = userService.findByEmailAndPassword(user.getEmail(), user.getPassword());
			Map<String, String> map = tokenCreator.generateToken(actulaUser);
			

			return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<String>("{ \"message\": \"" + e.getMessage() + "\"}", HttpStatus.UNAUTHORIZED);
		}
	}
}
