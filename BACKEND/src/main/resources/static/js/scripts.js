// static/js/scripts.js

// Fetch All Patients (View Patients page)
function fetchAllPatients() {
    fetch('http://localhost:8080/api/patients/fetchAll') // Adjust the URL if needed
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#patientTableBody");
            if (tableBody) {
                tableBody.innerHTML = ''; // Clear the table before adding data

                data.forEach(patient => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${patient.patientId}</td>
                        <td>${patient.patientName}</td>
                        <td>${patient.patientGender}</td>
                        <td>${patient.patientAge}</td>
                        <td>${patient.patientEmail}</td>
                        <td>${patient.patientPhone}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        })
        .catch(error => console.error("Error fetching patients: ", error));
}

// Add Patient (Add Patient page)
const patientForm = document.getElementById("patientForm");
if (patientForm) {
    patientForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newPatient = {
            patientName: document.getElementById("name").value,
            patientGender: document.getElementById("gender").value,
            patientAge: document.getElementById("age").value,
            patientEmail: document.getElementById("email").value,
            patientPhone: document.getElementById("phone").value
        };

        fetch('http://localhost:8080/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPatient)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to add patient");
                }
                return response.json();
            })
            .then(data => {
                alert("Patient added successfully!");
                window.location.href = "view-patient.html"; // Redirect to view page
            })
            .catch(error => {
                console.error("Error adding patient: ", error);
                alert("Failed to add patient.");
            });
    });
}

// Auto-fetch patients on page load if table exists
window.onload = function () {
    if (document.getElementById("patientTableBody")) {
        fetchAllPatients();
    }
};

