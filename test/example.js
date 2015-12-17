import 'babel-polyfill';

import should from 'should';
import request from 'superagent-bluebird-promise';

describe.only("Github Dog Search", function () {
  var target = '';

  before(async function () {
    try {
      target = await new Promise(function(resolve, reject) {
        setTimeout(function () {
          resolve('https://api.github.com/search/repositories');
        }, 200);
      });
    } catch (err) {
      console.log(err);
      throw(err);
    }
  });

  it("Should be able to get repositories", async function () {
    try {
      let res = await request.get(target)
        .query({q: 'dog'})
        .query({per_page: 3})
        .promise();
      let actual = res.body.items;
      actual.should.be.an.Array;
      actual.should.have.length(3);
    } catch (err) {
      throw(err);
    }
  });

});