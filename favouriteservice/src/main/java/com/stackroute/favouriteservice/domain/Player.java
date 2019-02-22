package com.stackroute.favouriteservice.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "player")
public class Player {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pl_id")
	private int id;

	@Column(name = "pl_name")
	private String name;

	@Column(name = "pl_playerid")
	private int pid;

	@Column(name = "pl_country")
	private String country;

	@Column(name = "pl_role")
	private String playingRole;

	@Column(name = "pl_teams")
	private String majorTeams;

	@Column(name = "pl_imageurl")
	private String imageURL;

	@Column(name = "pl_userid")
	private String userEmail;

	public Player(int id, String name, int pid,String userEmail) {
		super();
		this.id = id;
		this.name = name;
		this.pid = pid;
		this.userEmail = userEmail;
	}

	public Player() {
		super();
		// TODO Auto-generated constructor stub
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

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPlayingRole() {
		return playingRole;
	}

	public void setPlayingRole(String playingRole) {
		this.playingRole = playingRole;
	}

	public String getMajorTeams() {
		return majorTeams;
	}

	public void setMajorTeams(String majorTeams) {
		this.majorTeams = majorTeams;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	@Override
	public String toString() {
		return "Player [id=" + id + ", name=" + name + ", pid=" + pid + ", country=" + country + ", playingRole="
				+ playingRole + ", majorTeams=" + majorTeams + ", imageURL=" + imageURL + ", userEmail=" + userEmail
				+ "]";
	}

}