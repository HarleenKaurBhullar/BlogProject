import WriteBlog from "../components/WriteBlog";
import Login from "./Login.jsx"
import Register from "./Register.jsx";
import NavBar from "../components/NavBar.jsx";
import WriteButton from "../components/WriteButton.jsx";
import BlogComponent from "../components/DisplayComponent.jsx"; 
import Menu from "../components/Menu.jsx"
const Homepage=()=>{
    return <div>
        <NavBar></NavBar>
        <BlogComponent></BlogComponent>
        <WriteButton></WriteButton>
    </div>
}

export default Homepage;
