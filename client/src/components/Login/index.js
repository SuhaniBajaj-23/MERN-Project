import './index.css';
import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from "axios";

const Signup = () =>{
    const [data,setData] =useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [error,setError] =useState("");
    // const navigate = useNavigate();

    const handleChange =({currentTarget: input}) =>{
        setData({...data,[input.name]:input.value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const {data: res} = await axios.post(url,data);
            // navigate("/login");
            window.location="/main"
            console.log(res.message);
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
        <div className='signup_container'>
            <div className='signup_for_container'>
                <div className='left'>
                    <h1>Welcome Back</h1>
                    <Link to="/signup">
                        <button type='button' className='white_btn'>
                            Sign Up
                        </button>
                    </Link>
                </div>
                <div className='right'>
                    <form className='form_container' on onSubmit={handleSubmit}>
                    <h1>Login to your account</h1>
                        <input type="email" placeholder='Email' name='email' required value={data.email} className='input' onChange={handleChange}/>
                        <input type="password]" placeholder='Password' name='password' required value={data.password} className='input' onChange={handleChange}/>
                        {error && <div className='error_msg'>
                            {error}
                        </div>}
                        <button type='submit' className='green_btn'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;