import React, { useState } from "react";

const ChatNav = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleButtonClick = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    
    <div className="navbar border-2 border-black min-w-full">
  <div className="flex-none">
    <button className=" md:hidden lg:hidden sm:block btn btn-square btn-ghost"onClick={handleButtonClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>
  </div>


  <div className=" md:hidden lg:hidden w-ful sm:block w-auto sm:w-0" id="navbar-multi-level">
          {/* Rest of your content */}
          <div>
            {isDrawerOpen && (
              <div className="drawer">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                  checked={isDrawerOpen}
                  onChange={handleButtonClick}
                />
                <div className="drawer-side mt-16">
                  <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li>
                      <a>Sidebar Item 1</a>
                    </li>
                    <li>
                      <a>Sidebar Item 2</a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
  
 
 
</div>
  );
};

export default ChatNav;
