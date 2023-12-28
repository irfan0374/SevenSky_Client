import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import GoogleSearch from './googleSearch';
import { useLocation } from 'react-router-dom';

const SideBarFilter = ({ setProperty, filterproperty }) => {
    const [filterOption, setFilterOption] = useState({
      propertyType: { Flat: false, Appartment: false, House: false, Office: false },
    });
  
    useEffect(() => {
      const filteredProperty = filterproperty.filter((property) => {
        const { propertyType } = filterOption;
  
        const selectedPropertyType = Object.keys(propertyType).filter(
          (type) => propertyType[type]
        );
  
        const propertyTypeMatch =
          selectedPropertyType.length === 0 || selectedPropertyType.includes(property.propertyType);
  
        return propertyTypeMatch;
      });
  
      setProperty(filteredProperty);
    }, [filterOption, setProperty]);
  
    const handleCheckBoxChange = (option, type) => {
      setFilterOption((prevOptions) => ({
        ...prevOptions,
        [type]: {
          ...prevOptions[type],
          [option]: !prevOptions[type][option],
        },
      }));
    };
  
    return (
      <>
        <div className="flex flex-col lg:border-1 border py-2">
          <div className="px-2 border-b py-2">
            <div className="flex justify-center px-2 py-1 border rounded-lg bg-gray-400 font-bold font-serif">
              Property Type
            </div>
            {Object.keys(filterOption.propertyType).map((option) => (
              <div key={option} className="flex px-2 py-1 border rounded-lg mt-1">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={filterOption.propertyType[option]}
                  onChange={() => handleCheckBoxChange(option, 'propertyType')}
                />
                <label className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  export default SideBarFilter;