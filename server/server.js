
var restify = require('restify'), fs = require('fs');

var ip_addr = '127.0.0.1';
var port    =  '4567';
// --- The available food


var foodList = {

"food": [
    {
        "id": 4,
        "desc": "marguez"
    },
    {
        "id": 6,
        "desc": "porc"
    }
    ,
    {
        "id": 9,
        "desc": "chicken"
    },
    {
        "id": 2,
        "desc": "cervelas"
    }
]
}




var server = restify.createServer({
    name : "bbqserver"
});
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});


server.get({path : '/foodList.json' , version: '0.0.1'} , function(req, res, next){
        res.send(200,foodList);


});
server.post({path : '/joinBBQ' , version: '0.0.1'} ,function joinBBQ(req,res,next){


    console.log(req.params.loic);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.send(201, 'OK');
    return next();
//     jobs.save(job , function(err , success){
//
//         console.log('Response success '+success);
//         console.log('Response error '+err);
//         if(success){
//             res.send(201 , job);
//             return next();
//         }else{
//             return next(err);
//         }
//     });
});




// -- the people and the order
var participantsList;
fs.readFile('participantList.json', function (err, data) {
    if (err) throw err;
    participantsList = data;
});





/*
// -- return the available list of food
app.get('/foodList.json', function(req, res){
    res.send(foodList);
});

// -- return the current participant list
app.get('/participants.json', function(req, res){
    res.send(participantsList);
});

// --- post the data of a new joining the bbq
app.get('/joinBBQ.json?', function(req, res) {
    console.log(req.params);
       console.log(req.param['name']);
});


var server = app.listen(4567, function() {
    console.log('Listening on port %d', server.address().port);
});
*/