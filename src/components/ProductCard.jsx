import React, { useState } from 'react';
import sonyHeadphone from '../images/sony.jpeg'
import Image from 'next/image';
import { Tab } from '@headlessui/react'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';

export const ProductCard = ({key, data}) => {
  const [firstIconActive, setFirstIconActive] = useState(true);
  const [secondIconActive, setSecondIconActive] = useState(false);

  const bulletPoints = data.split('\n');

  const setActive = (firstIcon, secondIcon) => {
    setFirstIconActive(firstIcon);
    setSecondIconActive(secondIcon);
  }

  return (
    <div className="flex flex-col w-80 mx-auto mt-5 sm:mt-20">
      <div className="rounded-xl">
          <Image 
              className="rounded-xl mx-auto mb-8 sm:w-2/3 py-4 border px-3"
              src={sonyHeadphone}
              alt='product image'
              width={120}
              height={100}
              />
      </div>
      <div className="bg-emerald-700 px-4 rounded-xl items-baseline shadow-md p-6">
        <Tab.Group>
        <Tab.List className="mb-4">
          <Tab>
              <ChatBubbleBottomCenterTextIcon 
                  onClick={() => setActive(true, false) }
                  className={`h-6 w-6 m-1 text-gray-900 outline-none ${firstIconActive ? 'opacity-100' : 'opacity-50'}`} 
              />
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="items-center w-full sm:w-auto h-96 overflow-auto">
                <h1 className='text-2xl font-bold tracking-tight'>Product Name</h1>
                <h2 className='text-xl pt-2'>Specs:</h2>
                {bulletPoints.map((element, index) => (
                  <div className='p-2' key={index}>{element}</div>
                ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      </div>
    </div>
  );
};

