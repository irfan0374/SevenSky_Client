import React, { useEffect, useState } from 'react';
import { getTheBuyerDetails } from '../../Api/partnerApi';
import { useSelector } from 'react-redux';

const BuyerDetails = () => {
  const { partner } = useSelector((state) => state.partnerReducer);
  const partnerId = partner._id;
  const [buyerDetails, setBuyerDetails] = useState([]);
  const [selectedBuyerDescription, setSelectedBuyerDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTheBuyer = async () => {
    try {
      const res = await getTheBuyerDetails(partnerId);
      console.log(res, 'resssssssssssss');
      if (res?.status === 200) {
        setBuyerDetails(res?.data?.buyer);
      }
    } catch (error) {
      console.error('Error fetching buyer details:', error);
    }
  };

  const showDescription = (description) => {
    setSelectedBuyerDescription(description);
    document.getElementById('my_modal_3').showModal();
  };

  useEffect(() => {
    fetchTheBuyer();
  }, [partnerId]);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-12">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            BuyerDetails
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Explore the details of potential buyers who are interested in acquiring your property.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 min-w-full">
            <tr>
              <th scope="col" className="px-6 py-3">
                Buyer name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {buyerDetails.length > 0 ? (
              buyerDetails.map((data) => (
                <tr key={data._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                  >
                    {data?.buyerName}
                  </th>
                  <td className="px-6 py-4">{data.buyerEmail}</td>
                  <td className="px-6 py-4">{data.buyerPhone}</td>
                  <td className="px-6 py-4">
                    <button className="btn" onClick={() => showDescription(data?.description)}>
                      Show
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="text-2xl text-black">No Buyers</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById('my_modal_3').close()}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">{selectedBuyerDescription}</p>
        </div>
      </dialog>
    </>
  );
};

export default BuyerDetails;
