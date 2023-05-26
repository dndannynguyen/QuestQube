const { recommenderAuthenticator } = require('./app');
const { expect } = require('chai');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');

describe('recommenderAuthenticator', () => {
  it('should redirect to "/initialRecommend" if count is null', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    req.session.count = null;

    recommenderAuthenticator(req, res, () => {});

    expect(res.statusCode).to.equal(302);
    expect(res._getRedirectUrl()).to.equal('/initialRecommend');
  });

  it('should call the next middleware if count is not null', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    req.session.count = 0;
    const next = sinon.spy();

    recommenderAuthenticator(req, res, next);

    expect(next.calledOnce).to.be.true;
  });

  it('should not redirect or call next middleware if count is undefined', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = sinon.spy();

    recommenderAuthenticator(req, res, next);

    expect(res.statusCode).to.not.equal(302);
    expect(res._getRedirectUrl()).to.not.equal('/initialRecommend');
    expect(next.called).to.be.false;
  });
});
