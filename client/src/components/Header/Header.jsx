import React, {useState} from "react";
import {BiMenuAltRight} from 'react-icons/bi';
import {NavLink,Link} from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import useHeaderColor from "../../hooks/useHeaderColor";
import { useAuth0 } from "@auth0/auth0-react";
import './Header.css'
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";

const Header = () => {
    const [menuOpened, setMenuOpened]=useState(false);
    const [modalOpened, setModalOpened]=useState(false);
    const headerColor = useHeaderColor();
    const {loginWithRedirect, isAuthenticated, user, logout}=useAuth0();
    const {validateLogin}=useAuthCheck()
    const handleAddPropertyClick=()=>{
        if(validateLogin())
        {
            setModalOpened(true);
        }
    }
    const getMenuStyles = (menuOpened) => {
        if(document.documentElement.clientWidth <=800){
            return{right: !menuOpened && "-100%"}
        }
    }
    return(
        <section className="h-wrapper">
            <div className="flexCenter paddings innerWidth h-container">

                <Link to="/">
                    <img src="./logo.png" alt="logo" width={100} />
                </Link>

                <OutsideClickHandler
                onOutsideClick={()=>{
                    setMenuOpened(false)
                }}
                >
                <div className="flexCenter h-menu"
                style={getMenuStyles(menuOpened)}
                >
                    <NavLink to="/properties">Properties</NavLink>
                    <a href="mailto:test@gmail.com">Contact</a>

                    {/* Add Property */}
                    <div onClick={handleAddPropertyClick}> Add Property </div>
                    <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
                    {/* Login Button */}
                    {!isAuthenticated ? (
                        <button className="button" onClick={loginWithRedirect}>
                            Login
                        </button>
                    ) : (
                        <ProfileMenu user={user} logout={logout} />
            )       }
                    
                </div>
                </OutsideClickHandler>
                
                <div className="menu-icon" onClick={()=>setMenuOpened((prev)=>!prev)}>
                    <BiMenuAltRight size={30} />
                </div>
            </div>
           
        </section>
    )
}
export default Header