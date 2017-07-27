angular.module('Front').factory('httpInterceptor', function ($q, $location, $localStorage) {
  //console.log($location);
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($localStorage.userToken) {
        config.headers.Authorization = $localStorage.userToken;
      }
      return config;  //console.log("Request via Interceptor !!");
                      //console.log(config.url); // Contains the data about the request before it is sent.
                      //return config || $q.when(config); // Return the config or wrap it in a promise if blank.
    },
    requestError: function (rejection) {
      //console.log(rejection); // Contains the data about the error on the request.
      return $q.reject(rejection);  // Return the promise rejection.
    },
    response: function (response) {
      //console.log(response); // Contains the data from the response.
      return response || $q.when(response);  // Return the response or promise.
    },
    responseError: function (rejection) {
      if (rejection.status === 401  || rejection.status === 403) {
        delete $localStorage.userToken;
        delete $localStorage.loginUserName;
        delete $localStorage.userImage;
        $location.path('/login');
      }
      if (rejection.status === 404) {
        // Not found
        $location.path('/');
      }
      return $q.reject(rejection);  //                if (rejection.status === 0) {
                                    //                    console.log("No response from server !!"); // Contains the data about the error.
                                    //                }
                                    //                    if (rejection.status === 401 && (flag === 0)) {
                                    //                        $location.path('/401');
                                    //                    }
                                    //                return $q.reject(rejection); // Return the promise rejection.
    }
  };
});