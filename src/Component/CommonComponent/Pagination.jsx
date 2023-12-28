import React,{useState} from 'react'
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({data,setfilter}) => {
  // pagination logics
  const [currentPage, setCurrentPage] = useState(1)
 

  const recordPerPage = 2
  const firstIndex = (currentPage - 1) * recordPerPage
  const lastIndex = firstIndex + recordPerPage
  const records = data.slice(firstIndex, lastIndex)
  const number = Array.from({ length: Math.ceil(data.length / recordPerPage) }, (_, index) => index + 1)

  const handleSetActive = (index) => {
    setCurrentPage(index)

  }

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const next = () => {
    if (currentPage < Math.ceil(data.length / recordPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => handleSetActive(index),
  });



  const filtered = records;
  setfilter(filtered)

  return (
    <>
        <div className="container flex justify-center mt-4">
                <div className='flex gap-2'>
                  <Button
                    variant='text'
                    className='flex gap-2'
                    disabled={currentPage === 1}
                    onClick={prev}

                  >
                    <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' />Previous
                  </Button>

                  <div className="flex gap-2">
                    {number.map(page => (
                      <IconButton key={page}

                        {...getItemProps(page)}>{page}</IconButton>
                    ))}
                  </div>
                  <Button
                    variant='text'
                    className='flex item-center gap-2'
                    onClick={next}
                    disabled={currentPage === Math.ceil(data.length / recordPerPage)}
                  >
                    Next <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
                  </Button>


                </div>
              </div>
    </>
  )
}

export default Pagination
