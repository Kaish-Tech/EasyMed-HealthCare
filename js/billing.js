let billing = ()=>{
    setTimeout(() => {
		bindingAllButton()
	})
    return `
        <h2>Billing Module</h2>
		<div id="action-container">
        <button data-action="add">Add Bill</button>
        <button data-action="view">View Bill</button>
        <button data-action="search">Search Bill</button>
        <button data-action="update">Update Bill</button>
        <button data-action="delete">Delete Bill</button>
		</div>
        <div id="form-container"></div>
    `
}
let bindingAllButton = (e) => {
    let allButton = document.querySelectorAll("button[data-action]");

    let pageReloader = {
        "add": addBillingForm,
        "view": viewBills,
        "search": searchById,
        "update": updateBill,
        "delete": deleteBill
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
export default billing

function addBillingForm(){
    const container = document.getElementById("form-container");
	container.innerHTML = `
        <h3>Add New Bill</h3>
       <form >
            <input type="number" name="patient_id" placeholder="Patient ID" required />
            <input type="number" name="appointment_id" placeholder="Appointment ID" />
            <input type="date" name="billDate" required />
            <input type="number" name="amount" placeholder="Amount" required />
            <input type="text" name="paymentStatus" placeholder="Payment Status (e.g., Paid)" required />
            <input type="text" name="paymentMethod" placeholder="Payment Method (e.g., UPI, Card)" required />
            <button type="submit">Submit</button>
        </form>
    `;
    const form = document.querySelector("form")
	const inputs = document.querySelectorAll("input");
	let handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {};
		inputs.forEach(inp => {
			payload[inp.name] = inp.value;
		});
		const finalPayload = {
    		billDate: payload.billDate,
    		amount: parseFloat(payload.amount),
    		paymentStatus: payload.paymentStatus,
    		paymentMethod: payload.paymentMethod,
    		patient: {
    			patientId: parseInt(payload.patient_id)
    		},
    		appointment: payload.appointment_id
        		? { appointmentId: parseInt(payload.appointment_id) }
        		: {appointmentId:null}
			};

		try {
			let res = await fetch("http://localhost:8080/api/bills/save", {
				method: "POST",
				body: JSON.stringify(finalPayload),
				headers: {
					"Content-Type": "application/json"
				}
			})
			let data = await res.json();
			console.log(data);
			
			alert("Bill Added Successfully")

		} catch (error) {
			console.error("Error:", error);
			alert("Error while adding patient")
		}
	}
	form.addEventListener("submit", handleSubmit)
}

function viewBills(){
	const container = document.getElementById("form-container");
	container.innerHTML = `
	<h3>All Bills</h3>
	<table id="billsTable">
		<thead>
        	<tr>
         		<th>ID</th>
				<th>Amount</th>
				<th>Bill Date</th>
				<th>Payment Method</th>
				<th>Payment Status</th>
				<th>Appointment Id</th>
				<th>Patient Id</th>
        	</tr>
		</thead>
		<tbody id="tableBody"></tbody>
	</table>`;

	try {
		(async () => {
			const response = await fetch("http://localhost:8080/api/bills/fetchAll")
			let data = await response.json()

			const tbody = document.querySelector("#tableBody")
			tbody.innerHTML = "";
			data.forEach(bill => {
				let row = `
				<tr>
					<td>${bill.billId}</td>
					<td>${bill.amount}</td>
					<td>${bill.billDate}</td>
					<td>${bill.paymentMethod}</td>
					<td>${bill.paymentStatus}</td>
					<td>${bill.patient.patientId}</td>
					<td>${bill.appointment.appointmentId}</td>
				</tr>
				`;
				tbody.innerHTML += row
			})

		})()
	} catch (error) {
		console.error("Failed to fetch Bills", error);
		alert('something went wrong')

	}
}

function searchById() {
	const container = document.getElementById("form-container");
	container.innerHTML = `
        <h3>Search Bill</h3>
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
				let response = await fetch(`http://localhost:8080/api/bills/fetchBillById?billId=${id}`)
				if (!response.ok) {
					throw new Error("Bill not found");
				}
				let data = await response.json()

				resultDiv.innerHTML = `
				
                <p><strong>Id:</strong> ${data.billId}</p>
                <p><strong>Amount:</strong> ${data.amount}</p>
                <p><strong>Bill Date:</strong> ${data.billDate}</p>
                <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
                <p><strong>Payment Status:</strong> ${data.paymentStatus}</p>
                <p><strong>Patient ID:</strong> ${data.patient.patientId}</p>
                <p><strong>Appoinment ID:</strong> ${data.appointment.appointmentId}</p>
            `;
			})()
		} catch (error) {
			console.error("Error "+error);
			alert('Bill not found')
		}

	}
	form.addEventListener("submit", handleSubmit)
}

function updateBill() {
	const container = document.getElementById("form-container");
	container.innerHTML = `
		<h3>Update Bill</h3>
		<form >
			<input type="number" name="billId" placeholder="Bill ID" required />
            <input type="number" name="patient_id" placeholder="Patient ID" required />
            <input type="number" name="appointment_id" placeholder="Appointment ID" />
            <input type="date" name="billDate" required />
            <input type="number" name="amount" placeholder="Amount" required />
            <input type="text" name="paymentStatus" placeholder="Payment Status (e.g., Paid)" required />
            <input type="text" name="paymentMethod" placeholder="Payment Method (e.g., UPI, Card)" required />
            <button type="submit">Submit</button>
        </form>
	`;

	let form = document.querySelector("form")
	let handleSubmit = (e) => {
		e.preventDefault()
		let inputs = document.querySelectorAll("input")

		let updatedBill = {}
		inputs.forEach((input) => {
			updatedBill[input.name] = input.value
		})
		const finalPayload = {
			billId:updatedBill.billId,
    		billDate: updatedBill.billDate,
    		amount: parseFloat(updatedBill.amount),
    		paymentStatus: updatedBill.paymentStatus,
    		paymentMethod: updatedBill.paymentMethod,
    		patient: {
    			patientId: parseInt(updatedBill.patient_id)
    		},
    		appointment: updatedBill.appointment_id
        		? { appointmentId: parseInt(updatedBill.appointment_id) }
        		: {appointmentId:null}
			};


		let billId = updatedBill.billId;
		console.log(billId);
		console.log(updatedBill);
		
		
		try {
			(async () => {

				let response = await fetch(`http://localhost:8080/api/bills/updateBillById?billId=${billId}`, {
					method: 'PUT',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(finalPayload)
				})
				if (!response.ok) {
					alert("failed to update patient")
					throw new Error("Failed to update bill")
				}
				let data = await response.json()
				alert('Bill updated successfully');
			})()

		} catch (error) {
			console.error("update error", error)
			alert('Error updating Bill')
		}

	}
	form.addEventListener("submit", handleSubmit)
}

function deleteBill() {
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
		let billId = document.getElementById("deleteId").value;

		try {
			(async () => {
				let response = await fetch(`http://localhost:8080/api/bills/deleteBillById?billId=${billId}`, {
					method: "DELETE"
				})
				if (!response.ok) {
					throw new Error("Failed to delete Bill");
				}
				alert("Bill deleted successfully");
			})()
		} catch (error) {
			console.error("Delete error", error);
			alert("Error deleting Bill.");
		}
	}
	form.addEventListener("submit", handleSubmit)
}
