'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const User = require('./../../../app/models/user');
const faker = require('faker');
faker.locale = 'en';
chai.use(chaiHttp);
const should = chai.should;


describe('Signup Authentication', () => {
  it('verifies that signup fails for incomplete details', (done) => {
    const user = {
      name: faker.name.findName(),
      email: '',
      username: faker.internet.userName(),
      password: faker.internet.password(),
      avatar: ''
    };

    chai.request(server)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body
          .should.have.property('message')
          .eql('Email, Username & Password and Name required');
        res.should.have.status(400);
        done();
      });
  });


  it('verifies password has a length of at least 8 characters', (done) => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 'five',
      avatar: 'avatar10'
    };

    chai.request(server)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body
          .should.have.property('message')
          .eql('Email, Username & Password and Name required');
        res.should.have.status(400);
        done();
      });
  });


  it('verifies that signup is sucessful', (done) => {
    const user = {
      name: faker.name.findName(),
      email: 'signup@yahoo.com',
      username: 'signup',
      password: faker.internet.password(),
      avatar: 'avatar015'
    };

    chai.request(server)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body
          .should.have.property('message').eql('Thank you for signing up!');
        res.body.should.have.property('token');
        res.should.have.status(201);
        done();
      });
  });

  it('ensures a user can not sign up twice with the same email', (done) => {
    const user = {
      name: faker.name.findName(),
      email: 'signup@yahoo.com',
      username: 'testEmail',
      password: faker.internet.password(),
      avatar: 'avatar019'
    };

    chai.request(server)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body
          .should.have.property('message').eql('This email already exists!');
        res.should.have.status(409);
        done();
      });
  });

  it('ensures a user can not sign up twice with the same username', (done) => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      username: 'signup',
      password: faker.internet.password(),
      avatar: 'avatar085'
    };

    chai.request(server)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body
          .should.have.property('message').eql('This username already exists!');
        res.should.have.status(409);
        done();
      });
  });
});