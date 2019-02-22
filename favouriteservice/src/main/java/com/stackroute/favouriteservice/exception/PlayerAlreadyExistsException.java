package com.stackroute.favouriteservice.exception;

@SuppressWarnings("serial")
public class PlayerAlreadyExistsException extends Exception {

	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public PlayerAlreadyExistsException(String message) {
		super(message);
		this.message = message;
	}

	@Override
	public String toString() {
		return "PlayerAlreadyExistsException [message=" + message + "]";
	}
	
}
