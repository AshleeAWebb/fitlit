const fetchAPI = (url) => {
  return fetch(url)
  .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong!')
      }
      return res.json()
    })
};

const fetchAllData = () => {
  return Promise.all([
    fetchAPI('http://localhost:3001/api/v1/users'),
    fetchAPI('http://localhost:3001/api/v1/hydration'),
    fetchAPI('http://localhost:3001/api/v1/sleep'),
    fetchAPI('http://localhost:3001/api/v1/activity')
  ]);
};

const postActivityData = (data) => {
  return fetch('http://localhost:3001/api/v1/activity', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong!')
      }
      return res.json()
    })
};

const fetchActivityData = () => {
  return fetch('http://localhost:3001/api/v1/activity')
  .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong!')
      }
      return res.json()
    })
}

export { fetchAllData };
export { postActivityData };
export { fetchActivityData };