const Utils = {
  hours() {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      let period = i < 12 ? "AM" : "PM";
      let hour = i % 12 === 0 ? 12 : i % 12; // Convert 0 -> 12, 13 -> 1, etc.
      hours.push(`${hour} ${period}`);
    }
    return hours;
  }
};

const labels = Utils.hours(); // from previous function

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Background', // bar legend
      data: [59, 59, 59, 59], // by every hour
      backgroundColor: 'rgba(192, 192, 75, 0.5)', // rgba
    },
    {
      label: 'Total time ( minutes )', // bar legend
      data: [40, 30, 5, 18], // by every hour
      backgroundColor: 'rgba(75, 192, 192, 0.5)', // rgba
    },
    {
      label: 'Unproductive time ( minutes )', // bar legend
      data: [10, 20, 2, 10], // by every hour
      backgroundColor: 'rgba(192, 75, 192, 0.5)', // rgba
    },
  ]
};