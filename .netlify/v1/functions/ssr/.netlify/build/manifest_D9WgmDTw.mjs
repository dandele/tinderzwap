import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { k as decodeKey } from './chunks/astro/server_CNq7f-vl.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = (_, next) => next();

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
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
    isIndex: rawRouteData.isIndex
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

const manifest = deserializeManifest({"hrefRoot":"file:///Users/dandele/Desktop/astroship/astrowind/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.uiqa0Bko.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.fDDyMQpn.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submitemail","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submitEmail$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submitEmail","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submitEmail.ts","pathname":"/api/submitEmail","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.uiqa0Bko.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.uiqa0Bko.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/homes/mobile-app","isIndex":false,"type":"page","pattern":"^\\/homes\\/mobile-app$","segments":[[{"content":"homes","dynamic":false,"spread":false}],[{"content":"mobile-app","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/homes/mobile-app.astro","pathname":"/homes/mobile-app","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.fDDyMQpn.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/homes/personal","isIndex":false,"type":"page","pattern":"^\\/homes\\/personal$","segments":[[{"content":"homes","dynamic":false,"spread":false}],[{"content":"personal","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/homes/personal.astro","pathname":"/homes/personal","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.uiqa0Bko.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/homes/saas","isIndex":false,"type":"page","pattern":"^\\/homes\\/saas$","segments":[[{"content":"homes","dynamic":false,"spread":false}],[{"content":"saas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/homes/saas.astro","pathname":"/homes/saas","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C9nNpmsf.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"},{"type":"inline","content":".twitter-tweet:not(.twitter-tweet-rendered){padding:var(--tc-padding, 1em);border:1px solid var(--tc-border-color, #cfd9de)}.twitter-tweet:not(.twitter-tweet-rendered)>:first-child{margin-top:0}.twitter-tweet:not(.twitter-tweet-rendered)>:last-child{margin-bottom:0}\nlite-youtube{background-color:#000;position:relative;display:block;contain:content;background-position:center center;background-size:cover;cursor:pointer;max-width:720px}lite-youtube:before{content:attr(data-title);display:block;position:absolute;top:0;background-image:linear-gradient(180deg,#000000ab,#0000008a 14%,#00000026 54%,#0000000d 72%,#0000 94%);height:99px;width:100%;font-family:YouTube Noto,Roboto,Arial,Helvetica,sans-serif;color:#eee;text-shadow:0 0 2px rgba(0,0,0,.5);font-size:18px;padding:25px 20px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box}lite-youtube:hover:before{color:#fff}lite-youtube:after{content:\"\";display:block;padding-bottom:56.25%}lite-youtube>iframe{width:100%;height:100%;position:absolute;top:0;left:0;border:0}lite-youtube>.lty-playbtn{display:block;width:100%;height:100%;background:no-repeat center/68px 48px;background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 68 48\"><path d=\"M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z\" fill=\"red\"/><path d=\"M45 24 27 14v20\" fill=\"white\"/></svg>');position:absolute;cursor:pointer;z-index:1;filter:grayscale(100%);transition:filter .1s cubic-bezier(0,0,.2,1);border:0}lite-youtube:hover>.lty-playbtn,lite-youtube .lty-playbtn:focus{filter:none}lite-youtube.lyt-activated{cursor:unset}lite-youtube.lyt-activated:before,lite-youtube.lyt-activated>.lty-playbtn{opacity:0;pointer-events:none}.lyt-visually-hidden{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}\nlite-youtube>iframe{all:unset!important;width:100%!important;height:100%!important;position:absolute!important;inset:0!important;border:0!important}\nlite-vimeo{font-size:10px;background-color:#000;position:relative;display:block;contain:content;background-position:center center;background-size:cover}lite-vimeo:after{content:\"\";display:block;padding-bottom:56.25%}lite-vimeo>iframe{all:unset!important;width:100%!important;height:100%!important;position:absolute!important;inset:0!important;border:0!important}lite-vimeo>.ltv-playbtn{content:\"\";position:absolute;inset:0;width:100%;background:transparent;outline:0;border:0;cursor:pointer}lite-vimeo>.ltv-playbtn:before{width:6.5em;height:4em;background:#172322bf;opacity:.8;border-radius:.25rem;transition:all .2s cubic-bezier(0,0,.2,1)}lite-vimeo>.ltv-playbtn:focus:before{outline:auto}lite-vimeo:hover>.ltv-playbtn:before{background-color:#00adef;background-color:var(--ltv-color, #00adef);opacity:1}lite-vimeo>.ltv-playbtn:after{border-style:solid;border-width:1em 0 1em 1.7em;border-color:transparent transparent transparent #fff}lite-vimeo>.ltv-playbtn:before,lite-vimeo>.ltv-playbtn:after{content:\"\";position:absolute;top:50%;left:50%;transform:translate3d(-50%,-50%,0)}lite-vimeo.ltv-activated:before,lite-vimeo.ltv-activated>.ltv-playbtn{cursor:unset;opacity:0;pointer-events:none}\n"}],"routeData":{"route":"/homes/startup","isIndex":false,"type":"page","pattern":"^\\/homes\\/startup$","segments":[[{"content":"homes","dynamic":false,"spread":false}],[{"content":"startup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/homes/startup.astro","pathname":"/homes/startup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.uiqa0Bko.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/landing/click-through","isIndex":false,"type":"page","pattern":"^\\/landing\\/click-through$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"click-through","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/click-through.astro","pathname":"/landing/click-through","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.fDDyMQpn.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/landing/lead-generation","isIndex":false,"type":"page","pattern":"^\\/landing\\/lead-generation$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"lead-generation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/lead-generation.astro","pathname":"/landing/lead-generation","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.uiqa0Bko.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/landing/pre-launch","isIndex":false,"type":"page","pattern":"^\\/landing\\/pre-launch$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"pre-launch","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/pre-launch.astro","pathname":"/landing/pre-launch","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.fDDyMQpn.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/landing/product","isIndex":false,"type":"page","pattern":"^\\/landing\\/product$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"product","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/product.astro","pathname":"/landing/product","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.uiqa0Bko.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/landing/sales","isIndex":false,"type":"page","pattern":"^\\/landing\\/sales$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"sales","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/sales.astro","pathname":"/landing/sales","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.uiqa0Bko.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/landing/subscription","isIndex":false,"type":"page","pattern":"^\\/landing\\/subscription$","segments":[[{"content":"landing","dynamic":false,"spread":false}],[{"content":"subscription","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing/subscription.astro","pathname":"/landing/subscription","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.uiqa0Bko.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/pricing","isIndex":false,"type":"page","pattern":"^\\/pricing$","segments":[[{"content":"pricing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pricing.astro","pathname":"/pricing","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.uiqa0Bko.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.md","pathname":"/privacy","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.fDDyMQpn.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.uiqa0Bko.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/terms","isIndex":false,"type":"page","pattern":"^\\/terms$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms.md","pathname":"/terms","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.fDDyMQpn.js"}],"styles":[{"type":"external","src":"/_astro/click-through.DTyX-huh.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}}],"site":"https://astrowind.vercel.app","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/utils/blog.ts",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/components/blog/RelatedPosts.astro",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/[...blog]/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/components/widgets/BlogHighlightedPosts.astro",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/components/widgets/BlogLatestPosts.astro",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/homes/personal.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/homes/personal@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/homes/saas.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/homes/saas@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/[...blog]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/[...blog]/[category]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/[category]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/[...blog]/[tag]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...blog]/[tag]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/landing/click-through.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/landing/lead-generation.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/landing/pre-launch.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/landing/product.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/landing/sales.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/landing/subscription.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/privacy.md",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/terms.md",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/homes/mobile-app.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/homes/startup.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/pricing.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/services.astro",{"propagation":"none","containsHead":true}],["/Users/dandele/Desktop/astroship/astrowind/src/pages/404.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/submitEmail@_@ts":"pages/api/submitemail.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/homes/mobile-app@_@astro":"pages/homes/mobile-app.astro.mjs","\u0000@astro-page:src/pages/homes/personal@_@astro":"pages/homes/personal.astro.mjs","\u0000@astro-page:src/pages/homes/saas@_@astro":"pages/homes/saas.astro.mjs","\u0000@astro-page:src/pages/homes/startup@_@astro":"pages/homes/startup.astro.mjs","\u0000@astro-page:src/pages/landing/click-through@_@astro":"pages/landing/click-through.astro.mjs","\u0000@astro-page:src/pages/landing/lead-generation@_@astro":"pages/landing/lead-generation.astro.mjs","\u0000@astro-page:src/pages/landing/pre-launch@_@astro":"pages/landing/pre-launch.astro.mjs","\u0000@astro-page:src/pages/landing/product@_@astro":"pages/landing/product.astro.mjs","\u0000@astro-page:src/pages/landing/sales@_@astro":"pages/landing/sales.astro.mjs","\u0000@astro-page:src/pages/landing/subscription@_@astro":"pages/landing/subscription.astro.mjs","\u0000@astro-page:src/pages/pricing@_@astro":"pages/pricing.astro.mjs","\u0000@astro-page:src/pages/privacy@_@md":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/services@_@astro":"pages/services.astro.mjs","\u0000@astro-page:src/pages/terms@_@md":"pages/terms.astro.mjs","\u0000@astro-page:src/pages/[...blog]/[category]/[...page]@_@astro":"pages/_---blog_/_category_/_---page_.astro.mjs","\u0000@astro-page:src/pages/[...blog]/[tag]/[...page]@_@astro":"pages/_---blog_/_tag_/_---page_.astro.mjs","\u0000@astro-page:src/pages/[...blog]/[...page]@_@astro":"pages/_---blog_/_---page_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/[...blog]/index@_@astro":"pages/_---blog_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D9WgmDTw.mjs","/Users/dandele/Desktop/astroship/astrowind/src/assets/images/app-store.png":"chunks/app-store_CA1EfMC4.mjs","/Users/dandele/Desktop/astroship/astrowind/src/assets/images/default.png":"chunks/default_yHn0Dg9w.mjs","/Users/dandele/Desktop/astroship/astrowind/src/assets/images/google-play.png":"chunks/google-play_Clk5A2UM.mjs","/Users/dandele/Desktop/astroship/astrowind/src/assets/images/hero-image.png":"chunks/hero-image_BZjEoeuy.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/astrowind-template-in-depth.mdx?astroContentCollectionEntry=true":"chunks/astrowind-template-in-depth_CEUK6P46.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/get-started-website-with-astro-tailwind-css.md?astroContentCollectionEntry=true":"chunks/get-started-website-with-astro-tailwind-css_9C_ANc3b.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/how-to-customize-astrowind-to-your-brand.md?astroContentCollectionEntry=true":"chunks/how-to-customize-astrowind-to-your-brand_gRUyxSBU.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/landing.md?astroContentCollectionEntry=true":"chunks/landing_C93ajv8-.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/markdown-elements-demo-post.mdx?astroContentCollectionEntry=true":"chunks/markdown-elements-demo-post_BOIsYNjO.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/useful-resources-to-create-websites.md?astroContentCollectionEntry=true":"chunks/useful-resources-to-create-websites_CHdTxuUn.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/astrowind-template-in-depth.mdx?astroPropagatedAssets":"chunks/astrowind-template-in-depth_yklYUmoe.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/get-started-website-with-astro-tailwind-css.md?astroPropagatedAssets":"chunks/get-started-website-with-astro-tailwind-css_gR7MLq2n.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/how-to-customize-astrowind-to-your-brand.md?astroPropagatedAssets":"chunks/how-to-customize-astrowind-to-your-brand_D4pJe1tO.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/landing.md?astroPropagatedAssets":"chunks/landing_BrZ-fRFJ.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/markdown-elements-demo-post.mdx?astroPropagatedAssets":"chunks/markdown-elements-demo-post_B9AHekBS.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/useful-resources-to-create-websites.md?astroPropagatedAssets":"chunks/useful-resources-to-create-websites_CYthl2C_.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/astrowind-template-in-depth.mdx":"chunks/astrowind-template-in-depth_1Z2ZJyCO.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/get-started-website-with-astro-tailwind-css.md":"chunks/get-started-website-with-astro-tailwind-css_BWKkvyaq.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/how-to-customize-astrowind-to-your-brand.md":"chunks/how-to-customize-astrowind-to-your-brand_BBpFd8wo.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/landing.md":"chunks/landing_DPddUw8w.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/markdown-elements-demo-post.mdx":"chunks/markdown-elements-demo-post_GM3Qoycm.mjs","/Users/dandele/Desktop/astroship/astrowind/src/content/post/useful-resources-to-create-websites.md":"chunks/useful-resources-to-create-websites_DjHtKL9o.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.C9nNpmsf.js","/Users/dandele/Desktop/astroship/astrowind/node_modules/@astro-community/astro-embed-vimeo/Vimeo.astro?astro&type=script&index=0&lang.ts":"_astro/Vimeo.astro_astro_type_script_index_0_lang.CgRsrQuG.js","/Users/dandele/Desktop/astroship/astrowind/node_modules/@astro-community/astro-embed-youtube/YouTube.astro?astro&type=script&index=0&lang.ts":"_astro/YouTube.astro_astro_type_script_index_0_lang.Dkyb9mLy.js","/astro/hoisted.js?q=0":"_astro/hoisted.fDDyMQpn.js","/astro/hoisted.js?q=2":"_astro/hoisted.uiqa0Bko.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/inter-cyrillic-ext-wght-normal.B2xhLi22.woff2","/_astro/inter-cyrillic-wght-normal.CMZtQduZ.woff2","/_astro/inter-greek-wght-normal.CaVNZxsx.woff2","/_astro/inter-greek-ext-wght-normal.CGAr0uHJ.woff2","/_astro/inter-latin-wght-normal.C2S99t-D.woff2","/_astro/inter-vietnamese-wght-normal.CBcvBZtf.woff2","/_astro/inter-latin-ext-wght-normal.CFHvXkgd.woff2","/_astro/app-store.t3tG4Jz3.png","/_astro/google-play.ISTMcpLO.png","/_astro/favicon.CGiRCjPI.ico","/_astro/hero-image.DwIC_L_T.png","/_astro/default.CczmzLWf.png","/_astro/favicon.vp_fBu0c.svg","/_astro/apple-touch-icon.DHIlG7dp.png","/_astro/click-through.DTyX-huh.css","/_headers","/robots.txt","/_astro/Vimeo.astro_astro_type_script_index_0_lang.CgRsrQuG.js","/_astro/YouTube.astro_astro_type_script_index_0_lang.Dkyb9mLy.js","/_astro/hoisted.C9nNpmsf.js","/_astro/hoisted.fDDyMQpn.js","/_astro/hoisted.uiqa0Bko.js","/decapcms/config.yml","/decapcms/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"9Df97Ry/eFJ9egnkhK+pyXEjZ89GoIpYFjrShwJoMdA=","experimentalEnvGetSecretEnabled":false});

export { manifest };
