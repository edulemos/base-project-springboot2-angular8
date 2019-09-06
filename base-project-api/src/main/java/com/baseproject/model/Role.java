package com.baseproject.model;

import org.hibernate.annotations.NaturalId;

import com.baseproject.enumerator.Roles;

import javax.persistence.*;

@Entity
@Table(name = "tb_role")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@NaturalId
	@Column(length = 60)
	private Roles name;


	private String description;

	public Role() {

	}

	public Role(Roles name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Roles getName() {
		return name;
	}

	public void setName(Roles name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}