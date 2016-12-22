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
				case 'textArea':
					tplId = 'text-area-tpl';
					break;
				case 'numberInput':
					tplId = 'number-input-tpl';
					break;
				case 'select':
					tplId = 'select-tpl';
					break;
				case 'radio':
					tplId = 'radio-tpl';
					break;
				case 'checkbox':
					tplId = 'checkbox-tpl';
					break;
			}
			return tplId;
		}
	};
	return service;
}]);

previewModule.directive("fieldItem",function($compile){
    return {
        restrict:"E",
        scope: true,
        controller: 'previewController',
        compile : function(element, attrs){
            return function(scope, element, attrs) {
                var type = attrs.type;
                var directiveName = type.replace(/([a-z\d])([A-Z])/g, '$1-$2');
                var field = '<i' + directiveName + '></'+ directiveName +'>';
                element.html(field);
                $compile(element.contents())(scope);
            };
        }
    };
});

previewModule.controller('previewController', ['$scope','previewService', function ($scope,$previewService) {
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
	        },
	        {
	            "fieldId": 100,
	            "fieldType": "textArea",
	            "label": "asd",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true,
	                "min": 54
	            },
	            "placeholder": "scvvxcxcvxcv"
        	},
        	{
	            "fieldId": 101,
	            "fieldType": "numberInput",
	            "label": "数字输入框",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            },
	            "placeholder": ""
        	},
        	{
	            "fieldId": 103,
	            "fieldType": "select",
	            "label": "下拉菜单",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": false
	            },
	            "placeholder": "下拉菜单说明",
	            "fieldOptions": [
	                {
	                    "label": "选项1",
	                    "value": 1
	                },
	                {
	                    "label": "选项2",
	                    "value": 2
	                },
	                {
	                    "label": "选项3",
	                    "value": 3
	                }
	            ]
	        },
	        {
	            "fieldId": 101,
	            "fieldType": "radio",
	            "label": "未命名标题",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            },
	            "fieldOptions": [
	                {
	                    "label": "选项",
	                    "value": 1
	                },
	                {
	                    "label": "选项",
	                    "value": 2
	                }
	            ]
	        },
	        {
	            "fieldId": 102,
	            "fieldType": "checkbox",
	            "label": "多选框",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true,
	                "minSelect": 1,
	                "maxSelect": 3
	            },
	            "fieldOptions": [
	                {
	                    "label": "选项1",
	                    "value": 1
	                },
	                {
	                    "label": "选项3",
	                    "value": 3
	                },
	                {
	                    "label": "选项2",
	                    "value": 2
	                },
	                {
	                    "label": "其他",
	                    "value": -1
	                }
	            ]
	        }
		],
		title:'测试预览'
    };
    $scope.radioCheck = function(e){
    	var radios = $('.radio-item');
    	Array.prototype.slice.call(radios).forEach(function(item,index){
    		$(item).find('.radio-outside').removeClass('radio-checked');
    	});

    	angular.element(e.target).find('div').eq(0).addClass('radio-checked');
    },
    $scope.checkboxCheck = function(e){
    	if(angular.element(e.target).find('div').eq(0).hasClass('checkbox-checked')){
    		
    		angular.element(e.target).find('div').eq(0).removeClass('checkbox-checked')
    	}else{
    		angular.element(e.target).find('div').eq(0).addClass('checkbox-checked')
    	}
    }
}]);

/********************************组件模板*****************************************/
previewModule.directive("itextInput",function() {
    return {restrict:"E", template : getTplHtml("text-input-tpl")};
});
previewModule.directive('itextArea', [function () {
	return {restrict:"E", template : getTplHtml("text-area-tpl")};
}]);
previewModule.directive('inumberInput', [function () {
	return {restrict:"E", template : getTplHtml("number-input-tpl")};
}]);
previewModule.directive('iselect', [function () {
	return {restrict:"E", template : getTplHtml("select-tpl")};
}]);
previewModule.directive('iradio', [function () {
	return {restrict:"E", template : getTplHtml("radio-tpl")};
}]);
previewModule.directive("icheckbox", function() {
    return {restrict: "E", template: getTplHtml("checkbox-tpl")};
});


