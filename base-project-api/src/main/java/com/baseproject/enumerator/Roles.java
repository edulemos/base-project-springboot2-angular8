package com.baseproject.enumerator;

public enum Roles {

	ROLE_PROFILES_LIST("/profiles/**", "profiles list"),
	ROLE_PROFILES_SAVE("/profiles/**", "profiles save"),
	ROLE_PROFILES_UPDATE("/profiles/**", "profiles update"),
	ROLE_PROFILES_DELETE("/profiles/**", "profiles delete"),
	ROLE_USERS_LIST("/users/**", "users list"),
	ROLE_USERS_SAVE("/users/**", "users save"),
	ROLE_USERS_UPDATE("/users/**", "users update"),
	ROLE_USERS_DELETE("/users/**", "users delete"),
	ROLE_UPLOAD("/upload/**", "upload files");

	private String url;
	private String description;

	private Roles(String url, String description) {
		this.url = url;
		this.description = description;
	}

	public static Roles find(String role) {
		for (Roles r : values()) {
			if (r.toString().equals(role)) {
				return r;
			}
		}
		return null;
	}

	public String getUrl() {
		return url;
	}

	public String getDescription() {
		return description;
	}

}
