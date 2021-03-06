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

import com.baseproject.model.Profile;
import com.baseproject.services.ProfileService;

@RestController
@RequestMapping("profiles")
public class ProfilesController {

	@Autowired
	ProfileService service;

	@PostMapping
	public Profile create(@RequestBody Profile profile) {
		return service.save(profile);
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
	public ResponseEntity<?> update(@PathVariable("id") long id, @RequestBody Profile Profile) {
		return service.findById(id).map(record -> {
			record.setName(Profile.getName());
			record.setRoles(Profile.getRoles());
			Profile updated = service.save(record);
			return ResponseEntity.ok().body(updated);
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