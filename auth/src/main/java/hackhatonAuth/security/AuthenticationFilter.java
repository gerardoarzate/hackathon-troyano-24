package hackhatonAuth.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authenticationManager;
	private ObjectMapper mapper;
	private JwtService jwtService;

	public AuthenticationFilter(AuthenticationManager authenticationManager, ObjectMapper mapper, JwtService jwtService) {

		this.authenticationManager = authenticationManager;
		this.mapper = mapper;
		this.jwtService = jwtService;
		
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {

		// 1.- obtener del body o header el username y el password
		
		JsonNode cuerpo = obtenerCuerpo(request);
		
		String username = obtenerUsuario(cuerpo);
		String password = obtenerPassword(cuerpo);
		
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
		
		// 2.- implementar userdatailsservice
		
		System.out.println("simon pasó hasta el metodo authenticate:\n"+"\t"+username+"\n\tPassword: "+password);
		return authenticationManager.authenticate(authToken);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {

		SecurityContextHolder.getContext().setAuthentication(authResult);

		Map<String, Object> body = new HashMap<String, Object>();
		Map<String, Object> claims = new HashMap<String, Object>();

		List<String> authority = authResult.getAuthorities().stream().map(x -> x.getAuthority())
				.filter(a -> a.startsWith("ROLE_")).map(a -> a.replace("ROLE_", "")).collect(Collectors.toList());

		Long idUsuario = 9L;// solicitar el id del empleado con el api de edgar
		claims.put("idUsuario", idUsuario);
		claims.put("tipo", authority.get(0));

		String jwtToken = jwtService.generateToken(idUsuario, claims);
		body.put("token", jwtToken);

		response.getWriter().write(mapper.writeValueAsString(body));
		response.setStatus(HttpStatus.OK.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.getWriter().flush();

		
		chain.doFilter(request, response);
	}

	private String obtenerUsuario(JsonNode cuerpo) {
		String username = cuerpo.get("username").asText();
		if (username == null || username == "") {
			throw new BadCredentialsException("Credenciales de acceso incorrectas");
		}
		return username;
	}

	private String obtenerPassword(JsonNode cuerpo) {
		String password = cuerpo.get("password").asText();
		if (password == null || password == "") {
			throw new BadCredentialsException("Credenciales de acceso incorrectas");
		}
		return password;
	}

	private JsonNode obtenerCuerpo(HttpServletRequest request) {
		try {
			JsonNode jsonNode = mapper.readTree(request.getInputStream());
			return jsonNode;
		} catch (Exception e) {
			System.out.println("error obteniendo Cuerpo");
			throw new RuntimeException("Error obteniendo el cuerpo");
		}
	}

}
