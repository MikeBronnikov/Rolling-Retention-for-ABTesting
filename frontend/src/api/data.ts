import { dataSendingObj } from '../Types';
import  axios from 'axios'
const instance = axios.create({
  baseURL: 'https://abtest--backend.herokuapp.com/'
  });

  export const dataAPI = {
    getData() {
      return instance.get('data').then((response) => response.data)
    },
    sendData(items: Array<dataSendingObj>){
      console.log(items)
      return instance.post('data', {items: items}).then((response) => response.data)
    }
}
