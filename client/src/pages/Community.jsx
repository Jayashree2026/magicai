import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Heart } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setcreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  // const fetchcreations = async () => {
  //   try {


  //     const { data } = await axios.get(
  //       '/api/user/get-published-creations',
  //       { headers: { Authorization: `Bearer ${await getToken()}` } }
  //     );
  //     if (data.success) {
  //       setcreations(data.creations);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  //   setLoading(false);
  // }
  const fetchcreations = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched data:", data); // 👈 add this line

      if (data.success) {
        setcreations(data.creations); // check if it's data.creations or data.Creations
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLiketoggle = async (id) => {
    try {
      const { data } = await axios.get(`/api/user/toggle-like-creations`,{ id }, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });


      if (data.success) {
        toast.success(data.message);
        await fetchcreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      fetchcreations()
    }
  }, [user])
  return !loading ? (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>

      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll flex flex-row gap-4'>
        {creations.map((creation, index) => (
          <div key={index} className='relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3' >
            <img src={creation.content} className='w-full h-full object-cover rounded-lg' />
            <div className='absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg'>
              <p className='text-sm hidden group-hover:block' >{creation.prompt}</p>
              <div className='flex gap-1 items-center'>
                <p>{creation.likes.length}</p>
                <Heart onClick={() => imageLiketoggle(creation.id)} className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-600' : 'text-white'}`} />
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  ) : (
    <div className='flex justify-center items-center h-full '>
      <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'></span>
    </div>
  )
}

export default Community
