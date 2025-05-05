package com.qsp.Hospital_Management.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qsp.Hospital_Management.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmail(String email);

}
