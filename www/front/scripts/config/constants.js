var baseUrl = window.location.protocol + '//' + window.location.hostname;
angular.module('myApp.constants', []).constant('CONFIG', {
  appName: 'BeUp',
  appTitle: '...',
  limit: 20,
  offset: 0,
 // baseUrl: 'http://52.87.137.2:9090/',
    baseUrl: baseUrl + ':9090/',
  imageUrl: baseUrl + ':9090/',
  adminType:[
  {type: 'Admin'},
  {type: 'SubAdmin'}
  ],
  userType:[
    {type: 'Customer'},
    {type: 'Therapist'}

  ]

  
  
}).value('version', '1.0.0').constant('AUTH_EVENTS', {
  // Broadcast when user logs in successfully
  loginSuccess: 'auth-login-success',
  // Broadcast when user login fails
  loginFailed: 'auth-login-failed',
  // Broadcast when an authenticatedRoute is navigated to, and the user is not logged in - opens the signInModal
  notAuthenticated: 'auth-not-authenticated',
  //Broadcast when user is already authenticated and tried to access free route it would be navigated to dashboard page
  alreadyAuthenticated: 'auth-authenticated'
});
