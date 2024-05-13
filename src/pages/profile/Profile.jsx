import { Avatar, Paper, Stack} from '@mui/material'
import React from 'react'
import PasswordChangeForm from './PasswordChangeForm'
import { useSelector } from 'react-redux'

const Profile = () => {
  const userInfo = useSelector(state=>state.auth)
  return (
    <Stack direction="row" className='flex-wrap justify-center gap-2'>
      <div className='xs:w-full md:w-1/3'>
        <img src='/assets/account.webp'/>
      </div>
      <Paper className='xs:w-full lg:w-1/2 p-8'>
        <div className='flex flex-row'>
          <div>
            <Avatar className='p-10'>{userInfo.first_name[0]}{userInfo.last_name[0]}</Avatar>
          </div>
          <div className='p-3'>
            <h6 className='font-semibold sm:text-xl text-xs'>{userInfo.first_name} {userInfo.last_name}</h6>
            <p className="text-gray-600 text-xs md:text-sm">{userInfo.email} ({userInfo.currentUser})</p>
          </div>
        </div>
        <PasswordChangeForm/>
      </Paper>
    </Stack>
  )
}

export default Profile
