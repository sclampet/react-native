export const fetchMeetups = () =>
  fetch('http://localhost:3000/meetups')
      .then((res) => res.json())
