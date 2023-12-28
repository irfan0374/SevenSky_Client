import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../Redux/Slice/userSlice';
import { findUser } from '../../Api/userApi';

const Navbar = () => {
  const [color, setColor] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 723); // Set to the breakpoint you want

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  const handleScroll = () => {
    if (window.scrollY >= 90) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 723); // Set to the breakpoint you want
  };

  useEffect(() => {
    window.addEventListener('scroll', changeColor);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', changeColor);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const { user } = useSelector((state) => state.userReducer)

  useEffect(() => {
    if (user) {
      findUser(user?._id)
        .then((res) => {
          setUserData(res?.data?.User);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [user]);

  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    dispatch(userLogout());
    navigate('/login');
  };

  return (
    <>
   
 <nav
 className={`${isSticky
   ? 'bg-white fixed top-0 left-0 w-full shadow-md z-1000 transition duration-500 ease-in-out'
   : color
   ? 'bg-gray-200 w-full fixed top-0 start-0 z-1000 transition duration-500 ease-in-out'
   : 'bg-opacity-95 w-full fixed top-0 start-0 z-1000 transition duration-500 ease-in-out'
 }`}
>
        <div className="flex items-center justify-between mx-auto  p-2">
          <Link to={'/'}>
          <div className="flex-none">
            <img src="/public/Seven_Sky.png" className="h-16 w-auto" alt="sevenSky Logo" />
          </div>
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x mx-3">


            <div className={`flex space-x-3 md:space-x-0 mx-5`}>
              <Link to={'/partner/'}>
                <button className={`border hover:border-black rounded-xl mediumSm:px-1 ultraSm:py- md:py-3 md:px-2 ${isSmallScreen ? "hidden" : ""}`}>List Your Property</button>
              </Link>
            </div>

            {userData?.subscription?.planType ? (
              <div className="mx-9">
                <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} data-name="Layer 2" viewBox="0 0 302.17 302.17" id="crown">
                  <g data-name="Layer 1">
                    <rect width="302.17" height="302.17" fill="none"></rect>
                    <path fill="#ff6f00" d="M215.94 124.69c-7.34-3.85-15.88-6.25-25.37-7.14-6.1-.57-11.77-.44-16.5-.06l1.58 3.69 17.07 39.83 34.57-23.05 3.17-2.11c-4.12-4.52-8.98-8.25-14.51-11.16zM111.61 117.55c-9.5.89-18.04 3.29-25.37 7.14-5.54 2.91-10.39 6.64-14.51 11.16l3.17 2.11 34.57 23.05 17.07-39.83 1.58-3.69c-4.72-.38-10.4-.51-16.5.06z"></path>
                    <path fill="#ffca28" d="M274.64,107.96c-.64-.51-1.54-.54-2.22-.09l-41.96,27.98-3.17,2.11-34.57,23.05-17.07-39.83-1.58-3.69-21.25-49.58c-.3-.69-.98-1.14-1.74-1.14s-1.44,.45-1.74,1.14l-21.25,49.58-1.58,3.69-17.07,39.83-34.57-23.05-3.17-2.11-41.96-27.98c-.68-.45-1.57-.42-2.22,.09-.64,.51-.89,1.37-.6,2.13l36.63,99.9c1.08-.29,2.22-.45,3.39-.45H235.22c1.17,0,2.31,.16,3.39,.45l36.63-99.9c.28-.77,.04-1.63-.6-2.13Z"></path>
                    <path fill="#ffa000" d="M238.61,209.99c-1.08-.29-2.22-.45-3.39-.45H66.95c-1.17,0-2.31,.16-3.39,.45-5.5,1.49-9.55,6.52-9.55,12.48,0,7.13,5.8,12.94,12.94,12.94H235.22c7.13,0,12.94-5.8,12.94-12.94,0-5.96-4.05-10.99-9.55-12.48Z"></path>
                  </g>
                </svg>
              </div>
            ) : (
              <button
                className="bg-yellow-800 text-white border-yellow-400 border-b-4 font-medium overflow-hidden relative px-2 py-1 sm:px-4 sm:py-2 ultraSm:px- sm:py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group hover:text-gray-80"
                onClick={() => {
                  user ? navigate('/subscription') : document.getElementById('my_modal_3').showModal();
                }}
              >
                <span className="bg-yellow-400 shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-40 h-[3px] rounded-lg opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                {isSmallScreen ? "Premium" : "Get premium"}
              </button>

            )}
             {isSmallScreen && (
              <div className="dropdown">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <label htmlFor="my-drawer-4" tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </label>
                <div className="drawer-side z-auto">
                  <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                  <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
                    <li className='border border-black rounded-lg my-1 shadow-md'><Link to={'/'}>Home</Link></li>
                    <li className='border border-black rounded-lg my-1 shadow-md'><Link to={'/rent'}>Rent</Link></li>
                    <li className='border border-black rounded-lg my-1 shadow-md'><Link to={'/sale'}>sale</Link></li>
                    <li className='border border-black rounded-lg my-1 shadow-md'><Link to={'/about'}>About</Link></li>
                    <li className='border border-black rounded-lg my-1 shadow-md'><Link to={'/partner/'}>List your property</Link></li>
                    {user?(<>
                      <li className='border border-black rounded-lg my-1 shadow-md'><Link onClick={handleLogout}>Logout</Link></li>
                      <li className='border border-black rounded-lg my-1 shadow-md'><Link to={'/account'}>Profile</Link></li>
                    </>):( <li className='border border-black rounded-lg my-1 shadow-md'><Link to={'/login'}>Login</Link></li>)}
                                 
                  </ul>
                </div>
              </div>

            )}
            {isSmallScreen?(""):( 
                <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-32 mx-1">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.18007 15.2964C3.92249 16.0335 0.625213 17.5386 2.63348 19.422C3.6145 20.342 4.7071 21 6.08077 21H13.9192C15.2929 21 16.3855 20.342 17.3665 19.422C19.3748 17.5386 16.0775 16.0335 14.8199 15.2964C11.8709 13.5679 8.12906 13.5679 5.18007 15.2964Z" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z" stroke="#141B34" strokeWidth="1.5" />
                    <path d="M19.5 7.14286V8M19.5 7.14286C18.777 7.14286 18.14 6.76405 17.7664 6.18888M19.5 7.14286C20.223 7.14286 20.86 6.76405 21.2336 6.18888M19.5 2.85714C20.223 2.85714 20.8601 3.236 21.2336 3.81125M19.5 2.85714C18.777 2.85714 18.1399 3.236 17.7664 3.81125M19.5 2.85714V2M22 3.28571L21.2336 3.81125M17.0003 6.71429L17.7664 6.18888M17 3.28571L17.7664 3.81125M21.9997 6.71429L21.2336 6.18888M21.2336 3.81125C21.4545 4.15141 21.5833 4.56023 21.5833 5C21.5833 5.43982 21.4545 5.84869 21.2336 6.18888M17.7664 3.81125C17.5455 4.15141 17.4167 4.56023 17.4167 5C17.4167 5.43982 17.5455 5.84869 17.7664 6.18888" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>

                </div>
              </label>
              {user ? (
                <>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <Link to={'/account'}>
                        <a className="justify-between">
                          Profile
                        </a>
                      </Link>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                  </ul>
                </>) : (<>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to={'/login'}>Login</Link></li>
                  </ul>
                </>)}

            </div>)}

            

          </div>

          <div className={`items-center justify-between w-full md:flex md:w-auto  ${isSmallScreen ? 'hidden' : ''}`} id="navbar-sticky ">
            <ul className="flex  p-4 md:p-0 mt-4 font-medium  md:space-x-8  ">
              <li>
                <Link to={'/'} className=" py-2 px-6  text-gray-900   md:bg-transparent  md:p-0 " aria-current="page">Home</Link>
              </li>
              <li>
                <Link to={'/rent'} className=" py-2 px-6  text-gray-900   md:bg-transparent  md:p-0 ">Rent</Link>
              </li>
              <li>
                <Link to={"/sale"} className=" py-2 px-6  text-gray-900  md:bg-transparent  md:p-0 ">Sale</Link>
              </li>
              <li>
              <Link to={"/about"}  className=" py-2 px-6  text-gray-900 md:bg-transparent  md:p-0">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4 font-bold text-gray-600">🚀 Hold on! You've found the premium button! To unlock the awesomeness, you need to login first.</p>
          <div className='flex justify-center'>

            <Link to={"/login"}>  <button className='text-white bg-blue-600 rounded-lg p-3'>Login Now</button></Link>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
