webpackHotUpdate("static/development/pages/index.js",{

/***/ "./modules/apolloClient.js":
/*!*********************************!*\
  !*** ./modules/apolloClient.js ***!
  \*********************************/
/*! exports provided: client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "client", function() { return client; });
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-link-http */ "./node_modules/apollo-link-http/lib/bundle.esm.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/isomorphic-unfetch/browser.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__);
var _require = __webpack_require__(/*! apollo-client */ "./node_modules/apollo-client/bundle.esm.js"),
    ApolloClient = _require.ApolloClient;

var _require2 = __webpack_require__(/*! apollo-cache-inmemory */ "./node_modules/apollo-cache-inmemory/lib/bundle.esm.js"),
    InMemoryCache = _require2.InMemoryCache;



var client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: process.browse,
  link: Object(apollo_link_http__WEBPACK_IMPORTED_MODULE_0__["createHttpLink"])({
    // uri: "https://api.wdnsolutions.com",
    uri: "http://localhost:4000",
    fetch:  true ? window.fetch : undefined
  })
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ })

})
//# sourceMappingURL=index.js.b5c52b2f7ac15d0b4274.hot-update.js.map