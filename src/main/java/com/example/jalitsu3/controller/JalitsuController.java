package com.example.jalitsu3.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JalitsuController {
	 @RequestMapping(value="/")
	    public String main() {
	        return "index";
	    }

}
