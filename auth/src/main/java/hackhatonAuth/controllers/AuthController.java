package hackhatonAuth.controllers;

import org.springframework.web.bind.annotation.RestController;

import hackhatonAuth.security.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class AuthController {

	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@GetMapping("/")
	public String getMethodName() {
		
		System.out.println(passwordEncoder.encode("1234"));
		return "java";
	}
	
	
	@PostMapping("/login")
	public String login() {
		
		
		
		
		return "login";
	}
	
	
	
}
