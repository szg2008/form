function getTplHtml(id){
    var obj = document.getElementById(id);
    return obj.innerHTML;
}
var previewModule = angular.module("preview",[]);
previewModule.service('previewService',['$rootScope',function($rootScope){
	var service = {
		getTplIdByType:function(type){
			var tplId = '';
			switch(type){
				case 'textInput':
					tplId = 'text-input-tpl';
					break;
			}
			return tplId;
		}
	};
	return service;
}]);

previewModule.controller('previewController', ['$scope','previewService', function ($scope,$previewService) {
	//初始化数据
	$scope.initData = {
		fields:[
			{
	            "fieldId": 101,
	            "fieldType": "textInput",
	            "label": "单行文本框",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true,
	                "min": 12
	            },
	            "placeholder": "单行"
	        }
		],
		title:'测试预览'
	};
	//根据生成的表单数据进行页面展示
	$scope.initData.fields.forEach(function(item,index){
		var tplId = $previewService.getTplIdByType(item.fieldType);
		var html = getTplHtml(tplId);
		document.querySelector('.form-fields').innerHTML += html;
	});
	
}]);

