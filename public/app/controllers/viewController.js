var aboutMeCtrl = function ($scope, dataFactoryFn, postContact, $uibModal, fetchData, $timeout) {
	$scope.showMessage = false;
	dataFactoryFn.then(function (response) {
		$scope.abtMe = response.data.aboutMe;
		$scope.quickLinks = response.data.aboutMe.quickLinks;
		$scope.myProjects = response.data.myProjects.listOfProjects;
		$scope.myEducation = response.data.myEducation.Masters;
		$scope.mySkills = response.data.myEducation.keySkills;
		$scope.contactMeProd = response.data.contactMe.projectType;
		$scope.contactMeBudget = response.data.contactMe.budget;
		$scope.emailSuccessMessage = "Your message has been successfully emailed. You would get a reply in less than 24hrs";
		var successMessageDefault = "I reply in less than 24 hrs.";
		$scope.successMessage = successMessageDefault;
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
		var _this = this;
		if (isValid.$valid) {
			var thisDate = new Date();
			$scope.messageData = {
				fromEmailId: "krishnakumar4315@gmail.com",
				toEmailId:'mailkrishna2@gmail.com',
				subject: "Krishdev.com has a message from "+$scope.nameContact ,
				emailBody: '<table border=0 cellpadding=0 cellspacing=0 width=100% bgcolor=#1e1e1e><tr style=background:#fff!important><td align=center valign=top><table border=0 cellpadding=0 cellspacing=0 width=100% bgcolor=#161616><tr></table><table border=0 cellpadding=0 cellspacing=0 width=600 class=mobile-shell><tr><td style="padding:5em 0 0">Hi Krish,<tr><td><div>' 
				+ $scope.contentContact + '</div><tr><td style="padding:1em 0"><b>Email: </b>' 
				+ $scope.emailContact + '<tr><td style="padding:0 0 1em"><b>Phone: </b>' 
				+ $scope.phoneContact + '<tr><td><b>Thanks, </b>' + $scope.nameContact + '</table></table>'
			};
			var data = JSON.parse(JSON.stringify($scope.messageData));	     				
			postContact.postData(data).then(function (response) {
				$scope.successMessage = "Thank you. Your message has been sent. I will reply asap.";
				$scope.showMessage = true;
				$timeout(function () {
					$scope.showMessage = false;
				}, 3500);
				isValid.$setUntouched();
			}, function errorCallBack() {			     				
				$scope.successMessage = "Sorry Something went wrong! Please email to mailkrishna2@gmail.com";
				$scope.showMessage = true;
				$timeout(function () {
					$scope.showMessage = false;
				}, 3500);
				isValid.$setUntouched();
			});
			$scope.nameContact = '';
			$scope.emailContact = '';
			$scope.contentContact = '';
			$scope.phoneContact = '';
			$scope.projectType = '';
			$scope.budgetContact = '';

			//reset validation form
			$scope.index.$setPristine();
			$scope.index.$setUntouched();
			$scope.index.$submitted = false;
		}
	};
};

mainModule.controller('aboutMeCtrl', ['$scope', 'dataFactory', 'postContact', '$uibModal', 'fetchData', '$timeout', aboutMeCtrl]);

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
