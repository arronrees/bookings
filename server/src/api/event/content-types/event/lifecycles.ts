export default {
  beforeUpdate(event) {
    const { data, where, select, populate } = event.params;

    if (data.ticketsAvailable > data.ticketAllocation) {
      data.ticketsAvailable = data.ticketAllocation;
    }
  },
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    if (data.ticketsAvailable > data.ticketAllocation) {
      data.ticketsAvailable = data.ticketAllocation;
    }
  },
};
