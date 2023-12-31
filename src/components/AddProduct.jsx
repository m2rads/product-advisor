'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useRouter } from "next/navigation"

export function AddProduct() {
  let [isOpen, setIsOpen] = useState(false)
  const [productName, setProductName] = useState("")
  const router = useRouter();

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleSubmit = async (event) => {
    setIsOpen(false)
    event.preventDefault();
    router.push(`/showcase?productname=${productName}`);
  };

  return (
    <>
      <div className="inset-0 flex justify-end">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-blue-800 px-4 py-2 mr-4 mt-4 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ml-atuo"
        >
          Add a product
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-400 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Compare Products!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-800">
                      Add a new product to compare.
                    </p>
                  </div>

                  <div className="mt-4 flex">
                  <input
                        className=' focus:shadow-outline w-full appearance-none rounded border px-3 py-2 mr-1 leading-tight bg-slate-100 text-gray-900 shadow focus:outline-none'
                        id='username'
                        type='text'
                        placeholder='Product Name'
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Add
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
