package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.Controller.UniversityControler;
import com.example.demo.Model.Student;
import com.example.demo.Service.UniversityService;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
	SpringApplication.run(DemoApplication.class, args);

	UniversityService universityService = new UniversityService();
	UniversityControler universityControler = new UniversityControler(universityService);


		// List<Student> studentList = new ArrayList<>(); 

		// Student student1 = new Student("1", "John", "Doe", "Male", 3.8, 3, "123 Main St");
        // Student student2 = new Student("2", "Jane", "Smith", "Female", 3.5, 2, "456 Oak St");
        // Student student3 = new Student("3", "Bob", "Johnson", "Male", 3.2, 1, "789 Pine St");
		// studentList.add(student1);
        // studentList.add(student2);
        // studentList.add(student3);
		// universityService.buildAndStoreXML(studentList);
	    // universityService.deleteRecord("1");

		// universityService.getStudents();

		// Student updatedStudent = new Student("1", "Asmaa", "omar", "Male", 3.8, 3, "123 Main St");

		// universityService.updateStudent("1", updatedStudent);

		System.out.println("asmaa");

	}

}
