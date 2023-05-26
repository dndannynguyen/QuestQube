const { expect } = require('chai');
const sinon = require('sinon');
const { getProfilePic } = require('./app');

describe('getProfilePic', () => {
  let b2AuthorizeStub;
  let b2GetBucketStub;

  beforeEach(() => {
    b2AuthorizeStub = sinon.stub(b2, 'authorize');
    b2GetBucketStub = sinon.stub(b2, 'getBucket');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return the profile picture URL if authorization and bucket retrieval are successful', async () => {
    const email = 'test@example.com';
    const backblazeName = 'your-bucket-name';
    const profilePicFileName = `${email}/Profile_Picture.jpg`;
    const expectedProfilePicUrl = `https://s3.us-east-005.backblazeb2.com/${backblazeName}/${profilePicFileName}?${Date.now()}`;

    b2AuthorizeStub.resolves();
    b2GetBucketStub.resolves({ bucketName: backblazeName });

    const profilePicUrl = await getProfilePic(email);

    expect(profilePicUrl).to.equal(expectedProfilePicUrl);
    expect(b2AuthorizeStub.calledOnce).to.be.true;
    expect(b2GetBucketStub.calledOnce).to.be.true;
    expect(b2GetBucketStub.calledWith({ bucketName: backblazeName })).to.be.true;
  });

  it('should return null if there is an error connecting to Backblaze', async () => {
    const email = 'test@example.com';

    b2AuthorizeStub.rejects(new Error('Authorization failed'));

    const profilePicUrl = await getProfilePic(email);

    expect(profilePicUrl).to.be.null;
    expect(b2AuthorizeStub.calledOnce).to.be.true;
    expect(b2GetBucketStub.called).to.be.false;
  });
});
