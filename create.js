function getTplHtml(id){
  var obj = document.getElementById(id);
  return obj.innerHTML;
}

var pageOffset = function(element) {
  var top = 0, left = 0;
  var height = element.offsetHeight;
  do {
    top += element.offsetTop  || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while(element);

  return {
    top: top,
    left: left,
    height: height
  };
};

var formModule = angular.module('form', ["ngDateTime", 'ui.sortable',  'ngSanitize', 'ngAnimate']);

formModule.service('Form',['$rootScope', 'AppState', '$http',function(rootScope, AppState, http){
  var service = {
    addField : function(type,fieldId,fieldIdx){//添加表单到预览区域
      if(!service.checkFieldSettingErrors()){
        return;
      }
      var field = service.getFieldByType(type);
      service.insertField(field, fieldId,fieldIdx);
    },
    insertField: function(field, fieldId,fieldIdx) {
      var index;
      if(fieldIdx != undefined){
        index = parseInt(fieldIdx);
      }
      if(index === undefined) {
        AppState.form.fields.splice(AppState.form.fields.length, 0, field);
      } else {
        AppState.form.fields.splice(index + 1, 0,  field);
      }
      service.editField(field);
    },

    editField: function(field) {
      if(AppState.mode == "editField" && !this.checkFieldSettingErrors()) {
        return;
      }
      AppState.mode = "editField";//修改表单的状态是可编辑模式
      AppState.editField = field;
    },
    checkFieldSettingErrors: function() {
      var e = $('#editField .ng-invalid').length + $('#editField .ng-max-invalid').length;
      if(e) {
        if(!AppState.editField){
          alert('组件设置存在错误');  
        }
        return false;
      }
      if(AppState.editField) {
        //check options
        switch(AppState.editField.fieldType) {
          case "radio":
          case "select":
          case "checkbox":
            if(!AppState.editField.fieldOptions || AppState.editField.fieldOptions.length < 2) {
              alert('最少要两个选项');
              return false;
            }
            break;
          case "img":
          case "imgList":
            if(!AppState.editField.fieldOptions || AppState.editField.fieldOptions.length < 2) {
              alert('最少要两个选项');
              return false;
            }
            var temp = true;
            $.each(AppState.editField.fieldOptions,function(index, opt){
              if(!opt.img){
                alert('请上传图片');
                temp = false;
                return false;
              }
            });
            return temp;
        }
      }
      return true;
    },
    checkFormSettingErrors:function(){
      var e = $('.editForm .ng-invalid:visible').length;
      if(e) {
          $('.editForm').addClass('dirty');
          alert('表单设置存在错误');
          return false;
      } else {
          $('.editForm').removeClass('dirty');
          return true;
      }
    },
    updateMovePos: function(pos) {
      AppState.movePos = pos;
      rootScope.$apply();
    },

    copyField: function(field,fIdx) {//赋值表单项
      var newField = angular.copy(field);
      newField.fieldId = service.getNewFieldId();
      service.insertField(newField, field.fieldId,fIdx);
    },

    deleteField: function(field,fIdx) {
      if(fIdx != undefined) {
        AppState.form.fields.splice(fIdx, 1);
      }
      if(AppState.editField && AppState.editField.fieldId == field.fieldId) {
        AppState.editField = AppState.form.fields.length == 0 ? null :  AppState.form.fields[fIdx % AppState.form.fields.length];
      }
    },
    getFieldByType : function(type){
      var fieldId = service.getNewFieldId();
      var field = {
        "fieldId":fieldId,
        "fieldType":type,
        "label":"未命名标题",
        "fieldRules": [],
        "fieldValidator": { required: true }
      };
      switch(type){
      case 'textInput':
      case 'textArea':
        angular.extend(field,{
          "placeholder":"",
        });
        break;
      case 'numberInput':
        angular.extend(field,{
          "placeholder":"",
        });
        break;
      case 'select':
        angular.extend(field,{
          "placeholder": "请选择",
          "fieldOptions":[]
        });
        break;
      case 'radio':
      case 'checkbox':
        angular.extend(field,{
          "fieldOptions": []
        });
        break;
      case 'img':
      case 'imgList':
        angular.extend(field,{
          "fieldOptions": []
        });
        break;
      case 'date':
        field.label = "日期";
        angular.extend(field,{
          "placeholder":""
        });
        break;
      case 'time':
        field.label = "时间";
        angular.extend(field,{
          "placeholder":""
        });
        break;
      case 'score':
        field.label = "评分";
        angular.extend(field,{
          "placeholder":""
        });
        break;
      case 'file':
        field.label = "上传文件";
        angular.extend(field,{
          "placeholder":"",
          "fieldValidator":{"limit":true}
        });
        break;
      case 'richText':
        field.richContent = "";
        field.label = "";
        field.fieldValidator = {};
        break;
      case 'splitLine':
        field.label = "分割线";
        field.align = "center";
        field.fieldValidator = {};
        break;
      case 'name':
        field.label = "姓名";
        break;
      case 'phone':
        field.label = "手机";
        field.fieldValidator.mustLength = 11;
        break;
      case 'address':
        field.label = "地址";
        field.hide = {
          country:true,
          province:false,
          city:false,
          county:false,
          detail:false
        };
        field.default = {
          country:"中国"
        };
        break;
      case 'email':
        field.label = "邮箱";
        break;
      case 'birth':
        field.label = "出生年月";
        break;
      case 'location':
        field.label = "地区";
        break;
      case 'qq':
        field.label = "QQ";
        break;
      case 'gender':
        field.label = "性别";
        field.fieldOptions = [
          {label: '男', value: 1},
          {label: '女', value: 2}
        ];
        break;
        default : ;
      }
      return field;
    },
    getNewFieldId : function(){
      var id = AppState.form.nextFieldId ++;
      return id;
    },
    scrollToBottom:function(){
      $('.display-wrap .form-content').animate({scrollTop: $(".display-wrap .form-content")[0].scrollHeight}, 300);
    }
    // updateStock:function(item,number){//？？？不知道干嘛的
    //   var data = {
    //     itemId:item.id,
    //     number:number
    //   };
    //   return http.post('/member/form/update-stock', data);
    // }
  };
  return service ;
}]);

formModule.factory('AppState', function() {
  var getInitForm = function(){
    var data = {
      title: "未命名表单",
      fields: [],
      limit: {
        times: -1,
        everyday: false
      },
      total: {
        limit: false,
        everyday:false,
        tip:"您来晚啦，当前填写已经满额。"
      },
      deadline: {
        never: true
      },
      successTip: {
        notifyType: "text",
        text: "恭喜，提交成功！",
        showSeq: false
      },
      order:{
        record:true
      },
      // readWeixinInfo: false
    };
    if(_hook.groupId){
      data.groupId = parseInt(_hook.groupId)
    }
    return data;
  };
  var f = _hook.form || getInitForm();
  f.nextFieldId = f.nextFieldId || 100;
  
  if(!f.limit) {
    f.limit = {times: 1};
  }
  if(!f.limit.fans) {
    f.limit.fans = {
      limit:false,
      range:'all',
      guide:false,
      reply:"感谢您的关注。",
      filter:'group',
      groups:[],
      labels:[],
      groupFansNum:0,
      labelFansNum:0
    };
  }
  var mode = "createForm";
  return {
    mode: mode,
    editField: null,
    form: f,
    initForm: angular.copy(f),
    movePos: {},
    hasPart:_hook && _hook.hasApi,
    oldMaxPartId:f.nextFieldId,
    confirmWxPay:false,
    limitSilver:false,
    hasApi: _hook && _hook.hasApi,
    payConfigured:_hook.payConfigured,
    payConfiguring:false,
    fansLimitSetting:false,
    accountLevel:_hook.accountLevel,
    hasSilverRight: _hook.hasSilverRight,
    fromComponent: _hook && _hook.fromComponent,
    copyright: _hook && _hook.copyright,
    canEditCopyright: _hook && _hook.canEditCopyright,
    assistEnabled: _hook && _hook.assistEnabled
  };
});

formModule.directive("field", function(){
  return {
    restrict:"E",//元素
    scope: true,
    template : '<li><div field-drag data-type="{{type}}">{{name}}</div></li>',
    link: function ( scope, element, attrs ,controller) {
      scope.name = attrs.name;
      scope.type = attrs.type;
      scope.once = attrs.once;
    }
  };
});


//富文本编辑器指令
formModule.directive("ueditor", function($timeout) {
  return {
    restrict: "E",
    require: '^ngModel',
    template: '<textarea></textarea>',
    link: function(scope, element, attrs, model) {
      var editorId = attrs.editorId+'_'+Math.random();
      $timeout(function() {
        element.find('textarea').attr('id', editorId);
        var ue = UE.getEditor(editorId, {
          autoHeightEnabled: false,
          enableAutoSave: false,
          toolbars: [["bold","italic","underline","insertimage","|",'removeformat','forecolor','backcolor']],
          zIndex: 0,
          initialStyle:'body{font-size: 12px;}'
        });
        ue.ready(function() {
          var content = model.$viewValue;
          if(content) {
            ue.setContent(content);
          }
          ue.on('contentchange', function() {
            var content = ue.getContent();
            model.$setViewValue(content);
            model.$render();
            scope.$apply();
          });
        });
      });
    }
  };
});



formModule.directive("fieldItem",function($compile, AppState, Form){
  return {
    restrict:"E",
    scope: true,
    controller: function($scope) {
      $scope.$parent.state = AppState;
      $scope.$parent.selectField = function($event, field) {
        Form.editField(field);
      };
    },
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

formModule.directive("fieldDrag",['Form','$document','AppState',function(Form, doc, AppState){
  var startX=70, startY=10, x=y=0, target ;
  return function(scope,element,attr){
    var holdTimeStart;
    var holdTimeEnd;
    element.bind("mousedown",function(event){
      holdTimeStart = new Date().getTime();
      target = element;
      target.addClass("dragable").css({'z-index': 20});
      target.parent().addClass("drag-holder");
      $("html").addClass("move-mode");
      doc.bind("mousemove",mousemove);
      doc.bind("mouseup",mouseup);
    });
    doc.bind("mouseup",function(event){
      if(target) {
        doc.unbind("mousemove",mousemove);
        doc.unbind("mouseup",mouseup);
      }
    });
    var dragHoldToken = false;
    function mouseup(event) {
      dragHoldToken = false;
      holdTimeEnd = new Date().getTime();
      var occupyShow = angular.element(document.querySelector(".field-occupy:not(.ng-hide)"));
      /**
          attr.type:textInput、textArea、numberInput、select、radio、checkbox、img、imgList、date、time、score、file、richText、splitLine、name、phone、address、email、birth、location、qq、gender
      */
      console.log(attr.type);
      if(occupyShow.length) {
        var occupyFieldId = occupyShow.attr('data-field-id');
        var occupyFieldIdx = occupyShow.attr('data-field-index');
        Form.addField(attr.type, occupyFieldId, occupyFieldIdx);
      }else if((holdTimeEnd - holdTimeStart) < 200){
        Form.addField(attr.type, Form.getNewFieldId());
        Form.scrollToBottom();
      }
      var formContent = $(".form-content");
      if(occupyShow.length && (occupyShow.offset().top - formContent.height() > 0)){
        formContent.animate({scrollTop: formContent[0].scrollTop + 150}, 300);
      }
      target.removeClass("dragable").css({ position:'relative',top:0,left:0,zIndex:0 });
      $("html").removeClass("move-mode");
      target.parent().removeClass("drag-holder");
      Form.updateMovePos({});
    }

    function mousemove(event){
      y = event.clientY-16;
      x = event.clientX-65;
      target.css({ position:'fixed',top:y + 'px',left:x + 'px'});
      var rect = target[0].getBoundingClientRect();
      Form.updateMovePos({left: rect.left, right: rect.right, bottom: rect.bottom, top: rect.bottom});
      if(event.clientY - 80 > $(".form-content").height()){
        if(dragHoldToken) return;
        dragHoldToken = "bottom";
        setTimeout(function(){
          if(dragHoldToken == "bottom"){
            var formContent = $('.display-wrap .form-content');
            formContent.animate({scrollTop: formContent[0].scrollTop + formContent.height()}, 300);
            dragHoldToken = false;
          }
        }, 1000);
      }else if(event.clientY < 210){
        if(dragHoldToken) return;
        dragHoldToken = "top";
        setTimeout(function(){
          if(dragHoldToken == "top"){
            var formContent = $('.display-wrap .form-content');
            formContent.animate({scrollTop: formContent[0].scrollTop - formContent.height()}, 300);
            dragHoldToken = false;
          }
        }, 1000);
      }else{
        dragHoldToken = false;
      }
    }
  };
}]);

formModule.controller('DisplayFormController',['$scope','AppState', 'Form',function($scope, AppState, Form){
  $scope.state = AppState;
  $scope.locations = locations;
  $scope.copyField = Form.copyField;

  $scope.deleteField = function(field,fIdx){
    if(_hook.hasPart && $scope.state.oldMaxPartId > field.fieldId){
      $scope.delFieldPop = true;
      $scope.toDelField = field;
      $scope.toDelFIfx = fIdx;
    }else{
      Form.deleteField(field,fIdx);
    }
  };
  $scope.confirmDeleteField = function(){
    if(!$scope.confirmDelField){
      return;
    }
    $scope.delFieldPop = false;
    Form.deleteField($scope.toDelField,$scope.toDelFIfx);
  };
  window.onbeforeunload = function() {
    if(!angular.equals(AppState.initForm, AppState.form)) {
      return "您输入的内容尚未保存，确定要离开？";
    } else {
      return undefined;
    }
  };
  $scope.hideLocation = function(field,level){
    if(field.hide[level]){
      if(level == "province"){
        field.hide.city = true;
        field.hide.county = true;
      }else if(level == "city"){
        field.hide.county = true;
      }
    }else{
      if(level == "city" && field.hide.province){
        field.hide.city = true;
      }else if(level == "county" && field.hide.city){
        field.hide.county = true;
      }
    }
  };
  $scope.initValueWhildHide = function(field,value){
    if(field.hide.country == true){
      field.default.country = value;
    }
  };
  $scope.initLocation = function(field,level){
    if(level == "country"){
      field.default.province = null;
      field.default.city = null;
      field.default.county = null;
    }else if(level == "province"){
      field.default.city = null;
      field.default.county = null;
    }else if(level == "city"){
      field.default.county = null;
    }
  };
  setTimeout(function() {
    $("#box-loading").remove();
  });
}]);

formModule.controller("TabNavCtrl", ['$scope', 'AppState', 'Form',  function($scope, AppState, Form) {
  $scope.state = AppState;
  var panes = $scope.panes = [];
  var controller = this;
  this.addPane = function(pane) {
    panes.push(pane);
  };

  this.checkSettingErrors = function(mode) {
    if(mode == "editField") {
      return Form.checkFieldSettingErrors();
    }
    if(mode == "editForm") {
      return Form.checkFormSettingErrors();
    }
    return true;
  };
}]);

formModule.directive("tabNav", function(AppState) {
  return {
    restrict: 'A',//属性
    scope: {
      panePosition:"@"
    },
    transclude: true,
    controller: 'TabNavCtrl',
    template: document.querySelector("#tab-nav-tpl").innerHTML
  };
});

formModule.directive("tabPane", function(AppState) {
  return {
      restrict: 'E',//元素
      transclude: true,
      require : "^tabNav",
      scope: {
        tabTitle: '@',
        mode: '@'
      },
      link: function(scope, element, attrs, tabNavCtrl) {
        scope.state = AppState;
        tabNavCtrl.addPane(scope);
      },
      template: document.querySelector("#tab-pane-tpl").innerHTML
  };
});

formModule.directive("fieldEditor", function($compile, $timeout, AppState) {
  return {
    restrict: 'E',
    transclude: true,
    link: function(scope, element) {
      scope.state = AppState;
      scope.resize = function(notCompile) {
        $timeout(function() {
          var type = "no-field";
          if(scope && scope.state && scope.state.editField) {
            type = scope.state.editField.fieldType;
          }
          scope.field = scope.state.editField;
          //replace settings area
          if(!notCompile) {
            var directiveName = type.replace(/([a-z\d])([A-Z])/g, '$1-$2');
            var editor = directiveName + "-editor";
            element.html('<' + editor + '></' + editor + '>');
            $compile(element.contents())(scope);
          }
        }, 50);
      };
      scope.$watch(
        function(scope) {
          return scope.state.editField;
        },
        function(value) {
          scope.resize();
        }
      );
    }
  };
});

formModule.directive("withEm", function(AppState) {
  return function(scope, element) {
    scope.domEm = element[0];
  };
});

formModule.directive("initTime", function(AppState) {
  return function(scope, element) {
    scope.domEm = element[0];
  };
});

formModule.directive("styleSelect", function(AppState) {
  return {
    restrict : 'A',
    link : function(scope,element,attrs){
      element.on("click",function(){
        scope.state.form.style = {
          name : attrs.name
        }
        scope.$apply();
      })
    }
  }
});

formModule.filter('fieldFilter',function() {
  return function(field, selectedField) {
    if(field.fieldId == selectField.fieldId) {
      return true;
    }
    return false;
  };
});

formModule.filter("renderFieldItem",function(){
  var filterfun = function(input) {
    return '<fieldItem></fieldItem>';
  };
  return filterfun;
});

formModule.filter("hideTips", function() {
  return function(state) {
    var form = state.form;
    var movePos = state.movePos;
    var elementPos = document.querySelector('.form-body').getBoundingClientRect();
    var isXMatch = movePos.right > elementPos.left;
    var hasFields =  form && form.fields && form.fields.length > 0;
    return hasFields || isXMatch;
  };
});

formModule.filter("showFirstOccupy", function() {
  return function(state) {
    var form = state.form;
    var movePos = state.movePos;
    var elementPos = document.querySelector('.form-body').getBoundingClientRect();
    var isXMatch = movePos.right > elementPos.left;
    var isYMatch = movePos.bottom < elementPos.top;
    return isYMatch && isXMatch;
  };
});

formModule.filter("showInitOccupy", function() {
  return function(state) {
    var form = state.form;
    var movePos = state.movePos;
    var elementPos = document.querySelector('.form-body').getBoundingClientRect();
    var isXMatch = movePos.right > elementPos.left;
    var hasFields =  form && form.fields && form.fields.length > 0;
    return !hasFields && isXMatch;
  };
});

formModule.filter("showOccupy", function() {
  return function(state, index) {
    var getPos = function(fieldId) {
      return document.querySelector("#field_" + fieldId).getBoundingClientRect();
    };
    var movePos = state.movePos;
    if(!movePos.left) {
      return false;
    }
    var prev = state.form.fields[index];
    var next = state.form.fields[index + 1];
    if(prev == undefined && next == undefined) {
      return false;
    } else if(prev == undefined) {
      //first element
      var nextPos = getPos(next.fieldId);
      var isXMatch = movePos.right > nextPos.left;
      var isBeforeNext = movePos.bottom < nextPos.top + (nextPos.height / 2);
      return isXMatch && isBeforeNext;
    } else if(next == undefined) {
      var prevPos = getPos(prev.fieldId);
      var isXMatch = movePos.right > prevPos.left;
      var isAfterPrev = movePos.top > prevPos.top + (prevPos.height / 2);
      return isXMatch && isAfterPrev;
    } else {
      var prevPos = getPos(prev.fieldId);
      var nextPos = getPos(next.fieldId);
      var isXMatch = movePos.right > prevPos.left;
      var isAfterPrev = movePos.top > prevPos.top + (prevPos.height / 2);
      var isBeforeNext = movePos.bottom < nextPos.top + (nextPos.height / 2);
      return isXMatch && isAfterPrev && isBeforeNext;
    }
  };
});

//预览 保存表单
formModule.controller("FormActionCtrl", function($scope, $element, $http, AppState,Form) {
  var saveToken = false;
  $scope.saveForm = function() {
    if(saveToken) return;
    saveToken = true;
    if(!Form.checkFieldSettingErrors() || !Form.checkFormSettingErrors()){
      return;
    }
    //TODO：接口地址
    $http.post('/member/form/save', AppState.form).success(function(rs) {
      saveToken = false;
      if(rs.status == "success") {
        if(AppState.form.id == undefined) {
          AppState.form.id = rs.result.id;
        }
        AppState.initForm = angular.copy(AppState.form);
        $scope.popupSuccessWind();
      }else{
        alert(rs.result);
      }
    }).error(function(err){
      alert("连接失败");
      saveToken = false;
    });
  };
  $scope.popupSuccessWind = function() {
    angular.element($element.children()[1]).children().removeClass('hidden');
    $scope.showSuccessPopup = true;
  };

  $scope.addField = function() {
    AppState.mode = "createForm";
  };

  //表单预览
  $scope.preview = function() {
    var data = {};
    data['form'] = angular.toJson(AppState.form);
    console.log(JSON.parse(data['form']));
    open('/form/preview.html');
  //   if(!Form.checkFieldSettingErrors()){
  //     return;
  //   }
  //   var form = document.createElement("form");
  //   if(document.getElementById("form-preview-submit")) {
  //     angular.element(form).remove();
  //   }
  //   angular.element(document.body).append(form);
  //   angular.element(form).attr("id", "form-preview-submit");
  //   form["action"] = "/member/form/preview";
  //   form["method"] = "POST";
  //   form["target"] = "_blank";
  //   var data = {};
  //   data['form'] = angular.toJson(AppState.form);
  //   angular.forEach(data, function(value, name) {
  //     var input = document.createElement("input");
  //     input.type = 'hidden';
  //     input.name = name;
  //     input.value = value;
  //     form.appendChild(input);
  //   });
  //   form.submit();
  };
});

// formModule.controller('TracingSettingController',function($rootScope, $scope, $element, $http, AppState) {
//     $scope.form = AppState.form;
//     $scope.form.tracing = ($scope.form.tracing&&$scope.form.tracing.mode) ? $scope.form.tracing:{};
//     $scope.state = AppState;
//     var tracing = $scope.form.tracing;
//     var tempTracing = angular.copy($scope.form.tracing);
//     if(AppState.conditionalTracingSetting === undefined && tracing.conditional && tracing.conditional.setting) {
//       AppState.conditionalTracingSetting = angular.copy(tracing.conditional.setting);
//     }
//     AppState.conditionalTracingSetting = AppState.conditionalTracingSetting || {};

//     var conditionalSetting = AppState.conditionalTracingSetting;
//     $scope.conditionalSetting = conditionalSetting;


//     $scope.isLegacyForm = tracing && tracing.enable && tracing.mode === undefined;
//     $scope.enableAll = function() {
//       angular.foreach($scope.managers, function(val) {
//         tracing.normal[val.openid] = tracing.normal[val.openid] || true;
//       });
//     };

//     $scope.setDefaultMode = function(){
//       if(tracing && tracing.mode === undefined) {
//         tracing.mode = 'normal';
//       }
//     };

//     $scope.reloadManagers = function(defaultEnabled, reloadings, opt) {
//       $http.get('/member/form/managers').success(function(rs) {
//         rs = angular.fromJson(rs);
//         if(rs.status == "success") {
//           $scope.managers = rs.result;
//           $scope.indexManagers();
//           if(defaultEnabled) {
//             $scope.enableAll();
//           }
//           if(opt == "normal"){
//             reloadings['normal'] = false;
//           }else if(reloadings && reloadings[opt.value]) {
//             reloadings[opt.value] = false;
//           }
//         }
//       });
//     };

//     $scope.indexManagers = function() {
//       $scope.indexedManagers = {};
//       angular.forEach($scope.managers, function(m) {
//         $scope.indexedManagers[m.openid] = m;
//       });
//     };

//     $scope.checkedManagers = function(settings) {
//       var managers = [];
//       angular.forEach(settings, function(val, key) {
//         var m = $scope.indexedManagers && $scope.indexedManagers[key];
//         if(val && m) {
//           managers.push(m);
//         }
//       });
//       return managers;
//     };

//     $scope.isConditionalField = function(field) {
//       var expectedTypes = ['select', 'img', 'gender', 'radio'];
//       return field && expectedTypes.indexOf(field.fieldType) != -1;
//     };

//     $scope.optionsOf = function(fieldId) {
//       var options = [];
//       angular.forEach(AppState.form.fields, function(f) {
//         if(f.fieldId == fieldId)
//           options = f.fieldOptions;
//       });
//       return options;
//     };

//     $scope.fieldOf = function(fieldId) {
//       var field;
//       angular.forEach(AppState.form.fields, function(f) {
//         if(f.fieldId == fieldId)
//           field = f;
//       });
//       return field;
//     };

//     $scope.conditionalTracingField = function() {
//       return tracing && tracing.conditional && $scope.fieldOf(tracing.conditional.fieldId);
//     };

//     $scope.showOptionManagerList = function(opt) {
//       var field = $scope.conditionalTracingField();
//       if(field) {
//         $scope.optionManagerSwitches = $scope.optionManagerSwitches || {};
//         $scope.optionManagerSwitches[field.fieldId] = {};
//         AppState.hasOptionManagerList = true;
//         $scope.optionManagerSwitches[field.fieldId][opt.value] = true;
//       }
//     };

//     $scope.isOptionManagerListOpen = function(opt) {
//       var field = $scope.conditionalTracingField();
//       return $scope.optionManagerSwitches &&
//         $scope.optionManagerSwitches[field.fieldId] &&
//         $scope.optionManagerSwitches[field.fieldId][opt.value];
//     };

//     $scope.confirmConditionalTracing = function() {
//       var field = $scope.conditionalTracingField();
//       tracing.conditional.setting = angular.copy($scope.conditionalSetting);
//       $scope.optionManagerSwitches[field.fieldId] = {};
//       AppState.hasOptionManagerList = false;
//     };

//     $scope.cancelConditionalTracing = function() {
//       var field = $scope.conditionalTracingField();
//       if(field) {
//         $scope.conditionalSetting = angular.copy(tracing.conditional.setting);
//         $scope.optionManagerSwitches[field.fieldId] = {};
//         AppState.hasOptionManagerList = false;
//       }
//     };

//     $scope.checkedManagersCount = function(settings) {
//       var c = 0;
//       angular.forEach(settings, function(optionValue, managers) {
//         angular.forEach(managers, function(openid, enable) {
//           if(enable) c++;
//         });
//       });
//       return c;
//     };
//     $scope.saveTracing = function() {
//       if(AppState.hasOptionManagerList) {
//         alert('未确认提醒设置');
//         return false;
//       }
//       if(jQuery($element).find('.ng-invalid').length > 0) {
//         alert('提醒设置存在错误，请先确认');
//         return false;
//       }
//       if($scope.countManagers() == 0) {
//         alert('请至少设置一位管理员');
//         return false;
//       }
//       tempTracing = angular.copy($scope.form.tracing);
//       $scope.managersCount = $scope.countManagers();
//       $scope.openRightPop = false;
//     };
//     $scope.onClose = function() {
//       $scope.form.tracing = angular.copy(tempTracing);
//       return true;
//     };
//     $scope.setTempTracing = function(enable){
//       if(!enable){
//         tempTracing = angular.copy($scope.form.tracing);
//       }else{
//         if(!$scope.form.tracing||!$scope.form.tracing.mode){
//           $scope.form.tracing = {mode:'normal',enable:true};
//         }
//       }
//     };
//     $scope.checkFormReply = function() {
//       $http.post('/member/form/check-reply-tpl', {
//         _token_: _hook._token_
//       }).success(function(rs) {
//         if(rs.success) {
//           $scope.openRightPop = true;
//         } else {
//           $scope.showFormReplyTipsPop = true;
//         }
//       });
//     };
//     $scope.doFormReply = function() {
//       if(!$scope.formReplyConfirmed) {
//         return ;
//       }
//       if($scope.industrySwitchGrant == 1) {
//         $http.post('/member/form/set-reply-tpl', {
//           _token_: _hook._token_
//         }).success(function(rs) {
//           if(rs.success) {
//             $scope.openRightPop = true;
//           } else {
//             alert(rs.msg);
//           }
//         });
//       } else {
//         $scope.openRightPop = false;
//         $scope.onClose();
//       }
//       $scope.showFormReplyTipsPop = false;
//     };
//     $scope.countManagers = function() {
//       var tracing = $scope.form.tracing;
//       if(!tracing.enable){
//         return 0;
//       }
//       var count = 0;
//       if(tracing.mode == "normal" && tracing.normal){
//         angular.forEach(tracing.normal.setting,function(v,k){
//           if(v){
//             count++;
//           }
//         });
//       }else if(tracing.conditional){
//         var fieldId = "fieldId"+tracing.conditional.fieldId;
//         var managers = [];
//         angular.forEach(tracing.conditional.setting[fieldId],function(v,k){
//           angular.forEach(v,function(val,key){
//             if(val && managers.join("").indexOf(key)<0){
//               managers.push(key);
//             }
//           });
//         });
//         count = managers.length;
//       }
//       return count;
//     };
//     $scope.managersCount = $scope.countManagers();

//     if(!$scope.managers) {
//       $scope.reloadManagers();
//     }
//   });

// formModule.directive('tracingSetting', function() {
//   return {
//     restrict: 'E',
//     'controller': 'TracingSettingController',
//     template: getTplHtml('tracing-setting-tpl'),
//     link: function(scope) {
//       scope.$watch(function() {
//         return scope.form.tracing && scope.form.tracing.enable;
//       }, function() {
//         scope.setDefaultMode();
//       });
//     }
//   };
// });

// formModule.directive('changeShowMode', function() {
//   return {
//     restrict:"A",
//     link: function ( scope, element, attrs ,controller) {
//       element.on("click",function(){
//         var group = element.parents(".setting-group");
//         if(group.hasClass("close")){
//           group.removeClass("close");
//         }else{
//           group.addClass("close");
//         }
//       });
//     }
//   };
// });