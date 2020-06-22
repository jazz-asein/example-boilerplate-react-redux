import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const Users = (props) => {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-wrap -mx-5">
        {props.users.map((el) => (
          <div key={el.id} className="px-5 w-full lg:w-1/4 box-border">
            <div className="bg-white my-5 pb-6 justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm">
              <div className="relative h-40">
                <div className="absolute h-full w-full object-cover midnight" />
              </div>
              <div className="relative shadow mx-auto h-24 w-24 -my-10 border-white rounded-full overflow-hidden border-4">
                <FaUserCircle className="object-cover w-full h-full blue bg-white" />
              </div>
              <div className="mt-16">
                <h1 className="text-lg text-center font-semibold">{el.name}</h1>
              </div>
              <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t">
                <a
                  href={`mailto:${el.email}`}
                  className="email text-xs mr-2 my-1 uppercase tracking-wider border px-2 cursor-default"
                >
                  {el.email}
                </a>
                <a
                  href={`tel:${el.phone}`}
                  className="email text-xs mr-2 my-1 uppercase tracking-wider border px-2 cursor-default"
                >
                  {el.phone}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Users.propTypes = {}

export default Users
