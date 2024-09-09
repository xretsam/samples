package com.example.basic_crud_app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @GetMapping("/")
    public String serveFrontend() {
        return "index.html";
    }
}
