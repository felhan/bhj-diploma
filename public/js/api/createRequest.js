createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      options.callback(null, xhr.response);
    } else {
      options.callback(new Error(`Error ${xhr.status}: ${xhr.statusText}`), null);
    }
  };

  xhr.onerror = () => {
    options.callback(new Error('Network error'), null);
  };

  xhr.onabort = () => {
    options.callback(new Error('Request aborted'), null);
  };

  xhr.ontimeout = () => {
    options.callback(new Error('Request timed out'), null);
  };

  try {
    // Prepare data for sending
    let params;
    if (options.method === 'GET') {
      params = new URLSearchParams();
      for (const key in options.data) {
        params.append(key, options.data[key]);
      }
      // Open request
      xhr.open(options.method, options.url + '?' + params.toString());
    } else {
      params = new FormData();
      for (const key in options.data) {
        params.append(key, options.data[key]);
      }
      // Open request
      xhr.open(options.method, options.url);
      xhr.send(params);
    }
  } catch (error) {
    options.callback(new Error('Error creating request: ' + error.message), null);
  }
};