import SignUp from "../screens/SignUp.jsx";
import Login from "../screens/Login.jsx";

const backendDomin = "http://localhost:4002"

const SummaryApi = {
    SignUp : {
        url : `${backendDomin}/api/v1/users`,
        method : "post"
    },
    Login : {
        url : `${backendDomin}/api/v1/login`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/v1/profile`,
        method : "get"
    },
    
}


export default SummaryApi