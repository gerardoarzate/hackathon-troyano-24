package hackhatonAuth.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.databind.ObjectMapper;

import hackhatonAuth.security.UserDetailsServiceImpl;

@Configuration
public class BeansInjector {
	

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	
	
	@Bean
	public AuthenticationManager authManager(AuthenticationConfiguration authConf) throws Exception {
		return authConf.getAuthenticationManager();
	}

	
	@Bean
	public AuthenticationProvider authProvider() {
		DaoAuthenticationProvider daoProvider = new  DaoAuthenticationProvider();
		daoProvider.setUserDetailsService(userDetailsServiceImpl);
		daoProvider.setPasswordEncoder(passwordEncoder());
		
		return daoProvider;
	}
	
	@Bean
	public ObjectMapper mapper() {
		return new ObjectMapper();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	
}
