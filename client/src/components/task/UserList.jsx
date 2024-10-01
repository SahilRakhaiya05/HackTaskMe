import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import clsx from "clsx";
import { getInitials } from "../../utils";
import { MdCheck } from "react-icons/md";
import { useGetTeamListQuery } from "../../redux/slices/api/userApiSlice";

const UserList = ({ setTeam, team }) => {
  const { data, isLoading } = useGetTeamListQuery();
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (data && team) {
      // Convert team IDs to user objects
      const usersFromTeam = data.filter((user) => team.includes(user._id));
      setSelectedUsers(usersFromTeam);
    }
  }, [data, team]);

  const handleChange = (user) => {
    setSelectedUsers((prev) => {
      const isSelected = prev.some((u) => u._id === user._id);
      const newSelection = isSelected
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user];
      setTeam(newSelection.map((u) => u._id).filter((id) => id !== null));
      return newSelection;
    });
  };

  return (
    <div className='z-50 relative'>
      <p className='z-100 text-gray-800 font-semibold mb-2'>Assign Task To:</p>
      <Listbox as="div" value={selectedUsers} onChange={handleChange} multiple>
        <div className='relative'>
          <Listbox.Button className='relative w-full cursor-pointer rounded-lg bg-gray-100 pl-4 pr-10 py-2 border border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none'>
            <span className='block truncate'>
              {selectedUsers.length > 0
                ? selectedUsers.map((user) => user.name).join(", ")
                : "Select users"}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <BsChevronExpand className='h-5 w-5 text-gray-500' aria-hidden='true' />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='z-51 absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white border border-gray-300 shadow-lg ring-1 ring-black/5 focus:outline-none'>
              {data?.map((user) => (
                <Listbox.Option key={user._id} value={user}>
                  {({ active, selected }) => (
                    <div
                      className={clsx(
                        "flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100",
                        active ? "bg-indigo-50 text-indigo-700" : "text-gray-700"
                      )}
                      onClick={() => handleChange(user)}
                    >
                      <div className='w-8 h-8 rounded-full text-white flex items-center justify-center bg-indigo-600'>
                        <span className='text-sm'>{getInitials(user.name)}</span>
                      </div>
                      <span className='flex-1'>{user.name}</span>
                      {selected && (
                        <MdCheck className='text-indigo-600' aria-hidden='true' />
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default UserList;
