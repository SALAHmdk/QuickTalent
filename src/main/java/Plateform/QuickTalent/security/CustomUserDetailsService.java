// src/main/java/Plateform/QuickTalent/security/CustomUserDetailsService.java
package Plateform.QuickTalent.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Pour que le contexte Spring démarre, on fournit un utilisateur « factice ».
        // Vous pourrez remplacer ce code par la récupération depuis votre base de
        // données.
        return User.withUsername("user")
                .password("{noop}password")
                .roles("USER")
                .build();
    }
}
