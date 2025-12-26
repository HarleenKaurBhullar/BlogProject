import { useNavigate,Link } from "react-router-dom";

const Menu = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  

  return (
    <div style={styles.menu}>
      <Link to='/MyBlogs' style={styles.item} onClick={onClose}>My Blogs</Link>
      <Link to='/' style={styles.item} onClick={onClose}>Home</Link>
      <div style={styles.item} onClick={handleLogout}>Log Out</div>
      
    </div>
  );
};

const styles = {
  menu: {
    position: "absolute",
    top: "55px", 
    right: "10px",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "10px",
    width: "120px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    cursor: "pointer",
    color:"black"
  },
  item: {
    padding: "8px",
    borderRadius: "4px",
    display: "block",
  }
};

export default Menu;
