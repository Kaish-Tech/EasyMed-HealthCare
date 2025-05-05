package com.qsp.Hospital_Management.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qsp.Hospital_Management.dao.UserDao;
import com.qsp.Hospital_Management.dto.AuthRequest;
import com.qsp.Hospital_Management.dto.AuthResponse;
import com.qsp.Hospital_Management.model.User;
import com.qsp.Hospital_Management.security.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/signup")
	public ResponseEntity<String> singup(@RequestBody User user){
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		userDao.saveUser(user);
		return ResponseEntity.ok("Signup Successful");
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
		Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		User user = userDao.findByEmail(request.getEmail()).get();
		String token = jwtUtil.generateToken(user.getEmail());
		AuthResponse authResponse = new AuthResponse();
		authResponse.setRole(user.getRole());
		authResponse.setToken(token);
		return ResponseEntity.ok(authResponse);
	}
}
