/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /gh/drew233/css@master/search.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
window.addEventListener("DOMContentLoaded", () => {
    console.log("Search begin");
    let e, t = !1, n = !0, r = "search.xml";
    0 === r.length ? r = "search.xml" : /json$/i.test(r) && (n = !1);
    const o = "/" + r, l = document.getElementById("search-input"), s = document.getElementById("search-result"),
        i = (e, t, n) => {
            let r = e.length;
            if (0 === r) return [];
            let o = 0, l = [], s = [];
            for (n || (t = t.toLowerCase(), e = e.toLowerCase()); (l = t.indexOf(e, o)) > -1;) s.push({
                position: l,
                word: e
            }), o = l + r;
            return s
        }, c = (e, t, n, r) => {
            let o = n[n.length - 1], l = o.position, s = o.word, i = [], c = 0;
            for (; l + s.length <= t && 0 !== n.length;) {
                s === r && c++, i.push({position: l, length: s.length});
                let e = l + s.length;
                for (n.pop(); 0 !== n.length && (l = (o = n[n.length - 1]).position, s = o.word, e > l);) n.pop()
            }
            return {hits: i, start: e, end: t, searchTextCount: c}
        }, a = (e, t) => {
            let n = "", r = t.start;
            return t.hits.forEach(t => {
                n += e.substring(r, t.position);
                let o = t.position + t.length;
                n += `<b class="search-keyword">${e.substring(t.position, o)}</b>`, r = o
            }), n += e.substring(r, t.end)
        }, h = () => {
            document.body.style.overflow = "hidden", document.querySelector(".search-pop-overlay").style.display = "block", document.querySelector(".popup").style.display = "block", document.getElementById("search-input").focus()
        }, u = () => {
            document.querySelector(".search-pop-overlay").style.display = "", document.querySelector(".search-pop-overlay").innerHTML = '<div class="search-loading-icon"><i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div>', (r => {
                fetch(o).then(e => e.text()).then(o => {
                    t = !0, e = n ? [...(new DOMParser).parseFromString(o, "text/xml").querySelectorAll("entry")].map(e => ({
                        title: e.querySelector("title").innerHTML,
                        content: e.querySelector("content").innerHTML,
                        url: e.querySelector("url").innerHTML
                    })) : JSON.parse(o), document.querySelector(".search-pop-overlay").innerHTML = "", document.body.style.overflow = "", r && r()
                })
            })(h)
        };
    l.addEventListener("input", () => {
        let t = l.value.trim().toLowerCase(), n = t.split(/[-\s]+/);
        n.length > 1 && n.push(t);
        let r = [];
        if (t.length > 0 && e.forEach(e => {
            if (!e.title) return;
            let o = 0, l = e.title.trim(), s = l.toLowerCase(),
                h = e.content ? e.content.trim().replace(/<[^>]+>/g, "") : "",
                u = (h = (e => String(e).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x3A;/g, ":").replace(/&#(\d+);/g, (e, t) => String.fromCharCode(t)).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"))(h)).toLowerCase(),
                p = decodeURIComponent(e.url).replace(/\/{2,}/g, "/"), d = [], g = [];
            if (n.forEach(e => {
                d = d.concat(i(e, s, !1)), g = g.concat(i(e, u, !1))
            }), d.length > 0 || g.length > 0) {
                let e = d.length + g.length;
                [d, g].forEach(e => {
                    e.sort((e, t) => t.position !== e.position ? t.position - e.position : e.word.length - t.word.length)
                });
                let n = [];
                if (0 !== d.length) {
                    let e = c(0, l.length, d, t);
                    o += e.searchTextCountInSlice, n.push(e)
                }
                let s = [];
                for (; 0 !== g.length;) {
                    let e = g[g.length - 1], n = e.position, r = e.word, l = n - 20, i = n + 80;
                    l < 0 && (l = 0), i < n + r.length && (i = n + r.length), i > h.length && (i = h.length);
                    let a = c(l, i, g, t);
                    o += a.searchTextCountInSlice, s.push(a)
                }
                s.sort((e, t) => e.searchTextCount !== t.searchTextCount ? t.searchTextCount - e.searchTextCount : e.hits.length !== t.hits.length ? t.hits.length - e.hits.length : e.start - t.start);
                let i = 10;
                i >= 0 && (s = s.slice(0, i));
                let u = "";
                0 !== n.length ? u += `<li><a href="${p}" class="search-result-title">${a(l, n[0])}</a>` : u += `<li><a href="${p}" class="search-result-title">${l}</a>`, s.forEach(e => {
                    u += `<a href="${p}"><p class="search-result">${a(h, e)}...</p></a>`
                }), u += "</li>", r.push({item: u, searchTextCount: o, hitCount: e, id: r.length})
            }
        }), 1 === n.length && "" === n[0]) s.innerHTML = '<div id="no-result"><i class="fa fa-search fa-5x"></i></div>'; else if (0 === r.length) s.innerHTML = '<div id="no-result"><i class="fa fa-frown-o fa-5x"></i></div>'; else {
            r.sort((e, t) => e.searchTextCount !== t.searchTextCount ? t.searchTextCount - e.searchTextCount : e.hitCount !== t.hitCount ? t.hitCount - e.hitCount : t.id - e.id);
            let e = '<ul class="search-result-list">';
            r.forEach(t => {
                e += t.item
            }), e += "</ul>", s.innerHTML = e, window.pjax && window.pjax.refresh(s)
        }
    }), document.querySelectorAll(".popup-trigger")[0].addEventListener("click", () => {
        !1 === t ? u() : h()
    }),document.querySelectorAll(".popup-trigger")[1].addEventListener("click", () => {
        !1 === t ? u() : h()
    });
    const p = () => {
        document.body.style.overflow = "", document.querySelector(".search-pop-overlay").style.display = "none", document.querySelector(".popup").style.display = "none"
    };
    document.querySelector(".search-pop-overlay").addEventListener("click", p), document.querySelector(".popup-btn-close").addEventListener("click", p), window.addEventListener("pjax:success", p), window.addEventListener("keyup", e => {
        27 === e.which && p()
    })
});
//# sourceMappingURL=/sm/12f1c30458d561a7e0887b54f44ec46a4077bbd530edfcb2284c195d5001c42f.map