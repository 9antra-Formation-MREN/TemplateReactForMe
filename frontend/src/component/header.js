import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../component/AuthContext';
import userIcon from '../img/section/usericon.png';
import notifIcon from '../img/section/notif.png';
import userImage from '../img/section/user1.jpeg'; // Import the user's image
import { User, Settings, List, HelpCircle, LogOut, Search } from 'react-feather';
import SearchBar from './searchbar';
import './header.css'; // Import your CSS file

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    const toggleNotifDropdown = () => {
        setShowNotifDropdown(!showNotifDropdown);
    };

    return (
        <div className="header-area header-transparent">
            <div className="main-header">
                <div className={`header-bottom sticky-bar ${scrolled ? 'scrolled' : ''}`}>
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-2">
                                <div className="logo ">
                                    <Link to="/"></Link>
                                </div>
                            </div>
                            <div className="col-xl-10 col-lg-10">
                                <div className="menu-wrapper d-flex align-items-center justify-content-end">
                                    <div className="main-menu d-none d-lg-block">
                                        <nav>
                                            <ul id="navigation">
                                                <li className="active onlythem"><Link to="/">Home</Link></li>
                                                <li className="onlythem"><Link to="/courses">Courses</Link></li>
                                                <li className="onlythem"><Link to="/training-centers">Training Centers</Link></li>
                                                <li className="onlythem"><Link to="/events">Events</Link></li>
                                                <li className="onlythem"><Link to="/about">About</Link></li>
                                                <li className="onlythem"><Link to="/contact">Contact</Link></li>
                                                {isAuthenticated ? (
                                                    <>
                                                        <li className="header-icon">
                                                            <img
                                                                src={notifIcon}
                                                                alt="Notifications"
                                                                className="notif-icon small-screen-blue"
                                                                onClick={toggleNotifDropdown}
                                                            />
                                                            {showNotifDropdown && (
                                                                <div className="notif-dropdown">
                                                                    <p className="notif-message">There are no notifications for now</p>
                                                                </div>
                                                            )}
                                                        </li>
                                                        <li className="header-icon profile-dropdown">
                                                            <img src={userIcon} alt="User Icon" className="profile-pic small-screen-blue" />
                                                            <div className="dropdown-content">
                                                                <div className="dropdown-header">
                                                                    <img src={userImage} alt="User" className="dropdown-user-image" />
                                                                    <p className="user-name mt-3">Emna Ghannouchy</p>
                                                                </div>
                                                                <Link to="/userprofile"><User size={16} color="black" /> View profile</Link>
                                                                <Link to="/mylist"><List size={16} color="black" /> Mylist</Link>
                                                                <Link to="/support"><HelpCircle size={16} color="black" /> Support</Link>
                                                                <Link to="/" onClick={logout}><LogOut size={16} color="black" /> Log out</Link>
                                                            </div>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <li className="bouton-header margin-left"><Link to="/centeradd" className="btn">Add your course</Link></li>
                                                        <li className="bouton-header"><Link to="/signup" className="btn-btn3">Sign up</Link></li>
                                                    </>
                                                )}
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="burger-menu d-lg-none d-flex align-items-center">
                                        <Search size={50} className="search-iconSS d-lg-none" onClick={toggleSearchBar} />
                                        <button className="burger-icon" onClick={toggleMenu}>
                                            <i className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {menuOpen && (
                                <div className="mobile_menu d-lg-none">
                                    <nav>
                                        <ul>
                                            <li className="active"><Link to="/" onClick={toggleMenu}>Home</Link></li>
                                            <li><Link to="/courses" onClick={toggleMenu}>Courses</Link></li>
                                            <li><Link to="/training-centers" onClick={toggleMenu}>Training Centers</Link></li>
                                            <li><Link to="/events" onClick={toggleMenu}>Events</Link></li>
                                            <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
                                            <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                                            {isAuthenticated ? (
                                                <>
                                                    <li className="header-icon profile-dropdown">
                                                        <img src={userIcon} alt="User Icon" className="profile-pic small-screen-blue" />
                                                        <div className="dropdown-content">
                                                            <div className="dropdown-header">
                                                                <img src={userImage} alt="User" className="dropdown-user-image" />
                                                                <p className="user-name">Emna Ghannouchy</p>
                                                            </div>
                                                            <Link to="/profile"><User size={16} color="black" /> View profile</Link>
                                                            <Link to="/settings"><Settings size={16} color="black" /> Settings</Link>
                                                            <Link to="/mylist"><List size={16} color="black" /> Mylist</Link>
                                                            <Link to="/support"><HelpCircle size={16} color="black" /> Support</Link>
                                                            <Link to="/" onClick={logout}><LogOut size={16} color="black" /> Log out</Link>
                                                        </div>
                                                    </li>
                                                    <li className="header-icon">
                                                        <img src={notifIcon} alt="Notifications" className="notif-icon small-screen-blue" onClick={toggleNotifDropdown} />
                                                        {showNotifDropdown && (
                                                            <div className="notif-dropdown">
                                                                <p className="notif-message">There are no notifications for now</p>
                                                            </div>
                                                        )}
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li className="bouton-header-mobile mt-5 mb-5"><Link to="/centeradd" className="bouton-mobile1" onClick={toggleMenu}>Add your course</Link></li>
                                                    <li className="bouton-header-mobile2"><Link to="/signup" className="btn-mobile2" onClick={toggleMenu}>Sign up</Link></li>
                                                </>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showSearchBar && <SearchBar showInputs={showSearchBar} setShowInputs={setShowSearchBar} />}
        </div>
    );
};

export default Header;
