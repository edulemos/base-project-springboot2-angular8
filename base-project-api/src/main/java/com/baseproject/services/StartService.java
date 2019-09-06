package com.baseproject.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.baseproject.enumerator.Profiles;
import com.baseproject.enumerator.Roles;
import com.baseproject.model.Profile;
import com.baseproject.model.Role;
import com.baseproject.model.User;
import com.baseproject.repository.ProfileRepository;
import com.baseproject.repository.RoleRepository;
import com.baseproject.repository.UserRepository;

@Service
public class StartService {

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	ProfileRepository profileRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Value("${admin.username}")
	private String adminUsername;

	@Value("${admin.name}")
	private String adminName;

	@Value("${admin.email}")
	private String adminEmail;

	@Value("${admin.password}")
	private String adminPassword;

	@SuppressWarnings("rawtypes")
	public void init() {

		// INSERT ROLES
		for (Roles rn : Roles.values()) {
			Role bdRole = roleRepository.findByName(rn);
			if (null == bdRole) {
				Role role = new Role();
				role.setName(rn);
				role.setDescription(rn.getDescription());
				roleRepository.save(role);
			}
		}

		// CREATE PROFILES
		
		for (Profiles p : Profiles.values()) {
			Profile profile = profileRepository.findProfileByName(p.getName());
			if(null == profile) {
				profile = new Profile();
				profile.setName(p.getName());
				for (Enum e : p.getRoles()) {
					Roles r = (Roles) e;
					Role bdRole = roleRepository.findByName(r);
					profile.getRoles().add(bdRole);
				}
				profileRepository.save(profile);
			}

			
		}
		

		// CREATE ADMIN USER

		Boolean existsByUsername = userRepository.existsByUsername(adminUsername);
		String adminPswrd = passwordEncoder.encode(adminPassword);
		
		if (!existsByUsername) {
			User adminUser = new User();
			adminUser.setEmail(adminEmail);
			adminUser.setName(adminName);
			adminUser.setUsername(adminUsername);
			adminUser.setPassword(adminPswrd);
			adminUser.setProfiles(new ArrayList<Profile>());
			adminUser.getProfiles().addAll(profileRepository.findAll());
			userRepository.save(adminUser);
		}

		// INSERT TEST USERSMOCK DATA

		for (int i = 0; i <= 20; i++) {
			String mockname = "user" + i;
			User userMock = new User();
			userMock.setEmail(mockname + "@email.com");
			userMock.setName(mockname);
			userMock.setUsername(mockname);
			userMock.setPassword(adminPswrd);
			userRepository.save(userMock);
		}

	}

}
