/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	/** Loga com conta de usuario **/
	signup: function(req,res){
		var Passwords = require('machinepack-passwords');

		// Encrypt a string using the BCrypt algorithm.
		Passwords.encryptPassword({
		password: req.param('password'),
		difficulty: 10
		}).exec({
			// An unexpected error occurred.
			error: function (err){
				return res.negotiatie(err);
			 
			},
			// OK.
			success: function (encryptedPassword){
				require('machinepack-gravatar').getImageUrl({
					emailAddress: req.param('email')
				}).exec({
					error: function(err){
						return res.negotiatie(err);
					},
					success: function(gravatarUrl){
						//cria um User com os parametros enviados através do form sign-up --> signup.ejs
						User.create({
							name: req.param('name'),
							title: req.param('title'),
							email: req.param('email'),
							encryptedPassword: encryptedPassword,
							lastLoggedIn: new Date(),
							gravatarUrl: gravatarUrl
						}, function userCreated(err, newUser){
							if (err){
								console.log ("err: ", err);
								console.log ("err.invalidAttributes: ", err.invalidAttributes);
								// If this is a uniqueness error about the email attribute,
				                // send back an easily parseable status code.
				                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
				                  && err.invalidAttributes.email[0].rule === 'unique') {
				                  return res.emailAddressInUse();
				                }

				                // Otherwise, send back something reasonable as our error response.
				                return res.negotiate(err);
           					}
							return res.json({
								id: newUser.id
							});
						});
					}
				})
			},
		});

	}
	
};

