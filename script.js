import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1s', target: 1 }, // below normal load
    { duration: '1s', target: 10 },
    { duration: '1s', target: 50 }, // normal load
    { duration: '1s', target: 100 },
    { duration: '1s', target: 400 }, // around the breaking point
    { duration: '1s', target: 500 },
    { duration: '1s', target: 600 }, // beyond the breaking point
    { duration: '1s', target: 1000 },
    { duration: '1s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3000'; // make sure this is not production
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/products`,
      null,
      { tags: { name: 'Products' } },
    ],
    [
      'GET',
      `${BASE_URL}/products/5/`,
      null,
      { tags: { name: 'Products with product_id' } },
    ],
    [
      'GET',
      `${BASE_URL}/products/5/styles`,
      null,
      { tags: { name: 'Products with styles' } },
    ],
    [
      'GET',
      `${BASE_URL}/products/5/related`,
      null,
      { tags: { name: 'Related' } },
    ],
  ]);
  sleep(1);
}