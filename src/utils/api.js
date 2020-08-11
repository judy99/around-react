import Api from '../components/Api.js'

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-2',
  headers: {
    authorization: '93454fed-b8d7-4b37-acbd-87ed08b659ea',
    'Content-Type': 'application/json'
  }
});

export default api;
