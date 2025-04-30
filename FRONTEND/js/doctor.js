/**
 * 
 */

// doctor.js

let doctor=()=> {
	setTimeout(()=>{
		bindingAllButton();
	})
    
    return `
        <h2>Doctor Management</h2>
        <div id="doctor-action-container">
		<button data-action="add">Add Doctor</button>
		<button data-action="view">View Doctors</button>
		<button data-action="search">Search Doctor</button>
		<button data-action="update">Update Doctor</button>
		<button data-action="delete">Delete Doctor</button>
        </div>
        <div id="doctor-form-container"></div>
    `;

  
}
export default doctor;

export function bindingAllButton() {
	const allButton = document.querySelectorAll("button[data-action]");

	let pageReloader = {
			"add": addDoctorForm,
			"view": viewDoctors,
			"search": searchById,
			"update": updateDoctor,
			"delete": deleteDoctor
		}
	const handleClick = (e) => {
		const action = e.target.getAttribute("data-action");
		if (action && pageReloader[action]) {
			pageReloader[action]();
		}
	};

	allButton.forEach((btn) => {
		btn.addEventListener("click", handleClick);
	});
}


// Add Doctor
function addDoctorForm() {
    const container = document.getElementById("doctor-form-container");
    container.innerHTML = `
        <h3>Add Doctor</h3>
        <form id="addDoctorForm">
            <input type="text" name="doctorName" placeholder="Name" required>
            <input type="text" name="doctorSpecialization" placeholder="Specialization" required>
            <input type="text" name="doctorEmail" placeholder="Email" required>
            <input type="text" name="doctorPhone" placeholder="Phone" required>
            <button type="submit">Add</button>
        </form>
    `;

    document.getElementById("addDoctorForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newDoctor = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("http://localhost:8080/api/doctors/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDoctor),
            });
            const result = await response.json();
            alert("Doctor added!");
        } catch (err) {
            console.error("Add doctor failed", err);
        }
    });
}

// View All Doctors
async function viewDoctors() {
    const container = document.getElementById("doctor-form-container");
    container.innerHTML = "<h3>All Doctors</h3>";

    try {
        const res = await fetch("http://localhost:8080/api/doctors/fetchAll");
        const doctors = await res.json();
        if (doctors.length === 0) {
            container.innerHTML += "<p>No doctors found.</p>";
            return;
        }

        const list = doctors.map(doc => `
            <div>
				<p><strong>Id:</strong> ${doc.doctorId}</p>
                <p><strong>Name:</strong> ${doc.doctorName}</p>
                <p><strong>Specialization:</strong> ${doc.doctorSpecialization}</p>
                <p><strong>Email:</strong> ${doc.doctorEmail}</p>
                <p><strong>Phone:</strong> ${doc.doctorPhone}</p>
                <hr>
            </div>
        `).join("");

        container.innerHTML += list;
    } catch (err) {
        console.error("Failed to fetch doctors", err);
    }
}

// Search Doctor
function searchById() {
    const container = document.getElementById("doctor-form-container");
    container.innerHTML = `
        <h3>Search Doctor</h3>
        <form id="searchDoctorForm">
            <input type="number" id="searchDoctorId" placeholder="Doctor ID" required>
            <button type="submit">Search</button>
        </form>
        <div id="doctorSearchResult"></div>
    `;

    document.getElementById("searchDoctorForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const doctorId = document.getElementById("searchDoctorId").value;

        try {
            const res = await fetch(`http://localhost:8080/api/doctors/fetchDoctorById?doctorId=${doctorId}`);
            const doc = await res.json();

            document.getElementById("doctorSearchResult").innerHTML = `
                <p><strong>Name:</strong> ${doc.doctorName}</p>
                <p><strong>Specialization:</strong> ${doc.specialization}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Phone:</strong> ${doc.phone}</p>
            `;
        } catch (err) {
            document.getElementById("doctorSearchResult").innerText = "Doctor not found!";
        }
    });
}

// Update Doctor
function updateDoctor() {
    const container = document.getElementById("doctor-form-container");
    container.innerHTML = `
        <h3>Update Doctor</h3>
        <form id="updateDoctorForm">
            <input type="number" name="doctorId" placeholder="Doctor ID" required>
            <input type="text" name="doctorName" placeholder="Name">
            <input type="text" name="specialization" placeholder="Specialization">
            <input type="email" name="email" placeholder="Email">
            <input type="text" name="phone" placeholder="Phone">
            <button type="submit">Update</button>
        </form>
    `;

    document.getElementById("updateDoctorForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = formData.get("doctorId");
        formData.delete("doctorId");
        const updatedDoctor = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`http://localhost:8080/api/doctors/updateDoctorById?doctorId=${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedDoctor),
            });
            const data = await res.json();
            alert("Doctor updated successfully");
        } catch (err) {
            console.error("Update failed", err);
        }
    });
}

// Delete Doctor
function deleteDoctor() {
    const container = document.getElementById("doctor-form-container");
    container.innerHTML = `
        <h3>Delete Doctor</h3>
        <form id="deleteDoctorForm">
            <input type="number" id="deleteDoctorId" placeholder="Doctor ID" required>
            <button type="submit">Delete</button>
        </form>
    `;

    document.getElementById("deleteDoctorForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("deleteDoctorId").value;

        try {
            await fetch(`http://localhost:8080/api/doctors/deleteDoctorById?doctorId=${id}`, {
                method: "DELETE",
            });
            alert("Doctor deleted successfully");
        } catch (err) {
            console.error("Delete failed", err);
        }
    });
}
