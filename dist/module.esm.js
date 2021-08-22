var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// node_modules/dayjs/plugin/customParseFormat.js
var require_customParseFormat = __commonJS({
  "node_modules/dayjs/plugin/customParseFormat.js"(exports, module) {
    !function(t, e) {
      typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs_plugin_customParseFormat = e();
    }(exports, function() {
      "use strict";
      var t = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, e = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d\d/, r = /\d\d?/, i = /\d*[^\s\d-_:/()]+/, o = {}, s = function(t2) {
        return (t2 = +t2) + (t2 > 68 ? 1900 : 2e3);
      };
      var a = function(t2) {
        return function(e2) {
          this[t2] = +e2;
        };
      }, f = [/[+-]\d\d:?(\d\d)?|Z/, function(t2) {
        (this.zone || (this.zone = {})).offset = function(t3) {
          if (!t3)
            return 0;
          if (t3 === "Z")
            return 0;
          var e2 = t3.match(/([+-]|\d\d)/g), n2 = 60 * e2[1] + (+e2[2] || 0);
          return n2 === 0 ? 0 : e2[0] === "+" ? -n2 : n2;
        }(t2);
      }], u = function(t2) {
        var e2 = o[t2];
        return e2 && (e2.indexOf ? e2 : e2.s.concat(e2.f));
      }, h = function(t2, e2) {
        var n2, r2 = o.meridiem;
        if (r2) {
          for (var i2 = 1; i2 <= 24; i2 += 1)
            if (t2.indexOf(r2(i2, 0, e2)) > -1) {
              n2 = i2 > 12;
              break;
            }
        } else
          n2 = t2 === (e2 ? "pm" : "PM");
        return n2;
      }, d = { A: [i, function(t2) {
        this.afternoon = h(t2, false);
      }], a: [i, function(t2) {
        this.afternoon = h(t2, true);
      }], S: [/\d/, function(t2) {
        this.milliseconds = 100 * +t2;
      }], SS: [n, function(t2) {
        this.milliseconds = 10 * +t2;
      }], SSS: [/\d{3}/, function(t2) {
        this.milliseconds = +t2;
      }], s: [r, a("seconds")], ss: [r, a("seconds")], m: [r, a("minutes")], mm: [r, a("minutes")], H: [r, a("hours")], h: [r, a("hours")], HH: [r, a("hours")], hh: [r, a("hours")], D: [r, a("day")], DD: [n, a("day")], Do: [i, function(t2) {
        var e2 = o.ordinal, n2 = t2.match(/\d+/);
        if (this.day = n2[0], e2)
          for (var r2 = 1; r2 <= 31; r2 += 1)
            e2(r2).replace(/\[|\]/g, "") === t2 && (this.day = r2);
      }], M: [r, a("month")], MM: [n, a("month")], MMM: [i, function(t2) {
        var e2 = u("months"), n2 = (u("monthsShort") || e2.map(function(t3) {
          return t3.substr(0, 3);
        })).indexOf(t2) + 1;
        if (n2 < 1)
          throw new Error();
        this.month = n2 % 12 || n2;
      }], MMMM: [i, function(t2) {
        var e2 = u("months").indexOf(t2) + 1;
        if (e2 < 1)
          throw new Error();
        this.month = e2 % 12 || e2;
      }], Y: [/[+-]?\d+/, a("year")], YY: [n, function(t2) {
        this.year = s(t2);
      }], YYYY: [/\d{4}/, a("year")], Z: f, ZZ: f };
      function c(n2) {
        var r2, i2;
        r2 = n2, i2 = o && o.formats;
        for (var s2 = (n2 = r2.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(e2, n3, r3) {
          var o2 = r3 && r3.toUpperCase();
          return n3 || i2[r3] || t[r3] || i2[o2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(t2, e3, n4) {
            return e3 || n4.slice(1);
          });
        })).match(e), a2 = s2.length, f2 = 0; f2 < a2; f2 += 1) {
          var u2 = s2[f2], h2 = d[u2], c2 = h2 && h2[0], l = h2 && h2[1];
          s2[f2] = l ? { regex: c2, parser: l } : u2.replace(/^\[|\]$/g, "");
        }
        return function(t2) {
          for (var e2 = {}, n3 = 0, r3 = 0; n3 < a2; n3 += 1) {
            var i3 = s2[n3];
            if (typeof i3 == "string")
              r3 += i3.length;
            else {
              var o2 = i3.regex, f3 = i3.parser, u3 = t2.substr(r3), h3 = o2.exec(u3)[0];
              f3.call(e2, h3), t2 = t2.replace(h3, "");
            }
          }
          return function(t3) {
            var e3 = t3.afternoon;
            if (e3 !== void 0) {
              var n4 = t3.hours;
              e3 ? n4 < 12 && (t3.hours += 12) : n4 === 12 && (t3.hours = 0), delete t3.afternoon;
            }
          }(e2), e2;
        };
      }
      return function(t2, e2, n2) {
        n2.p.customParseFormat = true, t2 && t2.parseTwoDigitYear && (s = t2.parseTwoDigitYear);
        var r2 = e2.prototype, i2 = r2.parse;
        r2.parse = function(t3) {
          var e3 = t3.date, r3 = t3.utc, s2 = t3.args;
          this.$u = r3;
          var a2 = s2[1];
          if (typeof a2 == "string") {
            var f2 = s2[2] === true, u2 = s2[3] === true, h2 = f2 || u2, d2 = s2[2];
            u2 && (d2 = s2[2]), o = this.$locale(), !f2 && d2 && (o = n2.Ls[d2]), this.$d = function(t4, e4, n3) {
              try {
                if (["x", "X"].indexOf(e4) > -1)
                  return new Date((e4 === "X" ? 1e3 : 1) * t4);
                var r4 = c(e4)(t4), i3 = r4.year, o2 = r4.month, s3 = r4.day, a3 = r4.hours, f3 = r4.minutes, u3 = r4.seconds, h3 = r4.milliseconds, d3 = r4.zone, l2 = new Date(), m2 = s3 || (i3 || o2 ? 1 : l2.getDate()), M3 = i3 || l2.getFullYear(), Y2 = 0;
                i3 && !o2 || (Y2 = o2 > 0 ? o2 - 1 : l2.getMonth());
                var p = a3 || 0, v = f3 || 0, D2 = u3 || 0, g = h3 || 0;
                return d3 ? new Date(Date.UTC(M3, Y2, m2, p, v, D2, g + 60 * d3.offset * 1e3)) : n3 ? new Date(Date.UTC(M3, Y2, m2, p, v, D2, g)) : new Date(M3, Y2, m2, p, v, D2, g);
              } catch (t5) {
                return new Date("");
              }
            }(e3, a2, r3), this.init(), d2 && d2 !== true && (this.$L = this.locale(d2).$L), h2 && e3 !== this.format(a2) && (this.$d = new Date("")), o = {};
          } else if (a2 instanceof Array)
            for (var l = a2.length, m = 1; m <= l; m += 1) {
              s2[1] = a2[m - 1];
              var M2 = n2.apply(this, s2);
              if (M2.isValid()) {
                this.$d = M2.$d, this.$L = M2.$L, this.init();
                break;
              }
              m === l && (this.$d = new Date(""));
            }
          else
            i2.call(this, t3);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/localeData.js
var require_localeData = __commonJS({
  "node_modules/dayjs/plugin/localeData.js"(exports, module) {
    !function(n, e) {
      typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (n = typeof globalThis != "undefined" ? globalThis : n || self).dayjs_plugin_localeData = e();
    }(exports, function() {
      "use strict";
      return function(n, e, t) {
        var r = e.prototype, o = function(n2) {
          return n2 && (n2.indexOf ? n2 : n2.s);
        }, u = function(n2, e2, t2, r2, u2) {
          var i2 = n2.name ? n2 : n2.$locale(), a2 = o(i2[e2]), s2 = o(i2[t2]), f = a2 || s2.map(function(n3) {
            return n3.substr(0, r2);
          });
          if (!u2)
            return f;
          var d = i2.weekStart;
          return f.map(function(n3, e3) {
            return f[(e3 + (d || 0)) % 7];
          });
        }, i = function() {
          return t.Ls[t.locale()];
        }, a = function(n2, e2) {
          return n2.formats[e2] || function(n3) {
            return n3.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(n4, e3, t2) {
              return e3 || t2.slice(1);
            });
          }(n2.formats[e2.toUpperCase()]);
        }, s = function() {
          var n2 = this;
          return { months: function(e2) {
            return e2 ? e2.format("MMMM") : u(n2, "months");
          }, monthsShort: function(e2) {
            return e2 ? e2.format("MMM") : u(n2, "monthsShort", "months", 3);
          }, firstDayOfWeek: function() {
            return n2.$locale().weekStart || 0;
          }, weekdays: function(e2) {
            return e2 ? e2.format("dddd") : u(n2, "weekdays");
          }, weekdaysMin: function(e2) {
            return e2 ? e2.format("dd") : u(n2, "weekdaysMin", "weekdays", 2);
          }, weekdaysShort: function(e2) {
            return e2 ? e2.format("ddd") : u(n2, "weekdaysShort", "weekdays", 3);
          }, longDateFormat: function(e2) {
            return a(n2.$locale(), e2);
          }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
        };
        r.localeData = function() {
          return s.bind(this)();
        }, t.localeData = function() {
          var n2 = i();
          return { firstDayOfWeek: function() {
            return n2.weekStart || 0;
          }, weekdays: function() {
            return t.weekdays();
          }, weekdaysShort: function() {
            return t.weekdaysShort();
          }, weekdaysMin: function() {
            return t.weekdaysMin();
          }, months: function() {
            return t.months();
          }, monthsShort: function() {
            return t.monthsShort();
          }, longDateFormat: function(e2) {
            return a(n2, e2);
          }, meridiem: n2.meridiem, ordinal: n2.ordinal };
        }, t.months = function() {
          return u(i(), "months");
        }, t.monthsShort = function() {
          return u(i(), "monthsShort", "months", 3);
        }, t.weekdays = function(n2) {
          return u(i(), "weekdays", null, null, n2);
        }, t.weekdaysShort = function(n2) {
          return u(i(), "weekdaysShort", "weekdays", 3, n2);
        }, t.weekdaysMin = function(n2) {
          return u(i(), "weekdaysMin", "weekdays", 2, n2);
        };
      };
    });
  }
});

// node_modules/trix/dist/trix.js
var require_trix = __commonJS({
  "node_modules/trix/dist/trix.js"(exports, module) {
    (function() {
    }).call(exports), function() {
      var t;
      window.Set == null && (window.Set = t = function() {
        function t2() {
          this.clear();
        }
        return t2.prototype.clear = function() {
          return this.values = [];
        }, t2.prototype.has = function(t3) {
          return this.values.indexOf(t3) !== -1;
        }, t2.prototype.add = function(t3) {
          return this.has(t3) || this.values.push(t3), this;
        }, t2.prototype["delete"] = function(t3) {
          var e;
          return (e = this.values.indexOf(t3)) === -1 ? false : (this.values.splice(e, 1), true);
        }, t2.prototype.forEach = function() {
          var t3;
          return (t3 = this.values).forEach.apply(t3, arguments);
        }, t2;
      }());
    }.call(exports), function(t) {
      function e() {
      }
      function n(t2, e2) {
        return function() {
          t2.apply(e2, arguments);
        };
      }
      function i(t2) {
        if (typeof this != "object")
          throw new TypeError("Promises must be constructed via new");
        if (typeof t2 != "function")
          throw new TypeError("not a function");
        this._state = 0, this._handled = false, this._value = void 0, this._deferreds = [], c(t2, this);
      }
      function o(t2, e2) {
        for (; t2._state === 3; )
          t2 = t2._value;
        return t2._state === 0 ? void t2._deferreds.push(e2) : (t2._handled = true, void h(function() {
          var n2 = t2._state === 1 ? e2.onFulfilled : e2.onRejected;
          if (n2 === null)
            return void (t2._state === 1 ? r : s)(e2.promise, t2._value);
          var i2;
          try {
            i2 = n2(t2._value);
          } catch (o2) {
            return void s(e2.promise, o2);
          }
          r(e2.promise, i2);
        }));
      }
      function r(t2, e2) {
        try {
          if (e2 === t2)
            throw new TypeError("A promise cannot be resolved with itself.");
          if (e2 && (typeof e2 == "object" || typeof e2 == "function")) {
            var o2 = e2.then;
            if (e2 instanceof i)
              return t2._state = 3, t2._value = e2, void a(t2);
            if (typeof o2 == "function")
              return void c(n(o2, e2), t2);
          }
          t2._state = 1, t2._value = e2, a(t2);
        } catch (r2) {
          s(t2, r2);
        }
      }
      function s(t2, e2) {
        t2._state = 2, t2._value = e2, a(t2);
      }
      function a(t2) {
        t2._state === 2 && t2._deferreds.length === 0 && setTimeout(function() {
          t2._handled || p(t2._value);
        }, 1);
        for (var e2 = 0, n2 = t2._deferreds.length; n2 > e2; e2++)
          o(t2, t2._deferreds[e2]);
        t2._deferreds = null;
      }
      function u(t2, e2, n2) {
        this.onFulfilled = typeof t2 == "function" ? t2 : null, this.onRejected = typeof e2 == "function" ? e2 : null, this.promise = n2;
      }
      function c(t2, e2) {
        var n2 = false;
        try {
          t2(function(t3) {
            n2 || (n2 = true, r(e2, t3));
          }, function(t3) {
            n2 || (n2 = true, s(e2, t3));
          });
        } catch (i2) {
          if (n2)
            return;
          n2 = true, s(e2, i2);
        }
      }
      var l = setTimeout, h = typeof setImmediate == "function" && setImmediate || function(t2) {
        l(t2, 1);
      }, p = function(t2) {
        typeof console != "undefined" && console && console.warn("Possible Unhandled Promise Rejection:", t2);
      };
      i.prototype["catch"] = function(t2) {
        return this.then(null, t2);
      }, i.prototype.then = function(t2, n2) {
        var r2 = new i(e);
        return o(this, new u(t2, n2, r2)), r2;
      }, i.all = function(t2) {
        var e2 = Array.prototype.slice.call(t2);
        return new i(function(t3, n2) {
          function i2(r3, s2) {
            try {
              if (s2 && (typeof s2 == "object" || typeof s2 == "function")) {
                var a2 = s2.then;
                if (typeof a2 == "function")
                  return void a2.call(s2, function(t4) {
                    i2(r3, t4);
                  }, n2);
              }
              e2[r3] = s2, --o2 === 0 && t3(e2);
            } catch (u2) {
              n2(u2);
            }
          }
          if (e2.length === 0)
            return t3([]);
          for (var o2 = e2.length, r2 = 0; r2 < e2.length; r2++)
            i2(r2, e2[r2]);
        });
      }, i.resolve = function(t2) {
        return t2 && typeof t2 == "object" && t2.constructor === i ? t2 : new i(function(e2) {
          e2(t2);
        });
      }, i.reject = function(t2) {
        return new i(function(e2, n2) {
          n2(t2);
        });
      }, i.race = function(t2) {
        return new i(function(e2, n2) {
          for (var i2 = 0, o2 = t2.length; o2 > i2; i2++)
            t2[i2].then(e2, n2);
        });
      }, i._setImmediateFn = function(t2) {
        h = t2;
      }, i._setUnhandledRejectionFn = function(t2) {
        p = t2;
      }, typeof module != "undefined" && module.exports ? module.exports = i : t.Promise || (t.Promise = i);
    }(exports), function() {
      var t = typeof window.customElements == "object", e = typeof document.registerElement == "function", n = t || e;
      n || (typeof WeakMap == "undefined" && !function() {
        var t2 = Object.defineProperty, e2 = Date.now() % 1e9, n2 = function() {
          this.name = "__st" + (1e9 * Math.random() >>> 0) + (e2++ + "__");
        };
        n2.prototype = { set: function(e3, n3) {
          var i = e3[this.name];
          return i && i[0] === e3 ? i[1] = n3 : t2(e3, this.name, { value: [e3, n3], writable: true }), this;
        }, get: function(t3) {
          var e3;
          return (e3 = t3[this.name]) && e3[0] === t3 ? e3[1] : void 0;
        }, "delete": function(t3) {
          var e3 = t3[this.name];
          return e3 && e3[0] === t3 ? (e3[0] = e3[1] = void 0, true) : false;
        }, has: function(t3) {
          var e3 = t3[this.name];
          return e3 ? e3[0] === t3 : false;
        } }, window.WeakMap = n2;
      }(), function(t2) {
        function e2(t3) {
          A.push(t3), b || (b = true, g(i));
        }
        function n2(t3) {
          return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(t3) || t3;
        }
        function i() {
          b = false;
          var t3 = A;
          A = [], t3.sort(function(t4, e4) {
            return t4.uid_ - e4.uid_;
          });
          var e3 = false;
          t3.forEach(function(t4) {
            var n3 = t4.takeRecords();
            o(t4), n3.length && (t4.callback_(n3, t4), e3 = true);
          }), e3 && i();
        }
        function o(t3) {
          t3.nodes_.forEach(function(e3) {
            var n3 = m.get(e3);
            n3 && n3.forEach(function(e4) {
              e4.observer === t3 && e4.removeTransientObservers();
            });
          });
        }
        function r(t3, e3) {
          for (var n3 = t3; n3; n3 = n3.parentNode) {
            var i2 = m.get(n3);
            if (i2)
              for (var o2 = 0; o2 < i2.length; o2++) {
                var r2 = i2[o2], s2 = r2.options;
                if (n3 === t3 || s2.subtree) {
                  var a2 = e3(s2);
                  a2 && r2.enqueue(a2);
                }
              }
          }
        }
        function s(t3) {
          this.callback_ = t3, this.nodes_ = [], this.records_ = [], this.uid_ = ++C3;
        }
        function a(t3, e3) {
          this.type = t3, this.target = e3, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null;
        }
        function u(t3) {
          var e3 = new a(t3.type, t3.target);
          return e3.addedNodes = t3.addedNodes.slice(), e3.removedNodes = t3.removedNodes.slice(), e3.previousSibling = t3.previousSibling, e3.nextSibling = t3.nextSibling, e3.attributeName = t3.attributeName, e3.attributeNamespace = t3.attributeNamespace, e3.oldValue = t3.oldValue, e3;
        }
        function c(t3, e3) {
          return x = new a(t3, e3);
        }
        function l(t3) {
          return w ? w : (w = u(x), w.oldValue = t3, w);
        }
        function h() {
          x = w = void 0;
        }
        function p(t3) {
          return t3 === w || t3 === x;
        }
        function d(t3, e3) {
          return t3 === e3 ? t3 : w && p(t3) ? w : null;
        }
        function f(t3, e3, n3) {
          this.observer = t3, this.target = e3, this.options = n3, this.transientObservedNodes = [];
        }
        if (!t2.JsMutationObserver) {
          var g, m = new WeakMap();
          if (/Trident|Edge/.test(navigator.userAgent))
            g = setTimeout;
          else if (window.setImmediate)
            g = window.setImmediate;
          else {
            var v = [], y = String(Math.random());
            window.addEventListener("message", function(t3) {
              if (t3.data === y) {
                var e3 = v;
                v = [], e3.forEach(function(t4) {
                  t4();
                });
              }
            }), g = function(t3) {
              v.push(t3), window.postMessage(y, "*");
            };
          }
          var b = false, A = [], C3 = 0;
          s.prototype = { observe: function(t3, e3) {
            if (t3 = n2(t3), !e3.childList && !e3.attributes && !e3.characterData || e3.attributeOldValue && !e3.attributes || e3.attributeFilter && e3.attributeFilter.length && !e3.attributes || e3.characterDataOldValue && !e3.characterData)
              throw new SyntaxError();
            var i2 = m.get(t3);
            i2 || m.set(t3, i2 = []);
            for (var o2, r2 = 0; r2 < i2.length; r2++)
              if (i2[r2].observer === this) {
                o2 = i2[r2], o2.removeListeners(), o2.options = e3;
                break;
              }
            o2 || (o2 = new f(this, t3, e3), i2.push(o2), this.nodes_.push(t3)), o2.addListeners();
          }, disconnect: function() {
            this.nodes_.forEach(function(t3) {
              for (var e3 = m.get(t3), n3 = 0; n3 < e3.length; n3++) {
                var i2 = e3[n3];
                if (i2.observer === this) {
                  i2.removeListeners(), e3.splice(n3, 1);
                  break;
                }
              }
            }, this), this.records_ = [];
          }, takeRecords: function() {
            var t3 = this.records_;
            return this.records_ = [], t3;
          } };
          var x, w;
          f.prototype = { enqueue: function(t3) {
            var n3 = this.observer.records_, i2 = n3.length;
            if (n3.length > 0) {
              var o2 = n3[i2 - 1], r2 = d(o2, t3);
              if (r2)
                return void (n3[i2 - 1] = r2);
            } else
              e2(this.observer);
            n3[i2] = t3;
          }, addListeners: function() {
            this.addListeners_(this.target);
          }, addListeners_: function(t3) {
            var e3 = this.options;
            e3.attributes && t3.addEventListener("DOMAttrModified", this, true), e3.characterData && t3.addEventListener("DOMCharacterDataModified", this, true), e3.childList && t3.addEventListener("DOMNodeInserted", this, true), (e3.childList || e3.subtree) && t3.addEventListener("DOMNodeRemoved", this, true);
          }, removeListeners: function() {
            this.removeListeners_(this.target);
          }, removeListeners_: function(t3) {
            var e3 = this.options;
            e3.attributes && t3.removeEventListener("DOMAttrModified", this, true), e3.characterData && t3.removeEventListener("DOMCharacterDataModified", this, true), e3.childList && t3.removeEventListener("DOMNodeInserted", this, true), (e3.childList || e3.subtree) && t3.removeEventListener("DOMNodeRemoved", this, true);
          }, addTransientObserver: function(t3) {
            if (t3 !== this.target) {
              this.addListeners_(t3), this.transientObservedNodes.push(t3);
              var e3 = m.get(t3);
              e3 || m.set(t3, e3 = []), e3.push(this);
            }
          }, removeTransientObservers: function() {
            var t3 = this.transientObservedNodes;
            this.transientObservedNodes = [], t3.forEach(function(t4) {
              this.removeListeners_(t4);
              for (var e3 = m.get(t4), n3 = 0; n3 < e3.length; n3++)
                if (e3[n3] === this) {
                  e3.splice(n3, 1);
                  break;
                }
            }, this);
          }, handleEvent: function(t3) {
            switch (t3.stopImmediatePropagation(), t3.type) {
              case "DOMAttrModified":
                var e3 = t3.attrName, n3 = t3.relatedNode.namespaceURI, i2 = t3.target, o2 = new c("attributes", i2);
                o2.attributeName = e3, o2.attributeNamespace = n3;
                var s2 = t3.attrChange === MutationEvent.ADDITION ? null : t3.prevValue;
                r(i2, function(t4) {
                  return !t4.attributes || t4.attributeFilter && t4.attributeFilter.length && t4.attributeFilter.indexOf(e3) === -1 && t4.attributeFilter.indexOf(n3) === -1 ? void 0 : t4.attributeOldValue ? l(s2) : o2;
                });
                break;
              case "DOMCharacterDataModified":
                var i2 = t3.target, o2 = c("characterData", i2), s2 = t3.prevValue;
                r(i2, function(t4) {
                  return t4.characterData ? t4.characterDataOldValue ? l(s2) : o2 : void 0;
                });
                break;
              case "DOMNodeRemoved":
                this.addTransientObserver(t3.target);
              case "DOMNodeInserted":
                var a2, u2, p2 = t3.target;
                t3.type === "DOMNodeInserted" ? (a2 = [p2], u2 = []) : (a2 = [], u2 = [p2]);
                var d2 = p2.previousSibling, f2 = p2.nextSibling, o2 = c("childList", t3.target.parentNode);
                o2.addedNodes = a2, o2.removedNodes = u2, o2.previousSibling = d2, o2.nextSibling = f2, r(t3.relatedNode, function(t4) {
                  return t4.childList ? o2 : void 0;
                });
            }
            h();
          } }, t2.JsMutationObserver = s, t2.MutationObserver || (t2.MutationObserver = s, s._isPolyfilled = true);
        }
      }(self), function() {
        "use strict";
        if (!window.performance || !window.performance.now) {
          var t2 = Date.now();
          window.performance = { now: function() {
            return Date.now() - t2;
          } };
        }
        window.requestAnimationFrame || (window.requestAnimationFrame = function() {
          var t3 = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
          return t3 ? function(e3) {
            return t3(function() {
              e3(performance.now());
            });
          } : function(t4) {
            return window.setTimeout(t4, 1e3 / 60);
          };
        }()), window.cancelAnimationFrame || (window.cancelAnimationFrame = function() {
          return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function(t3) {
            clearTimeout(t3);
          };
        }());
        var e2 = function() {
          var t3 = document.createEvent("Event");
          return t3.initEvent("foo", true, true), t3.preventDefault(), t3.defaultPrevented;
        }();
        if (!e2) {
          var n2 = Event.prototype.preventDefault;
          Event.prototype.preventDefault = function() {
            this.cancelable && (n2.call(this), Object.defineProperty(this, "defaultPrevented", { get: function() {
              return true;
            }, configurable: true }));
          };
        }
        var i = /Trident/.test(navigator.userAgent);
        if ((!window.CustomEvent || i && typeof window.CustomEvent != "function") && (window.CustomEvent = function(t3, e3) {
          e3 = e3 || {};
          var n3 = document.createEvent("CustomEvent");
          return n3.initCustomEvent(t3, Boolean(e3.bubbles), Boolean(e3.cancelable), e3.detail), n3;
        }, window.CustomEvent.prototype = window.Event.prototype), !window.Event || i && typeof window.Event != "function") {
          var o = window.Event;
          window.Event = function(t3, e3) {
            e3 = e3 || {};
            var n3 = document.createEvent("Event");
            return n3.initEvent(t3, Boolean(e3.bubbles), Boolean(e3.cancelable)), n3;
          }, window.Event.prototype = o.prototype;
        }
      }(window.WebComponents), window.CustomElements = window.CustomElements || { flags: {} }, function(t2) {
        var e2 = t2.flags, n2 = [], i = function(t3) {
          n2.push(t3);
        }, o = function() {
          n2.forEach(function(e3) {
            e3(t2);
          });
        };
        t2.addModule = i, t2.initializeModules = o, t2.hasNative = Boolean(document.registerElement), t2.isIE = /Trident/.test(navigator.userAgent), t2.useNative = !e2.register && t2.hasNative && !window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative);
      }(window.CustomElements), window.CustomElements.addModule(function(t2) {
        function e2(t3, e3) {
          n2(t3, function(t4) {
            return e3(t4) ? true : void i(t4, e3);
          }), i(t3, e3);
        }
        function n2(t3, e3, i2) {
          var o2 = t3.firstElementChild;
          if (!o2)
            for (o2 = t3.firstChild; o2 && o2.nodeType !== Node.ELEMENT_NODE; )
              o2 = o2.nextSibling;
          for (; o2; )
            e3(o2, i2) !== true && n2(o2, e3, i2), o2 = o2.nextElementSibling;
          return null;
        }
        function i(t3, n3) {
          for (var i2 = t3.shadowRoot; i2; )
            e2(i2, n3), i2 = i2.olderShadowRoot;
        }
        function o(t3, e3) {
          r(t3, e3, []);
        }
        function r(t3, e3, n3) {
          if (t3 = window.wrap(t3), !(n3.indexOf(t3) >= 0)) {
            n3.push(t3);
            for (var i2, o2 = t3.querySelectorAll("link[rel=" + s + "]"), a = 0, u = o2.length; u > a && (i2 = o2[a]); a++)
              i2.import && r(i2.import, e3, n3);
            e3(t3);
          }
        }
        var s = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : "none";
        t2.forDocumentTree = o, t2.forSubtree = e2;
      }), window.CustomElements.addModule(function(t2) {
        function e2(t3, e3) {
          return n2(t3, e3) || i(t3, e3);
        }
        function n2(e3, n3) {
          return t2.upgrade(e3, n3) ? true : void (n3 && s(e3));
        }
        function i(t3, e3) {
          b(t3, function(t4) {
            return n2(t4, e3) ? true : void 0;
          });
        }
        function o(t3) {
          w.push(t3), x || (x = true, setTimeout(r));
        }
        function r() {
          x = false;
          for (var t3, e3 = w, n3 = 0, i2 = e3.length; i2 > n3 && (t3 = e3[n3]); n3++)
            t3();
          w = [];
        }
        function s(t3) {
          C3 ? o(function() {
            a(t3);
          }) : a(t3);
        }
        function a(t3) {
          t3.__upgraded__ && !t3.__attached && (t3.__attached = true, t3.attachedCallback && t3.attachedCallback());
        }
        function u(t3) {
          c(t3), b(t3, function(t4) {
            c(t4);
          });
        }
        function c(t3) {
          C3 ? o(function() {
            l(t3);
          }) : l(t3);
        }
        function l(t3) {
          t3.__upgraded__ && t3.__attached && (t3.__attached = false, t3.detachedCallback && t3.detachedCallback());
        }
        function h(t3) {
          for (var e3 = t3, n3 = window.wrap(document); e3; ) {
            if (e3 == n3)
              return true;
            e3 = e3.parentNode || e3.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e3.host;
          }
        }
        function p(t3) {
          if (t3.shadowRoot && !t3.shadowRoot.__watched) {
            y.dom && console.log("watching shadow-root for: ", t3.localName);
            for (var e3 = t3.shadowRoot; e3; )
              g(e3), e3 = e3.olderShadowRoot;
          }
        }
        function d(t3, n3) {
          if (y.dom) {
            var i2 = n3[0];
            if (i2 && i2.type === "childList" && i2.addedNodes && i2.addedNodes) {
              for (var o2 = i2.addedNodes[0]; o2 && o2 !== document && !o2.host; )
                o2 = o2.parentNode;
              var r2 = o2 && (o2.URL || o2._URL || o2.host && o2.host.localName) || "";
              r2 = r2.split("/?").shift().split("/").pop();
            }
            console.group("mutations (%d) [%s]", n3.length, r2 || "");
          }
          var s2 = h(t3);
          n3.forEach(function(t4) {
            t4.type === "childList" && (E(t4.addedNodes, function(t5) {
              t5.localName && e2(t5, s2);
            }), E(t4.removedNodes, function(t5) {
              t5.localName && u(t5);
            }));
          }), y.dom && console.groupEnd();
        }
        function f(t3) {
          for (t3 = window.wrap(t3), t3 || (t3 = window.wrap(document)); t3.parentNode; )
            t3 = t3.parentNode;
          var e3 = t3.__observer;
          e3 && (d(t3, e3.takeRecords()), r());
        }
        function g(t3) {
          if (!t3.__observer) {
            var e3 = new MutationObserver(d.bind(this, t3));
            e3.observe(t3, { childList: true, subtree: true }), t3.__observer = e3;
          }
        }
        function m(t3) {
          t3 = window.wrap(t3), y.dom && console.group("upgradeDocument: ", t3.baseURI.split("/").pop());
          var n3 = t3 === window.wrap(document);
          e2(t3, n3), g(t3), y.dom && console.groupEnd();
        }
        function v(t3) {
          A(t3, m);
        }
        var y = t2.flags, b = t2.forSubtree, A = t2.forDocumentTree, C3 = window.MutationObserver._isPolyfilled && y["throttle-attached"];
        t2.hasPolyfillMutations = C3, t2.hasThrottledAttached = C3;
        var x = false, w = [], E = Array.prototype.forEach.call.bind(Array.prototype.forEach), S2 = Element.prototype.createShadowRoot;
        S2 && (Element.prototype.createShadowRoot = function() {
          var t3 = S2.call(this);
          return window.CustomElements.watchShadow(this), t3;
        }), t2.watchShadow = p, t2.upgradeDocumentTree = v, t2.upgradeDocument = m, t2.upgradeSubtree = i, t2.upgradeAll = e2, t2.attached = s, t2.takeRecords = f;
      }), window.CustomElements.addModule(function(t2) {
        function e2(e3, i2) {
          if (e3.localName === "template" && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(e3), !e3.__upgraded__ && e3.nodeType === Node.ELEMENT_NODE) {
            var o2 = e3.getAttribute("is"), r2 = t2.getRegisteredDefinition(e3.localName) || t2.getRegisteredDefinition(o2);
            if (r2 && (o2 && r2.tag == e3.localName || !o2 && !r2.extends))
              return n2(e3, r2, i2);
          }
        }
        function n2(e3, n3, o2) {
          return s.upgrade && console.group("upgrade:", e3.localName), n3.is && e3.setAttribute("is", n3.is), i(e3, n3), e3.__upgraded__ = true, r(e3), o2 && t2.attached(e3), t2.upgradeSubtree(e3, o2), s.upgrade && console.groupEnd(), e3;
        }
        function i(t3, e3) {
          Object.__proto__ ? t3.__proto__ = e3.prototype : (o(t3, e3.prototype, e3.native), t3.__proto__ = e3.prototype);
        }
        function o(t3, e3, n3) {
          for (var i2 = {}, o2 = e3; o2 !== n3 && o2 !== HTMLElement.prototype; ) {
            for (var r2, s2 = Object.getOwnPropertyNames(o2), a = 0; r2 = s2[a]; a++)
              i2[r2] || (Object.defineProperty(t3, r2, Object.getOwnPropertyDescriptor(o2, r2)), i2[r2] = 1);
            o2 = Object.getPrototypeOf(o2);
          }
        }
        function r(t3) {
          t3.createdCallback && t3.createdCallback();
        }
        var s = t2.flags;
        t2.upgrade = e2, t2.upgradeWithDefinition = n2, t2.implementPrototype = i;
      }), window.CustomElements.addModule(function(t2) {
        function e2(e3, i2) {
          var u2 = i2 || {};
          if (!e3)
            throw new Error("document.registerElement: first argument `name` must not be empty");
          if (e3.indexOf("-") < 0)
            throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String(e3) + "'.");
          if (o(e3))
            throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String(e3) + "'. The type name is invalid.");
          if (c(e3))
            throw new Error("DuplicateDefinitionError: a type with name '" + String(e3) + "' is already registered");
          return u2.prototype || (u2.prototype = Object.create(HTMLElement.prototype)), u2.__name = e3.toLowerCase(), u2.extends && (u2.extends = u2.extends.toLowerCase()), u2.lifecycle = u2.lifecycle || {}, u2.ancestry = r(u2.extends), s(u2), a(u2), n2(u2.prototype), l(u2.__name, u2), u2.ctor = h(u2), u2.ctor.prototype = u2.prototype, u2.prototype.constructor = u2.ctor, t2.ready && m(document), u2.ctor;
        }
        function n2(t3) {
          if (!t3.setAttribute._polyfilled) {
            var e3 = t3.setAttribute;
            t3.setAttribute = function(t4, n4) {
              i.call(this, t4, n4, e3);
            };
            var n3 = t3.removeAttribute;
            t3.removeAttribute = function(t4) {
              i.call(this, t4, null, n3);
            }, t3.setAttribute._polyfilled = true;
          }
        }
        function i(t3, e3, n3) {
          t3 = t3.toLowerCase();
          var i2 = this.getAttribute(t3);
          n3.apply(this, arguments);
          var o2 = this.getAttribute(t3);
          this.attributeChangedCallback && o2 !== i2 && this.attributeChangedCallback(t3, i2, o2);
        }
        function o(t3) {
          for (var e3 = 0; e3 < C3.length; e3++)
            if (t3 === C3[e3])
              return true;
        }
        function r(t3) {
          var e3 = c(t3);
          return e3 ? r(e3.extends).concat([e3]) : [];
        }
        function s(t3) {
          for (var e3, n3 = t3.extends, i2 = 0; e3 = t3.ancestry[i2]; i2++)
            n3 = e3.is && e3.tag;
          t3.tag = n3 || t3.__name, n3 && (t3.is = t3.__name);
        }
        function a(t3) {
          if (!Object.__proto__) {
            var e3 = HTMLElement.prototype;
            if (t3.is) {
              var n3 = document.createElement(t3.tag);
              e3 = Object.getPrototypeOf(n3);
            }
            for (var i2, o2 = t3.prototype, r2 = false; o2; )
              o2 == e3 && (r2 = true), i2 = Object.getPrototypeOf(o2), i2 && (o2.__proto__ = i2), o2 = i2;
            r2 || console.warn(t3.tag + " prototype not found in prototype chain for " + t3.is), t3.native = e3;
          }
        }
        function u(t3) {
          return y(E(t3.tag), t3);
        }
        function c(t3) {
          return t3 ? x[t3.toLowerCase()] : void 0;
        }
        function l(t3, e3) {
          x[t3] = e3;
        }
        function h(t3) {
          return function() {
            return u(t3);
          };
        }
        function p(t3, e3, n3) {
          return t3 === w ? d(e3, n3) : S2(t3, e3);
        }
        function d(t3, e3) {
          t3 && (t3 = t3.toLowerCase()), e3 && (e3 = e3.toLowerCase());
          var n3 = c(e3 || t3);
          if (n3) {
            if (t3 == n3.tag && e3 == n3.is)
              return new n3.ctor();
            if (!e3 && !n3.is)
              return new n3.ctor();
          }
          var i2;
          return e3 ? (i2 = d(t3), i2.setAttribute("is", e3), i2) : (i2 = E(t3), t3.indexOf("-") >= 0 && b(i2, HTMLElement), i2);
        }
        function f(t3, e3) {
          var n3 = t3[e3];
          t3[e3] = function() {
            var t4 = n3.apply(this, arguments);
            return v(t4), t4;
          };
        }
        var g, m = (t2.isIE, t2.upgradeDocumentTree), v = t2.upgradeAll, y = t2.upgradeWithDefinition, b = t2.implementPrototype, A = t2.useNative, C3 = ["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"], x = {}, w = "http://www.w3.org/1999/xhtml", E = document.createElement.bind(document), S2 = document.createElementNS.bind(document);
        g = Object.__proto__ || A ? function(t3, e3) {
          return t3 instanceof e3;
        } : function(t3, e3) {
          if (t3 instanceof e3)
            return true;
          for (var n3 = t3; n3; ) {
            if (n3 === e3.prototype)
              return true;
            n3 = n3.__proto__;
          }
          return false;
        }, f(Node.prototype, "cloneNode"), f(document, "importNode"), document.registerElement = e2, document.createElement = d, document.createElementNS = p, t2.registry = x, t2.instanceof = g, t2.reservedTagList = C3, t2.getRegisteredDefinition = c, document.register = document.registerElement;
      }), function(t2) {
        function e2() {
          r(window.wrap(document)), window.CustomElements.ready = true;
          var t3 = window.requestAnimationFrame || function(t4) {
            setTimeout(t4, 16);
          };
          t3(function() {
            setTimeout(function() {
              window.CustomElements.readyTime = Date.now(), window.HTMLImports && (window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime), document.dispatchEvent(new CustomEvent("WebComponentsReady", { bubbles: true }));
            });
          });
        }
        var n2 = t2.useNative, i = t2.initializeModules;
        if (t2.isIE, n2) {
          var o = function() {
          };
          t2.watchShadow = o, t2.upgrade = o, t2.upgradeAll = o, t2.upgradeDocumentTree = o, t2.upgradeSubtree = o, t2.takeRecords = o, t2.instanceof = function(t3, e3) {
            return t3 instanceof e3;
          };
        } else
          i();
        var r = t2.upgradeDocumentTree, s = t2.upgradeDocument;
        if (window.wrap || (window.ShadowDOMPolyfill ? (window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded, window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded) : window.wrap = window.unwrap = function(t3) {
          return t3;
        }), window.HTMLImports && (window.HTMLImports.__importsParsingHook = function(t3) {
          t3.import && s(wrap(t3.import));
        }), document.readyState === "complete" || t2.flags.eager)
          e2();
        else if (document.readyState !== "interactive" || window.attachEvent || window.HTMLImports && !window.HTMLImports.ready) {
          var a = window.HTMLImports && !window.HTMLImports.ready ? "HTMLImportsLoaded" : "DOMContentLoaded";
          window.addEventListener(a, e2);
        } else
          e2();
      }(window.CustomElements));
    }.call(exports), function() {
    }.call(exports), function() {
      var t = this;
      (function() {
        (function() {
          this.Trix = { VERSION: "1.3.1", ZERO_WIDTH_SPACE: "\uFEFF", NON_BREAKING_SPACE: "\xA0", OBJECT_REPLACEMENT_CHARACTER: "\uFFFC", browser: { composesExistingText: /Android.*Chrome/.test(navigator.userAgent), forcesObjectResizing: /Trident.*rv:11/.test(navigator.userAgent), supportsInputEvents: function() {
            var t2, e2, n, i;
            if (typeof InputEvent == "undefined")
              return false;
            for (i = ["data", "getTargetRanges", "inputType"], t2 = 0, e2 = i.length; e2 > t2; t2++)
              if (n = i[t2], !(n in InputEvent.prototype))
                return false;
            return true;
          }() }, config: {} };
        }).call(this);
      }).call(t);
      var e = t.Trix;
      (function() {
        (function() {
          e.BasicObject = function() {
            function t2() {
            }
            var e2, n, i;
            return t2.proxyMethod = function(t3) {
              var i2, o, r, s, a;
              return r = n(t3), i2 = r.name, s = r.toMethod, a = r.toProperty, o = r.optional, this.prototype[i2] = function() {
                var t4, n2;
                return t4 = s != null ? o ? typeof this[s] == "function" ? this[s]() : void 0 : this[s]() : a != null ? this[a] : void 0, o ? (n2 = t4 != null ? t4[i2] : void 0, n2 != null ? e2.call(n2, t4, arguments) : void 0) : (n2 = t4[i2], e2.call(n2, t4, arguments));
              };
            }, n = function(t3) {
              var e3, n2;
              if (!(n2 = t3.match(i)))
                throw new Error("can't parse @proxyMethod expression: " + t3);
              return e3 = { name: n2[4] }, n2[2] != null ? e3.toMethod = n2[1] : e3.toProperty = n2[1], n2[3] != null && (e3.optional = true), e3;
            }, e2 = Function.prototype.apply, i = /^(.+?)(\(\))?(\?)?\.(.+?)$/, t2;
          }();
        }).call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.Object = function(n2) {
            function i() {
              this.id = ++o;
            }
            var o;
            return t2(i, n2), o = 0, i.fromJSONString = function(t3) {
              return this.fromJSON(JSON.parse(t3));
            }, i.prototype.hasSameConstructorAs = function(t3) {
              return this.constructor === (t3 != null ? t3.constructor : void 0);
            }, i.prototype.isEqualTo = function(t3) {
              return this === t3;
            }, i.prototype.inspect = function() {
              var t3, e2, n3;
              return t3 = function() {
                var t4, i2, o2;
                i2 = (t4 = this.contentsForInspection()) != null ? t4 : {}, o2 = [];
                for (e2 in i2)
                  n3 = i2[e2], o2.push(e2 + "=" + n3);
                return o2;
              }.call(this), "#<" + this.constructor.name + ":" + this.id + (t3.length ? " " + t3.join(", ") : "") + ">";
            }, i.prototype.contentsForInspection = function() {
            }, i.prototype.toJSONString = function() {
              return JSON.stringify(this);
            }, i.prototype.toUTF16String = function() {
              return e.UTF16String.box(this);
            }, i.prototype.getCacheKey = function() {
              return this.id.toString();
            }, i;
          }(e.BasicObject);
        }.call(this), function() {
          e.extend = function(t2) {
            var e2, n;
            for (e2 in t2)
              n = t2[e2], this[e2] = n;
            return this;
          };
        }.call(this), function() {
          e.extend({ defer: function(t2) {
            return setTimeout(t2, 1);
          } });
        }.call(this), function() {
          var t2, n;
          e.extend({ normalizeSpaces: function(t3) {
            return t3.replace(RegExp("" + e.ZERO_WIDTH_SPACE, "g"), "").replace(RegExp("" + e.NON_BREAKING_SPACE, "g"), " ");
          }, normalizeNewlines: function(t3) {
            return t3.replace(/\r\n/g, "\n");
          }, breakableWhitespacePattern: RegExp("[^\\S" + e.NON_BREAKING_SPACE + "]"), squishBreakableWhitespace: function(t3) {
            return t3.replace(RegExp("" + e.breakableWhitespacePattern.source, "g"), " ").replace(/\ {2,}/g, " ");
          }, summarizeStringChange: function(t3, i) {
            var o, r, s, a;
            return t3 = e.UTF16String.box(t3), i = e.UTF16String.box(i), i.length < t3.length ? (r = n(t3, i), a = r[0], o = r[1]) : (s = n(i, t3), o = s[0], a = s[1]), { added: o, removed: a };
          } }), n = function(n2, i) {
            var o, r, s, a, u;
            return n2.isEqualTo(i) ? ["", ""] : (r = t2(n2, i), a = r.utf16String.length, s = a ? (u = r.offset, r, o = n2.codepoints.slice(0, u).concat(n2.codepoints.slice(u + a)), t2(i, e.UTF16String.fromCodepoints(o))) : t2(i, n2), [r.utf16String.toString(), s.utf16String.toString()]);
          }, t2 = function(t3, e2) {
            var n2, i, o;
            for (n2 = 0, i = t3.length, o = e2.length; i > n2 && t3.charAt(n2).isEqualTo(e2.charAt(n2)); )
              n2++;
            for (; i > n2 + 1 && t3.charAt(i - 1).isEqualTo(e2.charAt(o - 1)); )
              i--, o--;
            return { utf16String: t3.slice(n2, i), offset: n2 };
          };
        }.call(this), function() {
          e.extend({ copyObject: function(t2) {
            var e2, n, i;
            t2 == null && (t2 = {}), n = {};
            for (e2 in t2)
              i = t2[e2], n[e2] = i;
            return n;
          }, objectsAreEqual: function(t2, e2) {
            var n, i;
            if (t2 == null && (t2 = {}), e2 == null && (e2 = {}), Object.keys(t2).length !== Object.keys(e2).length)
              return false;
            for (n in t2)
              if (i = t2[n], i !== e2[n])
                return false;
            return true;
          } });
        }.call(this), function() {
          var t2 = [].slice;
          e.extend({ arraysAreEqual: function(t3, e2) {
            var n, i, o, r;
            if (t3 == null && (t3 = []), e2 == null && (e2 = []), t3.length !== e2.length)
              return false;
            for (i = n = 0, o = t3.length; o > n; i = ++n)
              if (r = t3[i], r !== e2[i])
                return false;
            return true;
          }, arrayStartsWith: function(t3, n) {
            return t3 == null && (t3 = []), n == null && (n = []), e.arraysAreEqual(t3.slice(0, n.length), n);
          }, spliceArray: function() {
            var e2, n, i;
            return n = arguments[0], e2 = 2 <= arguments.length ? t2.call(arguments, 1) : [], i = n.slice(0), i.splice.apply(i, e2), i;
          }, summarizeArrayChange: function(t3, e2) {
            var n, i, o, r, s, a, u, c, l, h, p;
            for (t3 == null && (t3 = []), e2 == null && (e2 = []), n = [], h = [], o = new Set(), r = 0, u = t3.length; u > r; r++)
              p = t3[r], o.add(p);
            for (i = new Set(), s = 0, c = e2.length; c > s; s++)
              p = e2[s], i.add(p), o.has(p) || n.push(p);
            for (a = 0, l = t3.length; l > a; a++)
              p = t3[a], i.has(p) || h.push(p);
            return { added: n, removed: h };
          } });
        }.call(this), function() {
          var t2, n, i, o;
          t2 = null, n = null, o = null, i = null, e.extend({ getAllAttributeNames: function() {
            return t2 != null ? t2 : t2 = e.getTextAttributeNames().concat(e.getBlockAttributeNames());
          }, getBlockConfig: function(t3) {
            return e.config.blockAttributes[t3];
          }, getBlockAttributeNames: function() {
            return n != null ? n : n = Object.keys(e.config.blockAttributes);
          }, getTextConfig: function(t3) {
            return e.config.textAttributes[t3];
          }, getTextAttributeNames: function() {
            return o != null ? o : o = Object.keys(e.config.textAttributes);
          }, getListAttributeNames: function() {
            var t3, n2;
            return i != null ? i : i = function() {
              var i2, o2;
              i2 = e.config.blockAttributes, o2 = [];
              for (t3 in i2)
                n2 = i2[t3].listAttribute, n2 != null && o2.push(n2);
              return o2;
            }();
          } });
        }.call(this), function() {
          var t2, n, i, o, r, s = [].indexOf || function(t3) {
            for (var e2 = 0, n2 = this.length; n2 > e2; e2++)
              if (e2 in this && this[e2] === t3)
                return e2;
            return -1;
          };
          t2 = document.documentElement, n = (i = (o = (r = t2.matchesSelector) != null ? r : t2.webkitMatchesSelector) != null ? o : t2.msMatchesSelector) != null ? i : t2.mozMatchesSelector, e.extend({ handleEvent: function(n2, i2) {
            var o2, r2, s2, a, u, c, l, h, p, d, f, g;
            return h = i2 != null ? i2 : {}, c = h.onElement, u = h.matchingSelector, g = h.withCallback, a = h.inPhase, l = h.preventDefault, d = h.times, r2 = c != null ? c : t2, p = u, o2 = g, f = a === "capturing", s2 = function(t3) {
              var n3;
              return d != null && --d === 0 && s2.destroy(), n3 = e.findClosestElementFromNode(t3.target, { matchingSelector: p }), n3 != null && (g != null && g.call(n3, t3, n3), l) ? t3.preventDefault() : void 0;
            }, s2.destroy = function() {
              return r2.removeEventListener(n2, s2, f);
            }, r2.addEventListener(n2, s2, f), s2;
          }, handleEventOnce: function(t3, n2) {
            return n2 == null && (n2 = {}), n2.times = 1, e.handleEvent(t3, n2);
          }, triggerEvent: function(n2, i2) {
            var o2, r2, s2, a, u, c, l;
            return l = i2 != null ? i2 : {}, c = l.onElement, r2 = l.bubbles, s2 = l.cancelable, o2 = l.attributes, a = c != null ? c : t2, r2 = r2 !== false, s2 = s2 !== false, u = document.createEvent("Events"), u.initEvent(n2, r2, s2), o2 != null && e.extend.call(u, o2), a.dispatchEvent(u);
          }, elementMatchesSelector: function(t3, e2) {
            return (t3 != null ? t3.nodeType : void 0) === 1 ? n.call(t3, e2) : void 0;
          }, findClosestElementFromNode: function(t3, n2) {
            var i2, o2, r2;
            for (o2 = n2 != null ? n2 : {}, i2 = o2.matchingSelector, r2 = o2.untilNode; t3 != null && t3.nodeType !== Node.ELEMENT_NODE; )
              t3 = t3.parentNode;
            if (t3 != null) {
              if (i2 == null)
                return t3;
              if (t3.closest && r2 == null)
                return t3.closest(i2);
              for (; t3 && t3 !== r2; ) {
                if (e.elementMatchesSelector(t3, i2))
                  return t3;
                t3 = t3.parentNode;
              }
            }
          }, findInnerElement: function(t3) {
            for (; t3 != null ? t3.firstElementChild : void 0; )
              t3 = t3.firstElementChild;
            return t3;
          }, innerElementIsActive: function(t3) {
            return document.activeElement !== t3 && e.elementContainsNode(t3, document.activeElement);
          }, elementContainsNode: function(t3, e2) {
            if (t3 && e2)
              for (; e2; ) {
                if (e2 === t3)
                  return true;
                e2 = e2.parentNode;
              }
          }, findNodeFromContainerAndOffset: function(t3, e2) {
            var n2;
            if (t3)
              return t3.nodeType === Node.TEXT_NODE ? t3 : e2 === 0 ? (n2 = t3.firstChild) != null ? n2 : t3 : t3.childNodes.item(e2 - 1);
          }, findElementFromContainerAndOffset: function(t3, n2) {
            var i2;
            return i2 = e.findNodeFromContainerAndOffset(t3, n2), e.findClosestElementFromNode(i2);
          }, findChildIndexOfNode: function(t3) {
            var e2;
            if (t3 != null ? t3.parentNode : void 0) {
              for (e2 = 0; t3 = t3.previousSibling; )
                e2++;
              return e2;
            }
          }, removeNode: function(t3) {
            var e2;
            return t3 != null && (e2 = t3.parentNode) != null ? e2.removeChild(t3) : void 0;
          }, walkTree: function(t3, e2) {
            var n2, i2, o2, r2, s2;
            return o2 = e2 != null ? e2 : {}, i2 = o2.onlyNodesOfType, r2 = o2.usingFilter, n2 = o2.expandEntityReferences, s2 = function() {
              switch (i2) {
                case "element":
                  return NodeFilter.SHOW_ELEMENT;
                case "text":
                  return NodeFilter.SHOW_TEXT;
                case "comment":
                  return NodeFilter.SHOW_COMMENT;
                default:
                  return NodeFilter.SHOW_ALL;
              }
            }(), document.createTreeWalker(t3, s2, r2 != null ? r2 : null, n2 === true);
          }, tagName: function(t3) {
            var e2;
            return t3 != null && (e2 = t3.tagName) != null ? e2.toLowerCase() : void 0;
          }, makeElement: function(t3, e2) {
            var n2, i2, o2, r2, s2, a, u, c, l, h, p, d, f, g;
            if (e2 == null && (e2 = {}), typeof t3 == "object" ? (e2 = t3, t3 = e2.tagName) : e2 = { attributes: e2 }, o2 = document.createElement(t3), e2.editable != null && (e2.attributes == null && (e2.attributes = {}), e2.attributes.contenteditable = e2.editable), e2.attributes) {
              l = e2.attributes;
              for (a in l)
                g = l[a], o2.setAttribute(a, g);
            }
            if (e2.style) {
              h = e2.style;
              for (a in h)
                g = h[a], o2.style[a] = g;
            }
            if (e2.data) {
              p = e2.data;
              for (a in p)
                g = p[a], o2.dataset[a] = g;
            }
            if (e2.className)
              for (d = e2.className.split(" "), r2 = 0, u = d.length; u > r2; r2++)
                i2 = d[r2], o2.classList.add(i2);
            if (e2.textContent && (o2.textContent = e2.textContent), e2.childNodes)
              for (f = [].concat(e2.childNodes), s2 = 0, c = f.length; c > s2; s2++)
                n2 = f[s2], o2.appendChild(n2);
            return o2;
          }, getBlockTagNames: function() {
            var t3, n2;
            return e.blockTagNames != null ? e.blockTagNames : e.blockTagNames = function() {
              var i2, o2;
              i2 = e.config.blockAttributes, o2 = [];
              for (t3 in i2)
                n2 = i2[t3].tagName, n2 && o2.push(n2);
              return o2;
            }();
          }, nodeIsBlockContainer: function(t3) {
            return e.nodeIsBlockStartComment(t3 != null ? t3.firstChild : void 0);
          }, nodeProbablyIsBlockContainer: function(t3) {
            var n2, i2;
            return n2 = e.tagName(t3), s.call(e.getBlockTagNames(), n2) >= 0 && (i2 = e.tagName(t3.firstChild), s.call(e.getBlockTagNames(), i2) < 0);
          }, nodeIsBlockStart: function(t3, n2) {
            var i2;
            return i2 = (n2 != null ? n2 : { strict: true }).strict, i2 ? e.nodeIsBlockStartComment(t3) : e.nodeIsBlockStartComment(t3) || !e.nodeIsBlockStartComment(t3.firstChild) && e.nodeProbablyIsBlockContainer(t3);
          }, nodeIsBlockStartComment: function(t3) {
            return e.nodeIsCommentNode(t3) && (t3 != null ? t3.data : void 0) === "block";
          }, nodeIsCommentNode: function(t3) {
            return (t3 != null ? t3.nodeType : void 0) === Node.COMMENT_NODE;
          }, nodeIsCursorTarget: function(t3, n2) {
            var i2;
            return i2 = (n2 != null ? n2 : {}).name, t3 ? e.nodeIsTextNode(t3) ? t3.data === e.ZERO_WIDTH_SPACE ? i2 ? t3.parentNode.dataset.trixCursorTarget === i2 : true : void 0 : e.nodeIsCursorTarget(t3.firstChild) : void 0;
          }, nodeIsAttachmentElement: function(t3) {
            return e.elementMatchesSelector(t3, e.AttachmentView.attachmentSelector);
          }, nodeIsEmptyTextNode: function(t3) {
            return e.nodeIsTextNode(t3) && (t3 != null ? t3.data : void 0) === "";
          }, nodeIsTextNode: function(t3) {
            return (t3 != null ? t3.nodeType : void 0) === Node.TEXT_NODE;
          } });
        }.call(this), function() {
          var t2, n, i, o, r;
          t2 = e.copyObject, o = e.objectsAreEqual, e.extend({ normalizeRange: i = function(t3) {
            var e2;
            if (t3 != null)
              return Array.isArray(t3) || (t3 = [t3, t3]), [n(t3[0]), n((e2 = t3[1]) != null ? e2 : t3[0])];
          }, rangeIsCollapsed: function(t3) {
            var e2, n2, o2;
            if (t3 != null)
              return n2 = i(t3), o2 = n2[0], e2 = n2[1], r(o2, e2);
          }, rangesAreEqual: function(t3, e2) {
            var n2, o2, s, a, u, c;
            if (t3 != null && e2 != null)
              return s = i(t3), o2 = s[0], n2 = s[1], a = i(e2), c = a[0], u = a[1], r(o2, c) && r(n2, u);
          } }), n = function(e2) {
            return typeof e2 == "number" ? e2 : t2(e2);
          }, r = function(t3, e2) {
            return typeof t3 == "number" ? t3 === e2 : o(t3, e2);
          };
        }.call(this), function() {
          var t2, n, i, o, r, s, a;
          e.registerElement = function(t3, e2) {
            var n2, i2;
            return e2 == null && (e2 = {}), t3 = t3.toLowerCase(), e2 = a(e2), i2 = s(e2), (n2 = i2.defaultCSS) && (delete i2.defaultCSS, o(n2, t3)), r(t3, i2);
          }, o = function(t3, e2) {
            var n2;
            return n2 = i(e2), n2.textContent = t3.replace(/%t/g, e2);
          }, i = function(e2) {
            var n2, i2;
            return n2 = document.createElement("style"), n2.setAttribute("type", "text/css"), n2.setAttribute("data-tag-name", e2.toLowerCase()), (i2 = t2()) && n2.setAttribute("nonce", i2), document.head.insertBefore(n2, document.head.firstChild), n2;
          }, t2 = function() {
            var t3;
            return (t3 = n("trix-csp-nonce") || n("csp-nonce")) ? t3.getAttribute("content") : void 0;
          }, n = function(t3) {
            return document.head.querySelector("meta[name=" + t3 + "]");
          }, s = function(t3) {
            var e2, n2, i2;
            n2 = {};
            for (e2 in t3)
              i2 = t3[e2], n2[e2] = typeof i2 == "function" ? { value: i2 } : i2;
            return n2;
          }, a = function() {
            var t3;
            return t3 = function(t4) {
              var e2, n2, i2, o2, r2;
              for (e2 = {}, r2 = ["initialize", "connect", "disconnect"], n2 = 0, o2 = r2.length; o2 > n2; n2++)
                i2 = r2[n2], e2[i2] = t4[i2], delete t4[i2];
              return e2;
            }, window.customElements ? function(e2) {
              var n2, i2, o2, r2, s2;
              return s2 = t3(e2), o2 = s2.initialize, n2 = s2.connect, i2 = s2.disconnect, o2 && (r2 = n2, n2 = function() {
                return this.initialized || (this.initialized = true, o2.call(this)), r2 != null ? r2.call(this) : void 0;
              }), n2 && (e2.connectedCallback = n2), i2 && (e2.disconnectedCallback = i2), e2;
            } : function(e2) {
              var n2, i2, o2, r2;
              return r2 = t3(e2), o2 = r2.initialize, n2 = r2.connect, i2 = r2.disconnect, o2 && (e2.createdCallback = o2), n2 && (e2.attachedCallback = n2), i2 && (e2.detachedCallback = i2), e2;
            };
          }(), r = function() {
            return window.customElements ? function(t3, e2) {
              var n2;
              return n2 = function() {
                return typeof Reflect == "object" ? Reflect.construct(HTMLElement, [], n2) : HTMLElement.apply(this);
              }, Object.setPrototypeOf(n2.prototype, HTMLElement.prototype), Object.setPrototypeOf(n2, HTMLElement), Object.defineProperties(n2.prototype, e2), window.customElements.define(t3, n2), n2;
            } : function(t3, e2) {
              var n2, i2;
              return i2 = Object.create(HTMLElement.prototype, e2), n2 = document.registerElement(t3, { prototype: i2 }), Object.defineProperty(i2, "constructor", { value: n2 }), n2;
            };
          }();
        }.call(this), function() {
          var t2, n;
          e.extend({ getDOMSelection: function() {
            var t3;
            return t3 = window.getSelection(), t3.rangeCount > 0 ? t3 : void 0;
          }, getDOMRange: function() {
            var n2, i;
            return (n2 = (i = e.getDOMSelection()) != null ? i.getRangeAt(0) : void 0) && !t2(n2) ? n2 : void 0;
          }, setDOMRange: function(t3) {
            var n2;
            return n2 = window.getSelection(), n2.removeAllRanges(), n2.addRange(t3), e.selectionChangeObserver.update();
          } }), t2 = function(t3) {
            return n(t3.startContainer) || n(t3.endContainer);
          }, n = function(t3) {
            return !Object.getPrototypeOf(t3);
          };
        }.call(this), function() {
          var t2;
          t2 = { "application/x-trix-feature-detection": "test" }, e.extend({ dataTransferIsPlainText: function(t3) {
            var e2, n, i;
            return i = t3.getData("text/plain"), n = t3.getData("text/html"), i && n ? (e2 = new DOMParser().parseFromString(n, "text/html").body, e2.textContent === i ? !e2.querySelector("*") : void 0) : i != null ? i.length : void 0;
          }, dataTransferIsWritable: function(e2) {
            var n, i;
            if ((e2 != null ? e2.setData : void 0) != null) {
              for (n in t2)
                if (i = t2[n], !function() {
                  try {
                    return e2.setData(n, i), e2.getData(n) === i;
                  } catch (t3) {
                  }
                }())
                  return;
              return true;
            }
          }, keyEventIsKeyboardCommand: function() {
            return /Mac|^iP/.test(navigator.platform) ? function(t3) {
              return t3.metaKey;
            } : function(t3) {
              return t3.ctrlKey;
            };
          }() });
        }.call(this), function() {
          e.extend({ RTL_PATTERN: /[\u05BE\u05C0\u05C3\u05D0-\u05EA\u05F0-\u05F4\u061B\u061F\u0621-\u063A\u0640-\u064A\u066D\u0671-\u06B7\u06BA-\u06BE\u06C0-\u06CE\u06D0-\u06D5\u06E5\u06E6\u200F\u202B\u202E\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE72\uFE74\uFE76-\uFEFC]/, getDirection: function() {
            var t2, n, i, o;
            return n = e.makeElement("input", { dir: "auto", name: "x", dirName: "x.dir" }), t2 = e.makeElement("form"), t2.appendChild(n), i = function() {
              try {
                return new FormData(t2).has(n.dirName);
              } catch (e2) {
              }
            }(), o = function() {
              try {
                return n.matches(":dir(ltr),:dir(rtl)");
              } catch (t3) {
              }
            }(), i ? function(e2) {
              return n.value = e2, new FormData(t2).get(n.dirName);
            } : o ? function(t3) {
              return n.value = t3, n.matches(":dir(rtl)") ? "rtl" : "ltr";
            } : function(t3) {
              var n2;
              return n2 = t3.trim().charAt(0), e.RTL_PATTERN.test(n2) ? "rtl" : "ltr";
            };
          }() });
        }.call(this), function() {
        }.call(this), function() {
          var t2, n = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var o in e2)
              i.call(e2, o) && (t3[o] = e2[o]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, i = {}.hasOwnProperty;
          t2 = e.arraysAreEqual, e.Hash = function(i2) {
            function o(t3) {
              t3 == null && (t3 = {}), this.values = s(t3), o.__super__.constructor.apply(this, arguments);
            }
            var r, s, a, u, c;
            return n(o, i2), o.fromCommonAttributesOfObjects = function(t3) {
              var e2, n2, i3, o2, s2, a2;
              if (t3 == null && (t3 = []), !t3.length)
                return new this();
              for (e2 = r(t3[0]), i3 = e2.getKeys(), a2 = t3.slice(1), n2 = 0, o2 = a2.length; o2 > n2; n2++)
                s2 = a2[n2], i3 = e2.getKeysCommonToHash(r(s2)), e2 = e2.slice(i3);
              return e2;
            }, o.box = function(t3) {
              return r(t3);
            }, o.prototype.add = function(t3, e2) {
              return this.merge(u(t3, e2));
            }, o.prototype.remove = function(t3) {
              return new e.Hash(s(this.values, t3));
            }, o.prototype.get = function(t3) {
              return this.values[t3];
            }, o.prototype.has = function(t3) {
              return t3 in this.values;
            }, o.prototype.merge = function(t3) {
              return new e.Hash(a(this.values, c(t3)));
            }, o.prototype.slice = function(t3) {
              var n2, i3, o2, r2;
              for (r2 = {}, n2 = 0, o2 = t3.length; o2 > n2; n2++)
                i3 = t3[n2], this.has(i3) && (r2[i3] = this.values[i3]);
              return new e.Hash(r2);
            }, o.prototype.getKeys = function() {
              return Object.keys(this.values);
            }, o.prototype.getKeysCommonToHash = function(t3) {
              var e2, n2, i3, o2, s2;
              for (t3 = r(t3), o2 = this.getKeys(), s2 = [], e2 = 0, i3 = o2.length; i3 > e2; e2++)
                n2 = o2[e2], this.values[n2] === t3.values[n2] && s2.push(n2);
              return s2;
            }, o.prototype.isEqualTo = function(e2) {
              return t2(this.toArray(), r(e2).toArray());
            }, o.prototype.isEmpty = function() {
              return this.getKeys().length === 0;
            }, o.prototype.toArray = function() {
              var t3, e2, n2;
              return (this.array != null ? this.array : this.array = function() {
                var i3;
                e2 = [], i3 = this.values;
                for (t3 in i3)
                  n2 = i3[t3], e2.push(t3, n2);
                return e2;
              }.call(this)).slice(0);
            }, o.prototype.toObject = function() {
              return s(this.values);
            }, o.prototype.toJSON = function() {
              return this.toObject();
            }, o.prototype.contentsForInspection = function() {
              return { values: JSON.stringify(this.values) };
            }, u = function(t3, e2) {
              var n2;
              return n2 = {}, n2[t3] = e2, n2;
            }, a = function(t3, e2) {
              var n2, i3, o2;
              i3 = s(t3);
              for (n2 in e2)
                o2 = e2[n2], i3[n2] = o2;
              return i3;
            }, s = function(t3, e2) {
              var n2, i3, o2, r2, s2;
              for (r2 = {}, s2 = Object.keys(t3).sort(), n2 = 0, o2 = s2.length; o2 > n2; n2++)
                i3 = s2[n2], i3 !== e2 && (r2[i3] = t3[i3]);
              return r2;
            }, r = function(t3) {
              return t3 instanceof e.Hash ? t3 : new e.Hash(t3);
            }, c = function(t3) {
              return t3 instanceof e.Hash ? t3.values : t3;
            }, o;
          }(e.Object);
        }.call(this), function() {
          e.ObjectGroup = function() {
            function t2(t3, e2) {
              var n, i;
              this.objects = t3 != null ? t3 : [], i = e2.depth, n = e2.asTree, n && (this.depth = i, this.objects = this.constructor.groupObjects(this.objects, { asTree: n, depth: this.depth + 1 }));
            }
            return t2.groupObjects = function(t3, e2) {
              var n, i, o, r, s, a, u, c, l;
              for (t3 == null && (t3 = []), l = e2 != null ? e2 : {}, o = l.depth, n = l.asTree, n && o == null && (o = 0), c = [], s = 0, a = t3.length; a > s; s++) {
                if (u = t3[s], r) {
                  if ((typeof u.canBeGrouped == "function" ? u.canBeGrouped(o) : void 0) && (typeof (i = r[r.length - 1]).canBeGroupedWith == "function" ? i.canBeGroupedWith(u, o) : void 0)) {
                    r.push(u);
                    continue;
                  }
                  c.push(new this(r, { depth: o, asTree: n })), r = null;
                }
                (typeof u.canBeGrouped == "function" ? u.canBeGrouped(o) : void 0) ? r = [u] : c.push(u);
              }
              return r && c.push(new this(r, { depth: o, asTree: n })), c;
            }, t2.prototype.getObjects = function() {
              return this.objects;
            }, t2.prototype.getDepth = function() {
              return this.depth;
            }, t2.prototype.getCacheKey = function() {
              var t3, e2, n, i, o;
              for (e2 = ["objectGroup"], o = this.getObjects(), t3 = 0, n = o.length; n > t3; t3++)
                i = o[t3], e2.push(i.getCacheKey());
              return e2.join("/");
            }, t2;
          }();
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.ObjectMap = function(e2) {
            function n2(t3) {
              var e3, n3, i, o, r;
              for (t3 == null && (t3 = []), this.objects = {}, i = 0, o = t3.length; o > i; i++)
                r = t3[i], n3 = JSON.stringify(r), (e3 = this.objects)[n3] == null && (e3[n3] = r);
            }
            return t2(n2, e2), n2.prototype.find = function(t3) {
              var e3;
              return e3 = JSON.stringify(t3), this.objects[e3];
            }, n2;
          }(e.BasicObject);
        }.call(this), function() {
          e.ElementStore = function() {
            function t2(t3) {
              this.reset(t3);
            }
            var e2;
            return t2.prototype.add = function(t3) {
              var n;
              return n = e2(t3), this.elements[n] = t3;
            }, t2.prototype.remove = function(t3) {
              var n, i;
              return n = e2(t3), (i = this.elements[n]) ? (delete this.elements[n], i) : void 0;
            }, t2.prototype.reset = function(t3) {
              var e3, n, i;
              for (t3 == null && (t3 = []), this.elements = {}, n = 0, i = t3.length; i > n; n++)
                e3 = t3[n], this.add(e3);
              return t3;
            }, e2 = function(t3) {
              return t3.dataset.trixStoreKey;
            }, t2;
          }();
        }.call(this), function() {
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.Operation = function(e2) {
            function n2() {
              return n2.__super__.constructor.apply(this, arguments);
            }
            return t2(n2, e2), n2.prototype.isPerforming = function() {
              return this.performing === true;
            }, n2.prototype.hasPerformed = function() {
              return this.performed === true;
            }, n2.prototype.hasSucceeded = function() {
              return this.performed && this.succeeded;
            }, n2.prototype.hasFailed = function() {
              return this.performed && !this.succeeded;
            }, n2.prototype.getPromise = function() {
              return this.promise != null ? this.promise : this.promise = new Promise(function(t3) {
                return function(e3, n3) {
                  return t3.performing = true, t3.perform(function(i, o) {
                    return t3.succeeded = i, t3.performing = false, t3.performed = true, t3.succeeded ? e3(o) : n3(o);
                  });
                };
              }(this));
            }, n2.prototype.perform = function(t3) {
              return t3(false);
            }, n2.prototype.release = function() {
              var t3;
              return (t3 = this.promise) != null && typeof t3.cancel == "function" && t3.cancel(), this.promise = null, this.performing = null, this.performed = null, this.succeeded = null;
            }, n2.proxyMethod("getPromise().then"), n2.proxyMethod("getPromise().catch"), n2;
          }(e.BasicObject);
        }.call(this), function() {
          var t2, n, i, o, r, s = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              a.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, a = {}.hasOwnProperty;
          e.UTF16String = function(t3) {
            function e2(t4, e3) {
              this.ucs2String = t4, this.codepoints = e3, this.length = this.codepoints.length, this.ucs2Length = this.ucs2String.length;
            }
            return s(e2, t3), e2.box = function(t4) {
              return t4 == null && (t4 = ""), t4 instanceof this ? t4 : this.fromUCS2String(t4 != null ? t4.toString() : void 0);
            }, e2.fromUCS2String = function(t4) {
              return new this(t4, o(t4));
            }, e2.fromCodepoints = function(t4) {
              return new this(r(t4), t4);
            }, e2.prototype.offsetToUCS2Offset = function(t4) {
              return r(this.codepoints.slice(0, Math.max(0, t4))).length;
            }, e2.prototype.offsetFromUCS2Offset = function(t4) {
              return o(this.ucs2String.slice(0, Math.max(0, t4))).length;
            }, e2.prototype.slice = function() {
              var t4;
              return this.constructor.fromCodepoints((t4 = this.codepoints).slice.apply(t4, arguments));
            }, e2.prototype.charAt = function(t4) {
              return this.slice(t4, t4 + 1);
            }, e2.prototype.isEqualTo = function(t4) {
              return this.constructor.box(t4).ucs2String === this.ucs2String;
            }, e2.prototype.toJSON = function() {
              return this.ucs2String;
            }, e2.prototype.getCacheKey = function() {
              return this.ucs2String;
            }, e2.prototype.toString = function() {
              return this.ucs2String;
            }, e2;
          }(e.BasicObject), t2 = (typeof Array.from == "function" ? Array.from("\u{1F47C}").length : void 0) === 1, n = (typeof " ".codePointAt == "function" ? " ".codePointAt(0) : void 0) != null, i = (typeof String.fromCodePoint == "function" ? String.fromCodePoint(32, 128124) : void 0) === " \u{1F47C}", o = t2 && n ? function(t3) {
            return Array.from(t3).map(function(t4) {
              return t4.codePointAt(0);
            });
          } : function(t3) {
            var e2, n2, i2, o2, r2;
            for (o2 = [], e2 = 0, i2 = t3.length; i2 > e2; )
              r2 = t3.charCodeAt(e2++), r2 >= 55296 && 56319 >= r2 && i2 > e2 && (n2 = t3.charCodeAt(e2++), (64512 & n2) === 56320 ? r2 = ((1023 & r2) << 10) + (1023 & n2) + 65536 : e2--), o2.push(r2);
            return o2;
          }, r = i ? function(t3) {
            return String.fromCodePoint.apply(String, t3);
          } : function(t3) {
            var e2, n2, i2;
            return e2 = function() {
              var e3, o2, r2;
              for (r2 = [], e3 = 0, o2 = t3.length; o2 > e3; e3++)
                i2 = t3[e3], n2 = "", i2 > 65535 && (i2 -= 65536, n2 += String.fromCharCode(i2 >>> 10 & 1023 | 55296), i2 = 56320 | 1023 & i2), r2.push(n2 + String.fromCharCode(i2));
              return r2;
            }(), e2.join("");
          };
        }.call(this), function() {
        }.call(this), function() {
        }.call(this), function() {
          e.config.lang = { attachFiles: "Attach Files", bold: "Bold", bullets: "Bullets", "byte": "Byte", bytes: "Bytes", captionPlaceholder: "Add a caption\u2026", code: "Code", heading1: "Heading", indent: "Increase Level", italic: "Italic", link: "Link", numbers: "Numbers", outdent: "Decrease Level", quote: "Quote", redo: "Redo", remove: "Remove", strike: "Strikethrough", undo: "Undo", unlink: "Unlink", url: "URL", urlPlaceholder: "Enter a URL\u2026", GB: "GB", KB: "KB", MB: "MB", PB: "PB", TB: "TB" };
        }.call(this), function() {
          e.config.css = { attachment: "attachment", attachmentCaption: "attachment__caption", attachmentCaptionEditor: "attachment__caption-editor", attachmentMetadata: "attachment__metadata", attachmentMetadataContainer: "attachment__metadata-container", attachmentName: "attachment__name", attachmentProgress: "attachment__progress", attachmentSize: "attachment__size", attachmentToolbar: "attachment__toolbar", attachmentGallery: "attachment-gallery" };
        }.call(this), function() {
          var t2;
          e.config.blockAttributes = t2 = { "default": { tagName: "div", parse: false }, quote: { tagName: "blockquote", nestable: true }, heading1: { tagName: "h1", terminal: true, breakOnReturn: true, group: false }, code: { tagName: "pre", terminal: true, text: { plaintext: true } }, bulletList: { tagName: "ul", parse: false }, bullet: { tagName: "li", listAttribute: "bulletList", group: false, nestable: true, test: function(n) {
            return e.tagName(n.parentNode) === t2[this.listAttribute].tagName;
          } }, numberList: { tagName: "ol", parse: false }, number: { tagName: "li", listAttribute: "numberList", group: false, nestable: true, test: function(n) {
            return e.tagName(n.parentNode) === t2[this.listAttribute].tagName;
          } }, attachmentGallery: { tagName: "div", exclusive: true, terminal: true, parse: false, group: false } };
        }.call(this), function() {
          var t2, n;
          t2 = e.config.lang, n = [t2.bytes, t2.KB, t2.MB, t2.GB, t2.TB, t2.PB], e.config.fileSize = { prefix: "IEC", precision: 2, formatter: function(e2) {
            var i, o, r, s, a;
            switch (e2) {
              case 0:
                return "0 " + t2.bytes;
              case 1:
                return "1 " + t2.byte;
              default:
                return i = function() {
                  switch (this.prefix) {
                    case "SI":
                      return 1e3;
                    case "IEC":
                      return 1024;
                  }
                }.call(this), o = Math.floor(Math.log(e2) / Math.log(i)), r = e2 / Math.pow(i, o), s = r.toFixed(this.precision), a = s.replace(/0*$/, "").replace(/\.$/, ""), a + " " + n[o];
            }
          } };
        }.call(this), function() {
          e.config.textAttributes = { bold: { tagName: "strong", inheritable: true, parser: function(t2) {
            var e2;
            return e2 = window.getComputedStyle(t2), e2.fontWeight === "bold" || e2.fontWeight >= 600;
          } }, italic: { tagName: "em", inheritable: true, parser: function(t2) {
            var e2;
            return e2 = window.getComputedStyle(t2), e2.fontStyle === "italic";
          } }, href: { groupTagName: "a", parser: function(t2) {
            var n, i, o;
            return n = e.AttachmentView.attachmentSelector, o = "a:not(" + n + ")", (i = e.findClosestElementFromNode(t2, { matchingSelector: o })) ? i.getAttribute("href") : void 0;
          } }, strike: { tagName: "del", inheritable: true }, frozen: { style: { backgroundColor: "highlight" } } };
        }.call(this), function() {
          var t2, n, i, o, r;
          r = "[data-trix-serialize=false]", o = ["contenteditable", "data-trix-id", "data-trix-store-key", "data-trix-mutable", "data-trix-placeholder", "tabindex"], n = "data-trix-serialized-attributes", i = "[" + n + "]", t2 = new RegExp("<!--block-->", "g"), e.extend({ serializers: { "application/json": function(t3) {
            var n2;
            if (t3 instanceof e.Document)
              n2 = t3;
            else {
              if (!(t3 instanceof HTMLElement))
                throw new Error("unserializable object");
              n2 = e.Document.fromHTML(t3.innerHTML);
            }
            return n2.toSerializableDocument().toJSONString();
          }, "text/html": function(s) {
            var a, u, c, l, h, p, d, f, g, m, v, y, b, A, C3, x, w;
            if (s instanceof e.Document)
              l = e.DocumentView.render(s);
            else {
              if (!(s instanceof HTMLElement))
                throw new Error("unserializable object");
              l = s.cloneNode(true);
            }
            for (A = l.querySelectorAll(r), h = 0, g = A.length; g > h; h++)
              c = A[h], e.removeNode(c);
            for (p = 0, m = o.length; m > p; p++)
              for (a = o[p], C3 = l.querySelectorAll("[" + a + "]"), d = 0, v = C3.length; v > d; d++)
                c = C3[d], c.removeAttribute(a);
            for (x = l.querySelectorAll(i), f = 0, y = x.length; y > f; f++) {
              c = x[f];
              try {
                u = JSON.parse(c.getAttribute(n)), c.removeAttribute(n);
                for (b in u)
                  w = u[b], c.setAttribute(b, w);
              } catch (E) {
              }
            }
            return l.innerHTML.replace(t2, "");
          } }, deserializers: { "application/json": function(t3) {
            return e.Document.fromJSONString(t3);
          }, "text/html": function(t3) {
            return e.Document.fromHTML(t3);
          } }, serializeToContentType: function(t3, n2) {
            var i2;
            if (i2 = e.serializers[n2])
              return i2(t3);
            throw new Error("unknown content type: " + n2);
          }, deserializeFromContentType: function(t3, n2) {
            var i2;
            if (i2 = e.deserializers[n2])
              return i2(t3);
            throw new Error("unknown content type: " + n2);
          } });
        }.call(this), function() {
          var t2;
          t2 = e.config.lang, e.config.toolbar = { getDefaultHTML: function() {
            return '<div class="trix-button-row">\n  <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-bold" data-trix-attribute="bold" data-trix-key="b" title="' + t2.bold + '" tabindex="-1">' + t2.bold + '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-italic" data-trix-attribute="italic" data-trix-key="i" title="' + t2.italic + '" tabindex="-1">' + t2.italic + '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-strike" data-trix-attribute="strike" title="' + t2.strike + '" tabindex="-1">' + t2.strike + '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="' + t2.link + '" tabindex="-1">' + t2.link + '</button>\n  </span>\n\n  <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-heading-1" data-trix-attribute="heading1" title="' + t2.heading1 + '" tabindex="-1">' + t2.heading1 + '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" title="' + t2.quote + '" tabindex="-1">' + t2.quote + '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-code" data-trix-attribute="code" title="' + t2.code + '" tabindex="-1">' + t2.code + '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list" data-trix-attribute="bullet" title="' + t2.bullets + '" tabindex="-1">' + t2.bullets + '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-number-list" data-trix-attribute="number" title="' + t2.numbers + '" tabindex="-1">' + t2.numbers + '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-decrease-nesting-level" data-trix-action="decreaseNestingLevel" title="' + t2.outdent + '" tabindex="-1">' + t2.outdent + '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-increase-nesting-level" data-trix-action="increaseNestingLevel" title="' + t2.indent + '" tabindex="-1">' + t2.indent + '</button>\n  </span>\n\n  <span class="trix-button-group trix-button-group--file-tools" data-trix-button-group="file-tools">\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-attach" data-trix-action="attachFiles" title="' + t2.attachFiles + '" tabindex="-1">' + t2.attachFiles + '</button>\n  </span>\n\n  <span class="trix-button-group-spacer"></span>\n\n  <span class="trix-button-group trix-button-group--history-tools" data-trix-button-group="history-tools">\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-undo" data-trix-action="undo" data-trix-key="z" title="' + t2.undo + '" tabindex="-1">' + t2.undo + '</button>\n    <button type="button" class="trix-button trix-button--icon trix-button--icon-redo" data-trix-action="redo" data-trix-key="shift+z" title="' + t2.redo + '" tabindex="-1">' + t2.redo + '</button>\n  </span>\n</div>\n\n<div class="trix-dialogs" data-trix-dialogs>\n  <div class="trix-dialog trix-dialog--link" data-trix-dialog="href" data-trix-dialog-attribute="href">\n    <div class="trix-dialog__link-fields">\n      <input type="url" name="href" class="trix-input trix-input--dialog" placeholder="' + t2.urlPlaceholder + '" aria-label="' + t2.url + '" required data-trix-input>\n      <div class="trix-button-group">\n        <input type="button" class="trix-button trix-button--dialog" value="' + t2.link + '" data-trix-method="setAttribute">\n        <input type="button" class="trix-button trix-button--dialog" value="' + t2.unlink + '" data-trix-method="removeAttribute">\n      </div>\n    </div>\n  </div>\n</div>';
          } };
        }.call(this), function() {
          e.config.undoInterval = 5e3;
        }.call(this), function() {
          e.config.attachments = { preview: { presentation: "gallery", caption: { name: true, size: true } }, file: { caption: { size: true } } };
        }.call(this), function() {
          e.config.keyNames = { 8: "backspace", 9: "tab", 13: "return", 27: "escape", 37: "left", 39: "right", 46: "delete", 68: "d", 72: "h", 79: "o" };
        }.call(this), function() {
          e.config.input = { level2Enabled: true, getLevel: function() {
            return this.level2Enabled && e.browser.supportsInputEvents ? 2 : 0;
          }, pickFiles: function(t2) {
            var n;
            return n = e.makeElement("input", { type: "file", multiple: true, hidden: true, id: this.fileInputId }), n.addEventListener("change", function() {
              return t2(n.files), e.removeNode(n);
            }), e.removeNode(document.getElementById(this.fileInputId)), document.body.appendChild(n), n.click();
          }, fileInputId: "trix-file-input-" + Date.now().toString(16) };
        }.call(this), function() {
        }.call(this), function() {
          e.registerElement("trix-toolbar", { defaultCSS: "%t {\n  display: block;\n}\n\n%t {\n  white-space: nowrap;\n}\n\n%t [data-trix-dialog] {\n  display: none;\n}\n\n%t [data-trix-dialog][data-trix-active] {\n  display: block;\n}\n\n%t [data-trix-dialog] [data-trix-validate]:invalid {\n  background-color: #ffdddd;\n}", initialize: function() {
            return this.innerHTML === "" ? this.innerHTML = e.config.toolbar.getDefaultHTML() : void 0;
          } });
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i2() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i2.prototype = e2.prototype, t3.prototype = new i2(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty, i = [].indexOf || function(t3) {
            for (var e2 = 0, n2 = this.length; n2 > e2; e2++)
              if (e2 in this && this[e2] === t3)
                return e2;
            return -1;
          };
          e.ObjectView = function(n2) {
            function o(t3, e2) {
              this.object = t3, this.options = e2 != null ? e2 : {}, this.childViews = [], this.rootView = this;
            }
            return t2(o, n2), o.prototype.getNodes = function() {
              var t3, e2, n3, i2, o2;
              for (this.nodes == null && (this.nodes = this.createNodes()), i2 = this.nodes, o2 = [], t3 = 0, e2 = i2.length; e2 > t3; t3++)
                n3 = i2[t3], o2.push(n3.cloneNode(true));
              return o2;
            }, o.prototype.invalidate = function() {
              var t3;
              return this.nodes = null, this.childViews = [], (t3 = this.parentView) != null ? t3.invalidate() : void 0;
            }, o.prototype.invalidateViewForObject = function(t3) {
              var e2;
              return (e2 = this.findViewForObject(t3)) != null ? e2.invalidate() : void 0;
            }, o.prototype.findOrCreateCachedChildView = function(t3, e2) {
              var n3;
              return (n3 = this.getCachedViewForObject(e2)) ? this.recordChildView(n3) : (n3 = this.createChildView.apply(this, arguments), this.cacheViewForObject(n3, e2)), n3;
            }, o.prototype.createChildView = function(t3, n3, i2) {
              var o2;
              return i2 == null && (i2 = {}), n3 instanceof e.ObjectGroup && (i2.viewClass = t3, t3 = e.ObjectGroupView), o2 = new t3(n3, i2), this.recordChildView(o2);
            }, o.prototype.recordChildView = function(t3) {
              return t3.parentView = this, t3.rootView = this.rootView, this.childViews.push(t3), t3;
            }, o.prototype.getAllChildViews = function() {
              var t3, e2, n3, i2, o2;
              for (o2 = [], i2 = this.childViews, e2 = 0, n3 = i2.length; n3 > e2; e2++)
                t3 = i2[e2], o2.push(t3), o2 = o2.concat(t3.getAllChildViews());
              return o2;
            }, o.prototype.findElement = function() {
              return this.findElementForObject(this.object);
            }, o.prototype.findElementForObject = function(t3) {
              var e2;
              return (e2 = t3 != null ? t3.id : void 0) ? this.rootView.element.querySelector("[data-trix-id='" + e2 + "']") : void 0;
            }, o.prototype.findViewForObject = function(t3) {
              var e2, n3, i2, o2;
              for (i2 = this.getAllChildViews(), e2 = 0, n3 = i2.length; n3 > e2; e2++)
                if (o2 = i2[e2], o2.object === t3)
                  return o2;
            }, o.prototype.getViewCache = function() {
              return this.rootView !== this ? this.rootView.getViewCache() : this.isViewCachingEnabled() ? this.viewCache != null ? this.viewCache : this.viewCache = {} : void 0;
            }, o.prototype.isViewCachingEnabled = function() {
              return this.shouldCacheViews !== false;
            }, o.prototype.enableViewCaching = function() {
              return this.shouldCacheViews = true;
            }, o.prototype.disableViewCaching = function() {
              return this.shouldCacheViews = false;
            }, o.prototype.getCachedViewForObject = function(t3) {
              var e2;
              return (e2 = this.getViewCache()) != null ? e2[t3.getCacheKey()] : void 0;
            }, o.prototype.cacheViewForObject = function(t3, e2) {
              var n3;
              return (n3 = this.getViewCache()) != null ? n3[e2.getCacheKey()] = t3 : void 0;
            }, o.prototype.garbageCollectCachedViews = function() {
              var t3, e2, n3, o2, r, s;
              if (t3 = this.getViewCache()) {
                s = this.getAllChildViews().concat(this), n3 = function() {
                  var t4, e3, n4;
                  for (n4 = [], t4 = 0, e3 = s.length; e3 > t4; t4++)
                    r = s[t4], n4.push(r.object.getCacheKey());
                  return n4;
                }(), o2 = [];
                for (e2 in t3)
                  i.call(n3, e2) < 0 && o2.push(delete t3[e2]);
                return o2;
              }
            }, o;
          }(e.BasicObject);
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.ObjectGroupView = function(e2) {
            function n2() {
              n2.__super__.constructor.apply(this, arguments), this.objectGroup = this.object, this.viewClass = this.options.viewClass, delete this.options.viewClass;
            }
            return t2(n2, e2), n2.prototype.getChildViews = function() {
              var t3, e3, n3, i;
              if (!this.childViews.length)
                for (i = this.objectGroup.getObjects(), t3 = 0, e3 = i.length; e3 > t3; t3++)
                  n3 = i[t3], this.findOrCreateCachedChildView(this.viewClass, n3, this.options);
              return this.childViews;
            }, n2.prototype.createNodes = function() {
              var t3, e3, n3, i, o, r, s, a, u;
              for (t3 = this.createContainerElement(), s = this.getChildViews(), e3 = 0, i = s.length; i > e3; e3++)
                for (u = s[e3], a = u.getNodes(), n3 = 0, o = a.length; o > n3; n3++)
                  r = a[n3], t3.appendChild(r);
              return [t3];
            }, n2.prototype.createContainerElement = function(t3) {
              return t3 == null && (t3 = this.objectGroup.getDepth()), this.getChildViews()[0].createContainerElement(t3);
            }, n2;
          }(e.ObjectView);
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.Controller = function(e2) {
            function n2() {
              return n2.__super__.constructor.apply(this, arguments);
            }
            return t2(n2, e2), n2;
          }(e.BasicObject);
        }.call(this), function() {
          var t2, n, i, o, r, s, a = function(t3, e2) {
            return function() {
              return t3.apply(e2, arguments);
            };
          }, u = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              c.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, c = {}.hasOwnProperty, l = [].indexOf || function(t3) {
            for (var e2 = 0, n2 = this.length; n2 > e2; e2++)
              if (e2 in this && this[e2] === t3)
                return e2;
            return -1;
          };
          t2 = e.findClosestElementFromNode, i = e.nodeIsEmptyTextNode, n = e.nodeIsBlockStartComment, o = e.normalizeSpaces, r = e.summarizeStringChange, s = e.tagName, e.MutationObserver = function(e2) {
            function c2(t3) {
              this.element = t3, this.didMutate = a(this.didMutate, this), this.observer = new window.MutationObserver(this.didMutate), this.start();
            }
            var h, p, d, f;
            return u(c2, e2), p = "data-trix-mutable", d = "[" + p + "]", f = { attributes: true, childList: true, characterData: true, characterDataOldValue: true, subtree: true }, c2.prototype.start = function() {
              return this.reset(), this.observer.observe(this.element, f);
            }, c2.prototype.stop = function() {
              return this.observer.disconnect();
            }, c2.prototype.didMutate = function(t3) {
              var e3, n2;
              return (e3 = this.mutations).push.apply(e3, this.findSignificantMutations(t3)), this.mutations.length ? ((n2 = this.delegate) != null && typeof n2.elementDidMutate == "function" && n2.elementDidMutate(this.getMutationSummary()), this.reset()) : void 0;
            }, c2.prototype.reset = function() {
              return this.mutations = [];
            }, c2.prototype.findSignificantMutations = function(t3) {
              var e3, n2, i2, o2;
              for (o2 = [], e3 = 0, n2 = t3.length; n2 > e3; e3++)
                i2 = t3[e3], this.mutationIsSignificant(i2) && o2.push(i2);
              return o2;
            }, c2.prototype.mutationIsSignificant = function(t3) {
              var e3, n2, i2, o2;
              if (this.nodeIsMutable(t3.target))
                return false;
              for (o2 = this.nodesModifiedByMutation(t3), e3 = 0, n2 = o2.length; n2 > e3; e3++)
                if (i2 = o2[e3], this.nodeIsSignificant(i2))
                  return true;
              return false;
            }, c2.prototype.nodeIsSignificant = function(t3) {
              return t3 !== this.element && !this.nodeIsMutable(t3) && !i(t3);
            }, c2.prototype.nodeIsMutable = function(e3) {
              return t2(e3, { matchingSelector: d });
            }, c2.prototype.nodesModifiedByMutation = function(t3) {
              var e3;
              switch (e3 = [], t3.type) {
                case "attributes":
                  t3.attributeName !== p && e3.push(t3.target);
                  break;
                case "characterData":
                  e3.push(t3.target.parentNode), e3.push(t3.target);
                  break;
                case "childList":
                  e3.push.apply(e3, t3.addedNodes), e3.push.apply(e3, t3.removedNodes);
              }
              return e3;
            }, c2.prototype.getMutationSummary = function() {
              return this.getTextMutationSummary();
            }, c2.prototype.getTextMutationSummary = function() {
              var t3, e3, n2, i2, o2, r2, s2, a2, u2, c3, h2;
              for (a2 = this.getTextChangesFromCharacterData(), n2 = a2.additions, o2 = a2.deletions, h2 = this.getTextChangesFromChildList(), u2 = h2.additions, r2 = 0, s2 = u2.length; s2 > r2; r2++)
                e3 = u2[r2], l.call(n2, e3) < 0 && n2.push(e3);
              return o2.push.apply(o2, h2.deletions), c3 = {}, (t3 = n2.join("")) && (c3.textAdded = t3), (i2 = o2.join("")) && (c3.textDeleted = i2), c3;
            }, c2.prototype.getMutationsByType = function(t3) {
              var e3, n2, i2, o2, r2;
              for (o2 = this.mutations, r2 = [], e3 = 0, n2 = o2.length; n2 > e3; e3++)
                i2 = o2[e3], i2.type === t3 && r2.push(i2);
              return r2;
            }, c2.prototype.getTextChangesFromChildList = function() {
              var t3, e3, i2, r2, s2, a2, u2, c3, l2, p2, d2;
              for (t3 = [], u2 = [], a2 = this.getMutationsByType("childList"), e3 = 0, r2 = a2.length; r2 > e3; e3++)
                s2 = a2[e3], t3.push.apply(t3, s2.addedNodes), u2.push.apply(u2, s2.removedNodes);
              return c3 = t3.length === 0 && u2.length === 1 && n(u2[0]), c3 ? (p2 = [], d2 = ["\n"]) : (p2 = h(t3), d2 = h(u2)), { additions: function() {
                var t4, e4, n2;
                for (n2 = [], i2 = t4 = 0, e4 = p2.length; e4 > t4; i2 = ++t4)
                  l2 = p2[i2], l2 !== d2[i2] && n2.push(o(l2));
                return n2;
              }(), deletions: function() {
                var t4, e4, n2;
                for (n2 = [], i2 = t4 = 0, e4 = d2.length; e4 > t4; i2 = ++t4)
                  l2 = d2[i2], l2 !== p2[i2] && n2.push(o(l2));
                return n2;
              }() };
            }, c2.prototype.getTextChangesFromCharacterData = function() {
              var t3, e3, n2, i2, s2, a2, u2, c3;
              return e3 = this.getMutationsByType("characterData"), e3.length && (c3 = e3[0], n2 = e3[e3.length - 1], s2 = o(c3.oldValue), i2 = o(n2.target.data), a2 = r(s2, i2), t3 = a2.added, u2 = a2.removed), { additions: t3 ? [t3] : [], deletions: u2 ? [u2] : [] };
            }, h = function(t3) {
              var e3, n2, i2, o2;
              for (t3 == null && (t3 = []), o2 = [], e3 = 0, n2 = t3.length; n2 > e3; e3++)
                switch (i2 = t3[e3], i2.nodeType) {
                  case Node.TEXT_NODE:
                    o2.push(i2.data);
                    break;
                  case Node.ELEMENT_NODE:
                    s(i2) === "br" ? o2.push("\n") : o2.push.apply(o2, h(i2.childNodes));
                }
              return o2;
            }, c2;
          }(e.BasicObject);
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.FileVerificationOperation = function(e2) {
            function n2(t3) {
              this.file = t3;
            }
            return t2(n2, e2), n2.prototype.perform = function(t3) {
              var e3;
              return e3 = new FileReader(), e3.onerror = function() {
                return t3(false);
              }, e3.onload = function(n3) {
                return function() {
                  e3.onerror = null;
                  try {
                    e3.abort();
                  } catch (i) {
                  }
                  return t3(true, n3.file);
                };
              }(this), e3.readAsArrayBuffer(this.file);
            }, n2;
          }(e.Operation);
        }.call(this), function() {
          var t2, n, i = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              o.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, o = {}.hasOwnProperty;
          t2 = e.handleEvent, n = e.innerElementIsActive, e.InputController = function(o2) {
            function r(n2) {
              var i2;
              this.element = n2, this.mutationObserver = new e.MutationObserver(this.element), this.mutationObserver.delegate = this;
              for (i2 in this.events)
                t2(i2, { onElement: this.element, withCallback: this.handlerFor(i2) });
            }
            return i(r, o2), r.prototype.events = {}, r.prototype.elementDidMutate = function() {
            }, r.prototype.editorWillSyncDocumentView = function() {
              return this.mutationObserver.stop();
            }, r.prototype.editorDidSyncDocumentView = function() {
              return this.mutationObserver.start();
            }, r.prototype.requestRender = function() {
              var t3;
              return (t3 = this.delegate) != null && typeof t3.inputControllerDidRequestRender == "function" ? t3.inputControllerDidRequestRender() : void 0;
            }, r.prototype.requestReparse = function() {
              var t3;
              return (t3 = this.delegate) != null && typeof t3.inputControllerDidRequestReparse == "function" && t3.inputControllerDidRequestReparse(), this.requestRender();
            }, r.prototype.attachFiles = function(t3) {
              var n2, i2;
              return i2 = function() {
                var i3, o3, r2;
                for (r2 = [], i3 = 0, o3 = t3.length; o3 > i3; i3++)
                  n2 = t3[i3], r2.push(new e.FileVerificationOperation(n2));
                return r2;
              }(), Promise.all(i2).then(function(t4) {
                return function(e2) {
                  return t4.handleInput(function() {
                    var t5, n3;
                    return (t5 = this.delegate) != null && t5.inputControllerWillAttachFiles(), (n3 = this.responder) != null && n3.insertFiles(e2), this.requestRender();
                  });
                };
              }(this));
            }, r.prototype.handlerFor = function(t3) {
              return function(e2) {
                return function(i2) {
                  return i2.defaultPrevented ? void 0 : e2.handleInput(function() {
                    return n(this.element) ? void 0 : (this.eventName = t3, this.events[t3].call(this, i2));
                  });
                };
              }(this);
            }, r.prototype.handleInput = function(t3) {
              var e2, n2;
              try {
                return (e2 = this.delegate) != null && e2.inputControllerWillHandleInput(), t3.call(this);
              } finally {
                (n2 = this.delegate) != null && n2.inputControllerDidHandleInput();
              }
            }, r.prototype.createLinkHTML = function(t3, e2) {
              var n2;
              return n2 = document.createElement("a"), n2.href = t3, n2.textContent = e2 != null ? e2 : t3, n2.outerHTML;
            }, r;
          }(e.BasicObject);
        }.call(this), function() {
          var t2, n, i, o, r, s, a, u, c, l, h, p, d, f = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              g.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, g = {}.hasOwnProperty, m = [].indexOf || function(t3) {
            for (var e2 = 0, n2 = this.length; n2 > e2; e2++)
              if (e2 in this && this[e2] === t3)
                return e2;
            return -1;
          };
          c = e.makeElement, l = e.objectsAreEqual, d = e.tagName, n = e.browser, a = e.keyEventIsKeyboardCommand, o = e.dataTransferIsWritable, i = e.dataTransferIsPlainText, u = e.config.keyNames, e.Level0InputController = function(n2) {
            function s2() {
              s2.__super__.constructor.apply(this, arguments), this.resetInputSummary();
            }
            var d2;
            return f(s2, n2), d2 = 0, s2.prototype.setInputSummary = function(t3) {
              var e2, n3;
              t3 == null && (t3 = {}), this.inputSummary.eventName = this.eventName;
              for (e2 in t3)
                n3 = t3[e2], this.inputSummary[e2] = n3;
              return this.inputSummary;
            }, s2.prototype.resetInputSummary = function() {
              return this.inputSummary = {};
            }, s2.prototype.reset = function() {
              return this.resetInputSummary(), e.selectionChangeObserver.reset();
            }, s2.prototype.elementDidMutate = function(t3) {
              var e2;
              return this.isComposing() ? (e2 = this.delegate) != null && typeof e2.inputControllerDidAllowUnhandledInput == "function" ? e2.inputControllerDidAllowUnhandledInput() : void 0 : this.handleInput(function() {
                return this.mutationIsSignificant(t3) && (this.mutationIsExpected(t3) ? this.requestRender() : this.requestReparse()), this.reset();
              });
            }, s2.prototype.mutationIsExpected = function(t3) {
              var e2, n3, i2, o2, r2, s3, a2, u2, c2, l2;
              return a2 = t3.textAdded, u2 = t3.textDeleted, this.inputSummary.preferDocument ? true : (e2 = a2 != null ? a2 === this.inputSummary.textAdded : !this.inputSummary.textAdded, n3 = u2 != null ? this.inputSummary.didDelete : !this.inputSummary.didDelete, c2 = (a2 === "\n" || a2 === " \n") && !e2, l2 = u2 === "\n" && !n3, s3 = c2 && !l2 || l2 && !c2, s3 && (o2 = this.getSelectedRange()) && (i2 = c2 ? a2.replace(/\n$/, "").length || -1 : (a2 != null ? a2.length : void 0) || 1, (r2 = this.responder) != null ? r2.positionIsBlockBreak(o2[1] + i2) : void 0) ? true : e2 && n3);
            }, s2.prototype.mutationIsSignificant = function(t3) {
              var e2, n3, i2;
              return i2 = Object.keys(t3).length > 0, e2 = ((n3 = this.compositionInput) != null ? n3.getEndData() : void 0) === "", i2 || !e2;
            }, s2.prototype.events = { keydown: function(t3) {
              var n3, i2, o2, r2, s3, c2, l2, h2, p2;
              if (this.isComposing() || this.resetInputSummary(), this.inputSummary.didInput = true, r2 = u[t3.keyCode]) {
                for (i2 = this.keys, h2 = ["ctrl", "alt", "shift", "meta"], o2 = 0, c2 = h2.length; c2 > o2; o2++)
                  l2 = h2[o2], t3[l2 + "Key"] && (l2 === "ctrl" && (l2 = "control"), i2 = i2 != null ? i2[l2] : void 0);
                (i2 != null ? i2[r2] : void 0) != null && (this.setInputSummary({ keyName: r2 }), e.selectionChangeObserver.reset(), i2[r2].call(this, t3));
              }
              return a(t3) && (n3 = String.fromCharCode(t3.keyCode).toLowerCase()) && (s3 = function() {
                var e2, n4, i3, o3;
                for (i3 = ["alt", "shift"], o3 = [], e2 = 0, n4 = i3.length; n4 > e2; e2++)
                  l2 = i3[e2], t3[l2 + "Key"] && o3.push(l2);
                return o3;
              }(), s3.push(n3), (p2 = this.delegate) != null ? p2.inputControllerDidReceiveKeyboardCommand(s3) : void 0) ? t3.preventDefault() : void 0;
            }, keypress: function(t3) {
              var e2, n3, i2;
              if (this.inputSummary.eventName == null && !t3.metaKey && (!t3.ctrlKey || t3.altKey))
                return (i2 = p(t3)) ? ((e2 = this.delegate) != null && e2.inputControllerWillPerformTyping(), (n3 = this.responder) != null && n3.insertString(i2), this.setInputSummary({ textAdded: i2, didDelete: this.selectionIsExpanded() })) : void 0;
            }, textInput: function(t3) {
              var e2, n3, i2, o2;
              return e2 = t3.data, o2 = this.inputSummary.textAdded, o2 && o2 !== e2 && o2.toUpperCase() === e2 ? (n3 = this.getSelectedRange(), this.setSelectedRange([n3[0], n3[1] + o2.length]), (i2 = this.responder) != null && i2.insertString(e2), this.setInputSummary({ textAdded: e2 }), this.setSelectedRange(n3)) : void 0;
            }, dragenter: function(t3) {
              return t3.preventDefault();
            }, dragstart: function(t3) {
              var e2, n3;
              return n3 = t3.target, this.serializeSelectionToDataTransfer(t3.dataTransfer), this.draggedRange = this.getSelectedRange(), (e2 = this.delegate) != null && typeof e2.inputControllerDidStartDrag == "function" ? e2.inputControllerDidStartDrag() : void 0;
            }, dragover: function(t3) {
              var e2, n3;
              return !this.draggedRange && !this.canAcceptDataTransfer(t3.dataTransfer) || (t3.preventDefault(), e2 = { x: t3.clientX, y: t3.clientY }, l(e2, this.draggingPoint)) ? void 0 : (this.draggingPoint = e2, (n3 = this.delegate) != null && typeof n3.inputControllerDidReceiveDragOverPoint == "function" ? n3.inputControllerDidReceiveDragOverPoint(this.draggingPoint) : void 0);
            }, dragend: function() {
              var t3;
              return (t3 = this.delegate) != null && typeof t3.inputControllerDidCancelDrag == "function" && t3.inputControllerDidCancelDrag(), this.draggedRange = null, this.draggingPoint = null;
            }, drop: function(t3) {
              var n3, i2, o2, r2, s3, a2, u2, c2, l2;
              return t3.preventDefault(), o2 = (s3 = t3.dataTransfer) != null ? s3.files : void 0, r2 = { x: t3.clientX, y: t3.clientY }, (a2 = this.responder) != null && a2.setLocationRangeFromPointRange(r2), (o2 != null ? o2.length : void 0) ? this.attachFiles(o2) : this.draggedRange ? ((u2 = this.delegate) != null && u2.inputControllerWillMoveText(), (c2 = this.responder) != null && c2.moveTextFromRange(this.draggedRange), this.draggedRange = null, this.requestRender()) : (i2 = t3.dataTransfer.getData("application/x-trix-document")) && (n3 = e.Document.fromJSONString(i2), (l2 = this.responder) != null && l2.insertDocument(n3), this.requestRender()), this.draggedRange = null, this.draggingPoint = null;
            }, cut: function(t3) {
              var e2, n3;
              return ((e2 = this.responder) != null ? e2.selectionIsExpanded() : void 0) && (this.serializeSelectionToDataTransfer(t3.clipboardData) && t3.preventDefault(), (n3 = this.delegate) != null && n3.inputControllerWillCutText(), this.deleteInDirection("backward"), t3.defaultPrevented) ? this.requestRender() : void 0;
            }, copy: function(t3) {
              var e2;
              return ((e2 = this.responder) != null ? e2.selectionIsExpanded() : void 0) && this.serializeSelectionToDataTransfer(t3.clipboardData) ? t3.preventDefault() : void 0;
            }, paste: function(t3) {
              var n3, o2, s3, a2, u2, c2, l2, p2, f2, g2, v, y, b, A, C3, x, w, E, S2, R, k, D2, L2;
              return n3 = (p2 = t3.clipboardData) != null ? p2 : t3.testClipboardData, l2 = { clipboard: n3 }, n3 == null || h(t3) ? void this.getPastedHTMLUsingHiddenElement(function(t4) {
                return function(e2) {
                  var n4, i2, o3;
                  return l2.type = "text/html", l2.html = e2, (n4 = t4.delegate) != null && n4.inputControllerWillPaste(l2), (i2 = t4.responder) != null && i2.insertHTML(l2.html), t4.requestRender(), (o3 = t4.delegate) != null ? o3.inputControllerDidPaste(l2) : void 0;
                };
              }(this)) : ((a2 = n3.getData("URL")) ? (l2.type = "text/html", L2 = (c2 = n3.getData("public.url-name")) ? e.squishBreakableWhitespace(c2).trim() : a2, l2.html = this.createLinkHTML(a2, L2), (f2 = this.delegate) != null && f2.inputControllerWillPaste(l2), this.setInputSummary({ textAdded: L2, didDelete: this.selectionIsExpanded() }), (C3 = this.responder) != null && C3.insertHTML(l2.html), this.requestRender(), (x = this.delegate) != null && x.inputControllerDidPaste(l2)) : i(n3) ? (l2.type = "text/plain", l2.string = n3.getData("text/plain"), (w = this.delegate) != null && w.inputControllerWillPaste(l2), this.setInputSummary({ textAdded: l2.string, didDelete: this.selectionIsExpanded() }), (E = this.responder) != null && E.insertString(l2.string), this.requestRender(), (S2 = this.delegate) != null && S2.inputControllerDidPaste(l2)) : (u2 = n3.getData("text/html")) ? (l2.type = "text/html", l2.html = u2, (R = this.delegate) != null && R.inputControllerWillPaste(l2), (k = this.responder) != null && k.insertHTML(l2.html), this.requestRender(), (D2 = this.delegate) != null && D2.inputControllerDidPaste(l2)) : m.call(n3.types, "Files") >= 0 && (s3 = (g2 = n3.items) != null && (v = g2[0]) != null && typeof v.getAsFile == "function" ? v.getAsFile() : void 0) && (!s3.name && (o2 = r(s3)) && (s3.name = "pasted-file-" + ++d2 + "." + o2), l2.type = "File", l2.file = s3, (y = this.delegate) != null && y.inputControllerWillAttachFiles(), (b = this.responder) != null && b.insertFile(l2.file), this.requestRender(), (A = this.delegate) != null && A.inputControllerDidPaste(l2)), t3.preventDefault());
            }, compositionstart: function(t3) {
              return this.getCompositionInput().start(t3.data);
            }, compositionupdate: function(t3) {
              return this.getCompositionInput().update(t3.data);
            }, compositionend: function(t3) {
              return this.getCompositionInput().end(t3.data);
            }, beforeinput: function() {
              return this.inputSummary.didInput = true;
            }, input: function(t3) {
              return this.inputSummary.didInput = true, t3.stopPropagation();
            } }, s2.prototype.keys = { backspace: function(t3) {
              var e2;
              return (e2 = this.delegate) != null && e2.inputControllerWillPerformTyping(), this.deleteInDirection("backward", t3);
            }, "delete": function(t3) {
              var e2;
              return (e2 = this.delegate) != null && e2.inputControllerWillPerformTyping(), this.deleteInDirection("forward", t3);
            }, "return": function() {
              var t3, e2;
              return this.setInputSummary({ preferDocument: true }), (t3 = this.delegate) != null && t3.inputControllerWillPerformTyping(), (e2 = this.responder) != null ? e2.insertLineBreak() : void 0;
            }, tab: function(t3) {
              var e2, n3;
              return ((e2 = this.responder) != null ? e2.canIncreaseNestingLevel() : void 0) ? ((n3 = this.responder) != null && n3.increaseNestingLevel(), this.requestRender(), t3.preventDefault()) : void 0;
            }, left: function(t3) {
              var e2;
              return this.selectionIsInCursorTarget() ? (t3.preventDefault(), (e2 = this.responder) != null ? e2.moveCursorInDirection("backward") : void 0) : void 0;
            }, right: function(t3) {
              var e2;
              return this.selectionIsInCursorTarget() ? (t3.preventDefault(), (e2 = this.responder) != null ? e2.moveCursorInDirection("forward") : void 0) : void 0;
            }, control: { d: function(t3) {
              var e2;
              return (e2 = this.delegate) != null && e2.inputControllerWillPerformTyping(), this.deleteInDirection("forward", t3);
            }, h: function(t3) {
              var e2;
              return (e2 = this.delegate) != null && e2.inputControllerWillPerformTyping(), this.deleteInDirection("backward", t3);
            }, o: function(t3) {
              var e2, n3;
              return t3.preventDefault(), (e2 = this.delegate) != null && e2.inputControllerWillPerformTyping(), (n3 = this.responder) != null && n3.insertString("\n", { updatePosition: false }), this.requestRender();
            } }, shift: { "return": function(t3) {
              var e2, n3;
              return (e2 = this.delegate) != null && e2.inputControllerWillPerformTyping(), (n3 = this.responder) != null && n3.insertString("\n"), this.requestRender(), t3.preventDefault();
            }, tab: function(t3) {
              var e2, n3;
              return ((e2 = this.responder) != null ? e2.canDecreaseNestingLevel() : void 0) ? ((n3 = this.responder) != null && n3.decreaseNestingLevel(), this.requestRender(), t3.preventDefault()) : void 0;
            }, left: function(t3) {
              return this.selectionIsInCursorTarget() ? (t3.preventDefault(), this.expandSelectionInDirection("backward")) : void 0;
            }, right: function(t3) {
              return this.selectionIsInCursorTarget() ? (t3.preventDefault(), this.expandSelectionInDirection("forward")) : void 0;
            } }, alt: { backspace: function() {
              var t3;
              return this.setInputSummary({ preferDocument: false }), (t3 = this.delegate) != null ? t3.inputControllerWillPerformTyping() : void 0;
            } }, meta: { backspace: function() {
              var t3;
              return this.setInputSummary({ preferDocument: false }), (t3 = this.delegate) != null ? t3.inputControllerWillPerformTyping() : void 0;
            } } }, s2.prototype.getCompositionInput = function() {
              return this.isComposing() ? this.compositionInput : this.compositionInput = new t2(this);
            }, s2.prototype.isComposing = function() {
              return this.compositionInput != null && !this.compositionInput.isEnded();
            }, s2.prototype.deleteInDirection = function(t3, e2) {
              var n3;
              return ((n3 = this.responder) != null ? n3.deleteInDirection(t3) : void 0) !== false ? this.setInputSummary({ didDelete: true }) : e2 ? (e2.preventDefault(), this.requestRender()) : void 0;
            }, s2.prototype.serializeSelectionToDataTransfer = function(t3) {
              var n3, i2;
              if (o(t3))
                return n3 = (i2 = this.responder) != null ? i2.getSelectedDocument().toSerializableDocument() : void 0, t3.setData("application/x-trix-document", JSON.stringify(n3)), t3.setData("text/html", e.DocumentView.render(n3).innerHTML), t3.setData("text/plain", n3.toString().replace(/\n$/, "")), true;
            }, s2.prototype.canAcceptDataTransfer = function(t3) {
              var e2, n3, i2, o2, r2, s3;
              for (s3 = {}, o2 = (i2 = t3 != null ? t3.types : void 0) != null ? i2 : [], e2 = 0, n3 = o2.length; n3 > e2; e2++)
                r2 = o2[e2], s3[r2] = true;
              return s3.Files || s3["application/x-trix-document"] || s3["text/html"] || s3["text/plain"];
            }, s2.prototype.getPastedHTMLUsingHiddenElement = function(t3) {
              var n3, i2, o2;
              return i2 = this.getSelectedRange(), o2 = { position: "absolute", left: window.pageXOffset + "px", top: window.pageYOffset + "px", opacity: 0 }, n3 = c({ style: o2, tagName: "div", editable: true }), document.body.appendChild(n3), n3.focus(), requestAnimationFrame(function(o3) {
                return function() {
                  var r2;
                  return r2 = n3.innerHTML, e.removeNode(n3), o3.setSelectedRange(i2), t3(r2);
                };
              }(this));
            }, s2.proxyMethod("responder?.getSelectedRange"), s2.proxyMethod("responder?.setSelectedRange"), s2.proxyMethod("responder?.expandSelectionInDirection"), s2.proxyMethod("responder?.selectionIsInCursorTarget"), s2.proxyMethod("responder?.selectionIsExpanded"), s2;
          }(e.InputController), r = function(t3) {
            var e2, n2;
            return (e2 = t3.type) != null && (n2 = e2.match(/\/(\w+)$/)) != null ? n2[1] : void 0;
          }, s = (typeof " ".codePointAt == "function" ? " ".codePointAt(0) : void 0) != null, p = function(t3) {
            var n2;
            return t3.key && s && t3.key.codePointAt(0) === t3.keyCode ? t3.key : (t3.which === null ? n2 = t3.keyCode : t3.which !== 0 && t3.charCode !== 0 && (n2 = t3.charCode), n2 != null && u[n2] !== "escape" ? e.UTF16String.fromCodepoints([n2]).toString() : void 0);
          }, h = function(t3) {
            var e2, n2, i2, o2, r2, s2, a2, u2, c2, l2;
            if (u2 = t3.clipboardData) {
              if (m.call(u2.types, "text/html") >= 0) {
                for (c2 = u2.types, i2 = 0, s2 = c2.length; s2 > i2; i2++)
                  if (l2 = c2[i2], e2 = /^CorePasteboardFlavorType/.test(l2), n2 = /^dyn\./.test(l2) && u2.getData(l2), a2 = e2 || n2)
                    return true;
                return false;
              }
              return o2 = m.call(u2.types, "com.apple.webarchive") >= 0, r2 = m.call(u2.types, "com.apple.flat-rtfd") >= 0, o2 || r2;
            }
          }, t2 = function(t3) {
            function e2(t4) {
              var e3;
              this.inputController = t4, e3 = this.inputController, this.responder = e3.responder, this.delegate = e3.delegate, this.inputSummary = e3.inputSummary, this.data = {};
            }
            return f(e2, t3), e2.prototype.start = function(t4) {
              var e3, n2;
              return this.data.start = t4, this.isSignificant() ? (this.inputSummary.eventName === "keypress" && this.inputSummary.textAdded && (e3 = this.responder) != null && e3.deleteInDirection("left"), this.selectionIsExpanded() || (this.insertPlaceholder(), this.requestRender()), this.range = (n2 = this.responder) != null ? n2.getSelectedRange() : void 0) : void 0;
            }, e2.prototype.update = function(t4) {
              var e3;
              return this.data.update = t4, this.isSignificant() && (e3 = this.selectPlaceholder()) ? (this.forgetPlaceholder(), this.range = e3) : void 0;
            }, e2.prototype.end = function(t4) {
              var e3, n2, i2, o2;
              return this.data.end = t4, this.isSignificant() ? (this.forgetPlaceholder(), this.canApplyToDocument() ? (this.setInputSummary({ preferDocument: true, didInput: false }), (e3 = this.delegate) != null && e3.inputControllerWillPerformTyping(), (n2 = this.responder) != null && n2.setSelectedRange(this.range), (i2 = this.responder) != null && i2.insertString(this.data.end), (o2 = this.responder) != null ? o2.setSelectedRange(this.range[0] + this.data.end.length) : void 0) : this.data.start != null || this.data.update != null ? (this.requestReparse(), this.inputController.reset()) : void 0) : this.inputController.reset();
            }, e2.prototype.getEndData = function() {
              return this.data.end;
            }, e2.prototype.isEnded = function() {
              return this.getEndData() != null;
            }, e2.prototype.isSignificant = function() {
              return n.composesExistingText ? this.inputSummary.didInput : true;
            }, e2.prototype.canApplyToDocument = function() {
              var t4, e3;
              return ((t4 = this.data.start) != null ? t4.length : void 0) === 0 && ((e3 = this.data.end) != null ? e3.length : void 0) > 0 && this.range != null;
            }, e2.proxyMethod("inputController.setInputSummary"), e2.proxyMethod("inputController.requestRender"), e2.proxyMethod("inputController.requestReparse"), e2.proxyMethod("responder?.selectionIsExpanded"), e2.proxyMethod("responder?.insertPlaceholder"), e2.proxyMethod("responder?.selectPlaceholder"), e2.proxyMethod("responder?.forgetPlaceholder"), e2;
          }(e.BasicObject);
        }.call(this), function() {
          var t2, n, i, o = function(t3, e2) {
            return function() {
              return t3.apply(e2, arguments);
            };
          }, r = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              s.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, s = {}.hasOwnProperty, a = [].indexOf || function(t3) {
            for (var e2 = 0, n2 = this.length; n2 > e2; e2++)
              if (e2 in this && this[e2] === t3)
                return e2;
            return -1;
          };
          t2 = e.dataTransferIsPlainText, n = e.keyEventIsKeyboardCommand, i = e.objectsAreEqual, e.Level2InputController = function(s2) {
            function u() {
              return this.render = o(this.render, this), u.__super__.constructor.apply(this, arguments);
            }
            var c, l, h, p, d, f;
            return r(u, s2), u.prototype.elementDidMutate = function() {
              var t3;
              return this.scheduledRender ? this.composing && (t3 = this.delegate) != null && typeof t3.inputControllerDidAllowUnhandledInput == "function" ? t3.inputControllerDidAllowUnhandledInput() : void 0 : this.reparse();
            }, u.prototype.scheduleRender = function() {
              return this.scheduledRender != null ? this.scheduledRender : this.scheduledRender = requestAnimationFrame(this.render);
            }, u.prototype.render = function() {
              var t3;
              return cancelAnimationFrame(this.scheduledRender), this.scheduledRender = null, this.composing || (t3 = this.delegate) != null && t3.render(), typeof this.afterRender == "function" && this.afterRender(), this.afterRender = null;
            }, u.prototype.reparse = function() {
              var t3;
              return (t3 = this.delegate) != null ? t3.reparse() : void 0;
            }, u.prototype.events = { keydown: function(t3) {
              var e2, i2, o2, r2;
              if (n(t3)) {
                if (e2 = l(t3), (r2 = this.delegate) != null ? r2.inputControllerDidReceiveKeyboardCommand(e2) : void 0)
                  return t3.preventDefault();
              } else if (o2 = t3.key, t3.altKey && (o2 += "+Alt"), t3.shiftKey && (o2 += "+Shift"), i2 = this.keys[o2])
                return this.withEvent(t3, i2);
            }, paste: function(t3) {
              var e2, n2, i2, o2, r2, s3, a2, u2, c2;
              return h(t3) ? (t3.preventDefault(), this.attachFiles(t3.clipboardData.files)) : p(t3) ? (t3.preventDefault(), n2 = { type: "text/plain", string: t3.clipboardData.getData("text/plain") }, (i2 = this.delegate) != null && i2.inputControllerWillPaste(n2), (o2 = this.responder) != null && o2.insertString(n2.string), this.render(), (r2 = this.delegate) != null ? r2.inputControllerDidPaste(n2) : void 0) : (e2 = (s3 = t3.clipboardData) != null ? s3.getData("URL") : void 0) ? (t3.preventDefault(), n2 = { type: "text/html", html: this.createLinkHTML(e2) }, (a2 = this.delegate) != null && a2.inputControllerWillPaste(n2), (u2 = this.responder) != null && u2.insertHTML(n2.html), this.render(), (c2 = this.delegate) != null ? c2.inputControllerDidPaste(n2) : void 0) : void 0;
            }, beforeinput: function(t3) {
              var e2;
              return (e2 = this.inputTypes[t3.inputType]) ? (this.withEvent(t3, e2), this.scheduleRender()) : void 0;
            }, input: function() {
              return e.selectionChangeObserver.reset();
            }, dragstart: function(t3) {
              var e2, n2;
              return ((e2 = this.responder) != null ? e2.selectionContainsAttachments() : void 0) ? (t3.dataTransfer.setData("application/x-trix-dragging", true), this.dragging = { range: (n2 = this.responder) != null ? n2.getSelectedRange() : void 0, point: d(t3) }) : void 0;
            }, dragenter: function(t3) {
              return c(t3) ? t3.preventDefault() : void 0;
            }, dragover: function(t3) {
              var e2, n2;
              if (this.dragging) {
                if (t3.preventDefault(), e2 = d(t3), !i(e2, this.dragging.point))
                  return this.dragging.point = e2, (n2 = this.responder) != null ? n2.setLocationRangeFromPointRange(e2) : void 0;
              } else if (c(t3))
                return t3.preventDefault();
            }, drop: function(t3) {
              var e2, n2, i2, o2;
              return this.dragging ? (t3.preventDefault(), (n2 = this.delegate) != null && n2.inputControllerWillMoveText(), (i2 = this.responder) != null && i2.moveTextFromRange(this.dragging.range), this.dragging = null, this.scheduleRender()) : c(t3) ? (t3.preventDefault(), e2 = d(t3), (o2 = this.responder) != null && o2.setLocationRangeFromPointRange(e2), this.attachFiles(t3.dataTransfer.files)) : void 0;
            }, dragend: function() {
              var t3;
              return this.dragging ? ((t3 = this.responder) != null && t3.setSelectedRange(this.dragging.range), this.dragging = null) : void 0;
            }, compositionend: function() {
              return this.composing ? (this.composing = false, this.scheduleRender()) : void 0;
            } }, u.prototype.keys = { ArrowLeft: function() {
              var t3, e2;
              return ((t3 = this.responder) != null ? t3.shouldManageMovingCursorInDirection("backward") : void 0) ? (this.event.preventDefault(), (e2 = this.responder) != null ? e2.moveCursorInDirection("backward") : void 0) : void 0;
            }, ArrowRight: function() {
              var t3, e2;
              return ((t3 = this.responder) != null ? t3.shouldManageMovingCursorInDirection("forward") : void 0) ? (this.event.preventDefault(), (e2 = this.responder) != null ? e2.moveCursorInDirection("forward") : void 0) : void 0;
            }, Backspace: function() {
              var t3, e2, n2;
              return ((t3 = this.responder) != null ? t3.shouldManageDeletingInDirection("backward") : void 0) ? (this.event.preventDefault(), (e2 = this.delegate) != null && e2.inputControllerWillPerformTyping(), (n2 = this.responder) != null && n2.deleteInDirection("backward"), this.render()) : void 0;
            }, Tab: function() {
              var t3, e2;
              return ((t3 = this.responder) != null ? t3.canIncreaseNestingLevel() : void 0) ? (this.event.preventDefault(), (e2 = this.responder) != null && e2.increaseNestingLevel(), this.render()) : void 0;
            }, "Tab+Shift": function() {
              var t3, e2;
              return ((t3 = this.responder) != null ? t3.canDecreaseNestingLevel() : void 0) ? (this.event.preventDefault(), (e2 = this.responder) != null && e2.decreaseNestingLevel(), this.render()) : void 0;
            } }, u.prototype.inputTypes = { deleteByComposition: function() {
              return this.deleteInDirection("backward", { recordUndoEntry: false });
            }, deleteByCut: function() {
              return this.deleteInDirection("backward");
            }, deleteByDrag: function() {
              return this.event.preventDefault(), this.withTargetDOMRange(function() {
                var t3;
                return this.deleteByDragRange = (t3 = this.responder) != null ? t3.getSelectedRange() : void 0;
              });
            }, deleteCompositionText: function() {
              return this.deleteInDirection("backward", { recordUndoEntry: false });
            }, deleteContent: function() {
              return this.deleteInDirection("backward");
            }, deleteContentBackward: function() {
              return this.deleteInDirection("backward");
            }, deleteContentForward: function() {
              return this.deleteInDirection("forward");
            }, deleteEntireSoftLine: function() {
              return this.deleteInDirection("forward");
            }, deleteHardLineBackward: function() {
              return this.deleteInDirection("backward");
            }, deleteHardLineForward: function() {
              return this.deleteInDirection("forward");
            }, deleteSoftLineBackward: function() {
              return this.deleteInDirection("backward");
            }, deleteSoftLineForward: function() {
              return this.deleteInDirection("forward");
            }, deleteWordBackward: function() {
              return this.deleteInDirection("backward");
            }, deleteWordForward: function() {
              return this.deleteInDirection("forward");
            }, formatBackColor: function() {
              return this.activateAttributeIfSupported("backgroundColor", this.event.data);
            }, formatBold: function() {
              return this.toggleAttributeIfSupported("bold");
            }, formatFontColor: function() {
              return this.activateAttributeIfSupported("color", this.event.data);
            }, formatFontName: function() {
              return this.activateAttributeIfSupported("font", this.event.data);
            }, formatIndent: function() {
              var t3;
              return ((t3 = this.responder) != null ? t3.canIncreaseNestingLevel() : void 0) ? this.withTargetDOMRange(function() {
                var t4;
                return (t4 = this.responder) != null ? t4.increaseNestingLevel() : void 0;
              }) : void 0;
            }, formatItalic: function() {
              return this.toggleAttributeIfSupported("italic");
            }, formatJustifyCenter: function() {
              return this.toggleAttributeIfSupported("justifyCenter");
            }, formatJustifyFull: function() {
              return this.toggleAttributeIfSupported("justifyFull");
            }, formatJustifyLeft: function() {
              return this.toggleAttributeIfSupported("justifyLeft");
            }, formatJustifyRight: function() {
              return this.toggleAttributeIfSupported("justifyRight");
            }, formatOutdent: function() {
              var t3;
              return ((t3 = this.responder) != null ? t3.canDecreaseNestingLevel() : void 0) ? this.withTargetDOMRange(function() {
                var t4;
                return (t4 = this.responder) != null ? t4.decreaseNestingLevel() : void 0;
              }) : void 0;
            }, formatRemove: function() {
              return this.withTargetDOMRange(function() {
                var t3, e2, n2, i2;
                i2 = [];
                for (t3 in (e2 = this.responder) != null ? e2.getCurrentAttributes() : void 0)
                  i2.push((n2 = this.responder) != null ? n2.removeCurrentAttribute(t3) : void 0);
                return i2;
              });
            }, formatSetBlockTextDirection: function() {
              return this.activateAttributeIfSupported("blockDir", this.event.data);
            }, formatSetInlineTextDirection: function() {
              return this.activateAttributeIfSupported("textDir", this.event.data);
            }, formatStrikeThrough: function() {
              return this.toggleAttributeIfSupported("strike");
            }, formatSubscript: function() {
              return this.toggleAttributeIfSupported("sub");
            }, formatSuperscript: function() {
              return this.toggleAttributeIfSupported("sup");
            }, formatUnderline: function() {
              return this.toggleAttributeIfSupported("underline");
            }, historyRedo: function() {
              var t3;
              return (t3 = this.delegate) != null ? t3.inputControllerWillPerformRedo() : void 0;
            }, historyUndo: function() {
              var t3;
              return (t3 = this.delegate) != null ? t3.inputControllerWillPerformUndo() : void 0;
            }, insertCompositionText: function() {
              return this.composing = true, this.insertString(this.event.data);
            }, insertFromComposition: function() {
              return this.composing = false, this.insertString(this.event.data);
            }, insertFromDrop: function() {
              var t3, e2;
              return (t3 = this.deleteByDragRange) ? (this.deleteByDragRange = null, (e2 = this.delegate) != null && e2.inputControllerWillMoveText(), this.withTargetDOMRange(function() {
                var e3;
                return (e3 = this.responder) != null ? e3.moveTextFromRange(t3) : void 0;
              })) : void 0;
            }, insertFromPaste: function() {
              var n2, i2, o2, r2, s3, a2, u2, c2, l2, h2, p2;
              return n2 = this.event.dataTransfer, s3 = { dataTransfer: n2 }, (i2 = n2.getData("URL")) ? (this.event.preventDefault(), s3.type = "text/html", p2 = (r2 = n2.getData("public.url-name")) ? e.squishBreakableWhitespace(r2).trim() : i2, s3.html = this.createLinkHTML(i2, p2), (a2 = this.delegate) != null && a2.inputControllerWillPaste(s3), this.withTargetDOMRange(function() {
                var t3;
                return (t3 = this.responder) != null ? t3.insertHTML(s3.html) : void 0;
              }), this.afterRender = function(t3) {
                return function() {
                  var e2;
                  return (e2 = t3.delegate) != null ? e2.inputControllerDidPaste(s3) : void 0;
                };
              }(this)) : t2(n2) ? (s3.type = "text/plain", s3.string = n2.getData("text/plain"), (u2 = this.delegate) != null && u2.inputControllerWillPaste(s3), this.withTargetDOMRange(function() {
                var t3;
                return (t3 = this.responder) != null ? t3.insertString(s3.string) : void 0;
              }), this.afterRender = function(t3) {
                return function() {
                  var e2;
                  return (e2 = t3.delegate) != null ? e2.inputControllerDidPaste(s3) : void 0;
                };
              }(this)) : (o2 = n2.getData("text/html")) ? (this.event.preventDefault(), s3.type = "text/html", s3.html = o2, (c2 = this.delegate) != null && c2.inputControllerWillPaste(s3), this.withTargetDOMRange(function() {
                var t3;
                return (t3 = this.responder) != null ? t3.insertHTML(s3.html) : void 0;
              }), this.afterRender = function(t3) {
                return function() {
                  var e2;
                  return (e2 = t3.delegate) != null ? e2.inputControllerDidPaste(s3) : void 0;
                };
              }(this)) : ((l2 = n2.files) != null ? l2.length : void 0) ? (s3.type = "File", s3.file = n2.files[0], (h2 = this.delegate) != null && h2.inputControllerWillPaste(s3), this.withTargetDOMRange(function() {
                var t3;
                return (t3 = this.responder) != null ? t3.insertFile(s3.file) : void 0;
              }), this.afterRender = function(t3) {
                return function() {
                  var e2;
                  return (e2 = t3.delegate) != null ? e2.inputControllerDidPaste(s3) : void 0;
                };
              }(this)) : void 0;
            }, insertFromYank: function() {
              return this.insertString(this.event.data);
            }, insertLineBreak: function() {
              return this.insertString("\n");
            }, insertLink: function() {
              return this.activateAttributeIfSupported("href", this.event.data);
            }, insertOrderedList: function() {
              return this.toggleAttributeIfSupported("number");
            }, insertParagraph: function() {
              var t3;
              return (t3 = this.delegate) != null && t3.inputControllerWillPerformTyping(), this.withTargetDOMRange(function() {
                var t4;
                return (t4 = this.responder) != null ? t4.insertLineBreak() : void 0;
              });
            }, insertReplacementText: function() {
              return this.insertString(this.event.dataTransfer.getData("text/plain"), { updatePosition: false });
            }, insertText: function() {
              var t3, e2;
              return this.insertString((t3 = this.event.data) != null ? t3 : (e2 = this.event.dataTransfer) != null ? e2.getData("text/plain") : void 0);
            }, insertTranspose: function() {
              return this.insertString(this.event.data);
            }, insertUnorderedList: function() {
              return this.toggleAttributeIfSupported("bullet");
            } }, u.prototype.insertString = function(t3, e2) {
              var n2;
              return t3 == null && (t3 = ""), (n2 = this.delegate) != null && n2.inputControllerWillPerformTyping(), this.withTargetDOMRange(function() {
                var n3;
                return (n3 = this.responder) != null ? n3.insertString(t3, e2) : void 0;
              });
            }, u.prototype.toggleAttributeIfSupported = function(t3) {
              var n2;
              return a.call(e.getAllAttributeNames(), t3) >= 0 ? ((n2 = this.delegate) != null && n2.inputControllerWillPerformFormatting(t3), this.withTargetDOMRange(function() {
                var e2;
                return (e2 = this.responder) != null ? e2.toggleCurrentAttribute(t3) : void 0;
              })) : void 0;
            }, u.prototype.activateAttributeIfSupported = function(t3, n2) {
              var i2;
              return a.call(e.getAllAttributeNames(), t3) >= 0 ? ((i2 = this.delegate) != null && i2.inputControllerWillPerformFormatting(t3), this.withTargetDOMRange(function() {
                var e2;
                return (e2 = this.responder) != null ? e2.setCurrentAttribute(t3, n2) : void 0;
              })) : void 0;
            }, u.prototype.deleteInDirection = function(t3, e2) {
              var n2, i2, o2, r2;
              return o2 = (e2 != null ? e2 : { recordUndoEntry: true }).recordUndoEntry, o2 && (r2 = this.delegate) != null && r2.inputControllerWillPerformTyping(), i2 = function(e3) {
                return function() {
                  var n3;
                  return (n3 = e3.responder) != null ? n3.deleteInDirection(t3) : void 0;
                };
              }(this), (n2 = this.getTargetDOMRange({ minLength: 2 })) ? this.withTargetDOMRange(n2, i2) : i2();
            }, u.prototype.withTargetDOMRange = function(t3, n2) {
              var i2;
              return typeof t3 == "function" && (n2 = t3, t3 = this.getTargetDOMRange()), t3 ? (i2 = this.responder) != null ? i2.withTargetDOMRange(t3, n2.bind(this)) : void 0 : (e.selectionChangeObserver.reset(), n2.call(this));
            }, u.prototype.getTargetDOMRange = function(t3) {
              var e2, n2, i2, o2;
              return i2 = (t3 != null ? t3 : { minLength: 0 }).minLength, (o2 = typeof (e2 = this.event).getTargetRanges == "function" ? e2.getTargetRanges() : void 0) && o2.length && (n2 = f(o2[0]), i2 === 0 || n2.toString().length >= i2) ? n2 : void 0;
            }, f = function(t3) {
              var e2;
              return e2 = document.createRange(), e2.setStart(t3.startContainer, t3.startOffset), e2.setEnd(t3.endContainer, t3.endOffset), e2;
            }, u.prototype.withEvent = function(t3, e2) {
              var n2;
              this.event = t3;
              try {
                n2 = e2.call(this);
              } finally {
                this.event = null;
              }
              return n2;
            }, c = function(t3) {
              var e2, n2;
              return a.call((e2 = (n2 = t3.dataTransfer) != null ? n2.types : void 0) != null ? e2 : [], "Files") >= 0;
            }, h = function(t3) {
              var e2;
              return (e2 = t3.clipboardData) ? a.call(e2.types, "Files") >= 0 && e2.types.length === 1 && e2.files.length >= 1 : void 0;
            }, p = function(t3) {
              var e2;
              return (e2 = t3.clipboardData) ? a.call(e2.types, "text/plain") >= 0 && e2.types.length === 1 : void 0;
            }, l = function(t3) {
              var e2;
              return e2 = [], t3.altKey && e2.push("alt"), t3.shiftKey && e2.push("shift"), e2.push(t3.key), e2;
            }, d = function(t3) {
              return { x: t3.clientX, y: t3.clientY };
            }, u;
          }(e.InputController);
        }.call(this), function() {
          var t2, n, i, o, r, s, a, u, c = function(t3, e2) {
            return function() {
              return t3.apply(e2, arguments);
            };
          }, l = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              h.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, h = {}.hasOwnProperty;
          n = e.defer, i = e.handleEvent, s = e.makeElement, u = e.tagName, a = e.config, r = a.lang, t2 = a.css, o = a.keyNames, e.AttachmentEditorController = function(a2) {
            function h2(t3, e2, n2, i2) {
              this.attachmentPiece = t3, this.element = e2, this.container = n2, this.options = i2 != null ? i2 : {}, this.didBlurCaption = c(this.didBlurCaption, this), this.didChangeCaption = c(this.didChangeCaption, this), this.didInputCaption = c(this.didInputCaption, this), this.didKeyDownCaption = c(this.didKeyDownCaption, this), this.didClickActionButton = c(this.didClickActionButton, this), this.didClickToolbar = c(this.didClickToolbar, this), this.attachment = this.attachmentPiece.attachment, u(this.element) === "a" && (this.element = this.element.firstChild), this.install();
            }
            var p;
            return l(h2, a2), p = function(t3) {
              return function() {
                var e2;
                return e2 = t3.apply(this, arguments), e2["do"](), this.undos == null && (this.undos = []), this.undos.push(e2.undo);
              };
            }, h2.prototype.install = function() {
              return this.makeElementMutable(), this.addToolbar(), this.attachment.isPreviewable() ? this.installCaptionEditor() : void 0;
            }, h2.prototype.uninstall = function() {
              var t3, e2;
              for (this.savePendingCaption(); e2 = this.undos.pop(); )
                e2();
              return (t3 = this.delegate) != null ? t3.didUninstallAttachmentEditor(this) : void 0;
            }, h2.prototype.savePendingCaption = function() {
              var t3, e2, n2;
              return this.pendingCaption != null ? (t3 = this.pendingCaption, this.pendingCaption = null, t3 ? (e2 = this.delegate) != null && typeof e2.attachmentEditorDidRequestUpdatingAttributesForAttachment == "function" ? e2.attachmentEditorDidRequestUpdatingAttributesForAttachment({ caption: t3 }, this.attachment) : void 0 : (n2 = this.delegate) != null && typeof n2.attachmentEditorDidRequestRemovingAttributeForAttachment == "function" ? n2.attachmentEditorDidRequestRemovingAttributeForAttachment("caption", this.attachment) : void 0) : void 0;
            }, h2.prototype.makeElementMutable = p(function() {
              return { "do": function(t3) {
                return function() {
                  return t3.element.dataset.trixMutable = true;
                };
              }(this), undo: function(t3) {
                return function() {
                  return delete t3.element.dataset.trixMutable;
                };
              }(this) };
            }), h2.prototype.addToolbar = p(function() {
              var n2;
              return n2 = s({ tagName: "div", className: t2.attachmentToolbar, data: { trixMutable: true }, childNodes: s({ tagName: "div", className: "trix-button-row", childNodes: s({ tagName: "span", className: "trix-button-group trix-button-group--actions", childNodes: s({ tagName: "button", className: "trix-button trix-button--remove", textContent: r.remove, attributes: { title: r.remove }, data: { trixAction: "remove" } }) }) }) }), this.attachment.isPreviewable() && n2.appendChild(s({ tagName: "div", className: t2.attachmentMetadataContainer, childNodes: s({ tagName: "span", className: t2.attachmentMetadata, childNodes: [s({ tagName: "span", className: t2.attachmentName, textContent: this.attachment.getFilename(), attributes: { title: this.attachment.getFilename() } }), s({ tagName: "span", className: t2.attachmentSize, textContent: this.attachment.getFormattedFilesize() })] }) })), i("click", { onElement: n2, withCallback: this.didClickToolbar }), i("click", { onElement: n2, matchingSelector: "[data-trix-action]", withCallback: this.didClickActionButton }), { "do": function(t3) {
                return function() {
                  return t3.element.appendChild(n2);
                };
              }(this), undo: function() {
                return function() {
                  return e.removeNode(n2);
                };
              }(this) };
            }), h2.prototype.installCaptionEditor = p(function() {
              var o2, a3, u2, c2, l2;
              return c2 = s({ tagName: "textarea", className: t2.attachmentCaptionEditor, attributes: { placeholder: r.captionPlaceholder }, data: { trixMutable: true } }), c2.value = this.attachmentPiece.getCaption(), l2 = c2.cloneNode(), l2.classList.add("trix-autoresize-clone"), l2.tabIndex = -1, o2 = function() {
                return l2.value = c2.value, c2.style.height = l2.scrollHeight + "px";
              }, i("input", { onElement: c2, withCallback: o2 }), i("input", { onElement: c2, withCallback: this.didInputCaption }), i("keydown", { onElement: c2, withCallback: this.didKeyDownCaption }), i("change", { onElement: c2, withCallback: this.didChangeCaption }), i("blur", { onElement: c2, withCallback: this.didBlurCaption }), u2 = this.element.querySelector("figcaption"), a3 = u2.cloneNode(), { "do": function(e2) {
                return function() {
                  return u2.style.display = "none", a3.appendChild(c2), a3.appendChild(l2), a3.classList.add(t2.attachmentCaption + "--editing"), u2.parentElement.insertBefore(a3, u2), o2(), e2.options.editCaption ? n(function() {
                    return c2.focus();
                  }) : void 0;
                };
              }(this), undo: function() {
                return e.removeNode(a3), u2.style.display = null;
              } };
            }), h2.prototype.didClickToolbar = function(t3) {
              return t3.preventDefault(), t3.stopPropagation();
            }, h2.prototype.didClickActionButton = function(t3) {
              var e2, n2;
              switch (e2 = t3.target.getAttribute("data-trix-action")) {
                case "remove":
                  return (n2 = this.delegate) != null ? n2.attachmentEditorDidRequestRemovalOfAttachment(this.attachment) : void 0;
              }
            }, h2.prototype.didKeyDownCaption = function(t3) {
              var e2;
              return o[t3.keyCode] === "return" ? (t3.preventDefault(), this.savePendingCaption(), (e2 = this.delegate) != null && typeof e2.attachmentEditorDidRequestDeselectingAttachment == "function" ? e2.attachmentEditorDidRequestDeselectingAttachment(this.attachment) : void 0) : void 0;
            }, h2.prototype.didInputCaption = function(t3) {
              return this.pendingCaption = t3.target.value.replace(/\s/g, " ").trim();
            }, h2.prototype.didChangeCaption = function() {
              return this.savePendingCaption();
            }, h2.prototype.didBlurCaption = function() {
              return this.savePendingCaption();
            }, h2;
          }(e.BasicObject);
        }.call(this), function() {
          var t2, n, i, o = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              r.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, r = {}.hasOwnProperty;
          i = e.makeElement, t2 = e.config.css, e.AttachmentView = function(r2) {
            function s() {
              s.__super__.constructor.apply(this, arguments), this.attachment = this.object, this.attachment.uploadProgressDelegate = this, this.attachmentPiece = this.options.piece;
            }
            var a;
            return o(s, r2), s.attachmentSelector = "[data-trix-attachment]", s.prototype.createContentNodes = function() {
              return [];
            }, s.prototype.createNodes = function() {
              var e2, n2, o2, r3, s2, u, c;
              if (e2 = r3 = i({ tagName: "figure", className: this.getClassName(), data: this.getData(), editable: false }), (n2 = this.getHref()) && (r3 = i({ tagName: "a", editable: false, attributes: { href: n2, tabindex: -1 } }), e2.appendChild(r3)), this.attachment.hasContent())
                r3.innerHTML = this.attachment.getContent();
              else
                for (c = this.createContentNodes(), o2 = 0, s2 = c.length; s2 > o2; o2++)
                  u = c[o2], r3.appendChild(u);
              return r3.appendChild(this.createCaptionElement()), this.attachment.isPending() && (this.progressElement = i({ tagName: "progress", attributes: { "class": t2.attachmentProgress, value: this.attachment.getUploadProgress(), max: 100 }, data: { trixMutable: true, trixStoreKey: ["progressElement", this.attachment.id].join("/") } }), e2.appendChild(this.progressElement)), [a("left"), e2, a("right")];
            }, s.prototype.createCaptionElement = function() {
              var e2, n2, o2, r3, s2, a2, u;
              return o2 = i({ tagName: "figcaption", className: t2.attachmentCaption }), (e2 = this.attachmentPiece.getCaption()) ? (o2.classList.add(t2.attachmentCaption + "--edited"), o2.textContent = e2) : (n2 = this.getCaptionConfig(), n2.name && (r3 = this.attachment.getFilename()), n2.size && (a2 = this.attachment.getFormattedFilesize()), r3 && (s2 = i({ tagName: "span", className: t2.attachmentName, textContent: r3 }), o2.appendChild(s2)), a2 && (r3 && o2.appendChild(document.createTextNode(" ")), u = i({ tagName: "span", className: t2.attachmentSize, textContent: a2 }), o2.appendChild(u))), o2;
            }, s.prototype.getClassName = function() {
              var e2, n2;
              return n2 = [t2.attachment, t2.attachment + "--" + this.attachment.getType()], (e2 = this.attachment.getExtension()) && n2.push(t2.attachment + "--" + e2), n2.join(" ");
            }, s.prototype.getData = function() {
              var t3, e2;
              return e2 = { trixAttachment: JSON.stringify(this.attachment), trixContentType: this.attachment.getContentType(), trixId: this.attachment.id }, t3 = this.attachmentPiece.attributes, t3.isEmpty() || (e2.trixAttributes = JSON.stringify(t3)), this.attachment.isPending() && (e2.trixSerialize = false), e2;
            }, s.prototype.getHref = function() {
              return n(this.attachment.getContent(), "a") ? void 0 : this.attachment.getHref();
            }, s.prototype.getCaptionConfig = function() {
              var t3, n2, i2;
              return i2 = this.attachment.getType(), t3 = e.copyObject((n2 = e.config.attachments[i2]) != null ? n2.caption : void 0), i2 === "file" && (t3.name = true), t3;
            }, s.prototype.findProgressElement = function() {
              var t3;
              return (t3 = this.findElement()) != null ? t3.querySelector("progress") : void 0;
            }, a = function(t3) {
              return i({ tagName: "span", textContent: e.ZERO_WIDTH_SPACE, data: { trixCursorTarget: t3, trixSerialize: false } });
            }, s.prototype.attachmentDidChangeUploadProgress = function() {
              var t3, e2;
              return e2 = this.attachment.getUploadProgress(), (t3 = this.findProgressElement()) != null ? t3.value = e2 : void 0;
            }, s;
          }(e.ObjectView), n = function(t3, e2) {
            var n2;
            return n2 = i("div"), n2.innerHTML = t3 != null ? t3 : "", n2.querySelector(e2);
          };
        }.call(this), function() {
          var t2, n = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var o in e2)
              i.call(e2, o) && (t3[o] = e2[o]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, i = {}.hasOwnProperty;
          t2 = e.makeElement, e.PreviewableAttachmentView = function(i2) {
            function o() {
              o.__super__.constructor.apply(this, arguments), this.attachment.previewDelegate = this;
            }
            return n(o, i2), o.prototype.createContentNodes = function() {
              return this.image = t2({ tagName: "img", attributes: { src: "" }, data: { trixMutable: true } }), this.refresh(this.image), [this.image];
            }, o.prototype.createCaptionElement = function() {
              var t3;
              return t3 = o.__super__.createCaptionElement.apply(this, arguments), t3.textContent || t3.setAttribute("data-trix-placeholder", e.config.lang.captionPlaceholder), t3;
            }, o.prototype.refresh = function(t3) {
              var e2;
              return t3 == null && (t3 = (e2 = this.findElement()) != null ? e2.querySelector("img") : void 0), t3 ? this.updateAttributesForImage(t3) : void 0;
            }, o.prototype.updateAttributesForImage = function(t3) {
              var e2, n2, i3, o2, r, s;
              return r = this.attachment.getURL(), n2 = this.attachment.getPreviewURL(), t3.src = n2 || r, n2 === r ? t3.removeAttribute("data-trix-serialized-attributes") : (i3 = JSON.stringify({ src: r }), t3.setAttribute("data-trix-serialized-attributes", i3)), s = this.attachment.getWidth(), e2 = this.attachment.getHeight(), s != null && (t3.width = s), e2 != null && (t3.height = e2), o2 = ["imageElement", this.attachment.id, t3.src, t3.width, t3.height].join("/"), t3.dataset.trixStoreKey = o2;
            }, o.prototype.attachmentDidChangeAttributes = function() {
              return this.refresh(this.image), this.refresh();
            }, o;
          }(e.AttachmentView);
        }.call(this), function() {
          var t2, n, i, o = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              r.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, r = {}.hasOwnProperty;
          i = e.makeElement, t2 = e.findInnerElement, n = e.getTextConfig, e.PieceView = function(r2) {
            function s() {
              var t3;
              s.__super__.constructor.apply(this, arguments), this.piece = this.object, this.attributes = this.piece.getAttributes(), t3 = this.options, this.textConfig = t3.textConfig, this.context = t3.context, this.piece.attachment ? this.attachment = this.piece.attachment : this.string = this.piece.toString();
            }
            var a;
            return o(s, r2), s.prototype.createNodes = function() {
              var e2, n2, i2, o2, r3, s2;
              if (s2 = this.attachment ? this.createAttachmentNodes() : this.createStringNodes(), e2 = this.createElement()) {
                for (i2 = t2(e2), n2 = 0, o2 = s2.length; o2 > n2; n2++)
                  r3 = s2[n2], i2.appendChild(r3);
                s2 = [e2];
              }
              return s2;
            }, s.prototype.createAttachmentNodes = function() {
              var t3, n2;
              return t3 = this.attachment.isPreviewable() ? e.PreviewableAttachmentView : e.AttachmentView, n2 = this.createChildView(t3, this.piece.attachment, { piece: this.piece }), n2.getNodes();
            }, s.prototype.createStringNodes = function() {
              var t3, e2, n2, o2, r3, s2, a2, u, c, l;
              if ((u = this.textConfig) != null ? u.plaintext : void 0)
                return [document.createTextNode(this.string)];
              for (a2 = [], c = this.string.split("\n"), n2 = e2 = 0, o2 = c.length; o2 > e2; n2 = ++e2)
                l = c[n2], n2 > 0 && (t3 = i("br"), a2.push(t3)), (r3 = l.length) && (s2 = document.createTextNode(this.preserveSpaces(l)), a2.push(s2));
              return a2;
            }, s.prototype.createElement = function() {
              var t3, e2, o2, r3, s2, a2, u, c, l;
              c = {}, a2 = this.attributes;
              for (r3 in a2)
                if (l = a2[r3], (t3 = n(r3)) && (t3.tagName && (s2 = i(t3.tagName), o2 ? (o2.appendChild(s2), o2 = s2) : e2 = o2 = s2), t3.styleProperty && (c[t3.styleProperty] = l), t3.style)) {
                  u = t3.style;
                  for (r3 in u)
                    l = u[r3], c[r3] = l;
                }
              if (Object.keys(c).length) {
                e2 == null && (e2 = i("span"));
                for (r3 in c)
                  l = c[r3], e2.style[r3] = l;
              }
              return e2;
            }, s.prototype.createContainerElement = function() {
              var t3, e2, o2, r3, s2;
              r3 = this.attributes;
              for (o2 in r3)
                if (s2 = r3[o2], (e2 = n(o2)) && e2.groupTagName)
                  return t3 = {}, t3[o2] = s2, i(e2.groupTagName, t3);
            }, a = e.NON_BREAKING_SPACE, s.prototype.preserveSpaces = function(t3) {
              return this.context.isLast && (t3 = t3.replace(/\ $/, a)), t3 = t3.replace(/(\S)\ {3}(\S)/g, "$1 " + a + " $2").replace(/\ {2}/g, a + " ").replace(/\ {2}/g, " " + a), (this.context.isFirst || this.context.followsWhitespace) && (t3 = t3.replace(/^\ /, a)), t3;
            }, s;
          }(e.ObjectView);
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.TextView = function(n2) {
            function i() {
              i.__super__.constructor.apply(this, arguments), this.text = this.object, this.textConfig = this.options.textConfig;
            }
            var o;
            return t2(i, n2), i.prototype.createNodes = function() {
              var t3, n3, i2, r, s, a, u, c, l, h;
              for (a = [], c = e.ObjectGroup.groupObjects(this.getPieces()), r = c.length - 1, i2 = n3 = 0, s = c.length; s > n3; i2 = ++n3)
                u = c[i2], t3 = {}, i2 === 0 && (t3.isFirst = true), i2 === r && (t3.isLast = true), o(l) && (t3.followsWhitespace = true), h = this.findOrCreateCachedChildView(e.PieceView, u, { textConfig: this.textConfig, context: t3 }), a.push.apply(a, h.getNodes()), l = u;
              return a;
            }, i.prototype.getPieces = function() {
              var t3, e2, n3, i2, o2;
              for (i2 = this.text.getPieces(), o2 = [], t3 = 0, e2 = i2.length; e2 > t3; t3++)
                n3 = i2[t3], n3.hasAttribute("blockBreak") || o2.push(n3);
              return o2;
            }, o = function(t3) {
              return /\s$/.test(t3 != null ? t3.toString() : void 0);
            }, i;
          }(e.ObjectView);
        }.call(this), function() {
          var t2, n, i, o = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              r.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, r = {}.hasOwnProperty;
          i = e.makeElement, n = e.getBlockConfig, t2 = e.config.css, e.BlockView = function(r2) {
            function s() {
              s.__super__.constructor.apply(this, arguments), this.block = this.object, this.attributes = this.block.getAttributes();
            }
            return o(s, r2), s.prototype.createNodes = function() {
              var t3, o2, r3, s2, a, u, c, l, h, p, d;
              if (o2 = document.createComment("block"), c = [o2], this.block.isEmpty() ? c.push(i("br")) : (p = (l = n(this.block.getLastAttribute())) != null ? l.text : void 0, d = this.findOrCreateCachedChildView(e.TextView, this.block.text, { textConfig: p }), c.push.apply(c, d.getNodes()), this.shouldAddExtraNewlineElement() && c.push(i("br"))), this.attributes.length)
                return c;
              for (h = e.config.blockAttributes["default"].tagName, this.block.isRTL() && (t3 = { dir: "rtl" }), r3 = i({ tagName: h, attributes: t3 }), s2 = 0, a = c.length; a > s2; s2++)
                u = c[s2], r3.appendChild(u);
              return [r3];
            }, s.prototype.createContainerElement = function(e2) {
              var o2, r3, s2, a, u;
              return o2 = this.attributes[e2], u = n(o2).tagName, e2 === 0 && this.block.isRTL() && (r3 = { dir: "rtl" }), o2 === "attachmentGallery" && (a = this.block.getBlockBreakPosition(), s2 = t2.attachmentGallery + " " + t2.attachmentGallery + "--" + a), i({ tagName: u, className: s2, attributes: r3 });
            }, s.prototype.shouldAddExtraNewlineElement = function() {
              return /\n\n$/.test(this.block.toString());
            }, s;
          }(e.ObjectView);
        }.call(this), function() {
          var t2, n, i = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              o.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, o = {}.hasOwnProperty;
          t2 = e.defer, n = e.makeElement, e.DocumentView = function(o2) {
            function r() {
              r.__super__.constructor.apply(this, arguments), this.element = this.options.element, this.elementStore = new e.ElementStore(), this.setDocument(this.object);
            }
            var s, a, u;
            return i(r, o2), r.render = function(t3) {
              var e2, i2;
              return e2 = n("div"), i2 = new this(t3, { element: e2 }), i2.render(), i2.sync(), e2;
            }, r.prototype.setDocument = function(t3) {
              return t3.isEqualTo(this.document) ? void 0 : this.document = this.object = t3;
            }, r.prototype.render = function() {
              var t3, i2, o3, r2, s2, a2, u2;
              if (this.childViews = [], this.shadowElement = n("div"), !this.document.isEmpty()) {
                for (s2 = e.ObjectGroup.groupObjects(this.document.getBlocks(), { asTree: true }), a2 = [], t3 = 0, i2 = s2.length; i2 > t3; t3++)
                  r2 = s2[t3], u2 = this.findOrCreateCachedChildView(e.BlockView, r2), a2.push(function() {
                    var t4, e2, n2, i3;
                    for (n2 = u2.getNodes(), i3 = [], t4 = 0, e2 = n2.length; e2 > t4; t4++)
                      o3 = n2[t4], i3.push(this.shadowElement.appendChild(o3));
                    return i3;
                  }.call(this));
                return a2;
              }
            }, r.prototype.isSynced = function() {
              return s(this.shadowElement, this.element);
            }, r.prototype.sync = function() {
              var t3;
              for (t3 = this.createDocumentFragmentForSync(); this.element.lastChild; )
                this.element.removeChild(this.element.lastChild);
              return this.element.appendChild(t3), this.didSync();
            }, r.prototype.didSync = function() {
              return this.elementStore.reset(a(this.element)), t2(function(t3) {
                return function() {
                  return t3.garbageCollectCachedViews();
                };
              }(this));
            }, r.prototype.createDocumentFragmentForSync = function() {
              var t3, e2, n2, i2, o3, r2, s2, u2, c, l;
              for (e2 = document.createDocumentFragment(), u2 = this.shadowElement.childNodes, n2 = 0, o3 = u2.length; o3 > n2; n2++)
                s2 = u2[n2], e2.appendChild(s2.cloneNode(true));
              for (c = a(e2), i2 = 0, r2 = c.length; r2 > i2; i2++)
                t3 = c[i2], (l = this.elementStore.remove(t3)) && t3.parentNode.replaceChild(l, t3);
              return e2;
            }, a = function(t3) {
              return t3.querySelectorAll("[data-trix-store-key]");
            }, s = function(t3, e2) {
              return u(t3.innerHTML) === u(e2.innerHTML);
            }, u = function(t3) {
              return t3.replace(/&nbsp;/g, " ");
            }, r;
          }(e.ObjectView);
        }.call(this), function() {
          var t2, n, i, o, r, s = function(t3, e2) {
            return function() {
              return t3.apply(e2, arguments);
            };
          }, a = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              u.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, u = {}.hasOwnProperty;
          i = e.findClosestElementFromNode, o = e.handleEvent, r = e.innerElementIsActive, n = e.defer, t2 = e.AttachmentView.attachmentSelector, e.CompositionController = function(u2) {
            function c(n2, i2) {
              this.element = n2, this.composition = i2, this.didClickAttachment = s(this.didClickAttachment, this), this.didBlur = s(this.didBlur, this), this.didFocus = s(this.didFocus, this), this.documentView = new e.DocumentView(this.composition.document, { element: this.element }), o("focus", { onElement: this.element, withCallback: this.didFocus }), o("blur", { onElement: this.element, withCallback: this.didBlur }), o("click", { onElement: this.element, matchingSelector: "a[contenteditable=false]", preventDefault: true }), o("mousedown", { onElement: this.element, matchingSelector: t2, withCallback: this.didClickAttachment }), o("click", { onElement: this.element, matchingSelector: "a" + t2, preventDefault: true });
            }
            return a(c, u2), c.prototype.didFocus = function() {
              var t3, e2, n2;
              return t3 = function(t4) {
                return function() {
                  var e3;
                  return t4.focused ? void 0 : (t4.focused = true, (e3 = t4.delegate) != null && typeof e3.compositionControllerDidFocus == "function" ? e3.compositionControllerDidFocus() : void 0);
                };
              }(this), (e2 = (n2 = this.blurPromise) != null ? n2.then(t3) : void 0) != null ? e2 : t3();
            }, c.prototype.didBlur = function() {
              return this.blurPromise = new Promise(function(t3) {
                return function(e2) {
                  return n(function() {
                    var n2;
                    return r(t3.element) || (t3.focused = null, (n2 = t3.delegate) != null && typeof n2.compositionControllerDidBlur == "function" && n2.compositionControllerDidBlur()), t3.blurPromise = null, e2();
                  });
                };
              }(this));
            }, c.prototype.didClickAttachment = function(t3, e2) {
              var n2, o2, r2;
              return n2 = this.findAttachmentForElement(e2), o2 = i(t3.target, { matchingSelector: "figcaption" }) != null, (r2 = this.delegate) != null && typeof r2.compositionControllerDidSelectAttachment == "function" ? r2.compositionControllerDidSelectAttachment(n2, { editCaption: o2 }) : void 0;
            }, c.prototype.getSerializableElement = function() {
              return this.isEditingAttachment() ? this.documentView.shadowElement : this.element;
            }, c.prototype.render = function() {
              var t3, e2, n2;
              return this.revision !== this.composition.revision && (this.documentView.setDocument(this.composition.document), this.documentView.render(), this.revision = this.composition.revision), this.canSyncDocumentView() && !this.documentView.isSynced() && ((t3 = this.delegate) != null && typeof t3.compositionControllerWillSyncDocumentView == "function" && t3.compositionControllerWillSyncDocumentView(), this.documentView.sync(), (e2 = this.delegate) != null && typeof e2.compositionControllerDidSyncDocumentView == "function" && e2.compositionControllerDidSyncDocumentView()), (n2 = this.delegate) != null && typeof n2.compositionControllerDidRender == "function" ? n2.compositionControllerDidRender() : void 0;
            }, c.prototype.rerenderViewForObject = function(t3) {
              return this.invalidateViewForObject(t3), this.render();
            }, c.prototype.invalidateViewForObject = function(t3) {
              return this.documentView.invalidateViewForObject(t3);
            }, c.prototype.isViewCachingEnabled = function() {
              return this.documentView.isViewCachingEnabled();
            }, c.prototype.enableViewCaching = function() {
              return this.documentView.enableViewCaching();
            }, c.prototype.disableViewCaching = function() {
              return this.documentView.disableViewCaching();
            }, c.prototype.refreshViewCache = function() {
              return this.documentView.garbageCollectCachedViews();
            }, c.prototype.isEditingAttachment = function() {
              return this.attachmentEditor != null;
            }, c.prototype.installAttachmentEditorForAttachment = function(t3, n2) {
              var i2, o2, r2;
              if (((r2 = this.attachmentEditor) != null ? r2.attachment : void 0) !== t3 && (o2 = this.documentView.findElementForObject(t3)))
                return this.uninstallAttachmentEditor(), i2 = this.composition.document.getAttachmentPieceForAttachment(t3), this.attachmentEditor = new e.AttachmentEditorController(i2, o2, this.element, n2), this.attachmentEditor.delegate = this;
            }, c.prototype.uninstallAttachmentEditor = function() {
              var t3;
              return (t3 = this.attachmentEditor) != null ? t3.uninstall() : void 0;
            }, c.prototype.didUninstallAttachmentEditor = function() {
              return this.attachmentEditor = null, this.render();
            }, c.prototype.attachmentEditorDidRequestUpdatingAttributesForAttachment = function(t3, e2) {
              var n2;
              return (n2 = this.delegate) != null && typeof n2.compositionControllerWillUpdateAttachment == "function" && n2.compositionControllerWillUpdateAttachment(e2), this.composition.updateAttributesForAttachment(t3, e2);
            }, c.prototype.attachmentEditorDidRequestRemovingAttributeForAttachment = function(t3, e2) {
              var n2;
              return (n2 = this.delegate) != null && typeof n2.compositionControllerWillUpdateAttachment == "function" && n2.compositionControllerWillUpdateAttachment(e2), this.composition.removeAttributeForAttachment(t3, e2);
            }, c.prototype.attachmentEditorDidRequestRemovalOfAttachment = function(t3) {
              var e2;
              return (e2 = this.delegate) != null && typeof e2.compositionControllerDidRequestRemovalOfAttachment == "function" ? e2.compositionControllerDidRequestRemovalOfAttachment(t3) : void 0;
            }, c.prototype.attachmentEditorDidRequestDeselectingAttachment = function(t3) {
              var e2;
              return (e2 = this.delegate) != null && typeof e2.compositionControllerDidRequestDeselectingAttachment == "function" ? e2.compositionControllerDidRequestDeselectingAttachment(t3) : void 0;
            }, c.prototype.canSyncDocumentView = function() {
              return !this.isEditingAttachment();
            }, c.prototype.findAttachmentForElement = function(t3) {
              return this.composition.document.getAttachmentById(parseInt(t3.dataset.trixId, 10));
            }, c;
          }(e.BasicObject);
        }.call(this), function() {
          var t2, n, i, o = function(t3, e2) {
            return function() {
              return t3.apply(e2, arguments);
            };
          }, r = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              s.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, s = {}.hasOwnProperty;
          n = e.handleEvent, i = e.triggerEvent, t2 = e.findClosestElementFromNode, e.ToolbarController = function(e2) {
            function s2(t3) {
              this.element = t3, this.didKeyDownDialogInput = o(this.didKeyDownDialogInput, this), this.didClickDialogButton = o(this.didClickDialogButton, this), this.didClickAttributeButton = o(this.didClickAttributeButton, this), this.didClickActionButton = o(this.didClickActionButton, this), this.attributes = {}, this.actions = {}, this.resetDialogInputs(), n("mousedown", { onElement: this.element, matchingSelector: a, withCallback: this.didClickActionButton }), n("mousedown", { onElement: this.element, matchingSelector: c, withCallback: this.didClickAttributeButton }), n("click", { onElement: this.element, matchingSelector: v, preventDefault: true }), n("click", { onElement: this.element, matchingSelector: l, withCallback: this.didClickDialogButton }), n("keydown", { onElement: this.element, matchingSelector: h, withCallback: this.didKeyDownDialogInput });
            }
            var a, u, c, l, h, p, d, f, g, m, v;
            return r(s2, e2), c = "[data-trix-attribute]", a = "[data-trix-action]", v = c + ", " + a, p = "[data-trix-dialog]", u = p + "[data-trix-active]", l = p + " [data-trix-method]", h = p + " [data-trix-input]", s2.prototype.didClickActionButton = function(t3, e3) {
              var n2, i2, o2;
              return (i2 = this.delegate) != null && i2.toolbarDidClickButton(), t3.preventDefault(), n2 = d(e3), this.getDialog(n2) ? this.toggleDialog(n2) : (o2 = this.delegate) != null ? o2.toolbarDidInvokeAction(n2) : void 0;
            }, s2.prototype.didClickAttributeButton = function(t3, e3) {
              var n2, i2, o2;
              return (i2 = this.delegate) != null && i2.toolbarDidClickButton(), t3.preventDefault(), n2 = f(e3), this.getDialog(n2) ? this.toggleDialog(n2) : (o2 = this.delegate) != null && o2.toolbarDidToggleAttribute(n2), this.refreshAttributeButtons();
            }, s2.prototype.didClickDialogButton = function(e3, n2) {
              var i2, o2;
              return i2 = t2(n2, { matchingSelector: p }), o2 = n2.getAttribute("data-trix-method"), this[o2].call(this, i2);
            }, s2.prototype.didKeyDownDialogInput = function(t3, e3) {
              var n2, i2;
              return t3.keyCode === 13 && (t3.preventDefault(), n2 = e3.getAttribute("name"), i2 = this.getDialog(n2), this.setAttribute(i2)), t3.keyCode === 27 ? (t3.preventDefault(), this.hideDialog()) : void 0;
            }, s2.prototype.updateActions = function(t3) {
              return this.actions = t3, this.refreshActionButtons();
            }, s2.prototype.refreshActionButtons = function() {
              return this.eachActionButton(function(t3) {
                return function(e3, n2) {
                  return e3.disabled = t3.actions[n2] === false;
                };
              }(this));
            }, s2.prototype.eachActionButton = function(t3) {
              var e3, n2, i2, o2, r2;
              for (o2 = this.element.querySelectorAll(a), r2 = [], n2 = 0, i2 = o2.length; i2 > n2; n2++)
                e3 = o2[n2], r2.push(t3(e3, d(e3)));
              return r2;
            }, s2.prototype.updateAttributes = function(t3) {
              return this.attributes = t3, this.refreshAttributeButtons();
            }, s2.prototype.refreshAttributeButtons = function() {
              return this.eachAttributeButton(function(t3) {
                return function(e3, n2) {
                  return e3.disabled = t3.attributes[n2] === false, t3.attributes[n2] || t3.dialogIsVisible(n2) ? (e3.setAttribute("data-trix-active", ""), e3.classList.add("trix-active")) : (e3.removeAttribute("data-trix-active"), e3.classList.remove("trix-active"));
                };
              }(this));
            }, s2.prototype.eachAttributeButton = function(t3) {
              var e3, n2, i2, o2, r2;
              for (o2 = this.element.querySelectorAll(c), r2 = [], n2 = 0, i2 = o2.length; i2 > n2; n2++)
                e3 = o2[n2], r2.push(t3(e3, f(e3)));
              return r2;
            }, s2.prototype.applyKeyboardCommand = function(t3) {
              var e3, n2, o2, r2, s3, a2, u2;
              for (s3 = JSON.stringify(t3.sort()), u2 = this.element.querySelectorAll("[data-trix-key]"), r2 = 0, a2 = u2.length; a2 > r2; r2++)
                if (e3 = u2[r2], o2 = e3.getAttribute("data-trix-key").split("+"), n2 = JSON.stringify(o2.sort()), n2 === s3)
                  return i("mousedown", { onElement: e3 }), true;
              return false;
            }, s2.prototype.dialogIsVisible = function(t3) {
              var e3;
              return (e3 = this.getDialog(t3)) ? e3.hasAttribute("data-trix-active") : void 0;
            }, s2.prototype.toggleDialog = function(t3) {
              return this.dialogIsVisible(t3) ? this.hideDialog() : this.showDialog(t3);
            }, s2.prototype.showDialog = function(t3) {
              var e3, n2, i2, o2, r2, s3, a2, u2, c2, l2;
              for (this.hideDialog(), (a2 = this.delegate) != null && a2.toolbarWillShowDialog(), i2 = this.getDialog(t3), i2.setAttribute("data-trix-active", ""), i2.classList.add("trix-active"), u2 = i2.querySelectorAll("input[disabled]"), o2 = 0, s3 = u2.length; s3 > o2; o2++)
                n2 = u2[o2], n2.removeAttribute("disabled");
              return (e3 = f(i2)) && (r2 = m(i2, t3)) && (r2.value = (c2 = this.attributes[e3]) != null ? c2 : "", r2.select()), (l2 = this.delegate) != null ? l2.toolbarDidShowDialog(t3) : void 0;
            }, s2.prototype.setAttribute = function(t3) {
              var e3, n2, i2;
              return e3 = f(t3), n2 = m(t3, e3), n2.willValidate && !n2.checkValidity() ? (n2.setAttribute("data-trix-validate", ""), n2.classList.add("trix-validate"), n2.focus()) : ((i2 = this.delegate) != null && i2.toolbarDidUpdateAttribute(e3, n2.value), this.hideDialog());
            }, s2.prototype.removeAttribute = function(t3) {
              var e3, n2;
              return e3 = f(t3), (n2 = this.delegate) != null && n2.toolbarDidRemoveAttribute(e3), this.hideDialog();
            }, s2.prototype.hideDialog = function() {
              var t3, e3;
              return (t3 = this.element.querySelector(u)) ? (t3.removeAttribute("data-trix-active"), t3.classList.remove("trix-active"), this.resetDialogInputs(), (e3 = this.delegate) != null ? e3.toolbarDidHideDialog(g(t3)) : void 0) : void 0;
            }, s2.prototype.resetDialogInputs = function() {
              var t3, e3, n2, i2, o2;
              for (i2 = this.element.querySelectorAll(h), o2 = [], t3 = 0, n2 = i2.length; n2 > t3; t3++)
                e3 = i2[t3], e3.setAttribute("disabled", "disabled"), e3.removeAttribute("data-trix-validate"), o2.push(e3.classList.remove("trix-validate"));
              return o2;
            }, s2.prototype.getDialog = function(t3) {
              return this.element.querySelector("[data-trix-dialog=" + t3 + "]");
            }, m = function(t3, e3) {
              return e3 == null && (e3 = f(t3)), t3.querySelector("[data-trix-input][name='" + e3 + "']");
            }, d = function(t3) {
              return t3.getAttribute("data-trix-action");
            }, f = function(t3) {
              var e3;
              return (e3 = t3.getAttribute("data-trix-attribute")) != null ? e3 : t3.getAttribute("data-trix-dialog-attribute");
            }, g = function(t3) {
              return t3.getAttribute("data-trix-dialog");
            }, s2;
          }(e.BasicObject);
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.ImagePreloadOperation = function(e2) {
            function n2(t3) {
              this.url = t3;
            }
            return t2(n2, e2), n2.prototype.perform = function(t3) {
              var e3;
              return e3 = new Image(), e3.onload = function(n3) {
                return function() {
                  return e3.width = n3.width = e3.naturalWidth, e3.height = n3.height = e3.naturalHeight, t3(true, e3);
                };
              }(this), e3.onerror = function() {
                return t3(false);
              }, e3.src = this.url;
            }, n2;
          }(e.Operation);
        }.call(this), function() {
          var t2 = function(t3, e2) {
            return function() {
              return t3.apply(e2, arguments);
            };
          }, n = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var o in e2)
              i.call(e2, o) && (t3[o] = e2[o]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, i = {}.hasOwnProperty;
          e.Attachment = function(i2) {
            function o(n2) {
              n2 == null && (n2 = {}), this.releaseFile = t2(this.releaseFile, this), o.__super__.constructor.apply(this, arguments), this.attributes = e.Hash.box(n2), this.didChangeAttributes();
            }
            return n(o, i2), o.previewablePattern = /^image(\/(gif|png|jpe?g)|$)/, o.attachmentForFile = function(t3) {
              var e2, n2;
              return n2 = this.attributesForFile(t3), e2 = new this(n2), e2.setFile(t3), e2;
            }, o.attributesForFile = function(t3) {
              return new e.Hash({ filename: t3.name, filesize: t3.size, contentType: t3.type });
            }, o.fromJSON = function(t3) {
              return new this(t3);
            }, o.prototype.getAttribute = function(t3) {
              return this.attributes.get(t3);
            }, o.prototype.hasAttribute = function(t3) {
              return this.attributes.has(t3);
            }, o.prototype.getAttributes = function() {
              return this.attributes.toObject();
            }, o.prototype.setAttributes = function(t3) {
              var e2, n2, i3;
              return t3 == null && (t3 = {}), e2 = this.attributes.merge(t3), this.attributes.isEqualTo(e2) ? void 0 : (this.attributes = e2, this.didChangeAttributes(), (n2 = this.previewDelegate) != null && typeof n2.attachmentDidChangeAttributes == "function" && n2.attachmentDidChangeAttributes(this), (i3 = this.delegate) != null && typeof i3.attachmentDidChangeAttributes == "function" ? i3.attachmentDidChangeAttributes(this) : void 0);
            }, o.prototype.didChangeAttributes = function() {
              return this.isPreviewable() ? this.preloadURL() : void 0;
            }, o.prototype.isPending = function() {
              return this.file != null && !(this.getURL() || this.getHref());
            }, o.prototype.isPreviewable = function() {
              return this.attributes.has("previewable") ? this.attributes.get("previewable") : this.constructor.previewablePattern.test(this.getContentType());
            }, o.prototype.getType = function() {
              return this.hasContent() ? "content" : this.isPreviewable() ? "preview" : "file";
            }, o.prototype.getURL = function() {
              return this.attributes.get("url");
            }, o.prototype.getHref = function() {
              return this.attributes.get("href");
            }, o.prototype.getFilename = function() {
              var t3;
              return (t3 = this.attributes.get("filename")) != null ? t3 : "";
            }, o.prototype.getFilesize = function() {
              return this.attributes.get("filesize");
            }, o.prototype.getFormattedFilesize = function() {
              var t3;
              return t3 = this.attributes.get("filesize"), typeof t3 == "number" ? e.config.fileSize.formatter(t3) : "";
            }, o.prototype.getExtension = function() {
              var t3;
              return (t3 = this.getFilename().match(/\.(\w+)$/)) != null ? t3[1].toLowerCase() : void 0;
            }, o.prototype.getContentType = function() {
              return this.attributes.get("contentType");
            }, o.prototype.hasContent = function() {
              return this.attributes.has("content");
            }, o.prototype.getContent = function() {
              return this.attributes.get("content");
            }, o.prototype.getWidth = function() {
              return this.attributes.get("width");
            }, o.prototype.getHeight = function() {
              return this.attributes.get("height");
            }, o.prototype.getFile = function() {
              return this.file;
            }, o.prototype.setFile = function(t3) {
              return this.file = t3, this.isPreviewable() ? this.preloadFile() : void 0;
            }, o.prototype.releaseFile = function() {
              return this.releasePreloadedFile(), this.file = null;
            }, o.prototype.getUploadProgress = function() {
              var t3;
              return (t3 = this.uploadProgress) != null ? t3 : 0;
            }, o.prototype.setUploadProgress = function(t3) {
              var e2;
              return this.uploadProgress !== t3 ? (this.uploadProgress = t3, (e2 = this.uploadProgressDelegate) != null && typeof e2.attachmentDidChangeUploadProgress == "function" ? e2.attachmentDidChangeUploadProgress(this) : void 0) : void 0;
            }, o.prototype.toJSON = function() {
              return this.getAttributes();
            }, o.prototype.getCacheKey = function() {
              return [o.__super__.getCacheKey.apply(this, arguments), this.attributes.getCacheKey(), this.getPreviewURL()].join("/");
            }, o.prototype.getPreviewURL = function() {
              return this.previewURL || this.preloadingURL;
            }, o.prototype.setPreviewURL = function(t3) {
              var e2, n2;
              return t3 !== this.getPreviewURL() ? (this.previewURL = t3, (e2 = this.previewDelegate) != null && typeof e2.attachmentDidChangeAttributes == "function" && e2.attachmentDidChangeAttributes(this), (n2 = this.delegate) != null && typeof n2.attachmentDidChangePreviewURL == "function" ? n2.attachmentDidChangePreviewURL(this) : void 0) : void 0;
            }, o.prototype.preloadURL = function() {
              return this.preload(this.getURL(), this.releaseFile);
            }, o.prototype.preloadFile = function() {
              return this.file ? (this.fileObjectURL = URL.createObjectURL(this.file), this.preload(this.fileObjectURL)) : void 0;
            }, o.prototype.releasePreloadedFile = function() {
              return this.fileObjectURL ? (URL.revokeObjectURL(this.fileObjectURL), this.fileObjectURL = null) : void 0;
            }, o.prototype.preload = function(t3, n2) {
              var i3;
              return t3 && t3 !== this.getPreviewURL() ? (this.preloadingURL = t3, i3 = new e.ImagePreloadOperation(t3), i3.then(function(e2) {
                return function(i4) {
                  var o2, r;
                  return r = i4.width, o2 = i4.height, e2.getWidth() && e2.getHeight() || e2.setAttributes({ width: r, height: o2 }), e2.preloadingURL = null, e2.setPreviewURL(t3), typeof n2 == "function" ? n2() : void 0;
                };
              }(this))["catch"](function(t4) {
                return function() {
                  return t4.preloadingURL = null, typeof n2 == "function" ? n2() : void 0;
                };
              }(this))) : void 0;
            }, o;
          }(e.Object);
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.Piece = function(n2) {
            function i(t3, n3) {
              n3 == null && (n3 = {}), i.__super__.constructor.apply(this, arguments), this.attributes = e.Hash.box(n3);
            }
            return t2(i, n2), i.types = {}, i.registerType = function(t3, e2) {
              return e2.type = t3, this.types[t3] = e2;
            }, i.fromJSON = function(t3) {
              var e2;
              return (e2 = this.types[t3.type]) ? e2.fromJSON(t3) : void 0;
            }, i.prototype.copyWithAttributes = function(t3) {
              return new this.constructor(this.getValue(), t3);
            }, i.prototype.copyWithAdditionalAttributes = function(t3) {
              return this.copyWithAttributes(this.attributes.merge(t3));
            }, i.prototype.copyWithoutAttribute = function(t3) {
              return this.copyWithAttributes(this.attributes.remove(t3));
            }, i.prototype.copy = function() {
              return this.copyWithAttributes(this.attributes);
            }, i.prototype.getAttribute = function(t3) {
              return this.attributes.get(t3);
            }, i.prototype.getAttributesHash = function() {
              return this.attributes;
            }, i.prototype.getAttributes = function() {
              return this.attributes.toObject();
            }, i.prototype.getCommonAttributes = function() {
              var t3, e2, n3;
              return (n3 = pieceList.getPieceAtIndex(0)) ? (t3 = n3.attributes, e2 = t3.getKeys(), pieceList.eachPiece(function(n4) {
                return e2 = t3.getKeysCommonToHash(n4.attributes), t3 = t3.slice(e2);
              }), t3.toObject()) : {};
            }, i.prototype.hasAttribute = function(t3) {
              return this.attributes.has(t3);
            }, i.prototype.hasSameStringValueAsPiece = function(t3) {
              return t3 != null && this.toString() === t3.toString();
            }, i.prototype.hasSameAttributesAsPiece = function(t3) {
              return t3 != null && (this.attributes === t3.attributes || this.attributes.isEqualTo(t3.attributes));
            }, i.prototype.isBlockBreak = function() {
              return false;
            }, i.prototype.isEqualTo = function(t3) {
              return i.__super__.isEqualTo.apply(this, arguments) || this.hasSameConstructorAs(t3) && this.hasSameStringValueAsPiece(t3) && this.hasSameAttributesAsPiece(t3);
            }, i.prototype.isEmpty = function() {
              return this.length === 0;
            }, i.prototype.isSerializable = function() {
              return true;
            }, i.prototype.toJSON = function() {
              return { type: this.constructor.type, attributes: this.getAttributes() };
            }, i.prototype.contentsForInspection = function() {
              return { type: this.constructor.type, attributes: this.attributes.inspect() };
            }, i.prototype.canBeGrouped = function() {
              return this.hasAttribute("href");
            }, i.prototype.canBeGroupedWith = function(t3) {
              return this.getAttribute("href") === t3.getAttribute("href");
            }, i.prototype.getLength = function() {
              return this.length;
            }, i.prototype.canBeConsolidatedWith = function() {
              return false;
            }, i;
          }(e.Object);
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.Piece.registerType("attachment", e.AttachmentPiece = function(n2) {
            function i(t3) {
              this.attachment = t3, i.__super__.constructor.apply(this, arguments), this.length = 1, this.ensureAttachmentExclusivelyHasAttribute("href"), this.attachment.hasContent() || this.removeProhibitedAttributes();
            }
            return t2(i, n2), i.fromJSON = function(t3) {
              return new this(e.Attachment.fromJSON(t3.attachment), t3.attributes);
            }, i.permittedAttributes = ["caption", "presentation"], i.prototype.ensureAttachmentExclusivelyHasAttribute = function(t3) {
              return this.hasAttribute(t3) ? (this.attachment.hasAttribute(t3) || this.attachment.setAttributes(this.attributes.slice(t3)), this.attributes = this.attributes.remove(t3)) : void 0;
            }, i.prototype.removeProhibitedAttributes = function() {
              var t3;
              return t3 = this.attributes.slice(this.constructor.permittedAttributes), t3.isEqualTo(this.attributes) ? void 0 : this.attributes = t3;
            }, i.prototype.getValue = function() {
              return this.attachment;
            }, i.prototype.isSerializable = function() {
              return !this.attachment.isPending();
            }, i.prototype.getCaption = function() {
              var t3;
              return (t3 = this.attributes.get("caption")) != null ? t3 : "";
            }, i.prototype.isEqualTo = function(t3) {
              var e2;
              return i.__super__.isEqualTo.apply(this, arguments) && this.attachment.id === (t3 != null && (e2 = t3.attachment) != null ? e2.id : void 0);
            }, i.prototype.toString = function() {
              return e.OBJECT_REPLACEMENT_CHARACTER;
            }, i.prototype.toJSON = function() {
              var t3;
              return t3 = i.__super__.toJSON.apply(this, arguments), t3.attachment = this.attachment, t3;
            }, i.prototype.getCacheKey = function() {
              return [i.__super__.getCacheKey.apply(this, arguments), this.attachment.getCacheKey()].join("/");
            }, i.prototype.toConsole = function() {
              return JSON.stringify(this.toString());
            }, i;
          }(e.Piece));
        }.call(this), function() {
          var t2, n = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var o in e2)
              i.call(e2, o) && (t3[o] = e2[o]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, i = {}.hasOwnProperty;
          t2 = e.normalizeNewlines, e.Piece.registerType("string", e.StringPiece = function(e2) {
            function i2(e3) {
              i2.__super__.constructor.apply(this, arguments), this.string = t2(e3), this.length = this.string.length;
            }
            return n(i2, e2), i2.fromJSON = function(t3) {
              return new this(t3.string, t3.attributes);
            }, i2.prototype.getValue = function() {
              return this.string;
            }, i2.prototype.toString = function() {
              return this.string.toString();
            }, i2.prototype.isBlockBreak = function() {
              return this.toString() === "\n" && this.getAttribute("blockBreak") === true;
            }, i2.prototype.toJSON = function() {
              var t3;
              return t3 = i2.__super__.toJSON.apply(this, arguments), t3.string = this.string, t3;
            }, i2.prototype.canBeConsolidatedWith = function(t3) {
              return t3 != null && this.hasSameConstructorAs(t3) && this.hasSameAttributesAsPiece(t3);
            }, i2.prototype.consolidateWith = function(t3) {
              return new this.constructor(this.toString() + t3.toString(), this.attributes);
            }, i2.prototype.splitAtOffset = function(t3) {
              var e3, n2;
              return t3 === 0 ? (e3 = null, n2 = this) : t3 === this.length ? (e3 = this, n2 = null) : (e3 = new this.constructor(this.string.slice(0, t3), this.attributes), n2 = new this.constructor(this.string.slice(t3), this.attributes)), [e3, n2];
            }, i2.prototype.toConsole = function() {
              var t3;
              return t3 = this.string, t3.length > 15 && (t3 = t3.slice(0, 14) + "\u2026"), JSON.stringify(t3.toString());
            }, i2;
          }(e.Piece));
        }.call(this), function() {
          var t2, n = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var o2 in e2)
              i.call(e2, o2) && (t3[o2] = e2[o2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, i = {}.hasOwnProperty, o = [].slice;
          t2 = e.spliceArray, e.SplittableList = function(e2) {
            function i2(t3) {
              t3 == null && (t3 = []), i2.__super__.constructor.apply(this, arguments), this.objects = t3.slice(0), this.length = this.objects.length;
            }
            var r, s, a;
            return n(i2, e2), i2.box = function(t3) {
              return t3 instanceof this ? t3 : new this(t3);
            }, i2.prototype.indexOf = function(t3) {
              return this.objects.indexOf(t3);
            }, i2.prototype.splice = function() {
              var e3;
              return e3 = 1 <= arguments.length ? o.call(arguments, 0) : [], new this.constructor(t2.apply(null, [this.objects].concat(o.call(e3))));
            }, i2.prototype.eachObject = function(t3) {
              var e3, n2, i3, o2, r2, s2;
              for (r2 = this.objects, s2 = [], n2 = e3 = 0, i3 = r2.length; i3 > e3; n2 = ++e3)
                o2 = r2[n2], s2.push(t3(o2, n2));
              return s2;
            }, i2.prototype.insertObjectAtIndex = function(t3, e3) {
              return this.splice(e3, 0, t3);
            }, i2.prototype.insertSplittableListAtIndex = function(t3, e3) {
              return this.splice.apply(this, [e3, 0].concat(o.call(t3.objects)));
            }, i2.prototype.insertSplittableListAtPosition = function(t3, e3) {
              var n2, i3, o2;
              return o2 = this.splitObjectAtPosition(e3), i3 = o2[0], n2 = o2[1], new this.constructor(i3).insertSplittableListAtIndex(t3, n2);
            }, i2.prototype.editObjectAtIndex = function(t3, e3) {
              return this.replaceObjectAtIndex(e3(this.objects[t3]), t3);
            }, i2.prototype.replaceObjectAtIndex = function(t3, e3) {
              return this.splice(e3, 1, t3);
            }, i2.prototype.removeObjectAtIndex = function(t3) {
              return this.splice(t3, 1);
            }, i2.prototype.getObjectAtIndex = function(t3) {
              return this.objects[t3];
            }, i2.prototype.getSplittableListInRange = function(t3) {
              var e3, n2, i3, o2;
              return i3 = this.splitObjectsAtRange(t3), n2 = i3[0], e3 = i3[1], o2 = i3[2], new this.constructor(n2.slice(e3, o2 + 1));
            }, i2.prototype.selectSplittableList = function(t3) {
              var e3, n2;
              return n2 = function() {
                var n3, i3, o2, r2;
                for (o2 = this.objects, r2 = [], n3 = 0, i3 = o2.length; i3 > n3; n3++)
                  e3 = o2[n3], t3(e3) && r2.push(e3);
                return r2;
              }.call(this), new this.constructor(n2);
            }, i2.prototype.removeObjectsInRange = function(t3) {
              var e3, n2, i3, o2;
              return i3 = this.splitObjectsAtRange(t3), n2 = i3[0], e3 = i3[1], o2 = i3[2], new this.constructor(n2).splice(e3, o2 - e3 + 1);
            }, i2.prototype.transformObjectsInRange = function(t3, e3) {
              var n2, i3, o2, r2, s2, a2, u;
              return s2 = this.splitObjectsAtRange(t3), r2 = s2[0], i3 = s2[1], a2 = s2[2], u = function() {
                var t4, s3, u2;
                for (u2 = [], n2 = t4 = 0, s3 = r2.length; s3 > t4; n2 = ++t4)
                  o2 = r2[n2], u2.push(n2 >= i3 && a2 >= n2 ? e3(o2) : o2);
                return u2;
              }(), new this.constructor(u);
            }, i2.prototype.splitObjectsAtRange = function(t3) {
              var e3, n2, i3, o2, s2, u;
              return o2 = this.splitObjectAtPosition(a(t3)), n2 = o2[0], e3 = o2[1], i3 = o2[2], s2 = new this.constructor(n2).splitObjectAtPosition(r(t3) + i3), n2 = s2[0], u = s2[1], [n2, e3, u - 1];
            }, i2.prototype.getObjectAtPosition = function(t3) {
              var e3, n2, i3;
              return i3 = this.findIndexAndOffsetAtPosition(t3), e3 = i3.index, n2 = i3.offset, this.objects[e3];
            }, i2.prototype.splitObjectAtPosition = function(t3) {
              var e3, n2, i3, o2, r2, s2, a2, u, c, l;
              return s2 = this.findIndexAndOffsetAtPosition(t3), e3 = s2.index, r2 = s2.offset, o2 = this.objects.slice(0), e3 != null ? r2 === 0 ? (c = e3, l = 0) : (i3 = this.getObjectAtIndex(e3), a2 = i3.splitAtOffset(r2), n2 = a2[0], u = a2[1], o2.splice(e3, 1, n2, u), c = e3 + 1, l = n2.getLength() - r2) : (c = o2.length, l = 0), [o2, c, l];
            }, i2.prototype.consolidate = function() {
              var t3, e3, n2, i3, o2, r2;
              for (i3 = [], o2 = this.objects[0], r2 = this.objects.slice(1), t3 = 0, e3 = r2.length; e3 > t3; t3++)
                n2 = r2[t3], (typeof o2.canBeConsolidatedWith == "function" ? o2.canBeConsolidatedWith(n2) : void 0) ? o2 = o2.consolidateWith(n2) : (i3.push(o2), o2 = n2);
              return o2 != null && i3.push(o2), new this.constructor(i3);
            }, i2.prototype.consolidateFromIndexToIndex = function(t3, e3) {
              var n2, i3, r2;
              return i3 = this.objects.slice(0), r2 = i3.slice(t3, e3 + 1), n2 = new this.constructor(r2).consolidate().toArray(), this.splice.apply(this, [t3, r2.length].concat(o.call(n2)));
            }, i2.prototype.findIndexAndOffsetAtPosition = function(t3) {
              var e3, n2, i3, o2, r2, s2, a2;
              for (e3 = 0, a2 = this.objects, i3 = n2 = 0, o2 = a2.length; o2 > n2; i3 = ++n2) {
                if (s2 = a2[i3], r2 = e3 + s2.getLength(), t3 >= e3 && r2 > t3)
                  return { index: i3, offset: t3 - e3 };
                e3 = r2;
              }
              return { index: null, offset: null };
            }, i2.prototype.findPositionAtIndexAndOffset = function(t3, e3) {
              var n2, i3, o2, r2, s2, a2;
              for (s2 = 0, a2 = this.objects, n2 = i3 = 0, o2 = a2.length; o2 > i3; n2 = ++i3)
                if (r2 = a2[n2], t3 > n2)
                  s2 += r2.getLength();
                else if (n2 === t3) {
                  s2 += e3;
                  break;
                }
              return s2;
            }, i2.prototype.getEndPosition = function() {
              var t3, e3;
              return this.endPosition != null ? this.endPosition : this.endPosition = function() {
                var n2, i3, o2;
                for (e3 = 0, o2 = this.objects, n2 = 0, i3 = o2.length; i3 > n2; n2++)
                  t3 = o2[n2], e3 += t3.getLength();
                return e3;
              }.call(this);
            }, i2.prototype.toString = function() {
              return this.objects.join("");
            }, i2.prototype.toArray = function() {
              return this.objects.slice(0);
            }, i2.prototype.toJSON = function() {
              return this.toArray();
            }, i2.prototype.isEqualTo = function(t3) {
              return i2.__super__.isEqualTo.apply(this, arguments) || s(this.objects, t3 != null ? t3.objects : void 0);
            }, s = function(t3, e3) {
              var n2, i3, o2, r2, s2;
              if (e3 == null && (e3 = []), t3.length !== e3.length)
                return false;
              for (s2 = true, i3 = n2 = 0, o2 = t3.length; o2 > n2; i3 = ++n2)
                r2 = t3[i3], s2 && !r2.isEqualTo(e3[i3]) && (s2 = false);
              return s2;
            }, i2.prototype.contentsForInspection = function() {
              var t3;
              return { objects: "[" + function() {
                var e3, n2, i3, o2;
                for (i3 = this.objects, o2 = [], e3 = 0, n2 = i3.length; n2 > e3; e3++)
                  t3 = i3[e3], o2.push(t3.inspect());
                return o2;
              }.call(this).join(", ") + "]" };
            }, a = function(t3) {
              return t3[0];
            }, r = function(t3) {
              return t3[1];
            }, i2;
          }(e.Object);
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.Text = function(n2) {
            function i(t3) {
              var n3;
              t3 == null && (t3 = []), i.__super__.constructor.apply(this, arguments), this.pieceList = new e.SplittableList(function() {
                var e2, i2, o;
                for (o = [], e2 = 0, i2 = t3.length; i2 > e2; e2++)
                  n3 = t3[e2], n3.isEmpty() || o.push(n3);
                return o;
              }());
            }
            return t2(i, n2), i.textForAttachmentWithAttributes = function(t3, n3) {
              var i2;
              return i2 = new e.AttachmentPiece(t3, n3), new this([i2]);
            }, i.textForStringWithAttributes = function(t3, n3) {
              var i2;
              return i2 = new e.StringPiece(t3, n3), new this([i2]);
            }, i.fromJSON = function(t3) {
              var n3, i2;
              return i2 = function() {
                var i3, o, r;
                for (r = [], i3 = 0, o = t3.length; o > i3; i3++)
                  n3 = t3[i3], r.push(e.Piece.fromJSON(n3));
                return r;
              }(), new this(i2);
            }, i.prototype.copy = function() {
              return this.copyWithPieceList(this.pieceList);
            }, i.prototype.copyWithPieceList = function(t3) {
              return new this.constructor(t3.consolidate().toArray());
            }, i.prototype.copyUsingObjectMap = function(t3) {
              var e2, n3;
              return n3 = function() {
                var n4, i2, o, r, s;
                for (o = this.getPieces(), s = [], n4 = 0, i2 = o.length; i2 > n4; n4++)
                  e2 = o[n4], s.push((r = t3.find(e2)) != null ? r : e2);
                return s;
              }.call(this), new this.constructor(n3);
            }, i.prototype.appendText = function(t3) {
              return this.insertTextAtPosition(t3, this.getLength());
            }, i.prototype.insertTextAtPosition = function(t3, e2) {
              return this.copyWithPieceList(this.pieceList.insertSplittableListAtPosition(t3.pieceList, e2));
            }, i.prototype.removeTextAtRange = function(t3) {
              return this.copyWithPieceList(this.pieceList.removeObjectsInRange(t3));
            }, i.prototype.replaceTextAtRange = function(t3, e2) {
              return this.removeTextAtRange(e2).insertTextAtPosition(t3, e2[0]);
            }, i.prototype.moveTextFromRangeToPosition = function(t3, e2) {
              var n3, i2;
              if (!(t3[0] <= e2 && e2 <= t3[1]))
                return i2 = this.getTextAtRange(t3), n3 = i2.getLength(), t3[0] < e2 && (e2 -= n3), this.removeTextAtRange(t3).insertTextAtPosition(i2, e2);
            }, i.prototype.addAttributeAtRange = function(t3, e2, n3) {
              var i2;
              return i2 = {}, i2[t3] = e2, this.addAttributesAtRange(i2, n3);
            }, i.prototype.addAttributesAtRange = function(t3, e2) {
              return this.copyWithPieceList(this.pieceList.transformObjectsInRange(e2, function(e3) {
                return e3.copyWithAdditionalAttributes(t3);
              }));
            }, i.prototype.removeAttributeAtRange = function(t3, e2) {
              return this.copyWithPieceList(this.pieceList.transformObjectsInRange(e2, function(e3) {
                return e3.copyWithoutAttribute(t3);
              }));
            }, i.prototype.setAttributesAtRange = function(t3, e2) {
              return this.copyWithPieceList(this.pieceList.transformObjectsInRange(e2, function(e3) {
                return e3.copyWithAttributes(t3);
              }));
            }, i.prototype.getAttributesAtPosition = function(t3) {
              var e2, n3;
              return (e2 = (n3 = this.pieceList.getObjectAtPosition(t3)) != null ? n3.getAttributes() : void 0) != null ? e2 : {};
            }, i.prototype.getCommonAttributes = function() {
              var t3, n3;
              return t3 = function() {
                var t4, e2, i2, o;
                for (i2 = this.pieceList.toArray(), o = [], t4 = 0, e2 = i2.length; e2 > t4; t4++)
                  n3 = i2[t4], o.push(n3.getAttributes());
                return o;
              }.call(this), e.Hash.fromCommonAttributesOfObjects(t3).toObject();
            }, i.prototype.getCommonAttributesAtRange = function(t3) {
              var e2;
              return (e2 = this.getTextAtRange(t3).getCommonAttributes()) != null ? e2 : {};
            }, i.prototype.getExpandedRangeForAttributeAtOffset = function(t3, e2) {
              var n3, i2, o;
              for (n3 = o = e2, i2 = this.getLength(); n3 > 0 && this.getCommonAttributesAtRange([n3 - 1, o])[t3]; )
                n3--;
              for (; i2 > o && this.getCommonAttributesAtRange([e2, o + 1])[t3]; )
                o++;
              return [n3, o];
            }, i.prototype.getTextAtRange = function(t3) {
              return this.copyWithPieceList(this.pieceList.getSplittableListInRange(t3));
            }, i.prototype.getStringAtRange = function(t3) {
              return this.pieceList.getSplittableListInRange(t3).toString();
            }, i.prototype.getStringAtPosition = function(t3) {
              return this.getStringAtRange([t3, t3 + 1]);
            }, i.prototype.startsWithString = function(t3) {
              return this.getStringAtRange([0, t3.length]) === t3;
            }, i.prototype.endsWithString = function(t3) {
              var e2;
              return e2 = this.getLength(), this.getStringAtRange([e2 - t3.length, e2]) === t3;
            }, i.prototype.getAttachmentPieces = function() {
              var t3, e2, n3, i2, o;
              for (i2 = this.pieceList.toArray(), o = [], t3 = 0, e2 = i2.length; e2 > t3; t3++)
                n3 = i2[t3], n3.attachment != null && o.push(n3);
              return o;
            }, i.prototype.getAttachments = function() {
              var t3, e2, n3, i2, o;
              for (i2 = this.getAttachmentPieces(), o = [], t3 = 0, e2 = i2.length; e2 > t3; t3++)
                n3 = i2[t3], o.push(n3.attachment);
              return o;
            }, i.prototype.getAttachmentAndPositionById = function(t3) {
              var e2, n3, i2, o, r, s;
              for (o = 0, r = this.pieceList.toArray(), e2 = 0, n3 = r.length; n3 > e2; e2++) {
                if (i2 = r[e2], ((s = i2.attachment) != null ? s.id : void 0) === t3)
                  return { attachment: i2.attachment, position: o };
                o += i2.length;
              }
              return { attachment: null, position: null };
            }, i.prototype.getAttachmentById = function(t3) {
              var e2, n3, i2;
              return i2 = this.getAttachmentAndPositionById(t3), e2 = i2.attachment, n3 = i2.position, e2;
            }, i.prototype.getRangeOfAttachment = function(t3) {
              var e2, n3;
              return n3 = this.getAttachmentAndPositionById(t3.id), t3 = n3.attachment, e2 = n3.position, t3 != null ? [e2, e2 + 1] : void 0;
            }, i.prototype.updateAttributesForAttachment = function(t3, e2) {
              var n3;
              return (n3 = this.getRangeOfAttachment(e2)) ? this.addAttributesAtRange(t3, n3) : this;
            }, i.prototype.getLength = function() {
              return this.pieceList.getEndPosition();
            }, i.prototype.isEmpty = function() {
              return this.getLength() === 0;
            }, i.prototype.isEqualTo = function(t3) {
              var e2;
              return i.__super__.isEqualTo.apply(this, arguments) || (t3 != null && (e2 = t3.pieceList) != null ? e2.isEqualTo(this.pieceList) : void 0);
            }, i.prototype.isBlockBreak = function() {
              return this.getLength() === 1 && this.pieceList.getObjectAtIndex(0).isBlockBreak();
            }, i.prototype.eachPiece = function(t3) {
              return this.pieceList.eachObject(t3);
            }, i.prototype.getPieces = function() {
              return this.pieceList.toArray();
            }, i.prototype.getPieceAtPosition = function(t3) {
              return this.pieceList.getObjectAtPosition(t3);
            }, i.prototype.contentsForInspection = function() {
              return { pieceList: this.pieceList.inspect() };
            }, i.prototype.toSerializableText = function() {
              var t3;
              return t3 = this.pieceList.selectSplittableList(function(t4) {
                return t4.isSerializable();
              }), this.copyWithPieceList(t3);
            }, i.prototype.toString = function() {
              return this.pieceList.toString();
            }, i.prototype.toJSON = function() {
              return this.pieceList.toJSON();
            }, i.prototype.toConsole = function() {
              var t3;
              return JSON.stringify(function() {
                var e2, n3, i2, o;
                for (i2 = this.pieceList.toArray(), o = [], e2 = 0, n3 = i2.length; n3 > e2; e2++)
                  t3 = i2[e2], o.push(JSON.parse(t3.toConsole()));
                return o;
              }.call(this));
            }, i.prototype.getDirection = function() {
              return e.getDirection(this.toString());
            }, i.prototype.isRTL = function() {
              return this.getDirection() === "rtl";
            }, i;
          }(e.Object);
        }.call(this), function() {
          var t2, n, i, o, r, s = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              a.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, a = {}.hasOwnProperty, u = [].indexOf || function(t3) {
            for (var e2 = 0, n2 = this.length; n2 > e2; e2++)
              if (e2 in this && this[e2] === t3)
                return e2;
            return -1;
          }, c = [].slice;
          t2 = e.arraysAreEqual, r = e.spliceArray, i = e.getBlockConfig, n = e.getBlockAttributeNames, o = e.getListAttributeNames, e.Block = function(n2) {
            function a2(t3, n3) {
              t3 == null && (t3 = new e.Text()), n3 == null && (n3 = []), a2.__super__.constructor.apply(this, arguments), this.text = h(t3), this.attributes = n3;
            }
            var l, h, p, d, f, g, m, v, y;
            return s(a2, n2), a2.fromJSON = function(t3) {
              var n3;
              return n3 = e.Text.fromJSON(t3.text), new this(n3, t3.attributes);
            }, a2.prototype.isEmpty = function() {
              return this.text.isBlockBreak();
            }, a2.prototype.isEqualTo = function(e2) {
              return a2.__super__.isEqualTo.apply(this, arguments) || this.text.isEqualTo(e2 != null ? e2.text : void 0) && t2(this.attributes, e2 != null ? e2.attributes : void 0);
            }, a2.prototype.copyWithText = function(t3) {
              return new this.constructor(t3, this.attributes);
            }, a2.prototype.copyWithoutText = function() {
              return this.copyWithText(null);
            }, a2.prototype.copyWithAttributes = function(t3) {
              return new this.constructor(this.text, t3);
            }, a2.prototype.copyWithoutAttributes = function() {
              return this.copyWithAttributes(null);
            }, a2.prototype.copyUsingObjectMap = function(t3) {
              var e2;
              return this.copyWithText((e2 = t3.find(this.text)) ? e2 : this.text.copyUsingObjectMap(t3));
            }, a2.prototype.addAttribute = function(t3) {
              var e2;
              return e2 = this.attributes.concat(d(t3)), this.copyWithAttributes(e2);
            }, a2.prototype.removeAttribute = function(t3) {
              var e2, n3;
              return n3 = i(t3).listAttribute, e2 = g(g(this.attributes, t3), n3), this.copyWithAttributes(e2);
            }, a2.prototype.removeLastAttribute = function() {
              return this.removeAttribute(this.getLastAttribute());
            }, a2.prototype.getLastAttribute = function() {
              return f(this.attributes);
            }, a2.prototype.getAttributes = function() {
              return this.attributes.slice(0);
            }, a2.prototype.getAttributeLevel = function() {
              return this.attributes.length;
            }, a2.prototype.getAttributeAtLevel = function(t3) {
              return this.attributes[t3 - 1];
            }, a2.prototype.hasAttribute = function(t3) {
              return u.call(this.attributes, t3) >= 0;
            }, a2.prototype.hasAttributes = function() {
              return this.getAttributeLevel() > 0;
            }, a2.prototype.getLastNestableAttribute = function() {
              return f(this.getNestableAttributes());
            }, a2.prototype.getNestableAttributes = function() {
              var t3, e2, n3, o2, r2;
              for (o2 = this.attributes, r2 = [], e2 = 0, n3 = o2.length; n3 > e2; e2++)
                t3 = o2[e2], i(t3).nestable && r2.push(t3);
              return r2;
            }, a2.prototype.getNestingLevel = function() {
              return this.getNestableAttributes().length;
            }, a2.prototype.decreaseNestingLevel = function() {
              var t3;
              return (t3 = this.getLastNestableAttribute()) ? this.removeAttribute(t3) : this;
            }, a2.prototype.increaseNestingLevel = function() {
              var t3, e2, n3;
              return (t3 = this.getLastNestableAttribute()) ? (n3 = this.attributes.lastIndexOf(t3), e2 = r.apply(null, [this.attributes, n3 + 1, 0].concat(c.call(d(t3)))), this.copyWithAttributes(e2)) : this;
            }, a2.prototype.getListItemAttributes = function() {
              var t3, e2, n3, o2, r2;
              for (o2 = this.attributes, r2 = [], e2 = 0, n3 = o2.length; n3 > e2; e2++)
                t3 = o2[e2], i(t3).listAttribute && r2.push(t3);
              return r2;
            }, a2.prototype.isListItem = function() {
              var t3;
              return (t3 = i(this.getLastAttribute())) != null ? t3.listAttribute : void 0;
            }, a2.prototype.isTerminalBlock = function() {
              var t3;
              return (t3 = i(this.getLastAttribute())) != null ? t3.terminal : void 0;
            }, a2.prototype.breaksOnReturn = function() {
              var t3;
              return (t3 = i(this.getLastAttribute())) != null ? t3.breakOnReturn : void 0;
            }, a2.prototype.findLineBreakInDirectionFromPosition = function(t3, e2) {
              var n3, i2;
              return i2 = this.toString(), n3 = function() {
                switch (t3) {
                  case "forward":
                    return i2.indexOf("\n", e2);
                  case "backward":
                    return i2.slice(0, e2).lastIndexOf("\n");
                }
              }(), n3 !== -1 ? n3 : void 0;
            }, a2.prototype.contentsForInspection = function() {
              return { text: this.text.inspect(), attributes: this.attributes };
            }, a2.prototype.toString = function() {
              return this.text.toString();
            }, a2.prototype.toJSON = function() {
              return { text: this.text, attributes: this.attributes };
            }, a2.prototype.getDirection = function() {
              return this.text.getDirection();
            }, a2.prototype.isRTL = function() {
              return this.text.isRTL();
            }, a2.prototype.getLength = function() {
              return this.text.getLength();
            }, a2.prototype.canBeConsolidatedWith = function(t3) {
              return !this.hasAttributes() && !t3.hasAttributes() && this.getDirection() === t3.getDirection();
            }, a2.prototype.consolidateWith = function(t3) {
              var n3, i2;
              return n3 = e.Text.textForStringWithAttributes("\n"), i2 = this.getTextWithoutBlockBreak().appendText(n3), this.copyWithText(i2.appendText(t3.text));
            }, a2.prototype.splitAtOffset = function(t3) {
              var e2, n3;
              return t3 === 0 ? (e2 = null, n3 = this) : t3 === this.getLength() ? (e2 = this, n3 = null) : (e2 = this.copyWithText(this.text.getTextAtRange([0, t3])), n3 = this.copyWithText(this.text.getTextAtRange([t3, this.getLength()]))), [e2, n3];
            }, a2.prototype.getBlockBreakPosition = function() {
              return this.text.getLength() - 1;
            }, a2.prototype.getTextWithoutBlockBreak = function() {
              return m(this.text) ? this.text.getTextAtRange([0, this.getBlockBreakPosition()]) : this.text.copy();
            }, a2.prototype.canBeGrouped = function(t3) {
              return this.attributes[t3];
            }, a2.prototype.canBeGroupedWith = function(t3, e2) {
              var n3, r2, s2, a3;
              return s2 = t3.getAttributes(), r2 = s2[e2], n3 = this.attributes[e2], !(n3 !== r2 || i(n3).group === false && (a3 = s2[e2 + 1], u.call(o(), a3) < 0) || this.getDirection() !== t3.getDirection() && !t3.isEmpty());
            }, h = function(t3) {
              return t3 = y(t3), t3 = l(t3);
            }, y = function(t3) {
              var n3, i2, o2, r2, s2, a3;
              return r2 = false, a3 = t3.getPieces(), i2 = 2 <= a3.length ? c.call(a3, 0, n3 = a3.length - 1) : (n3 = 0, []), o2 = a3[n3++], o2 == null ? t3 : (i2 = function() {
                var t4, e2, n4;
                for (n4 = [], t4 = 0, e2 = i2.length; e2 > t4; t4++)
                  s2 = i2[t4], s2.isBlockBreak() ? (r2 = true, n4.push(v(s2))) : n4.push(s2);
                return n4;
              }(), r2 ? new e.Text(c.call(i2).concat([o2])) : t3);
            }, p = e.Text.textForStringWithAttributes("\n", { blockBreak: true }), l = function(t3) {
              return m(t3) ? t3 : t3.appendText(p);
            }, m = function(t3) {
              var e2, n3;
              return n3 = t3.getLength(), n3 === 0 ? false : (e2 = t3.getTextAtRange([n3 - 1, n3]), e2.isBlockBreak());
            }, v = function(t3) {
              return t3.copyWithoutAttribute("blockBreak");
            }, d = function(t3) {
              var e2;
              return e2 = i(t3).listAttribute, e2 != null ? [e2, t3] : [t3];
            }, f = function(t3) {
              return t3.slice(-1)[0];
            }, g = function(t3, e2) {
              var n3;
              return n3 = t3.lastIndexOf(e2), n3 === -1 ? t3 : r(t3, n3, 1);
            }, a2;
          }(e.Object);
        }.call(this), function() {
          var t2, n, i, o = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              r.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, r = {}.hasOwnProperty, s = [].indexOf || function(t3) {
            for (var e2 = 0, n2 = this.length; n2 > e2; e2++)
              if (e2 in this && this[e2] === t3)
                return e2;
            return -1;
          }, a = [].slice;
          n = e.tagName, i = e.walkTree, t2 = e.nodeIsAttachmentElement, e.HTMLSanitizer = function(r2) {
            function u(t3, e2) {
              var n2;
              n2 = e2 != null ? e2 : {}, this.allowedAttributes = n2.allowedAttributes, this.forbiddenProtocols = n2.forbiddenProtocols, this.forbiddenElements = n2.forbiddenElements, this.allowedAttributes == null && (this.allowedAttributes = c), this.forbiddenProtocols == null && (this.forbiddenProtocols = h), this.forbiddenElements == null && (this.forbiddenElements = l), this.body = p(t3);
            }
            var c, l, h, p;
            return o(u, r2), c = "style href src width height class".split(" "), h = "javascript:".split(" "), l = "script iframe".split(" "), u.sanitize = function(t3, e2) {
              var n2;
              return n2 = new this(t3, e2), n2.sanitize(), n2;
            }, u.prototype.sanitize = function() {
              return this.sanitizeElements(), this.normalizeListElementNesting();
            }, u.prototype.getHTML = function() {
              return this.body.innerHTML;
            }, u.prototype.getBody = function() {
              return this.body;
            }, u.prototype.sanitizeElements = function() {
              var t3, n2, o2, r3, s2;
              for (s2 = i(this.body), r3 = []; s2.nextNode(); )
                switch (o2 = s2.currentNode, o2.nodeType) {
                  case Node.ELEMENT_NODE:
                    this.elementIsRemovable(o2) ? r3.push(o2) : this.sanitizeElement(o2);
                    break;
                  case Node.COMMENT_NODE:
                    r3.push(o2);
                }
              for (t3 = 0, n2 = r3.length; n2 > t3; t3++)
                o2 = r3[t3], e.removeNode(o2);
              return this.body;
            }, u.prototype.sanitizeElement = function(t3) {
              var e2, n2, i2, o2, r3;
              for (t3.hasAttribute("href") && (o2 = t3.protocol, s.call(this.forbiddenProtocols, o2) >= 0 && t3.removeAttribute("href")), r3 = a.call(t3.attributes), e2 = 0, n2 = r3.length; n2 > e2; e2++)
                i2 = r3[e2].name, s.call(this.allowedAttributes, i2) >= 0 || i2.indexOf("data-trix") === 0 || t3.removeAttribute(i2);
              return t3;
            }, u.prototype.normalizeListElementNesting = function() {
              var t3, e2, i2, o2, r3;
              for (r3 = a.call(this.body.querySelectorAll("ul,ol")), t3 = 0, e2 = r3.length; e2 > t3; t3++)
                i2 = r3[t3], (o2 = i2.previousElementSibling) && n(o2) === "li" && o2.appendChild(i2);
              return this.body;
            }, u.prototype.elementIsRemovable = function(t3) {
              return (t3 != null ? t3.nodeType : void 0) === Node.ELEMENT_NODE ? this.elementIsForbidden(t3) || this.elementIsntSerializable(t3) : void 0;
            }, u.prototype.elementIsForbidden = function(t3) {
              var e2;
              return e2 = n(t3), s.call(this.forbiddenElements, e2) >= 0;
            }, u.prototype.elementIsntSerializable = function(e2) {
              return e2.getAttribute("data-trix-serialize") === "false" && !t2(e2);
            }, p = function(t3) {
              var e2, n2, i2, o2, r3;
              for (t3 == null && (t3 = ""), t3 = t3.replace(/<\/html[^>]*>[^]*$/i, "</html>"), e2 = document.implementation.createHTMLDocument(""), e2.documentElement.innerHTML = t3, r3 = e2.head.querySelectorAll("style"), i2 = 0, o2 = r3.length; o2 > i2; i2++)
                n2 = r3[i2], e2.body.appendChild(n2);
              return e2.body;
            }, u;
          }(e.BasicObject);
        }.call(this), function() {
          var t2, n, i, o, r, s, a, u, c, l, h, p = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              d.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, d = {}.hasOwnProperty, f = [].indexOf || function(t3) {
            for (var e2 = 0, n2 = this.length; n2 > e2; e2++)
              if (e2 in this && this[e2] === t3)
                return e2;
            return -1;
          };
          t2 = e.arraysAreEqual, s = e.makeElement, l = e.tagName, r = e.getBlockTagNames, h = e.walkTree, o = e.findClosestElementFromNode, i = e.elementContainsNode, a = e.nodeIsAttachmentElement, u = e.normalizeSpaces, n = e.breakableWhitespacePattern, c = e.squishBreakableWhitespace, e.HTMLParser = function(d2) {
            function g(t3, e2) {
              this.html = t3, this.referenceElement = (e2 != null ? e2 : {}).referenceElement, this.blocks = [], this.blockElements = [], this.processedElements = [];
            }
            var m, v, y, b, A, C3, x, w, E, S2, R, k;
            return p(g, d2), g.parse = function(t3, e2) {
              var n2;
              return n2 = new this(t3, e2), n2.parse(), n2;
            }, g.prototype.getDocument = function() {
              return e.Document.fromJSON(this.blocks);
            }, g.prototype.parse = function() {
              var t3, n2;
              try {
                for (this.createHiddenContainer(), t3 = e.HTMLSanitizer.sanitize(this.html).getHTML(), this.containerElement.innerHTML = t3, n2 = h(this.containerElement, { usingFilter: x }); n2.nextNode(); )
                  this.processNode(n2.currentNode);
                return this.translateBlockElementMarginsToNewlines();
              } finally {
                this.removeHiddenContainer();
              }
            }, g.prototype.createHiddenContainer = function() {
              return this.referenceElement ? (this.containerElement = this.referenceElement.cloneNode(false), this.containerElement.removeAttribute("id"), this.containerElement.setAttribute("data-trix-internal", ""), this.containerElement.style.display = "none", this.referenceElement.parentNode.insertBefore(this.containerElement, this.referenceElement.nextSibling)) : (this.containerElement = s({ tagName: "div", style: { display: "none" } }), document.body.appendChild(this.containerElement));
            }, g.prototype.removeHiddenContainer = function() {
              return e.removeNode(this.containerElement);
            }, x = function(t3) {
              return l(t3) === "style" ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }, g.prototype.processNode = function(t3) {
              switch (t3.nodeType) {
                case Node.TEXT_NODE:
                  if (!this.isInsignificantTextNode(t3))
                    return this.appendBlockForTextNode(t3), this.processTextNode(t3);
                  break;
                case Node.ELEMENT_NODE:
                  return this.appendBlockForElement(t3), this.processElement(t3);
              }
            }, g.prototype.appendBlockForTextNode = function(e2) {
              var n2, i2, o2;
              return i2 = e2.parentNode, i2 === this.currentBlockElement && this.isBlockElement(e2.previousSibling) ? this.appendStringWithAttributes("\n") : i2 !== this.containerElement && !this.isBlockElement(i2) || (n2 = this.getBlockAttributes(i2), t2(n2, (o2 = this.currentBlock) != null ? o2.attributes : void 0)) ? void 0 : (this.currentBlock = this.appendBlockForAttributesWithElement(n2, i2), this.currentBlockElement = i2);
            }, g.prototype.appendBlockForElement = function(e2) {
              var n2, o2, r2, s2;
              if (r2 = this.isBlockElement(e2), o2 = i(this.currentBlockElement, e2), r2 && !this.isBlockElement(e2.firstChild)) {
                if ((!this.isInsignificantTextNode(e2.firstChild) || !this.isBlockElement(e2.firstElementChild)) && (n2 = this.getBlockAttributes(e2), e2.firstChild))
                  return o2 && t2(n2, this.currentBlock.attributes) ? this.appendStringWithAttributes("\n") : (this.currentBlock = this.appendBlockForAttributesWithElement(n2, e2), this.currentBlockElement = e2);
              } else if (this.currentBlockElement && !o2 && !r2)
                return (s2 = this.findParentBlockElement(e2)) ? this.appendBlockForElement(s2) : (this.currentBlock = this.appendEmptyBlock(), this.currentBlockElement = null);
            }, g.prototype.findParentBlockElement = function(t3) {
              var e2;
              for (e2 = t3.parentElement; e2 && e2 !== this.containerElement; ) {
                if (this.isBlockElement(e2) && f.call(this.blockElements, e2) >= 0)
                  return e2;
                e2 = e2.parentElement;
              }
              return null;
            }, g.prototype.processTextNode = function(t3) {
              var e2, n2;
              return n2 = t3.data, v(t3.parentNode) || (n2 = c(n2), R((e2 = t3.previousSibling) != null ? e2.textContent : void 0) && (n2 = A(n2))), this.appendStringWithAttributes(n2, this.getTextAttributes(t3.parentNode));
            }, g.prototype.processElement = function(t3) {
              var e2, n2, i2, o2, r2;
              if (a(t3))
                return e2 = w(t3, "attachment"), Object.keys(e2).length && (o2 = this.getTextAttributes(t3), this.appendAttachmentWithAttributes(e2, o2), t3.innerHTML = ""), this.processedElements.push(t3);
              switch (l(t3)) {
                case "br":
                  return this.isExtraBR(t3) || this.isBlockElement(t3.nextSibling) || this.appendStringWithAttributes("\n", this.getTextAttributes(t3)), this.processedElements.push(t3);
                case "img":
                  e2 = { url: t3.getAttribute("src"), contentType: "image" }, i2 = b(t3);
                  for (n2 in i2)
                    r2 = i2[n2], e2[n2] = r2;
                  return this.appendAttachmentWithAttributes(e2, this.getTextAttributes(t3)), this.processedElements.push(t3);
                case "tr":
                  if (t3.parentNode.firstChild !== t3)
                    return this.appendStringWithAttributes("\n");
                  break;
                case "td":
                  if (t3.parentNode.firstChild !== t3)
                    return this.appendStringWithAttributes(" | ");
              }
            }, g.prototype.appendBlockForAttributesWithElement = function(t3, e2) {
              var n2;
              return this.blockElements.push(e2), n2 = m(t3), this.blocks.push(n2), n2;
            }, g.prototype.appendEmptyBlock = function() {
              return this.appendBlockForAttributesWithElement([], null);
            }, g.prototype.appendStringWithAttributes = function(t3, e2) {
              return this.appendPiece(S2(t3, e2));
            }, g.prototype.appendAttachmentWithAttributes = function(t3, e2) {
              return this.appendPiece(E(t3, e2));
            }, g.prototype.appendPiece = function(t3) {
              return this.blocks.length === 0 && this.appendEmptyBlock(), this.blocks[this.blocks.length - 1].text.push(t3);
            }, g.prototype.appendStringToTextAtIndex = function(t3, e2) {
              var n2, i2;
              return i2 = this.blocks[e2].text, n2 = i2[i2.length - 1], (n2 != null ? n2.type : void 0) === "string" ? n2.string += t3 : i2.push(S2(t3));
            }, g.prototype.prependStringToTextAtIndex = function(t3, e2) {
              var n2, i2;
              return i2 = this.blocks[e2].text, n2 = i2[0], (n2 != null ? n2.type : void 0) === "string" ? n2.string = t3 + n2.string : i2.unshift(S2(t3));
            }, S2 = function(t3, e2) {
              var n2;
              return e2 == null && (e2 = {}), n2 = "string", t3 = u(t3), { string: t3, attributes: e2, type: n2 };
            }, E = function(t3, e2) {
              var n2;
              return e2 == null && (e2 = {}), n2 = "attachment", { attachment: t3, attributes: e2, type: n2 };
            }, m = function(t3) {
              var e2;
              return t3 == null && (t3 = {}), e2 = [], { text: e2, attributes: t3 };
            }, g.prototype.getTextAttributes = function(t3) {
              var n2, i2, r2, s2, u2, c2, l2, h2, p2, d3, f2, g2;
              r2 = {}, p2 = e.config.textAttributes;
              for (n2 in p2)
                if (u2 = p2[n2], u2.tagName && o(t3, { matchingSelector: u2.tagName, untilNode: this.containerElement }))
                  r2[n2] = true;
                else if (u2.parser) {
                  if (g2 = u2.parser(t3)) {
                    for (i2 = false, d3 = this.findBlockElementAncestors(t3), c2 = 0, h2 = d3.length; h2 > c2; c2++)
                      if (s2 = d3[c2], u2.parser(s2) === g2) {
                        i2 = true;
                        break;
                      }
                    i2 || (r2[n2] = g2);
                  }
                } else
                  u2.styleProperty && (g2 = t3.style[u2.styleProperty]) && (r2[n2] = g2);
              if (a(t3)) {
                f2 = w(t3, "attributes");
                for (l2 in f2)
                  g2 = f2[l2], r2[l2] = g2;
              }
              return r2;
            }, g.prototype.getBlockAttributes = function(t3) {
              var n2, i2, o2, r2;
              for (i2 = []; t3 && t3 !== this.containerElement; ) {
                r2 = e.config.blockAttributes;
                for (n2 in r2)
                  o2 = r2[n2], o2.parse !== false && l(t3) === o2.tagName && ((typeof o2.test == "function" ? o2.test(t3) : void 0) || !o2.test) && (i2.push(n2), o2.listAttribute && i2.push(o2.listAttribute));
                t3 = t3.parentNode;
              }
              return i2.reverse();
            }, g.prototype.findBlockElementAncestors = function(t3) {
              var e2, n2;
              for (e2 = []; t3 && t3 !== this.containerElement; )
                n2 = l(t3), f.call(r(), n2) >= 0 && e2.push(t3), t3 = t3.parentNode;
              return e2;
            }, w = function(t3, e2) {
              try {
                return JSON.parse(t3.getAttribute("data-trix-" + e2));
              } catch (n2) {
                return {};
              }
            }, b = function(t3) {
              var e2, n2, i2;
              return i2 = t3.getAttribute("width"), n2 = t3.getAttribute("height"), e2 = {}, i2 && (e2.width = parseInt(i2, 10)), n2 && (e2.height = parseInt(n2, 10)), e2;
            }, g.prototype.isBlockElement = function(t3) {
              var e2;
              if ((t3 != null ? t3.nodeType : void 0) === Node.ELEMENT_NODE && !a(t3) && !o(t3, { matchingSelector: "td", untilNode: this.containerElement }))
                return e2 = l(t3), f.call(r(), e2) >= 0 || window.getComputedStyle(t3).display === "block";
            }, g.prototype.isInsignificantTextNode = function(t3) {
              var e2, n2, i2;
              if ((t3 != null ? t3.nodeType : void 0) === Node.TEXT_NODE && k(t3.data) && (n2 = t3.parentNode, i2 = t3.previousSibling, e2 = t3.nextSibling, (!C3(n2.previousSibling) || this.isBlockElement(n2.previousSibling)) && !v(n2)))
                return !i2 || this.isBlockElement(i2) || !e2 || this.isBlockElement(e2);
            }, g.prototype.isExtraBR = function(t3) {
              return l(t3) === "br" && this.isBlockElement(t3.parentNode) && t3.parentNode.lastChild === t3;
            }, v = function(t3) {
              var e2;
              return e2 = window.getComputedStyle(t3).whiteSpace, e2 === "pre" || e2 === "pre-wrap" || e2 === "pre-line";
            }, C3 = function(t3) {
              return t3 && !R(t3.textContent);
            }, g.prototype.translateBlockElementMarginsToNewlines = function() {
              var t3, e2, n2, i2, o2, r2, s2, a2;
              for (e2 = this.getMarginOfDefaultBlockElement(), s2 = this.blocks, a2 = [], i2 = n2 = 0, o2 = s2.length; o2 > n2; i2 = ++n2)
                t3 = s2[i2], (r2 = this.getMarginOfBlockElementAtIndex(i2)) && (r2.top > 2 * e2.top && this.prependStringToTextAtIndex("\n", i2), a2.push(r2.bottom > 2 * e2.bottom ? this.appendStringToTextAtIndex("\n", i2) : void 0));
              return a2;
            }, g.prototype.getMarginOfBlockElementAtIndex = function(t3) {
              var e2, n2;
              return !(e2 = this.blockElements[t3]) || !e2.textContent || (n2 = l(e2), f.call(r(), n2) >= 0 || f.call(this.processedElements, e2) >= 0) ? void 0 : y(e2);
            }, g.prototype.getMarginOfDefaultBlockElement = function() {
              var t3;
              return t3 = s(e.config.blockAttributes["default"].tagName), this.containerElement.appendChild(t3), y(t3);
            }, y = function(t3) {
              var e2;
              return e2 = window.getComputedStyle(t3), e2.display === "block" ? { top: parseInt(e2.marginTop), bottom: parseInt(e2.marginBottom) } : void 0;
            }, A = function(t3) {
              return t3.replace(RegExp("^" + n.source + "+"), "");
            }, k = function(t3) {
              return RegExp("^" + n.source + "*$").test(t3);
            }, R = function(t3) {
              return /\s$/.test(t3);
            }, g;
          }(e.BasicObject);
        }.call(this), function() {
          var t2, n, i, o, r = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              s.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, s = {}.hasOwnProperty, a = [].slice, u = [].indexOf || function(t3) {
            for (var e2 = 0, n2 = this.length; n2 > e2; e2++)
              if (e2 in this && this[e2] === t3)
                return e2;
            return -1;
          };
          t2 = e.arraysAreEqual, i = e.normalizeRange, o = e.rangeIsCollapsed, n = e.getBlockConfig, e.Document = function(s2) {
            function c(t3) {
              t3 == null && (t3 = []), c.__super__.constructor.apply(this, arguments), t3.length === 0 && (t3 = [new e.Block()]), this.blockList = e.SplittableList.box(t3);
            }
            var l;
            return r(c, s2), c.fromJSON = function(t3) {
              var n2, i2;
              return i2 = function() {
                var i3, o2, r2;
                for (r2 = [], i3 = 0, o2 = t3.length; o2 > i3; i3++)
                  n2 = t3[i3], r2.push(e.Block.fromJSON(n2));
                return r2;
              }(), new this(i2);
            }, c.fromHTML = function(t3, n2) {
              return e.HTMLParser.parse(t3, n2).getDocument();
            }, c.fromString = function(t3, n2) {
              var i2;
              return i2 = e.Text.textForStringWithAttributes(t3, n2), new this([new e.Block(i2)]);
            }, c.prototype.isEmpty = function() {
              var t3;
              return this.blockList.length === 1 && (t3 = this.getBlockAtIndex(0), t3.isEmpty() && !t3.hasAttributes());
            }, c.prototype.copy = function(t3) {
              var e2;
              return t3 == null && (t3 = {}), e2 = t3.consolidateBlocks ? this.blockList.consolidate().toArray() : this.blockList.toArray(), new this.constructor(e2);
            }, c.prototype.copyUsingObjectsFromDocument = function(t3) {
              var n2;
              return n2 = new e.ObjectMap(t3.getObjects()), this.copyUsingObjectMap(n2);
            }, c.prototype.copyUsingObjectMap = function(t3) {
              var e2, n2, i2;
              return n2 = function() {
                var n3, o2, r2, s3;
                for (r2 = this.getBlocks(), s3 = [], n3 = 0, o2 = r2.length; o2 > n3; n3++)
                  e2 = r2[n3], s3.push((i2 = t3.find(e2)) ? i2 : e2.copyUsingObjectMap(t3));
                return s3;
              }.call(this), new this.constructor(n2);
            }, c.prototype.copyWithBaseBlockAttributes = function(t3) {
              var e2, n2, i2;
              return t3 == null && (t3 = []), i2 = function() {
                var i3, o2, r2, s3;
                for (r2 = this.getBlocks(), s3 = [], i3 = 0, o2 = r2.length; o2 > i3; i3++)
                  n2 = r2[i3], e2 = t3.concat(n2.getAttributes()), s3.push(n2.copyWithAttributes(e2));
                return s3;
              }.call(this), new this.constructor(i2);
            }, c.prototype.replaceBlock = function(t3, e2) {
              var n2;
              return n2 = this.blockList.indexOf(t3), n2 === -1 ? this : new this.constructor(this.blockList.replaceObjectAtIndex(e2, n2));
            }, c.prototype.insertDocumentAtRange = function(t3, e2) {
              var n2, r2, s3, a2, u2, c2, l2;
              return r2 = t3.blockList, u2 = (e2 = i(e2))[0], c2 = this.locationFromPosition(u2), s3 = c2.index, a2 = c2.offset, l2 = this, n2 = this.getBlockAtPosition(u2), o(e2) && n2.isEmpty() && !n2.hasAttributes() ? l2 = new this.constructor(l2.blockList.removeObjectAtIndex(s3)) : n2.getBlockBreakPosition() === a2 && u2++, l2 = l2.removeTextAtRange(e2), new this.constructor(l2.blockList.insertSplittableListAtPosition(r2, u2));
            }, c.prototype.mergeDocumentAtRange = function(e2, n2) {
              var o2, r2, s3, a2, u2, c2, l2, h, p, d, f, g;
              return f = (n2 = i(n2))[0], d = this.locationFromPosition(f), r2 = this.getBlockAtIndex(d.index).getAttributes(), o2 = e2.getBaseBlockAttributes(), g = r2.slice(-o2.length), t2(o2, g) ? (l2 = r2.slice(0, -o2.length), c2 = e2.copyWithBaseBlockAttributes(l2)) : c2 = e2.copy({ consolidateBlocks: true }).copyWithBaseBlockAttributes(r2), s3 = c2.getBlockCount(), a2 = c2.getBlockAtIndex(0), t2(r2, a2.getAttributes()) ? (u2 = a2.getTextWithoutBlockBreak(), p = this.insertTextAtRange(u2, n2), s3 > 1 && (c2 = new this.constructor(c2.getBlocks().slice(1)), h = f + u2.getLength(), p = p.insertDocumentAtRange(c2, h))) : p = this.insertDocumentAtRange(c2, n2), p;
            }, c.prototype.insertTextAtRange = function(t3, e2) {
              var n2, o2, r2, s3, a2;
              return a2 = (e2 = i(e2))[0], s3 = this.locationFromPosition(a2), o2 = s3.index, r2 = s3.offset, n2 = this.removeTextAtRange(e2), new this.constructor(n2.blockList.editObjectAtIndex(o2, function(e3) {
                return e3.copyWithText(e3.text.insertTextAtPosition(t3, r2));
              }));
            }, c.prototype.removeTextAtRange = function(t3) {
              var e2, n2, r2, s3, a2, u2, c2, l2, h, p, d, f, g, m, v, y, b, A, C3, x, w;
              return p = t3 = i(t3), l2 = p[0], A = p[1], o(t3) ? this : (d = this.locationRangeFromRange(t3), u2 = d[0], y = d[1], a2 = u2.index, c2 = u2.offset, s3 = this.getBlockAtIndex(a2), v = y.index, b = y.offset, m = this.getBlockAtIndex(v), f = A - l2 === 1 && s3.getBlockBreakPosition() === c2 && m.getBlockBreakPosition() !== b && m.text.getStringAtPosition(b) === "\n", f ? r2 = this.blockList.editObjectAtIndex(v, function(t4) {
                return t4.copyWithText(t4.text.removeTextAtRange([b, b + 1]));
              }) : (h = s3.text.getTextAtRange([0, c2]), C3 = m.text.getTextAtRange([b, m.getLength()]), x = h.appendText(C3), g = a2 !== v && c2 === 0, w = g && s3.getAttributeLevel() >= m.getAttributeLevel(), n2 = w ? m.copyWithText(x) : s3.copyWithText(x), e2 = v + 1 - a2, r2 = this.blockList.splice(a2, e2, n2)), new this.constructor(r2));
            }, c.prototype.moveTextFromRangeToPosition = function(t3, e2) {
              var n2, o2, r2, s3, u2, c2, l2, h, p, d;
              return c2 = t3 = i(t3), p = c2[0], r2 = c2[1], e2 >= p && r2 >= e2 ? this : (o2 = this.getDocumentAtRange(t3), h = this.removeTextAtRange(t3), u2 = e2 > p, u2 && (e2 -= o2.getLength()), l2 = o2.getBlocks(), s3 = l2[0], n2 = 2 <= l2.length ? a.call(l2, 1) : [], n2.length === 0 ? (d = s3.getTextWithoutBlockBreak(), u2 && (e2 += 1)) : d = s3.text, h = h.insertTextAtRange(d, e2), n2.length === 0 ? h : (o2 = new this.constructor(n2), e2 += d.getLength(), h.insertDocumentAtRange(o2, e2)));
            }, c.prototype.addAttributeAtRange = function(t3, e2, i2) {
              var o2;
              return o2 = this.blockList, this.eachBlockAtRange(i2, function(i3, r2, s3) {
                return o2 = o2.editObjectAtIndex(s3, function() {
                  return n(t3) ? i3.addAttribute(t3, e2) : r2[0] === r2[1] ? i3 : i3.copyWithText(i3.text.addAttributeAtRange(t3, e2, r2));
                });
              }), new this.constructor(o2);
            }, c.prototype.addAttribute = function(t3, e2) {
              var n2;
              return n2 = this.blockList, this.eachBlock(function(i2, o2) {
                return n2 = n2.editObjectAtIndex(o2, function() {
                  return i2.addAttribute(t3, e2);
                });
              }), new this.constructor(n2);
            }, c.prototype.removeAttributeAtRange = function(t3, e2) {
              var i2;
              return i2 = this.blockList, this.eachBlockAtRange(e2, function(e3, o2, r2) {
                return n(t3) ? i2 = i2.editObjectAtIndex(r2, function() {
                  return e3.removeAttribute(t3);
                }) : o2[0] !== o2[1] ? i2 = i2.editObjectAtIndex(r2, function() {
                  return e3.copyWithText(e3.text.removeAttributeAtRange(t3, o2));
                }) : void 0;
              }), new this.constructor(i2);
            }, c.prototype.updateAttributesForAttachment = function(t3, e2) {
              var n2, i2, o2, r2;
              return o2 = (i2 = this.getRangeOfAttachment(e2))[0], n2 = this.locationFromPosition(o2).index, r2 = this.getTextAtIndex(n2), new this.constructor(this.blockList.editObjectAtIndex(n2, function(n3) {
                return n3.copyWithText(r2.updateAttributesForAttachment(t3, e2));
              }));
            }, c.prototype.removeAttributeForAttachment = function(t3, e2) {
              var n2;
              return n2 = this.getRangeOfAttachment(e2), this.removeAttributeAtRange(t3, n2);
            }, c.prototype.insertBlockBreakAtRange = function(t3) {
              var n2, o2, r2, s3;
              return s3 = (t3 = i(t3))[0], r2 = this.locationFromPosition(s3).offset, o2 = this.removeTextAtRange(t3), r2 === 0 && (n2 = [new e.Block()]), new this.constructor(o2.blockList.insertSplittableListAtPosition(new e.SplittableList(n2), s3));
            }, c.prototype.applyBlockAttributeAtRange = function(t3, e2, i2) {
              var o2, r2, s3, a2;
              return s3 = this.expandRangeToLineBreaksAndSplitBlocks(i2), r2 = s3.document, i2 = s3.range, o2 = n(t3), o2.listAttribute ? (r2 = r2.removeLastListAttributeAtRange(i2, { exceptAttributeName: t3 }), a2 = r2.convertLineBreaksToBlockBreaksInRange(i2), r2 = a2.document, i2 = a2.range) : r2 = o2.exclusive ? r2.removeBlockAttributesAtRange(i2) : o2.terminal ? r2.removeLastTerminalAttributeAtRange(i2) : r2.consolidateBlocksAtRange(i2), r2.addAttributeAtRange(t3, e2, i2);
            }, c.prototype.removeLastListAttributeAtRange = function(t3, e2) {
              var i2;
              return e2 == null && (e2 = {}), i2 = this.blockList, this.eachBlockAtRange(t3, function(t4, o2, r2) {
                var s3;
                if ((s3 = t4.getLastAttribute()) && n(s3).listAttribute && s3 !== e2.exceptAttributeName)
                  return i2 = i2.editObjectAtIndex(r2, function() {
                    return t4.removeAttribute(s3);
                  });
              }), new this.constructor(i2);
            }, c.prototype.removeLastTerminalAttributeAtRange = function(t3) {
              var e2;
              return e2 = this.blockList, this.eachBlockAtRange(t3, function(t4, i2, o2) {
                var r2;
                if ((r2 = t4.getLastAttribute()) && n(r2).terminal)
                  return e2 = e2.editObjectAtIndex(o2, function() {
                    return t4.removeAttribute(r2);
                  });
              }), new this.constructor(e2);
            }, c.prototype.removeBlockAttributesAtRange = function(t3) {
              var e2;
              return e2 = this.blockList, this.eachBlockAtRange(t3, function(t4, n2, i2) {
                return t4.hasAttributes() ? e2 = e2.editObjectAtIndex(i2, function() {
                  return t4.copyWithoutAttributes();
                }) : void 0;
              }), new this.constructor(e2);
            }, c.prototype.expandRangeToLineBreaksAndSplitBlocks = function(t3) {
              var e2, n2, o2, r2, s3, a2, u2, c2, l2;
              return a2 = t3 = i(t3), l2 = a2[0], r2 = a2[1], c2 = this.locationFromPosition(l2), o2 = this.locationFromPosition(r2), e2 = this, u2 = e2.getBlockAtIndex(c2.index), (c2.offset = u2.findLineBreakInDirectionFromPosition("backward", c2.offset)) != null && (s3 = e2.positionFromLocation(c2), e2 = e2.insertBlockBreakAtRange([s3, s3 + 1]), o2.index += 1, o2.offset -= e2.getBlockAtIndex(c2.index).getLength(), c2.index += 1), c2.offset = 0, o2.offset === 0 && o2.index > c2.index ? (o2.index -= 1, o2.offset = e2.getBlockAtIndex(o2.index).getBlockBreakPosition()) : (n2 = e2.getBlockAtIndex(o2.index), n2.text.getStringAtRange([o2.offset - 1, o2.offset]) === "\n" ? o2.offset -= 1 : o2.offset = n2.findLineBreakInDirectionFromPosition("forward", o2.offset), o2.offset !== n2.getBlockBreakPosition() && (s3 = e2.positionFromLocation(o2), e2 = e2.insertBlockBreakAtRange([s3, s3 + 1]))), l2 = e2.positionFromLocation(c2), r2 = e2.positionFromLocation(o2), t3 = i([l2, r2]), { document: e2, range: t3 };
            }, c.prototype.convertLineBreaksToBlockBreaksInRange = function(t3) {
              var e2, n2, o2;
              return n2 = (t3 = i(t3))[0], o2 = this.getStringAtRange(t3).slice(0, -1), e2 = this, o2.replace(/.*?\n/g, function(t4) {
                return n2 += t4.length, e2 = e2.insertBlockBreakAtRange([n2 - 1, n2]);
              }), { document: e2, range: t3 };
            }, c.prototype.consolidateBlocksAtRange = function(t3) {
              var e2, n2, o2, r2, s3;
              return o2 = t3 = i(t3), s3 = o2[0], n2 = o2[1], r2 = this.locationFromPosition(s3).index, e2 = this.locationFromPosition(n2).index, new this.constructor(this.blockList.consolidateFromIndexToIndex(r2, e2));
            }, c.prototype.getDocumentAtRange = function(t3) {
              var e2;
              return t3 = i(t3), e2 = this.blockList.getSplittableListInRange(t3).toArray(), new this.constructor(e2);
            }, c.prototype.getStringAtRange = function(t3) {
              var e2, n2, o2;
              return o2 = t3 = i(t3), n2 = o2[o2.length - 1], n2 !== this.getLength() && (e2 = -1), this.getDocumentAtRange(t3).toString().slice(0, e2);
            }, c.prototype.getBlockAtIndex = function(t3) {
              return this.blockList.getObjectAtIndex(t3);
            }, c.prototype.getBlockAtPosition = function(t3) {
              var e2;
              return e2 = this.locationFromPosition(t3).index, this.getBlockAtIndex(e2);
            }, c.prototype.getTextAtIndex = function(t3) {
              var e2;
              return (e2 = this.getBlockAtIndex(t3)) != null ? e2.text : void 0;
            }, c.prototype.getTextAtPosition = function(t3) {
              var e2;
              return e2 = this.locationFromPosition(t3).index, this.getTextAtIndex(e2);
            }, c.prototype.getPieceAtPosition = function(t3) {
              var e2, n2, i2;
              return i2 = this.locationFromPosition(t3), e2 = i2.index, n2 = i2.offset, this.getTextAtIndex(e2).getPieceAtPosition(n2);
            }, c.prototype.getCharacterAtPosition = function(t3) {
              var e2, n2, i2;
              return i2 = this.locationFromPosition(t3), e2 = i2.index, n2 = i2.offset, this.getTextAtIndex(e2).getStringAtRange([n2, n2 + 1]);
            }, c.prototype.getLength = function() {
              return this.blockList.getEndPosition();
            }, c.prototype.getBlocks = function() {
              return this.blockList.toArray();
            }, c.prototype.getBlockCount = function() {
              return this.blockList.length;
            }, c.prototype.getEditCount = function() {
              return this.editCount;
            }, c.prototype.eachBlock = function(t3) {
              return this.blockList.eachObject(t3);
            }, c.prototype.eachBlockAtRange = function(t3, e2) {
              var n2, o2, r2, s3, a2, u2, c2, l2, h, p, d, f;
              if (u2 = t3 = i(t3), d = u2[0], r2 = u2[1], p = this.locationFromPosition(d), o2 = this.locationFromPosition(r2), p.index === o2.index)
                return n2 = this.getBlockAtIndex(p.index), f = [p.offset, o2.offset], e2(n2, f, p.index);
              for (h = [], a2 = s3 = c2 = p.index, l2 = o2.index; l2 >= c2 ? l2 >= s3 : s3 >= l2; a2 = l2 >= c2 ? ++s3 : --s3)
                (n2 = this.getBlockAtIndex(a2)) ? (f = function() {
                  switch (a2) {
                    case p.index:
                      return [p.offset, n2.text.getLength()];
                    case o2.index:
                      return [0, o2.offset];
                    default:
                      return [0, n2.text.getLength()];
                  }
                }(), h.push(e2(n2, f, a2))) : h.push(void 0);
              return h;
            }, c.prototype.getCommonAttributesAtRange = function(t3) {
              var n2, r2, s3;
              return r2 = (t3 = i(t3))[0], o(t3) ? this.getCommonAttributesAtPosition(r2) : (s3 = [], n2 = [], this.eachBlockAtRange(t3, function(t4, e2) {
                return e2[0] !== e2[1] ? (s3.push(t4.text.getCommonAttributesAtRange(e2)), n2.push(l(t4))) : void 0;
              }), e.Hash.fromCommonAttributesOfObjects(s3).merge(e.Hash.fromCommonAttributesOfObjects(n2)).toObject());
            }, c.prototype.getCommonAttributesAtPosition = function(t3) {
              var n2, i2, o2, r2, s3, a2, c2, h, p, d;
              if (p = this.locationFromPosition(t3), s3 = p.index, h = p.offset, o2 = this.getBlockAtIndex(s3), !o2)
                return {};
              r2 = l(o2), n2 = o2.text.getAttributesAtPosition(h), i2 = o2.text.getAttributesAtPosition(h - 1), a2 = function() {
                var t4, n3;
                t4 = e.config.textAttributes, n3 = [];
                for (c2 in t4)
                  d = t4[c2], d.inheritable && n3.push(c2);
                return n3;
              }();
              for (c2 in i2)
                d = i2[c2], (d === n2[c2] || u.call(a2, c2) >= 0) && (r2[c2] = d);
              return r2;
            }, c.prototype.getRangeOfCommonAttributeAtPosition = function(t3, e2) {
              var n2, o2, r2, s3, a2, u2, c2, l2, h;
              return a2 = this.locationFromPosition(e2), r2 = a2.index, s3 = a2.offset, h = this.getTextAtIndex(r2), u2 = h.getExpandedRangeForAttributeAtOffset(t3, s3), l2 = u2[0], o2 = u2[1], c2 = this.positionFromLocation({ index: r2, offset: l2 }), n2 = this.positionFromLocation({ index: r2, offset: o2 }), i([c2, n2]);
            }, c.prototype.getBaseBlockAttributes = function() {
              var t3, e2, n2, i2, o2, r2, s3;
              for (t3 = this.getBlockAtIndex(0).getAttributes(), n2 = i2 = 1, s3 = this.getBlockCount(); s3 >= 1 ? s3 > i2 : i2 > s3; n2 = s3 >= 1 ? ++i2 : --i2)
                e2 = this.getBlockAtIndex(n2).getAttributes(), r2 = Math.min(t3.length, e2.length), t3 = function() {
                  var n3, i3, s4;
                  for (s4 = [], o2 = n3 = 0, i3 = r2; (i3 >= 0 ? i3 > n3 : n3 > i3) && e2[o2] === t3[o2]; o2 = i3 >= 0 ? ++n3 : --n3)
                    s4.push(e2[o2]);
                  return s4;
                }();
              return t3;
            }, l = function(t3) {
              var e2, n2;
              return n2 = {}, (e2 = t3.getLastAttribute()) && (n2[e2] = true), n2;
            }, c.prototype.getAttachmentById = function(t3) {
              var e2, n2, i2, o2;
              for (o2 = this.getAttachments(), n2 = 0, i2 = o2.length; i2 > n2; n2++)
                if (e2 = o2[n2], e2.id === t3)
                  return e2;
            }, c.prototype.getAttachmentPieces = function() {
              var t3;
              return t3 = [], this.blockList.eachObject(function(e2) {
                var n2;
                return n2 = e2.text, t3 = t3.concat(n2.getAttachmentPieces());
              }), t3;
            }, c.prototype.getAttachments = function() {
              var t3, e2, n2, i2, o2;
              for (i2 = this.getAttachmentPieces(), o2 = [], t3 = 0, e2 = i2.length; e2 > t3; t3++)
                n2 = i2[t3], o2.push(n2.attachment);
              return o2;
            }, c.prototype.getRangeOfAttachment = function(t3) {
              var e2, n2, o2, r2, s3, a2, u2;
              for (r2 = 0, s3 = this.blockList.toArray(), n2 = e2 = 0, o2 = s3.length; o2 > e2; n2 = ++e2) {
                if (a2 = s3[n2].text, u2 = a2.getRangeOfAttachment(t3))
                  return i([r2 + u2[0], r2 + u2[1]]);
                r2 += a2.getLength();
              }
            }, c.prototype.getLocationRangeOfAttachment = function(t3) {
              var e2;
              return e2 = this.getRangeOfAttachment(t3), this.locationRangeFromRange(e2);
            }, c.prototype.getAttachmentPieceForAttachment = function(t3) {
              var e2, n2, i2, o2;
              for (o2 = this.getAttachmentPieces(), e2 = 0, n2 = o2.length; n2 > e2; e2++)
                if (i2 = o2[e2], i2.attachment === t3)
                  return i2;
            }, c.prototype.findRangesForBlockAttribute = function(t3) {
              var e2, n2, i2, o2, r2, s3, a2;
              for (r2 = 0, s3 = [], a2 = this.getBlocks(), n2 = 0, i2 = a2.length; i2 > n2; n2++)
                e2 = a2[n2], o2 = e2.getLength(), e2.hasAttribute(t3) && s3.push([r2, r2 + o2]), r2 += o2;
              return s3;
            }, c.prototype.findRangesForTextAttribute = function(t3, e2) {
              var n2, i2, o2, r2, s3, a2, u2, c2, l2, h;
              for (h = (e2 != null ? e2 : {}).withValue, a2 = 0, u2 = [], c2 = [], r2 = function(e3) {
                return h != null ? e3.getAttribute(t3) === h : e3.hasAttribute(t3);
              }, l2 = this.getPieces(), n2 = 0, i2 = l2.length; i2 > n2; n2++)
                s3 = l2[n2], o2 = s3.getLength(), r2(s3) && (u2[1] === a2 ? u2[1] = a2 + o2 : c2.push(u2 = [a2, a2 + o2])), a2 += o2;
              return c2;
            }, c.prototype.locationFromPosition = function(t3) {
              var e2, n2;
              return n2 = this.blockList.findIndexAndOffsetAtPosition(Math.max(0, t3)), n2.index != null ? n2 : (e2 = this.getBlocks(), { index: e2.length - 1, offset: e2[e2.length - 1].getLength() });
            }, c.prototype.positionFromLocation = function(t3) {
              return this.blockList.findPositionAtIndexAndOffset(t3.index, t3.offset);
            }, c.prototype.locationRangeFromPosition = function(t3) {
              return i(this.locationFromPosition(t3));
            }, c.prototype.locationRangeFromRange = function(t3) {
              var e2, n2, o2, r2;
              if (t3 = i(t3))
                return r2 = t3[0], n2 = t3[1], o2 = this.locationFromPosition(r2), e2 = this.locationFromPosition(n2), i([o2, e2]);
            }, c.prototype.rangeFromLocationRange = function(t3) {
              var e2, n2;
              return t3 = i(t3), e2 = this.positionFromLocation(t3[0]), o(t3) || (n2 = this.positionFromLocation(t3[1])), i([e2, n2]);
            }, c.prototype.isEqualTo = function(t3) {
              return this.blockList.isEqualTo(t3 != null ? t3.blockList : void 0);
            }, c.prototype.getTexts = function() {
              var t3, e2, n2, i2, o2;
              for (i2 = this.getBlocks(), o2 = [], e2 = 0, n2 = i2.length; n2 > e2; e2++)
                t3 = i2[e2], o2.push(t3.text);
              return o2;
            }, c.prototype.getPieces = function() {
              var t3, e2, n2, i2, o2;
              for (n2 = [], i2 = this.getTexts(), t3 = 0, e2 = i2.length; e2 > t3; t3++)
                o2 = i2[t3], n2.push.apply(n2, o2.getPieces());
              return n2;
            }, c.prototype.getObjects = function() {
              return this.getBlocks().concat(this.getTexts()).concat(this.getPieces());
            }, c.prototype.toSerializableDocument = function() {
              var t3;
              return t3 = [], this.blockList.eachObject(function(e2) {
                return t3.push(e2.copyWithText(e2.text.toSerializableText()));
              }), new this.constructor(t3);
            }, c.prototype.toString = function() {
              return this.blockList.toString();
            }, c.prototype.toJSON = function() {
              return this.blockList.toJSON();
            }, c.prototype.toConsole = function() {
              var t3;
              return JSON.stringify(function() {
                var e2, n2, i2, o2;
                for (i2 = this.blockList.toArray(), o2 = [], e2 = 0, n2 = i2.length; n2 > e2; e2++)
                  t3 = i2[e2], o2.push(JSON.parse(t3.text.toConsole()));
                return o2;
              }.call(this));
            }, c;
          }(e.Object);
        }.call(this), function() {
          e.LineBreakInsertion = function() {
            function t2(t3) {
              var e2;
              this.composition = t3, this.document = this.composition.document, e2 = this.composition.getSelectedRange(), this.startPosition = e2[0], this.endPosition = e2[1], this.startLocation = this.document.locationFromPosition(this.startPosition), this.endLocation = this.document.locationFromPosition(this.endPosition), this.block = this.document.getBlockAtIndex(this.endLocation.index), this.breaksOnReturn = this.block.breaksOnReturn(), this.previousCharacter = this.block.text.getStringAtPosition(this.endLocation.offset - 1), this.nextCharacter = this.block.text.getStringAtPosition(this.endLocation.offset);
            }
            return t2.prototype.shouldInsertBlockBreak = function() {
              return this.block.hasAttributes() && this.block.isListItem() && !this.block.isEmpty() ? this.startLocation.offset !== 0 : this.breaksOnReturn && this.nextCharacter !== "\n";
            }, t2.prototype.shouldBreakFormattedBlock = function() {
              return this.block.hasAttributes() && !this.block.isListItem() && (this.breaksOnReturn && this.nextCharacter === "\n" || this.previousCharacter === "\n");
            }, t2.prototype.shouldDecreaseListLevel = function() {
              return this.block.hasAttributes() && this.block.isListItem() && this.block.isEmpty();
            }, t2.prototype.shouldPrependListItem = function() {
              return this.block.isListItem() && this.startLocation.offset === 0 && !this.block.isEmpty();
            }, t2.prototype.shouldRemoveLastBlockAttribute = function() {
              return this.block.hasAttributes() && !this.block.isListItem() && this.block.isEmpty();
            }, t2;
          }();
        }.call(this), function() {
          var t2, n, i, o, r, s, a, u, c, l, h = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              p.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, p = {}.hasOwnProperty;
          s = e.normalizeRange, c = e.rangesAreEqual, u = e.rangeIsCollapsed, a = e.objectsAreEqual, t2 = e.arrayStartsWith, l = e.summarizeArrayChange, i = e.getAllAttributeNames, o = e.getBlockConfig, r = e.getTextConfig, n = e.extend, e.Composition = function(p2) {
            function d() {
              this.document = new e.Document(), this.attachments = [], this.currentAttributes = {}, this.revision = 0;
            }
            var f;
            return h(d, p2), d.prototype.setDocument = function(t3) {
              var e2;
              return t3.isEqualTo(this.document) ? void 0 : (this.document = t3, this.refreshAttachments(), this.revision++, (e2 = this.delegate) != null && typeof e2.compositionDidChangeDocument == "function" ? e2.compositionDidChangeDocument(t3) : void 0);
            }, d.prototype.getSnapshot = function() {
              return { document: this.document, selectedRange: this.getSelectedRange() };
            }, d.prototype.loadSnapshot = function(t3) {
              var n2, i2, o2, r2;
              return n2 = t3.document, r2 = t3.selectedRange, (i2 = this.delegate) != null && typeof i2.compositionWillLoadSnapshot == "function" && i2.compositionWillLoadSnapshot(), this.setDocument(n2 != null ? n2 : new e.Document()), this.setSelection(r2 != null ? r2 : [0, 0]), (o2 = this.delegate) != null && typeof o2.compositionDidLoadSnapshot == "function" ? o2.compositionDidLoadSnapshot() : void 0;
            }, d.prototype.insertText = function(t3, e2) {
              var n2, i2, o2, r2;
              return r2 = (e2 != null ? e2 : { updatePosition: true }).updatePosition, i2 = this.getSelectedRange(), this.setDocument(this.document.insertTextAtRange(t3, i2)), o2 = i2[0], n2 = o2 + t3.getLength(), r2 && this.setSelection(n2), this.notifyDelegateOfInsertionAtRange([o2, n2]);
            }, d.prototype.insertBlock = function(t3) {
              var n2;
              return t3 == null && (t3 = new e.Block()), n2 = new e.Document([t3]), this.insertDocument(n2);
            }, d.prototype.insertDocument = function(t3) {
              var n2, i2, o2;
              return t3 == null && (t3 = new e.Document()), i2 = this.getSelectedRange(), this.setDocument(this.document.insertDocumentAtRange(t3, i2)), o2 = i2[0], n2 = o2 + t3.getLength(), this.setSelection(n2), this.notifyDelegateOfInsertionAtRange([o2, n2]);
            }, d.prototype.insertString = function(t3, n2) {
              var i2, o2;
              return i2 = this.getCurrentTextAttributes(), o2 = e.Text.textForStringWithAttributes(t3, i2), this.insertText(o2, n2);
            }, d.prototype.insertBlockBreak = function() {
              var t3, e2, n2;
              return e2 = this.getSelectedRange(), this.setDocument(this.document.insertBlockBreakAtRange(e2)), n2 = e2[0], t3 = n2 + 1, this.setSelection(t3), this.notifyDelegateOfInsertionAtRange([n2, t3]);
            }, d.prototype.insertLineBreak = function() {
              var t3, n2;
              return n2 = new e.LineBreakInsertion(this), n2.shouldDecreaseListLevel() ? (this.decreaseListLevel(), this.setSelection(n2.startPosition)) : n2.shouldPrependListItem() ? (t3 = new e.Document([n2.block.copyWithoutText()]), this.insertDocument(t3)) : n2.shouldInsertBlockBreak() ? this.insertBlockBreak() : n2.shouldRemoveLastBlockAttribute() ? this.removeLastBlockAttribute() : n2.shouldBreakFormattedBlock() ? this.breakFormattedBlock(n2) : this.insertString("\n");
            }, d.prototype.insertHTML = function(t3) {
              var n2, i2, o2, r2;
              return n2 = e.Document.fromHTML(t3), o2 = this.getSelectedRange(), this.setDocument(this.document.mergeDocumentAtRange(n2, o2)), r2 = o2[0], i2 = r2 + n2.getLength() - 1, this.setSelection(i2), this.notifyDelegateOfInsertionAtRange([r2, i2]);
            }, d.prototype.replaceHTML = function(t3) {
              var n2, i2, o2;
              return n2 = e.Document.fromHTML(t3).copyUsingObjectsFromDocument(this.document), i2 = this.getLocationRange({ strict: false }), o2 = this.document.rangeFromLocationRange(i2), this.setDocument(n2), this.setSelection(o2);
            }, d.prototype.insertFile = function(t3) {
              return this.insertFiles([t3]);
            }, d.prototype.insertFiles = function(t3) {
              var n2, i2, o2, r2, s2, a2;
              for (i2 = [], r2 = 0, s2 = t3.length; s2 > r2; r2++)
                o2 = t3[r2], ((a2 = this.delegate) != null ? a2.compositionShouldAcceptFile(o2) : void 0) && (n2 = e.Attachment.attachmentForFile(o2), i2.push(n2));
              return this.insertAttachments(i2);
            }, d.prototype.insertAttachment = function(t3) {
              return this.insertAttachments([t3]);
            }, d.prototype.insertAttachments = function(t3) {
              var n2, i2, o2, r2, s2, a2, u2, c2, l2;
              for (c2 = new e.Text(), r2 = 0, s2 = t3.length; s2 > r2; r2++)
                n2 = t3[r2], l2 = n2.getType(), a2 = (u2 = e.config.attachments[l2]) != null ? u2.presentation : void 0, o2 = this.getCurrentTextAttributes(), a2 && (o2.presentation = a2), i2 = e.Text.textForAttachmentWithAttributes(n2, o2), c2 = c2.appendText(i2);
              return this.insertText(c2);
            }, d.prototype.shouldManageDeletingInDirection = function(t3) {
              var e2;
              if (e2 = this.getLocationRange(), u(e2)) {
                if (t3 === "backward" && e2[0].offset === 0)
                  return true;
                if (this.shouldManageMovingCursorInDirection(t3))
                  return true;
              } else if (e2[0].index !== e2[1].index)
                return true;
              return false;
            }, d.prototype.deleteInDirection = function(t3, e2) {
              var n2, i2, o2, r2, s2, a2, c2, l2;
              return r2 = (e2 != null ? e2 : {}).length, s2 = this.getLocationRange(), a2 = this.getSelectedRange(), c2 = u(a2), c2 ? o2 = t3 === "backward" && s2[0].offset === 0 : l2 = s2[0].index !== s2[1].index, o2 && this.canDecreaseBlockAttributeLevel() && (i2 = this.getBlock(), i2.isListItem() ? this.decreaseListLevel() : this.decreaseBlockAttributeLevel(), this.setSelection(a2[0]), i2.isEmpty()) ? false : (c2 && (a2 = this.getExpandedRangeInDirection(t3, { length: r2 }), t3 === "backward" && (n2 = this.getAttachmentAtRange(a2))), n2 ? (this.editAttachment(n2), false) : (this.setDocument(this.document.removeTextAtRange(a2)), this.setSelection(a2[0]), o2 || l2 ? false : void 0));
            }, d.prototype.moveTextFromRange = function(t3) {
              var e2;
              return e2 = this.getSelectedRange()[0], this.setDocument(this.document.moveTextFromRangeToPosition(t3, e2)), this.setSelection(e2);
            }, d.prototype.removeAttachment = function(t3) {
              var e2;
              return (e2 = this.document.getRangeOfAttachment(t3)) ? (this.stopEditingAttachment(), this.setDocument(this.document.removeTextAtRange(e2)), this.setSelection(e2[0])) : void 0;
            }, d.prototype.removeLastBlockAttribute = function() {
              var t3, e2, n2, i2;
              return n2 = this.getSelectedRange(), i2 = n2[0], e2 = n2[1], t3 = this.document.getBlockAtPosition(e2), this.removeCurrentAttribute(t3.getLastAttribute()), this.setSelection(i2);
            }, f = " ", d.prototype.insertPlaceholder = function() {
              return this.placeholderPosition = this.getPosition(), this.insertString(f);
            }, d.prototype.selectPlaceholder = function() {
              return this.placeholderPosition != null ? (this.setSelectedRange([this.placeholderPosition, this.placeholderPosition + f.length]), this.getSelectedRange()) : void 0;
            }, d.prototype.forgetPlaceholder = function() {
              return this.placeholderPosition = null;
            }, d.prototype.hasCurrentAttribute = function(t3) {
              var e2;
              return e2 = this.currentAttributes[t3], e2 != null && e2 !== false;
            }, d.prototype.toggleCurrentAttribute = function(t3) {
              var e2;
              return (e2 = !this.currentAttributes[t3]) ? this.setCurrentAttribute(t3, e2) : this.removeCurrentAttribute(t3);
            }, d.prototype.canSetCurrentAttribute = function(t3) {
              return o(t3) ? this.canSetCurrentBlockAttribute(t3) : this.canSetCurrentTextAttribute(t3);
            }, d.prototype.canSetCurrentTextAttribute = function() {
              var t3, e2, n2, i2, o2;
              if (e2 = this.getSelectedDocument()) {
                for (o2 = e2.getAttachments(), n2 = 0, i2 = o2.length; i2 > n2; n2++)
                  if (t3 = o2[n2], !t3.hasContent())
                    return false;
                return true;
              }
            }, d.prototype.canSetCurrentBlockAttribute = function() {
              var t3;
              if (t3 = this.getBlock())
                return !t3.isTerminalBlock();
            }, d.prototype.setCurrentAttribute = function(t3, e2) {
              return o(t3) ? this.setBlockAttribute(t3, e2) : (this.setTextAttribute(t3, e2), this.currentAttributes[t3] = e2, this.notifyDelegateOfCurrentAttributesChange());
            }, d.prototype.setTextAttribute = function(t3, n2) {
              var i2, o2, r2, s2;
              if (o2 = this.getSelectedRange())
                return r2 = o2[0], i2 = o2[1], r2 !== i2 ? this.setDocument(this.document.addAttributeAtRange(t3, n2, o2)) : t3 === "href" ? (s2 = e.Text.textForStringWithAttributes(n2, { href: n2 }), this.insertText(s2)) : void 0;
            }, d.prototype.setBlockAttribute = function(t3, e2) {
              var n2, i2;
              if (i2 = this.getSelectedRange())
                return this.canSetCurrentAttribute(t3) ? (n2 = this.getBlock(), this.setDocument(this.document.applyBlockAttributeAtRange(t3, e2, i2)), this.setSelection(i2)) : void 0;
            }, d.prototype.removeCurrentAttribute = function(t3) {
              return o(t3) ? (this.removeBlockAttribute(t3), this.updateCurrentAttributes()) : (this.removeTextAttribute(t3), delete this.currentAttributes[t3], this.notifyDelegateOfCurrentAttributesChange());
            }, d.prototype.removeTextAttribute = function(t3) {
              var e2;
              if (e2 = this.getSelectedRange())
                return this.setDocument(this.document.removeAttributeAtRange(t3, e2));
            }, d.prototype.removeBlockAttribute = function(t3) {
              var e2;
              if (e2 = this.getSelectedRange())
                return this.setDocument(this.document.removeAttributeAtRange(t3, e2));
            }, d.prototype.canDecreaseNestingLevel = function() {
              var t3;
              return ((t3 = this.getBlock()) != null ? t3.getNestingLevel() : void 0) > 0;
            }, d.prototype.canIncreaseNestingLevel = function() {
              var e2, n2, i2;
              if (e2 = this.getBlock())
                return ((i2 = o(e2.getLastNestableAttribute())) != null ? i2.listAttribute : 0) ? (n2 = this.getPreviousBlock()) ? t2(n2.getListItemAttributes(), e2.getListItemAttributes()) : void 0 : e2.getNestingLevel() > 0;
            }, d.prototype.decreaseNestingLevel = function() {
              var t3;
              if (t3 = this.getBlock())
                return this.setDocument(this.document.replaceBlock(t3, t3.decreaseNestingLevel()));
            }, d.prototype.increaseNestingLevel = function() {
              var t3;
              if (t3 = this.getBlock())
                return this.setDocument(this.document.replaceBlock(t3, t3.increaseNestingLevel()));
            }, d.prototype.canDecreaseBlockAttributeLevel = function() {
              var t3;
              return ((t3 = this.getBlock()) != null ? t3.getAttributeLevel() : void 0) > 0;
            }, d.prototype.decreaseBlockAttributeLevel = function() {
              var t3, e2;
              return (t3 = (e2 = this.getBlock()) != null ? e2.getLastAttribute() : void 0) ? this.removeCurrentAttribute(t3) : void 0;
            }, d.prototype.decreaseListLevel = function() {
              var t3, e2, n2, i2, o2, r2;
              for (r2 = this.getSelectedRange()[0], o2 = this.document.locationFromPosition(r2).index, n2 = o2, t3 = this.getBlock().getAttributeLevel(); (e2 = this.document.getBlockAtIndex(n2 + 1)) && e2.isListItem() && e2.getAttributeLevel() > t3; )
                n2++;
              return r2 = this.document.positionFromLocation({ index: o2, offset: 0 }), i2 = this.document.positionFromLocation({ index: n2, offset: 0 }), this.setDocument(this.document.removeLastListAttributeAtRange([r2, i2]));
            }, d.prototype.updateCurrentAttributes = function() {
              var t3, e2, n2, o2, r2, s2;
              if (s2 = this.getSelectedRange({ ignoreLock: true })) {
                for (e2 = this.document.getCommonAttributesAtRange(s2), r2 = i(), n2 = 0, o2 = r2.length; o2 > n2; n2++)
                  t3 = r2[n2], e2[t3] || this.canSetCurrentAttribute(t3) || (e2[t3] = false);
                if (!a(e2, this.currentAttributes))
                  return this.currentAttributes = e2, this.notifyDelegateOfCurrentAttributesChange();
              }
            }, d.prototype.getCurrentAttributes = function() {
              return n.call({}, this.currentAttributes);
            }, d.prototype.getCurrentTextAttributes = function() {
              var t3, e2, n2, i2;
              t3 = {}, n2 = this.currentAttributes;
              for (e2 in n2)
                i2 = n2[e2], i2 !== false && r(e2) && (t3[e2] = i2);
              return t3;
            }, d.prototype.freezeSelection = function() {
              return this.setCurrentAttribute("frozen", true);
            }, d.prototype.thawSelection = function() {
              return this.removeCurrentAttribute("frozen");
            }, d.prototype.hasFrozenSelection = function() {
              return this.hasCurrentAttribute("frozen");
            }, d.proxyMethod("getSelectionManager().getPointRange"), d.proxyMethod("getSelectionManager().setLocationRangeFromPointRange"), d.proxyMethod("getSelectionManager().createLocationRangeFromDOMRange"), d.proxyMethod("getSelectionManager().locationIsCursorTarget"), d.proxyMethod("getSelectionManager().selectionIsExpanded"), d.proxyMethod("delegate?.getSelectionManager"), d.prototype.setSelection = function(t3) {
              var e2, n2;
              return e2 = this.document.locationRangeFromRange(t3), (n2 = this.delegate) != null ? n2.compositionDidRequestChangingSelectionToLocationRange(e2) : void 0;
            }, d.prototype.getSelectedRange = function() {
              var t3;
              return (t3 = this.getLocationRange()) ? this.document.rangeFromLocationRange(t3) : void 0;
            }, d.prototype.setSelectedRange = function(t3) {
              var e2;
              return e2 = this.document.locationRangeFromRange(t3), this.getSelectionManager().setLocationRange(e2);
            }, d.prototype.getPosition = function() {
              var t3;
              return (t3 = this.getLocationRange()) ? this.document.positionFromLocation(t3[0]) : void 0;
            }, d.prototype.getLocationRange = function(t3) {
              var e2, n2;
              return (e2 = (n2 = this.targetLocationRange) != null ? n2 : this.getSelectionManager().getLocationRange(t3)) != null ? e2 : s({ index: 0, offset: 0 });
            }, d.prototype.withTargetLocationRange = function(t3, e2) {
              var n2;
              this.targetLocationRange = t3;
              try {
                n2 = e2();
              } finally {
                this.targetLocationRange = null;
              }
              return n2;
            }, d.prototype.withTargetRange = function(t3, e2) {
              var n2;
              return n2 = this.document.locationRangeFromRange(t3), this.withTargetLocationRange(n2, e2);
            }, d.prototype.withTargetDOMRange = function(t3, e2) {
              var n2;
              return n2 = this.createLocationRangeFromDOMRange(t3, { strict: false }), this.withTargetLocationRange(n2, e2);
            }, d.prototype.getExpandedRangeInDirection = function(t3, e2) {
              var n2, i2, o2, r2;
              return i2 = (e2 != null ? e2 : {}).length, o2 = this.getSelectedRange(), r2 = o2[0], n2 = o2[1], t3 === "backward" ? i2 ? r2 -= i2 : r2 = this.translateUTF16PositionFromOffset(r2, -1) : i2 ? n2 += i2 : n2 = this.translateUTF16PositionFromOffset(n2, 1), s([r2, n2]);
            }, d.prototype.shouldManageMovingCursorInDirection = function(t3) {
              var e2;
              return this.editingAttachment ? true : (e2 = this.getExpandedRangeInDirection(t3), this.getAttachmentAtRange(e2) != null);
            }, d.prototype.moveCursorInDirection = function(t3) {
              var e2, n2, i2, o2;
              return this.editingAttachment ? i2 = this.document.getRangeOfAttachment(this.editingAttachment) : (o2 = this.getSelectedRange(), i2 = this.getExpandedRangeInDirection(t3), n2 = !c(o2, i2)), this.setSelectedRange(t3 === "backward" ? i2[0] : i2[1]), n2 && (e2 = this.getAttachmentAtRange(i2)) ? this.editAttachment(e2) : void 0;
            }, d.prototype.expandSelectionInDirection = function(t3, e2) {
              var n2, i2;
              return n2 = (e2 != null ? e2 : {}).length, i2 = this.getExpandedRangeInDirection(t3, { length: n2 }), this.setSelectedRange(i2);
            }, d.prototype.expandSelectionForEditing = function() {
              return this.hasCurrentAttribute("href") ? this.expandSelectionAroundCommonAttribute("href") : void 0;
            }, d.prototype.expandSelectionAroundCommonAttribute = function(t3) {
              var e2, n2;
              return e2 = this.getPosition(), n2 = this.document.getRangeOfCommonAttributeAtPosition(t3, e2), this.setSelectedRange(n2);
            }, d.prototype.selectionContainsAttachments = function() {
              var t3;
              return ((t3 = this.getSelectedAttachments()) != null ? t3.length : void 0) > 0;
            }, d.prototype.selectionIsInCursorTarget = function() {
              return this.editingAttachment || this.positionIsCursorTarget(this.getPosition());
            }, d.prototype.positionIsCursorTarget = function(t3) {
              var e2;
              return (e2 = this.document.locationFromPosition(t3)) ? this.locationIsCursorTarget(e2) : void 0;
            }, d.prototype.positionIsBlockBreak = function(t3) {
              var e2;
              return (e2 = this.document.getPieceAtPosition(t3)) != null ? e2.isBlockBreak() : void 0;
            }, d.prototype.getSelectedDocument = function() {
              var t3;
              return (t3 = this.getSelectedRange()) ? this.document.getDocumentAtRange(t3) : void 0;
            }, d.prototype.getSelectedAttachments = function() {
              var t3;
              return (t3 = this.getSelectedDocument()) != null ? t3.getAttachments() : void 0;
            }, d.prototype.getAttachments = function() {
              return this.attachments.slice(0);
            }, d.prototype.refreshAttachments = function() {
              var t3, e2, n2, i2, o2, r2, s2, a2, u2, c2, h2, p3;
              for (n2 = this.document.getAttachments(), a2 = l(this.attachments, n2), t3 = a2.added, h2 = a2.removed, this.attachments = n2, i2 = 0, r2 = h2.length; r2 > i2; i2++)
                e2 = h2[i2], e2.delegate = null, (u2 = this.delegate) != null && typeof u2.compositionDidRemoveAttachment == "function" && u2.compositionDidRemoveAttachment(e2);
              for (p3 = [], o2 = 0, s2 = t3.length; s2 > o2; o2++)
                e2 = t3[o2], e2.delegate = this, p3.push((c2 = this.delegate) != null && typeof c2.compositionDidAddAttachment == "function" ? c2.compositionDidAddAttachment(e2) : void 0);
              return p3;
            }, d.prototype.attachmentDidChangeAttributes = function(t3) {
              var e2;
              return this.revision++, (e2 = this.delegate) != null && typeof e2.compositionDidEditAttachment == "function" ? e2.compositionDidEditAttachment(t3) : void 0;
            }, d.prototype.attachmentDidChangePreviewURL = function(t3) {
              var e2;
              return this.revision++, (e2 = this.delegate) != null && typeof e2.compositionDidChangeAttachmentPreviewURL == "function" ? e2.compositionDidChangeAttachmentPreviewURL(t3) : void 0;
            }, d.prototype.editAttachment = function(t3, e2) {
              var n2;
              if (t3 !== this.editingAttachment)
                return this.stopEditingAttachment(), this.editingAttachment = t3, (n2 = this.delegate) != null && typeof n2.compositionDidStartEditingAttachment == "function" ? n2.compositionDidStartEditingAttachment(this.editingAttachment, e2) : void 0;
            }, d.prototype.stopEditingAttachment = function() {
              var t3;
              if (this.editingAttachment)
                return (t3 = this.delegate) != null && typeof t3.compositionDidStopEditingAttachment == "function" && t3.compositionDidStopEditingAttachment(this.editingAttachment), this.editingAttachment = null;
            }, d.prototype.updateAttributesForAttachment = function(t3, e2) {
              return this.setDocument(this.document.updateAttributesForAttachment(t3, e2));
            }, d.prototype.removeAttributeForAttachment = function(t3, e2) {
              return this.setDocument(this.document.removeAttributeForAttachment(t3, e2));
            }, d.prototype.breakFormattedBlock = function(t3) {
              var n2, i2, o2, r2, s2;
              return i2 = t3.document, n2 = t3.block, r2 = t3.startPosition, s2 = [r2 - 1, r2], n2.getBlockBreakPosition() === t3.startLocation.offset ? (n2.breaksOnReturn() && t3.nextCharacter === "\n" ? r2 += 1 : i2 = i2.removeTextAtRange(s2), s2 = [r2, r2]) : t3.nextCharacter === "\n" ? t3.previousCharacter === "\n" ? s2 = [r2 - 1, r2 + 1] : (s2 = [r2, r2 + 1], r2 += 1) : t3.startLocation.offset - 1 !== 0 && (r2 += 1), o2 = new e.Document([n2.removeLastAttribute().copyWithoutText()]), this.setDocument(i2.insertDocumentAtRange(o2, s2)), this.setSelection(r2);
            }, d.prototype.getPreviousBlock = function() {
              var t3, e2;
              return (e2 = this.getLocationRange()) && (t3 = e2[0].index, t3 > 0) ? this.document.getBlockAtIndex(t3 - 1) : void 0;
            }, d.prototype.getBlock = function() {
              var t3;
              return (t3 = this.getLocationRange()) ? this.document.getBlockAtIndex(t3[0].index) : void 0;
            }, d.prototype.getAttachmentAtRange = function(t3) {
              var n2;
              return n2 = this.document.getDocumentAtRange(t3), n2.toString() === e.OBJECT_REPLACEMENT_CHARACTER + "\n" ? n2.getAttachments()[0] : void 0;
            }, d.prototype.notifyDelegateOfCurrentAttributesChange = function() {
              var t3;
              return (t3 = this.delegate) != null && typeof t3.compositionDidChangeCurrentAttributes == "function" ? t3.compositionDidChangeCurrentAttributes(this.currentAttributes) : void 0;
            }, d.prototype.notifyDelegateOfInsertionAtRange = function(t3) {
              var e2;
              return (e2 = this.delegate) != null && typeof e2.compositionDidPerformInsertionAtRange == "function" ? e2.compositionDidPerformInsertionAtRange(t3) : void 0;
            }, d.prototype.translateUTF16PositionFromOffset = function(t3, e2) {
              var n2, i2;
              return i2 = this.document.toUTF16String(), n2 = i2.offsetFromUCS2Offset(t3), i2.offsetToUCS2Offset(n2 + e2);
            }, d;
          }(e.BasicObject);
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.UndoManager = function(e2) {
            function n2(t3) {
              this.composition = t3, this.undoEntries = [], this.redoEntries = [];
            }
            var i;
            return t2(n2, e2), n2.prototype.recordUndoEntry = function(t3, e3) {
              var n3, o, r, s, a;
              return s = e3 != null ? e3 : {}, o = s.context, n3 = s.consolidatable, r = this.undoEntries.slice(-1)[0], n3 && i(r, t3, o) ? void 0 : (a = this.createEntry({ description: t3, context: o }), this.undoEntries.push(a), this.redoEntries = []);
            }, n2.prototype.undo = function() {
              var t3, e3;
              return (e3 = this.undoEntries.pop()) ? (t3 = this.createEntry(e3), this.redoEntries.push(t3), this.composition.loadSnapshot(e3.snapshot)) : void 0;
            }, n2.prototype.redo = function() {
              var t3, e3;
              return (t3 = this.redoEntries.pop()) ? (e3 = this.createEntry(t3), this.undoEntries.push(e3), this.composition.loadSnapshot(t3.snapshot)) : void 0;
            }, n2.prototype.canUndo = function() {
              return this.undoEntries.length > 0;
            }, n2.prototype.canRedo = function() {
              return this.redoEntries.length > 0;
            }, n2.prototype.createEntry = function(t3) {
              var e3, n3, i2;
              return i2 = t3 != null ? t3 : {}, n3 = i2.description, e3 = i2.context, { description: n3 != null ? n3.toString() : void 0, context: JSON.stringify(e3), snapshot: this.composition.getSnapshot() };
            }, i = function(t3, e3, n3) {
              return (t3 != null ? t3.description : void 0) === (e3 != null ? e3.toString() : void 0) && (t3 != null ? t3.context : void 0) === JSON.stringify(n3);
            }, n2;
          }(e.BasicObject);
        }.call(this), function() {
          var t2;
          e.attachmentGalleryFilter = function(e2) {
            var n;
            return n = new t2(e2), n.perform(), n.getSnapshot();
          }, t2 = function() {
            function t3(t4) {
              this.document = t4.document, this.selectedRange = t4.selectedRange;
            }
            var e2, n, i;
            return e2 = "attachmentGallery", n = "presentation", i = "gallery", t3.prototype.perform = function() {
              return this.removeBlockAttribute(), this.applyBlockAttribute();
            }, t3.prototype.getSnapshot = function() {
              return { document: this.document, selectedRange: this.selectedRange };
            }, t3.prototype.removeBlockAttribute = function() {
              var t4, n2, i2, o, r;
              for (o = this.findRangesOfBlocks(), r = [], t4 = 0, n2 = o.length; n2 > t4; t4++)
                i2 = o[t4], r.push(this.document = this.document.removeAttributeAtRange(e2, i2));
              return r;
            }, t3.prototype.applyBlockAttribute = function() {
              var t4, n2, i2, o, r, s;
              for (i2 = 0, r = this.findRangesOfPieces(), s = [], t4 = 0, n2 = r.length; n2 > t4; t4++)
                o = r[t4], o[1] - o[0] > 1 && (o[0] += i2, o[1] += i2, this.document.getCharacterAtPosition(o[1]) !== "\n" && (this.document = this.document.insertBlockBreakAtRange(o[1]), o[1] < this.selectedRange[1] && this.moveSelectedRangeForward(), o[1]++, i2++), o[0] !== 0 && this.document.getCharacterAtPosition(o[0] - 1) !== "\n" && (this.document = this.document.insertBlockBreakAtRange(o[0]), o[0] < this.selectedRange[0] && this.moveSelectedRangeForward(), o[0]++, i2++), s.push(this.document = this.document.applyBlockAttributeAtRange(e2, true, o)));
              return s;
            }, t3.prototype.findRangesOfBlocks = function() {
              return this.document.findRangesForBlockAttribute(e2);
            }, t3.prototype.findRangesOfPieces = function() {
              return this.document.findRangesForTextAttribute(n, { withValue: i });
            }, t3.prototype.moveSelectedRangeForward = function() {
              return this.selectedRange[0] += 1, this.selectedRange[1] += 1;
            }, t3;
          }();
        }.call(this), function() {
          var t2 = function(t3, e2) {
            return function() {
              return t3.apply(e2, arguments);
            };
          };
          e.Editor = function() {
            function n(n2, o, r) {
              this.composition = n2, this.selectionManager = o, this.element = r, this.insertFiles = t2(this.insertFiles, this), this.undoManager = new e.UndoManager(this.composition), this.filters = i.slice(0);
            }
            var i;
            return i = [e.attachmentGalleryFilter], n.prototype.loadDocument = function(t3) {
              return this.loadSnapshot({ document: t3, selectedRange: [0, 0] });
            }, n.prototype.loadHTML = function(t3) {
              return t3 == null && (t3 = ""), this.loadDocument(e.Document.fromHTML(t3, { referenceElement: this.element }));
            }, n.prototype.loadJSON = function(t3) {
              var n2, i2;
              return n2 = t3.document, i2 = t3.selectedRange, n2 = e.Document.fromJSON(n2), this.loadSnapshot({ document: n2, selectedRange: i2 });
            }, n.prototype.loadSnapshot = function(t3) {
              return this.undoManager = new e.UndoManager(this.composition), this.composition.loadSnapshot(t3);
            }, n.prototype.getDocument = function() {
              return this.composition.document;
            }, n.prototype.getSelectedDocument = function() {
              return this.composition.getSelectedDocument();
            }, n.prototype.getSnapshot = function() {
              return this.composition.getSnapshot();
            }, n.prototype.toJSON = function() {
              return this.getSnapshot();
            }, n.prototype.deleteInDirection = function(t3) {
              return this.composition.deleteInDirection(t3);
            }, n.prototype.insertAttachment = function(t3) {
              return this.composition.insertAttachment(t3);
            }, n.prototype.insertAttachments = function(t3) {
              return this.composition.insertAttachments(t3);
            }, n.prototype.insertDocument = function(t3) {
              return this.composition.insertDocument(t3);
            }, n.prototype.insertFile = function(t3) {
              return this.composition.insertFile(t3);
            }, n.prototype.insertFiles = function(t3) {
              return this.composition.insertFiles(t3);
            }, n.prototype.insertHTML = function(t3) {
              return this.composition.insertHTML(t3);
            }, n.prototype.insertString = function(t3) {
              return this.composition.insertString(t3);
            }, n.prototype.insertText = function(t3) {
              return this.composition.insertText(t3);
            }, n.prototype.insertLineBreak = function() {
              return this.composition.insertLineBreak();
            }, n.prototype.getSelectedRange = function() {
              return this.composition.getSelectedRange();
            }, n.prototype.getPosition = function() {
              return this.composition.getPosition();
            }, n.prototype.getClientRectAtPosition = function(t3) {
              var e2;
              return e2 = this.getDocument().locationRangeFromRange([t3, t3 + 1]), this.selectionManager.getClientRectAtLocationRange(e2);
            }, n.prototype.expandSelectionInDirection = function(t3) {
              return this.composition.expandSelectionInDirection(t3);
            }, n.prototype.moveCursorInDirection = function(t3) {
              return this.composition.moveCursorInDirection(t3);
            }, n.prototype.setSelectedRange = function(t3) {
              return this.composition.setSelectedRange(t3);
            }, n.prototype.activateAttribute = function(t3, e2) {
              return e2 == null && (e2 = true), this.composition.setCurrentAttribute(t3, e2);
            }, n.prototype.attributeIsActive = function(t3) {
              return this.composition.hasCurrentAttribute(t3);
            }, n.prototype.canActivateAttribute = function(t3) {
              return this.composition.canSetCurrentAttribute(t3);
            }, n.prototype.deactivateAttribute = function(t3) {
              return this.composition.removeCurrentAttribute(t3);
            }, n.prototype.canDecreaseNestingLevel = function() {
              return this.composition.canDecreaseNestingLevel();
            }, n.prototype.canIncreaseNestingLevel = function() {
              return this.composition.canIncreaseNestingLevel();
            }, n.prototype.decreaseNestingLevel = function() {
              return this.canDecreaseNestingLevel() ? this.composition.decreaseNestingLevel() : void 0;
            }, n.prototype.increaseNestingLevel = function() {
              return this.canIncreaseNestingLevel() ? this.composition.increaseNestingLevel() : void 0;
            }, n.prototype.canRedo = function() {
              return this.undoManager.canRedo();
            }, n.prototype.canUndo = function() {
              return this.undoManager.canUndo();
            }, n.prototype.recordUndoEntry = function(t3, e2) {
              var n2, i2, o;
              return o = e2 != null ? e2 : {}, i2 = o.context, n2 = o.consolidatable, this.undoManager.recordUndoEntry(t3, { context: i2, consolidatable: n2 });
            }, n.prototype.redo = function() {
              return this.canRedo() ? this.undoManager.redo() : void 0;
            }, n.prototype.undo = function() {
              return this.canUndo() ? this.undoManager.undo() : void 0;
            }, n;
          }();
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.ManagedAttachment = function(e2) {
            function n2(t3, e3) {
              var n3;
              this.attachmentManager = t3, this.attachment = e3, n3 = this.attachment, this.id = n3.id, this.file = n3.file;
            }
            return t2(n2, e2), n2.prototype.remove = function() {
              return this.attachmentManager.requestRemovalOfAttachment(this.attachment);
            }, n2.proxyMethod("attachment.getAttribute"), n2.proxyMethod("attachment.hasAttribute"), n2.proxyMethod("attachment.setAttribute"), n2.proxyMethod("attachment.getAttributes"), n2.proxyMethod("attachment.setAttributes"), n2.proxyMethod("attachment.isPending"), n2.proxyMethod("attachment.isPreviewable"), n2.proxyMethod("attachment.getURL"), n2.proxyMethod("attachment.getHref"), n2.proxyMethod("attachment.getFilename"), n2.proxyMethod("attachment.getFilesize"), n2.proxyMethod("attachment.getFormattedFilesize"), n2.proxyMethod("attachment.getExtension"), n2.proxyMethod("attachment.getContentType"), n2.proxyMethod("attachment.getFile"), n2.proxyMethod("attachment.setFile"), n2.proxyMethod("attachment.releaseFile"), n2.proxyMethod("attachment.getUploadProgress"), n2.proxyMethod("attachment.setUploadProgress"), n2;
          }(e.BasicObject);
        }.call(this), function() {
          var t2 = function(t3, e2) {
            function i() {
              this.constructor = t3;
            }
            for (var o in e2)
              n.call(e2, o) && (t3[o] = e2[o]);
            return i.prototype = e2.prototype, t3.prototype = new i(), t3.__super__ = e2.prototype, t3;
          }, n = {}.hasOwnProperty;
          e.AttachmentManager = function(n2) {
            function i(t3) {
              var e2, n3, i2;
              for (t3 == null && (t3 = []), this.managedAttachments = {}, n3 = 0, i2 = t3.length; i2 > n3; n3++)
                e2 = t3[n3], this.manageAttachment(e2);
            }
            return t2(i, n2), i.prototype.getAttachments = function() {
              var t3, e2, n3, i2;
              n3 = this.managedAttachments, i2 = [];
              for (e2 in n3)
                t3 = n3[e2], i2.push(t3);
              return i2;
            }, i.prototype.manageAttachment = function(t3) {
              var n3, i2;
              return (n3 = this.managedAttachments)[i2 = t3.id] != null ? n3[i2] : n3[i2] = new e.ManagedAttachment(this, t3);
            }, i.prototype.attachmentIsManaged = function(t3) {
              return t3.id in this.managedAttachments;
            }, i.prototype.requestRemovalOfAttachment = function(t3) {
              var e2;
              return this.attachmentIsManaged(t3) && (e2 = this.delegate) != null && typeof e2.attachmentManagerDidRequestRemovalOfAttachment == "function" ? e2.attachmentManagerDidRequestRemovalOfAttachment(t3) : void 0;
            }, i.prototype.unmanageAttachment = function(t3) {
              var e2;
              return e2 = this.managedAttachments[t3.id], delete this.managedAttachments[t3.id], e2;
            }, i;
          }(e.BasicObject);
        }.call(this), function() {
          var t2, n, i, o, r, s, a, u, c, l, h;
          t2 = e.elementContainsNode, n = e.findChildIndexOfNode, r = e.nodeIsBlockStart, s = e.nodeIsBlockStartComment, o = e.nodeIsBlockContainer, a = e.nodeIsCursorTarget, u = e.nodeIsEmptyTextNode, c = e.nodeIsTextNode, i = e.nodeIsAttachmentElement, l = e.tagName, h = e.walkTree, e.LocationMapper = function() {
            function e2(t3) {
              this.element = t3;
            }
            var p, d, f, g;
            return e2.prototype.findLocationFromContainerAndOffset = function(e3, i2, o2) {
              var s2, u2, l2, p2, g2, m, v;
              for (m = (o2 != null ? o2 : { strict: true }).strict, u2 = 0, l2 = false, p2 = { index: 0, offset: 0 }, (s2 = this.findAttachmentElementParentForNode(e3)) && (e3 = s2.parentNode, i2 = n(s2)), v = h(this.element, { usingFilter: f }); v.nextNode(); ) {
                if (g2 = v.currentNode, g2 === e3 && c(e3)) {
                  a(g2) || (p2.offset += i2);
                  break;
                }
                if (g2.parentNode === e3) {
                  if (u2++ === i2)
                    break;
                } else if (!t2(e3, g2) && u2 > 0)
                  break;
                r(g2, { strict: m }) ? (l2 && p2.index++, p2.offset = 0, l2 = true) : p2.offset += d(g2);
              }
              return p2;
            }, e2.prototype.findContainerAndOffsetFromLocation = function(t3) {
              var e3, i2, s2, u2, l2;
              if (t3.index === 0 && t3.offset === 0) {
                for (e3 = this.element, u2 = 0; e3.firstChild; )
                  if (e3 = e3.firstChild, o(e3)) {
                    u2 = 1;
                    break;
                  }
                return [e3, u2];
              }
              if (l2 = this.findNodeAndOffsetFromLocation(t3), i2 = l2[0], s2 = l2[1], i2) {
                if (c(i2))
                  d(i2) === 0 ? (e3 = i2.parentNode.parentNode, u2 = n(i2.parentNode), a(i2, { name: "right" }) && u2++) : (e3 = i2, u2 = t3.offset - s2);
                else {
                  if (e3 = i2.parentNode, !r(i2.previousSibling) && !o(e3))
                    for (; i2 === e3.lastChild && (i2 = e3, e3 = e3.parentNode, !o(e3)); )
                      ;
                  u2 = n(i2), t3.offset !== 0 && u2++;
                }
                return [e3, u2];
              }
            }, e2.prototype.findNodeAndOffsetFromLocation = function(t3) {
              var e3, n2, i2, o2, r2, s2, u2, l2;
              for (u2 = 0, l2 = this.getSignificantNodesForIndex(t3.index), n2 = 0, i2 = l2.length; i2 > n2; n2++) {
                if (e3 = l2[n2], o2 = d(e3), t3.offset <= u2 + o2)
                  if (c(e3)) {
                    if (r2 = e3, s2 = u2, t3.offset === s2 && a(r2))
                      break;
                  } else
                    r2 || (r2 = e3, s2 = u2);
                if (u2 += o2, u2 > t3.offset)
                  break;
              }
              return [r2, s2];
            }, e2.prototype.findAttachmentElementParentForNode = function(t3) {
              for (; t3 && t3 !== this.element; ) {
                if (i(t3))
                  return t3;
                t3 = t3.parentNode;
              }
            }, e2.prototype.getSignificantNodesForIndex = function(t3) {
              var e3, n2, i2, o2, r2;
              for (i2 = [], r2 = h(this.element, { usingFilter: p }), o2 = false; r2.nextNode(); )
                if (n2 = r2.currentNode, s(n2)) {
                  if (typeof e3 != "undefined" && e3 !== null ? e3++ : e3 = 0, e3 === t3)
                    o2 = true;
                  else if (o2)
                    break;
                } else
                  o2 && i2.push(n2);
              return i2;
            }, d = function(t3) {
              var e3;
              return t3.nodeType === Node.TEXT_NODE ? a(t3) ? 0 : (e3 = t3.textContent, e3.length) : l(t3) === "br" || i(t3) ? 1 : 0;
            }, p = function(t3) {
              return g(t3) === NodeFilter.FILTER_ACCEPT ? f(t3) : NodeFilter.FILTER_REJECT;
            }, g = function(t3) {
              return u(t3) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }, f = function(t3) {
              return i(t3.parentNode) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }, e2;
          }();
        }.call(this), function() {
          var t2, n, i = [].slice;
          t2 = e.getDOMRange, n = e.setDOMRange, e.PointMapper = function() {
            function e2() {
            }
            return e2.prototype.createDOMRangeFromPoint = function(e3) {
              var i2, o, r, s, a, u, c, l;
              if (c = e3.x, l = e3.y, document.caretPositionFromPoint)
                return a = document.caretPositionFromPoint(c, l), r = a.offsetNode, o = a.offset, i2 = document.createRange(), i2.setStart(r, o), i2;
              if (document.caretRangeFromPoint)
                return document.caretRangeFromPoint(c, l);
              if (document.body.createTextRange) {
                s = t2();
                try {
                  u = document.body.createTextRange(), u.moveToPoint(c, l), u.select();
                } catch (h) {
                }
                return i2 = t2(), n(s), i2;
              }
            }, e2.prototype.getClientRectsForDOMRange = function(t3) {
              var e3, n2, o;
              return n2 = i.call(t3.getClientRects()), o = n2[0], e3 = n2[n2.length - 1], [o, e3];
            }, e2;
          }();
        }.call(this), function() {
          var t2, n = function(t3, e2) {
            return function() {
              return t3.apply(e2, arguments);
            };
          }, i = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              o.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, o = {}.hasOwnProperty, r = [].indexOf || function(t3) {
            for (var e2 = 0, n2 = this.length; n2 > e2; e2++)
              if (e2 in this && this[e2] === t3)
                return e2;
            return -1;
          };
          t2 = e.getDOMRange, e.SelectionChangeObserver = function(e2) {
            function o2() {
              this.run = n(this.run, this), this.update = n(this.update, this), this.selectionManagers = [];
            }
            var s;
            return i(o2, e2), o2.prototype.start = function() {
              return this.started ? void 0 : (this.started = true, "onselectionchange" in document ? document.addEventListener("selectionchange", this.update, true) : this.run());
            }, o2.prototype.stop = function() {
              return this.started ? (this.started = false, document.removeEventListener("selectionchange", this.update, true)) : void 0;
            }, o2.prototype.registerSelectionManager = function(t3) {
              return r.call(this.selectionManagers, t3) < 0 ? (this.selectionManagers.push(t3), this.start()) : void 0;
            }, o2.prototype.unregisterSelectionManager = function(t3) {
              var e3;
              return this.selectionManagers = function() {
                var n2, i2, o3, r2;
                for (o3 = this.selectionManagers, r2 = [], n2 = 0, i2 = o3.length; i2 > n2; n2++)
                  e3 = o3[n2], e3 !== t3 && r2.push(e3);
                return r2;
              }.call(this), this.selectionManagers.length === 0 ? this.stop() : void 0;
            }, o2.prototype.notifySelectionManagersOfSelectionChange = function() {
              var t3, e3, n2, i2, o3;
              for (n2 = this.selectionManagers, i2 = [], t3 = 0, e3 = n2.length; e3 > t3; t3++)
                o3 = n2[t3], i2.push(o3.selectionDidChange());
              return i2;
            }, o2.prototype.update = function() {
              var e3;
              return e3 = t2(), s(e3, this.domRange) ? void 0 : (this.domRange = e3, this.notifySelectionManagersOfSelectionChange());
            }, o2.prototype.reset = function() {
              return this.domRange = null, this.update();
            }, o2.prototype.run = function() {
              return this.started ? (this.update(), requestAnimationFrame(this.run)) : void 0;
            }, s = function(t3, e3) {
              return (t3 != null ? t3.startContainer : void 0) === (e3 != null ? e3.startContainer : void 0) && (t3 != null ? t3.startOffset : void 0) === (e3 != null ? e3.startOffset : void 0) && (t3 != null ? t3.endContainer : void 0) === (e3 != null ? e3.endContainer : void 0) && (t3 != null ? t3.endOffset : void 0) === (e3 != null ? e3.endOffset : void 0);
            }, o2;
          }(e.BasicObject), e.selectionChangeObserver == null && (e.selectionChangeObserver = new e.SelectionChangeObserver());
        }.call(this), function() {
          var t2, n, i, o, r, s, a, u, c, l, h = function(t3, e2) {
            return function() {
              return t3.apply(e2, arguments);
            };
          }, p = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              d.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, d = {}.hasOwnProperty;
          i = e.getDOMSelection, n = e.getDOMRange, l = e.setDOMRange, t2 = e.elementContainsNode, s = e.nodeIsCursorTarget, r = e.innerElementIsActive, o = e.handleEvent, a = e.normalizeRange, u = e.rangeIsCollapsed, c = e.rangesAreEqual, e.SelectionManager = function(d2) {
            function f(t3) {
              this.element = t3, this.selectionDidChange = h(this.selectionDidChange, this), this.didMouseDown = h(this.didMouseDown, this), this.locationMapper = new e.LocationMapper(this.element), this.pointMapper = new e.PointMapper(), this.lockCount = 0, o("mousedown", { onElement: this.element, withCallback: this.didMouseDown });
            }
            return p(f, d2), f.prototype.getLocationRange = function(t3) {
              var e2, i2;
              return t3 == null && (t3 = {}), e2 = t3.strict === false ? this.createLocationRangeFromDOMRange(n(), { strict: false }) : t3.ignoreLock ? this.currentLocationRange : (i2 = this.lockedLocationRange) != null ? i2 : this.currentLocationRange;
            }, f.prototype.setLocationRange = function(t3) {
              var e2;
              if (!this.lockedLocationRange)
                return t3 = a(t3), (e2 = this.createDOMRangeFromLocationRange(t3)) ? (l(e2), this.updateCurrentLocationRange(t3)) : void 0;
            }, f.prototype.setLocationRangeFromPointRange = function(t3) {
              var e2, n2;
              return t3 = a(t3), n2 = this.getLocationAtPoint(t3[0]), e2 = this.getLocationAtPoint(t3[1]), this.setLocationRange([n2, e2]);
            }, f.prototype.getClientRectAtLocationRange = function(t3) {
              var e2;
              return (e2 = this.createDOMRangeFromLocationRange(t3)) ? this.getClientRectsForDOMRange(e2)[1] : void 0;
            }, f.prototype.locationIsCursorTarget = function(t3) {
              var e2, n2, i2;
              return i2 = this.findNodeAndOffsetFromLocation(t3), e2 = i2[0], n2 = i2[1], s(e2);
            }, f.prototype.lock = function() {
              return this.lockCount++ === 0 ? (this.updateCurrentLocationRange(), this.lockedLocationRange = this.getLocationRange()) : void 0;
            }, f.prototype.unlock = function() {
              var t3;
              return --this.lockCount === 0 && (t3 = this.lockedLocationRange, this.lockedLocationRange = null, t3 != null) ? this.setLocationRange(t3) : void 0;
            }, f.prototype.clearSelection = function() {
              var t3;
              return (t3 = i()) != null ? t3.removeAllRanges() : void 0;
            }, f.prototype.selectionIsCollapsed = function() {
              var t3;
              return ((t3 = n()) != null ? t3.collapsed : void 0) === true;
            }, f.prototype.selectionIsExpanded = function() {
              return !this.selectionIsCollapsed();
            }, f.prototype.createLocationRangeFromDOMRange = function(t3, e2) {
              var n2, i2;
              if (t3 != null && this.domRangeWithinElement(t3) && (i2 = this.findLocationFromContainerAndOffset(t3.startContainer, t3.startOffset, e2)))
                return t3.collapsed || (n2 = this.findLocationFromContainerAndOffset(t3.endContainer, t3.endOffset, e2)), a([i2, n2]);
            }, f.proxyMethod("locationMapper.findLocationFromContainerAndOffset"), f.proxyMethod("locationMapper.findContainerAndOffsetFromLocation"), f.proxyMethod("locationMapper.findNodeAndOffsetFromLocation"), f.proxyMethod("pointMapper.createDOMRangeFromPoint"), f.proxyMethod("pointMapper.getClientRectsForDOMRange"), f.prototype.didMouseDown = function() {
              return this.pauseTemporarily();
            }, f.prototype.pauseTemporarily = function() {
              var e2, n2, i2, r2;
              return this.paused = true, n2 = function(e3) {
                return function() {
                  var n3, o2, s2;
                  for (e3.paused = false, clearTimeout(r2), o2 = 0, s2 = i2.length; s2 > o2; o2++)
                    n3 = i2[o2], n3.destroy();
                  return t2(document, e3.element) ? e3.selectionDidChange() : void 0;
                };
              }(this), r2 = setTimeout(n2, 200), i2 = function() {
                var t3, i3, r3, s2;
                for (r3 = ["mousemove", "keydown"], s2 = [], t3 = 0, i3 = r3.length; i3 > t3; t3++)
                  e2 = r3[t3], s2.push(o(e2, { onElement: document, withCallback: n2 }));
                return s2;
              }();
            }, f.prototype.selectionDidChange = function() {
              return this.paused || r(this.element) ? void 0 : this.updateCurrentLocationRange();
            }, f.prototype.updateCurrentLocationRange = function(t3) {
              var e2;
              return (t3 != null ? t3 : t3 = this.createLocationRangeFromDOMRange(n())) && !c(t3, this.currentLocationRange) ? (this.currentLocationRange = t3, (e2 = this.delegate) != null && typeof e2.locationRangeDidChange == "function" ? e2.locationRangeDidChange(this.currentLocationRange.slice(0)) : void 0) : void 0;
            }, f.prototype.createDOMRangeFromLocationRange = function(t3) {
              var e2, n2, i2, o2;
              return i2 = this.findContainerAndOffsetFromLocation(t3[0]), n2 = u(t3) ? i2 : (o2 = this.findContainerAndOffsetFromLocation(t3[1])) != null ? o2 : i2, i2 != null && n2 != null ? (e2 = document.createRange(), e2.setStart.apply(e2, i2), e2.setEnd.apply(e2, n2), e2) : void 0;
            }, f.prototype.getLocationAtPoint = function(t3) {
              var e2, n2;
              return (e2 = this.createDOMRangeFromPoint(t3)) && (n2 = this.createLocationRangeFromDOMRange(e2)) != null ? n2[0] : void 0;
            }, f.prototype.domRangeWithinElement = function(e2) {
              return e2.collapsed ? t2(this.element, e2.startContainer) : t2(this.element, e2.startContainer) && t2(this.element, e2.endContainer);
            }, f;
          }(e.BasicObject);
        }.call(this), function() {
          var t2, n, i, o, r = function(t3, e2) {
            function n2() {
              this.constructor = t3;
            }
            for (var i2 in e2)
              s.call(e2, i2) && (t3[i2] = e2[i2]);
            return n2.prototype = e2.prototype, t3.prototype = new n2(), t3.__super__ = e2.prototype, t3;
          }, s = {}.hasOwnProperty, a = [].slice;
          i = e.rangeIsCollapsed, o = e.rangesAreEqual, n = e.objectsAreEqual, t2 = e.getBlockConfig, e.EditorController = function(s2) {
            function u(t3) {
              var n2, i2;
              this.editorElement = t3.editorElement, n2 = t3.document, i2 = t3.html, this.selectionManager = new e.SelectionManager(this.editorElement), this.selectionManager.delegate = this, this.composition = new e.Composition(), this.composition.delegate = this, this.attachmentManager = new e.AttachmentManager(this.composition.getAttachments()), this.attachmentManager.delegate = this, this.inputController = new e["Level" + e.config.input.getLevel() + "InputController"](this.editorElement), this.inputController.delegate = this, this.inputController.responder = this.composition, this.compositionController = new e.CompositionController(this.editorElement, this.composition), this.compositionController.delegate = this, this.toolbarController = new e.ToolbarController(this.editorElement.toolbarElement), this.toolbarController.delegate = this, this.editor = new e.Editor(this.composition, this.selectionManager, this.editorElement), n2 != null ? this.editor.loadDocument(n2) : this.editor.loadHTML(i2);
            }
            var c;
            return r(u, s2), u.prototype.registerSelectionManager = function() {
              return e.selectionChangeObserver.registerSelectionManager(this.selectionManager);
            }, u.prototype.unregisterSelectionManager = function() {
              return e.selectionChangeObserver.unregisterSelectionManager(this.selectionManager);
            }, u.prototype.render = function() {
              return this.compositionController.render();
            }, u.prototype.reparse = function() {
              return this.composition.replaceHTML(this.editorElement.innerHTML);
            }, u.prototype.compositionDidChangeDocument = function() {
              return this.notifyEditorElement("document-change"), this.handlingInput ? void 0 : this.render();
            }, u.prototype.compositionDidChangeCurrentAttributes = function(t3) {
              return this.currentAttributes = t3, this.toolbarController.updateAttributes(this.currentAttributes), this.updateCurrentActions(), this.notifyEditorElement("attributes-change", { attributes: this.currentAttributes });
            }, u.prototype.compositionDidPerformInsertionAtRange = function(t3) {
              return this.pasting ? this.pastedRange = t3 : void 0;
            }, u.prototype.compositionShouldAcceptFile = function(t3) {
              return this.notifyEditorElement("file-accept", { file: t3 });
            }, u.prototype.compositionDidAddAttachment = function(t3) {
              var e2;
              return e2 = this.attachmentManager.manageAttachment(t3), this.notifyEditorElement("attachment-add", { attachment: e2 });
            }, u.prototype.compositionDidEditAttachment = function(t3) {
              var e2;
              return this.compositionController.rerenderViewForObject(t3), e2 = this.attachmentManager.manageAttachment(t3), this.notifyEditorElement("attachment-edit", { attachment: e2 }), this.notifyEditorElement("change");
            }, u.prototype.compositionDidChangeAttachmentPreviewURL = function(t3) {
              return this.compositionController.invalidateViewForObject(t3), this.notifyEditorElement("change");
            }, u.prototype.compositionDidRemoveAttachment = function(t3) {
              var e2;
              return e2 = this.attachmentManager.unmanageAttachment(t3), this.notifyEditorElement("attachment-remove", { attachment: e2 });
            }, u.prototype.compositionDidStartEditingAttachment = function(t3, e2) {
              return this.attachmentLocationRange = this.composition.document.getLocationRangeOfAttachment(t3), this.compositionController.installAttachmentEditorForAttachment(t3, e2), this.selectionManager.setLocationRange(this.attachmentLocationRange);
            }, u.prototype.compositionDidStopEditingAttachment = function() {
              return this.compositionController.uninstallAttachmentEditor(), this.attachmentLocationRange = null;
            }, u.prototype.compositionDidRequestChangingSelectionToLocationRange = function(t3) {
              return !this.loadingSnapshot || this.isFocused() ? (this.requestedLocationRange = t3, this.compositionRevisionWhenLocationRangeRequested = this.composition.revision, this.handlingInput ? void 0 : this.render()) : void 0;
            }, u.prototype.compositionWillLoadSnapshot = function() {
              return this.loadingSnapshot = true;
            }, u.prototype.compositionDidLoadSnapshot = function() {
              return this.compositionController.refreshViewCache(), this.render(), this.loadingSnapshot = false;
            }, u.prototype.getSelectionManager = function() {
              return this.selectionManager;
            }, u.proxyMethod("getSelectionManager().setLocationRange"), u.proxyMethod("getSelectionManager().getLocationRange"), u.prototype.attachmentManagerDidRequestRemovalOfAttachment = function(t3) {
              return this.removeAttachment(t3);
            }, u.prototype.compositionControllerWillSyncDocumentView = function() {
              return this.inputController.editorWillSyncDocumentView(), this.selectionManager.lock(), this.selectionManager.clearSelection();
            }, u.prototype.compositionControllerDidSyncDocumentView = function() {
              return this.inputController.editorDidSyncDocumentView(), this.selectionManager.unlock(), this.updateCurrentActions(), this.notifyEditorElement("sync");
            }, u.prototype.compositionControllerDidRender = function() {
              return this.requestedLocationRange != null && (this.compositionRevisionWhenLocationRangeRequested === this.composition.revision && this.selectionManager.setLocationRange(this.requestedLocationRange), this.requestedLocationRange = null, this.compositionRevisionWhenLocationRangeRequested = null), this.renderedCompositionRevision !== this.composition.revision && (this.runEditorFilters(), this.composition.updateCurrentAttributes(), this.notifyEditorElement("render")), this.renderedCompositionRevision = this.composition.revision;
            }, u.prototype.compositionControllerDidFocus = function() {
              return this.isFocusedInvisibly() && this.setLocationRange({ index: 0, offset: 0 }), this.toolbarController.hideDialog(), this.notifyEditorElement("focus");
            }, u.prototype.compositionControllerDidBlur = function() {
              return this.notifyEditorElement("blur");
            }, u.prototype.compositionControllerDidSelectAttachment = function(t3, e2) {
              return this.toolbarController.hideDialog(), this.composition.editAttachment(t3, e2);
            }, u.prototype.compositionControllerDidRequestDeselectingAttachment = function(t3) {
              var e2, n2;
              return e2 = (n2 = this.attachmentLocationRange) != null ? n2 : this.composition.document.getLocationRangeOfAttachment(t3), this.selectionManager.setLocationRange(e2[1]);
            }, u.prototype.compositionControllerWillUpdateAttachment = function(t3) {
              return this.editor.recordUndoEntry("Edit Attachment", { context: t3.id, consolidatable: true });
            }, u.prototype.compositionControllerDidRequestRemovalOfAttachment = function(t3) {
              return this.removeAttachment(t3);
            }, u.prototype.inputControllerWillHandleInput = function() {
              return this.handlingInput = true, this.requestedRender = false;
            }, u.prototype.inputControllerDidRequestRender = function() {
              return this.requestedRender = true;
            }, u.prototype.inputControllerDidHandleInput = function() {
              return this.handlingInput = false, this.requestedRender ? (this.requestedRender = false, this.render()) : void 0;
            }, u.prototype.inputControllerDidAllowUnhandledInput = function() {
              return this.notifyEditorElement("change");
            }, u.prototype.inputControllerDidRequestReparse = function() {
              return this.reparse();
            }, u.prototype.inputControllerWillPerformTyping = function() {
              return this.recordTypingUndoEntry();
            }, u.prototype.inputControllerWillPerformFormatting = function(t3) {
              return this.recordFormattingUndoEntry(t3);
            }, u.prototype.inputControllerWillCutText = function() {
              return this.editor.recordUndoEntry("Cut");
            }, u.prototype.inputControllerWillPaste = function(t3) {
              return this.editor.recordUndoEntry("Paste"), this.pasting = true, this.notifyEditorElement("before-paste", { paste: t3 });
            }, u.prototype.inputControllerDidPaste = function(t3) {
              return t3.range = this.pastedRange, this.pastedRange = null, this.pasting = null, this.notifyEditorElement("paste", { paste: t3 });
            }, u.prototype.inputControllerWillMoveText = function() {
              return this.editor.recordUndoEntry("Move");
            }, u.prototype.inputControllerWillAttachFiles = function() {
              return this.editor.recordUndoEntry("Drop Files");
            }, u.prototype.inputControllerWillPerformUndo = function() {
              return this.editor.undo();
            }, u.prototype.inputControllerWillPerformRedo = function() {
              return this.editor.redo();
            }, u.prototype.inputControllerDidReceiveKeyboardCommand = function(t3) {
              return this.toolbarController.applyKeyboardCommand(t3);
            }, u.prototype.inputControllerDidStartDrag = function() {
              return this.locationRangeBeforeDrag = this.selectionManager.getLocationRange();
            }, u.prototype.inputControllerDidReceiveDragOverPoint = function(t3) {
              return this.selectionManager.setLocationRangeFromPointRange(t3);
            }, u.prototype.inputControllerDidCancelDrag = function() {
              return this.selectionManager.setLocationRange(this.locationRangeBeforeDrag), this.locationRangeBeforeDrag = null;
            }, u.prototype.locationRangeDidChange = function(t3) {
              return this.composition.updateCurrentAttributes(), this.updateCurrentActions(), this.attachmentLocationRange && !o(this.attachmentLocationRange, t3) && this.composition.stopEditingAttachment(), this.notifyEditorElement("selection-change");
            }, u.prototype.toolbarDidClickButton = function() {
              return this.getLocationRange() ? void 0 : this.setLocationRange({ index: 0, offset: 0 });
            }, u.prototype.toolbarDidInvokeAction = function(t3) {
              return this.invokeAction(t3);
            }, u.prototype.toolbarDidToggleAttribute = function(t3) {
              return this.recordFormattingUndoEntry(t3), this.composition.toggleCurrentAttribute(t3), this.render(), this.selectionFrozen ? void 0 : this.editorElement.focus();
            }, u.prototype.toolbarDidUpdateAttribute = function(t3, e2) {
              return this.recordFormattingUndoEntry(t3), this.composition.setCurrentAttribute(t3, e2), this.render(), this.selectionFrozen ? void 0 : this.editorElement.focus();
            }, u.prototype.toolbarDidRemoveAttribute = function(t3) {
              return this.recordFormattingUndoEntry(t3), this.composition.removeCurrentAttribute(t3), this.render(), this.selectionFrozen ? void 0 : this.editorElement.focus();
            }, u.prototype.toolbarWillShowDialog = function() {
              return this.composition.expandSelectionForEditing(), this.freezeSelection();
            }, u.prototype.toolbarDidShowDialog = function(t3) {
              return this.notifyEditorElement("toolbar-dialog-show", { dialogName: t3 });
            }, u.prototype.toolbarDidHideDialog = function(t3) {
              return this.thawSelection(), this.editorElement.focus(), this.notifyEditorElement("toolbar-dialog-hide", { dialogName: t3 });
            }, u.prototype.freezeSelection = function() {
              return this.selectionFrozen ? void 0 : (this.selectionManager.lock(), this.composition.freezeSelection(), this.selectionFrozen = true, this.render());
            }, u.prototype.thawSelection = function() {
              return this.selectionFrozen ? (this.composition.thawSelection(), this.selectionManager.unlock(), this.selectionFrozen = false, this.render()) : void 0;
            }, u.prototype.actions = { undo: { test: function() {
              return this.editor.canUndo();
            }, perform: function() {
              return this.editor.undo();
            } }, redo: { test: function() {
              return this.editor.canRedo();
            }, perform: function() {
              return this.editor.redo();
            } }, link: { test: function() {
              return this.editor.canActivateAttribute("href");
            } }, increaseNestingLevel: { test: function() {
              return this.editor.canIncreaseNestingLevel();
            }, perform: function() {
              return this.editor.increaseNestingLevel() && this.render();
            } }, decreaseNestingLevel: { test: function() {
              return this.editor.canDecreaseNestingLevel();
            }, perform: function() {
              return this.editor.decreaseNestingLevel() && this.render();
            } }, attachFiles: { test: function() {
              return true;
            }, perform: function() {
              return e.config.input.pickFiles(this.editor.insertFiles);
            } } }, u.prototype.canInvokeAction = function(t3) {
              var e2, n2;
              return this.actionIsExternal(t3) ? true : !!((e2 = this.actions[t3]) != null && (n2 = e2.test) != null ? n2.call(this) : void 0);
            }, u.prototype.invokeAction = function(t3) {
              var e2, n2;
              return this.actionIsExternal(t3) ? this.notifyEditorElement("action-invoke", { actionName: t3 }) : (e2 = this.actions[t3]) != null && (n2 = e2.perform) != null ? n2.call(this) : void 0;
            }, u.prototype.actionIsExternal = function(t3) {
              return /^x-./.test(t3);
            }, u.prototype.getCurrentActions = function() {
              var t3, e2;
              e2 = {};
              for (t3 in this.actions)
                e2[t3] = this.canInvokeAction(t3);
              return e2;
            }, u.prototype.updateCurrentActions = function() {
              var t3;
              return t3 = this.getCurrentActions(), n(t3, this.currentActions) ? void 0 : (this.currentActions = t3, this.toolbarController.updateActions(this.currentActions), this.notifyEditorElement("actions-change", { actions: this.currentActions }));
            }, u.prototype.runEditorFilters = function() {
              var t3, e2, n2, i2, o2, r2, s3, a2;
              for (a2 = this.composition.getSnapshot(), o2 = this.editor.filters, n2 = 0, i2 = o2.length; i2 > n2; n2++)
                e2 = o2[n2], t3 = a2.document, s3 = a2.selectedRange, a2 = (r2 = e2.call(this.editor, a2)) != null ? r2 : {}, a2.document == null && (a2.document = t3), a2.selectedRange == null && (a2.selectedRange = s3);
              return c(a2, this.composition.getSnapshot()) ? void 0 : this.composition.loadSnapshot(a2);
            }, c = function(t3, e2) {
              return o(t3.selectedRange, e2.selectedRange) && t3.document.isEqualTo(e2.document);
            }, u.prototype.updateInputElement = function() {
              var t3, n2;
              return t3 = this.compositionController.getSerializableElement(), n2 = e.serializeToContentType(t3, "text/html"), this.editorElement.setInputElementValue(n2);
            }, u.prototype.notifyEditorElement = function(t3, e2) {
              switch (t3) {
                case "document-change":
                  this.documentChangedSinceLastRender = true;
                  break;
                case "render":
                  this.documentChangedSinceLastRender && (this.documentChangedSinceLastRender = false, this.notifyEditorElement("change"));
                  break;
                case "change":
                case "attachment-add":
                case "attachment-edit":
                case "attachment-remove":
                  this.updateInputElement();
              }
              return this.editorElement.notify(t3, e2);
            }, u.prototype.removeAttachment = function(t3) {
              return this.editor.recordUndoEntry("Delete Attachment"), this.composition.removeAttachment(t3), this.render();
            }, u.prototype.recordFormattingUndoEntry = function(e2) {
              var n2, o2;
              return n2 = t2(e2), o2 = this.selectionManager.getLocationRange(), n2 || !i(o2) ? this.editor.recordUndoEntry("Formatting", { context: this.getUndoContext(), consolidatable: true }) : void 0;
            }, u.prototype.recordTypingUndoEntry = function() {
              return this.editor.recordUndoEntry("Typing", { context: this.getUndoContext(this.currentAttributes), consolidatable: true });
            }, u.prototype.getUndoContext = function() {
              var t3;
              return t3 = 1 <= arguments.length ? a.call(arguments, 0) : [], [this.getLocationContext(), this.getTimeContext()].concat(a.call(t3));
            }, u.prototype.getLocationContext = function() {
              var t3;
              return t3 = this.selectionManager.getLocationRange(), i(t3) ? t3[0].index : t3;
            }, u.prototype.getTimeContext = function() {
              return e.config.undoInterval > 0 ? Math.floor(new Date().getTime() / e.config.undoInterval) : 0;
            }, u.prototype.isFocused = function() {
              var t3;
              return this.editorElement === ((t3 = this.editorElement.ownerDocument) != null ? t3.activeElement : void 0);
            }, u.prototype.isFocusedInvisibly = function() {
              return this.isFocused() && !this.getLocationRange();
            }, u;
          }(e.Controller);
        }.call(this), function() {
          var t2, n, i, o, r, s, a, u = [].indexOf || function(t3) {
            for (var e2 = 0, n2 = this.length; n2 > e2; e2++)
              if (e2 in this && this[e2] === t3)
                return e2;
            return -1;
          };
          n = e.browser, s = e.makeElement, a = e.triggerEvent, o = e.handleEvent, r = e.handleEventOnce, i = e.findClosestElementFromNode, t2 = e.AttachmentView.attachmentSelector, e.registerElement("trix-editor", function() {
            var c, l, h, p, d, f, g, m, v;
            return g = 0, l = function(t3) {
              return !document.querySelector(":focus") && t3.hasAttribute("autofocus") && document.querySelector("[autofocus]") === t3 ? t3.focus() : void 0;
            }, m = function(t3) {
              return t3.hasAttribute("contenteditable") ? void 0 : (t3.setAttribute("contenteditable", ""), r("focus", { onElement: t3, withCallback: function() {
                return h(t3);
              } }));
            }, h = function(t3) {
              return d(t3), v(t3);
            }, d = function(t3) {
              return (typeof document.queryCommandSupported == "function" ? document.queryCommandSupported("enableObjectResizing") : void 0) ? (document.execCommand("enableObjectResizing", false, false), o("mscontrolselect", { onElement: t3, preventDefault: true })) : void 0;
            }, v = function() {
              var t3;
              return (typeof document.queryCommandSupported == "function" ? document.queryCommandSupported("DefaultParagraphSeparator") : void 0) && (t3 = e.config.blockAttributes["default"].tagName, t3 === "div" || t3 === "p") ? document.execCommand("DefaultParagraphSeparator", false, t3) : void 0;
            }, c = function(t3) {
              return t3.hasAttribute("role") ? void 0 : t3.setAttribute("role", "textbox");
            }, f = function(t3) {
              var e2;
              if (!t3.hasAttribute("aria-label") && !t3.hasAttribute("aria-labelledby"))
                return (e2 = function() {
                  var e3, n2, i2;
                  return i2 = function() {
                    var n3, i3, o2, r2;
                    for (o2 = t3.labels, r2 = [], n3 = 0, i3 = o2.length; i3 > n3; n3++)
                      e3 = o2[n3], e3.contains(t3) || r2.push(e3.textContent);
                    return r2;
                  }(), (n2 = i2.join(" ")) ? t3.setAttribute("aria-label", n2) : t3.removeAttribute("aria-label");
                })(), o("focus", { onElement: t3, withCallback: e2 });
            }, p = function() {
              return n.forcesObjectResizing ? { display: "inline", width: "auto" } : { display: "inline-block", width: "1px" };
            }(), { defaultCSS: "%t {\n  display: block;\n}\n\n%t:empty:not(:focus)::before {\n  content: attr(placeholder);\n  color: graytext;\n  cursor: text;\n  pointer-events: none;\n}\n\n%t a[contenteditable=false] {\n  cursor: text;\n}\n\n%t img {\n  max-width: 100%;\n  height: auto;\n}\n\n%t " + t2 + " figcaption textarea {\n  resize: none;\n}\n\n%t " + t2 + " figcaption textarea.trix-autoresize-clone {\n  position: absolute;\n  left: -9999px;\n  max-height: 0px;\n}\n\n%t " + t2 + " figcaption[data-trix-placeholder]:empty::before {\n  content: attr(data-trix-placeholder);\n  color: graytext;\n}\n\n%t [data-trix-cursor-target] {\n  display: " + p.display + " !important;\n  width: " + p.width + " !important;\n  padding: 0 !important;\n  margin: 0 !important;\n  border: none !important;\n}\n\n%t [data-trix-cursor-target=left] {\n  vertical-align: top !important;\n  margin-left: -1px !important;\n}\n\n%t [data-trix-cursor-target=right] {\n  vertical-align: bottom !important;\n  margin-right: -1px !important;\n}", trixId: { get: function() {
              return this.hasAttribute("trix-id") ? this.getAttribute("trix-id") : (this.setAttribute("trix-id", ++g), this.trixId);
            } }, labels: { get: function() {
              var t3, e2, n2;
              return e2 = [], this.id && this.ownerDocument && e2.push.apply(e2, this.ownerDocument.querySelectorAll("label[for='" + this.id + "']")), (t3 = i(this, { matchingSelector: "label" })) && ((n2 = t3.control) === this || n2 === null) && e2.push(t3), e2;
            } }, toolbarElement: { get: function() {
              var t3, e2, n2;
              return this.hasAttribute("toolbar") ? (e2 = this.ownerDocument) != null ? e2.getElementById(this.getAttribute("toolbar")) : void 0 : this.parentNode ? (n2 = "trix-toolbar-" + this.trixId, this.setAttribute("toolbar", n2), t3 = s("trix-toolbar", { id: n2 }), this.parentNode.insertBefore(t3, this), t3) : void 0;
            } }, inputElement: { get: function() {
              var t3, e2, n2;
              return this.hasAttribute("input") ? (n2 = this.ownerDocument) != null ? n2.getElementById(this.getAttribute("input")) : void 0 : this.parentNode ? (e2 = "trix-input-" + this.trixId, this.setAttribute("input", e2), t3 = s("input", { type: "hidden", id: e2 }), this.parentNode.insertBefore(t3, this.nextElementSibling), t3) : void 0;
            } }, editor: { get: function() {
              var t3;
              return (t3 = this.editorController) != null ? t3.editor : void 0;
            } }, name: { get: function() {
              var t3;
              return (t3 = this.inputElement) != null ? t3.name : void 0;
            } }, value: { get: function() {
              var t3;
              return (t3 = this.inputElement) != null ? t3.value : void 0;
            }, set: function(t3) {
              var e2;
              return this.defaultValue = t3, (e2 = this.editor) != null ? e2.loadHTML(this.defaultValue) : void 0;
            } }, notify: function(t3, e2) {
              return this.editorController ? a("trix-" + t3, { onElement: this, attributes: e2 }) : void 0;
            }, setInputElementValue: function(t3) {
              var e2;
              return (e2 = this.inputElement) != null ? e2.value = t3 : void 0;
            }, initialize: function() {
              return this.hasAttribute("data-trix-internal") ? void 0 : (m(this), c(this), f(this));
            }, connect: function() {
              return this.hasAttribute("data-trix-internal") ? void 0 : (this.editorController || (a("trix-before-initialize", { onElement: this }), this.editorController = new e.EditorController({ editorElement: this, html: this.defaultValue = this.value }), requestAnimationFrame(function(t3) {
                return function() {
                  return a("trix-initialize", { onElement: t3 });
                };
              }(this))), this.editorController.registerSelectionManager(), this.registerResetListener(), this.registerClickListener(), l(this));
            }, disconnect: function() {
              var t3;
              return (t3 = this.editorController) != null && t3.unregisterSelectionManager(), this.unregisterResetListener(), this.unregisterClickListener();
            }, registerResetListener: function() {
              return this.resetListener = this.resetBubbled.bind(this), window.addEventListener("reset", this.resetListener, false);
            }, unregisterResetListener: function() {
              return window.removeEventListener("reset", this.resetListener, false);
            }, registerClickListener: function() {
              return this.clickListener = this.clickBubbled.bind(this), window.addEventListener("click", this.clickListener, false);
            }, unregisterClickListener: function() {
              return window.removeEventListener("click", this.clickListener, false);
            }, resetBubbled: function(t3) {
              var e2;
              if (!t3.defaultPrevented && t3.target === ((e2 = this.inputElement) != null ? e2.form : void 0))
                return this.reset();
            }, clickBubbled: function(t3) {
              var e2;
              if (!(t3.defaultPrevented || this.contains(t3.target) || !(e2 = i(t3.target, { matchingSelector: "label" })) || u.call(this.labels, e2) < 0))
                return this.focus();
            }, reset: function() {
              return this.value = this.defaultValue;
            } };
          }());
        }.call(this), function() {
        }.call(this);
      }).call(this), typeof module == "object" && module.exports ? module.exports = e : typeof define == "function" && define.amd && define(e);
    }.call(exports);
  }
});

// node_modules/dayjs/esm/constant.js
var SECONDS_A_MINUTE = 60;
var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
var MILLISECONDS_A_SECOND = 1e3;
var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;
var MS = "millisecond";
var S = "second";
var MIN = "minute";
var H = "hour";
var D = "day";
var W = "week";
var M = "month";
var Q = "quarter";
var Y = "year";
var DATE = "date";
var FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ";
var INVALID_DATE_STRING = "Invalid Date";
var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

// node_modules/dayjs/esm/locale/en.js
var en_default = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
};

// node_modules/dayjs/esm/utils.js
var padStart = function padStart2(string, length, pad) {
  var s = String(string);
  if (!s || s.length >= length)
    return string;
  return "" + Array(length + 1 - s.length).join(pad) + string;
};
var padZoneStr = function padZoneStr2(instance) {
  var negMinutes = -instance.utcOffset();
  var minutes = Math.abs(negMinutes);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return "" + (negMinutes <= 0 ? "+" : "-") + padStart(hourOffset, 2, "0") + ":" + padStart(minuteOffset, 2, "0");
};
var monthDiff = function monthDiff2(a, b) {
  if (a.date() < b.date())
    return -monthDiff2(b, a);
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
  var anchor = a.clone().add(wholeMonthDiff, M);
  var c = b - anchor < 0;
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
  return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
};
var absFloor = function absFloor2(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
};
var prettyUnit = function prettyUnit2(u) {
  var special = {
    M,
    y: Y,
    w: W,
    d: D,
    D: DATE,
    h: H,
    m: MIN,
    s: S,
    ms: MS,
    Q
  };
  return special[u] || String(u || "").toLowerCase().replace(/s$/, "");
};
var isUndefined = function isUndefined2(s) {
  return s === void 0;
};
var utils_default = {
  s: padStart,
  z: padZoneStr,
  m: monthDiff,
  a: absFloor,
  p: prettyUnit,
  u: isUndefined
};

// node_modules/dayjs/esm/index.js
var L = "en";
var Ls = {};
Ls[L] = en_default;
var isDayjs = function isDayjs2(d) {
  return d instanceof Dayjs;
};
var parseLocale = function parseLocale2(preset, object, isLocal) {
  var l;
  if (!preset)
    return L;
  if (typeof preset === "string") {
    if (Ls[preset]) {
      l = preset;
    }
    if (object) {
      Ls[preset] = object;
      l = preset;
    }
  } else {
    var name2 = preset.name;
    Ls[name2] = preset;
    l = name2;
  }
  if (!isLocal && l)
    L = l;
  return l || !isLocal && L;
};
var dayjs = function dayjs2(date, c) {
  if (isDayjs(date)) {
    return date.clone();
  }
  var cfg = typeof c === "object" ? c : {};
  cfg.date = date;
  cfg.args = arguments;
  return new Dayjs(cfg);
};
var wrapper = function wrapper2(date, instance) {
  return dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    x: instance.$x,
    $offset: instance.$offset
  });
};
var Utils = utils_default;
Utils.l = parseLocale;
Utils.i = isDayjs;
Utils.w = wrapper;
var parseDate = function parseDate2(cfg) {
  var date = cfg.date, utc = cfg.utc;
  if (date === null)
    return new Date(NaN);
  if (Utils.u(date))
    return new Date();
  if (date instanceof Date)
    return new Date(date);
  if (typeof date === "string" && !/Z$/i.test(date)) {
    var d = date.match(REGEX_PARSE);
    if (d) {
      var m = d[2] - 1 || 0;
      var ms = (d[7] || "0").substring(0, 3);
      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
      }
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }
  return new Date(date);
};
var Dayjs = /* @__PURE__ */ function() {
  function Dayjs2(cfg) {
    this.$L = parseLocale(cfg.locale, null, true);
    this.parse(cfg);
  }
  var _proto = Dayjs2.prototype;
  _proto.parse = function parse2(cfg) {
    this.$d = parseDate(cfg);
    this.$x = cfg.x || {};
    this.init();
  };
  _proto.init = function init() {
    var $d = this.$d;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
  };
  _proto.$utils = function $utils() {
    return Utils;
  };
  _proto.isValid = function isValid() {
    return !(this.$d.toString() === INVALID_DATE_STRING);
  };
  _proto.isSame = function isSame(that, units) {
    var other = dayjs(that);
    return this.startOf(units) <= other && other <= this.endOf(units);
  };
  _proto.isAfter = function isAfter(that, units) {
    return dayjs(that) < this.startOf(units);
  };
  _proto.isBefore = function isBefore(that, units) {
    return this.endOf(units) < dayjs(that);
  };
  _proto.$g = function $g(input, get, set) {
    if (Utils.u(input))
      return this[get];
    return this.set(set, input);
  };
  _proto.unix = function unix() {
    return Math.floor(this.valueOf() / 1e3);
  };
  _proto.valueOf = function valueOf() {
    return this.$d.getTime();
  };
  _proto.startOf = function startOf(units, _startOf) {
    var _this = this;
    var isStartOf = !Utils.u(_startOf) ? _startOf : true;
    var unit = Utils.p(units);
    var instanceFactory = function instanceFactory2(d, m) {
      var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
      return isStartOf ? ins : ins.endOf(D);
    };
    var instanceFactorySet = function instanceFactorySet2(method, slice) {
      var argumentStart = [0, 0, 0, 0];
      var argumentEnd = [23, 59, 59, 999];
      return Utils.w(_this.toDate()[method].apply(_this.toDate("s"), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this);
    };
    var $W = this.$W, $M = this.$M, $D = this.$D;
    var utcPad = "set" + (this.$u ? "UTC" : "");
    switch (unit) {
      case Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
      case M:
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
      case W: {
        var weekStart = this.$locale().weekStart || 0;
        var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
      }
      case D:
      case DATE:
        return instanceFactorySet(utcPad + "Hours", 0);
      case H:
        return instanceFactorySet(utcPad + "Minutes", 1);
      case MIN:
        return instanceFactorySet(utcPad + "Seconds", 2);
      case S:
        return instanceFactorySet(utcPad + "Milliseconds", 3);
      default:
        return this.clone();
    }
  };
  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false);
  };
  _proto.$set = function $set(units, _int) {
    var _C$D$C$DATE$C$M$C$Y$C;
    var unit = Utils.p(units);
    var utcPad = "set" + (this.$u ? "UTC" : "");
    var name2 = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
    var arg = unit === D ? this.$D + (_int - this.$W) : _int;
    if (unit === M || unit === Y) {
      var date = this.clone().set(DATE, 1);
      date.$d[name2](arg);
      date.init();
      this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).$d;
    } else if (name2)
      this.$d[name2](arg);
    this.init();
    return this;
  };
  _proto.set = function set(string, _int2) {
    return this.clone().$set(string, _int2);
  };
  _proto.get = function get(unit) {
    return this[Utils.p(unit)]();
  };
  _proto.add = function add(number, units) {
    var _this2 = this, _C$MIN$C$H$C$S$unit;
    number = Number(number);
    var unit = Utils.p(units);
    var instanceFactorySet = function instanceFactorySet2(n) {
      var d = dayjs(_this2);
      return Utils.w(d.date(d.date() + Math.round(n * number)), _this2);
    };
    if (unit === M) {
      return this.set(M, this.$M + number);
    }
    if (unit === Y) {
      return this.set(Y, this.$y + number);
    }
    if (unit === D) {
      return instanceFactorySet(1);
    }
    if (unit === W) {
      return instanceFactorySet(7);
    }
    var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1;
    var nextTimeStamp = this.$d.getTime() + number * step;
    return Utils.w(nextTimeStamp, this);
  };
  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string);
  };
  _proto.format = function format(formatStr) {
    var _this3 = this;
    var locale = this.$locale();
    if (!this.isValid())
      return locale.invalidDate || INVALID_DATE_STRING;
    var str = formatStr || FORMAT_DEFAULT;
    var zoneStr = Utils.z(this);
    var $H = this.$H, $m = this.$m, $M = this.$M;
    var weekdays = locale.weekdays, months = locale.months, meridiem = locale.meridiem;
    var getShort = function getShort2(arr, index, full, length) {
      return arr && (arr[index] || arr(_this3, str)) || full[index].substr(0, length);
    };
    var get$H = function get$H2(num) {
      return Utils.s($H % 12 || 12, num, "0");
    };
    var meridiemFunc = meridiem || function(hour, minute, isLowercase) {
      var m = hour < 12 ? "AM" : "PM";
      return isLowercase ? m.toLowerCase() : m;
    };
    var matches = {
      YY: String(this.$y).slice(-2),
      YYYY: this.$y,
      M: $M + 1,
      MM: Utils.s($M + 1, 2, "0"),
      MMM: getShort(locale.monthsShort, $M, months, 3),
      MMMM: getShort(months, $M),
      D: this.$D,
      DD: Utils.s(this.$D, 2, "0"),
      d: String(this.$W),
      dd: getShort(locale.weekdaysMin, this.$W, weekdays, 2),
      ddd: getShort(locale.weekdaysShort, this.$W, weekdays, 3),
      dddd: weekdays[this.$W],
      H: String($H),
      HH: Utils.s($H, 2, "0"),
      h: get$H(1),
      hh: get$H(2),
      a: meridiemFunc($H, $m, true),
      A: meridiemFunc($H, $m, false),
      m: String($m),
      mm: Utils.s($m, 2, "0"),
      s: String(this.$s),
      ss: Utils.s(this.$s, 2, "0"),
      SSS: Utils.s(this.$ms, 3, "0"),
      Z: zoneStr
    };
    return str.replace(REGEX_FORMAT, function(match, $1) {
      return $1 || matches[match] || zoneStr.replace(":", "");
    });
  };
  _proto.utcOffset = function utcOffset() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  };
  _proto.diff = function diff(input, units, _float) {
    var _C$Y$C$M$C$Q$C$W$C$D$;
    var unit = Utils.p(units);
    var that = dayjs(input);
    var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
    var diff2 = this - that;
    var result = Utils.m(this, that);
    result = (_C$Y$C$M$C$Q$C$W$C$D$ = {}, _C$Y$C$M$C$Q$C$W$C$D$[Y] = result / 12, _C$Y$C$M$C$Q$C$W$C$D$[M] = result, _C$Y$C$M$C$Q$C$W$C$D$[Q] = result / 3, _C$Y$C$M$C$Q$C$W$C$D$[W] = (diff2 - zoneDelta) / MILLISECONDS_A_WEEK, _C$Y$C$M$C$Q$C$W$C$D$[D] = (diff2 - zoneDelta) / MILLISECONDS_A_DAY, _C$Y$C$M$C$Q$C$W$C$D$[H] = diff2 / MILLISECONDS_A_HOUR, _C$Y$C$M$C$Q$C$W$C$D$[MIN] = diff2 / MILLISECONDS_A_MINUTE, _C$Y$C$M$C$Q$C$W$C$D$[S] = diff2 / MILLISECONDS_A_SECOND, _C$Y$C$M$C$Q$C$W$C$D$)[unit] || diff2;
    return _float ? result : Utils.a(result);
  };
  _proto.daysInMonth = function daysInMonth() {
    return this.endOf(M).$D;
  };
  _proto.$locale = function $locale() {
    return Ls[this.$L];
  };
  _proto.locale = function locale(preset, object) {
    if (!preset)
      return this.$L;
    var that = this.clone();
    var nextLocaleName = parseLocale(preset, object, true);
    if (nextLocaleName)
      that.$L = nextLocaleName;
    return that;
  };
  _proto.clone = function clone() {
    return Utils.w(this.$d, this);
  };
  _proto.toDate = function toDate() {
    return new Date(this.valueOf());
  };
  _proto.toJSON = function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  };
  _proto.toISOString = function toISOString() {
    return this.$d.toISOString();
  };
  _proto.toString = function toString2() {
    return this.$d.toUTCString();
  };
  return Dayjs2;
}();
var proto = Dayjs.prototype;
dayjs.prototype = proto;
[["$ms", MS], ["$s", S], ["$m", MIN], ["$H", H], ["$W", D], ["$M", M], ["$y", Y], ["$D", DATE]].forEach(function(g) {
  proto[g[1]] = function(input) {
    return this.$g(input, g[0], g[1]);
  };
});
dayjs.extend = function(plugin8, option2) {
  if (!plugin8.$i) {
    plugin8(option2, Dayjs, dayjs);
    plugin8.$i = true;
  }
  return dayjs;
};
dayjs.locale = parseLocale;
dayjs.isDayjs = isDayjs;
dayjs.unix = function(timestamp) {
  return dayjs(timestamp * 1e3);
};
dayjs.en = Ls[L];
dayjs.Ls = Ls;
dayjs.p = {};
var esm_default = dayjs;

// resources/js/components/date-time-picker.js
var import_customParseFormat = __toModule(require_customParseFormat());
var import_localeData = __toModule(require_localeData());
esm_default.extend(import_customParseFormat.default);
esm_default.extend(import_localeData.default);
window.dayjs = esm_default;
var date_time_picker_default = (Alpine) => {
  Alpine.data("dateTimePickerFormComponent", ({
    displayFormat,
    firstDayOfWeek,
    format,
    isAutofocused,
    isRequired,
    locale,
    maxDate,
    minDate,
    state: state2
  }) => {
    esm_default.locale(locale);
    return {
      daysInFocusedMonth: [],
      displayText: "",
      emptyDaysInFocusedMonth: [],
      focusedDate: null,
      focusedMonth: null,
      focusedYear: null,
      hours: null,
      maxDate,
      minDate,
      minutes: null,
      open: false,
      seconds: null,
      state: state2,
      init: function() {
        this.maxDate = esm_default(this.maxDate);
        if (!this.maxDate.isValid())
          this.maxDate = null;
        this.minDate = esm_default(this.minDate);
        if (!this.minDate.isValid())
          this.minDate = null;
        let date = this.getSelectedDate() ?? esm_default();
        if (this.maxDate !== null && date.isAfter(this.maxDate))
          date = isRequired ? this.maxDate : null;
        if (this.minDate !== null && date.isBefore(this.minDate))
          date = isRequired ? this.minDate : null;
        this.hour = date.hour();
        this.minute = date.minute();
        this.second = date.second();
        if (isRequired && !this.getSelectedDate())
          this.setState(date);
        this.setDisplayText();
        if (isAutofocused)
          this.openPicker();
        this.$watch("focusedMonth", () => {
          this.focusedMonth = +this.focusedMonth;
          if (this.focusedDate.month() === this.focusedMonth)
            return;
          this.focusedDate = this.focusedDate.set("month", this.focusedMonth);
        });
        this.$watch("focusedYear", () => {
          this.focusedYear = Number.isInteger(+this.focusedYear) ? +this.focusedYear : esm_default().year();
          if (this.focusedDate.year() === this.focusedYear)
            return;
          this.focusedDate = this.focusedDate.set("year", this.focusedYear);
        });
        this.$watch("focusedDate", () => {
          this.focusedMonth = this.focusedDate.month();
          this.focusedYear = this.focusedDate.year();
          this.setupDaysGrid();
          this.$nextTick(() => {
            this.evaluatePosition();
          });
        });
        this.$watch("hour", () => {
          let hour = +this.hour;
          if (!Number.isInteger(hour)) {
            this.hour = esm_default().hour();
          } else if (hour > 23) {
            this.hour = 0;
          } else if (hour < 0) {
            this.hour = 23;
          } else {
            this.hour = hour;
          }
          let date2 = this.getSelectedDate();
          if (date2 === null)
            return;
          this.setState(date2.set("hour", this.hour));
        });
        this.$watch("minute", () => {
          let minute = +this.minute;
          if (!Number.isInteger(minute)) {
            this.minute = esm_default().minute();
          } else if (minute > 59) {
            this.minute = 0;
          } else if (minute < 0) {
            this.minute = 59;
          } else {
            this.minute = minute;
          }
          let date2 = this.getSelectedDate();
          if (date2 === null)
            return;
          this.setState(date2.set("minute", this.minute));
        });
        this.$watch("second", () => {
          let second = +this.second;
          if (!Number.isInteger(second)) {
            this.second = esm_default().second();
          } else if (second > 59) {
            this.second = 0;
          } else if (second < 0) {
            this.second = 59;
          } else {
            this.second = second;
          }
          let date2 = this.getSelectedDate();
          if (date2 === null)
            return;
          this.setState(date2.set("second", this.second));
        });
        this.$watch("state", () => {
          let date2 = this.getSelectedDate() ?? esm_default();
          if (this.maxDate !== null && date2.isAfter(this.maxDate))
            date2 = isRequired ? this.maxDate : null;
          if (this.minDate !== null && date2.isBefore(this.minDate))
            date2 = isRequired ? this.minDate : null;
          this.hour = date2.hour();
          this.minute = date2.minute();
          this.second = date2.second();
          if (isRequired && !this.getSelectedDate())
            this.setState(date2);
          this.setDisplayText();
        });
      },
      clearState: function() {
        this.setState(null);
        this.closePicker();
      },
      closePicker: function() {
        this.open = false;
      },
      dateIsDisabled: function(date) {
        if (this.maxDate && date.isAfter(this.maxDate))
          return true;
        if (this.minDate && date.isBefore(this.minDate))
          return true;
        return false;
      },
      dayIsDisabled: function(day) {
        return this.dateIsDisabled(this.focusedDate.date(day));
      },
      dayIsSelected: function(day) {
        let selectedDate = this.getSelectedDate();
        if (selectedDate === null)
          return false;
        return selectedDate.date() === day && selectedDate.month() === this.focusedDate.month() && selectedDate.year() === this.focusedDate.year();
      },
      dayIsToday: function(day) {
        let date = esm_default();
        return date.date() === day && date.month() === this.focusedDate.month() && date.year() === this.focusedDate.year();
      },
      evaluatePosition: function() {
        let availableHeight = window.innerHeight - this.$refs.button.offsetHeight;
        let element = this.$refs.button;
        while (element) {
          availableHeight -= element.offsetTop;
          element = element.offsetParent;
        }
        if (this.$refs.picker.offsetHeight <= availableHeight) {
          this.$refs.picker.style.bottom = "auto";
          return;
        }
        this.$refs.picker.style.bottom = `${this.$refs.button.offsetHeight}px`;
      },
      focusPreviousDay: function() {
        this.focusedDate = this.focusedDate.subtract(1, "day");
      },
      focusPreviousWeek: function() {
        this.focusedDate = this.focusedDate.subtract(1, "week");
      },
      focusNextDay: function() {
        this.focusedDate = this.focusedDate.add(1, "day");
      },
      focusNextWeek: function() {
        this.focusedDate = this.focusedDate.add(1, "week");
      },
      getDayLabels: function() {
        const labels = esm_default.weekdaysShort();
        if (firstDayOfWeek === 0) {
          return labels;
        }
        return [
          ...labels.slice(firstDayOfWeek),
          ...labels.slice(0, firstDayOfWeek)
        ];
      },
      getSelectedDate: function() {
        let date = esm_default(this.state, format);
        if (!date.isValid())
          return null;
        return date;
      },
      openPicker: function() {
        this.focusedDate = this.getSelectedDate() ?? esm_default();
        this.setupDaysGrid();
        this.open = true;
        this.$nextTick(() => {
          this.evaluatePosition();
        });
      },
      selectDate: function(day = null) {
        if (day)
          this.setFocusedDay(day);
        this.setState(this.focusedDate);
      },
      setDisplayText: function() {
        this.displayText = this.getSelectedDate() ? this.getSelectedDate().format(displayFormat) : "";
      },
      setupDaysGrid: function() {
        this.emptyDaysInFocusedMonth = Array.from({
          length: this.focusedDate.date(8 - firstDayOfWeek).day()
        }, (_, i) => i + 1);
        this.daysInFocusedMonth = Array.from({
          length: this.focusedDate.daysInMonth()
        }, (_, i) => i + 1);
      },
      setFocusedDay: function(day) {
        this.focusedDate = this.focusedDate.date(day);
      },
      setState: function(date) {
        if (date === null) {
          if (isRequired) {
            date = esm_default();
            if (this.maxDate !== null && date.isAfter(this.maxDate))
              date = this.maxDate;
            if (this.minDate !== null && date.isBefore(this.minDate))
              date = this.minDate;
          } else {
            this.state = null;
            this.setDisplayText();
            return;
          }
        } else {
          if (this.dateIsDisabled(date))
            return;
        }
        this.state = date.set("hour", this.hour).set("minute", this.minute).set("second", this.second).format(format);
        this.setDisplayText();
      },
      togglePickerVisibility: function() {
        if (this.open) {
          this.closePicker();
          return;
        }
        this.openPicker();
      }
    };
  });
};

// node_modules/filepond/dist/filepond.esm.js
var isNode = (value) => value instanceof HTMLElement;
var createStore = (initialState, queries2 = [], actions2 = []) => {
  const state2 = {
    ...initialState
  };
  const actionQueue = [];
  const dispatchQueue = [];
  const getState = () => ({ ...state2 });
  const processActionQueue = () => {
    const queue = [...actionQueue];
    actionQueue.length = 0;
    return queue;
  };
  const processDispatchQueue = () => {
    const queue = [...dispatchQueue];
    dispatchQueue.length = 0;
    queue.forEach(({ type, data: data3 }) => {
      dispatch(type, data3);
    });
  };
  const dispatch = (type, data3, isBlocking) => {
    if (isBlocking && !document.hidden) {
      dispatchQueue.push({ type, data: data3 });
      return;
    }
    if (actionHandlers[type]) {
      actionHandlers[type](data3);
    }
    actionQueue.push({
      type,
      data: data3
    });
  };
  const query = (str, ...args) => queryHandles[str] ? queryHandles[str](...args) : null;
  const api = {
    getState,
    processActionQueue,
    processDispatchQueue,
    dispatch,
    query
  };
  let queryHandles = {};
  queries2.forEach((query2) => {
    queryHandles = {
      ...query2(state2),
      ...queryHandles
    };
  });
  let actionHandlers = {};
  actions2.forEach((action) => {
    actionHandlers = {
      ...action(dispatch, query, state2),
      ...actionHandlers
    };
  });
  return api;
};
var defineProperty = (obj, property, definition) => {
  if (typeof definition === "function") {
    obj[property] = definition;
    return;
  }
  Object.defineProperty(obj, property, { ...definition });
};
var forin = (obj, cb) => {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    cb(key, obj[key]);
  }
};
var createObject = (definition) => {
  const obj = {};
  forin(definition, (property) => {
    defineProperty(obj, property, definition[property]);
  });
  return obj;
};
var attr = (node, name2, value = null) => {
  if (value === null) {
    return node.getAttribute(name2) || node.hasAttribute(name2);
  }
  node.setAttribute(name2, value);
};
var ns = "http://www.w3.org/2000/svg";
var svgElements = ["svg", "path"];
var isSVGElement = (tag) => svgElements.includes(tag);
var createElement = (tag, className, attributes = {}) => {
  if (typeof className === "object") {
    attributes = className;
    className = null;
  }
  const element = isSVGElement(tag) ? document.createElementNS(ns, tag) : document.createElement(tag);
  if (className) {
    if (isSVGElement(tag)) {
      attr(element, "class", className);
    } else {
      element.className = className;
    }
  }
  forin(attributes, (name2, value) => {
    attr(element, name2, value);
  });
  return element;
};
var appendChild = (parent) => (child, index) => {
  if (typeof index !== "undefined" && parent.children[index]) {
    parent.insertBefore(child, parent.children[index]);
  } else {
    parent.appendChild(child);
  }
};
var appendChildView = (parent, childViews) => (view, index) => {
  if (typeof index !== "undefined") {
    childViews.splice(index, 0, view);
  } else {
    childViews.push(view);
  }
  return view;
};
var removeChildView = (parent, childViews) => (view) => {
  childViews.splice(childViews.indexOf(view), 1);
  if (view.element.parentNode) {
    parent.removeChild(view.element);
  }
  return view;
};
var IS_BROWSER = (() => typeof window !== "undefined" && typeof window.document !== "undefined")();
var isBrowser = () => IS_BROWSER;
var testElement = isBrowser() ? createElement("svg") : {};
var getChildCount = "children" in testElement ? (el) => el.children.length : (el) => el.childNodes.length;
var getViewRect = (elementRect, childViews, offset, scale) => {
  const left = offset[0] || elementRect.left;
  const top = offset[1] || elementRect.top;
  const right = left + elementRect.width;
  const bottom = top + elementRect.height * (scale[1] || 1);
  const rect = {
    element: {
      ...elementRect
    },
    inner: {
      left: elementRect.left,
      top: elementRect.top,
      right: elementRect.right,
      bottom: elementRect.bottom
    },
    outer: {
      left,
      top,
      right,
      bottom
    }
  };
  childViews.filter((childView) => !childView.isRectIgnored()).map((childView) => childView.rect).forEach((childViewRect) => {
    expandRect(rect.inner, { ...childViewRect.inner });
    expandRect(rect.outer, { ...childViewRect.outer });
  });
  calculateRectSize(rect.inner);
  rect.outer.bottom += rect.element.marginBottom;
  rect.outer.right += rect.element.marginRight;
  calculateRectSize(rect.outer);
  return rect;
};
var expandRect = (parent, child) => {
  child.top += parent.top;
  child.right += parent.left;
  child.bottom += parent.top;
  child.left += parent.left;
  if (child.bottom > parent.bottom) {
    parent.bottom = child.bottom;
  }
  if (child.right > parent.right) {
    parent.right = child.right;
  }
};
var calculateRectSize = (rect) => {
  rect.width = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;
};
var isNumber = (value) => typeof value === "number";
var thereYet = (position, destination, velocity, errorMargin = 1e-3) => {
  return Math.abs(position - destination) < errorMargin && Math.abs(velocity) < errorMargin;
};
var spring = ({ stiffness = 0.5, damping = 0.75, mass = 10 } = {}) => {
  let target = null;
  let position = null;
  let velocity = 0;
  let resting = false;
  const interpolate = (ts, skipToEndState) => {
    if (resting)
      return;
    if (!(isNumber(target) && isNumber(position))) {
      resting = true;
      velocity = 0;
      return;
    }
    const f = -(position - target) * stiffness;
    velocity += f / mass;
    position += velocity;
    velocity *= damping;
    if (thereYet(position, target, velocity) || skipToEndState) {
      position = target;
      velocity = 0;
      resting = true;
      api.onupdate(position);
      api.oncomplete(position);
    } else {
      api.onupdate(position);
    }
  };
  const setTarget = (value) => {
    if (isNumber(value) && !isNumber(position)) {
      position = value;
    }
    if (target === null) {
      target = value;
      position = value;
    }
    target = value;
    if (position === target || typeof target === "undefined") {
      resting = true;
      velocity = 0;
      api.onupdate(position);
      api.oncomplete(position);
      return;
    }
    resting = false;
  };
  const api = createObject({
    interpolate,
    target: {
      set: setTarget,
      get: () => target
    },
    resting: {
      get: () => resting
    },
    onupdate: (value) => {
    },
    oncomplete: (value) => {
    }
  });
  return api;
};
var easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
var tween = ({ duration = 500, easing = easeInOutQuad, delay = 0 } = {}) => {
  let start = null;
  let t;
  let p;
  let resting = true;
  let reverse = false;
  let target = null;
  const interpolate = (ts, skipToEndState) => {
    if (resting || target === null)
      return;
    if (start === null) {
      start = ts;
    }
    if (ts - start < delay)
      return;
    t = ts - start - delay;
    if (t >= duration || skipToEndState) {
      t = 1;
      p = reverse ? 0 : 1;
      api.onupdate(p * target);
      api.oncomplete(p * target);
      resting = true;
    } else {
      p = t / duration;
      api.onupdate((t >= 0 ? easing(reverse ? 1 - p : p) : 0) * target);
    }
  };
  const api = createObject({
    interpolate,
    target: {
      get: () => reverse ? 0 : target,
      set: (value) => {
        if (target === null) {
          target = value;
          api.onupdate(value);
          api.oncomplete(value);
          return;
        }
        if (value < target) {
          target = 1;
          reverse = true;
        } else {
          reverse = false;
          target = value;
        }
        resting = false;
        start = null;
      }
    },
    resting: {
      get: () => resting
    },
    onupdate: (value) => {
    },
    oncomplete: (value) => {
    }
  });
  return api;
};
var animator = {
  spring,
  tween
};
var createAnimator = (definition, category, property) => {
  const def = definition[category] && typeof definition[category][property] === "object" ? definition[category][property] : definition[category] || definition;
  const type = typeof def === "string" ? def : def.type;
  const props = typeof def === "object" ? { ...def } : {};
  return animator[type] ? animator[type](props) : null;
};
var addGetSet = (keys, obj, props, overwrite = false) => {
  obj = Array.isArray(obj) ? obj : [obj];
  obj.forEach((o) => {
    keys.forEach((key) => {
      let name2 = key;
      let getter = () => props[key];
      let setter = (value) => props[key] = value;
      if (typeof key === "object") {
        name2 = key.key;
        getter = key.getter || getter;
        setter = key.setter || setter;
      }
      if (o[name2] && !overwrite) {
        return;
      }
      o[name2] = {
        get: getter,
        set: setter
      };
    });
  });
};
var animations = ({ mixinConfig, viewProps, viewInternalAPI, viewExternalAPI }) => {
  const initialProps = { ...viewProps };
  const animations2 = [];
  forin(mixinConfig, (property, animation) => {
    const animator2 = createAnimator(animation);
    if (!animator2) {
      return;
    }
    animator2.onupdate = (value) => {
      viewProps[property] = value;
    };
    animator2.target = initialProps[property];
    const prop = {
      key: property,
      setter: (value) => {
        if (animator2.target === value) {
          return;
        }
        animator2.target = value;
      },
      getter: () => viewProps[property]
    };
    addGetSet([prop], [viewInternalAPI, viewExternalAPI], viewProps, true);
    animations2.push(animator2);
  });
  return {
    write: (ts) => {
      let skipToEndState = document.hidden;
      let resting = true;
      animations2.forEach((animation) => {
        if (!animation.resting)
          resting = false;
        animation.interpolate(ts, skipToEndState);
      });
      return resting;
    },
    destroy: () => {
    }
  };
};
var addEvent = (element) => (type, fn2) => {
  element.addEventListener(type, fn2);
};
var removeEvent = (element) => (type, fn2) => {
  element.removeEventListener(type, fn2);
};
var listeners = ({
  mixinConfig,
  viewProps,
  viewInternalAPI,
  viewExternalAPI,
  viewState,
  view
}) => {
  const events = [];
  const add = addEvent(view.element);
  const remove = removeEvent(view.element);
  viewExternalAPI.on = (type, fn2) => {
    events.push({
      type,
      fn: fn2
    });
    add(type, fn2);
  };
  viewExternalAPI.off = (type, fn2) => {
    events.splice(events.findIndex((event) => event.type === type && event.fn === fn2), 1);
    remove(type, fn2);
  };
  return {
    write: () => {
      return true;
    },
    destroy: () => {
      events.forEach((event) => {
        remove(event.type, event.fn);
      });
    }
  };
};
var apis = ({ mixinConfig, viewProps, viewExternalAPI }) => {
  addGetSet(mixinConfig, viewExternalAPI, viewProps);
};
var isDefined = (value) => value != null;
var defaults = {
  opacity: 1,
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  originX: 0,
  originY: 0
};
var styles = ({ mixinConfig, viewProps, viewInternalAPI, viewExternalAPI, view }) => {
  const initialProps = { ...viewProps };
  const currentProps = {};
  addGetSet(mixinConfig, [viewInternalAPI, viewExternalAPI], viewProps);
  const getOffset = () => [viewProps["translateX"] || 0, viewProps["translateY"] || 0];
  const getScale = () => [viewProps["scaleX"] || 0, viewProps["scaleY"] || 0];
  const getRect = () => view.rect ? getViewRect(view.rect, view.childViews, getOffset(), getScale()) : null;
  viewInternalAPI.rect = { get: getRect };
  viewExternalAPI.rect = { get: getRect };
  mixinConfig.forEach((key) => {
    viewProps[key] = typeof initialProps[key] === "undefined" ? defaults[key] : initialProps[key];
  });
  return {
    write: () => {
      if (!propsHaveChanged(currentProps, viewProps)) {
        return;
      }
      applyStyles(view.element, viewProps);
      Object.assign(currentProps, { ...viewProps });
      return true;
    },
    destroy: () => {
    }
  };
};
var propsHaveChanged = (currentProps, newProps) => {
  if (Object.keys(currentProps).length !== Object.keys(newProps).length) {
    return true;
  }
  for (const prop in newProps) {
    if (newProps[prop] !== currentProps[prop]) {
      return true;
    }
  }
  return false;
};
var applyStyles = (element, {
  opacity,
  perspective,
  translateX,
  translateY,
  scaleX,
  scaleY,
  rotateX,
  rotateY,
  rotateZ,
  originX,
  originY,
  width,
  height
}) => {
  let transforms2 = "";
  let styles2 = "";
  if (isDefined(originX) || isDefined(originY)) {
    styles2 += `transform-origin: ${originX || 0}px ${originY || 0}px;`;
  }
  if (isDefined(perspective)) {
    transforms2 += `perspective(${perspective}px) `;
  }
  if (isDefined(translateX) || isDefined(translateY)) {
    transforms2 += `translate3d(${translateX || 0}px, ${translateY || 0}px, 0) `;
  }
  if (isDefined(scaleX) || isDefined(scaleY)) {
    transforms2 += `scale3d(${isDefined(scaleX) ? scaleX : 1}, ${isDefined(scaleY) ? scaleY : 1}, 1) `;
  }
  if (isDefined(rotateZ)) {
    transforms2 += `rotateZ(${rotateZ}rad) `;
  }
  if (isDefined(rotateX)) {
    transforms2 += `rotateX(${rotateX}rad) `;
  }
  if (isDefined(rotateY)) {
    transforms2 += `rotateY(${rotateY}rad) `;
  }
  if (transforms2.length) {
    styles2 += `transform:${transforms2};`;
  }
  if (isDefined(opacity)) {
    styles2 += `opacity:${opacity};`;
    if (opacity === 0) {
      styles2 += `visibility:hidden;`;
    }
    if (opacity < 1) {
      styles2 += `pointer-events:none;`;
    }
  }
  if (isDefined(height)) {
    styles2 += `height:${height}px;`;
  }
  if (isDefined(width)) {
    styles2 += `width:${width}px;`;
  }
  const elementCurrentStyle = element.elementCurrentStyle || "";
  if (styles2.length !== elementCurrentStyle.length || styles2 !== elementCurrentStyle) {
    element.style.cssText = styles2;
    element.elementCurrentStyle = styles2;
  }
};
var Mixins = {
  styles,
  listeners,
  animations,
  apis
};
var updateRect = (rect = {}, element = {}, style = {}) => {
  if (!element.layoutCalculated) {
    rect.paddingTop = parseInt(style.paddingTop, 10) || 0;
    rect.marginTop = parseInt(style.marginTop, 10) || 0;
    rect.marginRight = parseInt(style.marginRight, 10) || 0;
    rect.marginBottom = parseInt(style.marginBottom, 10) || 0;
    rect.marginLeft = parseInt(style.marginLeft, 10) || 0;
    element.layoutCalculated = true;
  }
  rect.left = element.offsetLeft || 0;
  rect.top = element.offsetTop || 0;
  rect.width = element.offsetWidth || 0;
  rect.height = element.offsetHeight || 0;
  rect.right = rect.left + rect.width;
  rect.bottom = rect.top + rect.height;
  rect.scrollTop = element.scrollTop;
  rect.hidden = element.offsetParent === null;
  return rect;
};
var createView = ({
  tag = "div",
  name: name2 = null,
  attributes = {},
  read = () => {
  },
  write: write2 = () => {
  },
  create: create2 = () => {
  },
  destroy: destroy2 = () => {
  },
  filterFrameActionsForChild = (child, actions2) => actions2,
  didCreateView = () => {
  },
  didWriteView = () => {
  },
  ignoreRect = false,
  ignoreRectUpdate = false,
  mixins = []
} = {}) => (store, props = {}) => {
  const element = createElement(tag, `filepond--${name2}`, attributes);
  const style = window.getComputedStyle(element, null);
  const rect = updateRect();
  let frameRect = null;
  let isResting = false;
  const childViews = [];
  const activeMixins = [];
  const ref = {};
  const state2 = {};
  const writers = [
    write2
  ];
  const readers = [
    read
  ];
  const destroyers = [
    destroy2
  ];
  const getElement = () => element;
  const getChildViews = () => childViews.concat();
  const getReference = () => ref;
  const createChildView = (store2) => (view, props2) => view(store2, props2);
  const getRect = () => {
    if (frameRect) {
      return frameRect;
    }
    frameRect = getViewRect(rect, childViews, [0, 0], [1, 1]);
    return frameRect;
  };
  const getStyle = () => style;
  const _read = () => {
    frameRect = null;
    childViews.forEach((child) => child._read());
    const shouldUpdate = !(ignoreRectUpdate && rect.width && rect.height);
    if (shouldUpdate) {
      updateRect(rect, element, style);
    }
    const api = { root: internalAPI, props, rect };
    readers.forEach((reader) => reader(api));
  };
  const _write = (ts, frameActions, shouldOptimize) => {
    let resting = frameActions.length === 0;
    writers.forEach((writer) => {
      const writerResting = writer({
        props,
        root: internalAPI,
        actions: frameActions,
        timestamp: ts,
        shouldOptimize
      });
      if (writerResting === false) {
        resting = false;
      }
    });
    activeMixins.forEach((mixin) => {
      const mixinResting = mixin.write(ts);
      if (mixinResting === false) {
        resting = false;
      }
    });
    childViews.filter((child) => !!child.element.parentNode).forEach((child) => {
      const childResting = child._write(ts, filterFrameActionsForChild(child, frameActions), shouldOptimize);
      if (!childResting) {
        resting = false;
      }
    });
    childViews.forEach((child, index) => {
      if (child.element.parentNode) {
        return;
      }
      internalAPI.appendChild(child.element, index);
      child._read();
      child._write(ts, filterFrameActionsForChild(child, frameActions), shouldOptimize);
      resting = false;
    });
    isResting = resting;
    didWriteView({
      props,
      root: internalAPI,
      actions: frameActions,
      timestamp: ts
    });
    return resting;
  };
  const _destroy = () => {
    activeMixins.forEach((mixin) => mixin.destroy());
    destroyers.forEach((destroyer) => {
      destroyer({ root: internalAPI, props });
    });
    childViews.forEach((child) => child._destroy());
  };
  const sharedAPIDefinition = {
    element: {
      get: getElement
    },
    style: {
      get: getStyle
    },
    childViews: {
      get: getChildViews
    }
  };
  const internalAPIDefinition = {
    ...sharedAPIDefinition,
    rect: {
      get: getRect
    },
    ref: {
      get: getReference
    },
    is: (needle) => name2 === needle,
    appendChild: appendChild(element),
    createChildView: createChildView(store),
    linkView: (view) => {
      childViews.push(view);
      return view;
    },
    unlinkView: (view) => {
      childViews.splice(childViews.indexOf(view), 1);
    },
    appendChildView: appendChildView(element, childViews),
    removeChildView: removeChildView(element, childViews),
    registerWriter: (writer) => writers.push(writer),
    registerReader: (reader) => readers.push(reader),
    registerDestroyer: (destroyer) => destroyers.push(destroyer),
    invalidateLayout: () => element.layoutCalculated = false,
    dispatch: store.dispatch,
    query: store.query
  };
  const externalAPIDefinition = {
    element: {
      get: getElement
    },
    childViews: {
      get: getChildViews
    },
    rect: {
      get: getRect
    },
    resting: {
      get: () => isResting
    },
    isRectIgnored: () => ignoreRect,
    _read,
    _write,
    _destroy
  };
  const mixinAPIDefinition = {
    ...sharedAPIDefinition,
    rect: {
      get: () => rect
    }
  };
  Object.keys(mixins).sort((a, b) => {
    if (a === "styles") {
      return 1;
    } else if (b === "styles") {
      return -1;
    }
    return 0;
  }).forEach((key) => {
    const mixinAPI = Mixins[key]({
      mixinConfig: mixins[key],
      viewProps: props,
      viewState: state2,
      viewInternalAPI: internalAPIDefinition,
      viewExternalAPI: externalAPIDefinition,
      view: createObject(mixinAPIDefinition)
    });
    if (mixinAPI) {
      activeMixins.push(mixinAPI);
    }
  });
  const internalAPI = createObject(internalAPIDefinition);
  create2({
    root: internalAPI,
    props
  });
  const childCount = getChildCount(element);
  childViews.forEach((child, index) => {
    internalAPI.appendChild(child.element, childCount + index);
  });
  didCreateView(internalAPI);
  return createObject(externalAPIDefinition);
};
var createPainter = (read, write2, fps = 60) => {
  const name2 = "__framePainter";
  if (window[name2]) {
    window[name2].readers.push(read);
    window[name2].writers.push(write2);
    return;
  }
  window[name2] = {
    readers: [read],
    writers: [write2]
  };
  const painter = window[name2];
  const interval = 1e3 / fps;
  let last = null;
  let id = null;
  let requestTick = null;
  let cancelTick = null;
  const setTimerType = () => {
    if (document.hidden) {
      requestTick = () => window.setTimeout(() => tick(performance.now()), interval);
      cancelTick = () => window.clearTimeout(id);
    } else {
      requestTick = () => window.requestAnimationFrame(tick);
      cancelTick = () => window.cancelAnimationFrame(id);
    }
  };
  document.addEventListener("visibilitychange", () => {
    if (cancelTick)
      cancelTick();
    setTimerType();
    tick(performance.now());
  });
  const tick = (ts) => {
    id = requestTick(tick);
    if (!last) {
      last = ts;
    }
    const delta = ts - last;
    if (delta <= interval) {
      return;
    }
    last = ts - delta % interval;
    painter.readers.forEach((read2) => read2());
    painter.writers.forEach((write3) => write3(ts));
  };
  setTimerType();
  tick(performance.now());
  return {
    pause: () => {
      cancelTick(id);
    }
  };
};
var createRoute = (routes, fn2) => ({ root: root2, props, actions: actions2 = [], timestamp, shouldOptimize }) => {
  actions2.filter((action) => routes[action.type]).forEach((action) => routes[action.type]({ root: root2, props, action: action.data, timestamp, shouldOptimize }));
  if (fn2) {
    fn2({ root: root2, props, actions: actions2, timestamp, shouldOptimize });
  }
};
var insertBefore = (newNode, referenceNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode);
var insertAfter = (newNode, referenceNode) => {
  return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};
var isArray = (value) => Array.isArray(value);
var isEmpty = (value) => value == null;
var trim = (str) => str.trim();
var toString = (value) => "" + value;
var toArray = (value, splitter = ",") => {
  if (isEmpty(value)) {
    return [];
  }
  if (isArray(value)) {
    return value;
  }
  return toString(value).split(splitter).map(trim).filter((str) => str.length);
};
var isBoolean = (value) => typeof value === "boolean";
var toBoolean = (value) => isBoolean(value) ? value : value === "true";
var isString = (value) => typeof value === "string";
var toNumber = (value) => isNumber(value) ? value : isString(value) ? toString(value).replace(/[a-z]+/gi, "") : 0;
var toInt = (value) => parseInt(toNumber(value), 10);
var toFloat = (value) => parseFloat(toNumber(value));
var isInt = (value) => isNumber(value) && isFinite(value) && Math.floor(value) === value;
var toBytes = (value, base = 1e3) => {
  if (isInt(value)) {
    return value;
  }
  let naturalFileSize = toString(value).trim();
  if (/MB$/i.test(naturalFileSize)) {
    naturalFileSize = naturalFileSize.replace(/MB$i/, "").trim();
    return toInt(naturalFileSize) * base * base;
  }
  if (/KB/i.test(naturalFileSize)) {
    naturalFileSize = naturalFileSize.replace(/KB$i/, "").trim();
    return toInt(naturalFileSize) * base;
  }
  return toInt(naturalFileSize);
};
var isFunction = (value) => typeof value === "function";
var toFunctionReference = (string) => {
  let ref = self;
  let levels = string.split(".");
  let level = null;
  while (level = levels.shift()) {
    ref = ref[level];
    if (!ref) {
      return null;
    }
  }
  return ref;
};
var methods = {
  process: "POST",
  patch: "PATCH",
  revert: "DELETE",
  fetch: "GET",
  restore: "GET",
  load: "GET"
};
var createServerAPI = (outline) => {
  const api = {};
  api.url = isString(outline) ? outline : outline.url || "";
  api.timeout = outline.timeout ? parseInt(outline.timeout, 10) : 0;
  api.headers = outline.headers ? outline.headers : {};
  forin(methods, (key) => {
    api[key] = createAction(key, outline[key], methods[key], api.timeout, api.headers);
  });
  api.process = outline.process || isString(outline) || outline.url ? api.process : null;
  api.remove = outline.remove || null;
  delete api.headers;
  return api;
};
var createAction = (name2, outline, method, timeout, headers) => {
  if (outline === null) {
    return null;
  }
  if (typeof outline === "function") {
    return outline;
  }
  const action = {
    url: method === "GET" || method === "PATCH" ? `?${name2}=` : "",
    method,
    headers,
    withCredentials: false,
    timeout,
    onload: null,
    ondata: null,
    onerror: null
  };
  if (isString(outline)) {
    action.url = outline;
    return action;
  }
  Object.assign(action, outline);
  if (isString(action.headers)) {
    const parts = action.headers.split(/:(.+)/);
    action.headers = {
      header: parts[0],
      value: parts[1]
    };
  }
  action.withCredentials = toBoolean(action.withCredentials);
  return action;
};
var toServerAPI = (value) => createServerAPI(value);
var isNull = (value) => value === null;
var isObject = (value) => typeof value === "object" && value !== null;
var isAPI = (value) => {
  return isObject(value) && isString(value.url) && isObject(value.process) && isObject(value.revert) && isObject(value.restore) && isObject(value.fetch);
};
var getType = (value) => {
  if (isArray(value)) {
    return "array";
  }
  if (isNull(value)) {
    return "null";
  }
  if (isInt(value)) {
    return "int";
  }
  if (/^[0-9]+ ?(?:GB|MB|KB)$/gi.test(value)) {
    return "bytes";
  }
  if (isAPI(value)) {
    return "api";
  }
  return typeof value;
};
var replaceSingleQuotes = (str) => str.replace(/{\s*'/g, '{"').replace(/'\s*}/g, '"}').replace(/'\s*:/g, '":').replace(/:\s*'/g, ':"').replace(/,\s*'/g, ',"').replace(/'\s*,/g, '",');
var conversionTable = {
  array: toArray,
  boolean: toBoolean,
  int: (value) => getType(value) === "bytes" ? toBytes(value) : toInt(value),
  number: toFloat,
  float: toFloat,
  bytes: toBytes,
  string: (value) => isFunction(value) ? value : toString(value),
  function: (value) => toFunctionReference(value),
  serverapi: toServerAPI,
  object: (value) => {
    try {
      return JSON.parse(replaceSingleQuotes(value));
    } catch (e) {
      return null;
    }
  }
};
var convertTo = (value, type) => conversionTable[type](value);
var getValueByType = (newValue, defaultValue, valueType) => {
  if (newValue === defaultValue) {
    return newValue;
  }
  let newValueType = getType(newValue);
  if (newValueType !== valueType) {
    const convertedValue = convertTo(newValue, valueType);
    newValueType = getType(convertedValue);
    if (convertedValue === null) {
      throw `Trying to assign value with incorrect type to "${option}", allowed type: "${valueType}"`;
    } else {
      newValue = convertedValue;
    }
  }
  return newValue;
};
var createOption = (defaultValue, valueType) => {
  let currentValue = defaultValue;
  return {
    enumerable: true,
    get: () => currentValue,
    set: (newValue) => {
      currentValue = getValueByType(newValue, defaultValue, valueType);
    }
  };
};
var createOptions = (options) => {
  const obj = {};
  forin(options, (prop) => {
    const optionDefinition = options[prop];
    obj[prop] = createOption(optionDefinition[0], optionDefinition[1]);
  });
  return createObject(obj);
};
var createInitialState = (options) => ({
  items: [],
  listUpdateTimeout: null,
  itemUpdateTimeout: null,
  processingQueue: [],
  options: createOptions(options)
});
var fromCamels = (string, separator = "-") => string.split(/(?=[A-Z])/).map((part) => part.toLowerCase()).join(separator);
var createOptionAPI = (store, options) => {
  const obj = {};
  forin(options, (key) => {
    obj[key] = {
      get: () => store.getState().options[key],
      set: (value) => {
        store.dispatch(`SET_${fromCamels(key, "_").toUpperCase()}`, {
          value
        });
      }
    };
  });
  return obj;
};
var createOptionActions = (options) => (dispatch, query, state2) => {
  const obj = {};
  forin(options, (key) => {
    const name2 = fromCamels(key, "_").toUpperCase();
    obj[`SET_${name2}`] = (action) => {
      try {
        state2.options[key] = action.value;
      } catch (e) {
      }
      dispatch(`DID_SET_${name2}`, { value: state2.options[key] });
    };
  });
  return obj;
};
var createOptionQueries = (options) => (state2) => {
  const obj = {};
  forin(options, (key) => {
    obj[`GET_${fromCamels(key, "_").toUpperCase()}`] = (action) => state2.options[key];
  });
  return obj;
};
var InteractionMethod = {
  API: 1,
  DROP: 2,
  BROWSE: 3,
  PASTE: 4,
  NONE: 5
};
var getUniqueId = () => Math.random().toString(36).substr(2, 9);
var arrayRemove = (arr, index) => arr.splice(index, 1);
var run = (cb, sync) => {
  if (sync) {
    cb();
  } else if (document.hidden) {
    Promise.resolve(1).then(cb);
  } else {
    setTimeout(cb, 0);
  }
};
var on = () => {
  const listeners2 = [];
  const off = (event, cb) => {
    arrayRemove(listeners2, listeners2.findIndex((listener) => listener.event === event && (listener.cb === cb || !cb)));
  };
  const fire = (event, args, sync) => {
    listeners2.filter((listener) => listener.event === event).map((listener) => listener.cb).forEach((cb) => run(() => cb(...args), sync));
  };
  return {
    fireSync: (event, ...args) => {
      fire(event, args, true);
    },
    fire: (event, ...args) => {
      fire(event, args, false);
    },
    on: (event, cb) => {
      listeners2.push({ event, cb });
    },
    onOnce: (event, cb) => {
      listeners2.push({
        event,
        cb: (...args) => {
          off(event, cb);
          cb(...args);
        }
      });
    },
    off
  };
};
var copyObjectPropertiesToObject = (src, target, excluded) => {
  Object.getOwnPropertyNames(src).filter((property) => !excluded.includes(property)).forEach((key) => Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(src, key)));
};
var PRIVATE = [
  "fire",
  "process",
  "revert",
  "load",
  "on",
  "off",
  "onOnce",
  "retryLoad",
  "extend",
  "archive",
  "archived",
  "release",
  "released",
  "requestProcessing",
  "freeze"
];
var createItemAPI = (item2) => {
  const api = {};
  copyObjectPropertiesToObject(item2, api, PRIVATE);
  return api;
};
var removeReleasedItems = (items) => {
  items.forEach((item2, index) => {
    if (item2.released) {
      arrayRemove(items, index);
    }
  });
};
var ItemStatus = {
  INIT: 1,
  IDLE: 2,
  PROCESSING_QUEUED: 9,
  PROCESSING: 3,
  PROCESSING_COMPLETE: 5,
  PROCESSING_ERROR: 6,
  PROCESSING_REVERT_ERROR: 10,
  LOADING: 7,
  LOAD_ERROR: 8
};
var FileOrigin = {
  INPUT: 1,
  LIMBO: 2,
  LOCAL: 3
};
var getNonNumeric = (str) => /[^0-9]+/.exec(str);
var getDecimalSeparator = () => getNonNumeric(1.1 .toLocaleString())[0];
var getThousandsSeparator = () => {
  const decimalSeparator = getDecimalSeparator();
  const thousandsStringWithSeparator = 1e3 .toLocaleString();
  const thousandsStringWithoutSeparator = 1e3 .toString();
  if (thousandsStringWithSeparator !== thousandsStringWithoutSeparator) {
    return getNonNumeric(thousandsStringWithSeparator)[0];
  }
  return decimalSeparator === "." ? "," : ".";
};
var Type = {
  BOOLEAN: "boolean",
  INT: "int",
  NUMBER: "number",
  STRING: "string",
  ARRAY: "array",
  OBJECT: "object",
  FUNCTION: "function",
  ACTION: "action",
  SERVER_API: "serverapi",
  REGEX: "regex"
};
var filters = [];
var applyFilterChain = (key, value, utils) => new Promise((resolve, reject) => {
  const matchingFilters = filters.filter((f) => f.key === key).map((f) => f.cb);
  if (matchingFilters.length === 0) {
    resolve(value);
    return;
  }
  const initialFilter = matchingFilters.shift();
  matchingFilters.reduce((current, next) => current.then((value2) => next(value2, utils)), initialFilter(value, utils)).then((value2) => resolve(value2)).catch((error2) => reject(error2));
});
var applyFilters = (key, value, utils) => filters.filter((f) => f.key === key).map((f) => f.cb(value, utils));
var addFilter = (key, cb) => filters.push({ key, cb });
var extendDefaultOptions = (additionalOptions) => Object.assign(defaultOptions, additionalOptions);
var getOptions = () => ({ ...defaultOptions });
var setOptions = (opts) => {
  forin(opts, (key, value) => {
    if (!defaultOptions[key]) {
      return;
    }
    defaultOptions[key][0] = getValueByType(value, defaultOptions[key][0], defaultOptions[key][1]);
  });
};
var defaultOptions = {
  id: [null, Type.STRING],
  name: ["filepond", Type.STRING],
  disabled: [false, Type.BOOLEAN],
  className: [null, Type.STRING],
  required: [false, Type.BOOLEAN],
  captureMethod: [null, Type.STRING],
  allowSyncAcceptAttribute: [true, Type.BOOLEAN],
  allowDrop: [true, Type.BOOLEAN],
  allowBrowse: [true, Type.BOOLEAN],
  allowPaste: [true, Type.BOOLEAN],
  allowMultiple: [false, Type.BOOLEAN],
  allowReplace: [true, Type.BOOLEAN],
  allowRevert: [true, Type.BOOLEAN],
  allowRemove: [true, Type.BOOLEAN],
  allowProcess: [true, Type.BOOLEAN],
  allowReorder: [false, Type.BOOLEAN],
  allowDirectoriesOnly: [false, Type.BOOLEAN],
  storeAsFile: [false, Type.BOOLEAN],
  forceRevert: [false, Type.BOOLEAN],
  maxFiles: [null, Type.INT],
  checkValidity: [false, Type.BOOLEAN],
  itemInsertLocationFreedom: [true, Type.BOOLEAN],
  itemInsertLocation: ["before", Type.STRING],
  itemInsertInterval: [75, Type.INT],
  dropOnPage: [false, Type.BOOLEAN],
  dropOnElement: [true, Type.BOOLEAN],
  dropValidation: [false, Type.BOOLEAN],
  ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], Type.ARRAY],
  instantUpload: [true, Type.BOOLEAN],
  maxParallelUploads: [2, Type.INT],
  allowMinimumUploadDuration: [true, Type.BOOLEAN],
  chunkUploads: [false, Type.BOOLEAN],
  chunkForce: [false, Type.BOOLEAN],
  chunkSize: [5e6, Type.INT],
  chunkRetryDelays: [[500, 1e3, 3e3], Type.ARRAY],
  server: [null, Type.SERVER_API],
  fileSizeBase: [1e3, Type.INT],
  labelDecimalSeparator: [getDecimalSeparator(), Type.STRING],
  labelThousandsSeparator: [getThousandsSeparator(), Type.STRING],
  labelIdle: [
    'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
    Type.STRING
  ],
  labelInvalidField: ["Field contains invalid files", Type.STRING],
  labelFileWaitingForSize: ["Waiting for size", Type.STRING],
  labelFileSizeNotAvailable: ["Size not available", Type.STRING],
  labelFileCountSingular: ["file in list", Type.STRING],
  labelFileCountPlural: ["files in list", Type.STRING],
  labelFileLoading: ["Loading", Type.STRING],
  labelFileAdded: ["Added", Type.STRING],
  labelFileLoadError: ["Error during load", Type.STRING],
  labelFileRemoved: ["Removed", Type.STRING],
  labelFileRemoveError: ["Error during remove", Type.STRING],
  labelFileProcessing: ["Uploading", Type.STRING],
  labelFileProcessingComplete: ["Upload complete", Type.STRING],
  labelFileProcessingAborted: ["Upload cancelled", Type.STRING],
  labelFileProcessingError: ["Error during upload", Type.STRING],
  labelFileProcessingRevertError: ["Error during revert", Type.STRING],
  labelTapToCancel: ["tap to cancel", Type.STRING],
  labelTapToRetry: ["tap to retry", Type.STRING],
  labelTapToUndo: ["tap to undo", Type.STRING],
  labelButtonRemoveItem: ["Remove", Type.STRING],
  labelButtonAbortItemLoad: ["Abort", Type.STRING],
  labelButtonRetryItemLoad: ["Retry", Type.STRING],
  labelButtonAbortItemProcessing: ["Cancel", Type.STRING],
  labelButtonUndoItemProcessing: ["Undo", Type.STRING],
  labelButtonRetryItemProcessing: ["Retry", Type.STRING],
  labelButtonProcessItem: ["Upload", Type.STRING],
  iconRemove: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>',
    Type.STRING
  ],
  iconProcess: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>',
    Type.STRING
  ],
  iconRetry: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>',
    Type.STRING
  ],
  iconUndo: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>',
    Type.STRING
  ],
  iconDone: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>',
    Type.STRING
  ],
  oninit: [null, Type.FUNCTION],
  onwarning: [null, Type.FUNCTION],
  onerror: [null, Type.FUNCTION],
  onactivatefile: [null, Type.FUNCTION],
  oninitfile: [null, Type.FUNCTION],
  onaddfilestart: [null, Type.FUNCTION],
  onaddfileprogress: [null, Type.FUNCTION],
  onaddfile: [null, Type.FUNCTION],
  onprocessfilestart: [null, Type.FUNCTION],
  onprocessfileprogress: [null, Type.FUNCTION],
  onprocessfileabort: [null, Type.FUNCTION],
  onprocessfilerevert: [null, Type.FUNCTION],
  onprocessfile: [null, Type.FUNCTION],
  onprocessfiles: [null, Type.FUNCTION],
  onremovefile: [null, Type.FUNCTION],
  onpreparefile: [null, Type.FUNCTION],
  onupdatefiles: [null, Type.FUNCTION],
  onreorderfiles: [null, Type.FUNCTION],
  beforeDropFile: [null, Type.FUNCTION],
  beforeAddFile: [null, Type.FUNCTION],
  beforeRemoveFile: [null, Type.FUNCTION],
  beforePrepareFile: [null, Type.FUNCTION],
  stylePanelLayout: [null, Type.STRING],
  stylePanelAspectRatio: [null, Type.STRING],
  styleItemPanelAspectRatio: [null, Type.STRING],
  styleButtonRemoveItemPosition: ["left", Type.STRING],
  styleButtonProcessItemPosition: ["right", Type.STRING],
  styleLoadIndicatorPosition: ["right", Type.STRING],
  styleProgressIndicatorPosition: ["right", Type.STRING],
  styleButtonRemoveItemAlign: [false, Type.BOOLEAN],
  files: [[], Type.ARRAY],
  credits: [["https://pqina.nl/", "Powered by PQINA"], Type.ARRAY]
};
var getItemByQuery = (items, query) => {
  if (isEmpty(query)) {
    return items[0] || null;
  }
  if (isInt(query)) {
    return items[query] || null;
  }
  if (typeof query === "object") {
    query = query.id;
  }
  return items.find((item2) => item2.id === query) || null;
};
var getNumericAspectRatioFromString = (aspectRatio) => {
  if (isEmpty(aspectRatio)) {
    return aspectRatio;
  }
  if (/:/.test(aspectRatio)) {
    const parts = aspectRatio.split(":");
    return parts[1] / parts[0];
  }
  return parseFloat(aspectRatio);
};
var getActiveItems = (items) => items.filter((item2) => !item2.archived);
var Status = {
  EMPTY: 0,
  IDLE: 1,
  ERROR: 2,
  BUSY: 3,
  READY: 4
};
var res = null;
var canUpdateFileInput = () => {
  if (res === null) {
    try {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(new File(["hello world"], "This_Works.txt"));
      const el = document.createElement("input");
      el.setAttribute("type", "file");
      el.files = dataTransfer.files;
      res = el.files.length === 1;
    } catch (err) {
      res = false;
    }
  }
  return res;
};
var ITEM_ERROR = [
  ItemStatus.LOAD_ERROR,
  ItemStatus.PROCESSING_ERROR,
  ItemStatus.PROCESSING_REVERT_ERROR
];
var ITEM_BUSY = [
  ItemStatus.LOADING,
  ItemStatus.PROCESSING,
  ItemStatus.PROCESSING_QUEUED,
  ItemStatus.INIT
];
var ITEM_READY = [ItemStatus.PROCESSING_COMPLETE];
var isItemInErrorState = (item2) => ITEM_ERROR.includes(item2.status);
var isItemInBusyState = (item2) => ITEM_BUSY.includes(item2.status);
var isItemInReadyState = (item2) => ITEM_READY.includes(item2.status);
var isAsync = (state2) => isObject(state2.options.server) && (isObject(state2.options.server.process) || isFunction(state2.options.server.process));
var queries = (state2) => ({
  GET_STATUS: () => {
    const items = getActiveItems(state2.items);
    const { EMPTY, ERROR, BUSY, IDLE, READY } = Status;
    if (items.length === 0)
      return EMPTY;
    if (items.some(isItemInErrorState))
      return ERROR;
    if (items.some(isItemInBusyState))
      return BUSY;
    if (items.some(isItemInReadyState))
      return READY;
    return IDLE;
  },
  GET_ITEM: (query) => getItemByQuery(state2.items, query),
  GET_ACTIVE_ITEM: (query) => getItemByQuery(getActiveItems(state2.items), query),
  GET_ACTIVE_ITEMS: () => getActiveItems(state2.items),
  GET_ITEMS: () => state2.items,
  GET_ITEM_NAME: (query) => {
    const item2 = getItemByQuery(state2.items, query);
    return item2 ? item2.filename : null;
  },
  GET_ITEM_SIZE: (query) => {
    const item2 = getItemByQuery(state2.items, query);
    return item2 ? item2.fileSize : null;
  },
  GET_STYLES: () => Object.keys(state2.options).filter((key) => /^style/.test(key)).map((option2) => ({
    name: option2,
    value: state2.options[option2]
  })),
  GET_PANEL_ASPECT_RATIO: () => {
    const isShapeCircle = /circle/.test(state2.options.stylePanelLayout);
    const aspectRatio = isShapeCircle ? 1 : getNumericAspectRatioFromString(state2.options.stylePanelAspectRatio);
    return aspectRatio;
  },
  GET_ITEM_PANEL_ASPECT_RATIO: () => state2.options.styleItemPanelAspectRatio,
  GET_ITEMS_BY_STATUS: (status) => getActiveItems(state2.items).filter((item2) => item2.status === status),
  GET_TOTAL_ITEMS: () => getActiveItems(state2.items).length,
  SHOULD_UPDATE_FILE_INPUT: () => state2.options.storeAsFile && canUpdateFileInput() && !isAsync(state2),
  IS_ASYNC: () => isAsync(state2)
});
var hasRoomForItem = (state2) => {
  const count = getActiveItems(state2.items).length;
  if (!state2.options.allowMultiple) {
    return count === 0;
  }
  const maxFileCount = state2.options.maxFiles;
  if (maxFileCount === null) {
    return true;
  }
  if (count < maxFileCount) {
    return true;
  }
  return false;
};
var limit = (value, min, max) => Math.max(Math.min(max, value), min);
var arrayInsert = (arr, index, item2) => arr.splice(index, 0, item2);
var insertItem = (items, item2, index) => {
  if (isEmpty(item2)) {
    return null;
  }
  if (typeof index === "undefined") {
    items.push(item2);
    return item2;
  }
  index = limit(index, 0, items.length);
  arrayInsert(items, index, item2);
  return item2;
};
var isBase64DataURI = (str) => /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(str);
var getFilenameFromURL = (url) => url.split("/").pop().split("?").shift();
var getExtensionFromFilename = (name2) => name2.split(".").pop();
var guesstimateExtension = (type) => {
  if (typeof type !== "string") {
    return "";
  }
  const subtype = type.split("/").pop();
  if (/svg/.test(subtype)) {
    return "svg";
  }
  if (/zip|compressed/.test(subtype)) {
    return "zip";
  }
  if (/plain/.test(subtype)) {
    return "txt";
  }
  if (/msword/.test(subtype)) {
    return "doc";
  }
  if (/[a-z]+/.test(subtype)) {
    if (subtype === "jpeg") {
      return "jpg";
    }
    return subtype;
  }
  return "";
};
var leftPad = (value, padding = "") => (padding + value).slice(-padding.length);
var getDateString = (date = new Date()) => `${date.getFullYear()}-${leftPad(date.getMonth() + 1, "00")}-${leftPad(date.getDate(), "00")}_${leftPad(date.getHours(), "00")}-${leftPad(date.getMinutes(), "00")}-${leftPad(date.getSeconds(), "00")}`;
var getFileFromBlob = (blob2, filename, type = null, extension = null) => {
  const file2 = typeof type === "string" ? blob2.slice(0, blob2.size, type) : blob2.slice(0, blob2.size, blob2.type);
  file2.lastModifiedDate = new Date();
  if (blob2._relativePath)
    file2._relativePath = blob2._relativePath;
  if (!isString(filename)) {
    filename = getDateString();
  }
  if (filename && extension === null && getExtensionFromFilename(filename)) {
    file2.name = filename;
  } else {
    extension = extension || guesstimateExtension(file2.type);
    file2.name = filename + (extension ? "." + extension : "");
  }
  return file2;
};
var getBlobBuilder = () => {
  return window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
};
var createBlob = (arrayBuffer, mimeType) => {
  const BB = getBlobBuilder();
  if (BB) {
    const bb = new BB();
    bb.append(arrayBuffer);
    return bb.getBlob(mimeType);
  }
  return new Blob([arrayBuffer], {
    type: mimeType
  });
};
var getBlobFromByteStringWithMimeType = (byteString, mimeType) => {
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return createBlob(ab, mimeType);
};
var getMimeTypeFromBase64DataURI = (dataURI) => {
  return (/^data:(.+);/.exec(dataURI) || [])[1] || null;
};
var getBase64DataFromBase64DataURI = (dataURI) => {
  const data3 = dataURI.split(",")[1];
  return data3.replace(/\s/g, "");
};
var getByteStringFromBase64DataURI = (dataURI) => {
  return atob(getBase64DataFromBase64DataURI(dataURI));
};
var getBlobFromBase64DataURI = (dataURI) => {
  const mimeType = getMimeTypeFromBase64DataURI(dataURI);
  const byteString = getByteStringFromBase64DataURI(dataURI);
  return getBlobFromByteStringWithMimeType(byteString, mimeType);
};
var getFileFromBase64DataURI = (dataURI, filename, extension) => {
  return getFileFromBlob(getBlobFromBase64DataURI(dataURI), filename, null, extension);
};
var getFileNameFromHeader = (header) => {
  if (!/^content-disposition:/i.test(header))
    return null;
  const matches = header.split(/filename=|filename\*=.+''/).splice(1).map((name2) => name2.trim().replace(/^["']|[;"']{0,2}$/g, "")).filter((name2) => name2.length);
  return matches.length ? decodeURI(matches[matches.length - 1]) : null;
};
var getFileSizeFromHeader = (header) => {
  if (/content-length:/i.test(header)) {
    const size = header.match(/[0-9]+/)[0];
    return size ? parseInt(size, 10) : null;
  }
  return null;
};
var getTranfserIdFromHeader = (header) => {
  if (/x-content-transfer-id:/i.test(header)) {
    const id = (header.split(":")[1] || "").trim();
    return id || null;
  }
  return null;
};
var getFileInfoFromHeaders = (headers) => {
  const info = {
    source: null,
    name: null,
    size: null
  };
  const rows = headers.split("\n");
  for (let header of rows) {
    const name2 = getFileNameFromHeader(header);
    if (name2) {
      info.name = name2;
      continue;
    }
    const size = getFileSizeFromHeader(header);
    if (size) {
      info.size = size;
      continue;
    }
    const source = getTranfserIdFromHeader(header);
    if (source) {
      info.source = source;
      continue;
    }
  }
  return info;
};
var createFileLoader = (fetchFn) => {
  const state2 = {
    source: null,
    complete: false,
    progress: 0,
    size: null,
    timestamp: null,
    duration: 0,
    request: null
  };
  const getProgress = () => state2.progress;
  const abort = () => {
    if (state2.request && state2.request.abort) {
      state2.request.abort();
    }
  };
  const load = () => {
    const source = state2.source;
    api.fire("init", source);
    if (source instanceof File) {
      api.fire("load", source);
    } else if (source instanceof Blob) {
      api.fire("load", getFileFromBlob(source, source.name));
    } else if (isBase64DataURI(source)) {
      api.fire("load", getFileFromBase64DataURI(source));
    } else {
      loadURL(source);
    }
  };
  const loadURL = (url) => {
    if (!fetchFn) {
      api.fire("error", {
        type: "error",
        body: "Can't load URL",
        code: 400
      });
      return;
    }
    state2.timestamp = Date.now();
    state2.request = fetchFn(url, (response) => {
      state2.duration = Date.now() - state2.timestamp;
      state2.complete = true;
      if (response instanceof Blob) {
        response = getFileFromBlob(response, response.name || getFilenameFromURL(url));
      }
      api.fire("load", response instanceof Blob ? response : response ? response.body : null);
    }, (error2) => {
      api.fire("error", typeof error2 === "string" ? {
        type: "error",
        code: 0,
        body: error2
      } : error2);
    }, (computable, current, total) => {
      if (total) {
        state2.size = total;
      }
      state2.duration = Date.now() - state2.timestamp;
      if (!computable) {
        state2.progress = null;
        return;
      }
      state2.progress = current / total;
      api.fire("progress", state2.progress);
    }, () => {
      api.fire("abort");
    }, (response) => {
      const fileinfo = getFileInfoFromHeaders(typeof response === "string" ? response : response.headers);
      api.fire("meta", {
        size: state2.size || fileinfo.size,
        filename: fileinfo.name,
        source: fileinfo.source
      });
    });
  };
  const api = {
    ...on(),
    setSource: (source) => state2.source = source,
    getProgress,
    abort,
    load
  };
  return api;
};
var isGet = (method) => /GET|HEAD/.test(method);
var sendRequest = (data3, url, options) => {
  const api = {
    onheaders: () => {
    },
    onprogress: () => {
    },
    onload: () => {
    },
    ontimeout: () => {
    },
    onerror: () => {
    },
    onabort: () => {
    },
    abort: () => {
      aborted = true;
      xhr.abort();
    }
  };
  let aborted = false;
  let headersReceived = false;
  options = {
    method: "POST",
    headers: {},
    withCredentials: false,
    ...options
  };
  url = encodeURI(url);
  if (isGet(options.method) && data3) {
    url = `${url}${encodeURIComponent(typeof data3 === "string" ? data3 : JSON.stringify(data3))}`;
  }
  const xhr = new XMLHttpRequest();
  const process = isGet(options.method) ? xhr : xhr.upload;
  process.onprogress = (e) => {
    if (aborted) {
      return;
    }
    api.onprogress(e.lengthComputable, e.loaded, e.total);
  };
  xhr.onreadystatechange = () => {
    if (xhr.readyState < 2) {
      return;
    }
    if (xhr.readyState === 4 && xhr.status === 0) {
      return;
    }
    if (headersReceived) {
      return;
    }
    headersReceived = true;
    api.onheaders(xhr);
  };
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      api.onload(xhr);
    } else {
      api.onerror(xhr);
    }
  };
  xhr.onerror = () => api.onerror(xhr);
  xhr.onabort = () => {
    aborted = true;
    api.onabort();
  };
  xhr.ontimeout = () => api.ontimeout(xhr);
  xhr.open(options.method, url, true);
  if (isInt(options.timeout)) {
    xhr.timeout = options.timeout;
  }
  Object.keys(options.headers).forEach((key) => {
    const value = unescape(encodeURIComponent(options.headers[key]));
    xhr.setRequestHeader(key, value);
  });
  if (options.responseType) {
    xhr.responseType = options.responseType;
  }
  if (options.withCredentials) {
    xhr.withCredentials = true;
  }
  xhr.send(data3);
  return api;
};
var createResponse = (type, code, body, headers) => ({
  type,
  code,
  body,
  headers
});
var createTimeoutResponse = (cb) => (xhr) => {
  cb(createResponse("error", 0, "Timeout", xhr.getAllResponseHeaders()));
};
var hasQS = (str) => /\?/.test(str);
var buildURL = (...parts) => {
  let url = "";
  parts.forEach((part) => {
    url += hasQS(url) && hasQS(part) ? part.replace(/\?/, "&") : part;
  });
  return url;
};
var createFetchFunction = (apiUrl = "", action) => {
  if (typeof action === "function") {
    return action;
  }
  if (!action || !isString(action.url)) {
    return null;
  }
  const onload = action.onload || ((res2) => res2);
  const onerror = action.onerror || ((res2) => null);
  return (url, load, error2, progress, abort, headers) => {
    const request = sendRequest(url, buildURL(apiUrl, action.url), {
      ...action,
      responseType: "blob"
    });
    request.onload = (xhr) => {
      const headers2 = xhr.getAllResponseHeaders();
      const filename = getFileInfoFromHeaders(headers2).name || getFilenameFromURL(url);
      load(createResponse("load", xhr.status, action.method === "HEAD" ? null : getFileFromBlob(onload(xhr.response), filename), headers2));
    };
    request.onerror = (xhr) => {
      error2(createResponse("error", xhr.status, onerror(xhr.response) || xhr.statusText, xhr.getAllResponseHeaders()));
    };
    request.onheaders = (xhr) => {
      headers(createResponse("headers", xhr.status, null, xhr.getAllResponseHeaders()));
    };
    request.ontimeout = createTimeoutResponse(error2);
    request.onprogress = progress;
    request.onabort = abort;
    return request;
  };
};
var ChunkStatus = {
  QUEUED: 0,
  COMPLETE: 1,
  PROCESSING: 2,
  ERROR: 3,
  WAITING: 4
};
var processFileChunked = (apiUrl, action, name2, file2, metadata, load, error2, progress, abort, transfer, options) => {
  const chunks = [];
  const { chunkTransferId, chunkServer, chunkSize, chunkRetryDelays } = options;
  const state2 = {
    serverId: chunkTransferId,
    aborted: false
  };
  const ondata = action.ondata || ((fd) => fd);
  const onload = action.onload || ((xhr, method) => method === "HEAD" ? xhr.getResponseHeader("Upload-Offset") : xhr.response);
  const onerror = action.onerror || ((res2) => null);
  const requestTransferId = (cb) => {
    const formData = new FormData();
    if (isObject(metadata))
      formData.append(name2, JSON.stringify(metadata));
    const headers = typeof action.headers === "function" ? action.headers(file2, metadata) : {
      ...action.headers,
      "Upload-Length": file2.size
    };
    const requestParams = {
      ...action,
      headers
    };
    const request = sendRequest(ondata(formData), buildURL(apiUrl, action.url), requestParams);
    request.onload = (xhr) => cb(onload(xhr, requestParams.method));
    request.onerror = (xhr) => error2(createResponse("error", xhr.status, onerror(xhr.response) || xhr.statusText, xhr.getAllResponseHeaders()));
    request.ontimeout = createTimeoutResponse(error2);
  };
  const requestTransferOffset = (cb) => {
    const requestUrl = buildURL(apiUrl, chunkServer.url, state2.serverId);
    const headers = typeof action.headers === "function" ? action.headers(state2.serverId) : {
      ...action.headers
    };
    const requestParams = {
      headers,
      method: "HEAD"
    };
    const request = sendRequest(null, requestUrl, requestParams);
    request.onload = (xhr) => cb(onload(xhr, requestParams.method));
    request.onerror = (xhr) => error2(createResponse("error", xhr.status, onerror(xhr.response) || xhr.statusText, xhr.getAllResponseHeaders()));
    request.ontimeout = createTimeoutResponse(error2);
  };
  const lastChunkIndex = Math.floor(file2.size / chunkSize);
  for (let i = 0; i <= lastChunkIndex; i++) {
    const offset = i * chunkSize;
    const data3 = file2.slice(offset, offset + chunkSize, "application/offset+octet-stream");
    chunks[i] = {
      index: i,
      size: data3.size,
      offset,
      data: data3,
      file: file2,
      progress: 0,
      retries: [...chunkRetryDelays],
      status: ChunkStatus.QUEUED,
      error: null,
      request: null,
      timeout: null
    };
  }
  const completeProcessingChunks = () => load(state2.serverId);
  const canProcessChunk = (chunk) => chunk.status === ChunkStatus.QUEUED || chunk.status === ChunkStatus.ERROR;
  const processChunk = (chunk) => {
    if (state2.aborted)
      return;
    chunk = chunk || chunks.find(canProcessChunk);
    if (!chunk) {
      if (chunks.every((chunk2) => chunk2.status === ChunkStatus.COMPLETE)) {
        completeProcessingChunks();
      }
      return;
    }
    chunk.status = ChunkStatus.PROCESSING;
    chunk.progress = null;
    const ondata2 = chunkServer.ondata || ((fd) => fd);
    const onerror2 = chunkServer.onerror || ((res2) => null);
    const requestUrl = buildURL(apiUrl, chunkServer.url, state2.serverId);
    const headers = typeof chunkServer.headers === "function" ? chunkServer.headers(chunk) : {
      ...chunkServer.headers,
      "Content-Type": "application/offset+octet-stream",
      "Upload-Offset": chunk.offset,
      "Upload-Length": file2.size,
      "Upload-Name": file2.name
    };
    const request = chunk.request = sendRequest(ondata2(chunk.data), requestUrl, {
      ...chunkServer,
      headers
    });
    request.onload = () => {
      chunk.status = ChunkStatus.COMPLETE;
      chunk.request = null;
      processChunks();
    };
    request.onprogress = (lengthComputable, loaded, total) => {
      chunk.progress = lengthComputable ? loaded : null;
      updateTotalProgress();
    };
    request.onerror = (xhr) => {
      chunk.status = ChunkStatus.ERROR;
      chunk.request = null;
      chunk.error = onerror2(xhr.response) || xhr.statusText;
      if (!retryProcessChunk(chunk)) {
        error2(createResponse("error", xhr.status, onerror2(xhr.response) || xhr.statusText, xhr.getAllResponseHeaders()));
      }
    };
    request.ontimeout = (xhr) => {
      chunk.status = ChunkStatus.ERROR;
      chunk.request = null;
      if (!retryProcessChunk(chunk)) {
        createTimeoutResponse(error2)(xhr);
      }
    };
    request.onabort = () => {
      chunk.status = ChunkStatus.QUEUED;
      chunk.request = null;
      abort();
    };
  };
  const retryProcessChunk = (chunk) => {
    if (chunk.retries.length === 0)
      return false;
    chunk.status = ChunkStatus.WAITING;
    clearTimeout(chunk.timeout);
    chunk.timeout = setTimeout(() => {
      processChunk(chunk);
    }, chunk.retries.shift());
    return true;
  };
  const updateTotalProgress = () => {
    const totalBytesTransfered = chunks.reduce((p, chunk) => {
      if (p === null || chunk.progress === null)
        return null;
      return p + chunk.progress;
    }, 0);
    if (totalBytesTransfered === null)
      return progress(false, 0, 0);
    const totalSize = chunks.reduce((total, chunk) => total + chunk.size, 0);
    progress(true, totalBytesTransfered, totalSize);
  };
  const processChunks = () => {
    const totalProcessing = chunks.filter((chunk) => chunk.status === ChunkStatus.PROCESSING).length;
    if (totalProcessing >= 1)
      return;
    processChunk();
  };
  const abortChunks = () => {
    chunks.forEach((chunk) => {
      clearTimeout(chunk.timeout);
      if (chunk.request) {
        chunk.request.abort();
      }
    });
  };
  if (!state2.serverId) {
    requestTransferId((serverId) => {
      if (state2.aborted)
        return;
      transfer(serverId);
      state2.serverId = serverId;
      processChunks();
    });
  } else {
    requestTransferOffset((offset) => {
      if (state2.aborted)
        return;
      chunks.filter((chunk) => chunk.offset < offset).forEach((chunk) => {
        chunk.status = ChunkStatus.COMPLETE;
        chunk.progress = chunk.size;
      });
      processChunks();
    });
  }
  return {
    abort: () => {
      state2.aborted = true;
      abortChunks();
    }
  };
};
var createFileProcessorFunction = (apiUrl, action, name2, options) => (file2, metadata, load, error2, progress, abort, transfer) => {
  if (!file2)
    return;
  const canChunkUpload = options.chunkUploads;
  const shouldChunkUpload = canChunkUpload && file2.size > options.chunkSize;
  const willChunkUpload = canChunkUpload && (shouldChunkUpload || options.chunkForce);
  if (file2 instanceof Blob && willChunkUpload)
    return processFileChunked(apiUrl, action, name2, file2, metadata, load, error2, progress, abort, transfer, options);
  const ondata = action.ondata || ((fd) => fd);
  const onload = action.onload || ((res2) => res2);
  const onerror = action.onerror || ((res2) => null);
  const headers = typeof action.headers === "function" ? action.headers(file2, metadata) || {} : {
    ...action.headers
  };
  const requestParams = {
    ...action,
    headers
  };
  var formData = new FormData();
  if (isObject(metadata)) {
    formData.append(name2, JSON.stringify(metadata));
  }
  (file2 instanceof Blob ? [{ name: null, file: file2 }] : file2).forEach((item2) => {
    formData.append(name2, item2.file, item2.name === null ? item2.file.name : `${item2.name}${item2.file.name}`);
  });
  const request = sendRequest(ondata(formData), buildURL(apiUrl, action.url), requestParams);
  request.onload = (xhr) => {
    load(createResponse("load", xhr.status, onload(xhr.response), xhr.getAllResponseHeaders()));
  };
  request.onerror = (xhr) => {
    error2(createResponse("error", xhr.status, onerror(xhr.response) || xhr.statusText, xhr.getAllResponseHeaders()));
  };
  request.ontimeout = createTimeoutResponse(error2);
  request.onprogress = progress;
  request.onabort = abort;
  return request;
};
var createProcessorFunction = (apiUrl = "", action, name2, options) => {
  if (typeof action === "function")
    return (...params) => action(name2, ...params, options);
  if (!action || !isString(action.url))
    return null;
  return createFileProcessorFunction(apiUrl, action, name2, options);
};
var createRevertFunction = (apiUrl = "", action) => {
  if (typeof action === "function") {
    return action;
  }
  if (!action || !isString(action.url)) {
    return (uniqueFileId, load) => load();
  }
  const onload = action.onload || ((res2) => res2);
  const onerror = action.onerror || ((res2) => null);
  return (uniqueFileId, load, error2) => {
    const request = sendRequest(uniqueFileId, apiUrl + action.url, action);
    request.onload = (xhr) => {
      load(createResponse("load", xhr.status, onload(xhr.response), xhr.getAllResponseHeaders()));
    };
    request.onerror = (xhr) => {
      error2(createResponse("error", xhr.status, onerror(xhr.response) || xhr.statusText, xhr.getAllResponseHeaders()));
    };
    request.ontimeout = createTimeoutResponse(error2);
    return request;
  };
};
var getRandomNumber = (min = 0, max = 1) => min + Math.random() * (max - min);
var createPerceivedPerformanceUpdater = (cb, duration = 1e3, offset = 0, tickMin = 25, tickMax = 250) => {
  let timeout = null;
  const start = Date.now();
  const tick = () => {
    let runtime = Date.now() - start;
    let delay = getRandomNumber(tickMin, tickMax);
    if (runtime + delay > duration) {
      delay = runtime + delay - duration;
    }
    let progress = runtime / duration;
    if (progress >= 1 || document.hidden) {
      cb(1);
      return;
    }
    cb(progress);
    timeout = setTimeout(tick, delay);
  };
  if (duration > 0)
    tick();
  return {
    clear: () => {
      clearTimeout(timeout);
    }
  };
};
var createFileProcessor = (processFn, options) => {
  const state2 = {
    complete: false,
    perceivedProgress: 0,
    perceivedPerformanceUpdater: null,
    progress: null,
    timestamp: null,
    perceivedDuration: 0,
    duration: 0,
    request: null,
    response: null
  };
  const { allowMinimumUploadDuration } = options;
  const process = (file2, metadata) => {
    const progressFn = () => {
      if (state2.duration === 0 || state2.progress === null)
        return;
      api.fire("progress", api.getProgress());
    };
    const completeFn = () => {
      state2.complete = true;
      api.fire("load-perceived", state2.response.body);
    };
    api.fire("start");
    state2.timestamp = Date.now();
    state2.perceivedPerformanceUpdater = createPerceivedPerformanceUpdater((progress) => {
      state2.perceivedProgress = progress;
      state2.perceivedDuration = Date.now() - state2.timestamp;
      progressFn();
      if (state2.response && state2.perceivedProgress === 1 && !state2.complete) {
        completeFn();
      }
    }, allowMinimumUploadDuration ? getRandomNumber(750, 1500) : 0);
    state2.request = processFn(file2, metadata, (response) => {
      state2.response = isObject(response) ? response : {
        type: "load",
        code: 200,
        body: `${response}`,
        headers: {}
      };
      state2.duration = Date.now() - state2.timestamp;
      state2.progress = 1;
      api.fire("load", state2.response.body);
      if (!allowMinimumUploadDuration || allowMinimumUploadDuration && state2.perceivedProgress === 1) {
        completeFn();
      }
    }, (error2) => {
      state2.perceivedPerformanceUpdater.clear();
      api.fire("error", isObject(error2) ? error2 : {
        type: "error",
        code: 0,
        body: `${error2}`
      });
    }, (computable, current, total) => {
      state2.duration = Date.now() - state2.timestamp;
      state2.progress = computable ? current / total : null;
      progressFn();
    }, () => {
      state2.perceivedPerformanceUpdater.clear();
      api.fire("abort", state2.response ? state2.response.body : null);
    }, (transferId) => {
      api.fire("transfer", transferId);
    });
  };
  const abort = () => {
    if (!state2.request)
      return;
    state2.perceivedPerformanceUpdater.clear();
    if (state2.request.abort)
      state2.request.abort();
    state2.complete = true;
  };
  const reset = () => {
    abort();
    state2.complete = false;
    state2.perceivedProgress = 0;
    state2.progress = 0;
    state2.timestamp = null;
    state2.perceivedDuration = 0;
    state2.duration = 0;
    state2.request = null;
    state2.response = null;
  };
  const getProgress = allowMinimumUploadDuration ? () => state2.progress ? Math.min(state2.progress, state2.perceivedProgress) : null : () => state2.progress || null;
  const getDuration = allowMinimumUploadDuration ? () => Math.min(state2.duration, state2.perceivedDuration) : () => state2.duration;
  const api = {
    ...on(),
    process,
    abort,
    getProgress,
    getDuration,
    reset
  };
  return api;
};
var getFilenameWithoutExtension = (name2) => name2.substr(0, name2.lastIndexOf(".")) || name2;
var createFileStub = (source) => {
  let data3 = [source.name, source.size, source.type];
  if (source instanceof Blob || isBase64DataURI(source)) {
    data3[0] = source.name || getDateString();
  } else if (isBase64DataURI(source)) {
    data3[1] = source.length;
    data3[2] = getMimeTypeFromBase64DataURI(source);
  } else if (isString(source)) {
    data3[0] = getFilenameFromURL(source);
    data3[1] = 0;
    data3[2] = "application/octet-stream";
  }
  return {
    name: data3[0],
    size: data3[1],
    type: data3[2]
  };
};
var isFile = (value) => !!(value instanceof File || value instanceof Blob && value.name);
var deepCloneObject = (src) => {
  if (!isObject(src))
    return src;
  const target = isArray(src) ? [] : {};
  for (const key in src) {
    if (!src.hasOwnProperty(key))
      continue;
    const v = src[key];
    target[key] = v && isObject(v) ? deepCloneObject(v) : v;
  }
  return target;
};
var createItem = (origin = null, serverFileReference = null, file2 = null) => {
  const id = getUniqueId();
  const state2 = {
    archived: false,
    frozen: false,
    released: false,
    source: null,
    file: file2,
    serverFileReference,
    transferId: null,
    processingAborted: false,
    status: serverFileReference ? ItemStatus.PROCESSING_COMPLETE : ItemStatus.INIT,
    activeLoader: null,
    activeProcessor: null
  };
  let abortProcessingRequestComplete = null;
  const metadata = {};
  const setStatus = (status) => state2.status = status;
  const fire = (event, ...params) => {
    if (state2.released || state2.frozen)
      return;
    api.fire(event, ...params);
  };
  const getFileExtension = () => getExtensionFromFilename(state2.file.name);
  const getFileType = () => state2.file.type;
  const getFileSize = () => state2.file.size;
  const getFile = () => state2.file;
  const load = (source, loader, onload) => {
    state2.source = source;
    api.fireSync("init");
    if (state2.file) {
      api.fireSync("load-skip");
      return;
    }
    state2.file = createFileStub(source);
    loader.on("init", () => {
      fire("load-init");
    });
    loader.on("meta", (meta) => {
      state2.file.size = meta.size;
      state2.file.filename = meta.filename;
      if (meta.source) {
        origin = FileOrigin.LIMBO;
        state2.serverFileReference = meta.source;
        state2.status = ItemStatus.PROCESSING_COMPLETE;
      }
      fire("load-meta");
    });
    loader.on("progress", (progress) => {
      setStatus(ItemStatus.LOADING);
      fire("load-progress", progress);
    });
    loader.on("error", (error2) => {
      setStatus(ItemStatus.LOAD_ERROR);
      fire("load-request-error", error2);
    });
    loader.on("abort", () => {
      setStatus(ItemStatus.INIT);
      fire("load-abort");
    });
    loader.on("load", (file3) => {
      state2.activeLoader = null;
      const success = (result) => {
        state2.file = isFile(result) ? result : state2.file;
        if (origin === FileOrigin.LIMBO && state2.serverFileReference) {
          setStatus(ItemStatus.PROCESSING_COMPLETE);
        } else {
          setStatus(ItemStatus.IDLE);
        }
        fire("load");
      };
      const error2 = (result) => {
        state2.file = file3;
        fire("load-meta");
        setStatus(ItemStatus.LOAD_ERROR);
        fire("load-file-error", result);
      };
      if (state2.serverFileReference) {
        success(file3);
        return;
      }
      onload(file3, success, error2);
    });
    loader.setSource(source);
    state2.activeLoader = loader;
    loader.load();
  };
  const retryLoad = () => {
    if (!state2.activeLoader) {
      return;
    }
    state2.activeLoader.load();
  };
  const abortLoad = () => {
    if (state2.activeLoader) {
      state2.activeLoader.abort();
      return;
    }
    setStatus(ItemStatus.INIT);
    fire("load-abort");
  };
  const process = (processor, onprocess) => {
    if (state2.processingAborted) {
      state2.processingAborted = false;
      return;
    }
    setStatus(ItemStatus.PROCESSING);
    abortProcessingRequestComplete = null;
    if (!(state2.file instanceof Blob)) {
      api.on("load", () => {
        process(processor, onprocess);
      });
      return;
    }
    processor.on("load", (serverFileReference2) => {
      state2.transferId = null;
      state2.serverFileReference = serverFileReference2;
    });
    processor.on("transfer", (transferId) => {
      state2.transferId = transferId;
    });
    processor.on("load-perceived", (serverFileReference2) => {
      state2.activeProcessor = null;
      state2.transferId = null;
      state2.serverFileReference = serverFileReference2;
      setStatus(ItemStatus.PROCESSING_COMPLETE);
      fire("process-complete", serverFileReference2);
    });
    processor.on("start", () => {
      fire("process-start");
    });
    processor.on("error", (error3) => {
      state2.activeProcessor = null;
      setStatus(ItemStatus.PROCESSING_ERROR);
      fire("process-error", error3);
    });
    processor.on("abort", (serverFileReference2) => {
      state2.activeProcessor = null;
      state2.transferId = null;
      state2.serverFileReference = serverFileReference2;
      setStatus(ItemStatus.IDLE);
      fire("process-abort");
      if (abortProcessingRequestComplete) {
        abortProcessingRequestComplete();
      }
    });
    processor.on("progress", (progress) => {
      fire("process-progress", progress);
    });
    const success = (file3) => {
      if (state2.archived)
        return;
      processor.process(file3, { ...metadata });
    };
    const error2 = console.error;
    onprocess(state2.file, success, error2);
    state2.activeProcessor = processor;
  };
  const requestProcessing = () => {
    state2.processingAborted = false;
    setStatus(ItemStatus.PROCESSING_QUEUED);
  };
  const abortProcessing = () => new Promise((resolve) => {
    if (!state2.activeProcessor) {
      state2.processingAborted = true;
      setStatus(ItemStatus.IDLE);
      fire("process-abort");
      resolve();
      return;
    }
    abortProcessingRequestComplete = () => {
      resolve();
    };
    state2.activeProcessor.abort();
  });
  const revert = (revertFileUpload, forceRevert) => new Promise((resolve, reject) => {
    if (state2.serverFileReference === null) {
      resolve();
      return;
    }
    revertFileUpload(state2.serverFileReference, () => {
      state2.serverFileReference = null;
      resolve();
    }, (error2) => {
      if (!forceRevert) {
        resolve();
        return;
      }
      setStatus(ItemStatus.PROCESSING_REVERT_ERROR);
      fire("process-revert-error");
      reject(error2);
    });
    setStatus(ItemStatus.IDLE);
    fire("process-revert");
  });
  const setMetadata = (key, value, silent) => {
    const keys = key.split(".");
    const root2 = keys[0];
    const last = keys.pop();
    let data3 = metadata;
    keys.forEach((key2) => data3 = data3[key2]);
    if (JSON.stringify(data3[last]) === JSON.stringify(value))
      return;
    data3[last] = value;
    fire("metadata-update", {
      key: root2,
      value: metadata[root2],
      silent
    });
  };
  const getMetadata = (key) => deepCloneObject(key ? metadata[key] : metadata);
  const api = {
    id: { get: () => id },
    origin: { get: () => origin, set: (value) => origin = value },
    serverId: { get: () => state2.serverFileReference },
    transferId: { get: () => state2.transferId },
    status: { get: () => state2.status },
    filename: { get: () => state2.file.name },
    filenameWithoutExtension: { get: () => getFilenameWithoutExtension(state2.file.name) },
    fileExtension: { get: getFileExtension },
    fileType: { get: getFileType },
    fileSize: { get: getFileSize },
    file: { get: getFile },
    relativePath: { get: () => state2.file._relativePath },
    source: { get: () => state2.source },
    getMetadata,
    setMetadata: (key, value, silent) => {
      if (isObject(key)) {
        const data3 = key;
        Object.keys(data3).forEach((key2) => {
          setMetadata(key2, data3[key2], value);
        });
        return key;
      }
      setMetadata(key, value, silent);
      return value;
    },
    extend: (name2, handler) => itemAPI[name2] = handler,
    abortLoad,
    retryLoad,
    requestProcessing,
    abortProcessing,
    load,
    process,
    revert,
    ...on(),
    freeze: () => state2.frozen = true,
    release: () => state2.released = true,
    released: { get: () => state2.released },
    archive: () => state2.archived = true,
    archived: { get: () => state2.archived }
  };
  const itemAPI = createObject(api);
  return itemAPI;
};
var getItemIndexByQuery = (items, query) => {
  if (isEmpty(query)) {
    return 0;
  }
  if (!isString(query)) {
    return -1;
  }
  return items.findIndex((item2) => item2.id === query);
};
var getItemById = (items, itemId) => {
  const index = getItemIndexByQuery(items, itemId);
  if (index < 0) {
    return;
  }
  return items[index] || null;
};
var fetchBlob = (url, load, error2, progress, abort, headers) => {
  const request = sendRequest(null, url, {
    method: "GET",
    responseType: "blob"
  });
  request.onload = (xhr) => {
    const headers2 = xhr.getAllResponseHeaders();
    const filename = getFileInfoFromHeaders(headers2).name || getFilenameFromURL(url);
    load(createResponse("load", xhr.status, getFileFromBlob(xhr.response, filename), headers2));
  };
  request.onerror = (xhr) => {
    error2(createResponse("error", xhr.status, xhr.statusText, xhr.getAllResponseHeaders()));
  };
  request.onheaders = (xhr) => {
    headers(createResponse("headers", xhr.status, null, xhr.getAllResponseHeaders()));
  };
  request.ontimeout = createTimeoutResponse(error2);
  request.onprogress = progress;
  request.onabort = abort;
  return request;
};
var getDomainFromURL = (url) => {
  if (url.indexOf("//") === 0) {
    url = location.protocol + url;
  }
  return url.toLowerCase().replace("blob:", "").replace(/([a-z])?:\/\//, "$1").split("/")[0];
};
var isExternalURL = (url) => (url.indexOf(":") > -1 || url.indexOf("//") > -1) && getDomainFromURL(location.href) !== getDomainFromURL(url);
var dynamicLabel = (label) => (...params) => isFunction(label) ? label(...params) : label;
var isMockItem = (item2) => !isFile(item2.file);
var listUpdated = (dispatch, state2) => {
  clearTimeout(state2.listUpdateTimeout);
  state2.listUpdateTimeout = setTimeout(() => {
    dispatch("DID_UPDATE_ITEMS", { items: getActiveItems(state2.items) });
  }, 0);
};
var optionalPromise = (fn2, ...params) => new Promise((resolve) => {
  if (!fn2) {
    return resolve(true);
  }
  const result = fn2(...params);
  if (result == null) {
    return resolve(true);
  }
  if (typeof result === "boolean") {
    return resolve(result);
  }
  if (typeof result.then === "function") {
    result.then(resolve);
  }
});
var sortItems = (state2, compare) => {
  state2.items.sort((a, b) => compare(createItemAPI(a), createItemAPI(b)));
};
var getItemByQueryFromState = (state2, itemHandler) => ({
  query,
  success = () => {
  },
  failure = () => {
  },
  ...options
} = {}) => {
  const item2 = getItemByQuery(state2.items, query);
  if (!item2) {
    failure({
      error: createResponse("error", 0, "Item not found"),
      file: null
    });
    return;
  }
  itemHandler(item2, success, failure, options || {});
};
var actions = (dispatch, query, state2) => ({
  ABORT_ALL: () => {
    getActiveItems(state2.items).forEach((item2) => {
      item2.freeze();
      item2.abortLoad();
      item2.abortProcessing();
    });
  },
  DID_SET_FILES: ({ value = [] }) => {
    const files = value.map((file2) => ({
      source: file2.source ? file2.source : file2,
      options: file2.options
    }));
    let activeItems = getActiveItems(state2.items);
    activeItems.forEach((item2) => {
      if (!files.find((file2) => file2.source === item2.source || file2.source === item2.file)) {
        dispatch("REMOVE_ITEM", { query: item2, remove: false });
      }
    });
    activeItems = getActiveItems(state2.items);
    files.forEach((file2, index) => {
      if (activeItems.find((item2) => item2.source === file2.source || item2.file === file2.source))
        return;
      dispatch("ADD_ITEM", {
        ...file2,
        interactionMethod: InteractionMethod.NONE,
        index
      });
    });
  },
  DID_UPDATE_ITEM_METADATA: ({ id, action, change }) => {
    if (change.silent)
      return;
    clearTimeout(state2.itemUpdateTimeout);
    state2.itemUpdateTimeout = setTimeout(() => {
      const item2 = getItemById(state2.items, id);
      if (!query("IS_ASYNC")) {
        applyFilterChain("SHOULD_PREPARE_OUTPUT", false, {
          item: item2,
          query,
          action,
          change
        }).then((shouldPrepareOutput) => {
          const beforePrepareFile = query("GET_BEFORE_PREPARE_FILE");
          if (beforePrepareFile)
            shouldPrepareOutput = beforePrepareFile(item2, shouldPrepareOutput);
          if (!shouldPrepareOutput)
            return;
          dispatch("REQUEST_PREPARE_OUTPUT", {
            query: id,
            item: item2,
            success: (file2) => {
              dispatch("DID_PREPARE_OUTPUT", { id, file: file2 });
            }
          }, true);
        });
        return;
      }
      if (item2.origin === FileOrigin.LOCAL) {
        dispatch("DID_LOAD_ITEM", {
          id: item2.id,
          error: null,
          serverFileReference: item2.source
        });
      }
      const upload = () => {
        setTimeout(() => {
          dispatch("REQUEST_ITEM_PROCESSING", { query: id });
        }, 32);
      };
      const revert = (doUpload) => {
        item2.revert(createRevertFunction(state2.options.server.url, state2.options.server.revert), query("GET_FORCE_REVERT")).then(doUpload ? upload : () => {
        }).catch(() => {
        });
      };
      const abort = (doUpload) => {
        item2.abortProcessing().then(doUpload ? upload : () => {
        });
      };
      if (item2.status === ItemStatus.PROCESSING_COMPLETE) {
        return revert(state2.options.instantUpload);
      }
      if (item2.status === ItemStatus.PROCESSING) {
        return abort(state2.options.instantUpload);
      }
      if (state2.options.instantUpload) {
        upload();
      }
    }, 0);
  },
  MOVE_ITEM: ({ query: query2, index }) => {
    const item2 = getItemByQuery(state2.items, query2);
    if (!item2)
      return;
    const currentIndex = state2.items.indexOf(item2);
    index = limit(index, 0, state2.items.length - 1);
    if (currentIndex === index)
      return;
    state2.items.splice(index, 0, state2.items.splice(currentIndex, 1)[0]);
  },
  SORT: ({ compare }) => {
    sortItems(state2, compare);
    dispatch("DID_SORT_ITEMS", {
      items: query("GET_ACTIVE_ITEMS")
    });
  },
  ADD_ITEMS: ({ items, index, interactionMethod, success = () => {
  }, failure = () => {
  } }) => {
    let currentIndex = index;
    if (index === -1 || typeof index === "undefined") {
      const insertLocation = query("GET_ITEM_INSERT_LOCATION");
      const totalItems = query("GET_TOTAL_ITEMS");
      currentIndex = insertLocation === "before" ? 0 : totalItems;
    }
    const ignoredFiles = query("GET_IGNORED_FILES");
    const isValidFile = (source) => isFile(source) ? !ignoredFiles.includes(source.name.toLowerCase()) : !isEmpty(source);
    const validItems = items.filter(isValidFile);
    const promises = validItems.map((source) => new Promise((resolve, reject) => {
      dispatch("ADD_ITEM", {
        interactionMethod,
        source: source.source || source,
        success: resolve,
        failure: reject,
        index: currentIndex++,
        options: source.options || {}
      });
    }));
    Promise.all(promises).then(success).catch(failure);
  },
  ADD_ITEM: ({
    source,
    index = -1,
    interactionMethod,
    success = () => {
    },
    failure = () => {
    },
    options = {}
  }) => {
    if (isEmpty(source)) {
      failure({
        error: createResponse("error", 0, "No source"),
        file: null
      });
      return;
    }
    if (isFile(source) && state2.options.ignoredFiles.includes(source.name.toLowerCase())) {
      return;
    }
    if (!hasRoomForItem(state2)) {
      if (state2.options.allowMultiple || !state2.options.allowMultiple && !state2.options.allowReplace) {
        const error2 = createResponse("warning", 0, "Max files");
        dispatch("DID_THROW_MAX_FILES", {
          source,
          error: error2
        });
        failure({ error: error2, file: null });
        return;
      }
      const item3 = getActiveItems(state2.items)[0];
      if (item3.status === ItemStatus.PROCESSING_COMPLETE || item3.status === ItemStatus.PROCESSING_REVERT_ERROR) {
        const forceRevert = query("GET_FORCE_REVERT");
        item3.revert(createRevertFunction(state2.options.server.url, state2.options.server.revert), forceRevert).then(() => {
          if (!forceRevert)
            return;
          dispatch("ADD_ITEM", {
            source,
            index,
            interactionMethod,
            success,
            failure,
            options
          });
        }).catch(() => {
        });
        if (forceRevert)
          return;
      }
      dispatch("REMOVE_ITEM", { query: item3.id });
    }
    const origin = options.type === "local" ? FileOrigin.LOCAL : options.type === "limbo" ? FileOrigin.LIMBO : FileOrigin.INPUT;
    const item2 = createItem(origin, origin === FileOrigin.INPUT ? null : source, options.file);
    Object.keys(options.metadata || {}).forEach((key) => {
      item2.setMetadata(key, options.metadata[key]);
    });
    applyFilters("DID_CREATE_ITEM", item2, { query, dispatch });
    const itemInsertLocation = query("GET_ITEM_INSERT_LOCATION");
    if (!state2.options.itemInsertLocationFreedom) {
      index = itemInsertLocation === "before" ? -1 : state2.items.length;
    }
    insertItem(state2.items, item2, index);
    if (isFunction(itemInsertLocation) && source) {
      sortItems(state2, itemInsertLocation);
    }
    const id = item2.id;
    item2.on("init", () => {
      dispatch("DID_INIT_ITEM", { id });
    });
    item2.on("load-init", () => {
      dispatch("DID_START_ITEM_LOAD", { id });
    });
    item2.on("load-meta", () => {
      dispatch("DID_UPDATE_ITEM_META", { id });
    });
    item2.on("load-progress", (progress) => {
      dispatch("DID_UPDATE_ITEM_LOAD_PROGRESS", { id, progress });
    });
    item2.on("load-request-error", (error2) => {
      const mainStatus = dynamicLabel(state2.options.labelFileLoadError)(error2);
      if (error2.code >= 400 && error2.code < 500) {
        dispatch("DID_THROW_ITEM_INVALID", {
          id,
          error: error2,
          status: {
            main: mainStatus,
            sub: `${error2.code} (${error2.body})`
          }
        });
        failure({ error: error2, file: createItemAPI(item2) });
        return;
      }
      dispatch("DID_THROW_ITEM_LOAD_ERROR", {
        id,
        error: error2,
        status: {
          main: mainStatus,
          sub: state2.options.labelTapToRetry
        }
      });
    });
    item2.on("load-file-error", (error2) => {
      dispatch("DID_THROW_ITEM_INVALID", {
        id,
        error: error2.status,
        status: error2.status
      });
      failure({ error: error2.status, file: createItemAPI(item2) });
    });
    item2.on("load-abort", () => {
      dispatch("REMOVE_ITEM", { query: id });
    });
    item2.on("load-skip", () => {
      dispatch("COMPLETE_LOAD_ITEM", {
        query: id,
        item: item2,
        data: {
          source,
          success
        }
      });
    });
    item2.on("load", () => {
      const handleAdd = (shouldAdd) => {
        if (!shouldAdd) {
          dispatch("REMOVE_ITEM", {
            query: id
          });
          return;
        }
        item2.on("metadata-update", (change) => {
          dispatch("DID_UPDATE_ITEM_METADATA", { id, change });
        });
        applyFilterChain("SHOULD_PREPARE_OUTPUT", false, { item: item2, query }).then((shouldPrepareOutput) => {
          const beforePrepareFile = query("GET_BEFORE_PREPARE_FILE");
          if (beforePrepareFile)
            shouldPrepareOutput = beforePrepareFile(item2, shouldPrepareOutput);
          const loadComplete = () => {
            dispatch("COMPLETE_LOAD_ITEM", {
              query: id,
              item: item2,
              data: {
                source,
                success
              }
            });
            listUpdated(dispatch, state2);
          };
          if (shouldPrepareOutput) {
            dispatch("REQUEST_PREPARE_OUTPUT", {
              query: id,
              item: item2,
              success: (file2) => {
                dispatch("DID_PREPARE_OUTPUT", { id, file: file2 });
                loadComplete();
              }
            }, true);
            return;
          }
          loadComplete();
        });
      };
      applyFilterChain("DID_LOAD_ITEM", item2, { query, dispatch }).then(() => {
        optionalPromise(query("GET_BEFORE_ADD_FILE"), createItemAPI(item2)).then(handleAdd);
      }).catch(() => {
        handleAdd(false);
      });
    });
    item2.on("process-start", () => {
      dispatch("DID_START_ITEM_PROCESSING", { id });
    });
    item2.on("process-progress", (progress) => {
      dispatch("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id, progress });
    });
    item2.on("process-error", (error2) => {
      dispatch("DID_THROW_ITEM_PROCESSING_ERROR", {
        id,
        error: error2,
        status: {
          main: dynamicLabel(state2.options.labelFileProcessingError)(error2),
          sub: state2.options.labelTapToRetry
        }
      });
    });
    item2.on("process-revert-error", (error2) => {
      dispatch("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", {
        id,
        error: error2,
        status: {
          main: dynamicLabel(state2.options.labelFileProcessingRevertError)(error2),
          sub: state2.options.labelTapToRetry
        }
      });
    });
    item2.on("process-complete", (serverFileReference) => {
      dispatch("DID_COMPLETE_ITEM_PROCESSING", {
        id,
        error: null,
        serverFileReference
      });
      dispatch("DID_DEFINE_VALUE", { id, value: serverFileReference });
    });
    item2.on("process-abort", () => {
      dispatch("DID_ABORT_ITEM_PROCESSING", { id });
    });
    item2.on("process-revert", () => {
      dispatch("DID_REVERT_ITEM_PROCESSING", { id });
      dispatch("DID_DEFINE_VALUE", { id, value: null });
    });
    dispatch("DID_ADD_ITEM", { id, index, interactionMethod });
    listUpdated(dispatch, state2);
    const { url, load, restore, fetch: fetch2 } = state2.options.server || {};
    item2.load(source, createFileLoader(origin === FileOrigin.INPUT ? isString(source) && isExternalURL(source) ? fetch2 ? createFetchFunction(url, fetch2) : fetchBlob : fetchBlob : origin === FileOrigin.LIMBO ? createFetchFunction(url, restore) : createFetchFunction(url, load)), (file2, success2, error2) => {
      applyFilterChain("LOAD_FILE", file2, { query }).then(success2).catch(error2);
    });
  },
  REQUEST_PREPARE_OUTPUT: ({ item: item2, success, failure = () => {
  } }) => {
    const err = {
      error: createResponse("error", 0, "Item not found"),
      file: null
    };
    if (item2.archived)
      return failure(err);
    applyFilterChain("PREPARE_OUTPUT", item2.file, { query, item: item2 }).then((result) => {
      applyFilterChain("COMPLETE_PREPARE_OUTPUT", result, { query, item: item2 }).then((result2) => {
        if (item2.archived)
          return failure(err);
        success(result2);
      });
    });
  },
  COMPLETE_LOAD_ITEM: ({ item: item2, data: data3 }) => {
    const { success, source } = data3;
    const itemInsertLocation = query("GET_ITEM_INSERT_LOCATION");
    if (isFunction(itemInsertLocation) && source) {
      sortItems(state2, itemInsertLocation);
    }
    dispatch("DID_LOAD_ITEM", {
      id: item2.id,
      error: null,
      serverFileReference: item2.origin === FileOrigin.INPUT ? null : source
    });
    success(createItemAPI(item2));
    if (item2.origin === FileOrigin.LOCAL) {
      dispatch("DID_LOAD_LOCAL_ITEM", { id: item2.id });
      return;
    }
    if (item2.origin === FileOrigin.LIMBO) {
      dispatch("DID_COMPLETE_ITEM_PROCESSING", {
        id: item2.id,
        error: null,
        serverFileReference: source
      });
      dispatch("DID_DEFINE_VALUE", {
        id: item2.id,
        value: item2.serverId || source
      });
      return;
    }
    if (query("IS_ASYNC") && state2.options.instantUpload) {
      dispatch("REQUEST_ITEM_PROCESSING", { query: item2.id });
    }
  },
  RETRY_ITEM_LOAD: getItemByQueryFromState(state2, (item2) => {
    item2.retryLoad();
  }),
  REQUEST_ITEM_PREPARE: getItemByQueryFromState(state2, (item2, success, failure) => {
    dispatch("REQUEST_PREPARE_OUTPUT", {
      query: item2.id,
      item: item2,
      success: (file2) => {
        dispatch("DID_PREPARE_OUTPUT", { id: item2.id, file: file2 });
        success({
          file: item2,
          output: file2
        });
      },
      failure
    }, true);
  }),
  REQUEST_ITEM_PROCESSING: getItemByQueryFromState(state2, (item2, success, failure) => {
    const itemCanBeQueuedForProcessing = item2.status === ItemStatus.IDLE || item2.status === ItemStatus.PROCESSING_ERROR;
    if (!itemCanBeQueuedForProcessing) {
      const processNow = () => dispatch("REQUEST_ITEM_PROCESSING", { query: item2, success, failure });
      const process = () => document.hidden ? processNow() : setTimeout(processNow, 32);
      if (item2.status === ItemStatus.PROCESSING_COMPLETE || item2.status === ItemStatus.PROCESSING_REVERT_ERROR) {
        item2.revert(createRevertFunction(state2.options.server.url, state2.options.server.revert), query("GET_FORCE_REVERT")).then(process).catch(() => {
        });
      } else if (item2.status === ItemStatus.PROCESSING) {
        item2.abortProcessing().then(process);
      }
      return;
    }
    if (item2.status === ItemStatus.PROCESSING_QUEUED)
      return;
    item2.requestProcessing();
    dispatch("DID_REQUEST_ITEM_PROCESSING", { id: item2.id });
    dispatch("PROCESS_ITEM", { query: item2, success, failure }, true);
  }),
  PROCESS_ITEM: getItemByQueryFromState(state2, (item2, success, failure) => {
    const maxParallelUploads = query("GET_MAX_PARALLEL_UPLOADS");
    const totalCurrentUploads = query("GET_ITEMS_BY_STATUS", ItemStatus.PROCESSING).length;
    if (totalCurrentUploads === maxParallelUploads) {
      state2.processingQueue.push({
        id: item2.id,
        success,
        failure
      });
      return;
    }
    if (item2.status === ItemStatus.PROCESSING)
      return;
    const processNext = () => {
      const queueEntry = state2.processingQueue.shift();
      if (!queueEntry)
        return;
      const { id, success: success2, failure: failure2 } = queueEntry;
      const itemReference = getItemByQuery(state2.items, id);
      if (!itemReference || itemReference.archived) {
        processNext();
        return;
      }
      dispatch("PROCESS_ITEM", { query: id, success: success2, failure: failure2 }, true);
    };
    item2.onOnce("process-complete", () => {
      success(createItemAPI(item2));
      processNext();
      const server = state2.options.server;
      const instantUpload = state2.options.instantUpload;
      if (instantUpload && item2.origin === FileOrigin.LOCAL && isFunction(server.remove)) {
        const noop = () => {
        };
        item2.origin = FileOrigin.LIMBO;
        state2.options.server.remove(item2.source, noop, noop);
      }
      const allItemsProcessed = query("GET_ITEMS_BY_STATUS", ItemStatus.PROCESSING_COMPLETE).length === state2.items.length;
      if (allItemsProcessed) {
        dispatch("DID_COMPLETE_ITEM_PROCESSING_ALL");
      }
    });
    item2.onOnce("process-error", (error2) => {
      failure({ error: error2, file: createItemAPI(item2) });
      processNext();
    });
    const options = state2.options;
    item2.process(createFileProcessor(createProcessorFunction(options.server.url, options.server.process, options.name, {
      chunkTransferId: item2.transferId,
      chunkServer: options.server.patch,
      chunkUploads: options.chunkUploads,
      chunkForce: options.chunkForce,
      chunkSize: options.chunkSize,
      chunkRetryDelays: options.chunkRetryDelays
    }), {
      allowMinimumUploadDuration: query("GET_ALLOW_MINIMUM_UPLOAD_DURATION")
    }), (file2, success2, error2) => {
      applyFilterChain("PREPARE_OUTPUT", file2, { query, item: item2 }).then((file3) => {
        dispatch("DID_PREPARE_OUTPUT", { id: item2.id, file: file3 });
        success2(file3);
      }).catch(error2);
    });
  }),
  RETRY_ITEM_PROCESSING: getItemByQueryFromState(state2, (item2) => {
    dispatch("REQUEST_ITEM_PROCESSING", { query: item2 });
  }),
  REQUEST_REMOVE_ITEM: getItemByQueryFromState(state2, (item2) => {
    optionalPromise(query("GET_BEFORE_REMOVE_FILE"), createItemAPI(item2)).then((shouldRemove) => {
      if (!shouldRemove) {
        return;
      }
      dispatch("REMOVE_ITEM", { query: item2 });
    });
  }),
  RELEASE_ITEM: getItemByQueryFromState(state2, (item2) => {
    item2.release();
  }),
  REMOVE_ITEM: getItemByQueryFromState(state2, (item2, success, failure, options) => {
    const removeFromView = () => {
      const id = item2.id;
      getItemById(state2.items, id).archive();
      dispatch("DID_REMOVE_ITEM", { error: null, id, item: item2 });
      listUpdated(dispatch, state2);
      success(createItemAPI(item2));
    };
    const server = state2.options.server;
    if (item2.origin === FileOrigin.LOCAL && server && isFunction(server.remove) && options.remove !== false) {
      dispatch("DID_START_ITEM_REMOVE", { id: item2.id });
      server.remove(item2.source, () => removeFromView(), (status) => {
        dispatch("DID_THROW_ITEM_REMOVE_ERROR", {
          id: item2.id,
          error: createResponse("error", 0, status, null),
          status: {
            main: dynamicLabel(state2.options.labelFileRemoveError)(status),
            sub: state2.options.labelTapToRetry
          }
        });
      });
    } else {
      if (options.revert && item2.origin !== FileOrigin.LOCAL && item2.serverId !== null) {
        item2.revert(createRevertFunction(state2.options.server.url, state2.options.server.revert), query("GET_FORCE_REVERT"));
      }
      removeFromView();
    }
  }),
  ABORT_ITEM_LOAD: getItemByQueryFromState(state2, (item2) => {
    item2.abortLoad();
  }),
  ABORT_ITEM_PROCESSING: getItemByQueryFromState(state2, (item2) => {
    if (item2.serverId) {
      dispatch("REVERT_ITEM_PROCESSING", { id: item2.id });
      return;
    }
    item2.abortProcessing().then(() => {
      const shouldRemove = state2.options.instantUpload;
      if (shouldRemove) {
        dispatch("REMOVE_ITEM", { query: item2.id });
      }
    });
  }),
  REQUEST_REVERT_ITEM_PROCESSING: getItemByQueryFromState(state2, (item2) => {
    if (!state2.options.instantUpload) {
      dispatch("REVERT_ITEM_PROCESSING", { query: item2 });
      return;
    }
    const handleRevert2 = (shouldRevert) => {
      if (!shouldRevert)
        return;
      dispatch("REVERT_ITEM_PROCESSING", { query: item2 });
    };
    const fn2 = query("GET_BEFORE_REMOVE_FILE");
    if (!fn2) {
      return handleRevert2(true);
    }
    const requestRemoveResult = fn2(createItemAPI(item2));
    if (requestRemoveResult == null) {
      return handleRevert2(true);
    }
    if (typeof requestRemoveResult === "boolean") {
      return handleRevert2(requestRemoveResult);
    }
    if (typeof requestRemoveResult.then === "function") {
      requestRemoveResult.then(handleRevert2);
    }
  }),
  REVERT_ITEM_PROCESSING: getItemByQueryFromState(state2, (item2) => {
    item2.revert(createRevertFunction(state2.options.server.url, state2.options.server.revert), query("GET_FORCE_REVERT")).then(() => {
      const shouldRemove = state2.options.instantUpload || isMockItem(item2);
      if (shouldRemove) {
        dispatch("REMOVE_ITEM", { query: item2.id });
      }
    }).catch(() => {
    });
  }),
  SET_OPTIONS: ({ options }) => {
    forin(options, (key, value) => {
      dispatch(`SET_${fromCamels(key, "_").toUpperCase()}`, { value });
    });
  }
});
var formatFilename = (name2) => name2;
var createElement$1 = (tagName) => {
  return document.createElement(tagName);
};
var text = (node, value) => {
  let textNode = node.childNodes[0];
  if (!textNode) {
    textNode = document.createTextNode(value);
    node.appendChild(textNode);
  } else if (value !== textNode.nodeValue) {
    textNode.nodeValue = value;
  }
};
var polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = (angleInDegrees % 360 - 90) * Math.PI / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};
var describeArc = (x, y, radius, startAngle, endAngle, arcSweep) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  return ["M", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y].join(" ");
};
var percentageArc = (x, y, radius, from, to) => {
  let arcSweep = 1;
  if (to > from && to - from <= 0.5) {
    arcSweep = 0;
  }
  if (from > to && from - to >= 0.5) {
    arcSweep = 0;
  }
  return describeArc(x, y, radius, Math.min(0.9999, from) * 360, Math.min(0.9999, to) * 360, arcSweep);
};
var create = ({ root: root2, props }) => {
  props.spin = false;
  props.progress = 0;
  props.opacity = 0;
  const svg3 = createElement("svg");
  root2.ref.path = createElement("path", {
    "stroke-width": 2,
    "stroke-linecap": "round"
  });
  svg3.appendChild(root2.ref.path);
  root2.ref.svg = svg3;
  root2.appendChild(svg3);
};
var write = ({ root: root2, props }) => {
  if (props.opacity === 0) {
    return;
  }
  if (props.align) {
    root2.element.dataset.align = props.align;
  }
  const ringStrokeWidth = parseInt(attr(root2.ref.path, "stroke-width"), 10);
  const size = root2.rect.element.width * 0.5;
  let ringFrom = 0;
  let ringTo = 0;
  if (props.spin) {
    ringFrom = 0;
    ringTo = 0.5;
  } else {
    ringFrom = 0;
    ringTo = props.progress;
  }
  const coordinates = percentageArc(size, size, size - ringStrokeWidth, ringFrom, ringTo);
  attr(root2.ref.path, "d", coordinates);
  attr(root2.ref.path, "stroke-opacity", props.spin || props.progress > 0 ? 1 : 0);
};
var progressIndicator = createView({
  tag: "div",
  name: "progress-indicator",
  ignoreRectUpdate: true,
  ignoreRect: true,
  create,
  write,
  mixins: {
    apis: ["progress", "spin", "align"],
    styles: ["opacity"],
    animations: {
      opacity: { type: "tween", duration: 500 },
      progress: {
        type: "spring",
        stiffness: 0.95,
        damping: 0.65,
        mass: 10
      }
    }
  }
});
var create$1 = ({ root: root2, props }) => {
  root2.element.innerHTML = (props.icon || "") + `<span>${props.label}</span>`;
  props.isDisabled = false;
};
var write$1 = ({ root: root2, props }) => {
  const { isDisabled } = props;
  const shouldDisable = root2.query("GET_DISABLED") || props.opacity === 0;
  if (shouldDisable && !isDisabled) {
    props.isDisabled = true;
    attr(root2.element, "disabled", "disabled");
  } else if (!shouldDisable && isDisabled) {
    props.isDisabled = false;
    root2.element.removeAttribute("disabled");
  }
};
var fileActionButton = createView({
  tag: "button",
  attributes: {
    type: "button"
  },
  ignoreRect: true,
  ignoreRectUpdate: true,
  name: "file-action-button",
  mixins: {
    apis: ["label"],
    styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
    animations: {
      scaleX: "spring",
      scaleY: "spring",
      translateX: "spring",
      translateY: "spring",
      opacity: { type: "tween", duration: 250 }
    },
    listeners: true
  },
  create: create$1,
  write: write$1
});
var toNaturalFileSize = (bytes, decimalSeparator = ".", base = 1e3) => {
  bytes = Math.round(Math.abs(bytes));
  const KB = base;
  const MB = base * base;
  const GB = base * base * base;
  if (bytes < KB) {
    return `${bytes} bytes`;
  }
  if (bytes < MB) {
    return `${Math.floor(bytes / KB)} KB`;
  }
  if (bytes < GB) {
    return `${removeDecimalsWhenZero(bytes / MB, 1, decimalSeparator)} MB`;
  }
  return `${removeDecimalsWhenZero(bytes / GB, 2, decimalSeparator)} GB`;
};
var removeDecimalsWhenZero = (value, decimalCount, separator) => {
  return value.toFixed(decimalCount).split(".").filter((part) => part !== "0").join(separator);
};
var create$2 = ({ root: root2, props }) => {
  const fileName = createElement$1("span");
  fileName.className = "filepond--file-info-main";
  attr(fileName, "aria-hidden", "true");
  root2.appendChild(fileName);
  root2.ref.fileName = fileName;
  const fileSize = createElement$1("span");
  fileSize.className = "filepond--file-info-sub";
  root2.appendChild(fileSize);
  root2.ref.fileSize = fileSize;
  text(fileSize, root2.query("GET_LABEL_FILE_WAITING_FOR_SIZE"));
  text(fileName, formatFilename(root2.query("GET_ITEM_NAME", props.id)));
};
var updateFile = ({ root: root2, props }) => {
  text(root2.ref.fileSize, toNaturalFileSize(root2.query("GET_ITEM_SIZE", props.id), ".", root2.query("GET_FILE_SIZE_BASE")));
  text(root2.ref.fileName, formatFilename(root2.query("GET_ITEM_NAME", props.id)));
};
var updateFileSizeOnError = ({ root: root2, props }) => {
  if (isInt(root2.query("GET_ITEM_SIZE", props.id))) {
    return;
  }
  text(root2.ref.fileSize, root2.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"));
};
var fileInfo = createView({
  name: "file-info",
  ignoreRect: true,
  ignoreRectUpdate: true,
  write: createRoute({
    DID_LOAD_ITEM: updateFile,
    DID_UPDATE_ITEM_META: updateFile,
    DID_THROW_ITEM_LOAD_ERROR: updateFileSizeOnError,
    DID_THROW_ITEM_INVALID: updateFileSizeOnError
  }),
  didCreateView: (root2) => {
    applyFilters("CREATE_VIEW", { ...root2, view: root2 });
  },
  create: create$2,
  mixins: {
    styles: ["translateX", "translateY"],
    animations: {
      translateX: "spring",
      translateY: "spring"
    }
  }
});
var toPercentage = (value) => Math.round(value * 100);
var create$3 = ({ root: root2 }) => {
  const main = createElement$1("span");
  main.className = "filepond--file-status-main";
  root2.appendChild(main);
  root2.ref.main = main;
  const sub = createElement$1("span");
  sub.className = "filepond--file-status-sub";
  root2.appendChild(sub);
  root2.ref.sub = sub;
  didSetItemLoadProgress({ root: root2, action: { progress: null } });
};
var didSetItemLoadProgress = ({ root: root2, action }) => {
  const title = action.progress === null ? root2.query("GET_LABEL_FILE_LOADING") : `${root2.query("GET_LABEL_FILE_LOADING")} ${toPercentage(action.progress)}%`;
  text(root2.ref.main, title);
  text(root2.ref.sub, root2.query("GET_LABEL_TAP_TO_CANCEL"));
};
var didSetItemProcessProgress = ({ root: root2, action }) => {
  const title = action.progress === null ? root2.query("GET_LABEL_FILE_PROCESSING") : `${root2.query("GET_LABEL_FILE_PROCESSING")} ${toPercentage(action.progress)}%`;
  text(root2.ref.main, title);
  text(root2.ref.sub, root2.query("GET_LABEL_TAP_TO_CANCEL"));
};
var didRequestItemProcessing = ({ root: root2 }) => {
  text(root2.ref.main, root2.query("GET_LABEL_FILE_PROCESSING"));
  text(root2.ref.sub, root2.query("GET_LABEL_TAP_TO_CANCEL"));
};
var didAbortItemProcessing = ({ root: root2 }) => {
  text(root2.ref.main, root2.query("GET_LABEL_FILE_PROCESSING_ABORTED"));
  text(root2.ref.sub, root2.query("GET_LABEL_TAP_TO_RETRY"));
};
var didCompleteItemProcessing = ({ root: root2 }) => {
  text(root2.ref.main, root2.query("GET_LABEL_FILE_PROCESSING_COMPLETE"));
  text(root2.ref.sub, root2.query("GET_LABEL_TAP_TO_UNDO"));
};
var clear = ({ root: root2 }) => {
  text(root2.ref.main, "");
  text(root2.ref.sub, "");
};
var error = ({ root: root2, action }) => {
  text(root2.ref.main, action.status.main);
  text(root2.ref.sub, action.status.sub);
};
var fileStatus = createView({
  name: "file-status",
  ignoreRect: true,
  ignoreRectUpdate: true,
  write: createRoute({
    DID_LOAD_ITEM: clear,
    DID_REVERT_ITEM_PROCESSING: clear,
    DID_REQUEST_ITEM_PROCESSING: didRequestItemProcessing,
    DID_ABORT_ITEM_PROCESSING: didAbortItemProcessing,
    DID_COMPLETE_ITEM_PROCESSING: didCompleteItemProcessing,
    DID_UPDATE_ITEM_PROCESS_PROGRESS: didSetItemProcessProgress,
    DID_UPDATE_ITEM_LOAD_PROGRESS: didSetItemLoadProgress,
    DID_THROW_ITEM_LOAD_ERROR: error,
    DID_THROW_ITEM_INVALID: error,
    DID_THROW_ITEM_PROCESSING_ERROR: error,
    DID_THROW_ITEM_PROCESSING_REVERT_ERROR: error,
    DID_THROW_ITEM_REMOVE_ERROR: error
  }),
  didCreateView: (root2) => {
    applyFilters("CREATE_VIEW", { ...root2, view: root2 });
  },
  create: create$3,
  mixins: {
    styles: ["translateX", "translateY", "opacity"],
    animations: {
      opacity: { type: "tween", duration: 250 },
      translateX: "spring",
      translateY: "spring"
    }
  }
});
var Buttons = {
  AbortItemLoad: {
    label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD",
    action: "ABORT_ITEM_LOAD",
    className: "filepond--action-abort-item-load",
    align: "LOAD_INDICATOR_POSITION"
  },
  RetryItemLoad: {
    label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD",
    action: "RETRY_ITEM_LOAD",
    icon: "GET_ICON_RETRY",
    className: "filepond--action-retry-item-load",
    align: "BUTTON_PROCESS_ITEM_POSITION"
  },
  RemoveItem: {
    label: "GET_LABEL_BUTTON_REMOVE_ITEM",
    action: "REQUEST_REMOVE_ITEM",
    icon: "GET_ICON_REMOVE",
    className: "filepond--action-remove-item",
    align: "BUTTON_REMOVE_ITEM_POSITION"
  },
  ProcessItem: {
    label: "GET_LABEL_BUTTON_PROCESS_ITEM",
    action: "REQUEST_ITEM_PROCESSING",
    icon: "GET_ICON_PROCESS",
    className: "filepond--action-process-item",
    align: "BUTTON_PROCESS_ITEM_POSITION"
  },
  AbortItemProcessing: {
    label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING",
    action: "ABORT_ITEM_PROCESSING",
    className: "filepond--action-abort-item-processing",
    align: "BUTTON_PROCESS_ITEM_POSITION"
  },
  RetryItemProcessing: {
    label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING",
    action: "RETRY_ITEM_PROCESSING",
    icon: "GET_ICON_RETRY",
    className: "filepond--action-retry-item-processing",
    align: "BUTTON_PROCESS_ITEM_POSITION"
  },
  RevertItemProcessing: {
    label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING",
    action: "REQUEST_REVERT_ITEM_PROCESSING",
    icon: "GET_ICON_UNDO",
    className: "filepond--action-revert-item-processing",
    align: "BUTTON_PROCESS_ITEM_POSITION"
  }
};
var ButtonKeys = [];
forin(Buttons, (key) => {
  ButtonKeys.push(key);
});
var calculateFileInfoOffset = (root2) => {
  if (getRemoveIndicatorAligment(root2) === "right")
    return 0;
  const buttonRect = root2.ref.buttonRemoveItem.rect.element;
  return buttonRect.hidden ? null : buttonRect.width + buttonRect.left;
};
var calculateButtonWidth = (root2) => {
  const buttonRect = root2.ref.buttonAbortItemLoad.rect.element;
  return buttonRect.width;
};
var calculateFileVerticalCenterOffset = (root2) => Math.floor(root2.ref.buttonRemoveItem.rect.element.height / 4);
var calculateFileHorizontalCenterOffset = (root2) => Math.floor(root2.ref.buttonRemoveItem.rect.element.left / 2);
var getLoadIndicatorAlignment = (root2) => root2.query("GET_STYLE_LOAD_INDICATOR_POSITION");
var getProcessIndicatorAlignment = (root2) => root2.query("GET_STYLE_PROGRESS_INDICATOR_POSITION");
var getRemoveIndicatorAligment = (root2) => root2.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION");
var DefaultStyle = {
  buttonAbortItemLoad: { opacity: 0 },
  buttonRetryItemLoad: { opacity: 0 },
  buttonRemoveItem: { opacity: 0 },
  buttonProcessItem: { opacity: 0 },
  buttonAbortItemProcessing: { opacity: 0 },
  buttonRetryItemProcessing: { opacity: 0 },
  buttonRevertItemProcessing: { opacity: 0 },
  loadProgressIndicator: { opacity: 0, align: getLoadIndicatorAlignment },
  processProgressIndicator: { opacity: 0, align: getProcessIndicatorAlignment },
  processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 },
  info: { translateX: 0, translateY: 0, opacity: 0 },
  status: { translateX: 0, translateY: 0, opacity: 0 }
};
var IdleStyle = {
  buttonRemoveItem: { opacity: 1 },
  buttonProcessItem: { opacity: 1 },
  info: { translateX: calculateFileInfoOffset },
  status: { translateX: calculateFileInfoOffset }
};
var ProcessingStyle = {
  buttonAbortItemProcessing: { opacity: 1 },
  processProgressIndicator: { opacity: 1 },
  status: { opacity: 1 }
};
var StyleMap = {
  DID_THROW_ITEM_INVALID: {
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: calculateFileInfoOffset },
    status: { translateX: calculateFileInfoOffset, opacity: 1 }
  },
  DID_START_ITEM_LOAD: {
    buttonAbortItemLoad: { opacity: 1 },
    loadProgressIndicator: { opacity: 1 },
    status: { opacity: 1 }
  },
  DID_THROW_ITEM_LOAD_ERROR: {
    buttonRetryItemLoad: { opacity: 1 },
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: calculateFileInfoOffset },
    status: { opacity: 1 }
  },
  DID_START_ITEM_REMOVE: {
    processProgressIndicator: { opacity: 1, align: getRemoveIndicatorAligment },
    info: { translateX: calculateFileInfoOffset },
    status: { opacity: 0 }
  },
  DID_THROW_ITEM_REMOVE_ERROR: {
    processProgressIndicator: { opacity: 0, align: getRemoveIndicatorAligment },
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: calculateFileInfoOffset },
    status: { opacity: 1, translateX: calculateFileInfoOffset }
  },
  DID_LOAD_ITEM: IdleStyle,
  DID_LOAD_LOCAL_ITEM: {
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: calculateFileInfoOffset },
    status: { translateX: calculateFileInfoOffset }
  },
  DID_START_ITEM_PROCESSING: ProcessingStyle,
  DID_REQUEST_ITEM_PROCESSING: ProcessingStyle,
  DID_UPDATE_ITEM_PROCESS_PROGRESS: ProcessingStyle,
  DID_COMPLETE_ITEM_PROCESSING: {
    buttonRevertItemProcessing: { opacity: 1 },
    info: { opacity: 1 },
    status: { opacity: 1 }
  },
  DID_THROW_ITEM_PROCESSING_ERROR: {
    buttonRemoveItem: { opacity: 1 },
    buttonRetryItemProcessing: { opacity: 1 },
    status: { opacity: 1 },
    info: { translateX: calculateFileInfoOffset }
  },
  DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
    buttonRevertItemProcessing: { opacity: 1 },
    status: { opacity: 1 },
    info: { opacity: 1 }
  },
  DID_ABORT_ITEM_PROCESSING: {
    buttonRemoveItem: { opacity: 1 },
    buttonProcessItem: { opacity: 1 },
    info: { translateX: calculateFileInfoOffset },
    status: { opacity: 1 }
  },
  DID_REVERT_ITEM_PROCESSING: IdleStyle
};
var processingCompleteIndicatorView = createView({
  create: ({ root: root2 }) => {
    root2.element.innerHTML = root2.query("GET_ICON_DONE");
  },
  name: "processing-complete-indicator",
  ignoreRect: true,
  mixins: {
    styles: ["scaleX", "scaleY", "opacity"],
    animations: {
      scaleX: "spring",
      scaleY: "spring",
      opacity: { type: "tween", duration: 250 }
    }
  }
});
var create$4 = ({ root: root2, props }) => {
  const LocalButtons = Object.keys(Buttons).reduce((prev, curr) => {
    prev[curr] = { ...Buttons[curr] };
    return prev;
  }, {});
  const { id } = props;
  const allowRevert = root2.query("GET_ALLOW_REVERT");
  const allowRemove = root2.query("GET_ALLOW_REMOVE");
  const allowProcess = root2.query("GET_ALLOW_PROCESS");
  const instantUpload = root2.query("GET_INSTANT_UPLOAD");
  const isAsync2 = root2.query("IS_ASYNC");
  const alignRemoveItemButton = root2.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN");
  let buttonFilter;
  if (isAsync2) {
    if (allowProcess && !allowRevert) {
      buttonFilter = (key) => !/RevertItemProcessing/.test(key);
    } else if (!allowProcess && allowRevert) {
      buttonFilter = (key) => !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(key);
    } else if (!allowProcess && !allowRevert) {
      buttonFilter = (key) => !/Process/.test(key);
    }
  } else {
    buttonFilter = (key) => !/Process/.test(key);
  }
  const enabledButtons = buttonFilter ? ButtonKeys.filter(buttonFilter) : ButtonKeys.concat();
  if (instantUpload && allowRevert) {
    LocalButtons["RevertItemProcessing"].label = "GET_LABEL_BUTTON_REMOVE_ITEM";
    LocalButtons["RevertItemProcessing"].icon = "GET_ICON_REMOVE";
  }
  if (isAsync2 && !allowRevert) {
    const map2 = StyleMap["DID_COMPLETE_ITEM_PROCESSING"];
    map2.info.translateX = calculateFileHorizontalCenterOffset;
    map2.info.translateY = calculateFileVerticalCenterOffset;
    map2.status.translateY = calculateFileVerticalCenterOffset;
    map2.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  if (isAsync2 && !allowProcess) {
    [
      "DID_START_ITEM_PROCESSING",
      "DID_REQUEST_ITEM_PROCESSING",
      "DID_UPDATE_ITEM_PROCESS_PROGRESS",
      "DID_THROW_ITEM_PROCESSING_ERROR"
    ].forEach((key) => {
      StyleMap[key].status.translateY = calculateFileVerticalCenterOffset;
    });
    StyleMap["DID_THROW_ITEM_PROCESSING_ERROR"].status.translateX = calculateButtonWidth;
  }
  if (alignRemoveItemButton && allowRevert) {
    LocalButtons["RevertItemProcessing"].align = "BUTTON_REMOVE_ITEM_POSITION";
    const map2 = StyleMap["DID_COMPLETE_ITEM_PROCESSING"];
    map2.info.translateX = calculateFileInfoOffset;
    map2.status.translateY = calculateFileVerticalCenterOffset;
    map2.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  if (!allowRemove) {
    LocalButtons["RemoveItem"].disabled = true;
  }
  forin(LocalButtons, (key, definition) => {
    const buttonView = root2.createChildView(fileActionButton, {
      label: root2.query(definition.label),
      icon: root2.query(definition.icon),
      opacity: 0
    });
    if (enabledButtons.includes(key)) {
      root2.appendChildView(buttonView);
    }
    if (definition.disabled) {
      buttonView.element.setAttribute("disabled", "disabled");
      buttonView.element.setAttribute("hidden", "hidden");
    }
    buttonView.element.dataset.align = root2.query(`GET_STYLE_${definition.align}`);
    buttonView.element.classList.add(definition.className);
    buttonView.on("click", (e) => {
      e.stopPropagation();
      if (definition.disabled)
        return;
      root2.dispatch(definition.action, { query: id });
    });
    root2.ref[`button${key}`] = buttonView;
  });
  root2.ref.processingCompleteIndicator = root2.appendChildView(root2.createChildView(processingCompleteIndicatorView));
  root2.ref.processingCompleteIndicator.element.dataset.align = root2.query(`GET_STYLE_BUTTON_PROCESS_ITEM_POSITION`);
  root2.ref.info = root2.appendChildView(root2.createChildView(fileInfo, { id }));
  root2.ref.status = root2.appendChildView(root2.createChildView(fileStatus, { id }));
  const loadIndicatorView = root2.appendChildView(root2.createChildView(progressIndicator, {
    opacity: 0,
    align: root2.query(`GET_STYLE_LOAD_INDICATOR_POSITION`)
  }));
  loadIndicatorView.element.classList.add("filepond--load-indicator");
  root2.ref.loadProgressIndicator = loadIndicatorView;
  const progressIndicatorView = root2.appendChildView(root2.createChildView(progressIndicator, {
    opacity: 0,
    align: root2.query(`GET_STYLE_PROGRESS_INDICATOR_POSITION`)
  }));
  progressIndicatorView.element.classList.add("filepond--process-indicator");
  root2.ref.processProgressIndicator = progressIndicatorView;
  root2.ref.activeStyles = [];
};
var write$2 = ({ root: root2, actions: actions2, props }) => {
  route({ root: root2, actions: actions2, props });
  let action = actions2.concat().filter((action2) => /^DID_/.test(action2.type)).reverse().find((action2) => StyleMap[action2.type]);
  if (action) {
    root2.ref.activeStyles = [];
    const stylesToApply = StyleMap[action.type];
    forin(DefaultStyle, (name2, defaultStyles) => {
      const control = root2.ref[name2];
      forin(defaultStyles, (key, defaultValue) => {
        const value = stylesToApply[name2] && typeof stylesToApply[name2][key] !== "undefined" ? stylesToApply[name2][key] : defaultValue;
        root2.ref.activeStyles.push({ control, key, value });
      });
    });
  }
  root2.ref.activeStyles.forEach(({ control, key, value }) => {
    control[key] = typeof value === "function" ? value(root2) : value;
  });
};
var route = createRoute({
  DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: ({ root: root2, action }) => {
    root2.ref.buttonAbortItemProcessing.label = action.value;
  },
  DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: ({ root: root2, action }) => {
    root2.ref.buttonAbortItemLoad.label = action.value;
  },
  DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL: ({ root: root2, action }) => {
    root2.ref.buttonAbortItemRemoval.label = action.value;
  },
  DID_REQUEST_ITEM_PROCESSING: ({ root: root2 }) => {
    root2.ref.processProgressIndicator.spin = true;
    root2.ref.processProgressIndicator.progress = 0;
  },
  DID_START_ITEM_LOAD: ({ root: root2 }) => {
    root2.ref.loadProgressIndicator.spin = true;
    root2.ref.loadProgressIndicator.progress = 0;
  },
  DID_START_ITEM_REMOVE: ({ root: root2 }) => {
    root2.ref.processProgressIndicator.spin = true;
    root2.ref.processProgressIndicator.progress = 0;
  },
  DID_UPDATE_ITEM_LOAD_PROGRESS: ({ root: root2, action }) => {
    root2.ref.loadProgressIndicator.spin = false;
    root2.ref.loadProgressIndicator.progress = action.progress;
  },
  DID_UPDATE_ITEM_PROCESS_PROGRESS: ({ root: root2, action }) => {
    root2.ref.processProgressIndicator.spin = false;
    root2.ref.processProgressIndicator.progress = action.progress;
  }
});
var file = createView({
  create: create$4,
  write: write$2,
  didCreateView: (root2) => {
    applyFilters("CREATE_VIEW", { ...root2, view: root2 });
  },
  name: "file"
});
var create$5 = ({ root: root2, props }) => {
  root2.ref.fileName = createElement$1("legend");
  root2.appendChild(root2.ref.fileName);
  root2.ref.file = root2.appendChildView(root2.createChildView(file, { id: props.id }));
  root2.ref.data = false;
};
var didLoadItem = ({ root: root2, props }) => {
  text(root2.ref.fileName, formatFilename(root2.query("GET_ITEM_NAME", props.id)));
};
var fileWrapper = createView({
  create: create$5,
  ignoreRect: true,
  write: createRoute({
    DID_LOAD_ITEM: didLoadItem
  }),
  didCreateView: (root2) => {
    applyFilters("CREATE_VIEW", { ...root2, view: root2 });
  },
  tag: "fieldset",
  name: "file-wrapper"
});
var PANEL_SPRING_PROPS = { type: "spring", damping: 0.6, mass: 7 };
var create$6 = ({ root: root2, props }) => {
  [
    {
      name: "top"
    },
    {
      name: "center",
      props: {
        translateY: null,
        scaleY: null
      },
      mixins: {
        animations: {
          scaleY: PANEL_SPRING_PROPS
        },
        styles: ["translateY", "scaleY"]
      }
    },
    {
      name: "bottom",
      props: {
        translateY: null
      },
      mixins: {
        animations: {
          translateY: PANEL_SPRING_PROPS
        },
        styles: ["translateY"]
      }
    }
  ].forEach((section) => {
    createSection(root2, section, props.name);
  });
  root2.element.classList.add(`filepond--${props.name}`);
  root2.ref.scalable = null;
};
var createSection = (root2, section, className) => {
  const viewConstructor = createView({
    name: `panel-${section.name} filepond--${className}`,
    mixins: section.mixins,
    ignoreRectUpdate: true
  });
  const view = root2.createChildView(viewConstructor, section.props);
  root2.ref[section.name] = root2.appendChildView(view);
};
var write$3 = ({ root: root2, props }) => {
  if (root2.ref.scalable === null || props.scalable !== root2.ref.scalable) {
    root2.ref.scalable = isBoolean(props.scalable) ? props.scalable : true;
    root2.element.dataset.scalable = root2.ref.scalable;
  }
  if (!props.height)
    return;
  const topRect = root2.ref.top.rect.element;
  const bottomRect = root2.ref.bottom.rect.element;
  const height = Math.max(topRect.height + bottomRect.height, props.height);
  root2.ref.center.translateY = topRect.height;
  root2.ref.center.scaleY = (height - topRect.height - bottomRect.height) / 100;
  root2.ref.bottom.translateY = height - bottomRect.height;
};
var panel = createView({
  name: "panel",
  read: ({ root: root2, props }) => props.heightCurrent = root2.ref.bottom.translateY,
  write: write$3,
  create: create$6,
  ignoreRect: true,
  mixins: {
    apis: ["height", "heightCurrent", "scalable"]
  }
});
var createDragHelper = (items) => {
  const itemIds = items.map((item2) => item2.id);
  let prevIndex = void 0;
  return {
    setIndex: (index) => {
      prevIndex = index;
    },
    getIndex: () => prevIndex,
    getItemIndex: (item2) => itemIds.indexOf(item2.id)
  };
};
var ITEM_TRANSLATE_SPRING = {
  type: "spring",
  stiffness: 0.75,
  damping: 0.45,
  mass: 10
};
var ITEM_SCALE_SPRING = "spring";
var StateMap = {
  DID_START_ITEM_LOAD: "busy",
  DID_UPDATE_ITEM_LOAD_PROGRESS: "loading",
  DID_THROW_ITEM_INVALID: "load-invalid",
  DID_THROW_ITEM_LOAD_ERROR: "load-error",
  DID_LOAD_ITEM: "idle",
  DID_THROW_ITEM_REMOVE_ERROR: "remove-error",
  DID_START_ITEM_REMOVE: "busy",
  DID_START_ITEM_PROCESSING: "busy processing",
  DID_REQUEST_ITEM_PROCESSING: "busy processing",
  DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing",
  DID_COMPLETE_ITEM_PROCESSING: "processing-complete",
  DID_THROW_ITEM_PROCESSING_ERROR: "processing-error",
  DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error",
  DID_ABORT_ITEM_PROCESSING: "cancelled",
  DID_REVERT_ITEM_PROCESSING: "idle"
};
var create$7 = ({ root: root2, props }) => {
  root2.ref.handleClick = (e) => root2.dispatch("DID_ACTIVATE_ITEM", { id: props.id });
  root2.element.id = `filepond--item-${props.id}`;
  root2.element.addEventListener("click", root2.ref.handleClick);
  root2.ref.container = root2.appendChildView(root2.createChildView(fileWrapper, { id: props.id }));
  root2.ref.panel = root2.appendChildView(root2.createChildView(panel, { name: "item-panel" }));
  root2.ref.panel.height = null;
  props.markedForRemoval = false;
  if (!root2.query("GET_ALLOW_REORDER"))
    return;
  root2.element.dataset.dragState = "idle";
  const grab = (e) => {
    if (!e.isPrimary)
      return;
    let removedActivateListener = false;
    const origin = {
      x: e.pageX,
      y: e.pageY
    };
    props.dragOrigin = {
      x: root2.translateX,
      y: root2.translateY
    };
    props.dragCenter = {
      x: e.offsetX,
      y: e.offsetY
    };
    const dragState = createDragHelper(root2.query("GET_ACTIVE_ITEMS"));
    root2.dispatch("DID_GRAB_ITEM", { id: props.id, dragState });
    const drag = (e2) => {
      if (!e2.isPrimary)
        return;
      e2.stopPropagation();
      e2.preventDefault();
      props.dragOffset = {
        x: e2.pageX - origin.x,
        y: e2.pageY - origin.y
      };
      const dist = props.dragOffset.x * props.dragOffset.x + props.dragOffset.y * props.dragOffset.y;
      if (dist > 16 && !removedActivateListener) {
        removedActivateListener = true;
        root2.element.removeEventListener("click", root2.ref.handleClick);
      }
      root2.dispatch("DID_DRAG_ITEM", { id: props.id, dragState });
    };
    const drop2 = (e2) => {
      if (!e2.isPrimary)
        return;
      document.removeEventListener("pointermove", drag);
      document.removeEventListener("pointerup", drop2);
      props.dragOffset = {
        x: e2.pageX - origin.x,
        y: e2.pageY - origin.y
      };
      root2.dispatch("DID_DROP_ITEM", { id: props.id, dragState });
      if (removedActivateListener) {
        setTimeout(() => root2.element.addEventListener("click", root2.ref.handleClick), 0);
      }
    };
    document.addEventListener("pointermove", drag);
    document.addEventListener("pointerup", drop2);
  };
  root2.element.addEventListener("pointerdown", grab);
};
var route$1 = createRoute({
  DID_UPDATE_PANEL_HEIGHT: ({ root: root2, action }) => {
    root2.height = action.height;
  }
});
var write$4 = createRoute({
  DID_GRAB_ITEM: ({ root: root2, props }) => {
    props.dragOrigin = {
      x: root2.translateX,
      y: root2.translateY
    };
  },
  DID_DRAG_ITEM: ({ root: root2 }) => {
    root2.element.dataset.dragState = "drag";
  },
  DID_DROP_ITEM: ({ root: root2, props }) => {
    props.dragOffset = null;
    props.dragOrigin = null;
    root2.element.dataset.dragState = "drop";
  }
}, ({ root: root2, actions: actions2, props, shouldOptimize }) => {
  if (root2.element.dataset.dragState === "drop") {
    if (root2.scaleX <= 1) {
      root2.element.dataset.dragState = "idle";
    }
  }
  let action = actions2.concat().filter((action2) => /^DID_/.test(action2.type)).reverse().find((action2) => StateMap[action2.type]);
  if (action && action.type !== props.currentState) {
    props.currentState = action.type;
    root2.element.dataset.filepondItemState = StateMap[props.currentState] || "";
  }
  const aspectRatio = root2.query("GET_ITEM_PANEL_ASPECT_RATIO") || root2.query("GET_PANEL_ASPECT_RATIO");
  if (!aspectRatio) {
    route$1({ root: root2, actions: actions2, props });
    if (!root2.height && root2.ref.container.rect.element.height > 0) {
      root2.height = root2.ref.container.rect.element.height;
    }
  } else if (!shouldOptimize) {
    root2.height = root2.rect.element.width * aspectRatio;
  }
  if (shouldOptimize) {
    root2.ref.panel.height = null;
  }
  root2.ref.panel.height = root2.height;
});
var item = createView({
  create: create$7,
  write: write$4,
  destroy: ({ root: root2, props }) => {
    root2.element.removeEventListener("click", root2.ref.handleClick);
    root2.dispatch("RELEASE_ITEM", { query: props.id });
  },
  tag: "li",
  name: "item",
  mixins: {
    apis: [
      "id",
      "interactionMethod",
      "markedForRemoval",
      "spawnDate",
      "dragCenter",
      "dragOrigin",
      "dragOffset"
    ],
    styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity", "height"],
    animations: {
      scaleX: ITEM_SCALE_SPRING,
      scaleY: ITEM_SCALE_SPRING,
      translateX: ITEM_TRANSLATE_SPRING,
      translateY: ITEM_TRANSLATE_SPRING,
      opacity: { type: "tween", duration: 150 }
    }
  }
});
var getItemsPerRow = (horizontalSpace, itemWidth) => {
  return Math.max(1, Math.floor((horizontalSpace + 1) / itemWidth));
};
var getItemIndexByPosition = (view, children, positionInView) => {
  if (!positionInView)
    return;
  const horizontalSpace = view.rect.element.width;
  const l = children.length;
  let last = null;
  if (l === 0 || positionInView.top < children[0].rect.element.top)
    return -1;
  const item2 = children[0];
  const itemRect = item2.rect.element;
  const itemHorizontalMargin = itemRect.marginLeft + itemRect.marginRight;
  const itemWidth = itemRect.width + itemHorizontalMargin;
  const itemsPerRow = getItemsPerRow(horizontalSpace, itemWidth);
  if (itemsPerRow === 1) {
    for (let index = 0; index < l; index++) {
      const child = children[index];
      const childMid = child.rect.outer.top + child.rect.element.height * 0.5;
      if (positionInView.top < childMid) {
        return index;
      }
    }
    return l;
  }
  const itemVerticalMargin = itemRect.marginTop + itemRect.marginBottom;
  const itemHeight = itemRect.height + itemVerticalMargin;
  for (let index = 0; index < l; index++) {
    const indexX = index % itemsPerRow;
    const indexY = Math.floor(index / itemsPerRow);
    const offsetX = indexX * itemWidth;
    const offsetY = indexY * itemHeight;
    const itemTop = offsetY - itemRect.marginTop;
    const itemRight = offsetX + itemWidth;
    const itemBottom = offsetY + itemHeight + itemRect.marginBottom;
    if (positionInView.top < itemBottom && positionInView.top > itemTop) {
      if (positionInView.left < itemRight) {
        return index;
      } else if (index !== l - 1) {
        last = index;
      } else {
        last = null;
      }
    }
  }
  if (last !== null) {
    return last;
  }
  return l;
};
var dropAreaDimensions = {
  height: 0,
  width: 0,
  get getHeight() {
    return this.height;
  },
  set setHeight(val) {
    if (this.height === 0 || val === 0)
      this.height = val;
  },
  get getWidth() {
    return this.width;
  },
  set setWidth(val) {
    if (this.width === 0 || val === 0)
      this.width = val;
  },
  setDimensions: function(height, width) {
    if (this.height === 0 || height === 0)
      this.height = height;
    if (this.width === 0 || width === 0)
      this.width = width;
  }
};
var create$8 = ({ root: root2 }) => {
  attr(root2.element, "role", "list");
  root2.ref.lastItemSpanwDate = Date.now();
};
var addItemView = ({ root: root2, action }) => {
  const { id, index, interactionMethod } = action;
  root2.ref.addIndex = index;
  const now = Date.now();
  let spawnDate = now;
  let opacity = 1;
  if (interactionMethod !== InteractionMethod.NONE) {
    opacity = 0;
    const cooldown = root2.query("GET_ITEM_INSERT_INTERVAL");
    const dist = now - root2.ref.lastItemSpanwDate;
    spawnDate = dist < cooldown ? now + (cooldown - dist) : now;
  }
  root2.ref.lastItemSpanwDate = spawnDate;
  root2.appendChildView(root2.createChildView(item, {
    spawnDate,
    id,
    opacity,
    interactionMethod
  }), index);
};
var moveItem = (item2, x, y, vx = 0, vy = 1) => {
  if (item2.dragOffset) {
    item2.translateX = null;
    item2.translateY = null;
    item2.translateX = item2.dragOrigin.x + item2.dragOffset.x;
    item2.translateY = item2.dragOrigin.y + item2.dragOffset.y;
    item2.scaleX = 1.025;
    item2.scaleY = 1.025;
  } else {
    item2.translateX = x;
    item2.translateY = y;
    if (Date.now() > item2.spawnDate) {
      if (item2.opacity === 0) {
        introItemView(item2, x, y, vx, vy);
      }
      item2.scaleX = 1;
      item2.scaleY = 1;
      item2.opacity = 1;
    }
  }
};
var introItemView = (item2, x, y, vx, vy) => {
  if (item2.interactionMethod === InteractionMethod.NONE) {
    item2.translateX = null;
    item2.translateX = x;
    item2.translateY = null;
    item2.translateY = y;
  } else if (item2.interactionMethod === InteractionMethod.DROP) {
    item2.translateX = null;
    item2.translateX = x - vx * 20;
    item2.translateY = null;
    item2.translateY = y - vy * 10;
    item2.scaleX = 0.8;
    item2.scaleY = 0.8;
  } else if (item2.interactionMethod === InteractionMethod.BROWSE) {
    item2.translateY = null;
    item2.translateY = y - 30;
  } else if (item2.interactionMethod === InteractionMethod.API) {
    item2.translateX = null;
    item2.translateX = x - 30;
    item2.translateY = null;
  }
};
var removeItemView = ({ root: root2, action }) => {
  const { id } = action;
  const view = root2.childViews.find((child) => child.id === id);
  if (!view) {
    return;
  }
  view.scaleX = 0.9;
  view.scaleY = 0.9;
  view.opacity = 0;
  view.markedForRemoval = true;
};
var getItemHeight = (child) => child.rect.element.height + child.rect.element.marginBottom * 0.5 + child.rect.element.marginTop * 0.5;
var getItemWidth = (child) => child.rect.element.width + child.rect.element.marginLeft * 0.5 + child.rect.element.marginRight * 0.5;
var dragItem = ({ root: root2, action }) => {
  const { id, dragState } = action;
  const item2 = root2.query("GET_ITEM", { id });
  const view = root2.childViews.find((child) => child.id === id);
  const numItems = root2.childViews.length;
  const oldIndex = dragState.getItemIndex(item2);
  if (!view)
    return;
  const dragPosition = {
    x: view.dragOrigin.x + view.dragOffset.x + view.dragCenter.x,
    y: view.dragOrigin.y + view.dragOffset.y + view.dragCenter.y
  };
  const dragHeight = getItemHeight(view);
  const dragWidth = getItemWidth(view);
  let cols = Math.floor(root2.rect.outer.width / dragWidth);
  if (cols > numItems)
    cols = numItems;
  const rows = Math.floor(numItems / cols + 1);
  dropAreaDimensions.setHeight = dragHeight * rows;
  dropAreaDimensions.setWidth = dragWidth * cols;
  var location2 = {
    y: Math.floor(dragPosition.y / dragHeight),
    x: Math.floor(dragPosition.x / dragWidth),
    getGridIndex: function getGridIndex() {
      if (dragPosition.y > dropAreaDimensions.getHeight || dragPosition.y < 0 || dragPosition.x > dropAreaDimensions.getWidth || dragPosition.x < 0)
        return oldIndex;
      return this.y * cols + this.x;
    },
    getColIndex: function getColIndex() {
      const items = root2.query("GET_ACTIVE_ITEMS");
      const visibleChildren = root2.childViews.filter((child) => child.rect.element.height);
      const children = items.map((item3) => visibleChildren.find((childView) => childView.id === item3.id));
      const currentIndex2 = children.findIndex((child) => child === view);
      const dragHeight2 = getItemHeight(view);
      const l = children.length;
      let idx = l;
      let childHeight = 0;
      let childBottom = 0;
      let childTop = 0;
      for (let i = 0; i < l; i++) {
        childHeight = getItemHeight(children[i]);
        childTop = childBottom;
        childBottom = childTop + childHeight;
        if (dragPosition.y < childBottom) {
          if (currentIndex2 > i) {
            if (dragPosition.y < childTop + dragHeight2) {
              idx = i;
              break;
            }
            continue;
          }
          idx = i;
          break;
        }
      }
      return idx;
    }
  };
  const index = cols > 1 ? location2.getGridIndex() : location2.getColIndex();
  root2.dispatch("MOVE_ITEM", { query: view, index });
  const currentIndex = dragState.getIndex();
  if (currentIndex === void 0 || currentIndex !== index) {
    dragState.setIndex(index);
    if (currentIndex === void 0)
      return;
    root2.dispatch("DID_REORDER_ITEMS", {
      items: root2.query("GET_ACTIVE_ITEMS"),
      origin: oldIndex,
      target: index
    });
  }
};
var route$2 = createRoute({
  DID_ADD_ITEM: addItemView,
  DID_REMOVE_ITEM: removeItemView,
  DID_DRAG_ITEM: dragItem
});
var write$5 = ({ root: root2, props, actions: actions2, shouldOptimize }) => {
  route$2({ root: root2, props, actions: actions2 });
  const { dragCoordinates } = props;
  const horizontalSpace = root2.rect.element.width;
  const visibleChildren = root2.childViews.filter((child) => child.rect.element.height);
  const children = root2.query("GET_ACTIVE_ITEMS").map((item2) => visibleChildren.find((child) => child.id === item2.id)).filter((item2) => item2);
  const dragIndex = dragCoordinates ? getItemIndexByPosition(root2, children, dragCoordinates) : null;
  const addIndex = root2.ref.addIndex || null;
  root2.ref.addIndex = null;
  let dragIndexOffset = 0;
  let removeIndexOffset = 0;
  let addIndexOffset = 0;
  if (children.length === 0)
    return;
  const childRect = children[0].rect.element;
  const itemVerticalMargin = childRect.marginTop + childRect.marginBottom;
  const itemHorizontalMargin = childRect.marginLeft + childRect.marginRight;
  const itemWidth = childRect.width + itemHorizontalMargin;
  const itemHeight = childRect.height + itemVerticalMargin;
  const itemsPerRow = getItemsPerRow(horizontalSpace, itemWidth);
  if (itemsPerRow === 1) {
    let offsetY = 0;
    let dragOffset = 0;
    children.forEach((child, index) => {
      if (dragIndex) {
        let dist = index - dragIndex;
        if (dist === -2) {
          dragOffset = -itemVerticalMargin * 0.25;
        } else if (dist === -1) {
          dragOffset = -itemVerticalMargin * 0.75;
        } else if (dist === 0) {
          dragOffset = itemVerticalMargin * 0.75;
        } else if (dist === 1) {
          dragOffset = itemVerticalMargin * 0.25;
        } else {
          dragOffset = 0;
        }
      }
      if (shouldOptimize) {
        child.translateX = null;
        child.translateY = null;
      }
      if (!child.markedForRemoval) {
        moveItem(child, 0, offsetY + dragOffset);
      }
      let itemHeight2 = child.rect.element.height + itemVerticalMargin;
      let visualHeight = itemHeight2 * (child.markedForRemoval ? child.opacity : 1);
      offsetY += visualHeight;
    });
  } else {
    let prevX = 0;
    let prevY = 0;
    children.forEach((child, index) => {
      if (index === dragIndex) {
        dragIndexOffset = 1;
      }
      if (index === addIndex) {
        addIndexOffset += 1;
      }
      if (child.markedForRemoval && child.opacity < 0.5) {
        removeIndexOffset -= 1;
      }
      const visualIndex = index + addIndexOffset + dragIndexOffset + removeIndexOffset;
      const indexX = visualIndex % itemsPerRow;
      const indexY = Math.floor(visualIndex / itemsPerRow);
      const offsetX = indexX * itemWidth;
      const offsetY = indexY * itemHeight;
      const vectorX = Math.sign(offsetX - prevX);
      const vectorY = Math.sign(offsetY - prevY);
      prevX = offsetX;
      prevY = offsetY;
      if (child.markedForRemoval)
        return;
      if (shouldOptimize) {
        child.translateX = null;
        child.translateY = null;
      }
      moveItem(child, offsetX, offsetY, vectorX, vectorY);
    });
  }
};
var filterSetItemActions = (child, actions2) => actions2.filter((action) => {
  if (action.data && action.data.id) {
    return child.id === action.data.id;
  }
  return true;
});
var list = createView({
  create: create$8,
  write: write$5,
  tag: "ul",
  name: "list",
  didWriteView: ({ root: root2 }) => {
    root2.childViews.filter((view) => view.markedForRemoval && view.opacity === 0 && view.resting).forEach((view) => {
      view._destroy();
      root2.removeChildView(view);
    });
  },
  filterFrameActionsForChild: filterSetItemActions,
  mixins: {
    apis: ["dragCoordinates"]
  }
});
var create$9 = ({ root: root2, props }) => {
  root2.ref.list = root2.appendChildView(root2.createChildView(list));
  props.dragCoordinates = null;
  props.overflowing = false;
};
var storeDragCoordinates = ({ root: root2, props, action }) => {
  if (!root2.query("GET_ITEM_INSERT_LOCATION_FREEDOM"))
    return;
  props.dragCoordinates = {
    left: action.position.scopeLeft - root2.ref.list.rect.element.left,
    top: action.position.scopeTop - (root2.rect.outer.top + root2.rect.element.marginTop + root2.rect.element.scrollTop)
  };
};
var clearDragCoordinates = ({ props }) => {
  props.dragCoordinates = null;
};
var route$3 = createRoute({
  DID_DRAG: storeDragCoordinates,
  DID_END_DRAG: clearDragCoordinates
});
var write$6 = ({ root: root2, props, actions: actions2 }) => {
  route$3({ root: root2, props, actions: actions2 });
  root2.ref.list.dragCoordinates = props.dragCoordinates;
  if (props.overflowing && !props.overflow) {
    props.overflowing = false;
    root2.element.dataset.state = "";
    root2.height = null;
  }
  if (props.overflow) {
    const newHeight = Math.round(props.overflow);
    if (newHeight !== root2.height) {
      props.overflowing = true;
      root2.element.dataset.state = "overflow";
      root2.height = newHeight;
    }
  }
};
var listScroller = createView({
  create: create$9,
  write: write$6,
  name: "list-scroller",
  mixins: {
    apis: ["overflow", "dragCoordinates"],
    styles: ["height", "translateY"],
    animations: {
      translateY: "spring"
    }
  }
});
var attrToggle = (element, name2, state2, enabledValue = "") => {
  if (state2) {
    attr(element, name2, enabledValue);
  } else {
    element.removeAttribute(name2);
  }
};
var resetFileInput = (input) => {
  if (!input || input.value === "") {
    return;
  }
  try {
    input.value = "";
  } catch (err) {
  }
  if (input.value) {
    const form = createElement$1("form");
    const parentNode = input.parentNode;
    const ref = input.nextSibling;
    form.appendChild(input);
    form.reset();
    if (ref) {
      parentNode.insertBefore(input, ref);
    } else {
      parentNode.appendChild(input);
    }
  }
};
var create$a = ({ root: root2, props }) => {
  root2.element.id = `filepond--browser-${props.id}`;
  attr(root2.element, "name", root2.query("GET_NAME"));
  attr(root2.element, "aria-controls", `filepond--assistant-${props.id}`);
  attr(root2.element, "aria-labelledby", `filepond--drop-label-${props.id}`);
  setAcceptedFileTypes({ root: root2, action: { value: root2.query("GET_ACCEPTED_FILE_TYPES") } });
  toggleAllowMultiple({ root: root2, action: { value: root2.query("GET_ALLOW_MULTIPLE") } });
  toggleDirectoryFilter({ root: root2, action: { value: root2.query("GET_ALLOW_DIRECTORIES_ONLY") } });
  toggleDisabled({ root: root2 });
  toggleRequired({ root: root2, action: { value: root2.query("GET_REQUIRED") } });
  setCaptureMethod({ root: root2, action: { value: root2.query("GET_CAPTURE_METHOD") } });
  root2.ref.handleChange = (e) => {
    if (!root2.element.value) {
      return;
    }
    const files = Array.from(root2.element.files).map((file2) => {
      file2._relativePath = file2.webkitRelativePath;
      return file2;
    });
    setTimeout(() => {
      props.onload(files);
      resetFileInput(root2.element);
    }, 250);
  };
  root2.element.addEventListener("change", root2.ref.handleChange);
};
var setAcceptedFileTypes = ({ root: root2, action }) => {
  if (!root2.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE"))
    return;
  attrToggle(root2.element, "accept", !!action.value, action.value ? action.value.join(",") : "");
};
var toggleAllowMultiple = ({ root: root2, action }) => {
  attrToggle(root2.element, "multiple", action.value);
};
var toggleDirectoryFilter = ({ root: root2, action }) => {
  attrToggle(root2.element, "webkitdirectory", action.value);
};
var toggleDisabled = ({ root: root2 }) => {
  const isDisabled = root2.query("GET_DISABLED");
  const doesAllowBrowse = root2.query("GET_ALLOW_BROWSE");
  const disableField = isDisabled || !doesAllowBrowse;
  attrToggle(root2.element, "disabled", disableField);
};
var toggleRequired = ({ root: root2, action }) => {
  if (!action.value) {
    attrToggle(root2.element, "required", false);
  } else if (root2.query("GET_TOTAL_ITEMS") === 0) {
    attrToggle(root2.element, "required", true);
  }
};
var setCaptureMethod = ({ root: root2, action }) => {
  attrToggle(root2.element, "capture", !!action.value, action.value === true ? "" : action.value);
};
var updateRequiredStatus = ({ root: root2 }) => {
  const { element } = root2;
  if (root2.query("GET_TOTAL_ITEMS") > 0) {
    attrToggle(element, "required", false);
    attrToggle(element, "name", false);
  } else {
    attrToggle(element, "name", true, root2.query("GET_NAME"));
    const shouldCheckValidity = root2.query("GET_CHECK_VALIDITY");
    if (shouldCheckValidity) {
      element.setCustomValidity("");
    }
    if (root2.query("GET_REQUIRED")) {
      attrToggle(element, "required", true);
    }
  }
};
var updateFieldValidityStatus = ({ root: root2 }) => {
  const shouldCheckValidity = root2.query("GET_CHECK_VALIDITY");
  if (!shouldCheckValidity)
    return;
  root2.element.setCustomValidity(root2.query("GET_LABEL_INVALID_FIELD"));
};
var browser = createView({
  tag: "input",
  name: "browser",
  ignoreRect: true,
  ignoreRectUpdate: true,
  attributes: {
    type: "file"
  },
  create: create$a,
  destroy: ({ root: root2 }) => {
    root2.element.removeEventListener("change", root2.ref.handleChange);
  },
  write: createRoute({
    DID_LOAD_ITEM: updateRequiredStatus,
    DID_REMOVE_ITEM: updateRequiredStatus,
    DID_THROW_ITEM_INVALID: updateFieldValidityStatus,
    DID_SET_DISABLED: toggleDisabled,
    DID_SET_ALLOW_BROWSE: toggleDisabled,
    DID_SET_ALLOW_DIRECTORIES_ONLY: toggleDirectoryFilter,
    DID_SET_ALLOW_MULTIPLE: toggleAllowMultiple,
    DID_SET_ACCEPTED_FILE_TYPES: setAcceptedFileTypes,
    DID_SET_CAPTURE_METHOD: setCaptureMethod,
    DID_SET_REQUIRED: toggleRequired
  })
});
var Key = {
  ENTER: 13,
  SPACE: 32
};
var create$b = ({ root: root2, props }) => {
  const label = createElement$1("label");
  attr(label, "for", `filepond--browser-${props.id}`);
  attr(label, "id", `filepond--drop-label-${props.id}`);
  attr(label, "aria-hidden", "true");
  root2.ref.handleKeyDown = (e) => {
    const isActivationKey = e.keyCode === Key.ENTER || e.keyCode === Key.SPACE;
    if (!isActivationKey)
      return;
    e.preventDefault();
    root2.ref.label.click();
  };
  root2.ref.handleClick = (e) => {
    const isLabelClick = e.target === label || label.contains(e.target);
    if (isLabelClick)
      return;
    root2.ref.label.click();
  };
  label.addEventListener("keydown", root2.ref.handleKeyDown);
  root2.element.addEventListener("click", root2.ref.handleClick);
  updateLabelValue(label, props.caption);
  root2.appendChild(label);
  root2.ref.label = label;
};
var updateLabelValue = (label, value) => {
  label.innerHTML = value;
  const clickable = label.querySelector(".filepond--label-action");
  if (clickable) {
    attr(clickable, "tabindex", "0");
  }
  return value;
};
var dropLabel = createView({
  name: "drop-label",
  ignoreRect: true,
  create: create$b,
  destroy: ({ root: root2 }) => {
    root2.ref.label.addEventListener("keydown", root2.ref.handleKeyDown);
    root2.element.removeEventListener("click", root2.ref.handleClick);
  },
  write: createRoute({
    DID_SET_LABEL_IDLE: ({ root: root2, action }) => {
      updateLabelValue(root2.ref.label, action.value);
    }
  }),
  mixins: {
    styles: ["opacity", "translateX", "translateY"],
    animations: {
      opacity: { type: "tween", duration: 150 },
      translateX: "spring",
      translateY: "spring"
    }
  }
});
var blob = createView({
  name: "drip-blob",
  ignoreRect: true,
  mixins: {
    styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
    animations: {
      scaleX: "spring",
      scaleY: "spring",
      translateX: "spring",
      translateY: "spring",
      opacity: { type: "tween", duration: 250 }
    }
  }
});
var addBlob = ({ root: root2 }) => {
  const centerX = root2.rect.element.width * 0.5;
  const centerY = root2.rect.element.height * 0.5;
  root2.ref.blob = root2.appendChildView(root2.createChildView(blob, {
    opacity: 0,
    scaleX: 2.5,
    scaleY: 2.5,
    translateX: centerX,
    translateY: centerY
  }));
};
var moveBlob = ({ root: root2, action }) => {
  if (!root2.ref.blob) {
    addBlob({ root: root2 });
    return;
  }
  root2.ref.blob.translateX = action.position.scopeLeft;
  root2.ref.blob.translateY = action.position.scopeTop;
  root2.ref.blob.scaleX = 1;
  root2.ref.blob.scaleY = 1;
  root2.ref.blob.opacity = 1;
};
var hideBlob = ({ root: root2 }) => {
  if (!root2.ref.blob) {
    return;
  }
  root2.ref.blob.opacity = 0;
};
var explodeBlob = ({ root: root2 }) => {
  if (!root2.ref.blob) {
    return;
  }
  root2.ref.blob.scaleX = 2.5;
  root2.ref.blob.scaleY = 2.5;
  root2.ref.blob.opacity = 0;
};
var write$7 = ({ root: root2, props, actions: actions2 }) => {
  route$4({ root: root2, props, actions: actions2 });
  const { blob: blob2 } = root2.ref;
  if (actions2.length === 0 && blob2 && blob2.opacity === 0) {
    root2.removeChildView(blob2);
    root2.ref.blob = null;
  }
};
var route$4 = createRoute({
  DID_DRAG: moveBlob,
  DID_DROP: explodeBlob,
  DID_END_DRAG: hideBlob
});
var drip = createView({
  ignoreRect: true,
  ignoreRectUpdate: true,
  name: "drip",
  write: write$7
});
var setInputFiles = (element, files) => {
  try {
    const dataTransfer = new DataTransfer();
    files.forEach((file2) => {
      if (file2 instanceof File) {
        dataTransfer.items.add(file2);
      } else {
        dataTransfer.items.add(new File([file2], file2.name, {
          type: file2.type
        }));
      }
    });
    element.files = dataTransfer.files;
  } catch (err) {
    return false;
  }
  return true;
};
var create$c = ({ root: root2 }) => root2.ref.fields = {};
var getField = (root2, id) => root2.ref.fields[id];
var syncFieldPositionsWithItems = (root2) => {
  root2.query("GET_ACTIVE_ITEMS").forEach((item2) => {
    if (!root2.ref.fields[item2.id])
      return;
    root2.element.appendChild(root2.ref.fields[item2.id]);
  });
};
var didReorderItems = ({ root: root2 }) => syncFieldPositionsWithItems(root2);
var didAddItem = ({ root: root2, action }) => {
  const fileItem = root2.query("GET_ITEM", action.id);
  const isLocalFile = fileItem.origin === FileOrigin.LOCAL;
  const shouldUseFileInput = !isLocalFile && root2.query("SHOULD_UPDATE_FILE_INPUT");
  const dataContainer = createElement$1("input");
  dataContainer.type = shouldUseFileInput ? "file" : "hidden";
  dataContainer.name = root2.query("GET_NAME");
  dataContainer.disabled = root2.query("GET_DISABLED");
  root2.ref.fields[action.id] = dataContainer;
  syncFieldPositionsWithItems(root2);
};
var didLoadItem$1 = ({ root: root2, action }) => {
  const field = getField(root2, action.id);
  if (!field)
    return;
  if (action.serverFileReference !== null)
    field.value = action.serverFileReference;
  if (!root2.query("SHOULD_UPDATE_FILE_INPUT"))
    return;
  const fileItem = root2.query("GET_ITEM", action.id);
  setInputFiles(field, [fileItem.file]);
};
var didPrepareOutput = ({ root: root2, action }) => {
  if (!root2.query("SHOULD_UPDATE_FILE_INPUT"))
    return;
  setTimeout(() => {
    const field = getField(root2, action.id);
    if (!field)
      return;
    setInputFiles(field, [action.file]);
  }, 0);
};
var didSetDisabled = ({ root: root2 }) => {
  root2.element.disabled = root2.query("GET_DISABLED");
};
var didRemoveItem = ({ root: root2, action }) => {
  const field = getField(root2, action.id);
  if (!field)
    return;
  if (field.parentNode)
    field.parentNode.removeChild(field);
  delete root2.ref.fields[action.id];
};
var didDefineValue = ({ root: root2, action }) => {
  const field = getField(root2, action.id);
  if (!field)
    return;
  if (action.value === null) {
    field.removeAttribute("value");
  } else {
    field.value = action.value;
  }
  syncFieldPositionsWithItems(root2);
};
var write$8 = createRoute({
  DID_SET_DISABLED: didSetDisabled,
  DID_ADD_ITEM: didAddItem,
  DID_LOAD_ITEM: didLoadItem$1,
  DID_REMOVE_ITEM: didRemoveItem,
  DID_DEFINE_VALUE: didDefineValue,
  DID_PREPARE_OUTPUT: didPrepareOutput,
  DID_REORDER_ITEMS: didReorderItems,
  DID_SORT_ITEMS: didReorderItems
});
var data2 = createView({
  tag: "fieldset",
  name: "data",
  create: create$c,
  write: write$8,
  ignoreRect: true
});
var getRootNode = (element) => "getRootNode" in element ? element.getRootNode() : document;
var images = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"];
var text$1 = ["css", "csv", "html", "txt"];
var map = {
  zip: "zip|compressed",
  epub: "application/epub+zip"
};
var guesstimateMimeType = (extension = "") => {
  extension = extension.toLowerCase();
  if (images.includes(extension)) {
    return "image/" + (extension === "jpg" ? "jpeg" : extension === "svg" ? "svg+xml" : extension);
  }
  if (text$1.includes(extension)) {
    return "text/" + extension;
  }
  return map[extension] || "";
};
var requestDataTransferItems = (dataTransfer) => new Promise((resolve, reject) => {
  const links = getLinks(dataTransfer);
  if (links.length && !hasFiles(dataTransfer)) {
    return resolve(links);
  }
  getFiles(dataTransfer).then(resolve);
});
var hasFiles = (dataTransfer) => {
  if (dataTransfer.files)
    return dataTransfer.files.length > 0;
  return false;
};
var getFiles = (dataTransfer) => new Promise((resolve, reject) => {
  const promisedFiles = (dataTransfer.items ? Array.from(dataTransfer.items) : []).filter((item2) => isFileSystemItem(item2)).map((item2) => getFilesFromItem(item2));
  if (!promisedFiles.length) {
    resolve(dataTransfer.files ? Array.from(dataTransfer.files) : []);
    return;
  }
  Promise.all(promisedFiles).then((returnedFileGroups) => {
    const files = [];
    returnedFileGroups.forEach((group) => {
      files.push.apply(files, group);
    });
    resolve(files.filter((file2) => file2).map((file2) => {
      if (!file2._relativePath)
        file2._relativePath = file2.webkitRelativePath;
      return file2;
    }));
  }).catch(console.error);
});
var isFileSystemItem = (item2) => {
  if (isEntry(item2)) {
    const entry = getAsEntry(item2);
    if (entry) {
      return entry.isFile || entry.isDirectory;
    }
  }
  return item2.kind === "file";
};
var getFilesFromItem = (item2) => new Promise((resolve, reject) => {
  if (isDirectoryEntry(item2)) {
    getFilesInDirectory(getAsEntry(item2)).then(resolve).catch(reject);
    return;
  }
  resolve([item2.getAsFile()]);
});
var getFilesInDirectory = (entry) => new Promise((resolve, reject) => {
  const files = [];
  let dirCounter = 0;
  let fileCounter = 0;
  const resolveIfDone = () => {
    if (fileCounter === 0 && dirCounter === 0) {
      resolve(files);
    }
  };
  const readEntries = (dirEntry) => {
    dirCounter++;
    const directoryReader = dirEntry.createReader();
    const readBatch = () => {
      directoryReader.readEntries((entries) => {
        if (entries.length === 0) {
          dirCounter--;
          resolveIfDone();
          return;
        }
        entries.forEach((entry2) => {
          if (entry2.isDirectory) {
            readEntries(entry2);
          } else {
            fileCounter++;
            entry2.file((file2) => {
              const correctedFile = correctMissingFileType(file2);
              if (entry2.fullPath)
                correctedFile._relativePath = entry2.fullPath;
              files.push(correctedFile);
              fileCounter--;
              resolveIfDone();
            });
          }
        });
        readBatch();
      }, reject);
    };
    readBatch();
  };
  readEntries(entry);
});
var correctMissingFileType = (file2) => {
  if (file2.type.length)
    return file2;
  const date = file2.lastModifiedDate;
  const name2 = file2.name;
  const type = guesstimateMimeType(getExtensionFromFilename(file2.name));
  if (!type.length)
    return file2;
  file2 = file2.slice(0, file2.size, type);
  file2.name = name2;
  file2.lastModifiedDate = date;
  return file2;
};
var isDirectoryEntry = (item2) => isEntry(item2) && (getAsEntry(item2) || {}).isDirectory;
var isEntry = (item2) => "webkitGetAsEntry" in item2;
var getAsEntry = (item2) => item2.webkitGetAsEntry();
var getLinks = (dataTransfer) => {
  let links = [];
  try {
    links = getLinksFromTransferMetaData(dataTransfer);
    if (links.length) {
      return links;
    }
    links = getLinksFromTransferURLData(dataTransfer);
  } catch (e) {
  }
  return links;
};
var getLinksFromTransferURLData = (dataTransfer) => {
  let data3 = dataTransfer.getData("url");
  if (typeof data3 === "string" && data3.length) {
    return [data3];
  }
  return [];
};
var getLinksFromTransferMetaData = (dataTransfer) => {
  let data3 = dataTransfer.getData("text/html");
  if (typeof data3 === "string" && data3.length) {
    const matches = data3.match(/src\s*=\s*"(.+?)"/);
    if (matches) {
      return [matches[1]];
    }
  }
  return [];
};
var dragNDropObservers = [];
var eventPosition = (e) => ({
  pageLeft: e.pageX,
  pageTop: e.pageY,
  scopeLeft: e.offsetX || e.layerX,
  scopeTop: e.offsetY || e.layerY
});
var createDragNDropClient = (element, scopeToObserve, filterElement) => {
  const observer = getDragNDropObserver(scopeToObserve);
  const client = {
    element,
    filterElement,
    state: null,
    ondrop: () => {
    },
    onenter: () => {
    },
    ondrag: () => {
    },
    onexit: () => {
    },
    onload: () => {
    },
    allowdrop: () => {
    }
  };
  client.destroy = observer.addListener(client);
  return client;
};
var getDragNDropObserver = (element) => {
  const observer = dragNDropObservers.find((item2) => item2.element === element);
  if (observer) {
    return observer;
  }
  const newObserver = createDragNDropObserver(element);
  dragNDropObservers.push(newObserver);
  return newObserver;
};
var createDragNDropObserver = (element) => {
  const clients = [];
  const routes = {
    dragenter,
    dragover,
    dragleave,
    drop
  };
  const handlers = {};
  forin(routes, (event, createHandler) => {
    handlers[event] = createHandler(element, clients);
    element.addEventListener(event, handlers[event], false);
  });
  const observer = {
    element,
    addListener: (client) => {
      clients.push(client);
      return () => {
        clients.splice(clients.indexOf(client), 1);
        if (clients.length === 0) {
          dragNDropObservers.splice(dragNDropObservers.indexOf(observer), 1);
          forin(routes, (event) => {
            element.removeEventListener(event, handlers[event], false);
          });
        }
      };
    }
  };
  return observer;
};
var elementFromPoint = (root2, point) => {
  if (!("elementFromPoint" in root2)) {
    root2 = document;
  }
  return root2.elementFromPoint(point.x, point.y);
};
var isEventTarget = (e, target) => {
  const root2 = getRootNode(target);
  const elementAtPosition = elementFromPoint(root2, {
    x: e.pageX - window.pageXOffset,
    y: e.pageY - window.pageYOffset
  });
  return elementAtPosition === target || target.contains(elementAtPosition);
};
var initialTarget = null;
var setDropEffect = (dataTransfer, effect) => {
  try {
    dataTransfer.dropEffect = effect;
  } catch (e) {
  }
};
var dragenter = (root2, clients) => (e) => {
  e.preventDefault();
  initialTarget = e.target;
  clients.forEach((client) => {
    const { element, onenter } = client;
    if (isEventTarget(e, element)) {
      client.state = "enter";
      onenter(eventPosition(e));
    }
  });
};
var dragover = (root2, clients) => (e) => {
  e.preventDefault();
  const dataTransfer = e.dataTransfer;
  requestDataTransferItems(dataTransfer).then((items) => {
    let overDropTarget = false;
    clients.some((client) => {
      const { filterElement, element, onenter, onexit, ondrag, allowdrop } = client;
      setDropEffect(dataTransfer, "copy");
      const allowsTransfer = allowdrop(items);
      if (!allowsTransfer) {
        setDropEffect(dataTransfer, "none");
        return;
      }
      if (isEventTarget(e, element)) {
        overDropTarget = true;
        if (client.state === null) {
          client.state = "enter";
          onenter(eventPosition(e));
          return;
        }
        client.state = "over";
        if (filterElement && !allowsTransfer) {
          setDropEffect(dataTransfer, "none");
          return;
        }
        ondrag(eventPosition(e));
      } else {
        if (filterElement && !overDropTarget) {
          setDropEffect(dataTransfer, "none");
        }
        if (client.state) {
          client.state = null;
          onexit(eventPosition(e));
        }
      }
    });
  });
};
var drop = (root2, clients) => (e) => {
  e.preventDefault();
  const dataTransfer = e.dataTransfer;
  requestDataTransferItems(dataTransfer).then((items) => {
    clients.forEach((client) => {
      const { filterElement, element, ondrop, onexit, allowdrop } = client;
      client.state = null;
      if (filterElement && !isEventTarget(e, element))
        return;
      if (!allowdrop(items))
        return onexit(eventPosition(e));
      ondrop(eventPosition(e), items);
    });
  });
};
var dragleave = (root2, clients) => (e) => {
  if (initialTarget !== e.target) {
    return;
  }
  clients.forEach((client) => {
    const { onexit } = client;
    client.state = null;
    onexit(eventPosition(e));
  });
};
var createHopper = (scope, validateItems, options) => {
  scope.classList.add("filepond--hopper");
  const { catchesDropsOnPage, requiresDropOnElement, filterItems = (items) => items } = options;
  const client = createDragNDropClient(scope, catchesDropsOnPage ? document.documentElement : scope, requiresDropOnElement);
  let lastState = "";
  let currentState = "";
  client.allowdrop = (items) => {
    return validateItems(filterItems(items));
  };
  client.ondrop = (position, items) => {
    const filteredItems = filterItems(items);
    if (!validateItems(filteredItems)) {
      api.ondragend(position);
      return;
    }
    currentState = "drag-drop";
    api.onload(filteredItems, position);
  };
  client.ondrag = (position) => {
    api.ondrag(position);
  };
  client.onenter = (position) => {
    currentState = "drag-over";
    api.ondragstart(position);
  };
  client.onexit = (position) => {
    currentState = "drag-exit";
    api.ondragend(position);
  };
  const api = {
    updateHopperState: () => {
      if (lastState !== currentState) {
        scope.dataset.hopperState = currentState;
        lastState = currentState;
      }
    },
    onload: () => {
    },
    ondragstart: () => {
    },
    ondrag: () => {
    },
    ondragend: () => {
    },
    destroy: () => {
      client.destroy();
    }
  };
  return api;
};
var listening = false;
var listeners$1 = [];
var handlePaste = (e) => {
  const activeEl = document.activeElement;
  if (activeEl && /textarea|input/i.test(activeEl.nodeName)) {
    let inScope = false;
    let element = activeEl;
    while (element !== document.body) {
      if (element.classList.contains("filepond--root")) {
        inScope = true;
        break;
      }
      element = element.parentNode;
    }
    if (!inScope)
      return;
  }
  requestDataTransferItems(e.clipboardData).then((files) => {
    if (!files.length) {
      return;
    }
    listeners$1.forEach((listener) => listener(files));
  });
};
var listen = (cb) => {
  if (listeners$1.includes(cb)) {
    return;
  }
  listeners$1.push(cb);
  if (listening) {
    return;
  }
  listening = true;
  document.addEventListener("paste", handlePaste);
};
var unlisten = (listener) => {
  arrayRemove(listeners$1, listeners$1.indexOf(listener));
  if (listeners$1.length === 0) {
    document.removeEventListener("paste", handlePaste);
    listening = false;
  }
};
var createPaster = () => {
  const cb = (files) => {
    api.onload(files);
  };
  const api = {
    destroy: () => {
      unlisten(cb);
    },
    onload: () => {
    }
  };
  listen(cb);
  return api;
};
var create$d = ({ root: root2, props }) => {
  root2.element.id = `filepond--assistant-${props.id}`;
  attr(root2.element, "role", "status");
  attr(root2.element, "aria-live", "polite");
  attr(root2.element, "aria-relevant", "additions");
};
var addFilesNotificationTimeout = null;
var notificationClearTimeout = null;
var filenames = [];
var assist = (root2, message) => {
  root2.element.textContent = message;
};
var clear$1 = (root2) => {
  root2.element.textContent = "";
};
var listModified = (root2, filename, label) => {
  const total = root2.query("GET_TOTAL_ITEMS");
  assist(root2, `${label} ${filename}, ${total} ${total === 1 ? root2.query("GET_LABEL_FILE_COUNT_SINGULAR") : root2.query("GET_LABEL_FILE_COUNT_PLURAL")}`);
  clearTimeout(notificationClearTimeout);
  notificationClearTimeout = setTimeout(() => {
    clear$1(root2);
  }, 1500);
};
var isUsingFilePond = (root2) => root2.element.parentNode.contains(document.activeElement);
var itemAdded = ({ root: root2, action }) => {
  if (!isUsingFilePond(root2)) {
    return;
  }
  root2.element.textContent = "";
  const item2 = root2.query("GET_ITEM", action.id);
  filenames.push(item2.filename);
  clearTimeout(addFilesNotificationTimeout);
  addFilesNotificationTimeout = setTimeout(() => {
    listModified(root2, filenames.join(", "), root2.query("GET_LABEL_FILE_ADDED"));
    filenames.length = 0;
  }, 750);
};
var itemRemoved = ({ root: root2, action }) => {
  if (!isUsingFilePond(root2)) {
    return;
  }
  const item2 = action.item;
  listModified(root2, item2.filename, root2.query("GET_LABEL_FILE_REMOVED"));
};
var itemProcessed = ({ root: root2, action }) => {
  const item2 = root2.query("GET_ITEM", action.id);
  const filename = item2.filename;
  const label = root2.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
  assist(root2, `${filename} ${label}`);
};
var itemProcessedUndo = ({ root: root2, action }) => {
  const item2 = root2.query("GET_ITEM", action.id);
  const filename = item2.filename;
  const label = root2.query("GET_LABEL_FILE_PROCESSING_ABORTED");
  assist(root2, `${filename} ${label}`);
};
var itemError = ({ root: root2, action }) => {
  const item2 = root2.query("GET_ITEM", action.id);
  const filename = item2.filename;
  assist(root2, `${action.status.main} ${filename} ${action.status.sub}`);
};
var assistant = createView({
  create: create$d,
  ignoreRect: true,
  ignoreRectUpdate: true,
  write: createRoute({
    DID_LOAD_ITEM: itemAdded,
    DID_REMOVE_ITEM: itemRemoved,
    DID_COMPLETE_ITEM_PROCESSING: itemProcessed,
    DID_ABORT_ITEM_PROCESSING: itemProcessedUndo,
    DID_REVERT_ITEM_PROCESSING: itemProcessedUndo,
    DID_THROW_ITEM_REMOVE_ERROR: itemError,
    DID_THROW_ITEM_LOAD_ERROR: itemError,
    DID_THROW_ITEM_INVALID: itemError,
    DID_THROW_ITEM_PROCESSING_ERROR: itemError
  }),
  tag: "span",
  name: "assistant"
});
var toCamels = (string, separator = "-") => string.replace(new RegExp(`${separator}.`, "g"), (sub) => sub.charAt(1).toUpperCase());
var debounce = (func, interval = 16, immidiateOnly = true) => {
  let last = Date.now();
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout);
    const dist = Date.now() - last;
    const fn2 = () => {
      last = Date.now();
      func(...args);
    };
    if (dist < interval) {
      if (!immidiateOnly) {
        timeout = setTimeout(fn2, interval - dist);
      }
    } else {
      fn2();
    }
  };
};
var MAX_FILES_LIMIT = 1e6;
var prevent = (e) => e.preventDefault();
var create$e = ({ root: root2, props }) => {
  const id = root2.query("GET_ID");
  if (id) {
    root2.element.id = id;
  }
  const className = root2.query("GET_CLASS_NAME");
  if (className) {
    className.split(" ").filter((name2) => name2.length).forEach((name2) => {
      root2.element.classList.add(name2);
    });
  }
  root2.ref.label = root2.appendChildView(root2.createChildView(dropLabel, {
    ...props,
    translateY: null,
    caption: root2.query("GET_LABEL_IDLE")
  }));
  root2.ref.list = root2.appendChildView(root2.createChildView(listScroller, { translateY: null }));
  root2.ref.panel = root2.appendChildView(root2.createChildView(panel, { name: "panel-root" }));
  root2.ref.assistant = root2.appendChildView(root2.createChildView(assistant, { ...props }));
  root2.ref.data = root2.appendChildView(root2.createChildView(data2, { ...props }));
  root2.ref.measure = createElement$1("div");
  root2.ref.measure.style.height = "100%";
  root2.element.appendChild(root2.ref.measure);
  root2.ref.bounds = null;
  root2.query("GET_STYLES").filter((style) => !isEmpty(style.value)).map(({ name: name2, value }) => {
    root2.element.dataset[name2] = value;
  });
  root2.ref.widthPrevious = null;
  root2.ref.widthUpdated = debounce(() => {
    root2.ref.updateHistory = [];
    root2.dispatch("DID_RESIZE_ROOT");
  }, 250);
  root2.ref.previousAspectRatio = null;
  root2.ref.updateHistory = [];
  const canHover = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
  const hasPointerEvents = "PointerEvent" in window;
  if (root2.query("GET_ALLOW_REORDER") && hasPointerEvents && !canHover) {
    root2.element.addEventListener("touchmove", prevent, { passive: false });
    root2.element.addEventListener("gesturestart", prevent);
  }
  const credits = root2.query("GET_CREDITS");
  const hasCredits = credits.length === 2;
  if (hasCredits) {
    const frag = document.createElement("a");
    frag.className = "filepond--credits";
    frag.setAttribute("aria-hidden", "true");
    frag.href = credits[0];
    frag.tabindex = -1;
    frag.target = "_blank";
    frag.rel = "noopener noreferrer";
    frag.textContent = credits[1];
    root2.element.appendChild(frag);
    root2.ref.credits = frag;
  }
};
var write$9 = ({ root: root2, props, actions: actions2 }) => {
  route$5({ root: root2, props, actions: actions2 });
  actions2.filter((action) => /^DID_SET_STYLE_/.test(action.type)).filter((action) => !isEmpty(action.data.value)).map(({ type, data: data3 }) => {
    const name2 = toCamels(type.substr(8).toLowerCase(), "_");
    root2.element.dataset[name2] = data3.value;
    root2.invalidateLayout();
  });
  if (root2.rect.element.hidden)
    return;
  if (root2.rect.element.width !== root2.ref.widthPrevious) {
    root2.ref.widthPrevious = root2.rect.element.width;
    root2.ref.widthUpdated();
  }
  let bounds = root2.ref.bounds;
  if (!bounds) {
    bounds = root2.ref.bounds = calculateRootBoundingBoxHeight(root2);
    root2.element.removeChild(root2.ref.measure);
    root2.ref.measure = null;
  }
  const { hopper, label, list: list2, panel: panel2 } = root2.ref;
  if (hopper) {
    hopper.updateHopperState();
  }
  const aspectRatio = root2.query("GET_PANEL_ASPECT_RATIO");
  const isMultiItem = root2.query("GET_ALLOW_MULTIPLE");
  const totalItems = root2.query("GET_TOTAL_ITEMS");
  const maxItems = isMultiItem ? root2.query("GET_MAX_FILES") || MAX_FILES_LIMIT : 1;
  const atMaxCapacity = totalItems === maxItems;
  const addAction = actions2.find((action) => action.type === "DID_ADD_ITEM");
  if (atMaxCapacity && addAction) {
    const interactionMethod = addAction.data.interactionMethod;
    label.opacity = 0;
    if (isMultiItem) {
      label.translateY = -40;
    } else {
      if (interactionMethod === InteractionMethod.API) {
        label.translateX = 40;
      } else if (interactionMethod === InteractionMethod.BROWSE) {
        label.translateY = 40;
      } else {
        label.translateY = 30;
      }
    }
  } else if (!atMaxCapacity) {
    label.opacity = 1;
    label.translateX = 0;
    label.translateY = 0;
  }
  const listItemMargin = calculateListItemMargin(root2);
  const listHeight = calculateListHeight(root2);
  const labelHeight = label.rect.element.height;
  const currentLabelHeight = !isMultiItem || atMaxCapacity ? 0 : labelHeight;
  const listMarginTop = atMaxCapacity ? list2.rect.element.marginTop : 0;
  const listMarginBottom = totalItems === 0 ? 0 : list2.rect.element.marginBottom;
  const visualHeight = currentLabelHeight + listMarginTop + listHeight.visual + listMarginBottom;
  const boundsHeight = currentLabelHeight + listMarginTop + listHeight.bounds + listMarginBottom;
  list2.translateY = Math.max(0, currentLabelHeight - list2.rect.element.marginTop) - listItemMargin.top;
  if (aspectRatio) {
    const width = root2.rect.element.width;
    const height = width * aspectRatio;
    if (aspectRatio !== root2.ref.previousAspectRatio) {
      root2.ref.previousAspectRatio = aspectRatio;
      root2.ref.updateHistory = [];
    }
    const history = root2.ref.updateHistory;
    history.push(width);
    const MAX_BOUNCES = 2;
    if (history.length > MAX_BOUNCES * 2) {
      const l = history.length;
      const bottom = l - 10;
      let bounces = 0;
      for (let i = l; i >= bottom; i--) {
        if (history[i] === history[i - 2]) {
          bounces++;
        }
        if (bounces >= MAX_BOUNCES) {
          return;
        }
      }
    }
    panel2.scalable = false;
    panel2.height = height;
    const listAvailableHeight = height - currentLabelHeight - (listMarginBottom - listItemMargin.bottom) - (atMaxCapacity ? listMarginTop : 0);
    if (listHeight.visual > listAvailableHeight) {
      list2.overflow = listAvailableHeight;
    } else {
      list2.overflow = null;
    }
    root2.height = height;
  } else if (bounds.fixedHeight) {
    panel2.scalable = false;
    const listAvailableHeight = bounds.fixedHeight - currentLabelHeight - (listMarginBottom - listItemMargin.bottom) - (atMaxCapacity ? listMarginTop : 0);
    if (listHeight.visual > listAvailableHeight) {
      list2.overflow = listAvailableHeight;
    } else {
      list2.overflow = null;
    }
  } else if (bounds.cappedHeight) {
    const isCappedHeight = visualHeight >= bounds.cappedHeight;
    const panelHeight = Math.min(bounds.cappedHeight, visualHeight);
    panel2.scalable = true;
    panel2.height = isCappedHeight ? panelHeight : panelHeight - listItemMargin.top - listItemMargin.bottom;
    const listAvailableHeight = panelHeight - currentLabelHeight - (listMarginBottom - listItemMargin.bottom) - (atMaxCapacity ? listMarginTop : 0);
    if (visualHeight > bounds.cappedHeight && listHeight.visual > listAvailableHeight) {
      list2.overflow = listAvailableHeight;
    } else {
      list2.overflow = null;
    }
    root2.height = Math.min(bounds.cappedHeight, boundsHeight - listItemMargin.top - listItemMargin.bottom);
  } else {
    const itemMargin = totalItems > 0 ? listItemMargin.top + listItemMargin.bottom : 0;
    panel2.scalable = true;
    panel2.height = Math.max(labelHeight, visualHeight - itemMargin);
    root2.height = Math.max(labelHeight, boundsHeight - itemMargin);
  }
  if (root2.ref.credits && panel2.heightCurrent)
    root2.ref.credits.style.transform = `translateY(${panel2.heightCurrent}px)`;
};
var calculateListItemMargin = (root2) => {
  const item2 = root2.ref.list.childViews[0].childViews[0];
  return item2 ? {
    top: item2.rect.element.marginTop,
    bottom: item2.rect.element.marginBottom
  } : {
    top: 0,
    bottom: 0
  };
};
var calculateListHeight = (root2) => {
  let visual = 0;
  let bounds = 0;
  const scrollList = root2.ref.list;
  const itemList = scrollList.childViews[0];
  const visibleChildren = itemList.childViews.filter((child) => child.rect.element.height);
  const children = root2.query("GET_ACTIVE_ITEMS").map((item2) => visibleChildren.find((child) => child.id === item2.id)).filter((item2) => item2);
  if (children.length === 0)
    return { visual, bounds };
  const horizontalSpace = itemList.rect.element.width;
  const dragIndex = getItemIndexByPosition(itemList, children, scrollList.dragCoordinates);
  const childRect = children[0].rect.element;
  const itemVerticalMargin = childRect.marginTop + childRect.marginBottom;
  const itemHorizontalMargin = childRect.marginLeft + childRect.marginRight;
  const itemWidth = childRect.width + itemHorizontalMargin;
  const itemHeight = childRect.height + itemVerticalMargin;
  const newItem = typeof dragIndex !== "undefined" && dragIndex >= 0 ? 1 : 0;
  const removedItem = children.find((child) => child.markedForRemoval && child.opacity < 0.45) ? -1 : 0;
  const verticalItemCount = children.length + newItem + removedItem;
  const itemsPerRow = getItemsPerRow(horizontalSpace, itemWidth);
  if (itemsPerRow === 1) {
    children.forEach((item2) => {
      const height = item2.rect.element.height + itemVerticalMargin;
      bounds += height;
      visual += height * item2.opacity;
    });
  } else {
    bounds = Math.ceil(verticalItemCount / itemsPerRow) * itemHeight;
    visual = bounds;
  }
  return { visual, bounds };
};
var calculateRootBoundingBoxHeight = (root2) => {
  const height = root2.ref.measureHeight || null;
  const cappedHeight = parseInt(root2.style.maxHeight, 10) || null;
  const fixedHeight = height === 0 ? null : height;
  return {
    cappedHeight,
    fixedHeight
  };
};
var exceedsMaxFiles = (root2, items) => {
  const allowReplace = root2.query("GET_ALLOW_REPLACE");
  const allowMultiple = root2.query("GET_ALLOW_MULTIPLE");
  const totalItems = root2.query("GET_TOTAL_ITEMS");
  let maxItems = root2.query("GET_MAX_FILES");
  const totalBrowseItems = items.length;
  if (!allowMultiple && totalBrowseItems > 1) {
    return true;
  }
  maxItems = allowMultiple ? maxItems : allowReplace ? maxItems : 1;
  const hasMaxItems = isInt(maxItems);
  if (hasMaxItems && totalItems + totalBrowseItems > maxItems) {
    root2.dispatch("DID_THROW_MAX_FILES", {
      source: items,
      error: createResponse("warning", 0, "Max files")
    });
    return true;
  }
  return false;
};
var getDragIndex = (list2, children, position) => {
  const itemList = list2.childViews[0];
  return getItemIndexByPosition(itemList, children, {
    left: position.scopeLeft - itemList.rect.element.left,
    top: position.scopeTop - (list2.rect.outer.top + list2.rect.element.marginTop + list2.rect.element.scrollTop)
  });
};
var toggleDrop = (root2) => {
  const isAllowed = root2.query("GET_ALLOW_DROP");
  const isDisabled = root2.query("GET_DISABLED");
  const enabled = isAllowed && !isDisabled;
  if (enabled && !root2.ref.hopper) {
    const hopper = createHopper(root2.element, (items) => {
      const beforeDropFile = root2.query("GET_BEFORE_DROP_FILE") || (() => true);
      const dropValidation = root2.query("GET_DROP_VALIDATION");
      return dropValidation ? items.every((item2) => applyFilters("ALLOW_HOPPER_ITEM", item2, {
        query: root2.query
      }).every((result) => result === true) && beforeDropFile(item2)) : true;
    }, {
      filterItems: (items) => {
        const ignoredFiles = root2.query("GET_IGNORED_FILES");
        return items.filter((item2) => {
          if (isFile(item2)) {
            return !ignoredFiles.includes(item2.name.toLowerCase());
          }
          return true;
        });
      },
      catchesDropsOnPage: root2.query("GET_DROP_ON_PAGE"),
      requiresDropOnElement: root2.query("GET_DROP_ON_ELEMENT")
    });
    hopper.onload = (items, position) => {
      const list2 = root2.ref.list.childViews[0];
      const visibleChildren = list2.childViews.filter((child) => child.rect.element.height);
      const children = root2.query("GET_ACTIVE_ITEMS").map((item2) => visibleChildren.find((child) => child.id === item2.id)).filter((item2) => item2);
      applyFilterChain("ADD_ITEMS", items, { dispatch: root2.dispatch }).then((queue) => {
        if (exceedsMaxFiles(root2, queue))
          return false;
        root2.dispatch("ADD_ITEMS", {
          items: queue,
          index: getDragIndex(root2.ref.list, children, position),
          interactionMethod: InteractionMethod.DROP
        });
      });
      root2.dispatch("DID_DROP", { position });
      root2.dispatch("DID_END_DRAG", { position });
    };
    hopper.ondragstart = (position) => {
      root2.dispatch("DID_START_DRAG", { position });
    };
    hopper.ondrag = debounce((position) => {
      root2.dispatch("DID_DRAG", { position });
    });
    hopper.ondragend = (position) => {
      root2.dispatch("DID_END_DRAG", { position });
    };
    root2.ref.hopper = hopper;
    root2.ref.drip = root2.appendChildView(root2.createChildView(drip));
  } else if (!enabled && root2.ref.hopper) {
    root2.ref.hopper.destroy();
    root2.ref.hopper = null;
    root2.removeChildView(root2.ref.drip);
  }
};
var toggleBrowse = (root2, props) => {
  const isAllowed = root2.query("GET_ALLOW_BROWSE");
  const isDisabled = root2.query("GET_DISABLED");
  const enabled = isAllowed && !isDisabled;
  if (enabled && !root2.ref.browser) {
    root2.ref.browser = root2.appendChildView(root2.createChildView(browser, {
      ...props,
      onload: (items) => {
        applyFilterChain("ADD_ITEMS", items, {
          dispatch: root2.dispatch
        }).then((queue) => {
          if (exceedsMaxFiles(root2, queue))
            return false;
          root2.dispatch("ADD_ITEMS", {
            items: queue,
            index: -1,
            interactionMethod: InteractionMethod.BROWSE
          });
        });
      }
    }), 0);
  } else if (!enabled && root2.ref.browser) {
    root2.removeChildView(root2.ref.browser);
    root2.ref.browser = null;
  }
};
var togglePaste = (root2) => {
  const isAllowed = root2.query("GET_ALLOW_PASTE");
  const isDisabled = root2.query("GET_DISABLED");
  const enabled = isAllowed && !isDisabled;
  if (enabled && !root2.ref.paster) {
    root2.ref.paster = createPaster();
    root2.ref.paster.onload = (items) => {
      applyFilterChain("ADD_ITEMS", items, { dispatch: root2.dispatch }).then((queue) => {
        if (exceedsMaxFiles(root2, queue))
          return false;
        root2.dispatch("ADD_ITEMS", {
          items: queue,
          index: -1,
          interactionMethod: InteractionMethod.PASTE
        });
      });
    };
  } else if (!enabled && root2.ref.paster) {
    root2.ref.paster.destroy();
    root2.ref.paster = null;
  }
};
var route$5 = createRoute({
  DID_SET_ALLOW_BROWSE: ({ root: root2, props }) => {
    toggleBrowse(root2, props);
  },
  DID_SET_ALLOW_DROP: ({ root: root2 }) => {
    toggleDrop(root2);
  },
  DID_SET_ALLOW_PASTE: ({ root: root2 }) => {
    togglePaste(root2);
  },
  DID_SET_DISABLED: ({ root: root2, props }) => {
    toggleDrop(root2);
    togglePaste(root2);
    toggleBrowse(root2, props);
    const isDisabled = root2.query("GET_DISABLED");
    if (isDisabled) {
      root2.element.dataset.disabled = "disabled";
    } else {
      root2.element.removeAttribute("data-disabled");
    }
  }
});
var root = createView({
  name: "root",
  read: ({ root: root2 }) => {
    if (root2.ref.measure) {
      root2.ref.measureHeight = root2.ref.measure.offsetHeight;
    }
  },
  create: create$e,
  write: write$9,
  destroy: ({ root: root2 }) => {
    if (root2.ref.paster) {
      root2.ref.paster.destroy();
    }
    if (root2.ref.hopper) {
      root2.ref.hopper.destroy();
    }
    root2.element.removeEventListener("touchmove", prevent);
    root2.element.removeEventListener("gesturestart", prevent);
  },
  mixins: {
    styles: ["height"]
  }
});
var createApp = (initialOptions = {}) => {
  let originalElement = null;
  const defaultOptions2 = getOptions();
  const store = createStore(createInitialState(defaultOptions2), [queries, createOptionQueries(defaultOptions2)], [actions, createOptionActions(defaultOptions2)]);
  store.dispatch("SET_OPTIONS", { options: initialOptions });
  const visibilityHandler = () => {
    if (document.hidden)
      return;
    store.dispatch("KICK");
  };
  document.addEventListener("visibilitychange", visibilityHandler);
  let resizeDoneTimer = null;
  let isResizing = false;
  let isResizingHorizontally = false;
  let initialWindowWidth = null;
  let currentWindowWidth = null;
  const resizeHandler = () => {
    if (!isResizing) {
      isResizing = true;
    }
    clearTimeout(resizeDoneTimer);
    resizeDoneTimer = setTimeout(() => {
      isResizing = false;
      initialWindowWidth = null;
      currentWindowWidth = null;
      if (isResizingHorizontally) {
        isResizingHorizontally = false;
        store.dispatch("DID_STOP_RESIZE");
      }
    }, 500);
  };
  window.addEventListener("resize", resizeHandler);
  const view = root(store, { id: getUniqueId() });
  let isResting = false;
  let isHidden = false;
  const readWriteApi = {
    _read: () => {
      if (isResizing) {
        currentWindowWidth = window.innerWidth;
        if (!initialWindowWidth) {
          initialWindowWidth = currentWindowWidth;
        }
        if (!isResizingHorizontally && currentWindowWidth !== initialWindowWidth) {
          store.dispatch("DID_START_RESIZE");
          isResizingHorizontally = true;
        }
      }
      if (isHidden && isResting) {
        isResting = view.element.offsetParent === null;
      }
      if (isResting)
        return;
      view._read();
      isHidden = view.rect.element.hidden;
    },
    _write: (ts) => {
      const actions2 = store.processActionQueue().filter((action) => !/^SET_/.test(action.type));
      if (isResting && !actions2.length)
        return;
      routeActionsToEvents(actions2);
      isResting = view._write(ts, actions2, isResizingHorizontally);
      removeReleasedItems(store.query("GET_ITEMS"));
      if (isResting) {
        store.processDispatchQueue();
      }
    }
  };
  const createEvent = (name2) => (data3) => {
    const event = {
      type: name2
    };
    if (!data3) {
      return event;
    }
    if (data3.hasOwnProperty("error")) {
      event.error = data3.error ? { ...data3.error } : null;
    }
    if (data3.status) {
      event.status = { ...data3.status };
    }
    if (data3.file) {
      event.output = data3.file;
    }
    if (data3.source) {
      event.file = data3.source;
    } else if (data3.item || data3.id) {
      const item2 = data3.item ? data3.item : store.query("GET_ITEM", data3.id);
      event.file = item2 ? createItemAPI(item2) : null;
    }
    if (data3.items) {
      event.items = data3.items.map(createItemAPI);
    }
    if (/progress/.test(name2)) {
      event.progress = data3.progress;
    }
    if (data3.hasOwnProperty("origin") && data3.hasOwnProperty("target")) {
      event.origin = data3.origin;
      event.target = data3.target;
    }
    return event;
  };
  const eventRoutes = {
    DID_DESTROY: createEvent("destroy"),
    DID_INIT: createEvent("init"),
    DID_THROW_MAX_FILES: createEvent("warning"),
    DID_INIT_ITEM: createEvent("initfile"),
    DID_START_ITEM_LOAD: createEvent("addfilestart"),
    DID_UPDATE_ITEM_LOAD_PROGRESS: createEvent("addfileprogress"),
    DID_LOAD_ITEM: createEvent("addfile"),
    DID_THROW_ITEM_INVALID: [createEvent("error"), createEvent("addfile")],
    DID_THROW_ITEM_LOAD_ERROR: [createEvent("error"), createEvent("addfile")],
    DID_THROW_ITEM_REMOVE_ERROR: [createEvent("error"), createEvent("removefile")],
    DID_PREPARE_OUTPUT: createEvent("preparefile"),
    DID_START_ITEM_PROCESSING: createEvent("processfilestart"),
    DID_UPDATE_ITEM_PROCESS_PROGRESS: createEvent("processfileprogress"),
    DID_ABORT_ITEM_PROCESSING: createEvent("processfileabort"),
    DID_COMPLETE_ITEM_PROCESSING: createEvent("processfile"),
    DID_COMPLETE_ITEM_PROCESSING_ALL: createEvent("processfiles"),
    DID_REVERT_ITEM_PROCESSING: createEvent("processfilerevert"),
    DID_THROW_ITEM_PROCESSING_ERROR: [createEvent("error"), createEvent("processfile")],
    DID_REMOVE_ITEM: createEvent("removefile"),
    DID_UPDATE_ITEMS: createEvent("updatefiles"),
    DID_ACTIVATE_ITEM: createEvent("activatefile"),
    DID_REORDER_ITEMS: createEvent("reorderfiles")
  };
  const exposeEvent = (event) => {
    const detail = { pond: exports, ...event };
    delete detail.type;
    view.element.dispatchEvent(new CustomEvent(`FilePond:${event.type}`, {
      detail,
      bubbles: true,
      cancelable: true,
      composed: true
    }));
    const params = [];
    if (event.hasOwnProperty("error")) {
      params.push(event.error);
    }
    if (event.hasOwnProperty("file")) {
      params.push(event.file);
    }
    const filtered = ["type", "error", "file"];
    Object.keys(event).filter((key) => !filtered.includes(key)).forEach((key) => params.push(event[key]));
    exports.fire(event.type, ...params);
    const handler = store.query(`GET_ON${event.type.toUpperCase()}`);
    if (handler) {
      handler(...params);
    }
  };
  const routeActionsToEvents = (actions2) => {
    if (!actions2.length)
      return;
    actions2.filter((action) => eventRoutes[action.type]).forEach((action) => {
      const routes = eventRoutes[action.type];
      (Array.isArray(routes) ? routes : [routes]).forEach((route2) => {
        if (action.type === "DID_INIT_ITEM") {
          exposeEvent(route2(action.data));
        } else {
          setTimeout(() => {
            exposeEvent(route2(action.data));
          }, 0);
        }
      });
    });
  };
  const setOptions2 = (options) => store.dispatch("SET_OPTIONS", { options });
  const getFile = (query) => store.query("GET_ACTIVE_ITEM", query);
  const prepareFile = (query) => new Promise((resolve, reject) => {
    store.dispatch("REQUEST_ITEM_PREPARE", {
      query,
      success: (item2) => {
        resolve(item2);
      },
      failure: (error2) => {
        reject(error2);
      }
    });
  });
  const addFile = (source, options = {}) => new Promise((resolve, reject) => {
    addFiles([{ source, options }], { index: options.index }).then((items) => resolve(items && items[0])).catch(reject);
  });
  const isFilePondFile = (obj) => obj.file && obj.id;
  const removeFile = (query, options) => {
    if (typeof query === "object" && !isFilePondFile(query) && !options) {
      options = query;
      query = void 0;
    }
    store.dispatch("REMOVE_ITEM", { ...options, query });
    return store.query("GET_ACTIVE_ITEM", query) === null;
  };
  const addFiles = (...args) => new Promise((resolve, reject) => {
    const sources = [];
    const options = {};
    if (isArray(args[0])) {
      sources.push.apply(sources, args[0]);
      Object.assign(options, args[1] || {});
    } else {
      const lastArgument = args[args.length - 1];
      if (typeof lastArgument === "object" && !(lastArgument instanceof Blob)) {
        Object.assign(options, args.pop());
      }
      sources.push(...args);
    }
    store.dispatch("ADD_ITEMS", {
      items: sources,
      index: options.index,
      interactionMethod: InteractionMethod.API,
      success: resolve,
      failure: reject
    });
  });
  const getFiles2 = () => store.query("GET_ACTIVE_ITEMS");
  const processFile = (query) => new Promise((resolve, reject) => {
    store.dispatch("REQUEST_ITEM_PROCESSING", {
      query,
      success: (item2) => {
        resolve(item2);
      },
      failure: (error2) => {
        reject(error2);
      }
    });
  });
  const prepareFiles = (...args) => {
    const queries2 = Array.isArray(args[0]) ? args[0] : args;
    const items = queries2.length ? queries2 : getFiles2();
    return Promise.all(items.map(prepareFile));
  };
  const processFiles = (...args) => {
    const queries2 = Array.isArray(args[0]) ? args[0] : args;
    if (!queries2.length) {
      const files = getFiles2().filter((item2) => !(item2.status === ItemStatus.IDLE && item2.origin === FileOrigin.LOCAL) && item2.status !== ItemStatus.PROCESSING && item2.status !== ItemStatus.PROCESSING_COMPLETE && item2.status !== ItemStatus.PROCESSING_REVERT_ERROR);
      return Promise.all(files.map(processFile));
    }
    return Promise.all(queries2.map(processFile));
  };
  const removeFiles = (...args) => {
    const queries2 = Array.isArray(args[0]) ? args[0] : args;
    let options;
    if (typeof queries2[queries2.length - 1] === "object") {
      options = queries2.pop();
    } else if (Array.isArray(args[0])) {
      options = args[1];
    }
    const files = getFiles2();
    if (!queries2.length)
      return Promise.all(files.map((file2) => removeFile(file2, options)));
    const mappedQueries = queries2.map((query) => isNumber(query) ? files[query] ? files[query].id : null : query).filter((query) => query);
    return mappedQueries.map((q) => removeFile(q, options));
  };
  const exports = {
    ...on(),
    ...readWriteApi,
    ...createOptionAPI(store, defaultOptions2),
    setOptions: setOptions2,
    addFile,
    addFiles,
    getFile,
    processFile,
    prepareFile,
    removeFile,
    moveFile: (query, index) => store.dispatch("MOVE_ITEM", { query, index }),
    getFiles: getFiles2,
    processFiles,
    removeFiles,
    prepareFiles,
    sort: (compare) => store.dispatch("SORT", { compare }),
    browse: () => {
      var input = view.element.querySelector("input[type=file]");
      if (input) {
        input.click();
      }
    },
    destroy: () => {
      exports.fire("destroy", view.element);
      store.dispatch("ABORT_ALL");
      view._destroy();
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("visibilitychange", visibilityHandler);
      store.dispatch("DID_DESTROY");
    },
    insertBefore: (element) => insertBefore(view.element, element),
    insertAfter: (element) => insertAfter(view.element, element),
    appendTo: (element) => element.appendChild(view.element),
    replaceElement: (element) => {
      insertBefore(view.element, element);
      element.parentNode.removeChild(element);
      originalElement = element;
    },
    restoreElement: () => {
      if (!originalElement) {
        return;
      }
      insertAfter(originalElement, view.element);
      view.element.parentNode.removeChild(view.element);
      originalElement = null;
    },
    isAttachedTo: (element) => view.element === element || originalElement === element,
    element: {
      get: () => view.element
    },
    status: {
      get: () => store.query("GET_STATUS")
    }
  };
  store.dispatch("DID_INIT");
  return createObject(exports);
};
var createAppObject = (customOptions = {}) => {
  const defaultOptions2 = {};
  forin(getOptions(), (key, value) => {
    defaultOptions2[key] = value[0];
  });
  const app = createApp({
    ...defaultOptions2,
    ...customOptions
  });
  return app;
};
var lowerCaseFirstLetter = (string) => string.charAt(0).toLowerCase() + string.slice(1);
var attributeNameToPropertyName = (attributeName) => toCamels(attributeName.replace(/^data-/, ""));
var mapObject = (object, propertyMap) => {
  forin(propertyMap, (selector, mapping) => {
    forin(object, (property, value) => {
      const selectorRegExp = new RegExp(selector);
      const matches = selectorRegExp.test(property);
      if (!matches) {
        return;
      }
      delete object[property];
      if (mapping === false) {
        return;
      }
      if (isString(mapping)) {
        object[mapping] = value;
        return;
      }
      const group = mapping.group;
      if (isObject(mapping) && !object[group]) {
        object[group] = {};
      }
      object[group][lowerCaseFirstLetter(property.replace(selectorRegExp, ""))] = value;
    });
    if (mapping.mapping) {
      mapObject(object[mapping.group], mapping.mapping);
    }
  });
};
var getAttributesAsObject = (node, attributeMapping = {}) => {
  const attributes = [];
  forin(node.attributes, (index) => {
    attributes.push(node.attributes[index]);
  });
  const output = attributes.filter((attribute) => attribute.name).reduce((obj, attribute) => {
    const value = attr(node, attribute.name);
    obj[attributeNameToPropertyName(attribute.name)] = value === attribute.name ? true : value;
    return obj;
  }, {});
  mapObject(output, attributeMapping);
  return output;
};
var createAppAtElement = (element, options = {}) => {
  const attributeMapping = {
    "^class$": "className",
    "^multiple$": "allowMultiple",
    "^capture$": "captureMethod",
    "^webkitdirectory$": "allowDirectoriesOnly",
    "^server": {
      group: "server",
      mapping: {
        "^process": {
          group: "process"
        },
        "^revert": {
          group: "revert"
        },
        "^fetch": {
          group: "fetch"
        },
        "^restore": {
          group: "restore"
        },
        "^load": {
          group: "load"
        }
      }
    },
    "^type$": false,
    "^files$": false
  };
  applyFilters("SET_ATTRIBUTE_TO_OPTION_MAP", attributeMapping);
  const mergedOptions = {
    ...options
  };
  const attributeOptions = getAttributesAsObject(element.nodeName === "FIELDSET" ? element.querySelector("input[type=file]") : element, attributeMapping);
  Object.keys(attributeOptions).forEach((key) => {
    if (isObject(attributeOptions[key])) {
      if (!isObject(mergedOptions[key])) {
        mergedOptions[key] = {};
      }
      Object.assign(mergedOptions[key], attributeOptions[key]);
    } else {
      mergedOptions[key] = attributeOptions[key];
    }
  });
  mergedOptions.files = (options.files || []).concat(Array.from(element.querySelectorAll("input:not([type=file])")).map((input) => ({
    source: input.value,
    options: {
      type: input.dataset.type
    }
  })));
  const app = createAppObject(mergedOptions);
  if (element.files) {
    Array.from(element.files).forEach((file2) => {
      app.addFile(file2);
    });
  }
  app.replaceElement(element);
  return app;
};
var createApp$1 = (...args) => isNode(args[0]) ? createAppAtElement(...args) : createAppObject(...args);
var PRIVATE_METHODS = ["fire", "_read", "_write"];
var createAppAPI = (app) => {
  const api = {};
  copyObjectPropertiesToObject(app, api, PRIVATE_METHODS);
  return api;
};
var replaceInString = (string, replacements) => string.replace(/(?:{([a-zA-Z]+)})/g, (match, group) => replacements[group]);
var createWorker = (fn2) => {
  const workerBlob = new Blob(["(", fn2.toString(), ")()"], {
    type: "application/javascript"
  });
  const workerURL = URL.createObjectURL(workerBlob);
  const worker = new Worker(workerURL);
  return {
    transfer: (message, cb) => {
    },
    post: (message, cb, transferList) => {
      const id = getUniqueId();
      worker.onmessage = (e) => {
        if (e.data.id === id) {
          cb(e.data.message);
        }
      };
      worker.postMessage({
        id,
        message
      }, transferList);
    },
    terminate: () => {
      worker.terminate();
      URL.revokeObjectURL(workerURL);
    }
  };
};
var loadImage = (url) => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => {
    resolve(img);
  };
  img.onerror = (e) => {
    reject(e);
  };
  img.src = url;
});
var renameFile = (file2, name2) => {
  const renamedFile = file2.slice(0, file2.size, file2.type);
  renamedFile.lastModifiedDate = file2.lastModifiedDate;
  renamedFile.name = name2;
  return renamedFile;
};
var copyFile = (file2) => renameFile(file2, file2.name);
var registeredPlugins = [];
var createAppPlugin = (plugin8) => {
  if (registeredPlugins.includes(plugin8)) {
    return;
  }
  registeredPlugins.push(plugin8);
  const pluginOutline = plugin8({
    addFilter,
    utils: {
      Type,
      forin,
      isString,
      isFile,
      toNaturalFileSize,
      replaceInString,
      getExtensionFromFilename,
      getFilenameWithoutExtension,
      guesstimateMimeType,
      getFileFromBlob,
      getFilenameFromURL,
      createRoute,
      createWorker,
      createView,
      createItemAPI,
      loadImage,
      copyFile,
      renameFile,
      createBlob,
      applyFilterChain,
      text,
      getNumericAspectRatioFromString
    },
    views: {
      fileActionButton
    }
  });
  extendDefaultOptions(pluginOutline.options);
};
var isOperaMini = () => Object.prototype.toString.call(window.operamini) === "[object OperaMini]";
var hasPromises = () => "Promise" in window;
var hasBlobSlice = () => "slice" in Blob.prototype;
var hasCreateObjectURL = () => "URL" in window && "createObjectURL" in window.URL;
var hasVisibility = () => "visibilityState" in document;
var hasTiming = () => "performance" in window;
var hasCSSSupports = () => "supports" in (window.CSS || {});
var isIE11 = () => /MSIE|Trident/.test(window.navigator.userAgent);
var supported = (() => {
  const isSupported = isBrowser() && !isOperaMini() && hasVisibility() && hasPromises() && hasBlobSlice() && hasCreateObjectURL() && hasTiming() && (hasCSSSupports() || isIE11());
  return () => isSupported;
})();
var state = {
  apps: []
};
var name = "filepond";
var fn = () => {
};
var Status$1 = {};
var FileStatus = {};
var FileOrigin$1 = {};
var OptionTypes = {};
var create$f = fn;
var destroy = fn;
var parse = fn;
var find = fn;
var registerPlugin = fn;
var getOptions$1 = fn;
var setOptions$1 = fn;
if (supported()) {
  createPainter(() => {
    state.apps.forEach((app) => app._read());
  }, (ts) => {
    state.apps.forEach((app) => app._write(ts));
  });
  const dispatch = () => {
    document.dispatchEvent(new CustomEvent("FilePond:loaded", {
      detail: {
        supported,
        create: create$f,
        destroy,
        parse,
        find,
        registerPlugin,
        setOptions: setOptions$1
      }
    }));
    document.removeEventListener("DOMContentLoaded", dispatch);
  };
  if (document.readyState !== "loading") {
    setTimeout(() => dispatch(), 0);
  } else {
    document.addEventListener("DOMContentLoaded", dispatch);
  }
  const updateOptionTypes = () => forin(getOptions(), (key, value) => {
    OptionTypes[key] = value[1];
  });
  Status$1 = { ...Status };
  FileOrigin$1 = { ...FileOrigin };
  FileStatus = { ...ItemStatus };
  OptionTypes = {};
  updateOptionTypes();
  create$f = (...args) => {
    const app = createApp$1(...args);
    app.on("destroy", destroy);
    state.apps.push(app);
    return createAppAPI(app);
  };
  destroy = (hook) => {
    const indexToRemove = state.apps.findIndex((app) => app.isAttachedTo(hook));
    if (indexToRemove >= 0) {
      const app = state.apps.splice(indexToRemove, 1)[0];
      app.restoreElement();
      return true;
    }
    return false;
  };
  parse = (context) => {
    const matchedHooks = Array.from(context.querySelectorAll(`.${name}`));
    const newHooks = matchedHooks.filter((newHook) => !state.apps.find((app) => app.isAttachedTo(newHook)));
    return newHooks.map((hook) => create$f(hook));
  };
  find = (hook) => {
    const app = state.apps.find((app2) => app2.isAttachedTo(hook));
    if (!app) {
      return null;
    }
    return createAppAPI(app);
  };
  registerPlugin = (...plugins) => {
    plugins.forEach(createAppPlugin);
    updateOptionTypes();
  };
  getOptions$1 = () => {
    const opts = {};
    forin(getOptions(), (key, value) => {
      opts[key] = value[0];
    });
    return opts;
  };
  setOptions$1 = (opts) => {
    if (isObject(opts)) {
      state.apps.forEach((app) => {
        app.setOptions(opts);
      });
      setOptions(opts);
    }
    return getOptions$1();
  };
}

// node_modules/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.esm.js
var plugin = ({ addFilter: addFilter2, utils }) => {
  const { Type: Type2, replaceInString: replaceInString2, toNaturalFileSize: toNaturalFileSize2 } = utils;
  addFilter2("ALLOW_HOPPER_ITEM", (file2, { query }) => {
    if (!query("GET_ALLOW_FILE_SIZE_VALIDATION")) {
      return true;
    }
    const sizeMax = query("GET_MAX_FILE_SIZE");
    if (sizeMax !== null && file2.size >= sizeMax) {
      return false;
    }
    const sizeMin = query("GET_MIN_FILE_SIZE");
    if (sizeMin !== null && file2.size <= sizeMin) {
      return false;
    }
    return true;
  });
  addFilter2("LOAD_FILE", (file2, { query }) => new Promise((resolve, reject) => {
    if (!query("GET_ALLOW_FILE_SIZE_VALIDATION")) {
      return resolve(file2);
    }
    const fileFilter = query("GET_FILE_VALIDATE_SIZE_FILTER");
    if (fileFilter && !fileFilter(file2)) {
      return resolve(file2);
    }
    const sizeMax = query("GET_MAX_FILE_SIZE");
    if (sizeMax !== null && file2.size >= sizeMax) {
      reject({
        status: {
          main: query("GET_LABEL_MAX_FILE_SIZE_EXCEEDED"),
          sub: replaceInString2(query("GET_LABEL_MAX_FILE_SIZE"), {
            filesize: toNaturalFileSize2(sizeMax, ".", query("GET_FILE_SIZE_BASE"))
          })
        }
      });
      return;
    }
    const sizeMin = query("GET_MIN_FILE_SIZE");
    if (sizeMin !== null && file2.size <= sizeMin) {
      reject({
        status: {
          main: query("GET_LABEL_MIN_FILE_SIZE_EXCEEDED"),
          sub: replaceInString2(query("GET_LABEL_MIN_FILE_SIZE"), {
            filesize: toNaturalFileSize2(sizeMin, ".", query("GET_FILE_SIZE_BASE"))
          })
        }
      });
      return;
    }
    const totalSizeMax = query("GET_MAX_TOTAL_FILE_SIZE");
    if (totalSizeMax !== null) {
      const currentTotalSize = query("GET_ACTIVE_ITEMS").reduce((total, item2) => {
        return total + item2.fileSize;
      }, 0);
      if (currentTotalSize > totalSizeMax) {
        reject({
          status: {
            main: query("GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED"),
            sub: replaceInString2(query("GET_LABEL_MAX_TOTAL_FILE_SIZE"), {
              filesize: toNaturalFileSize2(totalSizeMax)
            })
          }
        });
        return;
      }
    }
    resolve(file2);
  }));
  return {
    options: {
      allowFileSizeValidation: [true, Type2.BOOLEAN],
      maxFileSize: [null, Type2.INT],
      minFileSize: [null, Type2.INT],
      maxTotalFileSize: [null, Type2.INT],
      fileValidateSizeFilter: [null, Type2.FUNCTION],
      labelMinFileSizeExceeded: ["File is too small", Type2.STRING],
      labelMinFileSize: ["Minimum file size is {filesize}", Type2.STRING],
      labelMaxFileSizeExceeded: ["File is too large", Type2.STRING],
      labelMaxFileSize: ["Maximum file size is {filesize}", Type2.STRING],
      labelMaxTotalFileSizeExceeded: ["Maximum total size exceeded", Type2.STRING],
      labelMaxTotalFileSize: ["Maximum total file size is {filesize}", Type2.STRING]
    }
  };
};
var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined";
if (isBrowser2) {
  document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: plugin }));
}
var filepond_plugin_file_validate_size_esm_default = plugin;

// node_modules/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js
var plugin2 = ({ addFilter: addFilter2, utils }) => {
  const {
    Type: Type2,
    isString: isString2,
    replaceInString: replaceInString2,
    guesstimateMimeType: guesstimateMimeType2,
    getExtensionFromFilename: getExtensionFromFilename2,
    getFilenameFromURL: getFilenameFromURL2
  } = utils;
  const mimeTypeMatchesWildCard = (mimeType, wildcard) => {
    const mimeTypeGroup = (/^[^/]+/.exec(mimeType) || []).pop();
    const wildcardGroup = wildcard.slice(0, -2);
    return mimeTypeGroup === wildcardGroup;
  };
  const isValidMimeType = (acceptedTypes, userInputType) => acceptedTypes.some((acceptedType) => {
    if (/\*$/.test(acceptedType)) {
      return mimeTypeMatchesWildCard(userInputType, acceptedType);
    }
    return acceptedType === userInputType;
  });
  const getItemType = (item2) => {
    let type = "";
    if (isString2(item2)) {
      const filename = getFilenameFromURL2(item2);
      const extension = getExtensionFromFilename2(filename);
      if (extension) {
        type = guesstimateMimeType2(extension);
      }
    } else {
      type = item2.type;
    }
    return type;
  };
  const validateFile = (item2, acceptedFileTypes, typeDetector) => {
    if (acceptedFileTypes.length === 0) {
      return true;
    }
    const type = getItemType(item2);
    if (!typeDetector) {
      return isValidMimeType(acceptedFileTypes, type);
    }
    return new Promise((resolve, reject) => {
      typeDetector(item2, type).then((detectedType) => {
        if (isValidMimeType(acceptedFileTypes, detectedType)) {
          resolve();
        } else {
          reject();
        }
      }).catch(reject);
    });
  };
  const applyMimeTypeMap = (map2) => (acceptedFileType) => map2[acceptedFileType] === null ? false : map2[acceptedFileType] || acceptedFileType;
  addFilter2("SET_ATTRIBUTE_TO_OPTION_MAP", (map2) => Object.assign(map2, {
    accept: "acceptedFileTypes"
  }));
  addFilter2("ALLOW_HOPPER_ITEM", (file2, { query }) => {
    if (!query("GET_ALLOW_FILE_TYPE_VALIDATION")) {
      return true;
    }
    return validateFile(file2, query("GET_ACCEPTED_FILE_TYPES"));
  });
  addFilter2("LOAD_FILE", (file2, { query }) => new Promise((resolve, reject) => {
    if (!query("GET_ALLOW_FILE_TYPE_VALIDATION")) {
      resolve(file2);
      return;
    }
    const acceptedFileTypes = query("GET_ACCEPTED_FILE_TYPES");
    const typeDetector = query("GET_FILE_VALIDATE_TYPE_DETECT_TYPE");
    const validationResult = validateFile(file2, acceptedFileTypes, typeDetector);
    const handleRejection = () => {
      const acceptedFileTypesMapped = acceptedFileTypes.map(applyMimeTypeMap(query("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP"))).filter((label) => label !== false);
      reject({
        status: {
          main: query("GET_LABEL_FILE_TYPE_NOT_ALLOWED"),
          sub: replaceInString2(query("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES"), {
            allTypes: acceptedFileTypesMapped.join(", "),
            allButLastType: acceptedFileTypesMapped.slice(0, -1).join(", "),
            lastType: acceptedFileTypesMapped[acceptedFileTypesMapped.length - 1]
          })
        }
      });
    };
    if (typeof validationResult === "boolean") {
      if (!validationResult) {
        return handleRejection();
      }
      return resolve(file2);
    }
    validationResult.then(() => {
      resolve(file2);
    }).catch(handleRejection);
  }));
  return {
    options: {
      allowFileTypeValidation: [true, Type2.BOOLEAN],
      acceptedFileTypes: [[], Type2.ARRAY],
      labelFileTypeNotAllowed: ["File is of invalid type", Type2.STRING],
      fileValidateTypeLabelExpectedTypes: [
        "Expects {allButLastType} or {lastType}",
        Type2.STRING
      ],
      fileValidateTypeLabelExpectedTypesMap: [{}, Type2.OBJECT],
      fileValidateTypeDetectType: [null, Type2.FUNCTION]
    }
  };
};
var isBrowser3 = typeof window !== "undefined" && typeof window.document !== "undefined";
if (isBrowser3) {
  document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: plugin2 }));
}
var filepond_plugin_file_validate_type_esm_default = plugin2;

// node_modules/filepond-plugin-image-crop/dist/filepond-plugin-image-crop.esm.js
var isImage = (file2) => /^image/.test(file2.type);
var plugin3 = ({ addFilter: addFilter2, utils }) => {
  const { Type: Type2, isFile: isFile2, getNumericAspectRatioFromString: getNumericAspectRatioFromString2 } = utils;
  const allowCrop = (item2, query) => !(!isImage(item2.file) || !query("GET_ALLOW_IMAGE_CROP"));
  const isObject2 = (value) => typeof value === "object";
  const isNumber2 = (value) => typeof value === "number";
  const updateCrop = (item2, obj) => item2.setMetadata("crop", Object.assign({}, item2.getMetadata("crop"), obj));
  addFilter2("DID_CREATE_ITEM", (item2, { query }) => {
    item2.extend("setImageCrop", (crop) => {
      if (!allowCrop(item2, query) || !isObject2(center))
        return;
      item2.setMetadata("crop", crop);
      return crop;
    });
    item2.extend("setImageCropCenter", (center2) => {
      if (!allowCrop(item2, query) || !isObject2(center2))
        return;
      return updateCrop(item2, { center: center2 });
    });
    item2.extend("setImageCropZoom", (zoom) => {
      if (!allowCrop(item2, query) || !isNumber2(zoom))
        return;
      return updateCrop(item2, { zoom: Math.max(1, zoom) });
    });
    item2.extend("setImageCropRotation", (rotation) => {
      if (!allowCrop(item2, query) || !isNumber2(rotation))
        return;
      return updateCrop(item2, { rotation });
    });
    item2.extend("setImageCropFlip", (flip) => {
      if (!allowCrop(item2, query) || !isObject2(flip))
        return;
      return updateCrop(item2, { flip });
    });
    item2.extend("setImageCropAspectRatio", (newAspectRatio) => {
      if (!allowCrop(item2, query) || typeof newAspectRatio === "undefined")
        return;
      const currentCrop = item2.getMetadata("crop");
      const aspectRatio = getNumericAspectRatioFromString2(newAspectRatio);
      const newCrop = {
        center: {
          x: 0.5,
          y: 0.5
        },
        flip: currentCrop ? Object.assign({}, currentCrop.flip) : {
          horizontal: false,
          vertical: false
        },
        rotation: 0,
        zoom: 1,
        aspectRatio
      };
      item2.setMetadata("crop", newCrop);
      return newCrop;
    });
  });
  addFilter2("DID_LOAD_ITEM", (item2, { query }) => new Promise((resolve, reject) => {
    const file2 = item2.file;
    if (!isFile2(file2) || !isImage(file2) || !query("GET_ALLOW_IMAGE_CROP")) {
      return resolve(item2);
    }
    const crop = item2.getMetadata("crop");
    if (crop) {
      return resolve(item2);
    }
    const humanAspectRatio = query("GET_IMAGE_CROP_ASPECT_RATIO");
    item2.setMetadata("crop", {
      center: {
        x: 0.5,
        y: 0.5
      },
      flip: {
        horizontal: false,
        vertical: false
      },
      rotation: 0,
      zoom: 1,
      aspectRatio: humanAspectRatio ? getNumericAspectRatioFromString2(humanAspectRatio) : null
    });
    resolve(item2);
  }));
  return {
    options: {
      allowImageCrop: [true, Type2.BOOLEAN],
      imageCropAspectRatio: [null, Type2.STRING]
    }
  };
};
var isBrowser4 = typeof window !== "undefined" && typeof window.document !== "undefined";
if (isBrowser4) {
  document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: plugin3 }));
}
var filepond_plugin_image_crop_esm_default = plugin3;

// node_modules/filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.esm.js
var isJPEG = (file2) => /^image\/jpeg/.test(file2.type);
var Marker = {
  JPEG: 65496,
  APP1: 65505,
  EXIF: 1165519206,
  TIFF: 18761,
  Orientation: 274,
  Unknown: 65280
};
var getUint16 = (view, offset, little = false) => view.getUint16(offset, little);
var getUint32 = (view, offset, little = false) => view.getUint32(offset, little);
var getImageOrientation = (file2) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = function(e) {
    const view = new DataView(e.target.result);
    if (getUint16(view, 0) !== Marker.JPEG) {
      resolve(-1);
      return;
    }
    const length = view.byteLength;
    let offset = 2;
    while (offset < length) {
      const marker = getUint16(view, offset);
      offset += 2;
      if (marker === Marker.APP1) {
        if (getUint32(view, offset += 2) !== Marker.EXIF) {
          break;
        }
        const little = getUint16(view, offset += 6) === Marker.TIFF;
        offset += getUint32(view, offset + 4, little);
        const tags = getUint16(view, offset, little);
        offset += 2;
        for (let i = 0; i < tags; i++) {
          if (getUint16(view, offset + i * 12, little) === Marker.Orientation) {
            resolve(getUint16(view, offset + i * 12 + 8, little));
            return;
          }
        }
      } else if ((marker & Marker.Unknown) !== Marker.Unknown) {
        break;
      } else {
        offset += getUint16(view, offset);
      }
    }
    resolve(-1);
  };
  reader.readAsArrayBuffer(file2.slice(0, 64 * 1024));
});
var IS_BROWSER2 = (() => typeof window !== "undefined" && typeof window.document !== "undefined")();
var isBrowser5 = () => IS_BROWSER2;
var testSrc = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=";
var shouldCorrect = void 0;
var testImage = isBrowser5() ? new Image() : {};
testImage.onload = () => shouldCorrect = testImage.naturalWidth > testImage.naturalHeight;
testImage.src = testSrc;
var shouldCorrectImageExifOrientation = () => shouldCorrect;
var plugin4 = ({ addFilter: addFilter2, utils }) => {
  const { Type: Type2, isFile: isFile2 } = utils;
  addFilter2("DID_LOAD_ITEM", (item2, { query }) => new Promise((resolve, reject) => {
    const file2 = item2.file;
    if (!isFile2(file2) || !isJPEG(file2) || !query("GET_ALLOW_IMAGE_EXIF_ORIENTATION") || !shouldCorrectImageExifOrientation()) {
      return resolve(item2);
    }
    getImageOrientation(file2).then((orientation) => {
      item2.setMetadata("exif", { orientation });
      resolve(item2);
    });
  }));
  return {
    options: {
      allowImageExifOrientation: [true, Type2.BOOLEAN]
    }
  };
};
var isBrowser$1 = typeof window !== "undefined" && typeof window.document !== "undefined";
if (isBrowser$1) {
  document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: plugin4 }));
}
var filepond_plugin_image_exif_orientation_esm_default = plugin4;

// node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js
var isPreviewableImage = (file2) => /^image/.test(file2.type);
var vectorMultiply = (v, amount) => createVector(v.x * amount, v.y * amount);
var vectorAdd = (a, b) => createVector(a.x + b.x, a.y + b.y);
var vectorNormalize = (v) => {
  const l = Math.sqrt(v.x * v.x + v.y * v.y);
  if (l === 0) {
    return {
      x: 0,
      y: 0
    };
  }
  return createVector(v.x / l, v.y / l);
};
var vectorRotate = (v, radians, origin) => {
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const t = createVector(v.x - origin.x, v.y - origin.y);
  return createVector(origin.x + cos * t.x - sin * t.y, origin.y + sin * t.x + cos * t.y);
};
var createVector = (x = 0, y = 0) => ({ x, y });
var getMarkupValue = (value, size, scalar = 1, axis) => {
  if (typeof value === "string") {
    return parseFloat(value) * scalar;
  }
  if (typeof value === "number") {
    return value * (axis ? size[axis] : Math.min(size.width, size.height));
  }
  return;
};
var getMarkupStyles = (markup, size, scale) => {
  const lineStyle = markup.borderStyle || markup.lineStyle || "solid";
  const fill = markup.backgroundColor || markup.fontColor || "transparent";
  const stroke = markup.borderColor || markup.lineColor || "transparent";
  const strokeWidth = getMarkupValue(markup.borderWidth || markup.lineWidth, size, scale);
  const lineCap = markup.lineCap || "round";
  const lineJoin = markup.lineJoin || "round";
  const dashes = typeof lineStyle === "string" ? "" : lineStyle.map((v) => getMarkupValue(v, size, scale)).join(",");
  const opacity = markup.opacity || 1;
  return {
    "stroke-linecap": lineCap,
    "stroke-linejoin": lineJoin,
    "stroke-width": strokeWidth || 0,
    "stroke-dasharray": dashes,
    stroke,
    fill,
    opacity
  };
};
var isDefined2 = (value) => value != null;
var getMarkupRect = (rect, size, scalar = 1) => {
  let left = getMarkupValue(rect.x, size, scalar, "width") || getMarkupValue(rect.left, size, scalar, "width");
  let top = getMarkupValue(rect.y, size, scalar, "height") || getMarkupValue(rect.top, size, scalar, "height");
  let width = getMarkupValue(rect.width, size, scalar, "width");
  let height = getMarkupValue(rect.height, size, scalar, "height");
  let right = getMarkupValue(rect.right, size, scalar, "width");
  let bottom = getMarkupValue(rect.bottom, size, scalar, "height");
  if (!isDefined2(top)) {
    if (isDefined2(height) && isDefined2(bottom)) {
      top = size.height - height - bottom;
    } else {
      top = bottom;
    }
  }
  if (!isDefined2(left)) {
    if (isDefined2(width) && isDefined2(right)) {
      left = size.width - width - right;
    } else {
      left = right;
    }
  }
  if (!isDefined2(width)) {
    if (isDefined2(left) && isDefined2(right)) {
      width = size.width - left - right;
    } else {
      width = 0;
    }
  }
  if (!isDefined2(height)) {
    if (isDefined2(top) && isDefined2(bottom)) {
      height = size.height - top - bottom;
    } else {
      height = 0;
    }
  }
  return {
    x: left || 0,
    y: top || 0,
    width: width || 0,
    height: height || 0
  };
};
var pointsToPathShape = (points) => points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
var setAttributes = (element, attr2) => Object.keys(attr2).forEach((key) => element.setAttribute(key, attr2[key]));
var ns2 = "http://www.w3.org/2000/svg";
var svg = (tag, attr2) => {
  const element = document.createElementNS(ns2, tag);
  if (attr2) {
    setAttributes(element, attr2);
  }
  return element;
};
var updateRect2 = (element) => setAttributes(element, {
  ...element.rect,
  ...element.styles
});
var updateEllipse = (element) => {
  const cx = element.rect.x + element.rect.width * 0.5;
  const cy = element.rect.y + element.rect.height * 0.5;
  const rx = element.rect.width * 0.5;
  const ry = element.rect.height * 0.5;
  return setAttributes(element, {
    cx,
    cy,
    rx,
    ry,
    ...element.styles
  });
};
var IMAGE_FIT_STYLE = {
  contain: "xMidYMid meet",
  cover: "xMidYMid slice"
};
var updateImage = (element, markup) => {
  setAttributes(element, {
    ...element.rect,
    ...element.styles,
    preserveAspectRatio: IMAGE_FIT_STYLE[markup.fit] || "none"
  });
};
var TEXT_ANCHOR = {
  left: "start",
  center: "middle",
  right: "end"
};
var updateText = (element, markup, size, scale) => {
  const fontSize = getMarkupValue(markup.fontSize, size, scale);
  const fontFamily = markup.fontFamily || "sans-serif";
  const fontWeight = markup.fontWeight || "normal";
  const textAlign = TEXT_ANCHOR[markup.textAlign] || "start";
  setAttributes(element, {
    ...element.rect,
    ...element.styles,
    "stroke-width": 0,
    "font-weight": fontWeight,
    "font-size": fontSize,
    "font-family": fontFamily,
    "text-anchor": textAlign
  });
  if (element.text !== markup.text) {
    element.text = markup.text;
    element.textContent = markup.text.length ? markup.text : " ";
  }
};
var updateLine = (element, markup, size, scale) => {
  setAttributes(element, {
    ...element.rect,
    ...element.styles,
    fill: "none"
  });
  const line = element.childNodes[0];
  const begin = element.childNodes[1];
  const end = element.childNodes[2];
  const origin = element.rect;
  const target = {
    x: element.rect.x + element.rect.width,
    y: element.rect.y + element.rect.height
  };
  setAttributes(line, {
    x1: origin.x,
    y1: origin.y,
    x2: target.x,
    y2: target.y
  });
  if (!markup.lineDecoration)
    return;
  begin.style.display = "none";
  end.style.display = "none";
  const v = vectorNormalize({
    x: target.x - origin.x,
    y: target.y - origin.y
  });
  const l = getMarkupValue(0.05, size, scale);
  if (markup.lineDecoration.indexOf("arrow-begin") !== -1) {
    const arrowBeginRotationPoint = vectorMultiply(v, l);
    const arrowBeginCenter = vectorAdd(origin, arrowBeginRotationPoint);
    const arrowBeginA = vectorRotate(origin, 2, arrowBeginCenter);
    const arrowBeginB = vectorRotate(origin, -2, arrowBeginCenter);
    setAttributes(begin, {
      style: "display:block;",
      d: `M${arrowBeginA.x},${arrowBeginA.y} L${origin.x},${origin.y} L${arrowBeginB.x},${arrowBeginB.y}`
    });
  }
  if (markup.lineDecoration.indexOf("arrow-end") !== -1) {
    const arrowEndRotationPoint = vectorMultiply(v, -l);
    const arrowEndCenter = vectorAdd(target, arrowEndRotationPoint);
    const arrowEndA = vectorRotate(target, 2, arrowEndCenter);
    const arrowEndB = vectorRotate(target, -2, arrowEndCenter);
    setAttributes(end, {
      style: "display:block;",
      d: `M${arrowEndA.x},${arrowEndA.y} L${target.x},${target.y} L${arrowEndB.x},${arrowEndB.y}`
    });
  }
};
var updatePath = (element, markup, size, scale) => {
  setAttributes(element, {
    ...element.styles,
    fill: "none",
    d: pointsToPathShape(markup.points.map((point) => ({
      x: getMarkupValue(point.x, size, scale, "width"),
      y: getMarkupValue(point.y, size, scale, "height")
    })))
  });
};
var createShape = (node) => (markup) => svg(node, { id: markup.id });
var createImage = (markup) => {
  const shape = svg("image", {
    id: markup.id,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    opacity: "0"
  });
  shape.onload = () => {
    shape.setAttribute("opacity", markup.opacity || 1);
  };
  shape.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", markup.src);
  return shape;
};
var createLine = (markup) => {
  const shape = svg("g", {
    id: markup.id,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });
  const line = svg("line");
  shape.appendChild(line);
  const begin = svg("path");
  shape.appendChild(begin);
  const end = svg("path");
  shape.appendChild(end);
  return shape;
};
var CREATE_TYPE_ROUTES = {
  image: createImage,
  rect: createShape("rect"),
  ellipse: createShape("ellipse"),
  text: createShape("text"),
  path: createShape("path"),
  line: createLine
};
var UPDATE_TYPE_ROUTES = {
  rect: updateRect2,
  ellipse: updateEllipse,
  image: updateImage,
  text: updateText,
  path: updatePath,
  line: updateLine
};
var createMarkupByType = (type, markup) => CREATE_TYPE_ROUTES[type](markup);
var updateMarkupByType = (element, type, markup, size, scale) => {
  if (type !== "path") {
    element.rect = getMarkupRect(markup, size, scale);
  }
  element.styles = getMarkupStyles(markup, size, scale);
  UPDATE_TYPE_ROUTES[type](element, markup, size, scale);
};
var MARKUP_RECT = [
  "x",
  "y",
  "left",
  "top",
  "right",
  "bottom",
  "width",
  "height"
];
var toOptionalFraction = (value) => typeof value === "string" && /%/.test(value) ? parseFloat(value) / 100 : value;
var prepareMarkup = (markup) => {
  const [type, props] = markup;
  const rect = props.points ? {} : MARKUP_RECT.reduce((prev, curr) => {
    prev[curr] = toOptionalFraction(props[curr]);
    return prev;
  }, {});
  return [
    type,
    {
      zIndex: 0,
      ...props,
      ...rect
    }
  ];
};
var sortMarkupByZIndex = (a, b) => {
  if (a[1].zIndex > b[1].zIndex) {
    return 1;
  }
  if (a[1].zIndex < b[1].zIndex) {
    return -1;
  }
  return 0;
};
var createMarkupView = (_) => _.utils.createView({
  name: "image-preview-markup",
  tag: "svg",
  ignoreRect: true,
  mixins: {
    apis: ["width", "height", "crop", "markup", "resize", "dirty"]
  },
  write: ({ root: root2, props }) => {
    if (!props.dirty)
      return;
    const { crop, resize, markup } = props;
    const viewWidth = props.width;
    const viewHeight = props.height;
    let cropWidth = crop.width;
    let cropHeight = crop.height;
    if (resize) {
      const { size: size2 } = resize;
      let outputWidth = size2 && size2.width;
      let outputHeight = size2 && size2.height;
      const outputFit = resize.mode;
      const outputUpscale = resize.upscale;
      if (outputWidth && !outputHeight)
        outputHeight = outputWidth;
      if (outputHeight && !outputWidth)
        outputWidth = outputHeight;
      const shouldUpscale = cropWidth < outputWidth && cropHeight < outputHeight;
      if (!shouldUpscale || shouldUpscale && outputUpscale) {
        let scalarWidth = outputWidth / cropWidth;
        let scalarHeight = outputHeight / cropHeight;
        if (outputFit === "force") {
          cropWidth = outputWidth;
          cropHeight = outputHeight;
        } else {
          let scalar;
          if (outputFit === "cover") {
            scalar = Math.max(scalarWidth, scalarHeight);
          } else if (outputFit === "contain") {
            scalar = Math.min(scalarWidth, scalarHeight);
          }
          cropWidth = cropWidth * scalar;
          cropHeight = cropHeight * scalar;
        }
      }
    }
    const size = {
      width: viewWidth,
      height: viewHeight
    };
    root2.element.setAttribute("width", size.width);
    root2.element.setAttribute("height", size.height);
    const scale = Math.min(viewWidth / cropWidth, viewHeight / cropHeight);
    root2.element.innerHTML = "";
    const markupFilter = root2.query("GET_IMAGE_PREVIEW_MARKUP_FILTER");
    markup.filter(markupFilter).map(prepareMarkup).sort(sortMarkupByZIndex).forEach((markup2) => {
      const [type, settings] = markup2;
      const element = createMarkupByType(type, settings);
      updateMarkupByType(element, type, settings, size, scale);
      root2.element.appendChild(element);
    });
  }
});
var createVector$1 = (x, y) => ({ x, y });
var vectorDot = (a, b) => a.x * b.x + a.y * b.y;
var vectorSubtract = (a, b) => createVector$1(a.x - b.x, a.y - b.y);
var vectorDistanceSquared = (a, b) => vectorDot(vectorSubtract(a, b), vectorSubtract(a, b));
var vectorDistance = (a, b) => Math.sqrt(vectorDistanceSquared(a, b));
var getOffsetPointOnEdge = (length, rotation) => {
  const a = length;
  const A = 1.5707963267948966;
  const B = rotation;
  const C3 = 1.5707963267948966 - rotation;
  const sinA = Math.sin(A);
  const sinB = Math.sin(B);
  const sinC = Math.sin(C3);
  const cosC = Math.cos(C3);
  const ratio = a / sinA;
  const b = ratio * sinB;
  const c = ratio * sinC;
  return createVector$1(cosC * b, cosC * c);
};
var getRotatedRectSize = (rect, rotation) => {
  const w = rect.width;
  const h = rect.height;
  const hor = getOffsetPointOnEdge(w, rotation);
  const ver = getOffsetPointOnEdge(h, rotation);
  const tl = createVector$1(rect.x + Math.abs(hor.x), rect.y - Math.abs(hor.y));
  const tr = createVector$1(rect.x + rect.width + Math.abs(ver.y), rect.y + Math.abs(ver.x));
  const bl = createVector$1(rect.x - Math.abs(ver.y), rect.y + rect.height - Math.abs(ver.x));
  return {
    width: vectorDistance(tl, tr),
    height: vectorDistance(tl, bl)
  };
};
var calculateCanvasSize = (image, canvasAspectRatio, zoom = 1) => {
  const imageAspectRatio = image.height / image.width;
  let canvasWidth = 1;
  let canvasHeight = canvasAspectRatio;
  let imgWidth = 1;
  let imgHeight = imageAspectRatio;
  if (imgHeight > canvasHeight) {
    imgHeight = canvasHeight;
    imgWidth = imgHeight / imageAspectRatio;
  }
  const scalar = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
  const width = image.width / (zoom * scalar * imgWidth);
  const height = width * canvasAspectRatio;
  return {
    width,
    height
  };
};
var getImageRectZoomFactor = (imageRect, cropRect, rotation, center2) => {
  const cx = center2.x > 0.5 ? 1 - center2.x : center2.x;
  const cy = center2.y > 0.5 ? 1 - center2.y : center2.y;
  const imageWidth = cx * 2 * imageRect.width;
  const imageHeight = cy * 2 * imageRect.height;
  const rotatedCropSize = getRotatedRectSize(cropRect, rotation);
  return Math.max(rotatedCropSize.width / imageWidth, rotatedCropSize.height / imageHeight);
};
var getCenteredCropRect = (container, aspectRatio) => {
  let width = container.width;
  let height = width * aspectRatio;
  if (height > container.height) {
    height = container.height;
    width = height / aspectRatio;
  }
  const x = (container.width - width) * 0.5;
  const y = (container.height - height) * 0.5;
  return {
    x,
    y,
    width,
    height
  };
};
var getCurrentCropSize = (imageSize, crop = {}) => {
  let { zoom, rotation, center: center2, aspectRatio } = crop;
  if (!aspectRatio)
    aspectRatio = imageSize.height / imageSize.width;
  const canvasSize = calculateCanvasSize(imageSize, aspectRatio, zoom);
  const canvasCenter = {
    x: canvasSize.width * 0.5,
    y: canvasSize.height * 0.5
  };
  const stage = {
    x: 0,
    y: 0,
    width: canvasSize.width,
    height: canvasSize.height,
    center: canvasCenter
  };
  const shouldLimit = typeof crop.scaleToFit === "undefined" || crop.scaleToFit;
  const stageZoomFactor = getImageRectZoomFactor(imageSize, getCenteredCropRect(stage, aspectRatio), rotation, shouldLimit ? center2 : { x: 0.5, y: 0.5 });
  const scale = zoom * stageZoomFactor;
  return {
    widthFloat: canvasSize.width / scale,
    heightFloat: canvasSize.height / scale,
    width: Math.round(canvasSize.width / scale),
    height: Math.round(canvasSize.height / scale)
  };
};
var IMAGE_SCALE_SPRING_PROPS = {
  type: "spring",
  stiffness: 0.5,
  damping: 0.45,
  mass: 10
};
var createBitmapView = (_) => _.utils.createView({
  name: "image-bitmap",
  ignoreRect: true,
  mixins: { styles: ["scaleX", "scaleY"] },
  create: ({ root: root2, props }) => {
    root2.appendChild(props.image);
  }
});
var createImageCanvasWrapper = (_) => _.utils.createView({
  name: "image-canvas-wrapper",
  tag: "div",
  ignoreRect: true,
  mixins: {
    apis: ["crop", "width", "height"],
    styles: [
      "originX",
      "originY",
      "translateX",
      "translateY",
      "scaleX",
      "scaleY",
      "rotateZ"
    ],
    animations: {
      originX: IMAGE_SCALE_SPRING_PROPS,
      originY: IMAGE_SCALE_SPRING_PROPS,
      scaleX: IMAGE_SCALE_SPRING_PROPS,
      scaleY: IMAGE_SCALE_SPRING_PROPS,
      translateX: IMAGE_SCALE_SPRING_PROPS,
      translateY: IMAGE_SCALE_SPRING_PROPS,
      rotateZ: IMAGE_SCALE_SPRING_PROPS
    }
  },
  create: ({ root: root2, props }) => {
    props.width = props.image.width;
    props.height = props.image.height;
    root2.ref.bitmap = root2.appendChildView(root2.createChildView(createBitmapView(_), { image: props.image }));
  },
  write: ({ root: root2, props }) => {
    const { flip } = props.crop;
    const { bitmap } = root2.ref;
    bitmap.scaleX = flip.horizontal ? -1 : 1;
    bitmap.scaleY = flip.vertical ? -1 : 1;
  }
});
var createClipView = (_) => _.utils.createView({
  name: "image-clip",
  tag: "div",
  ignoreRect: true,
  mixins: {
    apis: [
      "crop",
      "markup",
      "resize",
      "width",
      "height",
      "dirty",
      "background"
    ],
    styles: ["width", "height", "opacity"],
    animations: {
      opacity: { type: "tween", duration: 250 }
    }
  },
  didWriteView: function({ root: root2, props }) {
    if (!props.background)
      return;
    root2.element.style.backgroundColor = props.background;
  },
  create: ({ root: root2, props }) => {
    root2.ref.image = root2.appendChildView(root2.createChildView(createImageCanvasWrapper(_), Object.assign({}, props)));
    root2.ref.createMarkup = () => {
      if (root2.ref.markup)
        return;
      root2.ref.markup = root2.appendChildView(root2.createChildView(createMarkupView(_), Object.assign({}, props)));
    };
    root2.ref.destroyMarkup = () => {
      if (!root2.ref.markup)
        return;
      root2.removeChildView(root2.ref.markup);
      root2.ref.markup = null;
    };
    const transparencyIndicator = root2.query("GET_IMAGE_PREVIEW_TRANSPARENCY_INDICATOR");
    if (transparencyIndicator === null)
      return;
    if (transparencyIndicator === "grid") {
      root2.element.dataset.transparencyIndicator = transparencyIndicator;
    } else {
      root2.element.dataset.transparencyIndicator = "color";
    }
  },
  write: ({ root: root2, props, shouldOptimize }) => {
    const { crop, markup, resize, dirty, width, height } = props;
    root2.ref.image.crop = crop;
    const stage = {
      x: 0,
      y: 0,
      width,
      height,
      center: {
        x: width * 0.5,
        y: height * 0.5
      }
    };
    const image = {
      width: root2.ref.image.width,
      height: root2.ref.image.height
    };
    const origin = {
      x: crop.center.x * image.width,
      y: crop.center.y * image.height
    };
    const translation = {
      x: stage.center.x - image.width * crop.center.x,
      y: stage.center.y - image.height * crop.center.y
    };
    const rotation = Math.PI * 2 + crop.rotation % (Math.PI * 2);
    const cropAspectRatio = crop.aspectRatio || image.height / image.width;
    const shouldLimit = typeof crop.scaleToFit === "undefined" || crop.scaleToFit;
    const stageZoomFactor = getImageRectZoomFactor(image, getCenteredCropRect(stage, cropAspectRatio), rotation, shouldLimit ? crop.center : { x: 0.5, y: 0.5 });
    const scale = crop.zoom * stageZoomFactor;
    if (markup && markup.length) {
      root2.ref.createMarkup();
      root2.ref.markup.width = width;
      root2.ref.markup.height = height;
      root2.ref.markup.resize = resize;
      root2.ref.markup.dirty = dirty;
      root2.ref.markup.markup = markup;
      root2.ref.markup.crop = getCurrentCropSize(image, crop);
    } else if (root2.ref.markup) {
      root2.ref.destroyMarkup();
    }
    const imageView = root2.ref.image;
    if (shouldOptimize) {
      imageView.originX = null;
      imageView.originY = null;
      imageView.translateX = null;
      imageView.translateY = null;
      imageView.rotateZ = null;
      imageView.scaleX = null;
      imageView.scaleY = null;
      return;
    }
    imageView.originX = origin.x;
    imageView.originY = origin.y;
    imageView.translateX = translation.x;
    imageView.translateY = translation.y;
    imageView.rotateZ = rotation;
    imageView.scaleX = scale;
    imageView.scaleY = scale;
  }
});
var createImageView = (_) => _.utils.createView({
  name: "image-preview",
  tag: "div",
  ignoreRect: true,
  mixins: {
    apis: ["image", "crop", "markup", "resize", "dirty", "background"],
    styles: ["translateY", "scaleX", "scaleY", "opacity"],
    animations: {
      scaleX: IMAGE_SCALE_SPRING_PROPS,
      scaleY: IMAGE_SCALE_SPRING_PROPS,
      translateY: IMAGE_SCALE_SPRING_PROPS,
      opacity: { type: "tween", duration: 400 }
    }
  },
  create: ({ root: root2, props }) => {
    root2.ref.clip = root2.appendChildView(root2.createChildView(createClipView(_), {
      id: props.id,
      image: props.image,
      crop: props.crop,
      markup: props.markup,
      resize: props.resize,
      dirty: props.dirty,
      background: props.background
    }));
  },
  write: ({ root: root2, props, shouldOptimize }) => {
    const { clip } = root2.ref;
    const { image, crop, markup, resize, dirty } = props;
    clip.crop = crop;
    clip.markup = markup;
    clip.resize = resize;
    clip.dirty = dirty;
    clip.opacity = shouldOptimize ? 0 : 1;
    if (shouldOptimize || root2.rect.element.hidden)
      return;
    const imageAspectRatio = image.height / image.width;
    let aspectRatio = crop.aspectRatio || imageAspectRatio;
    const containerWidth = root2.rect.inner.width;
    const containerHeight = root2.rect.inner.height;
    let fixedPreviewHeight = root2.query("GET_IMAGE_PREVIEW_HEIGHT");
    const minPreviewHeight = root2.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
    const maxPreviewHeight = root2.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
    const panelAspectRatio = root2.query("GET_PANEL_ASPECT_RATIO");
    const allowMultiple = root2.query("GET_ALLOW_MULTIPLE");
    if (panelAspectRatio && !allowMultiple) {
      fixedPreviewHeight = containerWidth * panelAspectRatio;
      aspectRatio = panelAspectRatio;
    }
    let clipHeight = fixedPreviewHeight !== null ? fixedPreviewHeight : Math.max(minPreviewHeight, Math.min(containerWidth * aspectRatio, maxPreviewHeight));
    let clipWidth = clipHeight / aspectRatio;
    if (clipWidth > containerWidth) {
      clipWidth = containerWidth;
      clipHeight = clipWidth * aspectRatio;
    }
    if (clipHeight > containerHeight) {
      clipHeight = containerHeight;
      clipWidth = containerHeight / aspectRatio;
    }
    clip.width = clipWidth;
    clip.height = clipHeight;
  }
});
var SVG_MASK = `<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
    <defs>
        <radialGradient id="gradient-__UID__" cx=".5" cy="1.25" r="1.15">
            <stop offset='50%' stop-color='#000000'/>
            <stop offset='56%' stop-color='#0a0a0a'/>
            <stop offset='63%' stop-color='#262626'/>
            <stop offset='69%' stop-color='#4f4f4f'/>
            <stop offset='75%' stop-color='#808080'/>
            <stop offset='81%' stop-color='#b1b1b1'/>
            <stop offset='88%' stop-color='#dadada'/>
            <stop offset='94%' stop-color='#f6f6f6'/>
            <stop offset='100%' stop-color='#ffffff'/>
        </radialGradient>
        <mask id="mask-__UID__">
            <rect x="0" y="0" width="500" height="200" fill="url(#gradient-__UID__)"></rect>
        </mask>
    </defs>
    <rect x="0" width="500" height="200" fill="currentColor" mask="url(#mask-__UID__)"></rect>
</svg>`;
var SVGMaskUniqueId = 0;
var createImageOverlayView = (fpAPI) => fpAPI.utils.createView({
  name: "image-preview-overlay",
  tag: "div",
  ignoreRect: true,
  create: ({ root: root2, props }) => {
    if (document.querySelector("base")) {
      const url = window.location.href.replace(window.location.hash, "");
      SVG_MASK = SVG_MASK.replace(/url\(\#/g, "url(" + url + "#");
    }
    SVGMaskUniqueId++;
    root2.element.classList.add(`filepond--image-preview-overlay-${props.status}`);
    root2.element.innerHTML = SVG_MASK.replace(/__UID__/g, SVGMaskUniqueId);
  },
  mixins: {
    styles: ["opacity"],
    animations: {
      opacity: { type: "spring", mass: 25 }
    }
  }
});
var BitmapWorker = function() {
  self.onmessage = (e) => {
    createImageBitmap(e.data.message.file).then((bitmap) => {
      self.postMessage({ id: e.data.id, message: bitmap }, [bitmap]);
    });
  };
};
var ColorMatrixWorker = function() {
  self.onmessage = (e) => {
    const imageData = e.data.message.imageData;
    const matrix = e.data.message.colorMatrix;
    const data3 = imageData.data;
    const l = data3.length;
    const m11 = matrix[0];
    const m12 = matrix[1];
    const m13 = matrix[2];
    const m14 = matrix[3];
    const m15 = matrix[4];
    const m21 = matrix[5];
    const m22 = matrix[6];
    const m23 = matrix[7];
    const m24 = matrix[8];
    const m25 = matrix[9];
    const m31 = matrix[10];
    const m32 = matrix[11];
    const m33 = matrix[12];
    const m34 = matrix[13];
    const m35 = matrix[14];
    const m41 = matrix[15];
    const m42 = matrix[16];
    const m43 = matrix[17];
    const m44 = matrix[18];
    const m45 = matrix[19];
    let index = 0, r = 0, g = 0, b = 0, a = 0;
    for (; index < l; index += 4) {
      r = data3[index] / 255;
      g = data3[index + 1] / 255;
      b = data3[index + 2] / 255;
      a = data3[index + 3] / 255;
      data3[index] = Math.max(0, Math.min((r * m11 + g * m12 + b * m13 + a * m14 + m15) * 255, 255));
      data3[index + 1] = Math.max(0, Math.min((r * m21 + g * m22 + b * m23 + a * m24 + m25) * 255, 255));
      data3[index + 2] = Math.max(0, Math.min((r * m31 + g * m32 + b * m33 + a * m34 + m35) * 255, 255));
      data3[index + 3] = Math.max(0, Math.min((r * m41 + g * m42 + b * m43 + a * m44 + m45) * 255, 255));
    }
    self.postMessage({ id: e.data.id, message: imageData }, [
      imageData.data.buffer
    ]);
  };
};
var getImageSize = (url, cb) => {
  let image = new Image();
  image.onload = () => {
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    image = null;
    cb(width, height);
  };
  image.src = url;
};
var transforms = {
  1: () => [1, 0, 0, 1, 0, 0],
  2: (width) => [-1, 0, 0, 1, width, 0],
  3: (width, height) => [-1, 0, 0, -1, width, height],
  4: (width, height) => [1, 0, 0, -1, 0, height],
  5: () => [0, 1, 1, 0, 0, 0],
  6: (width, height) => [0, 1, -1, 0, height, 0],
  7: (width, height) => [0, -1, -1, 0, height, width],
  8: (width) => [0, -1, 1, 0, 0, width]
};
var fixImageOrientation = (ctx, width, height, orientation) => {
  if (orientation === -1) {
    return;
  }
  ctx.transform.apply(ctx, transforms[orientation](width, height));
};
var createPreviewImage = (data3, width, height, orientation) => {
  width = Math.round(width);
  height = Math.round(height);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (orientation >= 5 && orientation <= 8) {
    [width, height] = [height, width];
  }
  fixImageOrientation(ctx, width, height, orientation);
  ctx.drawImage(data3, 0, 0, width, height);
  return canvas;
};
var isBitmap = (file2) => /^image/.test(file2.type) && !/svg/.test(file2.type);
var MAX_WIDTH = 10;
var MAX_HEIGHT = 10;
var calculateAverageColor = (image) => {
  const scalar = Math.min(MAX_WIDTH / image.width, MAX_HEIGHT / image.height);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width = Math.ceil(image.width * scalar);
  const height = canvas.height = Math.ceil(image.height * scalar);
  ctx.drawImage(image, 0, 0, width, height);
  let data3 = null;
  try {
    data3 = ctx.getImageData(0, 0, width, height).data;
  } catch (e) {
    return null;
  }
  const l = data3.length;
  let r = 0;
  let g = 0;
  let b = 0;
  let i = 0;
  for (; i < l; i += 4) {
    r += data3[i] * data3[i];
    g += data3[i + 1] * data3[i + 1];
    b += data3[i + 2] * data3[i + 2];
  }
  r = averageColor(r, l);
  g = averageColor(g, l);
  b = averageColor(b, l);
  return { r, g, b };
};
var averageColor = (c, l) => Math.floor(Math.sqrt(c / (l / 4)));
var cloneCanvas = (origin, target) => {
  target = target || document.createElement("canvas");
  target.width = origin.width;
  target.height = origin.height;
  const ctx = target.getContext("2d");
  ctx.drawImage(origin, 0, 0);
  return target;
};
var cloneImageData = (imageData) => {
  let id;
  try {
    id = new ImageData(imageData.width, imageData.height);
  } catch (e) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    id = ctx.createImageData(imageData.width, imageData.height);
  }
  id.data.set(new Uint8ClampedArray(imageData.data));
  return id;
};
var loadImage2 = (url) => new Promise((resolve, reject) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    resolve(img);
  };
  img.onerror = (e) => {
    reject(e);
  };
  img.src = url;
});
var createImageWrapperView = (_) => {
  const OverlayView = createImageOverlayView(_);
  const ImageView = createImageView(_);
  const { createWorker: createWorker3 } = _.utils;
  const applyFilter = (root2, filter, target) => new Promise((resolve) => {
    if (!root2.ref.imageData) {
      root2.ref.imageData = target.getContext("2d").getImageData(0, 0, target.width, target.height);
    }
    const imageData = cloneImageData(root2.ref.imageData);
    if (!filter || filter.length !== 20) {
      target.getContext("2d").putImageData(imageData, 0, 0);
      return resolve();
    }
    const worker = createWorker3(ColorMatrixWorker);
    worker.post({
      imageData,
      colorMatrix: filter
    }, (response) => {
      target.getContext("2d").putImageData(response, 0, 0);
      worker.terminate();
      resolve();
    }, [imageData.data.buffer]);
  });
  const removeImageView = (root2, imageView) => {
    root2.removeChildView(imageView);
    imageView.image.width = 1;
    imageView.image.height = 1;
    imageView._destroy();
  };
  const shiftImage = ({ root: root2 }) => {
    const imageView = root2.ref.images.shift();
    imageView.opacity = 0;
    imageView.translateY = -15;
    root2.ref.imageViewBin.push(imageView);
    return imageView;
  };
  const pushImage = ({ root: root2, props, image }) => {
    const id = props.id;
    const item2 = root2.query("GET_ITEM", { id });
    if (!item2)
      return;
    const crop = item2.getMetadata("crop") || {
      center: {
        x: 0.5,
        y: 0.5
      },
      flip: {
        horizontal: false,
        vertical: false
      },
      zoom: 1,
      rotation: 0,
      aspectRatio: null
    };
    const background = root2.query("GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR");
    let markup;
    let resize;
    let dirty = false;
    if (root2.query("GET_IMAGE_PREVIEW_MARKUP_SHOW")) {
      markup = item2.getMetadata("markup") || [];
      resize = item2.getMetadata("resize");
      dirty = true;
    }
    const imageView = root2.appendChildView(root2.createChildView(ImageView, {
      id,
      image,
      crop,
      resize,
      markup,
      dirty,
      background,
      opacity: 0,
      scaleX: 1.15,
      scaleY: 1.15,
      translateY: 15
    }), root2.childViews.length);
    root2.ref.images.push(imageView);
    imageView.opacity = 1;
    imageView.scaleX = 1;
    imageView.scaleY = 1;
    imageView.translateY = 0;
    setTimeout(() => {
      root2.dispatch("DID_IMAGE_PREVIEW_SHOW", { id });
    }, 250);
  };
  const updateImage3 = ({ root: root2, props }) => {
    const item2 = root2.query("GET_ITEM", { id: props.id });
    if (!item2)
      return;
    const imageView = root2.ref.images[root2.ref.images.length - 1];
    imageView.crop = item2.getMetadata("crop");
    imageView.background = root2.query("GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR");
    if (root2.query("GET_IMAGE_PREVIEW_MARKUP_SHOW")) {
      imageView.dirty = true;
      imageView.resize = item2.getMetadata("resize");
      imageView.markup = item2.getMetadata("markup");
    }
  };
  const didUpdateItemMetadata = ({ root: root2, props, action }) => {
    if (!/crop|filter|markup|resize/.test(action.change.key))
      return;
    if (!root2.ref.images.length)
      return;
    const item2 = root2.query("GET_ITEM", { id: props.id });
    if (!item2)
      return;
    if (/filter/.test(action.change.key)) {
      const imageView = root2.ref.images[root2.ref.images.length - 1];
      applyFilter(root2, action.change.value, imageView.image);
      return;
    }
    if (/crop|markup|resize/.test(action.change.key)) {
      const crop = item2.getMetadata("crop");
      const image = root2.ref.images[root2.ref.images.length - 1];
      if (Math.abs(crop.aspectRatio - image.crop.aspectRatio) > 1e-5) {
        const imageView = shiftImage({ root: root2 });
        pushImage({ root: root2, props, image: cloneCanvas(imageView.image) });
      } else {
        updateImage3({ root: root2, props });
      }
    }
  };
  const canCreateImageBitmap = (file2) => {
    const userAgent = window.navigator.userAgent;
    const isFirefox = userAgent.match(/Firefox\/([0-9]+)\./);
    const firefoxVersion = isFirefox ? parseInt(isFirefox[1]) : null;
    if (firefoxVersion <= 58)
      return false;
    return "createImageBitmap" in window && isBitmap(file2);
  };
  const didCreatePreviewContainer = ({ root: root2, props }) => {
    const { id } = props;
    const item2 = root2.query("GET_ITEM", id);
    if (!item2)
      return;
    const fileURL = URL.createObjectURL(item2.file);
    getImageSize(fileURL, (width, height) => {
      root2.dispatch("DID_IMAGE_PREVIEW_CALCULATE_SIZE", {
        id,
        width,
        height
      });
    });
  };
  const drawPreview = ({ root: root2, props }) => {
    const { id } = props;
    const item2 = root2.query("GET_ITEM", id);
    if (!item2)
      return;
    const fileURL = URL.createObjectURL(item2.file);
    const loadPreviewFallback = () => {
      loadImage2(fileURL).then(previewImageLoaded);
    };
    const previewImageLoaded = (imageData) => {
      URL.revokeObjectURL(fileURL);
      const exif = item2.getMetadata("exif") || {};
      const orientation = exif.orientation || -1;
      let { width, height } = imageData;
      if (!width || !height)
        return;
      if (orientation >= 5 && orientation <= 8) {
        [width, height] = [height, width];
      }
      const pixelDensityFactor = Math.max(1, window.devicePixelRatio * 0.75);
      const zoomFactor = root2.query("GET_IMAGE_PREVIEW_ZOOM_FACTOR");
      const scaleFactor = zoomFactor * pixelDensityFactor;
      const previewImageRatio = height / width;
      const previewContainerWidth = root2.rect.element.width;
      const previewContainerHeight = root2.rect.element.height;
      let imageWidth = previewContainerWidth;
      let imageHeight = imageWidth * previewImageRatio;
      if (previewImageRatio > 1) {
        imageWidth = Math.min(width, previewContainerWidth * scaleFactor);
        imageHeight = imageWidth * previewImageRatio;
      } else {
        imageHeight = Math.min(height, previewContainerHeight * scaleFactor);
        imageWidth = imageHeight / previewImageRatio;
      }
      const previewImage = createPreviewImage(imageData, imageWidth, imageHeight, orientation);
      const done = () => {
        const averageColor2 = root2.query("GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR") ? calculateAverageColor(data) : null;
        item2.setMetadata("color", averageColor2, true);
        if ("close" in imageData) {
          imageData.close();
        }
        root2.ref.overlayShadow.opacity = 1;
        pushImage({ root: root2, props, image: previewImage });
      };
      const filter = item2.getMetadata("filter");
      if (filter) {
        applyFilter(root2, filter, previewImage).then(done);
      } else {
        done();
      }
    };
    if (canCreateImageBitmap(item2.file)) {
      const worker = createWorker3(BitmapWorker);
      worker.post({
        file: item2.file
      }, (imageBitmap) => {
        worker.terminate();
        if (!imageBitmap) {
          loadPreviewFallback();
          return;
        }
        previewImageLoaded(imageBitmap);
      });
    } else {
      loadPreviewFallback();
    }
  };
  const didDrawPreview = ({ root: root2 }) => {
    const image = root2.ref.images[root2.ref.images.length - 1];
    image.translateY = 0;
    image.scaleX = 1;
    image.scaleY = 1;
    image.opacity = 1;
  };
  const restoreOverlay = ({ root: root2 }) => {
    root2.ref.overlayShadow.opacity = 1;
    root2.ref.overlayError.opacity = 0;
    root2.ref.overlaySuccess.opacity = 0;
  };
  const didThrowError = ({ root: root2 }) => {
    root2.ref.overlayShadow.opacity = 0.25;
    root2.ref.overlayError.opacity = 1;
  };
  const didCompleteProcessing = ({ root: root2 }) => {
    root2.ref.overlayShadow.opacity = 0.25;
    root2.ref.overlaySuccess.opacity = 1;
  };
  const create2 = ({ root: root2 }) => {
    root2.ref.images = [];
    root2.ref.imageData = null;
    root2.ref.imageViewBin = [];
    root2.ref.overlayShadow = root2.appendChildView(root2.createChildView(OverlayView, {
      opacity: 0,
      status: "idle"
    }));
    root2.ref.overlaySuccess = root2.appendChildView(root2.createChildView(OverlayView, {
      opacity: 0,
      status: "success"
    }));
    root2.ref.overlayError = root2.appendChildView(root2.createChildView(OverlayView, {
      opacity: 0,
      status: "failure"
    }));
  };
  return _.utils.createView({
    name: "image-preview-wrapper",
    create: create2,
    styles: ["height"],
    apis: ["height"],
    destroy: ({ root: root2 }) => {
      root2.ref.images.forEach((imageView) => {
        imageView.image.width = 1;
        imageView.image.height = 1;
      });
    },
    didWriteView: ({ root: root2 }) => {
      root2.ref.images.forEach((imageView) => {
        imageView.dirty = false;
      });
    },
    write: _.utils.createRoute({
      DID_IMAGE_PREVIEW_DRAW: didDrawPreview,
      DID_IMAGE_PREVIEW_CONTAINER_CREATE: didCreatePreviewContainer,
      DID_FINISH_CALCULATE_PREVIEWSIZE: drawPreview,
      DID_UPDATE_ITEM_METADATA: didUpdateItemMetadata,
      DID_THROW_ITEM_LOAD_ERROR: didThrowError,
      DID_THROW_ITEM_PROCESSING_ERROR: didThrowError,
      DID_THROW_ITEM_INVALID: didThrowError,
      DID_COMPLETE_ITEM_PROCESSING: didCompleteProcessing,
      DID_START_ITEM_PROCESSING: restoreOverlay,
      DID_REVERT_ITEM_PROCESSING: restoreOverlay
    }, ({ root: root2 }) => {
      const viewsToRemove = root2.ref.imageViewBin.filter((imageView) => imageView.opacity === 0);
      root2.ref.imageViewBin = root2.ref.imageViewBin.filter((imageView) => imageView.opacity > 0);
      viewsToRemove.forEach((imageView) => removeImageView(root2, imageView));
      viewsToRemove.length = 0;
    })
  });
};
var plugin5 = (fpAPI) => {
  const { addFilter: addFilter2, utils } = fpAPI;
  const { Type: Type2, createRoute: createRoute2, isFile: isFile2 } = utils;
  const imagePreviewView = createImageWrapperView(fpAPI);
  addFilter2("CREATE_VIEW", (viewAPI) => {
    const { is, view, query } = viewAPI;
    if (!is("file") || !query("GET_ALLOW_IMAGE_PREVIEW"))
      return;
    const didLoadItem2 = ({ root: root2, props }) => {
      const { id } = props;
      const item2 = query("GET_ITEM", id);
      if (!item2 || !isFile2(item2.file) || item2.archived)
        return;
      const file2 = item2.file;
      if (!isPreviewableImage(file2))
        return;
      if (!query("GET_IMAGE_PREVIEW_FILTER_ITEM")(item2))
        return;
      const supportsCreateImageBitmap = "createImageBitmap" in (window || {});
      const maxPreviewFileSize = query("GET_IMAGE_PREVIEW_MAX_FILE_SIZE");
      if (!supportsCreateImageBitmap && (maxPreviewFileSize && file2.size > maxPreviewFileSize))
        return;
      root2.ref.imagePreview = view.appendChildView(view.createChildView(imagePreviewView, { id }));
      const fixedPreviewHeight = root2.query("GET_IMAGE_PREVIEW_HEIGHT");
      if (fixedPreviewHeight) {
        root2.dispatch("DID_UPDATE_PANEL_HEIGHT", {
          id: item2.id,
          height: fixedPreviewHeight
        });
      }
      const queue = !supportsCreateImageBitmap && file2.size > query("GET_IMAGE_PREVIEW_MAX_INSTANT_PREVIEW_FILE_SIZE");
      root2.dispatch("DID_IMAGE_PREVIEW_CONTAINER_CREATE", { id }, queue);
    };
    const rescaleItem = (root2, props) => {
      if (!root2.ref.imagePreview)
        return;
      let { id } = props;
      const item2 = root2.query("GET_ITEM", { id });
      if (!item2)
        return;
      const panelAspectRatio = root2.query("GET_PANEL_ASPECT_RATIO");
      const itemPanelAspectRatio = root2.query("GET_ITEM_PANEL_ASPECT_RATIO");
      const fixedHeight = root2.query("GET_IMAGE_PREVIEW_HEIGHT");
      if (panelAspectRatio || itemPanelAspectRatio || fixedHeight)
        return;
      let { imageWidth, imageHeight } = root2.ref;
      if (!imageWidth || !imageHeight)
        return;
      const minPreviewHeight = root2.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
      const maxPreviewHeight = root2.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
      const exif = item2.getMetadata("exif") || {};
      const orientation = exif.orientation || -1;
      if (orientation >= 5 && orientation <= 8)
        [imageWidth, imageHeight] = [imageHeight, imageWidth];
      if (!isBitmap(item2.file) || root2.query("GET_IMAGE_PREVIEW_UPSCALE")) {
        const scalar = 2048 / imageWidth;
        imageWidth *= scalar;
        imageHeight *= scalar;
      }
      const imageAspectRatio = imageHeight / imageWidth;
      const previewAspectRatio = (item2.getMetadata("crop") || {}).aspectRatio || imageAspectRatio;
      let previewHeightMax = Math.max(minPreviewHeight, Math.min(imageHeight, maxPreviewHeight));
      const itemWidth = root2.rect.element.width;
      const previewHeight = Math.min(itemWidth * previewAspectRatio, previewHeightMax);
      root2.dispatch("DID_UPDATE_PANEL_HEIGHT", {
        id: item2.id,
        height: previewHeight
      });
    };
    const didResizeView = ({ root: root2 }) => {
      root2.ref.shouldRescale = true;
    };
    const didUpdateItemMetadata = ({ root: root2, action }) => {
      if (action.change.key !== "crop")
        return;
      root2.ref.shouldRescale = true;
    };
    const didCalculatePreviewSize = ({ root: root2, action }) => {
      root2.ref.imageWidth = action.width;
      root2.ref.imageHeight = action.height;
      root2.ref.shouldRescale = true;
      root2.ref.shouldDrawPreview = true;
      root2.dispatch("KICK");
    };
    view.registerWriter(createRoute2({
      DID_RESIZE_ROOT: didResizeView,
      DID_STOP_RESIZE: didResizeView,
      DID_LOAD_ITEM: didLoadItem2,
      DID_IMAGE_PREVIEW_CALCULATE_SIZE: didCalculatePreviewSize,
      DID_UPDATE_ITEM_METADATA: didUpdateItemMetadata
    }, ({ root: root2, props }) => {
      if (!root2.ref.imagePreview)
        return;
      if (root2.rect.element.hidden)
        return;
      if (root2.ref.shouldRescale) {
        rescaleItem(root2, props);
        root2.ref.shouldRescale = false;
      }
      if (root2.ref.shouldDrawPreview) {
        requestAnimationFrame(() => {
          root2.dispatch("DID_FINISH_CALCULATE_PREVIEWSIZE", {
            id: props.id
          });
        });
        root2.ref.shouldDrawPreview = false;
      }
    }));
  });
  return {
    options: {
      allowImagePreview: [true, Type2.BOOLEAN],
      imagePreviewFilterItem: [() => true, Type2.FUNCTION],
      imagePreviewHeight: [null, Type2.INT],
      imagePreviewMinHeight: [44, Type2.INT],
      imagePreviewMaxHeight: [256, Type2.INT],
      imagePreviewMaxFileSize: [null, Type2.INT],
      imagePreviewZoomFactor: [2, Type2.INT],
      imagePreviewUpscale: [false, Type2.BOOLEAN],
      imagePreviewMaxInstantPreviewFileSize: [1e6, Type2.INT],
      imagePreviewTransparencyIndicator: [null, Type2.STRING],
      imagePreviewCalculateAverageImageColor: [false, Type2.BOOLEAN],
      imagePreviewMarkupShow: [true, Type2.BOOLEAN],
      imagePreviewMarkupFilter: [() => true, Type2.FUNCTION]
    }
  };
};
var isBrowser6 = typeof window !== "undefined" && typeof window.document !== "undefined";
if (isBrowser6) {
  document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: plugin5 }));
}
var filepond_plugin_image_preview_esm_default = plugin5;

// node_modules/filepond-plugin-image-resize/dist/filepond-plugin-image-resize.esm.js
var isImage2 = (file2) => /^image/.test(file2.type);
var getImageSize2 = (url, cb) => {
  let image = new Image();
  image.onload = () => {
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    image = null;
    cb({ width, height });
  };
  image.onerror = () => cb(null);
  image.src = url;
};
var plugin6 = ({ addFilter: addFilter2, utils }) => {
  const { Type: Type2 } = utils;
  addFilter2("DID_LOAD_ITEM", (item2, { query }) => new Promise((resolve, reject) => {
    const file2 = item2.file;
    if (!isImage2(file2) || !query("GET_ALLOW_IMAGE_RESIZE")) {
      return resolve(item2);
    }
    const mode = query("GET_IMAGE_RESIZE_MODE");
    const width = query("GET_IMAGE_RESIZE_TARGET_WIDTH");
    const height = query("GET_IMAGE_RESIZE_TARGET_HEIGHT");
    const upscale = query("GET_IMAGE_RESIZE_UPSCALE");
    if (width === null && height === null)
      return resolve(item2);
    const targetWidth = width === null ? height : width;
    const targetHeight = height === null ? targetWidth : height;
    const fileURL = URL.createObjectURL(file2);
    getImageSize2(fileURL, (size) => {
      URL.revokeObjectURL(fileURL);
      if (!size)
        return resolve(item2);
      let { width: imageWidth, height: imageHeight } = size;
      const orientation = (item2.getMetadata("exif") || {}).orientation || -1;
      if (orientation >= 5 && orientation <= 8) {
        [imageWidth, imageHeight] = [imageHeight, imageWidth];
      }
      if (imageWidth === targetWidth && imageHeight === targetHeight)
        return resolve(item2);
      if (!upscale) {
        if (mode === "cover") {
          if (imageWidth <= targetWidth || imageHeight <= targetHeight)
            return resolve(item2);
        } else if (imageWidth <= targetWidth && imageHeight <= targetWidth) {
          return resolve(item2);
        }
      }
      item2.setMetadata("resize", {
        mode,
        upscale,
        size: {
          width: targetWidth,
          height: targetHeight
        }
      });
      resolve(item2);
    });
  }));
  return {
    options: {
      allowImageResize: [true, Type2.BOOLEAN],
      imageResizeMode: ["cover", Type2.STRING],
      imageResizeUpscale: [true, Type2.BOOLEAN],
      imageResizeTargetWidth: [null, Type2.INT],
      imageResizeTargetHeight: [null, Type2.INT]
    }
  };
};
var isBrowser7 = typeof window !== "undefined" && typeof window.document !== "undefined";
if (isBrowser7) {
  document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: plugin6 }));
}
var filepond_plugin_image_resize_esm_default = plugin6;

// node_modules/filepond-plugin-image-transform/dist/filepond-plugin-image-transform.esm.js
var isImage3 = (file2) => /^image/.test(file2.type);
var getFilenameWithoutExtension2 = (name2) => name2.substr(0, name2.lastIndexOf(".")) || name2;
var ExtensionMap = {
  jpeg: "jpg",
  "svg+xml": "svg"
};
var renameFileToMatchMimeType = (filename, mimeType) => {
  const name2 = getFilenameWithoutExtension2(filename);
  const type = mimeType.split("/")[1];
  const extension = ExtensionMap[type] || type;
  return `${name2}.${extension}`;
};
var getValidOutputMimeType = (type) => /jpeg|png|svg\+xml/.test(type) ? type : "image/jpeg";
var isImage$1 = (file2) => /^image/.test(file2.type);
var MATRICES = {
  1: () => [1, 0, 0, 1, 0, 0],
  2: (width) => [-1, 0, 0, 1, width, 0],
  3: (width, height) => [-1, 0, 0, -1, width, height],
  4: (width, height) => [1, 0, 0, -1, 0, height],
  5: () => [0, 1, 1, 0, 0, 0],
  6: (width, height) => [0, 1, -1, 0, height, 0],
  7: (width, height) => [0, -1, -1, 0, height, width],
  8: (width) => [0, -1, 1, 0, 0, width]
};
var getImageOrientationMatrix = (width, height, orientation) => {
  if (orientation === -1) {
    orientation = 1;
  }
  return MATRICES[orientation](width, height);
};
var createVector2 = (x, y) => ({ x, y });
var vectorDot2 = (a, b) => a.x * b.x + a.y * b.y;
var vectorSubtract2 = (a, b) => createVector2(a.x - b.x, a.y - b.y);
var vectorDistanceSquared2 = (a, b) => vectorDot2(vectorSubtract2(a, b), vectorSubtract2(a, b));
var vectorDistance2 = (a, b) => Math.sqrt(vectorDistanceSquared2(a, b));
var getOffsetPointOnEdge2 = (length, rotation) => {
  const a = length;
  const A = 1.5707963267948966;
  const B = rotation;
  const C3 = 1.5707963267948966 - rotation;
  const sinA = Math.sin(A);
  const sinB = Math.sin(B);
  const sinC = Math.sin(C3);
  const cosC = Math.cos(C3);
  const ratio = a / sinA;
  const b = ratio * sinB;
  const c = ratio * sinC;
  return createVector2(cosC * b, cosC * c);
};
var getRotatedRectSize2 = (rect, rotation) => {
  const w = rect.width;
  const h = rect.height;
  const hor = getOffsetPointOnEdge2(w, rotation);
  const ver = getOffsetPointOnEdge2(h, rotation);
  const tl = createVector2(rect.x + Math.abs(hor.x), rect.y - Math.abs(hor.y));
  const tr = createVector2(rect.x + rect.width + Math.abs(ver.y), rect.y + Math.abs(ver.x));
  const bl = createVector2(rect.x - Math.abs(ver.y), rect.y + rect.height - Math.abs(ver.x));
  return {
    width: vectorDistance2(tl, tr),
    height: vectorDistance2(tl, bl)
  };
};
var getImageRectZoomFactor2 = (imageRect, cropRect, rotation = 0, center2 = { x: 0.5, y: 0.5 }) => {
  const cx = center2.x > 0.5 ? 1 - center2.x : center2.x;
  const cy = center2.y > 0.5 ? 1 - center2.y : center2.y;
  const imageWidth = cx * 2 * imageRect.width;
  const imageHeight = cy * 2 * imageRect.height;
  const rotatedCropSize = getRotatedRectSize2(cropRect, rotation);
  return Math.max(rotatedCropSize.width / imageWidth, rotatedCropSize.height / imageHeight);
};
var getCenteredCropRect2 = (container, aspectRatio) => {
  let width = container.width;
  let height = width * aspectRatio;
  if (height > container.height) {
    height = container.height;
    width = height / aspectRatio;
  }
  const x = (container.width - width) * 0.5;
  const y = (container.height - height) * 0.5;
  return {
    x,
    y,
    width,
    height
  };
};
var calculateCanvasSize2 = (image, canvasAspectRatio, zoom = 1) => {
  const imageAspectRatio = image.height / image.width;
  let canvasWidth = 1;
  let canvasHeight = canvasAspectRatio;
  let imgWidth = 1;
  let imgHeight = imageAspectRatio;
  if (imgHeight > canvasHeight) {
    imgHeight = canvasHeight;
    imgWidth = imgHeight / imageAspectRatio;
  }
  const scalar = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
  const width = image.width / (zoom * scalar * imgWidth);
  const height = width * canvasAspectRatio;
  return {
    width,
    height
  };
};
var canvasRelease = (canvas) => {
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 1, 1);
};
var isFlipped = (flip) => flip && (flip.horizontal || flip.vertical);
var getBitmap = (image, orientation, flip) => {
  if (orientation <= 1 && !isFlipped(flip)) {
    image.width = image.naturalWidth;
    image.height = image.naturalHeight;
    return image;
  }
  const canvas = document.createElement("canvas");
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const swapped = orientation >= 5 && orientation <= 8;
  if (swapped) {
    canvas.width = height;
    canvas.height = width;
  } else {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext("2d");
  if (orientation) {
    ctx.transform.apply(ctx, getImageOrientationMatrix(width, height, orientation));
  }
  if (isFlipped(flip)) {
    const matrix = [1, 0, 0, 1, 0, 0];
    if (!swapped && flip.horizontal || swapped & flip.vertical) {
      matrix[0] = -1;
      matrix[4] = width;
    }
    if (!swapped && flip.vertical || swapped && flip.horizontal) {
      matrix[3] = -1;
      matrix[5] = height;
    }
    ctx.transform(...matrix);
  }
  ctx.drawImage(image, 0, 0, width, height);
  return canvas;
};
var imageToImageData = (imageElement, orientation, crop = {}, options = {}) => {
  const { canvasMemoryLimit, background = null } = options;
  const zoom = crop.zoom || 1;
  const bitmap = getBitmap(imageElement, orientation, crop.flip);
  const imageSize = {
    width: bitmap.width,
    height: bitmap.height
  };
  const aspectRatio = crop.aspectRatio || imageSize.height / imageSize.width;
  let canvasSize = calculateCanvasSize2(imageSize, aspectRatio, zoom);
  if (canvasMemoryLimit) {
    const requiredMemory = canvasSize.width * canvasSize.height;
    if (requiredMemory > canvasMemoryLimit) {
      const scalar = Math.sqrt(canvasMemoryLimit) / Math.sqrt(requiredMemory);
      imageSize.width = Math.floor(imageSize.width * scalar);
      imageSize.height = Math.floor(imageSize.height * scalar);
      canvasSize = calculateCanvasSize2(imageSize, aspectRatio, zoom);
    }
  }
  const canvas = document.createElement("canvas");
  const canvasCenter = {
    x: canvasSize.width * 0.5,
    y: canvasSize.height * 0.5
  };
  const stage = {
    x: 0,
    y: 0,
    width: canvasSize.width,
    height: canvasSize.height,
    center: canvasCenter
  };
  const shouldLimit = typeof crop.scaleToFit === "undefined" || crop.scaleToFit;
  const scale = zoom * getImageRectZoomFactor2(imageSize, getCenteredCropRect2(stage, aspectRatio), crop.rotation, shouldLimit ? crop.center : { x: 0.5, y: 0.5 });
  canvas.width = Math.round(canvasSize.width / scale);
  canvas.height = Math.round(canvasSize.height / scale);
  canvasCenter.x /= scale;
  canvasCenter.y /= scale;
  const imageOffset = {
    x: canvasCenter.x - imageSize.width * (crop.center ? crop.center.x : 0.5),
    y: canvasCenter.y - imageSize.height * (crop.center ? crop.center.y : 0.5)
  };
  const ctx = canvas.getContext("2d");
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.translate(canvasCenter.x, canvasCenter.y);
  ctx.rotate(crop.rotation || 0);
  ctx.drawImage(bitmap, imageOffset.x - canvasCenter.x, imageOffset.y - canvasCenter.y, imageSize.width, imageSize.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvasRelease(canvas);
  return imageData;
};
var IS_BROWSER3 = (() => typeof window !== "undefined" && typeof window.document !== "undefined")();
if (IS_BROWSER3) {
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
      value: function(callback, type, quality) {
        var dataURL = this.toDataURL(type, quality).split(",")[1];
        setTimeout(function() {
          var binStr = atob(dataURL);
          var len = binStr.length;
          var arr = new Uint8Array(len);
          for (var i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback(new Blob([arr], { type: type || "image/png" }));
        });
      }
    });
  }
}
var canvasToBlob = (canvas, options, beforeCreateBlob = null) => new Promise((resolve) => {
  const promisedImage = beforeCreateBlob ? beforeCreateBlob(canvas) : canvas;
  Promise.resolve(promisedImage).then((canvas2) => {
    canvas2.toBlob(resolve, options.type, options.quality);
  });
});
var vectorMultiply2 = (v, amount) => createVector$12(v.x * amount, v.y * amount);
var vectorAdd2 = (a, b) => createVector$12(a.x + b.x, a.y + b.y);
var vectorNormalize2 = (v) => {
  const l = Math.sqrt(v.x * v.x + v.y * v.y);
  if (l === 0) {
    return {
      x: 0,
      y: 0
    };
  }
  return createVector$12(v.x / l, v.y / l);
};
var vectorRotate2 = (v, radians, origin) => {
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const t = createVector$12(v.x - origin.x, v.y - origin.y);
  return createVector$12(origin.x + cos * t.x - sin * t.y, origin.y + sin * t.x + cos * t.y);
};
var createVector$12 = (x = 0, y = 0) => ({ x, y });
var getMarkupValue2 = (value, size, scalar = 1, axis) => {
  if (typeof value === "string") {
    return parseFloat(value) * scalar;
  }
  if (typeof value === "number") {
    return value * (axis ? size[axis] : Math.min(size.width, size.height));
  }
  return;
};
var getMarkupStyles2 = (markup, size, scale) => {
  const lineStyle = markup.borderStyle || markup.lineStyle || "solid";
  const fill = markup.backgroundColor || markup.fontColor || "transparent";
  const stroke = markup.borderColor || markup.lineColor || "transparent";
  const strokeWidth = getMarkupValue2(markup.borderWidth || markup.lineWidth, size, scale);
  const lineCap = markup.lineCap || "round";
  const lineJoin = markup.lineJoin || "round";
  const dashes = typeof lineStyle === "string" ? "" : lineStyle.map((v) => getMarkupValue2(v, size, scale)).join(",");
  const opacity = markup.opacity || 1;
  return {
    "stroke-linecap": lineCap,
    "stroke-linejoin": lineJoin,
    "stroke-width": strokeWidth || 0,
    "stroke-dasharray": dashes,
    stroke,
    fill,
    opacity
  };
};
var isDefined3 = (value) => value != null;
var getMarkupRect2 = (rect, size, scalar = 1) => {
  let left = getMarkupValue2(rect.x, size, scalar, "width") || getMarkupValue2(rect.left, size, scalar, "width");
  let top = getMarkupValue2(rect.y, size, scalar, "height") || getMarkupValue2(rect.top, size, scalar, "height");
  let width = getMarkupValue2(rect.width, size, scalar, "width");
  let height = getMarkupValue2(rect.height, size, scalar, "height");
  let right = getMarkupValue2(rect.right, size, scalar, "width");
  let bottom = getMarkupValue2(rect.bottom, size, scalar, "height");
  if (!isDefined3(top)) {
    if (isDefined3(height) && isDefined3(bottom)) {
      top = size.height - height - bottom;
    } else {
      top = bottom;
    }
  }
  if (!isDefined3(left)) {
    if (isDefined3(width) && isDefined3(right)) {
      left = size.width - width - right;
    } else {
      left = right;
    }
  }
  if (!isDefined3(width)) {
    if (isDefined3(left) && isDefined3(right)) {
      width = size.width - left - right;
    } else {
      width = 0;
    }
  }
  if (!isDefined3(height)) {
    if (isDefined3(top) && isDefined3(bottom)) {
      height = size.height - top - bottom;
    } else {
      height = 0;
    }
  }
  return {
    x: left || 0,
    y: top || 0,
    width: width || 0,
    height: height || 0
  };
};
var pointsToPathShape2 = (points) => points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
var setAttributes2 = (element, attr2) => Object.keys(attr2).forEach((key) => element.setAttribute(key, attr2[key]));
var ns3 = "http://www.w3.org/2000/svg";
var svg2 = (tag, attr2) => {
  const element = document.createElementNS(ns3, tag);
  if (attr2) {
    setAttributes2(element, attr2);
  }
  return element;
};
var updateRect3 = (element) => setAttributes2(element, {
  ...element.rect,
  ...element.styles
});
var updateEllipse2 = (element) => {
  const cx = element.rect.x + element.rect.width * 0.5;
  const cy = element.rect.y + element.rect.height * 0.5;
  const rx = element.rect.width * 0.5;
  const ry = element.rect.height * 0.5;
  return setAttributes2(element, {
    cx,
    cy,
    rx,
    ry,
    ...element.styles
  });
};
var IMAGE_FIT_STYLE2 = {
  contain: "xMidYMid meet",
  cover: "xMidYMid slice"
};
var updateImage2 = (element, markup) => {
  setAttributes2(element, {
    ...element.rect,
    ...element.styles,
    preserveAspectRatio: IMAGE_FIT_STYLE2[markup.fit] || "none"
  });
};
var TEXT_ANCHOR2 = {
  left: "start",
  center: "middle",
  right: "end"
};
var updateText2 = (element, markup, size, scale) => {
  const fontSize = getMarkupValue2(markup.fontSize, size, scale);
  const fontFamily = markup.fontFamily || "sans-serif";
  const fontWeight = markup.fontWeight || "normal";
  const textAlign = TEXT_ANCHOR2[markup.textAlign] || "start";
  setAttributes2(element, {
    ...element.rect,
    ...element.styles,
    "stroke-width": 0,
    "font-weight": fontWeight,
    "font-size": fontSize,
    "font-family": fontFamily,
    "text-anchor": textAlign
  });
  if (element.text !== markup.text) {
    element.text = markup.text;
    element.textContent = markup.text.length ? markup.text : " ";
  }
};
var updateLine2 = (element, markup, size, scale) => {
  setAttributes2(element, {
    ...element.rect,
    ...element.styles,
    fill: "none"
  });
  const line = element.childNodes[0];
  const begin = element.childNodes[1];
  const end = element.childNodes[2];
  const origin = element.rect;
  const target = {
    x: element.rect.x + element.rect.width,
    y: element.rect.y + element.rect.height
  };
  setAttributes2(line, {
    x1: origin.x,
    y1: origin.y,
    x2: target.x,
    y2: target.y
  });
  if (!markup.lineDecoration)
    return;
  begin.style.display = "none";
  end.style.display = "none";
  const v = vectorNormalize2({
    x: target.x - origin.x,
    y: target.y - origin.y
  });
  const l = getMarkupValue2(0.05, size, scale);
  if (markup.lineDecoration.indexOf("arrow-begin") !== -1) {
    const arrowBeginRotationPoint = vectorMultiply2(v, l);
    const arrowBeginCenter = vectorAdd2(origin, arrowBeginRotationPoint);
    const arrowBeginA = vectorRotate2(origin, 2, arrowBeginCenter);
    const arrowBeginB = vectorRotate2(origin, -2, arrowBeginCenter);
    setAttributes2(begin, {
      style: "display:block;",
      d: `M${arrowBeginA.x},${arrowBeginA.y} L${origin.x},${origin.y} L${arrowBeginB.x},${arrowBeginB.y}`
    });
  }
  if (markup.lineDecoration.indexOf("arrow-end") !== -1) {
    const arrowEndRotationPoint = vectorMultiply2(v, -l);
    const arrowEndCenter = vectorAdd2(target, arrowEndRotationPoint);
    const arrowEndA = vectorRotate2(target, 2, arrowEndCenter);
    const arrowEndB = vectorRotate2(target, -2, arrowEndCenter);
    setAttributes2(end, {
      style: "display:block;",
      d: `M${arrowEndA.x},${arrowEndA.y} L${target.x},${target.y} L${arrowEndB.x},${arrowEndB.y}`
    });
  }
};
var updatePath2 = (element, markup, size, scale) => {
  setAttributes2(element, {
    ...element.styles,
    fill: "none",
    d: pointsToPathShape2(markup.points.map((point) => ({
      x: getMarkupValue2(point.x, size, scale, "width"),
      y: getMarkupValue2(point.y, size, scale, "height")
    })))
  });
};
var createShape2 = (node) => (markup) => svg2(node, { id: markup.id });
var createImage2 = (markup) => {
  const shape = svg2("image", {
    id: markup.id,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    opacity: "0"
  });
  shape.onload = () => {
    shape.setAttribute("opacity", markup.opacity || 1);
  };
  shape.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", markup.src);
  return shape;
};
var createLine2 = (markup) => {
  const shape = svg2("g", {
    id: markup.id,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });
  const line = svg2("line");
  shape.appendChild(line);
  const begin = svg2("path");
  shape.appendChild(begin);
  const end = svg2("path");
  shape.appendChild(end);
  return shape;
};
var CREATE_TYPE_ROUTES2 = {
  image: createImage2,
  rect: createShape2("rect"),
  ellipse: createShape2("ellipse"),
  text: createShape2("text"),
  path: createShape2("path"),
  line: createLine2
};
var UPDATE_TYPE_ROUTES2 = {
  rect: updateRect3,
  ellipse: updateEllipse2,
  image: updateImage2,
  text: updateText2,
  path: updatePath2,
  line: updateLine2
};
var createMarkupByType2 = (type, markup) => CREATE_TYPE_ROUTES2[type](markup);
var updateMarkupByType2 = (element, type, markup, size, scale) => {
  if (type !== "path") {
    element.rect = getMarkupRect2(markup, size, scale);
  }
  element.styles = getMarkupStyles2(markup, size, scale);
  UPDATE_TYPE_ROUTES2[type](element, markup, size, scale);
};
var sortMarkupByZIndex2 = (a, b) => {
  if (a[1].zIndex > b[1].zIndex) {
    return 1;
  }
  if (a[1].zIndex < b[1].zIndex) {
    return -1;
  }
  return 0;
};
var cropSVG = (blob2, crop = {}, markup, options) => new Promise((resolve) => {
  const { background = null } = options;
  const fr = new FileReader();
  fr.onloadend = () => {
    const text2 = fr.result;
    const original = document.createElement("div");
    original.style.cssText = `position:absolute;pointer-events:none;width:0;height:0;visibility:hidden;`;
    original.innerHTML = text2;
    const originalNode = original.querySelector("svg");
    document.body.appendChild(original);
    const bBox = originalNode.getBBox();
    original.parentNode.removeChild(original);
    const titleNode = original.querySelector("title");
    const viewBoxAttribute = originalNode.getAttribute("viewBox") || "";
    const widthAttribute = originalNode.getAttribute("width") || "";
    const heightAttribute = originalNode.getAttribute("height") || "";
    let width = parseFloat(widthAttribute) || null;
    let height = parseFloat(heightAttribute) || null;
    const widthUnits = (widthAttribute.match(/[a-z]+/) || [])[0] || "";
    const heightUnits = (heightAttribute.match(/[a-z]+/) || [])[0] || "";
    const viewBoxList = viewBoxAttribute.split(" ").map(parseFloat);
    const viewBox = viewBoxList.length ? {
      x: viewBoxList[0],
      y: viewBoxList[1],
      width: viewBoxList[2],
      height: viewBoxList[3]
    } : bBox;
    let imageWidth = width != null ? width : viewBox.width;
    let imageHeight = height != null ? height : viewBox.height;
    originalNode.style.overflow = "visible";
    originalNode.setAttribute("width", imageWidth);
    originalNode.setAttribute("height", imageHeight);
    let markupSVG = "";
    if (markup && markup.length) {
      const size = {
        width: imageWidth,
        height: imageHeight
      };
      markupSVG = markup.sort(sortMarkupByZIndex2).reduce((prev, shape) => {
        const el = createMarkupByType2(shape[0], shape[1]);
        updateMarkupByType2(el, shape[0], shape[1], size);
        el.removeAttribute("id");
        if (el.getAttribute("opacity") === 1) {
          el.removeAttribute("opacity");
        }
        return prev + "\n" + el.outerHTML + "\n";
      }, "");
      markupSVG = `

<g>${markupSVG.replace(/&nbsp;/g, " ")}</g>

`;
    }
    const aspectRatio = crop.aspectRatio || imageHeight / imageWidth;
    const canvasWidth = imageWidth;
    const canvasHeight = canvasWidth * aspectRatio;
    const shouldLimit = typeof crop.scaleToFit === "undefined" || crop.scaleToFit;
    const cropCenterX = crop.center ? crop.center.x : 0.5;
    const cropCenterY = crop.center ? crop.center.y : 0.5;
    const canvasZoomFactor = getImageRectZoomFactor2({
      width: imageWidth,
      height: imageHeight
    }, getCenteredCropRect2({
      width: canvasWidth,
      height: canvasHeight
    }, aspectRatio), crop.rotation, shouldLimit ? { x: cropCenterX, y: cropCenterY } : {
      x: 0.5,
      y: 0.5
    });
    const scale = crop.zoom * canvasZoomFactor;
    const rotation = crop.rotation * (180 / Math.PI);
    const canvasCenter = {
      x: canvasWidth * 0.5,
      y: canvasHeight * 0.5
    };
    const imageOffset = {
      x: canvasCenter.x - imageWidth * cropCenterX,
      y: canvasCenter.y - imageHeight * cropCenterY
    };
    const cropTransforms = [
      `rotate(${rotation} ${canvasCenter.x} ${canvasCenter.y})`,
      `translate(${canvasCenter.x} ${canvasCenter.y})`,
      `scale(${scale})`,
      `translate(${-canvasCenter.x} ${-canvasCenter.y})`,
      `translate(${imageOffset.x} ${imageOffset.y})`
    ];
    const cropFlipHorizontal = crop.flip && crop.flip.horizontal;
    const cropFlipVertical = crop.flip && crop.flip.vertical;
    const flipTransforms = [
      `scale(${cropFlipHorizontal ? -1 : 1} ${cropFlipVertical ? -1 : 1})`,
      `translate(${cropFlipHorizontal ? -imageWidth : 0} ${cropFlipVertical ? -imageHeight : 0})`
    ];
    const transformed = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${canvasWidth}${widthUnits}" height="${canvasHeight}${heightUnits}" 
viewBox="0 0 ${canvasWidth} ${canvasHeight}" ${background ? 'style="background:' + background + '" ' : ""}
preserveAspectRatio="xMinYMin"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns="http://www.w3.org/2000/svg">
<!-- Generated by PQINA - https://pqina.nl/ -->
<title>${titleNode ? titleNode.textContent : ""}</title>
<g transform="${cropTransforms.join(" ")}">
<g transform="${flipTransforms.join(" ")}">
${originalNode.outerHTML}${markupSVG}
</g>
</g>
</svg>`;
    resolve(transformed);
  };
  fr.readAsText(blob2);
});
var objectToImageData = (obj) => {
  let imageData;
  try {
    imageData = new ImageData(obj.width, obj.height);
  } catch (e) {
    const canvas = document.createElement("canvas");
    imageData = canvas.getContext("2d").createImageData(obj.width, obj.height);
  }
  imageData.data.set(obj.data);
  return imageData;
};
var TransformWorker = () => {
  const TRANSFORMS = { resize, filter };
  const applyTransforms = (transforms2, imageData) => {
    transforms2.forEach((transform2) => {
      imageData = TRANSFORMS[transform2.type](imageData, transform2.data);
    });
    return imageData;
  };
  const transform = (data3, cb) => {
    let transforms2 = data3.transforms;
    let filterTransform = null;
    transforms2.forEach((transform2) => {
      if (transform2.type === "filter") {
        filterTransform = transform2;
      }
    });
    if (filterTransform) {
      let resizeTransform = null;
      transforms2.forEach((transform2) => {
        if (transform2.type === "resize") {
          resizeTransform = transform2;
        }
      });
      if (resizeTransform) {
        resizeTransform.data.matrix = filterTransform.data;
        transforms2 = transforms2.filter((transform2) => transform2.type !== "filter");
      }
    }
    cb(applyTransforms(transforms2, data3.imageData));
  };
  self.onmessage = (e) => {
    transform(e.data.message, (response) => {
      self.postMessage({ id: e.data.id, message: response }, [response.data.buffer]);
    });
  };
  const br = 1;
  const bg = 1;
  const bb = 1;
  function applyFilterMatrix(index, data3, m) {
    const ir = data3[index] / 255;
    const ig = data3[index + 1] / 255;
    const ib = data3[index + 2] / 255;
    const ia = data3[index + 3] / 255;
    const mr = ir * m[0] + ig * m[1] + ib * m[2] + ia * m[3] + m[4];
    const mg = ir * m[5] + ig * m[6] + ib * m[7] + ia * m[8] + m[9];
    const mb = ir * m[10] + ig * m[11] + ib * m[12] + ia * m[13] + m[14];
    const ma = ir * m[15] + ig * m[16] + ib * m[17] + ia * m[18] + m[19];
    const or = Math.max(0, mr * ma) + br * (1 - ma);
    const og = Math.max(0, mg * ma) + bg * (1 - ma);
    const ob = Math.max(0, mb * ma) + bb * (1 - ma);
    data3[index] = Math.max(0, Math.min(1, or)) * 255;
    data3[index + 1] = Math.max(0, Math.min(1, og)) * 255;
    data3[index + 2] = Math.max(0, Math.min(1, ob)) * 255;
  }
  const identityMatrix = self.JSON.stringify([
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0
  ]);
  function isIdentityMatrix(filter2) {
    return self.JSON.stringify(filter2 || []) === identityMatrix;
  }
  function filter(imageData, matrix) {
    if (!matrix || isIdentityMatrix(matrix))
      return imageData;
    const data3 = imageData.data;
    const l = data3.length;
    const m11 = matrix[0];
    const m12 = matrix[1];
    const m13 = matrix[2];
    const m14 = matrix[3];
    const m15 = matrix[4];
    const m21 = matrix[5];
    const m22 = matrix[6];
    const m23 = matrix[7];
    const m24 = matrix[8];
    const m25 = matrix[9];
    const m31 = matrix[10];
    const m32 = matrix[11];
    const m33 = matrix[12];
    const m34 = matrix[13];
    const m35 = matrix[14];
    const m41 = matrix[15];
    const m42 = matrix[16];
    const m43 = matrix[17];
    const m44 = matrix[18];
    const m45 = matrix[19];
    let index = 0, r = 0, g = 0, b = 0, a = 0, mr = 0, mg = 0, mb = 0, ma = 0, or = 0, og = 0, ob = 0;
    for (; index < l; index += 4) {
      r = data3[index] / 255;
      g = data3[index + 1] / 255;
      b = data3[index + 2] / 255;
      a = data3[index + 3] / 255;
      mr = r * m11 + g * m12 + b * m13 + a * m14 + m15;
      mg = r * m21 + g * m22 + b * m23 + a * m24 + m25;
      mb = r * m31 + g * m32 + b * m33 + a * m34 + m35;
      ma = r * m41 + g * m42 + b * m43 + a * m44 + m45;
      or = Math.max(0, mr * ma) + br * (1 - ma);
      og = Math.max(0, mg * ma) + bg * (1 - ma);
      ob = Math.max(0, mb * ma) + bb * (1 - ma);
      data3[index] = Math.max(0, Math.min(1, or)) * 255;
      data3[index + 1] = Math.max(0, Math.min(1, og)) * 255;
      data3[index + 2] = Math.max(0, Math.min(1, ob)) * 255;
    }
    return imageData;
  }
  function resize(imageData, data3) {
    let { mode = "contain", upscale = false, width, height, matrix } = data3;
    matrix = !matrix || isIdentityMatrix(matrix) ? null : matrix;
    if (!width && !height) {
      return filter(imageData, matrix);
    }
    if (width === null) {
      width = height;
    } else if (height === null) {
      height = width;
    }
    if (mode !== "force") {
      let scalarWidth = width / imageData.width;
      let scalarHeight = height / imageData.height;
      let scalar = 1;
      if (mode === "cover") {
        scalar = Math.max(scalarWidth, scalarHeight);
      } else if (mode === "contain") {
        scalar = Math.min(scalarWidth, scalarHeight);
      }
      if (scalar > 1 && upscale === false) {
        return filter(imageData, matrix);
      }
      width = imageData.width * scalar;
      height = imageData.height * scalar;
    }
    const originWidth = imageData.width;
    const originHeight = imageData.height;
    const targetWidth = Math.round(width);
    const targetHeight = Math.round(height);
    const inputData = imageData.data;
    const outputData = new Uint8ClampedArray(targetWidth * targetHeight * 4);
    const ratioWidth = originWidth / targetWidth;
    const ratioHeight = originHeight / targetHeight;
    const ratioWidthHalf = Math.ceil(ratioWidth * 0.5);
    const ratioHeightHalf = Math.ceil(ratioHeight * 0.5);
    for (let j = 0; j < targetHeight; j++) {
      for (let i = 0; i < targetWidth; i++) {
        let x2 = (i + j * targetWidth) * 4;
        let weight = 0;
        let weights = 0;
        let weightsAlpha = 0;
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 0;
        let centerY = (j + 0.5) * ratioHeight;
        for (let yy = Math.floor(j * ratioHeight); yy < (j + 1) * ratioHeight; yy++) {
          let dy = Math.abs(centerY - (yy + 0.5)) / ratioHeightHalf;
          let centerX = (i + 0.5) * ratioWidth;
          let w0 = dy * dy;
          for (let xx = Math.floor(i * ratioWidth); xx < (i + 1) * ratioWidth; xx++) {
            let dx = Math.abs(centerX - (xx + 0.5)) / ratioWidthHalf;
            let w = Math.sqrt(w0 + dx * dx);
            if (w >= -1 && w <= 1) {
              weight = 2 * w * w * w - 3 * w * w + 1;
              if (weight > 0) {
                dx = 4 * (xx + yy * originWidth);
                let ref = inputData[dx + 3];
                a += weight * ref;
                weightsAlpha += weight;
                if (ref < 255) {
                  weight = weight * ref / 250;
                }
                r += weight * inputData[dx];
                g += weight * inputData[dx + 1];
                b += weight * inputData[dx + 2];
                weights += weight;
              }
            }
          }
        }
        outputData[x2] = r / weights;
        outputData[x2 + 1] = g / weights;
        outputData[x2 + 2] = b / weights;
        outputData[x2 + 3] = a / weightsAlpha;
        matrix && applyFilterMatrix(x2, outputData, matrix);
      }
    }
    return {
      data: outputData,
      width: targetWidth,
      height: targetHeight
    };
  }
};
var correctOrientation = (view, offset) => {
  if (view.getUint32(offset + 4, false) !== 1165519206)
    return;
  offset += 4;
  const intelByteAligned = view.getUint16(offset += 6, false) === 18761;
  offset += view.getUint32(offset + 4, intelByteAligned);
  const tags = view.getUint16(offset, intelByteAligned);
  offset += 2;
  for (let i = 0; i < tags; i++) {
    if (view.getUint16(offset + i * 12, intelByteAligned) === 274) {
      view.setUint16(offset + i * 12 + 8, 1, intelByteAligned);
      return true;
    }
  }
  return false;
};
var readData = (data3) => {
  const view = new DataView(data3);
  if (view.getUint16(0) !== 65496)
    return null;
  let offset = 2;
  let marker;
  let markerLength;
  let orientationCorrected = false;
  while (offset < view.byteLength) {
    marker = view.getUint16(offset, false);
    markerLength = view.getUint16(offset + 2, false) + 2;
    const isData = marker >= 65504 && marker <= 65519 || marker === 65534;
    if (!isData) {
      break;
    }
    if (!orientationCorrected) {
      orientationCorrected = correctOrientation(view, offset, markerLength);
    }
    if (offset + markerLength > view.byteLength) {
      break;
    }
    offset += markerLength;
  }
  return data3.slice(0, offset);
};
var getImageHead = (file2) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = () => resolve(readData(reader.result) || null);
  reader.readAsArrayBuffer(file2.slice(0, 256 * 1024));
});
var getBlobBuilder2 = () => {
  return window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
};
var createBlob2 = (arrayBuffer, mimeType) => {
  const BB = getBlobBuilder2();
  if (BB) {
    const bb = new BB();
    bb.append(arrayBuffer);
    return bb.getBlob(mimeType);
  }
  return new Blob([arrayBuffer], {
    type: mimeType
  });
};
var getUniqueId2 = () => Math.random().toString(36).substr(2, 9);
var createWorker2 = (fn2) => {
  const workerBlob = new Blob(["(", fn2.toString(), ")()"], { type: "application/javascript" });
  const workerURL = URL.createObjectURL(workerBlob);
  const worker = new Worker(workerURL);
  const trips = [];
  return {
    transfer: () => {
    },
    post: (message, cb, transferList) => {
      const id = getUniqueId2();
      trips[id] = cb;
      worker.onmessage = (e) => {
        const cb2 = trips[e.data.id];
        if (!cb2)
          return;
        cb2(e.data.message);
        delete trips[e.data.id];
      };
      worker.postMessage({
        id,
        message
      }, transferList);
    },
    terminate: () => {
      worker.terminate();
      URL.revokeObjectURL(workerURL);
    }
  };
};
var loadImage3 = (url) => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => {
    resolve(img);
  };
  img.onerror = (e) => {
    reject(e);
  };
  img.src = url;
});
var chain = (funcs) => funcs.reduce((promise, func) => promise.then((result) => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]));
var canvasApplyMarkup = (canvas, markup) => new Promise((resolve) => {
  const size = {
    width: canvas.width,
    height: canvas.height
  };
  const ctx = canvas.getContext("2d");
  const drawers = markup.sort(sortMarkupByZIndex2).map((item2) => () => new Promise((resolve2) => {
    const result = TYPE_DRAW_ROUTES[item2[0]](ctx, size, item2[1], resolve2);
    if (result)
      resolve2();
  }));
  chain(drawers).then(() => resolve(canvas));
});
var applyMarkupStyles = (ctx, styles2) => {
  ctx.beginPath();
  ctx.lineCap = styles2["stroke-linecap"];
  ctx.lineJoin = styles2["stroke-linejoin"];
  ctx.lineWidth = styles2["stroke-width"];
  if (styles2["stroke-dasharray"].length) {
    ctx.setLineDash(styles2["stroke-dasharray"].split(","));
  }
  ctx.fillStyle = styles2["fill"];
  ctx.strokeStyle = styles2["stroke"];
  ctx.globalAlpha = styles2.opacity || 1;
};
var drawMarkupStyles = (ctx) => {
  ctx.fill();
  ctx.stroke();
  ctx.globalAlpha = 1;
};
var drawRect = (ctx, size, markup) => {
  const rect = getMarkupRect2(markup, size);
  const styles2 = getMarkupStyles2(markup, size);
  applyMarkupStyles(ctx, styles2);
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  drawMarkupStyles(ctx, styles2);
  return true;
};
var drawEllipse = (ctx, size, markup) => {
  const rect = getMarkupRect2(markup, size);
  const styles2 = getMarkupStyles2(markup, size);
  applyMarkupStyles(ctx, styles2);
  const x = rect.x, y = rect.y, w = rect.width, h = rect.height, kappa = 0.5522848, ox = w / 2 * kappa, oy = h / 2 * kappa, xe = x + w, ye = y + h, xm = x + w / 2, ym = y + h / 2;
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  drawMarkupStyles(ctx, styles2);
  return true;
};
var drawImage = (ctx, size, markup, done) => {
  const rect = getMarkupRect2(markup, size);
  const styles2 = getMarkupStyles2(markup, size);
  applyMarkupStyles(ctx, styles2);
  const image = new Image();
  const isCrossOriginImage = new URL(markup.src, window.location.href).origin !== window.location.origin;
  if (isCrossOriginImage)
    image.crossOrigin = "";
  image.onload = () => {
    if (markup.fit === "cover") {
      const ar = rect.width / rect.height;
      const width = ar > 1 ? image.width : image.height * ar;
      const height = ar > 1 ? image.width / ar : image.height;
      const x = image.width * 0.5 - width * 0.5;
      const y = image.height * 0.5 - height * 0.5;
      ctx.drawImage(image, x, y, width, height, rect.x, rect.y, rect.width, rect.height);
    } else if (markup.fit === "contain") {
      const scalar = Math.min(rect.width / image.width, rect.height / image.height);
      const width = scalar * image.width;
      const height = scalar * image.height;
      const x = rect.x + rect.width * 0.5 - width * 0.5;
      const y = rect.y + rect.height * 0.5 - height * 0.5;
      ctx.drawImage(image, 0, 0, image.width, image.height, x, y, width, height);
    } else {
      ctx.drawImage(image, 0, 0, image.width, image.height, rect.x, rect.y, rect.width, rect.height);
    }
    drawMarkupStyles(ctx, styles2);
    done();
  };
  image.src = markup.src;
};
var drawText = (ctx, size, markup) => {
  const rect = getMarkupRect2(markup, size);
  const styles2 = getMarkupStyles2(markup, size);
  applyMarkupStyles(ctx, styles2);
  const fontSize = getMarkupValue2(markup.fontSize, size);
  const fontFamily = markup.fontFamily || "sans-serif";
  const fontWeight = markup.fontWeight || "normal";
  const textAlign = markup.textAlign || "left";
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.textAlign = textAlign;
  ctx.fillText(markup.text, rect.x, rect.y);
  drawMarkupStyles(ctx, styles2);
  return true;
};
var drawPath = (ctx, size, markup) => {
  const styles2 = getMarkupStyles2(markup, size);
  applyMarkupStyles(ctx, styles2);
  ctx.beginPath();
  const points = markup.points.map((point) => ({
    x: getMarkupValue2(point.x, size, 1, "width"),
    y: getMarkupValue2(point.y, size, 1, "height")
  }));
  ctx.moveTo(points[0].x, points[0].y);
  const l = points.length;
  for (let i = 1; i < l; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  drawMarkupStyles(ctx, styles2);
  return true;
};
var drawLine = (ctx, size, markup) => {
  const rect = getMarkupRect2(markup, size);
  const styles2 = getMarkupStyles2(markup, size);
  applyMarkupStyles(ctx, styles2);
  ctx.beginPath();
  const origin = {
    x: rect.x,
    y: rect.y
  };
  const target = {
    x: rect.x + rect.width,
    y: rect.y + rect.height
  };
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(target.x, target.y);
  const v = vectorNormalize2({
    x: target.x - origin.x,
    y: target.y - origin.y
  });
  const l = 0.04 * Math.min(size.width, size.height);
  if (markup.lineDecoration.indexOf("arrow-begin") !== -1) {
    const arrowBeginRotationPoint = vectorMultiply2(v, l);
    const arrowBeginCenter = vectorAdd2(origin, arrowBeginRotationPoint);
    const arrowBeginA = vectorRotate2(origin, 2, arrowBeginCenter);
    const arrowBeginB = vectorRotate2(origin, -2, arrowBeginCenter);
    ctx.moveTo(arrowBeginA.x, arrowBeginA.y);
    ctx.lineTo(origin.x, origin.y);
    ctx.lineTo(arrowBeginB.x, arrowBeginB.y);
  }
  if (markup.lineDecoration.indexOf("arrow-end") !== -1) {
    const arrowEndRotationPoint = vectorMultiply2(v, -l);
    const arrowEndCenter = vectorAdd2(target, arrowEndRotationPoint);
    const arrowEndA = vectorRotate2(target, 2, arrowEndCenter);
    const arrowEndB = vectorRotate2(target, -2, arrowEndCenter);
    ctx.moveTo(arrowEndA.x, arrowEndA.y);
    ctx.lineTo(target.x, target.y);
    ctx.lineTo(arrowEndB.x, arrowEndB.y);
  }
  drawMarkupStyles(ctx, styles2);
  return true;
};
var TYPE_DRAW_ROUTES = {
  rect: drawRect,
  ellipse: drawEllipse,
  image: drawImage,
  text: drawText,
  line: drawLine,
  path: drawPath
};
var imageDataToCanvas = (imageData) => {
  const image = document.createElement("canvas");
  image.width = imageData.width;
  image.height = imageData.height;
  const ctx = image.getContext("2d");
  ctx.putImageData(imageData, 0, 0);
  return image;
};
var transformImage = (file2, instructions, options = {}) => new Promise((resolve, reject) => {
  if (!file2 || !isImage$1(file2))
    return reject({ status: "not an image file", file: file2 });
  const { stripImageHead, beforeCreateBlob, afterCreateBlob, canvasMemoryLimit } = options;
  const { crop, size, filter, markup, output } = instructions;
  const orientation = instructions.image && instructions.image.orientation ? Math.max(1, Math.min(8, instructions.image.orientation)) : null;
  const qualityAsPercentage = output && output.quality;
  const quality = qualityAsPercentage === null ? null : qualityAsPercentage / 100;
  const type = output && output.type || null;
  const background = output && output.background || null;
  const transforms2 = [];
  if (size && (typeof size.width === "number" || typeof size.height === "number")) {
    transforms2.push({ type: "resize", data: size });
  }
  if (filter && filter.length === 20) {
    transforms2.push({ type: "filter", data: filter });
  }
  const resolveWithBlob = (blob2) => {
    const promisedBlob = afterCreateBlob ? afterCreateBlob(blob2) : blob2;
    Promise.resolve(promisedBlob).then(resolve);
  };
  const toBlob = (imageData, options2) => {
    const canvas = imageDataToCanvas(imageData);
    const promisedCanvas = markup.length ? canvasApplyMarkup(canvas, markup) : canvas;
    Promise.resolve(promisedCanvas).then((canvas2) => {
      canvasToBlob(canvas2, options2, beforeCreateBlob).then((blob2) => {
        canvasRelease(canvas2);
        if (stripImageHead)
          return resolveWithBlob(blob2);
        getImageHead(file2).then((imageHead) => {
          if (imageHead !== null) {
            blob2 = new Blob([imageHead, blob2.slice(20)], { type: blob2.type });
          }
          resolveWithBlob(blob2);
        });
      }).catch(reject);
    });
  };
  if (/svg/.test(file2.type) && type === null) {
    return cropSVG(file2, crop, markup, { background }).then((text2) => {
      resolve(createBlob2(text2, "image/svg+xml"));
    });
  }
  const url = URL.createObjectURL(file2);
  loadImage3(url).then((image) => {
    URL.revokeObjectURL(url);
    const imageData = imageToImageData(image, orientation, crop, {
      canvasMemoryLimit,
      background
    });
    const outputFormat = {
      quality,
      type: type || file2.type
    };
    if (!transforms2.length) {
      return toBlob(imageData, outputFormat);
    }
    const worker = createWorker2(TransformWorker);
    worker.post({
      transforms: transforms2,
      imageData
    }, (response) => {
      toBlob(objectToImageData(response), outputFormat);
      worker.terminate();
    }, [imageData.data.buffer]);
  }).catch(reject);
});
var MARKUP_RECT2 = ["x", "y", "left", "top", "right", "bottom", "width", "height"];
var toOptionalFraction2 = (value) => typeof value === "string" && /%/.test(value) ? parseFloat(value) / 100 : value;
var prepareMarkup2 = (markup) => {
  const [type, props] = markup;
  const rect = props.points ? {} : MARKUP_RECT2.reduce((prev, curr) => {
    prev[curr] = toOptionalFraction2(props[curr]);
    return prev;
  }, {});
  return [
    type,
    {
      zIndex: 0,
      ...props,
      ...rect
    }
  ];
};
var getImageSize3 = (file2) => new Promise((resolve, reject) => {
  const imageElement = new Image();
  imageElement.src = URL.createObjectURL(file2);
  const measure = () => {
    const width = imageElement.naturalWidth;
    const height = imageElement.naturalHeight;
    const hasSize = width && height;
    if (!hasSize)
      return;
    URL.revokeObjectURL(imageElement.src);
    clearInterval(intervalId);
    resolve({ width, height });
  };
  imageElement.onerror = (err) => {
    URL.revokeObjectURL(imageElement.src);
    clearInterval(intervalId);
    reject(err);
  };
  const intervalId = setInterval(measure, 1);
  measure();
});
if (typeof window !== "undefined" && typeof window.document !== "undefined") {
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
      value: function(cb, type, quality) {
        const canvas = this;
        setTimeout(() => {
          const dataURL = canvas.toDataURL(type, quality).split(",")[1];
          const binStr = atob(dataURL);
          let index = binStr.length;
          const data3 = new Uint8Array(index);
          while (index--) {
            data3[index] = binStr.charCodeAt(index);
          }
          cb(new Blob([data3], { type: type || "image/png" }));
        });
      }
    });
  }
}
var isBrowser8 = typeof window !== "undefined" && typeof window.document !== "undefined";
var isIOS = isBrowser8 && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var plugin7 = ({ addFilter: addFilter2, utils }) => {
  const { Type: Type2, forin: forin2, getFileFromBlob: getFileFromBlob2, isFile: isFile2 } = utils;
  const TRANSFORM_LIST = ["crop", "resize", "filter", "markup", "output"];
  const createVariantCreator = (updateMetadata) => (transform, file2, metadata) => transform(file2, updateMetadata ? updateMetadata(metadata) : metadata);
  const isDefaultCrop = (crop) => crop.aspectRatio === null && crop.rotation === 0 && crop.zoom === 1 && crop.center && crop.center.x === 0.5 && crop.center.y === 0.5 && crop.flip && crop.flip.horizontal === false && crop.flip.vertical === false;
  addFilter2("SHOULD_PREPARE_OUTPUT", (shouldPrepareOutput, { query }) => new Promise((resolve) => {
    resolve(!query("IS_ASYNC"));
  }));
  const shouldTransformFile = (query, file2, item2) => new Promise((resolve) => {
    if (!query("GET_ALLOW_IMAGE_TRANSFORM") || item2.archived || !isFile2(file2) || !isImage3(file2)) {
      return resolve(false);
    }
    getImageSize3(file2).then(() => {
      const fn2 = query("GET_IMAGE_TRANSFORM_IMAGE_FILTER");
      if (fn2) {
        const filterResult = fn2(file2);
        if (filterResult == null) {
          return handleRevert(true);
        }
        if (typeof filterResult === "boolean") {
          return resolve(filterResult);
        }
        if (typeof filterResult.then === "function") {
          return filterResult.then(resolve);
        }
      }
      resolve(true);
    }).catch((err) => {
      resolve(false);
    });
  });
  addFilter2("DID_CREATE_ITEM", (item2, { query, dispatch }) => {
    if (!query("GET_ALLOW_IMAGE_TRANSFORM"))
      return;
    item2.extend("requestPrepare", () => new Promise((resolve, reject) => {
      dispatch("REQUEST_PREPARE_OUTPUT", {
        query: item2.id,
        item: item2,
        success: resolve,
        failure: reject
      }, true);
    }));
  });
  addFilter2("PREPARE_OUTPUT", (file2, { query, item: item2 }) => new Promise((resolve) => {
    shouldTransformFile(query, file2, item2).then((shouldTransform) => {
      if (!shouldTransform)
        return resolve(file2);
      const variants = [];
      if (query("GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_ORIGINAL")) {
        variants.push(() => new Promise((resolve2) => {
          resolve2({
            name: query("GET_IMAGE_TRANSFORM_VARIANTS_ORIGINAL_NAME"),
            file: file2
          });
        }));
      }
      if (query("GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_DEFAULT")) {
        variants.push((transform2, file3, metadata) => new Promise((resolve2) => {
          transform2(file3, metadata).then((file4) => resolve2({
            name: query("GET_IMAGE_TRANSFORM_VARIANTS_DEFAULT_NAME"),
            file: file4
          }));
        }));
      }
      const variantsDefinition = query("GET_IMAGE_TRANSFORM_VARIANTS") || {};
      forin2(variantsDefinition, (key, fn2) => {
        const createVariant = createVariantCreator(fn2);
        variants.push((transform2, file3, metadata) => new Promise((resolve2) => {
          createVariant(transform2, file3, metadata).then((file4) => resolve2({ name: key, file: file4 }));
        }));
      });
      const qualityAsPercentage = query("GET_IMAGE_TRANSFORM_OUTPUT_QUALITY");
      const qualityMode = query("GET_IMAGE_TRANSFORM_OUTPUT_QUALITY_MODE");
      const quality = qualityAsPercentage === null ? null : qualityAsPercentage / 100;
      const type = query("GET_IMAGE_TRANSFORM_OUTPUT_MIME_TYPE");
      const clientTransforms = query("GET_IMAGE_TRANSFORM_CLIENT_TRANSFORMS") || TRANSFORM_LIST;
      item2.setMetadata("output", {
        type,
        quality,
        client: clientTransforms
      }, true);
      const transform = (file3, metadata) => new Promise((resolve2, reject) => {
        const filteredMetadata = { ...metadata };
        Object.keys(filteredMetadata).filter((instruction) => instruction !== "exif").forEach((instruction) => {
          if (clientTransforms.indexOf(instruction) === -1) {
            delete filteredMetadata[instruction];
          }
        });
        const { resize, exif, output, crop, filter, markup } = filteredMetadata;
        const instructions = {
          image: {
            orientation: exif ? exif.orientation : null
          },
          output: output && (output.type || typeof output.quality === "number" || output.background) ? {
            type: output.type,
            quality: typeof output.quality === "number" ? output.quality * 100 : null,
            background: output.background || query("GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR") || null
          } : void 0,
          size: resize && (resize.size.width || resize.size.height) ? {
            mode: resize.mode,
            upscale: resize.upscale,
            ...resize.size
          } : void 0,
          crop: crop && !isDefaultCrop(crop) ? {
            ...crop
          } : void 0,
          markup: markup && markup.length ? markup.map(prepareMarkup2) : [],
          filter
        };
        if (instructions.output) {
          const willChangeType = output.type ? output.type !== file3.type : false;
          const canChangeQuality = /\/jpe?g$/.test(file3.type);
          const willChangeQuality = output.quality !== null ? canChangeQuality && qualityMode === "always" : false;
          const willModifyImageData = !!(instructions.size || instructions.crop || instructions.filter || willChangeType || willChangeQuality);
          if (!willModifyImageData)
            return resolve2(file3);
        }
        const options = {
          beforeCreateBlob: query("GET_IMAGE_TRANSFORM_BEFORE_CREATE_BLOB"),
          afterCreateBlob: query("GET_IMAGE_TRANSFORM_AFTER_CREATE_BLOB"),
          canvasMemoryLimit: query("GET_IMAGE_TRANSFORM_CANVAS_MEMORY_LIMIT"),
          stripImageHead: query("GET_IMAGE_TRANSFORM_OUTPUT_STRIP_IMAGE_HEAD")
        };
        transformImage(file3, instructions, options).then((blob2) => {
          const out = getFileFromBlob2(blob2, renameFileToMatchMimeType(file3.name, getValidOutputMimeType(blob2.type)));
          resolve2(out);
        }).catch(reject);
      });
      const variantPromises = variants.map((create2) => create2(transform, file2, item2.getMetadata()));
      Promise.all(variantPromises).then((files) => {
        resolve(files.length === 1 && files[0].name === null ? files[0].file : files);
      });
    });
  }));
  return {
    options: {
      allowImageTransform: [true, Type2.BOOLEAN],
      imageTransformImageFilter: [null, Type2.FUNCTION],
      imageTransformOutputMimeType: [null, Type2.STRING],
      imageTransformOutputQuality: [null, Type2.INT],
      imageTransformOutputStripImageHead: [true, Type2.BOOLEAN],
      imageTransformClientTransforms: [null, Type2.ARRAY],
      imageTransformOutputQualityMode: ["always", Type2.STRING],
      imageTransformVariants: [null, Type2.OBJECT],
      imageTransformVariantsIncludeDefault: [true, Type2.BOOLEAN],
      imageTransformVariantsDefaultName: [null, Type2.STRING],
      imageTransformVariantsIncludeOriginal: [false, Type2.BOOLEAN],
      imageTransformVariantsOriginalName: ["original_", Type2.STRING],
      imageTransformBeforeCreateBlob: [null, Type2.FUNCTION],
      imageTransformAfterCreateBlob: [null, Type2.FUNCTION],
      imageTransformCanvasMemoryLimit: [isBrowser8 && isIOS ? 4096 * 4096 : null, Type2.INT],
      imageTransformCanvasBackgroundColor: [null, Type2.STRING]
    }
  };
};
if (isBrowser8) {
  document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: plugin7 }));
}
var filepond_plugin_image_transform_esm_default = plugin7;

// resources/js/components/file-upload.js
registerPlugin(filepond_plugin_file_validate_size_esm_default);
registerPlugin(filepond_plugin_file_validate_type_esm_default);
registerPlugin(filepond_plugin_image_crop_esm_default);
registerPlugin(filepond_plugin_image_exif_orientation_esm_default);
registerPlugin(filepond_plugin_image_preview_esm_default);
registerPlugin(filepond_plugin_image_resize_esm_default);
registerPlugin(filepond_plugin_image_transform_esm_default);
var file_upload_default = (Alpine) => {
  Alpine.data("fileUploadFormComponent", ({
    acceptedFileTypes,
    getUploadedFileUrlUsing,
    imageCropAspectRatio,
    imagePreviewHeight,
    imageResizeTargetHeight,
    imageResizeTargetWidth,
    loadingIndicatorPosition,
    panelAspectRatio,
    panelLayout,
    placeholder,
    maxSize,
    minSize,
    removeUploadButtonPosition,
    removeUploadedFileUsing,
    state: state2,
    statePath,
    uploadButtonPosition,
    uploadedFileUrl,
    uploadProgressIndicatorPosition,
    uploadUsing
  }) => {
    return {
      files: [],
      pond: null,
      state: state2,
      init: function() {
        if (uploadedFileUrl) {
          this.files = [{
            source: uploadedFileUrl,
            options: {
              type: "local"
            }
          }];
        }
        this.pond = create$f(this.$refs.input, {
          acceptedFileTypes,
          credits: false,
          files: this.files,
          imageCropAspectRatio,
          imagePreviewHeight,
          imageResizeTargetHeight,
          imageResizeTargetWidth,
          ...placeholder && { labelIdle: placeholder },
          maxFileSize: maxSize,
          minFileSize: minSize,
          styleButtonProcessItemPosition: uploadButtonPosition,
          styleButtonRemoveItemPosition: removeUploadButtonPosition,
          styleLoadIndicatorPosition: loadingIndicatorPosition,
          stylePanelAspectRatio: panelAspectRatio,
          stylePanelLayout: panelLayout,
          styleProgressIndicatorPosition: uploadProgressIndicatorPosition,
          server: {
            load: (source, load) => {
              fetch(source).then((response) => {
                response.blob().then((blob2) => load(blob2));
              });
            },
            process: (fieldName, file2, metadata, load, error2, progress) => {
              uploadUsing(statePath, file2, load, error2, progress);
            },
            remove: (source, load) => {
              removeUploadedFileUsing(statePath).then(() => load());
            },
            revert: (uniqueFileId, load) => {
              removeUploadedFileUsing(statePath, uniqueFileId).then(() => load());
            }
          }
        });
        this.$watch("state", () => {
          if (!this.state) {
            this.pond.removeFiles();
            return;
          }
          if (this.state.startsWith("livewire-file:"))
            return;
          getUploadedFileUrlUsing(statePath).then((uploadedFileUrl2) => {
            if (uploadedFileUrl2) {
              this.pond.files = [{
                source: uploadedFileUrl2,
                options: {
                  type: "local"
                }
              }];
            } else {
              this.pond.files = [];
            }
          });
        });
      }
    };
  });
};

// resources/js/components/rich-editor.js
var import_trix = __toModule(require_trix());
import_trix.default.config.blockAttributes.heading = {
  tagName: "h2",
  terminal: true,
  breakOnReturn: true,
  group: false
};
import_trix.default.config.blockAttributes.subHeading = {
  tagName: "h3",
  terminal: true,
  breakOnReturn: true,
  group: false
};
var rich_editor_default = (Alpine) => {
  Alpine.data("richEditorFormComponent", ({
    state: state2,
    statePath
  }) => {
    return {
      state: state2,
      statePath,
      init: function() {
        this.$refs.trix?.editor?.loadHTML(this.state);
        this.$watch("state", () => {
          if (document.activeElement === this.$refs.trix)
            return;
          this.$refs.trix?.editor?.loadHTML(this.state);
        });
      }
    };
  });
};

// resources/js/components/select.js
var select_default = (Alpine) => {
  Alpine.data("selectFormComponent", ({
    getSearchResultsUsing,
    isAutofocused,
    options,
    selectedOptionLabel,
    state: state2,
    statePath
  }) => {
    return {
      displayText: selectedOptionLabel,
      focusedOptionIndex: null,
      isAutofocused,
      isLoading: false,
      isOpen: false,
      options,
      search: "",
      state: state2,
      init: function() {
        if (this.isAutofocused)
          this.openListbox();
        this.$watch("search", () => {
          if (!this.isOpen || this.search === "" || this.search === null) {
            this.options = options;
            this.focusedOptionIndex = 0;
            return;
          }
          if (Object.keys(options).length) {
            this.options = {};
            let search = this.search.trim().toLowerCase();
            for (let key in options) {
              if (options[key].trim().toLowerCase().includes(search)) {
                this.options[key] = options[key];
              }
            }
            this.focusedOptionIndex = 0;
          } else {
            this.isLoading = true;
            getSearchResultsUsing(statePath, this.search).then((options2) => {
              this.options = options2;
              this.focusedOptionIndex = 0;
              this.isLoading = false;
            });
          }
        });
        this.$watch("state", () => {
          if (this.state in this.options) {
            this.displayText = this.options[this.state];
          } else if (!this.state) {
            this.clearValue();
          }
        });
      },
      clearValue: function() {
        this.state = null;
        this.displayText = null;
        this.closeListbox();
      },
      closeListbox: function() {
        this.isOpen = false;
        this.focusedOptionIndex = null;
        this.search = "";
      },
      evaluatePosition: function() {
        let availableHeight = window.innerHeight - this.$refs.button.offsetHeight;
        let element = this.$refs.button;
        while (element) {
          availableHeight -= element.offsetTop;
          element = element.offsetParent;
        }
        if (this.$refs.listbox.offsetHeight <= availableHeight) {
          this.$refs.listbox.style.bottom = "auto";
          return;
        }
        this.$refs.listbox.style.bottom = `${this.$refs.button.offsetHeight}px`;
      },
      focusNextOption: function() {
        if (this.focusedOptionIndex === null) {
          this.focusedOptionIndex = Object.keys(this.options).length - 1;
          return;
        }
        if (this.focusedOptionIndex + 1 >= Object.keys(this.options).length)
          return;
        this.focusedOptionIndex++;
        this.$refs.listboxOptionsList.children[this.focusedOptionIndex].scrollIntoView({
          block: "center"
        });
      },
      focusPreviousOption: function() {
        if (this.focusedOptionIndex === null) {
          this.focusedOptionIndex = 0;
          return;
        }
        if (this.focusedOptionIndex <= 0)
          return;
        this.focusedOptionIndex--;
        this.$refs.listboxOptionsList.children[this.focusedOptionIndex].scrollIntoView({
          block: "center"
        });
      },
      openListbox: function() {
        this.focusedOptionIndex = Object.keys(this.options).indexOf(this.state);
        if (this.focusedOptionIndex < 0)
          this.focusedOptionIndex = 0;
        this.isOpen = true;
        this.$nextTick(() => {
          this.$refs.search.focus();
          this.evaluatePosition();
          this.$refs.listboxOptionsList.children[this.focusedOptionIndex].scrollIntoView({
            block: "center"
          });
        });
      },
      selectOption: function(index = null) {
        if (!this.isOpen) {
          this.closeListbox();
          return;
        }
        this.state = Object.keys(this.options)[index ?? this.focusedOptionIndex];
        this.displayText = this.options[this.state];
        this.closeListbox();
      },
      toggleListboxVisibility: function() {
        if (this.isOpen) {
          this.closeListbox();
          return;
        }
        this.openListbox();
      }
    };
  });
};

// resources/js/index.js
var js_default = (Alpine) => {
  Alpine.plugin(date_time_picker_default);
  Alpine.plugin(file_upload_default);
  Alpine.plugin(rich_editor_default);
  Alpine.plugin(select_default);
};
export {
  js_default as default
};
/*!
 * FilePond 4.28.2
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
/*!
 * FilePondPluginFileValidateSize 2.2.4
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
/*!
 * FilePondPluginFileValidateType 1.2.6
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
/*!
 * FilePondPluginImageCrop 2.0.6
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
/*!
 * FilePondPluginImageExifOrientation 1.0.11
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
/*!
 * FilePondPluginImagePreview 4.6.7
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
/*!
 * FilePondPluginImageResize 2.0.10
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
/*!
 * FilePondPluginImageTransform 3.8.6
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
