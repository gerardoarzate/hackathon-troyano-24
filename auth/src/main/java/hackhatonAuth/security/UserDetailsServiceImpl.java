package hackhatonAuth.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService{

	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		System.out.println("entró al UserDetails");
		
		return null;
	}
	
}
