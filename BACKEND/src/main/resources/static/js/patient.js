
// patient.js

let patient = () => {
	setTimeout(() => {
		bindingAllButton()
	})
	return `
        <h2>Patient Module</h2>
        <button data-action="add">Add Patient</button>
        <button data-action="view">View All Patients</button>
        <button data-action="search">Search Patient by ID</button>
        <button data-action="update">Update Patient</button>
        <button data-action="delete">Delete Patient</button>
        <div id="patient-action-container"></div>
    `
}
let bindingAllButton = (e) => {
	let allButton = document.querySelectorAll("button[data-action]");

	let pageReloader = {
		"add": addPatientForm,
		"view": viewPatients,
		"search": searchById,
		"update": updatePatient,
		"delete": deletePatient
	}
	let handleClick = (e) => {
		const action = e.target.getAttribute("data-action");
		if (action && pageReloader[action]) {
			pageReloader[action]();
		}

	}
	allButton.forEach((btn) => {
		btn.addEventListener("click", handleClick)
	})
}
export default patient


export function addPatientForm() {
	const container = document.getElementById("patient-action-container");
	container.innerHTML = `
        <h3>Add New Patient</h3>
        <form id="addPatientForm">
            <input type="text" name="patientName" placeholder="Name" required>
            <input type="text" name="patientGender" placeholder="Gender" required>
            <input type="number" name="patientAge" placeholder="Age" required>
            <input type="email" name="patientEmail" placeholder="Email" required>
            <input type="text" name="patientPhone" placeholder="Phone" required>
            <button type="submit">Add Patient</button>
        </form>
    `;

	setTimeout(() => {
		addPatientFromBinding()
	})


}
function addPatientFromBinding() {
	const form = document.querySelector("#addPatientForm")
	const inputs = document.querySelectorAll("input");
	let handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {};
		inputs.forEach(inp => {
			payload[inp.name] = inp.value;
		});
		try {
			let res = await fetch("http://localhost:8080/api/patients/save", {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json"
				}
			})
			let data = await res.json();
			alert("Patient Added Successfully")
			console.log(data)

		} catch (error) {
			console.error("Error:", error);
			alert("Error adding patient")
		}
	}
	form.addEventListener("submit", handleSubmit)
}

export function viewPatients() {
	const container = document.getElementById("patient-action-container");
	container.innerHTML = `<h3>All Patients</h3><table id="patientsTable"><thead>
        <tr>
            <th>ID</th><th>Name</th><th>Gender</th><th>Age</th><th>Email</th><th>Phone</th>
        </tr></thead><tbody id="tableBody"></tbody></table>`;

	fetch("http://localhost:8080/api/patients/fetchAll")
		.then(res => res.json())
		.then(data => {
			const tbody = document.getElementById("tableBody");
			tbody.innerHTML = "";
			data.forEach(p => {
				const row = `<tr>
                    <td>${p.patientId}</td>
                    <td>${p.patientName}</td>
                    <td>${p.patientGender}</td>
                    <td>${p.patientAge}</td>
                    <td>${p.patientEmail}</td>
                    <td>${p.patientPhone}</td>
                </tr>`;
				tbody.innerHTML += row;
			});
		});
}

export function searchById() {
	const container = document.getElementById("patient-action-container");
	container.innerHTML = `
        <h3>Search Patient by ID</h3>
        <input type="number" id="searchId" placeholder="Enter ID">
        <button id="searchBtn">Search</button>
        <div id="searchResult"></div>
    `;

	document.getElementById("searchBtn").addEventListener("click", async () => {
		const id = document.getElementById("searchId").value;
		const resultDiv = document.getElementById("searchResult");

		try {
			const response = await fetch(`http://localhost:8080/api/patients/fetchPatientById?patientId=${id}`);
			if (!response.ok) {
				throw new Error("Patient not found");
			}
			const p = await response.json();

			resultDiv.innerHTML = `
                <p><strong>Name:</strong> ${p.patientName}</p>
                <p><strong>Gender:</strong> ${p.patientGender}</p>
                <p><strong>Age:</strong> ${p.patientAge}</p>
                <p><strong>Email:</strong> ${p.patientEmail}</p>
                <p><strong>Phone:</strong> ${p.patientPhone}</p>
            `;
		} catch (err) {
			resultDiv.innerText = "Patient not found!";
			console.error(err);
		}
	});
}


export function updatePatient() {
	const container = document.getElementById("patient-action-container");
	container.innerHTML = `
		<h3>Update Patient</h3>
		<form id="updateForm">
			<input type="number" id="updateId" placeholder="Patient ID" required>
			<input type="text" id="updateName" placeholder="Name">
			<input type="text" id="updateGender" placeholder="Gender">
			<input type="number" id="updateAge" placeholder="Age">
			<input type="email" id="updateEmail" placeholder="Email">
			<input type="text" id="updatePhone" placeholder="Phone">
			<button type="submit">Update</button>
		</form>
	`;

	document.getElementById("updateForm").addEventListener("submit", async function (e) {
		e.preventDefault();

		const oldPatientId = document.getElementById("updateId").value;

		const updatedPatient = {
			patientName: document.getElementById("updateName").value,
			patientGender: document.getElementById("updateGender").value,
			patientAge: document.getElementById("updateAge").value,
			patientEmail: document.getElementById("updateEmail").value,
			patientPhone: document.getElementById("updatePhone").value
		};

		try {
			const response = await fetch(`http://localhost:8080/api/patients/updatePatientById?oldPatientId=${oldPatientId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedPatient)
			});

			if (!response.ok) {
				throw new Error("Failed to update patient");
			}

			const data = await response.json();
			alert("Patient updated successfully");
			console.log(data);
		} catch (error) {
			console.error("Update error", error);
			alert("Error updating patient.");
		}
	});
}

export function deletePatient() {
	const container = document.getElementById("patient-action-container");
	container.innerHTML = `
		<h3>Delete Patient</h3>
		<input type="number" id="deleteId" placeholder="Enter ID">
		<button id="deleteBtn">Delete</button>
	`;

	document.getElementById("deleteBtn").addEventListener("click", async () => {
		const patientId = document.getElementById("deleteId").value;

		if (!patientId) {
			alert("Please enter a valid Patient ID.");
			return;
		}

		try {
			const response = await fetch(`http://localhost:8080/api/patients/deletePatientById?patientId=${patientId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete patient");
			}

			alert("Patient deleted successfully");
		} catch (error) {
			console.error("Delete error", error);
			alert("Error deleting patient.");
		}
	});
}

