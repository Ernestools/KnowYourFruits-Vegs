package com.example.demo.services;

import com.example.demo.models.UserModel;
import com.example.demo.repositories.UserRepository;
import org.json.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class LoginService {
    UserRepository userRepository ;
    private RabbitTemplate rabbitTemplate;

    @Value("${virtualUsersImagesPath}")
    private String virtualPath;
    @Value("${usersFilesLocation}")
    private String actualPath;
    @Autowired
    public LoginService(UserRepository userRepository, RabbitTemplate rabbitTemplate) {
        this.userRepository = userRepository;
        this.rabbitTemplate = rabbitTemplate;
    }
    public UserModel registerUser(String username, MultipartFile file) throws IOException {

        ensureCorrectPath();
        String fileName = UUID.randomUUID()+file.getOriginalFilename()
                .substring(file.getOriginalFilename().indexOf("."));
        File parentDirectory = new File(actualPath);
        File newCreatedFile = new File(parentDirectory, fileName);
        file.transferTo(Path.of(newCreatedFile.getAbsolutePath()));

        UserModel user = new UserModel(username,virtualPath + fileName);
        userRepository.save(user);
        publishUser(user);
        return user;
    }

    private void publishUser(UserModel user)
    {
        JSONObject json = new JSONObject();
        json.put("id",user.getId());
        json.put("username",user.getUsername());
        json.put("url",user.getUrl());
        rabbitTemplate.convertAndSend("userExchange", "user.created", json.toString());
    }

    private void ensureCorrectPath (){
        actualPath =  actualPath.replace("file:","");
    }


}
