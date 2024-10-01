import { Tab } from "@headlessui/react";
import { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected, children }) {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <Tab.Group>
        <Tab.List className="flex space-x-4 border-b border-gray-300">
          {tabs.map((tab, index) => (
            <Tab key={tab.title} as={Fragment}>
              {({ selected }) => (
                <button
                  onClick={() => setSelected(index)}
                  className={classNames(
                    "flex items-center py-2 text-sm font-semibold transition-all duration-200 ease-in-out",
                    selected
                      ? "text-teal-600 border-b-2 border-teal-600"
                      : "text-gray-600 hover:text-teal-500"
                  )}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.title}</span>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {children}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
