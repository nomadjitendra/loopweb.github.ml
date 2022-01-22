/*!
 * Accordion v2.8.0
 * Simple accordion created in pure Javascript.
 * https://github.com/michu2k/Accordion
 *
 * Copyright 2017-2019 Michał Strumpf
 * Published under MIT License
 */
"use strict";
! function(i) {
    function u(o, l) {
        var c = this,
            t = {
                init: function() {
                    if (Array.isArray(o)) return o.length && o.map(function(e) {
                        return new u(e, l)
                    }), !1;
                    this.options = h({
                        duration: 600,
                        itemNumber: 0,
                        aria: !0,
                        closeOthers: !0,
                        showItem: !1,
                        elementClass: "ac",
                        questionClass: "ac-q",
                        answerClass: "ac-a",
                        targetClass: "ac-target",
                        onToggle: function() {}
                    }, l), this.container = document.querySelector(o), this.elements = this.container.querySelectorAll("." + this.options.elementClass);
                    var e = this.options,
                        t = e.aria,
                        n = e.showItem,
                        i = e.itemNumber;
                    t && this.container.setAttribute("role", "tablist");
                    for (var s = 0; s < this.elements.length; s++) {
                        var r = this.elements[s];
                        r.classList.add("js-enabled"), this.hideElement(r), this.setTransition(r), this.generateID(r), t && this.setARIA(r)
                    }
                    if (n) {
                        var a = this.elements[0];
                        "number" == typeof i && i < this.elements.length && (a = this.elements[i]), this.toggleElement(a, !1)
                    }
                    c.attachEvents()
                },
                setTransition: function(e) {
                    var t = this.options,
                        n = t.duration,
                        i = t.answerClass,
                        s = e.querySelector("." + i),
                        r = a("transition");
                    s.style[r] = n + "ms"
                },
                generateID: function(e) {
                    e.setAttribute("id", "ac-".concat(s)), s++
                },
                setARIA: function(e) {
                    var t = this.options,
                        n = t.questionClass,
                        i = t.answerClass,
                        s = e.querySelector("." + n),
                        r = e.querySelector("." + i);
                    s.setAttribute("role", "tab"), s.setAttribute("aria-expanded", "false"), r.setAttribute("role", "tabpanel")
                },
                updateARIA: function(e, t) {
                    var n = this.options.questionClass;
                    e.querySelector("." + n).setAttribute("aria-expanded", t)
                },
                callSpecificElement: function(e) {
                    for (var t = e.target, n = this.options, i = n.questionClass, s = n.targetClass, r = n.closeOthers, a = 0; a < this.elements.length; a++)
                        if (this.elements[a].contains(t)) {
                            (t.className.match(i) || t.className.match(s)) && (e.preventDefault(), r && this.closeAllElements(a), this.toggleElement(this.elements[a]));
                            break
                        }
                },
                hideElement: function(e) {
                    var t = this.options.answerClass;
                    e.querySelector("." + t).style.height = 0
                },
                toggleElement: function(e, t) {
                    var n, i = !(1 < arguments.length && void 0 !== t) || t,
                        s = this.options,
                        r = s.answerClass,
                        a = s.aria,
                        o = s.onToggle,
                        l = e.querySelector("." + r),
                        c = l.scrollHeight;
                    e.classList.toggle("is-active"), i || (l.style.height = "auto"), 0 < parseInt(l.style.height) ? (n = !1, requestAnimationFrame(function() {
                        l.style.height = 0
                    })) : (n = !0, requestAnimationFrame(function() {
                        l.style.height = c + "px"
                    })), a && this.updateARIA(e, n), i && o(e, this.elements)
                },
                closeAllElements: function(e) {
                    for (var t = this.options.aria, n = this.elements.length, i = 0; i < n; i++)
                        if (i != e) {
                            var s = this.elements[i];
                            s.classList.contains("is-active") && s.classList.remove("is-active"), t && this.updateARIA(s, !1), this.hideElement(s)
                        }
                },
                resizeHandler: function() {
                    for (var e, t, n = this.options, i = n.elementClass, s = n.answerClass, r = this.container.querySelectorAll("." + i + ".is-active"), a = 0; a < r.length; a++) t = r[a].querySelector("." + s), requestAnimationFrame(function() {
                        t.style.height = "auto", e = t.offsetHeight, requestAnimationFrame(function() {
                            t.style.height = e + "px"
                        })
                    })
                },
                clickHandler: function(e) {
                    this.callSpecificElement(e)
                },
                keydownHandler: function(e) {
                    13 === e.keyCode && this.callSpecificElement(e)
                }
            };
        this.attachEvents = function() {
            var e = t;
            e.clickHandler = e.clickHandler.bind(e), e.keydownHandler = e.keydownHandler.bind(e), e.resizeHandler = e.resizeHandler.bind(e), e.container.addEventListener("click", e.clickHandler), e.container.addEventListener("keydown", e.keydownHandler), i.addEventListener("resize", e.resizeHandler)
        }, this.detachEvents = function() {
            var e = t;
            e.container.removeEventListener("click", e.clickHandler), e.container.removeEventListener("keydown", e.keydownHandler), i.removeEventListener("resize", e.resizeHandler)
        };
        var a = function(e) {
                return "string" == typeof document.documentElement.style[e] ? e : (e = n(e), e = "webkit".concat(e))
            },
            n = function(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            },
            h = function(e, t) {
                for (var n in t) e[n] = t[n];
                return e
            };
        i.requestAnimationFrame = i.requestAnimationFrame || i.webkitRequestAnimationFrame || function(e) {
            i.setTimeout(e, 1e3 / 60)
        }, t.init()
    }
    var s = 0;
    "undefined" != typeof module && void 0 !== module.exports ? module.exports = u : i.Accordion = u
}(window);