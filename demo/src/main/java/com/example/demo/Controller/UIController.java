package com.example.demo.Controller;
import ch.qos.logback.core.model.Model;
import com.example.demo.Model.Student;
import com.example.demo.Service.UniversityService;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UIController {

    @GetMapping("/index")
    public String index() {
        return "index";
    }
     @GetMapping("/add")
    public String Add() {
        return "add";
    }
    @GetMapping("/update")
    public String update() {
        return "update";
    }
    @GetMapping("/search")
    public String Search() {
        return "search";
    }
    @GetMapping("/viewall")
    public String viewAll() {
        return "viewall";
    }
     @GetMapping("/delete")
    public String delete() {
        return "delete";
    }
}
