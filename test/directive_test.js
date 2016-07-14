const angular = require('angular');
require('angular-mocks');
require('../app/js/client.js');

const backLog = require('../app/templates/job/backlog.html');

describe('directive unit testing', () => {
  let $httpBackend;
  let $scope;
  let $compile;
  beforeEach(() => {
    angular.mock.module('JobDash');
    angular.mock.inject(function(_$httpBackend_, $rootScope, _$compile_){
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $compile = _$compile_;
    });
  });
  it('should list and sort jobs, backlog job in second unordered list', () => {
    $httpBackend.expectGET('./templates/job/backlog.html')
    .respond(200, backLog);
    $scope.mode = 'list';
    $scope.backlog = {
      jobs:[{
        title:'test',
        company:'testC'
      }, {
        title:'test2'
      }]
    };
    $scope.today = {
      jobs:[{
        title:'testA'
      }, {
        title:'testB'
      }, {
        title:'testC'
      }]
    };
    let element = angular.element('<div><backlog-view backlog="backlog.jobs" today="today.jobs"></backlog-view></div>');
    element.data('$ngControllerController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let list = (directive.find('li'));
    let BackLog = directive.find(('ul'))[1];
    let bList = angular.element(BackLog);
    let backLi = bList.find('li');

    expect(backLi.length).toBe(2);
    expect(list.length).toBe(5);


  });
});
