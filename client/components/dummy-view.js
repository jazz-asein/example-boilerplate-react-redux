import React from 'react'
import Head from './head'

const Dummy = () => {
  return (
    <div>
      <Head title="Hello" />
      <div className="flex justify-center items-center h-screen">
        <a href="/users" className="bg-black blue opacity-75 hover:bg-blue-900 px-10 py-3 rounded">
          Get Users
        </a>
      </div>
    </div>
  )
}

Dummy.propTypes = {}

export default Dummy
