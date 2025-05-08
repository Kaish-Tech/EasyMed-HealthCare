import home from "./home.js"
import about from "./about.js"
import patient from "./patient.js"
import doctor from "./doctor.js"
import billing from "./billing.js"
import appointment from "./appointment.js"
import signup from "./signup.js"
import login from "./login.js"

const navbar=()=>{
	const token = sessionStorage.getItem("token")
	const userData = JSON.parse(sessionStorage.getItem("user"))
	

	let links = `<li><a href="home">Home</a></li>
	                <li><a href="about" >About</a></li>
	                <li><a href="#" >Contact</a></li>`
	if(token){
		const role = userData.role
		if(role=== "ADMIN"){
			links +=`<li><a href="patient" >Patient</a></li>
	                <li><a href="doctor" >Doctor</a></li>
	                <li><a href="appointment" >Appointment</a></li>
	                <li><a href="billing" >Billing</a></li>`
		}
		else if(role === "DOCTOR"){
			links +=`<li><a href="#" >Appointment</a></li>`
		}
		else if(role === "PATIENT"){
			links +=`<li><a href="appointment" >Appointment</a></li>
	                <li><a href="billing" >Billing</a></li>`
		}
		else if(role === "STAFF"){
			links +=`<li><a href="billing" >Billing</a></li>`
		}
	}
	else{
		links +=`<li><a href="login" >Login</a></li>
				<li><a href="#" >Signup</a></li>`
	}
	let profileSection=``
	if(token && userData){
		const initial = userData.name.charAt(0).toUpperCase()
		profileSection = `
		<div class="profile-container">
            <div class="profile-icon">${initial}</div>
            <div class="profile-dropdown hidden">
				<p><strong>ID:</strong> ${userData.userId}</p>
                <p><strong>Name:</strong> ${userData.name}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
                <p><strong>Role:</strong> ${userData.role}</p>
            </div>
        </div>
		`
	}
	return `<div class ="nav-container">
	<div class="logo">
	<h1>EasyMed</h1>
	</div>
	<div id="navbar"><ul>${links}</ul></div>
	${profileSection}
	
	</div>`
}

export default navbar

export let bindingAllAnchor=()=>{
	let allAnchor = document.querySelectorAll("#navbar a")
	console.log(allAnchor);
	
	let container = document.querySelector("#container")
	let pageReloader={
		"/home":home,
		"/about":about,
		"/patient":patient,
		"/doctor":doctor,
		"/billing":billing,
		"/appointment":appointment,
		"/signup":signup,
		"/login":login
	}
	let handleClick = (e)=> {
		e.preventDefault()
		history.pushState(null,"",`${e.target.pathname}`)
		let page  = window.location.pathname
		page = page.replace("/html","")
		if(page == "/home" || page =="/index.html"){
			root.innerHTML=pageReloader["/home"]()
		}
		else{
			container.innerHTML = pageReloader[page]()
		}
	}
	
	allAnchor.forEach((a)=>{
		a.addEventListener('click',handleClick)
	})


	const profileIcon = document.querySelector(".profile-icon")
    const profileDropdown = document.querySelector(".profile-dropdown")
    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener("click", () => {
            profileDropdown.classList.toggle("hidden")
        })
    }
}