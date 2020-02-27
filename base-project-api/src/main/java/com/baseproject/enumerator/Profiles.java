package com.baseproject.enumerator;

@SuppressWarnings("rawtypes")
public enum Profiles {

	PROFILES("profiles", "manager profiles", new Enum[] 
			{ Roles.ROLE_PROFILES_LIST, Roles.ROLE_PROFILES_SAVE, Roles.ROLE_PROFILES_UPDATE , Roles.ROLE_PROFILES_DELETE }), 
	USERS("users", "manager users", new Enum[]
			{ Roles.ROLE_USERS_LIST, Roles.ROLE_USERS_SAVE, Roles.ROLE_USERS_UPDATE , Roles.ROLE_USERS_DELETE }),
	UPLOAD("upload", "send files", new Enum[]
			{ Roles.ROLE_UPLOAD });

	private String name;
	private String description;
	private Enum[] roles;

	private Profiles(String name, String description, Enum[] roles) {
		this.name = name;
		this.description = description;
		this.roles = roles;
	}

	public String getDescription() {
		return description;
	}

	public String getName() {
		return name;
	}

	public Enum[] getRoles() {
		return roles;
	}

	


}
