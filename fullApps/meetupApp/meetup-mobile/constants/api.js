import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

const fakeGroupId = '59b0600d7f54f923a8cc318a';

class MeetupApi {
  constructor() {
    this.groupId = fakeGroupId;
    this.path = `/groups/${this.groupId}/meetups`;
  }

  async fetchGroupMeetups() {
    console.log('path: ' + this.path);
    const { data } = await axios.get(this.path);
    console.log('data: ' + data.meetups);

    return data.meetups;
  }
}

export {
  MeetupApi,
}
