import './index.css';
import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from "axios";

const Signup = () =>{
    // const navigate = useNavigate();
    const [data,setData] =useState({
        email: "",
        password: ""
    });

    const [error,setError] =useState("");

    const handleChange =({currentTarget: input}) =>{
        setData({...data,[input.name]:input.value});
    }

    const handleSubmit = async(e) =>{
        
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const {data: res} = await axios.post(url,data);
            localStorage.setItem("token",res.data);
            window.location="/login";
            // navigate("/login");
            // window.location="/"
        } catch (error) {
            if(error.response && 
                error.response.status>=400 &&
                error.response.status<=500
                ){
                    setError(error.response.data.message);
                }
        }
    }

    return(
        <div className='login_container'>
            <div className='login_for_container'>
                <div className='left'>
                <form className='form_container' on onSubmit={handleSubmit}>
                {/* <h1>Login to your Account</h1>  */}
                        <input type="text" placeholder='First Name' name='firstName' required value={data.firstName} className='input' onChange={handleChange}/>
                        <input type="text" placeholder='Last Name' name='lastName' required value={data.lastName} className='input' onChange={handleChange}/>
                        <input type="email" placeholder='Email' name='email' required value={data.email} className='input' onChange={handleChange}/>
                        <input type="password]" placeholder='Password' name='password' required value={data.password} className='input' onChange={handleChange}/>
                        {error && <div className='error_msg'>
                            {error}
                        </div>}
                        <button type='submit' className='green_btn'>Sign </button>
                    </form>
                </div>
                <div className='right'>
                <h1>Already have an account</h1>
                    <Link to="/login">
                        <button type='button' className='white_btn'>
                            Sign In
                        </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default Signup;