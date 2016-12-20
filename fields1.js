function getTplHtml(id){
    var obj = document.getElementById(id);
    return obj.innerHTML;
}

//常规组件
formModule.directive("itextInput",function(){
    return {restrict:"E", template : getTplHtml("text-input-tpl")};
});


// 用户信息组件


/**********************组件设置****************************/
formModule.directive("noFieldEditor", function() {
    return {restrict: "E", template: getTplHtml("no-field-editor-tpl")};
});

formModule.directive("textInputEditor", function() {
    return {restrict:"E", template : getTplHtml("text-input-editor-tpl")};
});

/******************************************
 ***********  组件设置项 ***********************
 ******************************************/
formModule.directive("labelSetting", function() {
  return {restrict: "E", template: getTplHtml("label-setting-tpl")};
});
formModule.directive("placeholderSetting", function() {
    return {restrict: "E", template: getTplHtml("placeholder-setting-tpl")};
});
formModule.directive("validatorSetting", function(AppState) {
    return {
        restrict: "E",
        template: getTplHtml("validator-setting-tpl"),
        controller: function() {
            var validator = AppState.editField.fieldValidator;
            if(validator == undefined || validator.length == 0) {
                AppState.editField.fieldValidator = {};
            }
        },
        transclude: true
    };
});
formModule.directive("minValidator", function(AppState) {
    return {
        restrict: "E",
        require: '^validatorSetting',
        scope: true,
        template: getTplHtml("min-validator-tpl"),
        link: function(scope) {
            var field = AppState.editField;
            if(field && field.fieldValidator && field.fieldValidator.min) {
                scope.checked = true;
                scope.length = field.fieldValidator.min;
            }
            if(!(field && field.fieldValidator)) {
                field.fieldValidator = {};
            }
            scope.setIfChanged = function() {
                if(scope.checked == false) {
                    delete field.fieldValidator.min;
                } else if(scope.checked && scope.length) {
                    field.fieldValidator.min = parseInt(scope.length, 10);
                }
            }
        }
    }
});
formModule.directive("requiredValidator", function(AppState) {
    return {
        restrict: "E",
        require: '^validatorSetting',
        scope: true,
        template: getTplHtml("required-validator-tpl"),
        link: function(scope) {
            var field = AppState.editField;
            if(field && field.fieldValidator) {
                scope.required = field.fieldValidator.required;
            } else {
                field.fieldValidator = {};
            }
            scope.setIfChanged = function() {
                field.fieldValidator.required = scope.required;
            };
        }
    };
});
formModule.directive("inputHint", function($timeout) {
    return {
        restrict: 'A',
        require: '^ngModel',
        link: function(scope, element, attr, ngModel) {
            var holder = element.attr('input-hint');
            var setClass = function() {
                if(ngModel.$viewValue != holder) {
                    element.removeClass('input-hint');
                } else {
                    element.addClass('input-hint');
                }
            };
            $timeout(setClass);
            element.on('keyup', setClass);
            element.on('focus', function() {
                element.removeClass('input-hint');
                if(ngModel.$viewValue == holder) {
                    ngModel.$setViewValue('');
                    ngModel.$render();
                    scope.$apply();
                }
            });
            element.on('blur', function() {
                if(ngModel.$viewValue === '') {
                    ngModel.$setViewValue(holder);
                    ngModel.$render();
                    setClass();
                    scope.$apply();
                }
            });
        }
    };
});