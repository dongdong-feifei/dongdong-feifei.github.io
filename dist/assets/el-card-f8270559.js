import{au as d,a7 as p,a8 as N,b2 as C,C as A,af as _,a,c as t,j as E,y as n,z as S,d as u,t as i,h as y,b as v,n as l,al as L,ap as m}from"./index-ba734b54.js";var D=(e=>(e[e.TEXT=1]="TEXT",e[e.CLASS=2]="CLASS",e[e.STYLE=4]="STYLE",e[e.PROPS=8]="PROPS",e[e.FULL_PROPS=16]="FULL_PROPS",e[e.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",e[e.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",e[e.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",e[e.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",e[e.NEED_PATCH=512]="NEED_PATCH",e[e.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",e[e.HOISTED=-1]="HOISTED",e[e.BAIL=-2]="BAIL",e))(D||{});const f=e=>{const s=d(e)?e:[e],r=[];return s.forEach(o=>{var T;d(o)?r.push(...f(o)):p(o)&&d(o.children)?r.push(...f(o.children)):(r.push(o),p(o)&&((T=o.component)!=null&&T.subTree)&&r.push(...f(o.component.subTree)))}),r},b=N({header:{type:String,default:""},footer:{type:String,default:""},bodyStyle:{type:C([String,Object,Array]),default:""},bodyClass:String,shadow:{type:String,values:["always","hover","never"],default:"always"}}),R=A({name:"ElCard"}),Y=A({...R,props:b,setup(e){const s=_("card");return(r,o)=>(a(),t("div",{class:E([n(s).b(),n(s).is(`${r.shadow}-shadow`)])},[r.$slots.header||r.header?(a(),t("div",{key:0,class:E(n(s).e("header"))},[S(r.$slots,"header",{},()=>[u(i(r.header),1)])],2)):y("v-if",!0),v("div",{class:E([n(s).e("body"),r.bodyClass]),style:l(r.bodyStyle)},[S(r.$slots,"default")],6),r.$slots.footer||r.footer?(a(),t("div",{key:1,class:E(n(s).e("footer"))},[S(r.$slots,"footer",{},()=>[u(i(r.footer),1)])],2)):y("v-if",!0)],2))}});var O=L(Y,[["__file","card.vue"]]);const B=m(O);export{B as E,D as P,f};
