let patient = () => {
	setTimeout(() => {
		bindingAllButton()
	})
	return `
        <h2>Patient Module</h2>
		<div id="action-container">
        <button data-action="add">Add Patient</button>
        <button data-action="view">View Patients</button>
        <button data-action="search">Search Patient</button>
        <button data-action="update">Update Patient</button>
        <button data-action="delete">Delete Patient</button>
		</div>
        <div id="form-container"></div>
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
	const container = document.getElementById("form-container");
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

		} catch (error) {
			console.error("Error:", error);
			alert("Error while adding patient")
		}
	}
	form.addEventListener("submit", handleSubmit)
}

export function viewPatients() {
	const container = document.getElementById("form-container");
	container.innerHTML = `
	<h3>All Patients</h3>
	<table id="patientsTable">
		<thead>
        	<tr>
         		<th>ID</th>
				<th>Name</th>
				<th>Gender</th>
				<th>Age</th>
				<th>Email</th>
				<th>Phone</th>
        	</tr>
		</thead>
		<tbody id="tableBody"></tbody>
	</table>`;

	try {
		(async () => {
			const response = await fetch("http://localhost:8080/api/patients/fetchAll")
			let data = await response.json()

			const tbody = document.querySelector("#tableBody")
			tbody.innerHTML = "";
			data.forEach(patient => {
				let row = `
				<tr>
					<td>${patient.patientId}</td>
					<td>${patient.patientName}</td>
					<td>${patient.patientGender}</td>
					<td>${patient.patientAge}</td>
					<td>${patient.patientEmail}</td>
					<td>${patient.patientPhone}</td>
				</tr>
				`;
				tbody.innerHTML += row
			})

		})()
	} catch (error) {
		console.error("Failed to fetch patient", error);
		alert('something went wrong')

	}

}

export function searchById() {
	const container = document.getElementById("form-container");
	container.innerHTML = `
        <h3>Search Patient</h3>
		<form>
        <input type="number" id="searchId" placeholder="Enter ID">
        <button id="searchBtn">Search</button>
		</form>
        <div id="searchResult"></div>
    `;

	let form = document.querySelector("form")
	let resultDiv = document.querySelector("#searchResult");

	let handleSubmit = (e) => {
		e.preventDefault()
		let id = document.getElementById("searchId").value
		try {
			(async () => {
				let response = await fetch(`http://localhost:8080/api/patients/fetchPatientById?patientId=${id}`)
				if (!response.ok) {
					throw new Error("Patient not found");
				}
				let data = await response.json()

				resultDiv.innerHTML = `
				
                <p><strong>Id:</strong> ${data.patientId}</p>
                <p><strong>Name:</strong> ${data.patientName}</p>
                <p><strong>Gender:</strong> ${data.patientGender}</p>
                <p><strong>Age:</strong> ${data.patientAge}</p>
                <p><strong>Email:</strong> ${data.patientEmail}</p>
                <p><strong>Phone:</strong> ${data.patientPhone}</p>
            `;
			})()
		} catch (error) {
			console.error("Error "+error);
			alert('patient not found')
		}

	}
	form.addEventListener("submit", handleSubmit)
}


export function updatePatient() {
	const container = document.getElementById("form-container");
	container.innerHTML = `
		<h3>Update Patient</h3>
		<form id="updateForm">
			<input type="number" name="patientId" placeholder="Patient ID" required>
			<input type="text" name="patientName" placeholder="Name">
			<input type="text" name="patientGender" placeholder="Gender">
			<input type="number" name="patientAge" placeholder="Age">
			<input type="email" name="patientEmail" placeholder="Email">
			<input type="text" name="patientPhone" placeholder="Phone">
			<button type="submit">Update</button>
		</form>
	`;

	let form = document.querySelector("form")
	let handleSubmit = (e) => {
		e.preventDefault()
		let inputs = document.querySelectorAll("input")

		let updatedPatient = {}
		inputs.forEach((input) => {
			updatedPatient[input.name] = input.value
		})

		let oldPatientId = updatedPatient.patientId;

		try {
			(async () => {

				let response = await fetch(`http://localhost:8080/api/patients/updatePatientById?oldPatientId=${oldPatientId}`, {
					method: 'PUT',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedPatient)
				})
				if (!response.ok) {
					alert("failed to update patient")
					throw new Error("Failed to update patient")
				}
				let data = await response.json()
				alert('Patient updated successfully');
			})()

		} catch (error) {
			console.error("update error", error)
			alert('Error updating patient')
		}

	}
	form.addEventListener("submit", handleSubmit)
}

export function deletePatient() {
	const container = document.getElementById("form-container");
	container.innerHTML = `
		<h3>Delete Patient</h3>
		<form>
		<input type="number" id="deleteId" placeholder="Enter ID">
		<button id="deleteBtn">Delete</button>
		</form>
	`;

	let form = document.querySelector("form")
	let handleSubmit = (e) => {
		e.preventDefault()
		let patientId = document.getElementById("deleteId").value;

		try {
			(async () => {
				let response = await fetch(`http://localhost:8080/api/patients/deletePatientById?patientId=${patientId}`, {
					method: "DELETE"
				})
				if (!response.ok) {
					throw new Error("Failed to delete patient");
				}
				alert("Patient deleted successfully");
			})()
		} catch (error) {
			console.error("Delete error", error);
			alert("Error deleting patient.");
		}
	}
	form.addEventListener("submit", handleSubmit)
}

