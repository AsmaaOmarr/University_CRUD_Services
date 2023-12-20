var form = document.getElementById("addStudentsForm");
form.addEventListener("submit", (e) => {

    var isValid = true;
    //ID name validation
    var ID = document.getElementById("id").value;
    if (ID === "") {
        document.getElementById("iderror").innerHTML = " ID is Required";
        document.getElementById("id").focus();
        isValid = false;
        e.preventDefault();
    } else {
        fetch(`/university/isExistId/${ID}`)
            .then(response => response.json())
            .then(data => {
                if (data == true) {
                    // display an error message if the username already exists
                    document.getElementById("iderror").innerHTML = " ID is already exist";
                    document.getElementById("id").focus();
                    isValid = false;
                    e.preventDefault();
                    console.log('exist')
                } else {
                    // clear the error message if the username doesn't exist
                    document.getElementById("iderror").innerHTML = "";
                    console.log('doesn\'t exist');
                }
            })
            .catch(error => console.error(error));
        isValid = isValid ? true : false;
    }

    //first name validation
    var regex = new RegExp("[a-zA-Z]+");
    var firstName = document.getElementById("firstName").value;
    if (firstName === "") {
        document.getElementById("fnerror").innerHTML = " First name is Required";
        document.getElementById("firstName").focus();
        isValid = false;
        e.preventDefault();
    } else if (regex.test(firstName) == false) {
        document.getElementById("fnerror").innerHTML = " First name must be characters from a-z";
        isValid = false;
        e.preventDefault();
    } else {
        document.getElementById("fnerror").innerHTML = "";
        isValid = isValid ? true : false;
    }

    //last name validation
    var lastName = document.getElementById("lastName").value;
    if (lastName === "") {
        document.getElementById("lnerror").innerHTML = " Last name is Required";
        document.getElementById("lastName").focus();
        isValid = false;
        e.preventDefault();
    } else if (regex.test(lastName) == false) {
        document.getElementById("lnerror").innerHTML = " Last name must be characters from a-z";
        isValid = false;
        e.preventDefault();
    } else {
        document.getElementById("lnerror").innerHTML = "";
        isValid = isValid ? true : false;
    }
    // gender validation
    var gender = document.getElementById("gender").value;
    if (gender === "") {
        document.getElementById("gendererror").innerHTML = " gender is Required";
        document.getElementById("gender").focus();
        isValid = false;
        e.preventDefault();
    } else {
        document.getElementById("gendererror").innerHTML = "";
        isValid = isValid ? true : false;
    }
    //last name validation
    var gpa = document.getElementById("gpa").value;
    if (gpa === "") {
        document.getElementById("gpaerror").innerHTML = " gpa is Required";
        document.getElementById("gpa").focus();
        isValid = false;
        e.preventDefault();

    } else if (gpa < 0 || gpa > 4) {
        document.getElementById("gpaerror").innerHTML = " gpa must be from 0-4";
        isValid = false;
        e.preventDefault();
    } else {
        document.getElementById("gpaerror").innerHTML = "";
        isValid = isValid ? true : false;
    }
    //level 
    var level = document.getElementById("level").value;
    if (level === "") {
        document.getElementById("levelerror").innerHTML = " level is Required";
        document.getElementById("level").focus();
        isValid = false;
        e.preventDefault();
    } else {
        document.getElementById("levelerror").innerHTML = "";
        isValid = isValid ? true : false;
    }
    //address validation
    var address = document.getElementById("address").value;
    if (address === "") {
        document.getElementById("adderror").innerHTML = " address is Required";
        document.getElementById("address").focus();
        isValid = false;
        e.preventDefault();
    } else if (regex.test(address) == false) {
        document.getElementById("adderror").innerHTML = " address must be characters from a-z";
        isValid = false;
        e.preventDefault();
    } else {
        document.getElementById("adderror").innerHTML = "";
        isValid = isValid ? true : false;
    }
    //if all info is not validated
    if (isValid == true) {
        submitForm();
    }
});


var students = [];
var count = 1;
async function submitForm() {
    var studentData = {
        ID: document.getElementById("id").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        gender: document.getElementById("gender").value,
        gpa: document.getElementById("gpa").value,
        level: document.getElementById("level").value,
        address: document.getElementById("address").value,
    };
    console.log(studentData);
    students.push(studentData);
    // Add logic to send the students array to the server using JSON
    // For example, using fetch or XMLHttpRequest
    try {
        const response = await fetch('/university/addStudentsWithCount/' + students.length, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(students),
        });
        // Hide the studentFieldsContainer after submission
        console.log(students[0]);
        students.length = 0;
        console.log(students.length);
        if (response.ok) {
            alert("Student Added Successfully");
        } else {
            alert('Server response not okay:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}  