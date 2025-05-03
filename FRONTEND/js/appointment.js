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
        // "search": searchById,
        // "update": updateAppointment,
        // "delete": deleteAppointment
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

export function viewAppointments() {
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