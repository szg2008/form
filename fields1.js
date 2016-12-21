function getTplHtml(id){
    var obj = document.getElementById(id);
    return obj.innerHTML;
}

//常规组件
formModule.directive("itextInput",function(){
    return {restrict:"E", template : getTplHtml("text-input-tpl")};
});
formModule.directive("itextArea",function(){
    return {restrict:"E", template : getTplHtml("text-area-tpl")};
});
formModule.directive("inumberInput", function() {
    return {restrict: "E", template: getTplHtml("number-input-tpl")};
});
formModule.directive("iselect", function() {
    return {restrict:"E", template : getTplHtml("select-tpl")};
});
formModule.directive("iradio", function() {
    return {restrict: "E", template: getTplHtml("radio-tpl")};
});
formModule.directive("icheckbox", function() {
    return {restrict: "E", template: getTplHtml("checkbox-tpl")};
});
formModule.directive("iimg", function() {
    return {restrict: "E", template: getTplHtml("img-tpl")};
});
formModule.directive("iimgList", function() {
    return {restrict: "E", template: getTplHtml("img-list-tpl")};
});
formModule.directive("idate", function() {
    return {restrict: "E", template: getTplHtml("date-tpl")};
});
formModule.directive("itime", function() {
    return {restrict: "E", template: getTplHtml("time-tpl")};
});
formModule.directive("iscore", function() {
    return {restrict: "E", template: getTplHtml("score-tpl")};
});
formModule.directive("isplitLine", function() {
    return {restrict: "E", template: getTplHtml("split-line-tpl")};
});

// 用户信息组件
formModule.directive("iname", function() {
    return {restrict: "E", template: getTplHtml("name-tpl")};
});
formModule.directive("iphone", function() {
    return {restrict: "E", template: getTplHtml("phone-tpl")};
});
formModule.directive("iaddress", function() {
    return {restrict: "E", template: getTplHtml("address-tpl")};
});
formModule.directive("iemail", function() {
    return {restrict: "E", template: getTplHtml("email-tpl")};
});
formModule.directive("ibirth", function() {
    return {restrict: "E", template: getTplHtml("birth-tpl")};
});
formModule.directive("ilocation", function() {
    return {restrict: "E", template: getTplHtml("location-tpl")};
});
formModule.directive("iqq", function() {
    return {restrict: "E", template: getTplHtml("qq-tpl")};
});
formModule.directive("igender", function() {
    return {restrict: "E", template: getTplHtml("gender-tpl")};
});

/**********************组件设置****************************/
formModule.directive("noFieldEditor", function() {
    return {restrict: "E", template: getTplHtml("no-field-editor-tpl")};
});
formModule.directive("textInputEditor", function() {
    return {restrict:"E", template : getTplHtml("text-input-editor-tpl")};
});
formModule.directive("textAreaEditor", function() {
    return {restrict:"E", template : getTplHtml("text-area-editor-tpl")};
});
formModule.directive("numberInputEditor", function() {
    return {restrict:"E", template : getTplHtml("number-input-editor-tpl")};
});
formModule.directive("selectEditor", function() {
    return {restrict:"E", template : getTplHtml("select-editor-tpl")};
});
formModule.directive("radioEditor", function() {
    return {restrict: "E", template: getTplHtml("radio-editor-tpl")};
});
formModule.directive("checkboxEditor", function() {
    return {restrict: "E", template: getTplHtml("checkbox-editor-tpl")};
});
formModule.directive("imgEditor", function() {
    return {restrict:"E", template : getTplHtml("img-editor-tpl")};
});
formModule.directive("imgListEditor", function() {
    return {restrict: "E", template: getTplHtml("img-list-editor-tpl")};
});
formModule.directive("dateEditor", function() {
    return {restrict: "E", template: getTplHtml("date-editor-tpl")};
});
formModule.directive("timeEditor", function() {
    return {restrict: "E", template: getTplHtml("time-editor-tpl")};
});
formModule.directive("scoreEditor", function() {
    return {restrict: "E", template: getTplHtml("score-editor-tpl")};
});
formModule.directive("splitLineEditor", function() {
    return {restrict: "E", template: getTplHtml("split-line-editor-tpl")};
});

formModule.directive("nameEditor", function() {
    return {restrict: "E", template: getTplHtml("name-editor-tpl")};
});
formModule.directive("phoneEditor", function() {
    return {restrict: "E", template: getTplHtml("phone-editor-tpl")};
});
formModule.directive("addressEditor", function() {
    return {restrict: "E", template: getTplHtml("address-editor-tpl")};
});
formModule.directive("emailEditor", function() {
    return {restrict: "E", template: getTplHtml("email-editor-tpl")};
});
formModule.directive("birthEditor", function() {
    return {restrict: "E", template: getTplHtml("birth-editor-tpl")};
});
formModule.directive("locationEditor", function() {
    return {restrict: "E", template: getTplHtml("location-editor-tpl")};
});
formModule.directive("qqEditor", function() {
    return {restrict: "E", template: getTplHtml("qq-editor-tpl")};
});
formModule.directive("genderEditor", function() {
    return {restrict: "E", template: getTplHtml("gender-editor-tpl")};
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
formModule.directive('rangeValidator', function(AppState) {
    return {
        restrict: 'E',
        template: getTplHtml('range-validator-tpl'),
        link: function(scope, element, attr) {
            scope.min = 1;
            scope.max = AppState.editField.fieldOptions.length;
            var validator = AppState.editField.fieldValidator;
            scope.validator = validator;
            scope.showMinSelect = scope.validator.minSelect != null;
            scope.showMaxSelect = scope.validator.maxSelect != null;
            scope.clearIfUncheck = function(checked) {
                if(!checked) {
                }
            };
        }
    };
});
formModule.filter('range', function() {
    return function(array, left, right) {
        array = array || [];
        for(var i = parseInt(left, 10); i <= parseInt(right, 10); i++) {
          array.push(i);
        }
        return array;
    };
});
formModule.directive("optionSetting", function(AppState) {
  return {
    restrict: "E",
    scope: {
        label: '@',
        enableOtherOption: '@'
    },
    controller: "OptionSettingCtrl",
    template: getTplHtml("option-setting-tpl"),
    link: function(scope) {
        if(scope.initOptions) {
            scope.initOptions();
        }
    }
  };
});
formModule.controller("OptionSettingCtrl", ["$scope", "AppState", function($scope, AppState) {
    var field = $scope.field = AppState.editField;
    if(!field.fieldOptions || field.fieldOptions.length == 0) {
        field.fieldOptions = [];
    }

    $scope.nextValue = function(opt) {
        var maxValue = 0;
        angular.forEach(field.fieldOptions, function(_opt, idx) {
            maxValue = _opt.value > maxValue ? _opt.value : maxValue;
        });
        return maxValue + 1;
    };

    $scope.addOption = function(opt) {
        var maxValue = $scope.nextValue();
        var insertIndex = 0;
        angular.forEach(field.fieldOptions, function(_opt, idx) {
            insertIndex = _opt.value == opt.value ? idx : insertIndex;
        });
        field.fieldOptions.splice(insertIndex + 1, 0, {label: "选项", value: $scope.nextValue()});
        $scope.$parent.resize(false);
    };

    $scope.deleteOption = function(opt) {
        if(field.fieldOptions.length <= 1) {
            return;
        }
        var removeIndex;
        angular.forEach(field.fieldOptions, function(_opt, idx) {
            removeIndex = _opt.value == opt.value ? idx : removeIndex;
        });
        if(removeIndex !== undefined) {
            field.fieldOptions.splice(removeIndex, 1);
        }
        $scope.initOptions();
    };
    $scope.append = function(opt) {
        field.fieldOptions.push(opt);
        $scope.$parent.resize(false);
    };
    $scope.appendNew = function() {
        $scope.append({label: "选项", value: $scope.nextValue()});
    };
    $scope.appendOtherOption = function() {
        if(!$scope.alreadyHaveOther) {
            $scope.append({label: '其他', value: -1});
            $scope.alreadyHaveOther = true;
        }
    };
    $scope.initOptions = function(opt) {
        if(field.fieldOptions && field.fieldOptions.length === 0) {
            $scope.appendNew();
            $scope.appendNew();
        }
        var alreadyHaveOther = false;
        angular.forEach(field.fieldOptions, function(opt) {
            if(opt.value == -1) {
                alreadyHaveOther = true;
            }
        });
        $scope.alreadyHaveOther = alreadyHaveOther;
    };
    $scope.removePlaceHolder = function(opt) {
        if(opt.label == '选项')
            opt.label = '';
    };
    $scope.restorePlaceHodler = function(opt) {
        if(opt.label === undefined || opt.label === "") {
            opt.label = "选项";
        }
    };
}]);
formModule.directive("patternSetting", function(AppState) {
  return {
    restrict: "E",
    scope: {
        label: '@',
        enableOtherOption: '@'
    },
    controller: "OptionSettingCtrl",
    template: getTplHtml("pattern-setting-tpl"),
    link: function(scope) {
      
    }
  };
});
formModule.directive("imgOptionSetting", function(AppState) {
    return {
        restrict: "E",
        scope: {
            label: '@'
        },
        controller: "OptionSettingCtrl",
        template: getTplHtml("img-option-setting-tpl"),
        link: function(scope,ele) {
            if(scope.initOptions) {
                scope.initOptions();
            }
            scope.onFileUploaded = function(rs) {
                if(rs.status == "success") {
                    var path = rs.result[0].savepath;
                    var name = rs.result[0].savename;
                    scope.append({img: _hook.resource + '/' + path + '/' + name, label: '选项', value: scope.nextValue()});
                }else{
                    alert("图片上传失败");
                }
            };
            setTimeout(function(){
                var imgList = $(ele).find("a.pic-uploader");
                $("form").remove();
                //上传图片的逻辑
                imgList.each(function(){
                    var trigger = $(this);
                    var index = trigger.data("index");
                    var uploader = new Uploader({
                        trigger: trigger,
                        name: 'imgList-'+index,
                        action: '/member/form/upload',//上传图片
                        accept: 'image/png,image/gif,image/jpeg,image/jpg',
                        change: function(files){
                            uploader.submit();
                        },
                        success: function(response){
                            var jsonData = $.parseJSON(response);
                            var picUrl,picSavePath,picSaveName,picObj ;
                            if(jsonData['status'] == 'success'){
                                picSavePath = jsonData['result'][0]['savepath'];
                                picSaveName = jsonData['result'][0]['savename'];
                                picUrl = picSavePath + picSaveName;
                                picObj = '<img src="'+_hook.resource+'/'+picUrl+'" height="50" width="50" />';
                                trigger.html(picObj).addClass("set").removeClass("uploading");
                                uploadFinishAct(trigger);
                                scope.field.fieldOptions[index]['img'] = _hook.resource+'/'+picUrl;
                                scope.$apply();
                            }else{
                                alert(jsonData['result']);
                                uploadFinishAct(trigger,false);
                            }
                        },
                        error: function(){
                            alert('上传的文件过大或系统异常');
                            uploadFinishAct(trigger,false);
                        },
                        progress: function(event, position, total, percent, files) {
                            renderUploadProgress(percent,trigger);
                        }
                    });
                    var inputSelector = 'input[name="imgList-'+index+'"]';
                    $(inputSelector).parents('form').data('target','imgOption-'+index);
                });
            });
            var renderUploadProgress = function(percent,trigger){
                if(trigger.find(".ui-upload-load").length < 1) {
                    var html = $('<span class="ui-upload-load"></span>');
                    html.append('<span class="status">上传中</span><br />');
                    html.append('<span class="prg"><span class="percent">'+percent+'</span>% </span>');
                    html.append('<em class="bar" style="width:'+percent+'%;"></em>');
                    trigger.append(html).addClass("uploading");
                }
            }
            var uploadFinishAct = function(trigger,isDelayed){
                var container = trigger;
                var delayTime = isDelayed !== false ? 500 : 0;
                setTimeout(function(){
                    container.removeClass("uploading").find(".ui-upload-load").remove();
                },delayTime);
            }
        }
    };
});
formModule.directive( 'checkGroup', function($timeout) {
    return {
        require: 'ngModel',
        restrict: 'E',
        template: getTplHtml('check-group-tpl'),
        scope: {
        },
        link: function(scope, element, attrs, ngModel) {
            $timeout(function() {
                scope.checkedValue = ngModel.$modelValue;
            });
            var arr = angular.fromJson(attrs.options);
            var options = [];
            for (var i = 0; i <= arr.length / 2; i += 2) {
                options.push({label: arr[i], value: arr[i + 1]});
            }
            scope.options = options;

            scope.setOption = function(optionValue) {
                scope.checkedValue = optionValue;
                ngModel.$setViewValue(optionValue);
            };
        }
    };
});
formModule.directive("alignSetting", function() {
    return {restrict: "E", template: getTplHtml("align-setting-tpl")};
});
formModule.directive('locationSetting', function() {
    return {restrict: 'E', template: getTplHtml("location-setting-tpl")};
});
