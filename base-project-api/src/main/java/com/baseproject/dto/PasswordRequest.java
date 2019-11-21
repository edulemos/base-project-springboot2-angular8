package com.baseproject.dto;

import javax.validation.constraints.NotBlank;

public class PasswordRequest {

	@NotBlank
	private String password;

	@NotBlank
	private String confirmPassword;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
}