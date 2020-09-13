import keys from 'lodash/keys';
import get from 'lodash/get';

export const getTableHeaders = list => {
  const firstRow = get(list, '0', {});
  const headers = keys(firstRow);
  return headers;
};
