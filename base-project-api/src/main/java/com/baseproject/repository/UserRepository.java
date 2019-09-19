package com.baseproject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.baseproject.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
	
	Optional<User> findByRecoverUuid(String uuid);

	Optional<User> findByUsernameOrEmail(String username, String email);

    List<User> findByNameContainingIgnoreCaseOrderByNameAsc(String name);
    
    List<User> findByOrderByNameAsc();
    
	List<User> findByIdIn(List<Long> userIds);

	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
}