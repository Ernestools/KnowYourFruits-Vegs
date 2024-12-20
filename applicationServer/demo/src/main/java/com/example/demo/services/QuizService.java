package com.example.demo.services;

import com.example.demo.models.ClassModel;
import com.example.demo.models.QuizModel;
import com.example.demo.repositories.ClassRepository;
import com.example.demo.repositories.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QuizService {
    private final ClassRepository classRepository;
    private final QuizRepository quizRepository;
    @Autowired
    public QuizService(ClassRepository classRepository, QuizRepository quizRepository)
    {
        this.quizRepository = quizRepository;
        this.classRepository = classRepository;
    }

    public Iterable<ClassModel> getAllClasses(){
        return classRepository.findAll();
    }

    public Iterable<QuizModel> getAll(){

        return quizRepository.findAll();
    }
    public Map<String, String> getAllClassesAsMap(){

        return classRepository.findAll().stream()
                .collect(Collectors.toMap(ClassModel::getId, ClassModel::getLabel));
    }
}
