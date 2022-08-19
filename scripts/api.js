const config = {
  baseUrl: 'https://jsonplaceholder.typicode.com/posts',
  headers: {
    'Content-Type': 'application/json'
  }
}

const parseResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`)
}

const getInitialData = () => {
  return fetch(`${config.baseUrl}`, {
      headers: config.headers
    }
  )
    .then(parseResponse)
}

