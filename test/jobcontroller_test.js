'use strict';

const angular = require('angular');
require('angular-mocks');
require('../app/js/client.js');

describe('JobController Testing', () => {
  let jobctrl;
  let $httpBackend;

  beforeEach(() => {
    angular.mock.module('JobDash');
    angular.mock.inject(function($controller, _$httpBackend_, sortJobs){
      jobctrl = new $controller('JobController');
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should get a list of jobs and events', () => {
    let testJob = {_id:'1', title:'test', isToday:true};
    $httpBackend.expectGET('http://localhost:3000/jobs/active')
    .respond(200,[testJob]);
    $httpBackend.expectGET('http://localhost:3000/events/active')
    .respond(200, [{jobId:'1', note:'testEvent'}]);
    jobctrl.getActiveJobs();
    $httpBackend.flush();
    expect(jobctrl.jobs[0].title).toBe('test');
    expect(jobctrl.events[0].note).toBe('testEvent');
  });

  it('should post a job', () => {
    $httpBackend.expectPOST('http://localhost:3000/link')
    .respond(200, {title:'testing', company:'123'});
    jobctrl.getLink();
    $httpBackend.flush();
    expect(jobctrl.linkApiJob.title).toBe('testing');
  });

});
