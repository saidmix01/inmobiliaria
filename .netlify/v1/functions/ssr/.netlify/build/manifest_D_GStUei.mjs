import 'kleur/colors';
import { l as NOOP_MIDDLEWARE_HEADER, n as decodeKey } from './chunks/astro/server_CD0p8EJo.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/","cacheDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/node_modules/.astro/","outDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/dist/","srcDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/src/","publicDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/public/","buildClientDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/dist/","buildServerDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.D4Sb73LK.css"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.D4Sb73LK.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.D4Sb73LK.css"}],"routeData":{"route":"/offer/[id]","isIndex":false,"type":"page","pattern":"^\\/offer\\/([^/]+?)\\/?$","segments":[[{"content":"offer","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/offer/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.D4Sb73LK.css"}],"routeData":{"route":"/properties","isIndex":false,"type":"page","pattern":"^\\/properties\\/?$","segments":[[{"content":"properties","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/properties.astro","pathname":"/properties","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"#background[data-astro-cid-mmc7otgs]{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;filter:blur(100px)}#container[data-astro-cid-mmc7otgs]{font-family:Inter,Roboto,Helvetica Neue,Arial Nova,Nimbus Sans,Arial,sans-serif;height:100%}main[data-astro-cid-mmc7otgs]{height:100%;display:flex;justify-content:center}#hero[data-astro-cid-mmc7otgs]{display:flex;align-items:start;flex-direction:column;justify-content:center;padding:16px}h1[data-astro-cid-mmc7otgs]{font-size:22px;margin-top:.25em}#links[data-astro-cid-mmc7otgs]{display:flex;gap:16px}#links[data-astro-cid-mmc7otgs] a[data-astro-cid-mmc7otgs]{display:flex;align-items:center;padding:10px 12px;color:#111827;text-decoration:none;transition:color .2s}#links[data-astro-cid-mmc7otgs] a[data-astro-cid-mmc7otgs]:hover{color:#4e5056}#links[data-astro-cid-mmc7otgs] a[data-astro-cid-mmc7otgs] svg[data-astro-cid-mmc7otgs]{height:1em;margin-left:8px}#links[data-astro-cid-mmc7otgs] a[data-astro-cid-mmc7otgs].button{color:#fff;background:linear-gradient(83.21deg,#3245ff,#bc52ee);box-shadow:inset 0 0 0 1px #ffffff1f,inset 0 -2px #0000003d;border-radius:10px}#links[data-astro-cid-mmc7otgs] a[data-astro-cid-mmc7otgs].button:hover{color:#e6e6e6;box-shadow:none}pre[data-astro-cid-mmc7otgs]{font-family:ui-monospace,Cascadia Code,Source Code Pro,Menlo,Consolas,DejaVu Sans Mono,monospace;font-weight:400;background:linear-gradient(14deg,#d83333,#f041ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0}h2[data-astro-cid-mmc7otgs]{margin:0 0 1em;font-weight:400;color:#111827;font-size:20px}p[data-astro-cid-mmc7otgs]{color:#4b5563;font-size:16px;line-height:24px;letter-spacing:-.006em;margin:0}code[data-astro-cid-mmc7otgs]{display:inline-block;background:linear-gradient(66.77deg,#f3cddd,#f5cee7) padding-box,linear-gradient(155deg,#d83333,#f041ff 18%,#f5cee7 45%) border-box;border-radius:8px;border:1px solid transparent;padding:6px 8px}.box[data-astro-cid-mmc7otgs]{padding:16px;background:#fff;border-radius:16px;border:1px solid white}#news[data-astro-cid-mmc7otgs]{position:absolute;bottom:16px;right:16px;max-width:300px;text-decoration:none;transition:background .2s;backdrop-filter:blur(50px)}#news[data-astro-cid-mmc7otgs]:hover{background:#ffffff8c}@media screen and (max-height: 368px){#news[data-astro-cid-mmc7otgs]{display:none}}@media screen and (max-width: 768px){#container[data-astro-cid-mmc7otgs]{display:flex;flex-direction:column}#hero[data-astro-cid-mmc7otgs]{display:block;padding-top:10%}#links[data-astro-cid-mmc7otgs]{flex-wrap:wrap}#links[data-astro-cid-mmc7otgs] a[data-astro-cid-mmc7otgs].button{padding:14px 18px}#news[data-astro-cid-mmc7otgs]{right:16px;left:16px;bottom:2.5rem;max-width:100%}h1[data-astro-cid-mmc7otgs]{line-height:1.5}}html,body{margin:0;width:100%;height:100%}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/Desktop/prueba tecnica/inmobiliaria/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/offer/[id]@_@astro":"pages/offer/_id_.astro.mjs","\u0000@astro-page:src/pages/properties@_@astro":"pages/properties.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D_GStUei.mjs","D:/Desktop/prueba tecnica/inmobiliaria/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_Cc2jag08.mjs","D:/Desktop/prueba tecnica/inmobiliaria/src/components/AdminDashboard.vue":"_astro/AdminDashboard.C4ploz1S.js","D:/Desktop/prueba tecnica/inmobiliaria/src/components/LoginForm.vue":"_astro/LoginForm.Cni9NDuu.js","D:/Desktop/prueba tecnica/inmobiliaria/src/components/OfferForm.vue":"_astro/OfferForm.Ddm1VjpR.js","D:/Desktop/prueba tecnica/inmobiliaria/src/components/InmuebleList.vue":"_astro/InmuebleList.16ShsAHS.js","@astrojs/vue/client.js":"_astro/client.BSJyWCdy.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/bootstrap-icons.mSm7cUeB.woff2","/_astro/astro.Dm8K3lV8.svg","/_astro/background.BPKAcmfN.svg","/_astro/bootstrap-icons.BeopsB42.woff","/_astro/admin.D4Sb73LK.css","/favicon.svg","/_astro/AdminDashboard.C4ploz1S.js","/_astro/client.BSJyWCdy.js","/_astro/InmuebleList.16ShsAHS.js","/_astro/LoginForm.Cni9NDuu.js","/_astro/OfferForm.Ddm1VjpR.js","/_astro/runtime-core.esm-bundler.CZed73ja.js","/_astro/runtime-dom.esm-bundler.TiLjfoSv.js","/_astro/_plugin-vue_export-helper.DlAUqK2U.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"2E2N81w6Hv1j0qrzUu4ri/RgW4PM5jjcRI1b/pcWkPc=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_Cc2jag08.mjs');

export { manifest };
