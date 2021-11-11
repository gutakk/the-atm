
import axios, { AxiosResponse } from 'axios';

export const verifyPinAPI = (pin: string): Promise<AxiosResponse> => {
  const url: string = 'https://frontend-challenge.screencloud-michael.vercel.app/api/pin/';

  return axios.post(url, {
    pin: pin
  });
};

