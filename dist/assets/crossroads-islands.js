var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t4, e5, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4, this.t = e5;
  }
  get styleSheet() {
    let t4 = this.o;
    const s4 = this.t;
    if (e && void 0 === t4) {
      const e5 = void 0 !== s4 && 1 === s4.length;
      e5 && (t4 = o.get(s4)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && o.set(s4, t4));
    }
    return t4;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
var i = (t4, ...e5) => {
  const o6 = 1 === t4.length ? t4[0] : e5.reduce((e6, s4, o7) => e6 + ((t5) => {
    if (true === t5._$cssResult$) return t5.cssText;
    if ("number" == typeof t5) return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t4[o7 + 1], t4[0]);
  return new n(o6, t4, s);
};
var S = (s4, o6) => {
  if (e) s4.adoptedStyleSheets = o6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
  else for (const e5 of o6) {
    const o7 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e5.cssText, s4.appendChild(o7);
  }
};
var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e5 = "";
  for (const s4 of t5.cssRules) e5 += s4.cssText;
  return r(e5);
})(t4) : t4;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t4, s4) => t4;
var u = { toAttribute(t4, s4) {
  switch (s4) {
    case Boolean:
      t4 = t4 ? l : null;
      break;
    case Object:
    case Array:
      t4 = null == t4 ? t4 : JSON.stringify(t4);
  }
  return t4;
}, fromAttribute(t4, s4) {
  let i5 = t4;
  switch (s4) {
    case Boolean:
      i5 = null !== t4;
      break;
    case Number:
      i5 = null === t4 ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t4);
      } catch (t5) {
        i5 = null;
      }
  }
  return i5;
} };
var f = (t4, s4) => !i2(t4, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t4) {
    this._$Ei(), (this.l ??= []).push(t4);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t4, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t4) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t4, s4), !s4.noAccessor) {
      const i5 = Symbol(), h3 = this.getPropertyDescriptor(t4, i5, s4);
      void 0 !== h3 && e2(this.prototype, t4, h3);
    }
  }
  static getPropertyDescriptor(t4, s4, i5) {
    const { get: e5, set: r6 } = h(this.prototype, t4) ?? { get() {
      return this[s4];
    }, set(t5) {
      this[s4] = t5;
    } };
    return { get: e5, set(s5) {
      const h3 = e5?.call(this);
      r6?.call(this, s5), this.requestUpdate(t4, h3, i5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t4) {
    return this.elementProperties.get(t4) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t4 = n2(this);
    t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t5 = this.properties, s4 = [...r2(t5), ...o2(t5)];
      for (const i5 of s4) this.createProperty(i5, t5[i5]);
    }
    const t4 = this[Symbol.metadata];
    if (null !== t4) {
      const s4 = litPropertyMetadata.get(t4);
      if (void 0 !== s4) for (const [t5, i5] of s4) this.elementProperties.set(t5, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t5, s4] of this.elementProperties) {
      const i5 = this._$Eu(t5, s4);
      void 0 !== i5 && this._$Eh.set(i5, t5);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i5 = [];
    if (Array.isArray(s4)) {
      const e5 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e5) i5.unshift(c(s5));
    } else void 0 !== s4 && i5.push(c(s4));
    return i5;
  }
  static _$Eu(t4, s4) {
    const i5 = s4.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t4) => t4(this));
  }
  addController(t4) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t4), void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
  }
  removeController(t4) {
    this._$EO?.delete(t4);
  }
  _$E_() {
    const t4 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t4.set(i5, this[i5]), delete this[i5]);
    t4.size > 0 && (this._$Ep = t4);
  }
  createRenderRoot() {
    const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t4, this.constructor.elementStyles), t4;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t4) => t4.hostConnected?.());
  }
  enableUpdating(t4) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t4) => t4.hostDisconnected?.());
  }
  attributeChangedCallback(t4, s4, i5) {
    this._$AK(t4, i5);
  }
  _$ET(t4, s4) {
    const i5 = this.constructor.elementProperties.get(t4), e5 = this.constructor._$Eu(t4, i5);
    if (void 0 !== e5 && true === i5.reflect) {
      const h3 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
      this._$Em = t4, null == h3 ? this.removeAttribute(e5) : this.setAttribute(e5, h3), this._$Em = null;
    }
  }
  _$AK(t4, s4) {
    const i5 = this.constructor, e5 = i5._$Eh.get(t4);
    if (void 0 !== e5 && this._$Em !== e5) {
      const t5 = i5.getPropertyOptions(e5), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
      this._$Em = e5;
      const r6 = h3.fromAttribute(s4, t5.type);
      this[e5] = r6 ?? this._$Ej?.get(e5) ?? r6, this._$Em = null;
    }
  }
  requestUpdate(t4, s4, i5, e5 = false, h3) {
    if (void 0 !== t4) {
      const r6 = this.constructor;
      if (false === e5 && (h3 = this[t4]), i5 ??= r6.getPropertyOptions(t4), !((i5.hasChanged ?? f)(h3, s4) || i5.useDefault && i5.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(r6._$Eu(t4, i5)))) return;
      this.C(t4, s4, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t4, s4, { useDefault: i5, reflect: e5, wrapped: h3 }, r6) {
    i5 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t4) && (this._$Ej.set(t4, r6 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r6) || (this._$AL.has(t4) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t4, s4)), true === e5 && this._$Em !== t4 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t4));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t5) {
      Promise.reject(t5);
    }
    const t4 = this.scheduleUpdate();
    return null != t4 && await t4, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t6, s5] of this._$Ep) this[t6] = s5;
        this._$Ep = void 0;
      }
      const t5 = this.constructor.elementProperties;
      if (t5.size > 0) for (const [s5, i5] of t5) {
        const { wrapped: t6 } = i5, e5 = this[s5];
        true !== t6 || this._$AL.has(s5) || void 0 === e5 || this.C(s5, void 0, i5, e5);
      }
    }
    let t4 = false;
    const s4 = this._$AL;
    try {
      t4 = this.shouldUpdate(s4), t4 ? (this.willUpdate(s4), this._$EO?.forEach((t5) => t5.hostUpdate?.()), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t4 = false, this._$EM(), s5;
    }
    t4 && this._$AE(s4);
  }
  willUpdate(t4) {
  }
  _$AE(t4) {
    this._$EO?.forEach((t5) => t5.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t4) {
    return true;
  }
  update(t4) {
    this._$Eq &&= this._$Eq.forEach((t5) => this._$ET(t5, this[t5])), this._$EM();
  }
  updated(t4) {
  }
  firstUpdated(t4) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t4) => t4;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
var u2 = Array.isArray;
var d2 = (t4) => u2(t4) || "function" == typeof t4?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t4) => (i5, ...s4) => ({ _$litType$: t4, strings: i5, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t4, i5) {
  if (!u2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
var N = (t4, i5) => {
  const s4 = t4.length - 1, e5 = [];
  let n5, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
  for (let i6 = 0; i6 < s4; i6++) {
    const s5 = t4[i6];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
    const x2 = c4 === p2 && t4[i6 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e5.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i6 : x2);
  }
  return [V(t4, l3 + (t4[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e5];
};
var S2 = class _S {
  constructor({ strings: t4, _$litType$: i5 }, e5) {
    let r6;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = N(t4, i5);
    if (this.el = _S.createElement(f3, e5), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
      const t5 = this.el.content.firstChild;
      t5.replaceWith(...t5.childNodes);
    }
    for (; null !== (r6 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes()) for (const t5 of r6.getAttributeNames()) if (t5.endsWith(h2)) {
          const i6 = v2[a3++], s4 = r6.getAttribute(t5).split(o3), e6 = /([.?@])?(.*)/.exec(i6);
          d3.push({ type: 1, index: l3, name: e6[2], strings: s4, ctor: "." === e6[1] ? I : "?" === e6[1] ? L : "@" === e6[1] ? z : H }), r6.removeAttribute(t5);
        } else t5.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r6.removeAttribute(t5));
        if (y2.test(r6.tagName)) {
          const t5 = r6.textContent.split(o3), i6 = t5.length - 1;
          if (i6 > 0) {
            r6.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i6; s4++) r6.append(t5[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r6.append(t5[i6], c3());
          }
        }
      } else if (8 === r6.nodeType) if (r6.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t5 = -1;
        for (; -1 !== (t5 = r6.data.indexOf(o3, t5 + 1)); ) d3.push({ type: 7, index: l3 }), t5 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t4, i5) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t4, s4;
  }
};
function M(t4, i5, s4 = t4, e5) {
  if (i5 === E) return i5;
  let h3 = void 0 !== e5 ? s4._$Co?.[e5] : s4._$Cl;
  const o6 = a2(i5) ? void 0 : i5._$litDirective$;
  return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t4), h3._$AT(t4, s4, e5)), void 0 !== e5 ? (s4._$Co ??= [])[e5] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = M(t4, h3._$AS(t4, i5.values), h3, e5)), i5;
}
var R = class {
  constructor(t4, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t4) {
    const { el: { content: i5 }, parts: s4 } = this._$AD, e5 = (t4?.creationScope ?? l2).importNode(i5, true);
    P.currentNode = e5;
    let h3 = P.nextNode(), o6 = 0, n5 = 0, r6 = s4[0];
    for (; void 0 !== r6; ) {
      if (o6 === r6.index) {
        let i6;
        2 === r6.type ? i6 = new k(h3, h3.nextSibling, this, t4) : 1 === r6.type ? i6 = new r6.ctor(h3, r6.name, r6.strings, this, t4) : 6 === r6.type && (i6 = new Z(h3, this, t4)), this._$AV.push(i6), r6 = s4[++n5];
      }
      o6 !== r6?.index && (h3 = P.nextNode(), o6++);
    }
    return P.currentNode = l2, e5;
  }
  p(t4) {
    let i5 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t4[i5])), i5++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t4, i5, s4, e5) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s4, this.options = e5, this._$Cv = e5?.isConnected ?? true;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === t4?.nodeType && (t4 = i5.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i5 = this) {
    t4 = M(this, t4, i5), a2(t4) ? t4 === A || null == t4 || "" === t4 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t4 !== this._$AH && t4 !== E && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : d2(t4) ? this.k(t4) : this._(t4);
  }
  O(t4) {
    return this._$AA.parentNode.insertBefore(t4, this._$AB);
  }
  T(t4) {
    this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
  }
  _(t4) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(l2.createTextNode(t4)), this._$AH = t4;
  }
  $(t4) {
    const { values: i5, _$litType$: s4 } = t4, e5 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e5) this._$AH.p(i5);
    else {
      const t5 = new R(e5, this), s5 = t5.u(this.options);
      t5.p(i5), this.T(s5), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i5 = C.get(t4.strings);
    return void 0 === i5 && C.set(t4.strings, i5 = new S2(t4)), i5;
  }
  k(t4) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s4, e5 = 0;
    for (const h3 of t4) e5 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e5], s4._$AI(h3), e5++;
    e5 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e5), i5.length = e5);
  }
  _$AR(t4 = this._$AA.nextSibling, s4) {
    for (this._$AP?.(false, true, s4); t4 !== this._$AB; ) {
      const s5 = i3(t4).nextSibling;
      i3(t4).remove(), t4 = s5;
    }
  }
  setConnected(t4) {
    void 0 === this._$AM && (this._$Cv = t4, this._$AP?.(t4));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t4, i5, s4, e5, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e5, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t4, i5 = this, s4, e5) {
    const h3 = this.strings;
    let o6 = false;
    if (void 0 === h3) t4 = M(this, t4, i5, 0), o6 = !a2(t4) || t4 !== this._$AH && t4 !== E, o6 && (this._$AH = t4);
    else {
      const e6 = t4;
      let n5, r6;
      for (t4 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r6 = M(this, e6[s4 + n5], i5, n5), r6 === E && (r6 = this._$AH[n5]), o6 ||= !a2(r6) || r6 !== this._$AH[n5], r6 === A ? t4 = A : t4 !== A && (t4 += (r6 ?? "") + h3[n5 + 1]), this._$AH[n5] = r6;
    }
    o6 && !e5 && this.j(t4);
  }
  j(t4) {
    t4 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t4) {
    this.element[this.name] = t4 === A ? void 0 : t4;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t4) {
    this.element.toggleAttribute(this.name, !!t4 && t4 !== A);
  }
};
var z = class extends H {
  constructor(t4, i5, s4, e5, h3) {
    super(t4, i5, s4, e5, h3), this.type = 5;
  }
  _$AI(t4, i5 = this) {
    if ((t4 = M(this, t4, i5, 0) ?? A) === E) return;
    const s4 = this._$AH, e5 = t4 === A && s4 !== A || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== A && (s4 === A || e5);
    e5 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var Z = class {
  constructor(t4, i5, s4) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4) {
    M(this, t4);
  }
};
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.3");
var D = (t4, i5, s4) => {
  const e5 = s4?.renderBefore ?? i5;
  let h3 = e5._$litPart$;
  if (void 0 === h3) {
    const t5 = s4?.renderBefore ?? null;
    e5._$litPart$ = h3 = new k(i5.insertBefore(c3(), t5), t5, void 0, s4 ?? {});
  }
  return h3._$AI(t4), h3;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t4 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t4.firstChild, t4;
  }
  update(t4) {
    const r6 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = D(r6, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
var o4 = s3.litElementPolyfillSupport;
o4?.({ LitElement: i4 });
(s3.litElementVersions ??= []).push("4.2.2");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t3 = (t4) => (e5, o6) => {
  void 0 !== o6 ? o6.addInitializer(() => {
    customElements.define(t4, e5);
  }) : customElements.define(t4, e5);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t4 = o5, e5, r6) => {
  const { kind: n5, metadata: i5 } = r6;
  let s4 = globalThis.litPropertyMetadata.get(i5);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t4 = Object.create(t4)).wrapped = true), s4.set(r6.name, t4), "accessor" === n5) {
    const { name: o6 } = r6;
    return { set(r7) {
      const n6 = e5.get.call(this);
      e5.set.call(this, r7), this.requestUpdate(o6, n6, t4, true, r7);
    }, init(e6) {
      return void 0 !== e6 && this.C(o6, void 0, t4, e6), e6;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r6;
    return function(r7) {
      const n6 = this[o6];
      e5.call(this, r7), this.requestUpdate(o6, n6, t4, true, r7);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t4) {
  return (e5, o6) => "object" == typeof o6 ? r4(t4, e5, o6) : ((t5, e6, o7) => {
    const r6 = e6.hasOwnProperty(o7);
    return e6.constructor.createProperty(o7, t5), r6 ? Object.getOwnPropertyDescriptor(e6, o7) : void 0;
  })(t4, e5, o6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}

// src/islands/crossroads-live-sandbox.ts
var SANDBOX_NODES = {
  start: {
    id: "start",
    stageLabel: "Opening Trunk \u2022 Dusk at the Lantern Post",
    crossroadsBadge: "3-Way Story Crossroads",
    heading: "Three Trails Beyond the Rain-Washed Porch",
    architectNote: "Rowan Hawthorne: \u201CEvery Story Crossroads starts on a shared trunk like this porch. Pick whichever lantern trail calls to you\u2014none of the three is a trap!\u201D",
    paragraphs: [
      "Evening rain has just cleared off the cedar eaves, leaving the air cool and sweet with pine resin. On the stone porch table, Grandpa\u2019s brass compass settles due north beside a warm hurricane lantern.",
      "Ahead of you, the mossy footpath splits around a weathered timber signpost pointing toward three very different corners of the valley\u2014each dry, welcoming, and waiting to be explored."
    ],
    promptQuestion: "Crossroads 1 (3-Way): Which trail do you take from the signpost?",
    options: [
      {
        id: "opt-creek",
        marker: "Option 1 \u2022 Creek Trail",
        label: "Follow the Cedar Footbridge Down to the Creek",
        hint: "Listen to rushing snowmelt over smooth river stones beneath giant red cedars.",
        nextNodeId: "creek"
      },
      {
        id: "opt-ridge",
        marker: "Option 2 \u2022 Meadow Ridge",
        label: "Climb the Switchback Toward Starlight Meadow",
        hint: "Catch the last amber sunset glow and watch the first stars emerge overhead.",
        nextNodeId: "ridge"
      },
      {
        id: "opt-cabin",
        marker: "Option 3 \u2022 Stone Hearth",
        label: "Step Inside the Fieldstone Reading Cabin",
        hint: "Kindle dry cedar kindling in the hearth and listen to raindrops from the window seat.",
        nextNodeId: "cabin"
      }
    ]
  },
  creek: {
    id: "creek",
    stageLabel: "Route 1 \u2022 Cedar Creek Footbridge",
    crossroadsBadge: "2-Way Story Crossroads",
    heading: "Silver Water Under Old-Growth Boughs",
    architectNote: "Iris Hawthorne: \u201CNotice the trail pill at the top of this card\u2014I pinned Signpost 1 there so you can step back anytime without losing your bearings.\u201D",
    paragraphs: [
      "Your boots cross hand-split cedar planks suspended six feet above crystal-clear snowmelt. Cutthroat trout dart beneath an undercut root bank while droplets patter softly off broad thimbleberry leaves.",
      "Just across the bridge, two dry spots invite you to linger as twilight deepens."
    ],
    promptQuestion: "Crossroads 2 (2-Way): How do you spend the evening by the water?",
    options: [
      {
        id: "creek-lantern",
        marker: "Option A \u2022 Gravel Bar",
        label: "Set the Lantern on the Smooth River-Stone Bench",
        hint: "Watch the Milky Way mirror itself in the calm eddy pool.",
        nextNodeId: "ending-creek-stars"
      },
      {
        id: "creek-shelter",
        marker: "Option B \u2022 Cedar Eaves",
        label: "Rest Beneath the Split-Cedar Canoe Boathouse Roof",
        hint: "Sketch the valley map by warm lantern light while night mist rises.",
        nextNodeId: "ending-creek-sketch"
      }
    ]
  },
  ridge: {
    id: "ridge",
    stageLabel: "Route 2 \u2022 Starlight Meadow Switchback",
    crossroadsBadge: "2-Way Story Crossroads",
    heading: "Above the Tree Line Under Deep Teal Skies",
    architectNote: "Rowan Hawthorne: \u201CNow you\u2019ve reached a focused 2-Way Crossroads\u2014two balanced options shaped specifically by climbing the ridge!\u201D",
    paragraphs: [
      "Ten minutes up the dry granite switchback, the tall hemlocks open onto a sweeping subalpine meadow of wild huckleberry bushes and warm sun-baked boulders.",
      "With zero city lights for eighty miles, the evening sky deepens from compass teal to velvet indigo."
    ],
    promptQuestion: "Crossroads 2 (2-Way): Where do you pause on the ridge?",
    options: [
      {
        id: "ridge-boulder",
        marker: "Option A \u2022 Granite Outcrop",
        label: "Lean Back Against the Warm South-Facing Granite Ledge",
        hint: "Trace summer constellations arching cleanly from horizon to horizon.",
        nextNodeId: "ending-ridge-cosmos"
      },
      {
        id: "ridge-spring",
        marker: "Option B \u2022 Springhouse Porch",
        label: "Sit on the Old Timber Porch Beside the Meadow Spring",
        hint: "Listen to nightjars calling across the quiet canyon below.",
        nextNodeId: "ending-ridge-porch"
      }
    ]
  },
  cabin: {
    id: "cabin",
    stageLabel: "Route 3 \u2022 Fieldstone Reading Cabin",
    crossroadsBadge: "2-Way Story Crossroads",
    heading: "Warmth in the Dry-Stacked Stone Hearth",
    architectNote: "Iris Hawthorne: \u201CNothing beats rain on cedar shakes! From here, choose how you want to spend the evening inside.\u201D",
    paragraphs: [
      "Inside the snug fieldstone cabin, dry western red cedar shavings catch a bright amber flame on the first spark. Light dances across rough-sawn pine bookshelves and a cushioned window bench.",
      "A fresh summer rain shower begins tapping a gentle rhythm against the cedar roof shakes overhead."
    ],
    promptQuestion: "Crossroads 2 (2-Way): How do you settle in for the night?",
    options: [
      {
        id: "cabin-journal",
        marker: "Option A \u2022 Window Bench",
        label: "Open the Leather Journal Beside the Rain-Streaked Glass",
        hint: "Let the steady white noise of rain on split cedar steady every thought.",
        nextNodeId: "ending-cabin-rain"
      },
      {
        id: "cabin-guitar",
        marker: "Option B \u2022 Fireside Chair",
        label: "Pick Up the Mahogany Acoustic Guitar by the Hearth",
        hint: "Fingerpick a warm open-chord melody that fills the timber rafters.",
        nextNodeId: "ending-cabin-song"
      }
    ]
  },
  "ending-creek-stars": {
    id: "ending-creek-stars",
    stageLabel: "Complete Route \u2022 Creekside Starlight",
    crossroadsBadge: "Route Complete \u2022 Coequal Ending 1A",
    heading: "Two Rivers of Stars\u2014One Above, One in the Creek",
    architectNote: "Rowan & Iris: \u201CEnding 1 of 6 discovered\u2014complete, peaceful, and 100% coequal.\u201D",
    paragraphs: [
      "In the sheltered bend of the creek, the surface flattens into dark glass. High between the cedar crowns, the bright core of the Milky Way emerges star by star until its reflection shimmers right beside your boots.",
      "Notice how nothing here punished you or cut your story short\u2014every route in RaggieSoft Story Crossroads is written as a complete, rewarding journey."
    ],
    options: []
  },
  "ending-creek-sketch": {
    id: "ending-creek-sketch",
    stageLabel: "Complete Route \u2022 Boathouse Sanctuary",
    crossroadsBadge: "Route Complete \u2022 Coequal Ending 1B",
    heading: "Dry Cedar Timber and a Mapped Horizon",
    architectNote: "Rowan & Iris: \u201CEnding 2 of 6 discovered\u2014hop back one step to see the gravel bar under the stars!\u201D",
    paragraphs: [
      "Beneath the fragrant cedar eaves, your fountain pen traces the bend of the creek, the high granite ridge, and the meadow trail\u2014three distinct stories waiting in the same valley.",
      "Whenever you read a full Story Crossroads novel on RaggieSoft Book Reader, you can keep moving forward on your chosen route or hop back to any signpost whenever you like."
    ],
    options: []
  },
  "ending-ridge-cosmos": {
    id: "ending-ridge-cosmos",
    stageLabel: "Complete Route \u2022 Granite Starwatch",
    crossroadsBadge: "Route Complete \u2022 Coequal Ending 2A",
    heading: "Sun-Warmed Stone Under the Milky Way",
    architectNote: "Rowan & Iris: \u201CEnding 3 of 6 discovered\u2014clear skies all the way across the ridge.\u201D",
    paragraphs: [
      "The granite slab still holds the afternoon sun against your shoulders while thousands of pinpoint stars blaze across the clear mountain sky.",
      "In a full RaggieSoft Story Crossroads novel like Cedar Run, choosing a high ridge foothold shapes every chapter that follows\u2014from how characters gather water to what shelter they build."
    ],
    options: []
  },
  "ending-ridge-porch": {
    id: "ending-ridge-porch",
    stageLabel: "Complete Route \u2022 Meadow Springhouse",
    crossroadsBadge: "Route Complete \u2022 Coequal Ending 2B",
    heading: "Cold Artesian Water and Quiet Pine Wind",
    architectNote: "Rowan & Iris: \u201CEnding 4 of 6 discovered\u2014modeled after Route 3 in Cedar Run!\u201D",
    paragraphs: [
      "From the covered timber porch, cool spring water trickles steadily through a hand-carved stone trough while wind hushes through the pines below.",
      "Every option at a Story Crossroads honors character agency\u2014giving you three or two distinct ways to live inside the world."
    ],
    options: []
  },
  "ending-cabin-rain": {
    id: "ending-cabin-rain",
    stageLabel: "Complete Route \u2022 Rain on Split Cedar",
    crossroadsBadge: "Route Complete \u2022 Coequal Ending 3A",
    heading: "The Soothing Hush of Rain on Cedar Shakes",
    architectNote: "Rowan & Iris: \u201CEnding 5 of 6 discovered\u2014the Lantern Conservatory\u2019s favorite sound.\u201D",
    paragraphs: [
      "Wrapped in warmth beside the windowpane, the steady white noise of mountain rain against split-cedar shingles washes away the noise of the outside world.",
      "Ready to read a full-length branching novel? Jump straight into Cedar Run\u2014or step back to the signpost below to try one of the other two trails!"
    ],
    options: []
  },
  "ending-cabin-song": {
    id: "ending-cabin-song",
    stageLabel: "Complete Route \u2022 Fireside Harmony",
    crossroadsBadge: "Route Complete \u2022 Coequal Ending 3B",
    heading: "Warm Mahogany Chords Against the Evening Rain",
    architectNote: "Rowan & Iris: \u201CEnding 6 of 6 discovered\u2014warmth, music, and dry cedar rafters.\u201D",
    paragraphs: [
      "Six acoustic strings ring out warmly against the stone hearth, blending effortless mountain-folk chords with the crackle of dry cedar kindling.",
      "Every Story Crossroads route carries its own heart, atmosphere, and discoveries\u2014try stepping back to Crossroads 1 below to see where the creek or ridge trails lead!"
    ],
    options: []
  }
};
var CrossroadsLiveSandbox = class extends i4 {
  constructor() {
    super(...arguments);
    this.history = ["start"];
    this.liveAnnouncement = "";
  }
  get currentNode() {
    const currentId = this.history[this.history.length - 1] || "start";
    return SANDBOX_NODES[currentId] || SANDBOX_NODES.start;
  }
  chooseOption(option) {
    const nextNode = SANDBOX_NODES[option.nextNodeId];
    if (!nextNode) return;
    this.history = [...this.history, option.nextNodeId];
    this.liveAnnouncement = `Selected ${option.label}. Now reading: ${nextNode.heading}.`;
    this.focusSceneHeading();
  }
  jumpToHistoryIndex(index) {
    if (index < 0 || index >= this.history.length - 1) return;
    const sliced = this.history.slice(0, index + 1);
    const targetNode = SANDBOX_NODES[sliced[sliced.length - 1]] || SANDBOX_NODES.start;
    this.history = sliced;
    this.liveAnnouncement = `Returned to signpost: ${targetNode.heading}.`;
    this.focusSceneHeading();
  }
  restartSandbox() {
    this.history = ["start"];
    this.liveAnnouncement = "Returned to opening Crossroads signpost.";
    this.focusSceneHeading();
  }
  /**
   * Moves keyboard focus explicitly to the newly revealed scene heading (`tabindex="-1"`)
   * after Lit finishes updating the Shadow DOM (`this.updateComplete`), matching our
   * RaggieSoft Book Reader focus-management standard!
   */
  focusSceneHeading() {
    void this.updateComplete.then(() => {
      const heading = this.renderRoot.querySelector("#sandbox-scene-heading");
      heading?.focus();
    });
  }
  render() {
    const node = this.currentNode;
    return b2`
      <section class="sandbox-shell" aria-labelledby="sandbox-scene-heading">
        <div class="sr-only" role="status" aria-live="polite">${this.liveAnnouncement}</div>

        <nav class="trail-bar" aria-label="Your Story Crossroads trail">
          <ol class="breadcrumbs">
            ${this.history.map((nodeId, idx) => {
      const item = SANDBOX_NODES[nodeId] || SANDBOX_NODES.start;
      const isCurrent = idx === this.history.length - 1;
      const shortLabel = idx === 0 ? "Signpost 1" : idx === 1 ? "Signpost 2" : "Chosen Destination";
      return b2`
                <li>
                  ${isCurrent ? b2`<span class="crumb-current" aria-current="step">
                        <span aria-hidden="true">🧭</span>
                        <span>${shortLabel}: ${item.stageLabel.split("\u2022")[0].trim()}</span>
                      </span>` : b2`<button
                        type="button"
                        class="crumb-btn"
                        @click=${() => this.jumpToHistoryIndex(idx)}
                      >
                        ↩ Return to ${shortLabel}
                      </button>`}
                </li>
              `;
    })}
          </ol>
        </nav>

        <div class="badge-row">
          <span class="seal-pill">
            <span aria-hidden="true">✦</span>
            <span>${node.crossroadsBadge}</span>
          </span>
          <span class="stage-label">${node.stageLabel}</span>
        </div>

        <h3 id="sandbox-scene-heading" class="scene-heading" tabindex="-1">${node.heading}</h3>

        <p class="architect-note">${node.architectNote}</p>

        <div class="prose">
          ${node.paragraphs.map((p3) => b2`<p>${p3}</p>`)}
        </div>

        ${node.options.length > 0 ? b2`
              <div class="crossroads-prompt">
                <p class="prompt-title" id="sandbox-prompt-label">${node.promptQuestion}</p>
                <div
                  class="options-grid"
                  data-count=${String(node.options.length)}
                  role="group"
                  aria-labelledby="sandbox-prompt-label"
                >
                  ${node.options.map(
      (opt) => b2`
                      <button
                        type="button"
                        class="option-btn"
                        @click=${() => this.chooseOption(opt)}
                      >
                        <span class="option-marker">${opt.marker}</span>
                        <span class="option-label">${opt.label} →</span>
                        <span class="option-hint">${opt.hint}</span>
                      </button>
                    `
    )}
                </div>
              </div>
            ` : b2`
              <div class="ending-actions">
                <a class="action-link action-primary" href="https://books.raggiesoft.com/cedar-run">
                  <span aria-hidden="true">📚</span>
                  <span>Read Cedar Run on RaggieSoft Book Reader</span>
                </a>
                ${this.history.length > 2 ? b2`
                      <button
                        type="button"
                        class="action-btn action-secondary"
                        @click=${() => this.jumpToHistoryIndex(1)}
                      >
                        ↩ Try the Other 2-Way Option
                      </button>
                    ` : null}
                <button
                  type="button"
                  class="action-btn action-secondary"
                  @click=${() => this.restartSandbox()}
                >
                  🧭 Back to 3-Way Opening Signpost
                </button>
              </div>
            `}
      </section>
    `;
  }
};
CrossroadsLiveSandbox.styles = i`
    @layer component {
      :host {
        display: block;
        container-type: inline-size;

        /* Private shadow custom-property aliases reading inherited page tokens */
        --_bg: var(--cr-surface, #ffffff);
        --_bg-raised: var(--cr-brass-surface, #fdf5e6);
        --_ink: var(--cr-ink, #0c222b);
        --_muted: var(--cr-ink-muted, #244552);
        --_teal: var(--cr-teal, #0b4a5a);
        --_brass: var(--cr-brass, #6e4309);
        --_border: var(--cr-border, #5a7682);
        --_focus: var(--cr-focus, #0b5cab);
        --_btn-bg: var(--cr-btn-bg, #0b4a5a);
        --_btn-fg: var(--cr-btn-fg, #ffffff);
        --_badge-bg: var(--cr-badge-bg, #0c3b47);
        --_badge-fg: var(--cr-badge-fg, #fde6be);
      }

      .sandbox-shell {
        background-color: var(--_bg);
        color: var(--_ink);
        border: 2px solid var(--_border);
        border-radius: 1rem;
        padding: clamp(1.15rem, 3vw, 1.85rem);
      }

      .trail-bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        padding-bottom: 1rem;
        margin-bottom: 1.25rem;
        border-bottom: 1.5px solid var(--_border);
      }

      .breadcrumbs {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.4rem;
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 0.85rem;
      }

      .crumb-btn {
        font: inherit;
        color: inherit;
        background-color: var(--_bg-raised);
        border: 1.5px solid var(--_border);
        border-radius: 999px;
        padding: 0.28rem 0.7rem;
        font-weight: 600;
        cursor: pointer;
      }

      .crumb-current {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.28rem 0.75rem;
        border-radius: 999px;
        background-color: var(--_badge-bg);
        color: var(--_badge-fg);
        border: 1.5px solid var(--_border);
        font-weight: 700;
      }

      .badge-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 0.65rem;
      }

      .seal-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.25rem 0.7rem;
        border-radius: 999px;
        background-color: var(--_badge-bg);
        color: var(--_badge-fg);
        border: 1px solid var(--_border);
        font-size: 0.8rem;
        font-weight: 700;
      }

      .stage-label {
        font-size: 0.86rem;
        font-weight: 600;
        color: var(--_muted);
      }

      .scene-heading {
        font-family: var(--cr-font-display, Georgia, serif);
        font-size: clamp(1.35rem, 2.5vw, 1.75rem);
        line-height: 1.25;
        margin: 0 0 0.85rem;
      }

      .scene-heading:focus {
        outline: none;
      }

      .scene-heading:focus-visible {
        outline: 3px solid var(--_focus);
        outline-offset: 4px;
      }

      .prose p {
        margin: 0 0 0.95rem;
        line-height: 1.7;
        max-width: 68ch;
      }

      .architect-note {
        margin: 0 0 1rem;
        padding: 0.7rem 0.95rem;
        border-left: 4px solid var(--_teal);
        background-color: var(--_bg-raised);
        border-radius: 0.45rem;
        font-size: 0.9rem;
        color: var(--_muted);
      }

      .crossroads-prompt {
        margin-top: 1.35rem;
        padding-top: 1.15rem;
        border-top: 1.5px dashed var(--_border);
      }

      .prompt-title {
        font-weight: 700;
        font-size: 1rem;
        margin: 0 0 0.85rem;
        color: var(--_brass);
      }

      .options-grid {
        display: grid;
        gap: 0.85rem;
        grid-template-columns: 1fr;
      }

      @container (min-width: 42rem) {
        .options-grid[data-count="3"] {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .options-grid[data-count="2"] {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      /* Wrapped native <button> MUST declare font: inherit and color: inherit */
      .option-btn {
        font: inherit;
        color: var(--_ink);
        background-color: var(--_bg-raised);
        border: 2px solid var(--_border);
        border-radius: 0.85rem;
        padding: 1rem;
        text-align: left;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        transition: transform 0.12s ease, background-color 0.12s ease;
      }

      .option-btn:hover {
        transform: translateY(-1px);
      }

      .option-marker {
        font-size: 0.78rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--_brass);
      }

      .option-label {
        font-weight: 700;
        font-size: 1rem;
        line-height: 1.35;
      }

      .option-hint {
        font-size: 0.88rem;
        color: var(--_muted);
        line-height: 1.45;
      }

      .ending-actions {
        margin-top: 1.35rem;
        padding-top: 1.15rem;
        border-top: 1.5px solid var(--_border);
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
      }

      .action-btn,
      .action-link {
        font: inherit;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        min-height: 44px;
        padding: 0.6rem 1.1rem;
        border-radius: 0.6rem;
        font-weight: 700;
        font-size: 0.94rem;
        cursor: pointer;
        text-decoration: none;
      }

      .action-primary {
        background-color: var(--_btn-bg);
        color: var(--_btn-fg);
        border: 2px solid var(--_btn-bg);
      }

      .action-secondary {
        background-color: var(--_bg);
        color: var(--_ink);
        border: 2px solid var(--_border);
      }

      button:focus-visible,
      a:focus-visible {
        outline: 3px solid var(--_focus);
        outline-offset: 3px;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      @media (prefers-reduced-motion: reduce) {
        .option-btn {
          transition: none;
        }
        .option-btn:hover {
          transform: none;
        }
      }

      @media (forced-colors: active) {
        .sandbox-shell,
        .option-btn,
        .crumb-btn,
        .action-secondary {
          background-color: Canvas;
          color: CanvasText;
          border-color: ButtonBorder;
        }
        .action-primary {
          background-color: ButtonFace;
          color: ButtonText;
          border-color: ButtonText;
        }
      }
    }
  `;
__decorateClass([
  r5()
], CrossroadsLiveSandbox.prototype, "history", 2);
__decorateClass([
  r5()
], CrossroadsLiveSandbox.prototype, "liveAnnouncement", 2);
CrossroadsLiveSandbox = __decorateClass([
  t3("crossroads-live-sandbox")
], CrossroadsLiveSandbox);

// src/islands/crossroads-seal-explorer.ts
var CDN_LOGOS = "https://assets.raggiesoft.com/raggiesoft-books/images/logos";
var SEAL_SPECS = [
  {
    id: "3way",
    tabLabel: "3-Way Crossroads Seal",
    heading: "3-Way Story Crossroads Medallion (Multi-Route Editions)",
    tagline: "Three signpost boards & three diverging paths beneath the RaggieSoft star.",
    whenUsed: "Stamped onto Story Crossroads novels where a pivotal Crossroads offers three or more coequal routes forward\u2014allowing readers to compare three distinct ways of living inside the story world.",
    signpostAnatomy: [
      "Three angled Warm Brass directional boards pointing upper-left, center-right, and lower-left.",
      "Three diverging path arcs beneath the signpost pedestal representing three full-length storylines.",
      "Deep Compass Teal (#0F4C5C) field with twin brass rings and four-point star separators."
    ],
    exampleNote: "Featured on Cedar Run (Book One: First Foothold in the Valley).",
    emblemUrl: `${CDN_LOGOS}/story-crossroads-logo-3way-512.png`,
    emblemAlt: "Open golden-lit book with a three-directional teal and warm brass signpost rising from its pages beneath a four-point star",
    sealUrl: `${CDN_LOGOS}/story-crossroads-seal-3way.svg`,
    sealAlt: "Circular RaggieSoft Story Crossroads 3-Way cover medallion in Deep Compass Teal and Warm Brass"
  },
  {
    id: "2way",
    tabLabel: "2-Way Crossroads Seal",
    heading: "2-Way Story Crossroads Medallion (Binary Crossroads Editions)",
    tagline: "Two opposing signpost boards for defining two-option turning points.",
    whenUsed: "Stamped onto Story Crossroads novels built around focused Option A vs. Option B decisions\u2014where two equally compelling convictions or promises carry the story down two distinct routes.",
    signpostAnatomy: [
      "Two balanced Warm Brass directional boards pointing left and right from the central post.",
      "Two diverging path arcs below the pedestal honoring both sides of a defining choice.",
      "Placed in the lower-right cover safe zone with a soft elevation halo for instant shelf recognition."
    ],
    exampleNote: "Reserved for binary two-route RaggieSoft Story Crossroads editions.",
    emblemUrl: `${CDN_LOGOS}/story-crossroads-logo-2way-512.png`,
    emblemAlt: "Open golden-lit book with a two-directional teal and warm brass signpost rising from its pages beneath a four-point star",
    sealUrl: `${CDN_LOGOS}/story-crossroads-seal-2way.svg`,
    sealAlt: "Circular RaggieSoft Story Crossroads 2-Way cover medallion in Deep Compass Teal and Warm Brass"
  }
];
var CrossroadsSealExplorer = class extends i4 {
  constructor() {
    super(...arguments);
    this.activeId = "3way";
  }
  handleTabKeydown(e5, index) {
    let nextIndex = index;
    if (e5.key === "ArrowRight") {
      nextIndex = (index + 1) % SEAL_SPECS.length;
    } else if (e5.key === "ArrowLeft") {
      nextIndex = (index - 1 + SEAL_SPECS.length) % SEAL_SPECS.length;
    } else if (e5.key === "Home") {
      nextIndex = 0;
    } else if (e5.key === "End") {
      nextIndex = SEAL_SPECS.length - 1;
    } else {
      return;
    }
    e5.preventDefault();
    const nextSpec = SEAL_SPECS[nextIndex];
    this.activeId = nextSpec.id;
    void this.updateComplete.then(() => {
      const btn = this.renderRoot.querySelector(`#tab-${nextSpec.id}`);
      btn?.focus();
    });
  }
  render() {
    const active = SEAL_SPECS.find((s4) => s4.id === this.activeId) || SEAL_SPECS[0];
    return b2`
      <div class="explorer-box">
        <div class="tablist" role="tablist" aria-label="Story Crossroads Seal Variants">
          ${SEAL_SPECS.map((spec, idx) => {
      const selected = spec.id === active.id;
      return b2`
              <button
                type="button"
                role="tab"
                class="tab-btn"
                id="tab-${spec.id}"
                aria-selected=${selected ? "true" : "false"}
                aria-controls="panel-${spec.id}"
                tabindex=${selected ? "0" : "-1"}
                @click=${() => {
        this.activeId = spec.id;
      }}
                @keydown=${(e5) => this.handleTabKeydown(e5, idx)}
              >
                <span aria-hidden="true">${selected ? "\u2726" : "\u25CB"}</span>
                <span>${spec.tabLabel}</span>
              </button>
            `;
    })}
        </div>

        <div
          role="tabpanel"
          id="panel-${active.id}"
          aria-labelledby="tab-${active.id}"
          class="panel-grid"
        >
          <div>
            <h3 class="panel-heading">${active.heading}</h3>
            <p class="tagline">${active.tagline}</p>
            <p class="when-used">${active.whenUsed}</p>
            <ul class="anatomy-list">
              ${active.signpostAnatomy.map((item) => b2`<li>${item}</li>`)}
            </ul>
            <span class="example-pill">${active.exampleNote}</span>
          </div>

          <div class="art-pair">
            <figure class="art-card">
              <img src=${active.emblemUrl} alt=${active.emblemAlt} width="175" height="175" loading="lazy" />
              <figcaption class="art-caption">Imprint Crest</figcaption>
            </figure>
            <figure class="art-card">
              <img src=${active.sealUrl} alt=${active.sealAlt} width="175" height="175" loading="lazy" />
              <figcaption class="art-caption">Book Cover Medallion</figcaption>
            </figure>
          </div>
        </div>
      </div>
    `;
  }
};
CrossroadsSealExplorer.styles = i`
    @layer component {
      :host {
        display: block;
        container-type: inline-size;

        --_bg: var(--cr-surface, #ffffff);
        --_bg-raised: var(--cr-brass-surface, #fdf5e6);
        --_ink: var(--cr-ink, #0c222b);
        --_muted: var(--cr-ink-muted, #244552);
        --_brass: var(--cr-brass, #6e4309);
        --_border: var(--cr-border, #5a7682);
        --_focus: var(--cr-focus, #0b5cab);
        --_badge-bg: var(--cr-badge-bg, #0c3b47);
        --_badge-fg: var(--cr-badge-fg, #fde6be);
      }

      .explorer-box {
        background-color: var(--_bg);
        color: var(--_ink);
        border: 2px solid var(--_border);
        border-radius: 1rem;
        padding: clamp(1.15rem, 3vw, 1.85rem);
      }

      .tablist {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1.5px solid var(--_border);
      }

      .tab-btn {
        font: inherit;
        color: var(--_ink);
        background-color: var(--_bg-raised);
        border: 2px solid var(--_border);
        border-radius: 0.65rem;
        min-height: 44px;
        padding: 0.55rem 1.1rem;
        font-weight: 700;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
      }

      .tab-btn[aria-selected="true"] {
        background-color: var(--_badge-bg);
        color: var(--_badge-fg);
      }

      .tab-btn:focus-visible {
        outline: 3px solid var(--_focus);
        outline-offset: 3px;
      }

      .panel-grid {
        display: grid;
        gap: 1.5rem;
        align-items: center;
        grid-template-columns: 1fr;
      }

      @container (min-width: 44rem) {
        .panel-grid {
          grid-template-columns: 1.05fr 0.95fr;
        }
      }

      .panel-heading {
        font-family: var(--cr-font-display, Georgia, serif);
        font-size: clamp(1.3rem, 2.3vw, 1.65rem);
        margin: 0 0 0.4rem;
      }

      .tagline {
        font-weight: 700;
        color: var(--_brass);
        margin: 0 0 0.85rem;
      }

      .when-used {
        margin: 0 0 1rem;
        line-height: 1.65;
      }

      .anatomy-list {
        margin: 0 0 1rem;
        padding-left: 1.25rem;
      }

      .anatomy-list li {
        margin-bottom: 0.45rem;
        color: var(--_muted);
      }

      .example-pill {
        display: inline-block;
        padding: 0.4rem 0.8rem;
        border-radius: 0.5rem;
        background-color: var(--_bg-raised);
        border: 1.5px solid var(--_border);
        font-size: 0.88rem;
        font-weight: 600;
      }

      .art-pair {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .art-card {
        margin: 0;
        background-color: #081521;
        color: #f3f7f9;
        border: 2px solid var(--_border);
        border-radius: 0.85rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 0.65rem;
      }

      .art-card img {
        width: 100%;
        max-width: 175px;
        aspect-ratio: 1 / 1;
        object-fit: contain;
        border-radius: 0.5rem;
      }

      .art-caption {
        font-size: 0.82rem;
        font-weight: 600;
        color: #fde6be;
      }

      @media (forced-colors: active) {
        .explorer-box,
        .tab-btn,
        .example-pill {
          background-color: Canvas;
          color: CanvasText;
          border-color: ButtonBorder;
        }
        .tab-btn[aria-selected="true"] {
          background-color: Highlight;
          color: HighlightText;
        }
      }
    }
  `;
__decorateClass([
  r5()
], CrossroadsSealExplorer.prototype, "activeId", 2);
CrossroadsSealExplorer = __decorateClass([
  t3("crossroads-seal-explorer")
], CrossroadsSealExplorer);

// src/islands/theme-toggle.ts
var STORAGE_KEY = "color-scheme";
function getSystemScheme() {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}
function getStoredOverride() {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val === "light" || val === "dark" ? val : null;
  } catch {
    return null;
  }
}
function applyMetaColorScheme(value) {
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) {
    meta.content = value ?? "light dark";
  }
}
function initReadingLightControl() {
  const button = document.getElementById("cr-reading-light-toggle");
  if (button) {
    button.addEventListener("click", () => {
      const system = getSystemScheme();
      const stored = getStoredOverride();
      const currentlyRendered = stored ?? system;
      const target = currentlyRendered === "dark" ? "light" : "dark";
      if (target === system) {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
        }
        applyMetaColorScheme(null);
      } else {
        try {
          localStorage.setItem(STORAGE_KEY, target);
        } catch {
        }
        applyMetaColorScheme(target);
      }
    });
  }
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      const next = event.newValue === "light" || event.newValue === "dark" ? event.newValue : null;
      applyMetaColorScheme(next);
    }
  });
}

// src/islands/index.ts
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReadingLightControl);
} else {
  initReadingLightControl();
}
/**
 * @license MIT
 * ============================================================================
 * src/islands/crossroads-live-sandbox.ts — Lit 3 Interactive Crossroads Widget
 * Property: https://crossroads.raggiesoft.com (raggiesoft-crossroads)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL INTRO TO GOOGLE LIT 3 & WEB COMPONENTS):
 *   What is a Web Component (`<crossroads-live-sandbox>`)?
 *     The browser lets developers register brand-new HTML tags (always containing
 *     at least one hyphen, like `<crossroads-live-sandbox>`) backed by a JavaScript
 *     class extending `HTMLElement`—or here, **Lit 3's `LitElement`**.
 *
 *   Why use Lit 3 here instead of a plain `<button>`?
 *     Because this widget manages a multi-step branching story tree, tracks a
 *     live breadcrumb trail of reader choices, announces newly chosen scenes to
 *     screen readers via an internal `aria-live="polite"` status region, moves
 *     keyboard focus smoothly to the new scene heading (`tabindex="-1"`), and lets
 *     readers jump back to any prior Crossroads signpost with a single click!
 *
 *   Key Shadow DOM & Accessibility Rules Applied:
 *     1. `LitElement` creates an open Shadow Root (`mode: 'open'`), keeping all
 *        `aria-labelledby` and `id` relationships strictly inside the same tree.
 *     2. `:host` sets `display: block; container-type: inline-size;` and maps
 *        inherited `--cr-*` page tokens onto private `--_cr-*` aliases so both
 *        Light and Dark modes flow cleanly across the Shadow boundary without
 *        using non-standard `:host-context()`.
 *     3. Native `<button>` controls inside Shadow DOM explicitly declare
 *        `font: inherit; color: inherit;` so they inherit page typography rather
 *        than reverting to browser default system button fonts.
 * ============================================================================
 */
/**
 * @license MIT
 * ============================================================================
 * src/islands/crossroads-seal-explorer.ts — Lit 3 Medallion & Crest Inspector
 * Property: https://crossroads.raggiesoft.com (raggiesoft-crossroads)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL WAI-ARIA TABS INSIDE SHADOW DOM):
 *   What does `<crossroads-seal-explorer>` do?
 *     Every RaggieSoft Story Crossroads book cover carries one of two official
 *     Deep Compass Teal (`#0F4C5C`) and Warm Brass (`#E3B27C`) medallions:
 *       1. **2-Way Story Crossroads** (two-board signpost for binary Option A /
 *          Option B turning points).
 *       2. **3-Way Story Crossroads** (three-board signpost for multi-route
 *          turning points like *Cedar Run*).
 *
 *   How Accessible Keyboard Navigation Works Inside This Custom Element:
 *     - Implements the WAI-ARIA Tabs pattern (`role="tablist"`, `role="tab"`,
 *       `role="tabpanel"`) with ALL `id`, `aria-controls`, and `aria-labelledby`
 *       attributes kept strictly inside this component's open Shadow Root so
 *       relationships never break across the Shadow boundary!
 *     - Supports `ArrowLeft`, `ArrowRight`, `Home`, and `End` roving `tabindex`
 *       (`0` on the active tab, `-1` on inactive tabs) so keyboard users tab in
 *       with a single stop and switch seals effortlessly with arrow keys.
 * ============================================================================
 */
/**
 * @license MIT
 * ============================================================================
 * src/islands/theme-toggle.ts — Comfort Reading Light Toggle (`color-scheme`)
 * Property: https://crossroads.raggiesoft.com (raggiesoft-crossroads)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL PROGRESSIVE ENHANCEMENT GUIDE):
 *   How does our reading-light toggle work without breaking OS automatic themes?
 *     1. By default, `<meta name="color-scheme" content="light dark">` lets the
 *        visitor's operating system switch between Sunlit Parchment (`light`)
 *        during the day and Midnight Compass (`dark`) at night automatically.
 *     2. When the visitor clicks `#cr-reading-light-toggle`:
 *        - We inspect what is CURRENTLY rendered on screen (`stored ?? system`).
 *        - We compute the opposite scheme (`'dark'` or `'light'`).
 *        - If that target matches the current OS preference, the visitor is
 *          undoing an override—so we REMOVE `localStorage['color-scheme']` and
 *          restore `<meta content="light dark">` instead of invisibly pinning it!
 *        - Otherwise we store `'light'` or `'dark'` and update `<meta>`.
 *     3. A `window.addEventListener('storage', ...)` listener keeps multiple
 *        open `crossroads.raggiesoft.com` tabs in instant sync!
 * ============================================================================
 */
/**
 * @license MIT
 * ============================================================================
 * src/islands/index.ts — Client Entrypoint Bundled by esbuild for Lit 3 Islands
 * Property: https://crossroads.raggiesoft.com (raggiesoft-crossroads)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW:
 *   Importing our two Lit 3 Custom Element modules registers
 *   `<crossroads-live-sandbox>` and `<crossroads-seal-explorer>` with the
 *   browser's `customElements` registry, and `initReadingLightControl()` wires
 *   our progressive-enhancement comfort reading-light button!
 * ============================================================================
 */
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
