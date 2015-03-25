var glintServices = angular.module('glint.services', []);

glintServices.factory('Ideas', function ($http){

  var getIdeas = function (){
    return $http({
      method: 'GET',
      url: '/api/ideas'
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('getIdeas error', error);
    });
  };

  var createIdea = function (idea){
    return $http({
      method: 'POST',
      url: '/api/ideas',
      data: idea
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('createIdeas error', error);
    });
  };

  return {
    getIdeas: getIdeas,
    createIdea: createIdea
  };
});

glintServices.factory('Votes', function($http){

  var upvote = function (idea){
    return $http({
      method: 'POST',
      url: '/api/vote/upvote',
      data: idea
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error) {
      console.error('upvote error', error);
    });
  };

  var downvote = function (idea){
    return $http({
      method: 'POST',
      url: '/api/vote/downvote',
      data: idea
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error) {
      console.error('downvote error', error);
    });
  };

  return {
    upvote: upvote,
    downvote: downvote
  };
});

glintServices.factory('Auth', function($http, $window, $location){

  var login = function (user){
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error) {
      console.error('login error', error);
    });  };

  var signup = function (user){
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error) {
      console.error('signup error', error);
    });
  };

  var getUser = function(){
    var storageString = $window.localStorage.getItem('com.glinted');
    if (!storageString) {
      return null;
    }
    return JSON.parse(storageString).data;
  };

  var logout = function(){
    $window.localStorage.removeItem('com.glinted');
    $location.path('/');
  };

  return {
    getUser: getUser,
    login: login,
    signup: signup,
    logout: logout
  };
});

glintServices.factory('Comments', function ($http){

  var createComment = function (comment){
    return $http({
      method: 'POST',
      url: '/api/comments',
      data: comment
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('createComments error', error);
    });

  };

  var getComments = function (idea_id){
    return $http({
      method: 'GET',
      url: '/api/comments',
      data: idea_id
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('getComments error', error);
    });
  };

  return {
    createComment: createComment,
    getComments: getComments
  };
});

