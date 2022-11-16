'use strict';

interface routeApi {
  index: string,
  line: string,
  v1: {
    login: string
  }
}

const routeApi: routeApi = {
  index: '/',
  line: '/line',
  v1: {
    login: 'login'
  }
}

export default routeApi
