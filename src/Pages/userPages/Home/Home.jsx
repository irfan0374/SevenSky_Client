import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Navbar from '../../../Component/userComponent.js/Navbar1';
import GoogleSearch from '../../../Component/userComponent.js/googleSearch';
import Loading from "../../../Component/Loading/Loading";
import { Tabs, TabsHeader, Tab, TabsBody, TabPanel } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import SearchFilter from '../../../Component/userComponent.js/SearchFilter';
import Footer from '../../../Component/CommonComponent/Footer'
// Lazy-loaded components
const LazyPropertyCards = lazy(() => import('../../../Component/userComponent.js/Card/propertyCards'));
const LazyBudgetCard = lazy(() => import('../../../Component/userComponent.js/Card/budgetCard'));
const LazyBHKCard = lazy(() => import('../../../Component/userComponent.js/Card/BHKCard'));

const tabsData = [
  { label: "Property", value: "Property", icon: UserCircleIcon, LazyComponent: LazyPropertyCards },
  { label: "Budget", value: "Budget", icon: UserCircleIcon, LazyComponent: LazyBudgetCard },
  { label: "By BHK", value: "hee", icon: UserCircleIcon, LazyComponent: LazyBHKCard },
];

const Homepage = () => {
  const user = useSelector(state => state.userReducer);
  const [mapLocation, setMapLocation] = useState()
  const [scrolling, setScrolling] = useState(false);
  const tabsRef = useRef(null);

  const handleScroll = () => {
    if (tabsRef.current) {
      const tabsOffset = tabsRef.current.offsetTop;
      setScrolling(window.scrollY > tabsOffset);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <div className='h-screen '>
      <div className="hero h-screen" style={{
        backgroundImage: "url('/public/bannerOne.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}>
        <div className=" bg-opacity-60 sticky">
          <Navbar />
        </div>
        <div>
          <SearchFilter />
        </div>
      </div>

      <div className={`bg-white h-screen ${scrolling ? 'sticky top-0' : ''}`} ref={tabsRef}>
        <div className='flex justify-center'>
          <div className='container flex flex-col sm:justify-center items-center py-16'>
            <h1 className=' text-3xl font-serif sm:text-5xl'>
              Our Featured Exclusives
            </h1>
            <p className='my-6 md:text-lg sm:xl'>
              Searching for your ideal home or commercial property in the UAE shouldn't be a daunting experience. That's why we're here to assist you in finding the perfect property at the right price.
            </p>
          </div>
        </div>
        <div>
          <Tabs value="Property">
            <TabsHeader className="w-auto mx-auto flex justify-center bg-white ">
              {tabsData.map(({ label, value, icon: Icon }) => (
                <Tab key={value} value={value} className="w-40">
                  <div className="flex items-center gap-2">
                    {React.createElement(Icon, { className: "w-5 h-5" })}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {tabsData.map(({ label, value, icon: Icon, LazyComponent }) => (
                <TabPanel key={value} value={value}>
                  <Suspense fallback={<Loading />}>
                    <LazyComponent />
                  </Suspense>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
    </div>
      </div>

    </>
  );
};

export default Homepage;
