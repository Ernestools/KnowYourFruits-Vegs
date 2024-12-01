package com.example.demo.configurations.appstarters;

import com.example.demo.models.UserModel;
import com.example.demo.repositories.ClassRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@Configuration
public class FacesInitializer {
    @Value("${dataServer.initFacesUrl}")
    private String requestUrl;
    @Value("${dataServer.baseUrl}")
    private String dataServerBaseUrl;
    @Bean
    public CommandLineRunner initializeFaces()
    {
        return args -> {
            requestDataServerForInitialization();
        };
    }

    private void requestDataServerForInitialization() throws IOException {
        String path = dataServerBaseUrl.concat(requestUrl);
        URL url = new URL(path.toString());
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        int status = con.getResponseCode();
        if(status != 200)
            throw new IOException(
                    String.format("Failed to initialize faces: " +
                            "remote host responded with %d status", status)
            );
        con.disconnect();
    }
}
