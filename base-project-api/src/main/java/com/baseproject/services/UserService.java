package com.baseproject.services;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.baseproject.exception.BadRequestException;
import com.baseproject.model.User;
import com.baseproject.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository repository;

	@Autowired
	EmailService emailService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Value("${front.url}")
	private String frontUrl;

	public User save(User user) {
		if (null == user.getId())
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		return repository.save(user);
	}

	public Optional<User> findById(long id) {
		return repository.findById(id);
	}

	public Optional<User> findByUuid(String uuid) {
		return repository.findByRecoverUuid(uuid);
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

	public void sendEmailRecover(String email) throws IOException, MessagingException {
		String subject = "recuperar email";

		Optional<User> userOptional = repository.findByEmail(email);

		userOptional.orElseThrow(() -> new BadRequestException("No user found with email " + email));

		String uuid = UUID.randomUUID().toString().replace("-", "");

		User user = userOptional.get();
		user.setRecoverUuid(uuid);
		repository.save(user);

		Map<String, String> parameters = new HashMap<>();
		parameters.put("#link", frontUrl + "/recover?u=" + uuid);
		String template = "recover_pwd.html";

		String htmlTemplate = emailService.loadHtmlTemplate(template, parameters);
		emailService.htmlEmail(email, subject, htmlTemplate);

	}

	public void recoverSave(String uuid, String password) {
		Optional<User> userOptional = repository.findByRecoverUuid(uuid);
		userOptional.orElseThrow(() -> new BadRequestException("No user found with uuid " + uuid));
		User user = userOptional.get();
		user.setPassword(passwordEncoder.encode(password));
		user.setRecoverUuid(null);
		repository.save(user);
	}

}
