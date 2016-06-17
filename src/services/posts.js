import fetchUtils from './fetchUtils';

export async function getAll() {
  return fetchUtils('http://203.195.231.148:7013/v1/posts/');
}
