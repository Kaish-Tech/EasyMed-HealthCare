package com.qsp.Hospital_Management.security;

import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	private String secret ="hospital123";
	
	public String generateToken(String email) {
		String token = Jwts.builder()
				.setSubject(email)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis()+86400000))
				.signWith(SignatureAlgorithm.HS256, secret).compact();
		System.out.println("Generated Token: " + token); 
		return token;
	}
	public String extractUsername(String token) {
		return Jwts.parser().setSigningKey(secret)
				.parseClaimsJws(token).getBody().getSubject();
	}
	public boolean validateToken(String token, UserDetails userDetails) {
		String username = extractUsername(token);
		return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}
	private boolean isTokenExpired(String token) {
		Date expiration= Jwts.parser().setSigningKey(secret)
				.parseClaimsJws(token).getBody().getExpiration();
		return expiration.before(new Date());
	}
}
