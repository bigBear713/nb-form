"use strict";(self.webpackChunknb_form_demo=self.webpackChunknb_form_demo||[]).push([[403],{9403:(g,s,o)=>{o.r(s),o.d(s,{Feature1Component:()=>_,routes:()=>c});var a=o(6814),i=o(285),m=o(6516),l=o(3174),e=o(5088);function u(r,h){if(1&r){const t=e.EpF();e.TgZ(0,"form",1)(1,"nb-field-item",2)(2,"span",3),e._uU(3),e.ALo(4,"nbTrans"),e.qZA(),e.TgZ(5,"input",4),e.NdJ("change",function(f){e.CHM(t);const p=e.oxw();return e.KtG(p.onChangeFile(f))}),e.qZA()()()}if(2&r){const t=e.oxw();e.Q6J("formGroup",t.form),e.xp6(1),e.Q6J("control",t.field1Ctrl)("errInfo",t.errInfo2),e.xp6(2),e.hij("",e.lcZ(4,4,"demoContent.field1"),"\uff1a")}}let _=(()=>{class r{get field1Ctrl(){return this.form?.get("field1")}constructor(t,n){this.fb=t,this.formService=n,this.errInfo2={[l.ti.FILE_MAX_SIZE]:"The file max size is 500kb!"},this.buildForm()}ngOnInit(){}onChangeFile(t){const n=t.target;n&&n.files?.length&&(this.field1Ctrl.markAsDirty(),this.field1Ctrl.setValue(n.files[0]))}buildForm(){this.form=this.fb.group({field1:[null,this.formService.getValidatorsFromControlConfig({fileType:["image/svg+xml","image/jpeg"],maxFileSize:5e5,minFileSize:1e5})]})}static#e=this.\u0275fac=function(n){return new(n||r)(e.Y36(i.QS),e.Y36(l.LR))};static#t=this.\u0275cmp=e.Xpm({type:r,selectors:[["app-feature1"]],standalone:!0,features:[e.jDz],decls:3,vars:1,consts:[[3,"formGroup",4,"ngIf"],[3,"formGroup"],[3,"control","errInfo"],["field-label",""],["type","file",3,"change"]],template:function(n,f){1&n&&(e.TgZ(0,"h4"),e._uU(1,"standalone component"),e.qZA(),e.YNc(2,u,6,6,"form",0)),2&n&&(e.xp6(2),e.Q6J("ngIf",f.form))},dependencies:[l.XI,l.XX,m.pT,m.y6,a.ez,a.O5,i.u5,i._Y,i.JL,i.UX,i.sg]})}return r})();const c=[{path:"",component:_}]}}]);