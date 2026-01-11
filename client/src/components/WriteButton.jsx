import { useNavigate } from "react-router-dom";
import './WriteButton.css';
import { useEffect } from "react";

const WriteButton = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    const handlenav = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/MakeBlog');
        }
    }

    return (
        <div>
            <button className="write-button" onClick={handlenav}>
                Start Writing
            </button>
        </div>
    );
}

export default WriteButton;
