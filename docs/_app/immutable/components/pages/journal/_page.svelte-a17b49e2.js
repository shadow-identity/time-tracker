import{S as ce,i as he,s as ue,O as _e,k as d,a as P,q as E,N as fe,l as p,h,c as A,m as k,r as S,n as T,F as i,b as w,P as me,B as b,e as te,Q as ie}from"../../../chunks/index-471fb7b1.js";import{f as de,S as le,a as ae,g as pe,e as ve,D as ke,P as ge}from"../../../chunks/workRecords-963190ac.js";function ne(n,e,s){const t=n.slice();return t[1]=e[s],t[3]=s,t}function se(n,e,s){const t=n.slice();return t[4]=e[s],t[3]=s,t}function be(n){return{c:b,l:b,m:b,p:b,d:b}}function Ee(n){let e,s=n[0].reverse(),t=[];for(let l=0;l<s.length;l+=1)t[l]=oe(ne(n,s,l));return{c(){for(let l=0;l<t.length;l+=1)t[l].c();e=te()},l(l){for(let c=0;c<t.length;c+=1)t[c].l(l);e=te()},m(l,c){for(let a=0;a<t.length;a+=1)t[a].m(l,c);w(l,e,c)},p(l,c){if(c&0){s=l[0].reverse();let a;for(a=0;a<s.length;a+=1){const r=ne(l,s,a);t[a]?t[a].p(r,c):(t[a]=oe(r),t[a].c(),t[a].m(e.parentNode,e))}for(;a<t.length;a+=1)t[a].d(1);t.length=s.length}},d(l){ie(t,l),l&&h(e)}}}function Se(n){let e,s=n[1][1][n[3]+1].timestamp.diff(n[1][1][n[3]].timestamp).toFormat(ge)+"",t;return{c(){e=d("p"),t=E(s),this.h()},l(l){e=p(l,"P",{class:!0,"aria-label":!0});var c=k(e);t=S(c,s),c.forEach(h),this.h()},h(){T(e,"class","duration svelte-5klewo"),T(e,"aria-label",n[4].isWorking?"work duration":"pause duration")},m(l,c){w(l,e,c),i(e,t)},p:b,d(l){l&&h(e)}}}function re(n){let e,s,t=n[4].timestamp.toLocaleString(ke.TIME_SIMPLE)+"",l,c,a,r=n[3]<n[1][1].length-1&&Se(n);return{c(){e=d("li"),s=d("span"),l=E(t),c=P(),r&&r.c(),a=P(),this.h()},l(o){e=p(o,"LI",{"data-type":!0,"aria-label":!0,class:!0});var u=k(e);s=p(u,"SPAN",{});var g=k(s);l=S(g,t),g.forEach(h),c=A(u),r&&r.l(u),a=A(u),u.forEach(h),this.h()},h(){T(e,"data-type",n[4].isWorking?"work":"chill"),T(e,"aria-label",n[4].isWorking?"work started":"pause started"),T(e,"class","svelte-5klewo")},m(o,u){w(o,e,u),i(e,s),i(s,l),i(e,c),r&&r.m(e,null),i(e,a)},p(o,u){o[3]<o[1][1].length-1&&r.p(o,u)},d(o){o&&h(e),r&&r.d()}}}function oe(n){let e,s,t=n[1][0]+"",l,c,a,r,o,u,g,y,K=le[ae.Working]+"",O,R,V=pe(n[1][1])+"",F,J,D,X=le[ae.Chilling]+"",U,q,Z=ve(n[1][1])+"",B,Y,W,G,Q,L,j,N=n[1][1],m=[];for(let f=0;f<N.length;f+=1)m[f]=re(se(n,N,f));return{c(){e=d("details"),s=d("summary"),l=E(t),c=P(),a=d("hgroup"),r=d("h5"),o=E("Summary"),u=P(),g=d("p"),y=d("span"),O=E(K),R=E(" Worked: "),F=E(V),J=P(),D=d("span"),U=E(X),q=E(" Chilled: "),B=E(Z),Y=P(),W=d("h5"),G=E("Details"),Q=P(),L=d("ul");for(let f=0;f<m.length;f+=1)m[f].c();j=P(),this.h()},l(f){e=p(f,"DETAILS",{class:!0});var v=k(e);s=p(v,"SUMMARY",{});var _=k(s);l=S(_,t),_.forEach(h),c=A(v),a=p(v,"HGROUP",{});var M=k(a);r=p(M,"H5",{});var $=k(r);o=S($,"Summary"),$.forEach(h),u=A(M),g=p(M,"P",{});var I=k(g);y=p(I,"SPAN",{});var C=k(y);O=S(C,K),R=S(C," Worked: "),F=S(C,V),C.forEach(h),J=A(I),D=p(I,"SPAN",{});var H=k(D);U=S(H,X),q=S(H," Chilled: "),B=S(H,Z),H.forEach(h),I.forEach(h),M.forEach(h),Y=A(v),W=p(v,"H5",{});var x=k(W);G=S(x,"Details"),x.forEach(h),Q=A(v),L=p(v,"UL",{});var ee=k(L);for(let z=0;z<m.length;z+=1)m[z].l(ee);ee.forEach(h),j=A(v),v.forEach(h),this.h()},h(){e.open=!n[3],T(e,"class","svelte-5klewo")},m(f,v){w(f,e,v),i(e,s),i(s,l),i(e,c),i(e,a),i(a,r),i(r,o),i(a,u),i(a,g),i(g,y),i(y,O),i(y,R),i(y,F),i(g,J),i(g,D),i(D,U),i(D,q),i(D,B),i(e,Y),i(e,W),i(W,G),i(e,Q),i(e,L);for(let _=0;_<m.length;_+=1)m[_].m(L,null);i(e,j)},p(f,v){if(v&0){N=f[1][1];let _;for(_=0;_<N.length;_+=1){const M=se(f,N,_);m[_]?m[_].p(M,v):(m[_]=re(M),m[_].c(),m[_].m(L,null))}for(;_<m.length;_+=1)m[_].d(1);m.length=N.length}},d(f){f&&h(e),ie(m,f)}}}function ye(n){return{c:b,l:b,m:b,p:b,d:b}}function Pe(n){let e,s,t,l,c,a,r={ctx:n,current:null,token:null,hasCatch:!1,pending:ye,then:Ee,catch:be,value:0};return _e(de(),r),{c(){e=d("meta"),s=P(),t=d("h1"),l=E("Journal"),c=P(),a=d("main"),r.block.c(),this.h()},l(o){const u=fe("svelte-bt165x",document.head);e=p(u,"META",{name:!0,content:!0}),u.forEach(h),s=A(o),t=p(o,"H1",{});var g=k(t);l=S(g,"Journal"),g.forEach(h),c=A(o),a=p(o,"MAIN",{class:!0});var y=k(a);r.block.l(y),y.forEach(h),this.h()},h(){document.title="Time Tracker: Journal",T(e,"name","description"),T(e,"content","List of all the time stamps"),T(a,"class","svelte-5klewo")},m(o,u){i(document.head,e),w(o,s,u),w(o,t,u),i(t,l),w(o,c,u),w(o,a,u),r.block.m(a,r.anchor=null),r.mount=()=>a,r.anchor=null},p(o,[u]){n=o,me(r,n,u)},i:b,o:b,d(o){h(e),o&&h(s),o&&h(t),o&&h(c),o&&h(a),r.block.d(),r.token=null,r=null}}}class we extends ce{constructor(e){super(),he(this,e,null,Pe,ue,{})}}export{we as default};
