import{S as ce,i as he,s as ue,P as _e,y as fe,k as g,a as P,q as E,O as me,z as de,l as v,h as u,c as A,m as b,r as S,n as T,A as pe,F as o,b as w,Q as ge,g as ve,d as ke,B as be,G as y,e as te,R as ie}from"../chunks/index.66fa1388.js";import{T as Ee,f as Se,S as le,a as ae,g as ye,e as Pe,D as Ae,P as Te}from"../chunks/Title.39a9b4d3.js";function ne(n,e,a){const l=n.slice();return l[1]=e[a],l[3]=a,l}function se(n,e,a){const l=n.slice();return l[4]=e[a],l[3]=a,l}function we(n){return{c:y,l:y,m:y,p:y,d:y}}function De(n){let e,a=n[0].reverse(),l=[];for(let t=0;t<a.length;t+=1)l[t]=oe(ne(n,a,t));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=te()},l(t){for(let c=0;c<l.length;c+=1)l[c].l(t);e=te()},m(t,c){for(let s=0;s<l.length;s+=1)l[s].m(t,c);w(t,e,c)},p(t,c){if(c&0){a=t[0].reverse();let s;for(s=0;s<a.length;s+=1){const i=ne(t,a,s);l[s]?l[s].p(i,c):(l[s]=oe(i),l[s].c(),l[s].m(e.parentNode,e))}for(;s<l.length;s+=1)l[s].d(1);l.length=a.length}},d(t){ie(l,t),t&&u(e)}}}function Me(n){let e,a=n[1][1][n[3]+1].timestamp.diff(n[1][1][n[3]].timestamp).toFormat(Te)+"",l;return{c(){e=g("p"),l=E(a),this.h()},l(t){e=v(t,"P",{class:!0,"aria-label":!0});var c=b(e);l=S(c,a),c.forEach(u),this.h()},h(){T(e,"class","duration svelte-5klewo"),T(e,"aria-label",n[4].isWorking?"work duration":"pause duration")},m(t,c){w(t,e,c),o(e,l)},p:y,d(t){t&&u(e)}}}function re(n){let e,a,l=n[4].timestamp.toLocaleString(Ae.TIME_SIMPLE)+"",t,c,s,i=n[3]<n[1][1].length-1&&Me(n);return{c(){e=g("li"),a=g("span"),t=E(l),c=P(),i&&i.c(),s=P(),this.h()},l(f){e=v(f,"LI",{"data-type":!0,"aria-label":!0,class:!0});var h=b(e);a=v(h,"SPAN",{});var r=b(a);t=S(r,l),r.forEach(u),c=A(h),i&&i.l(h),s=A(h),h.forEach(u),this.h()},h(){T(e,"data-type",n[4].isWorking?"work":"chill"),T(e,"aria-label",n[4].isWorking?"work started":"pause started"),T(e,"class","svelte-5klewo")},m(f,h){w(f,e,h),o(e,a),o(a,t),o(e,c),i&&i.m(e,null),o(e,s)},p(f,h){f[3]<f[1][1].length-1&&i.p(f,h)},d(f){f&&u(e),i&&i.d()}}}function oe(n){let e,a,l=n[1][0]+"",t,c,s,i,f,h,r,m,I=le[ae.Working]+"",$,O,K=ye(n[1][1])+"",F,U,D,V=le[ae.Chilling]+"",q,B,X=Pe(n[1][1])+"",G,J,N,Y,j,L,z,W=n[1][1],p=[];for(let d=0;d<W.length;d+=1)p[d]=re(se(n,W,d));return{c(){e=g("details"),a=g("summary"),t=E(l),c=P(),s=g("hgroup"),i=g("h5"),f=E("Summary"),h=P(),r=g("p"),m=g("span"),$=E(I),O=E(" Worked: "),F=E(K),U=P(),D=g("span"),q=E(V),B=E(" Chilled: "),G=E(X),J=P(),N=g("h5"),Y=E("Details"),j=P(),L=g("ul");for(let d=0;d<p.length;d+=1)p[d].c();z=P(),this.h()},l(d){e=v(d,"DETAILS",{class:!0});var k=b(e);a=v(k,"SUMMARY",{});var _=b(a);t=S(_,l),_.forEach(u),c=A(k),s=v(k,"HGROUP",{});var M=b(s);i=v(M,"H5",{});var Z=b(i);f=S(Z,"Summary"),Z.forEach(u),h=A(M),r=v(M,"P",{});var C=b(r);m=v(C,"SPAN",{});var R=b(m);$=S(R,I),O=S(R," Worked: "),F=S(R,K),R.forEach(u),U=A(C),D=v(C,"SPAN",{});var H=b(D);q=S(H,V),B=S(H," Chilled: "),G=S(H,X),H.forEach(u),C.forEach(u),M.forEach(u),J=A(k),N=v(k,"H5",{});var x=b(N);Y=S(x,"Details"),x.forEach(u),j=A(k),L=v(k,"UL",{});var ee=b(L);for(let Q=0;Q<p.length;Q+=1)p[Q].l(ee);ee.forEach(u),z=A(k),k.forEach(u),this.h()},h(){e.open=!n[3],T(e,"class","svelte-5klewo")},m(d,k){w(d,e,k),o(e,a),o(a,t),o(e,c),o(e,s),o(s,i),o(i,f),o(s,h),o(s,r),o(r,m),o(m,$),o(m,O),o(m,F),o(r,U),o(r,D),o(D,q),o(D,B),o(D,G),o(e,J),o(e,N),o(N,Y),o(e,j),o(e,L);for(let _=0;_<p.length;_+=1)p[_].m(L,null);o(e,z)},p(d,k){if(k&0){W=d[1][1];let _;for(_=0;_<W.length;_+=1){const M=se(d,W,_);p[_]?p[_].p(M,k):(p[_]=re(M),p[_].c(),p[_].m(L,null))}for(;_<p.length;_+=1)p[_].d(1);p.length=W.length}},d(d){d&&u(e),ie(p,d)}}}function $e(n){return{c:y,l:y,m:y,p:y,d:y}}function Le(n){let e,a,l,t,c,s,i,f;e=new Ee({});let h={ctx:n,current:null,token:null,hasCatch:!1,pending:$e,then:De,catch:we,value:0};return _e(Se(),h),{c(){fe(e.$$.fragment),a=g("meta"),l=P(),t=g("h1"),c=E("Journal"),s=P(),i=g("main"),h.block.c(),this.h()},l(r){const m=me("svelte-1ljaam3",document.head);de(e.$$.fragment,m),a=v(m,"META",{name:!0,content:!0}),m.forEach(u),l=A(r),t=v(r,"H1",{});var I=b(t);c=S(I,"Journal"),I.forEach(u),s=A(r),i=v(r,"MAIN",{class:!0});var $=b(i);h.block.l($),$.forEach(u),this.h()},h(){T(a,"name","description"),T(a,"content","List of all the time stamps"),T(i,"class","svelte-5klewo")},m(r,m){pe(e,document.head,null),o(document.head,a),w(r,l,m),w(r,t,m),o(t,c),w(r,s,m),w(r,i,m),h.block.m(i,h.anchor=null),h.mount=()=>i,h.anchor=null,f=!0},p(r,[m]){n=r,ge(h,n,m)},i(r){f||(ve(e.$$.fragment,r),f=!0)},o(r){ke(e.$$.fragment,r),f=!1},d(r){be(e),u(a),r&&u(l),r&&u(t),r&&u(s),r&&u(i),h.block.d(),h.token=null,h=null}}}class Ne extends ce{constructor(e){super(),he(this,e,null,Le,ue,{})}}export{Ne as default};