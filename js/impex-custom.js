/**
 * Impex自定义页面事件处理 
 * Author: Jesse.Haijian Zhou
 * Date: 2017-02-24
 * (c) Copyright 2017 Jesse. All Rights Reserved. 
 */
var ImpExCustom = {
	container: null,
	init: function () {
		this.container = $("#scripts_container");
		this.insertModule();
		this.renderModals();
		this.previewAndGenerateCode();
		this.doCopyToClipboard();
		this.renderToaster();
		if ( Impex.Storage.Utils.hasLocalStorageDatas() ) {
			$(".get-start-msg").fadeOut().remove();
		}
	},
	insertModule: function () {
		var that = this;
		$(".navbar-footer").find(".menu-insert-module").on("click", function () {
			var hasHeader = $("#scripts_container").find("[data-module-id='0']").length > 0;
			$(this).find("li:has([data-module-id='0'])")[ hasHeader ? "addClass" : "removeClass" ] ("disabled");
		});
		$(".navbar-footer").find(".menu-insert-module ul.dropdown-menu").on("click",  "li:not(.disabled) a", function () {
			$(".get-start-msg").fadeOut().remove();
			if ( $("#scripts_container").children(".row").length < 20 ) {
				var id = $(this).data("module-id");
				Impex.Html.generate(id);
			} else {
				$("#modules_maximum_modal").modal("toggle");
			}
		});
	},
	renderModals: function () {
		var offset = 150;
		$(".my-modal").on("show.bs.modal", function (e) {
			$(this).find(".modal-dialog").css("top", $(window).height()/2 - offset);
		}); 
	},
	previewAndGenerateCode: function () {
		var that = this;
		$("#btn-generate-code").on("click", function () {
			//check if there are has-error fields needs to be handle
			if ( $(that.container).children(".row:not(.not-joining-calc-module)").find(".has-error").length > 0 ) {
				//$("#modules_field_error_modal").modal("toggle");
				$.toaster("带红色边框的字段未完成", "生成失败", "danger");
				return;
			}
			var tables = new Array();
			var allModules = $(that.container).children(".row:not(.not-joining-calc-module)");
			//header
			var headerText = $(allModules).filter("[data-module-id='0']").find(".panel-body textarea").val() || "";
			tables.push({
				header: "# Impex Scripts Auto-Generation By Impex Tool of Hybris Project Tookit ",
				fields: [headerText]
			});
			//others
			$(allModules).not("[data-module-id='0']").each(function () {
				$(this).find(".panel .panel-heading").each(function () {
					var header_part1 = $(this).find(".script-part").text();
					var header_part2 = $(this).next("table").find("thead tr").eq(0).text();
					var prefixComma = "";
					for ( var comma of header_part1.match(/\;/g) ) {
						prefixComma += comma;
					}
					var fields = new Array();
					$(this).next("table").find("tbody tr").each(function () {
						var fieldTxt = prefixComma;
						$(this).find("td:not(.col-operation)").each(function (){
							var inputVal = $(this).find(".data-field").val();
							var defaultVal = $(this).find(".data-field").prop("placeholder") || ""; 
							fieldTxt += ( $.trim(inputVal) == "" && $.trim(defaultVal) != "" ? defaultVal : inputVal ) + ";";	//every line's td field
						});
						fields.push(fieldTxt);
					});
					var table = {
						header: header_part1 + header_part2,
						fields: fields
					}
					tables.push(table);
				});
			});
			//console.log(tables);
			//fill datas into textarea
			var scripts = "";
			for ( var table of tables ) {
				scripts += ( table.fields.length > 0 ? "" : "#" ) + table.header + '\n';
				for　(var field of table.fields ) {
					scripts += field + '\n';
				}
				scripts += '\n';
			}
			$("#txtCode").val( scripts );
			$("#modules_preview_modal").modal("toggle");
			that.renderGenerateCodeBoxVisio();
		});
	},
	doCopyToClipboard: function () {
		var that = this;
		var clipboard = new Clipboard('.btn-copy-to-clipboard');
		clipboard.on("success", function(e) {
	        $.toaster("代码已复制到粘贴板!", "复制成功", "success");
	    });
		clipboard.on("error", function(e) {
	        $.toaster(e, "复制失败", "danger");
	    });
	},
	renderGenerateCodeBoxVisio: function () {
		//all these args's unit is px;
		var heightPerRow = 20;
		var reservedHeight = 55;
		var modalContentTop = 30;
		var headerHeight = 46;
		var footerHeight = 65;
		var rows = Math.floor( ($(window).height() - modalContentTop - headerHeight - footerHeight - reservedHeight) / heightPerRow );
		$("#txtCode").attr("rows", rows);
	},
	renderToaster: function () {
		$(document).on("bs.show.toaster", function (e) {
			var toaster = $(e.target);
			$(toaster).css({
				top: ( $(window).height() - $(toaster).outerHeight() ) / 2,
				left: ( $(window).width() - $(toaster).outerWidth() ) / 2
			});
		});
	}
};

$(function () {
	ImpExCustom.init();
});
