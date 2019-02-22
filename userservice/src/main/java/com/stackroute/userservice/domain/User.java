package com.stackroute.userservice.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "us_id")
	private int id;

	@NotNull(message = "Name should not be null")
	@Size(min = 1, max = 50, message = "Name should be of 1 to 50 characters")
	@Column(name = "us_name")
	private String name;

	@NotNull(message = "Email should not be null")
	@Size(min = 5, max = 250, message = "Email should be of 5 to 250 characters")
	@Pattern(regexp = ".+@.+\\..+", message = "Email pattern is not valid")
	@Column(name = "us_email")
	private String email;

	@NotNull(message = "Password should not be null")
	@Size(min = 1, max = 25, message = "Password should be of 1 to 25 characters")
	@Column(name = "us_password")
	private String password;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(int id,
			@NotNull(message = "Name should not be null") @Size(min = 1, max = 50, message = "Name should be of 1 to 50 characters") String name,
			@NotNull(message = "Email should not be null") @Size(min = 5, max = 250, message = "Email should be of 5 to 250 characters") @Pattern(regexp = ".+@.+\\..+", message = "Email pattern is not valid") String email,
			@NotNull(message = "Password should not be null") @Size(min = 1, max = 25, message = "Password should be of 1 to 25 characters") String password) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + "]";
	}

}
