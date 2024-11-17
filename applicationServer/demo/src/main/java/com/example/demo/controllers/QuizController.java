package com.example.demo.controllers;

import com.example.demo.services.QuizService;
import com.example.demo.models.ClassModel;
import com.example.demo.models.QuizModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/quiz")
public class QuizController {
    private final QuizService quizService;

    @Autowired
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping
    public Iterable<QuizModel> getAll() {
        return quizService.getAll();
    }

    @GetMapping(path = "choices")
    public Map<String, String> getAllChoices() {
        return quizService.getAllClassesAsMap();
    }

}
