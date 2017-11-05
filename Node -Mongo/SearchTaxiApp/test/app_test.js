const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const fs = require('fs');


describe('The express app' , ()=>{

    it('handles a GET request to /api ' , (done) =>{
        request(app)
        .get('/api')
        .end((err,response) => {
           
          console.log(response.body)
           assert(response.body.hi =='there')
          done();

        }) ;


    });

});