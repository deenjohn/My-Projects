
const DriverController = require('../controllers/driver_controller');

module.exports = (app)=>{
    app.post('/api/drivers' , DriverController.create);
    
    app.get('/api' ,DriverController.greeting );

    app.put('/api/drivers/:id',DriverController.edit );

    app.delete('/api/drivers/:id' , DriverController.delete );

    app.get('/api/drivers' ,DriverController.index);

    //run the function DriverController.greeting when request comes for 'api'
    /*app.post('/', function (req, res) {
        
       res.send('Got a POST request')
     })
*/
}