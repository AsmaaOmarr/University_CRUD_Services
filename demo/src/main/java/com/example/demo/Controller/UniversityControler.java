package com.example.demo.Controller;

import com.example.demo.Model.Student;
import com.example.demo.Service.UniversityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Controller
@RestController
@RequestMapping("/university")
public class UniversityControler {

    private final UniversityService universityService;

    public UniversityControler(UniversityService universityService) {
        this.universityService = universityService;
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/addStudents")
    public void addStudents(@RequestBody List<Student> students) {
        universityService.buildAndStoreXML(students);
    }

    @PostMapping("/addStudentsWithCount/{count}")
    public ResponseEntity<String> addStudentsWithCount(@PathVariable int count, @RequestBody List<Student> students) {
        if (students.size() == count) {
            universityService.buildAndStoreXML(students);
            return ResponseEntity.ok("Students added successfully.");
        } else {
            return ResponseEntity.badRequest().body("Invalid number of students provided.");
        }
    }

    @GetMapping("/searchByGPA/{targetGPA}")
    public List<Student> searchByGPA(@PathVariable double targetGPA) {
        return universityService.searchByGPA(targetGPA);
    }

    @GetMapping("/searchByFirstName/{targetFirstName}")
    public List<Student> searchByFirstName(@PathVariable String targetFirstName) {
        return universityService.searchByFirstName(targetFirstName);
    }

    @GetMapping("/isExistId/{studentID}")
    public boolean isExistId(@PathVariable String studentID) {
        return universityService.isExistId(studentID);
    }

    @DeleteMapping("/deleteRecord/{studentID}")
    public String deleteRecord(@PathVariable String studentID) {
        return universityService.deleteRecord(studentID);
    }

    @PutMapping("/updateStudent/{studentID}")
    public String updateStudentInformation(@PathVariable String studentID, @RequestBody Student updatedStudent) {
        return universityService.updateStudent(studentID, updatedStudent);
    }

    // Additional methods can be added based on specific requirements
    @GetMapping("/getAllStudents")
    public List<Student> getAllStudents() {
        return universityService.getStudents();
    }

    @GetMapping("/searchStudents/{searchKey}/{searchValue}")
    public List<Student> searchStudents(
            @PathVariable String searchKey,
            @PathVariable String searchValue) {

        List<Student> searchResult = universityService.searchStudents(searchKey, searchValue);
        return searchResult;
    }

    @GetMapping("/sortStudents")
    public ResponseEntity<List<Student>> sortStudents(
            @RequestParam String sortBy,
            @RequestParam String sortOrder) {
        // Sort students based on the provided attribute and order
        List<Student> sortedStudents = universityService.sortStudents(sortBy, sortOrder);

        if (sortedStudents != null) {
            return ResponseEntity.ok(sortedStudents);
        } else {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }


    @PostMapping("/saveToXml")
    public ResponseEntity<String> saveToXml(@RequestBody List<Student> sortedStudents) {
        universityService.clearXmlFile(); // Add a method to clear the XML file
        universityService.buildAndStoreXML(sortedStudents);
        return ResponseEntity.ok("Sorted data saved to XML successfully.");
    }


}