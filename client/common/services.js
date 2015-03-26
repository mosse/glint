var glintServices = angular.module('glint.services', []);

glintServices.factory('Ideas', function ($http){

  var getIdeas = function (query){
    return $http({
      method: 'GET',
      url: '/api/ideas',
      params: query
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

glintServices.factory('Auth', function($http, $window){

  var userString = $window.localStorage.getItem('com.glinted');
  if (userString === 'undefined' || userString === null) userString = JSON.stringify({data:null});

  var user = JSON.parse(userString).data;

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

  var update = function(){
    var data = {data: user};
    $window.localStorage.setItem('com.glinted', JSON.stringify(data));
  };

  var logout = function(){
    $window.localStorage.removeItem('com.glinted');
  };

  return {
    login: login,
    signup: signup,
    logout: logout,
    user: user,
    update: update
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
      params: {'idea_id':idea_id}
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

glintServices.factory('Markdown', function ($http){
  var render = function (markdown) {
    return $http({
      method: 'POST',
      url: '/api/markdown',
      data: {markdown: markdown},
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('renderMarkdown error', error);
    });
  };

  return {
    render: render
  };
});

glintServices.factory('Invites', function($http){

  var sendInvite = function (invite){
    return $http({
      method: 'POST',
      url: 'api/ideas/invite',
      data: invite
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error){
      console.error('invite error', error);
    });
  }
});

