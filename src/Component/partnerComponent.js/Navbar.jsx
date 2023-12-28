
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { addProperty, findPartner } from '../../Api/partnerApi'
import { propertyValidationSchema } from '../../schema/Partnervalidation/PropertyValidation'
import { useSelector } from 'react-redux'
import AddPropertyModal from './AddPropertyModal'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { FaTimes } from 'react-icons/fa';
import { partnerLogout } from '../../Redux/Slice/partnerSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MdManageAccounts } from "react-icons/md";



const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 723); // Set to the breakpoint you want
  const partner = useSelector((state) => state.partnerReducer.partner)

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 723)
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }

  }, [])

  const [value, setValue] = useState("")
  const partnerId = partner._id
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    localStorage.removeItem("partnerToken")
    dispatch(partnerLogout())
    navigate('/partner/registration')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await findPartner();
        setValue(res.data.Partner);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();

  }, [value]);

  return (
    <>
      <div className="navbar bg-black">
        <div className="flex-1">
          <div className="flex-none">
            <img src="/public/Logo_White.png" className="h-16 w-auto" alt="sevenSky Logo" />
          </div>
        </div>
        <div className="flex-none space-x-6">
          <Link to={'/partner/buyerDetails'}>
            <div className='hidden lg:block'>
              <svg
                id="SvgjsSvg1012"
                width="30"
                height="40"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlnsSvgjs="http://svgjs.com/svgjs"
              >
                <defs id="SvgjsDefs1013"></defs>
                <g id="SvgjsG1014">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    x="0"
                    y="0"
                    enableBackground="new 0 0 16 16"
                    version="1.1"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                    width="30"
                    height="40"
                  >
                    <path
                      id="path7"
                      fill="#ffffff"
                      d="M3.754.5C2.787.5 2 1.287 2 2.254v10.992C2 14.213 2.787 15 3.754 15h7.992c.967 0 1.754-.787 1.754-1.754V4.771c0-.007-.007-.012-.008-.019a.246.246 0 0 0-.064-.158l-4-4a.244.244 0 0 0-.15-.067C9.252.52 9.232.5 9.206.5H3.754zm0 .5H9v2.281c0 .96.78 1.74 1.738 1.74H13v8.225c0 .691-.563 1.254-1.254 1.254H3.754A1.256 1.256 0 0 1 2.5 13.246V2.254C2.5 1.563 3.063 1 3.754 1Zm5.744.393H9.5c.77.766 2.314 2.3 3.145 3.128h-1.907c-.683 0-1.24-.557-1.24-1.24V1.393zm.434 8.533-1.56 1.515a.253.253 0 0 0 .001.364l1.56 1.476.344-.363-1.103-1.049h2.693v-.5H9.164l1.117-1.084-.35-.36Z"
                      className="color231f20 svgShape"
                    ></path>
                  </svg>
                </g>
              </svg>
            </div>
          </Link>

          <div className='hidden lg:block'>
            <Link to={"/partner/chat"}>
              <svg
                id="SvgjsSvg1001"
                width="40"
                height="50"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlnsSvgjs="http://svgjs.com/svgjs"
              >
                <defs id="SvgjsDefs1002"></defs>
                <g id="SvgjsG1008">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 48 48"
                    width="40"
                    height="50"
                  >
                    <path
                      d="M38.53,9.47A7.05,7.05,0,0,0,32,5H12a7,7,0,0,0-7,7V25a7,7,0,0,0,5,6.7,7.43,7.43,0,0,0,1,.23V38a1,1,0,0,0,.62.92A.84.84,0,0,0,12,39a1,1,0,0,0,.71-.29L15.44,36,16,36H28.59l6.7,6.71A1,1,0,0,0,36,43a.84.84,0,0,0,.38-.08A1,1,0,0,0,37,42V35.93A7,7,0,0,0,43,29V16A7.05,7.05,0,0,0,38.53,9.47ZM37,25a5,5,0,0,1-5,5H19a1,1,0,0,0-.71.29l-4,4L13,35.59V31a1,1,0,0,0-1-1,4.72,4.72,0,0,1-1.45-.22A5,5,0,0,1,7,25V12a5,5,0,0,1,5-5H32a5,5,0,0,1,5,5Z"
                      fill="#fffefe"
                      className="color000 svgShape"
                    ></path>
                    <path
                      d="M32 13H12a1 1 0 0 0 0 2H32a1 1 0 0 0 0-2zM32 18H12a1 1 0 0 0 0 2H32a1 1 0 0 0 0-2zM32 23H12a1 1 0 0 0 0 2H32a1 1 0 0 0 0-2z"
                      fill="#fffefe"
                      className="color000 svgShape"
                    ></path>
                  </svg>
                </g>
              </svg>
            </Link>
          </div>
          <button className="btn btn-outline text-gray-600 sm:text-md" onClick={() => document.getElementById('my_modal_4').showModal()}>
            Add Property</button>



          {/* Navaar slideFeature */}

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
                  <li className='border border-black rounded-lg my-1 shadow-md'><Link to={"/partner/chat"}> <svg
                    id="SvgjsSvg1001"
                    width="40"
                    height="50"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlnsSvgjs="http://svgjs.com/svgjs"
                  >
                    <defs id="SvgjsDefs1002"></defs>
                    <g id="SvgjsG1008">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        viewBox="0 0 48 48"
                        width="40"
                        height="50"
                      >
                        <path
                          d="M38.53,9.47A7.05,7.05,0,0,0,32,5H12a7,7,0,0,0-7,7V25a7,7,0,0,0,5,6.7,7.43,7.43,0,0,0,1,.23V38a1,1,0,0,0,.62.92A.84.84,0,0,0,12,39a1,1,0,0,0,.71-.29L15.44,36,16,36H28.59l6.7,6.71A1,1,0,0,0,36,43a.84.84,0,0,0,.38-.08A1,1,0,0,0,37,42V35.93A7,7,0,0,0,43,29V16A7.05,7.05,0,0,0,38.53,9.47ZM37,25a5,5,0,0,1-5,5H19a1,1,0,0,0-.71.29l-4,4L13,35.59V31a1,1,0,0,0-1-1,4.72,4.72,0,0,1-1.45-.22A5,5,0,0,1,7,25V12a5,5,0,0,1,5-5H32a5,5,0,0,1,5,5Z"
                          fill="#000"
                          className="color000 svgShape"
                        ></path>
                        <path
                          d="M32 13H12a1 1 0 0 0 0 2H32a1 1 0 0 0 0-2zM32 18H12a1 1 0 0 0 0 2H32a1 1 0 0 0 0-2zM32 23H12a1 1 0 0 0 0 2H32a1 1 0 0 0 0-2z"
                          fill="#000"
                          className="color000 svgShape"
                        ></path>
                      </svg>
                    </g>
                  </svg>
                    Inbox</Link></li>
                  <li className='border border-black rounded-lg my-1 shadow-md'>
                  <Link to={'/partner/buyerDetails'}> <svg
    id="SvgjsSvg1012"
    width="30"
    height="40"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlnsSvgjs="http://svgjs.com/svgjs"
  >
    <defs id="SvgjsDefs1013"></defs>
    <g id="SvgjsG1014">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        x="0"
        y="0"
        enableBackground="new 0 0 16 16"
        version="1.1"
        viewBox="0 0 16 16"
        xmlSpace="preserve"
        width="30"
        height="40"
      >
        <path
          id="path7"
          fill="#000"
          d="M3.754.5C2.787.5 2 1.287 2 2.254v10.992C2 14.213 2.787 15 3.754 15h7.992c.967 0 1.754-.787 1.754-1.754V4.771c0-.007-.007-.012-.008-.019a.246.246 0 0 0-.064-.158l-4-4a.244.244 0 0 0-.15-.067C9.252.52 9.232.5 9.206.5H3.754zm0 .5H9v2.281c0 .96.78 1.74 1.738 1.74H13v8.225c0 .691-.563 1.254-1.254 1.254H3.754A1.256 1.256 0 0 1 2.5 13.246V2.254C2.5 1.563 3.063 1 3.754 1Zm5.744.393H9.5c.77.766 2.314 2.3 3.145 3.128h-1.907c-.683 0-1.24-.557-1.24-1.24V1.393zm.434 8.533-1.56 1.515a.253.253 0 0 0 .001.364l1.56 1.476.344-.363-1.103-1.049h2.693v-.5H9.164l1.117-1.084-.35-.36Z"
          className="color231f20 svgShape"
        ></path>
      </svg>
    </g>
  </svg>BuyerDetails</Link></li>
                  {partner ? (<>
                    <li className='border border-black rounded-lg my-1 shadow-md'><Link onClick={handleLogout}>Logout</Link></li>
                    <li className='border border-black rounded-lg my-1 shadow-md'><Link to={'/account'}>Profile</Link></li>
                   
                  </>) : (<li className='border border-black rounded-lg my-1 shadow-md'><Link to={'/login'}>Login</Link></li>)}

                </ul>
              </div>
            </div>

          )}

          {/* --------------------- */}

          {isSmallScreen ? ("") : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 rounded-full">
                  <div className="w-32 mt-1">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.18007 15.2964C3.92249 16.0335 0.625213 17.5386 2.63348 19.422C3.6145 20.342 4.7071 21 6.08077 21H13.9192C15.2929 21 16.3855 20.342 17.3665 19.422C19.3748 17.5386 16.0775 16.0335 14.8199 15.2964C11.8709 13.5679 8.12906 13.5679 5.18007 15.2964Z" stroke="white" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z" stroke="white" strokeWidth="1.5" />
                      <path d="M19.5 7.14286V8M19.5 7.14286C18.777 7.14286 18.14 6.76405 17.7664 6.18888M19.5 7.14286C20.223 7.14286 20.86 6.76405 21.2336 6.18888M19.5 2.85714C20.223 2.85714 20.8601 3.236 21.2336 3.81125M19.5 2.85714C18.777 2.85714 18.1399 3.236 17.7664 3.81125M19.5 2.85714V2M22 3.28571L21.2336 3.81125M17.0003 6.71429L17.7664 6.18888M17 3.28571L17.7664 3.81125M21.9997 6.71429L21.2336 6.18888M21.2336 3.81125C21.4545 4.15141 21.5833 4.56023 21.5833 5C21.5833 5.43982 21.4545 5.84869 21.2336 6.18888M17.7664 3.81125C17.5455 4.15141 17.4167 4.56023 17.4167 5C17.4167 5.43982 17.5455 5.84869 17.7664 6.18888" stroke="white" strokeWidth="1.5" stroke-linecap="round" />
                    </svg>
                  </div>
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                  <Link to={"/partner/home"}>
                    <a className="justify-between">
                      Home
                      {/* <span className="badge">New</span> */}
                    </a>
                  </Link>
                </li>

                <li>
                  <Link to={"/partner/partnerProfile"}>
                    <a className="justify-between">
                      Profile
                      {/* <span className="badge">New</span> */}
                    </a>
                  </Link>
                </li>
                
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          )}
        </div>

      </div>

      <AddPropertyModal />
    </>
  )
}

export default Navbar
