if (navigator.serviceWorker) {
    navigator.serviceWorker.register (
      'quitting-smoking/service_worker.js',
      {scope: '/quitting-smoking/'}
    )
  }