package com.example.demo.services;

import com.example.demo.models.UserModel;
import com.example.demo.repositories.UserRepository;
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
    @Autowired
    UserRepository userRepository ;
    @Value("${virtualUsersImagesPath}")
    private String virtualPath;
    @Value("${usersFilesLocation}")
    private String actualPath;
    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public UserModel registerUser(String username, MultipartFile file) throws IOException {

        ensureCorrectPath();
        String fileName = UUID.randomUUID()+file.getOriginalFilename()
                .substring(file.getOriginalFilename().indexOf("."));
        File parentDirectory = new File(actualPath);
        File newCreatedFile = new File(parentDirectory, fileName);
        file.transferTo(Path.of(newCreatedFile.getAbsolutePath()));

        UserModel user = new UserModel(username,virtualPath + fileName);
        return  userRepository.save(user);
    }
    private void ensureCorrectPath (){
        actualPath =  actualPath.replace("file:","");
    }


}
