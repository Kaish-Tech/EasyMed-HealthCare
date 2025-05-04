let appointment=()=>{

    setTimeout(() => {
		bindingAllButton()
	})
    return `
        <h2>Appointment Module</h2>
		<div id="action-container">
        <button data-action="add">Add Appointment</button>
        <button data-action="view">View Appointments</button>
        <button data-action="search">Search Appointment</button>
        <button data-action="update">Update Appointment</button>
        <button data-action="delete">Delete Appointment</button>
		</div>
        <div id="form-container"></div>
    `
}
export default appointment
let bindingAllButton = (e) => {
    let allButton = document.querySelectorAll("button[data-action]");

    let pageReloader = {
        "add": addAppointmentForm,
        "view": viewAppointments,
        "search": searchById,
        "update": updateAppointment,
        "delete": deleteAppointment
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

function addAppointmentForm() {
    const container = document.getElementById("form-container");
    container.innerHTML = `
        <h3>Add New Appointment</h3>
        <form id="addAppointmentForm">
            <input type="date" name="appointmentDate" placeholder="appointmentDate" required>
            <input type="time" name="appointmentTime" placeholder="appointmentTime" required>
            <input type="text" name="reason" placeholder="reason" required>

            <input type="number" name="doctorId" placeholder="Doctor ID" required>

            <input type="number" name="patientId" placeholder="Patient Id" required>

            <button type="submit">Add Appointment</button>
        </form>
    `;

    const form = document.querySelector("#addAppointmentForm")
	const inputs = document.querySelectorAll("input");
	let handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {};
		inputs.forEach(inp => {
			payload[inp.name] = inp.value;
		});
        const finalPayload={
            appointmentDate:payload.appointmentDate,
            appointmentTime:payload.appointmentTime,
            reason:payload.reason,
            doctor:{
                doctorId:parseInt(payload.doctorId)
            },
            patient:{
                patientId:parseInt(payload.patientId)
            }
        }
        try {
			let res = await fetch("http://localhost:8080/api/appointments/save", {
				method: "POST",
				body: JSON.stringify(finalPayload),
				headers: {
					"Content-Type": "application/json"
				}
			})
			let data = await res.json();
			alert("Appointment Added Successfully")

		} catch (error) {
			console.error("Error:", error);
			alert("Error while adding Appointment")
		}
	}
	form.addEventListener("submit", handleSubmit)
}

function viewAppointments() {
	const container = document.getElementById("form-container");
	container.innerHTML = `
	<h3>All Appointments</h3>
	<table id="appointmentsTable">
		<thead>
        	<tr>
         		<th>ID</th>
				<th>Appointment Date</th>
				<th>Appointment Time</th>
				<th>reason</th>
				<th>Doctor Id</th>
				<th>Patient Id</th>
        	</tr>
		</thead>
		<tbody id="tableBody"></tbody>
	</table>`;

	try {
		(async () => {
			const response = await fetch("http://localhost:8080/api/appointments/fetchAll")
			let data = await response.json()

			const tbody = document.querySelector("#tableBody")
			tbody.innerHTML = "";
			data.forEach(appointment => {
				let row = `
				<tr>
					<td>${appointment.appointmentId}</td>
					<td>${appointment.appointmentDate}</td>
					<td>${appointment.appointmentTime}</td>
					<td>${appointment.reason}</td>
					<td>${appointment.doctor.doctorId}</td>
					<td>${appointment.patient.patientId}</td>
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

function searchById() {
	const container = document.getElementById("form-container");
	container.innerHTML = `
        <h3>Search Appointment</h3>
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
				let response = await fetch(`http://localhost:8080/api/appointments/fetchAppointmentById?appointmentId=${id}`)
				if (!response.ok) {
					throw new Error("Patient not found");
				}
				let data = await response.json()

				resultDiv.innerHTML = `
				
                <p><strong>Id:</strong> ${data.appointmentId}</p>
                <p><strong>Appointment Date:</strong> ${data.appointmentDate}</p>
                <p><strong>Appointment Time:</strong> ${data.appointmentTime}</p>
                <p><strong>Reason:</strong> ${data.reason}</p>
                <p><strong>Patient Id:</strong> ${data.patient.patientId}</p>
                <p><strong>Doctor Id:</strong> ${data.doctor.doctorId}</p>
            `;
			})()
		} catch (error) {
			console.error("Error "+error);
			alert('appointment not found')
		}

	}
	form.addEventListener("submit", handleSubmit)
}

function updateAppointment() {
	const container = document.getElementById("form-container");
	container.innerHTML = `
		<h3>Update Appointment</h3>
		<form id="updateAppointmentForm">
			<input type="number" name="appointmentId" placeholder="Appointment ID" required>
            <input type="date" name="appointmentDate" placeholder="appointmentDate" required>
            <input type="time" name="appointmentTime" placeholder="appointmentTime" required>
            <input type="text" name="reason" placeholder="reason" required>

            <input type="number" name="doctorId" placeholder="Doctor ID" required>

            <input type="number" name="patientId" placeholder="Patient Id" required>

            <button type="submit">Add Appointment</button>
        </form>
	`;

	let form = document.querySelector("form")
	let handleSubmit = (e) => {
		e.preventDefault()
		let inputs = document.querySelectorAll("input")

		let payload = {}
		inputs.forEach((input) => {
			payload[input.name] = input.value
		})
		const updatedAppointment={
            appointmentDate:payload.appointmentDate,
            appointmentTime:payload.appointmentTime,
            reason:payload.reason,
            doctor:{
                doctorId:parseInt(payload.doctorId)
            },
            patient:{
                patientId:parseInt(payload.patientId)
            }
        }

		let oldAppointmentId = payload.appointmentId;

		try {
			(async () => {

				let response = await fetch(`http://localhost:8080/api/appointments/updateAppointmentById?oldAppointmentId=${oldAppointmentId}`, {
					method: 'PUT',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedAppointment)
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

export function deleteAppointment() {
	const container = document.getElementById("form-container");
	container.innerHTML = `
		<h3>Delete Appointment</h3>
		<form>
		<input type="number" id="deleteId" placeholder="Enter ID">
		<button id="deleteBtn">Delete</button>
		</form>
	`;

	let form = document.querySelector("form")
	let handleSubmit = (e) => {
		e.preventDefault()
		let appointmentId = document.getElementById("deleteId").value;

		try {
			(async () => {
				let response = await fetch(`http://localhost:8080/api/appointments/deleteAppointmentById?appointmentId=${appointmentId}`, {
					method: "DELETE"
				})
				if (!response.ok) {
					throw new Error("Failed to delete patient");
				}
				alert("Appointment deleted successfully");
			})()
		} catch (error) {
			console.error("Delete error", error);
			alert("Error deleting Appointment.");
		}
	}
	form.addEventListener("submit", handleSubmit)
}