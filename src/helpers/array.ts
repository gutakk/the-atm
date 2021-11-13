import _ from 'lodash';

export const uniquePush = (arr: any[], value: any) => {
  for(let i = 0; i < arr.length; i++) {
    if(_.isEqual(arr[i], value)) return
  }
  arr.push(value)
};
