var chai = require('chai');
var chaiHttp = require('chai-http')
var article = require('../app.js');
var sinon = require('sinon');
var supertest = require('supertest');
var should = chai.should;
var stub = sinon.stub();
var expect = chai.expect;
var assert = chai.assert;
var schema = require('../model/schema.js')

let findStub = sinon.stub(schema, 'find');
let addStub = sinon.stub(schema, 'post');
let updateStub = sinon.stub(schema, 'put');
let deleteStub = sinon.stub(schema, 'delete');
chai.use(chaiHttp);
var url = supertest('http://localhost:3030');
describe('article',()=>{
	 beforeEach((done)=>{
      findStub.yields(null, [{title: "TestTitle", author:"TestAuthor", article:"TestArticle"}]);
      addStub.withArgs([{title: "TestTitle", author:"TestAuthor", article:"TestArticle"}]);
      updateStub.withArgs([{_id: "59a776f39a6d003c8a697f92", author: "TestAuthorUpdate", article: "TestArticleUpdate"}]);
      deleteStub.withArgs([{title: "TestTitle"}]);
      done();
    });

  it('retrives article documents ', (done)=>{

    
		url
    .get('/article')
      .expect(200)
  		.end((err, res)=> {
  		expect(err).to.be.null;
  		expect(res).to.be.json;
  		expect(res.body).to.exist;
      expect(res.body.news[0].title).to.equal("TestTitle");
      expect(res.body.news[0].author).to.equal("TestAuthor");
      expect(res.body.news[0].article).to.equal("TestArticle");;
      done();
  });
	});	


	it('adds article documents ', (done)=>{

		url
    .post('/article')
    .expect(200)
  		.end((err, res) =>{
  		expect(err).to.be.null;
  		expect(res).to.be.json;
      expect(res.body.news[0]).to.not.equal(null);
      done();
  });                         
	});
	it('updates article documents ', (done)=>{
		url
    .put('/article')
    .expect(200)
  		.end(function(err, res) {
  		expect(err).to.be.null;
      expect(res.body.news.ok).to.equal(1);
      expect(res.body.news.nModified).to.equal(0);
      expect(res.body.news.n).to.equal(0);
  		done();
  });
	});	
	it('deletes article documents ', (done)=>{
		url
    .delete('/article')
    .expect(200)
  		.end(function(err, res) {
  		expect(err).to.be.null;
  		expect(res.body.news.ok).to.equal(1);
      expect(res.body.news.n).to.equal(1);
   		done();                            // <= Call done to signal callback end
  });
	});	

});