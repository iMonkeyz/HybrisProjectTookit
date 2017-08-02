/**
 * Impex核心代码: 内容模板, 页面动态元素处理, 事件初始化, 本地存储...
 * Author: Jesse.Haijian Zhou
 * Date: 2017-02-24
 * (c) Copyright 2017 Jesse. All Rights Reserved. 
 */
var Impex = {
	init: function (container) {
		this.Html.Generator.init(container);
		this.Html.Events.init(container);
		this.Storage.init(container);
	},
	Template: {
		HEADER: function () {
			var s = '';
			s = s + '$ctgVersion=Staged'+'\n';
			s = s + '$contentCatalog=hybrisContentCatalog'+'\n';
			s = s + '$contentCV=catalogVersion(CatalogVersion.catalog(Catalog.id[default=$contentCatalog]),CatalogVersion.version[default=$ctgVersion])[default=$contentCatalog:$ctgVersion]'+'\n';
			s = s + '$siteResource=jar:com.aswatson.pns.core.setup.CoreSystemSetup&/pnscore/import/tenant/PNSHK/contentCatalogs/$contentCatalog'+'\n';
			s = s + '$jarResourceCms=jar:com.aswatson.pns.core.setup.CoreSystemSetup&/pnscore/import/tenant/PNSHK/cockpits/cmscockpit'+'\n';
			s = s + ''+'\n';
			s = s + '$wideContent=CMSImageComponent,SimpleBannerComponent,BannerComponent,ImageMapComponent,RotatingImagesComponent,ProductCarouselComponent,CMSParagraphComponent,IgcAdvancedProductCarouselComponent'+'\n';
			s = s + '$narrowContent=ProductFeatureComponent,CategoryFeatureComponent,CMSImageComponent,SimpleBannerComponent,BannerComponent,ImageMapComponent,RotatingImagesComponent,ProductCarouselComponent,CMSParagraphComponent'+'\n';
			s = s + '$footerContent=CMSLinkComponent,CMSParagraphComponent,FooterComponent,IgcSocialBannerFooterComponent'+'\n';
			s = s + ''+'\n';
			s = s + '$versionName=Staged'+'\n';
			s = s + '$productCatalog=hybrisProductCatalog'+'\n';
			s = s + '$productCV=catalogVersion(catalog(id[default=$productCatalog]),version[default=$versionName])[unique=true,default=$productCatalog:$versionName]'+'\n';
			s = s + ''+'\n';
			s = s + '$mediaTranslator=de.hybris.platform.impex.jalo.media.MediaDataTranslator'+'\n';
			s = s + '$fileTranslator=de.hybris.platform.commerceservices.impex.impl.FileLoaderValueTranslator'+'\n';
			s = s + ''+'\n';
			s = s + '$lang=en'+'\n';
			return s;
		},
		Components: {
			Media: function () {
				var fields = new Array();
				fields.push( {name: "$contentCV", unique: true, auto: true} );
				fields.push( {name: "code", unique: true, eg: "Img_SampleID"} );
				fields.push( {name: "realfilename", required: true, eg: "photo-sample.jpg"} );
				fields.push( {name: "@media[translator=$mediaTranslator]", required: true, eg: "$siteResource/module/img/sample/photo-sample.jpg"} );
				fields.push( {name: "mime", default: "image/jpeg"} );
				fields.push( {name: "altText"} );
				
				return [{ type: "Media", fields: fields }];
			},
			CMSLinkComponent: function () {
				var fields = new Array();
				fields.push( {name: "$contentCV", unique: true, auto: true} );
				fields.push( {name: "uid", unique: true, eg: "Link_SampleID"} );
				fields.push( {name: "name", required: true, eg: "Link SampleID Name"} );
				fields.push( {name: "linkName[lang=en]", eg: "English"} );
				fields.push( {name: "linkName[lang=zt]", eg: "中文"} );
				fields.push( {name: "url", eg: "/url"} );
				
				return [{ type: "CMSLinkComponent", fields: fields }];
			},
			Paragraph: function () {
				var s = "";
				return s;
			}
		},
		HMC: {
			ConfigParameter: function () {
				var fields = new Array();
				fields.push( {name: "group", unique: true, eg: "FRONTEND"} );
				fields.push( {name: "key", unique: true, eg: "SampleKey"} );
				fields.push( {name: "value", required: true, eg: "SampleValue"} );
				fields.push( {name: "type", default: "java.lang.String "} );
				
				return [{ type: "ConfigParameter", fields: fields }];
			},
			CronJob: function () {
				var types = [
					{
						type: "ServicelayerJob",
						fields: [
							{name: "code", required: true, unique: true, eg: "SampleJobIdOfSpringID"},
							{name: "springId", required: true, eg: "sampleJobIdOfSpringID"}
						]
					},{
						type: "CronJob",
						fields: [
							{name: "code", required: true, unique: true, eg: "SampleJobID"},
							{name: "job(code)", required: true, eg: "SampleJobIdOfSpringID"},
							{name: "singleExecutable", default: "false"},
							{name: "sessionLanguage(isocode)", default: "en"}
						]
					},{
						type: "Trigger",
						fields: [
							{name: "cronjob", required: true, unique: true, eg: "SampleJobID"},
							{name: "cronExpression", required: true, eg: "0 0 5 10 * ?"},
							{name: "maxAcceptableDelay", default: "30"},
							{name: "active", default: "true"}
						]
					}
				];
				
				return types;
			},
		},
		WCMS: {
			PageTemplate: function () {
				var fields = new Array();
				fields.push( {name: "$contentCV", unique: true, auto: true} );
				fields.push( {name: "uid", unique: true, eg: "PageTemplate_SampleID"} );
				fields.push( {name: "name", required: true, eg: "Sample Page Template Name"} );
				fields.push( {name: "frontendTemplateName", required: true, eg: "layout/sampletemplate"} );
				fields.push( {name: "restrictedPageTypes(code)", default: "ContentPage"} );
				fields.push( {name: "velocityTemplate[translator=$fileTranslator]", eg: "$jarResourceCms/structure-view/structure_sampletemplate.vm"} );
				fields.push( {name: "active", default: "true"} );
				
				return [{ type: "PageTemplate", fields: fields }];
			},
			ContentPage: function () {
				var fields = new Array();
				fields.push( {name: "$contentCV", unique: true, auto: true} );
				fields.push( {name: "uid", unique: true, eg: "ContentPage_SampleID"} );
				fields.push( {name: "name", required: true, eg: "Sample Content Page Name"} );
				fields.push( {name: "masterTemplate(uid,$contentCV)", required: true, eg: "PageTemplate_SampleID"} );
				fields.push( {name: "label", required: true, eg: "/samplepage"} );
				fields.push( {name: "defaultPage", default: "true"} );
				fields.push( {name: "approvalStatus(code)", default: "approved"} );
				fields.push( {name: "homepage", default: "false"} );
				
				return [{ type: "ContentPage", fields: fields }];
			},
			ContentSlot: function () {
				var fields = new Array();
				fields.push( {name: "$contentCV", unique: true, auto: true} );
				fields.push( {name: "uid", unique: true, eg: "ContentSlot_SampleID"} );
				fields.push( {name: "name", required: true, eg: "Sample Content Slot Name"} );
				fields.push( {name: "active", default: "true"} );
				fields.push( {name: "cmsComponents(uid,$contentCV)", required: true, eg: "Component1,Component2,Component3 ..."} );

				return [{ type: "ContentSlot", fields: fields }];
			},
			ContentSlotForPage: function () {
				var fields = new Array();
				fields.push( {name: "$contentCV", unique: true, auto: true} );
				fields.push( {name: "uid", unique: true, eg: "CSFP_SampleID"} );
				fields.push( {name: "position", unique: true, eg: "SlotName/SlotPosition"} );
				fields.push( {name: "page(uid,$contentCV)", unique: true, eg: "ContentPage_SampleID"} );
				fields.push( {name: "contentSlot(uid,$contentCV)", unique: true, eg: "ContentSlot_SampleID"} );
				
				return [{ type: "ContentSlotForPage", fields: fields }];
			},
			ContentSlotForTemplate: function () {
				var fields = new Array();
				fields.push( {name: "$contentCV", unique: true, auto: true} );
				fields.push( {name: "uid", unique: true, eg: "CSFT_SampleID"} );
				fields.push( {name: "position", unique: true, eg: "SlotName/SlotPosition"} );
				fields.push( {name: "pageTemplate(uid,$contentCV)", unique: true, eg: "PageTemplate_SampleID"} );
				fields.push( {name: "contentSlot(uid,$contentCV)", unique: true, eg: "ContentSlot_SampleID"} );
				fields.push( {name: "allowOverwrite", default: "true"} );
				
				return [{ type: "ContentSlotForTemplate", fields: fields }];
			},
			ContentSlotName: function () {
				var fields = new Array();
				fields.push( {name: "template(uid,$contentCV)", unique: true, eg: "PageTemplate_SampleID"} );
				fields.push( {name: "name", unique: true, eg: "SlotName/SlotPosition"} );
				fields.push( {name: "validComponentTypes(code)", unique: true, eg: "Media, CMSLinkComponent, CMSParagraphComponent ..."} );
				
				return [{ type: "ContentSlotName", fields: fields }];
			}
		},
		FindTemplateByID: function (id) {
			switch ( parseInt(id) ) {
				case 0  : return this.HEADER();
				case 101: return this.Components.Media();
				case 102: return this.Components.CMSLinkComponent();
				case 103: return this.Components.Paragraph();
				case 201: return this.HMC.ConfigParameter();
				case 202: return this.HMC.CronJob();
				case 301: return this.WCMS.PageTemplate();
				case 302: return this.WCMS.ContentPage();
				case 303: return this.WCMS.ContentSlot();
				case 304: return this.WCMS.ContentSlotForPage();
				case 305: return this.WCMS.ContentSlotForTemplate();
				case 306: return this.WCMS.ContentSlotName();
			}
		}
	},
	Html: {
		generate: function (moduleID, manualIndexNo, datas) {
			if ( manualIndexNo != null ) {
				moduleID = manualIndexNo.split("_")[1];
			}
			this.Generator[ moduleID == 0 ? "HEADER" : "OTHERS" ] (moduleID, manualIndexNo, datas);
		},
		Generator:{
			container: null,
			init: function (container) {
				this.container = container;
			},
			HEADER: function (moduleID, manualIndexNo, datas) {
				var that = this;
				var content = Impex.Template.FindTemplateByID(moduleID);
				var panel = this.Factory.advanced(true);
				panel.find(".panel-title").append(function () {
				    return $("<span>").addClass("text-success").append($("<strong>").text("HEADER"));
				});
				panel.find(".panel-body").append( that.Factory.Widgets.TEXTAREA(content) );
				this.Factory.addOnIndexNoLabel(panel, "Header", moduleID, manualIndexNo);
				this.Factory.addOnHeaderMenu(panel);
				this.appendToContainer( this.Factory.fillIntoRow(panel, moduleID) );
				
				if ( datas != null ) {
					$(panel).find("textarea").val(datas);
				}
			},
			OTHERS: function (moduleID, manualIndexNo, datas) {
				var that = this;
				var types = Impex.Template.FindTemplateByID(moduleID);
				var panel = this.Factory.Base.panel();
				var tableID = 0;
				for ( var obj of types ) {
					var headerText = obj.type + ";";
					var panelHeader = this.Factory.Base.header();
					var table = this.Factory.Base.table(tableID++);
					var panelFooter = this.Factory.Base.footer();
					var trHead = $("<tr>");
					var trEg = $("<tr>").addClass("row-eg");
					var trBody = $("<tr>");
					for ( var field of obj.fields ) {
						if ( field.auto != null & field.auto ) {
							headerText = headerText + that.Utils.fieldParser(field);
						} else {
							trHead.append( $("<th>").text(that.Utils.fieldParser(field)) );
							trEg.append( $("<td>").text(field.eg) );
							trBody.append( $("<td>").append( that.Factory.Widgets.INPUT(field) ) );
						}
					}
					if ( trHead.children().length > 0 ) {
						trHead.append( $("<th>").addClass("col-operation") ); //for operation
						trBody.append( that.Factory.addOnOperationMenu( $("<td>").addClass("text-center col-operation") ) );
					}
					panelHeader.find(".panel-title").append(function () {
						return $("<span>").addClass("script-part").append($("<strong>").addClass("text-success").text("INSERT_UPDATE" + " ")).append( $("<b>").text(headerText) );
					});
					table.find("thead").append(trHead).append(trEg);
					table.data("default-create-line", trBody);
					
					panel.append(panelHeader).append(table).append(panelFooter);
				}
				this.Factory.addOnIndexNoLabel(panel, types[0].type, moduleID, manualIndexNo);
				this.Factory.addOnHeaderMenu(panel);
				this.Factory.addOnFooterMenu(panel);
				this.Factory.divideMultiPanel(panel);
				
				//prefill datas from localStorage
				if ( !$.isEmptyObject(datas) ) {
					for ( var data of datas ) {
						Impex.Html.Events.Actions.createLine( that.Utils.findTableByID(panel, data.tableID), data);
					}
				}
				
				this.appendToContainer( this.Factory.fillIntoRow(panel, moduleID) );
			},
			Utils: {
				fieldParser: function (field) {
					return field.name + (field.unique ? "[unique=true];" : field.default != null ? "[default=" + field.default + "];" : ";");
				},
				findTableByID: function (dom, id) {
					return $(dom).find("[data-table-id='" + id + "']");
				}
			},
			Factory: {
				Base: {
					header: function () {
						return $("<div>").addClass("panel-heading").append(function () {
							return $("<h3>").addClass("panel-title");
						});
					},
					body: function () {
						return $("<div>").addClass("panel-body");
					},
					footer: function () {
						return $("<div>").addClass("panel-footer");
					},
					panel: function (css) {
						return $("<div>").addClass("panel").addClass("module-panel").addClass(css != null ? css : "panel-info");
					},
					table: function (tableID, css) {
						return $("<table>").attr("data-table-id", tableID).addClass("table").addClass("module-table").addClass(css != null ? css : "table-hover table-condensed").append( $("<thead>") ).append( $("<tbody>") );
					},
					divider: function () {
						return $("<div>").addClass("divider");
					}
				},
				advanced: function (needFooter) {
					var modules = this.Base;
					return modules.panel().append( modules.header() ).append( modules.body() ).append( needFooter ? modules.footer() : "" );
				},
				fillIntoRow: function (dom, moduleID) {
					return $("<div>").attr({"data-module-id": moduleID}).addClass("row").append(dom);
				},
				addOnIndexNoLabel: function (dom, moduleName, moduleID, manualIndexNo) {
					var span = this.Widgets.indexNo();
					span.find("span").attr({
						id: manualIndexNo != null ? manualIndexNo : "M_" + moduleID + "_" + new Date().getTime(),
						"data-toggle": "tooltip", 
						"data-placement": "top",
						"data-original-title": moduleName
					});
					dom.prepend( span );
				},
				addOnHeaderMenu: function (dom) {
					var that = this;
					dom.find(".panel-title").first().prepend('\n').prepend(this.Widgets.calcSwitch()).append(function () {
						return $("<div>").addClass("pull-right").append(function () {
							return $("<div>").addClass("btn-group btn-group-xs").append(that.Widgets.moveUp()).append(that.Widgets.moveDown());
						}).append('\n').append(that.Widgets.removeModule(dom));
					});
				},
				addOnFooterMenu: function (dom) {
					var that = this;
					dom.find(".panel-footer").append(function () {
						return $("<div>").addClass("row").append(function () {
							return $("<div>").addClass("col-md-10").append(that.Widgets.removeLineMsg());
						}).append(function () {
							return $("<div>").addClass("col-md-2").append(function () {
								return $("<div>").addClass("text-right").append(function () {
									return $("<span>").addClass("badge data-rows").text(0);
								}).append('\n').append(that.Widgets.createLine());
							});
						});
					});
				},
				addOnOperationMenu: function (td) {
					var that = this;
					return td.append(function () {
						return $("<div>").addClass("btn-group btn-group-xs").append(that.Widgets.eraseLine()).append(that.Widgets.removeLine());
					});
				},
				divideMultiPanel: function (dom) {
					var that = this;
					dom.find(".panel-footer").after(that.Base.divider());
				},
				Widgets: {
					indexNo: function () {
						return $("<span>").addClass("label label-warning index-no").append( $("<span>") );
					},
					calcSwitch: function () {
						return $("<div>").addClass("bootstrap-switch bootstrap-switch-mini calc-switch").append(function () {
							return $("<input>").prop("type", "checkbox").data({
								"on-color": "primary", "off-color": "danger", 
								"on-text": "<i class='glyphicon glyphicon-ok'></i>", "off-text": "<i class='glyphicon glyphicon-remove'></i>"
							}).prop("checked", true);
						});
					},
					moveUp: function () {
						return this.BUTTON("btn-move-up").addClass("btn-default").text(" " + "上移").prepend(function (){
							return $("<i>").addClass("glyphicon glyphicon-arrow-up");
						});
					},
					moveDown: function () {
						return this.BUTTON("btn-move-down").addClass("btn-default").text(" " + "下移").prepend(function (){
							return $("<i>").addClass("glyphicon glyphicon-arrow-down");
						});
					},
					removeModule: function (dom) {
						var that = this;
						return this.BUTTON("btn-remove-module").addClass("btn-danger btn-xs").text(" " + "删除模块").data({
							container: dom, toggle: "popover", trigger: "focus", placement: "bottom", content: this.BUTTON("btn-remove-module-confirm").addClass("btn-warning btn-xs").text("确认")
						}).prepend(function (){
							return $("<i>").addClass("glyphicon glyphicon-trash");
						});
					},
					removeModuleMask: function (row) {
						var that = this;
						var text = "模块将会在 10 秒之后被移除! ";
						var w = $(row).find(".panel").width();
						var h = $(row).find(".panel").height();
						$(row).find(".panel").prepend(function () {
							return $("<div>").addClass("before-remove-module-mask").css({height: h}).animate({width: w}).append(function () {
								return $("<div>").append(function () {
									return $("<span>").addClass("text-danger").text(text);
								}).append(function () {
									return that.BUTTON("btn-remove-module-cancel").addClass("btn-warning btn-sm").text("取消");
								});
							});
						});
					},
					notJoiningCalcMask: function (row) {
						var that = this;
						var text = "此模块已设定为不参与脚本生成"
						var w = $(row).find(".panel").width();
						var h = $(row).find(".panel").height();
						$(row).addClass("not-joining-calc-module").find(".panel").prepend(function () {
							return $("<div>").addClass("not-joining-calc-mask").css({width: w}).animate({height: h}).append(function () {
								return $("<div>").append(function () {
									return $("<span>").addClass("text-danger").text(text);
								});
							});
						});
					},
					removeLine: function () {
						return this.BUTTON("btn-remove-line").addClass("btn-default btn-xs").append(function () {
							return $("<i>").addClass("glyphicon glyphicon-trash");
						});
					},
					removeLineMsg: function () {
						var text = "删除行操作将在 10 秒之后自动保存, 如需 撤销删除 请立即刷新页面! 在此提示消失之前自动保存将暂时关闭."
						return $("<div>").addClass("text-danger module-msg hidden").append(function () {
							return $("<i>").addClass("glyphicon glyphicon-exclamation-sign");
						}).append(function () {
							return $("<span>").addClass("countdown").text(" " + text); 
						}); 
					},
					eraseLine: function () {
						return this.BUTTON("btn-erase-line").addClass("btn-default btn-xs").append(function () {
							return $("<i>").addClass("glyphicon glyphicon-erase");
						});
					},
					createLine: function () {
						return this.BUTTON(" btn-create-line").addClass("btn-primary btn-xs").text(" " + "添加新行").prepend(function () {
							return $("<i>").addClass("glyphicon glyphicon-chevron-right");
						});
					},
					BUTTON: function (css) {
						return $("<button>").prop("type", "button").addClass("btn").addClass(css);
					},
					INPUT: function (field) {
						if ( field.unique ) {
							return $("<input>").prop({
								"type": "text",
								"placeholder": field.default,
								"spellcheck": false
							}).addClass("form-control input-sm data-field").addClass("data-unique data-required");
						} else {
							return $("<textarea>").prop({
								"rows": 1,
								"placeholder": field.default,
								"spellcheck": false
							}).addClass("form-control textarea-sm data-field").addClass( field.required ? "data-required" : "" );
						}
						/*
						 return $("<input>").prop({
								"type": "text",
								"placeholder": field.default,
								"spellcheck": false
							}).addClass("form-control input-sm data-field").addClass(function () {
								return field.unique ? "data-unique data-required" : field.required ? "data-required" : "";
							});
						*/
						
					},
					TEXTAREA: function (content) {
						return $("<textarea>").prop({
							"spellcheck": false,
							"rows": 20
						}).addClass("form-control data-field").val( content );
					}
				}
			},
			appendToContainer: function (dom) {
				//module-id is 0 means header and it's position is always at 1st of container
				$(this.container)[ dom.data("module-id") == 0 ? "prepend" : "append" ] ( $(dom).css("opacity", 0).animate({opacity: 1, transform: 'scale(1)'}) );
				
				//render remove module block
				$(".btn-remove-module").popover( {html:true} );
				//render checkbox
				$("[type='checkbox']").bootstrapSwitch({
					onSwitchChange: function (e, state) {
						Impex.Html.Events.Actions.calcSwitch( $(e.target).parents(".row"), state );
					}
				});
				//render index numbers
				this.renderNavigationBar();
			},
			renderNavigationBar: function () {
				
				//reindex and record current rows order
				var order = {};
				$(this.container).children(".row").each(function () {
					$(this).find(".index-no span").text( $(this).index() + 1 );
					order[$(this).index()] = $(this).find(".index-no span").prop("id");
				});
				Impex.Storage.Utils.ModulesOrder.set(order);
				//clear bar
				$(".impex-block-nav").find("ul.pagination").find("li:gt(0)").remove();
				//generate bar
				$(".index-no span").each(function () {
					var span = this;
					$(".impex-block-nav").find("ul.pagination").append(function () {
						return $("<li>").append(function () {
							return $("<a>").append( $(span).clone() ).attr("href", "javascript:void(0);" );
						});
					});
				});
				//jump to module
				$(".impex-block-nav").find("ul.pagination").find("li:gt(0) a").on("click", function () {
					var top = $("#" + $(this).find("span").attr("id")).offset().top - 60;
					$("html, body").animate({
						scrollTop: top
					}, {
						duration: 300,
						easing: "swing"
					});
				});
				this.renderTooltip();
			},
			renderTooltip: function () {
				$("[data-toggle='tooltip']").tooltip();
			},
			allFieldValidation: function () {
				var that = this;
				$(this.container).find(".data-field").each(function () {
					Impex.Html.Events.Actions.fieldValidation( this );
				});
			}
		},
		Events: {
			container: null,
			hidden: {opacity: 0, transform: 'scale(0.001)'},
			visible: {opacity: 1, transform: 'scale(1)'},
			init: function (container) {
				this.container = container;
				this.moveUp();
				this.moveDown();
				this.removeModuleConfirm();
				this.removeModuleCancel();
				this.eraseLine();
				this.removeLine();
				this.createLine();
				this.fieldValidation();
			},
			moveUp: function () {
				var that = this;
				$(this.container).on("click", ".btn-move-up", function () {
					var row = $(this).parents(".row");
					var next = $(row).prev();
					if ( next.length != 0 ) {
						$(row).animate(that.hidden, "fast", function () {
							$(next).animate(that.hidden, "fast", function (){
								$(next).insertAfter( row );
								Impex.Html.Generator.renderNavigationBar();
								$(next).animate(that.visible, "fast", function () {
									$(row).animate(that.visible);
								});
							});
						});
					}
				});
			},
			moveDown: function () {
				var that = this;
				$(this.container).on("click", ".btn-move-down", function () {
					var row = $(this).parents(".row");
					var next = $(row).next();
					if ( next.length != 0 ) {
						$(row).animate(that.hidden, "fast", function () {
							$(next).animate(that.hidden, "fast", function (){
								$(next).insertBefore( row );
								Impex.Html.Generator.renderNavigationBar();
								$(next).animate(that.visible, "fast", function () {
									$(row).animate(that.visible);
								});
							});
						});
					}
				});
			},
			removeModuleConfirm: function () {
				var that = this;
				$(this.container).on("click", ".btn-remove-module-confirm", function () {
					that.Actions.removeModuleConfirm( $(this).parents(".row") );
				});
			},
			removeModuleCancel: function () {
				var that = this;
				$(this.container).on("click", ".btn-remove-module-cancel", function () {
					that.Actions.removeModuleCancel( $(this).parents(".row") );
				});
			},
			eraseLine: function () {
				var that = this;
				$(this.container).on("click", ".btn-erase-line", function () {
					that.Actions.eraseLine( $(this).parents("tr") );
				});
			},
			removeLine: function () {
				var that = this;
				$(this.container).on("click", ".btn-remove-line", function () {
					var table = $(this).parents("table");
					$(this).parents("tr").animate(that.hidden, function () {
						$(this).remove();
						Impex.Storage.delaySave( table );
						that.Actions.renderDataRows( table );
					});
				});
			},
			createLine: function () {
				var that = this;
				$(this.container).on("click", ".btn-create-line", function () {
					var table = $(this).parents(".panel-footer").prev("table");
					that.Actions.createLine( table );
				});
			},
			fieldValidation: function () {
				var that = this;
				$(this.container).on("blur", ".data-field", function () {
					//that.Actions.fieldValidation( this );
				});
			},
			Actions: {
				calcSwitch: function (row, state) {
					if ( state ) {
						//remove mask
						$(row).find(".not-joining-calc-mask").animate({height: 0}, function () {
							$(this).remove();
						});
						$(row).removeClass("not-joining-calc-module");
					} else {
						Impex.Html.Generator.Factory.Widgets.notJoiningCalcMask(row);	//setup mask
					}
				},
				eraseLine: function (tr) {
					$(tr).find(".data-field").val("");
					$(tr).find(".data-required").each(function () {
						if ( $.trim($(this).val()) == "" ) {
							$(this).parents("td").addClass("has-error");
						}
					});
				},
				createLine: function (table, data) {
					var new_line = $(table).data("default-create-line").clone(true);
					//fill data
					if ( data != null ) {
						//console.log( JSON.stringify(data) );
						$(new_line).find("td").each(function () {
							$(this).find(".data-field").val( data.tds[$(this).index()] );
						});
					} else {
						this.eraseLine( new_line );
						//$(new_line).find(".btn-erase-line").trigger("click");
					}
					$(table).find("tbody").append( $(new_line).css("opacity", 0).animate({opacity: 1, transform: 'scale(1)'}) );
					this.renderDataRows( table );
				},
				removeModuleConfirm: function (row) {
					Impex.Html.Generator.Factory.Widgets.removeModuleMask(row);	//setup remove module mask
					
					var id = $(row).find(".index-no span").attr("id");
					var moduleID = $(row).data("module-id");
					clearInterval(window[id]);
					var second = 10;
					var span = $(row).find(".before-remove-module-mask span");
					window[id] = setInterval(function () {
						$(span).html( $(span).html().replace(/\d{1,}/, --second) );
						if ( second <= 0 ) {
							clearInterval(window[id]);
							$(row).animate(Impex.Html.Events.hidden, function () {
								$(this).remove();
								Impex.Storage.Actions.remove(id, moduleID);
								Impex.Html.Generator.renderNavigationBar();
							});
						}
					}, 1000);
				},
				removeModuleCancel: function (row) {
					var id = $(row).find(".index-no span").attr("id");
					clearInterval(window[id]);
					$(row).find(".before-remove-module-mask").animate({width: 0}, function () {
						$(this).remove();
					});
				},
				renderDataRows: function (table) {
					$(table).next().find(".data-rows").text( $(table).find("tbody tr").length );
				},
				fieldValidation: function (input) {
					var val = $.trim( $(input).val() );
					val = this.Filters.suffixSemicolon( val );
					if ( $(input).hasClass("data-unique") ) {
						val = this.Filters.specialChars( val );	//Unique字段不允许空格和特殊字符
						val = this.Filters.capitalize( val );	//Unique字段必须首字母大写.
					}
					val = this.Filters.reservedChars( val );
					
					val = val.indexOf(";") > -1 ? '"' + val + '"' : val ;
					
					
					$(input).val( val );
					if ( val == "" && $(input).hasClass("data-required") ) {
						$(input).parents("td").addClass("has-error");
					} else {
						$(input).parents("td").removeClass("has-error");
					}
				},
				Filters: {
					suffixSemicolon: function (val) {	//末尾;号
						return val.replace(/;*$/, "");
					},
					specialChars: function (val) {	//空格和特殊字符
						return val.replace(/\s|\;*/g, "").replace(/[^\w]*/g, "");
					},
					capitalize: function (val) {	//首字母大写
						return val.replace(/^.{1}/i, function (c) {
							return c.toUpperCase();
						});
					},
					reservedChars: function (val) {	//保留字符 "
						return val.replace(/^\"*/, "").replace(/\"*$/, "").replace(/\"/g, "'");
					}
				}
			}
		}
	},
	Storage: {
		container: null,
		init: function (container) {
			this.container = container;
			this.AutoRestore.init(container);
			this.AutoSave.init(container);
		},
		AutoSave: {
			container: null,
			init: function (container) {
				this.container = container;
				this.HEADER();
				this.OTHERS();
			},
			HEADER: function () {
				var that = this;
				$(this.container).on("blur", "[data-module-id='0'] textarea", function () {
					Impex.Storage.Utils.HeaderData.set( $(this).val() );
				});
			},
			OTHERS: function () {
				var that = this;
				$(this.container).on("blur", ".data-field", function () {
					Impex.Html.Events.Actions.fieldValidation( this );
					if ( !$(this).val() == "" ) {
						Impex.Storage.Actions.save( $(this).parents(".row") );
					}
				});
			}
		},
		delaySave: function (table) {
			var that = this;
			var id = $(table).parents(".row").find(".index-no span").attr("id") + $(table).data("table-id");
			var second = 10;
			clearInterval(window[id]);	//clear last interval
			var row = $(table).parents(".row").addClass("dont-auto-save");
			var moduleMsg = $(table).next().find(".module-msg").removeClass("hidden");
			window[id] = setInterval(function () {
				var countdown = $(table).next().find(".module-msg").find(".countdown");
				$(countdown).text( $(countdown).text().replace(/\d{1,}/, --second) );
				if ( second <= 0 ) {
					clearInterval(window[id]);
					$(moduleMsg).addClass("hidden");
					that.Actions.save( row.removeClass("dont-auto-save") );
				}
			}, 1000);
		},
		Actions: {
			save: function (row) {
				if ( !this.checkAllowSave(row) ) {
					//console.log("current state is not allowed to save. skip !")
					return ;
				}
				var id = $(row).find(".index-no span").attr("id");
				
				var lines = new Array();
				$(row).find(".table tbody tr").each(function () {
					var tableID = $(this).parents("table").data("table-id");
					var tds = new Array();
					$(this).find("td .data-field").each(function () {
						tds.push($(this).val());
					});
					lines.push( {"tableID": tableID, tds: tds} );
				});

				if ( lines.length > 0 ) {
					//console.log("now is saveing datas to localStorage.")
					var modulesData = Impex.Storage.Utils.ModulesData.get();
					modulesData[id]=JSON.stringify(lines);
					Impex.Storage.Utils.ModulesData.set(modulesData);
				}
				
			},
			remove: function (id, moduleID) {
				if ( moduleID == 0 ) {
					Impex.Storage.Utils.HeaderData.clear();
				} else {
					var modulesData = Impex.Storage.Utils.ModulesData.get();
					delete modulesData[id];
					Impex.Storage.Utils.ModulesData.set(modulesData);
				}
			},
			checkAllowSave: function (row) {
				return !$(row).hasClass("dont-auto-save");	//dont-auto-save -> return false;
			},
			enumLocalStorage: function () {
				var lists = new Array();
				for ( var i in localStorage ) {
					lists.push({key: i, values: localStorage.getItem(i)});
				}
				table(lists);
			}
		},
		AutoRestore: {
			container: null,
			init: function (container) {
				var that = this;
				this.container = container;
				var modulesData = Impex.Storage.Utils.ModulesData.get();
				var headerData = Impex.Storage.Utils.HeaderData.get();
				var modulesOrder = Impex.Storage.Utils.ModulesOrder.get();
				$("#modules_restoring_modal").modal({
					keyboard: false
				});
				setTimeout(function () {
					
					//restoring header
					if ( headerData != "" ) {
						Impex.Html.generate(0, null, headerData);
					}
					
					//restoreing modules
					if ( !$.isEmptyObject(modulesData) ) {
						for ( var manualIndexNo in modulesData ) {
							var datas = JSON.parse( modulesData[manualIndexNo] );	//setup module html dom
							Impex.Html.generate( null, manualIndexNo, datas );	//M_0_1490168600733
						}
					}
					
					//restoring modules order
					if ( !$.isEmptyObject(modulesOrder) ) {
						for ( var i in modulesOrder ) {
							var row = $("#" + modulesOrder[i]).parents(".row");
							$(row).insertBefore( $(that.container).children(".row").eq(i) );
						}
					}
					
					//render navigation bar 
					Impex.Html.Generator.renderNavigationBar();
					
					//do field validation
					Impex.Html.Generator.allFieldValidation();
					$("#modules_restoring_modal").modal("toggle");
				}, 500);
			}
		},
		Utils: {
			HeaderData: {
				key: "HeaderData",
				get: function () {
					return localStorage[this.key] || "";
				},
				set: function (data) {
					localStorage[this.key] = (typeof data == "string") ? data : JSON.stringify(data);
				},
				clear: function () {
					localStorage.removeItem(this.key);
				},
				isEmpty: function () {
					return $.trim( this.get() ) == "";
				}
			},
			ModulesData: {
				key: "ModulesData",
				get: function () {
					return localStorage[this.key] == null || localStorage[this.key] == undefined ? {} : JSON.parse( localStorage[this.key] );
				},
				set: function (data) {
					localStorage[this.key] = (typeof data == "string") ? data : JSON.stringify(data);
				},
				isEmpty: function () {
					return $.isEmptyObject( this.get() );
				}
			},
			ModulesOrder: {
				key: "ModulesOrder",
				get: function () {
					return localStorage[this.key] == null || localStorage[this.key] == undefined ? {} : JSON.parse( localStorage[this.key] );
				},
				set: function (data) {
					localStorage[this.key] = (typeof data == "string") ? data : JSON.stringify(data);
				},
				isEmpty: function () {
					return $.isEmptyObject( this.get() );
				}
			},
			Enum: {
				localStorage: function () {
					var lists = new Array();
					for ( var i in localStorage ) {
						lists.push({key: i, values: localStorage.getItem(i)});
					}
					table(lists);
				},
				modulesData: function () {
					var modulesData = Impex.Storage.Utils.ModulesData.get();
					var mds = new Array();
					for ( var module in modulesData ) {
						var lines =  JSON.parse(modulesData[module]);
						mds.push({k: module, v: lines});
					}
					table(mds);
				}
			},
			hasLocalStorageDatas: function () {
				return !this.HeaderData.isEmpty() || !this.ModulesData.isEmpty();
			},
			findTable: function (manualIndexNo, tableID) {
				return $("#" + manualIndexNo).parents(".row").find("[data-table-id='" + tableID + "']");
			}
		}
	}
};

$(function () {
	Impex.init( $("#scripts_container") );
});
