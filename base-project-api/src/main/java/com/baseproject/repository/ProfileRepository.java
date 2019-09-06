package com.baseproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.baseproject.model.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

	@Query("Select p from Profile p where upper(p.name) like concat('%',upper(:name),'%')")
	List<Profile> pesquisar(@Param("name") String name);

	Profile findProfileByName(String nome);

	List<Profile> findByNameContainingIgnoreCase(String name);

}
