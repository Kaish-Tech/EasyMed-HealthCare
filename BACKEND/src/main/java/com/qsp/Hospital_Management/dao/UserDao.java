package com.qsp.Hospital_Management.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.qsp.Hospital_Management.model.User;
import com.qsp.Hospital_Management.repo.UserRepository;

@Repository
public class UserDao {

	@Autowired
	private UserRepository userRepo;
	
	public Optional<User> findByEmail(String email) {
		return userRepo.findByEmail(email);
	}
	
	public void saveUser(User user) {
		userRepo.save(user);
	}
}
