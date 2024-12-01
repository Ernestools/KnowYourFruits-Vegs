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
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class LoginService {
    private UserRepository userRepository ;
    private RabbitTemplate rabbitTemplate;
    @Value("${dataServer.meetUserUrl}")
    private String requestUrl;
    @Value("${dataServer.baseUrl}")
    private String dataServerBaseUrl;

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
/*
    private void publishUser(UserModel user)
    {
        JSONObject json = new JSONObject();
        json.put("id",user.getId());
        json.put("username",user.getUsername());
        json.put("url",user.getUrl());
        rabbitTemplate.convertAndSend("userExchange", "user.created", json.toString());
    }*/

    private void publishUser(UserModel user) throws IOException {
        String path = dataServerBaseUrl.concat(requestUrl);
        URL url = new URL(path.toString());
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Accept", "application/json");
        con.setDoOutput(true);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("username", user.getUsername());
        jsonObject.put("url", user.getUrl());
        try(OutputStream os = con.getOutputStream()) {
            byte[] input = jsonObject.toString().getBytes("utf-8");
            os.write(input, 0, input.length);
        }
        int status = con.getResponseCode();
        if(status != 200)
            throw new IOException(
                    String.format("Failed to recognize a new user: " +
                            "remote host responded with %d status", status)
            );
        con.disconnect();
    }

    private void ensureCorrectPath (){
        actualPath =  actualPath.replace("file:","");
    }


}
