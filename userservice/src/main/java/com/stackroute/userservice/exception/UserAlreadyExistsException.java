
package com.stackroute.userservice.exception;

@SuppressWarnings("serial")
public class UserAlreadyExistsException extends Exception {

	String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}


	public UserAlreadyExistsException(String message) {
		super(message);
		this.message = message;
	}

}
