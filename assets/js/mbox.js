var mboxCopyright = "Copyright 1996-2010. Adobe Systems Incorporated. All rights reserved";
mboxUrlBuilder = function(B, A) {
    this.a = B;
    this.b = A;
    this.c = new Array();
    this.d = function(C) {
        return C
    };
    this.f = null
};
mboxUrlBuilder.prototype.addParameter = function(F, E) {
    var D = new RegExp("('|\")");
    if (D.exec(F)) {
        throw "Parameter '" + F + "' contains invalid characters"
    }
    for (var C = 0; C < this.c.length; C++) {
        var B = this.c[C];
        if (B.name == F) {
            B.value = E;
            return this
        }
    }
    var A = new Object();
    A.name = F;
    A.value = E;
    this.c[this.c.length] = A;
    return this
};
mboxUrlBuilder.prototype.addParameters = function(C) {
    if (!C) {
        return this
    }
    for (var B = 0; B < C.length; B++) {
        var A = C[B].indexOf("=");
        if (A == -1 || A == 0) {
            continue
        }
        this.addParameter(C[B].substring(0, A), C[B].substring(A + 1, C[B].length))
    }
    return this
};
mboxUrlBuilder.prototype.setServerType = function(A) {
    this.o = A
};
mboxUrlBuilder.prototype.setBasePath = function(A) {
    this.f = A
};
mboxUrlBuilder.prototype.setUrlProcessAction = function(A) {
    this.d = A
};
mboxUrlBuilder.prototype.buildUrl = function() {
    var E = this.f ? this.f : "/m2/" + this.b + "/mbox/" + this.o;
    var D = document.location.protocol == "file:" ? "http:" : document.location.protocol;
    var F = D + "//" + this.a + E;
    var C = F.indexOf("?") != -1 ? "&" : "?";
    for (var B = 0; B < this.c.length; B++) {
        var A = this.c[B];
        F += C + encodeURIComponent(A.name) + "=" + encodeURIComponent(A.value);
        C = "&"
    }
    return this.t(this.d(F))
};
mboxUrlBuilder.prototype.getParameters = function() {
    return this.c
};
mboxUrlBuilder.prototype.setParameters = function(A) {
    this.c = A
};
mboxUrlBuilder.prototype.clone = function() {
    var B = new mboxUrlBuilder(this.a, this.b);
    B.setServerType(this.o);
    B.setBasePath(this.f);
    B.setUrlProcessAction(this.d);
    for (var A = 0; A < this.c.length; A++) {
        B.addParameter(this.c[A].name, this.c[A].value)
    }
    return B
};
mboxUrlBuilder.prototype.t = function(A) {
    return A.replace(/\"/g, "&quot;").replace(/>/g, "&gt;")
};
mboxStandardFetcher = function() {};
mboxStandardFetcher.prototype.getType = function() {
    return "standard"
};
mboxStandardFetcher.prototype.fetch = function(A) {
    A.setServerType(this.getType());
    document.write('<script src="' + A.buildUrl() + '" type="text/javascript"><\/script>')
};
mboxStandardFetcher.prototype.cancel = function() {};
mboxAjaxFetcher = function() {};
mboxAjaxFetcher.prototype.getType = function() {
    return "ajax"
};
mboxAjaxFetcher.prototype.fetch = function(A) {
    A.setServerType(this.getType());
    var B = A.buildUrl();
    this.x = document.createElement("script");
    this.x.src = B;
    document.body.appendChild(this.x)
};
mboxAjaxFetcher.prototype.cancel = function() {};
mboxMap = function() {
    this.y = new Object();
    this.z = new Array()
};
mboxMap.prototype.put = function(B, C) {
    if (!this.y[B]) {
        this.z[this.z.length] = B
    }
    this.y[B] = C
};
mboxMap.prototype.get = function(B) {
    return this.y[B]
};
mboxMap.prototype.remove = function(B) {
    this.y[B] = undefined
};
mboxMap.prototype.each = function(F) {
    for (var D = 0; D < this.z.length; D++) {
        var C = this.z[D];
        var E = this.y[C];
        if (E) {
            var G = F(C, E);
            if (G === false) {
                break
            }
        }
    }
};
mboxFactory = function(F, A, E) {
    this.E = false;
    this.C = F;
    this.D = E;
    this.F = new mboxList();
    mboxFactories.put(E, this);
    this.G = typeof document.createElement("div").replaceChild != "undefined" && (function() {
        return true
    })() && typeof document.getElementById != "undefined" && typeof(window.attachEvent || document.addEventListener || window.addEventListener) != "undefined" && typeof encodeURIComponent != "undefined";
    this.H = this.G && mboxGetPageParameter("mboxDisable") == null;
    var B = E == "default";
    this.J = new mboxCookieManager("mbox" + (B ? "" : ("-" + E)), (function() {
        return mboxCookiePageDomain()
    })());
    this.H = this.H && this.J.isEnabled() && (this.J.getCookie("disable") == null);
    if (this.isAdmin()) {
        this.enable()
    }
    this.K();
    this.L = mboxGenerateId();
    this.M = mboxScreenHeight();
    this.N = mboxScreenWidth();
    this.O = mboxBrowserWidth();
    this.P = mboxBrowserHeight();
    this.Q = mboxScreenColorDepth();
    this.R = mboxBrowserTimeOffset();
    this.S = new mboxSession(this.L, "mboxSession", "session", 31 * 60, this.J);
    this.T = new mboxPC("PC", 1209600, this.J);
    this.w = new mboxUrlBuilder(F, A);
    this.U(this.w, B);
    this.V = new Date().getTime();
    this.W = this.V;
    var G = this;
    this.addOnLoad(function() {
        G.W = new Date().getTime()
    });
    if (this.G) {
        this.addOnLoad(function() {
            G.E = true;
            G.getMboxes().each(function(C) {
                C.setFetcher(new mboxAjaxFetcher());
                C.finalize()
            })
        });
        this.limitTraffic(100, 10368000);
        if (this.H) {
            this.Z();
            this._ = new mboxSignaler(function(C, D) {
                return G.create(C, D)
            }, this.J)
        }
    }
};
mboxFactory.prototype.isEnabled = function() {
    return this.H
};
mboxFactory.prototype.getDisableReason = function() {
    return this.J.getCookie("disable")
};
mboxFactory.prototype.isSupported = function() {
    return this.G
};
mboxFactory.prototype.disable = function(B, A) {
    if (typeof B == "undefined") {
        B = 60 * 60
    }
    if (typeof A == "undefined") {
        A = "unspecified"
    }
    if (!this.isAdmin()) {
        this.H = false;
        this.J.setCookie("disable", A, B)
    }
};
mboxFactory.prototype.enable = function() {
    this.H = true;
    this.J.deleteCookie("disable")
};
mboxFactory.prototype.isAdmin = function() {
    return document.location.href.indexOf("mboxEnv") != -1
};
mboxFactory.prototype.limitTraffic = function(A, B) {};
mboxFactory.prototype.addOnLoad = function(A) {
    if (this.isDomLoaded()) {
        A()
    } else {
        var B = false;
        var C = function() {
            if (B) {
                return
            }
            B = true;
            A()
        };
        this.hb.push(C);
        if (this.isDomLoaded() && !B) {
            C()
        }
    }
};
mboxFactory.prototype.getEllapsedTime = function() {
    return this.W - this.V
};
mboxFactory.prototype.getEllapsedTimeUntil = function(A) {
    return A - this.V
};
mboxFactory.prototype.getMboxes = function() {
    return this.F
};
mboxFactory.prototype.get = function(B, A) {
    return this.F.get(B).getById(A || 0)
};
mboxFactory.prototype.update = function(A, C) {
    if (!this.isEnabled()) {
        return
    }
    if (!this.isDomLoaded()) {
        var B = this;
        this.addOnLoad(function() {
            B.update(A, C)
        });
        return
    }
    if (this.F.get(A).length() == 0) {
        throw "Mbox " + A + " is not defined"
    }
    this.F.get(A).each(function(D) {
        D.getUrlBuilder().addParameter("mboxPage", mboxGenerateId());
        D.load(C)
    })
};
mboxFactory.prototype.create = function(L, H, F) {
    if (!this.isSupported()) {
        return null
    }
    var G = this.w.clone();
    G.addParameter("mboxCount", this.F.length() + 1);
    G.addParameters(H);
    var K = this.F.get(L).length();
    var C = this.D + "-" + L + "-" + K;
    var J;
    if (F) {
        J = new mboxLocatorNode(F)
    } else {
        if (this.E) {
            throw "The page has already been loaded, can't write marker"
        }
        J = new mboxLocatorDefault(C)
    }
    try {
        var B = this;
        var E = "mboxImported-" + C;
        var A = new mbox(L, K, G, J, E);
        if (this.H) {
            A.setFetcher(this.E ? new mboxAjaxFetcher() : new mboxStandardFetcher())
        }
        A.setOnError(function(M, N) {
            A.setMessage(M);
            A.activate();
            if (!A.isActivated()) {
                B.disable(60 * 60, M);
                window.location.reload(false)
            }
        });
        this.F.add(A)
    } catch (I) {
        this.disable();
        throw 'Failed creating mbox "' + L + '", the error was: ' + I
    }
    var D = new Date();
    G.addParameter("mboxTime", D.getTime() - (D.getTimezoneOffset() * 60000));
    return A
};
mboxFactory.prototype.getCookieManager = function() {
    return this.J
};
mboxFactory.prototype.getPageId = function() {
    return this.L
};
mboxFactory.prototype.getPCId = function() {
    return this.T
};
mboxFactory.prototype.getSessionId = function() {
    return this.S
};
mboxFactory.prototype.getSignaler = function() {
    return this._
};
mboxFactory.prototype.getUrlBuilder = function() {
    return this.w
};
mboxFactory.prototype.U = function(B, A) {
    B.addParameter("mboxHost", document.location.hostname).addParameter("mboxSession", this.S.getId());
    if (!A) {
        B.addParameter("mboxFactoryId", this.D)
    }
    if (this.T.getId() != null) {
        B.addParameter("mboxPC", this.T.getId())
    }
    B.addParameter("mboxPage", this.L);
    B.addParameter("screenHeight", this.M);
    B.addParameter("screenWidth", this.N);
    B.addParameter("browserWidth", this.O);
    B.addParameter("browserHeight", this.P);
    B.addParameter("browserTimeOffset", this.R);
    B.addParameter("colorDepth", this.Q);
    B.setUrlProcessAction(function(D) {
        D += "&mboxURL=" + encodeURIComponent(document.location);
        var C = encodeURIComponent(document.referrer);
        if (D.length + C.length < 2000) {
            D += "&mboxReferrer=" + C
        }
        D += "&mboxVersion=" + mboxVersion;
        return D
    })
};
mboxFactory.prototype.sb = function() {
    return ""
};
mboxFactory.prototype.Z = function() {
    document.write("<style>.mboxDefault { visibility:hidden; }</style>")
};
mboxFactory.prototype.isDomLoaded = function() {
    return this.E
};
mboxFactory.prototype.K = function() {
    if (this.hb != null) {
        return
    }
    this.hb = new Array();
    var A = this;
    (function() {
        var B = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange";
        var C = false;
        var D = function() {
            if (C) {
                return
            }
            C = true;
            for (var F = 0; F < A.hb.length;
                ++F) {
                A.hb[F]()
            }
        };
        if (document.addEventListener) {
            document.addEventListener(B, function() {
                document.removeEventListener(B, arguments.callee, false);
                D()
            }, false);
            window.addEventListener("load", function() {
                document.removeEventListener("load", arguments.callee, false);
                D()
            }, false)
        } else {
            if (document.attachEvent) {
                if (self !== self.top) {
                    document.attachEvent(B, function() {
                        if (document.readyState === "complete") {
                            document.detachEvent(B, arguments.callee);
                            D()
                        }
                    })
                } else {
                    var E = function() {
                        try {
                            document.documentElement.doScroll("left");
                            D()
                        } catch (F) {
                            setTimeout(E, 13)
                        }
                    };
                    E()
                }
            }
        }
        if (document.readyState === "complete") {
            D()
        }
    })()
};
mboxSignaler = function(B, D) {
    this.J = D;
    var C = D.getCookieNames("signal-");
    for (var E = 0; E < C.length; E++) {
        var G = C[E];
        var A = D.getCookie(G).split("&");
        var F = B(A[0], A);
        F.load();
        D.deleteCookie(G)
    }
};
mboxSignaler.prototype.signal = function(A, B) {
    this.J.setCookie("signal-" + A, mboxShiftArray(arguments).join("&"), 45 * 60)
};
mboxList = function() {
    this.F = new Array()
};
mboxList.prototype.add = function(A) {
    if (A != null) {
        this.F[this.F.length] = A
    }
};
mboxList.prototype.get = function(C) {
    var E = new mboxList();
    for (var A = 0; A < this.F.length; A++) {
        var D = this.F[A];
        if (D.getName() == C) {
            E.add(D)
        }
    }
    return E
};
mboxList.prototype.getById = function(A) {
    return this.F[A]
};
mboxList.prototype.length = function() {
    return this.F.length
};
mboxList.prototype.each = function(B) {
    if (typeof B != "function") {
        throw "Action must be a function, was: " + typeof(B)
    }
    for (var A = 0; A < this.F.length; A++) {
        B(this.F[A])
    }
};
mboxLocatorDefault = function(A) {
    this.g = "mboxMarker-" + A;
    document.write('<div id="' + this.g + '" style="visibility:hidden;display:none">&nbsp;</div>')
};
mboxLocatorDefault.prototype.locate = function() {
    var A = document.getElementById(this.g);
    while (A != null) {
        if (A.nodeType == 1) {
            if (A.className == "mboxDefault") {
                return A
            }
        }
        A = A.previousSibling
    }
    return null
};
mboxLocatorDefault.prototype.force = function() {
    var A = document.createElement("div");
    A.className = "mboxDefault";
    var B = document.getElementById(this.g);
    B.parentNode.insertBefore(A, B);
    return A
};
mboxLocatorNode = function(A) {
    this.Eb = A
};
mboxLocatorNode.prototype.locate = function() {
    return typeof this.Eb == "string" ? document.getElementById(this.Eb) : this.Eb
};
mboxLocatorNode.prototype.force = function() {
    return null
};
mboxCreate = function(A) {
    var B = mboxFactoryDefault.create(A, mboxShiftArray(arguments));
    if (B) {
        B.load()
    }
    return B
};
mboxDefine = function(A, B) {
    var C = mboxFactoryDefault.create(B, mboxShiftArray(mboxShiftArray(arguments)), A);
    return C
};
mboxUpdate = function(A) {
    mboxFactoryDefault.update(A, mboxShiftArray(arguments))
};
mbox = function(E, C, B, D, A) {
    this.Kb = null;
    this.Lb = 0;
    this.mb = D;
    this.nb = A;
    this.Mb = null;
    this.Nb = new mboxOfferContent();
    this.Fb = null;
    this.w = B;
    this.message = "";
    this.Ob = new Object();
    this.Pb = 0;
    this.Ib = C;
    this.g = E;
    this.Qb();
    B.addParameter("mbox", E).addParameter("mboxId", C);
    this.Rb = function() {};
    this.Sb = function() {};
    this.Tb = null
};
mbox.prototype.getId = function() {
    return this.Ib
};
mbox.prototype.Qb = function() {
    if (this.g.length > 250) {
        throw "Mbox Name " + this.g + " exceeds max length of 250 characters."
    } else {
        if (this.g.match(/^\s+|\s+$/g)) {
            throw "Mbox Name " + this.g + " has leading/trailing whitespace(s)."
        }
    }
};
mbox.prototype.getName = function() {
    return this.g
};
mbox.prototype.getParameters = function() {
    var D = this.w.getParameters();
    var C = new Array();
    for (var A = 0; A < D.length; A++) {
        if (D[A].name.indexOf("mbox") != 0) {
            C[C.length] = D[A].name + "=" + D[A].value
        }
    }
    return C
};
mbox.prototype.setOnLoad = function(A) {
    this.Sb = A;
    return this
};
mbox.prototype.setMessage = function(A) {
    this.message = A;
    return this
};
mbox.prototype.setOnError = function(A) {
    this.Rb = A;
    return this
};
mbox.prototype.setFetcher = function(A) {
    if (this.Mb) {
        this.Mb.cancel()
    }
    this.Mb = A;
    return this
};
mbox.prototype.getFetcher = function() {
    return this.Mb
};
mbox.prototype.load = function(C) {
    if (this.Mb == null) {
        return this
    }
    this.setEventTime("load.start");
    this.cancelTimeout();
    this.Lb = 0;
    var A = (C && C.length > 0) ? this.w.clone().addParameters(C) : this.w;
    this.Mb.fetch(A);
    var B = this;
    this.Vb = setTimeout(function() {
        B.Rb("browser timeout", B.Mb.getType())
    }, 15000);
    this.setEventTime("load.end");
    return this
};
mbox.prototype.loaded = function() {
    this.cancelTimeout();
    if (!this.activate()) {
        var A = this;
        setTimeout(function() {
            A.loaded()
        }, 100)
    }
};
mbox.prototype.activate = function() {
    if (this.Lb) {
        return this.Lb
    }
    this.setEventTime("activate" + ++this.Pb + ".start");
    if (this.show()) {
        this.cancelTimeout();
        this.Lb = 1
    }
    this.setEventTime("activate" + this.Pb + ".end");
    return this.Lb
};
mbox.prototype.isActivated = function() {
    return this.Lb
};
mbox.prototype.setOffer = function(A) {
    if (A && A.show && A.setOnLoad) {
        this.Nb = A
    } else {
        throw "Invalid offer"
    }
    return this
};
mbox.prototype.getOffer = function() {
    return this.Nb
};
mbox.prototype.show = function() {
    this.setEventTime("show.start");
    var A = this.Nb.show(this);
    this.setEventTime(A == 1 ? "show.end.ok" : "show.end");
    return A
};
mbox.prototype.showContent = function(A) {
    if (A == null) {
        return 0
    }
    if (this.Fb == null || !this.Fb.parentNode) {
        this.Fb = this.getDefaultDiv();
        if (this.Fb == null) {
            return 0
        }
    }
    if (this.Fb != A) {
        this.Xb(this.Fb);
        this.Fb.parentNode.replaceChild(A, this.Fb);
        this.Fb = A
    }
    this.Yb(A);
    this.Sb();
    return 1
};
mbox.prototype.hide = function() {
    this.setEventTime("hide.start");
    var A = this.showContent(this.getDefaultDiv());
    this.setEventTime(A == 1 ? "hide.end.ok" : "hide.end.fail");
    return A
};
mbox.prototype.finalize = function() {
    this.setEventTime("finalize.start");
    this.cancelTimeout();
    if (this.getDefaultDiv() == null) {
        if (this.mb.force() != null) {
            this.setMessage("No default content, an empty one has been added")
        } else {
            this.setMessage("Unable to locate mbox")
        }
    }
    if (!this.activate()) {
        this.hide();
        this.setEventTime("finalize.end.hide")
    }
    this.setEventTime("finalize.end.ok")
};
mbox.prototype.cancelTimeout = function() {
    if (this.Vb) {
        clearTimeout(this.Vb)
    }
    if (this.Mb != null) {
        this.Mb.cancel()
    }
};
mbox.prototype.getDiv = function() {
    return this.Fb
};
mbox.prototype.getDefaultDiv = function() {
    if (this.Tb == null) {
        this.Tb = this.mb.locate()
    }
    return this.Tb
};
mbox.prototype.setEventTime = function(A) {
    this.Ob[A] = (new Date()).getTime()
};
mbox.prototype.getEventTimes = function() {
    return this.Ob
};
mbox.prototype.getImportName = function() {
    return this.nb
};
mbox.prototype.getURL = function() {
    return this.w.buildUrl()
};
mbox.prototype.getUrlBuilder = function() {
    return this.w
};
mbox.prototype._b = function(A) {
    return A.style.display != "none"
};
mbox.prototype.Yb = function(A) {
    this.ac(A, true)
};
mbox.prototype.Xb = function(A) {
    this.ac(A, false)
};
mbox.prototype.ac = function(B, A) {
    B.style.visibility = A ? "visible" : "hidden";
    B.style.display = A ? "block" : "none"
};
mboxOfferContent = function() {
    this.Sb = function() {}
};
mboxOfferContent.prototype.show = function(A) {
    var C = A.showContent(document.getElementById(A.getImportName()));
    if (C == 1) {
        this.Sb()
    }
    return C
};
mboxOfferContent.prototype.setOnLoad = function(A) {
    this.Sb = A
};
mboxOfferAjax = function(A) {
    this.Wb = A;
    this.Sb = function() {}
};
mboxOfferAjax.prototype.setOnLoad = function(A) {
    this.Sb = A
};
mboxOfferAjax.prototype.show = function(A) {
    var D = document.createElement("div");
    D.id = A.getImportName();
    D.innerHTML = this.Wb;
    var C = A.showContent(D);
    if (C == 1) {
        this.Sb()
    }
    return C
};
mboxOfferDefault = function() {
    this.Sb = function() {}
};
mboxOfferDefault.prototype.setOnLoad = function(A) {
    this.Sb = A
};
mboxOfferDefault.prototype.show = function(A) {
    var C = A.hide();
    if (C == 1) {
        this.Sb()
    }
    return C
};
mboxCookieManager = function mboxCookieManager(B, A) {
    this.g = B;
    this.dc = A == "" || A.indexOf(".") == -1 ? "" : "; domain=" + A;
    this.ec = new mboxMap();
    this.loadCookies()
};
mboxCookieManager.prototype.isEnabled = function() {
    this.setCookie("check", "true", 60);
    this.loadCookies();
    return this.getCookie("check") == "true"
};
mboxCookieManager.prototype.setCookie = function(C, B, D) {
    if (typeof C != "undefined" && typeof B != "undefined" && typeof D != "undefined") {
        var A = new Object();
        A.name = C;
        A.value = escape(B);
        A.expireOn = Math.ceil(D + new Date().getTime() / 1000);
        this.ec.put(C, A);
        this.saveCookies()
    }
};
mboxCookieManager.prototype.getCookie = function(B) {
    var A = this.ec.get(B);
    return A ? unescape(A.value) : null
};
mboxCookieManager.prototype.deleteCookie = function(A) {
    this.ec.remove(A);
    this.saveCookies()
};
mboxCookieManager.prototype.getCookieNames = function(A) {
    var B = new Array();
    this.ec.each(function(D, C) {
        if (D.indexOf(A) == 0) {
            B[B.length] = D
        }
    });
    return B
};
mboxCookieManager.prototype.saveCookies = function() {
    var A = new Array();
    var B = 0;
    this.ec.each(function(E, D) {
        A[A.length] = E + "#" + D.value + "#" + D.expireOn;
        if (B < D.expireOn) {
            B = D.expireOn
        }
    });
    var C = new Date(B * 1000);
    document.cookie = this.g + "=" + A.join("|") + "; expires=" + C.toGMTString() + "; path=/" + this.dc
};
mboxCookieManager.prototype.loadCookies = function() {
    this.ec = new mboxMap();
    var E = document.cookie.indexOf(this.g + "=");
    if (E != -1) {
        var F = document.cookie.indexOf(";", E);
        if (F == -1) {
            F = document.cookie.indexOf(",", E);
            if (F == -1) {
                F = document.cookie.length
            }
        }
        var G = document.cookie.substring(E + this.g.length + 1, F).split("|");
        var A = Math.ceil(new Date().getTime() / 1000);
        for (var C = 0; C < G.length; C++) {
            var D = G[C].split("#");
            if (A <= D[2]) {
                var B = new Object();
                B.name = D[0];
                B.value = D[1];
                B.expireOn = D[2];
                this.ec.put(B.name, B)
            }
        }
    }
};
mboxSession = function(B, C, E, D, A) {
    this.rc = C;
    this.Ab = E;
    this.sc = D;
    this.J = A;
    this.tc = false;
    this.Ib = typeof mboxForceSessionId != "undefined" ? mboxForceSessionId : mboxGetPageParameter(this.rc);
    if (this.Ib == null || this.Ib.length == 0) {
        this.Ib = A.getCookie(E);
        if (this.Ib == null || this.Ib.length == 0) {
            this.Ib = B;
            this.tc = true
        }
    }
    A.setCookie(E, this.Ib, D)
};
mboxSession.prototype.getId = function() {
    return this.Ib
};
mboxSession.prototype.forceId = function(A) {
    this.Ib = A;
    this.J.setCookie(this.Ab, this.Ib, this.sc)
};
mboxPC = function(C, B, A) {
    this.Ab = C;
    this.sc = B;
    this.J = A;
    this.Ib = typeof mboxForcePCId != "undefined" ? mboxForcePCId : A.getCookie(C);
    if (this.Ib != null) {
        A.setCookie(C, this.Ib, B)
    }
};
mboxPC.prototype.getId = function() {
    return this.Ib
};
mboxPC.prototype.forceId = function(A) {
    if (this.Ib != A) {
        this.Ib = A;
        this.J.setCookie(this.Ab, this.Ib, this.sc);
        return true
    }
    return false
};
mboxGetPageParameter = function(D) {
    var E = null;
    var A = new RegExp(D + "=([^&]*)");
    var C = A.exec(document.location);
    if (C != null && C.length >= 2) {
        E = C[1]
    }
    return E
};
mboxSetCookie = function(B, A, C) {
    return mboxFactoryDefault.getCookieManager().setCookie(B, A, C)
};
mboxGetCookie = function(A) {
    return mboxFactoryDefault.getCookieManager().getCookie(A)
};
mboxCookiePageDomain = function() {
    var A = (/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1];
    var B = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
    if (!B.exec(A)) {
        var C = (/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(A);
        if (C) {
            A = C[0]
        }
    }
    return A ? A : ""
};
mboxShiftArray = function(A) {
    var D = new Array();
    for (var C = 1; C < A.length; C++) {
        D[D.length] = A[C]
    }
    return D
};
mboxGenerateId = function() {
    return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999)
};
mboxScreenHeight = function() {
    return screen.height
};
mboxScreenWidth = function() {
    return screen.width
};
mboxBrowserWidth = function() {
    return (window.innerWidth) ? window.innerWidth : document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth
};
mboxBrowserHeight = function() {
    return (window.innerHeight) ? window.innerHeight : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight
};
mboxBrowserTimeOffset = function() {
    return -new Date().getTimezoneOffset()
};
mboxScreenColorDepth = function() {
    return screen.pixelDepth
};
if (typeof mboxVersion == "undefined") {
    var mboxVersion = 40;
    var mboxFactories = new mboxMap();
    var mboxFactoryDefault = new mboxFactory("barclaysbankplc.tt.omtrdc.net", "barclaysbankplc", "default")
}
if (mboxGetPageParameter("mboxDebug") != null || mboxFactoryDefault.getCookieManager().getCookie("debug") != null) {
    setTimeout(function() {
        if (typeof mboxDebugLoaded == "undefined") {
            alert("Could not load the remote debug.\nPlease check your connection to Test&amp;Target servers")
        }
    }, 60 * 60);
    document.write('<script type="text/javascript" src="http://admin7.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=barclaysbankplc.tt.omtrdc.net&clientCode=barclaysbankplc"><\/script>')
}
var mboxTrack = function(F, E) {
        var A, B, C, D = mboxFactoryDefault;
        if (D.getMboxes().length() > 0) {
            A = D.getMboxes().getById(0);
            B = A.getURL().replace("mbox=" + A.getName(), "mbox=" + F).replace("mboxPage=" + D.getPageId(), "mboxPage=" + mboxGenerateId()) + "&" + E, C = new Image();
            C.style.display = "none";
            C.src = B;
            document.body.appendChild(C)
        } else {
            D.getSignaler().signal("onEvent", F + "&" + E)
        }
    },
    mboxTrackLink = function(C, B, A) {
        mboxTrack(C, B);
        setTimeout("location='" + A + "'", 500)
    };

function tt_Log(A) {
    mboxTrack("barc_onClick", "Destination=" + A)
}

function tt_Redirect(A) {
    mboxTrack("barc_onClick", "Destination=" + A);
    setTimeout("location='" + A + "'", 500)
}
var pageAlias = "",
    extraInfo = "";
if (window.tc_page_alias) {
    pageAlias = "pageAlias=" + tc_page_alias
}
if (window.tc_extra_info) {
    extraInfo = tc_extra_info.split("&")
}
var head = document.getElementsByTagName("head")[0];
var script = document.createElement("script");
script.type = "text/javascript";
script.text = 'mboxCreate("Global_Mbox","' + pageAlias + '"';
for (var i = 0; i < extraInfo.length; i++) {
    script.text += ',"' + extraInfo[i] + '"'
}
script.text += ")";
head.appendChild(script);