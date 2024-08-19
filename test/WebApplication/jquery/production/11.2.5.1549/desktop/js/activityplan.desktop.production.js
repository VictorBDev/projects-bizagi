function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.dashboard.menu",{},{onDiscussionsMenuStatusChange:function(t,e){this.updateDiscussionsIcons(e.hasDiscussionsOrComment)},updateDiscussionsIcons:function(t){this.sub("UPDATE_DISCUSSIONS_MENU_STATUS",$.proxy(this.onDiscussionsMenuStatusChange,this)),$(".bz-icon-discussion-comment").toggle(t),$(".bz-icon-discussion-no-comment").toggle(!t),this.params.hasDiscussionsOrComment=t},clean:function(){this.unsub("UPDATE_DISCUSSIONS_MENU_STATUS",$.proxy(this.onDiscussionsMenuStatusChange,this))}}),bizagi.injector.register("bizagi.workportal.widgets.project.dashboard.menu",["workportalFacade","dataService",bizagi.workportal.widgets.project.dashboard.menu],!0),bizagi.workportal.widgets.project.dashboard.menu.extend("bizagi.workportal.widgets.project.dashboard.menu.activity.plan",{},{init:function(t,e,i){this.params=i||{},this._super(t,e,i),this.loadTemplates({"project-dashboard-menu":bizagi.getTemplate("bizagi.workportal.desktop.widgets.project.dashboard.menu.activity.plan").concat("#project-dashboard-menu2")})},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){var t=this;t._super(),t.params.contextsLeftSidebarCaseDashboard.forEach((function(e){t.sub(e,$.proxy(t.updateView,t))}))},updateView:function(t,e){var i=this;i.params=$.extend(i.params,e.args),i.clean();var a=i.getContent().empty(),r={showFormOverview:i.params.menuDashboard.showFormOverview,showFormActivity:i.params.menuDashboard.showFormActivity,showCommentsOptionMenu:i.params.menuDashboard.showCommentsOptionMenu,showFilesOptionMenu:i.params.menuDashboard.showFilesOptionMenu,showTimeLineOptionMenu:i.params.menuDashboard.showTimeLineOptionMenu,showPlanOptionMenu:i.params.menuDashboard.showPlanOptionMenu,contextPlanOptionMenu:i.params.menuDashboard.contextPlanOptionMenu,contextFormActivityOptionMenu:i.params.menuDashboard.contextFormActivityOptionMenu,contextualized:i.params.plan.contextualized};i.getTemplate("project-dashboard-menu").render(r).appendTo(a),i.params.showContextByMenuDashboard&&$("li[data-context='"+t.type.toUpperCase()+"']",i.content).addClass("active").siblings().removeClass("active"),i.updateDiscussionsIcons(i.params.hasDiscussionsOrComment),i.handlerEvents();var o={idPlan:i.params.plan.id};$.when(i.callGetPlan(o)).then((function(t){$.extend(i.params.plan,t),i.pub("notify",{type:"LOAD_INFO_PLAN",args:i.params})}))},loadContentById:function(t){var e=this;t.preventDefault();var i=$(t.target).closest("li");i.hasClass("active")||$.when(bizagi.util.autoSave()).done((function(){$(document).data("auto-save","");var t=i.data("context");if(t){var a=e.pub("notify",{type:"NAVIGATOR_GETLEVEL"}),r=parseInt(a[0]);e.params.refreshLastItemBreadcrumb=!1,e.pub("notify",{type:t.toUpperCase(),args:$.extend(e.params,{showContextByMenuDashboard:t,histName:"",level:r})}),$("li[data-context='"+e.params.showContextByMenuDashboard.toUpperCase()+"']",e.content).addClass("active").siblings().removeClass("active")}}))},callGetPlan:function(t){var e=$.Deferred();return this.dataService.getPlan(t).always((function(t){200===t.status||201===t.status||void 0===t.status?e.resolve(t):e.reject()})),e.promise()},subMenuHandler:function(){var t=this.getContent(),e=$("[data-context='ACTIVITYPLANCOMMENTS']",t),i=$("[data-context='ACTIVITYPLANFILES']",t),a=$("[data-context='ACTIVITYPLANTIMELINE']",t);$(".ui-bizagi-wp-project-tab-submenu a",t).on("click",(function(){e.toggle(),i.toggle(),a.toggle()}))},handlerEvents:function(){var t=this.getContent();this.subMenuHandler(),$(".ui-bizagi-wp-project-tab-links a",t).on("click",$.proxy(this.loadContentById,this))},clean:function(){var t=this,e=t.getContent();t._super(),t.params&&t.params.contextsLeftSidebarCaseDashboard&&t.params.contextsLeftSidebarCaseDashboard.forEach((function(e){t.unsub(e,$.proxy(t.updateView,t))})),$(".ui-bizagi-wp-project-tab-links a",e).off()}}),bizagi.injector.register("bizagi.workportal.widgets.project.dashboard.menu.activity.plan",["workportalFacade","dataService",bizagi.workportal.widgets.project.dashboard.menu.activity.plan],!0),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.content.dashboard",{},{init:function(t,e,i){this._super(t,e,i),this.loadTemplates({"project-content-dashboard":bizagi.getTemplate("bizagi.workportal.desktop.widget.project.content.dashboard").concat("#project-plan-content-dashboard")})},renderContent:function(){var t=this.getTemplate("project-content-dashboard");return this.content=t.render({}),this.content},postRender:function(){setTimeout((function(){$(window).trigger("resize")}),1e3)}}),bizagi.injector.register("bizagi.workportal.widgets.project.content.dashboard",["workportalFacade","dataService",bizagi.workportal.widgets.project.content.dashboard],!0),bizagi.workportal.widgets.project.base.extend("bizagi.workportal.widgets.project.activity",{},{init:function(t,e,i){this._super(t,e,i),this.loadTemplates({"project-activity":bizagi.getTemplate("bizagi.workportal.desktop.widget.project.activity").concat("#project-activity-wrapper")})},renderContent:function(){var t=this.getTemplate("project-activity");return this.content=t.render({}),this.content},postRender:function(){this.renderForm({idCase:this.params.idCase,idWorkitem:this.params.idWorkitem,idTask:this.params.idTask,radNumber:this.params.radNumber,withOutGlobalForm:this.params.withOutGlobalForm||!1,isClosed:this.params.isClosed,belongCurrentUser:this.params.belongCurrentUser,hasGlobalForm:bizagi.util.parseBoolean(this.params.hasGlobalForm),showForm:bizagi.util.parseBoolean(this.params.showForm),isOfflineForm:this.params.isOfflineForm||!1,messageForm:this.params.messageForm||"",where:this.params.where})},renderForm:function(t){var e=this,i=e.getContent();if(!t.isClosed&&!t.belongCurrentUser&&!t.hasGlobalForm&&(t.withOutGlobalForm=!0),t.withOutGlobalForm){var a=e.workportalFacade.getTemplate("info-message"),r=""!==t.messageForm?t.messageForm:e.resources.getResource("render-without-globalform"),o=e._textActionNoActivitiesButton(t.where);void 0!==e.params&&void 0!==e.params.isOfflineForm&&1==e.params.isOfflineForm&&(r=bizagi.util.getMessageFromNetworkState(e.dataService.online));var n=$.tmpl(a,{message:r,textButton:o.text});n.appendTo(i),$("#ui-bizagi-btn-go-to-inbox",n).click(e.onClickButtonNoActivities.bind(e,o.actionGoBack)),$.Deferred().fail()}else{var s=null!=_typeof(e.dataService.serviceLocator.proxyPrefix)?e.dataService.serviceLocator.proxyPrefix:"",p=null!=_typeof(e.dataService.database)?e.dataService.database:"",c=e.rendering=new bizagi.rendering.facade({proxyPrefix:s,database:p});bizagi.util.setContext(t),e.rendering.subscribe("onLoadDataItemsFromFormActivityPlan",(function(t,i){e.pub("notify",{type:"UPDATE_ITEMS_FROM_FORMRENDER",args:i})})),e.rendering.subscribe("rendering-formRendered",(function(t,i){e.pub("notify",{type:"ON_RENDER_FINISH",args:i})}));c.execute($.extend(t,{canvas:i,menu:e.menu}));i.bind("routing",(function(t,i){var a={action:bizagi.workportal.actions.action.BIZAGI_WORKPORTAL_ACTION_ROUTING,idCase:e.params.idCase,fromTask:e.params.fromTask||e.params.idTask,fromWorkItemId:e.params.fromWorkItemId||e.params.idWorkitem,isOfflineForm:e.params.isOfflineForm,formsRenderVersion:e.params.formsRenderVersion,onClose:function(){e.publish("changeWidget",{widgetName:bizagi.util.defaultWidget()})}};a=$.extend(a,i),e.publish("executeAction",a)}))}e.renderingFacade=c,e.resizeLayout()},onClickButtonNoActivities:function(t){var e=this;t?bizagi.injector.get("backNavigator").goToBack.call(e):e.publish("changeWidget",{widgetName:e.workportalFacade.workportal.getWidgetByCookie(!0)})},_textActionNoActivitiesButton:function(t){var e,i=bizagi.workportal.actions.routing.RETURN_TO,a=!0;switch(t){case i.BAM:case i.QUERIES:e="workportal-without-globalform-button-to-results";break;case i.INBOX:e="workportal-without-globalform-button-to-inbox";break;default:e="render-without-globalform-button",a=!1}return{text:this.resources.getResource(e),actionGoBack:a}},clean:function(){}}),bizagi.injector.register("bizagi.workportal.widgets.project.activity",["workportalFacade","dataService",bizagi.workportal.widgets.project.activity],!0),bizagi.workportal.widgets.project.base.extend("bizagi.workportal.widgets.project.plan.activity.sidebar",{},{init:function(t,e,i,a){this._super(t,e,a),this.serviceloadDataPlan=i,this.loadTemplates({"project-plan-activity-sidebar":bizagi.getTemplate("bizagi.workportal.desktop.project.plan.activity.sidebar").concat("#project-plan-activity-sidebar")})},renderContent:function(){var t=this.getTemplate("project-plan-activity-sidebar");return this.content=t.render({}),this.content},postRender:function(){this.sub("LOAD_INFO_PLAN",$.proxy(this.onNotifyLoadInfoPlan,this))},onNotifyLoadInfoPlan:function(t,e){if(this.params.plan.idActivitySelected){var i={idPlan:this.params.plan.id};this.serviceloadDataPlan.loadData(i,this.getDateServer,this.params),this.serviceloadDataPlan.subscribe("loadedWithDataActivities",$.proxy(this.loadedWithDataActivities,this)),this.serviceloadDataPlan.subscribe("loadedWithDataFirstParent",$.proxy(this.loadedWithDataFirstParent,this))}},loadedWithDataActivities:function(){this.pub("notify",{type:"LOADED_ACTIVITIES_PLAN",args:this.params}),this.pub("notify",{type:"LOAD_INFO_SUMMARY_PROGRESS_PLAN",args:this.params}),this.pub("notify",{type:"LOAD_INFO_ACTIVITY_SUMMARY",args:this.params}),this.pub("notify",{type:"LOAD_INFO_ACTIVITIES_PLAN",args:this.params})},loadedWithDataFirstParent:function(){this.pub("notify",{type:"LOAD_INFO_SUMMARY_PLAN",args:this.params})},clean:function(){this.serviceloadDataPlan&&(this.serviceloadDataPlan.unsubscribe("loadedWithDataActivities",$.proxy(this.loadedWithDataActivities,this)),this.serviceloadDataPlan.unsubscribe("loadedWithDataFirstParent",$.proxy(this.loadedWithDataFirstParent,this)))}}),bizagi.injector.register("bizagi.workportal.widgets.project.plan.activity.sidebar",["workportalFacade","dataService","bizagi.workportal.services.behaviors.loadDataPlan",bizagi.workportal.widgets.project.plan.activity.sidebar],!0),bizagi.workportal.widgets.project.base.extend("bizagi.workportal.widgets.project.plan.activity.action",{},{init:function(t,e,i,a){this._super(t,e,a),this.dateFormat=bizagi.localization.getResource("dateFormat"),this.timeFormat=bizagi.localization.getResource("timeFormat"),this.estimatedFinishDateTime,this.beforeUserAssignedActivity="",this.notifier=i,this.loadTemplates({"activity-action-main":bizagi.getTemplate("bizagi.workportal.desktop.project.plan.activity.action").concat("#project-plan-activity-action"),"activity-action-editionpopup":bizagi.getTemplate("bizagi.workportal.desktop.project.plan.activity.action").concat("#project-plan-activity-action-editionpopup")}),this.dialogBox={}},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){this.sub("LOAD_INFO_ACTIVITY_SUMMARY",$.proxy(this.onNotifyLoadInfoActivityExecution,this)),this.sub("EXPANDED_RIGHT_SIDEBAR",$.proxy(this.onNotifyExpandedRightSidebar,this))},onNotifyLoadInfoActivityExecution:function(t,e){var i=this;i.params=$.extend(i.params,e.args);var a=i.getContent().empty(),r={};if(i.params.plan.idActivitySelected&&(r=i.params.plan.activities.filter((function(t){return t.id.toUpperCase()===i.params.plan.idActivitySelected.toUpperCase()}))[0]),i.params.plan.idUserCreator===bizagi.currentUser.idUser||r.userAssigned==bizagi.currentUser.idUser){var o={};o.currentActivityName=r.name,o.showEditAction=!0,i.params.plan.idUserCreator!==bizagi.currentUser.idUser&&(o.showEditAction=!1);var n=i.getTemplate("activity-action-main");a.append(n.render(o)),o.showEditAction&&(i.initilizeActionMenu(),i.beforeUserAssignedActivity=r.userAssigned,i.content.append(a),i.initializeTempleteAndEvents())}},initializeTempleteAndEvents:function(){this.plugins={},this.plugins.activityEdition=this.initPluginPopupEdition(),this.formEditActivity={assignee:$("#activity-form-assignee",this.plugins.activityEdition),date:$("#activity-form-date",this.plugins.activityEdition),duration:$("#activity-form-duration",this.plugins.activityEdition),buttonCancel:$("#ui-bizagi-wp-project-popupform-action-cancel",this.plugins.activityEdition),buttonUpdate:$("#ui-bizagi-wp-project-popupform-action-update",this.plugins.activityEdition)},this.formEditActivity.buttonCancel.on("click",$.proxy(this.onClickPopupButtonCancel,this)),this.formEditActivity.buttonUpdate.on("click",$.proxy(this.onClickPopupButtonUpdate,this)),this.formEditActivity.date.on("keydown",$.proxy(this.onDeleteDate,this)),this.formEditActivity.duration.on("keyup",$.proxy(this.onTypeDuration,this))},onNotifyExpandedRightSidebar:function(){this.initilizeActionMenu()},initilizeActionMenu:function(){$("#ui-bizagi-wp-project-plan-activity-action .menu",this.content).menu({select:$.proxy(this.onSelectMenu,this)}).removeClass("ui-widget-content")},initPluginPopupEdition:function(){var t=this.getTemplate("activity-action-editionpopup");return this.dialogBox.formContent=t.render({}),this.dialogBox.formContent},initializeAutoComplete:function(t){var e=this,i=e.dataService.serviceLocator.getUrl("admin-getUsersList");t.autocomplete({minLength:2,source:function(t,e){$.ajax({url:i,data:{domain:"",userName:"",fullName:t.term,organization:"",pag:1,pagSize:100,orderField:"fullName"},success:function(t){e($.map(t.users,(function(t){return{label:t.user,value:t.idUser}})))}})},select:function(i,a){var r=a.item.label;return t.val(r),e.formEditActivity.IdAssignee=a.item.value,!1},focus:function(){return!1},change:function(t,i){return null===i.item&&(e.formEditActivity.IdAssignee=null,e.formEditActivity.assignee.val("")),!1}})},initializeDatePicker:function(t){var e=this;t.datepicker({onSelect:function(){e.formEditActivity.duration.val(""),e.estimatedFinishDateTime=e.formEditActivity.date.datepicker("getDate")?e.formEditActivity.date.datepicker("getDate").getTime():void 0}}),t.datepicker("option","dateFormat",bizagi.util.dateFormatter.getDateFormatByDatePickerJqueryUI())},initializeSpiner:function(t){var e=this;function i(t,i){var a=i||$(t.target).val();bizagi.util.isNumeric(a)&&parseInt(a,10)>0?(e.formEditActivity.date.val(""),e.estimatedFinishDateTime=void 0):$(t.target).val("")}t.spinner({min:1,max:1e3,placeHolder:bizagi.localization.getResource("workportal-hours"),change:function(t){i(t)},spin:function(t,e){i(t,e.value)}})},onDeleteDate:function(t){8===t.keyCode&&($(t.target).val(""),this.fieldDurationActive(!0))},onTypeDuration:function(t){""!==$(t.target).val()?this.estimatedFinishDateTime=void 0:this.activateElement(this.form.date)},onSelectMenu:function(t,e){if(0===$(t.currentTarget).find("i").length)switch($(e.item).data("item")){case"edit":this.onClickOpenPopupEdition()}},onClickOpenPopupEdition:function(){this.initializeTempleteAndEvents(),this.dialogBox.formContent.dialog({resizable:!1,draggable:!1,height:"auto",width:"600px",modal:!0,title:bizagi.localization.getResource("workportal-project-plan-title-activity-properties"),maximize:!0,open:$.proxy(this.onOpenPopupEdition,this),close:$.proxy(this.onClosePopupEdition,this)})},onOpenPopupEdition:function(){var t=this,e=t.params.plan.activities.filter((function(e){return e.id.toUpperCase()===t.params.plan.idActivitySelected.toUpperCase()}))[0],i=e&&!bizagi.util.isEmpty(e.estimatedFinishDate)?e.estimatedFinishDate:"";isNaN(i)||(i=bizagi.util.dateFormatter.formatInvariant(new Date(i)));var a=i?bizagi.util.dateFormatter.getDateFromInvariant(i):"",r=a instanceof Date&&a.getTime()<t.getDateServer();t.initializeAutoComplete(t.formEditActivity.assignee),t.initializeDatePicker(t.formEditActivity.date),t.initializeSpiner(t.formEditActivity.duration),e.userAssigned&&t.setUserAssignedById(e.userAssigned),t.formEditActivity.date.datepicker("option","minDate",new Date(t.getDateServer())),e.estimatedFinishDate&&r&&t.formEditActivity.date.datepicker("option","minDate",a),e.estimatedFinishDate&&(a&&t.formEditActivity.date.datepicker("setDate",a),t.estimatedFinishDateTime=e.estimatedFinishDate),e.duration&&t.formEditActivity.duration.val(parseInt(e.duration,10))},onClosePopupEdition:function(){this.removePopupWidgets()},setUserAssignedById:function(t){var e=this;e.callGetDataUsers(t).then((function(t){e.formEditActivity.assignee.val(t[0].name)})),e.formEditActivity.IdAssignee=t},onClickPopupButtonCancel:function(t){t.preventDefault(),this.removePopupWidgets()},removePopupWidgets:function(){this.formEditActivity.assignee.next().find("span").html(""),this.dialogBox.formContent.remove(),$("#ui-datepicker-div").remove()},onClickPopupButtonUpdate:function(){var t=this;if(t.validateParamsOfFormEditActivity()){var e=t.params.plan.activities.filter((function(e){return e.id.toUpperCase()===t.params.plan.idActivitySelected.toUpperCase()}))[0],i=t.formEditActivity.IdAssignee||bizagi.currentUser.idUser;""!=t.formEditActivity.duration.val()&&(t.params.plan.activities.filter((function(e){return e.id.toUpperCase()===t.params.plan.idActivitySelected.toUpperCase()}))[0].estimatedFinishDate="");var a={progress:e.progress,id:e.id,startDate:e.startDate,duration:t.formEditActivity.duration.val(),userAssigned:i,allowEdition:e.allowEdition,description:e.description,name:e.name,idPlan:e.idPlan,estimatedFinishDate:t.estimatedFinishDateTime,finishDate:e.finishDate,items:e.items};$.when(t.dataService.editActivityPlan(a)).done((function(){e=$.extend(e,a),t.removePopupWidgets(),t.beforeUserAssignedActivity!==t.formEditActivity.IdAssignee?t.pub("notify",{type:"ACTIVITYPLANCOMMENTS",args:$.extend(t.params,{refreshAllWidgets:!0})}):t.pub("notify",{type:t.params.showContextByMenuDashboard,args:t.params}),t.removePopupWidgets(),t.notifier.showSucessMessage(bizagi.localization.getResource("workportal-project-plan-activity-update-message"))}))}},onClickFavorite:function(t){t.preventDefault();var e=this,i={};$(t.target).hasClass("bz-icon-star-outline")?(i={idObject:e.params.idCase,favoriteType:"CASES"},$.when(e.dataService.addFavorite(i)).done((function(i){e.params.guidFavorite=i.idFavorites,$(t.target).removeClass("bz-icon-star-outline"),$(t.target).addClass("bz-icon-star")}))):(i={idObject:e.params.guidFavorite,favoriteType:"CASES"},$.when(e.dataService.delFavorite(i)).done((function(){$(t.target).addClass("bz-icon-star-outline"),$(t.target).removeClass("bz-icon-star")})))},clean:function(){this.unsub("LOAD_INFO_ACTIVITY_SUMMARY",$.proxy(this.onNotifyLoadInfoActivityExecution,this)),this.unsub("EXPANDED_RIGHT_SIDEBAR",$.proxy(this.onNotifyExpandedRightSidebar,this))},validateParamsOfFormEditActivity:function(){var t=this.formEditActivity.assignee;if(t.val()&&""!==t.val()&&this.formEditActivity.IdAssignee)return!0;var e=bizagi.localization.getResource("workportal-general-error-field-required");return e=e.replace("{0}",bizagi.localization.getResource("workportal-project-plan-assignee").toLowerCase()),t.next().find("span").html(e),!1},callGetDataUsers:function(t){var e=$.Deferred(),i={userIds:t,width:50,height:50};return this.dataService.getUsersData(i).always((function(t){e.resolve(t)})),e.promise()}}),bizagi.injector.register("bizagi.workportal.widgets.project.plan.activity.action",["workportalFacade","dataService","notifier",bizagi.workportal.widgets.project.plan.activity.action]),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.plan.activity.time",{},{init:function(t,e,i){this._super(t,e,i),this.EXECUTING_ACTIVITY="EXECUTING",this.FINISHED_ACTIVITY="FINISHED",this.datePickerRegional=bizagi.localization.getResource("datePickerRegional"),this.loadTemplates({"plan-time-main":bizagi.getTemplate("bizagi.workportal.desktop.project.plan.activity.time").concat("#project-plan-activity-time")})},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){this.sub("LOAD_INFO_ACTIVITY_SUMMARY",$.proxy(this.onNotifyLoadInfoActivitySummary,this))},onNotifyLoadInfoActivitySummary:function(t,e){var i=this;i.params=$.extend(i.params,e.args),i.getContent().empty();var a=i.params.plan.activities.filter((function(t){return t.id===i.params.plan.idActivitySelected}))[0];if(a.startDate){i.getStateActivity(a);var r={time:{fromDate:i.getFormattedDate(new Date(i.getFirstDate(a)))}},o=i.getDataByScenarios(a,!0);$.when(o.unitTime).done((function(t){o=$.extend(o,{unitTime:t}),i.updateWidget($.extend(r.time,o))}))}},updateWidget:function(t){var e=this.getContent().empty(),i=this.getTemplate("plan-time-main"),a=bizagi.util.dateFormatter.getRelativeTime(new Date(Date.now()-60*t.unitTime.minutes*1e3),null,!1),r=bizagi.localization.getResource("workportal-project-activity-state-"+t.keywordResource);t.messageTime=r.replace("%s",a),i.render(t).appendTo(e);var o=$(".remaining-days .time-remaining",e),n=$(".remaining-days .days",e).width();o.css("padding-left",(n+7).toString()+"px"),$(".remaining-days .bar-completed",e).css("width",t.percentBar+"%")},getStateActivity:function(t){return t.finishDate?(t.currentState=this.FINISHED_ACTIVITY,this.FINISHED_ACTIVITY):(t.currentState=this.EXECUTING_ACTIVITY,this.EXECUTING_ACTIVITY)},getFirstDate:function(t){return t.currentState===this.EXECUTING_ACTIVITY?t.startDate:t.finishDate},getDataByScenarios:function(t){var e={colorBar:null,percentBar:100,keywordResource:null,unitTime:null},i={};switch(t.currentState){case this.EXECUTING_ACTIVITY:e.keywordResource="opened",e.colorBar=this.getColorByCreatedAndEstimatedDate(t),i={idUser:bizagi.currentUser.idUser,fromDate:t.startDate,toDate:Date.now()},e.unitTime=this.callGetEffectiveDuration(i);break;case this.FINISHED_ACTIVITY:e.colorBar="Gray",e.keywordResource="closed",i={idUser:bizagi.currentUser.idUser,fromDate:t.finishDate,toDate:Date.now()},e.unitTime=this.callGetEffectiveDuration(i)}return e},getColorBar:function(t){return this.getDataByScenarios(t).colorBar},getPercentBar:function(t){return this.getDataByScenarios(t).percentBar},getKeywordResourceDescriptionBar:function(t){return this.getDataByScenarios(t).keywordResource},getUnitTime:function(t){return this.getDataByScenarios(t).unitTime},getColorByCreatedAndEstimatedDate:function(t){var e="Red";t.estimatedFinishDate&&(Date.now()<t.estimatedFinishDate&&(e=(new Date).getUTCDate()===new Date(t.estimatedFinishDate).getUTCDate()?"Yellow":"Green"));return e},getFormattedDate:function(t){return this.datePickerRegional.monthNames[t.getMonth()]+" "+bizagi.util.dateFormatter.formatDate(t,"dd hh:mm tt",bizagi.localization.getResource("datePickerRegional"))},callGetEffectiveDuration:function(t){var e=$.Deferred();return $.when(this.dataService.getEffectiveDuration(t)).done((function(t){e.resolve(t)})),e.promise()}}),bizagi.injector.register("bizagi.workportal.widgets.project.plan.activity.time",["workportalFacade","dataService",bizagi.workportal.widgets.project.plan.activity.time],!0),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.plan.activity.progress",{},{init:function(t,e,i){this._super(t,e,i),this.plugins={},this.dialogBox={},this.loadTemplates({"plan-progress-main":bizagi.getTemplate("bizagi.workportal.desktop.project.plan.activity.progress").concat("#project-plan-activity-progress"),"plan-progress-popup-edit":bizagi.getTemplate("bizagi.workportal.desktop.project.plan.activity.progress").concat("#project-plan-activity-edit-progress")})},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){this.sub("LOAD_INFO_ACTIVITY_SUMMARY",$.proxy(this.onNotifyLoadInfoActivityExecution,this)),this.sub("UPDATE_ITEMS_FROM_FORMRENDER",$.proxy(this.onNotifyUpdateItemFromRender,this))},onNotifyLoadInfoActivityExecution:function(t,e){var i=this;i.params=$.extend(i.params,e.args);var a=i.getContent().empty(),r=i.params.plan.activities.filter((function(t){return t.id.toUpperCase()==i.params.plan.idActivitySelected.toUpperCase()}))[0],o={valuePercentBarComplete:0};o.progress={progress:r.progress,canEdit:0===r.items.length},o.progress.progress&&(o.valuePercentBarComplete=o.progress.progress),i.getTemplate("plan-progress-main").render(o).appendTo(a),i.plugins.popupEditProgress=i.initPluginPopupEditProgress();var n=i.plugins.popupEditProgress;i.formEditProgress={sliderProgress:$("#sliderProgress",n).slider({orientation:"horizontal",range:"min",max:100,width:100,from:5,to:50,step:1,value:o.valuePercentBarComplete,slide:$.proxy(i.onChangesliderProgress,i),change:$.proxy(i.onChangesliderProgress,i)}).each((function(){for(var t=$(this).slider("option","max")-$(this).slider("option","min"),e=0;e<=t;e+=10){var i=$("<label class='step'>"+e+"</label>").css("left",e/t*100+"%");$(this).append(i)}})),numericTextBoxPlugin:$("#inputProgressNumericTextBox",n).spinner({format:"n0",min:0,max:100,spin:$.proxy(i.onChangeNumericTextBoxProgress,i),change:$.proxy(i.onChangeNumericTextBoxProgress,i),value:o.valuePercentBarComplete,decimals:0}),buttonChangeProgress:$("#button-accept-change-progress",n),buttonCancel:$("#button-cancel-change-progress",n)},$(".action-open-popup-edit-progress",a).on("click",$.proxy(i.onShowPopupEditProgress,i)),i.formEditProgress.buttonCancel.on("click",$.proxy(i.onClickCancel,i)),i.formEditProgress.buttonChangeProgress.on("click",$.proxy(i.onSubmitFormChangeProgress,i)),i.updateProgressUI(o.valuePercentBarComplete),i.formEditProgress.numericTextBoxPlugin.spinner("value",o.valuePercentBarComplete)},onNotifyUpdateItemFromRender:function(t,e){var i=e.args.items,a=e.args.activityWork;i.length>0?$(".action-open-popup-edit-progress",this.content).hide():$(".action-open-popup-edit-progress",this.content).show(),$(".bz-wp-timestamp span",this.content).text(a),$(".bz-wp-progress-bar",this.content).css("width",a+"%")},updateProgressUI:function(t){var e=this.getContent();$(".bz-wp-timestamp span",e).text(t);var i=$(".remaining-days .time-remaining",e),a=$(".remaining-days .days",e).width();i.css("padding-left",(a+7).toString()+"px"),$(".remaining-days .bar-completed",e).css("width",t.toString()+"%")},initPluginPopupEditProgress:function(){var t=this.getTemplate("plan-progress-popup-edit");return this.dialogBox.formContent=t.render(),this.dialogBox.formContent},onShowPopupEditProgress:function(){var t=this;t.dialogBox.formContent.dialog({resizable:!1,draggable:!1,height:"auto",width:"600px",modal:!0,title:bizagi.localization.getResource("workportal-project-plan-progress-title"),maximize:!0,open:$.proxy(t.onOpenPopupPlan,t),close:function(){t.dialogBox.formContent.dialog("destroy"),t.dialogBox.formContent.detach()}}),t.previusValueProgress=t.formEditProgress.sliderProgress.slider("value")},onChangeNumericTextBoxProgress:function(t){var e=this.formEditProgress.numericTextBoxPlugin.spinner("value");this.formEditProgress.sliderProgress.slider("value",e)},onChangesliderProgress:function(t){var e=this.formEditProgress.sliderProgress.slider("value");this.formEditProgress.numericTextBoxPlugin.spinner("value",e)},onClickCancel:function(t){t.preventDefault();this.dialogBox.formContent.dialog("destroy"),this.dialogBox.formContent.detach(),this.formEditProgress.sliderProgress.slider("value",this.previusValueProgress),this.formEditProgress.numericTextBoxPlugin.spinner("value",this.previusValueProgress)},onSubmitFormChangeProgress:function(t){t.preventDefault();var e=this;e.formEditProgress.buttonChangeProgress.prop("disabled",!0);var i=e.params.plan.activities.filter((function(t){return t.id==e.params.plan.idActivitySelected}))[0],a=$.extend(i,{progress:e.formEditProgress.numericTextBoxPlugin.spinner("value"),idPlan:e.params.plan.id});$.when(e.dataService.editActivityPlan(a)).done((function(){e.formEditProgress.buttonChangeProgress.prop("disabled",!1),i.progress=e.formEditProgress.numericTextBoxPlugin.spinner("value"),e.updateProgressUI(i.progress),e.dialogBox.formContent.dialog("destroy"),e.dialogBox.formContent.detach()}))}}),bizagi.injector.register("bizagi.workportal.widgets.project.plan.activity.progress",["workportalFacade","dataService",bizagi.workportal.widgets.project.plan.activity.progress],!0),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.plan.activity.subprocesses",{},{init:function(t,e,i){this._super(t,e,i),this.loadTemplates({"project-subprocesses":bizagi.getTemplate("bizagi.workportal.desktop.project.plan.activity.subprocesses").concat("#project-plan-activity-plan-subprocesses-wrapper"),"project-subprocesses-tootip-custom-properties":bizagi.getTemplate("bizagi.workportal.desktop.project.plan.activity.subprocesses").concat("#project-activity-plan-subprocesses-tooltip-custom-properties-wrapper")})},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){}}),bizagi.injector.register("bizagi.workportal.widgets.project.plan.activity.subprocesses",["workportalFacade","dataService",bizagi.workportal.widgets.project.plan.activity.subprocesses]),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.plan.activity.parent",{},{init:function(t,e,i){this._super(t,e,i),this.loadTemplates({"plan-parent-main":bizagi.getTemplate("bizagi.workportal.desktop.project.plan.activity.parent").concat("#project-plan-activity-parent")})},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){this.sub("LOAD_INFO_ACTIVITY_SUMMARY",$.proxy(this.onNotifyLoadInfoActivityExecution,this))},onNotifyLoadInfoActivityExecution:function(t,e){var i=this;i.params=$.extend(i.params,e.args);var a=i.getContent().empty();$.when(i.dataService.getPlanParent({idPlan:i.params.plan.id})).done((function(t){if(i.params.plan.parent=t,i.params.plan.parent){var e={};e.parent={idParent:i.params.plan.parent.radNumber,nameParent:i.params.plan.parent.displayName,idCase:i.params.plan.parent.idCase,idWorkflow:i.params.plan.parent.idWorkflow,idWorkItem:i.params.plan.parent.idWorkItem,idTask:i.params.plan.parent.idTask},i.getTemplate("plan-parent-main").render(e).appendTo(a),$("#go-to-parent-case",a).on("click",$.proxy(i.onClickGoToParentCase,i))}}))},onClickGoToParentCase:function(t){t.preventDefault();this.routingExecute($(t.target).closest("#go-to-parent-case"))}}),bizagi.injector.register("bizagi.workportal.widgets.project.plan.activity.parent",["workportalFacade","dataService",bizagi.workportal.widgets.project.plan.activity.parent],!0),bizagi.workportal.widgets.widget.extend("bizagi.workportal.widgets.project.plan.activity.users",{},{init:function(t,e,i){this.usersMap={},this.plugins={},this.usersInformation=[],this.globalHandlersService=bizagi.injector.get("globalHandlersService"),this.usersAssignees=[],this._super(t,e,i),this.loadTemplates({"plan-users-main":bizagi.getTemplate("bizagi.workportal.desktop.project.plan.users").concat("#project-plan-users")})},renderContent:function(){return this.content=$("<div></div>"),this.content},postRender:function(){this.sub("LOAD_INFO_ACTIVITY_SUMMARY",$.proxy(this.onNotifyLoadInfoActivityExecution,this))},activityRunning:function(t){return null!==t.startDate&&null===t.finishDate},onNotifyLoadInfoActivityExecution:function(t,e){var i=this,a=[],r=[],o=i.getContent().empty();i.params=$.extend(i.params,e.args);var n=i.params.plan.idUserCreator,s=i.params.plan.idUserCreator;r.push({idUser:n,guidUser:s,userType:["owner"]}),i.usersMap["-"+n+"-"]={picture:"",id:n,guid:s,name:"",userType:["owner"]},a.push(s),$.each(i.params.plan.activities,(function(t,e){if(i.activityRunning(e)){var o=e.userAssigned,s=e.userAssignedGuid;if(o===n)-1===$.inArray("Assigned",r[0].userType)&&(r[0].userType.push("Assigned"),i.usersMap["-"+n+"-"].userType.push("Assigned"));else if(i.usersMap["-"+o+"-"]={picture:"",id:o,name:"",userType:["Assigned"]},0===r.filter((function(t){return t.idUser==o})).length){var p=s||o;r.push({idUser:p,userGuid:p,userType:["Assigned"]}),a.push(p)}}})),i.activitiesUsers=r,i.getTemplate("plan-users-main").render({assignee:i.justAssignees(r),label:bizagi.localization.getResource("workportal-project-plan-assignee")}).appendTo(o),i.addEventHandlersModal(),$.when(i.callGetDataUsers(a)).then((function(){i.showCreatorInformation(n),i.renderUserProfilesAndImages()}))},justAssignees:function(t){var e=[];return t.map((function(t){var i=-1!==t.userType.indexOf("owner"),a=-1!==t.userType.indexOf("Assigned");e.push(usersAdapter.createJsonUserInfo(t.idUser,"","","","","",a,i,[],[]))})),usersAdapter.justAssignees(e)},showCreatorInformation:function(t){var e=this.usersMap["-"+t+"-"],i=usersAdapter.createJsonUserInfo(e.id,e.name,e.username,e.picture?e.picture:void 0,e.email,e.name.getInitials(),!1,!0,[],[]);this.content.find(".ui-bizagi-wp-project-plan-users .ui-bizagi-wp-project-users-creator-info").userinformation(this,{user:i})},renderUserProfilesAndImages:function(){var t=this;$.each(t.usersMap,(function(e,i){var a=$(".ui-bizagi-wp-userlist li[data-iduser="+i.id+"]",t.content);""!==i.picture?a.find("img").prop("src",i.picture):(a.find("img").hide(),void 0!==i.name?a.find("span").html(i.name.getInitials()):console.log("obj.name is undefined"))})),$(".ui-bizagi-wp-userlist li",t.content).not(".moreUsers").on("mouseenter",(function(e){var i,a=$(e.target),r=$(this).data("iduser");$.each(t.usersMap,(function(t,e){e.id===r&&(i=e)}));var o=t.usersAssignees.find((function(t){return t.userAssigned===i.id})),n=[];o&&o.activities.map((function(t){n.push(t.name)}));var s=usersAdapter.createJsonUserInfo(i.id,i.name,i.username,i.picture,i.email,i.name.getInitials(),t.getIsAssignee(i),t.getIsOwner(i),n,void 0);a.parent().usertooltip(t,{target:a,user:s})}))},getIsAssignee:function(t){return t.userType.indexOf("Assigned")>-1},getIsOwner:function(t){return t.userType.indexOf("owner")>-1},callGetDataUsers:function(t){var e,i=this,a=$.Deferred();return e={usersGuids:t.join(),width:50,height:50},$.when(i.dataService.getUsersData(e)).always((function(t){i.usersInformation=t;for(var e=0,r=t.length;e<r;e+=1)void 0===t[e].name?bizagi.log(t[e]+" Id Not Found",t,"error"):i.usersMap["-"+t[e].id+"-"]?(i.usersMap["-"+t[e].id+"-"].picture+=t[e].picture?"data:image/png;base64,"+t[e].picture:"",i.usersMap["-"+t[e].id+"-"].name=t[e].name||"",i.usersMap["-"+t[e].id+"-"].username=t[e].username||"",i.usersMap["-"+t[e].id+"-"].email=t[e].email||""):console.log("The object is undefined");i.getUsersAssignees(),a.resolve()})),a.promise()},getUsersAssignees:function(){for(var t=0;t<this.usersInformation.length;t++)this.usersAssignees.push(this.getUserAssignee(this.usersInformation[t]))},getUserAssignee:function(t){var e=this,i=[];$.each(e.params.plan.activities,(function(a,r){r.userAssigned===t.id&&e.activityRunning(r)&&i.push({name:r.name})})),t.tasks=i;var a=e.activitiesUsers.find((function(e){return e.idUser==t.id}));return t.userType=a.userType,usersAdapter.createJsonUserInfo(t.id,t.name,t.username,t.picture?"data:image/png;base64,"+t.picture:void 0,t.email,t.name.getInitials(),e.getIsAssignee(t),e.getIsOwner(t),t.tasks,[])},addEventHandlersModal:function(){var t=this;$(".moreUsers").click((function(e){e.preventDefault(),e.stopPropagation();var i=t.usersAssignees||[];t.globalHandlersService.publish("showDialogWidget",{widgetName:bizagi.workportal.widgets.widget.BIZAGI_WORKPORTAL_WIDGET_USERS_MODAL,closeVisible:!0,data:i,maximize:!0,modalParameters:{title:bizagi.localization.getResource("workportal-project-users-title")+" ("+i.length+")",width:790,height:526,refreshInbox:!1}})}))}}),bizagi.injector.register("bizagi.workportal.widgets.project.plan.activity.users",["workportalFacade","dataService",bizagi.workportal.widgets.project.plan.activity.users],!0);
//# sourceMappingURL=../../../../Maps/desktop/activityplan.desktop.production.js.map
