import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { adminLogout } from '../../Redux/Slice/adminSlice'
import { useNavigate, Link } from 'react-router-dom'
const NavBar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 723)

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 723)
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    dispatch(adminLogout())
    navigate('/admin/')

  }
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">SevenSky</a>
      </div>
      <div className="flex-none">
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
                <li className='border border-black rounded-lg my-3 py-2 shadow-md'><Link to={'/admin/dashboard'}><svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                Dashboard</Link>
                </li>
                <li className='border border-black rounded-lg my-3 py-2 shadow-md'><Link to={'/admin/userList'}>  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                UserList</Link>
                </li>
                <li className='border border-black rounded-lg my-3 py-2 shadow-md'><Link to={'/admin/propertylist'}>  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                PropertyList</Link>
                </li>
                <li className='border border-black rounded-lg my-3 py-2 shadow-md'><Link to={'/admin/partnerList'}><svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                PartnerList</Link>
                </li>
                <li className='border border-black rounded-lg my-3 py-2 shadow-md'><Link to={'/admin/premiumUser'}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                  <path
                    d="M20 19H4a2 2 0 0 0 0 4h16a2 2 0 0 0 0-4zm2-13a2 2 0 0 0-2 2 2.041 2.041 0 0 0 .042.409L16.41 10.59l-3.061-6.122a2 2 0 1 0-2.7 0L7.59 10.59 3.958 8.409A2.041 2.041 0 0 0 4 8a2 2 0 1 0-2 2c.037 0 .071-.009.107-.011L2.88 17h18.24l.773-7.011c.036 0 .07.011.107.011a2 2 0 0 0 0-4z"
                    className="text-current"
                    data-name="30. Crown"
                  />
                </svg>
                Premium List</Link>
                </li>

              </ul>
            </div>
          </div>

        )}

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-32 mx-1">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.18007 15.2964C3.92249 16.0335 0.625213 17.5386 2.63348 19.422C3.6145 20.342 4.7071 21 6.08077 21H13.9192C15.2929 21 16.3855 20.342 17.3665 19.422C19.3748 17.5386 16.0775 16.0335 14.8199 15.2964C11.8709 13.5679 8.12906 13.5679 5.18007 15.2964Z" stroke="#141B34" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z" stroke="#141B34" strokeWidth="1.5" />
                <path d="M19.5 7.14286V8M19.5 7.14286C18.777 7.14286 18.14 6.76405 17.7664 6.18888M19.5 7.14286C20.223 7.14286 20.86 6.76405 21.2336 6.18888M19.5 2.85714C20.223 2.85714 20.8601 3.236 21.2336 3.81125M19.5 2.85714C18.777 2.85714 18.1399 3.236 17.7664 3.81125M19.5 2.85714V2M22 3.28571L21.2336 3.81125M17.0003 6.71429L17.7664 6.18888M17 3.28571L17.7664 3.81125M21.9997 6.71429L21.2336 6.18888M21.2336 3.81125C21.4545 4.15141 21.5833 4.56023 21.5833 5C21.5833 5.43982 21.4545 5.84869 21.2336 6.18888M17.7664 3.81125C17.5455 4.15141 17.4167 4.56023 17.4167 5C17.4167 5.43982 17.5455 5.84869 17.7664 6.18888" stroke="#141B34" strokeWidth="1.5" stroke-linecap="round" />
              </svg>

            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">


            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar
