import { Popover, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { ChatBox } from './ChatBox'

export function PopoverWindow() {
  return (
    <div className="fixed bottom-2 left-2 w-full max-w-sm">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'text-white' : 'text-white/90'}
                group inline-flex items-center rounded-lg bg-blue-900 px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <span>Ask Us</span>
              <ChevronUpIcon
                className={`${open ? 'text-orange-300' : 'text-orange-300/70'}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-orange-300/80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute bottom-10 z-10 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-xl ring-1 ring-black/5">
                  <div className="relative gap-8 lg:grid-cols-2">
                    <ChatBox />
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}