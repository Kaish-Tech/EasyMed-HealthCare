import home from "./home.js";

let login = () => {
    setTimeout(()=>{
        bindLoginForm()
    })
    return `
    <div class="form-box">
        <div class="form-container">
            <h2>Login</h2>
            <form class="login-form">
                <div class="form-control">
                    <input type="text" placeholder="Phone number,username or email" name="email">
                    <input type="password" placeholder="Password" name="password">
                    <button type ="submit">Submit</button>
                </div>
            </form>
            <h4>Not Register? <a href="#">Sign up</a></h4>
        </div>
    </div>
    `
}
export default login;

export function bindLoginForm(){

    let allInput = document.querySelectorAll(".form-control input")
    let form = document.querySelector(".login-form")
    
    let handleSubmit=(e)=>{

        e.preventDefault()
        let loginDetails = {}
        allInput.forEach((inp)=>{
            loginDetails[inp.name]=inp.value
        })
        try {
            (async () => {
                const res= await fetch("http://localhost:8080/auth/login",{
                    method:"POST",
                    body:JSON.stringify(loginDetails),
                    headers:{"Content-Type": "application/json"}
                })
                const data = await res.json()
                console.log(data)
                if(data.token){
                    alert(`${data.message}`)
                    const sessionUser = {
                        userId:data.user.userId,
                        name:data.user.name,
                        email:data.user.email,
                        role:data.user.role
                    }
                    window.sessionStorage.setItem("token",`${data.token}`) 
                    window.sessionStorage.setItem("user",JSON.stringify(sessionUser));
                    window.history.pushState(null,"","/home")
                    root.innerHTML = home()
                    }
                else{
                    alert(`Invalid`)
                }

            })()
        } catch (error) {
            console.error("Error : "+error)
        }
    }
    
    form.addEventListener("submit",handleSubmit)
}