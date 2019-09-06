package com.baseproject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baseproject.model.Role;
import com.baseproject.repository.RoleRepository;

@Service
public class RoleService {

	@Autowired
	RoleRepository repository;

	public List<Role> listAll() {
		return repository.findAll();
	}

}
