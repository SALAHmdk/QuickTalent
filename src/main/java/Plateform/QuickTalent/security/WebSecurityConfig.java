package Plateform.QuickTalent.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import Plateform.QuickTalent.entite.Utilisateur;
import Plateform.QuickTalent.service.ServiceRecrutement;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    private final ServiceRecrutement serviceRecrutement;

    public WebSecurityConfig(ServiceRecrutement serviceRecrutement) {
        this.serviceRecrutement = serviceRecrutement;
    }

    // 1) Bean PasswordEncoder
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2) Bean UserDetailsService
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            Utilisateur u = serviceRecrutement.findByEmail(username)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
            return User.builder()
                    .username(u.getEmail())
                    .password(u.getPassword())
                    .roles(u.getRole().replace("ROLE_", ""))
                    .build();
        };
    }

    // 3) Bean DaoAuthenticationProvider
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // 4) Bean AuthenticationManager (utilisé automatiquement)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // 5) Bean SecurityFilterChain (remplace configure(HttpSecurity))
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Désactive CSRF (pour appels AJAX côté AngularJS)
                .csrf(csrf -> csrf.disable())

                // Déclaration des autorisations par URL
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers(
                                "/", "/index.html", "/partials/**", "/js/**", "/css/**", "/img/**",
                                "/angularjs/**", "/bootstrap/**", "/api/auth/**")
                        .permitAll()
                        .requestMatchers("/api/candidatures/**", "/api/candidats/**").hasRole("CANDIDAT")
                        .requestMatchers("/api/offres/**", "/api/recruteurs/**").hasRole("RECRUTEUR")
                        .anyRequest().authenticated())

                // Configuration du formulaire de login
                .formLogin(form -> form
                        .loginProcessingUrl("/api/auth/login")
                        .usernameParameter("username")
                        .passwordParameter("password")
                        .successHandler((req, res, auth) -> res.setStatus(200))
                        .failureHandler((req, res, exc) -> res.sendError(401, "Échec authentification"))
                        .permitAll())

                // Configuration du logout
                .logout(logout -> logout
                        .logoutUrl("/api/auth/logout")
                        .logoutSuccessHandler((req, res, auth) -> res.setStatus(200))
                        .permitAll());

        // On enregistre explicitement le provider d’authentification
        http.authenticationProvider(authenticationProvider());

        return http.build();
    }
}
