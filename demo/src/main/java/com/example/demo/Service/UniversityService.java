package com.example.demo.Service;


import com.example.demo.Model.Student;
import org.apache.logging.log4j.message.Message;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;
import org.springframework.stereotype.Service;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import static java.lang.Double.*;
import static java.lang.Integer.*;

@Component
public class UniversityService {
    private  List<Student> students;
    private final String FILE_PATH = "students.xml";

    public UniversityService() {
        this.students = new ArrayList<>();
        loadStudentsFromXml();
    }


    private void loadStudentsFromXml() {
        try {
            File file = new File(FILE_PATH);
            if (file.exists()) {
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                Document document = builder.parse(file);

                NodeList studentNodes = document.getElementsByTagName("Student");
                students.clear();

                for (int i = 0; i < studentNodes.getLength(); i++) {
                    Node node = studentNodes.item(i);
                    if (node.getNodeType() == Node.ELEMENT_NODE) {
                        Element element = (Element) node;
                        Student student = new Student(
                                element.getAttribute("ID"),
                                element.getElementsByTagName("FirstName").item(0).getTextContent(),
                                element.getElementsByTagName("LastName").item(0).getTextContent(),
                                element.getElementsByTagName("Gender").item(0).getTextContent(),
                                Double.parseDouble(element.getElementsByTagName("GPA").item(0).getTextContent()),
                                Integer.parseInt(element.getElementsByTagName("Level").item(0).getTextContent()),
                                element.getElementsByTagName("Address").item(0).getTextContent());

                        students.add(student);
                        //System.out.println(student.getID());
                    }
                }
            } else {
                System.out.println("XML file not found. Creating an empty file.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void clearXmlFile() {
        try {
            File file = new File(FILE_PATH);
            if (file.exists()) {
                // Clear the existing content
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                Document document = builder.newDocument();
                document.appendChild(document.createElement("University"));

                SaveFile(file, document);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void buildAndStoreXML(List<Student> newStudents) {
        try {
            File file = new File(FILE_PATH);
            Document document;
            // Check if the file exists
            if (file.exists()) {
                // Load the existing XML file
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                document = builder.parse(file);
            } else {
                // Create a new Document if the file doesn't exist
                DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();
                DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();
                document = documentBuilder.newDocument();
                document.appendChild(document.createElement("University"));
            }

            // Continue with the rest of the method
            Element universityElement = document.getDocumentElement();

            for (Student student : newStudents) {
                Element studentElement = document.createElement("Student");
                studentElement.setAttribute("ID", student.getID());

                Element firstNameElement = document.createElement("FirstName");
                firstNameElement.appendChild(document.createTextNode(student.getFirstName()));
                studentElement.appendChild(firstNameElement);

                Element lastNameElement = document.createElement("LastName");
                lastNameElement.appendChild(document.createTextNode(student.getLastName()));
                studentElement.appendChild(lastNameElement);

                Element genderElement = document.createElement("Gender");
                genderElement.appendChild(document.createTextNode(student.getGender()));
                studentElement.appendChild(genderElement);

                Element gpaElement = document.createElement("GPA");
                gpaElement.appendChild(document.createTextNode(String.valueOf(student.getGPA())));
                studentElement.appendChild(gpaElement);

                Element levelElement = document.createElement("Level");
                levelElement.appendChild(document.createTextNode(String.valueOf(student.getLevel())));
                studentElement.appendChild(levelElement);

                Element addressElement = document.createElement("Address");
                addressElement.appendChild(document.createTextNode(student.getAddress()));
                studentElement.appendChild(addressElement);

                universityElement.appendChild(studentElement);
            }

            // Continue with the rest of the method

            SaveFile(file, document);

            loadStudentsFromXml(); // Load the updated students from XML
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    private void SaveFile(File file, Document document)
            throws TransformerFactoryConfigurationError, TransformerConfigurationException, TransformerException {
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();

        transformer.setOutputProperty(javax.xml.transform.OutputKeys.INDENT, "yes");
        transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "0");

        DOMSource source = new DOMSource(document);
        StreamResult result = new StreamResult(file);
        transformer.transform(source, result);
    }

    public List<Student> searchByGPA(double targetGPA) {

        List<Student> result = new ArrayList<>();
        for (Student student : students) {
            if (student.getGPA() == targetGPA) {
                result.add(student); // Add the specific information you want (e.g., student ID)
            }
        }
        return result;
    }

    public List<Student> searchByFirstName(String targetFirstName) {

        List<Student> result = new ArrayList<>();
        for (Student student : students) {
            if (student.getFirstName().equalsIgnoreCase(targetFirstName)) {
                result.add(student);
            }
        }
        return result;
    }
    public boolean isExistId(String studentID) {
        boolean studentExists = students.stream().anyMatch(student -> student.getID().equals(studentID));
        return studentExists;
    }

    public String deleteRecord(String studentID) {
        try {
            File file = new File(FILE_PATH);
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(file);

            // Check if a student with the given ID exists
            NodeList studentNodes = document.getElementsByTagName("Student");
            boolean studentFound = false;

            for (int i = 0; i < studentNodes.getLength(); i++) {
                Node node = studentNodes.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    if (element.getAttribute("ID").equals(studentID)) {
                        // Remove the student node from the document
                        element.getParentNode().removeChild(element);
                        studentFound = true;
                        break;
                    }
                }
            }

            if (studentFound) {
                // Save the updated document to the file
                SaveFile(file, document);
                //SaveFile(file, document);

                students.removeIf(student -> student.getID().equals(studentID));
                // Reload students from the updated XML file

                loadStudentsFromXml();

                return "Student deleted successfully.";
            } else {
                return "No student found with this ID: " + studentID;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error in deleting student.";
        }
    }

    public List<Student> getStudents() {
        for (Student student : students) {
         System.out.println(student.getID());   
        }
        loadStudentsFromXml();
        return students;
    }

    //update student method
    public String updateStudent(String studentID, Student updatedStudent) {
        try {
            File file = new File(FILE_PATH);
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(file);

            // Check if a student with the given ID exists
            NodeList studentNodes = document.getElementsByTagName("Student");
            boolean studentFound = false;

            for (int i = 0; i < studentNodes.getLength(); i++) {
                Node node = studentNodes.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    if (element.getAttribute("ID").equals(studentID)) {
                        // Update the student information in the document
                        element.getElementsByTagName("FirstName").item(0).setTextContent(updatedStudent.getFirstName());
                        element.getElementsByTagName("LastName").item(0).setTextContent(updatedStudent.getLastName());
                        element.getElementsByTagName("Gender").item(0).setTextContent(updatedStudent.getGender());
                        element.getElementsByTagName("GPA").item(0)
                                .setTextContent(String.valueOf(updatedStudent.getGPA()));
                        element.getElementsByTagName("Level").item(0)
                                .setTextContent(String.valueOf(updatedStudent.getLevel()));
                        element.getElementsByTagName("Address").item(0).setTextContent(updatedStudent.getAddress());

                        studentFound = true;
                        break;
                    }
                }
            }

            if (studentFound) {
                // Save the updated document to the file
                SaveFile(file, document);

                // Update the student in the in-memory list
                for (Student student : students) {
                    if (student.getID().equals(studentID)) {
                        student.setFirstName(updatedStudent.getFirstName());
                        student.setLastName(updatedStudent.getLastName());
                        student.setGender(updatedStudent.getGender());
                        student.setGPA(updatedStudent.getGPA());
                        student.setLevel(updatedStudent.getLevel());
                        student.setAddress(updatedStudent.getAddress());
                        break;
                    }
                }

                return "Student updated successfully.";
            } else {
                return "No student found with this ID: " + studentID;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error in updating student.";
        }
    }

    public List<Student> searchStudents(String searchKey, String searchValue) {
        List<Student> result = new ArrayList<>();

        for (Student student : students) {
            switch (searchKey.toLowerCase()) {
                case "id":
                    if (student.getID().equalsIgnoreCase(searchValue)) {
                        result.add(student);
                    }
                    break;
                case "firstname":
                    if (student.getFirstName().equalsIgnoreCase(searchValue)) {
                        result.add(student);
                    }
                    break;
                case "lastname":
                    if (student.getLastName().equalsIgnoreCase(searchValue)) {
                        result.add(student);
                    }
                    break;
                case "gender":
                    if (student.getGender().equalsIgnoreCase(searchValue)) {
                        result.add(student);
                    }
                    break;
                case "gpa":
                    double targetGPA = Double.parseDouble(searchValue);
                    if (student.getGPA() == targetGPA) {
                        result.add(student);
                    }
                    break;
                case "level":
                    int targetLevel = Integer.parseInt(searchValue);
                    if (student.getLevel() == targetLevel) {
                        result.add(student);
                    }
                    break;
                case "address":
                    if (student.getAddress().equalsIgnoreCase(searchValue)) {
                        result.add(student);
                    }
                    break;
                default:
                    // Handle other cases or provide an error message
                    break;
            }
        }

        return result;
    }

    public List<Student> sortStudents(String sortBy, String sortOrder) {
        // Define a comparator based on the sortBy attribute
        Comparator<Student> comparator = getComparator(sortBy);

        // Sort the list based on the comparator and sortOrder
        if ("desc".equalsIgnoreCase(sortOrder)) {
            Collections.sort(students, comparator.reversed());
        } else {
            Collections.sort(students, comparator);
        }

        return students;
    }

    private Comparator<Student> getComparator(String sortBy) {
        switch (sortBy.toLowerCase()) {
            case "id":
                return Comparator.comparing(Student::getID);
            case "firstname":
                return Comparator.comparing(Student::getFirstName);
            case "lastname":
                return Comparator.comparing(Student::getLastName);
            case "gender":
                return Comparator.comparing(Student::getGender);
            case "gpa":
                return Comparator.comparing(Student::getGPA);
            case "level":
                return Comparator.comparing(Student::getLevel);
            case "address":
                return Comparator.comparing(Student::getAddress);
            default:
                return Comparator.comparing(Student::getID);
        }
    }


}