const { userAuthenticator } = require('./app');
const { expect } = require('chai');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');

describe('userAuthenticator', () => {
  it('should redirect to "/login" if GLOBAL_AUTHENTICATION is not set', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    userAuthenticator(req, res, () => {});

    expect(res.statusCode).to.equal(302);
    expect(res._getRedirectUrl()).to.equal('/login');
  });

  it('should call the next middleware if GLOBAL_AUTHENTICATION is set', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    req.session.GLOBAL_AUTHENTICATION = true;
    const next = sinon.spy();

    userAuthenticator(req, res, next);

    expect(next.calledOnce).to.be.true;
  });

  it('should not redirect or call next middleware if GLOBAL_AUTHENTICATION is undefined', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = sinon.spy();

    userAuthenticator(req, res, next);

    expect(res.statusCode).to.equal(302);
    expect(res._getRedirectUrl()).to.equal('/login');
    expect(next.called).to.be.false;
  });
});
