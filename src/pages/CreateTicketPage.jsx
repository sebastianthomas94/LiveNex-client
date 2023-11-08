import React from 'react'
import Header from '../components/header'
import SideBar from '../components/sidebar'
import CreateTicket from '../components/CreateTicket'

function CreateTicketPage() {
  return (
    <>
    <Header />
    <div className="flex">
      <SideBar />
      <div className="flex-grow m-12">
        <CreateTicket />
      </div>
    </div>
  </>
  )
}

export default CreateTicketPage