package com.baseproject.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.baseproject.enumerator.Roles;
import com.baseproject.security.JwtAuthenticationEntryPoint;
import com.baseproject.security.JwtAuthenticationFilter;
import com.baseproject.services.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private static final String H2_CONSOLE = "/h2-console/**";
	private static final String LOGIN = "/login";
	private static final String REGISTER = "/login/register";

	@Autowired
    CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                    .and()
                .csrf()
                    .disable()
                .exceptionHandling()
                    .authenticationEntryPoint(unauthorizedHandler)
                    .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                .authorizeRequests()
                    .antMatchers(LOGIN).permitAll()
                    .antMatchers(REGISTER).permitAll()
                    .antMatchers(H2_CONSOLE).permitAll()
        		    .antMatchers(HttpMethod.GET,Roles.ROLE_USERS_LIST.getUrl()).access(hasRole(Roles.ROLE_USERS_LIST))		    
        		    .antMatchers(HttpMethod.POST,Roles.ROLE_USERS_SAVE.getUrl()).access(hasRole(Roles.ROLE_USERS_SAVE))		    
        		    .antMatchers(HttpMethod.DELETE,Roles.ROLE_USERS_DELETE.getUrl()).access(hasRole(Roles.ROLE_USERS_DELETE))		    
        		    .antMatchers(HttpMethod.PUT,Roles.ROLE_USERS_UPDATE.getUrl()).access(hasRole(Roles.ROLE_USERS_UPDATE))		    
        		    .antMatchers(HttpMethod.GET,Roles.ROLE_PROFILES_LIST.getUrl()).access(hasRole(Roles.ROLE_PROFILES_LIST))		    
        		    .antMatchers(HttpMethod.POST,Roles.ROLE_PROFILES_SAVE.getUrl()).access(hasRole(Roles.ROLE_PROFILES_SAVE))		    
        		    .antMatchers(HttpMethod.DELETE,Roles.ROLE_PROFILES_DELETE.getUrl()).access(hasRole(Roles.ROLE_PROFILES_DELETE))		    
        		    .antMatchers(HttpMethod.PUT,Roles.ROLE_PROFILES_UPDATE.getUrl()).access(hasRole(Roles.ROLE_PROFILES_UPDATE))		    
                    .anyRequest().authenticated();
        
        // H2 Console config
        http.headers().frameOptions().sameOrigin();

        // Add our custom JWT security filter
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

    }
    
	private String hasRole(Roles roleName) {
    	return "hasRole('"+roleName.toString()+"')";
    }
    
    
}