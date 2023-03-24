import axios from 'axios';
export default async function fetchImages(searchValue, page) {
  const BASEURL = 'https://pixabay.com/api/';
  const KEY = '32771968-7fd567c901afb84ab6320145c';

  const response = await axios.get(BASEURL, {
    params: {
      q: searchValue,
      key: KEY,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 50,
    },
  });
  console.log(response);
  return response.data;
}
