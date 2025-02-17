(function () {
  function g(l, c, k) { var d = g.resolve(l); if (null == d) throw k = k || l, c = c || "root", d = Error('Failed to require "' + k + '" from "' + c + '"'), d.path = k, d.parent = c, d.require = !0, d; c = g.modules[d]; c._resolving || c.exports || (k = { exports: {} }, k.client = k.component = !0, c._resolving = !0, c.call(this, k.exports, g.relative(d), k), delete c._resolving, c.exports = k.exports); return c.exports } g.modules = {}; g.aliases = {}; g.resolve = function (l) {
  "/" === l.charAt(0) && (l = l.slice(1)); for (var c = [l, l + ".js", l + ".json", l + "/index.js", l + "/index.json"],
    k = 0; k < c.length; k++) { l = c[k]; if (g.modules.hasOwnProperty(l)) return l; if (g.aliases.hasOwnProperty(l)) return g.aliases[l] }
  }; g.normalize = function (g, c) { var k = []; if ("." != c.charAt(0)) return c; g = g.split("/"); c = c.split("/"); for (var d = 0; d < c.length; ++d)".." == c[d] ? g.pop() : "." != c[d] && "" != c[d] && k.push(c[d]); return g.concat(k).join("/") }; g.register = function (l, c) { g.modules[l] = c }; g.alias = function (l, c) { if (!g.modules.hasOwnProperty(l)) throw Error('Failed to alias "' + l + '", it does not exist'); g.aliases[c] = l }; g.relative =
    function (l) { function c(d) { var k = c.resolve(d); return g(k, l, d) } var k = g.normalize(l, ".."); c.resolve = function (d) { var c = d.charAt(0); if ("/" == c) return d.slice(1); if ("." == c) return g.normalize(k, d); var c = l.split("/"), h; a: { for (h = c.length; h--;)if ("deps" === c[h]) break a; h = -1 } (h += 1) || (h = 0); return d = c.slice(0, h + 1).join("/") + "/deps/" + d }; c.exists = function (d) { return g.modules.hasOwnProperty(c.resolve(d)) }; return c }; g.register("component-indexof/index.js", function (g, c, k) {
    k.exports = function (d, c) {
      if (d.indexOf) return d.indexOf(c);
      for (var h = 0; h < d.length; ++h)if (d[h] === c) return h; return -1
    }
    }); g.register("component-emitter/index.js", function (g, c, k) {
      function d(h) { if (h) { for (var b in d.prototype) h[b] = d.prototype[b]; return h } } var m = c("indexof"); k.exports = d; d.prototype.on = d.prototype.addEventListener = function (d, b) { this._callbacks = this._callbacks || {}; (this._callbacks[d] = this._callbacks[d] || []).push(b); return this }; d.prototype.once = function (d, b) {
        function f() { a.off(d, f); b.apply(this, arguments) } var a = this; this._callbacks = this._callbacks ||
          {}; b._off = f; this.on(d, f); return this
      }; d.prototype.off = d.prototype.removeListener = d.prototype.removeAllListeners = d.prototype.removeEventListener = function (d, b) { this._callbacks = this._callbacks || {}; if (0 == arguments.length) return this._callbacks = {}, this; var f = this._callbacks[d]; if (!f) return this; if (1 == arguments.length) return delete this._callbacks[d], this; var a = m(f, b._off || b); ~a && f.splice(a, 1); return this }; d.prototype.emit = function (d) {
      this._callbacks = this._callbacks || {}; var b = [].slice.call(arguments, 1),
        f = this._callbacks[d]; if (f) for (var f = f.slice(0), a = 0, e = f.length; a < e; ++a)f[a].apply(this, b); return this
      }; d.prototype.listeners = function (d) { this._callbacks = this._callbacks || {}; return this._callbacks[d] || [] }; d.prototype.hasListeners = function (d) { return !!this.listeners(d).length }
    }); g.register("component-props/index.js", function (g, c, k) {
      function d(b, f, a) { return b.replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g, function (e) { return "(" == e[e.length - 1] ? a(e) : ~f.indexOf(e) ? a(e) : e }) } function m(b) {
        return function (f) {
          return b +
            f
        }
      } var h = /\b(Array|Date|Object|Math|JSON)\b/g; k.exports = function (b, f) { for (var a = b.replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, "").replace(h, "").match(/[a-zA-Z_]\w*/g) || [], e = [], n = 0; n < a.length; n++)~e.indexOf(a[n]) || e.push(a[n]); f && "string" == typeof f && (f = m(f)); return f ? d(b, e, f) : e }
    }); g.register("component-to-function/index.js", function (g, c, k) {
      function d(e) {
        switch ({}.toString.call(e)) {
          case "[object Object]": return b(e); case "[object Function]": return e; case "[object String]": var a; if (/^ *\W+/.test(e)) a =
            new Function("_", "return _ " + e); else { a = Function; var d = f(e); if (d.length) for (var c, g = 0, k; k = d[g]; g++)c = "_." + k, c = "('function' == typeof " + c + " ? " + c + "() : " + c + ")", e = e.replace(RegExp(k, "g"), c); else e = "_." + e; a = new a("_", "return " + e) } return a; case "[object RegExp]": return h(e); default: return m(e)
        }
      } function m(a) { return function (b) { return a === b } } function h(a) { return function (b) { return a.test(b) } } function b(a) {
        var b = {}, f; for (f in a) b[f] = "string" === typeof a[f] ? m(a[f]) : d(a[f]); return function (a) {
          if ("object" !==
            typeof a) return !1; for (var e in b) if (!(e in a && b[e](a[e]))) return !1; return !0
        }
      } try { var f = c("props") } catch (a) { f = c("props-component") } k.exports = d
    }); g.register("yields-isArray/index.js", function (g, c, k) { var d = Object.prototype.toString; k.exports = Array.isArray || function (c) { return !!c && "[object Array]" == d.call(c) } }); g.register("array/index.js", function (g, c, k) { k.exports = c("./lib/array") }); g.register("array/lib/array.js", function (g, c, k) {
      function d(a) {
        if (!(this instanceof d)) return new d(a); a = a || []; if (h(a)) for (var e =
          this.length = a.length, b = 0; b < e; b++)this[b] = a[b]; else if ("object" == typeof a) { a.constructor == Object && (a._ctx = this._ctx = JSON.parse(JSON.stringify(a))); for (e in d.prototype) a[e] = d.prototype[e]; return a }
      } g = c("./enumerable"); var m = Array.prototype, h = Array.isArray || c("isArray"); try { var b = c("emitter") } catch (f) { b = c("emitter-component") } k.exports = d; b(d.prototype); g(d.prototype); d.prototype.pop = function () { var a = m.pop.apply(this, arguments); this.emit("remove", a, this.length); return a }; d.prototype.push = function () {
        for (var a =
          m.push.apply(this, arguments), b = [].slice.call(arguments), f = 0, d = b.length; f < d; f++)this.emit("add", b[f], a - d + f); return a
      }; d.prototype.shift = function () { var a = m.shift.apply(this, arguments); this.emit("remove", a, 0); return a }; d.prototype.splice = function (a) { for (var b = m.splice.apply(this, arguments), f = [].slice.call(arguments, 2), d = 0, c = b.length; d < c; d++)this.emit("remove", b[d], a); d = 0; for (c = f.length; d < c; d++)this.emit("add", f[d], a + d); return b }; d.prototype.unshift = function () {
        for (var a = m.unshift.apply(this, arguments),
          b = [].slice.call(arguments), f = 0, d = b.length; f < d; f++)this.emit("add", b[f], f); return a
      }; d.prototype.toJSON = function () { return this.map(function (a) { return a.toJSON ? a.toJSON() : a }).toArray() }; d.prototype.toArray = function () { return m.slice.call(this) }; d.get = function (a) { return a }; d.prototype.get = d.get;["toString", "reverse", "concat", "join", "slice"].forEach(function (a) { d.prototype[a] = function () { return m[a].apply(this, arguments) } }); d.prototype._remake = function (a) {
        var b = this.constructor, b = this._ctx ? new b(this._ctx) :
          new b; m.push.apply(b, a); b.get = this.get || d.get; return b
      }
    }); g.register("array/lib/enumerable.js", function (g, c, k) {
      var d = c("to-function"), m = Array.prototype, h = {}; k.exports = function (b) { for (var f in h) b[f] = h[f]; return b }; h.forEach = h.each = function (b) { for (var f = this.length, a = 0; a < f; a++)b(this[a], a); return this }; h.map = function (b) { b = d(b); for (var f = this.length, a = 0; a < f; ++a)this[a] = b(this.get(this[a]), a); return this }; h.filter = h.select = function (b) {
        b = d(b); for (var f = [], a = this.length, e, c = 0; c < a; ++c)e = this.get(this[c]),
          b(e, c) && f.push(this[c]); return this._remake(f)
      }; h.unique = function (b) { var f = [], a = [], e = this.length, c; b = b ? d(b) : function (a) { return a }; for (var g = 0; g < e; ++g)c = b(this.get(this[g])), ~a.indexOf(c) || (a.push(c), f.push(this[g])); return this._remake(f) }; h.reject = function (b) { var f = [], a = this.length, e, c; "string" == typeof b && (b = d(b)); if (b) for (c = 0; c < a; ++c)e = this.get(this[c]), b(e, c) || f.push(this[c]); else for (c = 0; c < a; ++c)e = this.get(this[c]), e != b && f.push(this[c]); return this._remake(f) }; h.compact = function () { return this.reject(null) };
      h.find = function (b) { b = d(b); for (var f = this.length, a, e = 0; e < f; ++e)if (a = this.get(this[e]), b(a, e)) return this[e] }; h.findLast = function (b) { b = d(b); for (var f = this.length; f--;)if (b(this.get(this[f]), f)) return this[f] }; h.every = function (b) { b = d(b); for (var f = this.length, a, e = 0; e < f; ++e)if (a = this.get(this[e]), !b(a, e)) return !1; return !0 }; h.none = function (b) { b = d(b); for (var f = this.length, a, e = 0; e < f; ++e)if (a = this.get(this[e]), b(a, e)) return !1; return !0 }; h.any = function (b) {
        b = d(b); for (var f = this.length, a, e = 0; e < f; ++e)if (a = this.get(this[e]),
          b(a, e)) return !0; return !1
      }; h.count = function (b) { b = d(b); var f = 0, a = this.length, e; if (!b) return a; for (var c = 0; c < a; ++c)e = this.get(this[c]), b(e, c) && ++f; return f }; h.indexOf = function (b) { for (var f = this.length, a, d = 0; d < f; ++d)if (a = this.get(this[d]), a === b) return d; return -1 }; h.lastIndexOf = function (b) { for (var d = this.length, a = --d; 0 <= a; --a)if (d = this.get(this[a]), d === b) return a; return -1 }; h.has = function (b) { return !!~this.indexOf(b) }; h.reduce = function (b, d) {
        var a = this.length, e = 0, c; for (c = null == d ? this.get(e++) : d; e < a; ++e)c =
          b(c, this.get(this[e]), e); return c
      }; h.max = function (b) { var f = this.length, a = -Infinity, e = 0, c; if (b) for (b = d(b), c = 0; c < f; ++c)e = b(this.get(this[c]), c), a = e > a ? e : a; else for (c = 0; c < f; ++c)e = this.get(this[c]), a = e > a ? e : a; return a }; h.min = function (b) { var f = this.length, a = Infinity, c = 0, g; if (b) for (b = d(b), g = 0; g < f; ++g)c = b(this.get(this[g]), g), a = c < a ? c : a; else for (g = 0; g < f; ++g)c = this.get(this[g]), a = c < a ? c : a; return a }; h.sum = function (b) {
        var c = this.length, a = 0, e; if (b) for (b = d(b), e = 0; e < c; ++e)a += b(this.get(this[e]), e); else for (e = 0; e <
          c; ++e)a += this.get(this[e]); return a
      }; h.avg = h.mean = function (b) { var c = this.length, a = 0, e; if (b) for (b = d(b), e = 0; e < c; ++e)a += b(this.get(this[e]), e); else for (e = 0; e < c; ++e)a += this.get(this[e]); return a / c }; h.first = function (b) { if (!b) return this[0]; if ("number" !== typeof b) return this.find(b); b = Math.min(b, this.length); for (var d = Array(b), a = 0; a < b; ++a)d[a] = this[a]; return d }; h.last = function (b) {
        var d = this.length; if (!b) return this[d - 1]; if ("number" !== typeof b) return this.findLast(b); b = Math.max(0, d - b); for (var a = []; b < d; ++b)a.push(this[b]);
        return a
      }; h.hash = function (b) { for (var d = this.length, a = {}, c, g = 0, d = this.length; g < d; g++)(c = this.get(this[g])[b]) && (a[c] = this[g]); return a }; h.sort = function (b, c) { c = void 0 !== c ? c : 1; var a = m.sort; if (!b) return a.apply(this); if ("function" == typeof b) return a.apply(this, arguments); var e = this; b = d(b); "string" == typeof c ? /asc/.test(c) ? c = 1 : /des/.test(c) && (c = -1) : "boolean" == typeof c && (c = c ? 1 : -1); return a.call(this, function (a, d) { a = b(e.get(a)); d = b(e.get(d)); return a < d ? -c : a > d ? c : 0 }) }
    }); g.alias("component-emitter/index.js",
      "array/deps/emitter/index.js"); g.alias("component-emitter/index.js", "emitter/index.js"); g.alias("component-indexof/index.js", "component-emitter/deps/indexof/index.js"); g.alias("component-to-function/index.js", "array/deps/to-function/index.js"); g.alias("component-to-function/index.js", "to-function/index.js"); g.alias("component-props/index.js", "component-to-function/deps/props/index.js"); g.alias("component-props/index.js", "component-to-function/deps/props/index.js"); g.alias("component-props/index.js",
        "component-props/index.js"); g.alias("yields-isArray/index.js", "array/deps/isArray/index.js"); g.alias("yields-isArray/index.js", "isArray/index.js"); "object" == typeof exports ? module.exports = g("array") : "function" == typeof define && define.amd ? define(function () { return g("array") }) : this.array = g("array")
})();