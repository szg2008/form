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
				case 'img':
					tplId = 'img-tpl';
					break;
				case 'imgList':
					tplId = 'img-list-tpl';
					break;
				case 'date':
					tplId = 'date-tpl';
					break;
				case 'time':
					tplId = 'time-tpl';
					break;
				case 'score':
					tplId = 'score-tpl';
					break;
				case 'splitLine':
					tplId = 'split-line-tpl';
					break;
				case 'name':
					tplId = 'name-tpl';
					break;
				case 'phone':
					tplId = 'phone-tpl';
					break;
				case 'address':
					tplId = 'address-tpl';
					break;
				case 'email':
					tplId = 'email-tpl';
					break;
				case 'birth':
					tplId = 'birth-tpl';
					break;
				case 'location':
					tplId = 'location-tpl';
					break;
				case 'qq':
					tplId = 'qq-tpl';
					break;
				case 'gender':
					tplId = 'gender-tpl';
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
	        },
	        {
			    "fieldId": 102,
			    "fieldType": "img",
			    "label": "图片单选",
			    "fieldRules": [],
			    "fieldValidator": {
			        "required": true
			    },
			    "fieldOptions": [
			        {
			            "label": "选项1",
			            "value": 1,
			            "img": "http://sns-img.b0.upaiyun.com/dunzd/1612/2115/27/14898491419111482305260.jpg",
			            "desc":{"status":true,"text":"这是大图1"}
			        },
			        {
			            "label": "选项2",
			            "value": 2,
			            "img": "http://sns-img.b0.upaiyun.com/dunzd/1609/1308/43/148101713480261473727417.jpg",
			            "desc":{"status":false,"text":"这是大图2"}
			        }
			    ],
			    "fieldPattern": {
			        "size": "large",//normal,large
			        "shape": "square"//vertical,rectangle,square
			    }
			},
			{
			    "fieldId": 103,
			    "fieldType": "imgList",
			    "label": "图片多选",
			    "fieldRules": [],
			    "fieldValidator": {
			        "required": true,
			        "minSelect": 1,
			        "maxSelect": 1
			    },
			    "fieldOptions": [
			        {
			            "label": "选项1",
			            "value": 1,
			            "img":'http://sns-img.b0.upaiyun.com/dunzd/1611/1118/00/148445145316511478858402.jpg'
			        },
			        {
			            "label": "选项2",
			            "value": 2,
			            "img":'http://sns-img.b0.upaiyun.com/dunzd/1609/0510/09/147779287221741473041385.jpg',
			            "desc": {
			                "status": true,
			                "text": "zxczxc"
			            }
			        }
			    ],
			    "fieldPattern": {
			        "size": "large"
			    }
			},
			{
	            "fieldId": 105,
	            "fieldType": "date",
	            "label": "日期",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            },
	            "placeholder": ""
	        },
	        {
	            "fieldId": 107,
	            "fieldType": "time",
	            "label": "时间",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            },
	            "placeholder": ""
	        },
	        {
	            "fieldId": 109,
	            "fieldType": "score",
	            "label": "评分",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            },
	            "placeholder": ""
	        },
	        {
	            "fieldId": 111,
	            "fieldType": "splitLine",
	            "label": "分隔符",
	            "fieldRules": [],
	            "fieldValidator": {},
	            "align": "center"
	        },
	        {
	            "fieldId": 113,
	            "fieldType": "name",
	            "label": "姓名",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            }
	        },
	        {
	            "fieldId": 115,
	            "fieldType": "phone",
	            "label": "手机",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true,
	                "mustLength": 11
	            }
	        },
	        {
	            "fieldId": 101,
	            "fieldType": "address",
	            "label": "地址",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            },
	            "hide": {
	                "country": true,
	                "province": true,
	                "city": true,
	                "county": true,
	                "detail": true
	            },
	            "default": {
	                "country": "中国",
	                "province":"北京",
	                "city":"北京",
	                "county":"海淀",
	                "detail":"中航广场"
	            }
	        },
	        {
	            "fieldId": 103,
	            "fieldType": "email",
	            "label": "邮箱",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            }
	        },
	        {
	            "fieldId": 103,
	            "fieldType": "birth",
	            "label": "出生年月",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            }
	        },
	        {
	            "fieldId": 105,
	            "fieldType": "location",
	            "label": "地区",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            }
	        },
	        {
	            "fieldId": 107,
	            "fieldType": "qq",
	            "label": "QQ",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            }
	        },
	        {
	            "fieldId": 108,
	            "fieldType": "gender",
	            "label": "性别",
	            "fieldRules": [],
	            "fieldValidator": {
	                "required": true
	            },
	            "fieldOptions": [
	                {
	                    "label": "男",
	                    "value": 1
	                },
	                {
	                    "label": "女",
	                    "value": 2
	                }
	            ]
	        }
		],
		title:'测试预览'
    };
    $scope.radioCheck = function(e,str){
    	var radios = $('.'+str);
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
    },
    $scope.scoreLight = function(e,obj){
    	var spans = $('.ui-score span');
    	if(e.target.tagName.toLowerCase() == 'span'){
    		var index = angular.element(e.target).attr('data-index');
    		Array.prototype.slice.call(spans).forEach(function(item,key){
    			if($(item).data('index') <= index){
    				$(item).addClass('selected');
    			}else{
    				$(item).removeClass('selected');
    			}
    		});
    	}
    },
    $scope.genderCheck = function(e){
    	var genderlist = $('.gender-list .gender-item');
    	Array.prototype.slice.call(genderlist).forEach(function(item,index){
    		$(item).removeClass('selected');
    	});
    	angular.element(e.target).addClass('selected');
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
previewModule.directive("iimg",function(){
	return {restrict: "E", template: getTplHtml('img-tpl')}
});
previewModule.directive("iimgList",function(){
	return {restrict: "E", template: getTplHtml('img-list-tpl')}
});
previewModule.directive("idate",function(){
	return {restrict: "E", template: getTplHtml('date-tpl')}
});
previewModule.directive("itime",function(){
	return {restrict: "E", template: getTplHtml('time-tpl')}
});
previewModule.directive("iscore",function(){
	return {restrict: "E", template: getTplHtml('score-tpl')}
});
previewModule.directive("isplitLine",function(){
	return {restrict: "E", template: getTplHtml('split-line-tpl')}
});
previewModule.directive("iname",function(){
	return {restrict: "E", template: getTplHtml('name-tpl')}
});
previewModule.directive("iphone",function(){
	return {restrict: "E", template: getTplHtml('phone-tpl')}
});
previewModule.directive("iaddress",function(){
	return {restrict: "E", template: getTplHtml('address-tpl')}
});
previewModule.directive("iemail",function(){
	return {restrict: "E", template: getTplHtml('email-tpl')}
});
previewModule.directive("ibirth",function(){
	return {restrict: "E", template: getTplHtml('birth-tpl')}
});
previewModule.directive("ilocation",function(){
	return {restrict: "E", template: getTplHtml('location-tpl')}
});
previewModule.directive("iqq",function(){
	return {restrict: "E", template: getTplHtml('qq-tpl')}
});
previewModule.directive("igender",function(){
	return {restrict: "E", template: getTplHtml('gender-tpl')}
});
