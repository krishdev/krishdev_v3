var aboutMeCtrl = function ($scope, dataFactoryFn, postContact, $uibModal, fetchData) {
	dataFactoryFn.then(function (response) {
		$scope.abtMe = response.data.aboutMe;
		$scope.quickLinks = response.data.aboutMe.quickLinks;
		$scope.myProjects = response.data.myProjects.listOfProjects;
		$scope.myEducation = response.data.myEducation.Masters;
		$scope.mySkills = response.data.myEducation.keySkills;
		$scope.contactMeProd = response.data.contactMe.projectType;
		$scope.contactMeBudget = response.data.contactMe.budget;
		$scope.emailSuccessMessage = "Your message has been successfully emailed. You would get a reply in less than 24hrs";
		var currentYear = new Date();
		var currentDate = currentYear.getDate();
		if (currentDate < 10) {
			currentDate = '0' + currentDate;
		}
		var currentMonth = currentYear.getMonth() + 1;
		if (currentMonth < 10) {
			currentMonth = '0' + currentMonth;
		}
		currentYear = currentYear.getFullYear();
		$scope.copyYear = currentMonth + "/" + currentDate + "/" + currentYear;
	});
	fetchData.getData('https://api.github.com/users/krishdev', {})
		.then(function (response) {
			console.log(response);
		}, function errorCallBackFunction() {
			console.log("error on Git Fetch");
		});
	fetchData.getData('https://api.github.com/users/krishdev/repos', {})
		.then(function (response) {
			$scope.repos = response.data;
		});
	$scope.sendPost = function (isValid) {
		if (isValid) {


			var data = '{"inputUsername":"' + $scope.nameContact + '","inputEmail": "' + $scope.emailContact + '","inputContent":"' + $scope.contentContact + '","inputPhone":"' + $scope.phoneContact + '","inputProjectType":"' + $scope.projectType + '","inputBudget":"' + $scope.budgetContact + '"}';
			data = JSON.parse(data);

			postContact.postData(data).then(function (data) {
				console.log(data + ' Data');
				var modalInstance = $uibModal.open({
					backdrop: true,
					backdropClick: true,
					dialogFade: false,
					keyboard: true,
					templateUrl: 'modal.tpl.html',
					controller: 'ModalInstanceCtrl',
					resolve: {} // empty storage
				});

				modalInstance.result.then(function () {}, function () {

				});
			})
			$scope.nameContact = '';
			$scope.emailContact = '';
			$scope.contentContact = '';
			$scope.phoneContact = '';
			$scope.projectType = '';
			$scope.budgetContact = '';
		}
	};
};

mainModule.controller('aboutMeCtrl', ['$scope', 'dataFactory', 'postContact', '$uibModal', 'fetchData', aboutMeCtrl]);

mainModule.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
mainModule.controller('chatController', function ($scope, $timeout, postContact, $uibModal) {
	$scope.isChatOpen = false;
	$scope.toggleChat = function (event) {
		var eventName = $(event.target).hasClass("chat-close");
		$scope.isChatOpen = !$scope.isChatOpen;
		if ($scope.isChatOpen && eventName)
			angular.element($(".chat-box")).addClass("mobile-chat");
		else
			angular.element($(".chat-box")).removeClass("mobile-chat");
	};
	$scope.chatContent = "";
	$scope.sendPost = function (isValid) {
		if (isValid) {
			var data = '{"inputUsername":"Chat box","inputEmail": "Chat box","inputContent":"' + $scope.chatContent + '","inputPhone":"Chat box","inputProjectType":"Chat box","inputBudget":"Chat box"}';
			data = JSON.parse(data);

			postContact.postData(data).then(function (response) {
				$scope.chatContent = "";
				console.log(response.data);
			});
		}
	};
});
mainModule.directive('autoType', function () {
	return {
		restrict: 'E',
		template: '<div class="autoType"><span> |</span><div>',
		link: function (scope, iElements, attrs) {

		}
	};
});
