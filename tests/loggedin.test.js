const { loggedIn } = require('./app');
const { expect } = require('chai');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');

describe('loggedIn', () => {
  it('should redirect to "/profile" if GLOBAL_AUTHENTICATION is set', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    req.session.GLOBAL_AUTHENTICATION = true;

    loggedIn(req, res, () => {});

    expect(res.statusCode).to.equal(302);
    expect(res._getRedirectUrl()).to.equal('/profile');
  });

  it('should call the next middleware if GLOBAL_AUTHENTICATION is not set', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = sinon.spy();

    loggedIn(req, res, next);

    expect(next.calledOnce).to.be.true;
  });

  it('should not redirect or call next middleware if GLOBAL_AUTHENTICATION is undefined', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = sinon.spy();

    loggedIn(req, res, next);

    expect(res.statusCode).to.not.equal(302);
    expect(res._getRedirectUrl()).to.not.equal('/profile');
    expect(next.called).to.be.false;
  });
});
