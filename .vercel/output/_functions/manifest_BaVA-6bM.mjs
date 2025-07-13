import 'kleur/colors';
import { e as decodeKey } from './chunks/astro/server_AN8NM7U5.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DshdSsen.mjs';
import 'es-module-lexer';

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

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/","cacheDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/node_modules/.astro/","outDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/dist/","srcDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/src/","publicDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/public/","buildClientDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/dist/client/","buildServerDir":"file:///D:/Desktop/prueba%20tecnica/inmobiliaria/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"properties/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/properties","isIndex":false,"type":"page","pattern":"^\\/properties\\/?$","segments":[[{"content":"properties","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/properties.astro","pathname":"/properties","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.jDWxQNKJ.css"},{"type":"external","src":"/_astro/login.D-w1oILU.css"}],"routeData":{"route":"/offer/[id]","isIndex":false,"type":"page","pattern":"^\\/offer\\/([^/]+?)\\/?$","segments":[[{"content":"offer","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/offer/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/Desktop/prueba tecnica/inmobiliaria/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["D:/Desktop/prueba tecnica/inmobiliaria/src/pages/login.astro",{"propagation":"none","containsHead":true}],["D:/Desktop/prueba tecnica/inmobiliaria/src/pages/offer/[id].astro",{"propagation":"none","containsHead":true}],["D:/Desktop/prueba tecnica/inmobiliaria/src/pages/properties.astro",{"propagation":"none","containsHead":true}],["D:/Desktop/prueba tecnica/inmobiliaria/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/offer/[id]@_@astro":"pages/offer/_id_.astro.mjs","\u0000@astro-page:src/pages/properties@_@astro":"pages/properties.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","D:/Desktop/prueba tecnica/inmobiliaria/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DIfeK7Wj.mjs","\u0000@astrojs-manifest":"manifest_BaVA-6bM.mjs","D:/Desktop/prueba tecnica/inmobiliaria/src/components/AdminDashboard.vue":"_astro/AdminDashboard.C4ploz1S.js","D:/Desktop/prueba tecnica/inmobiliaria/src/components/LoginForm.vue":"_astro/LoginForm.Cni9NDuu.js","D:/Desktop/prueba tecnica/inmobiliaria/src/components/OfferForm.vue":"_astro/OfferForm.Ddm1VjpR.js","D:/Desktop/prueba tecnica/inmobiliaria/src/components/InmuebleList.vue":"_astro/InmuebleList.16ShsAHS.js","@astrojs/vue/client.js":"_astro/client.BSJyWCdy.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/bootstrap-icons.mSm7cUeB.woff2","/_astro/background.BPKAcmfN.svg","/_astro/astro.Dm8K3lV8.svg","/_astro/bootstrap-icons.BeopsB42.woff","/_astro/admin.jDWxQNKJ.css","/_astro/login.D-w1oILU.css","/favicon.svg","/_astro/AdminDashboard.C4ploz1S.js","/_astro/client.BSJyWCdy.js","/_astro/InmuebleList.16ShsAHS.js","/_astro/LoginForm.Cni9NDuu.js","/_astro/OfferForm.Ddm1VjpR.js","/_astro/runtime-core.esm-bundler.CZed73ja.js","/_astro/runtime-dom.esm-bundler.TiLjfoSv.js","/_astro/_plugin-vue_export-helper.DlAUqK2U.js","/admin/index.html","/login/index.html","/properties/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"BAwe/kWvAwBHQ4chChqQpxP8XzPK2rgCKlVa19/W33o="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
