package com.example.demo.configurations.webconfigs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticFilesConfig implements WebMvcConfigurer {//localhost:8080/static/myimage.png
    @Value("${staticFilesMapping}")
    private String virtualPath;
    @Value("${staticFilesLocation}")
    private String actualPath;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(virtualPath)
                .addResourceLocations(actualPath)
                .setCachePeriod(0);
    }
}
