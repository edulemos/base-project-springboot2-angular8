package com.baseproject.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baseproject.dto.LoginRequest;
import com.baseproject.dto.LoginResponse;
import com.baseproject.model.User;
import com.baseproject.security.JwtTokenProvider;
import com.baseproject.services.ProfileService;
import com.baseproject.services.UserService;

@RestController
@RequestMapping("login")
public class LoginController {

	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserService userService;
	
	@Autowired
	ProfileService profileService;


	@Autowired
	JwtTokenProvider tokenProvider;

	@PostMapping()
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = tokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new LoginResponse(jwt));
	}
	
	@PostMapping("/register")
	public User create(@RequestBody User user) {
		user.setProfiles(profileService.listAll());
		return userService.save(user);
	}

}