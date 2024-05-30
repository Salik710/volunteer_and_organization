import React, { useState } from 'react';
import homegirl from '../../assets/homepage-girl.png'
import { Link } from 'react-router-dom';


const Home = () => {
  const [selectedUserType, setSelectedUserType] = useState(null);
  return (
    <div className=" bg-[#EEE7CE] relative flex items-center justify-center overflow-hidden min-h-screen">
      <div className="relative mx-auto h-full px-4 pb-20 md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-16">
          <div className="relative">
            <div className="absolute top-0 -left-48 z-0 opacity-50">
            </div>
            <div className="lg:max-w-xl lg:pr-5 relative">
              <p className="flex text-sm uppercase prompt-medium text-green-800">
                Volunteer Management
              </p>
              <h2 className="mb-6 max-w-lg text-5xl font-light leading-snug tracking-tight text-g1 sm:text-7xl sm:leading-snug">
                Make the world look {' '}
                <span className="my-1 inline-block  px-4 font-bold">
                  different
                </span>
              </h2>
              <p className="prompt-medium text-md text-gray-900">
              Transform your volunteer program - Inspire volunteers, maximize impact
              </p>
              <div className="mt-10 flex space-y-4 md:space-y-0 flex-col md:flex-row items-center md:space-x-4">
                <Link
                  to="/registerLogin/volunteer"
                  className="bg-black text-white my-[1px] active:bg-green-600 hover:bg-green-500 font-bold uppercase text-sm px-5 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none transition-all duration-150 ease-linear"
                >
                  Join as Volunteer
                </Link>
                <Link
                  to="/registerLogin/organization"
                  className="border-black border-solid border-[1.5px] hover:border-none text-black active:bg-green-600 hover:bg-green-500 font-bold uppercase text-sm px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none transition-all duration-150 ease-linear "
                >
                  Join as Organization
                </Link>
              </div>
            </div>
          </div>
          <div className="relative lg:ml-32 lg:block lg:w-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="my-6 mx-auto h-10 w-10 animate-bounce rounded-full bg-white p-2 lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 17l-4 4m0 0l-4-4m4 4V3"
              />
            </svg>
            <div className="abg-orange-400 mx-auto w-fit overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none">
              <img src={homegirl} />
            </div>
          </div>
        </div>
      </div>
          </div>
  );
};

export default Home;
