package com.example.demo.controllers;

import com.example.demo.models.UserModel;
import com.example.demo.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/login")
public class LoginController {
    LoginService loginService ;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }
    @PostMapping (path="user")
    public UserModel registerUser(@RequestParam("username") String username, @RequestParam("file") MultipartFile file){
        try {
            return loginService.registerUser(username,file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
