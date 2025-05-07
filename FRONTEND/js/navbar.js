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
	const role = sessionStorage.getItem("role")
	let links = `<li><a href="home">Home</a></li>
	                <li><a href="about" >About</a></li>
	                <li><a href="#" >Contact</a></li>`
	if(token){
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
		links +=`<li><a href="login" >Login</a></li>`
	}
	else{
		links +=`<li><a href="login" >Login</a></li>
				<li><a href="#" >Signup</a></li>`
	}
	return `<nav id ="navbar"><ul>${links}</ul></nav>`
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
}