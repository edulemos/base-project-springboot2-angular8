package com.baseproject.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.baseproject.model.User;
import com.baseproject.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository repository;

	@Autowired
	PasswordEncoder passwordEncoder;

	public User save(User user) {
		if (null == user.getId())
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		return repository.save(user);
	}

	public Optional<User> findById(long id) {
		return repository.findById(id);
	}

	public void deleteById(long id) {
		repository.deleteById(id);
	}

	public List<User> listAll() {
		return repository.findByOrderByNameAsc();
	}

	public List<User> list(Map<String, String> params) {

		if (null == params || params.isEmpty()) {
			return repository.findByOrderByNameAsc();
		} else {
			String name = null != params.get("name") ? params.get("name") : "";
			return repository.findByNameContainingIgnoreCaseOrderByNameAsc(name);
		}

	}

}
