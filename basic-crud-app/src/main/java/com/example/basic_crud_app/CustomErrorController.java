package com.example.basic_crud_app;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public String handleError() {
        return "forward:/index.html";
    }
}