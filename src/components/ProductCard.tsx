import { useState } from 'react';
import sonyHeadphone from '../images/sony.jpeg'
import Image from 'next/image';
import { Tab } from '@headlessui/react'
import { ChatBubbleBottomCenterTextIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { ChatBox } from './ChatBox';

// need to add props
export function ProductCard () {
  const [showChat, setShowChat] = useState(false);
  const [firstIconActive, setFirstIconActive] = useState(true);
  const [secondIconActive, setSecondIconActive] = useState(false);

  const setActive = (firstIcon: boolean, secondIcon: boolean) => {
    setFirstIconActive(firstIcon);
    setSecondIconActive(secondIcon);
  }


  const productInfo = {
    image: sonyHeadphone,
    title: 'Product Title',
    description: 'Product description...',
  };

  return (
    <div className="flex flex-col w-80 mx-auto mt-20">
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
          <Tab>
              <ChatBubbleLeftRightIcon 
                  onClick={() => setActive(false, true)} 
                  className={`h-6 w-6 m-1 text-gray-900 outline-none ${secondIconActive ? 'opacity-100' : 'opacity-50'}`} 
              />
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="items-center w-full sm:w-auto justify-end">
                <h1 className='text-2xl font-bold tracking-tight'>Product Name</h1>
                <h2 className='text-xl pt-2'>Specs:</h2>
                <ul className="list-disc pl-5 pt-5">
                  <li className='p-2'>Active noise cancellation</li>
                  <li className='p-2'>Wireless connectivity</li>
                  <li className='p-2'>Bluetooth compatible</li>
                  <li className='p-2'>Comfortable ear cushions</li>
                  <li className='p-2'>Built-in microphone for hands-free calling</li>
                  <li className='p-2'>Adjustable headband for a customized fit</li>
                </ul>
            </div>
          </Tab.Panel>
          <Tab.Panel> <ChatBox /> </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      </div>
    </div>
  );
};

