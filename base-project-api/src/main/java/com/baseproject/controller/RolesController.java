package com.baseproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baseproject.services.RoleService;

@RestController
@RequestMapping("roles")
public class RolesController {

	@Autowired
	RoleService service;


	@GetMapping()
	public ResponseEntity<?> list() {
		return ResponseEntity.ok(service.listAll());
	}

}