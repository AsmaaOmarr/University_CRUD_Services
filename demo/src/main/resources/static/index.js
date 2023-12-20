
async function saveSortedToXml(sortedResult) {
    try {
        // Send a POST request to the server to save the sorted data to XML
        fetch(`/university/saveToXml`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sortedResult),
        })
        .then(response => {
            if (response.ok) {
                console.log('Sorted data saved to XML successfully.');
            } else {
                console.error('Failed to save sorted data to XML:', response.statusText);
                // Handle error, e.g., display an error message to the user
            }
        });
    } catch (error) {
        console.error('Error:', error);
        // Handle error, e.g., display an error message to the user
    }
}

async function sortStudents() {
    var sortAttribute = document.getElementById("sortAttribute").value;
    var sortOrder = document.getElementById("sortOrder").value;

    try {
        // Send a GET request to the server to get sorted data
        const response = await fetch(`/university/sortStudents?sortBy=${sortAttribute}&sortOrder=${sortOrder}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Handle the server response
        if (response.ok) {
            const result = await response.json();
            // Update the UI with the sorted result
            displaySortedResult(result);
            saveSortedToXml(result);

        } else {
            console.error('Server response not okay:', response.statusText);
            // Handle error, e.g., display an error message to the user
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error, e.g., display an error message to the user
    }
}

function displaySortedResult(sortedResult) {
    var resultDiv = document.getElementById("studentsTableBody");
    resultDiv.innerHTML = "";

    if (sortedResult.length === 0) {
        resultDiv.textContent = "No results found.";
        resultDiv.style.color = "green";
    } else {
        sortedResult.forEach(student => {
            var row = resultDiv.insertRow();
            row.insertCell(0).textContent = student.id;
            row.insertCell(1).textContent = student.firstName;
            row.insertCell(2).textContent = student.lastName;
            row.insertCell(3).textContent = student.gender;
            row.insertCell(4).textContent = student.gpa;
            row.insertCell(5).textContent = student.level;
            row.insertCell(6).textContent = student.address;
            var cell7 = row.insertCell(7);
            var updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.className="btn";
            updateButton.addEventListener("click", function () {
                // Redirect to the '/update' page when the button is clicked
                 window.location.href = "/update?id=" + student.id +
                          "&firstName=" + encodeURIComponent(student.firstName) +
                          "&lastName=" + encodeURIComponent(student.lastName) +
                          "&gender=" + encodeURIComponent(student.gender) +
                          "&gpa=" + student.gpa +
                          "&level=" + student.level +
                          "&address=" + encodeURIComponent(student.address);
            });
            cell7.appendChild(updateButton);
        });

    }
}




async function searchByGPA() {
    var targetGPA = document.getElementById("searchGPA").value;
    if (targetGPA === "") {
        document.getElementById("searchResult").textContent = "required";
        document.getElementById("searchResult").style.color = "red";
        return; // Exit the function if studentIDToDelete is empty
    }
    try {
        // Send a GET request to the server
        const response = await fetch(`/university/searchByGPA/${targetGPA}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Handle the server response
        if (response.ok) {
            const result = await response.json();
            // Update the UI with the search result
            console.log(result);
            displaySearchResult(result);
        } else {
            console.error('Server response not okay:', response.statusText);
            // Handle error, e.g., display an error message to the user
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error, e.g., display an error message to the user
    }
}

function displaySearchResult(result) {

    var resultDiv = document.getElementById("searchResult");
    resultDiv.innerHTML = "";

    if (result.length === 0) {
        resultDiv.textContent = "No results found.";
        resultDiv.style.color = "green";
    } else {
        result.forEach(student => {
            var studentDiv = document.createElement("div");
            //console.log(student.ID);
            //<h4>Student ID: ${student.ID}</h4>
            studentDiv.innerHTML = `<h4>Student ID: ${student.id}</h4>
                                    <p>First Name: ${student.firstName}</p>
                                    <p>Last Name: ${student.lastName}</p>
                                    <p>Gender: ${student.gender}</p>
                                    <p>GPA: ${student.gpa}</p>
                                    <p>Level: ${student.level}</p>
                                    <p>Address: ${student.address}</p>`;

            resultDiv.appendChild(studentDiv);
            resultDiv.style.color = "green";
        });
    }
}

async function searchByFirstName() {
    var targetFirstName = document.getElementById("searchFirstName").value;

    if (targetFirstName === "") {
        document.getElementById("searchResultFirstName").textContent = "required";
        document.getElementById("searchResultFirstName").style.color = "red";
        return; // Exit the function if studentIDToDelete is empty
    }
    try {
        // Send a GET request to the server
        const response = await fetch(`/university/searchByFirstName/${targetFirstName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Handle the server response
        if (response.ok) {
            const result = await response.json();
            // Update the UI with the search result
            console.log(result);
            displaySearchResultForFirstName(result);
        } else {
            console.error('Server response not okay:', response.statusText);
            // Handle error, e.g., display an error message to the user
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error, e.g., display an error message to the user
    }
}

function displaySearchResultForFirstName(result) {

    var resultDiv = document.getElementById("searchResultFirstName");
    resultDiv.innerHTML = "";
    if (result.length === 0) {
        resultDiv.textContent = "No results found.";
        resultDiv.style.color = "green";
    } else {
        result.forEach(student => {
            var studentDiv = document.createElement("div");
            console.log(student.ID);
            //<h4>Student ID: ${student.ID}</h4>
            studentDiv.innerHTML = `<h4>Student ID: ${student.id}</h4>
                                    <p>First Name: ${student.firstName}</p>
                                    <p>Last Name: ${student.lastName}</p>
                                    <p>Gender: ${student.gender}</p>
                                    <p>GPA: ${student.gpa}</p>
                                    <p>Level: ${student.level}</p>
                                    <p>Address: ${student.address}</p>`;
            resultDiv.appendChild(studentDiv);
            resultDiv.style.color = "green";
        });
    }
}

function deleteStudent() {

    var studentIDToDelete = document.getElementById("deleteStudentID").value;
    if (studentIDToDelete === "") {
        document.getElementById("displaydelete").textContent = "Enter Student ID ";
        document.getElementById("displaydelete").style.color = "red";
        return; // Exit the function if studentIDToDelete is empty
    }
    // Make an HTTP request to the server-side controller to delete the student
    fetch(`/university/deleteRecord/${studentIDToDelete}`, {
        method: 'DELETE',
    })
        .then(response => response.text()) // Assuming the server returns plain text
        .then(data => {

            // Display the updated list of students
            viewStudents();
            // Handle the server's response
            console.log(data); // Log the response to the console, you can use it as needed
            document.getElementById("displaydelete").textContent = data.toString();
            document.getElementById("displaydelete").style.color = "green";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

async function viewStudents() {
    try {
        // Send a GET request to the server
        const response = await fetch(`/university/getAllStudents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Handle the server response
        if (response.ok) {
            const result = await response.json();
            // Update the UI with the search result
            console.log(result);

            var tableBody = document.getElementById("studentsTableBody");

            // Clear previous content
            tableBody.innerHTML = "";

            // Check if there are students to display
            if (result.length === 0) {
                var row = tableBody.insertRow();
                var cell = row.insertCell(0);
                cell.colSpan = 7;
                cell.textContent = "No students available.";
                return;
            }
            // Iterate through the students array and add rows to the table
            result.forEach(student => {
                var row = tableBody.insertRow();
                row.insertCell(0).textContent = student.id;
                row.insertCell(1).textContent = student.firstName;
                row.insertCell(2).textContent = student.lastName;
                row.insertCell(3).textContent = student.gender;
                row.insertCell(4).textContent = student.gpa;
                row.insertCell(5).textContent = student.level;
                row.insertCell(6).textContent = student.address;

                var cell7 = row.insertCell(7);
                var updateButton = document.createElement("button");
                updateButton.textContent = "Update";
                updateButton.className="btn";
                updateButton.addEventListener("click", function () {
                    // Redirect to the '/update' page when the button is clicked
                     window.location.href = "/update?id=" + student.id +
                              "&firstName=" + encodeURIComponent(student.firstName) +
                              "&lastName=" + encodeURIComponent(student.lastName) +
                              "&gender=" + encodeURIComponent(student.gender) +
                              "&gpa=" + student.gpa +
                              "&level=" + student.level +
                              "&address=" + encodeURIComponent(student.address);
                });
                cell7.appendChild(updateButton);
            });

        } else {
            console.error('Server response not okay:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}





async function searchStudents(){
    var searchKey = document.getElementById("searchKey").value;
    if (searchKey === "") {
        document.getElementById("searchKeyerror").textContent = "required";
        document.getElementById("searchKeyerror").style.color = "red";
        return; // Exit the function if studentIDToDelete is empty
    }

    var searchValue = document.getElementById("searchValue").value;
    if (searchValue === "") {
        document.getElementById("searchValueerror").textContent = "required";
        document.getElementById("searchValueerror").style.color = "red";
        return; // Exit the function if studentIDToDelete is empty
    }
    try {
        // Send a GET request to the server
        const response = await fetch(`/university/searchStudents/${searchKey}/${searchValue}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Handle the server response
        if (response.ok) {
            const result = await response.json();

            var tableBody = document.getElementById("studentsTableBody");

            // Clear previous content
            tableBody.innerHTML = "";

            // Check if there are students to display
            if (result.length === 0) {
                var row = tableBody.insertRow();
                var cell = row.insertCell(0);
                cell.colSpan = 7;
                cell.textContent = "No students available.";
                return;
            }
            // Iterate through the students array and add rows to the table
            result.forEach(student => {
                var row = tableBody.insertRow();
                row.insertCell(0).textContent = student.id;
                row.insertCell(1).textContent = student.firstName;
                row.insertCell(2).textContent = student.lastName;
                row.insertCell(3).textContent = student.gender;
                row.insertCell(4).textContent = student.gpa;
                row.insertCell(5).textContent = student.level;
                row.insertCell(6).textContent = student.address;

               
            });

        } else {
            console.error('Server response not okay:', response.statusText);
            // Handle error, e.g., display an error message to the user
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error, e.g., display an error message to the user
    }

}