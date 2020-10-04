package com.baseproject;

import java.util.TimeZone;
import java.util.concurrent.Executor;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import com.baseproject.services.StartService;

@SpringBootApplication
@EnableAsync
public class BaseProjectApplication {

	protected final Log log = LogFactory.getLog(BaseProjectApplication.class);

	@Autowired
	Environment env;

	@Autowired
	StartService startService;

	@PostConstruct
	void init() {
		log.info("##### PROFILE: " + env.getProperty("profile") + " #####");
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		startService.init();
	}

	public static void main(String[] args) {
		SpringApplication.run(BaseProjectApplication.class, args);
	}

	@Bean
	public Executor taskExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(2);
		executor.setMaxPoolSize(2);
		executor.setQueueCapacity(500);
		executor.initialize();
		return executor;
	}

}
