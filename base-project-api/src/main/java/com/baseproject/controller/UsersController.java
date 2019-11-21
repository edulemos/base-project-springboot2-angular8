package com.baseproject.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baseproject.dto.PasswordRequest;
import com.baseproject.model.User;
import com.baseproject.services.UserService;

@RestController
@RequestMapping("users")
public class UsersController {

	@Autowired
	UserService service;

	@PostMapping
	public User create(@RequestBody User user) {
		return service.save(user);
	}

	@GetMapping()
	public ResponseEntity<?> list(@RequestParam Map<String, String> params) {
		return ResponseEntity.ok(service.list(params));
	}

	@GetMapping(path = { "/{id}" })
	public ResponseEntity<?> findById(@PathVariable long id) {
		return service.findById(id).map(record -> ResponseEntity.ok().body(record))
				.orElse(ResponseEntity.notFound().build());
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<?> update(@PathVariable("id") long id, @RequestBody User user) {
		return service.findById(id).map(record -> {
			record.setName(user.getName());
			record.setEmail(user.getEmail());
			record.setUsername(user.getUsername());
			record.setProfiles(user.getProfiles());
			User updated = service.save(record);
			return ResponseEntity.ok().body(updated);
		}).orElse(ResponseEntity.notFound().build());
	}

	@PutMapping(value = "/account/{id}")
	public ResponseEntity<?> updateAccount(@PathVariable("id") long id, @RequestBody User user) {
		return service.findById(id).map(record -> {
			User updated = service.updateAccount(id, user);
			return ResponseEntity.ok().body(updated);
		}).orElse(ResponseEntity.notFound().build());
	}
	
	@PutMapping(value = "/password/{id}")
	public ResponseEntity<?> updatePassword(@PathVariable("id") long id, @RequestBody PasswordRequest requestDto) {
		return service.findById(id).map(record -> {
			service.updatePassword(id, requestDto);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping(path = { "/{id}" })
	public ResponseEntity<?> delete(@PathVariable long id) {
		return service.findById(id).map(record -> {
			service.deleteById(id);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}
}