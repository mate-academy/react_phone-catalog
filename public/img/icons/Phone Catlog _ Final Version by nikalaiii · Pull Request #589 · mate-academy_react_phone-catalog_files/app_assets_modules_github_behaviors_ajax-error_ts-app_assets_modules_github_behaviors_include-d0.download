"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["app_assets_modules_github_behaviors_ajax-error_ts-app_assets_modules_github_behaviors_include-d0d0a6","ui_packages_soft-navigate_soft-navigate_ts"],{4673:(e,t,n)=>{n.d(t,{a:()=>o,n:()=>i});var r=n(97797);function i(){let e=document.getElementById("ajax-error-message");e&&(e.hidden=!1)}function o(){let e=document.getElementById("ajax-error-message");e&&(e.hidden=!0)}(0,r.on)("deprecatedAjaxError","[data-remote]",function(e){let{error:t,text:n}=e.detail;e.currentTarget===e.target&&"abort"!==t&&"canceled"!==t&&(/<html/.test(n)?(i(),e.stopImmediatePropagation()):setTimeout(function(){e.defaultPrevented||i()},0))}),(0,r.on)("deprecatedAjaxSend","[data-remote]",function(){o()}),(0,r.on)("click",".js-ajax-error-dismiss",function(){o()})},76360:(e,t,n)=>{n.d(t,{A:()=>l,L:()=>s});var r=n(17688),i=n(21403),o=n(97797),a=n(65584);let d=new WeakMap;function l(e){let t=e.closest(".js-render-needs-enrichment");t&&(t.classList.remove("render-error"),d.get(t)?.setLoading(!1))}function s(e,t){let n=e.closest(".js-render-needs-enrichment");return!!n&&(n.classList.add("render-error"),d.get(n)?.setError(!0,t))}function c(e,t,n){let i=n.identifier??"",o=new URL(e,window.location.origin);for(let[e,n]of Object.entries(t))o.searchParams.append(e,`${n}`);return o.hash=i,(0,r.qy)`
    <div
      class="render-container color-bg-transparent js-render-target p-0"
      data-identity="${i}"
      data-host="${o.origin}"
      data-type="${n.type}"
    >
      <iframe
        title="File display"
        role="presentation"
        class="render-viewer"
        src="${String(o)}"
        name="${i}"
        data-content="${n.contentJson}"
        sandbox="allow-scripts allow-same-origin allow-top-navigation allow-popups"
      >
      </iframe>
    </div>
  `}(0,i.lB)(".js-render-needs-enrichment",{constructor:HTMLElement,initialize:function(e){let t={color_mode:(0,a.PT)()},n=e.getAttribute("data-type"),i=e.getAttribute("data-src"),o=e.getAttribute("data-identity"),l=e.getElementsByClassName("js-render-enrichment-target")[0],s=e.getElementsByClassName("js-render-enrichment-loader")[0],u=l.closest("details"),f=document.createElement("div");f.classList.add("js-render-enrichment-fallback"),e.appendChild(f);let m=l.firstElementChild;f.appendChild(m);let p={setLoading(e){s.hidden=!e},setError:(e,t)=>(p.setLoading(!1),!1!==e&&(m.classList.toggle("render-plaintext-hidden",!e),!!t&&((0,r.XX)([t,m],f),!0)))};d.set(e,p);let h=l.getAttribute("data-plain"),v=l.getAttribute("data-json");if(null==v||null==h)throw p.setError(!0,(0,r.qy)`<p class="flash flash-error">Unable to render rich display</p>`),Error(`Expected to see input data for type: ${n}`);let g=c(i,t,{type:n,identifier:o,contentJson:v}),y=c(i,t,{type:n,identifier:`${o}-fullscreen`,contentJson:v}),b=function(e,t,n){let i=(0,r.qy)`<clipboard-copy
    aria-label="Copy ${n.type} code"
    .value=${e}
    class="btn my-2 js-clipboard-copy p-0 d-inline-flex tooltipped-no-delay"
    role="button"
    data-copy-feedback="Copied!"
    data-tooltip-direction="s"
  >
    <svg
      aria-hidden="true"
      height="16"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      class="octicon octicon-copy js-clipboard-copy-icon m-2"
    >
      <path
        fill-rule="evenodd"
        d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"
      ></path>
      <path
        fill-rule="evenodd"
        d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"
      ></path>
    </svg>
    <svg
      aria-hidden="true"
      height="16"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      class="octicon octicon-check js-clipboard-check-icon color-fg-success d-none m-2"
    >
      <path
        fill-rule="evenodd"
        d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
      ></path>
    </svg>
  </clipboard-copy>`,o=(0,r.qy)`
    <details class="details-reset details-overlay details-overlay-dark" style="display: contents">
      <summary
        role="button"
        aria-label="Open dialog"
        class="btn my-2 mr-2 p-0 d-inline-flex"
        aria-haspopup="dialog"
        @click="${t}"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="octicon m-2">
          <path
            fill-rule="evenodd"
            d="M3.72 3.72a.75.75 0 011.06 1.06L2.56 7h10.88l-2.22-2.22a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.22-2.22H2.56l2.22 2.22a.75.75 0 11-1.06 1.06l-3.5-3.5a.75.75 0 010-1.06l3.5-3.5z"
          ></path>
        </svg>
      </summary>
      <details-dialog
        class="Box Box--overlay render-full-screen d-flex flex-column anim-fade-in fast"
        aria-label="${n.type} rendered container"
      >
        <div>
          <button
            aria-label="Close dialog"
            data-close-dialog=""
            type="button"
            data-view-component="true"
            class="Link--muted btn-link position-absolute render-full-screen-close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              style="display:inline-block;vertical-align:text-bottom"
              class="octicon octicon-x"
            >
              <path
                fill-rule="evenodd"
                d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
              ></path>
            </svg>
          </button>
          <div class="Box-body border-0" role="presentation"></div>
        </div>
      </details-dialog>
    </details>
  `;return(0,r.qy)`<div class="position-absolute top-0 pr-2 right-0 d-flex flex-justify-end flex-items-center">
    ${o}${i}
  </div>`}(h,()=>{(0,r.XX)(y,l.getElementsByClassName("Box-body")[0])},{type:n});u&&!u.open?u.ontoggle=()=>{u.open&&((0,r.XX)([b,g],l),u.ontoggle=null)}:(0,r.XX)([b,g],l)}}),(0,o.on)("preview:toggle:off",".js-previewable-comment-form",function(e){let t=e.currentTarget.querySelector(".js-render-needs-enrichment"),n=t?.querySelector(".js-render-enrichment-target");n&&(n.textContent="")}),(0,o.on)("preview:rendered",".js-previewable-comment-form",function(e){let t=e.currentTarget.querySelector(".js-render-needs-enrichment");t&&d.get(t)?.setLoading(!1)})},60387:(e,t,n)=>{n.d(t,{d:()=>c,s:()=>s});var r=n(72340),i=n(21403),o=n(97797);function a(e,t){let n=e.currentTarget;if(n instanceof Element){for(let e of n.querySelectorAll("[data-show-on-error]"))e instanceof HTMLElement&&(e.hidden=!t);for(let e of n.querySelectorAll("[data-hide-on-error]"))e instanceof HTMLElement&&(e.hidden=t)}}function d(e){a(e,!1)}function l(e){a(e,!0)}function s({currentTarget:e}){e instanceof Element&&c(e)}function c(e){let t=e.closest("details");t&&function(e){let t=e.getAttribute("data-deferred-details-content-url");if(t){e.removeAttribute("data-deferred-details-content-url");let n=e.querySelector("include-fragment, poll-include-fragment");n&&(n.src=t)}}(t)}(0,i.lB)("include-fragment, poll-include-fragment",{subscribe:e=>(0,r.Zz)((0,r.Rt)(e,"error",l),(0,r.Rt)(e,"loadstart",d))}),(0,o.on)("click","include-fragment button[data-retry-button]",({currentTarget:e})=>{e.closest("include-fragment").refetch()})},55996:(e,t,n)=>{n.d(t,{Qs:()=>v,hq:()=>d,zr:()=>g});var r=n(17688),i=n(76360),o=n(21403),a=n(9552);function d(e){return!!e.querySelector('.js-render-target[data-type="ipynb"]')}let l=["is-render-pending","is-render-ready","is-render-loading","is-render-loaded"],s=["is-render-ready","is-render-loading","is-render-loaded","is-render-failed","is-render-failed-fatally"],c=new WeakMap;function u(e){let t=c.get(e);null!=t&&(t.load=t.hello=null,t.helloTimer&&(clearTimeout(t.helloTimer),t.helloTimer=null),t.loadTimer&&(clearTimeout(t.loadTimer),t.loadTimer=null))}function f(e,t=""){e.classList.remove(...l),e.classList.add("is-render-failed");let n=function(e){let t=(0,r.qy)`<p>Unable to render rich display</p>`;if(""!==e){let n=e.split("\n");t=(0,r.qy)`<p><b>Unable to render rich display</b></p>
      <p>${n.map(e=>(0,r.qy)`${e}<br />`)}</p>`}return(0,r.qy)`<div class="flash flash-error">${t}</div>`}(t);!1===(0,i.L)(e,n)&&function(e,t){let n=e.querySelector(".render-viewer-error");n&&(n.remove(),e.classList.remove("render-container"),(0,r.XX)(t,e))}(e,n),u(e)}function m(e,t=!1){!(!e||!(0,a.A)(e)||e.classList.contains("is-render-ready")||e.classList.contains("is-render-failed")||e.classList.contains("is-render-failed-fatally"))&&(!t||c.get(e)?.hello)&&f(e)}function p(e,t,n){return!!e&&!!e.postMessage&&(e.postMessage(JSON.stringify(t),n),!0)}function h(e){return t=>{if(!t.querySelector(".js-render-target"))return;let n=t.querySelector("iframe"),r=n?.contentWindow;if(r)return e(r)}}(0,o.lB)(".js-render-target",function(e){e.classList.remove(...s),e.style.height="auto",!c.get(e)?.load&&(u(e),c.get(e)||(c.set(e,{load:Date.now(),hello:null,helloTimer:window.setTimeout(m,1e4,e,!0),loadTimer:window.setTimeout(m,45e3,e)}),e.classList.add("is-render-automatic","is-render-requested")))}),window.addEventListener("message",function(e){let t=e.data;if(!t)return;if("string"==typeof t)try{t=JSON.parse(t)}catch{return}if("object"!=typeof t&&void 0!=t||"render"!==t.type||"string"!=typeof t.identity)return;let n=t.identity;if("string"!=typeof t.body)return;let r=t.body,o=function(e,t){for(let n of e.querySelectorAll(".js-render-target[data-identity][data-host]"))if(n.getAttribute("data-identity")===t)return n;return null}(document,n);if(!o||e.origin!==o.getAttribute("data-host"))return;let a=e.origin,d=null!=t.payload?t.payload:void 0,s=o.querySelector("iframe"),u=s?.contentWindow;switch(r){case"hello":if((c.get(o)||{untimed:!0}).hello=Date.now(),!u)return;p(u,{type:"render:cmd",body:{cmd:"ack",ack:!0}},a),p(u,{type:"render:cmd",body:{cmd:"branding",branding:!1}},a);break;case"error":f(o,d?.error);break;case"error:fatal":f(o,d?.error),o.classList.add("is-render-failed-fatal");break;case"error:invalid":f(o,d?.error),o.classList.add("is-render-failed-invalid");break;case"loading":o.classList.remove(...l),o.classList.add("is-render-loading");break;case"loaded":o.classList.remove(...l),o.classList.add("is-render-loaded");break;case"ready":(0,i.A)(o),o.classList.remove(...l),o.classList.add("is-render-ready"),d&&"number"==typeof d.height&&(o.style.height=`${d.height}px`,""!==location.hash&&window.dispatchEvent(new HashChangeEvent("hashchange"))),d?.ack===!0&&window.requestAnimationFrame(()=>{setTimeout(()=>{p(u,{type:"render:cmd",body:{cmd:"code_rendering_service:ready:ack","code_rendering_service:ready:ack":{}}},a)},0)});break;case"resize":d&&"number"==typeof d.height&&(o.style.height=`${d.height}px`);break;case"code_rendering_service:container:get_size":p(u,{type:"render:cmd",body:{cmd:"code_rendering_service:container:size","code_rendering_service:container:size":{width:o?.getBoundingClientRect().width}}},a);break;case"code_rendering_service:markdown:get_data":if(!u)return;!function(){let e;let t=s?.getAttribute("data-content")??"";try{e=JSON.parse(t)?.data}catch{e=null}e&&p(u,{type:"render:cmd",body:{cmd:"code_rendering_service:data:ready","code_rendering_service:data:ready":{data:e,width:o?.getBoundingClientRect().width}}},a)}()}});let v=h(e=>p(e,{type:"render:cmd",body:{cmd:"code_rendering_service:behaviour:expand_all"}},origin)),g=h(e=>p(e,{type:"render:cmd",body:{cmd:"code_rendering_service:behaviour:collapse_all"}},origin))},65584:(e,t,n)=>{n.d(t,{OQ:()=>a,PA:()=>l,PT:()=>u,Px:()=>s,to:()=>c});var r=n(75028),i=n(15180);function o(){(0,i.TV)("preferred_color_mode",a())}function a(){return d("dark")?"dark":d("light")?"light":void 0}function d(e){return window.matchMedia&&window.matchMedia(`(prefers-color-scheme: ${e})`).matches}function l(e){let t=document.querySelector("html[data-color-mode]");t&&t.setAttribute("data-color-mode",e)}function s(e,t){let n=document.querySelector("html[data-color-mode]");n&&n.setAttribute(`data-${t}-theme`,e)}function c(e){let t=document.querySelector("html[data-color-mode]");if(t)return t.getAttribute(`data-${e}-theme`)}function u(e="light"){let t=function(){let e=document.querySelector("html[data-color-mode]");if(e)return e.getAttribute("data-color-mode")}();return("auto"===t?a():t)??e}(async()=>{if(await r.G,o(),window.matchMedia){let e=window.matchMedia("(prefers-color-scheme: dark)");e?.addEventListener?e.addEventListener("change",o):e.addListener(o)}})()},13080:(e,t,n)=>{n.d(t,{C:()=>a,i:()=>d});var r=n(47584),i=n(75632),o=n(46493);function a(e,t){(0,i.G7)("arianotify_comprehensive_migration")?d(l(e),{...t,element:t?.element??e}):(0,i.G7)("primer_live_region_element")&&t?.element===void 0?(0,o.Cj)(e,{politeness:t?.assertive?"assertive":"polite"}):d(l(e),t)}function d(e,t){let{assertive:n,element:a}=t??{};(0,i.G7)("arianotify_comprehensive_migration")&&"ariaNotify"in Element.prototype?(a||document.body).ariaNotify(e,{interrupt:t?.assertive?"all":"none"}):(0,i.G7)("primer_live_region_element")&&void 0===a?(0,o.iP)(e,{politeness:n?"assertive":"polite"}):function(e,t,n){let i=n??r.XC?.querySelector(t?"#js-global-screen-reader-notice-assertive":"#js-global-screen-reader-notice");i&&(i.textContent===e?i.textContent=`${e}\u00A0`:i.textContent=e)}(e,n,a)}function l(e){return(e.getAttribute("aria-label")||e.innerText||"").trim()}},15180:(e,t,n)=>{function r(e){return i(e)[0]}function i(e){let t=[];for(let n of function(){try{return document.cookie.split(";")}catch{return[]}}()){let[r,i]=n.trim().split("=");e===r&&void 0!==i&&t.push({key:r,value:i})}return t}function o(e,t,n=null,r=!1,i="lax"){let a=document.domain;if(null==a)throw Error("Unable to get document domain");a.endsWith(".github.com")&&(a="github.com");let d="https:"===location.protocol?"; secure":"",l=n?`; expires=${n}`:"";!1===r&&(a=`.${a}`);try{document.cookie=`${e}=${t}; path=/; domain=${a}${l}${d}; samesite=${i}`}catch{}}function a(e,t=!1){let n=document.domain;if(null==n)throw Error("Unable to get document domain");n.endsWith(".github.com")&&(n="github.com");let r=new Date(Date.now()-1).toUTCString(),i="https:"===location.protocol?"; secure":"",o=`; expires=${r}`;!1===t&&(n=`.${n}`);try{document.cookie=`${e}=''; path=/; domain=${n}${o}${i}`}catch{}}n.d(t,{OR:()=>i,Ri:()=>r,TV:()=>o,Yj:()=>a})},50210:(e,t,n)=>{n.d(t,{JC:()=>r.JC,KK:()=>r.KK,SK:()=>o,Vy:()=>r.Vy,ai:()=>r.ai,oc:()=>r.oc,rd:()=>r.rd});var r=n(50515);let i=/(?:^|,)((?:[^,]|,(?=\+| |$))*(?:,(?=,))?)/g;function o(e){return Array.from(e.matchAll(i)).map(([,e])=>e)}},67307:(e,t,n)=>{n.d(t,{Kq:()=>SoftNavErrorEvent,RQ:()=>SoftNavEndEvent,gh:()=>SoftNavPayloadEvent,ni:()=>SoftNavSuccessEvent,sW:()=>SoftNavStartEvent,xc:()=>SoftNavReplaceMechanismEvent});var r=n(18056);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let o=class SoftNavEvent extends Event{constructor(e,t){super(t),i(this,"mechanism",void 0),this.mechanism=e}};let SoftNavStartEvent=class SoftNavStartEvent extends o{constructor(e){super(e,r.z.START)}};let SoftNavReplaceMechanismEvent=class SoftNavReplaceMechanismEvent extends o{constructor(e){super(e,r.z.REPLACE_MECHANISM)}};let SoftNavSuccessEvent=class SoftNavSuccessEvent extends o{constructor(e,t){super(e,r.z.SUCCESS),i(this,"visitCount",void 0),this.visitCount=t}};let SoftNavErrorEvent=class SoftNavErrorEvent extends o{constructor(e,t){super(e,r.z.ERROR),i(this,"error",void 0),this.error=t}};let SoftNavEndEvent=class SoftNavEndEvent extends o{constructor(e){super(e,r.z.END)}};let SoftNavPayloadEvent=class SoftNavPayloadEvent extends Event{constructor(e){super("soft-nav:payload"),i(this,"payload",void 0),i(this,"appPayload",void 0),this.payload=e.payload,this.appPayload=e.appPayload}}},73081:(e,t,n)=>{n.d(t,{Bu:()=>h,SC:()=>s,Ti:()=>m,iS:()=>u,k5:()=>l,o4:()=>f,pO:()=>c,rZ:()=>p});var r=n(18056),i=n(67307),o=n(6211),a=n(95505);let d=0;function l(){d=0,document.dispatchEvent(new Event(r.z.INITIAL)),(0,a.xT)()}function s(e){(0,a.LM)()||(document.dispatchEvent(new Event(r.z.PROGRESS_BAR.START)),document.dispatchEvent(new i.sW(e)),(0,a.Vy)(e),(0,a.ZW)(),(0,a.HK)(),(0,o.E5)())}function c(e){(0,a.LM)()&&((0,a.Vy)(e),document.dispatchEvent(new i.xc(e)))}function u(e={}){g(e)&&(d+=1,document.dispatchEvent(new i.ni((0,a.di)(),d)),m(e))}function f(e={}){if(!g(e))return;d=0;let t=(0,a.my)()||a.BW;document.dispatchEvent(new i.Kq((0,a.di)(),t)),v(),(0,o.Cd)(t),(0,a.xT)()}function m(e={}){if(!g(e))return;let t=(0,a.di)();v(),document.dispatchEvent(new i.RQ(t)),(0,a.Ff)(),(0,a.JA)(t)}function p(e={}){g(e)&&((0,o.Im)(),document.dispatchEvent(new Event(r.z.RENDER)))}function h(){document.dispatchEvent(new Event(r.z.FRAME_UPDATE))}function v(){document.dispatchEvent(new Event(r.z.PROGRESS_BAR.END))}function g({skipIfGoingToReactApp:e,allowedMechanisms:t=[]}={}){return(0,a.LM)()&&(0===t.length||t.includes((0,a.di)()))&&(!e||!(0,a.gc)())}},6211:(e,t,n)=>{n.d(t,{Cd:()=>l,E5:()=>d,Im:()=>s,nW:()=>a});var r=n(57516),i=n(95505);let o="stats:soft-nav-duration",a={turbo:"TURBO",react:"REACT","turbo.frame":"FRAME",ui:"UI",hard:"HARD"};function d(){window.performance.clearResourceTimings(),window.performance.mark(o)}function l(e){(0,r.i)({turboFailureReason:e,turboStartUrl:(0,i.dR)(),turboEndUrl:window.location.href})}function s(){let e=function(){if(0===performance.getEntriesByName(o).length)return null;performance.measure(o,o);let e=performance.getEntriesByName(o).pop();return e?e.duration:null}();if(!e)return;let t=a[(0,i.di)()],n=Math.round(e);t===a.react&&document.dispatchEvent(new CustomEvent("staffbar-update",{detail:{duration:n}})),(0,r.i)({requestUrl:window.location.href,softNavigationTiming:{mechanism:t,destination:(0,i.fX)()||"rails",duration:n,initiator:(0,i.Pv)()||"rails"}})}},61828:(e,t,n)=>{n.d(t,{softNavigate:()=>o});var r=n(73081),i=n(7332);let o=(e,t)=>{(0,r.SC)("turbo"),(0,i.YR)(e,{...t})}},72340:(e,t,n)=>{function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,{Rt:()=>i,Zz:()=>o,yU:()=>Subscription});let Subscription=class Subscription{constructor(e){r(this,"closed",void 0),r(this,"unsubscribe",void 0),this.closed=!1,this.unsubscribe=()=>{e(),this.closed=!0}}};function i(e,t,n,r={capture:!1}){return e.addEventListener(t,n,r),new Subscription(()=>{e.removeEventListener(t,n,r)})}function o(...e){return new Subscription(()=>{for(let t of e)t.unsubscribe()})}},9552:(e,t,n)=>{n.d(t,{A:()=>r});function r(e){return!(e.offsetWidth<=0&&e.offsetHeight<=0)}}}]);
//# sourceMappingURL=app_assets_modules_github_behaviors_ajax-error_ts-app_assets_modules_github_behaviors_include-d0d0a6-c93bda858d46.js.map