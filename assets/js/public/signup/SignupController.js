angular.module('SignupModule').controller('SignupController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

	//atributo, compartamento inicial
	$scope.signupForm = {
		loading: false
	}


	$scope.submitSignupForm = function(){
		$scope.signupForm.loading = true;
		$http.post('/signup', {
			name: $scope.signupForm.name,
			title: $scope.signupForm.title,
			email: $scope.signupForm.email,
			password: $scope.signupForm.password,
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/user';
			console.log(sailsResponse);
		})
		.catch(function onError(sailsResponse){
			
			// Handle known error type(s).
			// If using sails-disk adpater -- Handle Duplicate Key
			var emailAddressAlreadyInUse = sailsResponse.status == 409;
			if (emailAddressAlreadyInUse) {
				toastr.error('That email address has already been taken, please try again.', 'Error');
				return;
			}
		})
		.finally(function eitherWay(){
			$scope.signupForm.loading = false;
		})
	}


}]);