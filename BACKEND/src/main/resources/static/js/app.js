/**
 * 
 */
// app.js

// Entry Point: Render Navbar and Default Home Page
/*window.onload = () => {
    renderNavbar();
    renderHome(); // Default page
};*/
import home from "./home.js"
let root = document.getElementById("root")

root.innerHTML=home()
