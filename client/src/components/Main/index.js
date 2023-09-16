import "./index.css"

const Main=()=>{

    const handleLogout = () =>{
        localStorage.removeItem("token");
        window.location="/login";
    }

    return (
        <div className="main_container">
            <nav className="navbar">
                <h1>Welcome</h1>
                <button className="white_btn" on onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    );
}

export default Main;