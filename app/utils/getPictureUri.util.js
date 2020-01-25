import axios from 'axios';

export const getPictureUri = (id, callback) => {
  axios({
    ...axios.defaults,
    method: 'get',
    url: `/attachments/${id}`,
  })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      console.log('error GET ATTACHMENTS: ', error);
      return;
    });
};
