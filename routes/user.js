exports.findAll = function(req, res) {
   res.send([{name:'Jonathan A. Diosa', email: 'jadiosa@gmail.com'},{name:'Fredy Miranda', email: 'f.mir17@gmail.com'}]);
};
 
exports.findById = function(req, res) {
    res.send([{id:req.params.id}]);
};