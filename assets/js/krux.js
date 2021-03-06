/* Release #4.9.13, see https://dataconsole.kruxdigital.com/kruxjs_release_notes/#4.9.13*/
/* File modified at 04/04/2012 04:30:17 PM PDT. md5 = f30cd07e050ce6a32fc19a30f9e54c53 */
/* Copyright 2010-2012 Krux Digital, Inc. All Rights Reserved. No permission is granted to use, copy or modify this code. */
!window.krux_js && -1 < location.search.indexOf("krux_release") ? function() {
    var h = location.search.match(/krux_release=(dev|stage)/);
    if (h) window.krux_js = "http://kruxcontent-" + h[1] + ".s3.amazonaws.com/krux.js?" + Math.random();
    else if (h = location.search.match(/krux_release=([\w.]+)/)) window.krux_js = "//cdn.krxd.net/kruxcontent/releases/krux-" + h[1] + ".js";
    if (window.krux_js) {
        window.console && console.log && console.log("Using " + window.krux_js);
        h = document.createElement("script");
        h.src = window.krux_js;
        var g = document.getElementsByTagName("script")[0];
        g.parentNode.insertBefore(h, g)
    }
}() : window.KRUX || function(h, g, j) {
    function z(a, b, c) {
        if (b.rules)
            for (var a = "tag_" + b.id, e = 0; e < b.rules.length; ++e) {
                var f = b.rules[e],
                    g = a + "_rule_" + e,
                    f = [f.name, f.actual, f.operator, f.value, f.pass ? "pass" : "fail"].join("|");
                c[g] = f
            }
    }

    function M(a) {
        r("config_requests");
        if (h.superTag.config) b.configOnload(h.superTag.config);
        else {
            var d = {
                pubid: h.pubid,
                site: h.site,
                callback: "KRUX.configOnload"
            };
            "unpublished" == b.getRequestVal("krux_config") && (d.state = "unpublished", d.cache = "false", d.cb = Math.random());
            d = l.configUrl + "?" + C(d);
            b.configStartTime = (new Date).getTime();
            G(d, !a)
        }
    }

    function N() {
        var a = !1;
        b.ST.config ? x.each(b.ST.config.tags || [], function(b) {
            return x.each(b.rules || [], function(b) {
                if ("country" === b.name) return a = !0, x.breaker
            })
        }) : a = !0;
        return a
    }
    var w = {
        pubid: "",
        site: "",
        section: "",
        subsection: "",
        channels: "",
        async: !1,
        autoCollect: !0,
        autoInit: !0,
        pixelTime: 1E3,
        reportErrors: !0,
        allTagsOffsite: !1,
        userAttributes: {},
        pageAttributes: {},
        trackSocial: !1
    };
    h || (h = w, g.KRUXSetup = h);
    for (var D in w) w.hasOwnProperty(D) &&
        "undefined" == typeof h[D] && (h[D] = w[D]);
    var E = (0 === location.protocol.indexOf("http") ? location.protocol : "http:") + "//services.krxd.net/",
        b = {
            _kvs: {},
            _parameters: {},
            backgroundGets: [],
            blockUrl: E + "block.gif",
            collectors: [],
            collectUrl: E + "pixel.gif",
            socialUrl: E + "social.gif",
            eventUrl: E + "event.gif",
            eventsUrl: E + "stats",
            geo: {},
            geoUrl: E + "geoip?root_name=KRUX.geo",
            configCache: "na",
            debugLevel: 0,
            errorUrl: E + "/jserror",
            loadedScripts: [],
            onloadCalled: !1,
            predbg: "",
            release: "4.9.13",
            scriptTimeout: 2E4,
            sessionViews: 0,
            sTag: /^<script((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
            userDataUrl: E + "/user_data/segments"
        },
        x = window.KRUX2 = function() {
            function a(a) {
                return !!(a === "" || a && a.charCodeAt && a.substr)
            }

            function d(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            }

            function c() {
                function a() {
                    for (var d = 0, c = arguments.length; d < c; ++d) b.push(arguments[d]);
                    return a
                }
                var b = [];
                a.data = function() {
                    return b.join("")
                };
                return a
            }

            function e(a, b, d) {
                var c = a.tagName,
                    f = a.attributes || {},
                    a = a.children || [],
                    b = b || [],
                    d = d || 0,
                    g = l[c];
                b("<", c);
                for (var h in f) b(" ", h, '="', f[h], '" ');
                if (g) return b("/>");
                b(">");
                f = 0;
                for (h = a.length; f < h; ++f) e(a[f], b, d + 1);
                g || b("</", c, ">")
            }

            function f(b, d) {
                a(b) && (b = {
                    tagName: b,
                    attributes: d
                });
                var f = new c;
                e(b, f);
                return f.data()
            }

            function h(a) {
                var b = document.createElement("div");
                b.innerHTML = a;
                return b.childNodes
            }

            function A(a) {
                var d = f.apply(null, arguments);
                b.literate() ? document.write(d) : document.body.appendChild(h(d)[0])
            }
            var v = {},
                j = v.breaker = {};
            v.each = function(a, b, d) {
                if (a)
                    if (a.length === +a.length)
                        for (var c = 0, e = a.length; c < e; c++) {
                            if (c in a && b.call(d, a[c], c, a) === j) return j
                        } else
                            for (c in a)
                                if (a.hasOwnProperty(c) &&
                                    b.call(d, a[c], c, a) === j) return j;
                return null
            };
            var l = new function(a) {
                    for (var b = 0; b < a.length; b++) this[a[b]] = true
                }(["area", "base", "basefont", "br", "col", "frame", "hr", "img", "input", "isindex", "link", "meta", "param", "embed"]),
                i = {},
                o = v.on = function(b, c, e, f) {
                    if (a(b)) {
                        f = e;
                        e = c;
                        c = b;
                        b = null
                    }
                    f && (e = d(e, f));
                    b ? b.addEventListener ? b.addEventListener(c, e, false) : b.attachEvent && b.attachEvent("on" + c, e) : (i[c] || (i[c] = [])).push(e)
                },
                k = v.off = function(b, d, c) {
                    if (a(b)) {
                        c = d;
                        d = b;
                        b = null
                    }
                    b && (b.removeEventListener ? b.removeEventListener(d,
                        c, false) : b.detachEvent && b.detachEvent(d, c))
                },
                m = {},
                p = v.fire = function(a, b) {
                    var b = b || {},
                        d = i[a] || [];
                    b.type = a;
                    m[a] = b;
                    for (var c = 0, e = d.length; c < e; ++c) d[c](b)
                },
                n = v.hasFired = function(a) {
                    return m[a]
                },
                u = v.fireOnce = function(a, d) {
                    if (n(a)) {
                        if (b.debugLevel) throw "Double fireOnce";
                    } else p(a, d)
                },
                K = v.waitFor = function(a, b, c) {
                    c && (b = d(b, c));
                    (c = n(a)) ? b(c): o(a, b)
                };
            v.waitForAll = function(b, c, e) {
                function f() {
                    if (!h) {
                        for (var a = 0, d = b.length; a < d; ++a)
                            if (!n(b[a])) return;
                        h = true;
                        c()
                    }
                }
                a(b) && (b = b.split(" "));
                if (a(c)) var g = c,
                    c = function() {
                        u(g,
                            e)
                    };
                else e && (c = d(c, e));
                for (var h = false, H = 0, j = b.length; H < j; ++H) K(b[H], f)
            };
            v.loadKuid = function() {
                function a() {
                    u("kuid", {
                        value: v.kuid
                    })
                }

                function b() {
                    function d(b) {
                        if (b.origin === "http://cdn.krxd.net") {
                            k(window, "message", d);
                            g.localStorage.kuid = v.kuid = b.data;
                            a()
                        }
                    }
                    o(window, "message", d);
                    A("iframe", {
                        src: "//cdn.krxd.net/kruxcontent/xdomain.html",
                        style: "display: none"
                    })
                }
                v.kuid = g.localStorage && g.localStorage.kuid;
                v.kuid ? a() : window.localStorage && window.postMessage ? b() : a()
            };
            return v
        }(),
        m = {};
    b._parameters = m;
    var n = {};
    n.ua = navigator.userAgent.toLowerCase();
    w = n.ua.match(/(webkit)[ \/]([\w.]+)/) || n.ua.match(/(opera)(?:.*version)?[ \/]([\w.]+)/) || n.ua.match(/(msie) ([\w.]+)/) || 0 > n.ua.indexOf("compatible") && n.ua.match(/(mozilla)(?:.*? rv:([\w.]+))?/) || ["", "", 0];
    n.browser = w[1];
    n.version = parseFloat((w[2] || "0").match(/^[0-9]+[.0-9]*/)[0], 10);
    n.msie = "msie" == w[1];
    n.mozilla = "mozilla" == w[1];
    n.webkit = "webkit" == w[1];
    n.opera = "opera" == w[1];
    n.gecko = -1 != n.ua.indexOf("gecko/");
    n.chrome = !!g.chrome;
    w = g.screen.colorDepth;
    D = g.screen;
    n.res = 8 == w || 16 == w || 24 == w || 32 == w ? [D.width, D.height, w].join("x") : [D.width, D.height].join("x");
    b.is = b._is = n;
    b.is.awesome = !0;
    b.is.performance = g.performance && g.performance.timing && !(b.is.gecko && 9 > b.is.version);
    b._ = function(a) {
        return j.getElementById(a)
    };
    var J = function(a, d, c) {
            a = (a || "") + d.replace(/[^0-9A-Za-z_]/g, "_");
            if (c) {
                c = b.toS(c).substring(0, 542);
                m[a] = c;
                return true
            }
            return m[a]
        },
        L = function(a, d) {
            for (var c = b.keyValues(a), e = 0; e < c.keys.length; e++) J(d, c.keys[e], c.values[e])
        };
    b.context = function(a, b) {
        return J("_kcp_",
            a, b)
    };
    b.pageAttribute = function(a, b) {
        return J("_kpa_", a, b)
    };
    b.userAttribute = function(a, b) {
        return J("_kua_", a, b)
    };
    b.afterLoadCallback = function(a) {
        if (b.onloadCalled) return a();
        if (!b.afterLoadFunctions) b.afterLoadFunctions = [];
        b.afterLoadFunctions.push(a);
        return null
    };
    b.trackSocial = function() {
        b.trackFacebook();
        b.trackTwitter()
    };
    b.trackFacebook = function() {
        if (g.FB && g.FB.Event && g.FB.Event.subscribe) {
            g.FB.Event.subscribe("edge.create", function(a) {
                var d = b.clone(m);
                d._ksoc_t = "fb";
                d._ksoc_e = "like";
                d._ksoc_url =
                    a;
                F(h.socialUrl || b.socialUrl, d);
                r("facebook.like")
            });
            g.FB.Event.subscribe("edge.remove", function(a) {
                var d = b.clone(m);
                d._ksoc_t = "fb";
                d._ksoc_e = "unlike";
                d._ksoc_url = a;
                F(h.socialUrl || b.socialUrl, d);
                r("facebook.unlike")
            });
            g.FB.Event.subscribe("message.send", function(a) {
                var d = b.clone(m);
                d._ksoc_t = "fb";
                d._ksoc_e = "send";
                d._ksoc_url = a;
                F(h.socialUrl || b.socialUrl, d);
                r("facebook.send")
            })
        }
    };
    b.trackTwitter = function() {
        g.twttr && g.twttr.events && g.twttr.events.bind && g.twttr.events.bind("tweet", function(a) {
            if (a) {
                var d;
                a.target && a.target.nodeName == "IFRAME" && (d = b.getRequestVal("url", "", I(a.target)));
                a = b.clone(m);
                a._ksoc_t = "twttr";
                a._ksoc_e = "tweet";
                a._ksoc_url = d;
                F(h.socialUrl || b.socialUrl, a);
                r("twitter.tweet")
            }
        })
    };
    b.appendTag = function(a, b) {
        var c = j.createElement(a),
            e;
        for (e in b) typeof e == "string" && (c[e] = b[e]);
        if ((e = j.getElementsByTagName("head")) && e[0]) e[0].appendChild(c);
        else {
            e = j.getElementsByTagName("script");
            for (var f = 0, g = e.length; f < g; f++)
                if (e[f] && e[f].parentNode) {
                    e[f].parentNode.insertBefore(c, e[f]);
                    break
                }
        }
        return c
    };
    b.bool = function(a) {
        return typeof a == "string" && a.toLowerCase() === "false" || a === "0" ? false : !!a
    };
    b.buildElement = function(a, d) {
        for (var c = j.createElement(a), e = b.keyValues(d), f = 0; f < e.keys.length; f++) {
            var g, h;
            try {
                g = e.keys[f].replace(/[^A-Za-z0-9_]/g, "_").toLowerCase();
                h = b.toS(e.values[f]).replace(/"/g, "&quot;");
                c.setAttribute(g, h)
            } catch (v) {}
        }
        return c
    };
    b.buildAttributes = function(a) {
        for (var d = [], a = b.keyValues(a), c = 0; c < a.keys.length; c++) {
            var e, f;
            try {
                e = a.keys[c].replace(/[^A-Za-z0-9_]/g, "_").toLowerCase();
                f = b.toS(a.values[c]).replace(/"/g,
                    "&quot;");
                d.push(e + '="' + f + '"')
            } catch (g) {}
        }
        return d.join(" ")
    };
    b.collectBeacon = function() {
        var a = s && s.geo || null;
        if (a) {
            m.geo_country = a.COUNTRY;
            m.geo_region = a.REGION;
            m.geo_city = a.CITY;
            m.geo_dma = a.DMA
        }
        if (s && s.tags)
            for (var a = 0, d = s.tags.length; a < d; a++) {
                if (s.tags[a].started) {
                    l.loadSequence = l.loadSequence ? l.loadSequence + 1 : 1;
                    m["kplt" + l.loadSequence] = s.tags[a].id;
                    r("tags_loaded")
                }
                z(a, s.tags[a], m)
            }
        m._knifr = g.frames.length;
        m._kpid = h.pubid;
        i.realtimeSegments();
        m._krtsegs = i._rsegments;
        b.context("s", h.site);
        b.context("sc",
            h.section);
        b.context("ssc", h.subSection);
        var c = g.performance;
        if (b.is.performance) {
            m.t_navigation_type = c.navigation.type;
            a = function(a, b) {
                if (!c.timing[a] || !c.timing[b]) return -1;
                var d = c.timing[b] - c.timing[a];
                return d < 0 || d > 3E4 ? -1 : d
            };
            m.t_dns = a("domainLookupStart", "domainLookupEnd");
            m.t_tcp = a("connectStart", "connectEnd");
            m.t_http_request = a("requestStart", "responseStart");
            m.t_http_response = a("responseStart", "responseEnd");
            m.t_content_ready = a("navigationStart", "domInteractive");
            m.t_window_load = a("navigationStart",
                "loadEventStart");
            m.t_redirect = a("redirectStart", "redirectEnd")
        }
        F(h.collectUrl || b.collectUrl, m);
        O();
        x.fireOnce("collect_beacon")
    };
    b.clone = function(a) {
        if (typeof a == "object" && a !== null) {
            var d = new a.constructor,
                c;
            for (c in a) a.hasOwnProperty(c) && (d[c] = b.clone(a[c]));
            return d
        }
        return a
    };
    (function() {
        function a(a, b) {
            if (!a._done) {
                a(b);
                a._done = 1
            }
        }

        function d(a) {
            var b;
            if (typeof a == "object")
                for (var d in a) a[d] && (b = {
                    name: d,
                    url: a[d]
                });
            else {
                b = a.split("/");
                b = b[b.length - 1];
                d = b.indexOf("?");
                b = {
                    name: d != -1 ? b.substring(0,
                        d) : b,
                    url: a
                }
            }
            if ((a = p[b.name]) && a.url === b.url) return a;
            return p[b.name] = b
        }

        function c(a, b) {
            if (a) {
                typeof a == "object" && (a = [].slice.call(a));
                for (var d = 0; d < a.length; d++) b.call(a, a[d], d)
            }
        }

        function e(a) {
            return Object.prototype.toString.call(a) == "[object Function]"
        }

        function f(a) {
            var a = a || p,
                b = false,
                d = 0,
                c;
            for (c in a)
                if (a.hasOwnProperty(c)) {
                    if (a[c].state != t) return false;
                    b = true;
                    d++
                }
            return b || d === 0
        }

        function h(a) {
            a.state = K;
            c(a.onpreload, function(a) {
                a.call()
            })
        }

        function A(a, b, d) {
            if (!b.state) {
                b.state = s;
                b.node = a;
                b.onpreload = [];
                G(b.url, false, function() {
                    h(b)
                }, d, a, "cache")
            }
        }

        function v(b, d, e) {
            if (d.state == t && e) return e(b);
            if (d.state == r) return u.ready(d.name, e);
            if (d.state == s) return d.onpreload.push(function() {
                v(d, e)
            });
            d.state = r;
            d.node = b;
            G(d.url, false, function() {
                d.state = t;
                e && e(b);
                c(m[d.name], function(d) {
                    a(d, b)
                });
                l && f() && c(m.ALL, function(d) {
                    a(d, b)
                })
            });
            return true
        }
        var i, l, k = [],
            o = [],
            m = {},
            p = {},
            n = j.createElement("script").async === true || "MozAppearance" in j.documentElement.style || g.opera,
            q = g.head_conf && g.head_conf.KRUXhead || "KRUXhead",
            u = g[q] = g[q] || function() {
                u.ready.apply(null, arguments)
            },
            K = 0,
            s = 1,
            r = 2,
            t = 3;
        u.js = n ? function() {
            var b = arguments,
                g = b[b.length - 1],
                h = [],
                H = b[0],
                b = [].slice.call(b, 1);
            e(g) || (g = null);
            c(b, function(c, e) {
                if (c != g) {
                    c = d(c);
                    h.push(c);
                    v(H, c, g && e == b.length - 2 ? function() {
                        f(h) && a(g, H)
                    } : null)
                }
            });
            return u
        } : function() {
            var a = arguments,
                b = a[0],
                f = [].slice.call(a, 2),
                g = f[0];
            if (!i) {
                o.push(function() {
                    u.js.apply(null, a)
                });
                return u
            }
            if (g) {
                c(f, function(a) {
                    e(a) || A(b, d(a))
                });
                v(b, d(a[1]), e(g) ? g : function() {
                    u.js.apply(null, f)
                })
            } else v(b, d(a[1]));
            return u
        };
        u.ready = function(b, d) {
            if (b == "dom") {
                l ? a(d) : k.push(d);
                return u
            }
            if (e(b)) {
                d = b;
                b = "ALL"
            }
            var c = p[b];
            if (c && c.state == t || b == "ALL" && f() && l) {
                a(d);
                return u
            }(c = m[b]) ? c.push(d): m[b] = [d];
            return u
        };
        u.ready("dom", function() {
            i && f() && c(m.ALL, function(b) {
                a(b)
            });
            u.feature && u.feature("domloaded", true)
        });
        setTimeout(function() {
            i = true;
            c(o, function(a) {
                a()
            })
        }, 0);
        b.fireReady = function() {
            if (!l) {
                l = true;
                c(k, function(b) {
                    a(b)
                })
            }
        }
    })(document);
    (function() {
        var a = /^<([\w:]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
            d = /^<\/([\w:]+)[^>]*>/,
            c = /([\w:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
            e = function(a) {
                for (var b = {}, a = a.split(","), d = 0; d < a.length; d++) b[a[d]] = true;
                return b
            },
            f = e("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"),
            g = e("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,table,tbody,td,tfoot,th,thead,tr,ul"),
            h = e("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
            j = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
            l = e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
            i = e("script,style");
        b.HTMLParser = function(e, o, k) {
            function m(a, d, e, i) {
                if (g[d] || d.toLowerCase().indexOf("fb:") === 0)
                    for (; t.last() && h[t.last()];) p("", t.last());
                j[d] && t.last() == d && p("", d);
                (i = f[d] || !!i) || t.push(d);
                if (k.start) {
                    var q = [];
                    e.replace(c, function(a, b, d, c, e) {
                        a = d ? d : c ? c : e ? e : l[b] ? b : "";
                        q.push({
                            name: b,
                            value: a,
                            escaped: a.replace(/(^|[^\\])"/g,
                                '$1\\"')
                        })
                    });
                    b.predbg = b.predbg + " ";
                    k.start && k.start(d, q, i, n, o, y) == -1 && (o = "");
                    if (i) b.predbg = b.predbg.substr(0, b.predbg.length - 1)
                }
            }

            function p(a, d) {
                var c = 0;
                if (d)
                    for (c = t.length - 1; c >= 0; c--)
                        if (t[c] == d) break;
                if (c >= 0) {
                    for (var e = t.length - 1; e >= c; e--)
                        if (k.end) {
                            k.end(t[e], n, o) == -1 && (o = "");
                            b.predbg = b.predbg.substr(0, b.predbg.length - 1)
                        }
                    t.length = c
                }
            }
            var n = e,
                u = "",
                q, s, r, t = [],
                w = o,
                x = 0,
                y = this;
            t.last = function() {
                return this[this.length - 1]
            };
            this.parse = function(b, c, e) {
                n = b || n;
                typeof u == "string" && (c = u + c);
                u = "";
                for (w = o = c; o;) {
                    s =
                        true;
                    if (!t.last() || !i[t.last()]) {
                        if (o.indexOf("<\!--") === 0) {
                            q = o.indexOf("--\>");
                            if (q >= 0) {
                                e.comment && e.comment(o.substring(4, q), n, o) == -1 && (o = "");
                                o = o.substring(q + 3);
                                s = false
                            }
                        } else if (o.indexOf("</") === 0) {
                            if (r = o.match(d)) {
                                o = o.substring(r[0].length);
                                r[0].replace(d, p);
                                s = false
                            }
                        } else if (o.indexOf("<") === 0)
                            if (r = o.match(a)) {
                                o = o.substring(r[0].length);
                                r[0].replace(a, m);
                                s = false
                            }
                        if (s) {
                            q = o.indexOf("<");
                            b = q < 0 ? o : o.substring(0, q);
                            o = q < 0 ? "" : o.substring(q);
                            e.chars && e.chars(b, n, o) == -1 && (o = "")
                        }
                    } else if (o.indexOf("</" +
                            t.last() + ">") != -1) {
                        var f = t.last();
                        o = o.replace(RegExp("([^\x00]*?)</" + t.last() + "[^>]*>", "m"), function(a, b) {
                            b = b.replace(/<\!--(.*?)--\>/g, "$1").replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1");
                            t.last() == "script" && x++;
                            f == "script" && t.pop();
                            e.chars && e.chars(b, n, o, x, 1) == -1 && (o = "");
                            f == "script" && t.push(f);
                            t.last() == "script" && x--;
                            return ""
                        });
                        p("", t.last())
                    }
                    if (o == w) return u = o;
                    w = o
                }
                return ""
            };
            this.setUnparsed = function(a) {
                if (typeof a == "string" || typeof a == "number") u = u + (a + "");
                return u
            };
            o.length && this.parse(n, o, k)
        }
    })();
    var y = {
        blocklist: [],
        urlDisabled: !1
    };
    b.CM = y;
    j.__krux_write_real = j.write;
    j.__krux_writeln = j.writeln;
    j.__krux_write = function(a) {
        if (b.literate()) return j.__krux_write_real(a);
        if (g.KRUXTest && g.KRUXTest.throwDebugErrors) throw "FAILED to write to page, it's too late. rs=" + j.readyState + ": " + a;
        return false
    };
    var p = {
        scriptStack: [],
        insideStack: [],
        scriptParse: 0,
        _src: void 0
    };
    b.tagWriter = p;
    p.setup = function() {
        if (!p.setup.called) {
            p.setup.called = true;
            j.write = j.writeln = p.docWrite = function(a, d) {
                function c(a, d, i, l, k, v) {
                    for (var A = {}, m = a.toLowerCase(), n = 0, r = d.length; n < r; n++) {
                        if (!h && (d[n].name.toLowerCase() == "src" || d[n].name.toLowerCase() == "krux_deferred_src") && y.checkBL(d[n].value)) {
                            A.blocked_src = d[n].value;
                            A.krux_blocked = "1";
                            y.recordBlock(d[n].value)
                        } else {
                            if ((d[n].name.toLowerCase() == "krux_deferred_src" || d[n].name.toLowerCase() == "src") && m == "script") p._src = d[n].value;
                            A[d[n].name] = d[n].value
                        }
                        if (A.krux_blocked && (m == "img" || m == "iframe")) A.style = "display: none"
                    }
                    if (a == "script") {
                        if ((d = I(A)) && b.literate()) {
                            j.__krux_write('<script src="' +
                                d + '"><\/script>');
                            return
                        }
                        if (d) {
                            v.setUnparsed(k);
                            g.KRUXhead.js(void 0, d, function() {
                                v.parse(l || p.node, "", {
                                    start: c,
                                    end: e,
                                    chars: f
                                })
                            });
                            return
                        }
                        p.scripts++
                    }
                    a = b.buildElement(a, A);
                    k = p.node;
                    try {
                        q.last() ? k.appendChild(a) : k.parentNode.insertBefore(a, k.nextSibling)
                    } catch (s) {}
                    q.push(i ? 0 : 1);
                    p.node = a
                }

                function e() {
                    q.pop();
                    if (q.last()) p.node = p.node.parentNode
                }

                function f(a) {
                    var b = p.node;
                    if (q.last()) try {
                        q.push(0);
                        b.appendChild(j.createTextNode(a));
                        q.pop()
                    } catch (d) {
                        b.text = b.text + a
                    } else try {
                        p.node = b.parentNode.insertBefore(j.createTextNode(a),
                            b.nextSibling)
                    } catch (c) {}
                }
                var h = y.blocklist.length < 1 || y.urlDisabled;
                if (h && b.literate()) j.__krux_write(a);
                else {
                    a = a + "";
                    if (a.length !== 0) {
                        if (d) {
                            var i = p.node,
                                l = q;
                            p.node = d;
                            q.length = 0;
                            q.push(1)
                        } else {
                            var k = j.getElementsByTagName("script");
                            if (k.length != p.scripts) {
                                p.scripts = k.length;
                                p.node = k[k.length - 1];
                                q.push(0)
                            }
                        }
                        p.parser ? p.parser.parse(d, a, {
                            start: c,
                            end: e,
                            chars: f
                        }) : p.parser = new b.HTMLParser(d, a, {
                            start: c,
                            end: e,
                            chars: f
                        });
                        if (d) {
                            p.node = i;
                            q = l
                        }
                    }
                }
            }
        }
    };
    y.addToBL = function(a) {
        y.blocklist.push(a.toLowerCase())
    };
    g.addToBlocklist =
        y.addToBL;
    y.checkBL = function(a) {
        if (typeof a != "string") return 0;
        for (var a = a.toLowerCase().replace(/\?.+$/, ""), b = 0; b < y.blocklist.length; b++)
            if (a.match(RegExp(y.blocklist[b]))) return 1;
        return 0
    };
    y.recordBlock = function(a) {
        r("counter_measure_blocks");
        F(b.blockUrl + "?" + C({
            _kpid: h.pubid,
            _kcp_s: h.site,
            _kcp_sc: h.section,
            _kcp_ssc: h.subSection,
            _kurl_0: a
        }))
    };
    b.configOnload = function(a) {
        s = a;
        b.ST.config = a;
        r("config_request_time", (new Date).getTime() - b.configStartTime, "ms");
        if (a.blocklist)
            for (var d = 0; d < a.blocklist.length; d++) g.addToBlocklist(a.blocklist[d].pattern);
        if (a.params) {
            if (a.params.max_slot_time !== void 0) h.pixelTime = a.params.max_slot_time;
            h.autoCollect = b.bool(a.params.capture_leakage);
            h.captureErrors = b.bool(a.params.capture_js_errors);
            h.siteLevel = b.bool(a.params.site_level_supertag_config);
            a.params.control_tag_stats_prefix && r("views." + a.params.control_tag_stats_prefix)
        }
        if (a.services)
            for (var c in a.services) switch (c) {
                case "userData":
                    b.userDataUrl = a.services[c];
                    break;
                case "stats":
                    b.eventsUrl = a.services[c];
                    break;
                case "monitor":
                    b.errorUrl = a.services[c];
                    break;
                case "event":
                    b.eventUrl = a.services[c];
                    break;
                case "social":
                    b.socialUrl = a.services[c];
                    break;
                case "pixel":
                    b.collectUrl = a.services[c]
            }
        a.blocklist && a.blocklist.length > 0 && p.setup();
        x.fireOnce("config_loaded")
    };
    b.d = function(a, d, c) {
        var e = g.console,
            f = g.KRUXTest;
        if (!(typeof e != "object" || d > b.debugLevel)) {
            if (f && f.throwDebugErrors && d <= -1) throw "KRUX.d reported an error: " + a;
            d <= -2 ? e.error ? e.error("KRUX: " + a) : e.log("KRUX ERROR: " + a) : d == -1 ? e.warn ? e.warn("KRUX: " + a) : e.log("KRUX WARNING: " + a) : d <= 1 ? e.info ? e.info("KRUX: " +
                a) : e.log("KRUX INFO: " + a) : e.log("KRUX DEBUG: " + b.predbg + a);
            c && e.dir && e.dir(c)
        }
    };
    b.DART = {};
    b.DART.parseZone = function(a) {
        for (var b = {}, a = a.split("/"), c = 0; c < a.length; c++) switch (c) {
            case 0:
                b.site = a[c];
                break;
            case 1:
                b.section = a[c];
                break;
            case 2:
                b.subSection = a[c];
                break;
            default:
                b["subSection" + (c - 1)] = a[c]
        }
        return b
    };
    b.DART.keyValues = function(a) {
        for (var d = {}, c = a.split(";"), e = 0; e < c.length; e++)(a = c[e].match(/(.+)=(.+)/)) && (a[1].length > 25 || (d[a[1]] = a[2]));
        return d = b.removeKeys(d, ["sz", "dcopt", /^ord/, "tile", "pos",
            /uri/, /click/, "ksgmnt", /null/, /undefined/
        ])
    };
    b.DART.passDartKvsAsPageAttributes = function(a) {
        var d = b.tagSrcWithMatchingDomain("ad.doubleclick.net", "script") || b.tagSrcWithMatchingDomain("ad.doubleclick.net", "iframe");
        if (!d) return {};
        var d = b.DART.keyValues(d),
            d = b.removeKeys(d, a),
            c;
        for (c in d) typeof c == "string" && b.pageAttribute(c, d[c]);
        return d
    };
    b.passDartToKrux = b.DART.passDartKvsAsPageAttributes;
    b.genUid = function() {
        var a = "abcdefghijklmnopqrstuvwxyz0123456789",
            b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + a + "-_",
            a = a.split(""),
            b = b.split(""),
            c = function(a, b) {
                for (var d = b.length, c, e = []; a > 0;) {
                    c = a % d;
                    a = Math.floor(a / d);
                    e.push(b[c])
                }
                e.reverse();
                return e.join("")
            },
            e = (new Date).getTime() / 1E3 + "" + Math.random().toString().substring(3, 6) + "",
            e = e.substring(1, e.length - 1),
            e = e.replace(".", "");
        return function(e) {
            return [c(e, b), c(e, a)]
        }(parseInt(e, 10))
    };
    b.get2ndLevelDomain = function(a) {
        var b = a.match(/https*:\/\/([^:\/]+)/),
            a = b ? b[1].toLowerCase() : a.toLowerCase();
        if (a.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/) || a.indexOf(".") === -1) return a;
        if (b = a.match(/([\w\-]{1,249}\.com*\.[a-z]{2})$/)) return b[1];
        return (a = a.match(/([\w\-]{1,250}\.[a-z]{2,3})$/)) ? a[1] : false
    };
    b.getBrowserLang = function() {
        var a = g.navigator;
        return (b.forcedLanguage || a.language || a.systemLanguage || a.browserLanguage || a.userLanguage || "").substring(0, 2)
    };
    b.getCollectors = function(a) {
        var d = function(a) {
                var d = I(a);
                if (d) {
                    m._knpix = m._knpix ? m._knpix + 1 : 1;
                    m["_kpix_" + b.collectors.length] = d.replace(/\?.+/, "");
                    b.collectors.push(a)
                }
            },
            c = function(a) {
                for (var b = {
                            w: null,
                            h: null
                        }, d = a.attributes,
                        c = 0, e = d.length; c < e; c++)
                    if (d[c].name.toLowerCase() == "height") b.h = parseInt(d[c].value, 10);
                    else if (d[c].name.toLowerCase() == "width") b.w = parseInt(d[c].value, 10);
                if (b.w && b.h) return b;
                if (a.complete) {
                    b.w = a.width;
                    b.h = a.height
                }
                return b
            };
        if (a.getElementsByTagName)
            for (var a = a.getElementsByTagName("img"), e = 0, f = a.length; e < f; e++)
                if (b.isOffsiteTag(a[e])) {
                    var g = c(a[e]);
                    (g.w === 1 && g.h === 1 || g.w === 0 && g.h === 0) && d(a[e])
                }
    };
    b.getRequestVal = function(a, d, c) {
        c = b.parseQueryString(c || location.search);
        return a in c ? c[a] : d
    };
    var F =
        function(a, d) {
            d && (a = a + ("?" + C(d)));
            var c = b._is.ie && b._is.version <= 6 ? 4E3 : 8E3;
            a.length > c && (a = a.substring(0, c));
            (new Image).src = a;
            b.backgroundGets.push(a);
            return a
        };
    b.backgroundGet = F;
    var C = function(a, d) {
        for (var c = [], e, f = b.keyValues(a), d = d || "&", g = 0; g < f.keys.length; g++) {
            e = b.toS(f.values[g]);
            c.push(encodeURIComponent(f.keys[g]) + "=" + encodeURIComponent(e))
        }
        return c.join(d)
    };
    b.buildQueryString = C;
    b.cookie = function(a, b, c) {
        if (arguments.length > 1) {
            c = c || {};
            if (!b) {
                b = "";
                c.expires = -1
            }
            var e = "";
            if (c.expires && (typeof c.expires ===
                    "number" || c.expires.toUTCString)) {
                if (typeof c.expires == "number") {
                    e = new Date;
                    e.setTime(e.getTime() + c.expires * 1E3)
                } else e = c.expires;
                e = "; expires=" + e.toUTCString()
            }
            var f = c.path ? "; path=" + c.path : "",
                g = c.domain ? "; domain=" + c.domain : "",
                h = c.secure ? "; secure" : "";
            j.cookie = [a, "=", encodeURIComponent(b), e, f, g, h].join("");
            return true
        }
        if (j.cookie) return (e = j.cookie.match(RegExp(a + "=([^;]+)"))) ? unescape(e[1]) : null;
        return null
    };
    b.parseQueryString = function(a) {
        function b(a) {
            try {
                return decodeURIComponent(a)
            } catch (d) {
                return null
            }
        }
        var c = [];
        if (!a) return c;
        a.charAt(0) === "?" && (a = a.substr(1));
        for (var a = a.replace(/\;/g, "&").replace(/\+/g, "%20"), a = a.split("&"), e = 0, f; e < a.length; e++)
            if (a[e].length !== 0) {
                var g = "";
                f = "";
                if ((f = a[e].indexOf("=")) != -1) {
                    g = b(a[e].substr(0, f));
                    f = b(a[e].substr(f + 1))
                } else {
                    g = b(a[e]);
                    f = true
                }
                c[g] = f
            }
        return c
    };
    b.init = function() {
        h.subSection = h.subSection || h.subsection || h.sub_section;
        h.userAttributes = h.userData || h.userAttributes;
        var a = b.get2ndLevelDomain(j.domain);
        b.context("d", a);
        h.site = h.site || a;
        if (b.isInAdIframe()) m._inifr =
            "true";
        else if (j.referrer) m._kpref_ = j.referrer;
        h.trackSocial && b.afterLoadCallback(b.trackSocial);
        if (h.pubid == "1c6ac852-8938-481a-84b8-4806affc8c13") h.async = true;
        a = b.S.get("kuid");
        if (!a) {
            a = b.genUid()[0];
            b.S.set("kuid", a)
        }
        m._kuid = a;
        L(h.userAttributes, "_kua_");
        L(h.pageAttributes, "_kpa_");
        if (g.sessionStorage) {
            b.sessionViews = (parseInt(g.sessionStorage.kviews, 10) || 0) + 1;
            g.sessionStorage.kviews = b.sessionViews;
            m.sview = b.sessionViews
        }
        a = j.getElementsByTagName("script");
        q.push(0);
        p.scripts = a.length;
        p.node = a[a.length -
            1]
    };
    var q = [];
    q.last = function() {
        return this[this.length - 1]
    };
    q.p = q.pop;
    q.pop = function() {
        return this.p()
    };
    q.s = q.push;
    q.push = function(a) {
        return this.s(a)
    };
    b.inside = q;
    b.iframeContents = function(a, d) {
        var c = function(a) {
            var d = b.iframeDoc(b._(a));
            g.addEventListener ? d.close() : d.readyState == "interactive" ? d.close() : setTimeout(function() {
                c(a)
            }, 250)
        };
        typeof a === "string" && (a = b._(a));
        if (!a) return d === void 0 ? false : "";
        var e = b.iframeDoc(a);
        if (d === void 0) return e.body ? e.body.innerHTML : "";
        var f = "<html><head><title>" + j.title +
            "</title></head>",
            f = f + ("<body><script>window.KRUX = window.parent.KRUX; window.KRUXSetup = window.parent.KRUXSetup;window.KRUXHTTP = window.parent.KRUXHTTP;<\/script>" + d + "</body></html>");
        e.open();
        e.write(f);
        c(a.id);
        return true
    };
    b.iframeDoc = function(a) {
        try {
            if (a.contentDocument) return a.contentDocument;
            if (a.contentWindow) return a.contentWindow.document
        } catch (b) {
            return false
        }
    };
    var I = function(a) {
        try {
            return a.src
        } catch (b) {
            return ""
        }
    };
    b.in_array = function(a, d, c) {
        for (var d = b.keyValues(d), e = 0; e < d.keys.length; e++)
            if (c) {
                if (b.toS(d.values[e]).toLowerCase() ==
                    b.toS(a).toLowerCase()) return true
            } else if (d.values[e] == a) return true;
        return false
    };
    b.isIgnoredError = function(a) {
        if (b.getBrowserLang() != "en") return true;
        for (var d = [/^Permission denied/, /Error loading script/, /Script error\./, /Access is denied/], c = 0; c < d.length; c++)
            if (d[c].test(a)) return true;
        return false
    };
    b.isInAdIframe = function() {
        if (g.self == g.top) return false;
        var a = 0,
            b = 0,
            c = j.documentElement,
            e = j.body;
        if (typeof g.innerWidth == "number") {
            a = g.innerWidth;
            b = g.innerHeight
        } else if (c && (c.clientWidth || c.clientHeight)) {
            a =
                c.clientWidth;
            b = c.clientHeight
        } else if (e && (e.clientWidth || e.clientHeight)) {
            a = e.clientWidth;
            b = e.clientHeight
        }
        return a * b <= 18E4
    };
    b.isOffsiteTag = function(a, d) {
        var c = I(a);
        if (!c) return false;
        if (h.allTagsOffsite) return true;
        if (!c.match(/https*:\/\//)) return false;
        var e = b.get2ndLevelDomain(d || j.domain);
        return b.get2ndLevelDomain(c) != e
    };
    b.kv = function(a, d) {
        if (d !== void 0) return b._kvs[a] = d;
        return b._kvs[a] || h.userData && h.userData[a] || h[a] || null
    };
    b.keyValues = function(a) {
        var b = [],
            c = [],
            e;
        for (e in a)
            if (a.hasOwnProperty(e)) {
                b.push(e);
                c.push(a[e])
            }
        return {
            keys: b,
            values: c
        }
    };
    b.literate = function() {
        if (h.async) return false;
        var a = j.readyState;
        return a == "complete" || a == "loaded" || a == "interactive" && (b._is.gecko || b._is.webkit) ? false : true
    };
    var i = {
        _kuid: null,
        _segments: null,
        _responseData: null,
        serviceUrl: g.KRUXSetup && h.segmentsServiceUrl || b.userDataUrl,
        usingCache: !1,
        cookieLifetime: 2592E3,
        cacheLifetime: 14400,
        realtimeSegmentLifetime: 86400,
        loadOptions: {
            html5Storage: !0,
            varName: "ksgmnts"
        }
    };
    b.Segments = i;
    i.getEngine = function() {
        var a = k.HTML5;
        if (!i.loadOptions.html5Storage ||
            !a.isSupported()) a = k.Cookies;
        return a
    };
    i.load = function(a) {
        var a = a || {},
            b;
        for (b in a) b in i.loadOptions && (i.loadOptions[b] = a[b]);
        var c, a = i.getEngine();
        if (a.get(i.loadOptions.varName) !== null) {
            i.usingCache = true;
            i._segments = a.get(i.loadOptions.varName);
            c = a.get(i.loadOptions.varName + "_lu")
        }
        i._kuid = a.get("kuid");
        i.realtimeSegments();
        if (!i.load.called) {
            i.load.called = true;
            if (!c || (new Date).getTime() / 1E3 - parseInt(c, 36) > i.cacheLifetime) {
                c = i.serviceUrl + "?" + C({
                    callback: "KRUX.Segments.callback",
                    pubid: h.pubid
                });
                G(c, false);
                i.startTime = (new Date).getTime();
                r("segment_requests")
            } else x.fireOnce("segments_loaded")
        }
    };
    b.loadSegments = i.load;
    i.callback = function(a) {
        r("segment_request_time", (new Date).getTime() - i.startTime, "ms");
        i._kuid = a.kuid;
        if (a.segments) {
            i._segments = a.segments.join(",");
            var a = b.timeStamp(),
                d = i.getEngine();
            d.set(i.loadOptions.varName, i._segments, i.cookieLifetime);
            d.set(i.loadOptions.varName + "_lu", a, i.cookieLifetime);
            d.set("kuid", i._kuid);
            x.fireOnce("segments_loaded")
        }
    };
    i.realtimeSegments = function() {
        if (s &&
            s.segments && s.segments.length) {
            for (var a = [], b = 0, c = s.segments.length; b < c; b++) i.isValidSegment(s.segments[b]) && a.push(s.segments[b].segment_id);
            i._rsegments = a.join(",");
            i.getEngine().set(i.loadOptions.varName + "_r", i._rsegments, i.realtimeSegmentLifetime)
        }
    };
    i.get = function() {
        var a = k,
            b = i._segments || a.HTML5.isSupported() && a.HTML5.get(i.loadOptions.varName) || a.Cookies.get(i.loadOptions.varName) || "",
            a = a.HTML5.isSupported() && a.HTML5.get(i.loadOptions.varName + "_r") || a.Cookies.get(i.loadOptions.varName + "_r") ||
            "";
        return b.split(",").concat(a.split(",")).join(",").replace(/^,+/, "").replace(/,+$/, "")
    };
    b.getSegments = i.get;
    i.getKuid = function() {
        return i._kuid || k.HTML5.isSupported() && k.HTML5.get("kuid") || k.Cookies.get("kuid") || ""
    };
    b.getKuid = i.getKuid;
    i.isValidSegment = function(a) {
        function d(a, d) {
            switch (a) {
                case "user":
                    return b.userAttribute(d) || "";
                case "page":
                    return b.pageAttribute(d) || "";
                case "3rd party":
                    return "";
                default:
                    return ""
            }
        }
        if (a.or && a.or.length) {
            for (var c = false, e = 0, f = a.or.length; e < f; e++) {
                var g = d(a.or[e].type,
                    a.or[e].name);
                if (b.in_array(g, a.or[e].values.split(","))) {
                    c = true;
                    break
                }
            }
            if (!c) return false
        }
        if (a.and && a.and.length) {
            c = 0;
            for (e = a.and.length; c < e; c++) {
                f = d(a.and[c].type, a.and[c].name);
                if (!b.in_array(f, a.and[c].values.split(","))) return false
            }
        }
        return true
    };
    b.listen = function(a, b, c) {
        return g.addEventListener ? a.addEventListener(b, c, false) : g.attachEvent ? a.attachEvent("on" + b, c) : false
    };
    b.load = function(a) {
        b.literate() ? b.listen(g, "load", a) : a.call()
    };
    var G = function(a, d, c, e, f) {
        b.loadedScripts.push(a);
        b.loadScript.sequence =
            b.loadScript.sequence ? b.loadScript.sequence + 1 : 1;
        var g = "kscript_" + b.loadScript.sequence;
        if (a = I(a) || a) {
            f = {
                id: g,
                node: e,
                type: "text/" + (f || "javascript"),
                src: a
            };
            if (h.async === false && d && b.literate()) {
                j.__krux_write("<script " + b.buildAttributes(f) + "><\/script>");
                typeof c == "function" && c()
            } else {
                f.async = "true";
                b.appendTag("script", f);
                typeof c == "function" && b.loadScriptCallback(g, c, e)
            }
        }
    };
    b.loadScript = G;
    b.loadScriptCallback = function(a, d, c) {
        var e = b._(a);
        e ? e.onreadystatechange = e.onload = function() {
            var a = e.readyState;
            if (!d.done && (!a || /loaded|complete/.test(a))) {
                d(c);
                d.done = true
            }
        } : setTimeout(function() {
            b.loadScriptCallback(a, d, c)
        }, 50)
    };
    b.loadTemplateTag = function(a, d) {
        b.loadTemplateTag.td = {};
        try {
            eval("KRUX.loadTemplateTag.td=" + a)
        } catch (c) {
            b.reportError("Error with tag template. " + c.msg + "\n" + a, "email-template-tag");
            return
        }
        var e = b.loadTemplateTag.td;
        e.before && e.before(d);
        var f = /@@([^@]+)@@/g,
            g = function(a, b) {
                return d[b] ? d[b] : a
            },
            h = "",
            h = location.protocol == "https:" && e.sslHost ? h + ("//" + e.sslHost) : h + ("http://" + e.host),
            i =
            e.path.replace(f, g),
            h = h + i;
        if (e.query) {
            for (var i = b.keyValues(e.query), j = 0, k = i.keys.length; j < k; j++) e.query[i.keys[j]] = b.toS(i.values[j]).replace(f, g);
            h = h + (h.indexOf("?") > -1 ? "&" : "?");
            h = h + C(e.query)
        }
        G(h, false, e.after)
    };
    b.makeDate = function(a) {
        if (typeof a === "object" && a !== null && a.constructor == Date) return a;
        if (b.toS(a).match(/^[0-9]+$/)) return false;
        if (b.toS(a).match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/)) {
            a = b.toS(a).match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/);
            return new Date(a[1], a[2] - 1, a[3])
        }
        if (Date.parse(a)) {
            var d =
                new Date;
            d.setTime(Date.parse(a) + d.getTimezoneOffset() * 6E4);
            return d
        }
        return false
    };
    b.metaTag = function(a) {
        for (var b = j.getElementsByTagName("meta"), c = 0, e = b.length; c < e; c++)
            if (b[c].name == a) return b[c].content;
        return null
    };
    b.onload = function() {
        if (!b.onloadCalled) {
            b.onloadCalled = true;
            m.fired = "load";
            if (b.afterLoadFunctions)
                for (var a = 0; a < b.afterLoadFunctions.length; a++) b.afterLoadFunctions[a]();
            KRUX2.fireOnce("load_callbacks_finished");
            b.Storage.expunge(b.S);
            b.Storage.cleanup(b.S)
        }
    };
    b.onunload = function() {
        if (!m.fired) {
            m.fired =
                "unload";
            b.collectBeacon()
        }
    };
    b.onbeforeunload = function() {
        if (!m.fired) {
            m.fired = "beforeunload";
            b.collectBeacon()
        }
    };
    b.parseJSON = function(a) {
        return g.JSON && g.JSON.parse ? g.JSON.parse(a) : (new Function("return " + a))()
    };
    b.PM = {};
    b.PM.supported = function() {
        return g.postMessage || j.postMessage ? true : false
    };
    b.PM.listen = function(a) {
        return !b.PM.supported() ? false : b.listen(g, "message", a)
    };
    b.PM.send = function(a, d) {
        if (!b.PM.supported()) return false;
        var c = b.toS(d);
        if (a.postMessage) return a.postMessage(c, "*");
        if (a.document.postMessage) return a.document.postMessage(c,
            "*")
    };
    b.Provider = {};
    b.Provider.base = {
        id: "base",
        getUrl: function() {
            throw "getUrl not implemented for provider: " + this.id;
        },
        checkForNew: 86400,
        checkForUpdate: 259200,
        blocking: !1,
        httpMethod: "script",
        noData: "no data"
    };
    b.Provider.base.cacheKey = function() {
        return this.id + "_d"
    };
    b.Provider.base.run = function() {
        if (b.S.get(this.cacheKey()) || !this.getUrl()) return false;
        this.httpMethod == "script" ? G(this.getUrl(), this.blocking) : this.httpMethod == "image" ? F(this.getUrl()) : this.httpMethod == "iframe" && b.appendTag("iframe", {
            width: 0,
            height: 0,
            src: this.getUrl()
        });
        return true
    };
    b.Provider.base.callback = function(a) {
        var d;
        if (a) {
            a = C(a);
            d = this.checkForUpdate
        } else {
            a = this.noData;
            d = this.checkForNew
        }
        b.S.set(this.cacheKey(), a, d)
    };
    b.Provider.base.getData = function() {
        var a = b.S.get(this.cacheKey());
        return a == this.noData ? null : b.parseQueryString(a)
    };
    b.Provider.serviceUrl = function(a, b) {
        return E + "data." + (b || "gif") + "?_kdpid=" + a
    };
    b.readyFunctions = [];
    b.ready = function(a) {
        b.readyHasRun ? a() : b.readyFunctions.push(a)
    };
    b.readyRun = function() {
        if (!b.readyHasRun) {
            b.readyHasRun =
                true;
            for (var a = 0; a < b.readyFunctions.length; a++) b.readyFunctions[a](g, [])
        }
    };
    b.doScrollHack = function() {
        if (!b.readyHasRun) {
            try {
                j.documentElement.doScroll("left")
            } catch (a) {
                setTimeout(b.doScrollHack, 1);
                return
            }
            b.readyRun()
        }
    };
    b.readyBind = function() {
        if (j.readyState == "complete") setTimeout(b.readyRun, 1);
        else if (j.addEventListener) {
            b.DOMContentLoaded = function() {
                j.removeEventListener("DOMContentLoaded", b.DOMContentLoaded, false);
                b.readyRun()
            };
            b.listen(j, "DOMContentLoaded", b.DOMContentLoaded);
            b.listen(g, "load",
                b.readyRun)
        } else if (j.attachEvent) {
            b.DOMContentLoaded = function() {
                if (j.readyState == "complete") {
                    j.detachEvent("onreadystatechange", b.DOMContentLoaded);
                    b.readyRun()
                }
            };
            b.listen(j, "readystatechange", b.DOMContentLoaded);
            g.attachEvent("onload", b.readyRun);
            var a = false;
            try {
                a = !g.frameElement
            } catch (d) {}
            j.documentElement.doScroll && a && b.doScrollHack()
        }
    };
    b.readyBind();
    b.ready(b.fireReady);
    var B = {},
        r = function(a, d, c) {
            d = d || 1;
            c = c || "c";
            if (!(c == "ms" && d > 3E4)) B[a] ? B[a].type == "c" ? B[a].value = B[a].value + 1 : b.reportError("Trying to increment a time value - " +
                a) : B[a] = {
                type: c,
                value: d
            }
        },
        O = function() {
            if (g.KRUXTest) b.recorderEvents = B;
            else if (Math.random() > 0.05) return;
            var a = [],
                d;
            for (d in B) B.hasOwnProperty(d) && a.push("controltag." + d + ":" + B[d].value + "|" + B[d].type);
            b.backgroundGet(b.eventsUrl + "?q=" + a.join(","))
        };
    b.removeKeys = function(a, d) {
        for (var c = b.clone(a), e = b.keyValues(c), f = 0, g = d.length; f < g; f++)
            if (typeof d[f] == "string") delete c[d[f]];
            else
                for (var h = 0, i = e.keys.length; h < i; h++) "test" in d[f] && d[f].test(e.keys[h]) && delete c[e.keys[h]];
        return c
    };
    b.reportError = function(a) {
        if (window.KRUXTest) throw "reportError:" +
            a;
        r("jserror");
        if (n.browser) {
            r("jserror." + n.browser);
            r("jserror." + n.browser + "." + n.version)
        }
    };
    "function" != typeof window.onerror && (window.onerror = function(a, d, c) {
        b.reportError("Error on line #" + c + " of " + d + ": " + a, "onerror");
        return false
    });
    b.timeStamp = function(a) {
        a = a || (new Date).getTime();
        return Math.round(a / 1E3).toString(36)
    };
    var s = null,
        l = {
            configUrl: "//cdn.krxd.net/config/",
            chains: {},
            executedTags: []
        };
    b.ST = l;
    b.SuperTag = b.ST;
    b.ST.loadGeo = function(a) {
        var d = b.ST;
        if (b.S.name == "HTML5") {
            var c = b.S.get("kgeo");
            if (c) {
                b.ST.geoFromCache = true;
                try {
                    b.geo = b.parseJSON(c)
                } catch (e) {
                    b.S.del("kgeo")
                }
                x.fireOnce("geo_loaded");
                return
            }
        }
        c = h.geoUrl || b.geoUrl;
        b.ST.loadGeo.startTime = (new Date).getTime();
        r("geo_requests");
        if (N()) b.loadScript(c, !a, d.loadGeoSave);
        else {
            b.S.name == "HTML5" && g.JSON && b.loadScript(c, false, d.loadGeoSave);
            x.fireOnce("geo_loaded")
        }
    };
    b.ST.loadGeoSave = function() {
        b.S.name == "HTML5" && g.JSON && k.HTML5.set("kgeo", g.JSON.stringify(b.geo), 86400);
        r("geo_request_time", (new Date).getTime() - b.ST.loadGeo.startTime, "ms");
        x.fire("geo_loaded")
    };
    l.callTag = function(a, d) {
        if (!d) {
            l.sequence = l.sequence ? l.sequence + 1 : 1;
            d = "krux_tag_" + a + "_" + l.sequence
        }
        if (!s) return false;
        var c = l.gimmeTag(a);
        c.html_id = d;
        if (c === false) {
            b.reportError("No available tags for this format: " + a + ". If the format is valid, check to make sure you have a non-frequency capped tag at the bottom of the chain.", "email-config");
            return false
        }
        return l.writeTag(c)
    };
    l.callAd = l.callTag;
    l.deliverPixels = function() {
        b.pixelsDelivered = 0;
        if (!s) return false;
        for (var a = s.tags || [], d = (new Date).getTime(), c = 0, e = 0; e < a.length; e++) {
            c = c + ((new Date).getTime() - d);
            if (c > h.pixelTime) {
                x.fireOnce("pixels_delivered");
                return b.pixelsDelivered
            }
            var f = a[e];
            if (f.format == "0x0" && l.isValidRules(f) && !f.started) {
                l.writeTag(f);
                b.pixelsDelivered++
            }
        }
        x.fireOnce("pixels_delivered");
        return b.pixelsDelivered
    };
    l.invisibleTags = function() {};
    l.getCountry = function() {
        return b.getRequestVal("krux_country") ? b.getRequestVal("krux_country") : h.forcedCountry ? h.forcedCountry : b.geo && b.geo.country || "Unknown"
    };
    b.getCountry =
        l.getCountry;
    l.gimmeTag = function(a) {
        for (var d = b.getRequestVal("krux_tagid"), c = 0; c < s.tags.length; c++) {
            var e = s.tags[c];
            if (d && e.format == a && e.id == d || e.format == a && l.isValidRules(e)) return e
        }
        return false
    };
    l.init = function() {
        var a = h.superTag;
        if (a.enabled !== void 0 && !b.bool(a.enabled)) return false;
        M(h.async);
        b.ST.loadGeo(h.async);
        typeof h.initialize === "function" ? h.initialize() : h.initialize && x.each(h.initialize, function(a) {
            a()
        });
        x.waitForAll("config_loaded geo_loaded", function() {
            l.deliverPixels()
        });
        h.autoCollect ===
            true && KRUX2.waitForAll("load_callbacks_finished pixels_delivered", function() {
                b.getCollectors(j);
                b.collectBeacon()
            });
        r("views");
        if (n.browser) {
            r("views." + n.browser);
            r("views." + n.browser + "." + n.version)
        }
        return true
    };
    l.isValidCriteria = function(a, d, c) {
        try {
            c.constructor == Array && (c = c.toString())
        } catch (e) {}
        var f = b.toS(c).split(/, */);
        if (b.toS(d).match(/[<>]/))
            if (!isNaN(parseInt(a, 10)) && !isNaN(parseInt(c, 10))) {
                a = parseInt(a, 10);
                c = parseInt(c, 10)
            } else {
                if (typeof a != "string" || typeof c != "string") return null
            }
        else if (b.in_array(d, ["before", "after"])) {
            a = b.makeDate(a);
            c = b.makeDate(c);
            if (!a || !c) return null
        }
        switch (d) {
            case "=":
                return b.in_array(a, f, true);
            case "!=":
                return !b.in_array(a, f, true);
            case ">":
                return a > c;
            case "<":
                return a < c;
            case ">=":
                return a >= c;
            case "<=":
                return a <= c;
            case "before":
                return a.getTime() < c.getTime();
            case "after":
                return a.getTime() > c.getTime();
            case "matches":
                var g;
                try {
                    g = b.toS(c).indexOf("/") === 0 ? eval(c) : RegExp(c);
                    return g.test(a)
                } catch (h) {
                    return false
                }
            case "contains":
                a = b.toS(a);
                for (d = 0; d < f.length; d++)
                    if (a.indexOf(f[d]) >
                        -1) return true;
                return false;
            default:
                b.d("Unrecognized operator: " + d, -1);
                return null
        }
    };
    l.isValidRules = function(a) {
        for (var d = l.isValidCriteria, c = a.rules ? a.rules.length : 0, e = 0; e < c; e++) {
            var f = a.rules[e];
            f.pass = true;
            switch (f.name) {
                case "country":
                    if (d(f.actual = l.getCountry(), f.operator, f.value)) break;
                    else {
                        a.rejected = "country";
                        return f.pass = false
                    }
                case "site":
                    if (d(f.actual = h.site, f.operator, f.value)) break;
                    else {
                        a.rejected = "site";
                        return f.pass = false
                    }
                case "section":
                    if (d(f.actual = h.section, f.operator, f.value)) break;
                    else {
                        a.rejected = "section";
                        return f.pass = false
                    }
                case "sub_section":
                    if (d(f.actual = h.subSection, f.operator, f.value)) break;
                    else {
                        a.rejected = "sub_section";
                        return f.pass = false
                    }
                case "segment":
                    b.loadSegments();
                    var g = b.getSegments().split(","),
                        i = false,
                        j = b.getRequestVal("krux_segment");
                    j && g.push(j);
                    f.actual = g.join(",");
                    for (var j = b.toS(f.value).split(","), k = 0; k < j.length; k++)
                        for (var m = 0; m < g.length; m++)
                            if (j[k] == g[m]) {
                                i = true;
                                break
                            }
                    if (!i) {
                        a.rejected = "segment";
                        return f.pass = false
                    }
                    break;
                case "url":
                    if (d(f.actual = location.href,
                            f.operator, f.value)) break;
                    else {
                        a.rejected = "url";
                        return f.pass = false
                    }
                default:
                    if (f.name.match(/^userAttributes/)) {
                        g = f.name.replace(/^userAttributes[0-9]+\./, "");
                        if (!d(f.actual = h.userAttributes[g], f.operator, f.value)) {
                            a.rejected = "userAttributes";
                            return f.pass = false
                        }
                    } else if (f.name.match(/^pageAttributes/)) {
                        g = f.name.replace(/^pageAttributes[0-9]+\./, "");
                        if (!d(f.actual = h.pageAttributes[g], f.operator, f.value)) {
                            a.rejected = "pageAttributes";
                            return f.pass = false
                        }
                    } else {
                        b.reportError("Unrecognized rule - " + f.name,
                            "email-javascript");
                        return f.pass = false
                    }
            }
        }
        if (a.user_percent && Math.random() * 100 > a.user_percent) {
            a.rejected = "user %";
            return false
        }
        d = b.YYYYMMDD();
        if (a.start_date && a.start_date >= d) {
            a.rejected = "start date";
            return false
        }
        if (a.end_date && a.end_date < d) {
            a.rejected = "end date";
            return false
        }
        if (a.freq_cap) {
            d = b.S.get("l" + a.id);
            if (parseInt(d, 10) >= parseInt(a.freq_cap, 10)) {
                a.rejected = "freq cap";
                return false
            }
        }
        return true
    };
    l.makeHtmlDeferred = function(a) {
        var d = [];
        new b.HTMLParser(void 0, a, {
            start: function(a, e, f) {
                var g = {},
                    h = a.toLowerCase();
                d.push("<" + a);
                for (var a = 0, i = e.length; a < i; a++) h == "script" && e[a].name == "src" ? g.krux_deferred_src = e[a].value : g[e[a].name] = e[a].value;
                if (h == "script") {
                    g.type = "text/krux_delayed_script";
                    i = 1
                }
                i > 0 ? d.push(" " + b.buildAttributes(g) + (f ? "/>" : ">")) : d.push(f ? "/>" : ">")
            },
            end: function(a) {
                d.push("</" + a + ">")
            },
            chars: function(a) {
                d.push(a)
            }
        });
        return d.join("")
    };
    l.recordAttempt = function(a) {
        a.started = (new Date).getTime();
        l.executedTags.push(a);
        a.freq_cap && b.S.inc("l" + a.id, 86400)
    };
    l.writeTag = function(a) {
        if (!a.html_id) {
            l.sequence =
                l.sequence ? l.sequence + 1 : 1;
            a.html_id = "krux_tag_" + a.format + "_" + l.sequence
        }
        if (!b.in_array(a.timing, ["asap", "ready", "onload"])) a.timing = "asap";
        if (a.template_definition) {
            var d = function() {
                l.recordAttempt(a);
                b.loadTemplateTag(a.template_definition, a.params || {})
            };
            a.timing == "onload" ? b.afterLoadCallback(d) : a.timing == "ready" ? b.ready(d) : d()
        } else a.method == "iframe" ? l.writeTagIframe(a) : l.writeTagScript(a, a.timing == "onload");
        return a.html_id
    };
    l.writeTagIframe = function(a) {
        var d = a.format.split("x"),
            c = function() {
                l.recordAttempt(a);
                b.iframeContents(a.html_id, a.html)
            };
        if (b.literate()) {
            j.__krux_write("<iframe " + b.buildAttributes({
                width: d[0],
                height: d[1],
                scrolling: "no",
                frameborder: 0,
                marginheight: 0,
                marginwidth: 0,
                style: a.format == "0x0" ? "display:none;" : "",
                id: a.html_id
            }) + "></iframe>");
            a.timing == "onload" ? b.afterLoadCallback(c) : a.timing == "ready" ? b.ready(c) : c()
        } else if (!b.literate() && a.format == "0x0") {
            b.appendTag("iframe", {
                id: a.html_id,
                width: 0,
                height: 0
            }).style.display = "none";
            c()
        }
    };
    l.writeTagScript = function(a, d) {
        l.recordAttempt(a);
        if (b.literate())
            if (d ||
                y.blocklist.length > 0 || (b.is.msie || b.is.opera) && a.html.match(/(__bkframe|google-analytics.com|widgets\.twimg)/)) {
                j.__krux_write('<div id="' + a.html_id + '">' + l.makeHtmlDeferred(a.html) + "</div>");
                p.setup();
                l.loadDeferred()
            } else j.__krux_write_real('<div id="' + a.html_id + '">' + a.html + "</div>");
        else if (a.format == "0x0") {
            a.timing = "onload";
            a.forced_delayed_load = true;
            var c = b.appendTag("div", {
                id: a.html_id
            });
            c.style.display = "none";
            c.innerHTML = l.makeHtmlDeferred(a.html);
            l.loadDeferred()
        }
    };
    l.loadDeferred = function() {
        for (var a =
                j.getElementsByTagName("script"), d = 0, c = a.length; d < c; d++) {
            var e = a[d];
            if (e.getAttribute && e.getAttribute("type") == "text/krux_delayed_script") {
                var f = e.cloneNode(true);
                f.removeAttribute("krux_deferred_src");
                f.removeAttribute("language");
                f.setAttribute("type", "text/javascript");
                p.node = f;
                q.length = 0;
                q.push(0);
                if (e.text && !e.getAttribute("krux_deferred_src")) {
                    e.setAttribute("type", "text/javascript");
                    eval(e.text)
                } else {
                    f.timer = setTimeout(function(a) {
                            return function() {
                                if (!a.done) {
                                    a.done = true;
                                    l.loadDeferred()
                                }
                            }
                        }(f),
                        b.scriptTimeout || 2E4);
                    f.onreadystatechange = f.onload = function() {
                        var a = f.readyState;
                        if (!f.done && (!a || /loaded|complete/.test(a))) {
                            clearTimeout(f.timer);
                            f.done = true;
                            l.loadDeferred()
                        }
                    };
                    e.getAttribute("krux_deferred_src") && f.setAttribute("src", e.attributes.krux_deferred_src.value);
                    e.parentNode.replaceChild(f, e);
                    break
                }
            }
        }
    };
    b.Storage = {
        availableEngines: [],
        getEngine: function() {
            for (var a = 0; a < b.Storage.availableEngines.length; a++)
                if (b.Storage.availableEngines[a].isSupported()) return b.Storage.availableEngines[a];
            return false
        },
        expunge: function(a) {
            for (var b = a.keyList(), c = 0; c < b.length; c++) a.get(b[c]) === null && a.del(b[c])
        },
        cleanup: function(a) {
            for (var b = a.keyList(), c = 0; c < b.length; c++) {
                var e = a.get(b[c]).match(/\|~([0-9]+)$/);
                if (e) {
                    var f = a.get(b[c]).replace(/\|~([0-9]+)$/, "");
                    a.del(b[c]);
                    e = (e[1] - (new Date).getTime()) / 1E3;
                    a.set(b[c], f, e)
                }
            }
        }
    };
    var k = b.Storage;
    k.HTML5 = {
        name: "HTML5",
        isSupported: function() {
            return g.localStorage ? true : false
        },
        get: function(a) {
            var d = g.localStorage.getItem(a + "__exp");
            return d && d < b.timeStamp() ?
                null : g.localStorage.getItem(a)
        },
        set: function(a, d, c) {
            try {
                g.localStorage.setItem(a, b.toS(d));
                c && g.localStorage.setItem(a + "__exp", b.timeStamp((new Date).getTime() + c * 1E3))
            } catch (e) {}
        },
        del: function(a) {
            g.localStorage.removeItem(a + "__exp");
            return g.localStorage.removeItem(a)
        },
        inc: function(a, b) {
            var c = k.HTML5.get(a) || 0;
            c++;
            k.HTML5.set(a, c, b);
            return c
        },
        count: function() {
            return k.HTML5.keyList().length
        },
        clear: function() {
            return g.localStorage.clear()
        },
        keyList: function() {
            for (var a = [], b = g.localStorage, c = 0; c < b.length; c++) b.key(c).match(/__exp$/) ||
                a.push(b.key(c));
            return a
        }
    };
    k.availableEngines.push(k.HTML5);
    k.Cookies = {
        name: "Cookies",
        cookieName: "KRUXS",
        cookieExpires: 2592E3,
        isSupported: function() {
            return navigator.cookieEnabled ? true : false
        },
        get: function(a) {
            var d = k.Cookies._getData();
            if (a in d) {
                var c = d[a + "__exp"];
                return c && c < b.timeStamp() ? null : d[a]
            }
            return null
        },
        set: function(a, d, c) {
            var e = k.Cookies._getData();
            e[a] = b.toS(d);
            c && (e[a + "__exp"] = b.timeStamp((new Date).getTime() + c * 1E3));
            b.cookie(k.Cookies.cookieName, C(e))
        },
        del: function(a) {
            var d = k.Cookies._getData(),
                a = b.removeKeys(d, [a, a + "__exp"]);
            b.cookie(k.Cookies.cookieName, C(a))
        },
        inc: function(a, b) {
            var c = k.Cookies.get(a) || 0;
            c++;
            return k.Cookies.set(a, c, b)
        },
        count: function() {
            return b.keyValues(k.Cookies.keyList()).keys.length
        },
        clear: function() {
            b.cookie(k.Cookies.cookieName, null)
        },
        keyList: function() {
            return b.keyValues(b.removeKeys(k.Cookies._getData(), [/__exp$/])).keys
        },
        _getData: function() {
            var a = b.cookie(k.Cookies.cookieName);
            return a === null ? {} : b.parseQueryString(a)
        }
    };
    k.availableEngines.push(k.Cookies);
    k.Dummy = {
        name: "Dummy",
        store: {},
        isSupported: function() {
            return true
        },
        set: function(a, d, c) {
            k.Dummy.store[a] = b.toS(d);
            c && (k.Dummy.store[a + "__exp"] = b.timeStamp((new Date).getTime() + c * 1E3))
        },
        get: function(a) {
            if (k.Dummy.store[a] !== void 0) {
                var d = k.Dummy.store[a + "__exp"];
                return d && d < b.timeStamp() ? null : k.Dummy.store[a]
            }
            return null
        },
        del: function(a) {
            k.Dummy.store = b.removeKeys(k.Dummy.store, [a, a + "__exp"])
        },
        inc: function(a, b) {
            var c = k.Dummy.get(a) || 0;
            c++;
            k.Dummy.set(a, c, b)
        },
        count: function() {
            return b.keyValues(k.Dummy.keyList()).keys.length
        },
        clear: function() {
            k.Dummy.store = {}
        },
        keyList: function() {
            var a = [],
                d;
            for (d in b.removeKeys(k.Dummy.store, [/__exp$/])) a.push(d);
            return a
        }
    };
    k.availableEngines.push(k.Dummy);
    b.S = k.getEngine();
    b.tagSrcWithMatchingDomain = function(a, b) {
        for (var c = j.getElementsByTagName(b), e, f = 0, g = c.length; f < g; f++)
            if (e = I(c[f])) {
                var h = e.match(/^http:\/\/([^\/]+)/);
                if (h && (typeof a != "string" && a.test(h[1]) || typeof a == "string" && h[1].indexOf(a) > -1)) return e
            }
        return null
    };
    b.toS = function(a) {
        return typeof a === "string" ? a : a === null ? "null" :
            a === void 0 ? "undefined" : typeof a == "object" ? "[object Object]" : "" + a
    };
    b.urlForDomain = function(a) {
        if (b.isInAdIframe()) return a.referrer;
        for (var d = a.getElementsByTagName("base"), c = 0, e = d.length; c < e; c++)
            if (d[c].href) return d[c].href;
        return a.URL
    };
    b.YYYYMMDD = function(a) {
        var b = function(a) {
            return a.toString().length == 1 ? "0" + a : a
        };
        a || (a = new Date);
        return a.getFullYear() + "-" + b(a.getMonth() + 1) + "-" + b(a.getDate())
    };
    g.KRUX = b;
    g.KRUXHTTP = b
}(window.KRUXSetup, window, document);
window.KRUX && function(h, g, j) {
    h.debugLevel = h.getRequestVal("krux_debug", 0);
    var z = h.getRequestVal;
    g.pubid = z("krux_pubid", g.pubid);
    g.site = z("krux_site", g.site);
    g.section = z("krux_section", g.section);
    g.subSection = z("krux_subSection", g.subSection);
    g.channels = z("krux_channels", g.channels);
    g.autoCollect = h.bool(z("krux_autoCollect", g.autoCollect));
    g.autoInit = h.bool(z("krux_autoInit", g.autoInit));
    g.superTag = g.superTag || {};
    j.jQuery && jQuery.gatling && (g.async = !0);
    z("krux_block") && j.addToBlocklist(z("krux_block"));
    z("krux_twinkie") && h.S.clear();
    g.pubid && (!0 === h.bool(g.autoInit) && (h.init(), h.ST.init()), h.bool(g.loadSegments) && h.loadSegments());
    h.listen(j, "beforeunload", h.onbeforeunload);
    h.listen(j, "unload", h.onunload);
    h.load(h.onload)
}(window.KRUX, window.KRUXSetup, window);