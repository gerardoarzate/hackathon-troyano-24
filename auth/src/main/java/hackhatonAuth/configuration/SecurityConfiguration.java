package hackhatonAuth.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import hackhatonAuth.security.AuthenticationFilter;
import hackhatonAuth.security.JwtService;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	
	@Autowired
	private AuthenticationProvider authProvider; //devuelve instancia del DaoProvider 
	//private JstService jwtService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private ObjectMapper mapper;
	
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager)throws Exception{
		
		return http
				.csrf( config -> config.disable() )
				.sessionManagement(   sessionManagementConfig-> sessionManagementConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS)   )
				.authenticationProvider(authProvider)
				.addFilterAt(new AuthenticationFilter(authenticationManager, mapper, jwtService) , UsernamePasswordAuthenticationFilter.class)
//				.addFilterAfter(authFilter, AuthLoginFilter.class)
				.authorizeHttpRequests( request->{
					request
						.requestMatchers("/login").permitAll()
//						.anyRequest().authenticated()
						.anyRequest().permitAll()
					
					;
				})
				.cors(  cor -> cor.disable() )
//				.formLogin(x->{
//					x.disable();
//				})
				.build();
	}
	
	
	
}
