
module.exports = function idInUse (){

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;

  return res.send(409, 'Id is already taken by another property.');
};
