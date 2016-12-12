var uploadToken = true;
window.floatTips = function(type,text,container,isMask,isDismiss){
  var tipHtml = '<div class="ui-float-tips tip-'+type+'">';
  tipHtml += '<div class="tips-wrap">';
  if(type=='wait'){
    tipHtml += '<img src="http://static.drip.im/img/common/single/loading-mini.gif" /> '+text;
  }else{
    tipHtml += '<em></em> '+text;
  }
  tipHtml += '</div>';
  tipHtml += '</div>';
  if(isMask){
    tipHtml += '<div class="ui-float-tips-mask"></div>';
  }
  container = typeof container == 'string'?$(container):container;
  container.css({position:"relative"});
  container.append(tipHtml).find(".ui-float-tips").animate({marginTop:"-30px",display:"block"},300);
  if(isDismiss!==false){
    setTimeout(function(){
    container.find(".ui-float-tips").remove();
    container.find(".ui-float-tips-mask").remove();
    },800);
  }
};
$(document).on("mouseover","form",function(){
  var target = ".pic-uploader."+$(this).data("target");
  if($(target).find("img").length == 1){
    $(target).append('<span class="reupload ui-upload-load">重选</span>');
  }
});
$(document).on("mouseleave","form",function(){
  var target = ".pic-uploader."+$(this).data("target");
  $(target).find(".reupload").remove();
});
function getTplHtml(id){
  var obj = document.getElementById(id);
  return obj.innerHTML;
}

function strByteLen(str) {
  var i,sum;
  sum=0;
  for(i=0;i<str.length;i++) {
    if ((str.charCodeAt(i)>=0) && (str.charCodeAt(i)<=255)) {
      sum=sum+1;
    } else {
      sum=sum+2;
    }
  }
  return sum;
}

formModule.directive("itextInput",function(){
  return {restrict:"E", template : getTplHtml("text-input-tpl")};
});
formModule.directive("itextArea",function(){
  return {restrict:"E", template : getTplHtml("text-area-tpl")};
});
formModule.directive("iselect", function() {
  return {restrict:"E", template : getTplHtml("select-tpl")};
});
formModule.directive("iimg", function() {
  return {restrict: "E", template: getTplHtml("img-tpl")};
});
formModule.directive("inumberInput", function() {
  return {restrict: "E", template: getTplHtml("number-input-tpl")};
});
formModule.directive("icheckbox", function() {
  return {restrict: "E", template: getTplHtml("checkbox-tpl")};
});
formModule.directive("iradio", function() {
  return {restrict: "E", template: getTplHtml("radio-tpl")};
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
formModule.directive("ifile", function() {
  return {restrict: "E", template: getTplHtml("file-tpl")};
});
formModule.directive("irichText", function() {
  return {restrict: "E", template: getTplHtml("rich-text-tpl")};
});
formModule.directive("isplitLine", function() {
  return {restrict: "E", template: getTplHtml("split-line-tpl")};
});
formModule.directive("igoods", function() {
  return {restrict: "E", template: getTplHtml("goods-tpl")};
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

/**********************设置****************************/
formModule.directive("textInputEditor", function() {
  return {restrict:"E", template : getTplHtml("text-input-editor-tpl")};
});
formModule.directive("textAreaEditor", function() {
  return {restrict:"E", template : getTplHtml("text-area-editor-tpl")};
});
formModule.directive("selectEditor", function() {
  return {restrict:"E", template : getTplHtml("select-editor-tpl")};
});
formModule.directive("imgEditor", function() {
  return {restrict:"E", template : getTplHtml("img-editor-tpl")};
});
formModule.directive("numberInputEditor", function() {
  return {restrict:"E", template : getTplHtml("number-input-editor-tpl")};
});
formModule.directive("checkboxEditor", function() {
  return {restrict: "E", template: getTplHtml("checkbox-editor-tpl")};
});
formModule.directive("radioEditor", function() {
  return {restrict: "E", template: getTplHtml("radio-editor-tpl")};
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
formModule.directive("fileEditor", function() {
  return {restrict: "E", template: getTplHtml("file-editor-tpl")};
});
formModule.directive("richTextEditor", function() {
  return {restrict: "E", template: getTplHtml("rich-text-editor-tpl")};
});
formModule.directive("splitLineEditor", function() {
  return {restrict: "E", template: getTplHtml("split-line-editor-tpl")};
});
formModule.directive("goodsEditor", function() {
  return {restrict: "E", template: getTplHtml("goods-editor-tpl")};
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

formModule.directive("noFieldEditor", function() {
  return {restrict: "E", template: getTplHtml("no-field-editor-tpl")};
});

/******************************************
 ***********  设置项 ***********************
 ******************************************/
formModule.directive("labelSetting", function() {
  return {restrict: "E", template: getTplHtml("label-setting-tpl")};
});
formModule.directive("goodsSetting", function() {
  return {restrict: "E", template: getTplHtml("goods-setting-tpl"),controller: "GoodsSettingCtrl",};
});
formModule.directive("richTextContentSetting", function() {
  return {restrict: "E", template: getTplHtml("rich-text-content-setting-tpl")};
});
formModule.directive("alignSetting", function() {
  return {restrict: "E", template: getTplHtml("align-setting-tpl")};
});
formModule.directive("placeholderSetting", function() {
  return {restrict: "E", template: getTplHtml("placeholder-setting-tpl")};
});

formModule.directive("uploadLimit", function() {
  return {restrict: "E", template: getTplHtml("upload-limit-tpl")};
});

// formModule.directive('tagSetting', function() {
//   return {restrict: 'E', template: getTplHtml("tag-setting-tpl")};
// });

formModule.directive("syncSetting", function() {
  return {
    restrict: "E",
    template: getTplHtml("sync-setting-tpl"),
    link: function(scope) {
      scope.defaultShow = function() {
        var editField = scope.state.editField;
        if(editField.sync && editField.sync.enable && editField.sync.show === undefined) {
          editField.sync.show = true;
        }
      };
    }
  };
});

formModule.directive('locationSetting', function() {
  return {restrict: 'E', template: getTplHtml("location-setting-tpl")};
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
    if(!uploadToken){
      alert('请先等待图片上传完成');
      return;
    }
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
      // scope.field = AppState.editField;
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
        } else {
          alert("图片上传失败");
        }
      };
      uploadToken = true;
      setTimeout(function(){
        var imgList = $(ele).find("a.pic-uploader");
        $("form").remove();
        imgList.each(function(){
          var trigger = $(this);
          var index = trigger.data("index");
          var uploader = new Uploader({
              trigger: trigger,
              name: 'imgList-'+index,
              action: '/member/form/upload',
              accept: 'image/png,image/gif,image/jpeg,image/jpg',
              change: function(files){
                uploader.submit();
              },
              success: function(response){
                uploadToken = true;
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
                uploadToken = false;
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

formModule.directive("uploader", function($http) {
  return {
    restrict: "E",
    scope: {
      url: "@"
    },
    template: getTplHtml("file-upload-tpl"),
    controller: function($scope) {
      $scope.triggerUpload = function(e) {
        var file = angular.element(e).find('input')[0];
        file.click();
      };
      $scope.upload = function(e) {
        var file = angular.element(e).find('input')[0];
        var fd = new FormData();
        fd.append('file', file.files[0]);
        $http.post($scope.url, fd ,{
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).success(function(rs) {
          if(angular.isFunction($scope.$parent.onFileUploaded)) {
            $scope.$parent.onFileUploaded(rs);
          }
        });
      };
    }
  };
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

formModule.directive("lengthValidator", function(AppState) {
  return {
    restrict: "E",
    require: '^validatorSetting',
    scope: true,
    template: getTplHtml("length-validator-tpl"),
    link: function(scope) {
      var field = AppState.editField;
      if(field && field.fieldValidator && field.fieldValidator.mustLength) {
        scope.checked = true;
        scope.mustLength = field.fieldValidator.mustLength;
      }
      if(!(field && field.fieldValidator)) {
        field.fieldValidator = {};
      }
      scope.setIfChanged = function() {
        if(scope.checked == false) {
          delete field.fieldValidator.mustLength;
        } else if(scope.checked && scope.mustLength) {
          field.fieldValidator.mustLength = parseInt(scope.mustLength, 10);
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

formModule.directive('smart-max-length', function() {
  return {
    restrict: 'A',
    require: '^ngModel',
    scope: {
      maxLength: '@'
    },
    link: function(scope, element, attr, ngModel) {
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

formModule.directive('toggle', function($timeout) {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: {},
    template: getTplHtml('toggle-tpl'),
    link: function(scope, element, attr, ngModel) {
      $timeout(function() {
        scope.on = ngModel.$modelValue;
      });
      var onValue = attr.onValue || true;
      var offValue = attr.offValue || false;
      var disabled = scope.$eval(attr.ngDisabled || 'false');
      scope.disabled = disabled;
      scope.$watch(function() {
        return ngModel.$modelValue;
      },function() {
        scope.on = (ngModel.$modelValue == onValue);
      });
      scope.on = ngModel.$viewValue == onValue;
      element.on('click', function() {
        if(element.attr("disabled") !== 'disabled') {
          if(ngModel.$modelValue === onValue) {
            ngModel.$setViewValue(offValue);
          } else {
            ngModel.$setViewValue(onValue);
          }
        }
      });
    }
  };
});

formModule.animation('.pop-right-animation', function() {
  var show = function(element, className, done) {
    if (className == 'ng-hide') {
      var container = jQuery(element);
      var width = container.width();
      container.animate({
        right: '+=' + width + "px"
      }, 200, done);
    } else {
      done();
    }
  };
  var hide = function(element, className, done) {
    if (className == 'ng-hide') {
      var container = jQuery(element);
      var width = container.width();
      container.animate({
        right: "-=" + width + "px"
      }, 200, done);
    } else {
      done();
    }
  };
  return {
    addClass: hide,
    removeClass: show
  };
});

formModule.directive('setUserLimit', function() {
  return {
    restrict: 'A',
    scope: {
      limit: '='
    },
    link: function(scope, ele, attr) {
      $(ele).on("change",function(){
        var checked = $(ele).prop("checked");
        if(checked){
          scope.limit = 1;
        }else{
          scope.limit = -1;
        }
        scope.$apply();
      });
    }
  };
});

formModule.directive('copyLink', function() {
  return {
    restrict: 'A',
    scope: {
      copyLink: '@'
    },
    link: function(scope, ele, attr) {
      var client = new ZeroClipboard(ele);
      client.on( "ready", function(readyEvent) {
        client.on( "aftercopy", function(event) {
          var text = "已复制到剪贴板";
          floatTips("success", text, $(event.target), false);
        });
      });
    }
  };
});
formModule.directive('ngMax', function() {
  return {
    restrict: 'A',
    scope:{
      ngMax:"@",
    },
    link: function(scope, ele, attr) {
      $(ele).on("change",function(){
        var value = parseFloat($(ele).val());
        if(scope.ngMax < value){
          $(ele).addClass("ng-max-invalid");
          alert("最多不能超过"+scope.ngMax);
        }else{
          $(ele).removeClass("ng-max-invalid");
        }
      });
    }
  };
});
formModule.directive('priceLimit', function() {
  return {
    restrict: 'A',
    require: '^ngModel',
    scope:{
      ngModel:"="
    },
    link: function(scope, ele, attr) {
      $(ele).on("input",function(e){
        var reg = new RegExp(/\d+(\.\d{0,2})?/)
        var s = ele.val();
        s = s.match(reg)?s.match(reg)[0]:null;
        scope.ngModel = s;
        scope.$apply();
      });
      var maxValue = 99999;
      $(ele).on("change",function(){
        var value = parseFloat($(ele).val());
        if(maxValue < value){
          $(ele).addClass("ng-max-invalid");
          alert("最多不能超过"+maxValue);
        }else if(value < 0.01){
          $(ele).addClass("ng-max-invalid");
          alert("价格不能小于0.01元");
        }else{
          $(ele).removeClass("ng-max-invalid");
        }
      });
    }
  };
});

formModule.directive('setUserFillTimes', function() {
  return {
    restrict: 'A',
    scope: {
      limit: '='
    },
    link: function(scope, ele, attr) {
      $(ele).on("change",function(){
        var checked = $(ele).prop("checked");
        if(checked){
          scope.limit = 1;
        }else{
          scope.limit = -1;
        }
        scope.$apply();
      });
    }
  };
});
formModule.directive( 'ngDefault', function() {
  return {
    restrict: 'A',
    scope:{
      ngModel:"=",
      ngDefault:"@"
    },
    link: function(scope, element, attrs) {
      if(scope.ngDefault == "false") scope.ngDefault = false;
      if(scope.ngDefault == "true") scope.ngDefault = true;
      scope.ngModel = (scope.ngModel == undefined)?scope.ngDefault:scope.ngModel;
    }
  };
});

formModule.directive( 'itemSetting', function(Form) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.updateMode = false;
      scope.updateTrend = true;
      scope.stockUpdateNum = 1;
      scope.updateToken = false;
      scope.changeUpdateMode = function(mode){
        scope.updateMode = mode?false:true;
      }
      scope.updateStock = function(item){
        if(scope.updateToken) return;
        var number = scope.updateTrend?scope.stockUpdateNum:-scope.stockUpdateNum;
        if(!scope.updateTrend && scope.stockUpdateNum > item.stock){
          alert("减少数量，不能超过库存");
          return;
        }
        scope.updateToken = true;
        Form.updateStock(item,number).success(function(rs) {
          scope.updateToken = false;
          if(rs.status == "success") {
            scope.updateMode = false;
            item.stock = parseInt(rs.result);
          }else{
            alert(rs.result);
          }
        }).error(function(err){
          scope.updateToken = false;
          alert("更新失败");
        });
      }
      scope.cancelUpdateStock = function(){
        scope.stockUpdateNum = 1;
        scope.updateMode = false;
      }
    }
  };
});



formModule.controller(
  'NotifySettingCtrl',
  ["$scope", "$element","AppState", function($scope, $element, AppState) {
    $scope.onClose = function() {
      $scope.openPopRight = false;
    };
  }]);

formModule.controller(
  'CopyrightCtrl', [
    "$scope", "$element", "AppState", "$http", function($scope, $element, AppState, $http) {
      $scope.state = AppState;
      $scope.copyrightCopy = AppState.copyright;
      $scope.saveCopyright = function() {
        $http({
          method: 'POST',
          url: '/member/profile/save-copyright',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: 'copyright=' + $scope.copyrightCopy
        }).success(function(rs) {
          if(rs.status === "success") {
            AppState.copyright = $scope.copyrightCopy;
            $scope.showCopyrightEdit = false;
          }
        });
      };
    }
  ]
);

formModule.filter( 'priceFormat', function() {
  return function(price) {
    if((price+"").indexOf('.') === -1){
      return price + ".00";
    }else{
      return price;
    }
  };
});

formModule.directive("fansLimitSet", function() {
  return {
    restrict: "EA",
    scope: {
      fans:"=",
      form:"=",
      switch:"="
    },
    template: getTplHtml("fans-limit-set-tpl"),
    controller: "FansLimitCtrl",
    link: function(scope,ele,attr) {
      $(ele).on("click",'input[type=checkbox]',function(){
        var _this = $(this);
        var type = _this.data("type");
        if(type == "label"){
          scope.addLabel(_this.val());
        }else if(type == "group"){
          scope.addGroup(_this.val());

        }
      });
      scope.$watch(function() {
        return scope.switch;
      }, function() {
        scope.setFansLimit();
      });
    }
  };
});

formModule.filter('renderNewLine', function() {
  return function(content) {
    return content.replace(/\n/g,"<br/>");
  };
});