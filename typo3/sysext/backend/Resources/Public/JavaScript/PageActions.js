/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","./Enum/KeyTypes","jquery","./Storage/Persistent","./Wizard/NewContentElement"],function(e,t,i,n,a,s){"use strict";var l;!function(e){e.pageTitle=".t3js-title-inlineedit",e.hiddenElements=".t3js-hidden-record",e.newButton=".t3js-toggle-new-content-element-wizard"}(l||(l={}));return new class{constructor(){this.pageId=0,this.pageOverlayId=0,this.$pageTitle=null,this.$showHiddenElementsCheckbox=null,n(()=>{this.initializeElements(),this.initializeEvents(),this.initializeNewContentElementWizard(),this.initializePageTitleRenaming()})}setPageId(e){this.pageId=e}setLanguageOverlayId(e){this.pageOverlayId=e}initializePageTitleRenaming(){if(!n.isReady)return void n(()=>{this.initializePageTitleRenaming()});if(this.pageId<=0)return;const e=n('<a class="hidden" href="#" data-action="edit"><span class="t3-icon fa fa-pencil"></span></a>');e.on("click",e=>{e.preventDefault(),this.editPageTitle()}),this.$pageTitle.on("dblclick",()=>{this.editPageTitle()}).on("mouseover",()=>{e.removeClass("hidden")}).on("mouseout",()=>{e.addClass("hidden")}).append(e)}initializeElements(){this.$pageTitle=n(l.pageTitle+":first"),this.$showHiddenElementsCheckbox=n("#checkTt_content_showHidden")}initializeEvents(){this.$showHiddenElementsCheckbox.on("change",this.toggleContentElementVisibility)}toggleContentElementVisibility(e){const t=n(e.currentTarget),i=n(l.hiddenElements),s=n("<span />",{class:"checkbox-spinner fa fa-circle-o-notch fa-spin"});t.hide().after(s),t.prop("checked")?i.slideDown():i.slideUp(),a.set("moduleData.web_layout.tt_content_showHidden",t.prop("checked")?"1":"0").done(()=>{s.remove(),t.show()})}editPageTitle(){const e=n('<form><div class="form-group"><div class="input-group input-group-lg"><input class="form-control t3js-title-edit-input"><span class="input-group-btn"><button class="btn btn-default" type="button" data-action="submit"><span class="t3-icon fa fa-floppy-o"></span></button> </span><span class="input-group-btn"><button class="btn btn-default" type="button" data-action="cancel"><span class="t3-icon fa fa-times"></span></button> </span></div></div></form>'),t=e.find("input");e.find('[data-action="cancel"]').on("click",()=>{e.replaceWith(this.$pageTitle),this.initializePageTitleRenaming()}),e.find('[data-action="submit"]').on("click",()=>{const i=n.trim(t.val());""!==i&&this.$pageTitle.text()!==i?this.saveChanges(t):e.find('[data-action="cancel"]').trigger("click")}),t.parents("form").on("submit",e=>(e.preventDefault(),!1));const a=this.$pageTitle;a.children().last().remove(),a.replaceWith(e),t.val(a.text()).focus(),t.on("keyup",t=>{switch(t.which){case i.KeyTypesEnum.ENTER:e.find('[data-action="submit"]').trigger("click");break;case i.KeyTypesEnum.ESCAPE:e.find('[data-action="cancel"]').trigger("click")}})}saveChanges(t){const i=t.parents("form");i.find("button").addClass("disabled"),t.attr("disabled","disabled");let n,a={};n=this.pageOverlayId>0?this.pageOverlayId:this.pageId,a.data={},a.data.pages={},a.data.pages[n]={title:t.val()},e(["TYPO3/CMS/Backend/AjaxDataHandler"],e=>{e.process(a).done(()=>{i.find("[data-action=cancel]").trigger("click"),this.$pageTitle.text(t.val()),this.initializePageTitleRenaming(),top.TYPO3.Backend.NavigationContainer.PageTree.refreshTree()}).fail(()=>{i.find("[data-action=cancel]").trigger("click")})})}initializeNewContentElementWizard(){n(l.newButton).click(e=>{e.preventDefault();const t=n(e.currentTarget);s.wizard(t.attr("href"),t.data("title"))})}}});