const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

describe('driver controller' , ()=>{

    it.only('GET to api/drivers Find drivers in a location' , done =>{
        const seatleDriver = new Driver({

            email : 'seatle@test.com',
            geomtry : {type : 'Point' , coordinates : [-122.4759902, 47.6147628] }
        });

      const miamiDriver  =new Driver({
        email : 'miami@test.com' ,
        geomtry : {type : 'Point' , coordinates : [-80.253, 25.791] }

      })

      Promise.all([ seatleDriver.save() , miamiDriver.save() ])
            .then(()=>{
                request(app)
                    .get('/api/drivers?lng=-80&lat=25')
                    .end((err,res)=>{
                        console.log(res)
                        done();
                    })

            })

    });

 it('DELETE to api/drivers/id delete an existing driver' ,done =>{

    
      const driver = new Driver({email: 'DELETE@gmail.com' , driving : 'false'});
     driver.save() 
        .then(()=>{ 
            request(app)
                .delete('/api/drivers/'+driver._id)
                .end(()=>{
                    Driver.findOne({email:'DELETE@gmail.com'})
                     .then(
                         driver =>{
                         assert(driver == null);
                         done();
                     }) 
                })
                // done();
        });



 });


   it('PUT to api/drivers/id edits an existing driver' ,done =>{
 
      const driver = new Driver({email: 'PUT@gmail.com' , driving : 'false'});
      driver.save() 
        .then(()=>{ 
            request(app)
                .put('/api/drivers/'+driver._id)
                .send({driving:true})
                .end(()=>{
                    Driver.findOne({email:'PUT@gmail.com'})
                     .then(
                         driver =>{
                         assert(driver.driving === true);
                         done();
                     }) 
                })
                // done();
        });

   });





    it('POST to api/drivers to create a driver', done =>{
            Driver.count().then(count=>{
                request(app)
                .post('/api/drivers')
                .send({email : 'POST@gmail.com'})
                .end(()=>{

                       console.log(Driver.count())
                       Driver.count().then(newCount =>{
                           console.log(newCount)
                        assert(count+2 ===newCount);
                        done();  
                    })
                     
                })
          })
      done();

    });


});