
const Driver = require('../models/driver');

module.exports ={
        
        greeting(req,res){

                
                res.send({hi:'there'})
            } ,

            index(req,res,next){

                const {lng, lat} = req.query;
                
                Driver.geoNear(
                    {type : 'Point' , coordinates : [parseFloat(lng), parseFloat(lat)] },
                    {spherical : true, maxDistance : 200000}

                )
                .then(drivers => res.send(drivers))
                .catch(next);  
            },


        create(req, res,next){
            
            
            const driverProps = req.body;
            Driver.create(driverProps) 
               .then(driver => res.send(driver))
               .catch(next);

        },

    

    edit(req,res,next){
        const driverid = req.params.id;
        console.log('edit handler');
        console.log(driverid);
        const driverProps = req.body;
        console.log(driverProps);
        Driver.findByIdAndUpdate({_id : driverid}, driverProps)
            .then(() => Driver.findById({_id:driverid}))
            .then(driver => res.send(driver))
            .catch(next);
       
        /*Driver.findByIdAndUpdate({_id : driverid} , driverProps)
         .then(()=>Driver.findById({_id : driverid}))
         .catch(next);*/

    } ,

    delete(req,res,next){

        const driverid = req.params.id;
        Driver.findByIdAndRemove({_id : driverid})
            .then(driver => res.status(204).send(driver))
            .catch(next);

    }


};