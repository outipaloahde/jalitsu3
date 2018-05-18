package com.example.jalitsu3;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.jalitsu3.domain.Event;
import com.example.jalitsu3.domain.EventRepository;

@SpringBootApplication
public class Jalitsu3Application {
	private static final Logger log = LoggerFactory.getLogger(Jalitsu3Application.class);

	public static void main(String[] args) {
		SpringApplication.run(Jalitsu3Application.class, args);
	}
	
	@Bean
	public CommandLineRunner eDemo(EventRepository eRepository) {
		return(args) -> {
			log.info("save events");
			eRepository.save(new Event("Crossfit", "Treenit", "18.5.2018", "18.50", "Vetosali"));
			eRepository.save(new Event("Trenet", "Treenit", "20.5.2018", "20.15", "Väinämöisen kenttä"));
			eRepository.save(new Event("HIFK-HJK", "Peli", "23.5.2018", "19.00", "Pitäjänmäki tn"));
			eRepository.save(new Event("Treenit", "Treenit", "27.5.2018", "19.45", "Väinämöisen kenttä"));
			
			
			log.info("fetch all events");
			for (Event event : eRepository.findAll()) {
				log.info(event.toString());
			}
		
		};
	}
}

