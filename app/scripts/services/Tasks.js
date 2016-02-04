(function() {
  function Tasks($firebaseArray) {

    var ref = new Firebase('https://brilliant-heat-9132.firebaseio.com');
    var tasks = $firebaseArray(ref);


    

    return {
      all: tasks,
    }
  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
