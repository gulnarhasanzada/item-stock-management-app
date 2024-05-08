import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className=' bg-blue-900 text-center flex flex-col min-h-screen p-5'>
      <div>
        <h1 className='text-white text-4xl my-10'>Stock Management App</h1>
      </div>
      <div className='flex flex-row flex-wrap justify-center px-10 '>
        <div className='h-auto xs:w-full lg:w-1/2'>
            <img src="/auth.svg" alt="Auth" className=''/>
        </div>
        <div className='h-auto xs:w-full lg:w-1/2'>
            {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
