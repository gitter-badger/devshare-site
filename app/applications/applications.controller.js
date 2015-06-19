angular.module('hypercube')
.controller('ApplicationsCtrl', ['$scope', '$http', 'applicationsService', function($scope, $http, applicationsService){
		$scope.data = {
			loading:true,
			error:null
		};
		console.log('ApplicationListController');
		applicationsService.get().then(function (applicationsList){
			$scope.data.loading = false;
			console.log('applications list loaded:', applicationsList);
			$scope.applications = applicationsList;
		}, function (err){
			console.error('Error loading applications', err);
			$scope.data.loading = false;
			$scope.data.error = err;
		});
		$scope.delete = function(ind){
			$scope.data.loading = true;
			var applicationId = $scope.applications[ind]._id;
			console.log('calling delete with id:', applicationId);
			applicationsService.delete(applicationId).then(function(response){
				console.log('application deleted successfully');
			}, function(err){
				console.error('Error loading applications', err);
				$scope.data.loading = false;
				$scope.data.error = err;
			});
		};
}])