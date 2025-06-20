import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, send, getRequestHeaders, getRequestURL, getResponseHeader, setResponseHeaders, getResponseStatus, createError, getHeaders, parseCookies, getQuery as getQuery$1, isMethod, readBody, setCookie, getRequestHost, getRequestProtocol, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getRouterParam, getResponseStatusText } from 'file:///Users/hua/Documents/esim/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import is from 'file:///Users/hua/Documents/esim/node_modules/@sindresorhus/is/distribution/index.js';
import destr$2, { destr as destr$1 } from 'file:///Users/hua/Documents/esim/node_modules/destr/dist/index.mjs';
import CredentialsProvider from 'file:///Users/hua/Documents/esim/node_modules/next-auth/providers/credentials.js';
import { ensurePrefix } from 'file:///Users/hua/Documents/esim/node_modules/@antfu/utils/dist/index.mjs';
import { AuthHandler } from 'file:///Users/hua/Documents/esim/node_modules/next-auth/core/index.js';
import { getToken as getToken$1 } from 'file:///Users/hua/Documents/esim/node_modules/next-auth/jwt/index.js';
import defu, { defuFn, defu as defu$1 } from 'file:///Users/hua/Documents/esim/node_modules/defu/dist/defu.mjs';
import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'file:///Users/hua/Documents/esim/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { stringify, uneval } from 'file:///Users/hua/Documents/esim/node_modules/devalue/index.js';
import { renderToString } from 'file:///Users/hua/Documents/esim/node_modules/vue/server-renderer/index.mjs';
import { propsToString, renderSSRHead } from 'file:///Users/hua/Documents/esim/node_modules/@unhead/ssr/dist/index.mjs';
import destr from 'file:///Users/hua/Documents/esim/node_modules/nitropack/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///Users/hua/Documents/esim/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/hua/Documents/esim/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/hua/Documents/esim/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/hua/Documents/esim/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/hua/Documents/esim/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///Users/hua/Documents/esim/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/hua/Documents/esim/node_modules/klona/dist/index.mjs';
import { snakeCase } from 'file:///Users/hua/Documents/esim/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/hua/Documents/esim/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/hua/Documents/esim/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///Users/hua/Documents/esim/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/hua/Documents/esim/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/hua/Documents/esim/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/hua/Documents/esim/node_modules/nitropack/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/hua/Documents/esim/node_modules/errx/dist/index.js';
import { isVNode, unref, version } from 'file:///Users/hua/Documents/esim/node_modules/vue/index.mjs';
import getURL from 'file:///Users/hua/Documents/esim/node_modules/requrl/dist/requrl.js';
import { createServerHead as createServerHead$1, CapoPlugin } from 'file:///Users/hua/Documents/esim/node_modules/unhead/dist/index.mjs';
import { defineHeadPlugin } from 'file:///Users/hua/Documents/esim/node_modules/@unhead/shared/dist/index.mjs';

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const serverAssets = [{"baseName":"server","dir":"/Users/hua/Documents/esim/frontend/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/hua/Documents/esim/frontend"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/hua/Documents/esim/frontend/server"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/hua/Documents/esim/frontend/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/hua/Documents/esim/frontend/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/hua/Documents/esim/frontend/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "apiBaseUrl": "http://localhost:3030/api",
    "mapboxAccessToken": "",
    "i18n": {
      "baseUrl": "",
      "defaultLocale": "",
      "defaultDirection": "ltr",
      "strategy": "prefix_except_default",
      "lazy": false,
      "rootRedirect": "",
      "routesNameSeparator": "___",
      "defaultLocaleRouteNameSuffix": "default",
      "skipSettingLocaleOnNavigate": false,
      "differentDomains": false,
      "trailingSlash": false,
      "locales": [],
      "detectBrowserLanguage": {
        "alwaysRedirect": false,
        "cookieCrossOrigin": false,
        "cookieDomain": "",
        "cookieKey": "i18n_redirected",
        "cookieSecure": false,
        "fallbackLocale": "",
        "redirectOn": "root",
        "useCookie": true
      },
      "experimental": {
        "localeDetector": "",
        "switchLocalePathLinkSSR": false,
        "autoImportTranslationFunctions": false,
        "typedPages": true,
        "typedOptionsAndMessages": false,
        "generatedLocaleFilePathFormat": "absolute"
      },
      "multiDomainLocales": false
    },
    "device": {
      "defaultUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36",
      "enabled": true,
      "refreshOnResize": false
    },
    "auth": {
      "isEnabled": true,
      "baseURL": "http://localhost:3030/api/auth",
      "disableInternalRouting": false,
      "disableServerSideAuth": false,
      "originEnvKey": "AUTH_ORIGIN",
      "sessionRefresh": {
        "enablePeriodically": false,
        "enableOnWindowFocus": true,
        "handler": ""
      },
      "globalAppMiddleware": false,
      "provider": {
        "type": "authjs",
        "trustHost": false,
        "defaultProvider": "",
        "addDefaultCallbackUrl": true
      }
    }
  },
  "AUTH_ORIGIN": "http://localhost:3030/api/auth",
  "AUTH_SECRET": "7af82237c4ac5d172db8c53816139f2bf25236231130898bfebe65dace465d5e"
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler$0 = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _yXQqbt6Ivqi2vzpkKMQy5KByOjeqHh1O14C_TxbZMnM = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/Users/hua/Documents/esim/frontend";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"}],"style":[],"script":[],"noscript":[],"titleTemplate":"%s - Esim Management","title":"Esim"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _BD83VmNfH3drshHDFg8O0vADCGhNPfe5hc_i_jIRzqo = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const ERROR_MESSAGES = {
  NO_SECRET: "AUTH_NO_SECRET: No `secret` - this is an error in production, see https://sidebase.io/nuxt-auth/resources/errors. You can ignore this during development",
  NO_ORIGIN: "AUTH_NO_ORIGIN: No `origin` - this is an error in production, see https://sidebase.io/nuxt-auth/resources/errors. You can ignore this during development"
};

function useTypedBackendConfig(runtimeConfig, type) {
  const provider = runtimeConfig.public.auth.provider;
  if (provider.type === type) {
    return provider;
  }
  throw new Error("RuntimeError: Type must match at this point");
}

function resolveApiBaseURL(runtimeConfig, returnOnlyPathname) {
  const authRuntimeConfig = runtimeConfig.public.auth;
  if (returnOnlyPathname === void 0) {
    returnOnlyPathname = !runtimeConfig.public.auth.disableInternalRouting;
  }
  let baseURL = authRuntimeConfig.baseURL;
  if (authRuntimeConfig.originEnvKey) {
    const envBaseURL = process.env[authRuntimeConfig.originEnvKey];
    if (envBaseURL) {
      baseURL = envBaseURL;
    }
  }
  if (returnOnlyPathname) {
    baseURL = withLeadingSlash(parseURL(baseURL).pathname);
  }
  return baseURL;
}

function defineNitroPlugin$1(def) {
  return def;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const isNonEmptyObject = (obj) => typeof obj === "object" && obj !== null && Object.keys(obj).length > 0;

let preparedAuthjsHandler;
let usedSecret;
function NuxtAuthHandler(nuxtAuthOptions) {
  const trustHostUserPreference = useTypedBackendConfig(useRuntimeConfig(), "authjs").trustHost;
  usedSecret = nuxtAuthOptions?.secret;
  if (!usedSecret) {
    {
      console.info(ERROR_MESSAGES.NO_SECRET);
      usedSecret = "secret";
    }
  }
  const options = defu$1(nuxtAuthOptions, {
    secret: usedSecret,
    logger: void 0,
    providers: [],
    // SAFETY: We trust host here because `getRequestURLFromH3Event` is responsible for producing a trusted URL
    trustHost: true,
    // AuthJS uses `/auth` as default, but we rely on `/api/auth` (same as in previous `next-auth`)
    basePath: "/api/auth"
    // Uncomment to enable framework-author specific functionality
    // raw: raw as typeof raw
  });
  if (preparedAuthjsHandler) {
    console.error("You setup the auth handler for a second time - this is likely undesired. Make sure that you only call `NuxtAuthHandler( ... )` once");
  }
  preparedAuthjsHandler = (req) => AuthHandler({ req, options });
  return eventHandler(async (event) => {
    const { res } = event.node;
    const nextRequest = await createRequestForAuthjs(event, trustHostUserPreference);
    const nextResult = await preparedAuthjsHandler(nextRequest);
    if (nextResult.status) {
      res.statusCode = nextResult.status;
    }
    nextResult.cookies?.forEach((cookie) => setCookieDeduped(event, cookie.name, cookie.value, cookie.options));
    nextResult.headers?.forEach((header) => appendHeaderDeduped(event, header.key, header.value));
    if (!nextResult.redirect) {
      return nextResult.body;
    }
    if (nextRequest.body?.json) {
      return { url: nextResult.redirect };
    }
    return await sendRedirect(event, nextResult.redirect);
  });
}
async function getServerSession(event) {
  const runtimeConfig = useRuntimeConfig();
  const authBasePathname = resolveApiBaseURL(runtimeConfig, true);
  const trustHostUserPreference = useTypedBackendConfig(runtimeConfig, "authjs").trustHost;
  if (event.path && event.path.startsWith(authBasePathname)) {
    return null;
  }
  const sessionUrlPath = joinURL(authBasePathname, "/session");
  const headers = getHeaders(event);
  if (!preparedAuthjsHandler) {
    await $fetch(sessionUrlPath, { headers }).catch((error) => error.data);
    if (!preparedAuthjsHandler) {
      throw createError({ statusCode: 500, statusMessage: "Tried to get server session without setting up an endpoint to handle authentication (see https://github.com/sidebase/nuxt-auth#quick-start)" });
    }
  }
  const sessionUrlBase = getRequestBaseFromH3Event(event, trustHostUserPreference);
  const sessionUrl = new URL(sessionUrlPath, sessionUrlBase);
  const authjsRequest = {
    action: "session",
    method: "GET",
    headers,
    body: void 0,
    cookies: parseCookies(event),
    providerId: void 0,
    error: void 0,
    host: sessionUrl.origin,
    query: Object.fromEntries(sessionUrl.searchParams)
  };
  const authjsResponse = await preparedAuthjsHandler(authjsRequest);
  const session = authjsResponse.body;
  if (isNonEmptyObject(session)) {
    return session;
  }
  return null;
}
function getToken({ event, secureCookie, secret, ...rest }) {
  return getToken$1({
    // @ts-expect-error As our request is not a real next-auth request, we pass down only what's required for the method, as per code from https://github.com/nextauthjs/next-auth/blob/8387c78e3fef13350d8a8c6102caeeb05c70a650/packages/next-auth/src/jwt/index.ts#L68
    req: {
      cookies: parseCookies(event),
      headers: getHeaders(event)
    },
    // see https://github.com/nextauthjs/next-auth/blob/8387c78e3fef13350d8a8c6102caeeb05c70a650/packages/next-auth/src/jwt/index.ts#L73
    secureCookie: secureCookie ?? getServerOrigin(event).startsWith("https://"),
    secret: secret || usedSecret,
    ...rest
  });
}
async function createRequestForAuthjs(event, trustHostUserPreference) {
  const nextRequest = {
    host: getRequestURLFromH3Event(event, trustHostUserPreference).origin,
    body: void 0,
    cookies: parseCookies(event),
    query: void 0,
    headers: getHeaders(event),
    method: event.method,
    providerId: void 0,
    error: void 0
  };
  const query = getQuery$1(event);
  const { action, providerId } = parseActionAndProvider(event);
  const error = query.error;
  if (Array.isArray(error)) {
    throw createError({ statusCode: 400, statusMessage: "Error query parameter can only appear once" });
  }
  const body = isMethod(event, ["PATCH", "POST", "PUT", "DELETE"]) ? await readBody(event) : void 0;
  return {
    ...nextRequest,
    body,
    query,
    action,
    providerId,
    error: error ? String(error) : void 0
  };
}
function getRequestURLFromH3Event(event, trustHost) {
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  const base = getRequestBaseFromH3Event(event, trustHost);
  return new URL(path, base);
}
function getRequestBaseFromH3Event(event, trustHost) {
  if (trustHost) {
    const host = getRequestHost(event, { xForwardedHost: trustHost });
    const protocol = getRequestProtocol(event);
    return `${protocol}://${host}`;
  }
  const origin = getServerOrigin(event);
  return origin;
}
const SUPPORTED_ACTIONS = ["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error", "_log"];
function parseActionAndProvider({ context }) {
  const params = context.params?._?.split("/");
  if (!params || ![1, 2].includes(params.length)) {
    throw createError({ statusCode: 400, statusMessage: `Invalid path used for auth-endpoint. Supply either one path parameter (e.g., \`/api/auth/session\`) or two (e.g., \`/api/auth/signin/github\` after the base path (in previous examples base path was: \`/api/auth/\`. Received \`${params}\`` });
  }
  const [unvalidatedAction, providerId] = params;
  const action = SUPPORTED_ACTIONS.find((action2) => action2 === unvalidatedAction);
  if (!action) {
    throw createError({ statusCode: 400, statusMessage: `Called endpoint with unsupported action ${unvalidatedAction}. Only the following actions are supported: ${SUPPORTED_ACTIONS.join(", ")}` });
  }
  return { action, providerId };
}
function appendHeaderDeduped(event, name, value) {
  let current = getResponseHeader(event, name);
  if (!current) {
    setResponseHeader(event, name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  if (current.includes(value)) {
    return;
  }
  current.push(value);
  setResponseHeader(event, name, current);
}
function setCookieDeduped(event, name, value, serializeOptions) {
  let setCookiesHeader = getResponseHeader(event, "set-cookie");
  if (setCookiesHeader) {
    if (!Array.isArray(setCookiesHeader)) {
      setCookiesHeader = [setCookiesHeader.toString()];
    }
    const filterBy = `${name}=`;
    setCookiesHeader = setCookiesHeader.filter((cookie) => !cookie.startsWith(filterBy));
    setResponseHeader(event, "set-cookie", setCookiesHeader);
  }
  setCookie(event, name, value, serializeOptions);
}

async function setAuthOnlyRoute(event, statusMessage = "You must be signed in to access this API.") {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      statusCode: 403,
      statusMessage
    });
  }
  return session;
}

const genId = (array) => {
  var _a;
  const { length } = array;
  let lastIndex = 0;
  if (length)
    lastIndex = Number((_a = array[length - 1]) == null ? void 0 : _a.id) + 1;
  return lastIndex || length + 1;
};

const getIntId = (event, msg404 = "Id is required to get item details") => {
  var _a;
  const id = Number((_a = event.context.params) == null ? void 0 : _a.id);
  if (!id || !Number.isInteger(id)) {
    throw createError({
      statusCode: 404,
      statusMessage: msg404
    });
  }
  return id;
};

const getPublicUrl = (path) => {
  var _a;
  const baseUrl = (_a = process.env.NUXT_APP_BASE_URL) != null ? _a : "";
  const pathWithBaseUrl = `${baseUrl}${path}`;
  return `${ensurePrefix("/", pathWithBaseUrl)}`.replaceAll("//", "/");
};

const paginateArray = (array, perPage, page) => array.slice((page - 1) * perPage, page * perPage);

function getServerOrigin(event) {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = resolveApiBaseURL(runtimeConfig, false);
  const parsed = parseURL(baseURL);
  if (parsed.protocol && parsed.host) {
    return `${parsed.protocol}//${parsed.host}`;
  }
  if (event && true) {
    return getURL(event.node.req, false);
  }
  throw new Error(ERROR_MESSAGES.NO_ORIGIN);
}

function defineNitroPlugin(def) {
  return def;
}
const _YHm5z3kLvndN4qCRju740Yd9T4lGJ5Hwg_zORpAdg = defineNitroPlugin(() => {
  try {
    getServerOrigin();
  } catch (error) {
    {
      console.info(ERROR_MESSAGES.NO_ORIGIN);
    }
  }
});

const _YNTx2Nryg30kOxD14XhqJy1pIpVBCrlFsrLoJEA0Q = defineNitroPlugin$1((nitroApp) => {
  nitroApp.hooks.hook("render:response", (response) => {
    response.body = response.body.replaceAll("/_nuxt/\0", "/_nuxt/");
  });
});

const plugins = [
  _yXQqbt6Ivqi2vzpkKMQy5KByOjeqHh1O14C_TxbZMnM,
_BD83VmNfH3drshHDFg8O0vADCGhNPfe5hc_i_jIRzqo,
_YHm5z3kLvndN4qCRju740Yd9T4lGJ5Hwg_zORpAdg,
_YNTx2Nryg30kOxD14XhqJy1pIpVBCrlFsrLoJEA0Q
];

const _lazy_wwBbfw = () => Promise.resolve().then(function () { return changePassword_post$3; });
const _lazy_OyF2_o = () => Promise.resolve().then(function () { return index$3; });
const _lazy_LUWHTG = () => Promise.resolve().then(function () { return courseDetails_get$1; });
const _lazy_WNhntC = () => Promise.resolve().then(function () { return courses_get$1; });
const _lazy_mraCNJ = () => Promise.resolve().then(function () { return _id__delete$f; });
const _lazy_4gA1ck = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_9FT7WE = () => Promise.resolve().then(function () { return index_get$r; });
const _lazy_6BGfx3 = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_3gnqJy = () => Promise.resolve().then(function () { return chatsAndContacts_get$1; });
const _lazy_AYBqge = () => Promise.resolve().then(function () { return _id__get$9; });
const _lazy_dPrXSo = () => Promise.resolve().then(function () { return _id__post$1; });
const _lazy_ugYTQU = () => Promise.resolve().then(function () { return _id__get$7; });
const _lazy_0ky5r6 = () => Promise.resolve().then(function () { return index_get$p; });
const _lazy_ex2AY_ = () => Promise.resolve().then(function () { return _id__delete$d; });
const _lazy_TUjKCJ = () => Promise.resolve().then(function () { return _id__get$5; });
const _lazy_0jlk2R = () => Promise.resolve().then(function () { return index_get$n; });
const _lazy_vzleJB = () => Promise.resolve().then(function () { return _id__delete$b; });
const _lazy_hvI389 = () => Promise.resolve().then(function () { return index_get$l; });
const _lazy_mgeqVi = () => Promise.resolve().then(function () { return index_get$j; });
const _lazy_8kMxUh = () => Promise.resolve().then(function () { return _id__delete$9; });
const _lazy_Wa7Psc = () => Promise.resolve().then(function () { return index_get$h; });
const _lazy_3l3PYU = () => Promise.resolve().then(function () { return index_get$f; });
const _lazy_keFmZ2 = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_qSQ28l = () => Promise.resolve().then(function () { return _id__delete$7; });
const _lazy_gi_7Or = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_BwXL11 = () => Promise.resolve().then(function () { return clients_get$1; });
const _lazy_GTuDda = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_rHgLCZ = () => Promise.resolve().then(function () { return _id__delete$5; });
const _lazy_akTOqu = () => Promise.resolve().then(function () { return add_post$3; });
const _lazy_vYVYtf = () => Promise.resolve().then(function () { return rename_put$1; });
const _lazy_9Xt8wW = () => Promise.resolve().then(function () { return stateUpdate_put$3; });
const _lazy_A9Hmk9 = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_YMCMkY = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_tLR0wG = () => Promise.resolve().then(function () { return add_post$1; });
const _lazy_CVUZKo = () => Promise.resolve().then(function () { return stateUpdate_put$1; });
const _lazy_ziTzgv = () => Promise.resolve().then(function () { return update_put$1; });
const _lazy_LUl2m4 = () => Promise.resolve().then(function () { return index$1; });
const _lazy_qEWB9f = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_QDwk1W = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_GN3Y5V = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_wA2S0g = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_MdCyM1 = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_rTvkjP = () => Promise.resolve().then(function () { return _____$1; });
const _lazy_4Z4dvj = () => Promise.resolve().then(function () { return changePassword_post$1; });
const _lazy_qTlwgn = () => Promise.resolve().then(function () { return projects_get$1; });
const _lazy_t1pEs0 = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_1PjgRD = () => Promise.resolve().then(function () { return me_get$1; });
const _lazy_sjgl8z = () => Promise.resolve().then(function () { return datatable_get$1; });
const _lazy_LmPtp8 = () => Promise.resolve().then(function () { return faq_get$1; });
const _lazy_usjzH3 = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_NDClIW = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_2Cq09P = () => Promise.resolve().then(function () { return header_get$1; });
const _lazy_s9lI03 = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_H_bVoQ = () => Promise.resolve().then(function () { return token_get$1; });
const _lazy_wdLYoz = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '/api/account/change-password', handler: _lazy_wwBbfw, lazy: true, middleware: false, method: "post" },
  { route: '/api/app-bar/search', handler: _lazy_OyF2_o, lazy: true, middleware: false, method: undefined },
  { route: '/api/apps/academy/course-details', handler: _lazy_LUWHTG, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/academy/courses', handler: _lazy_WNhntC, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/calendar/:id', handler: _lazy_mraCNJ, lazy: true, middleware: false, method: "delete" },
  { route: '/api/apps/calendar/:id', handler: _lazy_4gA1ck, lazy: true, middleware: false, method: "put" },
  { route: '/api/apps/calendar', handler: _lazy_9FT7WE, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/calendar', handler: _lazy_6BGfx3, lazy: true, middleware: false, method: "post" },
  { route: '/api/apps/chat/chats-and-contacts', handler: _lazy_3gnqJy, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/chat/chats/:id', handler: _lazy_AYBqge, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/chat/chats/:id', handler: _lazy_dPrXSo, lazy: true, middleware: false, method: "post" },
  { route: '/api/apps/ecommerce/customers/:id', handler: _lazy_ugYTQU, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/ecommerce/customers', handler: _lazy_0ky5r6, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/ecommerce/orders/:id', handler: _lazy_ex2AY_, lazy: true, middleware: false, method: "delete" },
  { route: '/api/apps/ecommerce/orders/:id', handler: _lazy_TUjKCJ, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/ecommerce/orders', handler: _lazy_0jlk2R, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/ecommerce/products/:id', handler: _lazy_vzleJB, lazy: true, middleware: false, method: "delete" },
  { route: '/api/apps/ecommerce/products', handler: _lazy_hvI389, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/ecommerce/referrals', handler: _lazy_mgeqVi, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/ecommerce/reviews/:id', handler: _lazy_8kMxUh, lazy: true, middleware: false, method: "delete" },
  { route: '/api/apps/ecommerce/reviews', handler: _lazy_Wa7Psc, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/email', handler: _lazy_3l3PYU, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/email', handler: _lazy_keFmZ2, lazy: true, middleware: false, method: "post" },
  { route: '/api/apps/invoice/:id', handler: _lazy_qSQ28l, lazy: true, middleware: false, method: "delete" },
  { route: '/api/apps/invoice/:id', handler: _lazy_gi_7Or, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/invoice/clients', handler: _lazy_BwXL11, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/invoice', handler: _lazy_GTuDda, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/kanban/board/:id', handler: _lazy_rHgLCZ, lazy: true, middleware: false, method: "delete" },
  { route: '/api/apps/kanban/board/add', handler: _lazy_akTOqu, lazy: true, middleware: false, method: "post" },
  { route: '/api/apps/kanban/board/rename', handler: _lazy_vYVYtf, lazy: true, middleware: false, method: "put" },
  { route: '/api/apps/kanban/board/state-update', handler: _lazy_9Xt8wW, lazy: true, middleware: false, method: "put" },
  { route: '/api/apps/kanban', handler: _lazy_A9Hmk9, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/kanban/item/:id', handler: _lazy_YMCMkY, lazy: true, middleware: false, method: "delete" },
  { route: '/api/apps/kanban/item/add', handler: _lazy_tLR0wG, lazy: true, middleware: false, method: "post" },
  { route: '/api/apps/kanban/item/state-update', handler: _lazy_CVUZKo, lazy: true, middleware: false, method: "put" },
  { route: '/api/apps/kanban/item/update', handler: _lazy_ziTzgv, lazy: true, middleware: false, method: "put" },
  { route: '/api/apps/logistics/vehicles', handler: _lazy_LUl2m4, lazy: true, middleware: false, method: undefined },
  { route: '/api/apps/permissions', handler: _lazy_qEWB9f, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/users/:id', handler: _lazy_QDwk1W, lazy: true, middleware: false, method: "delete" },
  { route: '/api/apps/users/:id', handler: _lazy_GN3Y5V, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/users', handler: _lazy_wA2S0g, lazy: true, middleware: false, method: "get" },
  { route: '/api/apps/users', handler: _lazy_MdCyM1, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/**', handler: _lazy_rTvkjP, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/change-password', handler: _lazy_4Z4dvj, lazy: true, middleware: false, method: "post" },
  { route: '/api/dashboard/analytics/projects', handler: _lazy_qTlwgn, lazy: true, middleware: false, method: "get" },
  { route: '/api/login', handler: _lazy_t1pEs0, lazy: true, middleware: false, method: "post" },
  { route: '/api/me', handler: _lazy_1PjgRD, lazy: true, middleware: false, method: "get" },
  { route: '/api/pages/datatable', handler: _lazy_sjgl8z, lazy: true, middleware: false, method: "get" },
  { route: '/api/pages/faq', handler: _lazy_LmPtp8, lazy: true, middleware: false, method: "get" },
  { route: '/api/pages/help-center/article', handler: _lazy_usjzH3, lazy: true, middleware: false, method: "get" },
  { route: '/api/pages/help-center', handler: _lazy_NDClIW, lazy: true, middleware: false, method: "get" },
  { route: '/api/pages/profile/header', handler: _lazy_2Cq09P, lazy: true, middleware: false, method: "get" },
  { route: '/api/pages/profile', handler: _lazy_s9lI03, lazy: true, middleware: false, method: "get" },
  { route: '/api/token', handler: _lazy_H_bVoQ, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_wdLYoz, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_wdLYoz, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + messages.statusCode + " - " + messages.statusMessage + " | " + messages.appName + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}h1,p,pre{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + messages.statusCode + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + messages.description + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><pre class="font-light leading-tight p-8 text-xl z-10">' + messages.stack + "</pre></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const changePassword_post$2 = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const session = await getServerSession(event);
    if (!(session == null ? void 0 : session.user)) {
      throw createError({
        statusCode: 401,
        statusMessage: "\u672A\u6388\u6B0A"
      });
    }
    const authData = {
      username: session.user.username,
      role: session.user.role,
      email: session.user.email,
      timestamp: Date.now()
    };
    const token = Buffer.from(JSON.stringify(authData)).toString("base64");
    const backendUrl = "http://localhost:3030";
    const response = await $fetch(`${backendUrl}/api/auth/change-password`, {
      method: "POST",
      body: {
        currentPassword: body.currentPassword,
        newPassword: body.newPassword
      },
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return response;
  } catch (error) {
    console.error("\u5BC6\u78BC\u4FEE\u6539API\u932F\u8AA4:", error);
    if (error.data) {
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.data.message || "\u4FEE\u6539\u5BC6\u78BC\u5931\u6557"
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "\u4FEE\u6539\u5BC6\u78BC\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66"
    });
  }
});

const changePassword_post$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: changePassword_post$2
});

const db$e = {
  searchItems: [
    {
      title: "Dashboards",
      category: "dashboards",
      children: [
        {
          url: { name: "dashboards-analytics" },
          icon: "tabler-timeline",
          title: "Analytics Dashboard"
        },
        {
          url: { name: "dashboards-crm" },
          icon: "tabler-file-analytics",
          title: "CRM Dashboard"
        },
        {
          url: { name: "dashboards-ecommerce" },
          icon: "tabler-shopping-cart",
          title: "ECommerce Dashboard"
        },
        {
          url: { name: "dashboards-academy" },
          icon: "tabler-book",
          title: "Academy Dashboard"
        },
        {
          url: { name: "dashboards-logistics" },
          icon: "tabler-truck",
          title: "Logistics Dashboard"
        }
      ]
    },
    // {
    //   title: 'Front Pages',
    //   category: 'frontPages',
    //   children: [
    //     {
    //       url: { name: 'front-pages-landing-page' },
    //       icon: 'tabler-file-description',
    //       title: 'Landing Front',
    //     },
    //     {
    //       url: { name: 'front-pages-pricing' },
    //       icon: 'tabler-file-description',
    //       title: 'Pricing Front',
    //     },
    //     {
    //       url: { name: 'front-pages-payment' },
    //       icon: 'tabler-file-description',
    //       title: 'Payment Front',
    //     },
    //     {
    //       url: { name: 'front-pages-checkout' },
    //       icon: 'tabler-file-description',
    //       title: 'Checkout Front',
    //     },
    //     {
    //       url: { name: 'front-pages-help-center' },
    //       icon: 'tabler-file-description',
    //       title: 'Help Center Front',
    //     },
    //   ],
    // },
    {
      title: "Apps & Pages",
      category: "appsPages",
      children: [
        {
          url: { name: "apps-email" },
          icon: "tabler-mail",
          title: "Email"
        },
        {
          url: { name: "apps-chat" },
          icon: "tabler-message",
          title: "Chat"
        },
        {
          url: { name: "apps-calendar" },
          icon: "tabler-calendar",
          title: "Calendar"
        },
        {
          url: { name: "apps-ecommerce-dashboard" },
          icon: "tabler-shopping-cart",
          title: "ECommerce Dashboard"
        },
        {
          url: { name: "apps-ecommerce-product-list" },
          icon: "tabler-list",
          title: "Ecommerce - Product List"
        },
        {
          url: { name: "apps-ecommerce-product-add" },
          icon: "tabler-circle-plus",
          title: "Ecommerce - Add Product"
        },
        {
          url: { name: "apps-ecommerce-product-category-list" },
          icon: "tabler-list",
          title: "Ecommerce - Category List"
        },
        {
          url: { name: "apps-ecommerce-order-list" },
          icon: "tabler-list",
          title: "Ecommerce - Order List"
        },
        {
          url: { name: "apps-ecommerce-order-details-id", params: { id: "9042" } },
          icon: "tabler-list-check",
          title: "Ecommerce - Order Details"
        },
        {
          url: { name: "apps-ecommerce-customer-list" },
          icon: "tabler-user",
          title: "Ecommerce - Customer List"
        },
        {
          url: { name: "apps-ecommerce-customer-details-id", params: { id: "478426", tab: "security" } },
          icon: "tabler-list",
          title: "Ecommerce - Customer Details"
        },
        {
          url: { name: "apps-ecommerce-manage-review" },
          icon: "tabler-quote",
          title: "Ecommerce - Manage Review"
        },
        {
          url: { name: "apps-ecommerce-referrals" },
          icon: "tabler-users-group",
          title: "Ecommerce - Referrals"
        },
        {
          url: { name: "apps-ecommerce-settings" },
          icon: "tabler-settings",
          title: "Ecommerce - Settings"
        },
        {
          url: { name: "apps-academy-dashboard" },
          icon: "tabler-book",
          title: "Academy - Dashboard"
        },
        {
          url: { name: "apps-academy-my-course" },
          icon: "tabler-list",
          title: "Academy - My Courses"
        },
        {
          url: { name: "apps-academy-course-details" },
          icon: "tabler-list",
          title: "Academy - Course Details"
        },
        {
          url: { name: "apps-logistics-dashboard" },
          icon: "tabler-book",
          title: "Logistics - Dashboard"
        },
        {
          url: { name: "apps-logistics-fleet" },
          icon: "tabler-car",
          title: "Logistics - fleet"
        },
        {
          url: { name: "apps-invoice-list" },
          icon: "tabler-list",
          title: "Invoice List"
        },
        {
          url: { name: "apps-invoice-preview-id", params: { id: "5036" } },
          icon: "tabler-file-description",
          title: "Invoice Preview"
        },
        {
          url: { name: "apps-invoice-edit-id", params: { id: "5036" } },
          icon: "tabler-file-pencil",
          title: "Invoice Edit"
        },
        {
          url: { name: "apps-invoice-add" },
          icon: "tabler-file-plus",
          title: "Invoice Add"
        },
        {
          url: { name: "apps-user-list" },
          icon: "tabler-users-group",
          title: "User List"
        },
        {
          url: { name: "apps-user-view-id", params: { id: 21 } },
          icon: "tabler-eye",
          title: "User View"
        },
        {
          url: { name: "pages-user-profile-tab", params: { tab: "profile" } },
          icon: "tabler-user-circle",
          title: "User Profile - Profile"
        },
        {
          url: { name: "pages-account-settings-tab", params: { tab: "account" } },
          icon: "tabler-user-circle",
          title: "Account Settings - Account"
        },
        {
          url: { name: "pages-account-settings-tab", params: { tab: "security" } },
          icon: "tabler-lock-open",
          title: "Account Settings - Security"
        },
        {
          url: { name: "pages-account-settings-tab", params: { tab: "billing-plans" } },
          icon: "tabler-currency-dollar",
          title: "Account Settings - Billing"
        },
        {
          url: { name: "pages-account-settings-tab", params: { tab: "notification" } },
          icon: "tabler-bell",
          title: "Account Settings - Notifications"
        },
        {
          url: { name: "pages-account-settings-tab", params: { tab: "connection" } },
          icon: "tabler-link",
          title: "Account Settings - Connections"
        },
        {
          url: { name: "pages-pricing" },
          icon: "tabler-currency-dollar",
          title: "Pricing"
        },
        {
          url: { name: "pages-faq" },
          icon: "tabler-help-circle",
          title: "FAQ"
        },
        {
          url: { name: "pages-misc-coming-soon" },
          icon: "tabler-clock",
          title: "Coming Soon"
        },
        {
          url: { name: "pages-misc-under-maintenance" },
          icon: "tabler-settings",
          title: "Under Maintenance"
        },
        {
          url: { path: "/pages/misc/page-not-found" },
          icon: "tabler-alert-circle",
          title: "Page Not Found - 404"
        },
        {
          url: { name: "pages-misc-not-authorized" },
          icon: "tabler-user-x",
          title: "Not Authorized - 401"
        },
        {
          url: { name: "pages-authentication-login-v1" },
          icon: "tabler-login",
          title: "Login V1"
        },
        {
          url: { name: "pages-authentication-login-v2" },
          icon: "tabler-login",
          title: "Login V2"
        },
        {
          url: { name: "pages-authentication-register-v1" },
          icon: "tabler-user-plus",
          title: "Register V1"
        },
        {
          url: { name: "pages-authentication-register-v2" },
          icon: "tabler-user-plus",
          title: "Register V2"
        },
        {
          icon: "tabler-mail",
          title: "Verify Email V1",
          url: { name: "pages-authentication-verify-email-v1" }
        },
        {
          icon: "tabler-mail",
          title: "Verify Email V2",
          url: { name: "pages-authentication-verify-email-v2" }
        },
        {
          url: { name: "pages-authentication-forgot-password-v1" },
          icon: "tabler-lock-exclamation",
          title: "Forgot Password V1"
        },
        {
          url: { name: "pages-authentication-forgot-password-v2" },
          icon: "tabler-lock-exclamation",
          title: "Forgot Password V2"
        },
        {
          url: { name: "pages-authentication-reset-password-v1" },
          icon: "tabler-help-circle",
          title: "Reset Password V1"
        },
        {
          url: { name: "pages-authentication-reset-password-v2" },
          icon: "tabler-help-circle",
          title: "Reset Password V2"
        },
        {
          icon: "tabler-devices",
          title: "Two Steps V1",
          url: { name: "pages-authentication-two-steps-v1" }
        },
        {
          icon: "tabler-devices",
          title: "Two Steps V2",
          url: { name: "pages-authentication-two-steps-v2" }
        },
        {
          url: { name: "pages-dialog-examples" },
          icon: "tabler-square",
          title: "Dialog Examples"
        },
        {
          url: { name: "pages-authentication-register-multi-steps" },
          icon: "tabler-user-plus",
          title: "Register Multi-Steps"
        },
        {
          url: { name: "wizard-examples-checkout" },
          icon: "tabler-shopping-cart",
          title: "Wizard - Checkout"
        },
        {
          url: { name: "wizard-examples-create-deal" },
          icon: "tabler-gift",
          title: "Wizard - create deal"
        },
        {
          url: { name: "wizard-examples-property-listing" },
          icon: "tabler-home-outline",
          title: "Wizard - Property Listing"
        },
        {
          url: { name: "apps-roles" },
          icon: "tabler-shield-checkered",
          title: "Roles"
        },
        {
          url: { name: "apps-permissions" },
          icon: "tabler-shield-checkered",
          title: "Permissions"
        }
      ]
    },
    {
      title: "User Interface",
      category: "userInterface",
      children: [
        {
          url: { name: "pages-typography" },
          icon: "tabler-letter-case",
          title: "Typography"
        },
        {
          url: { name: "pages-icons" },
          icon: "tabler-icons",
          title: "Icons"
        },
        {
          url: { name: "pages-cards-card-basic" },
          icon: "tabler-square",
          title: "Card Basic"
        },
        {
          url: { name: "pages-cards-card-advance" },
          icon: "tabler-square-plus",
          title: "Card Advance"
        },
        {
          url: { name: "pages-cards-card-statistics" },
          icon: "tabler-chart-bar",
          title: "Card Statistics"
        },
        {
          url: { name: "pages-cards-card-widgets" },
          icon: "tabler-chart-bar",
          title: "Card widgets"
        },
        {
          url: { name: "pages-cards-card-gamification" },
          icon: "tabler-id",
          title: "Card Gamification"
        },
        {
          url: { name: "pages-cards-card-actions" },
          icon: "tabler-square-plus",
          title: "Card Actions"
        },
        {
          url: { name: "components-alert" },
          icon: "tabler-alert-triangle",
          title: "Alerts"
        },
        {
          url: { name: "components-avatar" },
          icon: "tabler-user-circle",
          title: "Avatars"
        },
        {
          url: { name: "components-badge" },
          icon: "tabler-badge",
          title: "Badges"
        },
        {
          url: { name: "components-button" },
          icon: "tabler-circle-plus",
          title: "Buttons"
        },
        {
          url: { name: "components-chip" },
          icon: "tabler-square",
          title: "Chips"
        },
        {
          url: { name: "components-dialog" },
          icon: "tabler-square",
          title: "Dialogs"
        },
        {
          url: { name: "components-list" },
          icon: "tabler-list",
          title: "List"
        },
        {
          url: { name: "components-menu" },
          icon: "tabler-menu-2",
          title: "Menu"
        },
        {
          url: { name: "components-pagination" },
          icon: "tabler-skip-forward",
          title: "Pagination"
        },
        {
          url: { name: "components-progress-circular" },
          icon: "tabler-progress",
          title: "Progress Circular"
        },
        {
          url: { name: "components-progress-linear" },
          icon: "tabler-progress",
          title: "Progress Linear"
        },
        {
          url: { name: "components-expansion-panel" },
          icon: "tabler-align-center",
          title: "Expansion Panel"
        },
        {
          url: { name: "components-snackbar" },
          icon: "tabler-message-dots",
          title: "Snackbar"
        },
        {
          url: { name: "components-tabs" },
          icon: "tabler-app-window",
          title: "Tabs"
        },
        {
          url: { name: "components-timeline" },
          icon: "tabler-timeline",
          title: "Timeline"
        },
        {
          url: { name: "components-tooltip" },
          icon: "tabler-message-2",
          title: "Tooltip"
        },
        {
          url: { name: "extensions-tour" },
          icon: "tabler-box",
          title: "Tour"
        },
        {
          url: { name: "extensions-swiper" },
          icon: "tabler-photo",
          title: "Swiper"
        }
      ]
    },
    {
      title: "Forms & Tables",
      category: "formsTables",
      children: [
        {
          url: { name: "forms-textfield" },
          icon: "tabler-text-caption",
          title: "TextField"
        },
        {
          url: { name: "forms-select" },
          icon: "tabler-list-check",
          title: "Select"
        },
        {
          url: { name: "forms-checkbox" },
          icon: "tabler-square-check",
          title: "Checkbox"
        },
        {
          url: { name: "forms-radio" },
          icon: "tabler-circle-dot-filled",
          title: "Radio"
        },
        {
          url: { name: "forms-combobox" },
          icon: "tabler-square-check",
          title: "Combobox"
        },
        {
          url: { name: "forms-date-time-picker" },
          icon: "tabler-calendar",
          title: "Date Time picker"
        },
        {
          url: { name: "forms-textarea" },
          icon: "tabler-notes",
          title: "Textarea"
        },
        {
          url: { name: "forms-switch" },
          icon: "tabler-toggle-right",
          title: "Switch"
        },
        {
          url: { name: "forms-file-input" },
          icon: "tabler-upload",
          title: "File Input"
        },
        {
          url: { name: "forms-editors" },
          icon: "tabler-file-pencil",
          title: "Editors"
        },
        {
          url: { name: "forms-rating" },
          icon: "tabler-star",
          title: "Form Rating"
        },
        {
          url: { name: "forms-slider" },
          icon: "tabler-hand-move",
          title: "Slider"
        },
        {
          url: { name: "forms-range-slider" },
          icon: "tabler-adjustments-horizontal",
          title: "Range Slider"
        },
        {
          url: { name: "forms-form-layouts" },
          icon: "tabler-box",
          title: "Form Layouts"
        },
        {
          url: { name: "forms-form-validation" },
          icon: "tabler-circle-check",
          title: "Form Validation"
        },
        {
          url: { name: "forms-custom-input" },
          icon: "tabler-list-details",
          title: "Custom Input"
        },
        {
          url: { name: "forms-autocomplete" },
          icon: "tabler-align-left",
          title: "Autocomplete"
        },
        {
          url: { name: "tables-data-table" },
          icon: "tabler-table",
          title: "Data Table"
        },
        {
          url: { name: "tables-simple-table" },
          icon: "tabler-table",
          title: "Simple Table"
        },
        {
          url: { name: "forms-form-wizard-numbered" },
          icon: "tabler-align-center",
          title: "Form Wizard Numbered"
        },
        {
          url: { name: "forms-form-wizard-icons" },
          icon: "tabler-align-center",
          title: "Form Wizard Icons"
        }
      ]
    },
    {
      title: "Chart & Misc",
      category: "chartsMisc",
      children: [
        {
          url: { name: "charts-apex-chart" },
          icon: "tabler-chart-area-line",
          title: "Apex Charts"
        },
        {
          url: { name: "charts-chartjs" },
          icon: "tabler-chart-histogram",
          title: "ChartJS"
        },
        {
          url: { name: "access-control" },
          icon: "tabler-shield",
          title: "Access Control (ACL)"
        }
      ]
    }
  ]
};

const index$2 = defineEventHandler(async (event) => {
  const { q = "" } = getQuery$1(event);
  const searchQuery = is.string(q) ? q : void 0;
  const queryLowered = (searchQuery != null ? searchQuery : "").toString().toLowerCase();
  const filteredSearchData = [];
  db$e.searchItems.forEach((item) => {
    if (item.children) {
      const matchingChildren = item.children.filter(
        (child) => child.title.toLowerCase().includes(queryLowered)
      );
      if (matchingChildren.length > 0) {
        const parentCopy = { ...item };
        if (matchingChildren.length > 5)
          parentCopy.children = matchingChildren.slice(0, 5);
        else
          parentCopy.children = matchingChildren;
        filteredSearchData.push(parentCopy);
      }
    }
  });
  if (filteredSearchData.length > 1) {
    filteredSearchData.forEach((item, index) => {
      if (item.children.length > 3)
        filteredSearchData[index].children.splice(0, 3);
    });
  }
  setResponseStatus(event, 200);
  return [...filteredSearchData];
});

const index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$2
});

const avatar1$a = getPublicUrl("/images/avatars/avatar-1.png");
const avatar2$a = getPublicUrl("/images/avatars/avatar-2.png");
const avatar3$9 = getPublicUrl("/images/avatars/avatar-3.png");
const avatar5$8 = getPublicUrl("/images/avatars/avatar-5.png");
const avatar6$8 = getPublicUrl("/images/avatars/avatar-6.png");
const avatar8$7 = getPublicUrl("/images/avatars/avatar-8.png");
const avatar9$1 = getPublicUrl("/images/avatars/avatar-9.png");
const avatar12$1 = getPublicUrl("/images/avatars/avatar-12.png");
const avatar13$1 = getPublicUrl("/images/avatars/avatar-13.png");
const avatar14$1 = getPublicUrl("/images/avatars/avatar-14.png");
const avatar15$1 = getPublicUrl("/images/avatars/avatar-15.png");
const tutorImg1 = getPublicUrl("/images/pages/app-academy-tutor-1.png");
const tutorImg2 = getPublicUrl("/images/pages/app-academy-tutor-2.png");
const tutorImg3 = getPublicUrl("/images/pages/app-academy-tutor-3.png");
const tutorImg4 = getPublicUrl("/images/pages/app-academy-tutor-4.png");
const tutorImg5 = getPublicUrl("/images/pages/app-academy-tutor-5.png");
const tutorImg6 = getPublicUrl("/images/pages/app-academy-tutor-6.png");
const db$d = {
  courses: [
    {
      id: 1,
      user: "Lauretta Coie",
      image: avatar1$a,
      tutorImg: tutorImg1,
      completedTasks: 19,
      totalTasks: 25,
      userCount: 18,
      note: 20,
      view: 83,
      time: "17h 34m",
      logo: "tabler-brand-angular",
      color: "error",
      courseTitle: "Basics of Angular",
      desc: "Introductory course for Angular and framework basics.Master Angular and build awesome apps.",
      tags: "Web",
      rating: 4.4,
      ratingCount: 8
    },
    {
      id: 2,
      user: "Maybelle Zmitrovich",
      tutorImg: tutorImg2,
      image: avatar2$a,
      completedTasks: 50,
      totalTasks: 52,
      userCount: 14,
      note: 48,
      view: 43,
      time: "19h 17m",
      logo: "tabler-color-swatch",
      color: "warning",
      desc: "Learn how to design a beautiful & engaging mobile app with Figma",
      courseTitle: "UI/UX Design",
      tags: "Design",
      rating: 4.9,
      ratingCount: 10
    },
    {
      id: 3,
      user: "Gertie Langwade",
      image: avatar2$a,
      tutorImg: tutorImg3,
      completedTasks: 87,
      totalTasks: 100,
      userCount: 19,
      note: 81,
      view: 88,
      time: "16h 16m",
      logo: "tabler-brand-react",
      color: "info",
      desc: "Master React.js: Build dynamic web apps with front-end technology",
      courseTitle: "React Native",
      tags: "Web",
      rating: 4.8,
      ratingCount: 9
    },
    {
      id: 4,
      user: "Estella Chace",
      image: avatar3$9,
      completedTasks: 33,
      tutorImg: tutorImg4,
      totalTasks: 50,
      userCount: 28,
      note: 21,
      view: 87,
      time: "15h 49m",
      logo: "tabler-edit",
      color: "success",
      courseTitle: "Art & Drawing",
      desc: "Easy-to-follow video & guides show you how to draw animals & people.",
      tags: "Design",
      rating: 4.7,
      ratingCount: 18
    },
    {
      id: 5,
      user: "Euell Bownass",
      tutorImg: tutorImg5,
      image: avatar14$1,
      completedTasks: 100,
      totalTasks: 100,
      userCount: 13,
      note: 19,
      view: 13,
      time: "12h 42m",
      logo: "tabler-star",
      color: "primary",
      courseTitle: "Basic Fundamentals",
      desc: "Learn the basics of the most popular programming language.",
      tags: "Web",
      rating: 4.6,
      ratingCount: 11
    },
    {
      id: 6,
      user: "Terrye Etches",
      tutorImg: tutorImg6,
      image: avatar3$9,
      completedTasks: 23,
      totalTasks: 25,
      userCount: 78,
      note: 36,
      view: 36,
      time: "1h 42m",
      logo: "tabler-brand-react",
      color: "info",
      courseTitle: "React for Beginners",
      desc: "Learn React in just a couple of afternoons with this immersive course",
      tags: "Web",
      rating: 4.5,
      ratingCount: 68
    },
    {
      id: 7,
      user: "Papageno Sloy",
      tutorImg: tutorImg1,
      image: avatar14$1,
      completedTasks: 11,
      totalTasks: 20,
      userCount: 74,
      note: 21,
      view: 60,
      time: "4h 59m",
      logo: "tabler-star",
      color: "primary",
      courseTitle: "The Science of Critical Thinking",
      desc: "Learn how to improve your arguments & make better decisions",
      tags: "Psychology",
      rating: 4.4,
      ratingCount: 64
    },
    {
      id: 8,
      user: "Aviva Penvarden",
      tutorImg: tutorImg2,
      image: avatar1$a,
      completedTasks: 6,
      totalTasks: 25,
      userCount: 44,
      note: 28,
      view: 13,
      time: "2h 09m",
      logo: "tabler-color-swatch",
      color: "warning",
      courseTitle: "The Complete Figma UI/UX Course",
      desc: "Learn how to design a beautiful & engaging mobile app with Figma",
      tags: "UI/UX",
      rating: 4.3,
      ratingCount: 34
    },
    {
      id: 9,
      user: "Reggi Tuddenham",
      tutorImg: tutorImg3,
      image: avatar8$7,
      completedTasks: 67,
      totalTasks: 100,
      userCount: 95,
      note: 34,
      view: 26,
      time: "22h 21m",
      logo: "tabler-star",
      color: "primary",
      courseTitle: "Advanced Problem Solving Techniques",
      desc: "Learn how to solve problems like a professional.Solve your problems easily.",
      tags: "Psychology",
      rating: 4.2,
      ratingCount: 85
    },
    {
      id: 10,
      user: "Aluin Leveritt",
      image: avatar1$a,
      completedTasks: 49,
      totalTasks: 50,
      tutorImg: tutorImg4,
      userCount: 98,
      note: 51,
      view: 37,
      time: "22h 22m",
      logo: "tabler-brand-react",
      color: "info",
      courseTitle: "Advanced React Native",
      desc: "Learn how to build the world's most popular mobile OS.Use react native like pro.",
      tags: "Web",
      rating: 4.1,
      ratingCount: 88
    },
    {
      id: 11,
      user: "Ardys Deakin",
      image: avatar9$1,
      completedTasks: 87,
      totalTasks: 100,
      tutorImg: tutorImg5,
      userCount: 19,
      note: 40,
      view: 32,
      time: "15h 25m",
      logo: "tabler-brand-react",
      color: "info",
      courseTitle: "Building Web Applications with React",
      desc: "Learn how to build modern web apps with React and Redux",
      tags: "Web",
      rating: 4,
      ratingCount: 9
    },
    {
      id: 12,
      user: "Camel Scown",
      image: avatar1$a,
      tutorImg: tutorImg6,
      completedTasks: 22,
      totalTasks: 25,
      userCount: 26,
      note: 22,
      view: 77,
      time: "4h 33m",
      logo: "tabler-brand-angular",
      color: "error",
      courseTitle: "Angular Routing and Navigation",
      desc: "Learn how to build single page applications like a pro.Learn everything about router.",
      tags: "Web",
      rating: 3.9,
      ratingCount: 16
    },
    {
      id: 13,
      user: "Bertina Honnan",
      image: avatar15$1,
      tutorImg: tutorImg1,
      completedTasks: 11,
      totalTasks: 50,
      userCount: 78,
      note: 75,
      view: 87,
      time: "16h 38m",
      logo: "tabler-star",
      color: "primary",
      courseTitle: "Creative Problem Solving",
      desc: "Learn how to solve problems creatively and effectively.Solve your problems easily.",
      tags: "Psychology",
      rating: 3.8,
      ratingCount: 68
    },
    {
      id: 14,
      user: "Hillyer Wooster",
      image: avatar2$a,
      tutorImg: tutorImg2,
      completedTasks: 11,
      totalTasks: 25,
      userCount: 92,
      note: 39,
      view: 60,
      time: "22h 43m",
      logo: "tabler-brand-angular",
      color: "error",
      courseTitle: "Building Web Applications with Angular",
      desc: "Learn how to build complex modern web applications with Angular",
      tags: "Web",
      rating: 3.7,
      ratingCount: 82
    },
    {
      id: 15,
      user: "Emerson Hance",
      image: avatar12$1,
      tutorImg: tutorImg3,
      completedTasks: 4,
      totalTasks: 5,
      userCount: 14,
      note: 22,
      view: 51,
      time: "2h 29m",
      logo: "tabler-brand-angular",
      color: "error",
      courseTitle: "Advanced Angular",
      desc: "Learn how to build complex modern web application with Angular",
      tags: "Web",
      rating: 3.6,
      ratingCount: 12
    },
    {
      id: 16,
      user: "Ginger Cruft",
      image: avatar1$a,
      tutorImg: tutorImg4,
      completedTasks: 22,
      totalTasks: 25,
      userCount: 20,
      note: 12,
      view: 95,
      time: "20h 10m",
      logo: "tabler-brand-react",
      color: "info",
      courseTitle: "Testing React with Jest and Enzyme",
      desc: "Learn how to build modern web apps with React and Redux",
      tags: "Web",
      rating: 3.5,
      ratingCount: 10
    },
    {
      id: 17,
      user: "Rollie Parsons",
      image: avatar13$1,
      tutorImg: tutorImg5,
      completedTasks: 11,
      totalTasks: 50,
      userCount: 29,
      note: 20,
      view: 98,
      time: "16h 15m",
      logo: "tabler-color-swatch",
      color: "wa",
      courseTitle: "Typography Theory",
      desc: "Learn how to build modern web apps with React and Redux",
      tags: "Design",
      rating: 3.4,
      ratingCount: 19
    },
    {
      id: 18,
      user: "Randy Foister",
      image: avatar1$a,
      completedTasks: 23,
      tutorImg: tutorImg6,
      totalTasks: 100,
      userCount: 20,
      note: 16,
      view: 77,
      time: "4h 31m",
      logo: "tabler-brand-angular",
      color: "error",
      courseTitle: "Angular Testing",
      desc: "Learn everything about testing web application with Angular",
      tags: "Web",
      rating: 4.3,
      ratingCount: 10
    },
    {
      id: 19,
      user: "Ashleigh Bartkowiak",
      image: avatar8$7,
      completedTasks: 17,
      tutorImg: tutorImg1,
      totalTasks: 50,
      userCount: 28,
      note: 91,
      view: 31,
      time: "1h 52m",
      logo: "tabler-brand-react",
      color: "info",
      courseTitle: "React for Professional",
      desc: "Learn how to build modern web apps with React and Redux",
      tags: "Web",
      rating: 4.2,
      ratingCount: 18
    },
    {
      id: 20,
      user: "Bernarr Markie",
      image: avatar12$1,
      tutorImg: tutorImg2,
      completedTasks: 1,
      totalTasks: 10,
      userCount: 11,
      note: 33,
      view: 53,
      time: "16h 24m",
      logo: "tabler-edit",
      color: "success",
      courseTitle: "The Ultimate Drawing Course",
      desc: "Learn how to draw like a professional with this immersive course",
      tags: "Art",
      rating: 4.1,
      ratingCount: 9
    },
    {
      id: 21,
      user: "Merrilee Whitnell",
      image: avatar2$a,
      completedTasks: 91,
      totalTasks: 100,
      tutorImg: tutorImg3,
      userCount: 11,
      note: 17,
      view: 74,
      time: "5h 57m",
      logo: "tabler-brand-angular",
      color: "error",
      courseTitle: "Basics of Angular",
      desc: "Introductory course for Angular and framework basics.Master Angular and build awesome apps.",
      tags: "Web",
      rating: 4,
      ratingCount: 7
    },
    {
      id: 22,
      user: "Thekla Dineges",
      image: avatar1$a,
      tutorImg: tutorImg4,
      completedTasks: 49,
      totalTasks: 50,
      userCount: 28,
      note: 30,
      view: 54,
      time: "4h 40m",
      logo: "tabler-edit",
      color: "success",
      courseTitle: "Introduction to Digital Painting",
      desc: "Learn how to draw like a professional with this immersive course",
      tags: "Art",
      rating: 3.9,
      ratingCount: 18
    },
    {
      id: 23,
      user: "Freda Garham",
      image: avatar5$8,
      tutorImg: tutorImg5,
      completedTasks: 81,
      totalTasks: 100,
      userCount: 79,
      note: 46,
      view: 27,
      time: "8h 44m",
      logo: "tabler-star",
      color: "primary",
      courseTitle: "The Science of Everyday Thinking",
      desc: "Learn how to think better, argue better, and choose better",
      tags: "Psychology",
      rating: 3.8,
      ratingCount: 69
    },
    {
      id: 24,
      user: "Leyla Bourley",
      image: avatar13$1,
      completedTasks: 6,
      tutorImg: tutorImg6,
      totalTasks: 25,
      userCount: 28,
      note: 11,
      view: 77,
      time: "22h 36m",
      logo: "tabler-edit",
      color: "success",
      courseTitle: "Color Theory",
      desc: "Learn how to use the powerful techniques in Colour Therapy",
      tags: "Design",
      rating: 3.7,
      ratingCount: 18
    },
    {
      id: 25,
      user: "Nevsa Lawey",
      image: avatar6$8,
      completedTasks: 13,
      totalTasks: 100,
      tutorImg: tutorImg1,
      userCount: 93,
      note: 73,
      view: 67,
      time: "19h 21m",
      logo: "tabler-color-swatch",
      color: "warning",
      courseTitle: "The Complete Figma Course",
      desc: "Learn how to design a beautiful & engaging mobile app with Figma",
      tags: "UI/UX",
      rating: 3.6,
      ratingCount: 83
    }
  ],
  courseDetails: {
    title: "UI/UX Basic Fundamentals",
    about: "Learn web design in 1 hour with 25+ simple-to-use rules and guidelines \u2014 tons of amazing web design resources included!",
    instructor: "Devonne Wallbridge",
    instructorAvatar: avatar3$9,
    instructorPosition: "Web Developer, Designer, and Teacher",
    skillLevel: "All Level",
    totalStudents: 38815,
    language: "English",
    isCaptions: true,
    length: "1.5 total hours",
    totalLectures: 19,
    description: `
        <p class="text-body-1">
          The material of this course is also covered in my other course about web design and development with HTML5 & CSS3. Scroll to the bottom of this page to check out that course, too! If you're already taking my other course, you already have all it takes to start designing beautiful websites today!
        </p>
      
        <p class="text-body-1">
          "Best web design course: If you're interested in web design, but want more than just a "how to use WordPress" course, I highly recommend this one." \u2014 Florian Giusti
        </p>
      
        <p class="text-body-1">
          "Very helpful to us left-brained people: I am familiar with HTML, CSS, jQuery, and Twitter Bootstrap, but I needed instruction in web design. This course gave me practical, impactful techniques for making websites more beautiful and engaging." \u2014 Susan Darlene Cain
        </p>`,
    content: [
      {
        title: "Course Content",
        status: "2/5",
        time: "4.4 min",
        id: "section1",
        topics: [
          { title: "Welcome to this course", time: "2.4 min", isCompleted: true },
          { title: "Watch before you start", time: "4.8 min", isCompleted: true },
          { title: "Basic Design theory", time: "5.9 min", isCompleted: false },
          { title: "Basic Fundamentals", time: "3.6 min", isCompleted: false },
          { title: "What is ui/ux", time: "10.6 min", isCompleted: false }
        ]
      },
      {
        title: "Web design for Developers",
        status: "0/4",
        time: "4.8 min",
        id: "section2",
        topics: [
          { title: "How to use Pages in Figma", time: "8:31 min", isCompleted: false },
          { title: "What is Lo Fi Wireframe", time: "2 min", isCompleted: false },
          { title: "How to use color in Figma", time: "5.9 min", isCompleted: false },
          { title: "Frames vs Groups in Figma", time: "3.6 min", isCompleted: false }
        ]
      },
      {
        title: "Build Beautiful Websites!",
        status: "0/4",
        time: "4.4 min",
        id: "section3",
        topics: [
          { title: "Section & Div Block", time: "3:53 min", isCompleted: false },
          { title: "Read-Only Version of Chat App", time: "2:03 min", isCompleted: false },
          { title: "Webflow Autosave", time: "8 min", isCompleted: false },
          { title: "Canvas Settings", time: "3 min", isCompleted: false },
          { title: "HTML Tags", time: "10 min", isCompleted: false },
          { title: "Footer (Chat App)", time: "9:10 min", isCompleted: false }
        ]
      },
      {
        title: "Final Project",
        status: "0/3",
        time: "4.4 min",
        id: "section4",
        topics: [
          { title: "Responsive Blog Site", time: "10:00 min", isCompleted: false },
          { title: "Responsive Portfolio", time: "13:00 min", isCompleted: false },
          { title: "Basic Design theory", time: "15 min", isCompleted: false }
        ]
      }
    ]
  }
};

const courseDetails_get = defineEventHandler(() => {
  return db$d.courseDetails;
});

const courseDetails_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: courseDetails_get
});

const courses_get = defineEventHandler((event) => {
  const { q, hideCompleted, page = 1, itemsPerPage = 10, sortBy, orderBy, label = "All Courses" } = getQuery$1(event);
  const searchQuery = is.string(q) ? q : void 0;
  const queryLowered = (searchQuery != null ? searchQuery : "").toString().toLowerCase();
  const parsedHideCompleted = destr$1(hideCompleted);
  const hideCompletedLocal = is.boolean(parsedHideCompleted) ? parsedHideCompleted : false;
  const parsedSortBy = destr$1(sortBy);
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : "";
  const parsedOrderBy = destr$1(orderBy);
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : "";
  const parsedItemsPerPage = destr$1(itemsPerPage);
  const parsedPage = destr$1(page);
  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10;
  const pageLocal = is.number(parsedPage) ? parsedPage : 1;
  const parsedLabel = destr$1(label);
  const labelLocal = is.string(parsedLabel) ? parsedLabel : "All Courses";
  const filteredCourses = db$d.courses.filter((course) => {
    return (course.courseTitle.toLowerCase().includes(queryLowered) || course.user.toLowerCase().includes(queryLowered)) && !(course.completedTasks === course.totalTasks && hideCompletedLocal) && (labelLocal !== "All Courses" ? course.tags.toLocaleLowerCase() === (labelLocal == null ? void 0 : labelLocal.toLowerCase()) : true);
  });
  if (sortByLocal) {
    if (sortByLocal === "courseName") {
      filteredCourses.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.courseTitle.localeCompare(b.courseTitle);
        else
          return b.courseTitle.localeCompare(a.courseTitle);
      });
    }
    if (sortByLocal === "progress") {
      filteredCourses.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.completedTasks / a.totalTasks - b.completedTasks / b.totalTasks;
        else
          return b.completedTasks / b.totalTasks - a.completedTasks / a.totalTasks;
      });
    }
  }
  setResponseStatus(event, 200);
  return { courses: paginateArray(filteredCourses, itemsPerPageLocal, pageLocal), total: filteredCourses.length };
});

const courses_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: courses_get
});

const date = /* @__PURE__ */ new Date();
const nextDay = new Date((/* @__PURE__ */ new Date()).getTime() + 24 * 60 * 60 * 1e3);
const nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1);
const prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1);
const db$c = {
  events: [
    {
      id: 1,
      url: "",
      title: "Design Review",
      start: date,
      end: nextDay,
      allDay: false,
      extendedProps: {
        calendar: "Business"
      }
    },
    {
      id: 2,
      url: "",
      title: "Meeting With Client",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
      allDay: true,
      extendedProps: {
        calendar: "Business"
      }
    },
    {
      id: 3,
      url: "",
      title: "Family Trip",
      allDay: true,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
      extendedProps: {
        calendar: "Holiday"
      }
    },
    {
      id: 4,
      url: "",
      title: "Doctor's Appointment",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
      allDay: true,
      extendedProps: {
        calendar: "Personal"
      }
    },
    {
      id: 5,
      url: "",
      title: "Dart Game?",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: "ETC"
      }
    },
    {
      id: 6,
      url: "",
      title: "Meditation",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: "Personal"
      }
    },
    {
      id: 7,
      url: "",
      title: "Dinner",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: "Family"
      }
    },
    {
      id: 8,
      url: "",
      title: "Product Review",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: "Business"
      }
    },
    {
      id: 9,
      url: "",
      title: "Monthly Meeting",
      start: nextMonth,
      end: nextMonth,
      allDay: true,
      extendedProps: {
        calendar: "Business"
      }
    },
    {
      id: 10,
      url: "",
      title: "Monthly Checkup",
      start: prevMonth,
      end: prevMonth,
      allDay: true,
      extendedProps: {
        calendar: "Personal"
      }
    }
  ]
};

const _id__delete$e = defineEventHandler((event) => {
  const eventId = getIntId(event, "event Id is required to delete a event");
  const eventIndex = db$c.events.findIndex((e) => Number(e.id) === eventId);
  db$c.events.splice(eventIndex, 1);
  setResponseStatus(event, 204);
  return null;
});

const _id__delete$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$e
});

const _id__put = defineEventHandler(async (event) => {
  const updatedEvent = await readBody(event);
  updatedEvent.id = Number(updatedEvent.id);
  const currentEvent = db$c.events.find((e) => e.id === updatedEvent.id);
  if (currentEvent) {
    Object.assign(currentEvent, updatedEvent);
    setResponseStatus(event, 200);
    return currentEvent;
  }
  setResponseStatus(event, 400);
  return { message: "Something went wrong" };
});

const _id__put$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__put
});

const index_get$q = defineEventHandler((event) => {
  const queries = getQuery$1(event);
  const parsedCalendars = destr$1(queries.calendars);
  const calendars = is.array(parsedCalendars) ? parsedCalendars : parsedCalendars !== void 0 ? [parsedCalendars] : void 0;
  const events = db$c.events.filter((e) => calendars == null ? void 0 : calendars.includes(e.extendedProps.calendar));
  setResponseStatus(event, 200);
  return events;
});

const index_get$r = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$q
});

const index_post$4 = defineEventHandler(async (event) => {
  const eventToAdd = await readBody(event);
  db$c.events.push({
    ...eventToAdd,
    id: genId(db$c.events)
  });
  setResponseStatus(event, 201);
  return { body: eventToAdd };
});

const index_post$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$4
});

const previousDay = new Date((/* @__PURE__ */ new Date()).getTime() - 24 * 60 * 60 * 1e3);
const dayBeforePreviousDay = new Date((/* @__PURE__ */ new Date()).getTime() - 24 * 60 * 60 * 1e3 * 2);
const avatar1$9 = getPublicUrl("/images/avatars/avatar-1.png");
const avatar2$9 = getPublicUrl("/images/avatars/avatar-2.png");
const avatar3$8 = getPublicUrl("/images/avatars/avatar-3.png");
const avatar4$7 = getPublicUrl("/images/avatars/avatar-4.png");
const avatar5$7 = getPublicUrl("/images/avatars/avatar-5.png");
const avatar6$7 = getPublicUrl("/images/avatars/avatar-6.png");
const avatar8$6 = getPublicUrl("/images/avatars/avatar-8.png");
const db$b = {
  profileUser: {
    id: 11,
    avatar: avatar1$9,
    fullName: "John Doe",
    role: "admin",
    about: "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie marshmallow.",
    status: "online",
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false
    }
  },
  contacts: [
    {
      id: 1,
      fullName: "Gavin Griffith",
      role: "Frontend Developer",
      about: "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
      avatar: avatar5$7,
      status: "offline"
    },
    {
      id: 2,
      fullName: "Harriet McBride",
      role: "UI/UX Designer",
      about: "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
      avatar: avatar2$9,
      status: "busy"
    },
    {
      id: 3,
      fullName: "Danny Conner",
      role: "Town planner",
      about: "Souffl\xE9 souffl\xE9 caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.",
      avatar: "",
      status: "away"
    },
    {
      id: 4,
      fullName: "Janie West",
      role: "Data scientist",
      about: "Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.",
      avatar: "",
      status: "online"
    },
    {
      id: 5,
      fullName: "Bryan Murray",
      role: "Dietitian",
      about: "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
      avatar: avatar5$7,
      status: "busy"
    },
    {
      id: 6,
      fullName: "Albert Underwood",
      role: "Marketing executive",
      about: "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
      avatar: avatar6$7,
      status: "online"
    },
    {
      id: 7,
      fullName: "Adele Ross",
      role: "Special educational needs teacher",
      about: "Biscuit powder oat cake donut brownie ice cream I love souffl\xE9. I love tootsie roll I love powder tootsie roll.",
      avatar: "",
      status: "online"
    },
    {
      id: 8,
      fullName: "Mark Berry",
      role: "Advertising copywriter",
      about: "Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.",
      avatar: avatar3$8,
      status: "away"
    },
    {
      id: 9,
      fullName: "Joseph Evans",
      role: "Designer, television/film set",
      about: "Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.",
      avatar: avatar8$6,
      status: "offline"
    },
    {
      id: 10,
      fullName: "Blake Carter",
      role: "Building surveyor",
      about: "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
      avatar: avatar4$7,
      status: "away"
    }
  ],
  chats: [
    {
      id: 1,
      userId: 2,
      unseenMsgs: 0,
      messages: [
        {
          message: "Hi",
          time: "Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)",
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "Hello. How can I help You?",
          time: "Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)",
          senderId: 2,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "Can I get details of my last transaction I made last month? \u{1F914}",
          time: "Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)",
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "We need to check if we can provide you such information.",
          time: "Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)",
          senderId: 2,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "I will inform you as I get update on this.",
          time: "Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)",
          senderId: 2,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "If it takes long you can mail me at my mail address.",
          time: String(dayBeforePreviousDay),
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: false,
            isSeen: false
          }
        }
      ]
    },
    {
      id: 2,
      userId: 1,
      unseenMsgs: 1,
      messages: [
        {
          message: "How can we help? We're here for you!",
          time: "Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)",
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "Hey John, I am looking for the best admin template. Could you please help me to find it out?",
          time: "Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)",
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "It should use nice Framework.",
          time: "Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)",
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "Absolutely!",
          time: "Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)",
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "Our admin is the responsive admin template.!",
          time: "Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)",
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "Looks clean and fresh UI. \u{1F60D}",
          time: "Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)",
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "It's perfect for my next project.",
          time: "Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)",
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "How can I purchase it?",
          time: "Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)",
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "Thanks, From our official site  \u{1F607}",
          time: "Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)",
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: "I will purchase it for sure. \u{1F44D}",
          time: String(previousDay),
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        }
      ]
    }
  ]
};

const chatsAndContacts_get = defineEventHandler(async (event) => {
  const { q = "" } = getQuery$1(event);
  const qLowered = q.toLowerCase();
  const chatsContacts = db$b.chats.map((chat) => {
    const contact = JSON.parse(JSON.stringify(db$b.contacts.find((c) => c.id === chat.userId)));
    contact.chat = { id: chat.id, unseenMsgs: chat.unseenMsgs, lastMessage: chat.messages.at(-1) };
    return contact;
  }).reverse();
  const profileUserData = db$b.profileUser;
  return {
    chatsContacts: chatsContacts.filter((c) => c.fullName.toLowerCase().includes(qLowered)),
    contacts: db$b.contacts.filter((c) => c.fullName.toLowerCase().includes(qLowered)),
    profileUser: profileUserData
  };
});

const chatsAndContacts_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: chatsAndContacts_get
});

const _id__get$8 = defineEventHandler(async (event) => {
  const userId = getIntId(event, "User id is required to get chat messages");
  const chat = db$b.chats.find((c) => c.userId === userId);
  if (chat)
    chat.unseenMsgs = 0;
  return {
    chat,
    contact: db$b.contacts.find((c) => c.id === userId)
  };
});

const _id__get$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$8
});

const _id__post = defineEventHandler(async (event) => {
  const chatId = getIntId(event, "Chat id is required to send message");
  const { message, senderId } = await readBody(event);
  let activeChat = db$b.chats.find((chat) => chat.userId === chatId);
  const newMessageData = {
    message,
    time: String(/* @__PURE__ */ new Date()),
    senderId,
    feedback: {
      isSent: true,
      isDelivered: false,
      isSeen: false
    }
  };
  let isNewChat = false;
  if (activeChat === void 0) {
    isNewChat = true;
    db$b.chats.push({
      id: db$b.chats.length + 1,
      userId: chatId,
      unseenMsgs: 0,
      messages: [newMessageData]
    });
    activeChat = db$b.chats.at(-1);
  } else {
    activeChat.messages.push(newMessageData);
  }
  const response = { msg: newMessageData };
  if (isNewChat)
    response.chat = activeChat;
  setResponseStatus(event, 201);
  return response;
});

const _id__post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__post
});

const auFlag = getPublicUrl("/images/icons/countries/au.png");
const brFlag = getPublicUrl("/images/icons/countries/br.png");
const cnFlag = getPublicUrl("/images/icons/countries/cn.png");
const frFlag = getPublicUrl("/images/icons/countries/fr.png");
const inFlag = getPublicUrl("/images/icons/countries/in.png");
const usFlag = getPublicUrl("/images/icons/countries/us.png");
const avatar1$8 = getPublicUrl("/images/avatars/avatar-1.png");
const avatar10 = getPublicUrl("/images/avatars/avatar-10.png");
const avatar11 = getPublicUrl("/images/avatars/avatar-11.png");
const avatar12 = getPublicUrl("/images/avatars/avatar-12.png");
const avatar13 = getPublicUrl("/images/avatars/avatar-13.png");
const avatar14 = getPublicUrl("/images/avatars/avatar-14.png");
const avatar15 = getPublicUrl("/images/avatars/avatar-15.png");
const avatar2$8 = getPublicUrl("/images/avatars/avatar-2.png");
const avatar3$7 = getPublicUrl("/images/avatars/avatar-3.png");
const avatar4$6 = getPublicUrl("/images/avatars/avatar-4.png");
const avatar5$6 = getPublicUrl("/images/avatars/avatar-5.png");
const avatar6$6 = getPublicUrl("/images/avatars/avatar-6.png");
const avatar7$5 = getPublicUrl("/images/avatars/avatar-7.png");
const avatar8$5 = getPublicUrl("/images/avatars/avatar-8.png");
const avatar9 = getPublicUrl("/images/avatars/avatar-9.png");
const product1 = getPublicUrl("/images/ecommerce-images/product-1.png");
const product10$1 = getPublicUrl("/images/ecommerce-images/product-10.png");
const product11$1 = getPublicUrl("/images/ecommerce-images/product-11.png");
const product12 = getPublicUrl("/images/ecommerce-images/product-12.png");
const product13$1 = getPublicUrl("/images/ecommerce-images/product-13.png");
const product14$1 = getPublicUrl("/images/ecommerce-images/product-14.png");
const product15$1 = getPublicUrl("/images/ecommerce-images/product-15.png");
const product16$1 = getPublicUrl("/images/ecommerce-images/product-16.png");
const product17$1 = getPublicUrl("/images/ecommerce-images/product-17.png");
const product18$1 = getPublicUrl("/images/ecommerce-images/product-18.png");
const product19$1 = getPublicUrl("/images/ecommerce-images/product-19.png");
const product2 = getPublicUrl("/images/ecommerce-images/product-2.png");
const product20$1 = getPublicUrl("/images/ecommerce-images/product-20.png");
const product24$1 = getPublicUrl("/images/ecommerce-images/product-24.png");
const product3$1 = getPublicUrl("/images/ecommerce-images/product-3.png");
const product4$1 = getPublicUrl("/images/ecommerce-images/product-4.png");
const product5$1 = getPublicUrl("/images/ecommerce-images/product-5.png");
const product6$1 = getPublicUrl("/images/ecommerce-images/product-6.png");
const product7$1 = getPublicUrl("/images/ecommerce-images/product-7.png");
const product8$1 = getPublicUrl("/images/ecommerce-images/product-8.png");
const product9$1 = getPublicUrl("/images/ecommerce-images/product-9.png");
const db$a = {
  products: [
    {
      id: 1,
      productName: "iPhone 14 Pro",
      category: "Electronics",
      stock: true,
      sku: 19472,
      price: "$999",
      qty: 665,
      status: "Inactive",
      image: product1,
      productBrand: "Super Retina XDR display footnote Pro Motion technology"
    },
    {
      id: 2,
      productName: "Echo Dot (4th Gen)",
      category: "Electronics",
      stock: false,
      sku: 72836,
      price: "$25.50",
      qty: 827,
      status: "Published",
      image: product2,
      productBrand: "Echo Dot Smart speaker with Alexa"
    },
    {
      id: 3,
      productName: "Dohioue Wall Clock",
      category: "Accessories",
      stock: false,
      sku: 29540,
      price: "$16.34",
      qty: 804,
      status: "Published",
      image: product3$1,
      productBrand: "Modern 10 Inch Battery Operated Wall Clocks"
    },
    {
      id: 4,
      productName: "INZCOU Running Shoes",
      category: "Shoes",
      stock: false,
      sku: 49402,
      price: "$36.98",
      qty: 528,
      status: "Scheduled",
      image: product4$1,
      productBrand: "Lightweight Tennis Shoes Non Slip Gym Workout Shoes"
    },
    {
      id: 5,
      productName: "Apple Watch Series 7",
      category: "Office",
      stock: false,
      sku: 46658,
      price: "$799",
      qty: 851,
      status: "Scheduled",
      image: product5$1,
      productBrand: "Starlight Aluminum Case with Starlight Sport Band."
    },
    {
      id: 6,
      productName: "Meta Quest 2",
      category: "Office",
      stock: true,
      sku: 57640,
      price: "$299",
      qty: 962,
      status: "Scheduled",
      image: product6$1,
      productBrand: "Advanced All-In-One Virtual Reality Headset"
    },
    {
      id: 7,
      productName: "MacBook Pro 16",
      category: "Electronics",
      stock: true,
      sku: 92885,
      price: "$2648.95",
      qty: 965,
      status: "Published",
      image: product7$1,
      productBrand: "Laptop M2 Pro chip with 12\u2011core CPU and 19\u2011core GPU"
    },
    {
      id: 8,
      productName: "SAMSUNG Galaxy S22 Ultra",
      category: "Electronics",
      stock: true,
      sku: 75257,
      price: "$899",
      qty: 447,
      status: "Published",
      image: product8$1,
      productBrand: "Android Smartphone, 256GB, 8K Camera"
    },
    {
      id: 9,
      productName: "Air Jordan",
      category: "Shoes",
      stock: false,
      sku: 31063,
      price: "$125",
      qty: 942,
      status: "Inactive",
      image: product9$1,
      productBrand: "Air Jordan is a line of basketball shoes produced by Nike"
    },
    {
      id: 10,
      productName: "VISKABACKA",
      category: "Home Decor",
      stock: false,
      sku: 91848,
      price: "$190.45",
      qty: 133,
      status: "Scheduled",
      image: product10$1,
      productBrand: "Armchair, Skartofta black/light grey"
    },
    {
      id: 11,
      productName: "Nintendo Switch",
      category: "Games",
      stock: true,
      sku: 52575,
      price: "$296.99",
      qty: 870,
      status: "Inactive",
      image: product11$1,
      productBrand: "TV Mode, Tabletop Mode, Handheld Mode"
    },
    {
      id: 12,
      productName: "PlayStation 5",
      category: "Games",
      stock: true,
      sku: 59551,
      price: "$499",
      qty: 145,
      status: "Scheduled",
      image: product12,
      productBrand: "Marvel at incredible graphics and experience"
    },
    {
      id: 13,
      productName: "Amazon Fire TV",
      category: "Electronics",
      stock: false,
      sku: 5829,
      price: "$263.49",
      qty: 587,
      status: "Scheduled",
      image: product13$1,
      productBrand: "4K UHD smart TV, stream live TV without cable"
    },
    {
      id: 14,
      productName: "Smiletag Ceramic Vase",
      category: "Home Decor",
      stock: false,
      sku: 24456,
      price: "$34.99",
      qty: 310,
      status: "Scheduled",
      image: product14$1,
      productBrand: "Modern Farmhouse Decor Vase Set of 3"
    },
    {
      id: 15,
      productName: "Apple iPad",
      category: "Electronics",
      stock: true,
      sku: 35946,
      price: "$248.39",
      qty: 468,
      status: "Published",
      image: product15$1,
      productBrand: "10.2-inch Retina Display, 64GB"
    },
    {
      id: 16,
      productName: "BANGE Anti Theft Backpack",
      category: "Office",
      stock: true,
      sku: 41867,
      price: "$79.99",
      qty: 519,
      status: "Inactive",
      image: product16$1,
      productBrand: "Smart Business Laptop Fits 15.6 Inch Notebook"
    },
    {
      id: 17,
      productName: "Xbox Series X/S",
      category: "Games",
      stock: true,
      sku: 43224,
      price: "$49.99",
      qty: 787,
      status: "Published",
      image: product17$1,
      productBrand: "Dual Controller Charger Station Dock"
    },
    {
      id: 18,
      productName: "Canon EOS Rebel T7",
      category: "Electronics",
      stock: true,
      sku: 63474,
      price: "$399",
      qty: 810,
      status: "Scheduled",
      image: product18$1,
      productBrand: "18-55mm Lens | Built-in Wi-Fi | 24.1 MP CMOS Sensor"
    },
    {
      id: 19,
      productName: "Honiway Wall Mirror",
      category: "Home Decor",
      stock: false,
      sku: 15859,
      price: "$23.99",
      qty: 735,
      status: "Inactive",
      image: product19$1,
      productBrand: "Decorative 12 inch Rustic Wood Mirror Sunburst Boho"
    },
    {
      id: 20,
      productName: "Tommaso Veloce Shoes",
      category: "Shoes",
      stock: false,
      sku: 28844,
      price: "$922.09",
      qty: 294,
      status: "Inactive",
      image: product20$1,
      productBrand: "Peloton Shoes Triathlon Road Bike Indoor Cycling"
    },
    {
      id: 21,
      productName: "Zoolab",
      category: "Accessories",
      stock: true,
      sku: 99009,
      price: "$719.13",
      qty: 927,
      status: "Scheduled",
      image: product1,
      productBrand: "Cruickshank-Jones"
    },
    {
      id: 22,
      productName: "Viva",
      category: "Home Decor",
      stock: false,
      sku: 53795,
      price: "$775.80",
      qty: 442,
      status: "Scheduled",
      image: product2,
      productBrand: "Ferry Group"
    },
    {
      id: 23,
      productName: "Transcof",
      category: "Shoes",
      stock: true,
      sku: 77663,
      price: "$817.60",
      qty: 256,
      status: "Published",
      image: product3$1,
      productBrand: "Bruen-Heathcote"
    },
    {
      id: 24,
      productName: "Uerified",
      category: "Accessories",
      stock: false,
      sku: 45282,
      price: "$167.19",
      qty: 728,
      status: "Published",
      image: product4$1,
      productBrand: "Koch Group"
    },
    {
      id: 25,
      productName: "Y-find",
      category: "Home Decor",
      stock: false,
      sku: 5622,
      price: "$189.77",
      qty: 445,
      status: "Scheduled",
      image: product5$1,
      productBrand: "Emmerich and Sons"
    },
    {
      id: 26,
      productName: "Wigtax",
      category: "Accessories",
      stock: true,
      sku: 38920,
      price: "$411.46",
      qty: 857,
      status: "Scheduled",
      image: product6$1,
      productBrand: "Zulauf-Prohaska"
    },
    {
      id: 27,
      productName: "Tempsoft",
      category: "Accessories",
      stock: true,
      sku: 78211,
      price: "$961.76",
      qty: 975,
      status: "Published",
      image: product7$1,
      productBrand: "VonRueden, Rogahn and Kris"
    },
    {
      id: 28,
      productName: "Rt",
      category: "Accessories",
      stock: true,
      sku: 98552,
      price: "$514.14",
      qty: 39,
      status: "Published",
      image: product8$1,
      productBrand: "Romaguera, O'Connell and Abernathy"
    },
    {
      id: 29,
      productName: "Zontrax",
      category: "Shoes",
      stock: true,
      sku: 7151,
      price: "$591.30",
      qty: 74,
      status: "Published",
      image: product9$1,
      productBrand: "Mills, Hagenes and Bednar"
    },
    {
      id: 30,
      productName: "Keylex",
      category: "Accessories",
      stock: true,
      sku: 79571,
      price: "$928.07",
      qty: 245,
      status: "Inactive",
      image: product10$1,
      productBrand: "Sanford, Harvey and Parisian"
    },
    {
      id: 31,
      productName: "Trippledex",
      category: "Home Decor",
      stock: false,
      sku: 51597,
      price: "$312.03",
      qty: 657,
      status: "Inactive",
      image: product11$1,
      productBrand: "Conroy-Bergstrom"
    },
    {
      id: 32,
      productName: "Opela",
      category: "Accessories",
      stock: true,
      sku: 6506,
      price: "$951.29",
      qty: 770,
      status: "Published",
      image: product12,
      productBrand: "Langosh Inc"
    },
    {
      id: 33,
      productName: "Span",
      category: "Shoes",
      stock: false,
      sku: 33523,
      price: "$600.43",
      qty: 622,
      status: "Inactive",
      image: product13$1,
      productBrand: "Jerde-Walsh"
    },
    {
      id: 34,
      productName: "Rank",
      category: "Accessories",
      stock: false,
      sku: 60307,
      price: "$337.90",
      qty: 896,
      status: "Scheduled",
      image: product14$1,
      productBrand: "Barrows, Quitzon and Roberts"
    },
    {
      id: 35,
      productName: "Tempsoft",
      category: "Accessories",
      stock: true,
      sku: 75059,
      price: "$959.47",
      qty: 239,
      status: "Inactive",
      image: product15$1,
      productBrand: "Russel-Grant"
    },
    {
      id: 36,
      productName: "Ventosanzap",
      category: "Accessories",
      stock: true,
      sku: 69072,
      price: "$756.81",
      qty: 410,
      status: "Scheduled",
      image: product16$1,
      productBrand: "O'Conner-Zboncak"
    },
    {
      id: 37,
      productName: "Mat Lam Tam",
      category: "Accessories",
      stock: false,
      sku: 68290,
      price: "$256.86",
      qty: 630,
      status: "Published",
      image: product17$1,
      productBrand: "Rutherford, Heller and Bashirian"
    },
    {
      id: 38,
      productName: "Zamit",
      category: "Shoes",
      stock: true,
      sku: 89552,
      price: "$378.54",
      qty: 247,
      status: "Inactive",
      image: product18$1,
      productBrand: "Swift-Altenwerth"
    },
    {
      id: 39,
      productName: "Tresom",
      category: "Shoes",
      stock: true,
      sku: 50863,
      price: "$166.17",
      qty: 672,
      status: "Inactive",
      image: product19$1,
      productBrand: "O'Kon, Waelchi and Lesch"
    },
    {
      id: 40,
      productName: "Viva",
      category: "Accessories",
      stock: false,
      sku: 90484,
      price: "$745.76",
      qty: 697,
      status: "Published",
      image: product20$1,
      productBrand: "Johnston, Anderson and Metz"
    },
    {
      id: 41,
      productName: "Matsoft",
      category: "Accessories",
      stock: true,
      sku: 76980,
      price: "$603.16",
      qty: 74,
      status: "Published",
      image: product1,
      productBrand: "O'Conner, Paucek and Braun"
    },
    {
      id: 42,
      productName: "Wiodex",
      category: "Home Decor",
      stock: true,
      sku: 66971,
      price: "$772.51",
      qty: 280,
      status: "Published",
      image: product2,
      productBrand: "Wisoky-Kassulke"
    },
    {
      id: 43,
      productName: "Keylex",
      category: "Shoes",
      stock: false,
      sku: 16589,
      price: "$986.22",
      qty: 758,
      status: "Inactive",
      image: product3$1,
      productBrand: "Haag, Bruen and Reichel"
    },
    {
      id: 44,
      productName: "Konklux",
      category: "Accessories",
      stock: true,
      sku: 73896,
      price: "$988.47",
      qty: 14,
      status: "Inactive",
      image: product4$1,
      productBrand: "Ankunding Inc"
    },
    {
      id: 45,
      productName: "Tresom",
      category: "Accessories",
      stock: false,
      sku: 67489,
      price: "$946.62",
      qty: 35,
      status: "Inactive",
      image: product5$1,
      productBrand: "Deckow and Sons"
    },
    {
      id: 46,
      productName: "Quo Lux",
      category: "Shoes",
      stock: true,
      sku: 48177,
      price: "$224.28",
      qty: 935,
      status: "Scheduled",
      image: product1,
      productBrand: "Kreiger, Reynolds and Sporer"
    },
    {
      id: 47,
      productName: "Roldlamis",
      category: "Home Decor",
      stock: true,
      sku: 225,
      price: "$952.14",
      qty: 361,
      status: "Published",
      image: product6$1,
      productBrand: "Kuphal-Abbott"
    },
    {
      id: 48,
      productName: "Tampflex",
      category: "Accessories",
      stock: false,
      sku: 29438,
      price: "$646.21",
      qty: 908,
      status: "Scheduled",
      image: product7$1,
      productBrand: "Romaguera, Schmeler and Volkman"
    },
    {
      id: 49,
      productName: "Span",
      category: "Home Decor",
      stock: true,
      sku: 55666,
      price: "$583.13",
      qty: 898,
      status: "Scheduled",
      image: product24$1,
      productBrand: "Hane-Romaguera"
    },
    {
      id: 50,
      productName: "Zamit",
      category: "Accessories",
      stock: false,
      sku: 55860,
      price: "$273.67",
      qty: 332,
      status: "Published",
      image: product9$1,
      productBrand: "Hoeger-Powlowski"
    }
  ],
  reviews: [
    {
      id: 1,
      product: "iPhone 14 Pro",
      companyName: "Super Retina XDR display footnote Pro Motion technology",
      productImage: product1,
      reviewer: "Zane Scraggs",
      email: "zscraggs0@flavors.me",
      avatar: avatar1$8,
      date: "5/28/2020",
      status: "Published",
      review: 2,
      head: "lorem ipsum dolor",
      para: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi."
    },
    {
      id: 2,
      product: "Echo Dot (4th Gen)",
      companyName: "Echo Dot Smart speaker with Alexa",
      productImage: product2,
      reviewer: "Stacey Hallgalley",
      email: "shallgalley1@google.nl",
      avatar: avatar2$8,
      date: "3/21/2021",
      status: "Published",
      review: 5,
      head: "libero ut",
      para: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis."
    },
    {
      id: 3,
      product: "Dohioue Wall Clock",
      companyName: "Modern 10 Inch Battery Operated Wall Clocks",
      productImage: product3$1,
      reviewer: "Francyne Coulthurst",
      email: "fcoulthurst2@upenn.edu",
      avatar: avatar3$7,
      date: "8/10/2020",
      status: "Published",
      review: 2,
      head: "neque libero convallis",
      para: "Phasellus in felis. Donec semper sapien a libero. Nam dui."
    },
    {
      id: 4,
      product: "INZCOU Running Shoes",
      companyName: "Lightweight Tennis Shoes Non Slip Gym Workout Shoes",
      productImage: product4$1,
      reviewer: "Nate De Mitris",
      email: "nde3@intel.com",
      avatar: avatar4$6,
      date: "12/18/2021",
      status: "Pending",
      review: 3,
      head: "accumsan tellus nisi eu",
      para: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio."
    },
    {
      id: 5,
      product: "Apple Watch Series 7",
      companyName: "Starlight Aluminum Case with Starlight Sport Band.",
      productImage: product5$1,
      reviewer: "Ethel Zanardii",
      email: "ezanardii4@mapy.cz",
      avatar: avatar5$6,
      date: "6/12/2020",
      status: "Pending",
      review: 1,
      head: "etiam faucibus cursus",
      para: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    },
    {
      id: 6,
      product: "Meta Quest 2",
      companyName: "Advanced All-In-One Virtual Reality Headset",
      productImage: product6$1,
      reviewer: "Fancy Tweedell",
      email: "ftweedell5@telegraph.co.uk",
      avatar: avatar6$6,
      date: "11/23/2020",
      status: "Pending",
      review: 1,
      head: "in faucibus orci luctus et",
      para: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
    },
    {
      id: 7,
      product: "MacBook Pro 16",
      companyName: "Laptop M2 Pro chip with 12\u2011core CPU and 19\u2011core GPU",
      productImage: product7$1,
      reviewer: "Abeu Gregorace",
      email: "agregorace6@godaddy.com",
      avatar: avatar7$5,
      date: "9/8/2020",
      status: "Pending",
      review: 2,
      head: "vel enim",
      para: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
    },
    {
      id: 8,
      product: "SAMSUNG Galaxy S22 Ultra",
      companyName: "Android Smartphone, 256GB, 8K Camera",
      productImage: product8$1,
      reviewer: "Sibylle Goodacre",
      email: "sgoodacre7@washingtonpost.com",
      avatar: avatar8$5,
      date: "6/10/2021",
      status: "Pending",
      review: 1,
      head: "eget semper rutrum",
      para: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
    },
    {
      id: 9,
      product: "Air Jordan",
      companyName: "Air Jordan is a line of basketball shoes produced by Nike",
      productImage: product9$1,
      reviewer: "Gisela Leppard",
      email: "gleppard8@yandex.ru",
      avatar: avatar9,
      date: "4/20/2020",
      status: "Published",
      review: 2,
      head: "ut mauris",
      para: "Fusce consequat. Nulla nisl. Nunc nisl."
    },
    {
      id: 10,
      product: "VISKABACKA",
      companyName: "Armchair, Skartofta black/light grey",
      productImage: product10$1,
      reviewer: "Hilario Wheldon",
      email: "hwheldon9@apple.com",
      avatar: avatar10,
      date: "8/21/2020",
      status: "Pending",
      review: 2,
      head: "amet consectetuer adipiscing elit proin",
      para: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat."
    },
    {
      id: 11,
      product: "Nintendo Switch",
      companyName: "TV Mode, Tabletop Mode, Handheld Mode",
      productImage: product11$1,
      reviewer: "Ivie McGlaughn",
      email: "imcglaughna@mapquest.com",
      avatar: avatar11,
      date: "4/13/2020",
      status: "Pending",
      review: 4,
      head: "eget nunc donec",
      para: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
    },
    {
      id: 12,
      product: "PlayStation 5",
      companyName: "Marvel at incredible graphics and experience",
      productImage: product12,
      reviewer: "Neel Kingscott",
      email: "nkingscottb@soup.io",
      avatar: avatar12,
      date: "12/27/2020",
      status: "Published",
      review: 1,
      head: "lacus at velit",
      para: "Phasellus in felis. Donec semper sapien a libero. Nam dui."
    },
    {
      id: 13,
      product: "Amazon Fire TV",
      companyName: "4K UHD smart TV, stream live TV without cable",
      productImage: product13$1,
      reviewer: "Tracey Ventham",
      email: "tventhamc@thetimes.co.uk",
      avatar: avatar13,
      date: "3/17/2021",
      status: "Published",
      review: 3,
      head: "at nunc commodo placerat praesent",
      para: "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."
    },
    {
      id: 14,
      product: "Smiletag Ceramic Vase",
      companyName: "Modern Farmhouse Decor Vase Set of 3",
      productImage: product14$1,
      reviewer: "Rollo Truckell",
      email: "rtruckelld@gravatar.com",
      avatar: avatar14,
      date: "2/23/2020",
      status: "Published",
      review: 5,
      head: "in hac",
      para: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
    },
    {
      id: 15,
      product: "Apple iPad",
      companyName: "10.2-inch Retina Display, 64GB",
      productImage: product15$1,
      reviewer: "Jabez Heggs",
      email: "jheggse@nba.com",
      avatar: avatar15,
      date: "4/21/2020",
      status: "Published",
      review: 1,
      head: "ac consequat",
      para: "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."
    },
    {
      id: 16,
      product: "BANGE Anti Theft Backpack",
      companyName: "Smart Business Laptop Fits 15.6 Inch Notebook",
      productImage: product16$1,
      reviewer: "Micaela Rowesby",
      email: "mrowesbyf@surveymonkey.com",
      avatar: avatar1$8,
      date: "12/11/2021",
      status: "Published",
      review: 1,
      head: "mattis egestas metus",
      para: "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."
    },
    {
      id: 17,
      product: "Xbox Series X/S",
      companyName: "Dual Controller Charger Station Dock",
      productImage: product17$1,
      reviewer: "Blakelee Benza",
      email: "bbenzag@utexas.edu",
      avatar: avatar2$8,
      date: "4/26/2021",
      status: "Published",
      review: 1,
      head: "sapien placerat",
      para: "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem."
    },
    {
      id: 18,
      product: "Canon EOS Rebel T7",
      companyName: "18-55mm Lens | Built-in Wi-Fi | 24.1 MP CMOS Sensor",
      productImage: product18$1,
      reviewer: "Emery Breitling",
      email: "ebreitlingh@friendfeed.com",
      avatar: avatar1$8,
      date: "12/1/2020",
      status: "Pending",
      review: 5,
      head: "nec nisi vulputate",
      para: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."
    },
    {
      id: 19,
      product: "Honiway Wall Mirror",
      companyName: "Decorative 12 inch Rustic Wood Mirror Sunburst Boho",
      productImage: product19$1,
      reviewer: "Wilona Fields",
      email: "wfieldsi@columbia.edu",
      avatar: avatar1$8,
      date: "3/30/2020",
      status: "Published",
      review: 1,
      head: "parturient montes nascetur ridiculus",
      para: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus."
    },
    {
      id: 20,
      product: "Tommaso Veloce Shoes",
      companyName: "Peloton Shoes Triathlon Road Bike Indoor Cycling",
      productImage: product20$1,
      reviewer: "Janey Lamprecht",
      email: "jlamprechtj@tuttocitta.it",
      avatar: avatar1$8,
      date: "9/16/2020",
      status: "Pending",
      review: 1,
      head: "maecenas ut massa quis augue",
      para: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."
    },
    {
      id: 21,
      product: "Zoolab",
      companyName: "Cruickshank-Jones",
      productImage: product1,
      reviewer: "Rosene Walsh",
      email: "rwalshk@latimes.com",
      avatar: avatar1$8,
      date: "7/17/2021",
      status: "Published",
      review: 1,
      head: "convallis nulla",
      para: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus."
    },
    {
      id: 22,
      product: "Viva",
      companyName: "Ferry Group",
      productImage: product2,
      reviewer: "Buffy Sellen",
      email: "bsellenl@qq.com",
      avatar: avatar1$8,
      date: "1/9/2021",
      status: "Pending",
      review: 3,
      head: "nunc viverra dapibus",
      para: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus."
    },
    {
      id: 23,
      product: "Transcof",
      companyName: "Bruen-Heathcote",
      productImage: product3$1,
      reviewer: "Alvis Szymanzyk",
      email: "aszymanzykm@google.cn",
      avatar: avatar1$8,
      date: "6/11/2020",
      status: "Pending",
      review: 1,
      head: "nullam porttitor",
      para: "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis."
    },
    {
      id: 24,
      product: "Uerified",
      companyName: "Koch Group",
      productImage: product4$1,
      reviewer: "Hatty Morsley",
      email: "hmorsleyn@gov.uk",
      avatar: avatar1$8,
      date: "2/12/2021",
      status: "Published",
      review: 2,
      head: "metus sapien ut",
      para: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
    },
    {
      id: 25,
      product: "Y-find",
      companyName: "Emmerich and Sons",
      productImage: product5$1,
      reviewer: "Jabez Pudner",
      email: "jpudnero@cpanel.net",
      avatar: avatar1$8,
      date: "10/14/2021",
      status: "Pending",
      review: 4,
      head: "orci luctus et",
      para: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi."
    },
    {
      id: 26,
      product: "Wigtax",
      companyName: "Zulauf-Prohaska",
      productImage: product6$1,
      reviewer: "Ida Ovill",
      email: "iovillp@newsvine.com",
      avatar: avatar1$8,
      date: "11/18/2020",
      status: "Published",
      review: 2,
      head: "vestibulum ante ipsum",
      para: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus."
    },
    {
      id: 27,
      product: "Tempsoft",
      companyName: "VonRueden, Rogahn and Kris",
      productImage: product7$1,
      reviewer: "Suzanne Breckin",
      email: "sbreckinq@jimdo.com",
      avatar: avatar1$8,
      date: "7/26/2020",
      status: "Published",
      review: 2,
      head: "vel enim",
      para: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo."
    },
    {
      id: 28,
      product: "Rt",
      companyName: "Romaguera, O'Connell and Abernathy",
      productImage: product8$1,
      reviewer: "Morgana Coote",
      email: "mcooter@tinypic.com",
      avatar: avatar1$8,
      date: "8/29/2021",
      status: "Pending",
      review: 5,
      head: "cubilia curae mauris",
      para: "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris."
    },
    {
      id: 29,
      product: "Zontrax",
      companyName: "Mills, Hagenes and Bednar",
      productImage: product9$1,
      reviewer: "Wesley Murra",
      email: "wmurras@tumblr.com",
      avatar: avatar1$8,
      date: "3/20/2021",
      status: "Pending",
      review: 4,
      head: "gravida nisi at",
      para: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat."
    },
    {
      id: 30,
      product: "Keylex",
      companyName: "Sanford, Harvey and Parisian",
      productImage: product10$1,
      reviewer: "Jobye Varnam",
      email: "jvarnamt@webs.com",
      avatar: avatar1$8,
      date: "11/24/2020",
      status: "Pending",
      review: 2,
      head: "nec sem",
      para: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus."
    },
    {
      id: 31,
      product: "Trippledex",
      companyName: "Conroy-Bergstrom",
      productImage: product11$1,
      reviewer: "Bibbye O'Dowd",
      email: "bodowdu@infoseek.co.jp",
      avatar: avatar1$8,
      date: "7/7/2020",
      status: "Published",
      review: 5,
      head: "odio elementum eu",
      para: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
    },
    {
      id: 32,
      product: "Opela",
      companyName: "Langosh Inc",
      productImage: product12,
      reviewer: "Baldwin Bodimeade",
      email: "bbodimeadev@gnu.org",
      avatar: avatar1$8,
      date: "3/21/2020",
      status: "Published",
      review: 2,
      head: "in imperdiet et commodo",
      para: "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."
    },
    {
      id: 33,
      product: "Span",
      companyName: "Jerde-Walsh",
      productImage: product13$1,
      reviewer: "Rozalin Allan",
      email: "rallanw@ucsd.edu",
      avatar: avatar1$8,
      date: "1/23/2020",
      status: "Published",
      review: 4,
      head: "pellentesque at",
      para: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    },
    {
      id: 34,
      product: "Rank",
      companyName: "Barrows, Quitzon and Roberts",
      productImage: product14$1,
      reviewer: "Patsy Bowlas",
      email: "pbowlasx@yandex.ru",
      avatar: avatar1$8,
      date: "10/7/2020",
      status: "Pending",
      review: 5,
      head: "congue etiam",
      para: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    },
    {
      id: 35,
      product: "Tempsoft",
      companyName: "Russel-Grant",
      productImage: product15$1,
      reviewer: "Zsazsa Jansens",
      email: "zjansensy@wikipedia.org",
      avatar: avatar1$8,
      date: "8/7/2021",
      status: "Pending",
      review: 1,
      head: "eget eros",
      para: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus."
    },
    {
      id: 36,
      product: "Ventosanzap",
      companyName: "O'Conner-Zboncak",
      productImage: product16$1,
      reviewer: "Denny MacGettigen",
      email: "dmacgettigenz@ca.gov",
      avatar: avatar1$8,
      date: "2/17/2020",
      status: "Published",
      review: 1,
      head: "vel dapibus",
      para: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."
    },
    {
      id: 37,
      product: "Mat Lam Tam",
      companyName: "Rutherford, Heller and Bashirian",
      productImage: product17$1,
      reviewer: "Leia Braunroth",
      email: "lbraunroth10@nytimes.com",
      avatar: avatar1$8,
      date: "1/28/2021",
      status: "Published",
      review: 4,
      head: "sit amet consectetuer",
      para: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."
    },
    {
      id: 38,
      product: "Zamit",
      companyName: "Swift-Altenwerth",
      productImage: product18$1,
      reviewer: "Nil Vasilic",
      email: "nvasilic11@ft.com",
      avatar: avatar1$8,
      date: "1/2/2020",
      status: "Published",
      review: 1,
      head: "blandit non",
      para: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat."
    },
    {
      id: 39,
      product: "Tresom",
      companyName: "O'Kon, Waelchi and Lesch",
      productImage: product19$1,
      reviewer: "Mandie Forseith",
      email: "mforseith12@phpbb.com",
      avatar: avatar1$8,
      date: "7/2/2020",
      status: "Published",
      review: 1,
      head: "in ante vestibulum ante",
      para: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum."
    },
    {
      id: 40,
      product: "Viva",
      companyName: "Johnston, Anderson and Metz",
      productImage: product20$1,
      reviewer: "Audra Pinks",
      email: "apinks13@pinterest.com",
      avatar: avatar1$8,
      date: "1/6/2020",
      status: "Pending",
      review: 2,
      head: "ante ipsum primis in",
      para: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."
    },
    {
      id: 41,
      product: "Matsoft",
      companyName: "O'Conner, Paucek and Braun",
      productImage: product1,
      reviewer: "Damita Jarad",
      email: "djarad14@un.org",
      avatar: avatar1$8,
      date: "10/30/2021",
      status: "Pending",
      review: 4,
      head: "mus etiam vel augue",
      para: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat."
    },
    {
      id: 42,
      product: "Wiodex",
      companyName: "Wisoky-Kassulke",
      productImage: product2,
      reviewer: "Fowler Drury",
      email: "fdrury15@chicagotribune.com",
      avatar: avatar1$8,
      date: "2/11/2020",
      status: "Published",
      review: 3,
      head: "dictumst aliquam augue quam",
      para: "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."
    },
    {
      id: 43,
      product: "Keylex",
      companyName: "Haag, Bruen and Reichel",
      productImage: product3$1,
      reviewer: "Anette Jouen",
      email: "ajouen16@admin.ch",
      avatar: avatar1$8,
      date: "12/11/2020",
      status: "Published",
      review: 3,
      head: "mauris non ligula pellentesque ultrices",
      para: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    },
    {
      id: 44,
      product: "Konklux",
      companyName: "Ankunding Inc",
      productImage: product4$1,
      reviewer: "Candace Fossey",
      email: "cfossey17@live.com",
      avatar: avatar1$8,
      date: "2/10/2021",
      status: "Pending",
      review: 1,
      head: "vel augue vestibulum ante",
      para: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    },
    {
      id: 45,
      product: "Tresom",
      companyName: "Deckow and Sons",
      productImage: product5$1,
      reviewer: "Persis Loades",
      email: "ploades18@g.co",
      avatar: avatar1$8,
      date: "9/11/2020",
      status: "Pending",
      review: 5,
      head: "convallis nulla neque",
      para: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    },
    {
      id: 46,
      product: "Quo Lux",
      companyName: "Kreiger, Reynolds and Sporer",
      productImage: product1,
      reviewer: "Kim Carrel",
      email: "kcarrel19@webnode.com",
      avatar: avatar1$8,
      date: "5/26/2020",
      status: "Pending",
      review: 3,
      head: "quam turpis adipiscing lorem",
      para: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo."
    },
    {
      id: 47,
      product: "Roldlamis",
      companyName: "Kuphal-Abbott",
      productImage: product6$1,
      reviewer: "Rodger Broz",
      email: "rbroz1a@omniture.com",
      avatar: avatar1$8,
      date: "10/5/2020",
      status: "Pending",
      review: 1,
      head: "morbi non",
      para: "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris."
    },
    {
      id: 48,
      product: "Tampflex",
      companyName: "Romaguera, Schmeler and Volkman",
      productImage: product7$1,
      reviewer: "Lauri Shearsby",
      email: "lshearsby1b@goo.ne.jp",
      avatar: avatar1$8,
      date: "10/18/2020",
      status: "Pending",
      review: 5,
      head: "vel dapibus at diam",
      para: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },
    {
      id: 49,
      product: "Span",
      companyName: "Hane-Romaguera",
      productImage: product8$1,
      reviewer: "Hannah Drohun",
      email: "hdrohun1c@marketwatch.com",
      avatar: avatar1$8,
      date: "9/14/2020",
      status: "Pending",
      review: 4,
      head: "morbi porttitor lorem",
      para: "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi."
    },
    {
      id: 50,
      product: "Zamit",
      companyName: "Hoeger-Powlowski",
      productImage: product9$1,
      reviewer: "Celesta Hadden",
      email: "chadden1d@hao123.com",
      avatar: avatar1$8,
      date: "4/15/2020",
      status: "Published",
      review: 5,
      head: "non sodales",
      para: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
    },
    {
      id: 51,
      product: "Witchip",
      companyName: "Heidenreich, Keeling and Kuhn",
      productImage: product10$1,
      reviewer: "Sollie Dowling",
      email: "sdowling1e@businessweek.com",
      avatar: avatar1$8,
      date: "9/7/2020",
      status: "Pending",
      review: 1,
      head: "nam congue risus semper porta",
      para: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus."
    },
    {
      id: 52,
      product: "Ratity",
      companyName: "Beier and Sons",
      productImage: product11$1,
      reviewer: "Esma Tamsett",
      email: "etamsett1f@arstechnica.com",
      avatar: avatar1$8,
      date: "12/21/2020",
      status: "Pending",
      review: 2,
      head: "rutrum rutrum neque aenean auctor",
      para: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."
    },
    {
      id: 53,
      product: "Voltsillam",
      companyName: "Jones and Sons",
      productImage: product12,
      reviewer: "Fee Pieche",
      email: "fpieche1g@usa.gov",
      avatar: avatar1$8,
      date: "4/28/2020",
      status: "Pending",
      review: 5,
      head: "non mi",
      para: "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus."
    },
    {
      id: 54,
      product: "Voltsillam",
      companyName: "Mohr and Sons",
      productImage: product13$1,
      reviewer: "Frankie Davis",
      email: "fdavis1h@guardian.co.uk",
      avatar: avatar1$8,
      date: "3/16/2021",
      status: "Published",
      review: 5,
      head: "maecenas pulvinar lobortis est phasellus",
      para: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus."
    },
    {
      id: 55,
      product: "Matsoft",
      companyName: "Kling-Hayes",
      productImage: product1,
      reviewer: "Byram Wimlet",
      email: "bwimlet1i@craigslist.org",
      avatar: avatar1$8,
      date: "7/13/2021",
      status: "Pending",
      review: 2,
      head: "tortor sollicitudin",
      para: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus."
    },
    {
      id: 56,
      product: "Rt",
      companyName: "Brekke-Lubowitz",
      productImage: product14$1,
      reviewer: "Maurita Hutchin",
      email: "mhutchin1j@ibm.com",
      avatar: avatar1$8,
      date: "11/11/2020",
      status: "Pending",
      review: 1,
      head: "odio cras mi pede malesuada",
      para: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat."
    },
    {
      id: 57,
      product: "Konklab",
      companyName: "Kiehn LLC",
      productImage: product15$1,
      reviewer: "Gorden Leftley",
      email: "gleftley1k@disqus.com",
      avatar: avatar1$8,
      date: "9/19/2021",
      status: "Published",
      review: 3,
      head: "sed nisl nunc rhoncus",
      para: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum."
    },
    {
      id: 58,
      product: "Lotstring",
      companyName: "Windler-Corwin",
      productImage: product16$1,
      reviewer: "Raviv Critcher",
      email: "rcritcher1l@icq.com",
      avatar: avatar1$8,
      date: "4/20/2020",
      status: "Published",
      review: 5,
      head: "bibendum imperdiet nullam orci",
      para: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."
    },
    {
      id: 59,
      product: "Keylex",
      companyName: "Reynolds, Buckridge and Schmeler",
      productImage: product17$1,
      reviewer: "Cinda Tersay",
      email: "ctersay1m@berkeley.edu",
      avatar: avatar1$8,
      date: "3/31/2021",
      status: "Published",
      review: 4,
      head: "curabitur at",
      para: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."
    },
    {
      id: 60,
      product: "Transcof",
      companyName: "Jacobs-Farrell",
      productImage: product18$1,
      reviewer: "Raynell Rosenauer",
      email: "rrosenauer1n@360.cn",
      avatar: avatar1$8,
      date: "6/3/2020",
      status: "Published",
      review: 2,
      head: "massa donec dapibus duis at",
      para: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum."
    },
    {
      id: 61,
      product: "Opela",
      companyName: "Beier-Bergstrom",
      productImage: product19$1,
      reviewer: "Aurelia Cooley",
      email: "acooley1o@prnewswire.com",
      avatar: avatar1$8,
      date: "7/27/2020",
      status: "Pending",
      review: 1,
      head: "dictumst maecenas",
      para: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio."
    },
    {
      id: 62,
      product: "Rlowdesk",
      companyName: "Roob and Sons",
      productImage: product20$1,
      reviewer: "Silvester Vittel",
      email: "svittel1p@eepurl.com",
      avatar: avatar1$8,
      date: "3/2/2021",
      status: "Pending",
      review: 5,
      head: "elit ac nulla",
      para: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst."
    },
    {
      id: 63,
      product: "Kanlam",
      companyName: "Hauck Group",
      productImage: product2,
      reviewer: "Nester Oliffe",
      email: "noliffe1q@tinypic.com",
      avatar: avatar1$8,
      date: "3/31/2021",
      status: "Published",
      review: 4,
      head: "sagittis nam congue",
      para: "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus."
    },
    {
      id: 64,
      product: "Rembucket",
      companyName: "Reynolds-Lindgren",
      productImage: product2,
      reviewer: "Cheryl Growcott",
      email: "cgrowcott1r@nifty.com",
      avatar: avatar1$8,
      date: "10/29/2021",
      status: "Pending",
      review: 4,
      head: "amet diam in magna bibendum",
      para: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius."
    },
    {
      id: 65,
      product: "Tin",
      companyName: "Stroman and Sons",
      productImage: product2,
      reviewer: "Calhoun Perot",
      email: "cperot1s@goodreads.com",
      avatar: avatar1$8,
      date: "10/15/2020",
      status: "Published",
      review: 4,
      head: "enim blandit mi",
      para: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus."
    },
    {
      id: 66,
      product: "Trippledex",
      companyName: "Kihn-Wisoky",
      productImage: product2,
      reviewer: "Winnah Tivenan",
      email: "wtivenan1t@example.com",
      avatar: avatar1$8,
      date: "5/27/2021",
      status: "Published",
      review: 3,
      head: "pede ullamcorper augue a suscipit",
      para: "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."
    },
    {
      id: 67,
      product: "Redhold",
      companyName: "Konopelski-Hauck",
      productImage: product2,
      reviewer: "Faydra Perceval",
      email: "fperceval1u@psu.edu",
      avatar: avatar1$8,
      date: "10/2/2020",
      status: "Published",
      review: 2,
      head: "porta volutpat",
      para: "In congue. Etiam justo. Etiam pretium iaculis justo."
    },
    {
      id: 68,
      product: "Pannier",
      companyName: "Rau Inc",
      productImage: product3$1,
      reviewer: "Shauna Runge",
      email: "srunge1v@theatlantic.com",
      avatar: avatar1$8,
      date: "12/17/2021",
      status: "Published",
      review: 3,
      head: "aliquam lacus morbi quis tortor",
      para: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
    },
    {
      id: 69,
      product: "Rlexidy",
      companyName: "Torp-Lebsack",
      productImage: product3$1,
      reviewer: "Udell Laurand",
      email: "ulaurand1w@prnewswire.com",
      avatar: avatar1$8,
      date: "3/14/2021",
      status: "Pending",
      review: 5,
      head: "vestibulum velit id pretium",
      para: "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris."
    },
    {
      id: 70,
      product: "Keylex",
      companyName: "Hane-Bednar",
      productImage: product3$1,
      reviewer: "Charyl Mordaunt",
      email: "cmordaunt1x@bizjournals.com",
      avatar: avatar1$8,
      date: "4/11/2021",
      status: "Pending",
      review: 1,
      head: "amet eros suspendisse accumsan tortor",
      para: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
    },
    {
      id: 71,
      product: "Kuobam",
      companyName: "Rice Group",
      productImage: product3$1,
      reviewer: "Becki Petit",
      email: "bpetit1y@addtoany.com",
      avatar: avatar1$8,
      date: "8/9/2021",
      status: "Published",
      review: 5,
      head: "blandit lacinia erat vestibulum sed",
      para: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
    },
    {
      id: 72,
      product: "Ulphazap",
      companyName: "West, White and Rau",
      productImage: product3$1,
      reviewer: "Gallagher Goldes",
      email: "ggoldes1z@microsoft.com",
      avatar: avatar1$8,
      date: "10/21/2020",
      status: "Pending",
      review: 4,
      head: "vitae ipsum aliquam",
      para: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."
    },
    {
      id: 73,
      product: "Wiodex",
      companyName: "Keeling-Dicki",
      productImage: product4$1,
      reviewer: "Gunilla Painter",
      email: "gpainter20@drupal.org",
      avatar: avatar1$8,
      date: "12/11/2021",
      status: "Published",
      review: 4,
      head: "tortor duis mattis egestas",
      para: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
    },
    {
      id: 74,
      product: "Veribet",
      companyName: "Gerlach, Bernier and Jenkins",
      productImage: product4$1,
      reviewer: "Greggory Illingworth",
      email: "gillingworth21@lis",
      avatar: avatar1$8,
      date: "8/8/2020",
      status: "Pending",
      review: 4,
      head: "pede justo lacinia eget tincidunt",
      para: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus."
    },
    {
      id: 75,
      product: "Rix San",
      companyName: "Kessler and Sons",
      productImage: product4$1,
      reviewer: "Amabel Reah",
      email: "areah22@indiegogo.com",
      avatar: avatar1$8,
      date: "11/22/2021",
      status: "Published",
      review: 3,
      head: "sit amet lobortis sapien",
      para: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo."
    },
    {
      id: 76,
      product: "Zoolab",
      companyName: "Goldner, Lind and Hansen",
      productImage: product4$1,
      reviewer: "Eziechiele Littlejohns",
      email: "elittlejohns23@blogger.com",
      avatar: avatar1$8,
      date: "8/17/2020",
      status: "Pending",
      review: 4,
      head: "cras non velit",
      para: "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris."
    },
    {
      id: 77,
      product: "Rob",
      companyName: "Trantow Group",
      productImage: product4$1,
      reviewer: "Faythe Hance",
      email: "fhance24@odnoklassniki.ru",
      avatar: avatar1$8,
      date: "7/1/2021",
      status: "Published",
      review: 5,
      head: "luctus tincidunt nulla mollis molestie",
      para: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."
    },
    {
      id: 78,
      product: "Zamit",
      companyName: "Reichel, Hagenes and Nader",
      productImage: product5$1,
      reviewer: "Marie Hazelton",
      email: "mhazelton25@miitbeian.gov.cn",
      avatar: avatar1$8,
      date: "5/31/2021",
      status: "Published",
      review: 1,
      head: "ut odio cras",
      para: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis."
    },
    {
      id: 79,
      product: "Zoolab",
      companyName: "Baumbach-Renner",
      productImage: product5$1,
      reviewer: "Vincenz Izsak",
      email: "vizsak26@diigo.com",
      avatar: avatar1$8,
      date: "3/15/2021",
      status: "Pending",
      review: 2,
      head: "gravida sem",
      para: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."
    },
    {
      id: 80,
      product: "Stronghold",
      companyName: "Ullrich, Jacobson and Tillman",
      productImage: product5$1,
      reviewer: "Roch Dehmel",
      email: "rdehmel27@tiny.cc",
      avatar: avatar1$8,
      date: "4/21/2020",
      status: "Pending",
      review: 3,
      head: "ligula pellentesque ultrices phasellus",
      para: "Sed ante. Vivamus tortor. Duis mattis egestas metus."
    },
    {
      id: 81,
      product: "Rintone",
      companyName: "VonRueden, Kuphal and Lindgren",
      productImage: product5$1,
      reviewer: "Marylin Thewlis",
      email: "mthewlis28@tmall.com",
      avatar: avatar1$8,
      date: "5/26/2021",
      status: "Pending",
      review: 1,
      head: "elementum nullam varius nulla",
      para: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus."
    },
    {
      id: 82,
      product: "Temp",
      companyName: "Wintheiser, Bergstrom and Schimmel",
      productImage: product5$1,
      reviewer: "Annissa Mapham",
      email: "amapham29@cbslocal.com",
      avatar: avatar1$8,
      date: "6/10/2021",
      status: "Published",
      review: 4,
      head: "odio porttitor",
      para: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
    },
    {
      id: 83,
      product: "Rlexidy",
      companyName: "Kuhn and Sons",
      productImage: product6$1,
      reviewer: "Lori Prosek",
      email: "lprosek2a@webs.com",
      avatar: avatar1$8,
      date: "7/16/2021",
      status: "Published",
      review: 1,
      head: "lacinia sapien quis",
      para: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst."
    },
    {
      id: 84,
      product: "Ronstring",
      companyName: "Goldner, Nitzsche and Rau",
      productImage: product6$1,
      reviewer: "Zelma Jado",
      email: "zjado2b@salon.com",
      avatar: avatar1$8,
      date: "7/13/2021",
      status: "Pending",
      review: 4,
      head: "mauris sit amet eros suspendisse",
      para: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus."
    },
    {
      id: 85,
      product: "Rixflex",
      companyName: "Bayer-Beer",
      productImage: product6$1,
      reviewer: "Alfreda Tuffley",
      email: "atuffley2c@drupal.org",
      avatar: avatar1$8,
      date: "3/25/2020",
      status: "Pending",
      review: 2,
      head: "molestie hendrerit at vulputate vitae",
      para: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis."
    },
    {
      id: 86,
      product: "Uerified",
      companyName: "Rolfson-Witting",
      productImage: product6$1,
      reviewer: "Arnold Rate",
      email: "arate2d@mit.edu",
      avatar: avatar1$8,
      date: "7/22/2021",
      status: "Pending",
      review: 1,
      head: "nisi venenatis tristique fusce",
      para: "Phasellus in felis. Donec semper sapien a libero. Nam dui."
    },
    {
      id: 87,
      product: "Stringtough",
      companyName: "Kunde-Gibson",
      productImage: product7$1,
      reviewer: "Felizio Macieiczyk",
      email: "fmacieiczyk2e@sciencedaily.com",
      avatar: avatar1$8,
      date: "8/27/2020",
      status: "Published",
      review: 4,
      head: "augue quam sollicitudin",
      para: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus."
    },
    {
      id: 88,
      product: "Qookley",
      companyName: "Kshlerin-Klocko",
      productImage: product7$1,
      reviewer: "Evanne Chamley",
      email: "echamley2f@gmpg.org",
      avatar: avatar1$8,
      date: "2/1/2021",
      status: "Pending",
      review: 4,
      head: "eget tincidunt",
      para: "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."
    },
    {
      id: 89,
      product: "Zamit",
      companyName: "Reilly, Marvin and Ondricka",
      productImage: product7$1,
      reviewer: "Dacy Goodlatt",
      email: "dgoodlatt2g@squarespace.com",
      avatar: avatar1$8,
      date: "4/15/2021",
      status: "Pending",
      review: 4,
      head: "eu interdum eu",
      para: "In congue. Etiam justo. Etiam pretium iaculis justo."
    },
    {
      id: 90,
      product: "Mat Lam Tam",
      companyName: "Ratke-Bauch",
      productImage: product7$1,
      reviewer: "Samantha Vickerman",
      email: "svickerman2h@earthlink.net",
      avatar: avatar1$8,
      date: "6/30/2021",
      status: "Pending",
      review: 3,
      head: "leo rhoncus sed vestibulum",
      para: "Sed ante. Vivamus tortor. Duis mattis egestas metus."
    },
    {
      id: 91,
      product: "Rt",
      companyName: "Kautzer-Hayes",
      productImage: product8$1,
      reviewer: "Maura Robichon",
      email: "mrobichon2i@accuweather.com",
      avatar: avatar1$8,
      date: "4/12/2020",
      status: "Published",
      review: 3,
      head: "dui maecenas",
      para: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
    },
    {
      id: 92,
      product: "Stim",
      companyName: "Bernhard and Sons",
      productImage: product8$1,
      reviewer: "Shelton Bonde",
      email: "sbonde2j@economist.com",
      avatar: avatar1$8,
      date: "6/1/2021",
      status: "Pending",
      review: 1,
      head: "odio elementum",
      para: "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."
    },
    {
      id: 93,
      product: "Rix San",
      companyName: "Waters, Harvey and Stiedemann",
      productImage: product8$1,
      reviewer: "Hallsy Flannigan",
      email: "hflannigan2k@printfriendly.com",
      avatar: avatar1$8,
      date: "6/3/2020",
      status: "Published",
      review: 5,
      head: "ultrices phasellus id",
      para: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
    },
    {
      id: 94,
      product: "Vagram",
      companyName: "Ondricka, Thompson and Kuhn",
      productImage: product8$1,
      reviewer: "Rheta Chazelas",
      email: "rchazelas2l@forbes.com",
      avatar: avatar1$8,
      date: "2/21/2021",
      status: "Pending",
      review: 1,
      head: "eleifend quam",
      para: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
    },
    {
      id: 95,
      product: "Otcom",
      companyName: "Volkman Group",
      productImage: product9$1,
      reviewer: "Arabelle Uc",
      email: "auc2m@archive.org",
      avatar: avatar1$8,
      date: "1/27/2021",
      status: "Published",
      review: 4,
      head: "fermentum justo",
      para: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus."
    },
    {
      id: 96,
      product: "Rixflex",
      companyName: "Dickinson, Spencer and Hyatt",
      productImage: product9$1,
      reviewer: "Pauly Goulden",
      email: "pgoulden2n@ed.gov",
      avatar: avatar1$8,
      date: "10/2/2020",
      status: "Pending",
      review: 2,
      head: "morbi ut",
      para: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus."
    },
    {
      id: 97,
      product: "Lotstring",
      companyName: "Marvin Inc",
      productImage: product9$1,
      reviewer: "Wilhelmina Benezet",
      email: "wbenezet2o@themeforest.net",
      avatar: avatar1$8,
      date: "8/12/2021",
      status: "Pending",
      review: 4,
      head: "sapien cursus vestibulum proin",
      para: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum."
    },
    {
      id: 98,
      product: "Wiodex",
      companyName: "Hayes-Greenholt",
      productImage: product9$1,
      reviewer: "Wallie Paolone",
      email: "wpaolone2p@paginegialle.it",
      avatar: avatar1$8,
      date: "7/15/2021",
      status: "Published",
      review: 2,
      head: "tincidunt in leo maecenas",
      para: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    },
    {
      id: 99,
      product: "Komainer",
      companyName: "Gislason, Greenfelder and Wisozk",
      productImage: product10$1,
      reviewer: "Ezmeralda Normavill",
      email: "enormavill2q@infoseek.co.jp",
      avatar: avatar1$8,
      date: "8/4/2021",
      status: "Pending",
      review: 3,
      head: "pharetra magna ac",
      para: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."
    },
    {
      id: 100,
      product: "Ulpha",
      companyName: "Kunde Group",
      productImage: product10$1,
      reviewer: "Lew Dudman",
      email: "ldudman2r@nationalgeographic.com",
      avatar: avatar1$8,
      date: "11/12/2020",
      status: "Published",
      review: 3,
      head: "suscipit ligula in lacus",
      para: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."
    }
  ],
  referrals: [
    {
      id: 1,
      user: "Koressa Leyfield",
      email: "kleyfield0@columbia.edu",
      avatar: avatar1$8,
      referredId: 3398,
      status: "Unpaid",
      value: "$6655.92",
      earning: "$380.17"
    },
    {
      id: 2,
      user: "Tania Brotherhood",
      email: "tbrotherhood1@bing.com",
      avatar: avatar13,
      referredId: 6740,
      status: "Unpaid",
      value: "$2113.04",
      earning: "$716.72"
    },
    {
      id: 3,
      user: "Clemmie Montgomery",
      email: "cmontgomery2@fema.gov",
      avatar: avatar1$8,
      referredId: 2749,
      status: "Unpaid",
      value: "$6717.09",
      earning: "$699.02"
    },
    {
      id: 4,
      user: "Job Jope",
      email: "jjope3@istockphoto.com",
      avatar: avatar15,
      referredId: 1413,
      status: "Paid",
      value: "$9465.13",
      earning: "$98.23"
    },
    {
      id: 5,
      user: "Christoffer Derell",
      email: "cderell4@apple.com",
      avatar: avatar1$8,
      referredId: 9176,
      status: "Paid",
      value: "$6202.81",
      earning: "$882.51"
    },
    {
      id: 6,
      user: "Herminia Eyree",
      email: "heyree5@gizmodo.com",
      avatar: avatar8$5,
      referredId: 6975,
      status: "Unpaid",
      value: "$9802.40",
      earning: "$219.52"
    },
    {
      id: 7,
      user: "Dela Lathwell",
      email: "dlathwell6@webmd.com",
      avatar: avatar9,
      referredId: 4552,
      status: "Paid",
      value: "$6470.46",
      earning: "$831.45"
    },
    {
      id: 8,
      user: "Kirbie Greenhow",
      email: "kgreenhow7@sina.com.cn",
      avatar: avatar1$8,
      referredId: 4131,
      status: "Unpaid",
      value: "$6199.28",
      earning: "$856.00"
    },
    {
      id: 9,
      user: "Adrienne Tourne",
      email: "atourne8@fotki.com",
      avatar: avatar1$8,
      referredId: 4072,
      status: "Unpaid",
      value: "$6774.33",
      earning: "$821.78"
    },
    {
      id: 10,
      user: "Vanya Hearons",
      email: "vhearons9@blogspot.com",
      avatar: avatar9,
      referredId: 3070,
      status: "Unpaid",
      value: "$1067.14",
      earning: "$804.91"
    },
    {
      id: 11,
      user: "Garnette Abramcik",
      email: "gabramcika@google.com",
      avatar: avatar11,
      referredId: 7828,
      status: "Unpaid",
      value: "$5375.10",
      earning: "$447.01"
    },
    {
      id: 12,
      user: "Akim Korba",
      email: "akorbab@flickr.com",
      avatar: avatar11,
      referredId: 8561,
      status: "Unpaid",
      value: "$3104.91",
      earning: "$552.75"
    },
    {
      id: 13,
      user: "Cull Scipsey",
      email: "cscipseyc@adobe.com",
      avatar: avatar2$8,
      referredId: 9287,
      status: "Paid",
      value: "$9375.13",
      earning: "$690.75"
    },
    {
      id: 14,
      user: "Anabal Hakking",
      email: "ahakkingd@paginegialle.it",
      avatar: avatar7$5,
      referredId: 4892,
      status: "Paid",
      value: "$8797.12",
      earning: "$679.71"
    },
    {
      id: 15,
      user: "Linzy Swiers",
      email: "lswierse@flickr.com",
      avatar: avatar5$6,
      referredId: 9180,
      status: "Unpaid",
      value: "$2996.63",
      earning: "$610.27"
    },
    {
      id: 16,
      user: "Willy Espinet",
      email: "wespinetf@addtoany.com",
      avatar: avatar1$8,
      referredId: 9102,
      status: "Paid",
      value: "$7048.18",
      earning: "$369.06"
    },
    {
      id: 17,
      user: "Carter Gommowe",
      email: "cgommoweg@purevolume.com",
      avatar: avatar9,
      referredId: 7049,
      status: "Unpaid",
      value: "$6049.95",
      earning: "$642.78"
    },
    {
      id: 18,
      user: "Andre Kenway",
      email: "akenwayh@rambler.ru",
      avatar: avatar6$6,
      referredId: 9826,
      status: "Paid",
      value: "$2221.71",
      earning: "$347.19"
    },
    {
      id: 19,
      user: "Quintina Endacott",
      email: "qendacotti@answers.com",
      avatar: avatar9,
      referredId: 4555,
      status: "Paid",
      value: "$5918.70",
      earning: "$543.44"
    },
    {
      id: 20,
      user: "Shurwood Cabble",
      email: "scabblej@twitpic.com",
      avatar: avatar4$6,
      referredId: 5591,
      status: "Paid",
      value: "$9073.50",
      earning: "$980.62"
    },
    {
      id: 21,
      user: "Thatch Borchardt",
      email: "tborchardtk@bing.com",
      avatar: avatar1$8,
      referredId: 4491,
      status: "Unpaid",
      value: "$8389.56",
      earning: "$746.81"
    },
    {
      id: 22,
      user: "Fawne O'Scanlan",
      email: "foscanlanl@europa.eu",
      avatar: avatar8$5,
      referredId: 2946,
      status: "Paid",
      value: "$7471.34",
      earning: "$747.24"
    },
    {
      id: 23,
      user: "Ode Birts",
      email: "obirtsm@sphinn.com",
      avatar: avatar10,
      referredId: 2328,
      status: "Paid",
      value: "$8484.83",
      earning: "$815.79"
    },
    {
      id: 24,
      user: "Bella Michelle",
      email: "bmichellen@npr.org",
      avatar: avatar2$8,
      referredId: 5725,
      status: "Paid",
      value: "$7088.56",
      earning: "$329.64"
    },
    {
      id: 25,
      user: "Aurora Skpsey",
      email: "askpseyo@cdc.gov",
      avatar: avatar14,
      referredId: 2821,
      status: "Unpaid",
      value: "$2938.87",
      earning: "$317.42"
    },
    {
      id: 26,
      user: "Neddie Maunders",
      email: "nmaundersp@blogspot.com",
      avatar: avatar15,
      referredId: 1661,
      status: "Unpaid",
      value: "$6256.70",
      earning: "$521.01"
    },
    {
      id: 27,
      user: "Andria Chisnell",
      email: "achisnellq@imageshack.us",
      avatar: avatar12,
      referredId: 3363,
      status: "Unpaid",
      value: "$9106.99",
      earning: "$705.15"
    },
    {
      id: 28,
      user: "Reggy Arnao",
      email: "rarnaor@kickstarter.com",
      avatar: avatar3$7,
      referredId: 7814,
      status: "Rejected",
      value: "$6300.60",
      earning: "$234.28"
    },
    {
      id: 29,
      user: "Shaylah Hasselby",
      email: "shasselbys@odnoklassniki.ru",
      avatar: avatar4$6,
      referredId: 8324,
      status: "Paid",
      value: "$1874.21",
      earning: "$899.72"
    },
    {
      id: 30,
      user: "Althea Dayce",
      email: "adaycet@youtu.be",
      avatar: avatar8$5,
      referredId: 6069,
      status: "Paid",
      value: "$6098.09",
      earning: "$269.32"
    },
    {
      id: 31,
      user: "Hector Biaggioli",
      email: "hbiaggioliu@umich.edu",
      avatar: avatar13,
      referredId: 5286,
      status: "Paid",
      value: "$4752.66",
      earning: "$546.63"
    },
    {
      id: 32,
      user: "Mycah Gotcher",
      email: "mgotcherv@yellowbook.com",
      avatar: avatar1$8,
      referredId: 7944,
      status: "Unpaid",
      value: "$5959.05",
      earning: "$888.10"
    },
    {
      id: 33,
      user: "Garv Scruton",
      email: "gscrutonw@sun.com",
      avatar: avatar13,
      referredId: 6876,
      status: "Unpaid",
      value: "$6588.37",
      earning: "$680.51"
    },
    {
      id: 34,
      user: "Renell Gurnett",
      email: "rgurnettx@businessweek.com",
      avatar: avatar2$8,
      referredId: 7802,
      status: "Rejected",
      value: "$7542.30",
      earning: "$208.96"
    },
    {
      id: 35,
      user: "Toinette Kilgrew",
      email: "tkilgrewy@wikispaces.com",
      avatar: avatar15,
      referredId: 6946,
      status: "Paid",
      value: "$4447.48",
      earning: "$410.48"
    },
    {
      id: 36,
      user: "Corinne Cockshtt",
      email: "ccockshttz@house.gov",
      avatar: avatar7$5,
      referredId: 1372,
      status: "Paid",
      value: "$3700.16",
      earning: "$858.94"
    },
    {
      id: 37,
      user: "Isis Yurkiewicz",
      email: "iyurkiewicz10@addthis.com",
      avatar: avatar4$6,
      referredId: 2384,
      status: "Unpaid",
      value: "$7456.86",
      earning: "$280.52"
    },
    {
      id: 38,
      user: "Gerianna Nott",
      email: "gnott11@youtu.be",
      avatar: avatar5$6,
      referredId: 1971,
      status: "Paid",
      value: "$5563.94",
      earning: "$515.34"
    },
    {
      id: 39,
      user: "Calli Mewes",
      email: "cmewes12@mit.edu",
      avatar: avatar13,
      referredId: 7323,
      status: "Unpaid",
      value: "$7400.29",
      earning: "$167.44"
    },
    {
      id: 40,
      user: "Sonnnie Keeltagh",
      email: "skeeltagh13@typepad.com",
      avatar: avatar7$5,
      referredId: 5719,
      status: "Paid",
      value: "$1977.34",
      earning: "$652.01"
    },
    {
      id: 41,
      user: "Penelope Hause",
      email: "phause14@netlog.com",
      avatar: avatar3$7,
      referredId: 9347,
      status: "Paid",
      value: "$2155.12",
      earning: "$101.49"
    },
    {
      id: 42,
      user: "Dannie Romeo",
      email: "dromeo15@ask.com",
      avatar: avatar1$8,
      referredId: 1559,
      status: "Rejected",
      value: "$7110.30",
      earning: "$95.40"
    },
    {
      id: 43,
      user: "Keely Giannazzi",
      email: "kgiannazzi16@mit.edu",
      avatar: avatar8$5,
      referredId: 3307,
      status: "Paid",
      value: "$2178.00",
      earning: "$173.10"
    },
    {
      id: 44,
      user: "Kassia Mottini",
      email: "kmottini17@usa.gov",
      avatar: avatar7$5,
      referredId: 4426,
      status: "Rejected",
      value: "$6921.60",
      earning: "$365.93"
    },
    {
      id: 45,
      user: "Burr Scrauniage",
      email: "bscrauniage18@wunderground.com",
      avatar: avatar8$5,
      referredId: 3570,
      status: "Paid",
      value: "$6891.09",
      earning: "$900.25"
    }
  ],
  orderData: [
    {
      id: 1,
      order: 5434,
      customer: "Gabrielle Feyer",
      email: "gfeyer0@nyu.edu",
      avatar: avatar8$5,
      payment: 1,
      status: "Delivered",
      spent: 73.98,
      method: "paypalLogo",
      date: "5/16/2022",
      time: "2:11 AM",
      methodNumber: 6522
    },
    {
      id: 2,
      order: 6745,
      customer: "Jackson Deignan",
      email: "jdeignan1@dell.com",
      avatar: avatar8$5,
      payment: 3,
      status: "Delivered",
      spent: 100.39,
      method: "paypalLogo",
      date: "5/3/2023",
      time: "7:26 PM",
      methodNumber: 7538
    },
    {
      id: 3,
      order: 6087,
      customer: "Tanya Crum",
      email: "tcrum2@yandex.ru",
      avatar: avatar7$5,
      payment: 4,
      status: "Ready to Pickup",
      spent: 809.26,
      method: "mastercard",
      date: "12/15/2022",
      time: "6:51 PM",
      methodNumber: 5170
    },
    {
      id: 4,
      order: 7825,
      customer: "Dallis Dillestone",
      email: "ddillestone3@archive.org",
      avatar: avatar4$6,
      payment: 3,
      status: "Ready to Pickup",
      spent: 617.64,
      method: "paypalLogo",
      date: "8/5/2022",
      time: "9:18 PM",
      methodNumber: 1748
    },
    {
      id: 5,
      order: 5604,
      customer: "Conan Kennham",
      email: "ckennham4@cnn.com",
      avatar: avatar9,
      payment: 3,
      status: "Delivered",
      spent: 384.41,
      method: "mastercard",
      date: "6/18/2022",
      time: "3:34 AM",
      methodNumber: 6425
    },
    {
      id: 6,
      order: 5390,
      customer: "Daven Brocket",
      email: "dbrocket5@epa.gov",
      avatar: avatar13,
      payment: 3,
      status: "Out for Delivery",
      spent: 162.85,
      method: "paypalLogo",
      date: "10/14/2022",
      time: "6:12 PM",
      methodNumber: 1694
    },
    {
      id: 7,
      order: 7279,
      customer: "Rex Farbrace",
      email: "rfarbrace6@sourceforge.net",
      avatar: avatar2$8,
      payment: 2,
      status: "Out for Delivery",
      spent: 591.47,
      method: "mastercard",
      date: "8/8/2022",
      time: "6:09 PM",
      methodNumber: 1883
    },
    {
      id: 8,
      order: 7003,
      customer: "Tann Biaggetti",
      email: "tbiaggetti7@eepurl.com",
      avatar: avatar8$5,
      payment: 4,
      status: "Delivered",
      spent: 664.51,
      method: "mastercard",
      date: "6/10/2022",
      time: "12:59 PM",
      methodNumber: 5047
    },
    {
      id: 9,
      order: 8632,
      customer: "Abagael Drogan",
      email: "adrogan8@storify.com",
      avatar: avatar11,
      payment: 4,
      status: "Dispatched",
      spent: 717.72,
      method: "paypalLogo",
      date: "10/25/2022",
      time: "10:48 AM",
      methodNumber: 1945
    },
    {
      id: 10,
      order: 8501,
      customer: "Esme Sangwin",
      email: "esangwin9@taobao.com",
      avatar: "",
      payment: 3,
      status: "Ready to Pickup",
      spent: 477.42,
      method: "mastercard",
      date: "11/2/2022",
      time: "2:19 PM",
      methodNumber: 3526
    },
    {
      id: 11,
      order: 6498,
      customer: "Jarib Siverns",
      email: "jsivernsa@dailymail.co.uk",
      avatar: "",
      payment: 4,
      status: "Out for Delivery",
      spent: 71.42,
      method: "mastercard",
      date: "8/25/2022",
      time: "8:15 PM",
      methodNumber: 8325
    },
    {
      id: 12,
      order: 7820,
      customer: "Christie Le Moucheux",
      email: "cleb@wikia.com",
      avatar: avatar8$5,
      payment: 1,
      status: "Delivered",
      spent: 894.55,
      method: "paypalLogo",
      date: "11/3/2022",
      time: "11:31 AM",
      methodNumber: 2034
    },
    {
      id: 13,
      order: 8229,
      customer: "Debby Albury",
      email: "dalburyc@homestead.com",
      avatar: "",
      payment: 2,
      status: "Delivered",
      spent: 279.8,
      method: "mastercard",
      date: "3/21/2023",
      time: "3:28 PM",
      methodNumber: 2751
    },
    {
      id: 14,
      order: 9076,
      customer: "Alexia Speaks",
      email: "aspeaksd@omniture.com",
      avatar: "",
      payment: 2,
      status: "Dispatched",
      spent: 156.41,
      method: "paypalLogo",
      date: "11/26/2022",
      time: "9:16 PM",
      methodNumber: 3234
    },
    {
      id: 15,
      order: 6045,
      customer: "Orel Leamy",
      email: "oleamye@cbc.ca",
      avatar: "",
      payment: 2,
      status: "Delivered",
      spent: 614.39,
      method: "mastercard",
      date: "11/20/2022",
      time: "11:58 PM",
      methodNumber: 5209
    },
    {
      id: 16,
      order: 8005,
      customer: "Maurits Nealey",
      email: "mnealeyf@japanpost.jp",
      avatar: avatar7$5,
      payment: 1,
      status: "Delivered",
      spent: 203.72,
      method: "mastercard",
      date: "4/22/2023",
      time: "3:01 PM",
      methodNumber: 1555
    },
    {
      id: 17,
      order: 6917,
      customer: "Emmalee Mason",
      email: "emasong@rakuten.co.jp",
      avatar: "",
      payment: 4,
      status: "Dispatched",
      spent: 491.83,
      method: "mastercard",
      date: "9/1/2022",
      time: "10:31 PM",
      methodNumber: 7013
    },
    {
      id: 18,
      order: 6918,
      customer: "Tibold Schops",
      email: "tschopsh@reference.com",
      avatar: avatar7$5,
      payment: 4,
      status: "Out for Delivery",
      spent: 708.43,
      method: "paypalLogo",
      date: "6/15/2022",
      time: "11:03 AM",
      methodNumber: 4636
    },
    {
      id: 19,
      order: 8733,
      customer: "Godwin Greatbanks",
      email: "ggreatbanksi@guardian.co.uk",
      avatar: "",
      payment: 2,
      status: "Out for Delivery",
      spent: 849.78,
      method: "paypalLogo",
      date: "8/31/2022",
      time: "10:02 AM",
      methodNumber: 6846
    },
    {
      id: 20,
      order: 6630,
      customer: "Conn Cathery",
      email: "ccatheryj@w3.org",
      avatar: "",
      payment: 2,
      status: "Dispatched",
      spent: 855.31,
      method: "paypalLogo",
      date: "1/2/2023",
      time: "4:35 PM",
      methodNumber: 4813
    },
    {
      id: 21,
      order: 8963,
      customer: "Riccardo McKerton",
      email: "rmckertonk@gravatar.com",
      avatar: avatar2$8,
      payment: 2,
      status: "Dispatched",
      spent: 458.76,
      method: "paypalLogo",
      date: "9/17/2022",
      time: "6:00 AM",
      methodNumber: 8197
    },
    {
      id: 22,
      order: 6916,
      customer: "Isa Cartmel",
      email: "icartmell@scientificamerican.com",
      avatar: avatar10,
      payment: 3,
      status: "Dispatched",
      spent: 914.48,
      method: "paypalLogo",
      date: "12/21/2022",
      time: "8:35 PM",
      methodNumber: 2844
    },
    {
      id: 23,
      order: 6647,
      customer: "Yoko Beetles",
      email: "ybeetlesm@discovery.com",
      avatar: avatar15,
      payment: 1,
      status: "Delivered",
      spent: 948.07,
      method: "mastercard",
      date: "1/24/2023",
      time: "12:01 AM",
      methodNumber: 2562
    },
    {
      id: 24,
      order: 8044,
      customer: "Nowell Cornford",
      email: "ncornfordn@sogou.com",
      avatar: avatar5$6,
      payment: 4,
      status: "Ready to Pickup",
      spent: 525.6,
      method: "paypalLogo",
      date: "8/22/2022",
      time: "6:36 PM",
      methodNumber: 2030
    },
    {
      id: 25,
      order: 9879,
      customer: "Brandy McIlvenna",
      email: "bmcilvennao@51.la",
      avatar: "",
      payment: 1,
      status: "Out for Delivery",
      spent: 100.18,
      method: "mastercard",
      date: "12/23/2022",
      time: "7:14 AM",
      methodNumber: 4686
    },
    {
      id: 26,
      order: 5551,
      customer: "Zondra Klimkin",
      email: "zklimkinp@ed.gov",
      avatar: avatar9,
      payment: 3,
      status: "Delivered",
      spent: 463.32,
      method: "mastercard",
      date: "12/20/2022",
      time: "12:01 PM",
      methodNumber: 6209
    },
    {
      id: 27,
      order: 5905,
      customer: "Elyn Aizic",
      email: "eaizicq@live.com",
      avatar: "",
      payment: 4,
      status: "Dispatched",
      spent: 581.81,
      method: "mastercard",
      date: "6/1/2022",
      time: "2:31 AM",
      methodNumber: 7031
    },
    {
      id: 28,
      order: 7616,
      customer: "Leoine Talbot",
      email: "ltalbotr@prweb.com",
      avatar: "",
      payment: 1,
      status: "Delivered",
      spent: 118.75,
      method: "paypalLogo",
      date: "10/13/2022",
      time: "12:57 AM",
      methodNumber: 4387
    },
    {
      id: 29,
      order: 6624,
      customer: "Fayre Screech",
      email: "fscreechs@army.mil",
      avatar: "",
      payment: 3,
      status: "Out for Delivery",
      spent: 774.91,
      method: "mastercard",
      date: "4/17/2023",
      time: "6:43 PM",
      methodNumber: 2077
    },
    {
      id: 30,
      order: 8653,
      customer: "Roxanne Rablen",
      email: "rrablent@alexa.com",
      avatar: "",
      payment: 1,
      status: "Delivered",
      spent: 212.75,
      method: "mastercard",
      date: "3/23/2023",
      time: "10:07 PM",
      methodNumber: 2696
    },
    {
      id: 31,
      order: 8076,
      customer: "Rebekkah Newsham",
      email: "rnewshamu@hhs.gov",
      avatar: avatar10,
      payment: 2,
      status: "Ready to Pickup",
      spent: 778.56,
      method: "mastercard",
      date: "7/1/2022",
      time: "10:37 PM",
      methodNumber: 8071
    },
    {
      id: 32,
      order: 7972,
      customer: "Crawford Beart",
      email: "cbeartv@senate.gov",
      avatar: "",
      payment: 3,
      status: "Delivered",
      spent: 378.74,
      method: "mastercard",
      date: "11/23/2022",
      time: "6:45 AM",
      methodNumber: 3993
    },
    {
      id: 33,
      order: 6979,
      customer: "Cristine Easom",
      email: "ceasomw@theguardian.com",
      avatar: avatar9,
      payment: 2,
      status: "Out for Delivery",
      spent: 595.84,
      method: "mastercard",
      date: "4/15/2023",
      time: "10:21 PM",
      methodNumber: 2356
    },
    {
      id: 34,
      order: 9438,
      customer: "Bessy Vasechkin",
      email: "bvasechkinx@plala.or.jp",
      avatar: "",
      payment: 1,
      status: "Dispatched",
      spent: 257.18,
      method: "paypalLogo",
      date: "11/10/2022",
      time: "8:12 PM",
      methodNumber: 1776
    },
    {
      id: 35,
      order: 5666,
      customer: "Joanne Morl",
      email: "jmorly@google.fr",
      avatar: "",
      payment: 1,
      status: "Ready to Pickup",
      spent: 368.26,
      method: "paypalLogo",
      date: "11/17/2022",
      time: "2:32 PM",
      methodNumber: 6276
    },
    {
      id: 36,
      order: 7128,
      customer: "Cobbie Brameld",
      email: "cbrameldz@biglobe.ne.jp",
      avatar: "",
      payment: 4,
      status: "Delivered",
      spent: 484.14,
      method: "paypalLogo",
      date: "6/13/2022",
      time: "9:36 PM",
      methodNumber: 3876
    },
    {
      id: 37,
      order: 5834,
      customer: "Turner Braban",
      email: "tbraban10@lulu.com",
      avatar: avatar14,
      payment: 2,
      status: "Delivered",
      spent: 135.04,
      method: "mastercard",
      date: "10/14/2022",
      time: "4:39 AM",
      methodNumber: 2211
    },
    {
      id: 38,
      order: 7417,
      customer: "Rudd Aisman",
      email: "raisman11@huffingtonpost.com",
      avatar: "",
      payment: 2,
      status: "Delivered",
      spent: 598.61,
      method: "mastercard",
      date: "9/29/2022",
      time: "10:31 AM",
      methodNumber: 1979
    },
    {
      id: 39,
      order: 5574,
      customer: "Rakel Hearle",
      email: "rhearle12@zimbio.com",
      avatar: avatar8$5,
      payment: 1,
      status: "Out for Delivery",
      spent: 612.56,
      method: "paypalLogo",
      date: "11/29/2022",
      time: "2:59 AM",
      methodNumber: 8328
    },
    {
      id: 40,
      order: 7834,
      customer: "Cull Otson",
      email: "cotson13@angelfire.com",
      avatar: avatar10,
      payment: 4,
      status: "Delivered",
      spent: 413.7,
      method: "mastercard",
      date: "7/23/2022",
      time: "3:15 PM",
      methodNumber: 3901
    },
    {
      id: 41,
      order: 9877,
      customer: "Jedd Lafont",
      email: "jlafont14@vimeo.com",
      avatar: avatar8$5,
      payment: 1,
      status: "Ready to Pickup",
      spent: 67.26,
      method: "paypalLogo",
      date: "11/1/2022",
      time: "8:05 AM",
      methodNumber: 7245
    },
    {
      id: 42,
      order: 5781,
      customer: "Maribeth Roffe",
      email: "mroffe15@hostgator.com",
      avatar: avatar6$6,
      payment: 1,
      status: "Out for Delivery",
      spent: 697.13,
      method: "paypalLogo",
      date: "9/30/2022",
      time: "8:03 PM",
      methodNumber: 8102
    },
    {
      id: 43,
      order: 5299,
      customer: "Ximenez Callaghan",
      email: "xcallaghan16@reuters.com",
      avatar: avatar6$6,
      payment: 2,
      status: "Dispatched",
      spent: 528.17,
      method: "mastercard",
      date: "12/30/2022",
      time: "12:21 AM",
      methodNumber: 3075
    },
    {
      id: 44,
      order: 6622,
      customer: "Oliy Seton",
      email: "oseton17@cargocollective.com",
      avatar: avatar7$5,
      payment: 2,
      status: "Delivered",
      spent: 662.07,
      method: "paypalLogo",
      date: "12/29/2022",
      time: "8:45 PM",
      methodNumber: 5021
    },
    {
      id: 45,
      order: 7387,
      customer: "Conroy Conan",
      email: "cconan18@jigsy.com",
      avatar: avatar8$5,
      payment: 1,
      status: "Delivered",
      spent: 65.73,
      method: "paypalLogo",
      date: "6/11/2022",
      time: "10:11 AM",
      methodNumber: 3954
    },
    {
      id: 46,
      order: 5078,
      customer: "Elianore Russ",
      email: "eruss19@usa.gov",
      avatar: "",
      payment: 2,
      status: "Ready to Pickup",
      spent: 741.28,
      method: "mastercard",
      date: "8/28/2022",
      time: "3:45 PM",
      methodNumber: 2128
    },
    {
      id: 47,
      order: 9631,
      customer: "Farlee Gerard",
      email: "fgerard1a@mit.edu",
      avatar: "",
      payment: 2,
      status: "Ready to Pickup",
      spent: 161.3,
      method: "paypalLogo",
      date: "6/8/2022",
      time: "4:16 PM",
      methodNumber: 6781
    },
    {
      id: 48,
      order: 7869,
      customer: "Gino Fairbrass",
      email: "gfairbrass1b@spotify.com",
      avatar: "",
      payment: 4,
      status: "Ready to Pickup",
      spent: 644.9,
      method: "paypalLogo",
      date: "6/23/2022",
      time: "10:36 AM",
      methodNumber: 5470
    },
    {
      id: 49,
      order: 8643,
      customer: "Dory Carter",
      email: "dcarter1c@sphinn.com",
      avatar: avatar2$8,
      payment: 3,
      status: "Delivered",
      spent: 462.45,
      method: "mastercard",
      date: "11/10/2022",
      time: "2:45 AM",
      methodNumber: 4647
    },
    {
      id: 50,
      order: 7395,
      customer: "Shane Galbreth",
      email: "sgalbreth1d@mac.com",
      avatar: avatar8$5,
      payment: 4,
      status: "Delivered",
      spent: 731.58,
      method: "mastercard",
      date: "5/20/2022",
      time: "8:09 PM",
      methodNumber: 4113
    },
    {
      id: 51,
      order: 7168,
      customer: "Alicea Macci",
      email: "amacci1e@bbc.co.uk",
      avatar: "",
      payment: 1,
      status: "Ready to Pickup",
      spent: 556.94,
      method: "mastercard",
      date: "6/10/2022",
      time: "4:00 PM",
      methodNumber: 6798
    },
    {
      id: 52,
      order: 5775,
      customer: "Terrijo Copello",
      email: "tcopello1f@netlog.com",
      avatar: "",
      payment: 3,
      status: "Dispatched",
      spent: 687.27,
      method: "paypalLogo",
      date: "6/23/2022",
      time: "6:41 PM",
      methodNumber: 3529
    },
    {
      id: 53,
      order: 6558,
      customer: "Bambi Yerby",
      email: "byerby1g@sohu.com",
      avatar: "",
      payment: 1,
      status: "Out for Delivery",
      spent: 309.15,
      method: "paypalLogo",
      date: "10/18/2022",
      time: "8:40 PM",
      methodNumber: 1664
    },
    {
      id: 54,
      order: 7766,
      customer: "Corny Linstead",
      email: "clinstead1h@icio.us",
      avatar: "",
      payment: 4,
      status: "Dispatched",
      spent: 805.73,
      method: "paypalLogo",
      date: "6/25/2022",
      time: "8:01 AM",
      methodNumber: 7931
    },
    {
      id: 55,
      order: 9305,
      customer: "Pauline Pfaffe",
      email: "ppfaffe1i@wikia.com",
      avatar: "",
      payment: 4,
      status: "Ready to Pickup",
      spent: 769.47,
      method: "paypalLogo",
      date: "4/17/2023",
      time: "8:05 AM",
      methodNumber: 8412
    },
    {
      id: 56,
      order: 7886,
      customer: "Ilka Adanet",
      email: "iadanet1j@tripod.com",
      avatar: "",
      payment: 4,
      status: "Ready to Pickup",
      spent: 899.35,
      method: "paypalLogo",
      date: "2/2/2023",
      time: "6:13 PM",
      methodNumber: 3946
    },
    {
      id: 57,
      order: 8333,
      customer: "Charlena Sabberton",
      email: "csabberton1k@vinaora.com",
      avatar: "",
      payment: 3,
      status: "Out for Delivery",
      spent: 201.84,
      method: "paypalLogo",
      date: "6/11/2022",
      time: "10:15 PM",
      methodNumber: 3294
    },
    {
      id: 58,
      order: 7044,
      customer: "Harwell Vallack",
      email: "hvallack1l@sakura.ne.jp",
      avatar: "",
      payment: 2,
      status: "Dispatched",
      spent: 547.07,
      method: "paypalLogo",
      date: "6/1/2022",
      time: "1:29 PM",
      methodNumber: 5571
    },
    {
      id: 59,
      order: 5414,
      customer: "Juliette Douthwaite",
      email: "jdouthwaite1m@marketwatch.com",
      avatar: "",
      payment: 2,
      status: "Dispatched",
      spent: 89.46,
      method: "mastercard",
      date: "9/26/2022",
      time: "11:40 AM",
      methodNumber: 4380
    },
    {
      id: 60,
      order: 7102,
      customer: "Nydia Brandel",
      email: "nbrandel1n@cnet.com",
      avatar: "",
      payment: 3,
      status: "Out for Delivery",
      spent: 417.49,
      method: "paypalLogo",
      date: "2/5/2023",
      time: "11:42 PM",
      methodNumber: 5856
    },
    {
      id: 61,
      order: 8784,
      customer: "Gaby Edy",
      email: "gedy1o@latimes.com",
      avatar: avatar9,
      payment: 4,
      status: "Out for Delivery",
      spent: 589.37,
      method: "mastercard",
      date: "2/5/2023",
      time: "8:46 AM",
      methodNumber: 1923
    },
    {
      id: 62,
      order: 9885,
      customer: "Lacey Swenson",
      email: "lswenson1p@booking.com",
      avatar: "",
      payment: 2,
      status: "Ready to Pickup",
      spent: 62.71,
      method: "mastercard",
      date: "9/11/2022",
      time: "7:41 PM",
      methodNumber: 4367
    },
    {
      id: 63,
      order: 5387,
      customer: "Bradan Edgworth",
      email: "bedgworth1q@typepad.com",
      avatar: avatar7$5,
      payment: 4,
      status: "Out for Delivery",
      spent: 54.45,
      method: "paypalLogo",
      date: "6/2/2022",
      time: "11:05 AM",
      methodNumber: 8829
    },
    {
      id: 64,
      order: 5459,
      customer: "Ilyssa Egan",
      email: "iegan1r@reference.com",
      avatar: avatar8$5,
      payment: 3,
      status: "Dispatched",
      spent: 756.16,
      method: "paypalLogo",
      date: "5/20/2022",
      time: "12:39 PM",
      methodNumber: 6971
    },
    {
      id: 65,
      order: 8812,
      customer: "Duke Jahnel",
      email: "djahnel1s@huffingtonpost.com",
      avatar: avatar7$5,
      payment: 2,
      status: "Dispatched",
      spent: 103.71,
      method: "mastercard",
      date: "3/1/2023",
      time: "10:25 PM",
      methodNumber: 4305
    },
    {
      id: 66,
      order: 7123,
      customer: "Christen Dillow",
      email: "cdillow1t@businessinsider.com",
      avatar: "",
      payment: 1,
      status: "Ready to Pickup",
      spent: 357.17,
      method: "mastercard",
      date: "2/1/2023",
      time: "4:11 AM",
      methodNumber: 7385
    },
    {
      id: 67,
      order: 8964,
      customer: "Hildegaard Ormshaw",
      email: "hormshaw1u@amazonaws.com",
      avatar: "",
      payment: 1,
      status: "Dispatched",
      spent: 191.57,
      method: "mastercard",
      date: "6/15/2022",
      time: "7:28 PM",
      methodNumber: 6469
    },
    {
      id: 68,
      order: 8020,
      customer: "Merrill Sangwin",
      email: "msangwin1v@ted.com",
      avatar: "",
      payment: 3,
      status: "Delivered",
      spent: 80.47,
      method: "paypalLogo",
      date: "9/15/2022",
      time: "9:35 PM",
      methodNumber: 1464
    },
    {
      id: 69,
      order: 7192,
      customer: "Niel Kitchingman",
      email: "nkitchingman1w@twitpic.com",
      avatar: "",
      payment: 1,
      status: "Delivered",
      spent: 759.98,
      method: "mastercard",
      date: "11/24/2022",
      time: "12:51 PM",
      methodNumber: 3957
    },
    {
      id: 70,
      order: 9941,
      customer: "Zacharias Stonhard",
      email: "zstonhard1x@ca.gov",
      avatar: "",
      payment: 4,
      status: "Delivered",
      spent: 333.83,
      method: "paypalLogo",
      date: "6/20/2022",
      time: "11:11 AM",
      methodNumber: 3907
    },
    {
      id: 71,
      order: 7786,
      customer: "Hirsch Garwood",
      email: "hgarwood1y@hhs.gov",
      avatar: "",
      payment: 1,
      status: "Delivered",
      spent: 993.07,
      method: "paypalLogo",
      date: "1/30/2023",
      time: "8:13 AM",
      methodNumber: 3210
    },
    {
      id: 72,
      order: 6890,
      customer: "Etienne Duke",
      email: "eduke1z@dell.com",
      avatar: avatar9,
      payment: 4,
      status: "Dispatched",
      spent: 651.14,
      method: "mastercard",
      date: "8/1/2022",
      time: "7:24 AM",
      methodNumber: 3507
    },
    {
      id: 73,
      order: 6672,
      customer: "Galen Bent",
      email: "gbent20@altervista.org",
      avatar: avatar2$8,
      payment: 4,
      status: "Out for Delivery",
      spent: 483.86,
      method: "mastercard",
      date: "5/10/2022",
      time: "7:51 PM",
      methodNumber: 7538
    },
    {
      id: 74,
      order: 5531,
      customer: "Cletus Arias",
      email: "carias21@rambler.ru",
      avatar: avatar9,
      payment: 3,
      status: "Delivered",
      spent: 609.47,
      method: "mastercard",
      date: "8/20/2022",
      time: "3:21 AM",
      methodNumber: 5851
    },
    {
      id: 75,
      order: 9041,
      customer: "Gilbertina Manjin",
      email: "gmanjin22@blogtalkradio.com",
      avatar: "",
      payment: 2,
      status: "Dispatched",
      spent: 593.65,
      method: "mastercard",
      date: "9/19/2022",
      time: "5:23 AM",
      methodNumber: 8332
    },
    {
      id: 76,
      order: 9521,
      customer: "Helena Airds",
      email: "hairds23@facebook.com",
      avatar: avatar7$5,
      payment: 4,
      status: "Out for Delivery",
      spent: 897.84,
      method: "mastercard",
      date: "1/13/2023",
      time: "1:41 PM",
      methodNumber: 8564
    },
    {
      id: 77,
      order: 9793,
      customer: "Bonny Tebbutt",
      email: "btebbutt24@clickbank.net",
      avatar: "",
      payment: 3,
      status: "Ready to Pickup",
      spent: 856.58,
      method: "paypalLogo",
      date: "1/23/2023",
      time: "6:10 AM",
      methodNumber: 2150
    },
    {
      id: 78,
      order: 6741,
      customer: "Garreth Rubinowitz",
      email: "grubinowitz25@unblog.fr",
      avatar: avatar8$5,
      payment: 2,
      status: "Ready to Pickup",
      spent: 191.99,
      method: "paypalLogo",
      date: "8/24/2022",
      time: "2:01 PM",
      methodNumber: 4148
    },
    {
      id: 79,
      order: 6602,
      customer: "Lotta Martinie",
      email: "lmartinie26@ovh.net",
      avatar: avatar8$5,
      payment: 2,
      status: "Out for Delivery",
      spent: 790.09,
      method: "paypalLogo",
      date: "6/25/2022",
      time: "12:54 AM",
      methodNumber: 4538
    },
    {
      id: 80,
      order: 9682,
      customer: "Danna Goldis",
      email: "dgoldis27@tinypic.com",
      avatar: "",
      payment: 2,
      status: "Dispatched",
      spent: 121.21,
      method: "mastercard",
      date: "1/11/2023",
      time: "4:33 PM",
      methodNumber: 1974
    },
    {
      id: 81,
      order: 6256,
      customer: "Ronica McDuffie",
      email: "rmcduffie28@dagondesign.com",
      avatar: "",
      payment: 4,
      status: "Delivered",
      spent: 783.05,
      method: "mastercard",
      date: "7/12/2022",
      time: "1:54 AM",
      methodNumber: 6563
    },
    {
      id: 82,
      order: 6265,
      customer: "Clarice Biesty",
      email: "cbiesty29@hp.com",
      avatar: "",
      payment: 2,
      status: "Dispatched",
      spent: 905.31,
      method: "paypalLogo",
      date: "9/7/2022",
      time: "5:58 AM",
      methodNumber: 7367
    },
    {
      id: 83,
      order: 7330,
      customer: "Georgetta Hawkins",
      email: "ghawkins2a@shinystat.com",
      avatar: "",
      payment: 4,
      status: "Out for Delivery",
      spent: 670.5,
      method: "mastercard",
      date: "12/9/2022",
      time: "4:22 AM",
      methodNumber: 4789
    },
    {
      id: 84,
      order: 6342,
      customer: "Hamid Gosford",
      email: "hgosford2b@youtu.be",
      avatar: avatar7$5,
      payment: 2,
      status: "Out for Delivery",
      spent: 520.17,
      method: "paypalLogo",
      date: "5/26/2022",
      time: "3:15 PM",
      methodNumber: 2733
    },
    {
      id: 85,
      order: 9620,
      customer: "Marnia Scamwell",
      email: "mscamwell2c@guardian.co.uk",
      avatar: avatar3$7,
      payment: 4,
      status: "Ready to Pickup",
      spent: 77.59,
      method: "paypalLogo",
      date: "9/10/2022",
      time: "11:40 AM",
      methodNumber: 3822
    },
    {
      id: 86,
      order: 5699,
      customer: "Casie Cratere",
      email: "ccratere2d@baidu.com",
      avatar: "",
      payment: 3,
      status: "Delivered",
      spent: 429.8,
      method: "mastercard",
      date: "9/22/2022",
      time: "11:52 PM",
      methodNumber: 2925
    },
    {
      id: 87,
      order: 7289,
      customer: "Edik Whytock",
      email: "ewhytock2e@vimeo.com",
      avatar: "",
      payment: 3,
      status: "Ready to Pickup",
      spent: 838.25,
      method: "mastercard",
      date: "8/4/2022",
      time: "9:12 PM",
      methodNumber: 6240
    },
    {
      id: 88,
      order: 9780,
      customer: "Wylie Marryatt",
      email: "wmarryatt2f@economist.com",
      avatar: "",
      payment: 3,
      status: "Out for Delivery",
      spent: 308.07,
      method: "mastercard",
      date: "3/2/2023",
      time: "10:00 AM",
      methodNumber: 7909
    },
    {
      id: 89,
      order: 5859,
      customer: "Eydie Vogelein",
      email: "evogelein2g@forbes.com",
      avatar: "",
      payment: 4,
      status: "Ready to Pickup",
      spent: 447.29,
      method: "paypalLogo",
      date: "4/29/2023",
      time: "9:52 AM",
      methodNumber: 5475
    },
    {
      id: 90,
      order: 9957,
      customer: "Milt Whitear",
      email: "mwhitear2h@instagram.com",
      avatar: "",
      payment: 4,
      status: "Dispatched",
      spent: 59.28,
      method: "mastercard",
      date: "11/29/2022",
      time: "6:53 PM",
      methodNumber: 4371
    },
    {
      id: 91,
      order: 7094,
      customer: "Damara Figgins",
      email: "dfiggins2i@de.vu",
      avatar: "",
      payment: 2,
      status: "Delivered",
      spent: 62.62,
      method: "mastercard",
      date: "6/29/2022",
      time: "6:51 AM",
      methodNumber: 8321
    },
    {
      id: 92,
      order: 7280,
      customer: "Sibley Braithwait",
      email: "sbraithwait2j@webmd.com",
      avatar: "",
      payment: 1,
      status: "Ready to Pickup",
      spent: 554.91,
      method: "mastercard",
      date: "12/6/2022",
      time: "2:11 AM",
      methodNumber: 8535
    },
    {
      id: 93,
      order: 7931,
      customer: "Octavius Whitchurch",
      email: "owhitchurch2k@google.ca",
      avatar: avatar7$5,
      payment: 3,
      status: "Dispatched",
      spent: 383.52,
      method: "mastercard",
      date: "12/26/2022",
      time: "9:49 AM",
      methodNumber: 8585
    },
    {
      id: 94,
      order: 8767,
      customer: "Lyndsey Dorey",
      email: "ldorey2l@barnesandnoble.com",
      avatar: avatar2$8,
      payment: 3,
      status: "Ready to Pickup",
      spent: 738.42,
      method: "mastercard",
      date: "8/29/2022",
      time: "5:24 AM",
      methodNumber: 3432
    },
    {
      id: 95,
      order: 6111,
      customer: "Chad Cock",
      email: "ccock2m@g.co",
      avatar: "",
      payment: 4,
      status: "Ready to Pickup",
      spent: 669.45,
      method: "mastercard",
      date: "3/11/2023",
      time: "10:43 AM",
      methodNumber: 1014
    },
    {
      id: 96,
      order: 5911,
      customer: "Hilliard Merck",
      email: "hmerck2n@printfriendly.com",
      avatar: "",
      payment: 4,
      status: "Out for Delivery",
      spent: 237.91,
      method: "paypalLogo",
      date: "8/14/2022",
      time: "3:26 PM",
      methodNumber: 3196
    },
    {
      id: 97,
      order: 7064,
      customer: "Carmon Vasiljevic",
      email: "cvasiljevic2o@odnoklassniki.ru",
      avatar: avatar8$5,
      payment: 3,
      status: "Delivered",
      spent: 595.25,
      method: "paypalLogo",
      date: "3/20/2023",
      time: "3:11 PM",
      methodNumber: 4892
    },
    {
      id: 98,
      order: 8114,
      customer: "Ulysses Goodlife",
      email: "ugoodlife2p@blogger.com",
      avatar: avatar2$8,
      payment: 3,
      status: "Ready to Pickup",
      spent: 746.38,
      method: "mastercard",
      date: "4/8/2023",
      time: "3:39 AM",
      methodNumber: 4509
    },
    {
      id: 99,
      order: 7189,
      customer: "Boycie Hartmann",
      email: "bhartmann2q@addthis.com",
      avatar: "",
      payment: 3,
      status: "Out for Delivery",
      spent: 704.86,
      method: "paypalLogo",
      date: "1/2/2023",
      time: "8:55 PM",
      methodNumber: 6424
    },
    {
      id: 100,
      order: 9042,
      customer: "Chere Schofield",
      email: "cschofield2r@ucsd.edu",
      avatar: "",
      payment: 2,
      status: "Ready to Pickup",
      spent: 815.77,
      method: "mastercard",
      date: "2/1/2023",
      time: "4:12 PM",
      methodNumber: 3949
    }
  ],
  customerData: [
    {
      id: 1,
      customer: "Stanfield Baser",
      customerId: 879861,
      email: "sbaser0@boston.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "lk",
      order: 157,
      totalSpent: 2074.22,
      avatar: avatar1$8
    },
    {
      id: 2,
      customer: "Laurie Dax",
      customerId: 178408,
      email: "ldax1@lycos.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "ru",
      order: 663,
      totalSpent: 2404.19,
      avatar: avatar2$8
    },
    {
      id: 3,
      customer: "Maxine Kenrick",
      customerId: 221092,
      email: "mkenrick2@eepurl.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "gt",
      order: 64,
      totalSpent: 8821.4,
      avatar: avatar3$7
    },
    {
      id: 4,
      customer: "Harman Burkill",
      customerId: 645579,
      email: "hburkill3@drupal.org",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "pt",
      order: 640,
      totalSpent: 5294.35,
      avatar: avatar4$6
    },
    {
      id: 5,
      customer: "Aubrey Borrow",
      customerId: 288765,
      email: "aborrow4@jiathis.com",
      country: "France",
      countryFlag: frFlag,
      countryCode: "fr",
      order: 184,
      totalSpent: 1003.3,
      avatar: avatar5$6
    },
    {
      id: 6,
      customer: "Nester Fridd",
      customerId: 321942,
      email: "nfridd5@cdbaby.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 965,
      totalSpent: 3876.92,
      avatar: avatar6$6
    },
    {
      id: 7,
      customer: "Lizzie Nicholes",
      customerId: 516109,
      email: "lnicholes6@rediff.com",
      country: "Brazil",
      countryFlag: brFlag,
      countryCode: "br",
      order: 514,
      totalSpent: 7936.85,
      avatar: avatar7$5
    },
    {
      id: 8,
      customer: "Amabel Scullion",
      customerId: 403666,
      email: "ascullion7@wiley.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "gt",
      order: 584,
      totalSpent: 4150.97,
      avatar: avatar8$5
    },
    {
      id: 9,
      customer: "Zeke Arton",
      customerId: 895280,
      email: "zarton8@weibo.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "ua",
      order: 539,
      totalSpent: 3430.05,
      avatar: avatar9
    },
    {
      id: 10,
      customer: "Rosy Medlicott",
      customerId: 199195,
      email: "rmedlicott9@amazon.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "ru",
      order: 4,
      totalSpent: 8646.75,
      avatar: avatar10
    },
    {
      id: 11,
      customer: "Elene Esp",
      customerId: 317063,
      email: "eespa@soundcloud.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 602,
      totalSpent: 5807.99,
      avatar: avatar11
    },
    {
      id: 12,
      customer: "Cal Lavington",
      customerId: 999318,
      email: "clavingtonb@nps.gov",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "bo",
      order: 779,
      totalSpent: 6677.41,
      avatar: avatar12
    },
    {
      id: 13,
      customer: "Merrick Antcliffe",
      customerId: 804513,
      email: "mantcliffec@php.net",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 267,
      totalSpent: 3340.41,
      avatar: avatar13
    },
    {
      id: 14,
      customer: "Price Tremathack",
      customerId: 155681,
      email: "ptremathackd@amazon.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "ru",
      order: 611,
      totalSpent: 5768.17,
      avatar: avatar14
    },
    {
      id: 15,
      customer: "Leesa Habershaw",
      customerId: 490182,
      email: "lhabershawe@washingtonpost.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "jp",
      order: 90,
      totalSpent: 4488.03,
      avatar: avatar15
    },
    {
      id: 16,
      customer: "Jeana Quincey",
      customerId: 760428,
      email: "jquinceyf@yolasite.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "ua",
      order: 597,
      totalSpent: 6936.49,
      avatar: avatar1$8
    },
    {
      id: 17,
      customer: "Emmott Hise",
      customerId: 675190,
      email: "ehiseg@usatoday.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 30,
      totalSpent: 7994.11,
      avatar: avatar2$8
    },
    {
      id: 18,
      customer: "Griffith Weeke",
      customerId: 601134,
      email: "gweekeh@dyndns.org",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 322,
      totalSpent: 5710.25,
      avatar: avatar3$7
    },
    {
      id: 19,
      customer: "Ali Barnardo",
      customerId: 908144,
      email: "abarnardoi@forbes.com",
      country: "France",
      countryFlag: frFlag,
      countryCode: "mx",
      order: 863,
      totalSpent: 7537.74,
      avatar: avatar4$6
    },
    {
      id: 20,
      customer: "Powell Wornham",
      customerId: 528288,
      email: "pwornhamj@ca.gov",
      country: "France",
      countryFlag: frFlag,
      countryCode: "cz",
      order: 812,
      totalSpent: 7801.46,
      avatar: avatar5$6
    },
    {
      id: 21,
      customer: "Miltie Ganniclifft",
      customerId: 573210,
      email: "mganniclifftk@bandcamp.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "ru",
      order: 705,
      totalSpent: 1371.44,
      avatar: avatar6$6
    },
    {
      id: 22,
      customer: "Tabbatha Duinbleton",
      customerId: 473511,
      email: "tduinbletonl@mediafire.com",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "us",
      order: 956,
      totalSpent: 8632.52,
      avatar: avatar7$5
    },
    {
      id: 23,
      customer: "Maurizia Abel",
      customerId: 676743,
      email: "mabelm@xrea.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "my",
      order: 326,
      totalSpent: 7241.74,
      avatar: avatar8$5
    },
    {
      id: 24,
      customer: "Amargo Fliege",
      customerId: 381698,
      email: "afliegen@storify.com",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 748,
      totalSpent: 5821.27,
      avatar: avatar9
    },
    {
      id: 25,
      customer: "Shayla Tarplee",
      customerId: 865989,
      email: "starpleeo@ovh.net",
      country: "India",
      countryFlag: inFlag,
      countryCode: "ng",
      order: 535,
      totalSpent: 900.54,
      avatar: avatar10
    },
    {
      id: 26,
      customer: "Kassey Cutting",
      customerId: 545661,
      email: "kcuttingp@dion.ne.jp",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 645,
      totalSpent: 3200.38,
      avatar: avatar11
    },
    {
      id: 27,
      customer: "Blaire Hillaby",
      customerId: 408852,
      email: "bhillabyq@123-reg.co.uk",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cl",
      order: 709,
      totalSpent: 376.46,
      avatar: avatar12
    },
    {
      id: 28,
      customer: "Taryn Ducker",
      customerId: 486325,
      email: "tduckerr@tamu.edu",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "bt",
      order: 535,
      totalSpent: 3654.39,
      avatar: avatar13
    },
    {
      id: 29,
      customer: "Maddie Witherop",
      customerId: 137049,
      email: "mwitherops@bing.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 763,
      totalSpent: 1136.68,
      avatar: avatar14
    },
    {
      id: 30,
      customer: "Brooke Pattemore",
      customerId: 985599,
      email: "bpattemoret@techcrunch.com",
      country: "Brazil",
      countryFlag: brFlag,
      countryCode: "br",
      order: 63,
      totalSpent: 1955.91,
      avatar: avatar15
    },
    {
      id: 31,
      customer: "Mordy Dockerty",
      customerId: 178466,
      email: "mdockertyu@umn.edu",
      country: "Brazil",
      countryFlag: brFlag,
      countryCode: "se",
      order: 452,
      totalSpent: 191.11,
      avatar: avatar1$8
    },
    {
      id: 32,
      customer: "Clemmie Trowel",
      customerId: 871402,
      email: "ctrowelv@feedburner.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cl",
      order: 415,
      totalSpent: 5285.45,
      avatar: avatar7$5
    },
    {
      id: 33,
      customer: "Dehlia Shellard",
      customerId: 642834,
      email: "dshellardw@mediafire.com",
      country: "France",
      countryFlag: frFlag,
      countryCode: "cz",
      order: 651,
      totalSpent: 4284.88,
      avatar: avatar2$8
    },
    {
      id: 34,
      customer: "Neila Juggings",
      customerId: 471692,
      email: "njuggingsx@wp.com",
      country: "Brazil",
      countryFlag: brFlag,
      countryCode: "ke",
      order: 219,
      totalSpent: 6698.44,
      avatar: avatar3$7
    },
    {
      id: 35,
      customer: "Ellsworth Dunnan",
      customerId: 295906,
      email: "edunnany@ucla.edu",
      country: "Brazil",
      countryFlag: brFlag,
      countryCode: "br",
      order: 11,
      totalSpent: 3496.34,
      avatar: avatar4$6
    },
    {
      id: 36,
      customer: "Kassandra Cossentine",
      customerId: 979702,
      email: "kcossentinez@topsy.com",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 316,
      totalSpent: 5328.02,
      avatar: avatar15
    },
    {
      id: 37,
      customer: "Hugibert Merigeau",
      customerId: 231745,
      email: "hmerigeau10@yelp.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "pe",
      order: 931,
      totalSpent: 5868.06,
      avatar: avatar13
    },
    {
      id: 38,
      customer: "Constantina Charter",
      customerId: 259786,
      email: "ccharter11@php.net",
      country: "France",
      countryFlag: frFlag,
      countryCode: "cz",
      order: 30,
      totalSpent: 4134.97,
      avatar: avatar1$8
    },
    {
      id: 39,
      customer: "Charleen Langsbury",
      customerId: 794373,
      email: "clangsbury12@usatoday.com",
      country: "Brazil",
      countryFlag: brFlag,
      countryCode: "br",
      order: 215,
      totalSpent: 1869.06,
      avatar: avatar6$6
    },
    {
      id: 40,
      customer: "Sande Ferrar",
      customerId: 949483,
      email: "sferrar13@weather.com",
      countryFlag: cnFlag,
      country: "China",
      countryCode: "bo",
      order: 696,
      totalSpent: 2585.57,
      avatar: avatar7$5
    },
    {
      id: 41,
      customer: "Lonnard Najara",
      customerId: 225529,
      email: "lnajara14@baidu.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "bd",
      order: 956,
      totalSpent: 1741.83,
      avatar: avatar8$5
    },
    {
      id: 42,
      customer: "Niko Sharpling",
      customerId: 184711,
      email: "nsharpling15@ustream.tv",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 172,
      totalSpent: 1733.66,
      avatar: avatar9
    },
    {
      id: 43,
      customer: "Malinde Derricoat",
      customerId: 272711,
      email: "mderricoat16@feedburner.com",
      country: "India",
      countryFlag: inFlag,
      countryCode: "ng",
      order: 822,
      totalSpent: 3930.51,
      avatar: avatar10
    },
    {
      id: 44,
      customer: "Kelsey Muskett",
      customerId: 236093,
      email: "kmuskett17@lycos.com",
      country: "India",
      countryFlag: inFlag,
      countryCode: "ca",
      order: 51,
      totalSpent: 4638.94,
      avatar: avatar11
    },
    {
      id: 45,
      customer: "Darcey Gorghetto",
      customerId: 582408,
      email: "dgorghetto18@dropbox.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 559,
      totalSpent: 3614,
      avatar: avatar12
    },
    {
      id: 46,
      customer: "Jody Stace",
      customerId: 343364,
      email: "jstace19@ucsd.edu",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 945,
      totalSpent: 5413.53,
      avatar: avatar13
    },
    {
      id: 47,
      customer: "Rudyard Prangnell",
      customerId: 811348,
      email: "rprangnell1a@imageshack.us",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "ru",
      order: 149,
      totalSpent: 589.72,
      avatar: avatar1$8
    },
    {
      id: 48,
      customer: "Tanner Irdale",
      customerId: 855725,
      email: "tirdale1b@plala.or.jp",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 438,
      totalSpent: 8949.26,
      avatar: avatar14
    },
    {
      id: 49,
      customer: "Eran Galgey",
      customerId: 804218,
      email: "egalgey1c@sakura.ne.jp",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 716,
      totalSpent: 4466.54,
      avatar: avatar15
    },
    {
      id: 50,
      customer: "Julianne Lavalde",
      customerId: 670044,
      email: "jlavalde1d@twitter.com",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "pl",
      order: 307,
      totalSpent: 4382.72,
      avatar: avatar1$8
    },
    {
      id: 51,
      customer: "Hernando Stolte",
      customerId: 804269,
      email: "hstolte1e@artisteer.com",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "us",
      order: 684,
      totalSpent: 4671.06,
      avatar: avatar2$8
    },
    {
      id: 52,
      customer: "Mommy Beardsdale",
      customerId: 711203,
      email: "mbeardsdale1f@technorati.com",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "pt",
      order: 315,
      totalSpent: 6261.53,
      avatar: avatar2$8
    },
    {
      id: 53,
      customer: "Edsel Wildbore",
      customerId: 745457,
      email: "ewildbore1g@free.fr",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 797,
      totalSpent: 741.89,
      avatar: avatar3$7
    },
    {
      id: 54,
      customer: "Iseabal Idney",
      customerId: 560446,
      email: "iidney1h@1688.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 145,
      totalSpent: 4360.35,
      avatar: avatar4$6
    },
    {
      id: 55,
      customer: "Barbi Jest",
      customerId: 519637,
      email: "bjest1i@com.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "co",
      order: 574,
      totalSpent: 8328.19,
      avatar: avatar5$6
    },
    {
      id: 56,
      customer: "Paddie Grogan",
      customerId: 915392,
      country: "India",
      countryFlag: inFlag,
      email: "pgrogan1j@wikia.com",
      countryCode: "eg",
      order: 948,
      totalSpent: 9899.06,
      avatar: avatar6$6
    },
    {
      id: 57,
      customer: "Lem Exell",
      customerId: 856323,
      email: "lexell1k@nytimes.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "tz",
      order: 541,
      totalSpent: 9285.65,
      avatar: avatar7$5
    },
    {
      id: 58,
      customer: "Starlin Baldassi",
      customerId: 696538,
      email: "sbaldassi1l@squarespace.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "ru",
      order: 99,
      totalSpent: 3660.8,
      avatar: avatar8$5
    },
    {
      id: 59,
      customer: "Marjie Badman",
      customerId: 875646,
      email: "mbadman1m@paypal.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "ru",
      order: 108,
      totalSpent: 1978.61,
      avatar: avatar9
    },
    {
      id: 60,
      customer: "Flossi McLaverty",
      customerId: 617163,
      email: "fmclaverty1n@51.la",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 483,
      totalSpent: 772.98,
      avatar: avatar10
    },
    {
      id: 61,
      customer: "Norri Dillinton",
      customerId: 123210,
      email: "ndillinton1o@bbc.co.uk",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "mk",
      order: 69,
      totalSpent: 4227.77,
      avatar: avatar11
    },
    {
      id: 62,
      customer: "Aloysius Lukas",
      customerId: 766292,
      email: "alukas1p@chicagotribune.com",
      country: "France",
      countryFlag: frFlag,
      countryCode: "fr",
      order: 147,
      totalSpent: 6637.38,
      avatar: avatar12
    },
    {
      id: 63,
      customer: "Rochell Cockill",
      customerId: 100696,
      email: "rcockill1q@irs.gov",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 444,
      totalSpent: 1730.64,
      avatar: avatar13
    },
    {
      id: 64,
      customer: "Emma Greensall",
      customerId: 792768,
      email: "egreensall1r@joomla.org",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "ru",
      order: 831,
      totalSpent: 9996.22,
      avatar: avatar14
    },
    {
      id: 65,
      customer: "Jodi Malyan",
      customerId: 996390,
      email: "jmalyan1s@uiuc.edu",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "fi",
      order: 311,
      totalSpent: 3459.82,
      avatar: avatar15
    },
    {
      id: 66,
      customer: "Zed Rawe",
      customerId: 343593,
      email: "zrawe1t@va.gov",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "ly",
      order: 473,
      totalSpent: 5218.22,
      avatar: avatar10
    },
    {
      id: 67,
      customer: "Thomasine Vasentsov",
      customerId: 988015,
      email: "tvasentsov1u@bloglovin.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "ar",
      order: 752,
      totalSpent: 5984.53,
      avatar: avatar11
    },
    {
      id: 68,
      customer: "Janice Large",
      customerId: 270658,
      email: "jlarge1v@dot.gov",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "no",
      order: 582,
      totalSpent: 5565.85,
      avatar: avatar12
    },
    {
      id: 69,
      customer: "Tadeo Blasio",
      customerId: 208862,
      email: "tblasio1w@ustream.tv",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 751,
      totalSpent: 9042.56,
      avatar: avatar13
    },
    {
      id: 70,
      customer: "Raul Onele",
      customerId: 895818,
      email: "ronele1x@bloglovin.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "pe",
      order: 689,
      totalSpent: 4508.42,
      avatar: avatar14
    },
    {
      id: 71,
      customer: "Rolf Comellini",
      customerId: 292654,
      email: "rcomellini1y@soup.io",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 837,
      totalSpent: 6379.88,
      avatar: avatar15
    },
    {
      id: 72,
      customer: "Feliza Birchenough",
      customerId: 974560,
      email: "fbirchenough1z@a8.net",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "ec",
      order: 724,
      totalSpent: 2933.59,
      avatar: avatar10
    },
    {
      id: 73,
      customer: "Elsinore Daltry",
      customerId: 152193,
      email: "edaltry20@themeforest.net",
      country: "Brazil",
      countryFlag: brFlag,
      countryCode: "br",
      order: 455,
      totalSpent: 724.68,
      avatar: avatar2$8
    },
    {
      id: 74,
      customer: "Roseann Serck",
      customerId: 772228,
      email: "rserck21@about.com",
      country: "India",
      countryFlag: inFlag,
      countryCode: "rs",
      order: 51,
      totalSpent: 8287.03,
      avatar: avatar3$7
    },
    {
      id: 75,
      customer: "Yank Luddy",
      customerId: 586615,
      email: "yluddy22@fema.gov",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "pt",
      order: 462,
      totalSpent: 9157.04,
      avatar: avatar4$6
    },
    {
      id: 76,
      customer: "Sloan Huskisson",
      customerId: 762754,
      email: "shuskisson23@live.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "do",
      order: 952,
      totalSpent: 6106.41,
      avatar: avatar5$6
    },
    {
      id: 77,
      customer: "Livy Lattimore",
      customerId: 258911,
      email: "llattimore24@sfgate.com",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 794,
      totalSpent: 9053.56,
      avatar: avatar6$6
    },
    {
      id: 78,
      customer: "Lanette Deble",
      customerId: 890051,
      email: "ldeble25@spotify.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "hk",
      order: 454,
      totalSpent: 8180.2,
      avatar: avatar7$5
    },
    {
      id: 79,
      customer: "Juliet Gypps",
      customerId: 493646,
      email: "jgypps26@paginegialle.it",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 320,
      totalSpent: 210.84,
      avatar: avatar8$5
    },
    {
      id: 80,
      customer: "Tome Joliffe",
      customerId: 356230,
      email: "tjoliffe27@phoca.cz",
      country: "France",
      countryFlag: frFlag,
      countryCode: "mx",
      order: 515,
      totalSpent: 8571.28,
      avatar: avatar9
    },
    {
      id: 81,
      customer: "Joel Hamil",
      customerId: 337022,
      email: "jhamil28@state.gov",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "se",
      order: 906,
      totalSpent: 620.57,
      avatar: avatar10
    },
    {
      id: 82,
      customer: "Hagen Digance",
      customerId: 864064,
      email: "hdigance29@odnoklassniki.ru",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 519,
      totalSpent: 332.44,
      avatar: avatar11
    },
    {
      id: 83,
      customer: "Kristo Wagstaff",
      customerId: 550008,
      email: "kwagstaff2a@fotki.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 313,
      totalSpent: 2481.6,
      avatar: avatar12
    },
    {
      id: 84,
      customer: "Gibbie Dysert",
      customerId: 778429,
      email: "gdysert2b@so-net.ne.jp",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "ni",
      order: 623,
      totalSpent: 8466.96,
      avatar: avatar13
    },
    {
      id: 85,
      customer: "Michale Britton",
      customerId: 158581,
      email: "mbritton2c@cloudflare.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 835,
      totalSpent: 9048.31,
      avatar: avatar14
    },
    {
      id: 86,
      customer: "Hiram Hoys",
      customerId: 747948,
      email: "hhoys2d@msn.com",
      country: "India",
      countryFlag: inFlag,
      countryCode: "eg",
      order: 361,
      totalSpent: 9159.23,
      avatar: avatar15
    },
    {
      id: 87,
      customer: "Tobin Bassick",
      customerId: 165827,
      email: "tbassick2e@quantcast.com",
      country: "India",
      countryFlag: inFlag,
      countryCode: "jo",
      order: 527,
      totalSpent: 9289.92,
      avatar: avatar1$8
    },
    {
      id: 88,
      customer: "Mikol Caskey",
      customerId: 533641,
      email: "mcaskey2f@facebook.com",
      country: "India",
      countryFlag: inFlag,
      countryCode: "in",
      order: 25,
      totalSpent: 4920.68,
      avatar: avatar2$8
    },
    {
      id: 89,
      customer: "Cris Donkersley",
      customerId: 997638,
      email: "cdonkersley2g@utexas.edu",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 404,
      totalSpent: 7369.58,
      avatar: avatar3$7
    },
    {
      id: 90,
      customer: "Valenka Turbill",
      customerId: 179914,
      email: "vturbill2h@nbcnews.com",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "tm",
      order: 550,
      totalSpent: 9083.15,
      avatar: avatar4$6
    },
    {
      id: 91,
      customer: "Cherice Fairclough",
      customerId: 467280,
      email: "cfairclough2i@csmonitor.com",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "us",
      order: 792,
      totalSpent: 2634.36,
      avatar: avatar5$6
    },
    {
      id: 92,
      customer: "Lauritz Ramble",
      customerId: 140146,
      email: "lramble2j@discuz.net",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "ru",
      order: 605,
      totalSpent: 9381.83,
      avatar: avatar6$6
    },
    {
      id: 93,
      customer: "Goddard Fosher",
      customerId: 398102,
      email: "gfosher2k@example.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 892,
      totalSpent: 3957.06,
      avatar: avatar7$5
    },
    {
      id: 94,
      customer: "Darby Leming",
      customerId: 178939,
      email: "dleming2l@paginegialle.it",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "pl",
      order: 894,
      totalSpent: 1450.01,
      avatar: avatar11
    },
    {
      id: 95,
      customer: "Paulie Floch",
      customerId: 855358,
      email: "pfloch2m@cnet.com",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 866,
      totalSpent: 8713.73,
      avatar: avatar12
    },
    {
      id: 96,
      customer: "Raffaello Reaney",
      customerId: 533341,
      email: "rreaney2n@mlb.com",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "cn",
      order: 145,
      totalSpent: 8589.4,
      avatar: avatar13
    },
    {
      id: 97,
      customer: "Inger Weadick",
      customerId: 902643,
      email: "iweadick2o@unesco.org",
      country: "United States",
      countryFlag: usFlag,
      countryCode: "id",
      order: 766,
      totalSpent: 7119.15,
      avatar: avatar14
    },
    {
      id: 98,
      customer: "Brooke Tegler",
      customerId: 137230,
      email: "btegler2p@state.tx.us",
      country: "Australia",
      countryFlag: auFlag,
      countryCode: "kp",
      order: 70,
      totalSpent: 4403.22,
      avatar: avatar15
    },
    {
      id: 99,
      customer: "Erny Picard",
      customerId: 960955,
      email: "epicard2q@lycos.com",
      country: "France",
      countryFlag: frFlag,
      countryCode: "cz",
      order: 471,
      totalSpent: 7696.67,
      avatar: avatar1$8
    },
    {
      id: 100,
      customer: "Manon Fossick",
      customerId: 478426,
      email: "mfossick2r@hatena.ne.jp",
      country: "China",
      countryFlag: cnFlag,
      countryCode: "jp",
      order: 181,
      totalSpent: 2838.35,
      avatar: avatar15
    }
  ]
};

const _id__get$6 = defineEventHandler((event) => {
  const customerId = getIntId(event, "Customer id is required to get customer details");
  const id = Number(customerId);
  const customerIndex = db$a.customerData.findIndex((e) => e.customerId === id);
  const customer = db$a.customerData[customerIndex];
  Object.assign(customer, {
    status: "Active",
    contact: "+1 (234) 567 890"
  });
  if (customer)
    return customer;
  else
    setResponseStatus(event, 404);
});

const _id__get$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$6
});

const index_get$o = defineEventHandler((event) => {
  const { q = "", page = 1, itemsPerPage = 10, sortBy, orderBy } = getQuery$1(event);
  const parsedSortBy = destr$1(sortBy);
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : "";
  const parsedOrderBy = destr$1(orderBy);
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : "";
  const parsedItemsPerPage = destr$1(itemsPerPage);
  const parsedPage = destr$1(page);
  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10;
  const pageLocal = is.number(parsedPage) ? parsedPage : 1;
  const searchQuery = is.string(q) ? q : void 0;
  const queryLowered = (searchQuery != null ? searchQuery : "").toString().toLowerCase();
  const filteredCustomers = db$a.customerData.filter((customer) => {
    return customer.customer.toLowerCase().includes(queryLowered) || customer.country.toLowerCase().includes(queryLowered) || customer.email.toLowerCase().includes(queryLowered);
  }).reverse();
  if (sortByLocal) {
    if (sortByLocal === "customer") {
      filteredCustomers.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.customer.localeCompare(b.customer);
        return b.customer.localeCompare(a.customer);
      });
    }
    if (sortByLocal === "country") {
      filteredCustomers.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.country.localeCompare(b.country);
        return b.country.localeCompare(a.country);
      });
    }
    if (sortByLocal === "customerId") {
      filteredCustomers.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.customerId - b.customerId;
        return b.customerId - a.customerId;
      });
    }
    if (sortByLocal === "orders") {
      filteredCustomers.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.order - b.order;
        return b.order - a.order;
      });
    }
    if (sortByLocal === "totalSpent") {
      filteredCustomers.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.totalSpent - b.totalSpent;
        return b.totalSpent - a.totalSpent;
      });
    }
  }
  return { customers: paginateArray(filteredCustomers, itemsPerPageLocal, pageLocal), total: filteredCustomers.length };
});

const index_get$p = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$o
});

const _id__delete$c = defineEventHandler((event) => {
  const orderId = getIntId(event, "Order id is required to get order details");
  const id = Number(orderId);
  const orderIndex = db$a.orderData.findIndex((e) => e.id === id);
  if (orderIndex >= 0) {
    db$a.orderData.splice(orderIndex, 1);
    setResponseStatus(event, 204);
    return null;
  }
  setResponseStatus(event, 204);
});

const _id__delete$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$c
});

const _id__get$4 = defineEventHandler((event) => {
  const orderId = getIntId(event, "Customer id is required to get customer details");
  const id = Number(orderId);
  try {
    const order = db$a.orderData.find((e) => e.order === id);
    if (order)
      setResponseStatus(event, 200);
    return order;
  } catch (error) {
    setResponseStatus(event, 404);
  }
});

const _id__get$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$4
});

const index_get$m = defineEventHandler((event) => {
  const { q = "", sortBy, orderBy, page = 1, itemsPerPage = 10 } = getQuery$1(event);
  const searchQuery = is.string(q) ? q : void 0;
  const queryLower = (searchQuery != null ? searchQuery : "").toString().toLowerCase();
  const parsedSortBy = destr$1(sortBy);
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : "";
  const parsedOrderBy = destr$1(orderBy);
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : "";
  const parsedItemsPerPage = destr$1(itemsPerPage);
  const parsedPage = destr$1(page);
  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10;
  const pageLocal = is.number(parsedPage) ? parsedPage : 1;
  const filterOrders = db$a.orderData.filter((order) => {
    return order.customer.toLowerCase().includes(queryLower) || order.email.toLowerCase().includes(queryLower) || order.order.toString().includes(queryLower);
  }).reverse();
  if (sortByLocal) {
    if (sortByLocal === "order") {
      filterOrders.sort((a, b) => {
        if (orderByLocal === "desc")
          return b.order - a.order;
        else
          return a.order - b.order;
      });
    }
    if (sortByLocal === "customers") {
      filterOrders.sort((a, b) => {
        if (orderByLocal === "desc")
          return b.customer.localeCompare(a.customer);
        else
          return a.customer.localeCompare(b.customer);
      });
    }
    if (sortByLocal === "date") {
      filterOrders.sort((a, b) => {
        if (orderByLocal === "desc")
          return Number(new Date(b.date)) - Number(new Date(a.date));
        else
          return Number(new Date(a.date)) - Number(new Date(b.date));
      });
    }
    if (sortByLocal === "status") {
      filterOrders.sort((a, b) => {
        if (orderByLocal === "desc")
          return b.status.localeCompare(a.status);
        else
          return a.status.localeCompare(b.status);
      });
    }
    if (sortByLocal === "spent") {
      filterOrders.sort((a, b) => {
        if (orderByLocal === "desc")
          return Number(b.spent) - Number(a.spent);
        else
          return Number(a.spent) - Number(b.spent);
      });
    }
  }
  return { orders: paginateArray(filterOrders, itemsPerPageLocal, pageLocal), total: filterOrders.length };
});

const index_get$n = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$m
});

const _id__delete$a = defineEventHandler((event) => {
  const productId = getIntId(event, "Product id is required to delete product");
  const id = Number(productId);
  const productIndex = db$a.products.findIndex((e) => e.id === id);
  if (productIndex >= 0) {
    db$a.products.splice(productIndex, 1);
    setResponseStatus(event, 204);
    return null;
  }
  setResponseStatus(event, 204);
});

const _id__delete$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$a
});

const index_get$k = defineEventHandler((event) => {
  const { q = "", stock = null, category = null, status = null, sortBy, orderBy, itemsPerPage = 10, page = 1 } = getQuery$1(event);
  const searchQuery = is.string(q) ? q : void 0;
  const queryLower = (searchQuery != null ? searchQuery : "").toString().toLowerCase();
  const parsedStock = destr$1(stock);
  const stockLocal = is.boolean(parsedStock) ? parsedStock : void 0;
  const parsedSortBy = destr$1(sortBy);
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : "";
  const parsedOrderBy = destr$1(orderBy);
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : "";
  const parsedItemsPerPage = destr$1(itemsPerPage);
  const parsedPage = destr$1(page);
  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10;
  const pageLocal = is.number(parsedPage) ? parsedPage : 1;
  let filteredProducts = db$a.products.filter((product) => (product.productName.toLowerCase().includes(queryLower) || product.productBrand.toLowerCase().includes(queryLower)) && product.category === (category || product.category) && product.status === (status || product.status) && (typeof stockLocal === "undefined" ? true : product.stock === stockLocal)).reverse();
  if (sortByLocal) {
    if (sortByLocal === "product") {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.productName.toLowerCase() > b.productName.toLowerCase() ? 1 : -1;
        else if (orderByLocal === "desc")
          return a.productName.toLowerCase() < b.productName.toLowerCase() ? 1 : -1;
        return 0;
      });
    }
    if (sortByLocal === "category") {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.category > b.category ? 1 : -1;
        else if (orderByLocal === "desc")
          return a.category < b.category ? 1 : -1;
        return 0;
      });
    }
    if (sortByLocal === "status") {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.status > b.status ? 1 : -1;
        else if (orderByLocal === "desc")
          return a.status < b.status ? 1 : -1;
        return 0;
      });
    }
    if (sortByLocal === "price") {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === "asc")
          return Number(a.price.slice(1)) > Number(b.price.slice(1)) ? 1 : -1;
        else if (orderByLocal === "desc")
          return Number(a.price.slice(1)) < Number(b.price.slice(1)) ? 1 : -1;
        return 0;
      });
    }
    if (sortByLocal === "qty") {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.qty > b.qty ? 1 : -1;
        else if (orderByLocal === "desc")
          return a.qty < b.qty ? 1 : -1;
        return 0;
      });
    }
    if (sortByLocal === "sku") {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.sku > b.sku ? 1 : -1;
        else if (orderByLocal === "desc")
          return a.sku < b.sku ? 1 : -1;
        return 0;
      });
    }
  }
  return { products: paginateArray(filteredProducts, itemsPerPageLocal, pageLocal), total: filteredProducts.length };
});

const index_get$l = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$k
});

const index_get$i = defineEventHandler((event) => {
  const { sortBy, itemsPerPage = 10, page = 1, orderBy } = getQuery$1(event);
  const parsedSortBy = destr$1(sortBy);
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : "";
  const parsedOrderBy = destr$1(orderBy);
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : "";
  const parsedItemsPerPage = destr$1(itemsPerPage);
  const parsedPage = destr$1(page);
  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10;
  const pageLocal = is.number(parsedPage) ? parsedPage : 1;
  const filteredReferrals = db$a.referrals;
  if (sortByLocal) {
    if (sortByLocal === "users") {
      filteredReferrals.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.user.toLowerCase() > b.user.toLowerCase() ? 1 : -1;
        else if (orderByLocal === "desc")
          return a.user.toLowerCase() < b.user.toLowerCase() ? 1 : -1;
        return 0;
      });
    }
    if (sortByLocal === "referred-id") {
      filteredReferrals.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.referredId - b.referredId;
        else if (orderByLocal === "desc")
          return b.referredId - a.referredId;
        return 0;
      });
    }
    if (sortByLocal === "earning") {
      filteredReferrals.sort((a, b) => {
        if (orderByLocal === "asc")
          return Number(a.earning.slice(1)) - Number(b.earning.slice(1));
        else if (orderByLocal === "desc")
          return Number(b.earning.slice(1)) - Number(a.earning.slice(1));
        return 0;
      });
    }
  }
  return { referrals: paginateArray(filteredReferrals, itemsPerPageLocal, pageLocal), total: filteredReferrals.length };
});

const index_get$j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$i
});

const _id__delete$8 = defineEventHandler((event) => {
  const reviewId = getIntId(event, "Review id is required to get review details");
  const id = Number(reviewId);
  const reviewIndex = db$a.reviews.findIndex((e) => e.id === id);
  if (reviewIndex >= 0) {
    db$a.reviews.splice(reviewIndex, 1);
    setResponseStatus(event, 204);
    return null;
  }
  setResponseStatus(event, 204);
});

const _id__delete$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$8
});

const index_get$g = defineEventHandler((event) => {
  const { q = "", sortBy, orderBy, itemsPerPage = 10, page = 1, status } = getQuery$1(event);
  const parsedSortBy = destr$1(sortBy);
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : "";
  const parsedStatus = destr$1(status);
  const parsedOrderBy = destr$1(orderBy);
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : "";
  const parsedItemsPerPage = destr$1(itemsPerPage);
  const parsedPage = destr$1(page);
  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10;
  const pageLocal = is.number(parsedPage) ? parsedPage : 1;
  const searchQuery = is.string(q) ? q : void 0;
  const queryLower = (searchQuery != null ? searchQuery : "").toString().toLowerCase();
  const filteredReviews = db$a.reviews.filter((review) => {
    const { product, reviewer, email } = review;
    return (product.toLowerCase().includes(queryLower) || reviewer.toLowerCase().includes(queryLower) || email.toLowerCase().includes(queryLower) || review.head.toLowerCase().includes(queryLower) || review.para.toLowerCase().includes(queryLower)) && (review.status === parsedStatus || status === "All");
  });
  if (sortByLocal) {
    if (sortByLocal === "product") {
      filteredReviews.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.product.toLowerCase() > b.product.toLowerCase() ? 1 : -1;
        else if (orderByLocal === "desc")
          return a.product.toLowerCase() < b.product.toLowerCase() ? 1 : -1;
        return 0;
      });
    }
    if (sortByLocal === "reviewer") {
      filteredReviews.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.reviewer.toLowerCase() > b.reviewer.toLowerCase() ? 1 : -1;
        else if (orderByLocal === "desc")
          return a.reviewer.toLowerCase() < b.reviewer.toLowerCase() ? 1 : -1;
        return 0;
      });
    }
    if (sortByLocal === "date") {
      filteredReviews.sort((a, b) => {
        if (orderByLocal === "desc")
          return Number(new Date(b.date)) - Number(new Date(a.date));
        else if (orderByLocal === "asc")
          return Number(new Date(a.date)) - Number(new Date(b.date));
        return 0;
      });
    }
  }
  if (sortByLocal === "status") {
    filteredReviews.sort((a, b) => {
      if (orderByLocal === "asc")
        return a.status.toLowerCase() > b.status.toLowerCase() ? 1 : -1;
      else if (orderByLocal === "desc")
        return a.status.toLowerCase() < b.status.toLowerCase() ? 1 : -1;
      else
        return 0;
    });
  }
  return { reviews: paginateArray(filteredReviews, itemsPerPageLocal, pageLocal), total: filteredReviews.length };
});

const index_get$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$g
});

const avatar1$7 = getPublicUrl("/images/avatars/avatar-1.png");
const avatar2$7 = getPublicUrl("/images/avatars/avatar-2.png");
const avatar3$6 = getPublicUrl("/images/avatars/avatar-3.png");
const avatar4$5 = getPublicUrl("/images/avatars/avatar-4.png");
const avatar5$5 = getPublicUrl("/images/avatars/avatar-5.png");
const avatar6$5 = getPublicUrl("/images/avatars/avatar-6.png");
const avatar7$4 = getPublicUrl("/images/avatars/avatar-7.png");
const avatar8$4 = getPublicUrl("/images/avatars/avatar-8.png");
const txt = getPublicUrl("/images/icons/file/txt.png");
const xls = getPublicUrl("/images/icons/file/xls.png");
const db$9 = {
  emails: [
    {
      id: 50,
      to: [
        {
          email: "johndoe@mail.com",
          name: "me"
        }
      ],
      from: {
        email: "james25@gmail.com",
        name: "Katie Brandt",
        avatar: avatar8$4
      },
      subject: "Bring smile discussion same boy include care.",
      cc: [],
      bcc: [],
      message: "<p>Guy national course pay small per. Commercial research lose key fight marriage. Young series raise degree foot degree detail number.\nCrime gas real pass white. Television success east.</p><p>Into miss knowledge result. Seat carry tax beat line. Amount language paper machine fly.\nMusic several common former. More mouth year site move hold. Billion material born news western late.</p><p>World them term identify. Rule southern condition thought. Article successful traditional friend.\nPhone financial skill theory.\nChange Mr experience. Everyone help structure much family.\nVoice general group likely.</p>",
      attachments: [
        {
          fileName: "log.txt",
          thumbnail: txt,
          url: "",
          size: "5mb"
        },
        {
          fileName: "performance.xls",
          thumbnail: xls,
          url: "",
          size: "10mb"
        }
      ],
      isStarred: true,
      labels: ["private", "company"],
      time: "2021-07-14T12:42:22",
      replies: [],
      folder: "inbox",
      isRead: true,
      isDeleted: false
    },
    {
      id: 49,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "jamesskinner@hotmail.com",
        name: "Joshua Cline",
        avatar: avatar1$7
      },
      subject: "Magazine say side view.",
      cc: [],
      bcc: [],
      message: "<p>Campaign even order for color. Remember card return position white argue prepare. Case fill follow then condition investment why.\nCold son pattern wife. Child name interest company thought every federal. He catch daughter design.</p><p>Affect customer a. Which difficult science.\nReality whether what animal. Call report author against season heart.\nCatch have always source response your even. Person mother whether since clearly. Cut staff work the nothing.</p><p>Cell cover along school. Method option not why laugh. Nation medical thousand world rule.\nEvening fish rich sense create. Civil family particularly day machine free read. Interesting capital owner international nor condition.</p>",
      attachments: [],
      isStarred: false,
      labels: ["personal"],
      time: "2021-07-16T01:23:14",
      replies: [
        {
          id: 74474,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "teresa54@gmail.com",
            name: "Brittany Young",
            avatar: avatar2$7
          },
          subject: "The beat save none make sea large number.",
          cc: [],
          bcc: [],
          message: "<p>College before employee recognize. Teach central this interest service party section. Floor west break bit suggest ok everyone.\n Pm quality school out form. Want case town individual.</p><p>Hundred a modern career whose know find responsibility. East option trouble next. Sport goal after race pull political common board.</p><p>Beat support exactly material fact benefit six. Time represent stuff forget plant pass team. Begin lot war field simple.\nBuilding development wear trip marriage. Economy speech be election arrive color next.</p>",
          attachments: [],
          isStarred: false,
          labels: ["company", "private", "personal", "important"],
          time: "2021-07-21T18:43:19",
          replies: [],
          folder: "inbox",
          isRead: false,
          isDeleted: false
        },
        {
          id: 766,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "angelajimenez@yahoo.com",
            name: "Emily Moore",
            avatar: avatar8$4
          },
          subject: "Movement along college bad reality scientist.",
          cc: [],
          bcc: [],
          message: "<p>Goal reveal past rule arrive project performance. Learn despite the way. Operation within suggest glass beautiful always really.\nLanguage although cut network conference economy long. Forward us point meet. Sing buy central quality science.</p><p>Real keep material wind drive life. Job election to determine table within expert art.\nOften ten ask city. Memory to run market.\nMove theory contain good fire. Area walk position site would.</p><p>Seem response base question tough consumer another. Sit hard deep child operation institution. Charge child picture different sense.\nMedia remain could go eight different west. Thousand fly box else.</p>",
          attachments: [],
          isStarred: true,
          labels: ["personal"],
          time: "2021-07-07T22:12:32",
          replies: [],
          folder: "spam",
          isRead: true,
          isDeleted: false
        },
        {
          id: 3718436,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "alexanderpatel@yahoo.com",
            name: "Andrew Cruz",
            avatar: avatar7$4
          },
          subject: "Realize agree dark spring suddenly maintain level history.",
          cc: [],
          bcc: [],
          message: "<p>Actually and them time itself newspaper stand. Billion Republican manager little hot store. Pull issue many close by large seven.\nIt writer will concern community rate through factor. Reduce south director budget shake return.</p><p>Score event since campaign single conference significant. Design fall teacher.\nWhich themselves along that themselves activity.\nUntil nothing cold toward politics product. Rock enter in what option.</p><p>Relate authority agency claim protect. Task not wait respond week hotel.\nAt catch matter try boy why white physical. Section protect try kind few. Skin two author style.\nWestern simple instead strategy mention item suffer. Remain agree account.</p>",
          attachments: [],
          isStarred: true,
          labels: ["company", "private"],
          time: "2021-07-18T19:27:18",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: true
        }
      ],
      folder: "inbox",
      isRead: true,
      isDeleted: true
    },
    {
      id: 48,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "williamsstacey@yahoo.com",
        name: "Jonathan Walker",
        avatar: avatar1$7
      },
      subject: "Then until task something before color impact now.",
      cc: [],
      bcc: [],
      message: "<p>Head claim property experience arm remain structure. Worry do science look oil easy. His whose want.\nHuge protect foot save century somebody future. Skin building truth along sing such read speech.\nRaise argue everything send.</p><p>While attorney to power card. Agent card big nothing. Wall behavior investment stay relate stage their. Carry full rather product arrive center when.</p><p>Law chance mention sound maintain expect whose. Treatment simply if power decide bar. Theory building laugh hand manager condition true.\nFoot few eat store environment that involve man. Into report player writer yourself.</p>",
      attachments: [],
      isStarred: false,
      labels: ["company", "private", "important"],
      time: "2021-07-22T09:59:40",
      replies: [],
      folder: "inbox",
      isRead: true,
      isDeleted: true
    },
    {
      id: 47,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "lori82@gmail.com", name: "Kevin Evans", avatar: avatar7$4 },
      subject: "Shoulder science point show human black answer anything.",
      cc: [],
      bcc: [],
      message: "<p>Rate church step beat head class nor.\nLeg ten offer girl me teach. Quite could within. Bill civil situation to.\nDifference unit tax garden. Fine cause political center her. Design look free treat item ball.</p><p>Also night argue I explain time practice.\nCommercial example reveal window try door great material. Wear data loss. Visit prove either catch will.</p><p>Show young century between box. Statement go guess bad film.\nIdea voice by audience meet everyone next prove. Art leader minute build.</p>",
      attachments: [],
      isStarred: true,
      labels: ["personal"],
      time: "2021-07-09T15:02:15",
      replies: [],
      folder: "draft",
      isRead: true,
      isDeleted: false
    },
    {
      id: 46,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "crussell@hotmail.com", name: "Alexa Burnett", avatar: avatar4$5 },
      subject: "Want manager source car recognize character impact.",
      cc: [],
      bcc: [],
      message: "<p>Mr attorney role meeting enter.\nMajor serve night often. Region current nation.\nHear each knowledge today. Church positive let anyone hospital member difficult color. Product difference such sea view senior.</p><p>Home require nor material current. State probably customer size soldier music site.\nSeveral east when miss partner language hotel ask. She hold turn. Century general study radio.</p><p>Old community prevent. Subject minute song sport.\nCover woman born decision agree center cold.</p>",
      attachments: [],
      isStarred: false,
      labels: ["personal"],
      time: "2021-07-09T06:52:08",
      replies: [],
      folder: "draft",
      isRead: true,
      isDeleted: false
    },
    {
      id: 45,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "kkim@yahoo.com", name: "Dominique Paul", avatar: avatar4$5 },
      subject: "Level within enjoy baby.",
      cc: [],
      bcc: [],
      message: "<p>Opportunity meet author table pressure leader. Owner never investment recent nearly before. Whom ask road.\nBody attorney clear program tonight current. Name watch school hard fly.</p><p>People crime window talk. Cell should third have sit would.\nOccur hit take.\nFact go system really entire common. Fast organization could themselves continue. End ahead rather.</p><p>Action quickly hundred movie choice. Nice yes lose two. Stay practice section onto some firm little Republican.\nLarge fast politics what. Common price speak sign particularly answer. You simply certain which direction.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important", "personal"],
      time: "2021-07-15T14:59:01",
      replies: [
        {
          id: 781,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "amyconner@hotmail.com",
            name: "Michael Martinez",
            avatar: avatar3$6
          },
          subject: "Recent seek particularly seem southern charge.",
          cc: [],
          bcc: [],
          message: "<p>Accept his citizen again anyone. Claim process watch.\nSeven court there. Local author line would real machine officer.\nPlant just benefit operation. Similar soldier wrong part hospital action drive.</p><p>Before throw enough goal different. Doctor remain Mrs political staff.\nSeem successful why check after best pass. Degree because prove church move center space often.</p><p>Might trade cell guess institution. Difference win again.\nCulture life car agency improve you. Thing also hold child apply south box appear. Education itself effort their.\nFast save pull deal his talk issue. Fall sport better step.</p>",
          attachments: [],
          isStarred: true,
          labels: ["important", "personal"],
          time: "2021-07-14T21:30:32",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: false
        },
        {
          id: 6933053,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "ivanguerrero@yahoo.com",
            name: "Ashley Fuller",
            avatar: avatar4$5
          },
          subject: "Difference owner claim student site property would.",
          cc: [],
          bcc: [],
          message: "<p>Hour town against move difference scene cause walk.\nAgreement bag accept society story generation.\nLike process floor lose.\nStop think work off once. Billion institution anyone stuff determine federal attention.</p><p>Notice ever same tonight away performance role increase. Continue best same candidate expect look. Feeling church whole case risk town boy language.\nManage may send rate among. Physical law risk final source. Matter star ago or at possible.</p><p>Hotel I energy piece drop. Learn southern by maintain often evening.\nLate rise husband top skin memory lot.\nTest compare strategy father. Everyone few actually this again minute become.</p>",
          attachments: [],
          isStarred: false,
          labels: ["private"],
          time: "2021-07-11T10:46:10",
          replies: [],
          folder: "draft",
          isRead: false,
          isDeleted: false
        },
        {
          id: 8,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: { email: "lmoreno@yahoo.com", name: "Ashley Lewis", avatar: avatar4$5 },
          subject: "Candidate available material away.",
          cc: [],
          bcc: [],
          message: "<p>Ten spend paper. Trial certain those. Make middle campaign might.\nEffect well accept great wall.\nSeem your at small. So his serious high center political man.</p><p>Guess staff argue ready trade whole including. Science four skill best level interesting prevent. Mind he recent another point understand.\nAsk daughter specific hot without body challenge. Official threat pretty left bar check believe bit.</p><p>Trouble result receive political.\nAvailable knowledge increase. Dog computer ability prove paper. Scientist either color capital fall do.\nShoulder bar small. Those thank beyond sea piece.</p>",
          attachments: [],
          isStarred: false,
          labels: ["important", "personal"],
          time: "2021-07-02T03:06:42",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: false
        },
        {
          id: 784835803,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: { email: "mortiz@gmail.com", name: "Bradley Hobbs", avatar: avatar7$4 },
          subject: "Tend picture church team place show society.",
          cc: [],
          bcc: [],
          message: "<p>Republican risk window. Different speak prove college from push main.\nRegion experience field wind get choose. Away drug professional memory. Nation still best fact forget election smile. Sure ready security office question.</p><p>Appear civil appear movie space.\nAmount rule meet wide exactly theory be. Pretty Republican material human that. Page war fear pay.\nAgree fall investment red nothing go also. Expect join against threat and.</p><p>Serve writer leader room.\nPurpose high west lose firm. Mouth between myself get upon avoid power low.\nSurface particular be main yeah. Huge parent morning continue research.</p>",
          attachments: [],
          isStarred: false,
          labels: ["personal", "private", "important"],
          time: "2021-07-04T08:11:01",
          replies: [],
          folder: "draft",
          isRead: true,
          isDeleted: false
        }
      ],
      folder: "draft",
      isRead: true,
      isDeleted: false
    },
    {
      id: 44,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "ethan27@gmail.com", name: "Daniel Sullivan", avatar: avatar7$4 },
      subject: "Choose security yes relationship recognize consumer democratic international.",
      cc: [],
      bcc: [],
      message: "<p>Person whom reflect prove show.\nBreak exist which prepare. Collection she population understand result business ability site.\nFact figure recent population condition. What west grow food space former.</p><p>Individual catch management her skin bag specific. Order base project under. Minute watch continue relationship state continue this store.</p><p>Recent cut organization machine.\nEnter today growth five interest some. Million official middle space return. Second cold available seven behind protect owner.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important", "personal"],
      time: "2021-07-12T02:53:08",
      replies: [
        {
          id: 23853,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "hubbardsharon@hotmail.com",
            name: "Laura Dominguez",
            avatar: avatar8$4
          },
          subject: "Daughter skill fact rise nice power.",
          cc: [],
          bcc: [],
          message: "<p>Concern enter model team want admit detail far. West TV themselves short friend agreement service.\nAccording toward free upon draw family state. Account or action president piece.\nCause part fight second. Natural international mean.</p><p>Lay nearly center hear ten season officer water. Pattern loss window follow sure line.\nGlass analysis seat have. Ok budget among moment sing four.</p><p>Product now material play pick deal determine suffer. Most second region represent.\nRich reduce evidence home nothing yeah pressure. Rule play between fast wrong place.\nEvidence color anything because. Wall start manage style central charge beyond.</p>",
          attachments: [],
          isStarred: false,
          labels: ["company", "important"],
          time: "2021-07-12T20:13:42",
          replies: [],
          folder: "spam",
          isRead: false,
          isDeleted: false
        },
        {
          id: 317,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "jameslopez@yahoo.com",
            name: "Christopher Farrell",
            avatar: avatar3$6
          },
          subject: "Character fall follow.",
          cc: [],
          bcc: [],
          message: "<p>Hope bar civil. Final design section those.\nBrother sit many receive vote read large. Reflect evening man realize detail. Party yeah factor never guy.\nSouthern movement everything. Play although movie effect space front.</p><p>Front first say interesting million force issue so. Enjoy least Democrat strong dark. Parent business bill surface arrive daughter.\nUntil home successful might capital. Nearly issue free customer. Carry matter executive country human shake.</p><p>Key do choose however.\nDiscuss each police modern. Apply method speech population participant.</p>",
          attachments: [],
          isStarred: true,
          labels: ["personal"],
          time: "2021-07-22T15:28:46",
          replies: [],
          folder: "draft",
          isRead: true,
          isDeleted: false
        }
      ],
      folder: "inbox",
      isRead: true,
      isDeleted: true
    },
    {
      id: 43,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "rmartin@gmail.com", name: "Nicole Allen", avatar: avatar4$5 },
      subject: "Ten store nature surface that seek black return.",
      cc: [],
      bcc: [],
      message: "<p>Recognize section different ground million. Source court seek street.\nScience thank two capital shoulder herself certainly. Individual hair general manager why.</p><p>Live hear lawyer quickly player system. American spend ok beautiful. Shoulder drug itself wrong partner event.\nInclude account water success political. Newspaper quality really road. Short maintain raise appear.</p><p>Move cultural others protect season he future. Argue glass loss whether available size apply government.\nFood hand night particular. Change few key would thus.\nGreen talk to improve miss.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important"],
      time: "2021-07-27T07:21:36",
      replies: [],
      folder: "spam",
      isRead: true,
      isDeleted: false
    },
    {
      id: 42,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "adkinsryan@yahoo.com", name: "Karen Russell", avatar: avatar6$5 },
      subject: "Along represent responsibility security he leg.",
      cc: [],
      bcc: [],
      message: "<p>Explain through thought forward daughter entire. Investment direction great writer thus blue provide.\nPersonal she community phone same. Remain religious meeting. Data personal meeting agreement style. Next time build.</p><p>Avoid board beautiful strong effect. We star fight quality stay sense soldier. Her social month. System professional social.\nYoung back including benefit position plan just. Line history sometimes check need remain make.</p><p>Radio should magazine yard ahead then. Student knowledge cover general use though.\nEnergy agree away team. Power whose music sort between man analysis. Boy election value.\nClearly law avoid dream. Would around role third seek world present.</p>",
      attachments: [],
      isStarred: false,
      labels: ["personal"],
      time: "2021-07-02T20:02:30",
      replies: [
        {
          id: 82117976,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "oblack@hotmail.com",
            name: "Michael Mccarthy",
            avatar: avatar3$6
          },
          subject: "Around impact point interest method.",
          cc: [],
          bcc: [],
          message: "<p>Blood power job common. Spring success arm article. Continue manager blue new enough business six difference.\nMe finish pick energy wear him home. If affect ready east. Light enter speech many off day answer.</p><p>Quality consider statement building suddenly poor. Indeed because image month charge pressure lawyer. Color lot subject leg.\nUs cold everybody clearly evening ago apply. Run between pull. Could amount policy think second take born draw.</p><p>Rest feel forget garden tough citizen him. Sign court point recent.\nClaim wide chair plant. Smile build everyone politics run.\nFactor trip personal.</p>",
          attachments: [],
          isStarred: false,
          labels: ["private", "important", "company"],
          time: "2021-07-04T15:30:03",
          replies: [],
          folder: "draft",
          isRead: true,
          isDeleted: false
        },
        {
          id: 3151,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "zjackson@hotmail.com",
            name: "Don Stewart",
            avatar: avatar7$4
          },
          subject: "Nation campaign still never church politics business.",
          cc: [],
          bcc: [],
          message: "<p>Leg simple region out compare include wide. Simply kid away person training how. Answer laugh build attention cell authority be.\nPolitical citizen soldier record score green consider. Catch result traditional debate subject finally security.</p><p>Model seek stand fish three. View might space.\nSection receive fire town prepare public camera order. Sometimes nice another realize level. Shake fill institution forward author matter same.</p><p>Too home after lay senior. Result agree strong finish should easy onto agreement. Size PM usually war recent raise tend use.\nWork section story six billion. Long would add film middle financial third. Citizen up debate room owner deal.</p>",
          attachments: [],
          isStarred: false,
          labels: ["private", "company"],
          time: "2021-07-08T17:55:49",
          replies: [],
          folder: "spam",
          isRead: true,
          isDeleted: false
        },
        {
          id: 600,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: { email: "mary98@yahoo.com", name: "Dana Harvey", avatar: avatar2$7 },
          subject: "Both community term run maybe sort per.",
          cc: [],
          bcc: [],
          message: "<p>Watch great himself all. Court such building kid from region. Reveal team poor lawyer theory listen.\nSon participant very better. Bed city dog sign.\nBall despite player whatever whatever opportunity. Training social kitchen blood fly.</p><p>May hit expert last. Attention opportunity shoulder. Agency federal just candidate study long.\nNotice first work full write recognize probably. Once writer common low last.</p><p>Hour about entire material. Various from subject military read safe seat. Truth third spend hair role home. Any herself analysis pay.\nGame get class ever enter once its. Job street student ok.</p>",
          attachments: [],
          isStarred: true,
          labels: ["important", "private", "personal", "company"],
          time: "2021-07-27T16:48:17",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: true
        },
        {
          id: 23080678,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "ppineda@yahoo.com",
            name: "Samantha Martin",
            avatar: avatar4$5
          },
          subject: "Whether far ready success yes many window.",
          cc: [],
          bcc: [],
          message: "<p>Cause have like. Unit nearly view feeling arrive player. Nor officer she production fly nice begin value.\nBehavior trade focus any. Or economy information class blue school structure everything. Production white although her total natural space.</p><p>Recognize section and tend. Understand box option agency event drive window. Child himself during statement financial under. Drug daughter attention magazine window go red.</p><p>Because drop measure I significant. Fall type us a staff wind court. Student discuss pattern way.\nPlan should book. Lead decide radio ok foreign behavior bit style.\nHundred no dream smile. Whose put indeed medical.</p>",
          attachments: [],
          isStarred: true,
          labels: ["personal", "company"],
          time: "2021-07-04T13:28:16",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: true
        }
      ],
      folder: "inbox",
      isRead: true,
      isDeleted: true
    },
    {
      id: 41,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "julie16@yahoo.com", name: "Tyler Hernandez", avatar: avatar3$6 },
      subject: "Environment success however window student.",
      cc: [],
      bcc: [],
      message: "<p>While million social ball surface in late.\nBudget though five so fund purpose.\nBall understand effect teach. Find charge rich child. Do require laugh everybody interesting.</p><p>Season south town performance whole political thought box. Management try just president. Finish fish strong teach enter ahead.\nBehind unit difference expert position two. Let before account baby cut should TV. Explain effort realize need.</p><p>Even item or environment save ten prepare activity. Nearly become current.\nBed nature indicate discussion least career perhaps. Head must sure. Why sea around buy. Audience politics sell strong career.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important", "private", "company"],
      time: "2021-07-06T01:09:02",
      replies: [],
      folder: "sent",
      isRead: true,
      isDeleted: false
    },
    {
      id: 40,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "brownsandy@gmail.com", name: "Michael Smith", avatar: avatar3$6 },
      subject: "Miss strategy want author test.",
      cc: [],
      bcc: [],
      message: "<p>Hear college professor see agent believe easy. Front test big black shoulder although. Candidate skill every player pressure.\nMany six reason allow kitchen. Respond us bank idea treat sure stuff tonight.</p><p>Nothing stay medical strategy early position maybe buy. Turn board early. Particularly then care value should material.\nSong doctor phone offer. Lawyer fear say discussion result represent. Performance back when cover effort.</p><p>Determine huge with newspaper computer focus detail trouble. Move support strong certainly.\nPopulation administration thing fund push movie democratic community. Town next wonder.</p>",
      attachments: [],
      isStarred: true,
      labels: ["private", "important"],
      time: "2021-07-05T16:18:51",
      replies: [],
      folder: "draft",
      isRead: true,
      isDeleted: false
    },
    {
      id: 39,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "marissa73@hotmail.com", name: "James Russell", avatar: avatar3$6 },
      subject: "Interview some and minute.",
      cc: [],
      bcc: [],
      message: "<p>Result last clearly should bad. Need management account other player. Time pressure beautiful teacher provide. Mouth senior explain official would exactly.</p><p>Management attack fight some item. Once century agent method section what. What their defense you. Factor civil significant enough plan different.</p><p>Body amount know condition own gas near state. Strong as black place service.\nSignificant all game. Drive assume from wear option.</p>",
      attachments: [],
      isStarred: false,
      labels: ["company", "private", "important"],
      time: "2021-07-19T05:03:32",
      replies: [],
      folder: "inbox",
      isRead: false,
      isDeleted: false
    },
    {
      id: 38,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "brendajames@hotmail.com",
        name: "Richard Spencer",
        avatar: avatar7$4
      },
      subject: "Town baby them account house save prevent.",
      cc: [],
      bcc: [],
      message: "<p>Pattern sing wrong late north.\nDeal age risk yourself mission able car defense. Choice audience determine dream spend Congress. Mrs produce everyone who bed civil.</p><p>Forget top well little door at share. Money leg recently from make will radio.</p><p>Result plant rich tonight here discussion draw during. Population play serious their bill. Reduce industry right remember attorney them too.\nFirst once over yard. Standard so low.</p>",
      attachments: [],
      isStarred: true,
      labels: ["company", "important"],
      time: "2021-07-16T20:40:12",
      replies: [
        {
          id: 1245629,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "kellyjones@yahoo.com",
            name: "Mark Martinez",
            avatar: avatar5$5
          },
          subject: "Movement risk cultural.",
          cc: [],
          bcc: [],
          message: "<p>Both statement now painting decade guess commercial. Treatment movement over idea drop house expect. Heart sense agree live amount her.\nAuthority data Mr all day stock star. By shake seem shoulder not myself order. Out concern from reach.</p><p>Me worry field three name. Mr history when across around. Garden think rate central challenge guess structure.\nCall difficult relationship house around. Water public maintain. Our myself yet personal government condition.</p><p>Themselves final admit from staff conference no. Ask certain summer set purpose. Budget cost enter town most trip. Most your keep he the power.\nTrip news couple.</p>",
          attachments: [],
          isStarred: false,
          labels: ["personal"],
          time: "2021-07-11T06:55:40",
          replies: [],
          folder: "sent",
          isRead: true,
          isDeleted: false
        },
        {
          id: 1,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "sonyamccall@hotmail.com",
            name: "Lisa Richardson",
            avatar: avatar4$5
          },
          subject: "Despite produce officer ground employee president.",
          cc: [],
          bcc: [],
          message: "<p>Understand conference debate. Among call fear away. Represent camera show job range street.\nInterview continue ahead believe subject. Himself sit them bit with bring. Oil particular represent wish home.</p><p>Your action note rise can food change. Eat claim plant accept wear film available few. Human wind security protect camera line.\nNotice deal to about truth forget every. Dark me camera where different better. Dog involve serve indicate do share for.</p><p>Sort all want oil travel need.\nBag contain hold deal individual pick believe ago. Middle oil receive close fact read. Offer often painting identify sure.\nLearn show next. Learn consider view face. Only life study near.</p>",
          attachments: [],
          isStarred: true,
          labels: ["important", "private", "company"],
          time: "2021-07-04T15:24:04",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: false
        }
      ],
      folder: "spam",
      isRead: true,
      isDeleted: false
    },
    {
      id: 37,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "juliasosa@hotmail.com", name: "Cheryl Wright", avatar: avatar6$5 },
      subject: "Movie admit final enjoy particular.",
      cc: [],
      bcc: [],
      message: "<p>Poor bad find. Report TV over long region defense.\nTwo sister according alone. Natural great before prove north assume become focus. Including work environment water poor.</p><p>Score though true evening again analysis feeling wait. Certain discover carry chance ever. Rich staff test raise discover.\nBoard federal improve bad impact eat box word. Situation blue culture environment road city soon.</p><p>Decade subject another our million or. Be stock interview easy those population maybe. Help send society. Win many team find.\nManagement about guy. Cultural resource prevent natural age tree reduce. Effect carry man.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important"],
      time: "2021-07-28T11:05:28",
      replies: [
        {
          id: 3558,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "dillon01@hotmail.com",
            name: "Brenda Navarro",
            avatar: avatar8$4
          },
          subject: "Business key Democrat sing.",
          cc: [],
          bcc: [],
          message: "<p>Meeting carry shake turn. Money because radio lawyer better. World trial view benefit result someone sort expert. American while public question.</p><p>Court ask various serious safe. Cup than hot child sort.\nSmile view issue high recently develop floor. Ten science including force message. Hear room author return risk military.</p><p>Unit vote popular collection strategy group. Newspaper region fly structure seem story art. Skill ever as money meet involve.\nAs environmental sister investment film represent. Until student occur include few science.</p>",
          attachments: [],
          isStarred: true,
          labels: ["important", "personal"],
          time: "2021-07-20T02:27:59",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: true
        },
        {
          id: 21238317,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "danielle69@yahoo.com",
            name: "Erica Miller",
            avatar: avatar2$7
          },
          subject: "Way program finish type yes then area.",
          cc: [],
          bcc: [],
          message: "<p>Project growth brother. Star capital bring.\nRange movement risk perhaps loss. Team raise card bag hit.\nParticularly last lead system within walk public perhaps. Tax travel suggest physical data company. Mrs fear establish away.</p><p>Treatment fight as foot Republican. Sister happy major I well less fish. Various goal face up. Age put head hotel style tree.\nSurface list evening this stay. Doctor stage would current. Wide audience after paper. Process yard end man future lead.</p><p>Moment push store necessary program. Have health seek. Name safe young career those agent.\nBe protect whatever skin. Read by talk we start. Might author final perform. Tv own follow wife either husband.</p>",
          attachments: [],
          isStarred: false,
          labels: ["company", "private", "important"],
          time: "2021-07-06T20:33:50",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: true
        }
      ],
      folder: "inbox",
      isRead: true,
      isDeleted: false
    },
    {
      id: 36,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "benjamin30@gmail.com", name: "Pamela Mueller", avatar: avatar6$5 },
      subject: "Dinner start pretty.",
      cc: [],
      bcc: [],
      message: "<p>Require might team under authority.\nCustomer value still number deal. Cell both type customer do. Congress opportunity subject.</p><p>Above threat security how. Worry too interesting especially government help instead.\nWide ability study oil training teach. Help lot tree recent admit lot business.\nCapital order himself fall rest room those.</p><p>Impact beat business hear pretty. Current professor nearly agency. Attorney education fish result move.\nFormer military bar middle PM back his. Play nature image matter pick. Standard job smile food.</p>",
      attachments: [],
      isStarred: false,
      labels: ["company", "personal"],
      time: "2021-07-03T05:40:50",
      replies: [],
      folder: "spam",
      isRead: true,
      isDeleted: false
    },
    {
      id: 35,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "dana33@yahoo.com", name: "Becky Coffey", avatar: avatar2$7 },
      subject: "Less forget everything only girl.",
      cc: [],
      bcc: [],
      message: "<p>His exactly require able. Team become friend chair between within. Employee program power science eight guy dark.</p><p>Crime his teacher imagine outside energy recent. Building week short brother many enter measure. Approach better them area deep.\nChild gas yard character. To management mother never own arm key. Trouble three speech cover feel listen.</p><p>Future north quite partner interesting. Interview investment clear industry Democrat investment. Even ahead identify.\nThese character threat next help include. Offer contain necessary something all. Reflect growth quickly part rate create question.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important", "company"],
      time: "2021-07-08T06:53:31",
      replies: [],
      folder: "spam",
      isRead: true,
      isDeleted: false
    },
    {
      id: 34,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "hollandjulie@yahoo.com",
        name: "Christopher Evans DDS",
        avatar: avatar5$5
      },
      subject: "Financial series artist region.",
      cc: [],
      bcc: [],
      message: "<p>Peace approach ask course central reality. Decision PM standard production brother report federal its. Wonder common group current often vote.</p><p>Professional sure fear blood much question. Operation ever authority water the woman. Hospital second rich let.\nOpportunity actually decision positive. During beautiful today decide know those. Chance list many create including become instead with.</p><p>Feel put treat. Mention arm name bank side.\nWhy area language reach well. Mother Mr worry order example.\nBegin part stay culture tend. Strategy administration yeah woman measure air. Than exist with indeed population talk.</p>",
      attachments: [],
      isStarred: true,
      labels: ["personal", "private"],
      time: "2021-07-12T11:07:10",
      replies: [
        {
          id: 689385,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "wilsonroy@gmail.com",
            name: "Chelsea Sims",
            avatar: avatar4$5
          },
          subject: "Prove rest forward wear.",
          cc: [],
          bcc: [],
          message: "<p>Just trip own remember change these part. Trip success network send not room half yet. Floor pay which expert service.\nWhile both throw sister.\nCertainly remember certain country both. How seat exist. Hundred wind in page.</p><p>Trouble them least control. Forget up scene training garden. Effect for risk remain sign.\nSouthern bill blue general usually end how admit. Whom view final pay population reason. Type fire million on section individual.</p><p>Business specific prepare machine. Area stage poor pull. Performance myself dark school.\nScientist service student nation who wide market. Know clearly they finish. And maintain not soon play right.\nSign similar support cell. Meet less share pass.</p>",
          attachments: [],
          isStarred: true,
          labels: ["personal", "company", "private"],
          time: "2021-07-26T09:23:33",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: true
        },
        {
          id: 66371,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "dannynguyen@hotmail.com",
            name: "Matthew Schaefer",
            avatar: avatar5$5
          },
          subject: "Staff can next along long true dark.",
          cc: [],
          bcc: [],
          message: "<p>Hotel only mind create soon north life. Improve pass too important those per including. System four north.\nFamily politics floor huge bad. Light look start apply forward civil agree. Later place expect at build.</p><p>First now against include time experience those and. Their these reveal guy dark. Always option fall evidence once success.\nLive sing gun meet. Spring face political voice. Blood clear couple run left available.</p><p>Visit network so total wife. People artist experience citizen maybe water good.\nHis news wonder note. Consumer kitchen him sport type.\nCandidate fall where structure. Art hour term matter look program.</p>",
          attachments: [],
          isStarred: true,
          labels: ["personal", "private"],
          time: "2021-07-09T01:39:12",
          replies: [],
          folder: "draft",
          isRead: true,
          isDeleted: false
        }
      ],
      folder: "sent",
      isRead: true,
      isDeleted: false
    },
    {
      id: 33,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "hsmith@gmail.com", name: "Wendy Marshall", avatar: avatar8$4 },
      subject: "Enjoy see man news decide build class make.",
      cc: [],
      bcc: [],
      message: "<p>Because gun area better region role party. Most cultural control radio religious rule human.\nFinal cold positive country story gun.\nThey myself bed involve. Course president health might lot close. Level fine college deal.</p><p>Tree race ground customer. Window prove maybe television possible well soldier over. International run conference free white audience consider.\nInterview ball leg number blood support his turn. Care product a.</p><p>Something ahead painting then option recognize. Use force price then away.\nFind agent hospital physical his. Town money person case during body.\nFast have kitchen character a race walk. Stage bring we entire sort.</p>",
      attachments: [],
      isStarred: true,
      labels: ["personal", "company"],
      time: "2021-07-10T22:42:15",
      replies: [
        {
          id: 301809469,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "maryatkins@gmail.com",
            name: "Kimberly Cisneros",
            avatar: avatar4$5
          },
          subject: "Family pretty interest decision.",
          cc: [],
          bcc: [],
          message: "<p>Feeling production spend. Program look stand meet him. Ask away generation phone.\nMachine process window range serious process remain. Good charge in serious study seat. Heavy she concern door fire organization money fact.</p><p>Whether end investment pay. Happy information cup then. Edge fire suffer remain catch.\nDirector international determine might. Clearly fire something player. How that increase ready section. Visit become contain.</p><p>Decide find growth continue movie thank sort.\nPull where attention treat or. Since resource gas person trade organization crime. Growth southern lay lose president likely half.</p>",
          attachments: [],
          isStarred: true,
          labels: ["private"],
          time: "2021-07-23T04:23:43",
          replies: [],
          folder: "spam",
          isRead: false,
          isDeleted: false
        },
        {
          id: 930166,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: { email: "nramirez@yahoo.com", name: "Kenneth West", avatar: avatar1$7 },
          subject: "Factor TV wife career thing loss increase.",
          cc: [],
          bcc: [],
          message: "<p>Every public quality also. Almost base imagine former decade pull also the. She stage so military admit.\nSouth better general base reason employee may. Control see way end material service. Everybody fear risk party weight.</p><p>Sea line production appear them through. Late gun something power little care. Interest since test total.\nProvide as condition none wind month thus. Fly sort south artist letter health night.\nWrong group affect even. Identify way interview politics.</p><p>Risk total natural follow music drop sense hospital. Space family cover effect. Live particularly letter generation toward concern reality friend.\nOrganization bar ask great most live seat week. Against western use present.</p>",
          attachments: [],
          isStarred: true,
          labels: ["private", "company"],
          time: "2021-07-14T00:55:32",
          replies: [],
          folder: "sent",
          isRead: false,
          isDeleted: false
        },
        {
          id: 324,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "tina53@hotmail.com",
            name: "Douglas George",
            avatar: avatar1$7
          },
          subject: "Recognize to study.",
          cc: [],
          bcc: [],
          message: "<p>Perhaps pretty color walk different likely think. Southern occur soon chair leave discover heart. Rest product break member operation.</p><p>Agreement I include for.\nState anyone fight interview view west concern. Reach social reason how husband east.\nSometimes able especially simple size behavior. Talk beyond both big another often former.</p><p>Her money art involve building natural garden. Pay them respond step that. Old yourself table would agency. Pay recognize family individual.</p>",
          attachments: [],
          isStarred: false,
          labels: ["personal", "company"],
          time: "2021-07-28T01:47:02",
          replies: [],
          folder: "spam",
          isRead: true,
          isDeleted: false
        }
      ],
      folder: "spam",
      isRead: false,
      isDeleted: false
    },
    {
      id: 32,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "jeffreystevens@yahoo.com",
        name: "Christopher Adams",
        avatar: avatar3$6
      },
      subject: "Finish actually parent condition business discussion later practice.",
      cc: [],
      bcc: [],
      message: "<p>Design left million test bag character. Pm everybody ago. Table finish sell my pay quite. Often account cover home war.\nCourt sport difference film left guy natural understand. Across ok quite now camera rock.</p><p>Plan citizen star off often evidence remember. Describe professor economic professional represent catch. Employee stand person eye. Region address spend.</p><p>It policy beyond scene. Wide bed culture account eat. Color technology even.\nMight ready option guess. Once create ever worker paper perhaps. Show likely say produce capital court.</p>",
      attachments: [],
      isStarred: false,
      labels: ["personal", "important", "private", "company"],
      time: "2021-07-27T09:40:52",
      replies: [],
      folder: "draft",
      isRead: true,
      isDeleted: false
    },
    {
      id: 31,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "maria99@hotmail.com", name: "Theresa Schmitt", avatar: avatar8$4 },
      subject: "Life store technology least under black type.",
      cc: [],
      bcc: [],
      message: "<p>Main each pay bar professional blood fill. The commercial amount thousand carry. Sound ball become court relationship so white.\nFight late exactly evidence evidence art but. Congress spend camera sea other. Theory protect plant wait.</p><p>Her necessary capital around nor issue herself. Late quickly someone own painting moment participant.\nRequire civil night take. Southern cold because option report share fine who.</p><p>List black mean everything read front Mrs. Look whatever street approach fear guess once. Paper somebody hear machine.\nTogether it price world professor country. National worker specific shake. Open security tell all sure none imagine say.</p>",
      attachments: [],
      isStarred: false,
      labels: ["company", "private", "personal"],
      time: "2021-07-01T03:23:03",
      replies: [],
      folder: "sent",
      isRead: false,
      isDeleted: false
    },
    {
      id: 30,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "kempsarah@gmail.com", name: "Sherry Guzman", avatar: avatar2$7 },
      subject: "Officer population memory level foot public.",
      cc: [],
      bcc: [],
      message: "<p>Summer general go happen owner last. Store live organization court think.\nDiscover second million today space activity conference. Generation young design factor interesting. Account always Mrs garden plant.</p><p>Sound discover piece people. Positive decade describe. Focus science free.\nSide mean however plan price me.\nBy later building result important down lay. Try growth structure nation above pull however those.</p><p>Wonder end value lead help quite trial. Recognize teacher establish explain. Try usually find over matter much.\nRaise son mouth.\nBase reach bit recognize focus. Stop best sea improve develop.</p>",
      attachments: [],
      isStarred: false,
      labels: ["private"],
      time: "2021-07-20T16:43:48",
      replies: [
        {
          id: 76,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "jessica23@gmail.com",
            name: "Lauren Smith",
            avatar: avatar8$4
          },
          subject: "College community effect care.",
          cc: [],
          bcc: [],
          message: "<p>Task age compare talk yard. Matter turn their price road.\nCulture four decide work chance cost include. Rock return statement. Major major several around method.\nUs would threat federal sense mean.\nCondition as why fast. Guy bit often professor.</p><p>Tell concern difference eye office trade fund fire. Lead report only star hot.\nFeel far factor current girl. Two hair fight a recent movie apply. Again series sometimes recent identify.</p><p>Perhaps agree note between house whom too. Down could important production tend figure special. West far bad impact cause great.\nRepresent green throughout never type trouble outside. Call adult would clearly. Turn stand federal.</p>",
          attachments: [],
          isStarred: false,
          labels: ["private", "important", "personal"],
          time: "2021-07-20T17:21:18",
          replies: [],
          folder: "draft",
          isRead: true,
          isDeleted: false
        },
        {
          id: 435260844,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "lkelley@yahoo.com",
            name: "Michael Torres",
            avatar: avatar3$6
          },
          subject: "Build learn audience water article ball must.",
          cc: [],
          bcc: [],
          message: "<p>Method election require important majority five. Seat listen story.\nCause middle act film. Available turn gun before whole especially kind simple.\nStage wrong hot find agree suddenly. Chance source clear share stay few.</p><p>Figure activity role official. Food live personal.\nPersonal no public computer prepare when. Fish available report network if attack among decide. Seem rule inside economic door.</p><p>Budget open send wrong property. Half spend stock less. Degree act general skin these any personal per.\nUntil never state chair already. Product sign best.</p>",
          attachments: [],
          isStarred: false,
          labels: ["important", "company", "private"],
          time: "2021-07-10T07:00:15",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: false
        },
        {
          id: 7780,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "thomaspeterson@yahoo.com",
            name: "Dylan Logan",
            avatar: avatar1$7
          },
          subject: "Artist food section media commercial hospital.",
          cc: [],
          bcc: [],
          message: "<p>Tax above either world. Candidate accept final challenge which risk. Fact book example positive follow attention.\nCost building central contain natural. Adult least by.</p><p>Fast cause environment go explain necessary. Help citizen others beat sure child. Claim inside whether approach chance always central.\nSide ten bill look fine career. Attention real little power yourself bank.</p><p>Nothing American sister truth medical matter. Use door practice feel point fear. Argue else however involve fact.\nOwn recognize save. Federal brother loss mouth painting paper.\nDemocrat crime join quality. Off politics note soon.</p>",
          attachments: [],
          isStarred: false,
          labels: ["private"],
          time: "2021-07-26T23:06:27",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: true
        }
      ],
      folder: "spam",
      isRead: true,
      isDeleted: false
    },
    {
      id: 29,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "daniel37@hotmail.com", name: "David Cruz", avatar: avatar5$5 },
      subject: "Clearly my usually billion ability response.",
      cc: [],
      bcc: [],
      message: "<p>Face despite management international talk force detail. Partner score hit democratic fast life property. Age information wear grow rise hard price. Every area character first activity smile.</p><p>Station character American usually nice change young. Make perhaps happy trade since science. Fine think attack successful.\nCrime bit spring city. Lawyer light ball unit instead statement. Lose friend account buy oil ten tend.</p><p>Security identify there. Person factor item build never language.\nEnter stock military early. Wish identify level difference fire wall. Girl finish sense indicate bad.</p>",
      attachments: [],
      isStarred: false,
      labels: ["private", "company"],
      time: "2021-07-01T10:33:17",
      replies: [],
      folder: "sent",
      isRead: true,
      isDeleted: false
    },
    {
      id: 28,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "areeves@gmail.com", name: "Anthony Obrien", avatar: avatar5$5 },
      subject: "A type network effort blood do various.",
      cc: [],
      bcc: [],
      message: "<p>Own measure phone view baby officer. Detail nor television. Wear decade official long.\nCan interview point poor increase pick quickly run. General need audience foot weight firm. Month ability public. Go class let rise spring heart.</p><p>Cover attention letter later many town stuff away. Week lawyer western street.\nUnit rate reality adult. Arrive staff book me many.\nHand perhaps well thank join serious great budget. Including road upon will. Per price mission break.</p><p>Experience late nothing get baby head should. Must technology service address blood.\nChance decide else mean consumer pretty everything. Hospital couple second fly security region brother.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important", "company"],
      time: "2021-07-20T18:39:49",
      replies: [],
      folder: "draft",
      isRead: true,
      isDeleted: false
    },
    {
      id: 27,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "bnunez@hotmail.com", name: "Jason Gonzalez", avatar: avatar5$5 },
      subject: "Affect method provide break himself house.",
      cc: [],
      bcc: [],
      message: "<p>Science design amount responsibility. Seem himself degree. Decade central manage. Rather four decide word.\nQuickly keep such popular different approach woman. Population body decade baby view significant can. Wish a build respond.</p><p>Site cut forget international lay he there. Tax early try authority.\nAbout term enjoy prevent affect. Even environmental kid skill.\nFirst plant number site bad interest board. Investment half so.</p><p>Method sea agent capital later just worker. Main guy cut build building. Condition similar best gun. Dinner new box major artist space in.\nRaise try science grow. House picture raise indeed light.</p>",
      attachments: [],
      isStarred: false,
      labels: ["private"],
      time: "2021-07-23T07:42:38",
      replies: [],
      folder: "spam",
      isRead: true,
      isDeleted: false
    },
    {
      id: 26,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "welchcrystal@gmail.com",
        name: "Christopher Sanchez",
        avatar: avatar5$5
      },
      subject: "Trade science concern necessary theory option us.",
      cc: [],
      bcc: [],
      message: "<p>Top foreign never recent baby girl base. Show charge senior difficult drug effect. Fear on standard doctor stop investment spring.</p><p>One long article market there into. Share nature member owner evening. Form tree real cultural.\nSecond be report teacher admit close.\nWhom skill teach. Blue song ahead weight rather walk line. Five talk require.</p><p>Rate onto nearly address rule side activity. Result ahead you hope woman worker evidence.\nCollection citizen we industry. Sister and that according organization leave. Day agency hope pick.\nEconomic him consider body four section single when.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important"],
      time: "2021-07-10T16:15:08",
      replies: [],
      folder: "inbox",
      isRead: false,
      isDeleted: false
    },
    {
      id: 25,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "fullerkatelyn@hotmail.com", name: "Ana Short", avatar: avatar4$5 },
      subject: "Follow tax officer soon our four relationship consumer.",
      cc: [],
      bcc: [],
      message: "<p>Couple almost table everyone together contain. Plan fill trip. Perhaps explain college will machine mouth training popular.\nNice include wrong road alone. Could for adult perform.</p><p>Tax ahead ground general industry. Else style only Mr agent all.\nAlready walk edge might forward. Cold wind hard read. Street poor process major especially example defense.\nDecade capital question talk work box forget. Always hear Mr ago.</p><p>Apply camera white natural should another. Past event herself score. Own thus general despite pattern. Ability pressure network mouth sometimes represent.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important"],
      time: "2021-07-12T09:22:10",
      replies: [
        {
          id: 4556357,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "woodjames@gmail.com",
            name: "Taylor Lopez",
            avatar: avatar4$5
          },
          subject: "Appear imagine western.",
          cc: [],
          bcc: [],
          message: "<p>Effect fall action chair candidate forward. Away character action start even focus claim address.\nJob once off according put off. Give answer near star cell expert. Use tax care month list.</p><p>Investment it check.\nPopulation oil mouth glass against. Stand all art leader agree.\nHerself only score image prevent bar table. Total treatment enjoy everything. Long later just cover or great meet.</p><p>Exist month watch wish remember simply low. Knowledge treatment maintain fine organization fall identify.\nIdea enough worry coach better stand general. Threat western language must person.</p>",
          attachments: [],
          isStarred: false,
          labels: ["important", "company"],
          time: "2021-07-08T11:19:22",
          replies: [],
          folder: "draft",
          isRead: true,
          isDeleted: false
        },
        {
          id: 419,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "charlotte46@gmail.com",
            name: "Edwin Pena",
            avatar: avatar3$6
          },
          subject: "Hundred happen national measure.",
          cc: [],
          bcc: [],
          message: "<p>Try high body design blue. Deep improve ahead police.\nHuman behind police international. Around would nor position particular physical break. Pm for against clearly.</p><p>Who in rock then build. Analysis produce kind senior until where. Part east understand.\nChance billion culture might so five. Particularly create story maintain article give fall. Short improve whatever new available wear affect.</p><p>Financial great impact everyone until.\nThem might try range main. Activity decade stock first stock start explain. Write phone nice increase fish several.\nNewspaper exist himself dinner choice agree hear. Great receive today identify.</p>",
          attachments: [],
          isStarred: true,
          labels: ["company", "personal"],
          time: "2021-07-28T00:33:38",
          replies: [],
          folder: "sent",
          isRead: true,
          isDeleted: false
        },
        {
          id: 5123,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "amandawagner@yahoo.com",
            name: "Laura Montes",
            avatar: avatar2$7
          },
          subject: "Administration choice move against provide value none.",
          cc: [],
          bcc: [],
          message: "<p>Goal throw including miss sometimes staff traditional. Material talk place point pay.\nShake popular part wind. While state light. Explain movement they.</p><p>Our herself indeed let use. Debate front within yes impact change big contain. Purpose outside nothing leg image never dark husband.\nPlant bring decision avoid ground act book. Up hold speech. Local indeed short.</p><p>Cold step herself style important. Week base tree game kid. Coach yet expect determine personal. Here happy peace have cause up.\nApply include recently reality common attention. Effort politics player though fly.</p>",
          attachments: [],
          isStarred: false,
          labels: ["personal", "company"],
          time: "2021-07-23T04:17:17",
          replies: [],
          folder: "draft",
          isRead: true,
          isDeleted: false
        },
        {
          id: 60679807,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "clarkdwayne@hotmail.com",
            name: "Felicia Myers",
            avatar: avatar2$7
          },
          subject: "Me during name.",
          cc: [],
          bcc: [],
          message: "<p>Miss back sing simply. Tax surface shake page so. Any rule vote for.\nSport six former simple. Daughter business push reality information.\nResource just possible rich enter. Tax full box beat. Network edge cultural among no morning.</p><p>Since but appear place. Trouble particularly paper chair commercial. Offer everyone success trip. Treatment special support resource.\nGun analysis test recently ball. Reality organization family test TV I surface.</p><p>Appear system shake charge nice foot. There our wrong author investment coach. Feel leg economy require push performance out speech. Need hair however commercial.\nLike Congress system whether skin. Research little attention art.</p>",
          attachments: [],
          isStarred: true,
          labels: ["company", "important"],
          time: "2021-07-09T19:19:45",
          replies: [],
          folder: "sent",
          isRead: true,
          isDeleted: false
        },
        {
          id: 31103,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "hobbsjeffrey@yahoo.com",
            name: "Erica Mann",
            avatar: avatar6$5
          },
          subject: "Ability pretty student health current interesting even.",
          cc: [],
          bcc: [],
          message: "<p>Image American daughter test animal. Somebody especially war loss name only just.\nStation such television also good away so water. Protect across television phone. Realize almost final half fight establish.</p><p>Program skill rest bed east here become law. How loss might purpose low time organization. Industry different enter share budget.\nFeel million how modern whole religious half finish. Hospital stage decision consider democratic.</p><p>Sort move scene behind. First office take together keep note break kind. Either laugh top agree prepare change.</p>",
          attachments: [],
          isStarred: false,
          labels: ["personal", "important", "company"],
          time: "2021-07-21T11:41:54",
          replies: [],
          folder: "spam",
          isRead: false,
          isDeleted: false
        }
      ],
      folder: "draft",
      isRead: true,
      isDeleted: false
    },
    {
      id: 24,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "hmoran@gmail.com", name: "Vincent Alexander", avatar: avatar1$7 },
      subject: "Over tough city well first should quite.",
      cc: [],
      bcc: [],
      message: "<p>Sense speech economic compare chair. Suddenly model bank add. Let church door human ready share begin sense.\nPlay weight audience call necessary reach candidate rest. Collection lead voice position news listen police.</p><p>Describe safe almost hold. Rich because trip blue. Discussion born spend because anyone need.\nWonder skill state. Movie receive guess with. Turn pressure market term experience hotel collection.\nOff staff word once money.</p><p>Response north Mrs area writer election. Include early look similar nearly be. Rate happen green not.\nRun bed where state why sit house attorney. Which allow size learn. Describe mind where speak some son herself.</p>",
      attachments: [],
      isStarred: false,
      labels: ["company", "important"],
      time: "2021-07-12T13:33:33",
      replies: [
        {
          id: 324726,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "victorjohnson@yahoo.com",
            name: "Tamara Vega",
            avatar: avatar6$5
          },
          subject: "Democrat miss deal career maintain hotel.",
          cc: [],
          bcc: [],
          message: "<p>Base enter whom respond throughout together. Nor generation various company bar. What consumer how.\nKid recently civil store. High hot assume gun.</p><p>Important win election center. Party less knowledge only magazine past condition yard. Sound doctor say between.\nResult process may have firm wide. Moment audience skill safe fast. Spring although member defense value job.</p><p>Nothing serve media tell network site benefit artist. Left scene strong. As community decide major.\nNearly indeed send begin read. Recent foot three letter wide spend have. Growth whether once home actually without central.</p>",
          attachments: [],
          isStarred: false,
          labels: ["important", "personal"],
          time: "2021-07-13T12:43:08",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: true
        },
        {
          id: 3,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "jeremywilliams@yahoo.com",
            name: "Jason Schultz",
            avatar: avatar1$7
          },
          subject: "Piece effect usually everyone make.",
          cc: [],
          bcc: [],
          message: "<p>Market easy before really individual window soldier garden. Better space avoid fund. Politics friend class something western model. Seem successful recently sometimes.\nServe shake try for you our. Involve organization last at inside.</p><p>Employee office list player. Pass cold charge.\nEye sometimes article pressure. Chair mission structure him owner. Fight leg common her forget across against.\nMusic national student. At part wide fund.\nReady health everybody.</p><p>Cover century him back card property success. Enter feeling light oil cell push research.\nNow drop everyone must side blood program. Factor fire dark their kind hit everyone person. How property million interesting both important.</p>",
          attachments: [],
          isStarred: false,
          labels: ["personal"],
          time: "2021-07-13T19:56:30",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: true
        },
        {
          id: 4,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "jasonpalmer@hotmail.com",
            name: "Deborah Tran",
            avatar: avatar2$7
          },
          subject: "Certain executive them health successful spring.",
          cc: [],
          bcc: [],
          message: "<p>Commercial individual understand past history large strong.\nPositive summer three need evening. North between pay politics art hand ago cover.\nLevel happen start practice reach. Produce sport show condition. Individual grow education.</p><p>Return fear food enter friend. Great company opportunity nearly garden choose.\nLast capital cell true edge. Daughter cost west stage force tell.\nEvidence stop whether power. North hospital base accept. Message him likely trouble tax business part.</p><p>Just record kind drug four perhaps entire. Economic surface century individual behind understand.\nTax hair charge investment similar perhaps pay. Return room create table other foot happen approach.</p>",
          attachments: [],
          isStarred: true,
          labels: ["private", "personal"],
          time: "2021-07-14T18:37:56",
          replies: [],
          folder: "sent",
          isRead: true,
          isDeleted: false
        },
        {
          id: 19865651,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: { email: "danny06@gmail.com", name: "Walter Moss", avatar: avatar3$6 },
          subject: "Go town spend determine we money experience partner.",
          cc: [],
          bcc: [],
          message: "<p>Color onto chair very the account article different. Time however total without.\nHerself left knowledge never heart its product over. Citizen range state various same fall would day. Anyone against when grow evening.</p><p>Grow main front thing boy. Accept shake student consumer whom.\nAnyone return between apply.\nRead its prepare young. Week start for again focus doctor. Itself term until see somebody.</p><p>Trial direction idea green young. Success to light later.\nUse box sense indicate ask. Himself six five. Ready government than young represent difficult.</p>",
          attachments: [],
          isStarred: false,
          labels: ["private"],
          time: "2021-07-08T13:58:13",
          replies: [],
          folder: "spam",
          isRead: true,
          isDeleted: false
        }
      ],
      folder: "inbox",
      isRead: true,
      isDeleted: false
    },
    {
      id: 23,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "paulbarrett@gmail.com", name: "Robert Soto", avatar: avatar7$4 },
      subject: "Apply loss always difference husband course deal.",
      cc: [],
      bcc: [],
      message: "<p>Realize American professor television give.\nNice meeting individual could major instead. Late development deep. Memory main how minute reduce want whether happy.</p><p>Capital fight water page artist seem own. Make join public break. Support water analysis cup forget together.\nAgain along listen defense ground mission once region. Last ground experience hot trade free camera.</p><p>Bill floor tonight good condition. Traditional must spring onto break. Left just everybody election. Treatment foreign control dark often.</p>",
      attachments: [],
      isStarred: false,
      labels: ["private", "personal"],
      time: "2021-07-06T23:12:45",
      replies: [],
      folder: "inbox",
      isRead: true,
      isDeleted: false
    },
    {
      id: 22,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "danagriffin@gmail.com",
        name: "Alexander Alexander",
        avatar: avatar7$4
      },
      subject: "Lead position story common choice pay sit line.",
      cc: [],
      bcc: [],
      message: "<p>Hand style bill phone day new area. Central husband measure could. Democratic health begin draw politics wear interest.\nHim avoid knowledge music. Offer forward happy easy. Just yard one light weight teacher threat.</p><p>American it feel parent protect. Center building recent politics when hand bar under. Without hard relationship issue.\nContinue friend game concern. Agency discussion simply hotel now prevent.</p><p>Sense indeed glass accept interest. Carry window dog onto involve specific.\nRadio despite police scientist economic. Fire affect your term. Send to end avoid political ability.</p>",
      attachments: [],
      isStarred: false,
      labels: ["private", "personal"],
      time: "2021-07-03T07:04:27",
      replies: [],
      folder: "draft",
      isRead: true,
      isDeleted: false
    },
    {
      id: 21,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "bakercarrie@yahoo.com", name: "Dawn Hall", avatar: avatar2$7 },
      subject: "Magazine smile hear price.",
      cc: [],
      bcc: [],
      message: "<p>Ball skin product option anyone. Away involve whatever score.\nCommon ever show all body bed already. Modern politics century sort. Half study write life certain.</p><p>Nothing little whose carry source force heavy employee. Price force leave small follow. Push enjoy down teacher among. Huge nature whose risk season east maybe peace.\nPolitics interview drop sell. Trip from simple matter event.</p><p>Brother simply structure some kitchen some expect. Family personal civil focus professional task specific cut.\nDemocrat continue cause television yourself whether. Find west particular ago stand car.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important"],
      time: "2021-07-06T12:47:33",
      replies: [
        {
          id: 6333,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "james94@gmail.com",
            name: "Ronald Mitchell",
            avatar: avatar1$7
          },
          subject: "Cost example hope modern especially language rock.",
          cc: [],
          bcc: [],
          message: "<p>Mr go size financial role. Deal defense about space. Leader site water well side walk need.\nBall impact suddenly those rather have marriage first. May wear need may design.</p><p>Everyone artist run weight. State on executive travel.\nBrother instead nice while such half trial live. Policy truth animal make set them ask.\nPretty almost pick player after involve. Hot energy interview clearly however adult.</p><p>People during left particular rock design war young. Station require reflect. Later space head front within general. Program lose century stage.\nInstead very both. Owner bill tend Congress local.</p>",
          attachments: [],
          isStarred: false,
          labels: ["private"],
          time: "2021-07-19T13:54:07",
          replies: [],
          folder: "spam",
          isRead: true,
          isDeleted: false
        },
        {
          id: 3539,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "averyamy@hotmail.com",
            name: "Courtney Reynolds",
            avatar: avatar6$5
          },
          subject: "President attack quickly religious.",
          cc: [],
          bcc: [],
          message: "<p>Stop military interest. Picture his money go quickly. Possible second wide high.\nTime air somebody on development born charge. Marriage address pull. Laugh chair range standard open list consumer wide.</p><p>Dinner another but student upon out. Soldier current management hair management.\nLikely population measure Democrat serious result reflect. Property tax knowledge. Recognize top peace nature pattern.</p><p>Table teach knowledge. Economic section security she. Myself share oil decide necessary when smile difference.\nService open oil car. Be model record stuff position scene also. All professional plan as radio candidate movie.</p>",
          attachments: [],
          isStarred: false,
          labels: ["company"],
          time: "2021-07-06T00:53:34",
          replies: [],
          folder: "sent",
          isRead: false,
          isDeleted: false
        },
        {
          id: 132667,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "englishjohn@gmail.com",
            name: "Phillip Warner",
            avatar: avatar1$7
          },
          subject: "Stand never treat commercial.",
          cc: [],
          bcc: [],
          message: "<p>Like begin million option dream just. Side still six truth alone exist that.\nIncluding himself movement increase significant. Police trial instead success he chair speak. Medical writer oil.</p><p>Successful compare analysis yes successful. Before sit old process similar physical.\nMedical receive debate than. Hit assume baby result place total.\nMoney discussion tax democratic surface everybody thousand. Throw six far home.</p><p>While reality along loss only alone pick current. Ok month view computer. Available drug ask knowledge add choose must.\nScene you ago laugh else city. Receive provide goal husband throughout. Focus local middle civil ever oil.</p>",
          attachments: [],
          isStarred: false,
          labels: ["important"],
          time: "2021-07-07T04:28:47",
          replies: [],
          folder: "spam",
          isRead: false,
          isDeleted: false
        },
        {
          id: 815966603,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "davidmckenzie@yahoo.com",
            name: "Tony Garcia",
            avatar: avatar3$6
          },
          subject: "However walk less use election.",
          cc: [],
          bcc: [],
          message: "<p>Shake stop century indicate cut garden. Night learn should low material north economy.\nAnother soldier base whole accept. Natural two everyone television. Sure option key market method week. Mouth day look too western world.</p><p>Company first rise in. Image movement enjoy clearly work box. Process parent fear state these theory want. Close friend team put check.\nCourt practice since account way indeed. Between exactly five. Conference green fast see century notice.</p><p>South six discover college long anyone young. Her company fine hotel rise.\nIf raise long yeah direction painting. Rest tell entire machine than summer laugh list. Personal rise figure collection player yard.</p>",
          attachments: [],
          isStarred: true,
          labels: ["private", "company", "important"],
          time: "2021-07-07T09:57:28",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: false
        }
      ],
      folder: "draft",
      isRead: true,
      isDeleted: false
    },
    {
      id: 20,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "sandraarroyo@hotmail.com",
        name: "Natalie Lloyd",
        avatar: avatar2$7
      },
      subject: "During teach truth group society enough that.",
      cc: [],
      bcc: [],
      message: "<p>Price agreement more tell. Push special fine turn alone.\nVarious weight shake heavy age control side so. Determine fall family agreement pull guy easy. Sell will director experience where challenge Democrat.</p><p>Fly such evening all entire. Data cold hour.\nLocal strong article tend bag. Probably relate political sell. Service end environmental theory health. Ready think body necessary low result impact.</p><p>Agency trial address per strong bill able. Top lay chair bag positive rich partner. Interest address government argue project attention myself election.\nReach value pattern treat act result star. Staff list federal.</p>",
      attachments: [],
      isStarred: false,
      labels: ["company", "important"],
      time: "2021-07-11T17:48:11",
      replies: [
        {
          id: 7,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "webersamuel@gmail.com",
            name: "Steven Jackson",
            avatar: avatar1$7
          },
          subject: "Hotel account interview begin carry everybody its.",
          cc: [],
          bcc: [],
          message: "<p>Get behavior better walk claim. Material popular civil detail.\nStop strong true first. Science scientist low story. These former near represent.</p><p>Fine value happy admit. Although its four could yet call. May beyond building bank push past perform.\nEnd civil audience son our my artist make. Security wish probably cold space reach life situation.</p><p>Station per choice live safe dog without. Above according break her woman organization market.\nCareer pass race mother manage for. Summer organization stage century fact individual particular.</p>",
          attachments: [],
          isStarred: true,
          labels: ["personal"],
          time: "2021-07-18T23:08:26",
          replies: [],
          folder: "sent",
          isRead: true,
          isDeleted: false
        },
        {
          id: 378459327,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "jobush@yahoo.com",
            name: "Mrs. Pamela Riggs MD",
            avatar: avatar6$5
          },
          subject: "Industry difficult want without day partner road.",
          cc: [],
          bcc: [],
          message: "<p>Never hospital price site without star. Agency nature resource perhaps send. Stand nice must.\nProve window individual final. Exactly collection boy picture try operation increase. About purpose American type include store determine.</p><p>Speak they reality consumer ball church.\nWorld sit price. More local clear. Camera kind food.\nShe often term somebody prove. Would low over someone law.\nInstitution any among face begin race term do. Teach language technology get animal good.</p><p>Play cell type process certain total stay. Court enough side choice again speech.\nBy alone young scientist walk individual a. Mind relate whatever fund vote contain. Reflect special hospital study may local.</p>",
          attachments: [],
          isStarred: false,
          labels: ["personal", "private"],
          time: "2021-07-18T03:59:12",
          replies: [],
          folder: "sent",
          isRead: true,
          isDeleted: false
        }
      ],
      folder: "spam",
      isRead: false,
      isDeleted: false
    },
    {
      id: 19,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "washingtonsamantha@hotmail.com",
        name: "Jessica Johnston",
        avatar: avatar6$5
      },
      subject: "Exist general medical under entire radio.",
      cc: [],
      bcc: [],
      message: "<p>Process book suddenly plan sense change science. Prepare air option response. Voice range human.\nYet staff back idea note his cold. Raise service about state final official.\nHair when expect ok sit food. Religious rule doctor all.</p><p>Need improve field set wrong born.\nConsider there situation also something. Glass finally must special. Region news water responsibility to my short. Deal hotel fill.</p><p>Successful apply reality think woman short. Hope various indeed onto third audience.\nWay score none. Raise budget tough dinner name. Similar something fall certain I different.</p>",
      attachments: [],
      isStarred: false,
      labels: ["private"],
      time: "2021-07-24T18:10:41",
      replies: [],
      folder: "spam",
      isRead: true,
      isDeleted: false
    },
    {
      id: 18,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "mcleanrobert@hotmail.com",
        name: "Matthew Lee",
        avatar: avatar1$7
      },
      subject: "Travel free or write determine.",
      cc: [],
      bcc: [],
      message: "<p>Edge memory where short stuff. Seven summer from sometimes body probably church.\nYeah might enough believe world person somebody. Compare summer road save magazine.</p><p>Light street wear home. Result baby my show current present. Attorney analysis rule democratic bed top.\nFace should pay side federal responsibility item. Test step safe his yourself.\nHold language interview other agency. Leg soon determine.</p><p>Make style already you physical.\nAir challenge fund dark. Myself another evening let big improve parent huge. Money fly investment practice.\nProvide feeling peace open decide course. Community attack her magazine white. Those let any beyond.</p>",
      attachments: [],
      isStarred: true,
      labels: ["private", "company", "personal"],
      time: "2021-07-24T00:15:10",
      replies: [],
      folder: "draft",
      isRead: true,
      isDeleted: false
    },
    {
      id: 17,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "perkinselizabeth@gmail.com",
        name: "James Wilson",
        avatar: avatar7$4
      },
      subject: "Always beautiful name push miss international.",
      cc: [],
      bcc: [],
      message: "<p>Skin if open line speak wish. Ten size their happen trial. Will third prevent.\nPopular wall indeed memory cause generation under age. Less one pressure guy song.\nUpon theory item science speak mission. After read plan official good week yet show.</p><p>Shake trip when once break election red. Left individual store site prepare figure. Once indicate blue wear effect person catch.\nWind chance entire perhaps carry notice leg. Successful property education. Guy option include.</p><p>Author of exist no bag exactly. To impact since.\nArgue market strategy evidence start business movie. Million fire crime magazine mention.\nDeep figure full Mr. Take response four serve law. Forward late part.</p>",
      attachments: [],
      isStarred: true,
      labels: ["important"],
      time: "2021-07-07T22:14:25",
      replies: [],
      folder: "inbox",
      isRead: true,
      isDeleted: false
    },
    {
      id: 16,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "garcialauren@hotmail.com",
        name: "Gregory Allen",
        avatar: avatar3$6
      },
      subject: "Test look option movement position card cause.",
      cc: [],
      bcc: [],
      message: "<p>Key rather religious director week inside campaign. Sport fast activity.\nCamera go sing development up pay. Product toward well.\nRepresent appear civil skill son city leg. Best road attorney religious. Issue collection who peace morning director.</p><p>Above know trip beyond smile science. Part sport behavior notice establish. Recent direction similar everything admit pretty.\nBehind a knowledge second sound. Body soldier begin word site.</p><p>Sense policy rule after no response itself. Have magazine draw should bit often food. Car start that trade person.\nLeft pattern PM identify before executive Mr. State two your meeting task different.</p>",
      attachments: [],
      isStarred: false,
      labels: ["personal", "company", "important"],
      time: "2021-07-11T00:14:13",
      replies: [
        {
          id: 744639799,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "howardjustin@gmail.com",
            name: "Rebecca Smith",
            avatar: avatar6$5
          },
          subject: "Region stop vote tonight partner capital us.",
          cc: [],
          bcc: [],
          message: "<p>Republican ten picture although partner green.\nWrite his than another hand only. Focus night table speak ahead couple. Baby me single another already unit hand.</p><p>On alone involve.\nMusic author event story east pressure thus. Game power administration.\nNext standard boy provide although city short society. Hospital company old view.</p><p>Interest see majority ability center hope. His decision use most four return college. Born technology affect like.\nAlong your military there note great day attack. Specific I throughout. Hand month family open.</p>",
          attachments: [],
          isStarred: true,
          labels: ["personal", "important", "private"],
          time: "2021-07-05T08:12:17",
          replies: [],
          folder: "sent",
          isRead: true,
          isDeleted: false
        },
        {
          id: 18,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: { email: "dwelch@yahoo.com", name: "Peter Davis", avatar: avatar1$7 },
          subject: "Second ground way child seem social resource appear.",
          cc: [],
          bcc: [],
          message: "<p>Building believe manage analysis artist another enough similar.\nFood provide long view civil couple. Citizen too health west culture rule finish administration. Political ever eight message specific mission.\nServe determine city stand four present.</p><p>Moment compare red or institution begin more. Nothing law long might degree. Meet relationship work money human probably head.\nForward region their high with region their. Many side goal.</p><p>Customer thousand amount ask other might. Article energy wide relationship. Prevent save himself wrong action.\nShow entire play upon at shake. Unit heavy training window probably start share. Common by allow.</p>",
          attachments: [],
          isStarred: false,
          labels: ["personal"],
          time: "2021-07-23T16:37:03",
          replies: [],
          folder: "draft",
          isRead: true,
          isDeleted: false
        },
        {
          id: 712,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: { email: "larrybrown@yahoo.com", name: "Amy Peters", avatar: avatar4$5 },
          subject: "Interesting strategy south ok recognize shoulder lead.",
          cc: [],
          bcc: [],
          message: "<p>Bring dark let list then kitchen audience. Agreement raise result decision choose without.\nIndicate yet radio consider perform western. Find follow far require wish than pattern. Meeting benefit through seven service.</p><p>Question response big son student stuff. There imagine hold pick friend. For join condition try.\nAnimal foot work public one brother hit.\nWithout free business new degree. Local administration it those animal.</p><p>Simply less tax. Stuff apply member deal rather sort. Best politics project say rest.\nCare expect program break concern development care. East seat window. Kind firm cover up share perhaps.</p>",
          attachments: [],
          isStarred: false,
          labels: ["personal"],
          time: "2021-07-17T02:58:14",
          replies: [],
          folder: "draft",
          isRead: true,
          isDeleted: false
        }
      ],
      folder: "inbox",
      isRead: true,
      isDeleted: false
    },
    {
      id: 15,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "dreed@hotmail.com", name: "Rhonda Hamilton", avatar: avatar4$5 },
      subject: "They new police guy trade carry bad.",
      cc: [],
      bcc: [],
      message: "<p>Certain operation woman production especially second. To answer main good democratic move likely radio. Down rise human model land culture the.</p><p>Ten actually feeling call blue human. Less forward star another something he.\nUsually scene door enjoy heavy view management. Eye data conference. Attention traditional especially star else federal course. Speak position season stage head when.</p><p>Foot face beautiful little seven former you usually. Candidate hotel help.\nKitchen heavy she. Agent put move sister much. Hit some baby have fight.</p>",
      attachments: [],
      isStarred: false,
      labels: ["company", "private", "important", "personal"],
      time: "2021-07-18T12:06:21",
      replies: [],
      folder: "spam",
      isRead: true,
      isDeleted: false
    },
    {
      id: 14,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "andersonkatrina@hotmail.com",
        name: "Richard Buckley",
        avatar: avatar7$4
      },
      subject: "Hospital small technology defense affect car.",
      cc: [],
      bcc: [],
      message: "<p>Finish race write suggest visit pay east. Might point heavy care.\nSociety who happen stock over toward account. Question shake city share marriage drug.\nEvery test total agency another like. Wall day word camera art.</p><p>As thus necessary degree always support fall. Leader town agree improve check career. Later service when artist customer blood.\nEasy daughter tend no raise. Throw glass various among nearly act if. Than area sort trial many marriage old decision.</p><p>Worker coach together raise civil term themselves. Television something ok thank.\nAlmost song task there budget quite process than. Sell which apply environmental.\nDrop mind computer increase born.\nAuthor with will time. Garden others agency wall.</p>",
      attachments: [],
      isStarred: false,
      labels: ["personal", "company", "private"],
      time: "2021-07-09T06:36:05",
      replies: [],
      folder: "sent",
      isRead: true,
      isDeleted: false
    },
    {
      id: 13,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "kimberlyrobinson@hotmail.com",
        name: "James Brady",
        avatar: avatar3$6
      },
      subject: "There bar risk bring.",
      cc: [],
      bcc: [],
      message: "<p>Thought prepare want hand character design most. Run result attack before.\nVoice return give right way along. He lose change season less cell moment use. Today benefit would somebody.</p><p>Million area million across near company heart. Happen official knowledge look. Turn class interesting.\nGive product fund would factor into hope. Everyone painting program forget including.</p><p>Begin force foreign degree detail oil such.\nFirm scene individual here point. Particular interview before people last shoulder. Appear until spend under along magazine.</p>",
      attachments: [],
      isStarred: true,
      labels: ["personal"],
      time: "2021-07-06T02:27:43",
      replies: [],
      folder: "inbox",
      isRead: true,
      isDeleted: true
    },
    {
      id: 12,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "ugray@gmail.com", name: "Jane Buckley", avatar: avatar2$7 },
      subject: "Picture everything throw happen nothing social.",
      cc: [],
      bcc: [],
      message: "<p>Cell role hundred husband president figure. Make how real again.\nDevelopment image develop Republican. Military head drop. Relate wait able art.\nPolice response range establish back. Chance assume subject stock appear good research.</p><p>Thousand PM speech hear three yard should for.\nMachine crime too represent campaign book. According call each.\nPicture site create sister. Opportunity become who never bed number develop set. Major finish everyone meet vote letter across.</p><p>Reality send American. Democratic serious event oil lose. Tax position down front service improve election.\nThreat heavy over. Each leave several writer card politics. Question feel technology many thank.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important"],
      time: "2021-07-18T13:42:20",
      replies: [],
      folder: "spam",
      isRead: false,
      isDeleted: false
    },
    {
      id: 11,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "morrisjaclyn@gmail.com",
        name: "Kathryn Smith",
        avatar: avatar6$5
      },
      subject: "Green attorney government same course join in woman.",
      cc: [],
      bcc: [],
      message: "<p>Employee society live back. Bar woman film education.\nImportant report avoid. Wait nor goal. As morning say clear.\nBody strong of alone camera fall. Civil program particular first garden. Social become voice law quality.</p><p>Mouth whole for positive. Certain tough especially nature claim box.\nFill space allow second second cut. Bank want why decide recognize space.</p><p>Outside ability second whose second. Point stand bank list defense understand seat.\nClear finish follow media sing type. Technology white practice miss price.\nDifference establish some nation western job meeting. Give article beautiful.</p>",
      attachments: [],
      isStarred: false,
      labels: ["private"],
      time: "2021-07-08T14:51:49",
      replies: [
        {
          id: 133615687,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "juan31@gmail.com",
            name: "Jennifer Robinson",
            avatar: avatar8$4
          },
          subject: "Beautiful despite note couple pretty issue near.",
          cc: [],
          bcc: [],
          message: "<p>Store use cultural human smile. Subject trip that laugh.\nWalk sense a operation about window small southern. Show road them movement.</p><p>Water behind do else just. Reach mean science yet among what.\nGreen modern design us know use others weight. Recently wonder soldier within plan.\nRoom test story see southern special nice. Drop take mind plant throw American my. A husband sit thing.</p><p>There performance fine coach way majority truth. House beyond candidate beyond debate painting alone. There significant poor something chance spring. Yeah worry white Democrat.</p>",
          attachments: [],
          isStarred: false,
          labels: ["private"],
          time: "2021-07-13T14:02:08",
          replies: [],
          folder: "sent",
          isRead: true,
          isDeleted: false
        },
        {
          id: 867,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "gflores@hotmail.com",
            name: "Cindy Hernandez",
            avatar: avatar2$7
          },
          subject: "Watch vote decide compare start.",
          cc: [],
          bcc: [],
          message: "<p>Choice race different. Yard case newspaper wide series growth identify.\nBeyond go rest read me. Though quite industry method animal organization leave quality.</p><p>Back music theory fund produce. Foreign hard board learn home add. Data political buy budget think.\nBook consumer future writer. Bag evidence thus school.\nDifficult my accept yard. Million loss officer person language to. Television room feeling.</p><p>Country myself current tough image school. Court activity catch low value. Hotel local through.\nFocus attorney computer evening you always. Guess require event picture director. Garden floor month husband mention.</p>",
          attachments: [],
          isStarred: true,
          labels: ["company", "important", "private"],
          time: "2021-07-12T14:38:42",
          replies: [],
          folder: "sent",
          isRead: true,
          isDeleted: false
        },
        {
          id: 7,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "judyvillarreal@hotmail.com",
            name: "Amy Chavez",
            avatar: avatar8$4
          },
          subject: "Member around task woman as.",
          cc: [],
          bcc: [],
          message: "<p>Police physical down generation condition throw foot relate. Table experience represent practice development.\nOrder option success thank miss. Tree knowledge light police service remain during. Entire respond join hit kind enjoy language.</p><p>Modern page social decide though small realize impact. Around special difficult level organization course her.\nMr tree three former this husband hold. Local expert especially should writer visit moment. Quite move travel less.</p><p>Nearly loss those democratic bring production. Ago economic method consider discuss.\nCapital approach red but reveal successful. Middle television treatment. Turn recent reflect interview.</p>",
          attachments: [],
          isStarred: true,
          labels: ["company", "private"],
          time: "2021-07-17T02:32:58",
          replies: [],
          folder: "spam",
          isRead: true,
          isDeleted: false
        },
        {
          id: 59708653,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "mwalker@hotmail.com",
            name: "Marcus Campbell",
            avatar: avatar3$6
          },
          subject: "Woman ability middle choose vote few ability.",
          cc: [],
          bcc: [],
          message: "<p>Because structure put. Face business possible light box.\nSmile group six history financial. General try financial either discuss like million. Begin create fill series age.\nExist control popular begin deep. Sit another health live.</p><p>Politics side finally senior sit here activity protect. Heavy major control education. Bad involve want skill project feel.\nNone usually kid study eight. Civil consider effort. Marriage front their live eye significant far.</p><p>Scene keep major bank up prepare others. Change century brother media energy alone. Life range explain interest address.\nMedical account indicate hit start live support. Prove popular claim direction college.</p>",
          attachments: [],
          isStarred: false,
          labels: ["private"],
          time: "2021-07-04T03:37:29",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: true
        },
        {
          id: 804622,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "lauramartin@hotmail.com",
            name: "Connie Osborne",
            avatar: avatar8$4
          },
          subject: "Heavy ball debate style message main rate.",
          cc: [],
          bcc: [],
          message: "<p>Feeling ability finish kitchen majority same moment. Decision money compare really education deal. Officer get be food ahead compare stay.\nDeep teacher state. Guy purpose too remain help enough.</p><p>Cut city father while green both information.\nLetter left fall body general. Very exactly common though policy star. Former health arm respond treatment.\nEnter industry will trouble day authority agree blood. Indeed air until but idea nor enter.</p><p>Site direction lay hotel these. Role focus affect focus before. Gas fill figure rise marriage like offer child.\nAgainst wall either. Mind one ready total. Fly food why part for again season.</p>",
          attachments: [],
          isStarred: true,
          labels: ["company", "important", "private"],
          time: "2021-07-02T03:33:03",
          replies: [],
          folder: "sent",
          isRead: true,
          isDeleted: false
        }
      ],
      folder: "inbox",
      isRead: true,
      isDeleted: false
    },
    {
      id: 10,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "sean36@gmail.com", name: "Ronald Buckley", avatar: avatar5$5 },
      subject: "Blue both light anyone trial nor approach tough.",
      cc: [],
      bcc: [],
      message: "<p>Take anything season ok. Nor than war fine speak happen. Where business hold continue message state for.\nMorning southern allow. Mission color camera how Republican behind. Learn five break suffer.</p><p>Over born sure continue. Option show meet however.\nModel no mean us. Enough as space herself article bring others. Place them need drive cost decide.</p><p>Million friend remain product eye Congress. Education near amount middle.\nSay key past if shoulder rule. Others mean behind case interesting bag near option. Step why example mean thus. Fish forget turn never kind boy anyone.</p>",
      attachments: [],
      isStarred: true,
      labels: ["personal", "important"],
      time: "2021-07-11T11:09:30",
      replies: [],
      folder: "spam",
      isRead: true,
      isDeleted: false
    },
    {
      id: 9,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "wkline@yahoo.com", name: "Jennifer Garcia", avatar: avatar6$5 },
      subject: "Simply idea project health prevent beyond both after.",
      cc: [],
      bcc: [],
      message: "<p>Second again well doctor because election necessary point. Campaign about from western themselves particular loss popular. During garden star couple water simply area.</p><p>Worker leave know mission southern. Sea eye walk moment.\nCamera executive education wall marriage say. Man tend perform. Issue area great financial note other guess.</p><p>Likely market physical heavy quite we.\nRecent how room page sit fast Congress fight. Interview establish watch water.\nLoss family picture mind consumer about PM. Safe natural size. Character recognize painting movie.</p>",
      attachments: [],
      isStarred: false,
      labels: ["personal", "company"],
      time: "2021-07-17T20:25:41",
      replies: [],
      folder: "inbox",
      isRead: false,
      isDeleted: false
    },
    {
      id: 8,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "tolson@gmail.com", name: "Lindsey Melton", avatar: avatar2$7 },
      subject: "Amount collection marriage price.",
      cc: [],
      bcc: [],
      message: "<p>Join list dog rate doctor surface share. Meeting beat particular sing apply space.\nClear down thought magazine meet.\nWould better sport wide personal matter. Analysis effort school officer such. Age blue future her start marriage.</p><p>Material year close beat rest happy. Interview material over thought. Win until morning certainly.\nDevelopment personal direction game present.</p><p>Accept wall price hair garden staff. Enough off rest. Beyond half small lay agency.\nOption in hand charge direction least message. Safe minute situation just floor. Guess month than already.</p>",
      attachments: [],
      isStarred: false,
      labels: ["company"],
      time: "2021-07-25T05:19:46",
      replies: [],
      folder: "inbox",
      isRead: false,
      isDeleted: false
    },
    {
      id: 7,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "jeffrey89@gmail.com", name: "Amanda Pratt", avatar: avatar4$5 },
      subject: "Pull clear protect start exactly purpose scientist food.",
      cc: [],
      bcc: [],
      message: "<p>See beautiful necessary hold. Marriage TV cut look chance whom.\nHeavy girl like only special position hot throw.\nReligious someone value girl save avoid. Market soon against central baby. So follow paper run along bag.</p><p>Worry provide form. Walk receive adult.\nMind style campaign blood. Public sign allow history nature customer. Offer how answer join.\nDiscussion blue Congress half important beat without. Authority key personal forget quickly model quickly really.</p><p>Better know magazine. Attention discuss staff turn affect tough.\nSo later whose reveal follow. Almost someone end. Rate necessary dog strategy.\nHope administration born his. Upon foot vote ability medical. Poor behind stage opportunity.</p>",
      attachments: [],
      isStarred: false,
      labels: ["company"],
      time: "2021-07-12T16:41:20",
      replies: [],
      folder: "spam",
      isRead: true,
      isDeleted: false
    },
    {
      id: 6,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "gentryjeff@yahoo.com", name: "Joseph Clark", avatar: avatar3$6 },
      subject: "Grow seat discover.",
      cc: [],
      bcc: [],
      message: "<p>Become laugh and up onto. Sister raise pretty material picture. Own middle region open.\nProcess rock throw kind.\nQuestion them interest some international notice agreement. Control remember purpose.</p><p>Level consumer contain process rise system. Ten responsibility finally detail development else.\nRace well letter. Over receive it might.\nDifferent use send than he everyone. Drive answer develop bad past budget.</p><p>Increase prove theory million lose down quickly.\nMoment young just position information.\nName discover different majority use seek. Religious world discover never pressure ok develop. Name also all. Drug city program way.</p>",
      attachments: [],
      isStarred: true,
      labels: ["personal", "private"],
      time: "2021-07-20T13:44:07",
      replies: [],
      folder: "inbox",
      isRead: true,
      isDeleted: true
    },
    {
      id: 5,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "maciaspatricia@hotmail.com",
        name: "Alisha Hughes",
        avatar: avatar4$5
      },
      subject: "Play hope gas military that.",
      cc: [],
      bcc: [],
      message: "<p>International hundred anything see ten but long. Collection edge difference turn other let price. Would ahead commercial may scene develop minute.\nOnly film avoid. Last dark party store. Collection another three movement network ready hit.</p><p>Report keep probably individual argue.\nKid activity style million. Late stage lawyer answer.\nReligious both opportunity wide. Once television amount necessary so line. Now simple shoulder ground.</p><p>Radio idea glass realize research floor. Why range brother baby own impact century. Believe service doctor once.\nKnowledge finally anything sea. Across certainly reality provide. Past center feeling financial.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important"],
      time: "2021-07-04T09:53:05",
      replies: [],
      folder: "spam",
      isRead: true,
      isDeleted: false
    },
    {
      id: 4,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "rvalenzuela@hotmail.com",
        name: "Michelle Murphy",
        avatar: avatar6$5
      },
      subject: "Anyone want yet forget effect.",
      cc: [],
      bcc: [],
      message: "<p>Expert space school material success security interest. Realize size seem growth game evidence. Time itself fine travel.\nCup reason environmental analysis.</p><p>Chance election look. Pretty job they officer other.\nBrother challenge military dark. Decade behavior several few race ball along. Amount rich suddenly stand. Mention street local site.</p><p>Join thus employee determine degree lead player. Color room ever soon easy. Administration toward experience why.\nSea hard detail rule. Strong factor language enjoy find.</p>",
      attachments: [],
      isStarred: false,
      labels: ["company", "important"],
      time: "2021-07-17T15:51:47",
      replies: [],
      folder: "spam",
      isRead: false,
      isDeleted: false
    },
    {
      id: 3,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "gbeltran@gmail.com", name: "Charles Cooper", avatar: avatar1$7 },
      subject: "Fight account night short.",
      cc: [],
      bcc: [],
      message: "<p>Get through stay. On difficult popular.\nFine turn mean artist. President explain turn professor fly prove cultural. Moment field front.\nSuccess almost various week. North message herself front eight. Final huge right happy.</p><p>Analysis rise son let. Age specific against visit.\nPerhaps series unit center total. Bed hour sense. Star morning history design late.\nOnce but fund share education. Majority face what year interest wish financial pretty.</p><p>Class treat enjoy stock seven natural establish indeed.\nHelp eat figure rich. Although bill discover build town.\nAsk continue claim here hand surface. Success foot action close treat.</p>",
      attachments: [
        {
          fileName: "log.txt",
          thumbnail: txt,
          url: "",
          size: "5mb"
        },
        {
          fileName: "performance.xls",
          thumbnail: xls,
          url: "",
          size: "10mb"
        }
      ],
      isStarred: true,
      labels: ["important", "company"],
      time: "2021-07-22T19:12:31",
      replies: [
        {
          id: 756051771,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "rwhitehead@yahoo.com",
            name: "Bruce Johnson",
            avatar: avatar3$6
          },
          subject: "Guy someone wind.",
          cc: [],
          bcc: [],
          message: "<p>Century those system character. Enter mind she baby compare movie. Soldier reality guy end meeting go.\nPositive only our important. Month world century impact nothing such bar. Term their himself safe its deep.</p><p>Coach bank agent value glass race. Instead reason suffer bar role action finally town. Political market window of although least will.\nGuess thought chance term.</p><p>Pressure tonight beyond because wait early leader prove. Ground reality court event bar. Behind manage really so four vote.\nSecond series score thus.\nRealize move around baby interview clear.</p>",
          attachments: [],
          isStarred: true,
          labels: ["personal", "private"],
          time: "2021-07-22T16:03:07",
          replies: [],
          folder: "spam",
          isRead: true,
          isDeleted: false
        },
        {
          id: 4255040,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "perezannette@gmail.com",
            name: "Kyle Christensen",
            avatar: avatar7$4
          },
          subject: "Each close probably.",
          cc: [],
          bcc: [],
          message: "<p>Late contain dream why ready go spring to. Against page medical wonder just fall card four. Unit live manager within feeling.\nSupport democratic lose list law. Baby address inside area or. Little individual remain sister area since thousand.</p><p>Culture effect similar clear population stuff himself quite. Trade story quality quite successful such.\nEven might his continue necessary thousand give. Record former tend determine true population reflect.</p><p>Dream when TV try loss central. Billion direction up run reduce that record. Ability then best draw.\nRich second yourself deep about foreign impact. Crime military appear shoulder bed. West job call home health woman lot.</p>",
          attachments: [],
          isStarred: true,
          labels: ["personal"],
          time: "2021-07-15T20:54:36",
          replies: [],
          folder: "draft",
          isRead: false,
          isDeleted: false
        },
        {
          id: 946586133,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "ramirezsarah@yahoo.com",
            name: "Tammy Lloyd",
            avatar: avatar8$4
          },
          subject: "Security set letter once.",
          cc: [],
          bcc: [],
          message: "<p>Hair kind piece main want evening career. Water artist source ago south design father. Mention movie number house yeah some government.\nScore rock idea seven establish of. Candidate oil fact about to spend about.</p><p>Not both energy key.\nMust face those idea address pull.\nLet look cover star place later. Personal student both window agency produce.\nRemember cause hour explain box worry. One upon might soon enter baby car consumer.</p><p>Character service your idea. Adult guess stay us. Law would improve.\nWithin official anyone Mr. Difference before record treatment perhaps audience culture. Along present experience because history challenge detail.</p>",
          attachments: [],
          isStarred: true,
          labels: ["company", "important"],
          time: "2021-07-20T05:34:05",
          replies: [],
          folder: "spam",
          isRead: true,
          isDeleted: false
        },
        {
          id: 182449812,
          to: [{ email: "johndoe@mail.com", name: "me" }],
          from: {
            email: "evansantonio@yahoo.com",
            name: "Shawn Flores",
            avatar: avatar5$5
          },
          subject: "Card yeah need shake.",
          cc: [],
          bcc: [],
          message: "<p>Fine wonder sister order rock conference lose should. Personal party drug sense way north. Hear stock political pick model.</p><p>Focus population expert sense past green. Call community property tough news instead bad. War explain former quite else explain next guy. Education like send method method.</p><p>Necessary detail teacher company discuss world activity. And me get star eat power. Read sound wish already culture seek because face. Attorney purpose green.</p>",
          attachments: [],
          isStarred: false,
          labels: ["personal", "private"],
          time: "2021-07-22T14:31:03",
          replies: [],
          folder: "inbox",
          isRead: true,
          isDeleted: true
        }
      ],
      folder: "inbox",
      isRead: true,
      isDeleted: false
    },
    {
      id: 2,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: {
        email: "wilsonwilliam@yahoo.com",
        name: "Rachel Palmer",
        avatar: avatar2$7
      },
      subject: "Account base lose detail.",
      cc: [],
      bcc: [],
      message: "<p>Religious system evidence star meeting notice draw. Garden audience sometimes strong imagine vote free.\nLow Republican nice. Toward fund decade ever. Likely itself serve camera risk adult imagine.</p><p>Main nice environmental address defense. Toward movie inside every. Else event message continue.\nReturn rise attorney black role. Individual build tonight soldier return environment successful. Dinner learn rock mother wife all.</p><p>Yard but card her then. Foreign evening ability my president dog guess. Leave husband south.\nHealth leg represent yeah. Turn sell onto kid several. Morning degree few.\nStart dark measure big end role. Property attention walk eye exist.</p>",
      attachments: [],
      isStarred: false,
      labels: ["important"],
      time: "2021-07-10T01:13:20",
      replies: [],
      folder: "draft",
      isRead: true,
      isDeleted: false
    },
    {
      id: 1,
      to: [{ email: "johndoe@mail.com", name: "me" }],
      from: { email: "edavid@yahoo.com", name: "Wendy Harris", avatar: avatar2$7 },
      subject: "Step face collection heart light cultural prepare.",
      cc: [],
      bcc: [],
      message: "<p>Suddenly man team would nor piece. Miss democratic receive.\nWindow measure drug success recent necessary group mission. Exist school under student rock trial treatment.\nRun season there social. Visit staff floor network improve home the.</p><p>Lay laugh sea sit food parent. Line move scientist floor establish like production. Decade PM exist moment.\nBeat under campaign say. Term gun local Congress democratic.</p><p>Chance poor attack far kitchen will. Appear thing also child whom manage hospital. Federal trouble fear between receive such involve here.\nSeek wife increase draw hair. Onto style minute democratic. Clearly music outside standard.</p>",
      attachments: [],
      isStarred: true,
      labels: ["important", "private"],
      time: "2021-07-18T11:43:46",
      replies: [],
      folder: "sent",
      isRead: true,
      isDeleted: false
    }
  ]
};

const index_get$e = defineEventHandler((event) => {
  const { q = "", filter = "inbox", label } = destr$1(getQuery$1(event));
  const queryLowered = q.toLowerCase();
  function isInFolder(email) {
    if (filter === "trashed")
      return email.isDeleted;
    if (filter === "starred")
      return email.isStarred && !email.isDeleted;
    return email.folder === (filter || email.folder) && !email.isDeleted;
  }
  const filteredData = db$9.emails.filter(
    (email) => (email.from.name.toLowerCase().includes(queryLowered) || email.subject.toLowerCase().includes(queryLowered)) && isInFolder(email) && (label ? email.labels.includes(label) : true)
  );
  const emailsMeta = {
    inbox: db$9.emails.filter((email) => !email.isDeleted && !email.isRead && email.folder === "inbox").length,
    draft: db$9.emails.filter((email) => email.folder === "draft").length,
    spam: db$9.emails.filter((email) => !email.isDeleted && !email.isRead && email.folder === "spam").length
  };
  setResponseStatus(event, 200);
  return { emails: filteredData, emailsMeta };
});

const index_get$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$e
});

const index_post$2 = defineEventHandler(async (event) => {
  const { ids: emailIds, data: dataToUpdate, label } = await readBody(event);
  const labelLocal = destr$1(label);
  if (!labelLocal) {
    let updateMailData = function(email) {
      Object.assign(email, dataToUpdate);
    };
    const emailIdsLocal = destr$1(emailIds);
    db$9.emails.forEach((email) => {
      if (emailIdsLocal.includes(email.id))
        updateMailData(email);
    });
    setResponseStatus(event, 200);
    return null;
  } else {
    let updateMailLabels = function(email) {
      const labelIndex = email.labels.indexOf(label);
      if (labelIndex === -1)
        email.labels.push(label);
      else email.labels.splice(labelIndex, 1);
    };
    db$9.emails.forEach((email) => {
      if (emailIds.includes(email.id))
        updateMailLabels(email);
    });
    setResponseStatus(event, 200);
    return null;
  }
});

const index_post$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$2
});

const now = /* @__PURE__ */ new Date();
const currentMonth = now.toLocaleString("default", { month: "2-digit" });
const avatar1$6 = getPublicUrl("/images/avatars/avatar-1.png");
const avatar2$6 = getPublicUrl("/images/avatars/avatar-2.png");
const avatar3$5 = getPublicUrl("/images/avatars/avatar-3.png");
const avatar5$4 = getPublicUrl("/images/avatars/avatar-5.png");
const avatar6$4 = getPublicUrl("/images/avatars/avatar-6.png");
const avatar8$3 = getPublicUrl("/images/avatars/avatar-8.png");
const avatar4$4 = getPublicUrl("/images/avatars/avatar-4.png");
const avatar7$3 = getPublicUrl("/images/avatars/avatar-7.png");
const database$1 = [
  {
    id: 4987,
    issuedDate: `${now.getFullYear()}-${currentMonth}-13`,
    client: {
      address: "7777 Mendez Plains",
      company: "Hall-Robbins PLC",
      companyEmail: "don85@johnson.com",
      country: "USA",
      contact: "(616) 865-4180",
      name: "Jordan Stevenson"
    },
    service: "Software Development",
    total: 3428,
    avatar: "",
    invoiceStatus: "Paid",
    balance: 724,
    dueDate: `${now.getFullYear()}-${currentMonth}-23`
  },
  {
    id: 4988,
    issuedDate: `${now.getFullYear()}-${currentMonth}-17`,
    client: {
      address: "04033 Wesley Wall Apt. 961",
      company: "Mccann LLC and Sons",
      companyEmail: "brenda49@taylor.info",
      country: "Haiti",
      contact: "(226) 204-8287",
      name: "Stephanie Burns"
    },
    service: "UI/UX Design & Development",
    total: 5219,
    avatar: avatar1$6,
    invoiceStatus: "Downloaded",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-15`
  },
  {
    id: 4989,
    issuedDate: `${now.getFullYear()}-${currentMonth}-19`,
    client: {
      address: "5345 Robert Squares",
      company: "Leonard-Garcia and Sons",
      companyEmail: "smithtiffany@powers.com",
      country: "Denmark",
      contact: "(955) 676-1076",
      name: "Tony Herrera"
    },
    service: "Unlimited Extended License",
    total: 3719,
    invoiceStatus: "Paid",
    avatar: avatar2$6,
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-03`
  },
  {
    id: 4990,
    issuedDate: `${now.getFullYear()}-${currentMonth}-06`,
    client: {
      address: "19022 Clark Parks Suite 149",
      company: "Smith, Miller and Henry LLC",
      companyEmail: "mejiageorge@lee-perez.com",
      country: "Cambodia",
      contact: "(832) 323-6914",
      name: "Kevin Patton"
    },
    service: "Software Development",
    total: 4749,
    avatar: avatar3$5,
    invoiceStatus: "Sent",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-11`
  },
  {
    id: 4991,
    issuedDate: `${now.getFullYear()}-${currentMonth}-08`,
    client: {
      address: "8534 Saunders Hill Apt. 583",
      company: "Garcia-Cameron and Sons",
      companyEmail: "brandon07@pierce.com",
      country: "Martinique",
      contact: "(970) 982-3353",
      name: "Mrs. Julie Donovan MD"
    },
    service: "UI/UX Design & Development",
    total: 4056,
    avatar: avatar4$4,
    invoiceStatus: "Draft",
    balance: 815,
    dueDate: `${now.getFullYear()}-${currentMonth}-30`
  },
  {
    id: 4992,
    issuedDate: `${now.getFullYear()}-${currentMonth}-26`,
    client: {
      address: "661 Perez Run Apt. 778",
      company: "Burnett-Young PLC",
      companyEmail: "guerrerobrandy@beasley-harper.com",
      country: "Botswana",
      contact: "(511) 938-9617",
      name: "Amanda Phillips"
    },
    service: "UI/UX Design & Development",
    total: 2771,
    avatar: "",
    invoiceStatus: "Paid",
    balance: 2771,
    dueDate: `${now.getFullYear()}-${currentMonth}-24`
  },
  {
    id: 4993,
    issuedDate: `${now.getFullYear()}-${currentMonth}-17`,
    client: {
      address: "074 Long Union",
      company: "Wilson-Lee LLC",
      companyEmail: "williamshenry@moon-smith.com",
      country: "Montserrat",
      contact: "(504) 859-2893",
      name: "Christina Collier"
    },
    service: "UI/UX Design & Development",
    total: 2713,
    avatar: "",
    invoiceStatus: "Draft",
    balance: 407,
    dueDate: `${now.getFullYear()}-${currentMonth}-22`
  },
  {
    id: 4994,
    issuedDate: `${now.getFullYear()}-${currentMonth}-11`,
    client: {
      address: "5225 Ford Cape Apt. 840",
      company: "Schwartz, Henry and Rhodes Group",
      companyEmail: "margaretharvey@russell-murray.com",
      country: "Oman",
      contact: "(758) 403-7718",
      name: "David Flores"
    },
    service: "Template Customization",
    total: 4309,
    avatar: avatar5$4,
    invoiceStatus: "Paid",
    balance: -205,
    dueDate: `${now.getFullYear()}-${currentMonth}-13`
  },
  {
    id: 4995,
    issuedDate: `${now.getFullYear()}-${currentMonth}-16`,
    client: {
      address: "23717 James Club Suite 277",
      company: "Henderson-Holder PLC",
      companyEmail: "dianarodriguez@villegas.com",
      country: "Cambodia",
      contact: "(292) 873-8254",
      name: "Valerie Perez"
    },
    service: "Software Development",
    total: 3367,
    avatar: avatar6$4,
    invoiceStatus: "Downloaded",
    balance: 3367,
    dueDate: `${now.getFullYear()}-${currentMonth}-24`
  },
  {
    id: 4996,
    issuedDate: `${now.getFullYear()}-${currentMonth}-15`,
    client: {
      address: "4528 Myers Gateway",
      company: "Page-Wise PLC",
      companyEmail: "bwilson@norris-brock.com",
      country: "Guam",
      contact: "(956) 803-2008",
      name: "Susan Dickerson"
    },
    service: "Software Development",
    total: 4776,
    avatar: avatar7$3,
    invoiceStatus: "Downloaded",
    balance: 305,
    dueDate: `${now.getFullYear()}-${currentMonth}-02`
  },
  {
    id: 4997,
    issuedDate: `${now.getFullYear()}-${currentMonth}-27`,
    client: {
      address: "4234 Mills Club Suite 107",
      company: "Turner PLC Inc",
      companyEmail: "markcampbell@bell.info",
      country: "United States Virgin Islands",
      contact: "(716) 962-8635",
      name: "Kelly Smith"
    },
    service: "Unlimited Extended License",
    total: 3789,
    avatar: avatar8$3,
    invoiceStatus: "Partial Payment",
    balance: 666,
    dueDate: `${now.getFullYear()}-${currentMonth}-18`
  },
  {
    id: 4998,
    issuedDate: `${now.getFullYear()}-${currentMonth}-31`,
    client: {
      address: "476 Keith Meadow",
      company: "Levine-Dorsey PLC",
      companyEmail: "mary61@rosario.com",
      country: "Syrian Arab Republic",
      contact: "(523) 449-0782",
      name: "Jamie Jones"
    },
    service: "Unlimited Extended License",
    total: 5200,
    avatar: avatar2$6,
    invoiceStatus: "Partial Payment",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-17`
  },
  {
    id: 4999,
    issuedDate: `${now.getFullYear()}-${currentMonth}-14`,
    client: {
      address: "56381 Ashley Village Apt. 332",
      company: "Hall, Thompson and Ramirez LLC",
      companyEmail: "sean22@cook.com",
      country: "Ukraine",
      contact: "(583) 470-8356",
      name: "Ruben Garcia"
    },
    service: "Software Development",
    total: 4558,
    avatar: avatar1$6,
    invoiceStatus: "Paid",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-01`
  },
  {
    id: 5e3,
    issuedDate: `${now.getFullYear()}-${currentMonth}-21`,
    client: {
      address: "6946 Gregory Plaza Apt. 310",
      company: "Lambert-Thomas Group",
      companyEmail: "mccoymatthew@lopez-jenkins.net",
      country: "Vanuatu",
      contact: "(366) 906-6467",
      name: "Ryan Meyer"
    },
    service: "Template Customization",
    total: 3503,
    avatar: avatar7$3,
    invoiceStatus: "Paid",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-22`
  },
  {
    id: 5001,
    issuedDate: `${now.getFullYear()}-${currentMonth}-30`,
    client: {
      address: "64351 Andrew Lights",
      company: "Gregory-Haynes PLC",
      companyEmail: "novakshannon@mccarty-murillo.com",
      country: "Romania",
      contact: "(320) 616-3915",
      name: "Valerie Valdez"
    },
    service: "Unlimited Extended License",
    total: 5285,
    avatar: avatar6$4,
    invoiceStatus: "Partial Payment",
    balance: -202,
    dueDate: `${now.getFullYear()}-${currentMonth}-02`
  },
  {
    id: 5002,
    issuedDate: `${now.getFullYear()}-${currentMonth}-21`,
    client: {
      address: "5702 Sarah Heights",
      company: "Wright-Schmidt LLC",
      companyEmail: "smithrachel@davis-rose.net",
      country: "Costa Rica",
      contact: "(435) 899-1963",
      name: "Melissa Wheeler"
    },
    service: "UI/UX Design & Development",
    total: 3668,
    avatar: avatar5$4,
    invoiceStatus: "Downloaded",
    balance: 731,
    dueDate: `${now.getFullYear()}-${currentMonth}-15`
  },
  {
    id: 5003,
    issuedDate: `${now.getFullYear()}-${currentMonth}-30`,
    client: {
      address: "668 Robert Flats",
      company: "Russell-Abbott Ltd",
      companyEmail: "scott96@mejia.net",
      country: "Congo",
      contact: "(254) 399-4728",
      name: "Alan Jimenez"
    },
    service: "Unlimited Extended License",
    total: 4372,
    avatar: "",
    invoiceStatus: "Sent",
    balance: -344,
    dueDate: `${now.getFullYear()}-${currentMonth}-17`
  },
  {
    id: 5004,
    issuedDate: `${now.getFullYear()}-${currentMonth}-27`,
    client: {
      address: "55642 Chang Extensions Suite 373",
      company: "Williams LLC Inc",
      companyEmail: "cramirez@ross-bass.biz",
      country: "Saint Pierre and Miquelon",
      contact: "(648) 500-4338",
      name: "Jennifer Morris"
    },
    service: "Template Customization",
    total: 3198,
    avatar: avatar4$4,
    invoiceStatus: "Partial Payment",
    balance: -253,
    dueDate: `${now.getFullYear()}-${currentMonth}-16`
  },
  {
    id: 5005,
    issuedDate: `${now.getFullYear()}-${currentMonth}-30`,
    client: {
      address: "56694 Eric Orchard",
      company: "Hudson, Bell and Phillips PLC",
      companyEmail: "arielberg@wolfe-smith.com",
      country: "Uruguay",
      contact: "(896) 544-3796",
      name: "Timothy Stevenson"
    },
    service: "Unlimited Extended License",
    total: 5293,
    avatar: "",
    invoiceStatus: "Past Due",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-01`
  },
  {
    id: 5006,
    issuedDate: `${now.getFullYear()}-${currentMonth}-10`,
    client: {
      address: "3727 Emma Island Suite 879",
      company: "Berry, Gonzalez and Heath Inc",
      companyEmail: "yrobinson@nichols.com",
      country: "Israel",
      contact: "(236) 784-5142",
      name: "Erik Hayden"
    },
    service: "Template Customization",
    total: 5612,
    avatar: avatar3$5,
    invoiceStatus: "Downloaded",
    balance: 883,
    dueDate: `${now.getFullYear()}-${currentMonth}-12`
  },
  {
    id: 5007,
    issuedDate: `${now.getFullYear()}-${currentMonth}-01`,
    client: {
      address: "953 Miller Common Suite 580",
      company: "Martinez, Fuller and Chavez and Sons",
      companyEmail: "tatejennifer@allen.net",
      country: "Cook Islands",
      contact: "(436) 717-2419",
      name: "Katherine Kennedy"
    },
    service: "Software Development",
    total: 2230,
    avatar: avatar2$6,
    invoiceStatus: "Sent",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-19`
  },
  {
    id: 5008,
    issuedDate: `${now.getFullYear()}-${currentMonth}-22`,
    client: {
      address: "808 Sullivan Street Apt. 135",
      company: "Wilson and Sons LLC",
      companyEmail: "gdurham@lee.com",
      country: "Nepal",
      contact: "(489) 946-3041",
      name: "Monica Fuller"
    },
    service: "Unlimited Extended License",
    total: 2032,
    avatar: avatar1$6,
    invoiceStatus: "Partial Payment",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-30`
  },
  {
    id: 5009,
    issuedDate: `${now.getFullYear()}-${currentMonth}-30`,
    client: {
      address: "25135 Christopher Creek",
      company: "Hawkins, Johnston and Mcguire PLC",
      companyEmail: "jenny96@lawrence-thompson.com",
      country: "Kiribati",
      contact: "(274) 246-3725",
      name: "Stacey Carter"
    },
    service: "UI/UX Design & Development",
    total: 3128,
    avatar: avatar8$3,
    invoiceStatus: "Paid",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-10`
  },
  {
    id: 5010,
    issuedDate: `${now.getFullYear()}-${currentMonth}-06`,
    client: {
      address: "81285 Rebecca Estates Suite 046",
      company: "Huynh-Mills and Sons",
      companyEmail: "jgutierrez@jackson.com",
      country: "Swaziland",
      contact: "(258) 211-5970",
      name: "Chad Davis"
    },
    service: "Software Development",
    total: 2060,
    avatar: avatar7$3,
    invoiceStatus: "Downloaded",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-08`
  },
  {
    id: 5011,
    issuedDate: `${now.getFullYear()}-${currentMonth}-01`,
    client: {
      address: "3102 Briggs Dale Suite 118",
      company: "Jones-Cooley and Sons",
      companyEmail: "hunter14@jones.com",
      country: "Congo",
      contact: "(593) 965-4100",
      name: "Chris Reyes"
    },
    service: "UI/UX Design & Development",
    total: 4077,
    avatar: "",
    invoiceStatus: "Draft",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-01`
  },
  {
    id: 5012,
    issuedDate: `${now.getFullYear()}-${currentMonth}-30`,
    client: {
      address: "811 Jill Skyway",
      company: "Jones PLC Ltd",
      companyEmail: "pricetodd@johnson-jenkins.com",
      country: "Brazil",
      contact: "(585) 829-2603",
      name: "Laurie Summers"
    },
    service: "Template Customization",
    total: 2872,
    avatar: avatar6$4,
    invoiceStatus: "Partial Payment",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-18`
  },
  {
    id: 5013,
    issuedDate: `${now.getFullYear()}-${currentMonth}-05`,
    client: {
      address: "2223 Brandon Inlet Suite 597",
      company: "Jordan, Gomez and Ross Group",
      companyEmail: "perrydavid@chapman-rogers.com",
      country: "Congo",
      contact: "(527) 351-5517",
      name: "Lindsay Wilson"
    },
    service: "Software Development",
    total: 3740,
    avatar: avatar4$4,
    invoiceStatus: "Draft",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-01`
  },
  {
    id: 5014,
    issuedDate: `${now.getFullYear()}-${currentMonth}-01`,
    client: {
      address: "08724 Barry Causeway",
      company: "Gonzalez, Moody and Glover LLC",
      companyEmail: "leahgriffin@carpenter.com",
      country: "Equatorial Guinea",
      contact: "(628) 903-0132",
      name: "Jenna Castro"
    },
    service: "Unlimited Extended License",
    total: 3623,
    avatar: "",
    invoiceStatus: "Downloaded",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-23`
  },
  {
    id: 5015,
    issuedDate: `${now.getFullYear()}-${currentMonth}-16`,
    client: {
      address: "073 Holt Ramp Apt. 755",
      company: "Ashley-Pacheco Ltd",
      companyEmail: "esparzadaniel@allen.com",
      country: "Seychelles",
      contact: "(847) 396-9904",
      name: "Wendy Weber"
    },
    service: "Software Development",
    total: 2477,
    avatar: avatar5$4,
    invoiceStatus: "Draft",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-01`
  },
  {
    id: 5016,
    issuedDate: `${now.getFullYear()}-${currentMonth}-24`,
    client: {
      address: "984 Sherry Trail Apt. 953",
      company: "Berry PLC Group",
      companyEmail: "todd34@owens-morgan.com",
      country: "Ireland",
      contact: "(852) 249-4539",
      name: "April Yates"
    },
    service: "Unlimited Extended License",
    total: 3904,
    avatar: "",
    invoiceStatus: "Paid",
    balance: 951,
    dueDate: `${now.getFullYear()}-${currentMonth}-30`
  },
  {
    id: 5017,
    issuedDate: `${now.getFullYear()}-${currentMonth}-24`,
    client: {
      address: "093 Jonathan Camp Suite 953",
      company: "Allen Group Ltd",
      companyEmail: "roydavid@bailey.com",
      country: "Netherlands",
      contact: "(917) 984-2232",
      name: "Daniel Marshall PhD"
    },
    service: "UI/UX Design & Development",
    total: 3102,
    avatar: avatar3$5,
    invoiceStatus: "Partial Payment",
    balance: -153,
    dueDate: `${now.getFullYear()}-${currentMonth}-25`
  },
  {
    id: 5018,
    issuedDate: `${now.getFullYear()}-${currentMonth}-29`,
    client: {
      address: "4735 Kristie Islands Apt. 259",
      company: "Chapman-Schneider LLC",
      companyEmail: "baldwinjoel@washington.com",
      country: "Cocos (Keeling) Islands",
      contact: "(670) 409-3703",
      name: "Randy Rich"
    },
    service: "UI/UX Design & Development",
    total: 2483,
    avatar: avatar2$6,
    invoiceStatus: "Draft",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-10`
  },
  {
    id: 5019,
    issuedDate: `${now.getFullYear()}-${currentMonth}-07`,
    client: {
      address: "92218 Andrew Radial",
      company: "Mcclure, Hernandez and Simon Ltd",
      companyEmail: "psmith@morris.info",
      country: "Macao",
      contact: "(646) 263-0257",
      name: "Mrs. Jodi Chapman"
    },
    service: "Unlimited Extended License",
    total: 2825,
    avatar: avatar1$6,
    invoiceStatus: "Partial Payment",
    balance: -459,
    dueDate: `${now.getFullYear()}-${currentMonth}-14`
  },
  {
    id: 5020,
    issuedDate: `${now.getFullYear()}-${currentMonth}-10`,
    client: {
      address: "2342 Michelle Valley",
      company: "Hamilton PLC and Sons",
      companyEmail: "lori06@morse.com",
      country: "Somalia",
      contact: "(751) 213-4288",
      name: "Steven Myers"
    },
    service: "Unlimited Extended License",
    total: 2029,
    avatar: avatar2$6,
    invoiceStatus: "Past Due",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-28`
  },
  {
    id: 5021,
    issuedDate: `${now.getFullYear()}-${currentMonth}-02`,
    client: {
      address: "16039 Brittany Terrace Apt. 128",
      company: "Silva-Reeves LLC",
      companyEmail: "zpearson@miller.com",
      country: "Slovakia (Slovak Republic)",
      contact: "(655) 649-7872",
      name: "Charles Alexander"
    },
    service: "Software Development",
    total: 3208,
    avatar: "",
    invoiceStatus: "Sent",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-06`
  },
  {
    id: 5022,
    issuedDate: `${now.getFullYear()}-${currentMonth}-02`,
    client: {
      address: "37856 Olsen Lakes Apt. 852",
      company: "Solis LLC Ltd",
      companyEmail: "strongpenny@young.net",
      country: "Brazil",
      contact: "(402) 935-0735",
      name: "Elizabeth Jones"
    },
    service: "Software Development",
    total: 3077,
    avatar: "",
    invoiceStatus: "Sent",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-09`
  },
  {
    id: 5023,
    issuedDate: `${now.getFullYear()}-${currentMonth}-23`,
    client: {
      address: "11489 Griffin Plaza Apt. 927",
      company: "Munoz-Peters and Sons",
      companyEmail: "carrietorres@acosta.com",
      country: "Argentina",
      contact: "(915) 448-6271",
      name: "Heidi Walton"
    },
    service: "Software Development",
    total: 5578,
    avatar: avatar4$4,
    invoiceStatus: "Draft",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-23`
  },
  {
    id: 5024,
    issuedDate: `${now.getFullYear()}-${currentMonth}-28`,
    client: {
      address: "276 Michael Gardens Apt. 004",
      company: "Shea, Velez and Garcia LLC",
      companyEmail: "zjohnson@nichols-powers.com",
      country: "Philippines",
      contact: "(817) 700-2984",
      name: "Christopher Allen"
    },
    service: "Software Development",
    total: 2787,
    avatar: avatar5$4,
    invoiceStatus: "Partial Payment",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-25`
  },
  {
    id: 5025,
    issuedDate: `${now.getFullYear()}-${currentMonth}-21`,
    client: {
      address: "633 Bell Well Apt. 057",
      company: "Adams, Simmons and Brown Group",
      companyEmail: "kayla09@thomas.com",
      country: "Martinique",
      contact: "(266) 611-9482",
      name: "Joseph Oliver"
    },
    service: "UI/UX Design & Development",
    total: 5591,
    avatar: "",
    invoiceStatus: "Downloaded",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-07`
  },
  {
    id: 5026,
    issuedDate: `${now.getFullYear()}-${currentMonth}-24`,
    client: {
      address: "1068 Lopez Fall",
      company: "Williams-Lawrence and Sons",
      companyEmail: "melvindavis@allen.info",
      country: "Mexico",
      contact: "(739) 745-9728",
      name: "Megan Roberts"
    },
    service: "Template Customization",
    total: 2783,
    avatar: avatar6$4,
    invoiceStatus: "Draft",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-22`
  },
  {
    id: 5027,
    issuedDate: `${now.getFullYear()}-${currentMonth}-13`,
    client: {
      address: "86691 Mackenzie Light Suite 568",
      company: "Deleon Inc LLC",
      companyEmail: "gjordan@fernandez-coleman.com",
      country: "Costa Rica",
      contact: "(682) 804-6506",
      name: "Mary Garcia"
    },
    service: "Template Customization",
    total: 2719,
    avatar: "",
    invoiceStatus: "Sent",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-04`
  },
  {
    id: 5028,
    issuedDate: `${now.getFullYear()}-${currentMonth}-18`,
    client: {
      address: "86580 Sarah Bridge",
      company: "Farmer, Johnson and Anderson Group",
      companyEmail: "robertscott@garcia.com",
      country: "Cameroon",
      contact: "(775) 366-0411",
      name: "Crystal Mays"
    },
    service: "Template Customization",
    total: 3325,
    avatar: "",
    invoiceStatus: "Paid",
    balance: 361,
    dueDate: `${now.getFullYear()}-${currentMonth}-02`
  },
  {
    id: 5029,
    issuedDate: `${now.getFullYear()}-${currentMonth}-29`,
    client: {
      address: "49709 Edwin Ports Apt. 353",
      company: "Sherman-Johnson PLC",
      companyEmail: "desiree61@kelly.com",
      country: "Macedonia",
      contact: "(510) 536-6029",
      name: "Nicholas Tanner"
    },
    service: "Template Customization",
    total: 3851,
    avatar: "",
    invoiceStatus: "Paid",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-25`
  },
  {
    id: 5030,
    issuedDate: `${now.getFullYear()}-${currentMonth}-07`,
    client: {
      address: "3856 Mathis Squares Apt. 584",
      company: "Byrd LLC PLC",
      companyEmail: "jeffrey25@martinez-hodge.com",
      country: "Congo",
      contact: "(253) 230-4657",
      name: "Justin Richardson"
    },
    service: "Template Customization",
    total: 5565,
    avatar: "",
    invoiceStatus: "Draft",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-06`
  },
  {
    id: 5031,
    issuedDate: `${now.getFullYear()}-${currentMonth}-21`,
    client: {
      address: "141 Adrian Ridge Suite 550",
      company: "Stone-Zimmerman Group",
      companyEmail: "john77@anderson.net",
      country: "Falkland Islands (Malvinas)",
      contact: "(612) 546-3485",
      name: "Jennifer Summers"
    },
    service: "Template Customization",
    total: 3313,
    avatar: avatar7$3,
    invoiceStatus: "Partial Payment",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-09`
  },
  {
    id: 5032,
    issuedDate: `${now.getFullYear()}-${currentMonth}-31`,
    client: {
      address: "01871 Kristy Square",
      company: "Yang, Hansen and Hart PLC",
      companyEmail: "ywagner@jones.com",
      country: "Germany",
      contact: "(203) 601-8603",
      name: "Richard Payne"
    },
    service: "Template Customization",
    total: 5181,
    avatar: "",
    invoiceStatus: "Past Due",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-29`
  },
  {
    id: 5033,
    issuedDate: `${now.getFullYear()}-${currentMonth}-12`,
    client: {
      address: "075 Smith Views",
      company: "Jenkins-Rosales Inc",
      companyEmail: "calvin07@joseph-edwards.org",
      country: "Colombia",
      contact: "(895) 401-4255",
      name: "Lori Wells"
    },
    service: "Template Customization",
    total: 2869,
    avatar: avatar4$4,
    invoiceStatus: "Partial Payment",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-22`
  },
  {
    id: 5034,
    issuedDate: `${now.getFullYear()}-${currentMonth}-10`,
    client: {
      address: "2577 Pearson Overpass Apt. 314",
      company: "Mason-Reed PLC",
      companyEmail: "eric47@george-castillo.com",
      country: "Paraguay",
      contact: "(602) 336-9806",
      name: "Tammy Sanchez"
    },
    service: "Unlimited Extended License",
    total: 4836,
    avatar: "",
    invoiceStatus: "Paid",
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-22`
  },
  {
    id: 5035,
    issuedDate: `${now.getFullYear()}-${currentMonth}-20`,
    client: {
      address: "1770 Sandra Mountains Suite 636",
      company: "Foster-Pham PLC",
      companyEmail: "jamesjoel@chapman.net",
      country: "Western Sahara",
      contact: "(936) 550-1638",
      name: "Dana Carey"
    },
    service: "UI/UX Design & Development",
    total: 4263,
    avatar: "",
    invoiceStatus: "Draft",
    balance: 762,
    dueDate: `${now.getFullYear()}-${currentMonth}-12`
  },
  {
    id: 5036,
    issuedDate: `${now.getFullYear()}-${currentMonth}-19`,
    client: {
      address: "78083 Laura Pines",
      company: "Richardson and Sons LLC",
      companyEmail: "pwillis@cross.org",
      country: "Bhutan",
      contact: "(687) 660-2473",
      name: "Andrew Burns"
    },
    service: "Unlimited Extended License",
    total: 3171,
    avatar: avatar3$5,
    invoiceStatus: "Paid",
    balance: -205,
    dueDate: `${now.getFullYear()}-${currentMonth}-25`
  }
];

const _id__delete$6 = defineEventHandler((event) => {
  const invoiceId = getIntId(event, "User id is required to get user details");
  const id = Number(invoiceId);
  const invoiceIndex = database$1.findIndex((e) => e.id === id);
  if (invoiceIndex >= 0) {
    database$1.splice(invoiceIndex, 1);
    setResponseStatus(event, 204);
    return null;
  }
  setResponseStatus(event, 204);
});

const _id__delete$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$6
});

const _id__get$2 = defineEventHandler((event) => {
  const invoiceId = getIntId(event, "User id is required to get user details");
  const id = Number(invoiceId);
  const invoice = database$1.find((e) => e.id === id);
  if (!invoice) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invoice not found"
    });
  }
  return {
    invoice,
    paymentDetails: {
      totalDue: "$12,110.55",
      bankName: "American Bank",
      country: "United States",
      iban: "ETD95476213874685",
      swiftCode: "BR91905"
    }
  };
});

const _id__get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$2
});

const clients_get = defineEventHandler((event) => {
  const clients = database$1.map((invoice) => invoice.client);
  setResponseStatus(event, 200);
  return clients.splice(0, 5);
});

const clients_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: clients_get
});

const index_get$c = defineEventHandler((event) => {
  const { q, status, selectedDateRange, sortBy = "", page = 1, itemsPerPage = 10, orderBy } = getQuery$1(event);
  const searchQuery = is.string(q) ? q : void 0;
  const queryLowered = (searchQuery != null ? searchQuery : "").toString().toLowerCase();
  const parsedSortBy = destr$1(sortBy);
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : "";
  const parsedOrderBy = destr$1(orderBy);
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : "";
  const parsedItemsPerPage = destr$1(itemsPerPage);
  const parsedPage = destr$1(page);
  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10;
  const pageLocal = is.number(parsedPage) ? parsedPage : 1;
  const parsedDateRange = destr$1(selectedDateRange);
  const startDateLocal = parsedDateRange == null ? void 0 : parsedDateRange.start;
  const endDateLocal = parsedDateRange == null ? void 0 : parsedDateRange.end;
  let filteredInvoices = database$1.filter(
    (invoice) => (invoice.client.name.toLowerCase().includes(queryLowered) || invoice.client.companyEmail.toLowerCase().includes(queryLowered) || invoice.id.toString().includes(queryLowered)) && invoice.invoiceStatus === (status || invoice.invoiceStatus)
  ).reverse();
  if (sortByLocal) {
    if (sortByLocal === "client") {
      filteredInvoices = filteredInvoices.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.client.name.localeCompare(b.client.name);
        return b.client.name.localeCompare(a.client.name);
      });
    } else if (sortByLocal === "total") {
      filteredInvoices = filteredInvoices.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.total - b.total;
        return b.total - a.total;
      });
    } else if (sortByLocal === "id") {
      filteredInvoices = filteredInvoices.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.id - b.id;
        return b.id - a.id;
      });
    } else if (sortByLocal === "date") {
      filteredInvoices = filteredInvoices.sort((a, b) => {
        if (orderByLocal === "asc")
          return new Date(a.issuedDate).getTime() - new Date(b.issuedDate).getTime();
        return new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime();
      });
    } else if (sortByLocal === "balance") {
      filteredInvoices = filteredInvoices.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.balance - b.balance;
        return b.balance - a.balance;
      });
    }
  }
  if (startDateLocal && endDateLocal) {
    filteredInvoices = filteredInvoices.filter((invoiceObj) => {
      const start = new Date(startDateLocal).getTime();
      const end = new Date(endDateLocal).getTime();
      const issuedDate = new Date(invoiceObj.issuedDate).getTime();
      return issuedDate >= start && issuedDate <= end;
    });
  }
  const totalInvoices = filteredInvoices.length;
  return { invoices: paginateArray(filteredInvoices, itemsPerPageLocal, pageLocal), totalInvoices, page: pageLocal > Math.ceil(totalInvoices / itemsPerPageLocal) ? 1 : page };
});

const index_get$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$c
});

const treePot = getPublicUrl("/images/pages/tree-pot.png");
const avatar1$5 = getPublicUrl("/images/avatars/avatar-1.png");
const avatar2$5 = getPublicUrl("/images/avatars/avatar-2.png");
const avatar3$4 = getPublicUrl("/images/avatars/avatar-3.png");
const database = {
  boards: [
    {
      id: 1,
      title: "In Progress",
      itemsIds: [1, 2]
    },
    {
      id: 2,
      title: "In Review",
      itemsIds: [3, 4]
    },
    {
      id: 3,
      title: "Done",
      itemsIds: [5, 6]
    }
  ],
  items: [
    {
      id: 1,
      title: "Research FAQ page UX",
      dueDate: "",
      labels: ["UX"],
      members: [{ img: avatar1$5, name: "John Doe" }, { img: avatar2$5, name: "Jane Smith" }, { img: avatar3$4, name: "Robert Johnson" }],
      comments: "FAQ page design is ready and needs to be implemented.",
      attachments: 2,
      commentsCount: 1,
      image: ""
    },
    {
      id: 2,
      title: "Review JavaScript code",
      dueDate: "",
      labels: ["Code Review"],
      members: [{ img: avatar1$5, name: "John Doe" }, { img: avatar2$5, name: "Jane Smith" }],
      comments: "JavaScript code needs to be reviewed and refactored.",
      attachments: 2,
      commentsCount: 4,
      image: ""
    },
    {
      id: 3,
      title: "Review completed Apps",
      dueDate: "",
      labels: ["Dashboard"],
      members: [{ img: avatar1$5, name: "John Doe" }, { img: avatar2$5, name: "Jane Smith" }],
      comments: "Apps design is ready and needs to be implemented.",
      image: "",
      attachments: 5,
      commentsCount: 10
    },
    {
      id: 4,
      title: "Find new images for pages",
      dueDate: "",
      labels: ["Image"],
      members: [{ img: avatar1$5, name: "John Doe" }, { img: avatar2$5, name: "Jane Smith" }, { img: avatar3$4, name: "Robert Johnson" }],
      comments: "New images need to be found for the new pages.",
      image: treePot,
      attachments: 5,
      commentsCount: 4
    },
    {
      id: 5,
      title: "Forms & tables section",
      dueDate: "",
      labels: ["App"],
      members: [{ img: avatar1$5, name: "John Doe" }, { img: avatar2$5, name: "Jane Smith" }],
      comments: "Forms and tables need to be updated.",
      attachments: 7,
      commentsCount: 2,
      image: ""
    },
    {
      id: 6,
      title: "Completed charts & maps",
      dueDate: "",
      labels: ["Charts & Maps"],
      members: [{ img: avatar1$5, name: "John Doe" }],
      comments: "Charts and maps need to be updated.",
      attachments: 1,
      commentsCount: 10,
      image: ""
    }
  ]
};

const _id__delete$4 = defineEventHandler(async (event) => {
  const boardId = getIntId(event, "User id is required to get board details");
  const boardIndex = database.boards.findIndex((board) => board.id === boardId);
  if (boardIndex === -1) {
    setResponseStatus(event, 404);
    return { body: { message: `Board with id ${boardId} not found` } };
  }
  database.boards.splice(boardIndex, 1);
  return { body: { message: `Board with id ${boardId} deleted` } };
});

const _id__delete$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$4
});

const add_post$2 = defineEventHandler(async (event) => {
  const { title } = await readBody(event);
  const getNewBoardId = () => {
    const newBoardId = database.boards.length + 1;
    if (!database.boards.some((board) => board.id === newBoardId))
      return newBoardId;
    else
      return newBoardId + 1;
  };
  if (database.boards.some((board) => board.title === title)) {
    setResponseStatus(event, 204);
  } else {
    database.boards.push({
      id: getNewBoardId(),
      title,
      itemsIds: []
    });
    setResponseStatus(event, 201);
  }
});

const add_post$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: add_post$2
});

const rename_put = defineEventHandler(async (event) => {
  const { boardId, newName } = await readBody(event);
  database.boards = database.boards.map((board) => {
    if (board.id === boardId)
      board.title = newName;
    return board;
  });
  setResponseStatus(event, 201);
  return { body: { message: `Rename Board with id ${newName}` } };
});

const rename_put$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: rename_put
});

const stateUpdate_put$2 = defineEventHandler(async (event) => {
  const boardState = await readBody(event);
  const sortedBoards = boardState.map((boardId) => {
    return database.boards.find((board) => board.id === boardId);
  });
  database.boards = sortedBoards;
});

const stateUpdate_put$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: stateUpdate_put$2
});

const index_get$a = defineEventHandler(() => {
  return database;
});

const index_get$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$a
});

const _id__delete$2 = defineEventHandler((event) => {
  const itemId = getIntId(event, "Item id is required to get item details");
  database.items = database.items.filter((item) => item.id !== itemId);
  database.boards.forEach((board) => {
    board.itemsIds = board.itemsIds.filter((id) => id !== itemId);
  });
  setResponseStatus(event, 204);
});

const _id__delete$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$2
});

const add_post = defineEventHandler(async (event) => {
  const { boardId, boardName, itemTitle } = await readBody(event);
  const itemId = database.items[database.items.length - 1].id + 1;
  if (itemTitle && boardName) {
    database.items.push({
      id: itemId,
      title: itemTitle,
      attachments: 0,
      comments: "",
      commentsCount: 0,
      dueDate: "",
      labels: [],
      members: []
    });
    const id = database.boards.findIndex((board) => board.id === boardId);
    database.boards[id].itemsIds.push(itemId);
  }
  setResponseStatus(event, 201);
});

const add_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: add_post
});

const stateUpdate_put = defineEventHandler(async (event) => {
  const { boardId, ids } = await readBody(event);
  database.boards.forEach((board) => {
    if (board.id === boardId)
      board.itemsIds = ids;
  });
  setResponseStatus(event, 201);
});

const stateUpdate_put$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: stateUpdate_put
});

const update_put = defineEventHandler(async (event) => {
  const { item: task } = await readBody(event);
  database.items.forEach((item) => {
    if (task && item.id === task.id) {
      item.title = task.title;
      item.attachments = task.attachments;
      item.comments = task.comments;
      item.commentsCount = task.commentsCount;
      item.dueDate = task.dueDate;
      item.labels = task.labels;
      item.members = task.members;
    }
  });
  setResponseStatus(event, 201);
});

const update_put$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: update_put
});

const db$8 = {
  vehicles: [
    {
      id: 1,
      location: 468031,
      startCity: "Cagnes-sur-Mer",
      startCountry: "France",
      endCity: "Catania",
      endCountry: "Italy",
      warnings: "No Warnings",
      progress: 49
    },
    {
      id: 2,
      location: 302781,
      startCity: "K\xF6ln",
      startCountry: "Germany",
      endCity: "Laspezia",
      endCountry: "Italy",
      warnings: "Ecu Not Responding",
      progress: 24
    },
    {
      id: 3,
      location: 715822,
      startCity: "Chambray-l\xE8s-Tours",
      startCountry: "France",
      endCity: "Hamm",
      endCountry: "Germany",
      warnings: "Oil Leakage",
      progress: 7
    },
    {
      id: 4,
      location: 451430,
      startCity: "Berlin",
      startCountry: "Germany",
      endCity: "Gelsenkirchen",
      endCountry: "Germany",
      warnings: "No Warnings",
      progress: 95
    },
    {
      id: 5,
      location: 921577,
      startCity: "Cergy-Pontoise",
      startCountry: "France",
      endCity: "Berlin",
      endCountry: "Germany",
      warnings: "No Warnings",
      progress: 65
    },
    {
      id: 6,
      location: 480957,
      startCity: "Villefranche-sur-Sa\xF4ne",
      startCountry: "France",
      endCity: "Halle",
      endCountry: "Germany",
      warnings: "Ecu Not Responding",
      progress: 55
    },
    {
      id: 7,
      location: 330178,
      startCity: "M\xE2con",
      startCountry: "France",
      endCity: "Bochum",
      endCountry: "Germany",
      warnings: "Fuel Problems",
      progress: 74
    },
    {
      id: 8,
      location: 595525,
      startCity: "Fullerton",
      startCountry: "USA",
      endCity: "L\xFCbeck",
      endCountry: "Germany",
      warnings: "No Warnings",
      progress: 100
    },
    {
      id: 9,
      location: 182964,
      startCity: "Saintes",
      startCountry: "France",
      endCity: "Roma",
      endCountry: "Italy",
      warnings: "Oil Leakage",
      progress: 82
    },
    {
      id: 10,
      location: 706085,
      startCity: "Fort Wayne",
      startCountry: "USA",
      endCity: "M\xFClheim an der Ruhr",
      endCountry: "Germany",
      warnings: "Oil Leakage",
      progress: 49
    },
    {
      id: 11,
      location: 523708,
      startCity: "Albany",
      startCountry: "USA",
      endCity: "Wuppertal",
      endCountry: "Germany",
      warnings: "Temperature not optimal",
      progress: 66
    },
    {
      id: 12,
      location: 676485,
      startCity: "Toledo",
      startCountry: "USA",
      endCity: "Magdeburg",
      endCountry: "Germany",
      warnings: "Temperature not optimal",
      progress: 7
    },
    {
      id: 13,
      location: 514437,
      startCity: "Houston",
      startCountry: "USA",
      endCity: "Wiesbaden",
      endCountry: "Germany",
      warnings: "Fuel Problems",
      progress: 27
    },
    {
      id: 14,
      location: 300198,
      startCity: "West Palm Beach",
      startCountry: "USA",
      endCity: "Dresden",
      endCountry: "Germany",
      warnings: "Temperature not optimal",
      progress: 90
    },
    {
      id: 15,
      location: 960090,
      startCity: "Fort Lauderdale",
      startCountry: "USA",
      endCity: "Kiel",
      endCountry: "Germany",
      warnings: "No Warnings",
      progress: 81
    },
    {
      id: 16,
      location: 878423,
      startCity: "Schaumburg",
      startCountry: "USA",
      endCity: "Berlin",
      endCountry: "Germany",
      warnings: "Fuel Problems",
      progress: 21
    },
    {
      id: 17,
      location: 318119,
      startCity: "Mundolsheim",
      startCountry: "France",
      endCity: "M\xFCnchen",
      endCountry: "Germany",
      warnings: "No Warnings",
      progress: 26
    },
    {
      id: 18,
      location: 742500,
      startCity: "Fargo",
      startCountry: "USA",
      endCity: "Salerno",
      endCountry: "Italy",
      warnings: "Temperature not optimal",
      progress: 80
    },
    {
      id: 19,
      location: 469399,
      startCity: "M\xFCnchen",
      startCountry: "Germany",
      endCity: "Ath",
      endCountry: "Belgium",
      warnings: "Ecu Not Responding",
      progress: 50
    },
    {
      id: 20,
      location: 411175,
      startCity: "Chicago",
      startCountry: "USA",
      endCity: "Neuss",
      endCountry: "Germany",
      warnings: "Oil Leakage",
      progress: 44
    },
    {
      id: 21,
      location: 753525,
      startCity: "Limoges",
      startCountry: "France",
      endCity: "Messina",
      endCountry: "Italy",
      warnings: "Temperature not optimal",
      progress: 55
    },
    {
      id: 22,
      location: 882341,
      startCity: "Cesson-S\xE9vign\xE9",
      startCountry: "France",
      endCity: "Napoli",
      endCountry: "Italy",
      warnings: "No Warnings",
      progress: 48
    },
    {
      id: 23,
      location: 408270,
      startCity: "Leipzig",
      startCountry: "Germany",
      endCity: "Tournai",
      endCountry: "Belgium",
      warnings: "Ecu Not Responding",
      progress: 73
    },
    {
      id: 24,
      location: 276904,
      startCity: "Aulnay-sous-Bois",
      startCountry: "France",
      endCity: "Torino",
      endCountry: "Italy",
      warnings: "Fuel Problems",
      progress: 30
    },
    {
      id: 25,
      location: 159145,
      startCity: "Paris 19",
      startCountry: "France",
      endCity: "Dresden",
      endCountry: "Germany",
      warnings: "No Warnings",
      progress: 60
    }
  ]
};

const index = defineEventHandler((event) => {
  const { sortBy, page = 1, itemsPerPage = 10, orderBy } = getQuery$1(event);
  const parsedSortBy = destr$1(sortBy);
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : "";
  const parsedOrderBy = destr$1(orderBy);
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : "";
  const parsedItemsPerPage = destr$1(itemsPerPage);
  const parsedPage = destr$1(page);
  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10;
  const pageLocal = is.number(parsedPage) ? parsedPage : 1;
  if (sortByLocal && sortByLocal === "location") {
    db$8.vehicles = db$8.vehicles.sort((a, b) => {
      if (orderByLocal === "asc")
        return a.location - b.location;
      return b.location - a.location;
    });
  }
  if (sortByLocal && sortByLocal === "startRoute") {
    db$8.vehicles = db$8.vehicles.sort((a, b) => {
      if (orderByLocal === "asc")
        return a.startCity.localeCompare(b.startCity);
      return b.startCity.localeCompare(a.startCity);
    });
  }
  if (sortByLocal && sortByLocal === "endRoute") {
    db$8.vehicles = db$8.vehicles.sort((a, b) => {
      if (orderByLocal === "asc")
        return a.endCity.localeCompare(b.endCity);
      return b.endCity.localeCompare(a.endCity);
    });
  }
  if (sortByLocal && sortByLocal === "warnings") {
    db$8.vehicles = db$8.vehicles.sort((a, b) => {
      if (orderByLocal === "asc")
        return a.warnings.localeCompare(b.warnings);
      return b.warnings.localeCompare(a.warnings);
    });
  }
  if (sortByLocal && sortByLocal === "progress") {
    db$8.vehicles = db$8.vehicles.sort((a, b) => {
      if (orderByLocal === "asc")
        return a.progress - b.progress;
      return b.progress - a.progress;
    });
  }
  return { vehicles: paginateArray(db$8.vehicles, itemsPerPageLocal, pageLocal), totalVehicles: db$8.vehicles.length };
});

const index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index
});

const db$7 = {
  permissions: [
    {
      id: 1,
      name: "Management",
      assignedTo: ["administrator"],
      createdDate: "14 Apr 2021, 8:43 PM"
    },
    {
      id: 2,
      assignedTo: ["administrator"],
      name: "Manage Billing & Roles",
      createdDate: "16 Sep 2021, 5:20 PM"
    },
    {
      id: 3,
      name: "Add & Remove Users",
      createdDate: "14 Oct 2021, 10:20 AM",
      assignedTo: ["administrator", "manager"]
    },
    {
      id: 4,
      name: "Project Planning",
      createdDate: "14 Oct 2021, 10:20 AM",
      assignedTo: ["administrator", "users", "support"]
    },
    {
      id: 5,
      name: "Manage Email Sequences",
      createdDate: "23 Aug 2021, 2:00 PM",
      assignedTo: ["administrator", "users", "support"]
    },
    {
      id: 6,
      name: "Client Communication",
      createdDate: "15 Apr 2021, 11:30 AM",
      assignedTo: ["administrator", "manager"]
    },
    {
      id: 7,
      name: "Only View",
      createdDate: "04 Dec 2021, 8:15 PM",
      assignedTo: ["administrator", "restricted-user"]
    },
    {
      id: 8,
      name: "Financial Management",
      createdDate: "25 Feb 2021, 10:30 AM",
      assignedTo: ["administrator", "manager"]
    },
    {
      id: 9,
      name: "Manage Others' Tasks",
      createdDate: "04 Nov 2021, 11:45 AM",
      assignedTo: ["administrator", "support"]
    }
  ]
};

const index_get$8 = defineCachedEventHandler((event) => {
  const { q = "", sortBy, page = 1, itemsPerPage = 10, orderBy } = getQuery$1(event);
  const parsedSortBy = destr$1(sortBy);
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : "";
  const parsedOrderBy = destr$1(orderBy);
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : "";
  const parsedItemsPerPage = destr$1(itemsPerPage);
  const parsedPage = destr$1(page);
  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10;
  const pageLocal = is.number(parsedPage) ? parsedPage : 1;
  const searchQuery = is.string(q) ? q : void 0;
  const queryLower = (searchQuery != null ? searchQuery : "").toString().toLowerCase();
  let filteredPermissions = db$7.permissions.filter(
    (permissions) => permissions.name.toLowerCase().includes(queryLower) || permissions.createdDate.toLowerCase().includes(queryLower) || permissions.assignedTo.some((i) => i.toLowerCase().startsWith(queryLower))
  );
  if (sortByLocal && sortByLocal === "name") {
    filteredPermissions = filteredPermissions.sort((a, b) => {
      if (orderByLocal === "asc")
        return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
  }
  return { permissions: paginateArray(filteredPermissions, itemsPerPageLocal, pageLocal), totalPermissions: filteredPermissions.length };
});

const index_get$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$8
});

const avatar1$4 = getPublicUrl("/images/avatars/avatar-1.png");
const avatar2$4 = getPublicUrl("/images/avatars/avatar-2.png");
const avatar3$3 = getPublicUrl("/images/avatars/avatar-3.png");
const avatar4$3 = getPublicUrl("/images/avatars/avatar-4.png");
const avatar5$3 = getPublicUrl("/images/avatars/avatar-5.png");
const avatar6$3 = getPublicUrl("/images/avatars/avatar-6.png");
const db$6 = {
  users: [
    {
      id: 1,
      fullName: "Galasasen Slixby",
      company: "Yotz PVT LTD",
      role: "editor",
      username: "gslixby0",
      country: "El Salvador",
      contact: "(479) 232-9151",
      email: "gslixby0@abc.net.au",
      currentPlan: "enterprise",
      status: "inactive",
      avatar: "",
      billing: "Manual-Credit Card"
    },
    {
      id: 2,
      fullName: "Halsey Redmore",
      company: "Skinder PVT LTD",
      role: "author",
      username: "hredmore1",
      country: "Albania",
      contact: "(472) 607-9137",
      email: "hredmore1@imgur.com",
      currentPlan: "team",
      status: "pending",
      avatar: avatar2$4,
      billing: "Auto debit"
    },
    {
      id: 3,
      fullName: "Marjory Sicely",
      company: "Oozz PVT LTD",
      role: "maintainer",
      username: "msicely2",
      country: "Russia",
      contact: "(321) 264-4599",
      email: "msicely2@who.int",
      currentPlan: "enterprise",
      status: "active",
      avatar: avatar3$3,
      billing: "Manual-Credit Card"
    },
    {
      id: 4,
      fullName: "Cyrill Risby",
      company: "Oozz PVT LTD",
      role: "maintainer",
      username: "crisby3",
      country: "China",
      contact: "(923) 690-6806",
      email: "crisby3@wordpress.com",
      currentPlan: "team",
      status: "inactive",
      avatar: "",
      billing: "Auto debit"
    },
    {
      id: 5,
      fullName: "Maggy Hurran",
      company: "Aimbo PVT LTD",
      role: "subscriber",
      username: "mhurran4",
      country: "Pakistan",
      contact: "(669) 914-1078",
      email: "mhurran4@yahoo.co.jp",
      currentPlan: "enterprise",
      status: "pending",
      avatar: avatar5$3,
      billing: "Manual-Cash"
    },
    {
      id: 6,
      fullName: "Silvain Halstead",
      company: "Jaxbean PVT LTD",
      role: "author",
      username: "shalstead5",
      country: "China",
      contact: "(958) 973-3093",
      email: "shalstead5@shinystat.com",
      currentPlan: "company",
      status: "active",
      avatar: "",
      billing: "Manual-Credit Card"
    },
    {
      id: 7,
      fullName: "Breena Gallemore",
      company: "Jazzy PVT LTD",
      role: "subscriber",
      username: "bgallemore6",
      country: "Canada",
      contact: "(825) 977-8152",
      email: "bgallemore6@boston.com",
      currentPlan: "company",
      status: "pending",
      avatar: avatar1$4,
      billing: "Manual-PayPal"
    },
    {
      id: 8,
      fullName: "Kathryne Liger",
      company: "Pixoboo PVT LTD",
      role: "author",
      username: "kliger7",
      country: "France",
      contact: "(187) 440-0934",
      email: "kliger7@vinaora.com",
      currentPlan: "enterprise",
      status: "pending",
      avatar: "",
      billing: "Auto debit"
    },
    {
      id: 9,
      fullName: "Franz Scotfurth",
      company: "Tekfly PVT LTD",
      role: "subscriber",
      username: "fscotfurth8",
      country: "China",
      contact: "(978) 146-5443",
      email: "fscotfurth8@dailymotion.com",
      currentPlan: "team",
      status: "pending",
      avatar: avatar1$4,
      billing: "Manual-Credit Card"
    },
    {
      id: 10,
      fullName: "Jillene Bellany",
      company: "Gigashots PVT LTD",
      role: "maintainer",
      username: "jbellany9",
      country: "Jamaica",
      contact: "(589) 284-6732",
      email: "jbellany9@kickstarter.com",
      currentPlan: "company",
      status: "inactive",
      avatar: avatar3$3,
      billing: "Manual-Credit Card"
    },
    {
      id: 11,
      fullName: "Jonah Wharlton",
      company: "Eare PVT LTD",
      role: "subscriber",
      username: "jwharltona",
      country: "United States",
      contact: "(176) 532-6824",
      email: "jwharltona@oakley.com",
      currentPlan: "team",
      status: "inactive",
      avatar: "",
      billing: "Manual-Cash"
    },
    {
      id: 12,
      fullName: "Seth Hallam",
      company: "Yakitri PVT LTD",
      role: "subscriber",
      username: "shallamb",
      country: "Peru",
      contact: "(234) 464-0600",
      email: "shallamb@hugedomains.com",
      currentPlan: "team",
      status: "pending",
      avatar: avatar3$3,
      billing: "Manual-PayPal"
    },
    {
      id: 13,
      fullName: "Yoko Pottie",
      company: "Leenti PVT LTD",
      role: "subscriber",
      username: "ypottiec",
      country: "Philippines",
      contact: "(907) 284-5083",
      email: "ypottiec@privacy.gov.au",
      currentPlan: "basic",
      status: "inactive",
      avatar: avatar6$3,
      billing: "Manual-PayPal"
    },
    {
      id: 14,
      fullName: "Maximilianus Krause",
      company: "Digitube PVT LTD",
      role: "author",
      username: "mkraused",
      country: "Democratic Republic of the Congo",
      contact: "(167) 135-7392",
      email: "mkraused@stanford.edu",
      currentPlan: "team",
      status: "active",
      avatar: "",
      billing: "Manual-PayPal"
    },
    {
      id: 15,
      fullName: "Zsazsa McCleverty",
      company: "Kaymbo PVT LTD",
      role: "maintainer",
      username: "zmcclevertye",
      country: "France",
      contact: "(317) 409-6565",
      email: "zmcclevertye@soundcloud.com",
      currentPlan: "enterprise",
      status: "active",
      avatar: avatar3$3,
      billing: "Manual-PayPal"
    },
    {
      id: 16,
      fullName: "Bentlee Emblin",
      company: "Yambee PVT LTD",
      role: "author",
      username: "bemblinf",
      country: "Spain",
      contact: "(590) 606-1056",
      email: "bemblinf@wired.com",
      currentPlan: "company",
      status: "active",
      avatar: avatar4$3,
      billing: "Manual-PayPal"
    },
    {
      id: 17,
      fullName: "Brockie Myles",
      company: "Wikivu PVT LTD",
      role: "maintainer",
      username: "bmylesg",
      country: "Poland",
      contact: "(553) 225-9905",
      email: "bmylesg@amazon.com",
      currentPlan: "basic",
      status: "active",
      avatar: avatar1$4,
      billing: "Manual-Credit Card"
    },
    {
      id: 18,
      fullName: "Bertha Biner",
      company: "Twinte PVT LTD",
      role: "editor",
      username: "bbinerh",
      country: "Yemen",
      contact: "(901) 916-9287",
      email: "bbinerh@mozilla.com",
      currentPlan: "team",
      status: "active",
      avatar: avatar3$3,
      billing: "Manual-Credit Card"
    },
    {
      id: 19,
      fullName: "Travus Bruntjen",
      company: "Cogidoo PVT LTD",
      role: "admin",
      username: "tbruntjeni",
      country: "France",
      contact: "(524) 586-6057",
      email: "tbruntjeni@sitemeter.com",
      currentPlan: "enterprise",
      status: "active",
      avatar: "",
      billing: "Manual-Cash"
    },
    {
      id: 20,
      fullName: "Wesley Burland",
      company: "Bubblemix PVT LTD",
      role: "editor",
      username: "wburlandj",
      country: "Honduras",
      contact: "(569) 683-1292",
      email: "wburlandj@uiuc.edu",
      currentPlan: "team",
      status: "inactive",
      avatar: avatar5$3,
      billing: "Manual-Cash"
    },
    {
      id: 21,
      fullName: "Selina Kyle",
      company: "Wayne Enterprises",
      role: "admin",
      username: "catwomen1940",
      country: "USA",
      contact: "(829) 537-0057",
      email: "irena.dubrovna@wayne.com",
      currentPlan: "team",
      status: "active",
      avatar: avatar1$4,
      billing: "Manual-Cash"
    },
    {
      id: 22,
      fullName: "Jameson Lyster",
      company: "Quaxo PVT LTD",
      role: "editor",
      username: "jlysterl",
      country: "Ukraine",
      contact: "(593) 624-0222",
      email: "jlysterl@guardian.co.uk",
      currentPlan: "company",
      status: "inactive",
      avatar: avatar6$3,
      billing: "Manual-Cash"
    },
    {
      id: 23,
      fullName: "Kare Skitterel",
      company: "Ainyx PVT LTD",
      role: "maintainer",
      username: "kskitterelm",
      country: "Poland",
      contact: "(254) 845-4107",
      email: "kskitterelm@ainyx.com",
      currentPlan: "basic",
      status: "pending",
      avatar: avatar2$4,
      billing: "Manual-Credit Card"
    },
    {
      id: 24,
      fullName: "Cleavland Hatherleigh",
      company: "Flipopia PVT LTD",
      role: "admin",
      username: "chatherleighn",
      country: "Brazil",
      contact: "(700) 783-7498",
      email: "chatherleighn@washington.edu",
      currentPlan: "team",
      status: "pending",
      avatar: "",
      billing: "Manual-Credit Card"
    },
    {
      id: 25,
      fullName: "Adeline Micco",
      company: "Topicware PVT LTD",
      role: "admin",
      username: "amiccoo",
      country: "France",
      contact: "(227) 598-1841",
      email: "amiccoo@whitehouse.gov",
      currentPlan: "enterprise",
      status: "pending",
      avatar: "",
      billing: "Auto Debit"
    },
    {
      id: 26,
      fullName: "Hugh Hasson",
      company: "Skinix PVT LTD",
      role: "admin",
      username: "hhassonp",
      country: "China",
      contact: "(582) 516-1324",
      email: "hhassonp@bizjournals.com",
      currentPlan: "basic",
      status: "inactive",
      avatar: avatar6$3,
      billing: "Auto Debit"
    },
    {
      id: 27,
      fullName: "Germain Jacombs",
      company: "Youopia PVT LTD",
      role: "editor",
      username: "gjacombsq",
      country: "Zambia",
      contact: "(137) 467-5393",
      email: "gjacombsq@jigsy.com",
      currentPlan: "enterprise",
      status: "active",
      avatar: "",
      billing: "Auto Debit"
    },
    {
      id: 28,
      fullName: "Bree Kilday",
      company: "Jetpulse PVT LTD",
      role: "maintainer",
      username: "bkildayr",
      country: "Portugal",
      contact: "(412) 476-0854",
      email: "bkildayr@mashable.com",
      currentPlan: "team",
      status: "active",
      avatar: "",
      billing: "Auto Debit"
    },
    {
      id: 29,
      fullName: "Candice Pinyon",
      company: "Kare PVT LTD",
      role: "maintainer",
      username: "cpinyons",
      country: "Sweden",
      contact: "(170) 683-1520",
      email: "cpinyons@behance.net",
      currentPlan: "team",
      status: "active",
      avatar: avatar1$4,
      billing: "Manual-Cash"
    },
    {
      id: 30,
      fullName: "Isabel Mallindine",
      company: "Voomm PVT LTD",
      role: "subscriber",
      username: "imallindinet",
      country: "Slovenia",
      contact: "(332) 803-1983",
      email: "imallindinet@shinystat.com",
      currentPlan: "team",
      status: "pending",
      avatar: avatar5$3,
      billing: "Manual-Cash"
    },
    {
      id: 31,
      fullName: "Gwendolyn Meineken",
      company: "Oyondu PVT LTD",
      role: "admin",
      username: "gmeinekenu",
      country: "Moldova",
      contact: "(551) 379-7460",
      email: "gmeinekenu@hc360.com",
      currentPlan: "basic",
      status: "pending",
      avatar: avatar2$4,
      billing: "Manual-Cash"
    },
    {
      id: 32,
      fullName: "Rafaellle Snowball",
      company: "Fivespan PVT LTD",
      role: "editor",
      username: "rsnowballv",
      country: "Philippines",
      contact: "(974) 829-0911",
      email: "rsnowballv@indiegogo.com",
      currentPlan: "basic",
      status: "pending",
      avatar: avatar6$3,
      billing: "Manual-Cash"
    },
    {
      id: 33,
      fullName: "Rochette Emer",
      company: "Thoughtworks PVT LTD",
      role: "admin",
      username: "remerw",
      country: "North Korea",
      contact: "(841) 889-3339",
      email: "remerw@blogtalkradio.com",
      currentPlan: "basic",
      status: "active",
      avatar: "",
      billing: "Manual-Cash"
    },
    {
      id: 34,
      fullName: "Ophelie Fibbens",
      company: "Jaxbean PVT LTD",
      role: "subscriber",
      username: "ofibbensx",
      country: "Indonesia",
      contact: "(764) 885-7351",
      email: "ofibbensx@booking.com",
      currentPlan: "company",
      status: "active",
      avatar: avatar3$3,
      billing: "Manual-Cash"
    },
    {
      id: 35,
      fullName: "Stephen MacGilfoyle",
      company: "Browseblab PVT LTD",
      role: "maintainer",
      username: "smacgilfoyley",
      country: "Japan",
      contact: "(350) 589-8520",
      email: "smacgilfoyley@bigcartel.com",
      currentPlan: "company",
      status: "pending",
      avatar: avatar2$4,
      billing: "Manual-Cash"
    },
    {
      id: 36,
      fullName: "Bradan Rosebotham",
      company: "Agivu PVT LTD",
      role: "subscriber",
      username: "brosebothamz",
      country: "Belarus",
      contact: "(882) 933-2180",
      email: "brosebothamz@tripadvisor.com",
      currentPlan: "team",
      status: "inactive",
      avatar: "",
      billing: "Manual-Credit Card"
    },
    {
      id: 37,
      fullName: "Skip Hebblethwaite",
      company: "Katz PVT LTD",
      role: "admin",
      username: "shebblethwaite10",
      country: "Canada",
      contact: "(610) 343-1024",
      email: "shebblethwaite10@arizona.edu",
      currentPlan: "company",
      status: "inactive",
      avatar: avatar1$4,
      billing: "Manual-Credit Card"
    },
    {
      id: 38,
      fullName: "Moritz Piccard",
      company: "Twitternation PVT LTD",
      role: "maintainer",
      username: "mpiccard11",
      country: "Croatia",
      contact: "(365) 277-2986",
      email: "mpiccard11@vimeo.com",
      currentPlan: "enterprise",
      status: "inactive",
      avatar: avatar2$4,
      billing: "Manual-Credit Card"
    },
    {
      id: 39,
      fullName: "Tyne Widmore",
      company: "Yombu PVT LTD",
      role: "subscriber",
      username: "twidmore12",
      country: "Finland",
      contact: "(531) 731-0928",
      email: "twidmore12@bravesites.com",
      currentPlan: "team",
      status: "pending",
      avatar: "",
      billing: "Auto Debit"
    },
    {
      id: 40,
      fullName: "Florenza Desporte",
      company: "Kamba PVT LTD",
      role: "author",
      username: "fdesporte13",
      country: "Ukraine",
      contact: "(312) 104-2638",
      email: "fdesporte13@omniture.com",
      currentPlan: "company",
      status: "active",
      avatar: avatar1$4,
      billing: "Auto Debit"
    },
    {
      id: 41,
      fullName: "Edwina Baldetti",
      company: "Dazzlesphere PVT LTD",
      role: "maintainer",
      username: "ebaldetti14",
      country: "Haiti",
      contact: "(315) 329-3578",
      email: "ebaldetti14@theguardian.com",
      currentPlan: "team",
      status: "pending",
      avatar: avatar5$3,
      billing: "Auto Debit"
    },
    {
      id: 42,
      fullName: "Benedetto Rossiter",
      company: "Mybuzz PVT LTD",
      role: "editor",
      username: "brossiter15",
      country: "Indonesia",
      contact: "(323) 175-6741",
      email: "brossiter15@craigslist.org",
      currentPlan: "team",
      status: "inactive",
      avatar: "",
      billing: "Auto Debit"
    },
    {
      id: 43,
      fullName: "Micaela McNirlan",
      company: "Tambee PVT LTD",
      role: "admin",
      username: "mmcnirlan16",
      country: "Indonesia",
      contact: "(242) 952-0916",
      email: "mmcnirlan16@hc360.com",
      currentPlan: "basic",
      status: "inactive",
      avatar: avatar2$4,
      billing: "Auto Debit"
    },
    {
      id: 44,
      fullName: "Vladamir Koschek",
      company: "Centimia PVT LTD",
      role: "author",
      username: "vkoschek17",
      country: "Guatemala",
      contact: "(531) 758-8335",
      email: "vkoschek17@abc.net.au",
      currentPlan: "team",
      status: "active",
      avatar: avatar1$4,
      billing: "Manual-Credit Card"
    },
    {
      id: 45,
      fullName: "Corrie Perot",
      company: "Flipopia PVT LTD",
      role: "subscriber",
      username: "cperot18",
      country: "China",
      contact: "(659) 385-6808",
      email: "cperot18@goo.ne.jp",
      currentPlan: "team",
      status: "pending",
      avatar: "",
      billing: "Manual-Credit Card"
    },
    {
      id: 46,
      fullName: "Saunder Offner",
      company: "Skalith PVT LTD",
      role: "maintainer",
      username: "soffner19",
      country: "Poland",
      contact: "(200) 586-2264",
      email: "soffner19@mac.com",
      currentPlan: "enterprise",
      status: "pending",
      avatar: avatar4$3,
      billing: "Manual-Credit Card"
    },
    {
      id: 47,
      fullName: "Karena Courtliff",
      company: "Feedfire PVT LTD",
      role: "admin",
      username: "kcourtliff1a",
      country: "China",
      contact: "(478) 199-0020",
      email: "kcourtliff1a@bbc.co.uk",
      currentPlan: "basic",
      status: "active",
      avatar: "",
      billing: "Manual-Credit Card"
    },
    {
      id: 48,
      fullName: "Onfre Wind",
      company: "Thoughtmix PVT LTD",
      role: "admin",
      username: "owind1b",
      country: "Ukraine",
      contact: "(344) 262-7270",
      email: "owind1b@yandex.ru",
      currentPlan: "basic",
      status: "pending",
      avatar: avatar3$3,
      billing: "Manual-PayPal"
    },
    {
      id: 49,
      fullName: "Paulie Durber",
      company: "Babbleblab PVT LTD",
      role: "subscriber",
      username: "pdurber1c",
      country: "Sweden",
      contact: "(694) 676-1275",
      email: "pdurber1c@gov.uk",
      currentPlan: "team",
      status: "inactive",
      avatar: "",
      billing: "Manual-PayPal"
    },
    {
      id: 50,
      fullName: "Beverlie Krabbe",
      company: "Kaymbo PVT LTD",
      role: "editor",
      username: "bkrabbe1d",
      country: "China",
      contact: "(397) 294-5153",
      email: "bkrabbe1d@home.pl",
      currentPlan: "company",
      status: "active",
      avatar: avatar1$4,
      billing: "Manual-Cash"
    }
  ]
};

const _id__delete = defineEventHandler((event) => {
  const userId = getIntId(event, "User id is required to delete a user");
  const userIndex = db$6.users.findIndex((user) => user.id === userId);
  db$6.users.splice(userIndex, 1);
  setResponseStatus(event, 204);
  return null;
});

const _id__delete$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete
});

const _id__get = defineEventHandler((event) => {
  const userId = getIntId(event, "User id is required to get user details");
  const user = db$6.users.find((u) => u.id === userId);
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found"
    });
  }
  return {
    ...user,
    taskDone: 1230,
    projectDone: 568,
    taxId: "Tax-8894",
    language: "English"
  };
});

const _id__get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get
});

const index_get$6 = defineEventHandler(async (event) => {
  const { q = "", role = null, plan = null, status = null, sortBy, itemsPerPage = 10, page = 1, orderBy } = getQuery$1(event);
  const searchQuery = is.string(q) ? q : void 0;
  const queryLower = (searchQuery != null ? searchQuery : "").toString().toLowerCase();
  const parsedSortBy = destr$1(sortBy);
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : "";
  const parsedOrderBy = destr$1(orderBy);
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : "";
  const parsedItemsPerPage = destr$1(itemsPerPage);
  const parsedPage = destr$1(page);
  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10;
  const pageLocal = is.number(parsedPage) ? parsedPage : 1;
  let filteredUsers = db$6.users.filter((user) => (user.fullName.toLowerCase().includes(queryLower) || user.email.toLowerCase().includes(queryLower)) && user.role === (role || user.role) && user.currentPlan === (plan || user.currentPlan) && user.status === (status || user.status)).reverse();
  if (sortByLocal) {
    if (sortByLocal === "user") {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.fullName.localeCompare(b.fullName);
        else
          return b.fullName.localeCompare(a.fullName);
      });
    }
    if (sortByLocal === "email") {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.email.localeCompare(b.email);
        else
          return b.email.localeCompare(a.email);
      });
    }
    if (sortByLocal === "role") {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.role.localeCompare(b.role);
        else
          return b.role.localeCompare(a.role);
      });
    }
    if (sortByLocal === "plan") {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.currentPlan.localeCompare(b.currentPlan);
        else
          return b.currentPlan.localeCompare(a.currentPlan);
      });
    }
    if (sortByLocal === "status") {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.status.localeCompare(b.status);
        else
          return b.status.localeCompare(a.status);
      });
    }
  }
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPageLocal);
  setResponseStatus(event, 200);
  return { users: paginateArray(filteredUsers, itemsPerPageLocal, pageLocal), totalPages, totalUsers, page: pageLocal > Math.ceil(totalUsers / itemsPerPageLocal) ? 1 : page };
});

const index_get$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$6
});

const index_post = defineEventHandler(async (event) => {
  const user = await readBody(event);
  db$6.users.push({
    ...user,
    id: db$6.users.length + 1
  });
  setResponseStatus(event, 201);
  return { body: user };
});

const index_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post
});

const _____ = NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // GoogleProvider.default({
    //   clientId: runtimeConfig.public.AUTH_PROVIDER_GOOGLE_CLIENT_ID,
    //   clientSecret: runtimeConfig.public.AUTH_PROVIDER_GOOGLE_CLIENT_SECRET,
    // }),
    // @ts-expect-error 您需要在這裡使用 .default 才能在 SSR 期間正常工作。可能在某個時候通過 Vite 修復
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {},
      // 物件是必需的，但可以留空。
      async authorize(credentials) {
        var _a;
        const response = await $fetch(`${(_a = process.env.NUXT_PUBLIC_API_BASE_URL) != null ? _a : "/api"}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials)
        }).catch((err) => {
          throw createError({
            statusCode: err.statusCode || 403,
            statusMessage: JSON.stringify(err.data)
          });
        });
        if (response.user && response.accessToken) {
          return {
            ...response.user,
            accessToken: response.accessToken
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.username = user.username;
        token.fullName = user.fullName;
        token.avatar = user.avatar;
        token.abilityRules = user.abilityRules;
        token.role = user.role;
        token.backendToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.username;
        session.user.fullName = token.fullName;
        session.user.avatar = token.avatar;
        session.user.abilityRules = token.abilityRules;
        session.user.role = token.role;
        session.backendToken = token.backendToken;
      }
      return session;
    }
  }
});

const _____$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _____
});

const changePassword_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const session = await getServerSession(event);
    if (!(session == null ? void 0 : session.user)) {
      throw createError({
        statusCode: 401,
        statusMessage: "\u672A\u6388\u6B0A"
      });
    }
    const authData = {
      username: session.user.username,
      role: session.user.role,
      email: session.user.email,
      timestamp: Date.now()
    };
    const token = Buffer.from(JSON.stringify(authData)).toString("base64");
    const backendUrl = "http://localhost:3030";
    const response = await $fetch(`${backendUrl}/api/auth/change-password`, {
      method: "POST",
      body: {
        currentPassword: body.currentPassword,
        newPassword: body.newPassword
      },
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return response;
  } catch (error) {
    console.error("\u5BC6\u78BC\u4FEE\u6539API\u932F\u8AA4:", error);
    if (error.data) {
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.data.message || "\u4FEE\u6539\u5BC6\u78BC\u5931\u6557"
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "\u4FEE\u6539\u5BC6\u78BC\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66"
    });
  }
});

const changePassword_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: changePassword_post
});

const figmaLabel$1 = getPublicUrl("/images/icons/brands/figma-label.png");
const htmlLabel$1 = getPublicUrl("/images/icons/brands/html-label.png");
const reactLabel$1 = getPublicUrl("/images/icons/brands/react-label.png");
const sketchLabel = getPublicUrl("/images/icons/brands/sketch-label.png");
const xamarinLabel = getPublicUrl("/images/icons/project-icons/xamarin.png");
const vueLabel$1 = getPublicUrl("/images/icons/brands/vue-label.png");
const pythonLabel = getPublicUrl("/images/icons/project-icons/python.png");
const avatar1$3 = getPublicUrl("/images/avatars/avatar-1.png");
const avatar2$3 = getPublicUrl("/images/avatars/avatar-2.png");
const avatar3$2 = getPublicUrl("/images/avatars/avatar-3.png");
const avatar4$2 = getPublicUrl("/images/avatars/avatar-4.png");
const avatar5$2 = getPublicUrl("/images/avatars/avatar-5.png");
const avatar6$2 = getPublicUrl("/images/avatars/avatar-6.png");
const avatar7$2 = getPublicUrl("/images/avatars/avatar-7.png");
const avatar8$2 = getPublicUrl("/images/avatars/avatar-8.png");
const db$5 = {
  analytics: [
    {
      logo: reactLabel$1,
      name: "BGC eCommerce App",
      project: "React Project",
      leader: "Eileen",
      progress: 78,
      hours: "18:42",
      team: [avatar1$3, avatar8$2, avatar6$2],
      extraMembers: 3
    },
    {
      logo: figmaLabel$1,
      name: "Falcon Logo Design",
      project: "Figma Project",
      leader: "Owen",
      progress: 25,
      hours: "20:42",
      team: [avatar5$2, avatar2$3]
    },
    {
      logo: vueLabel$1,
      name: "Dashboard Design",
      project: "Vuejs Project",
      leader: "Keith",
      progress: 62,
      hours: "120:87",
      team: [avatar8$2, avatar2$3, avatar1$3]
    },
    {
      logo: xamarinLabel,
      name: "Foodista mobile app",
      project: "Xamarin Project",
      leader: "Merline",
      progress: 8,
      hours: "120:87",
      team: [avatar3$2, avatar4$2, avatar7$2],
      extraMembers: 8
    },
    {
      logo: pythonLabel,
      name: "Dojo Email App",
      project: "Python Project",
      leader: "Harmonia",
      progress: 51,
      hours: "230:10",
      team: [avatar4$2, avatar3$2, avatar1$3],
      extraMembers: 5
    },
    {
      logo: sketchLabel,
      name: "Blockchain Website",
      project: "Sketch Project",
      leader: "Allyson",
      progress: 92,
      hours: "342:41",
      team: [avatar1$3, avatar8$2]
    },
    {
      logo: htmlLabel$1,
      name: "Hoffman Website",
      project: "HTML Project",
      leader: "Georgie",
      progress: 80,
      hours: "12:45",
      team: [avatar1$3, avatar8$2, avatar6$2]
    }
  ]
};

const projects_get = defineEventHandler(async (event) => {
  const { q, sortBy = "", page = 1, itemsPerPage = 10, orderBy } = getQuery$1(event);
  const searchQuery = is.string(q) ? q : void 0;
  const queryLower = (searchQuery != null ? searchQuery : "").toString().toLowerCase();
  const parsedSortBy = destr$1(sortBy);
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : "";
  const parsedOrderBy = destr$1(orderBy);
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : "";
  const parsedItemsPerPage = destr$1(itemsPerPage);
  const parsedPage = destr$1(page);
  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10;
  const pageLocal = is.number(parsedPage) ? parsedPage : 1;
  let filteredProjects = db$5.analytics.filter((project) => project.name.toLowerCase().includes(queryLower) || project.leader.toLowerCase().includes(queryLower) || project.project.toLowerCase().includes(queryLower)).reverse();
  if (sortByLocal) {
    console.log(sortByLocal);
    if (sortByLocal === "project") {
      filteredProjects = filteredProjects.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.name.localeCompare(b.name);
        else
          return b.name.localeCompare(a.name);
      });
    }
    if (sortByLocal === "leader") {
      filteredProjects = filteredProjects.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.leader.localeCompare(b.leader);
        else
          return b.leader.localeCompare(a.leader);
      });
    }
    if (sortByLocal === "progress") {
      filteredProjects = filteredProjects.sort((a, b) => {
        if (orderByLocal === "asc")
          return a.progress - b.progress;
        else
          return b.progress - a.progress;
      });
    }
  }
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / itemsPerPageLocal);
  return {
    projects: paginateArray(filteredProjects, itemsPerPageLocal, pageLocal),
    totalPages,
    totalProjects,
    page: pageLocal > Math.ceil(totalProjects / itemsPerPageLocal) ? 1 : page
  };
});

const projects_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: projects_get
});

const avatar1$2 = getPublicUrl("/images/avatars/avatar-1.png");
const avatar2$2 = getPublicUrl("/images/avatars/avatar-2.png");
const db$4 = {
  users: [
    {
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      password: "admin",
      avatar: avatar1$2,
      email: "admin@demo.com",
      role: "admin",
      abilityRules: [
        {
          action: "manage",
          subject: "all"
        }
      ]
    },
    {
      id: 2,
      fullName: "Jane Doe",
      username: "janedoe",
      password: "client",
      avatar: avatar2$2,
      email: "client@demo.com",
      role: "client",
      abilityRules: [
        {
          action: "read",
          subject: "Auth"
        },
        {
          action: "read",
          subject: "AclDemo"
        }
      ]
    }
  ]
};

const login_post = defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  if (!email || !password) {
    throw createError({
      statusCode: 403,
      statusMessage: "Username and Password is required to login",
      data: {
        username: ["Username and Password is required to login"]
      }
    });
  }
  const dbUser = db$4.users.find((u) => u.email === email && u.password === password);
  if (!dbUser) {
    throw createError({
      statusCode: 403,
      statusMessage: "Invalid username or password",
      data: {
        username: ["Invalid username or password"]
      }
    });
  }
  const { password: _, ...user } = dbUser;
  return {
    user
  };
});

const login_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: login_post
});

const me_get = defineEventHandler(async (event) => {
  var _a;
  const session = await setAuthOnlyRoute(event, "You must be signed in to get your data.");
  const dbUser = db$4.users.find((user) => {
    var _a2;
    return user.email === ((_a2 = session.user) == null ? void 0 : _a2.email);
  });
  if (!dbUser) {
    throw createError({
      statusCode: 403,
      statusMessage: `User with email "${(_a = session.user) == null ? void 0 : _a.email}" not found in records.`
    });
  }
  const { password: _, ...response } = dbUser;
  return response;
});

const me_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: me_get
});

const avatar1$1 = getPublicUrl("/images/avatars/avatar-1.png");
const avatar2$1 = getPublicUrl("/images/avatars/avatar-2.png");
const avatar3$1 = getPublicUrl("/images/avatars/avatar-3.png");
const avatar4$1 = getPublicUrl("/images/avatars/avatar-4.png");
const avatar5$1 = getPublicUrl("/images/avatars/avatar-5.png");
const avatar6$1 = getPublicUrl("/images/avatars/avatar-6.png");
const avatar7$1 = getPublicUrl("/images/avatars/avatar-7.png");
const avatar8$1 = getPublicUrl("/images/avatars/avatar-8.png");
const product10 = getPublicUrl("/images/eCommerce/10.png");
const product11 = getPublicUrl("/images/eCommerce/11.png");
const product13 = getPublicUrl("/images/eCommerce/13.png");
const product14 = getPublicUrl("/images/eCommerce/14.png");
const product15 = getPublicUrl("/images/eCommerce/15.png");
const product16 = getPublicUrl("/images/eCommerce/16.png");
const product17 = getPublicUrl("/images/eCommerce/17.png");
const product18 = getPublicUrl("/images/eCommerce/18.png");
const product19 = getPublicUrl("/images/eCommerce/19.png");
const product20 = getPublicUrl("/images/eCommerce/20.png");
const product23 = getPublicUrl("/images/eCommerce/23.png");
const product24 = getPublicUrl("/images/eCommerce/24.png");
const product25 = getPublicUrl("/images/eCommerce/25.png");
const product26 = getPublicUrl("/images/eCommerce/26.png");
const product3 = getPublicUrl("/images/eCommerce/3.png");
const product4 = getPublicUrl("/images/eCommerce/4.png");
const product5 = getPublicUrl("/images/eCommerce/5.png");
const product6 = getPublicUrl("/images/eCommerce/6.png");
const product7 = getPublicUrl("/images/eCommerce/7.png");
const product8 = getPublicUrl("/images/eCommerce/8.png");
const product9 = getPublicUrl("/images/eCommerce/9.png");
const db$3 = {
  salesDetails: [
    {
      product: {
        id: 19,
        name: "OnePlus 7 Pro ",
        slug: "one-plus-7-pro-19",
        brand: "Philips",
        category: "Smart Phone",
        price: 14.99,
        image: product9,
        hasFreeShipping: false,
        rating: 4,
        description: "The OnePlus 7 Pro features a brand new design, with a glass back and front and curved sides. The phone feels\n    very premium but\u2019s it\u2019s also very heavy. The Nebula Blue variant looks slick but it\u2019s quite slippery, which\n    makes single-handed use a real challenge. It has a massive 6.67-inch \u2018Fluid AMOLED\u2019 display with a QHD+\n    resolution, 90Hz refresh rate and support for HDR 10+ content. The display produces vivid colours, deep blacks\n    and has good viewing angles."
      },
      date: "30 Apr 2020",
      buyer: {
        name: "Ana Smith",
        avatar: avatar3$1
      },
      payment: {
        total: 984,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 984,
        status: "Completed"
      }
    },
    {
      product: {
        id: 21,
        name: "Google - Google Home",
        slug: "google-google-home-white-slate-fabric-21",
        brand: "Google",
        category: "Google Home",
        price: 129.29,
        image: product7,
        hasFreeShipping: true,
        rating: 4,
        description: "Simplify your everyday life with the Google Home, a voice-activated speaker powered by the Google Assistant. Use\n    voice commands to enjoy music, get answers from Google and manage everyday tasks. Google Home is compatible with\n    Android and iOS operating systems, and can control compatible smart devices such as Chromecast or Nest."
      },
      date: "11 Jul 2020",
      buyer: {
        name: "Lindsay Green",
        avatar: avatar8$1
      },
      payment: {
        total: 1101,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 1101,
        status: "Completed"
      }
    },
    {
      product: {
        id: 17,
        name: "Nike Air Max",
        slug: "72-9301-speaker-wire-harness-adapter-for-most-plymouth-dodge-and-mitsubishi-vehicles-multi-17",
        description: "With a bold application of colorblocking inspired by modern art styles, the Nike Air Max 270 React sneaker is constructed with layers of lightweight material to achieve its artful look and comfortable feel.",
        brand: "Nike",
        category: "Shoes",
        price: 81.99,
        image: product11,
        hasFreeShipping: true,
        rating: 5
      },
      date: "06 Jan 2021",
      buyer: {
        name: "Ethan Lee",
        avatar: avatar1$1
      },
      payment: {
        total: 726,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 126,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 2,
        name: "Bose Frames Tenor",
        slug: "bose-frames-tenor-rectangular-polarized-bluetooth-audio-sunglasses-2",
        description: "Redesigned for luxury \u2014 Thoughtfully refined and strikingly elegant, the latest Bose sunglasses blend enhanced features and designs for an elevated way to listen",
        brand: "Bose",
        category: "Glass",
        price: 249,
        image: product26,
        hasFreeShipping: false,
        rating: 4
      },
      date: "21 Aug 2020",
      buyer: {
        name: "Scott Miller",
        avatar: avatar7$1
      },
      payment: {
        total: 646,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 345,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 25,
        name: "Apple iMac 27-inch",
        slug: "apple-i-mac-27-inch-25",
        brand: "Apple",
        category: "iMac",
        price: 999.99,
        image: product3,
        hasFreeShipping: true,
        rating: 4,
        description: "The all-in-one for all. If you can dream it, you can do it on iMac. It\u2019s beautifully & incredibly intuitive and\n    packed with tools that let you take any idea to the next level. And the new 27-inch model elevates the\n    experience in way, with faster processors and graphics, expanded memory and storage, enhanced audio and video\n    capabilities, and an even more stunning Retina 5K display. It\u2019s the desktop that does it all \u2014 better and faster\n    than ever."
      },
      date: "21 Aug 2020",
      buyer: {
        name: "Brandon Brooks",
        avatar: avatar5$1
      },
      payment: {
        total: 1005,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 21,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 12,
        name: "Adidas Mens Tech Response Shoes",
        slug: "adidas-mens-tech-response-shoes-12",
        description: "Comfort + performance.  Designed with materials that are durable, lightweight and extremely comfortable. Core performance delivers the perfect mix of fit, style and all-around performance.",
        brand: "Adidas",
        category: "Shoes",
        price: 54.59,
        image: product16,
        hasFreeShipping: false,
        rating: 5
      },
      date: "10 Mar 2021",
      buyer: {
        name: "Henry Mann",
        avatar: avatar6$1
      },
      payment: {
        total: 1114,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 814,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 25,
        name: "Apple iMac 27-inch",
        slug: "apple-i-mac-27-inch-25",
        brand: "Apple",
        category: "iMac",
        price: 999.99,
        image: product3,
        hasFreeShipping: true,
        rating: 4,
        description: "The all-in-one for all. If you can dream it, you can do it on iMac. It\u2019s beautifully & incredibly intuitive and\n    packed with tools that let you take any idea to the next level. And the new 27-inch model elevates the\n    experience in way, with faster processors and graphics, expanded memory and storage, enhanced audio and video\n    capabilities, and an even more stunning Retina 5K display. It\u2019s the desktop that does it all \u2014 better and faster\n    than ever."
      },
      date: "21 Aug 2020",
      buyer: {
        name: "Brandon Brooks",
        avatar: avatar5$1
      },
      payment: {
        total: 1005,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 21,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 24,
        name: "OneOdio A71 Wired Headphones",
        slug: "one-odio-a71-wired-headphones-24",
        brand: "OneOdio",
        category: "Headphone",
        price: 49.99,
        image: product4,
        hasFreeShipping: true,
        rating: 3,
        description: "Omnidirectional detachable boom mic upgrades the headphones into a professional headset for gaming, business,\n    podcasting and taking calls on the go. Better pick up your voice. Control most electric devices through voice\n    activation, or schedule a ride with Uber and order a pizza. OneOdio A71 Wired Headphones voice-controlled device\n    turns any home into a smart device on a smartphone or tablet."
      },
      date: "12 Nov 2020",
      buyer: {
        name: "Grant Wright",
        avatar: avatar2$1
      },
      payment: {
        total: 207,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 207,
        status: "Completed"
      }
    },
    {
      product: {
        id: 20,
        name: "Sony 4K Ultra HD LED TV ",
        slug: "sony-4-k-ultra-hd-led-tv-20",
        brand: "Apple",
        category: "Smart TV",
        price: 7999.99,
        image: product8,
        hasFreeShipping: false,
        rating: 5,
        description: "Sony 4K Ultra HD LED TV has 4K HDR Support. The TV provides clear visuals and provides distinct sound quality\n    and an immersive experience. This TV has Yes HDMI ports & Yes USB ports. Connectivity options included are HDMI.\n    You can connect various gadgets such as your laptop using the HDMI port. The TV comes with a 1 Year warranty."
      },
      date: "19 Apr 2021",
      buyer: {
        name: "Amanda Sanchez",
        avatar: avatar2$1
      },
      payment: {
        total: 1119,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 1119,
        status: "Completed"
      }
    },
    {
      product: {
        id: 23,
        name: "Apple - MacBook Air\xAE",
        slug: "apple-mac-book-air-latest-model-13-3-display-silver-23",
        brand: "Apple",
        category: "Mac",
        price: 999.99,
        image: product5,
        hasFreeShipping: false,
        rating: 4,
        description: "MacBook Air is a thin, lightweight laptop from Apple. MacBook Air features up to 8GB of memory, a\n    fifth-generation Intel Core processor, Thunderbolt 2, great built-in apps, and all-day battery life.1 Its thin,\n    light, and durable enough to take everywhere you go-and powerful enough to do everything once you get there,\n better."
      },
      date: "25 Dec 2020",
      buyer: {
        name: "Kathy Estrada",
        avatar: avatar2$1
      },
      payment: {
        total: 1221,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 1025,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 25,
        name: "Apple iMac 27-inch",
        slug: "apple-i-mac-27-inch-25",
        brand: "Apple",
        category: "iMac",
        price: 999.99,
        image: product3,
        hasFreeShipping: true,
        rating: 4,
        description: "The all-in-one for all. If you can dream it, you can do it on iMac. It\u2019s beautifully & incredibly intuitive and\n    packed with tools that let you take any idea to the next level. And the new 27-inch model elevates the\n    experience in way, with faster processors and graphics, expanded memory and storage, enhanced audio and video\n capabilities, and an even more stunning Retina 5K display. It\u2019s the desktop that does it all \u2014 better and faster\n than ever."
      },
      date: "19 May 2020",
      buyer: {
        name: "William Lopez",
        avatar: avatar2$1
      },
      payment: {
        total: 973,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 374,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 8,
        name: "PlayStation 4 Console",
        slug: "play-station-4-console-8",
        description: "All the greatest, games, TV, music and more. Connect with your friends to broadcast and celebrate your epic moments at the press of the Share button to Twitch, YouTube, Facebook and Twitter.",
        brand: "Sony",
        category: "Gaming",
        price: 339.95,
        image: product20,
        hasFreeShipping: false,
        rating: 4
      },
      date: "27 Mar 2021",
      buyer: {
        name: "Colleen Taylor",
        avatar: avatar2$1
      },
      payment: {
        total: 1235,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 1235,
        status: "Completed"
      }
    },
    {
      product: {
        id: 5,
        name: "Toshiba Canvio External Hard Drive",
        slug: "toshiba-canvio-advance-2-tb-portable-external-hard-drive-5",
        description: "Up to 3TB of storage capacity to store your growing files and content",
        brand: "Toshiba",
        category: "Storage Device",
        price: 69.99,
        image: product23,
        hasFreeShipping: true,
        rating: 2
      },
      date: "21 Jun 2020",
      buyer: {
        name: "Melanie Olson",
        avatar: avatar6$1
      },
      payment: {
        total: 780,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 780,
        status: "Completed"
      }
    },
    {
      product: {
        id: 19,
        name: "OnePlus 7 Pro ",
        slug: "one-plus-7-pro-19",
        brand: "Philips",
        category: "Smart Phone",
        price: 14.99,
        image: product9,
        hasFreeShipping: false,
        rating: 4,
        description: "The OnePlus 7 Pro features a brand new design, with a glass back and front and curved sides. The phone feels\n    very premium but\u2019s it\u2019s also very heavy. The Nebula Blue variant looks slick but it\u2019s quite slippery, which\n    makes single-handed use a real challenge. It has a massive 6.67-inch \u2018Fluid AMOLED\u2019 display with a QHD+\n    resolution, 90Hz refresh rate and support for HDR 10+ content. The display produces vivid colours, deep blacks\n    and has good viewing angles."
      },
      date: "28 Jan 2021",
      buyer: {
        name: "Cynthia Cannon",
        avatar: avatar7$1
      },
      payment: {
        total: 1073,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 871,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 23,
        name: "Apple - MacBook Air\xAE",
        slug: "apple-mac-book-air-latest-model-13-3-display-silver-23",
        brand: "Apple",
        category: "Mac",
        price: 999.99,
        image: product5,
        hasFreeShipping: false,
        rating: 4,
        description: "MacBook Air is a thin, lightweight laptop from Apple. MacBook Air features up to 8GB of memory, a\n    fifth-generation Intel Core processor, Thunderbolt 2, great built-in apps, and all-day battery life.1 Its thin,\n    light, and durable enough to take everywhere you go-and powerful enough to do everything once you get there,\n better."
      },
      date: "20 Aug 2020",
      buyer: {
        name: "David Archer",
        avatar: avatar5$1
      },
      payment: {
        total: 224,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 224,
        status: "Completed"
      }
    },
    {
      product: {
        id: 9,
        name: "Giotto 32oz Leakproof BPA Free Drinking Water",
        slug: "giotto-32oz-leakproof-bpa-free-drinking-water-9",
        description: "With unique inspirational quote and time markers on it,this water bottle is great for measuring your daily intake of water,reminding you stay hydrated and drink enough water throughout the day.A must have for any fitness goals including weight loss,appetite control and overall health.",
        brand: "3M",
        category: "Home",
        price: 16.99,
        image: product19,
        hasFreeShipping: true,
        rating: 4
      },
      date: "29 Dec 2020",
      buyer: {
        name: "Michael Cervantes",
        avatar: avatar8$1
      },
      payment: {
        total: 960,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 866,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 13,
        name: "Laptop Bag",
        slug: "laptop-bag-13",
        description: "TSA FRIENDLY- A separate DIGI SMART compartment can hold 15.6 inch Laptop as well as 15 inch, 14 inch MacBook, 12.9 inch iPad, and tech accessories like charger for quick TSA checkpoint when traveling",
        brand: "TAS",
        category: "Bag",
        price: 29.99,
        image: product15,
        hasFreeShipping: true,
        rating: 5
      },
      date: "15 Aug 2020",
      buyer: {
        name: "Nathaniel Marshall",
        avatar: avatar6$1
      },
      payment: {
        total: 1423,
        receivedPaymentStatus: "Unpaid",
        paidAmount: 0,
        status: "Cancelled"
      }
    },
    {
      product: {
        id: 5,
        name: "Toshiba Canvio External Hard Drive",
        slug: "toshiba-canvio-advance-2-tb-portable-external-hard-drive-5",
        description: "Up to 3TB of storage capacity to store your growing files and content",
        brand: "Toshiba",
        category: "Storage Device",
        price: 69.99,
        image: product23,
        hasFreeShipping: true,
        rating: 2
      },
      date: "03 Jan 2021",
      buyer: {
        name: "Tiffany Ross",
        avatar: avatar4$1
      },
      payment: {
        total: 663,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 285,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 14,
        name: "Wireless Charger 5W Max",
        slug: "wireless-charger-5-w-max-14",
        description: "Charge with case: transmits charging power directly through protective cases. Rubber/plastic/TPU cases under 5 mm thickness . Do not use any magnetic and metal attachments or cards, or it will prevent charging.",
        brand: "3M",
        category: "Electronics",
        price: 10.83,
        image: product14,
        hasFreeShipping: true,
        rating: 3
      },
      date: "20 Dec 2020",
      buyer: {
        name: "Philip Walters",
        avatar: null
      },
      payment: {
        total: 1112,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 426,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 15,
        name: "Vankyo leisure 3 mini projector",
        slug: "3-m-filtrete-vacuum-belt-for-select-hoover-t-series-upright-vacuums-15",
        description: "SUPERIOR VIEWING EXPERIENCE: Supporting 1920x1080 resolution, VANKYO Leisure 3 projector is powered by MStar Advanced Color Engine, which is ideal for home entertainment. 2020 upgraded LED lighting provides a superior viewing experience for you.",
        brand: "Vankyo Store",
        category: "Projector",
        price: 99.99,
        image: product13,
        hasFreeShipping: true,
        rating: 2
      },
      date: "02 Jul 2020",
      buyer: {
        name: "Pamela Smith",
        avatar: null
      },
      payment: {
        total: 462,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 383,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 12,
        name: "Adidas Mens Tech Response Shoes",
        slug: "adidas-mens-tech-response-shoes-12",
        description: "Comfort + performance.  Designed with materials that are durable, lightweight and extremely comfortable. Core performance delivers the perfect mix of fit, style and all-around performance.",
        brand: "Adidas",
        category: "Shoes",
        price: 54.59,
        image: product16,
        hasFreeShipping: false,
        rating: 5
      },
      date: "24 Jul 2020",
      buyer: {
        name: "Kara Gonzalez",
        avatar: avatar3$1
      },
      payment: {
        total: 1325,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 792,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 18,
        name: "Logitech K380 Wireless Keyboard",
        slug: "acer-11-6-chromebook-intel-celeron-2-gb-memory-16-gb-e-mmc-flash-memory-moonstone-white-18",
        description: "Logitech K380 Bluetooth Wireless Keyboard gives you the comfort and convenience of desktop typing on your smartphone, and tablet. It is a wireless keyboard that connects to all Bluetooth wireless devices that support external keyboards. Take this compact, lightweight, Bluetooth keyboard anywhere in your home. Type wherever you like, on any compatible computer, phone or tablet.",
        brand: "Logitech",
        category: "Keyboard",
        price: 81.99,
        image: product10,
        hasFreeShipping: false,
        rating: 4
      },
      date: "07 Jan 2021",
      buyer: {
        name: "Katherine Tate",
        avatar: avatar8$1
      },
      payment: {
        total: 582,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 234,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 3,
        name: "Willful Smart Watch for Men Women 2020,",
        slug: "willful-smart-watch-for-men-women-2020-3",
        description: "Are you looking for a smart watch, which can not only easily keep tracking of your steps, calories, heart rate and sleep quality, but also keep you informed of incoming calls.",
        brand: "Willful",
        category: "Smart Watch",
        price: 29.99,
        image: product25,
        hasFreeShipping: true,
        rating: 5
      },
      date: "29 Aug 2020",
      buyer: {
        name: "Ashley Douglas DDS",
        avatar: avatar3$1
      },
      payment: {
        total: 1092,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 1092,
        status: "Completed"
      }
    },
    {
      product: {
        id: 22,
        name: "Switch Pro Controller",
        slug: "switch-pro-controller-22",
        brand: "Sharp",
        category: "Gaming",
        price: 429.99,
        image: product6,
        hasFreeShipping: false,
        rating: 3,
        description: "The Nintendo Switch Pro Controller is one of the priciest 'baseline' controllers in the current console\n generation, but it's also sturdy, feels good to play with, has an excellent direction pad, and features\n    impressive motion sensors and vibration systems. On top of all of that, it uses Bluetooth, so you don't need an\n    adapter to use it with your PC."
      },
      date: "09 Jan 2021",
      buyer: {
        name: "Eric Gregory",
        avatar: avatar3$1
      },
      payment: {
        total: 939,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 939,
        status: "Completed"
      }
    },
    {
      product: {
        id: 4,
        name: "Ronyes Unisex College Bag Bookbags for Women",
        slug: "ronyes-unisex-college-bag-bookbags-for-women-4",
        description: "Made of high quality water-resistant material; padded and adjustable shoulder straps; external USB with built-in charging cable offers a convenient charging",
        brand: "Ronyes",
        category: "Bag",
        price: 23.99,
        image: product24,
        hasFreeShipping: true,
        rating: 2
      },
      date: "06 May 2020",
      buyer: {
        name: "Taylor Hernandez",
        avatar: avatar3$1
      },
      payment: {
        total: 1129,
        receivedPaymentStatus: "Unpaid",
        paidAmount: 0,
        status: "Cancelled"
      }
    },
    {
      product: {
        id: 10,
        name: "Oculus Quest All-in-one VR",
        slug: "oculus-quest-all-in-one-vr-10",
        description: "All-in-one VR: No PC. No wires. No limits. Oculus quest is an all-in-one gaming system built for virtual reality. Now you can play almost anywhere with just a VR headset and controllers. Oculus touch controllers: arm yourself with the award-winning Oculus touch controllers. Your slashes, throws and grab appear in VR with intuitive, realistic Precision, transporting your hands and gestures right into the game",
        brand: "Oculus",
        category: "VR",
        price: 645,
        image: product18,
        hasFreeShipping: false,
        rating: 1
      },
      date: "29 Dec 2020",
      buyer: {
        name: "Justin Patterson",
        avatar: avatar3$1
      },
      payment: {
        total: 252,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 252,
        status: "Completed"
      }
    },
    {
      product: {
        id: 11,
        name: "Handbags for Women Large Designer bag",
        slug: "handbags-for-women-large-designer-bag-11",
        description: "Classic Hobo Purse: Top zipper closure, with 2 side zipper pockets design and elegant tassels decoration, fashionable and practical handbags for women, perfect for shopping, dating, travel and business",
        brand: "Hobo",
        category: "Bag",
        price: 39.99,
        image: product17,
        hasFreeShipping: true,
        rating: 3
      },
      date: "19 Dec 2020",
      buyer: {
        name: "Judy Cummings",
        avatar: avatar3$1
      },
      payment: {
        total: 1369,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 1369,
        status: "Completed"
      }
    },
    {
      product: {
        id: 18,
        name: "Logitech K380 Wireless Keyboard",
        slug: "acer-11-6-chromebook-intel-celeron-2-gb-memory-16-gb-e-mmc-flash-memory-moonstone-white-18",
        description: "Logitech K380 Bluetooth Wireless Keyboard gives you the comfort and convenience of desktop typing on your smartphone, and tablet. It is a wireless keyboard that connects to all Bluetooth wireless devices that support external keyboards. Take this compact, lightweight, Bluetooth keyboard anywhere in your home. Type wherever you like, on any compatible computer, phone or tablet.",
        brand: "Logitech",
        category: "Keyboard",
        price: 81.99,
        image: product10,
        hasFreeShipping: false,
        rating: 4
      },
      date: "02 Jan 2021",
      buyer: {
        name: "Linda Buchanan",
        avatar: avatar7$1
      },
      payment: {
        total: 351,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 351,
        status: "Completed"
      }
    },
    {
      product: {
        id: 21,
        name: "Google - Google Home",
        slug: "google-google-home-white-slate-fabric-21",
        brand: "Google",
        category: "Google Home",
        price: 129.29,
        image: product7,
        hasFreeShipping: true,
        rating: 4,
        description: "Simplify your everyday life with the Google Home, a voice-activated speaker powered by the Google Assistant. Use\n    voice commands to enjoy music, get answers from Google and manage everyday tasks. Google Home is compatible with\n    Android and iOS operating systems, and can control compatible smart devices such as Chromecast or Nest."
      },
      date: "25 Feb 2021",
      buyer: {
        name: "Brian Perez",
        avatar: avatar8$1
      },
      payment: {
        total: 506,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 497,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 3,
        name: "Willful Smart Watch for Men Women 2020,",
        slug: "willful-smart-watch-for-men-women-2020-3",
        description: "Are you looking for a smart watch, which can not only easily keep tracking of your steps, calories, heart rate and sleep quality, but also keep you informed of incoming calls.",
        brand: "Willful",
        category: "Smart Watch",
        price: 29.99,
        image: product25,
        hasFreeShipping: true,
        rating: 5
      },
      date: "13 Sep 2020",
      buyer: {
        name: "Amy White",
        avatar: null
      },
      payment: {
        total: 195,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 195,
        status: "Completed"
      }
    },
    {
      product: {
        id: 18,
        name: "Logitech K380 Wireless Keyboard",
        slug: "acer-11-6-chromebook-intel-celeron-2-gb-memory-16-gb-e-mmc-flash-memory-moonstone-white-18",
        description: "Logitech K380 Bluetooth Wireless Keyboard gives you the comfort and convenience of desktop typing on your smartphone, and tablet. It is a wireless keyboard that connects to all Bluetooth wireless devices that support external keyboards. Take this compact, lightweight, Bluetooth keyboard anywhere in your home. Type wherever you like, on any compatible computer, phone or tablet.",
        brand: "Logitech",
        category: "Keyboard",
        price: 81.99,
        image: product10,
        hasFreeShipping: false,
        rating: 4
      },
      date: "30 Sep 2020",
      buyer: {
        name: "Katherine Clark",
        avatar: avatar1$1
      },
      payment: {
        total: 1246,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 475,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 14,
        name: "Wireless Charger 5W Max",
        slug: "wireless-charger-5-w-max-14",
        description: "Charge with case: transmits charging power directly through protective cases. Rubber/plastic/TPU cases under 5 mm thickness . Do not use any magnetic and metal attachments or cards, or it will prevent charging.",
        brand: "3M",
        category: "Electronics",
        price: 10.83,
        image: product14,
        hasFreeShipping: true,
        rating: 3
      },
      date: "26 Mar 2021",
      buyer: {
        name: "Jose Murphy",
        avatar: avatar5$1
      },
      payment: {
        total: 383,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 383,
        status: "Completed"
      }
    },
    {
      product: {
        id: 2,
        name: "Bose Frames Tenor",
        slug: "bose-frames-tenor-rectangular-polarized-bluetooth-audio-sunglasses-2",
        description: "Redesigned for luxury \u2014 Thoughtfully refined and strikingly elegant, the latest Bose sunglasses blend enhanced features and designs for an elevated way to listen",
        brand: "Bose",
        category: "Glass",
        price: 249,
        image: product26,
        hasFreeShipping: false,
        rating: 4
      },
      date: "01 Dec 2020",
      buyer: {
        name: "Jeffrey Rose",
        avatar: avatar5$1
      },
      payment: {
        total: 902,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 902,
        status: "Completed"
      }
    },
    {
      product: {
        id: 24,
        name: "OneOdio A71 Wired Headphones",
        slug: "one-odio-a71-wired-headphones-24",
        brand: "OneOdio",
        category: "Headphone",
        price: 49.99,
        image: product4,
        hasFreeShipping: true,
        rating: 3,
        description: "Omnidirectional detachable boom mic upgrades the headphones into a professional headset for gaming, business,\n    podcasting and taking calls on the go. Better pick up your voice. Control most electric devices through voice\n    activation, or schedule a ride with Uber and order a pizza. OneOdio A71 Wired Headphones voice-controlled device\n    turns any home into a smart device on a smartphone or tablet."
      },
      date: "15 Sep 2020",
      buyer: {
        name: "Amber Hunt",
        avatar: avatar7$1
      },
      payment: {
        total: 379,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 174,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 2,
        name: "Bose Frames Tenor",
        slug: "bose-frames-tenor-rectangular-polarized-bluetooth-audio-sunglasses-2",
        description: "Redesigned for luxury \u2014 Thoughtfully refined and strikingly elegant, the latest Bose sunglasses blend enhanced features and designs for an elevated way to listen",
        brand: "Bose",
        category: "Glass",
        price: 249,
        image: product26,
        hasFreeShipping: false,
        rating: 4
      },
      date: "08 Apr 2021",
      buyer: {
        name: "Christopher Haas",
        avatar: avatar2$1
      },
      payment: {
        total: 7,
        receivedPaymentStatus: "Unpaid",
        paidAmount: 0,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 2,
        name: "Bose Frames Tenor",
        slug: "bose-frames-tenor-rectangular-polarized-bluetooth-audio-sunglasses-2",
        description: "Redesigned for luxury \u2014 Thoughtfully refined and strikingly elegant, the latest Bose sunglasses blend enhanced features and designs for an elevated way to listen",
        brand: "Bose",
        category: "Glass",
        price: 249,
        image: product26,
        hasFreeShipping: false,
        rating: 4
      },
      date: "21 Oct 2020",
      buyer: {
        name: "Stephen Mccormick",
        avatar: avatar6$1
      },
      payment: {
        total: 186,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 81,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 19,
        name: "OnePlus 7 Pro ",
        slug: "one-plus-7-pro-19",
        brand: "Philips",
        category: "Smart Phone",
        price: 14.99,
        image: product9,
        hasFreeShipping: false,
        rating: 4,
        description: "The OnePlus 7 Pro features a brand new design, with a glass back and front and curved sides. The phone feels\n    very premium but\u2019s it\u2019s also very heavy. The Nebula Blue variant looks slick but it\u2019s quite slippery, which\n    makes single-handed use a real challenge. It has a massive 6.67-inch \u2018Fluid AMOLED\u2019 display with a QHD+\n    resolution, 90Hz refresh rate and support for HDR 10+ content. The display produces vivid colours, deep blacks\n    and has good viewing angles."
      },
      date: "21 Oct 2020",
      buyer: {
        name: "Matthew Reyes",
        avatar: avatar3$1
      },
      payment: {
        total: 198,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 198,
        status: "Completed"
      }
    },
    {
      product: {
        id: 4,
        name: "Ronyes Unisex College Bag Bookbags for Women",
        slug: "ronyes-unisex-college-bag-bookbags-for-women-4",
        description: "Made of high quality water-resistant material; padded and adjustable shoulder straps; external USB with built-in charging cable offers a convenient charging",
        brand: "Ronyes",
        category: "Bag",
        price: 23.99,
        image: product24,
        hasFreeShipping: true,
        rating: 2
      },
      date: "16 May 2020",
      buyer: {
        name: "Ricardo Morgan",
        avatar: avatar5$1
      },
      payment: {
        total: 519,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 447,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 20,
        name: "Sony 4K Ultra HD LED TV ",
        slug: "sony-4-k-ultra-hd-led-tv-20",
        brand: "Apple",
        category: "Smart TV",
        price: 7999.99,
        image: product8,
        hasFreeShipping: false,
        rating: 5,
        description: "Sony 4K Ultra HD LED TV has 4K HDR Support. The TV provides clear visuals and provides distinct sound quality\n    and an immersive experience. This TV has Yes HDMI ports & Yes USB ports. Connectivity options included are HDMI.\n    You can connect various gadgets such as your laptop using the HDMI port. The TV comes with a 1 Year warranty."
      },
      date: "01 Jul 2020",
      buyer: {
        name: "William Castillo",
        avatar: avatar4$1
      },
      payment: {
        total: 10,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 6,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 11,
        name: "Handbags for Women Large Designer bag",
        slug: "handbags-for-women-large-designer-bag-11",
        description: "Classic Hobo Purse: Top zipper closure, with 2 side zipper pockets design and elegant tassels decoration, fashionable and practical handbags for women, perfect for shopping, dating, travel and business",
        brand: "Hobo",
        category: "Bag",
        price: 39.99,
        image: product17,
        hasFreeShipping: true,
        rating: 3
      },
      date: "04 Jul 2020",
      buyer: {
        name: "James Coleman",
        avatar: avatar8$1
      },
      payment: {
        total: 897,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 677,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 18,
        name: "Logitech K380 Wireless Keyboard",
        slug: "acer-11-6-chromebook-intel-celeron-2-gb-memory-16-gb-e-mmc-flash-memory-moonstone-white-18",
        description: "Logitech K380 Bluetooth Wireless Keyboard gives you the comfort and convenience of desktop typing on your smartphone, and tablet. It is a wireless keyboard that connects to all Bluetooth wireless devices that support external keyboards. Take this compact, lightweight, Bluetooth keyboard anywhere in your home. Type wherever you like, on any compatible computer, phone or tablet.",
        brand: "Logitech",
        category: "Keyboard",
        price: 81.99,
        image: product10,
        hasFreeShipping: false,
        rating: 4
      },
      date: "19 Feb 2021",
      buyer: {
        name: "Michael Summers",
        avatar: avatar3$1
      },
      payment: {
        total: 653,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 653,
        status: "Completed"
      }
    },
    {
      product: {
        id: 3,
        name: "Willful Smart Watch for Men Women 2020,",
        slug: "willful-smart-watch-for-men-women-2020-3",
        description: "Are you looking for a smart watch, which can not only easily keep tracking of your steps, calories, heart rate and sleep quality, but also keep you informed of incoming calls.",
        brand: "Willful",
        category: "Smart Watch",
        price: 29.99,
        image: product25,
        hasFreeShipping: true,
        rating: 5
      },
      date: "03 Mar 2021",
      buyer: {
        name: "Jeremiah Espinoza",
        avatar: avatar2$1
      },
      payment: {
        total: 913,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 468,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 2,
        name: "Bose Frames Tenor",
        slug: "bose-frames-tenor-rectangular-polarized-bluetooth-audio-sunglasses-2",
        description: "Redesigned for luxury \u2014 Thoughtfully refined and strikingly elegant, the latest Bose sunglasses blend enhanced features and designs for an elevated way to listen",
        brand: "Bose",
        category: "Glass",
        price: 249,
        image: product26,
        hasFreeShipping: false,
        rating: 4
      },
      date: "03 Mar 2021",
      buyer: {
        name: "Tyler Brooks",
        avatar: null
      },
      payment: {
        total: 1123,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 1123,
        status: "Completed"
      }
    },
    {
      product: {
        id: 17,
        name: "Nike Air Max",
        slug: "72-9301-speaker-wire-harness-adapter-for-most-plymouth-dodge-and-mitsubishi-vehicles-multi-17",
        description: "With a bold application of colorblocking inspired by modern art styles, the Nike Air Max 270 React sneaker is constructed with layers of lightweight material to achieve its artful look and comfortable feel.",
        brand: "Nike",
        category: "Shoes",
        price: 81.99,
        image: product11,
        hasFreeShipping: true,
        rating: 5
      },
      date: "29 Dec 2020",
      buyer: {
        name: "Juan Wilson",
        avatar: avatar3$1
      },
      payment: {
        total: 779,
        receivedPaymentStatus: "Fully Paid",
        paidAmount: 779,
        status: "Completed"
      }
    },
    {
      product: {
        id: 15,
        name: "Vankyo leisure 3 mini projector",
        slug: "3-m-filtrete-vacuum-belt-for-select-hoover-t-series-upright-vacuums-15",
        description: "SUPERIOR VIEWING EXPERIENCE: Supporting 1920x1080 resolution, VANKYO Leisure 3 projector is powered by MStar Advanced Color Engine, which is ideal for home entertainment. 2020 upgraded LED lighting provides a superior viewing experience for you.",
        brand: "Vankyo Store",
        category: "Projector",
        price: 99.99,
        image: product13,
        hasFreeShipping: true,
        rating: 2
      },
      date: "03 Dec 2020",
      buyer: {
        name: "Marvin Duran",
        avatar: null
      },
      payment: {
        total: 594,
        receivedPaymentStatus: "Unpaid",
        paidAmount: 0,
        status: "Cancelled"
      }
    },
    {
      product: {
        id: 22,
        name: "Switch Pro Controller",
        slug: "switch-pro-controller-22",
        brand: "Sharp",
        category: "Gaming",
        price: 429.99,
        image: product6,
        hasFreeShipping: false,
        rating: 3,
        description: "The Nintendo Switch Pro Controller is one of the priciest 'baseline' controllers in the current console\n    generation, but it's also sturdy, feels good to play with, has an excellent direction pad, and features\n impressive motion sensors and vibration systems. On top of all of that, it uses Bluetooth, so you don't need an\n    adapter to use it with your PC."
      },
      date: "28 May 2020",
      buyer: {
        name: "Jessica Glass",
        avatar: avatar5$1
      },
      payment: {
        total: 1065,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 844,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 18,
        name: "Logitech K380 Wireless Keyboard",
        slug: "acer-11-6-chromebook-intel-celeron-2-gb-memory-16-gb-e-mmc-flash-memory-moonstone-white-18",
        description: "Logitech K380 Bluetooth Wireless Keyboard gives you the comfort and convenience of desktop typing on your smartphone, and tablet. It is a wireless keyboard that connects to all Bluetooth wireless devices that support external keyboards. Take this compact, lightweight, Bluetooth keyboard anywhere in your home. Type wherever you like, on any compatible computer, phone or tablet.",
        brand: "Logitech",
        category: "Keyboard",
        price: 81.99,
        image: product10,
        hasFreeShipping: false,
        rating: 4
      },
      date: "17 May 2020",
      buyer: {
        name: "Gary Herman",
        avatar: avatar8$1
      },
      payment: {
        total: 432,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 64,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 19,
        name: "OnePlus 7 Pro ",
        slug: "one-plus-7-pro-19",
        brand: "Philips",
        category: "Smart Phone",
        price: 14.99,
        image: product9,
        hasFreeShipping: false,
        rating: 4,
        description: "The OnePlus 7 Pro features a brand new design, with a glass back and front and curved sides. The phone feels\n    very premium but\u2019s it\u2019s also very heavy. The Nebula Blue variant looks slick but it\u2019s quite slippery, which\n    makes single-handed use a real challenge. It has a massive 6.67-inch \u2018Fluid AMOLED\u2019 display with a QHD+\n    resolution, 90Hz refresh rate and support for HDR 10+ content. The display produces vivid colours, deep blacks\n    and has good viewing angles."
      },
      date: "25 Mar 2021",
      buyer: {
        name: "Adam Williams",
        avatar: avatar2$1
      },
      payment: {
        total: 1402,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 434,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 20,
        name: "Sony 4K Ultra HD LED TV ",
        slug: "sony-4-k-ultra-hd-led-tv-20",
        brand: "Apple",
        category: "Smart TV",
        price: 7999.99,
        image: product8,
        hasFreeShipping: false,
        rating: 5,
        description: "Sony 4K Ultra HD LED TV has 4K HDR Support. The TV provides clear visuals and provides distinct sound quality\n    and an immersive experience. This TV has Yes HDMI ports & Yes USB ports. Connectivity options included are HDMI.\n    You can connect various gadgets such as your laptop using the HDMI port. The TV comes with a 1 Year warranty."
      },
      date: "13 Apr 2021",
      buyer: {
        name: "Bobby Brown",
        avatar: null
      },
      payment: {
        total: 100,
        receivedPaymentStatus: "Partially Paid",
        paidAmount: 65,
        status: "Confirmed"
      }
    },
    {
      product: {
        id: 14,
        name: "Wireless Charger 5W Max",
        slug: "wireless-charger-5-w-max-14",
        description: "Charge with case: transmits charging power directly through protective cases. Rubber/plastic/TPU cases under 5 mm thickness . Do not use any magnetic and metal attachments or cards, or it will prevent charging.",
        brand: "3M",
        category: "Electronics",
        price: 10.83,
        image: product14,
        hasFreeShipping: true,
        rating: 3
      },
      date: "07 Aug 2020",
      buyer: {
        name: "Sharon Moss",
        avatar: avatar8$1
      },
      payment: {
        total: 823,
        receivedPaymentStatus: "Unpaid",
        paidAmount: 0,
        status: "Cancelled"
      }
    },
    {
      product: {
        id: 15,
        name: "Vankyo leisure 3 mini projector",
        slug: "3-m-filtrete-vacuum-belt-for-select-hoover-t-series-upright-vacuums-15",
        description: "SUPERIOR VIEWING EXPERIENCE: Supporting 1920x1080 resolution, VANKYO Leisure 3 projector is powered by MStar Advanced Color Engine, which is ideal for home entertainment. 2020 upgraded LED lighting provides a superior viewing experience for you.",
        brand: "Vankyo Store",
        category: "Projector",
        price: 99.99,
        image: product13,
        hasFreeShipping: true,
        rating: 2
      },
      date: "23 Feb 2021",
      buyer: {
        name: "Scott Buchanan",
        avatar: avatar5$1
      },
      payment: {
        total: 183,
        receivedPaymentStatus: "Unpaid",
        paidAmount: 0,
        status: "Cancelled"
      }
    }
  ]
};

const datatable_get = defineEventHandler(async (event) => {
  setResponseStatus(event, 200);
  return db$3.salesDetails;
});

const datatable_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: datatable_get
});

const db$2 = {
  faqs: [
    {
      faqTitle: "Payment",
      faqIcon: "tabler-credit-card",
      faqSubtitle: "Get help with payment",
      faqs: [
        {
          question: "When is payment taken for my order?",
          answer: "Payment is taken during the checkout process when you pay for your order. The order number that appears on the confirmation screen indicates payment has been successfully processed."
        },
        {
          question: "How do I pay for my order?",
          answer: "We accept Visa\xAE, MasterCard\xAE, American Express\xAE, and PayPal\xAE. Our servers encrypt all information submitted to them, so you can be confident that your credit card information will be kept safe and secure."
        },
        {
          question: "What should I do if I'm having trouble placing an order?",
          answer: "For any technical difficulties you are experiencing with our website, please contact us at our support portal, or you can call us toll-free at 1-000-000-000, or email us at order@companymail.com"
        },
        {
          question: "Which license do I need for an end product that is only accessible to paying users?",
          answer: "If you have paying users or you are developing any SaaS products then you need an Extended License. For each products, you need a license. You can get free lifetime updates as well."
        },
        {
          question: "Does my subscription automatically renew?",
          answer: "No, This is not subscription based item.Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps."
        }
      ]
    },
    {
      faqTitle: "Delivery",
      faqIcon: "tabler-shopping-bag",
      faqSubtitle: "Get help with delivery",
      faqs: [
        {
          question: "How would you ship my order?",
          answer: "For large products, we deliver your product via a third party logistics company offering you the \u201Croom of choice\u201D scheduled delivery service. For small products, we offer free parcel delivery."
        },
        {
          question: "What is the delivery cost of my order?",
          answer: "The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free."
        },
        {
          question: "What to do if my product arrives damaged?",
          answer: "We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival."
        }
      ]
    },
    {
      faqTitle: "Cancellation",
      faqIcon: "tabler-refresh",
      faqSubtitle: "Get help with cancellation & return",
      faqs: [
        {
          question: "Can I cancel my order?",
          answer: "Scheduled delivery orders can be cancelled 72 hours prior to your selected delivery date for full refund. Parcel delivery orders cannot be cancelled, however a free return label can be provided upon request."
        },
        {
          question: "Can I return my product?",
          answer: "You can return your product within 15 days of delivery, by contacting our support team, All merchandise returned must be in the original packaging with all original items."
        },
        {
          question: "Where can I view status of return?",
          answer: "Locate the item from Your Orders. Select Return/Refund status"
        }
      ]
    },
    {
      faqTitle: "My Orders",
      faqIcon: "tabler-archive",
      faqSubtitle: "Order details",
      faqs: [
        {
          question: "Has my order been successful?",
          answer: `All successful order transactions will receive an order confirmation email once the order has been processed. If you have not received your order confirmation email within 24 hours, check your junk email or spam folder.
              Alternatively, log in to your account to check your order summary. If you do not have a account, you can contact our Customer Care Team on 1-000-000-000.
              `
        },
        {
          question: "My Promotion Code is not working, what can I do?",
          answer: "If you are having issues with a promotion code, please contact us at 1 000 000 000 for assistance."
        },
        {
          question: "How do I track my Orders?",
          answer: "If you have an account just sign into your account from here and select \u201CMy Orders\u201D. If you have a a guest account track your order from here using the order number and the email address."
        }
      ]
    },
    {
      faqTitle: "Services",
      faqIcon: "tabler-settings",
      faqSubtitle: "Get help with product & services",
      faqs: [
        {
          question: "Will I be notified once my order has shipped?",
          answer: "Yes, We will send you an email once your order has been shipped. This email will contain tracking and order information."
        },
        {
          question: "Where can I find warranty information?",
          answer: "We are committed to quality products. For information on warranty period and warranty services, visit our Warranty section here."
        },
        {
          question: "How can I purchase additional warranty coverage?",
          answer: "For the peace of your mind, we offer extended warranty plans that add additional year(s) of protection to the standard manufacturer's warranty provided by us. To purchase or find out more about the extended warranty program, visit Extended Warranty section here."
        }
      ]
    }
  ]
};

const faq_get = defineEventHandler(async (event) => {
  const { q = "" } = getQuery$1(event);
  const searchQuery = is.string(q) ? q : void 0;
  const queryLowered = (searchQuery != null ? searchQuery : "").toString().toLowerCase();
  const filteredData = [];
  Object.entries(db$2.faqs).forEach(([_, faqObj]) => {
    const filteredQAndA = faqObj.faqs.filter((obj) => {
      return obj.question.toLowerCase().includes(queryLowered);
    });
    if (filteredQAndA.length)
      filteredData.push({ ...faqObj, faqs: filteredQAndA });
  });
  setResponseStatus(event, 200);
  return filteredData;
});

const faq_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: faq_get
});

const discord = getPublicUrl("/images/svg/discord.svg");
const gift = getPublicUrl("/images/svg/gift.svg");
const keyboard = getPublicUrl("/images/svg/keyboard.svg");
const laptop = getPublicUrl("/images/svg/laptop.svg");
const lightbulb = getPublicUrl("/images/svg/lightbulb.svg");
const rocket = getPublicUrl("/images/svg/rocket.svg");
const checkoutImg = getPublicUrl("/images/front-pages/misc/checkout-image.png");
const productImg = getPublicUrl("/images/front-pages/misc/product-image.png");
const db$1 = {
  popularArticles: [
    {
      slug: "getting-started",
      title: "Getting Started",
      img: rocket,
      subtitle: "Whether you're new or you're a power user, this article will"
    },
    {
      slug: "first-steps",
      title: "First Steps",
      img: gift,
      subtitle: "Are you a new customer wondering how to get started?"
    },
    {
      slug: "external-content",
      title: "Add External Content",
      img: keyboard,
      subtitle: "Article will show you how to expand the functionality of App"
    }
  ],
  allArticles: [
    {
      title: "Buying",
      icon: "tabler-shopping-cart-plus",
      articles: [
        { title: "What are Favourites?" },
        { title: "How do I purchase an item?" },
        { title: "How do i add or change my details?" },
        { title: "How do refunds work?" },
        { title: "Can I Get A Refund?" },
        { title: "I'm trying to find a specific item" }
      ]
    },
    {
      title: "Item Support",
      icon: "tabler-shopping-cart-plus",
      articles: [
        { title: "What is Item Support?" },
        { title: "How to contact an author?" },
        { title: "Where Is My Purchase Code?" },
        { title: "Extend or renew Item Support" },
        { title: "Item Support FAQ" },
        { title: "Why has my item been removed?" }
      ]
    },
    {
      title: "Licenses",
      icon: "tabler-currency-dollar",
      articles: [
        { title: "Can I use the same license for the..." },
        { title: "How to contact an author?" },
        { title: "I'm making a test site - it's not for ..." },
        { title: "which license do I need?" },
        { title: "I want to make multiple end prod ..." },
        { title: "For logo what license do I need?" }
      ]
    },
    {
      title: "Template Kits",
      icon: "tabler-palette",
      articles: [
        { title: "Template Kits" },
        { title: "Elementor Template Kits: PHP Zip ..." },
        { title: "Template Kits - Imported template ..." },
        { title: "Troubleshooting Import Problems" },
        { title: "How to use the WordPress Plugin ..." },
        { title: "How to use the Template Kit Import ..." }
      ]
    },
    {
      title: "Account & Password",
      icon: "tabler-lock-open",
      articles: [
        { title: "Signing in with a social account" },
        { title: "Locked Out of Account" },
        { title: "I'm not receiving the verification email" },
        { title: "Forgotten Username Or Password" },
        { title: "New password not accepted" },
        { title: "What is Sign In Verification?" }
      ]
    },
    {
      title: "Account Settings",
      icon: "tabler-user",
      articles: [
        { title: "How do I change my password?" },
        { title: "How do I change my username?" },
        { title: "How do I close my account?" },
        { title: "How do I change my email address?" },
        { title: "How can I regain access to my a ..." },
        { title: "Are RSS feeds available on Market?" }
      ]
    }
  ],
  keepLearning: [
    {
      slug: "blogging",
      title: "Blogging",
      img: laptop,
      subtitle: "Expert tips & tools to improve your website or online store using blog."
    },
    {
      slug: "inspiration-center",
      title: "Inspiration Center",
      img: lightbulb,
      subtitle: "inspiration from experts to help you start and grow your big ideas."
    },
    {
      slug: "community",
      title: "Community",
      img: discord,
      subtitle: "A group of people living in the same place or having a particular."
    }
  ],
  articleData: {
    title: "How to add product in cart?",
    lastUpdated: "1 month ago  -  Updated",
    productContent: `
            <p>
              If you're after only one item, simply choose the 'Buy Now' option on the item page. This will take you directly to Checkout.
            </p>
            <p>
              If you want several items, use the 'Add to Cart' button and then choose 'Keep Browsing' to continue shopping or 'Checkout' to finalize your purchase.
            </p>
        `,
    checkoutContent: "You can go back to your cart at any time by clicking on the shopping cart icon at the top right side of the page.",
    articleList: [
      "Template Kits",
      "Elementor Template Kits: PHP Zip Extends",
      "Envato Elements Template Kits",
      "Envato Elements Template Kits",
      "How to use the template in WordPress",
      "How to use the Template Kit Import"
    ],
    checkoutImg,
    productImg
  }
};

const index_get$4 = defineEventHandler(async (event) => {
  setResponseStatus(event, 200);
  return db$1.articleData;
});

const index_get$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$4
});

const index_get$2 = defineEventHandler(async (event) => {
  setResponseStatus(event, 200);
  return { allArticles: db$1.allArticles, popularArticles: db$1.popularArticles, keepLearning: db$1.keepLearning };
});

const index_get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$2
});

const avatar1 = getPublicUrl("/images/avatars/avatar-1.png");
const avatar2 = getPublicUrl("/images/avatars/avatar-2.png");
const avatar3 = getPublicUrl("/images/avatars/avatar-3.png");
const avatar4 = getPublicUrl("/images/avatars/avatar-4.png");
const avatar5 = getPublicUrl("/images/avatars/avatar-5.png");
const avatar6 = getPublicUrl("/images/avatars/avatar-6.png");
const avatar7 = getPublicUrl("/images/avatars/avatar-7.png");
const avatar8 = getPublicUrl("/images/avatars/avatar-8.png");
const eventLabel = getPublicUrl("/images/icons/project-icons/event.png");
const figmaLabel = getPublicUrl("/images/icons/project-icons/figma.png");
const htmlLabel = getPublicUrl("/images/icons/project-icons/html5.png");
const reactLabel = getPublicUrl("/images/icons/project-icons/react.png");
const socialLabel = getPublicUrl("/images/icons/project-icons/social.png");
const supportLabel = getPublicUrl("/images/icons/project-icons/support.png");
const twitterLabel = getPublicUrl("/images/icons/project-icons/twitter.png");
const vueLabel = getPublicUrl("/images/icons/project-icons/vue.png");
const xdLabel = getPublicUrl("/images/icons/project-icons/xd.png");
const UserProfileHeaderBg = getPublicUrl("/images/pages/user-profile-header-bg.png");
const db = {
  data: {
    profileHeader: {
      fullName: "John Doe",
      location: "Vatican City",
      joiningDate: "April 2021",
      designation: "UX Designer",
      profileImg: avatar1,
      coverImg: UserProfileHeaderBg
    },
    profile: {
      about: [
        { property: "Full Name", value: "John Doe", icon: "tabler-user" },
        { property: "Status", value: "active", icon: "tabler-check" },
        { property: "Role", value: "Developer", icon: "tabler-star" },
        { property: "Country", value: "USA", icon: "tabler-flag" },
        { property: "Language", value: "English", icon: "tabler-language" }
      ],
      contacts: [
        { property: "Contact", value: "(123) 456-7890", icon: "tabler-phone" },
        { property: "Skype", value: "john.doe", icon: "tabler-message" },
        { property: "Email", value: "john.doe@example.com", icon: "tabler-mail" }
      ],
      teams: [
        { property: "Backend Developer", value: "(126 Members)", icon: "tabler-brand-github", color: "secondary" },
        { property: "VueJS Developer", value: "(98 Members)", icon: "tabler-brand-vue", color: "success" }
      ],
      overview: [
        { property: "Task Compiled", value: "13.5k", icon: "tabler-check" },
        { property: "Connections", value: "897", icon: "tabler-user" },
        { property: "Projects Compiled", value: "146", icon: "tabler-layout-grid" }
      ],
      connections: [
        {
          isFriend: false,
          connections: "45",
          name: "Cecilia Payne",
          avatar: avatar2
        },
        {
          isFriend: true,
          connections: "1.32k",
          name: "Curtis Fletcher",
          avatar: avatar3
        },
        {
          isFriend: true,
          connections: "125",
          name: "Alice Stone",
          avatar: avatar4
        },
        {
          isFriend: false,
          connections: "456",
          name: "Darrell Barnes",
          avatar: avatar5
        },
        {
          isFriend: false,
          connections: "1.2k",
          name: "Eugenia Moore",
          avatar: avatar8
        }
      ],
      teamsTech: [
        {
          members: 72,
          ChipColor: "error",
          chipText: "Developer",
          title: "React Developers",
          avatar: reactLabel
        },
        {
          members: 122,
          chipText: "Support",
          ChipColor: "primary",
          title: "Support Team",
          avatar: supportLabel
        },
        {
          members: 7,
          ChipColor: "info",
          chipText: "Designer",
          title: "UI Designer",
          avatar: figmaLabel
        },
        {
          members: 289,
          ChipColor: "error",
          chipText: "Developer",
          title: "Vue.js Developers",
          avatar: vueLabel
        },
        {
          members: 24,
          chipText: "Marketing",
          ChipColor: "secondary",
          title: "Digital Marketing",
          avatar: twitterLabel
        }
      ]
    },
    teams: [
      {
        extraMembers: 25,
        title: "React Developers",
        avatar: reactLabel,
        avatarGroup: [
          { avatar: avatar1, name: "Vinnie Mostowy" },
          { avatar: avatar2, name: "Allen Rieske" },
          { avatar: avatar3, name: "Julee Rossignol" },
          { avatar: avatar4, name: "George Burrill" }
        ],
        description: "We don't make assumptions about the rest of your technology stack, so you can develop new features in React.",
        chips: [
          {
            title: "React",
            color: "primary"
          },
          {
            title: "MUI",
            color: "info"
          }
        ]
      },
      {
        extraMembers: 15,
        title: "Vue.js Dev Team",
        avatar: vueLabel,
        avatarGroup: [
          { avatar: avatar5, name: "Kaith D'souza" },
          { avatar: avatar6, name: "John Doe" },
          { avatar: avatar7, name: "Alan Walker" },
          { avatar: avatar8, name: "Calvin Middleton" }
        ],
        description: "The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be featured below.",
        chips: [
          {
            title: "Vuejs",
            color: "success"
          },
          {
            color: "error",
            title: "Developer"
          }
        ]
      },
      {
        extraMembers: 55,
        title: "Creative Designers",
        avatar: xdLabel,
        avatarGroup: [
          { avatar: avatar1, name: "Jimmy Ressula" },
          { avatar: avatar2, name: "Kristi Lawker" },
          { avatar: avatar3, name: "Danny Paul" },
          { avatar: avatar4, name: "Alicia Littleton" }
        ],
        description: "A design or product team is more than just the people on it. A team includes the people, the roles they play.",
        chips: [
          {
            title: "Sketch",
            color: "warning"
          },
          {
            title: "XD",
            color: "error"
          }
        ]
      },
      {
        extraMembers: 35,
        title: "Support Team",
        avatar: supportLabel,
        avatarGroup: [
          { avatar: avatar5, name: "Andrew Tye" },
          { avatar: avatar6, name: "Rishi Swaat" },
          { avatar: avatar7, name: "Rossie Kim" },
          { avatar: avatar8, name: "Mary Hunter" }
        ],
        description: "Support your team. Your customer support team is fielding the good, the bad, and the ugly day in and day out.",
        chips: [
          {
            color: "info",
            title: "Zendesk"
          }
        ]
      },
      {
        extraMembers: 19,
        title: "Digital Marketing",
        avatar: socialLabel,
        avatarGroup: [
          { avatar: avatar1, name: "Kim Merchent" },
          { avatar: avatar2, name: "Sam D'souza" },
          { avatar: avatar3, name: "Nurvi Karlos" },
          { avatar: avatar4, name: "Margorie Whitmire" }
        ],
        description: "Digital marketing refers to advertising delivered through digital channels such as search engines, websites\u2026",
        chips: [
          {
            color: "primary",
            title: "Twitter"
          },
          {
            title: "Email",
            color: "success"
          }
        ]
      },
      {
        title: "Event",
        extraMembers: 55,
        avatar: eventLabel,
        avatarGroup: [
          { avatar: avatar5, name: "Vinnie Mostowy" },
          { avatar: avatar6, name: "Allen Rieske" },
          { avatar: avatar7, name: "Julee Rossignol" },
          { avatar: avatar8, name: "Daniel Long" }
        ],
        description: "Event is defined as a particular contest which is part of a program of contests. An example of an event is the long\u2026",
        chips: [
          {
            title: "Hubilo",
            color: "success"
          }
        ]
      },
      {
        extraMembers: 45,
        title: "Figma Resources",
        avatar: figmaLabel,
        avatarGroup: [
          { avatar: avatar1, name: "Andrew Mostowy" },
          { avatar: avatar2, name: "Micky Ressula" },
          { avatar: avatar3, name: "Michel Pal" },
          { avatar: avatar4, name: "Herman Lockard" }
        ],
        description: "Explore, install, use, and remix thousands of plugins and files published to the Figma Community by designers and developers.",
        chips: [
          {
            title: "UI/UX",
            color: "success"
          },
          {
            title: "Figma",
            color: "secondary"
          }
        ]
      },
      {
        extraMembers: 50,
        title: "Only Beginners",
        avatar: htmlLabel,
        avatarGroup: [
          { avatar: avatar5, name: "Kim Karlos" },
          { avatar: avatar6, name: "Katy Turner" },
          { avatar: avatar7, name: "Peter Adward" },
          { avatar: avatar8, name: "Leona Miller" }
        ],
        description: "Learn the basics of how websites work, front-end vs back-end, and using a code editor. Learn basic HTML, CSS, and\u2026",
        chips: [
          {
            title: "CSS",
            color: "info"
          },
          {
            title: "HTML",
            color: "warning"
          }
        ]
      }
    ],
    projects: [
      {
        daysLeft: 28,
        comments: 15,
        totalTask: 344,
        hours: "380/244",
        tasks: "290/344",
        budget: "$18.2k",
        completedTask: 328,
        deadline: "28/2/22",
        chipColor: "success",
        startDate: "14/2/21",
        budgetSpent: "$24.8k",
        members: "280 members",
        title: "Social Banners",
        client: "Christian Jimenez",
        avatar: socialLabel,
        description: "We are Consulting, Software Development and Web Development Services.",
        avatarGroup: [
          { avatar: avatar1, name: "Vinnie Mostowy" },
          { avatar: avatar2, name: "Allen Rieske" },
          { avatar: avatar3, name: "Julee Rossignol" }
        ]
      },
      {
        daysLeft: 15,
        comments: 236,
        totalTask: 90,
        tasks: "12/90",
        hours: "98/135",
        budget: "$1.8k",
        completedTask: 38,
        deadline: "21/6/22",
        budgetSpent: "$2.4k",
        chipColor: "warning",
        startDate: "18/8/21",
        members: "1.1k members",
        title: "Admin Template",
        client: "Jeffrey Phillips",
        avatar: reactLabel,
        avatarGroup: [
          { avatar: avatar4, name: "Kaith D'souza" },
          { avatar: avatar5, name: "John Doe" },
          { avatar: avatar6, name: "Alan Walker" }
        ],
        description: "Time is our most valuable asset, that's why we want to help you save it by creating\u2026"
      },
      {
        daysLeft: 45,
        comments: 98,
        budget: "$420",
        totalTask: 140,
        tasks: "22/140",
        hours: "880/421",
        completedTask: 95,
        chipColor: "error",
        budgetSpent: "$980",
        deadline: "8/10/21",
        title: "App Design",
        startDate: "24/7/21",
        members: "458 members",
        client: "Ricky McDonald",
        avatar: vueLabel,
        description: "App design combines the user interface (UI) and user experience (UX).",
        avatarGroup: [
          { avatar: avatar7, name: "Jimmy Ressula" },
          { avatar: avatar8, name: "Kristi Lawker" },
          { avatar: avatar1, name: "Danny Paul" }
        ]
      },
      {
        comments: 120,
        daysLeft: 126,
        totalTask: 420,
        budget: "2.43k",
        tasks: "237/420",
        hours: "1.2k/820",
        completedTask: 302,
        deadline: "12/9/22",
        budgetSpent: "$8.5k",
        chipColor: "warning",
        startDate: "10/2/19",
        members: "137 members",
        client: "Hulda Wright",
        title: "Create Website",
        avatar: htmlLabel,
        description: "Your domain name should reflect your products or services so that your...",
        avatarGroup: [
          { avatar: avatar2, name: "Andrew Tye" },
          { avatar: avatar3, name: "Rishi Swaat" },
          { avatar: avatar4, name: "Rossie Kim" }
        ]
      },
      {
        daysLeft: 5,
        comments: 20,
        totalTask: 285,
        tasks: "29/285",
        budget: "28.4k",
        hours: "142/420",
        chipColor: "error",
        completedTask: 100,
        deadline: "25/12/21",
        startDate: "12/12/20",
        members: "82 members",
        budgetSpent: "$52.7k",
        client: "Jerry Greene",
        title: "Figma Dashboard",
        avatar: figmaLabel,
        description: "Use this template to organize your design project. Some of the key features are\u2026",
        avatarGroup: [
          { avatar: avatar5, name: "Kim Merchent" },
          { avatar: avatar6, name: "Sam D'souza" },
          { avatar: avatar7, name: "Nurvi Karlos" }
        ]
      },
      {
        daysLeft: 4,
        comments: 16,
        budget: "$655",
        totalTask: 290,
        tasks: "29/290",
        hours: "580/445",
        completedTask: 290,
        budgetSpent: "$1.3k",
        chipColor: "success",
        deadline: "02/11/21",
        startDate: "17/8/21",
        title: "Logo Design",
        members: "16 members",
        client: "Olive Strickland",
        avatar: xdLabel,
        description: "Premium logo designs created by top logo designers. Create the branding of business.",
        avatarGroup: [
          { avatar: avatar8, name: "Kim Karlos" },
          { avatar: avatar1, name: "Katy Turner" },
          { avatar: avatar2, name: "Peter Adward" }
        ]
      }
    ],
    connections: [
      {
        tasks: "834",
        projects: "18",
        isConnected: true,
        connections: "129",
        name: "Mark Gilbert",
        designation: "UI Designer",
        avatar: avatar1,
        chips: [
          {
            title: "Figma",
            color: "secondary"
          },
          {
            title: "Sketch",
            color: "warning"
          }
        ]
      },
      {
        tasks: "2.31k",
        projects: "112",
        isConnected: false,
        connections: "1.28k",
        name: "Eugenia Parsons",
        designation: "Developer",
        avatar: avatar2,
        chips: [
          {
            color: "error",
            title: "Angular"
          },
          {
            color: "info",
            title: "React"
          }
        ]
      },
      {
        tasks: "1.25k",
        projects: "32",
        isConnected: false,
        connections: "890",
        name: "Francis Byrd",
        designation: "Developer",
        avatar: avatar3,
        chips: [
          {
            title: "HTML",
            color: "primary"
          },
          {
            color: "info",
            title: "React"
          }
        ]
      },
      {
        tasks: "12.4k",
        projects: "86",
        isConnected: false,
        connections: "890",
        name: "Leon Lucas",
        designation: "UI/UX Designer",
        avatar: avatar4,
        chips: [
          {
            title: "Figma",
            color: "secondary"
          },
          {
            title: "Sketch",
            color: "warning"
          },
          {
            color: "primary",
            title: "Photoshop"
          }
        ]
      },
      {
        tasks: "23.8k",
        projects: "244",
        isConnected: true,
        connections: "2.14k",
        name: "Jayden Rogers",
        designation: "Full Stack Developer",
        avatar: avatar5,
        chips: [
          {
            color: "info",
            title: "React"
          },
          {
            title: "HTML",
            color: "warning"
          },
          {
            color: "success",
            title: "Node.js"
          }
        ]
      },
      {
        tasks: "1.28k",
        projects: "32",
        isConnected: false,
        designation: "SEO",
        connections: "1.27k",
        name: "Jeanette Powell",
        avatar: avatar6,
        chips: [
          {
            title: "Analysis",
            color: "secondary"
          },
          {
            color: "success",
            title: "Writing"
          }
        ]
      }
    ]
  }};

const header_get = defineEventHandler(async (event) => {
  setResponseStatus(event, 200);
  return db.data.profileHeader;
});

const header_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: header_get
});

const index_get = defineEventHandler(async (event) => {
  const { tab = "" } = getQuery$1(event);
  setResponseStatus(event, 200);
  return db.data[tab];
});

const index_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get
});

const token_get = defineEventHandler(async (event) => {
  await setAuthOnlyRoute(event, "You must be signed in to get your token.");
  return getToken({ event });
});

const token_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: token_get
});

const Vue3 = version[0] === "3";

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref) {
  if (ref instanceof Promise || ref instanceof Date || ref instanceof RegExp)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = true ? [CapoPlugin({ track: true })] : [];

const renderSSRHeadOptions = {"omitLineBreaks":false};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('file:///Users/hua/Documents/esim/frontend/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getServerEntry = () => import('file:///Users/hua/Documents/esim/frontend/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG);
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$2(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const PAYLOAD_URL_RE = /\/_payload.json(\?.*)?$/ ;
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = Number.parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const isRenderingIsland = event.path.startsWith("/__nuxt_island");
  const islandContext = isRenderingIsland ? await getIslandContext(event) : void 0;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !isRenderingIsland;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  if (!isRenderingIsland) {
    head.push(appHead, headEntryOptions);
  }
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || routeOptions.ssr === false && !isRenderingIsland || (false),
    head,
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set(),
    islandContext
  };
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    return response2;
  }
  const inlinedStyles = isRenderingIsland ? await renderInlineStyles(ssrContext.modules ?? []) : [];
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (inlinedStyles.length) {
    head.push({ style: inlinedStyles });
  }
  {
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (!isRenderingIsland || resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      head.push({ link }, headEntryOptions);
    }
  }
  if (!NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts && !isRenderingIsland) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition: "head",
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head, renderSSRHeadOptions);
  const htmlContext = {
    island: isRenderingIsland,
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  if (isRenderingIsland && islandContext) {
    const islandHead = {};
    for (const entry of head.headEntries()) {
      for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
        const currentValue = islandHead[key];
        if (Array.isArray(currentValue)) {
          currentValue.push(...value);
        }
        islandHead[key] = value;
      }
    }
    islandHead.link = islandHead.link || [];
    islandHead.style = islandHead.style || [];
    const islandResponse = {
      id: islandContext.id,
      head: islandHead,
      html: getServerComponentHTML(htmlContext.body),
      components: getClientIslandResponse(ssrContext),
      slots: getSlotIslandResponse(ssrContext)
    };
    await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
    const response2 = {
      body: JSON.stringify(islandResponse, null, 2),
      statusCode: getResponseStatus(event),
      statusMessage: getResponseStatusText(event),
      headers: {
        "content-type": "application/json;charset=utf-8",
        "x-powered-by": "Nuxt"
      }
    };
    return response2;
  }
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}
function getServerComponentHTML(body) {
  const match = body[0].match(ROOT_NODE_REGEX);
  return match?.[1] || body[0];
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=[^;]*;(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, slot] = match;
      if (!slot) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});
