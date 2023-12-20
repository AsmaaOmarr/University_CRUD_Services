function populateFormFields() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get individual parameters
    const id = urlParams.get("id");
    const firstName = urlParams.get("firstName");
    const lastName = urlParams.get("lastName");
    const gender = urlParams.get("gender");
    const gpa = urlParams.get("gpa");
    const level = urlParams.get("level");
    const address = urlParams.get("address");

    // Populate form fields with the retrieved data
    document.getElementById("id").value = id;
    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("gender").value = gender;
    document.getElementById("gpa").value = gpa;
    document.getElementById("level").value = level;
    document.getElementById("address").value = address;

    // Optional: You might also want to disable the fields if needed
    document.getElementById("id").disabled = true;
}


var form = document.getElementById("updateForm");
form.addEventListener("submit", (e) => {

    var isValid = true;

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
        UpdateStudent();
    }
});

async function UpdateStudent(){

    var updatedStudent = {
        ID: document.getElementById("id").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        gender: document.getElementById("gender").value,
        gpa: document.getElementById("gpa").value,
        level: document.getElementById("level").value,
        address: document.getElementById("address").value,
    };
    try {
        const response = await fetch('/university/updateStudent/' + updatedStudent.ID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(updatedStudent),
        });
        if (response.ok) {
            alert("Student Updated Successfully");
        } else {
            alert('Server response not okay:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }

}


