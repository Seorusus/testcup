(function ($, Drupal) {


})(jQuery, Drupal);

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
  return typeof e
} : function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function(e, t) {
  "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function(e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e)
  } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
  function n(e) {
    var t = e.length,
      n = oe.type(e);
    return "function" !== n && !oe.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e))
  }

  function i(e, t, n) {
    if (oe.isFunction(t)) return oe.grep(e, function(e, i) {
      return !!t.call(e, i, e) !== n
    });
    if (t.nodeType) return oe.grep(e, function(e) {
      return e === t !== n
    });
    if ("string" == typeof t) {
      if (pe.test(t)) return oe.filter(t, e, n);
      t = oe.filter(t, e)
    }
    return oe.grep(e, function(e) {
      return oe.inArray(e, t) >= 0 !== n
    })
  }

  function o(e, t) {
    do {
      e = e[t]
    } while (e && 1 !== e.nodeType);
    return e
  }

  function r(e) {
    var t = be[e] = {};
    return oe.each(e.match(ye) || [], function(e, n) {
      t[n] = !0
    }), t
  }

  function s() {
    he.addEventListener ? (he.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1)) : (he.detachEvent("onreadystatechange", a), e.detachEvent("onload", a))
  }

  function a() {
    (he.addEventListener || "load" === event.type || "complete" === he.readyState) && (s(), oe.ready())
  }

  function l(e, t, n) {
    if (void 0 === n && 1 === e.nodeType) {
      var i = "data-" + t.replace(Se, "-$1").toLowerCase();
      if ("string" == typeof(n = e.getAttribute(i))) {
        try {
          n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Te.test(n) ? oe.parseJSON(n) : n)
        } catch (e) {}
        oe.data(e, t, n)
      } else n = void 0
    }
    return n
  }

  function c(e) {
    var t;
    for (t in e)
      if (("data" !== t || !oe.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
    return !0
  }

  function d(e, t, n, i) {
    if (oe.acceptData(e)) {
      var o, r, s = oe.expando,
        a = e.nodeType,
        l = a ? oe.cache : e,
        c = a ? e[s] : e[s] && s;
      if (c && l[c] && (i || l[c].data) || void 0 !== n || "string" != typeof t) return c || (c = a ? e[s] = V.pop() || oe.guid++ : s), l[c] || (l[c] = a ? {} : {
        toJSON: oe.noop
      }), ("object" == (void 0 === t ? "undefined" : _typeof(t)) || "function" == typeof t) && (i ? l[c] = oe.extend(l[c], t) : l[c].data = oe.extend(l[c].data, t)), r = l[c], i || (r.data || (r.data = {}), r = r.data), void 0 !== n && (r[oe.camelCase(t)] = n), "string" == typeof t ? null == (o = r[t]) && (o = r[oe.camelCase(t)]) : o = r, o
    }
  }

  function u(e, t, n) {
    if (oe.acceptData(e)) {
      var i, o, r = e.nodeType,
        s = r ? oe.cache : e,
        a = r ? e[oe.expando] : oe.expando;
      if (s[a]) {
        if (t && (i = n ? s[a] : s[a].data)) {
          oe.isArray(t) ? t = t.concat(oe.map(t, oe.camelCase)) : t in i ? t = [t] : (t = oe.camelCase(t), t = t in i ? [t] : t.split(" ")), o = t.length;
          for (; o--;) delete i[t[o]];
          if (n ? !c(i) : !oe.isEmptyObject(i)) return
        }(n || (delete s[a].data, c(s[a]))) && (r ? oe.cleanData([e], !0) : ne.deleteExpando || s != s.window ? delete s[a] : s[a] = null)
      }
    }
  }

  function p() {
    return !0
  }

  function f() {
    return !1
  }

  function h() {
    try {
      return he.activeElement
    } catch (e) {}
  }

  function v(e) {
    var t = Me.split("|"),
      n = e.createDocumentFragment();
    if (n.createElement)
      for (; t.length;) n.createElement(t.pop());
    return n
  }

  function g(e, t) {
    var n, i, o = 0,
      r = _typeof(e.getElementsByTagName) !== ke ? e.getElementsByTagName(t || "*") : _typeof(e.querySelectorAll) !== ke ? e.querySelectorAll(t || "*") : void 0;
    if (!r)
      for (r = [], n = e.childNodes || e; null != (i = n[o]); o++) !t || oe.nodeName(i, t) ? r.push(i) : oe.merge(r, g(i, t));
    return void 0 === t || t && oe.nodeName(e, t) ? oe.merge([e], r) : r
  }

  function m(e) {
    Ne.test(e.type) && (e.defaultChecked = e.checked)
  }

  function y(e, t) {
    return oe.nodeName(e, "table") && oe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
  }

  function b(e) {
    return e.type = (null !== oe.find.attr(e, "type")) + "/" + e.type, e
  }

  function w(e) {
    var t = Ue.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute("type"), e
  }

  function x(e, t) {
    for (var n, i = 0; null != (n = e[i]); i++) oe._data(n, "globalEval", !t || oe._data(t[i], "globalEval"))
  }

  function k(e, t) {
    if (1 === t.nodeType && oe.hasData(e)) {
      var n, i, o, r = oe._data(e),
        s = oe._data(t, r),
        a = r.events;
      if (a) {
        delete s.handle, s.events = {};
        for (n in a)
          for (i = 0, o = a[n].length; o > i; i++) oe.event.add(t, n, a[n][i])
      }
      s.data && (s.data = oe.extend({}, s.data))
    }
  }

  function T(e, t) {
    var n, i, o;
    if (1 === t.nodeType) {
      if (n = t.nodeName.toLowerCase(), !ne.noCloneEvent && t[oe.expando]) {
        o = oe._data(t);
        for (i in o.events) oe.removeEvent(t, i, o.handle);
        t.removeAttribute(oe.expando)
      }
      "script" === n && t.text !== e.text ? (b(t).text = e.text, w(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ne.html5Clone && e.innerHTML && !oe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ne.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }
  }

  function S(t, n) {
    var i, o = oe(n.createElement(t)).appendTo(n.body),
      r = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(o[0])) ? i.display : oe.css(o[0], "display");
    return o.detach(), r
  }

  function C(e) {
    var t = he,
      n = Ke[e];
    return n || (n = S(e, t), "none" !== n && n || (Qe = (Qe || oe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Qe[0].contentWindow || Qe[0].contentDocument).document, t.write(), t.close(), n = S(e, t), Qe.detach()), Ke[e] = n), n
  }

  function $(e, t) {
    return {
      get: function() {
        var n = e();
        if (null != n) return n ? void delete this.get : (this.get = t).apply(this, arguments)
      }
    }
  }

  function E(e, t) {
    if (t in e) return t;
    for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, o = ut.length; o--;)
      if ((t = ut[o] + n) in e) return t;
    return i
  }

  function A(e, t) {
    for (var n, i, o, r = [], s = 0, a = e.length; a > s; s++) i = e[s], i.style && (r[s] = oe._data(i, "olddisplay"), n = i.style.display, t ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && Ee(i) && (r[s] = oe._data(i, "olddisplay", C(i.nodeName)))) : (o = Ee(i), (n && "none" !== n || !o) && oe._data(i, "olddisplay", o ? n : oe.css(i, "display"))));
    for (s = 0; a > s; s++) i = e[s], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[s] || "" : "none"));
    return e
  }

  function N(e, t, n) {
    var i = at.exec(t);
    return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
  }

  function j(e, t, n, i, o) {
    for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > r; r += 2) "margin" === n && (s += oe.css(e, n + $e[r], !0, o)), i ? ("content" === n && (s -= oe.css(e, "padding" + $e[r], !0, o)), "margin" !== n && (s -= oe.css(e, "border" + $e[r] + "Width", !0, o))) : (s += oe.css(e, "padding" + $e[r], !0, o), "padding" !== n && (s += oe.css(e, "border" + $e[r] + "Width", !0, o)));
    return s
  }

  function L(e, t, n) {
    var i = !0,
      o = "width" === t ? e.offsetWidth : e.offsetHeight,
      r = Ze(e),
      s = ne.boxSizing && "border-box" === oe.css(e, "boxSizing", !1, r);
    if (0 >= o || null == o) {
      if (o = et(e, t, r), (0 > o || null == o) && (o = e.style[t]), nt.test(o)) return o;
      i = s && (ne.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
    }
    return o + j(e, t, n || (s ? "border" : "content"), i, r) + "px"
  }

  function H(e, t, n, i, o) {
    return new H.prototype.init(e, t, n, i, o)
  }

  function D() {
    return setTimeout(function() {
      pt = void 0
    }), pt = oe.now()
  }

  function O(e, t) {
    var n, i = {
        height: e
      },
      o = 0;
    for (t = t ? 1 : 0; 4 > o; o += 2 - t) n = $e[o], i["margin" + n] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e), i
  }

  function M(e, t, n) {
    for (var i, o = (yt[t] || []).concat(yt["*"]), r = 0, s = o.length; s > r; r++)
      if (i = o[r].call(n, t, e)) return i
  }

  function _(e, t, n) {
    var i, o, r, s, a, l, c, d = this,
      u = {},
      p = e.style,
      f = e.nodeType && Ee(e),
      h = oe._data(e, "fxshow");
    n.queue || (a = oe._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
      a.unqueued || l()
    }), a.unqueued++, d.always(function() {
      d.always(function() {
        a.unqueued--, oe.queue(e, "fx").length || a.empty.fire()
      })
    })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], c = oe.css(e, "display"), "inline" === ("none" === c ? oe._data(e, "olddisplay") || C(e.nodeName) : c) && "none" === oe.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== C(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", ne.shrinkWrapBlocks() || d.always(function() {
      p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
    }));
    for (i in t)
      if (o = t[i], ht.exec(o)) {
        if (delete t[i], r = r || "toggle" === o, o === (f ? "hide" : "show")) {
          if ("show" !== o || !h || void 0 === h[i]) continue;
          f = !0
        }
        u[i] = h && h[i] || oe.style(e, i)
      } else c = void 0;
    if (oe.isEmptyObject(u)) "inline" === ("none" === c ? C(e.nodeName) : c) && (p.display = c);
    else {
      h ? "hidden" in h && (f = h.hidden) : h = oe._data(e, "fxshow", {}), r && (h.hidden = !f), f ? oe(e).show() : d.done(function() {
        oe(e).hide()
      }), d.done(function() {
        var t;
        oe._removeData(e, "fxshow");
        for (t in u) oe.style(e, t, u[t])
      });
      for (i in u) s = M(f ? h[i] : 0, i, d), i in h || (h[i] = s.start, f && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
    }
  }

  function P(e, t) {
    var n, i, o, r, s;
    for (n in e)
      if (i = oe.camelCase(n), o = t[i], r = e[n], oe.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (s = oe.cssHooks[i]) && "expand" in s) {
        r = s.expand(r), delete e[i];
        for (n in r) n in e || (e[n] = r[n], t[n] = o)
      } else t[i] = o
  }

  function q(e, t, n) {
    var i, o, r = 0,
      s = mt.length,
      a = oe.Deferred().always(function() {
        delete l.elem
      }),
      l = function() {
        if (o) return !1;
        for (var t = pt || D(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, s = 0, l = c.tweens.length; l > s; s++) c.tweens[s].run(r);
        return a.notifyWith(e, [c, r, n]), 1 > r && l ? n : (a.resolveWith(e, [c]), !1)
      },
      c = a.promise({
        elem: e,
        props: oe.extend({}, t),
        opts: oe.extend(!0, {
          specialEasing: {}
        }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: pt || D(),
        duration: n.duration,
        tweens: [],
        createTween: function(t, n) {
          var i = oe.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
          return c.tweens.push(i), i
        },
        stop: function(t) {
          var n = 0,
            i = t ? c.tweens.length : 0;
          if (o) return this;
          for (o = !0; i > n; n++) c.tweens[n].run(1);
          return t ? a.resolveWith(e, [c, t]) : a.rejectWith(e, [c, t]), this
        }
      }),
      d = c.props;
    for (P(d, c.opts.specialEasing); s > r; r++)
      if (i = mt[r].call(c, e, d, c.opts)) return i;
    return oe.map(d, M, c), oe.isFunction(c.opts.start) && c.opts.start.call(e, c), oe.fx.timer(oe.extend(l, {
      elem: e,
      anim: c,
      queue: c.opts.queue
    })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
  }

  function z(e) {
    return function(t, n) {
      "string" != typeof t && (n = t, t = "*");
      var i, o = 0,
        r = t.toLowerCase().match(ye) || [];
      if (oe.isFunction(n))
        for (; i = r[o++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
    }
  }

  function F(e, t, n, i) {
    function o(a) {
      var l;
      return r[a] = !0, oe.each(e[a] || [], function(e, a) {
        var c = a(t, n, i);
        return "string" != typeof c || s || r[c] ? s ? !(l = c) : void 0 : (t.dataTypes.unshift(c), o(c), !1)
      }), l
    }
    var r = {},
      s = e === It;
    return o(t.dataTypes[0]) || !r["*"] && o("*")
  }

  function W(e, t) {
    var n, i, o = oe.ajaxSettings.flatOptions || {};
    for (i in t) void 0 !== t[i] && ((o[i] ? e : n || (n = {}))[i] = t[i]);
    return n && oe.extend(!0, e, n), e
  }

  function I(e, t, n) {
    for (var i, o, r, s, a = e.contents, l = e.dataTypes;
         "*" === l[0];) l.shift(), void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
    if (o)
      for (s in a)
        if (a[s] && a[s].test(o)) {
          l.unshift(s);
          break
        } if (l[0] in n) r = l[0];
    else {
      for (s in n) {
        if (!l[0] || e.converters[s + " " + l[0]]) {
          r = s;
          break
        }
        i || (i = s)
      }
      r = r || i
    }
    return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
  }

  function B(e, t, n, i) {
    var o, r, s, a, l, c = {},
      d = e.dataTypes.slice();
    if (d[1])
      for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
    for (r = d.shift(); r;)
      if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = d.shift())
        if ("*" === r) r = l;
        else if ("*" !== l && l !== r) {
          if (!(s = c[l + " " + r] || c["* " + r]))
            for (o in c)
              if (a = o.split(" "), a[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], d.unshift(a[1]));
                break
              } if (!0 !== s)
            if (s && e.throws) t = s(t);
            else try {
              t = s(t)
            } catch (e) {
              return {
                state: "parsererror",
                error: s ? e : "No conversion from " + l + " to " + r
              }
            }
        }
    return {
      state: "success",
      data: t
    }
  }

  function R(e, t, n, i) {
    var o;
    if (oe.isArray(t)) oe.each(t, function(t, o) {
      n || Xt.test(e) ? i(e, o) : R(e + "[" + ("object" == (void 0 === o ? "undefined" : _typeof(o)) ? t : "") + "]", o, n, i)
    });
    else if (n || "object" !== oe.type(t)) i(e, t);
    else
      for (o in t) R(e + "[" + o + "]", t[o], n, i)
  }

  function X() {
    try {
      return new e.XMLHttpRequest
    } catch (e) {}
  }

  function U() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP")
    } catch (e) {}
  }

  function Y(e) {
    return oe.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
  }
  var V = [],
    G = V.slice,
    J = V.concat,
    Q = V.push,
    K = V.indexOf,
    Z = {},
    ee = Z.toString,
    te = Z.hasOwnProperty,
    ne = {},
    ie = "1.11.1",
    oe = function e(t, n) {
      return new e.fn.init(t, n)
    },
    re = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    se = /^-ms-/,
    ae = /-([\da-z])/gi,
    le = function(e, t) {
      return t.toUpperCase()
    };
  oe.fn = oe.prototype = {
    jquery: ie,
    constructor: oe,
    selector: "",
    length: 0,
    toArray: function() {
      return G.call(this)
    },
    get: function(e) {
      return null != e ? 0 > e ? this[e + this.length] : this[e] : G.call(this)
    },
    pushStack: function(e) {
      var t = oe.merge(this.constructor(), e);
      return t.prevObject = this, t.context = this.context, t
    },
    each: function(e, t) {
      return oe.each(this, e, t)
    },
    map: function(e) {
      return this.pushStack(oe.map(this, function(t, n) {
        return e.call(t, n, t)
      }))
    },
    slice: function() {
      return this.pushStack(G.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    eq: function(e) {
      var t = this.length,
        n = +e + (0 > e ? t : 0);
      return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
    },
    end: function() {
      return this.prevObject || this.constructor(null)
    },
    push: Q,
    sort: V.sort,
    splice: V.splice
  }, oe.extend = oe.fn.extend = function() {
    var e, t, n, i, o, r, s = arguments[0] || {},
      a = 1,
      l = arguments.length,
      c = !1;
    for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == (void 0 === s ? "undefined" : _typeof(s)) || oe.isFunction(s) || (s = {}), a === l && (s = this, a--); l > a; a++)
      if (null != (o = arguments[a]))
        for (i in o) e = s[i], n = o[i], s !== n && (c && n && (oe.isPlainObject(n) || (t = oe.isArray(n))) ? (t ? (t = !1, r = e && oe.isArray(e) ? e : []) : r = e && oe.isPlainObject(e) ? e : {}, s[i] = oe.extend(c, r, n)) : void 0 !== n && (s[i] = n));
    return s
  }, oe.extend({
    expando: "jQuery" + (ie + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function(e) {
      throw new Error(e)
    },
    noop: function() {},
    isFunction: function(e) {
      return "function" === oe.type(e)
    },
    isArray: Array.isArray || function(e) {
      return "array" === oe.type(e)
    },
    isWindow: function(e) {
      return null != e && e == e.window
    },
    isNumeric: function(e) {
      return !oe.isArray(e) && e - parseFloat(e) >= 0
    },
    isEmptyObject: function(e) {
      var t;
      for (t in e) return !1;
      return !0
    },
    isPlainObject: function(e) {
      var t;
      if (!e || "object" !== oe.type(e) || e.nodeType || oe.isWindow(e)) return !1;
      try {
        if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return !1
      } catch (e) {
        return !1
      }
      if (ne.ownLast)
        for (t in e) return te.call(e, t);
      for (t in e);
      return void 0 === t || te.call(e, t)
    },
    type: function(e) {
      return null == e ? e + "" : "object" == (void 0 === e ? "undefined" : _typeof(e)) || "function" == typeof e ? Z[ee.call(e)] || "object" : void 0 === e ? "undefined" : _typeof(e)
    },
    globalEval: function(t) {
      t && oe.trim(t) && (e.execScript || function(t) {
        e.eval.call(e, t)
      })(t)
    },
    camelCase: function(e) {
      return e.replace(se, "ms-").replace(ae, le)
    },
    nodeName: function(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    },
    each: function(e, t, i) {
      var o = 0,
        r = e.length,
        s = n(e);
      if (i) {
        if (s)
          for (; r > o && !1 !== t.apply(e[o], i); o++);
        else
          for (o in e)
            if (!1 === t.apply(e[o], i)) break
      } else if (s)
        for (; r > o && !1 !== t.call(e[o], o, e[o]); o++);
      else
        for (o in e)
          if (!1 === t.call(e[o], o, e[o])) break;
      return e
    },
    trim: function(e) {
      return null == e ? "" : (e + "").replace(re, "")
    },
    makeArray: function(e, t) {
      var i = t || [];
      return null != e && (n(Object(e)) ? oe.merge(i, "string" == typeof e ? [e] : e) : Q.call(i, e)), i
    },
    inArray: function(e, t, n) {
      var i;
      if (t) {
        if (K) return K.call(t, e, n);
        for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
          if (n in t && t[n] === e) return n
      }
      return -1
    },
    merge: function(e, t) {
      for (var n = +t.length, i = 0, o = e.length; n > i;) e[o++] = t[i++];
      if (n !== n)
        for (; void 0 !== t[i];) e[o++] = t[i++];
      return e.length = o, e
    },
    grep: function(e, t, n) {
      for (var i = [], o = 0, r = e.length, s = !n; r > o; o++) !t(e[o], o) !== s && i.push(e[o]);
      return i
    },
    map: function(e, t, i) {
      var o, r = 0,
        s = e.length,
        a = n(e),
        l = [];
      if (a)
        for (; s > r; r++) null != (o = t(e[r], r, i)) && l.push(o);
      else
        for (r in e) null != (o = t(e[r], r, i)) && l.push(o);
      return J.apply([], l)
    },
    guid: 1,
    proxy: function(e, t) {
      var n, i, o;
      return "string" == typeof t && (o = e[t], t = e, e = o), oe.isFunction(e) ? (n = G.call(arguments, 2), i = function() {
        return e.apply(t || this, n.concat(G.call(arguments)))
      }, i.guid = e.guid = e.guid || oe.guid++, i) : void 0
    },
    now: function() {
      return +new Date
    },
    support: ne
  }), oe.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
    Z["[object " + t + "]"] = t.toLowerCase()
  });
  var ce = function(e) {
    function t(e, t, n, i) {
      var o, r, s, a, c, u, p, f, h, v;
      if ((t ? t.ownerDocument || t : q) !== j && N(t), t = t || j, n = n || [], !e || "string" != typeof e) return n;
      if (1 !== (a = t.nodeType) && 9 !== a) return [];
      if (H && !i) {
        if (o = ge.exec(e))
          if (s = o[1]) {
            if (9 === a) {
              if (!(r = t.getElementById(s)) || !r.parentNode) return n;
              if (r.id === s) return n.push(r), n
            } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(s)) && _(t, r) && r.id === s) return n.push(r), n
          } else {
            if (o[2]) return Q.apply(n, t.getElementsByTagName(e)), n;
            if ((s = o[3]) && b.getElementsByClassName && t.getElementsByClassName) return Q.apply(n, t.getElementsByClassName(s)), n
          } if (b.qsa && (!D || !D.test(e))) {
          if (f = p = P, h = t, v = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
            for (u = T(e), (p = t.getAttribute("id")) ? f = p.replace(ye, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", c = u.length; c--;) u[c] = f + d(u[c]);
            h = me.test(e) && l(t.parentNode) || t, v = u.join(",")
          }
          if (v) try {
            return Q.apply(n, h.querySelectorAll(v)), n
          } catch (e) {} finally {
            p || t.removeAttribute("id")
          }
        }
      }
      return C(e.replace(se, "$1"), t, n, i)
    }

    function n() {
      function e(n, i) {
        return t.push(n + " ") > w.cacheLength && delete e[t.shift()], e[n + " "] = i
      }
      var t = [];
      return e
    }

    function i(e) {
      return e[P] = !0, e
    }

    function o(e) {
      var t = j.createElement("div");
      try {
        return !!e(t)
      } catch (e) {
        return !1
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null
      }
    }

    function r(e, t) {
      for (var n = e.split("|"), i = e.length; i--;) w.attrHandle[n[i]] = t
    }

    function s(e, t) {
      var n = t && e,
        i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || U) - (~e.sourceIndex || U);
      if (i) return i;
      if (n)
        for (; n = n.nextSibling;)
          if (n === t) return -1;
      return e ? 1 : -1
    }

    function a(e) {
      return i(function(t) {
        return t = +t, i(function(n, i) {
          for (var o, r = e([], n.length, t), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
        })
      })
    }

    function l(e) {
      return e && _typeof(e.getElementsByTagName) !== X && e
    }

    function c() {}

    function d(e) {
      for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
      return i
    }

    function u(e, t, n) {
      var i = t.dir,
        o = n && "parentNode" === i,
        r = F++;
      return t.first ? function(t, n, r) {
        for (; t = t[i];)
          if (1 === t.nodeType || o) return e(t, n, r)
      } : function(t, n, s) {
        var a, l, c = [z, r];
        if (s) {
          for (; t = t[i];)
            if ((1 === t.nodeType || o) && e(t, n, s)) return !0
        } else
          for (; t = t[i];)
            if (1 === t.nodeType || o) {
              if (l = t[P] || (t[P] = {}), (a = l[i]) && a[0] === z && a[1] === r) return c[2] = a[2];
              if (l[i] = c, c[2] = e(t, n, s)) return !0
            }
      }
    }

    function p(e) {
      return e.length > 1 ? function(t, n, i) {
        for (var o = e.length; o--;)
          if (!e[o](t, n, i)) return !1;
        return !0
      } : e[0]
    }

    function f(e, n, i) {
      for (var o = 0, r = n.length; r > o; o++) t(e, n[o], i);
      return i
    }

    function h(e, t, n, i, o) {
      for (var r, s = [], a = 0, l = e.length, c = null != t; l > a; a++)(r = e[a]) && (!n || n(r, i, o)) && (s.push(r), c && t.push(a));
      return s
    }

    function v(e, t, n, o, r, s) {
      return o && !o[P] && (o = v(o)), r && !r[P] && (r = v(r, s)), i(function(i, s, a, l) {
        var c, d, u, p = [],
          v = [],
          g = s.length,
          m = i || f(t || "*", a.nodeType ? [a] : a, []),
          y = !e || !i && t ? m : h(m, p, e, a, l),
          b = n ? r || (i ? e : g || o) ? [] : s : y;
        if (n && n(y, b, a, l), o)
          for (c = h(b, v), o(c, [], a, l), d = c.length; d--;)(u = c[d]) && (b[v[d]] = !(y[v[d]] = u));
        if (i) {
          if (r || e) {
            if (r) {
              for (c = [], d = b.length; d--;)(u = b[d]) && c.push(y[d] = u);
              r(null, b = [], c, l)
            }
            for (d = b.length; d--;)(u = b[d]) && (c = r ? Z.call(i, u) : p[d]) > -1 && (i[c] = !(s[c] = u))
          }
        } else b = h(b === s ? b.splice(g, b.length) : b), r ? r(null, s, b, l) : Q.apply(s, b)
      })
    }

    function g(e) {
      for (var t, n, i, o = e.length, r = w.relative[e[0].type], s = r || w.relative[" "], a = r ? 1 : 0, l = u(function(e) {
        return e === t
      }, s, !0), c = u(function(e) {
        return Z.call(t, e) > -1
      }, s, !0), f = [function(e, n, i) {
        return !r && (i || n !== $) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i))
      }]; o > a; a++)
        if (n = w.relative[e[a].type]) f = [u(p(f), n)];
        else {
          if (n = w.filter[e[a].type].apply(null, e[a].matches), n[P]) {
            for (i = ++a; o > i && !w.relative[e[i].type]; i++);
            return v(a > 1 && p(f), a > 1 && d(e.slice(0, a - 1).concat({
              value: " " === e[a - 2].type ? "*" : ""
            })).replace(se, "$1"), n, i > a && g(e.slice(a, i)), o > i && g(e = e.slice(i)), o > i && d(e))
          }
          f.push(n)
        } return p(f)
    }

    function m(e, n) {
      var o = n.length > 0,
        r = e.length > 0,
        s = function(i, s, a, l, c) {
          var d, u, p, f = 0,
            v = "0",
            g = i && [],
            m = [],
            y = $,
            b = i || r && w.find.TAG("*", c),
            x = z += null == y ? 1 : Math.random() || .1,
            k = b.length;
          for (c && ($ = s !== j && s); v !== k && null != (d = b[v]); v++) {
            if (r && d) {
              for (u = 0; p = e[u++];)
                if (p(d, s, a)) {
                  l.push(d);
                  break
                } c && (z = x)
            }
            o && ((d = !p && d) && f--, i && g.push(d))
          }
          if (f += v, o && v !== f) {
            for (u = 0; p = n[u++];) p(g, m, s, a);
            if (i) {
              if (f > 0)
                for (; v--;) g[v] || m[v] || (m[v] = G.call(l));
              m = h(m)
            }
            Q.apply(l, m), c && !i && m.length > 0 && f + n.length > 1 && t.uniqueSort(l)
          }
          return c && (z = x, $ = y), g
        };
      return o ? i(s) : s
    }
    var y, b, w, x, k, T, S, C, $, E, A, N, j, L, H, D, O, M, _, P = "sizzle" + -new Date,
      q = e.document,
      z = 0,
      F = 0,
      W = n(),
      I = n(),
      B = n(),
      R = function(e, t) {
        return e === t && (A = !0), 0
      },
      X = "undefined",
      U = 1 << 31,
      Y = {}.hasOwnProperty,
      V = [],
      G = V.pop,
      J = V.push,
      Q = V.push,
      K = V.slice,
      Z = V.indexOf || function(e) {
        for (var t = 0, n = this.length; n > t; t++)
          if (this[t] === e) return t;
        return -1
      },
      ee = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      te = "[\\x20\\t\\r\\n\\f]",
      ne = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      ie = ne.replace("w", "w#"),
      oe = "\\[" + te + "*(" + ne + ")(?:" + te + "*([*^$|!~]?=)" + te + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + te + "*\\]",
      re = ":(" + ne + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
      se = new RegExp("^" + te + "+|((?:^|[^\\\\])(?:\\\\.)*)" + te + "+$", "g"),
      ae = new RegExp("^" + te + "*," + te + "*"),
      le = new RegExp("^" + te + "*([>+~]|" + te + ")" + te + "*"),
      ce = new RegExp("=" + te + "*([^\\]'\"]*?)" + te + "*\\]", "g"),
      de = new RegExp(re),
      ue = new RegExp("^" + ie + "$"),
      pe = {
        ID: new RegExp("^#(" + ne + ")"),
        CLASS: new RegExp("^\\.(" + ne + ")"),
        TAG: new RegExp("^(" + ne.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + oe),
        PSEUDO: new RegExp("^" + re),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + te + "*(even|odd|(([+-]|)(\\d*)n|)" + te + "*(?:([+-]|)" + te + "*(\\d+)|))" + te + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + ee + ")$", "i"),
        needsContext: new RegExp("^" + te + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + te + "*((?:-\\d)?\\d*)" + te + "*\\)|)(?=[^-]|$)", "i")
      },
      fe = /^(?:input|select|textarea|button)$/i,
      he = /^h\d$/i,
      ve = /^[^{]+\{\s*\[native \w/,
      ge = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      me = /[+~]/,
      ye = /'|\\/g,
      be = new RegExp("\\\\([\\da-f]{1,6}" + te + "?|(" + te + ")|.)", "ig"),
      we = function(e, t, n) {
        var i = "0x" + t - 65536;
        return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
      };
    try {
      Q.apply(V = K.call(q.childNodes), q.childNodes), V[q.childNodes.length].nodeType
    } catch (e) {
      Q = {
        apply: V.length ? function(e, t) {
          J.apply(e, K.call(t))
        } : function(e, t) {
          for (var n = e.length, i = 0; e[n++] = t[i++];);
          e.length = n - 1
        }
      }
    }
    b = t.support = {}, k = t.isXML = function(e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return !!t && "HTML" !== t.nodeName
    }, N = t.setDocument = function(e) {
      var t, n = e ? e.ownerDocument || e : q,
        i = n.defaultView;
      return n !== j && 9 === n.nodeType && n.documentElement ? (j = n, L = n.documentElement, H = !k(n), i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", function() {
        N()
      }, !1) : i.attachEvent && i.attachEvent("onunload", function() {
        N()
      })), b.attributes = o(function(e) {
        return e.className = "i", !e.getAttribute("className")
      }), b.getElementsByTagName = o(function(e) {
        return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
      }), b.getElementsByClassName = ve.test(n.getElementsByClassName) && o(function(e) {
        return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
      }), b.getById = o(function(e) {
        return L.appendChild(e).id = P, !n.getElementsByName || !n.getElementsByName(P).length
      }), b.getById ? (w.find.ID = function(e, t) {
        if (_typeof(t.getElementById) !== X && H) {
          var n = t.getElementById(e);
          return n && n.parentNode ? [n] : []
        }
      }, w.filter.ID = function(e) {
        var t = e.replace(be, we);
        return function(e) {
          return e.getAttribute("id") === t
        }
      }) : (delete w.find.ID, w.filter.ID = function(e) {
        var t = e.replace(be, we);
        return function(e) {
          var n = _typeof(e.getAttributeNode) !== X && e.getAttributeNode("id");
          return n && n.value === t
        }
      }), w.find.TAG = b.getElementsByTagName ? function(e, t) {
        return _typeof(t.getElementsByTagName) !== X ? t.getElementsByTagName(e) : void 0
      } : function(e, t) {
        var n, i = [],
          o = 0,
          r = t.getElementsByTagName(e);
        if ("*" === e) {
          for (; n = r[o++];) 1 === n.nodeType && i.push(n);
          return i
        }
        return r
      }, w.find.CLASS = b.getElementsByClassName && function(e, t) {
        return _typeof(t.getElementsByClassName) !== X && H ? t.getElementsByClassName(e) : void 0
      }, O = [], D = [], (b.qsa = ve.test(n.querySelectorAll)) && (o(function(e) {
        e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && D.push("[*^$]=" + te + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || D.push("\\[" + te + "*(?:value|" + ee + ")"), e.querySelectorAll(":checked").length || D.push(":checked")
      }), o(function(e) {
        var t = n.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && D.push("name" + te + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || D.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), D.push(",.*:")
      })), (b.matchesSelector = ve.test(M = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && o(function(e) {
        b.disconnectedMatch = M.call(e, "div"), M.call(e, "[s!='']:x"), O.push("!=", re)
      }), D = D.length && new RegExp(D.join("|")), O = O.length && new RegExp(O.join("|")), t = ve.test(L.compareDocumentPosition), _ = t || ve.test(L.contains) ? function(e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e,
          i = t && t.parentNode;
        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
      } : function(e, t) {
        if (t)
          for (; t = t.parentNode;)
            if (t === e) return !0;
        return !1
      }, R = t ? function(e, t) {
        if (e === t) return A = !0, 0;
        var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return i || (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & i || !b.sortDetached && t.compareDocumentPosition(e) === i ? e === n || e.ownerDocument === q && _(q, e) ? -1 : t === n || t.ownerDocument === q && _(q, t) ? 1 : E ? Z.call(E, e) - Z.call(E, t) : 0 : 4 & i ? -1 : 1)
      } : function(e, t) {
        if (e === t) return A = !0, 0;
        var i, o = 0,
          r = e.parentNode,
          a = t.parentNode,
          l = [e],
          c = [t];
        if (!r || !a) return e === n ? -1 : t === n ? 1 : r ? -1 : a ? 1 : E ? Z.call(E, e) - Z.call(E, t) : 0;
        if (r === a) return s(e, t);
        for (i = e; i = i.parentNode;) l.unshift(i);
        for (i = t; i = i.parentNode;) c.unshift(i);
        for (; l[o] === c[o];) o++;
        return o ? s(l[o], c[o]) : l[o] === q ? -1 : c[o] === q ? 1 : 0
      }, n) : j
    }, t.matches = function(e, n) {
      return t(e, null, null, n)
    }, t.matchesSelector = function(e, n) {
      if ((e.ownerDocument || e) !== j && N(e), n = n.replace(ce, "='$1']"), !(!b.matchesSelector || !H || O && O.test(n) || D && D.test(n))) try {
        var i = M.call(e, n);
        if (i || b.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
      } catch (e) {}
      return t(n, j, null, [e]).length > 0
    }, t.contains = function(e, t) {
      return (e.ownerDocument || e) !== j && N(e), _(e, t)
    }, t.attr = function(e, t) {
      (e.ownerDocument || e) !== j && N(e);
      var n = w.attrHandle[t.toLowerCase()],
        i = n && Y.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !H) : void 0;
      return void 0 !== i ? i : b.attributes || !H ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
    }, t.error = function(e) {
      throw new Error("Syntax error, unrecognized expression: " + e)
    }, t.uniqueSort = function(e) {
      var t, n = [],
        i = 0,
        o = 0;
      if (A = !b.detectDuplicates, E = !b.sortStable && e.slice(0), e.sort(R), A) {
        for (; t = e[o++];) t === e[o] && (i = n.push(o));
        for (; i--;) e.splice(n[i], 1)
      }
      return E = null, e
    }, x = t.getText = function(e) {
      var t, n = "",
        i = 0,
        o = e.nodeType;
      if (o) {
        if (1 === o || 9 === o || 11 === o) {
          if ("string" == typeof e.textContent) return e.textContent;
          for (e = e.firstChild; e; e = e.nextSibling) n += x(e)
        } else if (3 === o || 4 === o) return e.nodeValue
      } else
        for (; t = e[i++];) n += x(t);
      return n
    }, w = t.selectors = {
      cacheLength: 50,
      createPseudo: i,
      match: pe,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function(e) {
          return e[1] = e[1].replace(be, we), e[3] = (e[3] || e[4] || e[5] || "").replace(be, we), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        },
        CHILD: function(e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
        },
        PSEUDO: function(e) {
          var t, n = !e[6] && e[2];
          return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
        }
      },
      filter: {
        TAG: function(e) {
          var t = e.replace(be, we).toLowerCase();
          return "*" === e ? function() {
            return !0
          } : function(e) {
            return e.nodeName && e.nodeName.toLowerCase() === t
          }
        },
        CLASS: function(e) {
          var t = W[e + " "];
          return t || (t = new RegExp("(^|" + te + ")" + e + "(" + te + "|$)")) && W(e, function(e) {
            return t.test("string" == typeof e.className && e.className || _typeof(e.getAttribute) !== X && e.getAttribute("class") || "")
          })
        },
        ATTR: function(e, n, i) {
          return function(o) {
            var r = t.attr(o, e);
            return null == r ? "!=" === n : !n || (r += "", "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r + " ").indexOf(i) > -1 : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"))
          }
        },
        CHILD: function(e, t, n, i, o) {
          var r = "nth" !== e.slice(0, 3),
            s = "last" !== e.slice(-4),
            a = "of-type" === t;
          return 1 === i && 0 === o ? function(e) {
            return !!e.parentNode
          } : function(t, n, l) {
            var c, d, u, p, f, h, v = r !== s ? "nextSibling" : "previousSibling",
              g = t.parentNode,
              m = a && t.nodeName.toLowerCase(),
              y = !l && !a;
            if (g) {
              if (r) {
                for (; v;) {
                  for (u = t; u = u[v];)
                    if (a ? u.nodeName.toLowerCase() === m : 1 === u.nodeType) return !1;
                  h = v = "only" === e && !h && "nextSibling"
                }
                return !0
              }
              if (h = [s ? g.firstChild : g.lastChild], s && y) {
                for (d = g[P] || (g[P] = {}), c = d[e] || [], f = c[0] === z && c[1], p = c[0] === z && c[2], u = f && g.childNodes[f]; u = ++f && u && u[v] || (p = f = 0) || h.pop();)
                  if (1 === u.nodeType && ++p && u === t) {
                    d[e] = [z, f, p];
                    break
                  }
              } else if (y && (c = (t[P] || (t[P] = {}))[e]) && c[0] === z) p = c[1];
              else
                for (;
                  (u = ++f && u && u[v] || (p = f = 0) || h.pop()) && ((a ? u.nodeName.toLowerCase() !== m : 1 !== u.nodeType) || !++p || (y && ((u[P] || (u[P] = {}))[e] = [z, p]), u !== t)););
              return (p -= o) === i || p % i == 0 && p / i >= 0
            }
          }
        },
        PSEUDO: function(e, n) {
          var o, r = w.pseudos[e] || w.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
          return r[P] ? r(n) : r.length > 1 ? (o = [e, e, "", n], w.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
            for (var i, o = r(e, n), s = o.length; s--;) i = Z.call(e, o[s]), e[i] = !(t[i] = o[s])
          }) : function(e) {
            return r(e, 0, o)
          }) : r
        }
      },
      pseudos: {
        not: i(function(e) {
          var t = [],
            n = [],
            o = S(e.replace(se, "$1"));
          return o[P] ? i(function(e, t, n, i) {
            for (var r, s = o(e, null, i, []), a = e.length; a--;)(r = s[a]) && (e[a] = !(t[a] = r))
          }) : function(e, i, r) {
            return t[0] = e, o(t, null, r, n), !n.pop()
          }
        }),
        has: i(function(e) {
          return function(n) {
            return t(e, n).length > 0
          }
        }),
        contains: i(function(e) {
          return function(t) {
            return (t.textContent || t.innerText || x(t)).indexOf(e) > -1
          }
        }),
        lang: i(function(e) {
          return ue.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, we).toLowerCase(),
            function(t) {
              var n;
              do {
                if (n = H ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
              } while ((t = t.parentNode) && 1 === t.nodeType);
              return !1
            }
        }),
        target: function(t) {
          var n = e.location && e.location.hash;
          return n && n.slice(1) === t.id
        },
        root: function(e) {
          return e === L
        },
        focus: function(e) {
          return e === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        },
        enabled: function(e) {
          return !1 === e.disabled
        },
        disabled: function(e) {
          return !0 === e.disabled
        },
        checked: function(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected
        },
        selected: function(e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
        },
        empty: function(e) {
          for (e = e.firstChild; e; e = e.nextSibling)
            if (e.nodeType < 6) return !1;
          return !0
        },
        parent: function(e) {
          return !w.pseudos.empty(e)
        },
        header: function(e) {
          return he.test(e.nodeName)
        },
        input: function(e) {
          return fe.test(e.nodeName)
        },
        button: function(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t
        },
        text: function(e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
        },
        first: a(function() {
          return [0]
        }),
        last: a(function(e, t) {
          return [t - 1]
        }),
        eq: a(function(e, t, n) {
          return [0 > n ? n + t : n]
        }),
        even: a(function(e, t) {
          for (var n = 0; t > n; n += 2) e.push(n);
          return e
        }),
        odd: a(function(e, t) {
          for (var n = 1; t > n; n += 2) e.push(n);
          return e
        }),
        lt: a(function(e, t, n) {
          for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
          return e
        }),
        gt: a(function(e, t, n) {
          for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
          return e
        })
      }
    }, w.pseudos.nth = w.pseudos.eq;
    for (y in {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) w.pseudos[y] = function(e) {
      return function(t) {
        return "input" === t.nodeName.toLowerCase() && t.type === e
      }
    }(y);
    for (y in {
      submit: !0,
      reset: !0
    }) w.pseudos[y] = function(e) {
      return function(t) {
        var n = t.nodeName.toLowerCase();
        return ("input" === n || "button" === n) && t.type === e
      }
    }(y);
    return c.prototype = w.filters = w.pseudos, w.setFilters = new c, T = t.tokenize = function(e, n) {
      var i, o, r, s, a, l, c, d = I[e + " "];
      if (d) return n ? 0 : d.slice(0);
      for (a = e, l = [], c = w.preFilter; a;) {
        (!i || (o = ae.exec(a))) && (o && (a = a.slice(o[0].length) || a), l.push(r = [])), i = !1, (o = le.exec(a)) && (i = o.shift(), r.push({
          value: i,
          type: o[0].replace(se, " ")
        }), a = a.slice(i.length));
        for (s in w.filter) !(o = pe[s].exec(a)) || c[s] && !(o = c[s](o)) || (i = o.shift(), r.push({
          value: i,
          type: s,
          matches: o
        }), a = a.slice(i.length));
        if (!i) break
      }
      return n ? a.length : a ? t.error(e) : I(e, l).slice(0)
    }, S = t.compile = function(e, t) {
      var n, i = [],
        o = [],
        r = B[e + " "];
      if (!r) {
        for (t || (t = T(e)), n = t.length; n--;) r = g(t[n]), r[P] ? i.push(r) : o.push(r);
        r = B(e, m(o, i)), r.selector = e
      }
      return r
    }, C = t.select = function(e, t, n, i) {
      var o, r, s, a, c, u = "function" == typeof e && e,
        p = !i && T(e = u.selector || e);
      if (n = n || [], 1 === p.length) {
        if (r = p[0] = p[0].slice(0), r.length > 2 && "ID" === (s = r[0]).type && b.getById && 9 === t.nodeType && H && w.relative[r[1].type]) {
          if (!(t = (w.find.ID(s.matches[0].replace(be, we), t) || [])[0])) return n;
          u && (t = t.parentNode), e = e.slice(r.shift().value.length)
        }
        for (o = pe.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !w.relative[a = s.type]);)
          if ((c = w.find[a]) && (i = c(s.matches[0].replace(be, we), me.test(r[0].type) && l(t.parentNode) || t))) {
            if (r.splice(o, 1), !(e = i.length && d(r))) return Q.apply(n, i), n;
            break
          }
      }
      return (u || S(e, p))(i, t, !H, n, me.test(e) && l(t.parentNode) || t), n
    }, b.sortStable = P.split("").sort(R).join("") === P, b.detectDuplicates = !!A, N(), b.sortDetached = o(function(e) {
      return 1 & e.compareDocumentPosition(j.createElement("div"))
    }), o(function(e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
    }) || r("type|href|height|width", function(e, t, n) {
      return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
    }), b.attributes && o(function(e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
    }) || r("value", function(e, t, n) {
      return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
    }), o(function(e) {
      return null == e.getAttribute("disabled")
    }) || r(ee, function(e, t, n) {
      var i;
      return n ? void 0 : !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
    }), t
  }(e);
  oe.find = ce, oe.expr = ce.selectors, oe.expr[":"] = oe.expr.pseudos, oe.unique = ce.uniqueSort, oe.text = ce.getText, oe.isXMLDoc = ce.isXML, oe.contains = ce.contains;
  var de = oe.expr.match.needsContext,
    ue = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    pe = /^.[^:#\[\.,]*$/;
  oe.filter = function(e, t, n) {
    var i = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? oe.find.matchesSelector(i, e) ? [i] : [] : oe.find.matches(e, oe.grep(t, function(e) {
      return 1 === e.nodeType
    }))
  }, oe.fn.extend({
    find: function(e) {
      var t, n = [],
        i = this,
        o = i.length;
      if ("string" != typeof e) return this.pushStack(oe(e).filter(function() {
        for (t = 0; o > t; t++)
          if (oe.contains(i[t], this)) return !0
      }));
      for (t = 0; o > t; t++) oe.find(e, i[t], n);
      return n = this.pushStack(o > 1 ? oe.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
    },
    filter: function(e) {
      return this.pushStack(i(this, e || [], !1))
    },
    not: function(e) {
      return this.pushStack(i(this, e || [], !0))
    },
    is: function(e) {
      return !!i(this, "string" == typeof e && de.test(e) ? oe(e) : e || [], !1).length
    }
  });
  var fe, he = e.document,
    ve = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  (oe.fn.init = function(e, t) {
    var n, i;
    if (!e) return this;
    if ("string" == typeof e) {
      if (!(n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ve.exec(e)) || !n[1] && t) return !t || t.jquery ? (t || fe).find(e) : this.constructor(t).find(e);
      if (n[1]) {
        if (t = t instanceof oe ? t[0] : t, oe.merge(this, oe.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : he, !0)), ue.test(n[1]) && oe.isPlainObject(t))
          for (n in t) oe.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
        return this
      }
      if ((i = he.getElementById(n[2])) && i.parentNode) {
        if (i.id !== n[2]) return fe.find(e);
        this.length = 1, this[0] = i
      }
      return this.context = he, this.selector = e, this
    }
    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : oe.isFunction(e) ? void 0 !== fe.ready ? fe.ready(e) : e(oe) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), oe.makeArray(e, this))
  }).prototype = oe.fn, fe = oe(he);
  var ge = /^(?:parents|prev(?:Until|All))/,
    me = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  oe.extend({
    dir: function(e, t, n) {
      for (var i = [], o = e[t]; o && 9 !== o.nodeType && (void 0 === n || 1 !== o.nodeType || !oe(o).is(n));) 1 === o.nodeType && i.push(o), o = o[t];
      return i
    },
    sibling: function(e, t) {
      for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
      return n
    }
  }), oe.fn.extend({
    has: function(e) {
      var t, n = oe(e, this),
        i = n.length;
      return this.filter(function() {
        for (t = 0; i > t; t++)
          if (oe.contains(this, n[t])) return !0
      })
    },
    closest: function(e, t) {
      for (var n, i = 0, o = this.length, r = [], s = de.test(e) || "string" != typeof e ? oe(e, t || this.context) : 0; o > i; i++)
        for (n = this[i]; n && n !== t; n = n.parentNode)
          if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && oe.find.matchesSelector(n, e))) {
            r.push(n);
            break
          } return this.pushStack(r.length > 1 ? oe.unique(r) : r)
    },
    index: function(e) {
      return e ? "string" == typeof e ? oe.inArray(this[0], oe(e)) : oe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(e, t) {
      return this.pushStack(oe.unique(oe.merge(this.get(), oe(e, t))))
    },
    addBack: function(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
  }), oe.each({
    parent: function(e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    },
    parents: function(e) {
      return oe.dir(e, "parentNode")
    },
    parentsUntil: function(e, t, n) {
      return oe.dir(e, "parentNode", n)
    },
    next: function(e) {
      return o(e, "nextSibling")
    },
    prev: function(e) {
      return o(e, "previousSibling")
    },
    nextAll: function(e) {
      return oe.dir(e, "nextSibling")
    },
    prevAll: function(e) {
      return oe.dir(e, "previousSibling")
    },
    nextUntil: function(e, t, n) {
      return oe.dir(e, "nextSibling", n)
    },
    prevUntil: function(e, t, n) {
      return oe.dir(e, "previousSibling", n)
    },
    siblings: function(e) {
      return oe.sibling((e.parentNode || {}).firstChild, e)
    },
    children: function(e) {
      return oe.sibling(e.firstChild)
    },
    contents: function(e) {
      return oe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : oe.merge([], e.childNodes)
    }
  }, function(e, t) {
    oe.fn[e] = function(n, i) {
      var o = oe.map(this, t, n);
      return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = oe.filter(i, o)), this.length > 1 && (me[e] || (o = oe.unique(o)), ge.test(e) && (o = o.reverse())), this.pushStack(o)
    }
  });
  var ye = /\S+/g,
    be = {};
  oe.Callbacks = function(e) {
    e = "string" == typeof e ? be[e] || r(e) : oe.extend({}, e);
    var t, n, i, o, s, a, l = [],
      c = !e.once && [],
      d = function r(d) {
        for (n = e.memory && d, i = !0, s = a || 0, a = 0, o = l.length, t = !0; l && o > s; s++)
          if (!1 === l[s].apply(d[0], d[1]) && e.stopOnFalse) {
            n = !1;
            break
          } t = !1, l && (c ? c.length && r(c.shift()) : n ? l = [] : u.disable())
      },
      u = {
        add: function() {
          if (l) {
            var i = l.length;
            ! function t(n) {
              oe.each(n, function(n, i) {
                var o = oe.type(i);
                "function" === o ? e.unique && u.has(i) || l.push(i) : i && i.length && "string" !== o && t(i)
              })
            }(arguments), t ? o = l.length : n && (a = i, d(n))
          }
          return this
        },
        remove: function() {
          return l && oe.each(arguments, function(e, n) {
            for (var i;
                 (i = oe.inArray(n, l, i)) > -1;) l.splice(i, 1), t && (o >= i && o--, s >= i && s--)
          }), this
        },
        has: function(e) {
          return e ? oe.inArray(e, l) > -1 : !(!l || !l.length)
        },
        empty: function() {
          return l = [], o = 0, this
        },
        disable: function() {
          return l = c = n = void 0, this
        },
        disabled: function() {
          return !l
        },
        lock: function() {
          return c = void 0, n || u.disable(), this
        },
        locked: function() {
          return !c
        },
        fireWith: function(e, n) {
          return !l || i && !c || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? c.push(n) : d(n)), this
        },
        fire: function() {
          return u.fireWith(this, arguments), this
        },
        fired: function() {
          return !!i
        }
      };
    return u
  }, oe.extend({
    Deferred: function(e) {
      var t = [
          ["resolve", "done", oe.Callbacks("once memory"), "resolved"],
          ["reject", "fail", oe.Callbacks("once memory"), "rejected"],
          ["notify", "progress", oe.Callbacks("memory")]
        ],
        n = "pending",
        i = {
          state: function() {
            return n
          },
          always: function() {
            return o.done(arguments).fail(arguments), this
          },
          then: function() {
            var e = arguments;
            return oe.Deferred(function(n) {
              oe.each(t, function(t, r) {
                var s = oe.isFunction(e[t]) && e[t];
                o[r[1]](function() {
                  var e = s && s.apply(this, arguments);
                  e && oe.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[r[0] + "With"](this === i ? n.promise() : this, s ? [e] : arguments)
                })
              }), e = null
            }).promise()
          },
          promise: function(e) {
            return null != e ? oe.extend(e, i) : i
          }
        },
        o = {};
      return i.pipe = i.then, oe.each(t, function(e, r) {
        var s = r[2],
          a = r[3];
        i[r[1]] = s.add, a && s.add(function() {
          n = a
        }, t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function() {
          return o[r[0] + "With"](this === o ? i : this, arguments), this
        }, o[r[0] + "With"] = s.fireWith
      }), i.promise(o), e && e.call(o, o), o
    },
    when: function(e) {
      var t, n, i, o = 0,
        r = G.call(arguments),
        s = r.length,
        a = 1 !== s || e && oe.isFunction(e.promise) ? s : 0,
        l = 1 === a ? e : oe.Deferred(),
        c = function(e, n, i) {
          return function(o) {
            n[e] = this, i[e] = arguments.length > 1 ? G.call(arguments) : o, i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
          }
        };
      if (s > 1)
        for (t = new Array(s), n = new Array(s), i = new Array(s); s > o; o++) r[o] && oe.isFunction(r[o].promise) ? r[o].promise().done(c(o, i, r)).fail(l.reject).progress(c(o, n, t)) : --a;
      return a || l.resolveWith(i, r), l.promise()
    }
  });
  var we;
  oe.fn.ready = function(e) {
    return oe.ready.promise().done(e), this
  }, oe.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function(e) {
      e ? oe.readyWait++ : oe.ready(!0)
    },
    ready: function(e) {
      if (!0 === e ? !--oe.readyWait : !oe.isReady) {
        if (!he.body) return setTimeout(oe.ready);
        oe.isReady = !0, !0 !== e && --oe.readyWait > 0 || (we.resolveWith(he, [oe]), oe.fn.triggerHandler && (oe(he).triggerHandler("ready"), oe(he).off("ready")))
      }
    }
  }), oe.ready.promise = function(t) {
    if (!we)
      if (we = oe.Deferred(), "complete" === he.readyState) setTimeout(oe.ready);
      else if (he.addEventListener) he.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1);
      else {
        he.attachEvent("onreadystatechange", a), e.attachEvent("onload", a);
        var n = !1;
        try {
          n = null == e.frameElement && he.documentElement
        } catch (e) {}
        n && n.doScroll && function e() {
          if (!oe.isReady) {
            try {
              n.doScroll("left")
            } catch (t) {
              return setTimeout(e, 50)
            }
            s(), oe.ready()
          }
        }()
      }
    return we.promise(t)
  };
  var xe, ke = "undefined";
  for (xe in oe(ne)) break;
  ne.ownLast = "0" !== xe, ne.inlineBlockNeedsLayout = !1, oe(function() {
    var e, t, n, i;
    (n = he.getElementsByTagName("body")[0]) && n.style && (t = he.createElement("div"), i = he.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), _typeof(t.style.zoom) !== ke && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
  }),
    function() {
      var e = he.createElement("div");
      if (null == ne.deleteExpando) {
        ne.deleteExpando = !0;
        try {
          delete e.test
        } catch (e) {
          ne.deleteExpando = !1
        }
      }
      e = null
    }(), oe.acceptData = function(e) {
    var t = oe.noData[(e.nodeName + " ").toLowerCase()],
      n = +e.nodeType || 1;
    return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute("classid") === t)
  };
  var Te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Se = /([A-Z])/g;
  oe.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    hasData: function(e) {
      return !!(e = e.nodeType ? oe.cache[e[oe.expando]] : e[oe.expando]) && !c(e)
    },
    data: function(e, t, n) {
      return d(e, t, n)
    },
    removeData: function(e, t) {
      return u(e, t)
    },
    _data: function(e, t, n) {
      return d(e, t, n, !0)
    },
    _removeData: function(e, t) {
      return u(e, t, !0)
    }
  }), oe.fn.extend({
    data: function(e, t) {
      var n, i, o, r = this[0],
        s = r && r.attributes;
      if (void 0 === e) {
        if (this.length && (o = oe.data(r), 1 === r.nodeType && !oe._data(r, "parsedAttrs"))) {
          for (n = s.length; n--;) s[n] && (i = s[n].name, 0 === i.indexOf("data-") && (i = oe.camelCase(i.slice(5)), l(r, i, o[i])));
          oe._data(r, "parsedAttrs", !0)
        }
        return o
      }
      return "object" == (void 0 === e ? "undefined" : _typeof(e)) ? this.each(function() {
        oe.data(this, e)
      }) : arguments.length > 1 ? this.each(function() {
        oe.data(this, e, t)
      }) : r ? l(r, e, oe.data(r, e)) : void 0
    },
    removeData: function(e) {
      return this.each(function() {
        oe.removeData(this, e)
      })
    }
  }), oe.extend({
    queue: function(e, t, n) {
      var i;
      return e ? (t = (t || "fx") + "queue", i = oe._data(e, t), n && (!i || oe.isArray(n) ? i = oe._data(e, t, oe.makeArray(n)) : i.push(n)), i || []) : void 0
    },
    dequeue: function(e, t) {
      t = t || "fx";
      var n = oe.queue(e, t),
        i = n.length,
        o = n.shift(),
        r = oe._queueHooks(e, t),
        s = function() {
          oe.dequeue(e, t)
        };
      "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, s, r)), !i && r && r.empty.fire()
    },
    _queueHooks: function(e, t) {
      var n = t + "queueHooks";
      return oe._data(e, n) || oe._data(e, n, {
        empty: oe.Callbacks("once memory").add(function() {
          oe._removeData(e, t + "queue"), oe._removeData(e, n)
        })
      })
    }
  }), oe.fn.extend({
    queue: function(e, t) {
      var n = 2;
      return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? oe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
        var n = oe.queue(this, e, t);
        oe._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && oe.dequeue(this, e)
      })
    },
    dequeue: function(e) {
      return this.each(function() {
        oe.dequeue(this, e)
      })
    },
    clearQueue: function(e) {
      return this.queue(e || "fx", [])
    },
    promise: function(e, t) {
      var n, i = 1,
        o = oe.Deferred(),
        r = this,
        s = this.length,
        a = function() {
          --i || o.resolveWith(r, [r])
        };
      for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(n = oe._data(r[s], e + "queueHooks")) && n.empty && (i++, n.empty.add(a));
      return a(), o.promise(t)
    }
  });
  var Ce = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    $e = ["Top", "Right", "Bottom", "Left"],
    Ee = function(e, t) {
      return e = t || e, "none" === oe.css(e, "display") || !oe.contains(e.ownerDocument, e)
    },
    Ae = oe.access = function(e, t, n, i, o, r, s) {
      var a = 0,
        l = e.length,
        c = null == n;
      if ("object" === oe.type(n)) {
        o = !0;
        for (a in n) oe.access(e, t, a, n[a], !0, r, s)
      } else if (void 0 !== i && (o = !0, oe.isFunction(i) || (s = !0), c && (s ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
        return c.call(oe(e), n)
      })), t))
        for (; l > a; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
      return o ? e : c ? t.call(e) : l ? t(e[0], n) : r
    },
    Ne = /^(?:checkbox|radio)$/i;
  ! function() {
    var e = he.createElement("input"),
      t = he.createElement("div"),
      n = he.createDocumentFragment();
    if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ne.leadingWhitespace = 3 === t.firstChild.nodeType, ne.tbody = !t.getElementsByTagName("tbody").length, ne.htmlSerialize = !!t.getElementsByTagName("link").length, ne.html5Clone = "<:nav></:nav>" !== he.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), ne.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ne.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function() {
      ne.noCloneEvent = !1
    }), t.cloneNode(!0).click()), null == ne.deleteExpando) {
      ne.deleteExpando = !0;
      try {
        delete t.test
      } catch (e) {
        ne.deleteExpando = !1
      }
    }
  }(),
    function() {
      var t, n, i = he.createElement("div");
      for (t in {
        submit: !0,
        change: !0,
        focusin: !0
      }) n = "on" + t, (ne[t + "Bubbles"] = n in e) || (i.setAttribute(n, "t"), ne[t + "Bubbles"] = !1 === i.attributes[n].expando);
      i = null
    }();
  var je = /^(?:input|select|textarea)$/i,
    Le = /^key/,
    He = /^(?:mouse|pointer|contextmenu)|click/,
    De = /^(?:focusinfocus|focusoutblur)$/,
    Oe = /^([^.]*)(?:\.(.+)|)$/;
  oe.event = {
    global: {},
    add: function(e, t, n, i, o) {
      var r, s, a, l, c, d, u, p, f, h, v, g = oe._data(e);
      if (g) {
        for (n.handler && (l = n, n = l.handler, o = l.selector), n.guid || (n.guid = oe.guid++), (s = g.events) || (s = g.events = {}), (d = g.handle) || (d = g.handle = function(e) {
          return (void 0 === oe ? "undefined" : _typeof(oe)) === ke || e && oe.event.triggered === e.type ? void 0 : oe.event.dispatch.apply(d.elem, arguments)
        }, d.elem = e), t = (t || "").match(ye) || [""], a = t.length; a--;) r = Oe.exec(t[a]) || [], f = v = r[1], h = (r[2] || "").split(".").sort(), f && (c = oe.event.special[f] || {}, f = (o ? c.delegateType : c.bindType) || f, c = oe.event.special[f] || {}, u = oe.extend({
          type: f,
          origType: v,
          data: i,
          handler: n,
          guid: n.guid,
          selector: o,
          needsContext: o && oe.expr.match.needsContext.test(o),
          namespace: h.join(".")
        }, l), (p = s[f]) || (p = s[f] = [], p.delegateCount = 0, c.setup && !1 !== c.setup.call(e, i, h, d) || (e.addEventListener ? e.addEventListener(f, d, !1) : e.attachEvent && e.attachEvent("on" + f, d))), c.add && (c.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, u) : p.push(u), oe.event.global[f] = !0);
        e = null
      }
    },
    remove: function(e, t, n, i, o) {
      var r, s, a, l, c, d, u, p, f, h, v, g = oe.hasData(e) && oe._data(e);
      if (g && (d = g.events)) {
        for (t = (t || "").match(ye) || [""], c = t.length; c--;)
          if (a = Oe.exec(t[c]) || [], f = v = a[1], h = (a[2] || "").split(".").sort(), f) {
            for (u = oe.event.special[f] || {}, f = (i ? u.delegateType : u.bindType) || f, p = d[f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = p.length; r--;) s = p[r], !o && v !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (p.splice(r, 1), s.selector && p.delegateCount--, u.remove && u.remove.call(e, s));
            l && !p.length && (u.teardown && !1 !== u.teardown.call(e, h, g.handle) || oe.removeEvent(e, f, g.handle), delete d[f])
          } else
            for (f in d) oe.event.remove(e, f + t[c], n, i, !0);
        oe.isEmptyObject(d) && (delete g.handle, oe._removeData(e, "events"))
      }
    },
    trigger: function(t, n, i, o) {
      var r, s, a, l, c, d, u, p = [i || he],
        f = te.call(t, "type") ? t.type : t,
        h = te.call(t, "namespace") ? t.namespace.split(".") : [];
      if (a = d = i = i || he, 3 !== i.nodeType && 8 !== i.nodeType && !De.test(f + oe.event.triggered) && (f.indexOf(".") >= 0 && (h = f.split("."), f = h.shift(), h.sort()), s = f.indexOf(":") < 0 && "on" + f, t = t[oe.expando] ? t : new oe.Event(f, "object" == (void 0 === t ? "undefined" : _typeof(t)) && t), t.isTrigger = o ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : oe.makeArray(n, [t]), c = oe.event.special[f] || {}, o || !c.trigger || !1 !== c.trigger.apply(i, n))) {
        if (!o && !c.noBubble && !oe.isWindow(i)) {
          for (l = c.delegateType || f, De.test(l + f) || (a = a.parentNode); a; a = a.parentNode) p.push(a), d = a;
          d === (i.ownerDocument || he) && p.push(d.defaultView || d.parentWindow || e)
        }
        for (u = 0;
             (a = p[u++]) && !t.isPropagationStopped();) t.type = u > 1 ? l : c.bindType || f, r = (oe._data(a, "events") || {})[t.type] && oe._data(a, "handle"), r && r.apply(a, n), (r = s && a[s]) && r.apply && oe.acceptData(a) && (t.result = r.apply(a, n), !1 === t.result && t.preventDefault());
        if (t.type = f, !o && !t.isDefaultPrevented() && (!c._default || !1 === c._default.apply(p.pop(), n)) && oe.acceptData(i) && s && i[f] && !oe.isWindow(i)) {
          d = i[s], d && (i[s] = null), oe.event.triggered = f;
          try {
            i[f]()
          } catch (e) {}
          oe.event.triggered = void 0, d && (i[s] = d)
        }
        return t.result
      }
    },
    dispatch: function(e) {
      e = oe.event.fix(e);
      var t, n, i, o, r, s = [],
        a = G.call(arguments),
        l = (oe._data(this, "events") || {})[e.type] || [],
        c = oe.event.special[e.type] || {};
      if (a[0] = e, e.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, e)) {
        for (s = oe.event.handlers.call(this, e, l), t = 0;
             (o = s[t++]) && !e.isPropagationStopped();)
          for (e.currentTarget = o.elem, r = 0;
               (i = o.handlers[r++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, void 0 !== (n = ((oe.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, a)) && !1 === (e.result = n) && (e.preventDefault(), e.stopPropagation()));
        return c.postDispatch && c.postDispatch.call(this, e), e.result
      }
    },
    handlers: function(e, t) {
      var n, i, o, r, s = [],
        a = t.delegateCount,
        l = e.target;
      if (a && l.nodeType && (!e.button || "click" !== e.type))
        for (; l != this; l = l.parentNode || this)
          if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
            for (o = [], r = 0; a > r; r++) i = t[r], n = i.selector + " ", void 0 === o[n] && (o[n] = i.needsContext ? oe(n, this).index(l) >= 0 : oe.find(n, this, null, [l]).length), o[n] && o.push(i);
            o.length && s.push({
              elem: l,
              handlers: o
            })
          } return a < t.length && s.push({
        elem: this,
        handlers: t.slice(a)
      }), s
    },
    fix: function(e) {
      if (e[oe.expando]) return e;
      var t, n, i, o = e.type,
        r = e,
        s = this.fixHooks[o];
      for (s || (this.fixHooks[o] = s = He.test(o) ? this.mouseHooks : Le.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new oe.Event(r), t = i.length; t--;) n = i[t], e[n] = r[n];
      return e.target || (e.target = r.srcElement || he), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(e, t) {
        var n, i, o, r = t.button,
          s = t.fromElement;
        return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || he, o = i.documentElement, n = i.body, e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement : s), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
      }
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function() {
          if (this !== h() && this.focus) try {
            return this.focus(), !1
          } catch (e) {}
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === h() && this.blur ? (this.blur(), !1) : void 0
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return oe.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
        },
        _default: function(e) {
          return oe.nodeName(e.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function(e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
        }
      }
    },
    simulate: function(e, t, n, i) {
      var o = oe.extend(new oe.Event, n, {
        type: e,
        isSimulated: !0,
        originalEvent: {}
      });
      i ? oe.event.trigger(o, null, t) : oe.event.dispatch.call(t, o), o.isDefaultPrevented() && n.preventDefault()
    }
  }, oe.removeEvent = he.removeEventListener ? function(e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n, !1)
  } : function(e, t, n) {
    var i = "on" + t;
    e.detachEvent && (_typeof(e[i]) === ke && (e[i] = null), e.detachEvent(i, n))
  }, oe.Event = function(e, t) {
    return this instanceof oe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? p : f) : this.type = e, t && oe.extend(this, t), this.timeStamp = e && e.timeStamp || oe.now(), void(this[oe.expando] = !0)) : new oe.Event(e, t)
  }, oe.Event.prototype = {
    isDefaultPrevented: f,
    isPropagationStopped: f,
    isImmediatePropagationStopped: f,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = p, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = p, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = p, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
    }
  }, oe.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(e, t) {
    oe.event.special[e] = {
      delegateType: t,
      bindType: t,
      handle: function(e) {
        var n, i = this,
          o = e.relatedTarget,
          r = e.handleObj;
        return (!o || o !== i && !oe.contains(i, o)) && (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
      }
    }
  }), ne.submitBubbles || (oe.event.special.submit = {
    setup: function() {
      return !oe.nodeName(this, "form") && void oe.event.add(this, "click._submit keypress._submit", function(e) {
        var t = e.target,
          n = oe.nodeName(t, "input") || oe.nodeName(t, "button") ? t.form : void 0;
        n && !oe._data(n, "submitBubbles") && (oe.event.add(n, "submit._submit", function(e) {
          e._submit_bubble = !0
        }), oe._data(n, "submitBubbles", !0))
      })
    },
    postDispatch: function(e) {
      e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && oe.event.simulate("submit", this.parentNode, e, !0))
    },
    teardown: function() {
      return !oe.nodeName(this, "form") && void oe.event.remove(this, "._submit")
    }
  }), ne.changeBubbles || (oe.event.special.change = {
    setup: function() {
      return je.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (oe.event.add(this, "propertychange._change", function(e) {
        "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
      }), oe.event.add(this, "click._change", function(e) {
        this._just_changed && !e.isTrigger && (this._just_changed = !1), oe.event.simulate("change", this, e, !0)
      })), !1) : void oe.event.add(this, "beforeactivate._change", function(e) {
        var t = e.target;
        je.test(t.nodeName) && !oe._data(t, "changeBubbles") && (oe.event.add(t, "change._change", function(e) {
          !this.parentNode || e.isSimulated || e.isTrigger || oe.event.simulate("change", this.parentNode, e, !0)
        }), oe._data(t, "changeBubbles", !0))
      })
    },
    handle: function(e) {
      var t = e.target;
      return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
    },
    teardown: function() {
      return oe.event.remove(this, "._change"), !je.test(this.nodeName)
    }
  }), ne.focusinBubbles || oe.each({
    focus: "focusin",
    blur: "focusout"
  }, function(e, t) {
    var n = function(e) {
      oe.event.simulate(t, e.target, oe.event.fix(e), !0)
    };
    oe.event.special[t] = {
      setup: function() {
        var i = this.ownerDocument || this,
          o = oe._data(i, t);
        o || i.addEventListener(e, n, !0), oe._data(i, t, (o || 0) + 1)
      },
      teardown: function() {
        var i = this.ownerDocument || this,
          o = oe._data(i, t) - 1;
        o ? oe._data(i, t, o) : (i.removeEventListener(e, n, !0), oe._removeData(i, t))
      }
    }
  }), oe.fn.extend({
    on: function(e, t, n, i, o) {
      var r, s;
      if ("object" == (void 0 === e ? "undefined" : _typeof(e))) {
        "string" != typeof t && (n = n || t, t = void 0);
        for (r in e) this.on(r, t, n, e[r], o);
        return this
      }
      if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), !1 === i) i = f;
      else if (!i) return this;
      return 1 === o && (s = i, i = function(e) {
        return oe().off(e), s.apply(this, arguments)
      }, i.guid = s.guid || (s.guid = oe.guid++)), this.each(function() {
        oe.event.add(this, e, i, n, t)
      })
    },
    one: function(e, t, n, i) {
      return this.on(e, t, n, i, 1)
    },
    off: function(e, t, n) {
      var i, o;
      if (e && e.preventDefault && e.handleObj) return i = e.handleObj, oe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
      if ("object" == (void 0 === e ? "undefined" : _typeof(e))) {
        for (o in e) this.off(o, t, e[o]);
        return this
      }
      return (!1 === t || "function" == typeof t) && (n = t, t = void 0), !1 === n && (n = f), this.each(function() {
        oe.event.remove(this, e, n, t)
      })
    },
    trigger: function(e, t) {
      return this.each(function() {
        oe.event.trigger(e, t, this)
      })
    },
    triggerHandler: function(e, t) {
      var n = this[0];
      return n ? oe.event.trigger(e, t, n, !0) : void 0
    }
  });
  var Me = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    _e = / jQuery\d+="(?:null|\d+)"/g,
    Pe = new RegExp("<(?:" + Me + ")[\\s/>]", "i"),
    qe = /^\s+/,
    ze = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Fe = /<([\w:]+)/,
    We = /<tbody/i,
    Ie = /<|&#?\w+;/,
    Be = /<(?:script|style|link)/i,
    Re = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Xe = /^$|\/(?:java|ecma)script/i,
    Ue = /^true\/(.*)/,
    Ye = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Ve = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    },
    Ge = v(he),
    Je = Ge.appendChild(he.createElement("div"));
  Ve.optgroup = Ve.option, Ve.tbody = Ve.tfoot = Ve.colgroup = Ve.caption = Ve.thead, Ve.th = Ve.td, oe.extend({
    clone: function(e, t, n) {
      var i, o, r, s, a, l = oe.contains(e.ownerDocument, e);
      if (ne.html5Clone || oe.isXMLDoc(e) || !Pe.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (Je.innerHTML = e.outerHTML, Je.removeChild(r = Je.firstChild)), !(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || oe.isXMLDoc(e)))
        for (i = g(r), a = g(e), s = 0; null != (o = a[s]); ++s) i[s] && T(o, i[s]);
      if (t)
        if (n)
          for (a = a || g(e), i = i || g(r), s = 0; null != (o = a[s]); s++) k(o, i[s]);
        else k(e, r);
      return i = g(r, "script"), i.length > 0 && x(i, !l && g(e, "script")), i = a = o = null, r
    },
    buildFragment: function(e, t, n, i) {
      for (var o, r, s, a, l, c, d, u = e.length, p = v(t), f = [], h = 0; u > h; h++)
        if ((r = e[h]) || 0 === r)
          if ("object" === oe.type(r)) oe.merge(f, r.nodeType ? [r] : r);
          else if (Ie.test(r)) {
            for (a = a || p.appendChild(t.createElement("div")), l = (Fe.exec(r) || ["", ""])[1].toLowerCase(), d = Ve[l] || Ve._default, a.innerHTML = d[1] + r.replace(ze, "<$1></$2>") + d[2], o = d[0]; o--;) a = a.lastChild;
            if (!ne.leadingWhitespace && qe.test(r) && f.push(t.createTextNode(qe.exec(r)[0])), !ne.tbody)
              for (r = "table" !== l || We.test(r) ? "<table>" !== d[1] || We.test(r) ? 0 : a : a.firstChild, o = r && r.childNodes.length; o--;) oe.nodeName(c = r.childNodes[o], "tbody") && !c.childNodes.length && r.removeChild(c);
            for (oe.merge(f, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
            a = p.lastChild
          } else f.push(t.createTextNode(r));
      for (a && p.removeChild(a), ne.appendChecked || oe.grep(g(f, "input"), m), h = 0; r = f[h++];)
        if ((!i || -1 === oe.inArray(r, i)) && (s = oe.contains(r.ownerDocument, r), a = g(p.appendChild(r), "script"), s && x(a), n))
          for (o = 0; r = a[o++];) Xe.test(r.type || "") && n.push(r);
      return a = null, p
    },
    cleanData: function(e, t) {
      for (var n, i, o, r, s = 0, a = oe.expando, l = oe.cache, c = ne.deleteExpando, d = oe.event.special; null != (n = e[s]); s++)
        if ((t || oe.acceptData(n)) && (o = n[a], r = o && l[o])) {
          if (r.events)
            for (i in r.events) d[i] ? oe.event.remove(n, i) : oe.removeEvent(n, i, r.handle);
          l[o] && (delete l[o], c ? delete n[a] : _typeof(n.removeAttribute) !== ke ? n.removeAttribute(a) : n[a] = null, V.push(o))
        }
    }
  }), oe.fn.extend({
    text: function(e) {
      return Ae(this, function(e) {
        return void 0 === e ? oe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || he).createTextNode(e))
      }, null, e, arguments.length)
    },
    append: function() {
      return this.domManip(arguments, function(e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          y(this, e).appendChild(e)
        }
      })
    },
    prepend: function() {
      return this.domManip(arguments, function(e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = y(this, e);
          t.insertBefore(e, t.firstChild)
        }
      })
    },
    before: function() {
      return this.domManip(arguments, function(e) {
        this.parentNode && this.parentNode.insertBefore(e, this)
      })
    },
    after: function() {
      return this.domManip(arguments, function(e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
      })
    },
    remove: function(e, t) {
      for (var n, i = e ? oe.filter(e, this) : this, o = 0; null != (n = i[o]); o++) t || 1 !== n.nodeType || oe.cleanData(g(n)), n.parentNode && (t && oe.contains(n.ownerDocument, n) && x(g(n, "script")), n.parentNode.removeChild(n));
      return this
    },
    empty: function() {
      for (var e, t = 0; null != (e = this[t]); t++) {
        for (1 === e.nodeType && oe.cleanData(g(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
        e.options && oe.nodeName(e, "select") && (e.options.length = 0)
      }
      return this
    },
    clone: function(e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function() {
        return oe.clone(this, e, t)
      })
    },
    html: function(e) {
      return Ae(this, function(e) {
        var t = this[0] || {},
          n = 0,
          i = this.length;
        if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(_e, "") : void 0;
        if (!("string" != typeof e || Be.test(e) || !ne.htmlSerialize && Pe.test(e) || !ne.leadingWhitespace && qe.test(e) || Ve[(Fe.exec(e) || ["", ""])[1].toLowerCase()])) {
          e = e.replace(ze, "<$1></$2>");
          try {
            for (; i > n; n++) t = this[n] || {}, 1 === t.nodeType && (oe.cleanData(g(t, !1)), t.innerHTML = e);
            t = 0
          } catch (e) {}
        }
        t && this.empty().append(e)
      }, null, e, arguments.length)
    },
    replaceWith: function() {
      var e = arguments[0];
      return this.domManip(arguments, function(t) {
        e = this.parentNode, oe.cleanData(g(this)), e && e.replaceChild(t, this)
      }), e && (e.length || e.nodeType) ? this : this.remove()
    },
    detach: function(e) {
      return this.remove(e, !0)
    },
    domManip: function(e, t) {
      e = J.apply([], e);
      var n, i, o, r, s, a, l = 0,
        c = this.length,
        d = this,
        u = c - 1,
        p = e[0],
        f = oe.isFunction(p);
      if (f || c > 1 && "string" == typeof p && !ne.checkClone && Re.test(p)) return this.each(function(n) {
        var i = d.eq(n);
        f && (e[0] = p.call(this, n, i.html())), i.domManip(e, t)
      });
      if (c && (a = oe.buildFragment(e, this[0].ownerDocument, !1, this), n = a.firstChild, 1 === a.childNodes.length && (a = n), n)) {
        for (r = oe.map(g(a, "script"), b), o = r.length; c > l; l++) i = a, l !== u && (i = oe.clone(i, !0, !0), o && oe.merge(r, g(i, "script"))), t.call(this[l], i, l);
        if (o)
          for (s = r[r.length - 1].ownerDocument, oe.map(r, w), l = 0; o > l; l++) i = r[l], Xe.test(i.type || "") && !oe._data(i, "globalEval") && oe.contains(s, i) && (i.src ? oe._evalUrl && oe._evalUrl(i.src) : oe.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Ye, "")));
        a = n = null
      }
      return this
    }
  }), oe.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(e, t) {
    oe.fn[e] = function(e) {
      for (var n, i = 0, o = [], r = oe(e), s = r.length - 1; s >= i; i++) n = i === s ? this : this.clone(!0), oe(r[i])[t](n), Q.apply(o, n.get());
      return this.pushStack(o)
    }
  });
  var Qe, Ke = {};
  ! function() {
    var e;
    ne.shrinkWrapBlocks = function() {
      if (null != e) return e;
      e = !1;
      var t, n, i;
      return n = he.getElementsByTagName("body")[0], n && n.style ? (t = he.createElement("div"), i = he.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), _typeof(t.style.zoom) !== ke && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(he.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0
    }
  }();
  var Ze, et, tt = /^margin/,
    nt = new RegExp("^(" + Ce + ")(?!px)[a-z%]+$", "i"),
    it = /^(top|right|bottom|left)$/;
  e.getComputedStyle ? (Ze = function(e) {
    return e.ownerDocument.defaultView.getComputedStyle(e, null)
  }, et = function(e, t, n) {
    var i, o, r, s, a = e.style;
    return n = n || Ze(e), s = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== s || oe.contains(e.ownerDocument, e) || (s = oe.style(e, t)), nt.test(s) && tt.test(t) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r)), void 0 === s ? s : s + ""
  }) : he.documentElement.currentStyle && (Ze = function(e) {
    return e.currentStyle
  }, et = function(e, t, n) {
    var i, o, r, s, a = e.style;
    return n = n || Ze(e), s = n ? n[t] : void 0, null == s && a && a[t] && (s = a[t]), nt.test(s) && !it.test(t) && (i = a.left, o = e.runtimeStyle, r = o && o.left, r && (o.left = e.currentStyle.left), a.left = "fontSize" === t ? "1em" : s, s = a.pixelLeft + "px", a.left = i, r && (o.left = r)), void 0 === s ? s : s + "" || "auto"
  }), ! function() {
    var t, n, i, o, r, s, a;
    if (t = he.createElement("div"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = t.getElementsByTagName("a")[0], n = i && i.style) {
      var l = function() {
        var t, n, i, l;
        (n = he.getElementsByTagName("body")[0]) && n.style && (t = he.createElement("div"), i = he.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = r = !1, a = !0, e.getComputedStyle && (o = "1%" !== (e.getComputedStyle(t, null) || {}).top, r = "4px" === (e.getComputedStyle(t, null) || {
          width: "4px"
        }).width, l = t.appendChild(he.createElement("div")), l.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", l.style.marginRight = l.style.width = "0", t.style.width = "1px", a = !parseFloat((e.getComputedStyle(l, null) || {}).marginRight)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", l = t.getElementsByTagName("td"), l[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === l[0].offsetHeight, s && (l[0].style.display = "", l[1].style.display = "none", s = 0 === l[0].offsetHeight), n.removeChild(i))
      };
      n.cssText = "float:left;opacity:.5", ne.opacity = "0.5" === n.opacity, ne.cssFloat = !!n.cssFloat, t.style.backgroundClip = "content-box", t.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === t.style.backgroundClip, ne.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing, oe.extend(ne, {
        reliableHiddenOffsets: function() {
          return null == s && l(), s
        },
        boxSizingReliable: function() {
          return null == r && l(), r
        },
        pixelPosition: function() {
          return null == o && l(), o
        },
        reliableMarginRight: function() {
          return null == a && l(), a
        }
      })
    }
  }(), oe.swap = function(e, t, n, i) {
    var o, r, s = {};
    for (r in t) s[r] = e.style[r], e.style[r] = t[r];
    o = n.apply(e, i || []);
    for (r in t) e.style[r] = s[r];
    return o
  };
  var ot = /alpha\([^)]*\)/i,
    rt = /opacity\s*=\s*([^)]*)/,
    st = /^(none|table(?!-c[ea]).+)/,
    at = new RegExp("^(" + Ce + ")(.*)$", "i"),
    lt = new RegExp("^([+-])=(" + Ce + ")", "i"),
    ct = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    dt = {
      letterSpacing: "0",
      fontWeight: "400"
    },
    ut = ["Webkit", "O", "Moz", "ms"];
  oe.extend({
    cssHooks: {
      opacity: {
        get: function(e, t) {
          if (t) {
            var n = et(e, "opacity");
            return "" === n ? "1" : n
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      float: ne.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function(e, t, n, i) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var o, r, s, a = oe.camelCase(t),
          l = e.style;
        if (t = oe.cssProps[a] || (oe.cssProps[a] = E(l, a)), s = oe.cssHooks[t] || oe.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(e, !1, i)) ? o : l[t];
        if (r = void 0 === n ? "undefined" : _typeof(n), "string" === r && (o = lt.exec(n)) && (n = (o[1] + 1) * o[2] + parseFloat(oe.css(e, t)), r = "number"), null != n && n === n && ("number" !== r || oe.cssNumber[a] || (n += "px"), ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(s && "set" in s && void 0 === (n = s.set(e, n, i))))) try {
          l[t] = n
        } catch (e) {}
      }
    },
    css: function(e, t, n, i) {
      var o, r, s, a = oe.camelCase(t);
      return t = oe.cssProps[a] || (oe.cssProps[a] = E(e.style, a)), s = oe.cssHooks[t] || oe.cssHooks[a], s && "get" in s && (r = s.get(e, !0, n)), void 0 === r && (r = et(e, t, i)), "normal" === r && t in dt && (r = dt[t]), "" === n || n ? (o = parseFloat(r), !0 === n || oe.isNumeric(o) ? o || 0 : r) : r
    }
  }), oe.each(["height", "width"], function(e, t) {
    oe.cssHooks[t] = {
      get: function(e, n, i) {
        return n ? st.test(oe.css(e, "display")) && 0 === e.offsetWidth ? oe.swap(e, ct, function() {
          return L(e, t, i)
        }) : L(e, t, i) : void 0
      },
      set: function(e, n, i) {
        var o = i && Ze(e);
        return N(e, n, i ? j(e, t, i, ne.boxSizing && "border-box" === oe.css(e, "boxSizing", !1, o), o) : 0)
      }
    }
  }), ne.opacity || (oe.cssHooks.opacity = {
    get: function(e, t) {
      return rt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    },
    set: function(e, t) {
      var n = e.style,
        i = e.currentStyle,
        o = oe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
        r = i && i.filter || n.filter || "";
      n.zoom = 1, (t >= 1 || "" === t) && "" === oe.trim(r.replace(ot, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = ot.test(r) ? r.replace(ot, o) : r + " " + o)
    }
  }), oe.cssHooks.marginRight = $(ne.reliableMarginRight, function(e, t) {
    return t ? oe.swap(e, {
      display: "inline-block"
    }, et, [e, "marginRight"]) : void 0
  }), oe.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(e, t) {
    oe.cssHooks[e + t] = {
      expand: function(n) {
        for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) o[e + $e[i] + t] = r[i] || r[i - 2] || r[0];
        return o
      }
    }, tt.test(e) || (oe.cssHooks[e + t].set = N)
  }), oe.fn.extend({
    css: function(e, t) {
      return Ae(this, function(e, t, n) {
        var i, o, r = {},
          s = 0;
        if (oe.isArray(t)) {
          for (i = Ze(e), o = t.length; o > s; s++) r[t[s]] = oe.css(e, t[s], !1, i);
          return r
        }
        return void 0 !== n ? oe.style(e, t, n) : oe.css(e, t)
      }, e, t, arguments.length > 1)
    },
    show: function() {
      return A(this, !0)
    },
    hide: function() {
      return A(this)
    },
    toggle: function(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
        Ee(this) ? oe(this).show() : oe(this).hide()
      })
    }
  }), oe.Tween = H, H.prototype = {
    constructor: H,
    init: function(e, t, n, i, o, r) {
      this.elem = e, this.prop = n, this.easing = o || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (oe.cssNumber[n] ? "" : "px")
    },
    cur: function() {
      var e = H.propHooks[this.prop];
      return e && e.get ? e.get(this) : H.propHooks._default.get(this)
    },
    run: function(e) {
      var t, n = H.propHooks[this.prop];
      return this.pos = t = this.options.duration ? oe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : H.propHooks._default.set(this), this
    }
  }, H.prototype.init.prototype = H.prototype, H.propHooks = {
    _default: {
      get: function(e) {
        var t;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = oe.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
      },
      set: function(e) {
        oe.fx.step[e.prop] ? oe.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[oe.cssProps[e.prop]] || oe.cssHooks[e.prop]) ? oe.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
      }
    }
  }, H.propHooks.scrollTop = H.propHooks.scrollLeft = {
    set: function(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
  }, oe.easing = {
    linear: function(e) {
      return e
    },
    swing: function(e) {
      return .5 - Math.cos(e * Math.PI) / 2
    }
  }, oe.fx = H.prototype.init, oe.fx.step = {};
  var pt, ft, ht = /^(?:toggle|show|hide)$/,
    vt = new RegExp("^(?:([+-])=|)(" + Ce + ")([a-z%]*)$", "i"),
    gt = /queueHooks$/,
    mt = [_],
    yt = {
      "*": [function(e, t) {
        var n = this.createTween(e, t),
          i = n.cur(),
          o = vt.exec(t),
          r = o && o[3] || (oe.cssNumber[e] ? "" : "px"),
          s = (oe.cssNumber[e] || "px" !== r && +i) && vt.exec(oe.css(n.elem, e)),
          a = 1,
          l = 20;
        if (s && s[3] !== r) {
          r = r || s[3], o = o || [], s = +i || 1;
          do {
            a = a || ".5", s /= a, oe.style(n.elem, e, s + r)
          } while (a !== (a = n.cur() / i) && 1 !== a && --l)
        }
        return o && (s = n.start = +s || +i || 0, n.unit = r, n.end = o[1] ? s + (o[1] + 1) * o[2] : +o[2]), n
      }]
    };
  oe.Animation = oe.extend(q, {
    tweener: function(e, t) {
      oe.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
      for (var n, i = 0, o = e.length; o > i; i++) n = e[i], yt[n] = yt[n] || [], yt[n].unshift(t)
    },
    prefilter: function(e, t) {
      t ? mt.unshift(e) : mt.push(e)
    }
  }), oe.speed = function(e, t, n) {
    var i = e && "object" == (void 0 === e ? "undefined" : _typeof(e)) ? oe.extend({}, e) : {
      complete: n || !n && t || oe.isFunction(e) && e,
      duration: e,
      easing: n && t || t && !oe.isFunction(t) && t
    };
    return i.duration = oe.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in oe.fx.speeds ? oe.fx.speeds[i.duration] : oe.fx.speeds._default, (null == i.queue || !0 === i.queue) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
      oe.isFunction(i.old) && i.old.call(this), i.queue && oe.dequeue(this, i.queue)
    }, i
  }, oe.fn.extend({
    fadeTo: function(e, t, n, i) {
      return this.filter(Ee).css("opacity", 0).show().end().animate({
        opacity: t
      }, e, n, i)
    },
    animate: function(e, t, n, i) {
      var o = oe.isEmptyObject(e),
        r = oe.speed(t, n, i),
        s = function() {
          var t = q(this, oe.extend({}, e), r);
          (o || oe._data(this, "finish")) && t.stop(!0)
        };
      return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
    },
    stop: function(e, t, n) {
      var i = function(e) {
        var t = e.stop;
        delete e.stop, t(n)
      };
      return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
        var t = !0,
          o = null != e && e + "queueHooks",
          r = oe.timers,
          s = oe._data(this);
        if (o) s[o] && s[o].stop && i(s[o]);
        else
          for (o in s) s[o] && s[o].stop && gt.test(o) && i(s[o]);
        for (o = r.length; o--;) r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
        (t || !n) && oe.dequeue(this, e)
      })
    },
    finish: function(e) {
      return !1 !== e && (e = e || "fx"), this.each(function() {
        var t, n = oe._data(this),
          i = n[e + "queue"],
          o = n[e + "queueHooks"],
          r = oe.timers,
          s = i ? i.length : 0;
        for (n.finish = !0, oe.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
        for (t = 0; s > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
        delete n.finish
      })
    }
  }), oe.each(["toggle", "show", "hide"], function(e, t) {
    var n = oe.fn[t];
    oe.fn[t] = function(e, i, o) {
      return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(O(t, !0), e, i, o)
    }
  }), oe.each({
    slideDown: O("show"),
    slideUp: O("hide"),
    slideToggle: O("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function(e, t) {
    oe.fn[e] = function(e, n, i) {
      return this.animate(t, e, n, i)
    }
  }), oe.timers = [], oe.fx.tick = function() {
    var e, t = oe.timers,
      n = 0;
    for (pt = oe.now(); n < t.length; n++)(e = t[n])() || t[n] !== e || t.splice(n--, 1);
    t.length || oe.fx.stop(), pt = void 0
  }, oe.fx.timer = function(e) {
    oe.timers.push(e), e() ? oe.fx.start() : oe.timers.pop()
  }, oe.fx.interval = 13, oe.fx.start = function() {
    ft || (ft = setInterval(oe.fx.tick, oe.fx.interval))
  }, oe.fx.stop = function() {
    clearInterval(ft), ft = null
  }, oe.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, oe.fn.delay = function(e, t) {
    return e = oe.fx ? oe.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
      var i = setTimeout(t, e);
      n.stop = function() {
        clearTimeout(i)
      }
    })
  },
    function() {
      var e, t, n, i, o;
      t = he.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = t.getElementsByTagName("a")[0], n = he.createElement("select"), o = n.appendChild(he.createElement("option")), e = t.getElementsByTagName("input")[0], i.style.cssText = "top:1px", ne.getSetAttribute = "t" !== t.className, ne.style = /top/.test(i.getAttribute("style")), ne.hrefNormalized = "/a" === i.getAttribute("href"), ne.checkOn = !!e.value, ne.optSelected = o.selected, ne.enctype = !!he.createElement("form").enctype, n.disabled = !0, ne.optDisabled = !o.disabled, e = he.createElement("input"), e.setAttribute("value", ""), ne.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), ne.radioValue = "t" === e.value
    }();
  var bt = /\r/g;
  oe.fn.extend({
    val: function(e) {
      var t, n, i, o = this[0];
      return arguments.length ? (i = oe.isFunction(e), this.each(function(n) {
        var o;
        1 === this.nodeType && (o = i ? e.call(this, n, oe(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : oe.isArray(o) && (o = oe.map(o, function(e) {
          return null == e ? "" : e + ""
        })), (t = oe.valHooks[this.type] || oe.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
      })) : o ? (t = oe.valHooks[o.type] || oe.valHooks[o.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value, "string" == typeof n ? n.replace(bt, "") : null == n ? "" : n)) : void 0
    }
  }), oe.extend({
    valHooks: {
      option: {
        get: function(e) {
          var t = oe.find.attr(e, "value");
          return null != t ? t : oe.trim(oe.text(e))
        }
      },
      select: {
        get: function(e) {
          for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || 0 > o, s = r ? null : [], a = r ? o + 1 : i.length, l = 0 > o ? a : r ? o : 0; a > l; l++)
            if (n = i[l], !(!n.selected && l !== o || (ne.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && oe.nodeName(n.parentNode, "optgroup"))) {
              if (t = oe(n).val(), r) return t;
              s.push(t)
            } return s
        },
        set: function(e, t) {
          for (var n, i, o = e.options, r = oe.makeArray(t), s = o.length; s--;)
            if (i = o[s], oe.inArray(oe.valHooks.option.get(i), r) >= 0) try {
              i.selected = n = !0
            } catch (e) {
              i.scrollHeight
            } else i.selected = !1;
          return n || (e.selectedIndex = -1), o
        }
      }
    }
  }), oe.each(["radio", "checkbox"], function() {
    oe.valHooks[this] = {
      set: function(e, t) {
        return oe.isArray(t) ? e.checked = oe.inArray(oe(e).val(), t) >= 0 : void 0
      }
    }, ne.checkOn || (oe.valHooks[this].get = function(e) {
      return null === e.getAttribute("value") ? "on" : e.value
    })
  });
  var wt, xt, kt = oe.expr.attrHandle,
    Tt = /^(?:checked|selected)$/i,
    St = ne.getSetAttribute,
    Ct = ne.input;
  oe.fn.extend({
    attr: function(e, t) {
      return Ae(this, oe.attr, e, t, arguments.length > 1)
    },
    removeAttr: function(e) {
      return this.each(function() {
        oe.removeAttr(this, e)
      })
    }
  }), oe.extend({
    attr: function(e, t, n) {
      var i, o, r = e.nodeType;
      if (e && 3 !== r && 8 !== r && 2 !== r) return _typeof(e.getAttribute) === ke ? oe.prop(e, t, n) : (1 === r && oe.isXMLDoc(e) || (t = t.toLowerCase(), i = oe.attrHooks[t] || (oe.expr.match.bool.test(t) ? xt : wt)), void 0 === n ? i && "get" in i && null !== (o = i.get(e, t)) ? o : (o = oe.find.attr(e, t), null == o ? void 0 : o) : null !== n ? i && "set" in i && void 0 !== (o = i.set(e, n, t)) ? o : (e.setAttribute(t, n + ""), n) : void oe.removeAttr(e, t))
    },
    removeAttr: function(e, t) {
      var n, i, o = 0,
        r = t && t.match(ye);
      if (r && 1 === e.nodeType)
        for (; n = r[o++];) i = oe.propFix[n] || n, oe.expr.match.bool.test(n) ? Ct && St || !Tt.test(n) ? e[i] = !1 : e[oe.camelCase("default-" + n)] = e[i] = !1 : oe.attr(e, n, ""), e.removeAttribute(St ? n : i)
    },
    attrHooks: {
      type: {
        set: function(e, t) {
          if (!ne.radioValue && "radio" === t && oe.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
          }
        }
      }
    }
  }), xt = {
    set: function(e, t, n) {
      return !1 === t ? oe.removeAttr(e, n) : Ct && St || !Tt.test(n) ? e.setAttribute(!St && oe.propFix[n] || n, n) : e[oe.camelCase("default-" + n)] = e[n] = !0, n
    }
  }, oe.each(oe.expr.match.bool.source.match(/\w+/g), function(e, t) {
    var n = kt[t] || oe.find.attr;
    kt[t] = Ct && St || !Tt.test(t) ? function(e, t, i) {
      var o, r;
      return i || (r = kt[t], kt[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, kt[t] = r), o
    } : function(e, t, n) {
      return n ? void 0 : e[oe.camelCase("default-" + t)] ? t.toLowerCase() : null
    }
  }), Ct && St || (oe.attrHooks.value = {
    set: function(e, t, n) {
      return oe.nodeName(e, "input") ? void(e.defaultValue = t) : wt && wt.set(e, t, n)
    }
  }), St || (wt = {
    set: function(e, t, n) {
      var i = e.getAttributeNode(n);
      return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
    }
  }, kt.id = kt.name = kt.coords = function(e, t, n) {
    var i;
    return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
  }, oe.valHooks.button = {
    get: function(e, t) {
      var n = e.getAttributeNode(t);
      return n && n.specified ? n.value : void 0
    },
    set: wt.set
  }, oe.attrHooks.contenteditable = {
    set: function(e, t, n) {
      wt.set(e, "" !== t && t, n)
    }
  }, oe.each(["width", "height"], function(e, t) {
    oe.attrHooks[t] = {
      set: function(e, n) {
        return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
      }
    }
  })), ne.style || (oe.attrHooks.style = {
    get: function(e) {
      return e.style.cssText || void 0
    },
    set: function(e, t) {
      return e.style.cssText = t + ""
    }
  });
  var $t = /^(?:input|select|textarea|button|object)$/i,
    Et = /^(?:a|area)$/i;
  oe.fn.extend({
    prop: function(e, t) {
      return Ae(this, oe.prop, e, t, arguments.length > 1)
    },
    removeProp: function(e) {
      return e = oe.propFix[e] || e, this.each(function() {
        try {
          this[e] = void 0, delete this[e]
        } catch (e) {}
      })
    }
  }), oe.extend({
    propFix: {
      for: "htmlFor",
      class: "className"
    },
    prop: function(e, t, n) {
      var i, o, r, s = e.nodeType;
      if (e && 3 !== s && 8 !== s && 2 !== s) return r = 1 !== s || !oe.isXMLDoc(e), r && (t = oe.propFix[t] || t, o = oe.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
    },
    propHooks: {
      tabIndex: {
        get: function(e) {
          var t = oe.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : $t.test(e.nodeName) || Et.test(e.nodeName) && e.href ? 0 : -1
        }
      }
    }
  }), ne.hrefNormalized || oe.each(["href", "src"], function(e, t) {
    oe.propHooks[t] = {
      get: function(e) {
        return e.getAttribute(t, 4)
      }
    }
  }), ne.optSelected || (oe.propHooks.selected = {
    get: function(e) {
      var t = e.parentNode;
      return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
    }
  }), oe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    oe.propFix[this.toLowerCase()] = this
  }), ne.enctype || (oe.propFix.enctype = "encoding");
  var At = /[\t\r\n\f]/g;
  oe.fn.extend({
    addClass: function(e) {
      var t, n, i, o, r, s, a = 0,
        l = this.length,
        c = "string" == typeof e && e;
      if (oe.isFunction(e)) return this.each(function(t) {
        oe(this).addClass(e.call(this, t, this.className))
      });
      if (c)
        for (t = (e || "").match(ye) || []; l > a; a++)
          if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(At, " ") : " ")) {
            for (r = 0; o = t[r++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
            s = oe.trim(i), n.className !== s && (n.className = s)
          } return this
    },
    removeClass: function(e) {
      var t, n, i, o, r, s, a = 0,
        l = this.length,
        c = 0 === arguments.length || "string" == typeof e && e;
      if (oe.isFunction(e)) return this.each(function(t) {
        oe(this).removeClass(e.call(this, t, this.className))
      });
      if (c)
        for (t = (e || "").match(ye) || []; l > a; a++)
          if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(At, " ") : "")) {
            for (r = 0; o = t[r++];)
              for (; i.indexOf(" " + o + " ") >= 0;) i = i.replace(" " + o + " ", " ");
            s = e ? oe.trim(i) : "", n.className !== s && (n.className = s)
          } return this
    },
    toggleClass: function(e, t) {
      var n = void 0 === e ? "undefined" : _typeof(e);
      return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(oe.isFunction(e) ? function(n) {
        oe(this).toggleClass(e.call(this, n, this.className, t), t)
      } : function() {
        if ("string" === n)
          for (var t, i = 0, o = oe(this), r = e.match(ye) || []; t = r[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
        else(n === ke || "boolean" === n) && (this.className && oe._data(this, "__className__", this.className), this.className = this.className || !1 === e ? "" : oe._data(this, "__className__") || "")
      })
    },
    hasClass: function(e) {
      for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
        if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(At, " ").indexOf(t) >= 0) return !0;
      return !1
    }
  }), oe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
    oe.fn[t] = function(e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
    }
  }), oe.fn.extend({
    hover: function(e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    },
    bind: function(e, t, n) {
      return this.on(e, null, t, n)
    },
    unbind: function(e, t) {
      return this.off(e, null, t)
    },
    delegate: function(e, t, n, i) {
      return this.on(t, e, n, i)
    },
    undelegate: function(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }
  });
  var Nt = oe.now(),
    jt = /\?/,
    Lt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  oe.parseJSON = function(t) {
    if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
    var n, i = null,
      o = oe.trim(t + "");
    return o && !oe.trim(o.replace(Lt, function(e, t, o, r) {
      return n && t && (i = 0), 0 === i ? e : (n = o || t, i += !r - !o, "")
    })) ? Function("return " + o)() : oe.error("Invalid JSON: " + t)
  }, oe.parseXML = function(t) {
    var n, i;
    if (!t || "string" != typeof t) return null;
    try {
      e.DOMParser ? (i = new DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
    } catch (e) {
      n = void 0
    }
    return n && n.documentElement && !n.getElementsByTagName("parsererror").length || oe.error("Invalid XML: " + t), n
  };
  var Ht, Dt, Ot = /#.*$/,
    Mt = /([?&])_=[^&]*/,
    _t = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Pt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    qt = /^(?:GET|HEAD)$/,
    zt = /^\/\//,
    Ft = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Wt = {},
    It = {},
    Bt = "*/".concat("*");
  try {
    Dt = location.href
  } catch (e) {
    Dt = he.createElement("a"), Dt.href = "", Dt = Dt.href
  }
  Ht = Ft.exec(Dt.toLowerCase()) || [], oe.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Dt,
      type: "GET",
      isLocal: Pt.test(Ht[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Bt,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": oe.parseJSON,
        "text xml": oe.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(e, t) {
      return t ? W(W(e, oe.ajaxSettings), t) : W(oe.ajaxSettings, e)
    },
    ajaxPrefilter: z(Wt),
    ajaxTransport: z(It),
    ajax: function(e, t) {
      function n(e, t, n, i) {
        var o, d, m, y, w, k = t;
        2 !== b && (b = 2, a && clearTimeout(a), c = void 0, s = i || "", x.readyState = e > 0 ? 4 : 0, o = e >= 200 && 300 > e || 304 === e, n && (y = I(u, x, n)), y = B(u, y, x, o), o ? (u.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (oe.lastModified[r] = w), (w = x.getResponseHeader("etag")) && (oe.etag[r] = w)), 204 === e || "HEAD" === u.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = y.state, d = y.data, m = y.error, o = !m)) : (m = k, (e || !k) && (k = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (t || k) + "", o ? h.resolveWith(p, [d, k, x]) : h.rejectWith(p, [x, k, m]), x.statusCode(g), g = void 0, l && f.trigger(o ? "ajaxSuccess" : "ajaxError", [x, u, o ? d : m]), v.fireWith(p, [x, k]), l && (f.trigger("ajaxComplete", [x, u]), --oe.active || oe.event.trigger("ajaxStop")))
      }
      "object" == (void 0 === e ? "undefined" : _typeof(e)) && (t = e, e = void 0), t = t || {};
      var i, o, r, s, a, l, c, d, u = oe.ajaxSetup({}, t),
        p = u.context || u,
        f = u.context && (p.nodeType || p.jquery) ? oe(p) : oe.event,
        h = oe.Deferred(),
        v = oe.Callbacks("once memory"),
        g = u.statusCode || {},
        m = {},
        y = {},
        b = 0,
        w = "canceled",
        x = {
          readyState: 0,
          getResponseHeader: function(e) {
            var t;
            if (2 === b) {
              if (!d)
                for (d = {}; t = _t.exec(s);) d[t[1].toLowerCase()] = t[2];
              t = d[e.toLowerCase()]
            }
            return null == t ? null : t
          },
          getAllResponseHeaders: function() {
            return 2 === b ? s : null
          },
          setRequestHeader: function(e, t) {
            var n = e.toLowerCase();
            return b || (e = y[n] = y[n] || e, m[e] = t), this
          },
          overrideMimeType: function(e) {
            return b || (u.mimeType = e), this
          },
          statusCode: function(e) {
            var t;
            if (e)
              if (2 > b)
                for (t in e) g[t] = [g[t], e[t]];
              else x.always(e[x.status]);
            return this
          },
          abort: function(e) {
            var t = e || w;
            return c && c.abort(t), n(0, t), this
          }
        };
      if (h.promise(x).complete = v.add, x.success = x.done, x.error = x.fail, u.url = ((e || u.url || Dt) + "").replace(Ot, "").replace(zt, Ht[1] + "//"), u.type = t.method || t.type || u.method || u.type, u.dataTypes = oe.trim(u.dataType || "*").toLowerCase().match(ye) || [""], null == u.crossDomain && (i = Ft.exec(u.url.toLowerCase()), u.crossDomain = !(!i || i[1] === Ht[1] && i[2] === Ht[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Ht[3] || ("http:" === Ht[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = oe.param(u.data, u.traditional)), F(Wt, u, t, x), 2 === b) return x;
      l = u.global, l && 0 == oe.active++ && oe.event.trigger("ajaxStart"), u.type = u.type.toUpperCase(), u.hasContent = !qt.test(u.type), r = u.url, u.hasContent || (u.data && (r = u.url += (jt.test(r) ? "&" : "?") + u.data, delete u.data), !1 === u.cache && (u.url = Mt.test(r) ? r.replace(Mt, "$1_=" + Nt++) : r + (jt.test(r) ? "&" : "?") + "_=" + Nt++)), u.ifModified && (oe.lastModified[r] && x.setRequestHeader("If-Modified-Since", oe.lastModified[r]), oe.etag[r] && x.setRequestHeader("If-None-Match", oe.etag[r])), (u.data && u.hasContent && !1 !== u.contentType || t.contentType) && x.setRequestHeader("Content-Type", u.contentType), x.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + Bt + "; q=0.01" : "") : u.accepts["*"]);
      for (o in u.headers) x.setRequestHeader(o, u.headers[o]);
      if (u.beforeSend && (!1 === u.beforeSend.call(p, x, u) || 2 === b)) return x.abort();
      w = "abort";
      for (o in {
        success: 1,
        error: 1,
        complete: 1
      }) x[o](u[o]);
      if (c = F(It, u, t, x)) {
        x.readyState = 1, l && f.trigger("ajaxSend", [x, u]), u.async && u.timeout > 0 && (a = setTimeout(function() {
          x.abort("timeout")
        }, u.timeout));
        try {
          b = 1, c.send(m, n)
        } catch (e) {
          if (!(2 > b)) throw e;
          n(-1, e)
        }
      } else n(-1, "No Transport");
      return x
    },
    getJSON: function(e, t, n) {
      return oe.get(e, t, n, "json")
    },
    getScript: function(e, t) {
      return oe.get(e, void 0, t, "script")
    }
  }), oe.each(["get", "post"], function(e, t) {
    oe[t] = function(e, n, i, o) {
      return oe.isFunction(n) && (o = o || i, i = n, n = void 0), oe.ajax({
        url: e,
        type: t,
        dataType: o,
        data: n,
        success: i
      })
    }
  }), oe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
    oe.fn[t] = function(e) {
      return this.on(t, e)
    }
  }), oe._evalUrl = function(e) {
    return oe.ajax({
      url: e,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      throws: !0
    })
  }, oe.fn.extend({
    wrapAll: function(e) {
      if (oe.isFunction(e)) return this.each(function(t) {
        oe(this).wrapAll(e.call(this, t))
      });
      if (this[0]) {
        var t = oe(e, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
          for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
          return e
        }).append(this)
      }
      return this
    },
    wrapInner: function(e) {
      return this.each(oe.isFunction(e) ? function(t) {
        oe(this).wrapInner(e.call(this, t))
      } : function() {
        var t = oe(this),
          n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e)
      })
    },
    wrap: function(e) {
      var t = oe.isFunction(e);
      return this.each(function(n) {
        oe(this).wrapAll(t ? e.call(this, n) : e)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        oe.nodeName(this, "body") || oe(this).replaceWith(this.childNodes)
      }).end()
    }
  }), oe.expr.filters.hidden = function(e) {
    return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || oe.css(e, "display"))
  }, oe.expr.filters.visible = function(e) {
    return !oe.expr.filters.hidden(e)
  };
  var Rt = /%20/g,
    Xt = /\[\]$/,
    Ut = /\r?\n/g,
    Yt = /^(?:submit|button|image|reset|file)$/i,
    Vt = /^(?:input|select|textarea|keygen)/i;
  oe.param = function(e, t) {
    var n, i = [],
      o = function(e, t) {
        t = oe.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
      };
    if (void 0 === t && (t = oe.ajaxSettings && oe.ajaxSettings.traditional), oe.isArray(e) || e.jquery && !oe.isPlainObject(e)) oe.each(e, function() {
      o(this.name, this.value)
    });
    else
      for (n in e) R(n, e[n], t, o);
    return i.join("&").replace(Rt, "+")
  }, oe.fn.extend({
    serialize: function() {
      return oe.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var e = oe.prop(this, "elements");
        return e ? oe.makeArray(e) : this
      }).filter(function() {
        var e = this.type;
        return this.name && !oe(this).is(":disabled") && Vt.test(this.nodeName) && !Yt.test(e) && (this.checked || !Ne.test(e))
      }).map(function(e, t) {
        var n = oe(this).val();
        return null == n ? null : oe.isArray(n) ? oe.map(n, function(e) {
          return {
            name: t.name,
            value: e.replace(Ut, "\r\n")
          }
        }) : {
          name: t.name,
          value: n.replace(Ut, "\r\n")
        }
      }).get()
    }
  }), oe.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || U()
  } : X;
  var Gt = 0,
    Jt = {},
    Qt = oe.ajaxSettings.xhr();
  e.ActiveXObject && oe(e).on("unload", function() {
    for (var e in Jt) Jt[e](void 0, !0)
  }), ne.cors = !!Qt && "withCredentials" in Qt, (Qt = ne.ajax = !!Qt) && oe.ajaxTransport(function(e) {
    if (!e.crossDomain || ne.cors) {
      var t;
      return {
        send: function(n, i) {
          var o, r = e.xhr(),
            s = ++Gt;
          if (r.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
            for (o in e.xhrFields) r[o] = e.xhrFields[o];
          e.mimeType && r.overrideMimeType && r.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
          for (o in n) void 0 !== n[o] && r.setRequestHeader(o, n[o] + "");
          r.send(e.hasContent && e.data || null), t = function(n, o) {
            var a, l, c;
            if (t && (o || 4 === r.readyState))
              if (delete Jt[s], t = void 0, r.onreadystatechange = oe.noop, o) 4 !== r.readyState && r.abort();
              else {
                c = {}, a = r.status, "string" == typeof r.responseText && (c.text = r.responseText);
                try {
                  l = r.statusText
                } catch (e) {
                  l = ""
                }
                a || !e.isLocal || e.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
              } c && i(a, l, c, r.getAllResponseHeaders())
          }, e.async ? 4 === r.readyState ? setTimeout(t) : r.onreadystatechange = Jt[s] = t : t()
        },
        abort: function() {
          t && t(void 0, !0)
        }
      }
    }
  }), oe.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function(e) {
        return oe.globalEval(e), e
      }
    }
  }), oe.ajaxPrefilter("script", function(e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
  }), oe.ajaxTransport("script", function(e) {
    if (e.crossDomain) {
      var t, n = he.head || oe("head")[0] || he.documentElement;
      return {
        send: function(i, o) {
          t = he.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
            (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || o(200, "success"))
          }, n.insertBefore(t, n.firstChild)
        },
        abort: function() {
          t && t.onload(void 0, !0)
        }
      }
    }
  });
  var Kt = [],
    Zt = /(=)\?(?=&|$)|\?\?/;
  oe.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var e = Kt.pop() || oe.expando + "_" + Nt++;
      return this[e] = !0, e
    }
  }), oe.ajaxPrefilter("json jsonp", function(t, n, i) {
    var o, r, s, a = !1 !== t.jsonp && (Zt.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Zt.test(t.data) && "data");
    return a || "jsonp" === t.dataTypes[0] ? (o = t.jsonpCallback = oe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Zt, "$1" + o) : !1 !== t.jsonp && (t.url += (jt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
      return s || oe.error(o + " was not called"), s[0]
    }, t.dataTypes[0] = "json", r = e[o], e[o] = function() {
      s = arguments
    }, i.always(function() {
      e[o] = r, t[o] && (t.jsonpCallback = n.jsonpCallback, Kt.push(o)), s && oe.isFunction(r) && r(s[0]), s = r = void 0
    }), "script") : void 0
  }), oe.parseHTML = function(e, t, n) {
    if (!e || "string" != typeof e) return null;
    "boolean" == typeof t && (n = t, t = !1), t = t || he;
    var i = ue.exec(e),
      o = !n && [];
    return i ? [t.createElement(i[1])] : (i = oe.buildFragment([e], t, o), o && o.length && oe(o).remove(), oe.merge([], i.childNodes))
  };
  var en = oe.fn.load;
  oe.fn.load = function(e, t, n) {
    if ("string" != typeof e && en) return en.apply(this, arguments);
    var i, o, r, s = this,
      a = e.indexOf(" ");
    return a >= 0 && (i = oe.trim(e.slice(a, e.length)), e = e.slice(0, a)), oe.isFunction(t) ? (n = t, t = void 0) : t && "object" == (void 0 === t ? "undefined" : _typeof(t)) && (r = "POST"), s.length > 0 && oe.ajax({
      url: e,
      type: r,
      dataType: "html",
      data: t
    }).done(function(e) {
      o = arguments, s.html(i ? oe("<div>").append(oe.parseHTML(e)).find(i) : e)
    }).complete(n && function(e, t) {
      s.each(n, o || [e.responseText, t, e])
    }), this
  }, oe.expr.filters.animated = function(e) {
    return oe.grep(oe.timers, function(t) {
      return e === t.elem
    }).length
  };
  var tn = e.document.documentElement;
  oe.offset = {
    setOffset: function(e, t, n) {
      var i, o, r, s, a, l, c, d = oe.css(e, "position"),
        u = oe(e),
        p = {};
      "static" === d && (e.style.position = "relative"), a = u.offset(), r = oe.css(e, "top"), l = oe.css(e, "left"), c = ("absolute" === d || "fixed" === d) && oe.inArray("auto", [r, l]) > -1, c ? (i = u.position(), s = i.top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), oe.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (p.top = t.top - a.top + s), null != t.left && (p.left = t.left - a.left + o), "using" in t ? t.using.call(e, p) : u.css(p)
    }
  }, oe.fn.extend({
    offset: function(e) {
      if (arguments.length) return void 0 === e ? this : this.each(function(t) {
        oe.offset.setOffset(this, e, t)
      });
      var t, n, i = {
          top: 0,
          left: 0
        },
        o = this[0],
        r = o && o.ownerDocument;
      return r ? (t = r.documentElement, oe.contains(t, o) ? (_typeof(o.getBoundingClientRect) !== ke && (i = o.getBoundingClientRect()), n = Y(r), {
        top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
        left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
      }) : i) : void 0
    },
    position: function() {
      if (this[0]) {
        var e, t, n = {
            top: 0,
            left: 0
          },
          i = this[0];
        return "fixed" === oe.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), oe.nodeName(e[0], "html") || (n = e.offset()), n.top += oe.css(e[0], "borderTopWidth", !0), n.left += oe.css(e[0], "borderLeftWidth", !0)), {
          top: t.top - n.top - oe.css(i, "marginTop", !0),
          left: t.left - n.left - oe.css(i, "marginLeft", !0)
        }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        for (var e = this.offsetParent || tn; e && !oe.nodeName(e, "html") && "static" === oe.css(e, "position");) e = e.offsetParent;
        return e || tn
      })
    }
  }), oe.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(e, t) {
    var n = /Y/.test(t);
    oe.fn[e] = function(i) {
      return Ae(this, function(e, i, o) {
        var r = Y(e);
        return void 0 === o ? r ? t in r ? r[t] : r.document.documentElement[i] : e[i] : void(r ? r.scrollTo(n ? oe(r).scrollLeft() : o, n ? o : oe(r).scrollTop()) : e[i] = o)
      }, e, i, arguments.length, null)
    }
  }), oe.each(["top", "left"], function(e, t) {
    oe.cssHooks[t] = $(ne.pixelPosition, function(e, n) {
      return n ? (n = et(e, t), nt.test(n) ? oe(e).position()[t] + "px" : n) : void 0
    })
  }), oe.each({
    Height: "height",
    Width: "width"
  }, function(e, t) {
    oe.each({
      padding: "inner" + e,
      content: t,
      "": "outer" + e
    }, function(n, i) {
      oe.fn[i] = function(i, o) {
        var r = arguments.length && (n || "boolean" != typeof i),
          s = n || (!0 === i || !0 === o ? "margin" : "border");
        return Ae(this, function(t, n, i) {
          var o;
          return oe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? oe.css(t, n, s) : oe.style(t, n, i, s)
        }, t, r ? i : void 0, r, null)
      }
    })
  }), oe.fn.size = function() {
    return this.length
  }, oe.fn.andSelf = oe.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
    return oe
  });
  var nn = e.jQuery,
    on = e.$;
  return oe.noConflict = function(t) {
    return e.$ === oe && (e.$ = on), t && e.jQuery === oe && (e.jQuery = nn), oe
  }, (void 0 === t ? "undefined" : _typeof(t)) === ke && (e.jQuery = e.$ = oe), oe
}),
  function(e) {
    var t = {
        type: "html",
        content: "",
        url: "",
        ajax: {},
        ajax_request: null,
        closeOnEsc: !0,
        closeOnOverlayClick: !0,
        clone: !1,
        overlay: {
          block: void 0,
          tpl: '<div class="arcticmodal-overlay"></div>',
          css: {
            backgroundColor: "#000",
            opacity: .6
          }
        },
        container: {
          block: void 0
        },
        wrap: void 0,
        body: void 0,
        errors: {
          tpl: '<div class="arcticmodal-error arcticmodal-close"></div>',
          autoclose_delay: 2e3,
          ajax_unsuccessful_load: "Error"
        },
        openEffect: {
          type: "fade",
          speed: 200
        },
        closeEffect: {
          type: "fade",
          speed: 200
        },
        beforeOpen: e.noop,
        afterOpen: e.noop,
        beforeClose: e.noop,
        afterClose: e.noop,
        afterLoading: e.noop,
        afterLoadingOnShow: e.noop,
        errorLoading: e.noop
      },
      n = 0,
      i = e([]),
      o = {
        getParentEl: function(t) {
          var n = e(t);
          return n.data("arcticmodal") ? n : (n = e(t).closest(".arcticmodal-container").data("arcticmodalParentEl")) || !1
        },
        transition: function(t, n, i, o) {
          switch (o = void 0 == o ? e.noop : o, i.type) {
            case "fade":
              "show" == n ? t.fadeIn(i.speed, o) : t.fadeOut(i.speed, o);
              break;
            case "none":
              "show" == n ? t.show() : t.hide(), o()
          }
        },
        prepare_body: function(t, n) {
          e(".arcticmodal-close", n).unbind("click.arcticmodal").bind("click.arcticmodal", function() {
            return n.arcticmodal("close"), !1
          })
        },
        init_el: function(t, s) {
          var a = t.data("arcticmodal");
          if (!a) {
            n++, (a = s).modalID = n, a.overlay.block = e(a.overlay.tpl), a.overlay.block.css(a.overlay.css), a.container.block = t, a.body = e(".arcticmodal-container_table", a.container.block), o.prepare_body(a, t);
            var l = t.closest(".arcticmodal-container");
            if (a.closeOnOverlayClick && e(l).click(function(e) {
              0 === t.has(e.target).length && t.arcticmodal("close")
            }), a.container.block.data("arcticmodalParentEl", t), t.data("arcticmodal", a), i = e.merge(i, t), e.proxy(r.show, t)(), "html" == a.type) return t;
            if (void 0 != a.ajax.beforeSend) {
              var c = a.ajax.beforeSend;
              delete a.ajax.beforeSend
            }
            if (void 0 != a.ajax.success) {
              var d = a.ajax.success;
              delete a.ajax.success
            }
            if (void 0 != a.ajax.error) {
              var u = a.ajax.error;
              delete a.ajax.error
            }
            var p = e.extend(!0, {
              url: a.url,
              beforeSend: function() {
                void 0 == c ? a.body.html('<div class="arcticmodal-loading" />') : c(a, t)
              },
              success: function(e) {
                t.trigger("afterLoading"), a.afterLoading(a, t, e), void 0 == d ? a.body.html(e) : d(a, t, e), o.prepare_body(a, t), t.trigger("afterLoadingOnShow"), a.afterLoadingOnShow(a, t, e)
              },
              error: function() {
                t.trigger("errorLoading"), a.errorLoading(a, t), void 0 == u ? (a.body.html(a.errors.tpl), e(".arcticmodal-error", a.body).html(a.errors.ajax_unsuccessful_load), e(".arcticmodal-close", a.body).click(function() {
                  return t.arcticmodal("close"), !1
                }), a.errors.autoclose_delay && setTimeout(function() {
                  t.arcticmodal("close")
                }, a.errors.autoclose_delay)) : u(a, t)
              }
            }, a.ajax);
            a.ajax_request = e.ajax(p), t.data("arcticmodal", a)
          }
        },
        init: function(n) {
          if (!e(this).is(":visible")) {
            if (n = e.extend(!0, {}, t, n), !e.isFunction(this)) return this.each(function() {
              o.init_el(e(this), e.extend(!0, {}, n))
            });
            if (void 0 != n)
              if ("" != n.type) switch (n.type) {
                case "html":
                  if ("" == n.content) return void e.error('jquery.arcticmodal: Don\'t set parameter "content"');
                  var i = n.content;
                  return n.content = "", o.init_el(e(i), n);
                case "ajax":
                  return "" == n.url ? void e.error('jquery.arcticmodal: Don\'t set parameter "url"') : o.init_el(e("<div />"), n)
              } else e.error('jquery.arcticmodal: Don\'t set parameter "type"');
            else e.error("jquery.arcticmodal: Uncorrect parameters")
          }
        }
      },
      r = {
        show: function() {
          var t = o.getParentEl(this);
          if (!1 !== t) {
            var n = t.data("arcticmodal"),
              r = n.container.block.closest(".arcticmodal-container");
            if (n.overlay.block.hide(), r.hide(), r.before(n.overlay.block), n.beforeOpen(n, t), t.trigger("beforeOpen"), "hidden" !== n.wrap.css("overflow")) {
              n.wrap.data("arcticmodalOverflow", n.wrap.css("overflow"));
              var s = n.wrap.outerWidth(!0);
              n.wrap.css("overflow", "hidden");
              var a = n.wrap.outerWidth(!0);
              a !== s && n.wrap.css("marginRight", a - s + "px")
            }
            return i.not(t).each(function() {
              var t = e(this).closest(".arcticmodal-container"),
                n = t.css("z-index"),
                i = --n;
              t.css("z-index", i), t.prev(".arcticmodal-overlay").css("z-index", i)
            }), i.not(t).each(function() {
              e(this).data("arcticmodal").overlay.block.closest(".arcticmodal-container").hide()
            }), o.transition(n.overlay.block, "show", i.length > 1 ? {
              type: "none"
            } : n.openEffect), o.transition(r, "show", i.length > 1 ? {
              type: "none"
            } : n.openEffect, function() {
              n.afterOpen(n, t), t.trigger("afterOpen"), e(window).trigger("arcticmodal.afterOpen")
            }), t
          }
          e.error("jquery.arcticmodal: Uncorrect call")
        },
        close: function() {
          if (!e.isFunction(this)) return this.each(function() {
            var t = o.getParentEl(this);
            if (!1 !== t) {
              var n = t.data("arcticmodal"),
                r = n.container.block.closest(".arcticmodal-container");
              !1 !== n.beforeClose(n, t) && (t.trigger("beforeClose"), r.css("z-index", ""), r.prev(".arcticmodal-overlay").css("z-index", ""), o.transition(n.overlay.block, "hide", n.closeEffect), o.transition(r, "hide", n.closeEffect, function() {
                n.afterClose(n, t), t.trigger("afterClose"), e(window).trigger("arcticmodal.afterClose"), n.clone || e("#arcticmodalReserve" + n.modalID).replaceWith(n.body.find(">*")), n.overlay.block.remove(), t.data("arcticmodal", null), e(".arcticmodal-container").length >= 1 && (n.wrap.data("arcticmodalOverflow") && n.wrap.css("overflow", n.wrap.data("arcticmodalOverflow")), n.wrap.css("marginRight", 0))
              }), "ajax" === n.type && n.ajax_request.abort(), i = i.not(t))
            } else e.error("jquery.arcticmodal: Uncorrect call")
          });
          i.each(function() {
            e(this).arcticmodal("close")
          })
        },
        setDefault: function(n) {
          e.extend(!0, t, n)
        }
      };
    e(function() {
      t.wrap = e(document.all && !document.querySelector ? "html" : "body")
    }), e(document).bind("keyup.arcticmodal", function(e) {
      var t = i.last();
      t.length && t.data("arcticmodal").closeOnEsc && 27 === e.keyCode && t.arcticmodal("close")
    }), e.arcticmodal = e.fn.arcticmodal = function(t) {
      return r[t] ? r[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != (void 0 === t ? "undefined" : _typeof(t)) && t ? void e.error("jquery.arcticmodal: Method " + t + " does not exist") : o.init.apply(this, arguments)
    }
  }(jQuery),
  function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
  }(function(e) {
    "use strict";
    var t = window.Slick || {};
    t = function() {
      function t(t, i) {
        var o, r = this;
        r.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: e(t),
          appendDots: e(t),
          arrows: !0,
          asNavFor: null,
          prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function(t, n) {
            return e('<button type="button" />').text(n + 1)
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: .35,
          fade: !1,
          focusOnSelect: !1,
          focusOnChange: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3
        }, r.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1
        }, e.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.focussed = !1, r.interrupted = !1, r.hidden = "hidden", r.paused = !0, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = e(t), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, o = e(t).data("slick") || {}, r.options = e.extend({}, r.defaults, i, o), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, void 0 !== document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = e.proxy(r.autoPlay, r), r.autoPlayClear = e.proxy(r.autoPlayClear, r), r.autoPlayIterator = e.proxy(r.autoPlayIterator, r), r.changeSlide = e.proxy(r.changeSlide, r), r.clickHandler = e.proxy(r.clickHandler, r), r.selectHandler = e.proxy(r.selectHandler, r), r.setPosition = e.proxy(r.setPosition, r), r.swipeHandler = e.proxy(r.swipeHandler, r), r.dragHandler = e.proxy(r.dragHandler, r), r.keyHandler = e.proxy(r.keyHandler, r), r.instanceUid = n++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0)
      }
      var n = 0;
      return t
    }(), t.prototype.activateADA = function() {
      this.$slideTrack.find(".slick-active").attr({
        "aria-hidden": "false"
      }).find("a, input, button, select").attr({
        tabindex: "0"
      })
    }, t.prototype.addSlide = t.prototype.slickAdd = function(t, n, i) {
      var o = this;
      if ("boolean" == typeof n) i = n, n = null;
      else if (n < 0 || n >= o.slideCount) return !1;
      o.unload(), "number" == typeof n ? 0 === n && 0 === o.$slides.length ? e(t).appendTo(o.$slideTrack) : i ? e(t).insertBefore(o.$slides.eq(n)) : e(t).insertAfter(o.$slides.eq(n)) : !0 === i ? e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(t, n) {
        e(n).attr("data-slick-index", t)
      }), o.$slidesCache = o.$slides, o.reinit()
    }, t.prototype.animateHeight = function() {
      var e = this;
      if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
        var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
        e.$list.animate({
          height: t
        }, e.options.speed)
      }
    }, t.prototype.animateSlide = function(t, n) {
      var i = {},
        o = this;
      o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (t = -t), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
        left: t
      }, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({
        top: t
      }, o.options.speed, o.options.easing, n) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), e({
        animStart: o.currentLeft
      }).animate({
        animStart: t
      }, {
        duration: o.options.speed,
        easing: o.options.easing,
        step: function(e) {
          e = Math.ceil(e), !1 === o.options.vertical ? (i[o.animType] = "translate(" + e + "px, 0px)", o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i))
        },
        complete: function() {
          n && n.call()
        }
      })) : (o.applyTransition(), t = Math.ceil(t), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(i), n && setTimeout(function() {
        o.disableTransition(), n.call()
      }, o.options.speed))
    }, t.prototype.getNavTarget = function() {
      var t = this,
        n = t.options.asNavFor;
      return n && null !== n && (n = e(n).not(t.$slider)), n
    }, t.prototype.asNavFor = function(t) {
      var n = this,
        i = n.getNavTarget();
      null !== i && "object" === (void 0 === i ? "undefined" : _typeof(i)) && i.each(function() {
        var n = e(this).slick("getSlick");
        n.unslicked || n.slideHandler(t, !0)
      })
    }, t.prototype.applyTransition = function(e) {
      var t = this,
        n = {};
      !1 === t.options.fade ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.autoPlay = function() {
      var e = this;
      e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, t.prototype.autoPlayClear = function() {
      var e = this;
      e.autoPlayTimer && clearInterval(e.autoPlayTimer)
    }, t.prototype.autoPlayIterator = function() {
      var e = this,
        t = e.currentSlide + e.options.slidesToScroll;
      e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
    }, t.prototype.buildArrows = function() {
      var t = this;
      !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
        "aria-disabled": "true",
        tabindex: "-1"
      }))
    }, t.prototype.buildDots = function() {
      var t, n, i = this;
      if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
        for (i.$slider.addClass("slick-dotted"), n = e("<ul />").addClass(i.options.dotsClass), t = 0; t <= i.getDotCount(); t += 1) n.append(e("<li />").append(i.options.customPaging.call(this, i, t)));
        i.$dots = n.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active")
      }
    }, t.prototype.buildOut = function() {
      var t = this;
      t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, n) {
        e(n).attr("data-slick-index", t).data("originalStyling", e(n).attr("style") || "")
      }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
    }, t.prototype.buildRows = function() {
      var e, t, n, i, o, r, s, a = this;
      if (i = document.createDocumentFragment(), r = a.$slider.children(), a.options.rows > 0) {
        for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(r.length / s), e = 0; e < o; e++) {
          var l = document.createElement("div");
          for (t = 0; t < a.options.rows; t++) {
            var c = document.createElement("div");
            for (n = 0; n < a.options.slidesPerRow; n++) {
              var d = e * s + (t * a.options.slidesPerRow + n);
              r.get(d) && c.appendChild(r.get(d))
            }
            l.appendChild(c)
          }
          i.appendChild(l)
        }
        a.$slider.empty().append(i), a.$slider.children().children().children().css({
          width: 100 / a.options.slidesPerRow + "%",
          display: "inline-block"
        })
      }
    }, t.prototype.checkResponsive = function(t, n) {
      var i, o, r, s = this,
        a = !1,
        l = s.$slider.width(),
        c = window.innerWidth || e(window).width();
      if ("window" === s.respondTo ? r = c : "slider" === s.respondTo ? r = l : "min" === s.respondTo && (r = Math.min(c, l)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
        o = null;
        for (i in s.breakpoints) s.breakpoints.hasOwnProperty(i) && (!1 === s.originalSettings.mobileFirst ? r < s.breakpoints[i] && (o = s.breakpoints[i]) : r > s.breakpoints[i] && (o = s.breakpoints[i]));
        null !== o ? null !== s.activeBreakpoint ? (o !== s.activeBreakpoint || n) && (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t), a = o), t || !1 === a || s.$slider.trigger("breakpoint", [s, a])
      }
    }, t.prototype.changeSlide = function(t, n) {
      var i, o, r, s = this,
        a = e(t.currentTarget);
      switch (a.is("a") && t.preventDefault(), a.is("li") || (a = a.closest("li")), r = s.slideCount % s.options.slidesToScroll != 0, i = r ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll, t.data.message) {
        case "previous":
          o = 0 === i ? s.options.slidesToScroll : s.options.slidesToShow - i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - o, !1, n);
          break;
        case "next":
          o = 0 === i ? s.options.slidesToScroll : i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + o, !1, n);
          break;
        case "index":
          var l = 0 === t.data.index ? 0 : t.data.index || a.index() * s.options.slidesToScroll;
          s.slideHandler(s.checkNavigable(l), !1, n), a.children().trigger("focus");
          break;
        default:
          return
      }
    }, t.prototype.checkNavigable = function(e) {
      var t, n, i = this;
      if (t = i.getNavigableIndexes(), n = 0, e > t[t.length - 1]) e = t[t.length - 1];
      else
        for (var o in t) {
          if (e < t[o]) {
            e = n;
            break
          }
          n = t[o]
        }
      return e
    }, t.prototype.cleanUpEvents = function() {
      var t = this;
      t.options.dots && null !== t.$dots && (e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.cleanUpSlideEvents = function() {
      var t = this;
      t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.cleanUpRows = function() {
      var e, t = this;
      t.options.rows > 0 && (e = t.$slides.children().children(), e.removeAttr("style"), t.$slider.empty().append(e))
    }, t.prototype.clickHandler = function(e) {
      !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
    }, t.prototype.destroy = function(t) {
      var n = this;
      n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), e(".slick-cloned", n.$slider).detach(), n.$dots && n.$dots.remove(), n.$prevArrow && n.$prevArrow.length && (n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length && (n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove()), n.$slides && (n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
        e(this).attr("style", e(this).data("originalStyling"))
      }), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(n.$slides)), n.cleanUpRows(), n.$slider.removeClass("slick-slider"), n.$slider.removeClass("slick-initialized"), n.$slider.removeClass("slick-dotted"), n.unslicked = !0, t || n.$slider.trigger("destroy", [n])
    }, t.prototype.disableTransition = function(e) {
      var t = this,
        n = {};
      n[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.fadeSlide = function(e, t) {
      var n = this;
      !1 === n.cssTransitions ? (n.$slides.eq(e).css({
        zIndex: n.options.zIndex
      }), n.$slides.eq(e).animate({
        opacity: 1
      }, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
        opacity: 1,
        zIndex: n.options.zIndex
      }), t && setTimeout(function() {
        n.disableTransition(e), t.call()
      }, n.options.speed))
    }, t.prototype.fadeSlideOut = function(e) {
      var t = this;
      !1 === t.cssTransitions ? t.$slides.eq(e).animate({
        opacity: 0,
        zIndex: t.options.zIndex - 2
      }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
        opacity: 0,
        zIndex: t.options.zIndex - 2
      }))
    }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
      var t = this;
      null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, t.prototype.focusHandler = function() {
      var t = this;
      t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(n) {
        n.stopImmediatePropagation();
        var i = e(this);
        setTimeout(function() {
          t.options.pauseOnFocus && (t.focussed = i.is(":focus"), t.autoPlay())
        }, 0)
      })
    }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
      return this.currentSlide
    }, t.prototype.getDotCount = function() {
      var e = this,
        t = 0,
        n = 0,
        i = 0;
      if (!0 === e.options.infinite)
        if (e.slideCount <= e.options.slidesToShow) ++i;
        else
          for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
      else if (!0 === e.options.centerMode) i = e.slideCount;
      else if (e.options.asNavFor)
        for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
      else i = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
      return i - 1
    }, t.prototype.getLeft = function(e) {
      var t, n, i, o, r = this,
        s = 0;
      return r.slideOffset = 0, n = r.$slides.first().outerHeight(!0), !0 === r.options.infinite ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = r.slideWidth * r.options.slidesToShow * -1, o = -1, !0 === r.options.vertical && !0 === r.options.centerMode && (2 === r.options.slidesToShow ? o = -1.5 : 1 === r.options.slidesToShow && (o = -2)), s = n * r.options.slidesToShow * o), r.slideCount % r.options.slidesToScroll != 0 && e + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (e > r.slideCount ? (r.slideOffset = (r.options.slidesToShow - (e - r.slideCount)) * r.slideWidth * -1, s = (r.options.slidesToShow - (e - r.slideCount)) * n * -1) : (r.slideOffset = r.slideCount % r.options.slidesToScroll * r.slideWidth * -1, s = r.slideCount % r.options.slidesToScroll * n * -1))) : e + r.options.slidesToShow > r.slideCount && (r.slideOffset = (e + r.options.slidesToShow - r.slideCount) * r.slideWidth, s = (e + r.options.slidesToShow - r.slideCount) * n), r.slideCount <= r.options.slidesToShow && (r.slideOffset = 0, s = 0), !0 === r.options.centerMode && r.slideCount <= r.options.slidesToShow ? r.slideOffset = r.slideWidth * Math.floor(r.options.slidesToShow) / 2 - r.slideWidth * r.slideCount / 2 : !0 === r.options.centerMode && !0 === r.options.infinite ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : !0 === r.options.centerMode && (r.slideOffset = 0, r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), t = !1 === r.options.vertical ? e * r.slideWidth * -1 + r.slideOffset : e * n * -1 + s, !0 === r.options.variableWidth && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, !0 === r.options.centerMode && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow + 1), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, t += (r.$list.width() - i.outerWidth()) / 2)), t
    }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
      return this.options[e]
    }, t.prototype.getNavigableIndexes = function() {
      var e, t = this,
        n = 0,
        i = 0,
        o = [];
      for (!1 === t.options.infinite ? e = t.slideCount : (n = -1 * t.options.slidesToScroll, i = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); n < e;) o.push(n), n = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
      return o
    }, t.prototype.getSlick = function() {
      return this
    }, t.prototype.getSlideCount = function() {
      var t, n, i = this;
      return n = !0 === i.options.centerMode ? i.slideWidth * Math.floor(i.options.slidesToShow / 2) : 0, !0 === i.options.swipeToSlide ? (i.$slideTrack.find(".slick-slide").each(function(o, r) {
        if (r.offsetLeft - n + e(r).outerWidth() / 2 > -1 * i.swipeLeft) return t = r, !1
      }), Math.abs(e(t).attr("data-slick-index") - i.currentSlide) || 1) : i.options.slidesToScroll
    }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
      this.changeSlide({
        data: {
          message: "index",
          index: parseInt(e)
        }
      }, t)
    }, t.prototype.init = function(t) {
      var n = this;
      e(n.$slider).hasClass("slick-initialized") || (e(n.$slider).addClass("slick-initialized"), n.buildRows(), n.buildOut(), n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(), n.updateArrows(), n.updateDots(), n.checkResponsive(!0), n.focusHandler()), t && n.$slider.trigger("init", [n]), !0 === n.options.accessibility && n.initADA(), n.options.autoplay && (n.paused = !1, n.autoPlay())
    }, t.prototype.initADA = function() {
      var t = this,
        n = Math.ceil(t.slideCount / t.options.slidesToShow),
        i = t.getNavigableIndexes().filter(function(e) {
          return e >= 0 && e < t.slideCount
        });
      t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
        "aria-hidden": "true",
        tabindex: "-1"
      }).find("a, input, button, select").attr({
        tabindex: "-1"
      }), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(n) {
        var o = i.indexOf(n);
        if (e(this).attr({
          role: "tabpanel",
          id: "slick-slide" + t.instanceUid + n,
          tabindex: -1
        }), -1 !== o) {
          var r = "slick-slide-control" + t.instanceUid + o;
          e("#" + r).length && e(this).attr({
            "aria-describedby": r
          })
        }
      }), t.$dots.attr("role", "tablist").find("li").each(function(o) {
        var r = i[o];
        e(this).attr({
          role: "presentation"
        }), e(this).find("button").first().attr({
          role: "tab",
          id: "slick-slide-control" + t.instanceUid + o,
          "aria-controls": "slick-slide" + t.instanceUid + r,
          "aria-label": o + 1 + " of " + n,
          "aria-selected": null,
          tabindex: "-1"
        })
      }).eq(t.currentSlide).find("button").attr({
        "aria-selected": "true",
        tabindex: "0"
      }).end());
      for (var o = t.currentSlide, r = o + t.options.slidesToShow; o < r; o++) t.options.focusOnChange ? t.$slides.eq(o).attr({
        tabindex: "0"
      }) : t.$slides.eq(o).removeAttr("tabindex");
      t.activateADA()
    }, t.prototype.initArrowEvents = function() {
      var e = this;
      !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
        message: "previous"
      }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
        message: "next"
      }, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
    }, t.prototype.initDotEvents = function() {
      var t = this;
      !0 === t.options.dots && t.slideCount > t.options.slidesToShow && (e("li", t.$dots).on("click.slick", {
        message: "index"
      }, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.initSlideEvents = function() {
      var t = this;
      t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
    }, t.prototype.initializeEvents = function() {
      var t = this;
      t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
        action: "start"
      }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
        action: "move"
      }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
        action: "end"
      }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
        action: "end"
      }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(t.setPosition)
    }, t.prototype.initUI = function() {
      var e = this;
      !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }, t.prototype.keyHandler = function(e) {
      var t = this;
      e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
        data: {
          message: !0 === t.options.rtl ? "next" : "previous"
        }
      }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
        data: {
          message: !0 === t.options.rtl ? "previous" : "next"
        }
      }))
    }, t.prototype.lazyLoad = function() {
      function t(t) {
        e("img[data-lazy]", t).each(function() {
          var t = e(this),
            n = e(this).attr("data-lazy"),
            i = e(this).attr("data-srcset"),
            o = e(this).attr("data-sizes") || s.$slider.attr("data-sizes"),
            r = document.createElement("img");
          r.onload = function() {
            t.animate({
              opacity: 0
            }, 100, function() {
              i && (t.attr("srcset", i), o && t.attr("sizes", o)), t.attr("src", n).animate({
                opacity: 1
              }, 200, function() {
                t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
              }), s.$slider.trigger("lazyLoaded", [s, t, n])
            })
          }, r.onerror = function() {
            t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, t, n])
          }, r.src = n
        })
      }
      var n, i, o, r, s = this;
      if (!0 === s.options.centerMode ? !0 === s.options.infinite ? (o = s.currentSlide + (s.options.slidesToShow / 2 + 1), r = o + s.options.slidesToShow + 2) : (o = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), r = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (o = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, r = Math.ceil(o + s.options.slidesToShow), !0 === s.options.fade && (o > 0 && o--, r <= s.slideCount && r++)), n = s.$slider.find(".slick-slide").slice(o, r), "anticipated" === s.options.lazyLoad)
        for (var a = o - 1, l = r, c = s.$slider.find(".slick-slide"), d = 0; d < s.options.slidesToScroll; d++) a < 0 && (a = s.slideCount - 1), n = n.add(c.eq(a)), n = n.add(c.eq(l)), a--, l++;
      t(n), s.slideCount <= s.options.slidesToShow ? (i = s.$slider.find(".slick-slide"), t(i)) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? (i = s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow), t(i)) : 0 === s.currentSlide && (i = s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow), t(i))
    }, t.prototype.loadSlider = function() {
      var e = this;
      e.setPosition(), e.$slideTrack.css({
        opacity: 1
      }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, t.prototype.next = t.prototype.slickNext = function() {
      this.changeSlide({
        data: {
          message: "next"
        }
      })
    }, t.prototype.orientationChange = function() {
      var e = this;
      e.checkResponsive(), e.setPosition()
    }, t.prototype.pause = t.prototype.slickPause = function() {
      var e = this;
      e.autoPlayClear(), e.paused = !0
    }, t.prototype.play = t.prototype.slickPlay = function() {
      var e = this;
      e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
    }, t.prototype.postSlide = function(t) {
      var n = this;
      if (!n.unslicked && (n.$slider.trigger("afterChange", [n, t]), n.animating = !1, n.slideCount > n.options.slidesToShow && n.setPosition(), n.swipeLeft = null, n.options.autoplay && n.autoPlay(), !0 === n.options.accessibility && (n.initADA(), n.options.focusOnChange))) {
        e(n.$slides.get(n.currentSlide)).attr("tabindex", 0).focus()
      }
    }, t.prototype.prev = t.prototype.slickPrev = function() {
      this.changeSlide({
        data: {
          message: "previous"
        }
      })
    }, t.prototype.preventDefault = function(e) {
      e.preventDefault()
    }, t.prototype.progressiveLazyLoad = function(t) {
      t = t || 1;
      var n, i, o, r, s, a = this,
        l = e("img[data-lazy]", a.$slider);
      l.length ? (n = l.first(), i = n.attr("data-lazy"), o = n.attr("data-srcset"), r = n.attr("data-sizes") || a.$slider.attr("data-sizes"), s = document.createElement("img"), s.onload = function() {
        o && (n.attr("srcset", o), r && n.attr("sizes", r)), n.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, n, i]), a.progressiveLazyLoad()
      }, s.onerror = function() {
        t < 3 ? setTimeout(function() {
          a.progressiveLazyLoad(t + 1)
        }, 500) : (n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, n, i]), a.progressiveLazyLoad())
      }, s.src = i) : a.$slider.trigger("allImagesLoaded", [a])
    }, t.prototype.refresh = function(t) {
      var n, i, o = this;
      i = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > i && (o.currentSlide = i), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), n = o.currentSlide, o.destroy(!0), e.extend(o, o.initials, {
        currentSlide: n
      }), o.init(), t || o.changeSlide({
        data: {
          message: "index",
          index: n
        }
      }, !1)
    }, t.prototype.registerBreakpoints = function() {
      var t, n, i, o = this,
        r = o.options.responsive || null;
      if ("array" === e.type(r) && r.length) {
        o.respondTo = o.options.respondTo || "window";
        for (t in r)
          if (i = o.breakpoints.length - 1, r.hasOwnProperty(t)) {
            for (n = r[t].breakpoint; i >= 0;) o.breakpoints[i] && o.breakpoints[i] === n && o.breakpoints.splice(i, 1), i--;
            o.breakpoints.push(n), o.breakpointSettings[n] = r[t].settings
          } o.breakpoints.sort(function(e, t) {
          return o.options.mobileFirst ? e - t : t - e
        })
      }
    }, t.prototype.reinit = function() {
      var t = this;
      t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
    }, t.prototype.resize = function() {
      var t = this;
      e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
        t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
      }, 50))
    }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, n) {
      var i = this;
      if ("boolean" == typeof e ? (t = e, e = !0 === t ? 0 : i.slideCount - 1) : e = !0 === t ? --e : e, i.slideCount < 1 || e < 0 || e > i.slideCount - 1) return !1;
      i.unload(), !0 === n ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, i.reinit()
    }, t.prototype.setCSS = function(e) {
      var t, n, i = this,
        o = {};
      !0 === i.options.rtl && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, !1 === i.transformsEnabled ? i.$slideTrack.css(o) : (o = {}, !1 === i.cssTransitions ? (o[i.animType] = "translate(" + t + ", " + n + ")", i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack.css(o)))
    }, t.prototype.setDimensions = function() {
      var e = this;
      !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
        padding: "0px " + e.options.centerPadding
      }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
        padding: e.options.centerPadding + " 0px"
      })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
      var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
      !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }, t.prototype.setFade = function() {
      var t, n = this;
      n.$slides.each(function(i, o) {
        t = n.slideWidth * i * -1, !0 === n.options.rtl ? e(o).css({
          position: "relative",
          right: t,
          top: 0,
          zIndex: n.options.zIndex - 2,
          opacity: 0
        }) : e(o).css({
          position: "relative",
          left: t,
          top: 0,
          zIndex: n.options.zIndex - 2,
          opacity: 0
        })
      }), n.$slides.eq(n.currentSlide).css({
        zIndex: n.options.zIndex - 1,
        opacity: 1
      })
    }, t.prototype.setHeight = function() {
      var e = this;
      if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
        var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
        e.$list.css("height", t)
      }
    }, t.prototype.setOption = t.prototype.slickSetOption = function() {
      var t, n, i, o, r, s = this,
        a = !1;
      if ("object" === e.type(arguments[0]) ? (i = arguments[0], a = arguments[1], r = "multiple") : "string" === e.type(arguments[0]) && (i = arguments[0], o = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? r = "responsive" : void 0 !== arguments[1] && (r = "single")), "single" === r) s.options[i] = o;
      else if ("multiple" === r) e.each(i, function(e, t) {
        s.options[e] = t
      });
      else if ("responsive" === r)
        for (n in o)
          if ("array" !== e.type(s.options.responsive)) s.options.responsive = [o[n]];
          else {
            for (t = s.options.responsive.length - 1; t >= 0;) s.options.responsive[t].breakpoint === o[n].breakpoint && s.options.responsive.splice(t, 1), t--;
            s.options.responsive.push(o[n])
          } a && (s.unload(), s.reinit())
    }, t.prototype.setPosition = function() {
      var e = this;
      e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, t.prototype.setProps = function() {
      var e = this,
        t = document.body.style;
      e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }, t.prototype.setSlideClasses = function(e) {
      var t, n, i, o, r = this;
      if (n = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(e).addClass("slick-current"), !0 === r.options.centerMode) {
        var s = r.options.slidesToShow % 2 == 0 ? 1 : 0;
        t = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t + s, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, n.slice(i - t + 1 + s, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")
      } else e >= 0 && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, i = !0 === r.options.infinite ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
      "ondemand" !== r.options.lazyLoad && "anticipated" !== r.options.lazyLoad || r.lazyLoad()
    }, t.prototype.setupInfinite = function() {
      var t, n, i, o = this;
      if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (n = null, o.slideCount > o.options.slidesToShow)) {
        for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - i; t -= 1) n = t - 1, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
        for (t = 0; t < i + o.slideCount; t += 1) n = t, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
        o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
          e(this).attr("id", "")
        })
      }
    }, t.prototype.interrupt = function(e) {
      var t = this;
      e || t.autoPlay(), t.interrupted = e
    }, t.prototype.selectHandler = function(t) {
      var n = this,
        i = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
        o = parseInt(i.attr("data-slick-index"));
      if (o || (o = 0), n.slideCount <= n.options.slidesToShow) return void n.slideHandler(o, !1, !0);
      n.slideHandler(o)
    }, t.prototype.slideHandler = function(e, t, n) {
      var i, o, r, s, a, l = null,
        c = this;
      if (t = t || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === e)) {
        if (!1 === t && c.asNavFor(e), i = e, l = c.getLeft(i), s = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? s : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll)) return void(!1 === c.options.fade && (i = c.currentSlide, !0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(s, function() {
          c.postSlide(i)
        }) : c.postSlide(i)));
        if (!1 === c.options.infinite && !0 === c.options.centerMode && (e < 0 || e > c.slideCount - c.options.slidesToScroll)) return void(!1 === c.options.fade && (i = c.currentSlide, !0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(s, function() {
          c.postSlide(i)
        }) : c.postSlide(i)));
        if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = i < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + i : i >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : i - c.slideCount : i, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), r = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = c.getNavTarget(), a = a.slick("getSlick"), a.slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide)), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== n ? (c.fadeSlideOut(r), c.fadeSlide(o, function() {
          c.postSlide(o)
        })) : c.postSlide(o), void c.animateHeight();
        !0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(l, function() {
          c.postSlide(o)
        }) : c.postSlide(o)
      }
    }, t.prototype.startLoad = function() {
      var e = this;
      !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, t.prototype.swipeDirection = function() {
      var e, t, n, i, o = this;
      return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(t, e), i = Math.round(180 * n / Math.PI), i < 0 && (i = 360 - Math.abs(i)), i <= 45 && i >= 0 ? !1 === o.options.rtl ? "left" : "right" : i <= 360 && i >= 315 ? !1 === o.options.rtl ? "left" : "right" : i >= 135 && i <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? i >= 35 && i <= 135 ? "down" : "up" : "vertical"
    }, t.prototype.swipeEnd = function(e) {
      var t, n, i = this;
      if (i.dragging = !1, i.swiping = !1, i.scrolling) return i.scrolling = !1, !1;
      if (i.interrupted = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
      if (!0 === i.touchObject.edgeHit && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) {
        switch (n = i.swipeDirection()) {
          case "left":
          case "down":
            t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.currentDirection = 0;
            break;
          case "right":
          case "up":
            t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.currentDirection = 1
        }
        "vertical" != n && (i.slideHandler(t), i.touchObject = {}, i.$slider.trigger("swipe", [i, n]))
      } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
    }, t.prototype.swipeHandler = function(e) {
      var t = this;
      if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
        case "start":
          t.swipeStart(e);
          break;
        case "move":
          t.swipeMove(e);
          break;
        case "end":
          t.swipeEnd(e)
      }
    }, t.prototype.swipeMove = function(e) {
      var t, n, i, o, r, s, a = this;
      return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || r && 1 !== r.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), s = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && s > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = s), n = a.swipeDirection(), void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, e.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), i = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + i * o : a.swipeLeft = t + i * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = t + i * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
    }, t.prototype.swipeStart = function(e) {
      var t, n = this;
      if (n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow) return n.touchObject = {}, !1;
      void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, n.dragging = !0
    }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
      var e = this;
      null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, t.prototype.unload = function() {
      var t = this;
      e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, t.prototype.unslick = function(e) {
      var t = this;
      t.$slider.trigger("unslick", [t, e]), t.destroy()
    }, t.prototype.updateArrows = function() {
      var e = this;
      Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, t.prototype.updateDots = function() {
      var e = this;
      null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
    }, t.prototype.visibility = function() {
      var e = this;
      e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }, e.fn.slick = function() {
      var e, n, i = this,
        o = arguments[0],
        r = Array.prototype.slice.call(arguments, 1),
        s = i.length;
      for (e = 0; e < s; e++)
        if ("object" == (void 0 === o ? "undefined" : _typeof(o)) || void 0 === o ? i[e].slick = new t(i[e], o) : n = i[e].slick[o].apply(i[e].slick, r), void 0 !== n) return n;
      return i
    }
  }),
  (function ($, Drupal) {
    e(window).on("load", function() {}), e(document).ready(function() {
      e(document).on("click", ".getModal", function(t) {
        t.preventDefault();
        var n = e(this).attr("href");
        return n || (n = e(this).data("modal")), e(n).arcticmodal({
          beforeOpen: function() {
            e(n).addClass("openEffect"), e(n).removeClass("closeEffect")
          },
          beforeClose: function() {
            e(n).removeClass("openEffect"), e(n).addClass("closeEffect"), setTimeout(function() {
              e("iframe").attr("src", e("iframe").attr("src")), console.clear()
            }, 100)
          }
        }), !1
      }), e(".slider-for").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !1,
        fade: !0,
        asNavFor: ".slider-nav",
        responsive: [{
          breakpoint: 768,
          settings: {
            dots: !0
          }
        }]
      }), e(".slider-nav").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".slider-for",
        dots: !1,
        focusOnSelect: !0,
        vertical: !0
      }), e(".product-slider").slick({
        slidesToShow: 3.3,
        slidesToScroll: 3,
        dots: !1,
        infinite: !1,
        focusOnSelect: !0,
        prevArrow: e(".prev"),
        nextArrow: e(".next"),
        adaptiveHeight: !1,
        responsive: [{
          breakpoint: 1620,
          settings: {
            slidesToShow: 2.2,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 1140,
          settings: {
            slidesToShow: 1.8,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2.2,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: !0,
            centerMode: !0
          }
        }]
      }), "accepted" !== window.localStorage.getItem("cookies") && (e(".cookies").removeClass("hidden"), console.log("true")), e("#accept-cookies").on("click", function() {
        window.localStorage.setItem("cookies", "accepted"), e(".cookies").addClass("hidden")
      })
    })
  })(jQuery, Drupal);
