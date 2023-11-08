import React from 'react';

const Tickets = () => {
  const pendingTickets = [
    {
      id: 12345,
      type: 'Bug Report',
      status: 'Pending',
    },
    {
      id: 67890,
      type: 'Feature Request',
      status: 'Pending',
    },
  ];

  const resolvedTickets = [
    {
      id: 34567,
      type: 'Support Question',
      status: 'Resolved',
    },
    {
      id: 9876,
      type: 'Task',
      status: 'Resolved',
    },
  ];

  return (
    <div className="tickets-component">
      <h1 className="text-3xl font-bold">Tickets</h1>
      <div className="pending-tickets bg-red-500 text-white p-4">
        <h2 className="text-2xl font-bold">Pending Tickets</h2>
        <ul className="list-none">
          {pendingTickets.map((ticket) => (
            <li className="flex mb-2" key={ticket.id}>
              <span className="mr-4">{ticket.id}</span>
              <span className="mr-4">{ticket.type}</span>
              <span>{ticket.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="resolved-tickets bg-green-500 text-white p-4">
        <h2 className="text-2xl font-bold">Resolved Tickets</h2>
        <ul className="list-none">
          {resolvedTickets.map((ticket) => (
            <li className="flex mb-2" key={ticket.id}>
              <span className="mr-4">{ticket.id}</span>
              <span className="mr-4">{ticket.type}</span>
              <span>{ticket.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tickets;
