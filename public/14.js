(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Img_categories.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Img_categories.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vform */ "./node_modules/vform/dist/vform.common.js");
/* harmony import */ var vform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vform__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      editMode: false,
      img_categories: {},
      form: new vform__WEBPACK_IMPORTED_MODULE_0___default.a({
        id: '',
        name: ''
      })
    };
  },
  methods: {
    getResults: function getResults() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('api/img_category?page=' + page).then(function (response) {
        _this.img_categories = response.data;
      });
    },
    updateData: function updateData() {
      var _this2 = this;

      this.$Progress.start();
      this.form.put('api/img_category/' + this.form.id).then(function () {
        Fire.$emit('AfterCreate');
        $('#addDataModal').modal('hide');
        var name = $("input[name='name']").val();
        name = '"' + name + '" updated successfull';

        _this2.notifyMe("success", name);

        _this2.$Progress.finish();
      })["catch"](function () {
        _this2.$Progress.fail();
      });
    },
    addModal: function addModal() {
      this.editMode = false;
      this.form.reset();
      $('#addDataModal').modal('show');
    },
    editModal: function editModal(img_category) {
      this.editMode = true;
      this.form.reset();
      $('#addDataModal').modal('show');
      this.form.fill(img_category);
    },
    showModal: function showModal(img_category) {
      this.form.reset();
      $('#showDataModal').modal('show');
      this.form.fill(img_category);
    },
    load_img_categories: function load_img_categories() {
      var _this3 = this;

      axios.get("api/img_category").then(function (_ref) {
        var data = _ref.data;
        return _this3.img_categories = data;
      });
    },
    deleteimg_category: function deleteimg_category(id, name) {
      var _this4 = this;

      sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value) {
          _this4.form["delete"]('api/img_category/' + id).then(function () {
            name = '"' + name + '" deleted successfull';

            _this4.notifyMe("success", name);

            Fire.$emit('AfterCreate');
          })["catch"](function () {
            swal("Failed!", "There was something wrong", "warning");
          });
        }
      });
    },
    createData: function createData() {
      var _this5 = this;

      this.$Progress.start();
      this.form.post('api/img_category').then(function () {
        Fire.$emit('AfterCreate');
        $('#addDataModal').modal('hide');
        var name = $("input[name='name']").val();
        name = '"' + name + '" added successfull';

        _this5.notifyMe("success", name);

        _this5.$Progress.finish();
      })["catch"](function () {
        _this5.$Progress.fail();
      });
    },
    notifyMe: function notifyMe(ic, ti) {
      var Toast = sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: function onOpen(toast) {
          toast.addEventListener('mouseenter', sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.stopTimer);
          toast.addEventListener('mouseleave', sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.resumeTimer);
        }
      });
      Toast.fire({
        icon: ic,
        title: ti
      });
    }
  },
  created: function created() {
    var _this6 = this;

    this.load_img_categories();
    Fire.$on('AfterCreate', function () {
      _this6.load_img_categories();
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Img_categories.vue?vue&type=template&id=f2a55a12&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Img_categories.vue?vue&type=template&id=f2a55a12& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content" }, [
    _c("div", { staticClass: "page-inner" }, [
      _c("div", { staticClass: "page-header" }, [
        _c("h4", { staticClass: "page-title" }, [_vm._v("Image Categories")]),
        _vm._v(" "),
        _c("ul", { staticClass: "breadcrumbs" }, [
          _c(
            "li",
            { staticClass: "nav-home" },
            [
              _c("router-link", { attrs: { to: "/" } }, [
                _c("i", { staticClass: "flaticon-home" })
              ])
            ],
            1
          ),
          _vm._v(" "),
          _vm._m(0),
          _vm._v(" "),
          _c(
            "li",
            { staticClass: "nav-item" },
            [
              _c("router-link", { attrs: { to: "/img_categories" } }, [
                _vm._v("Image Categories")
              ])
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-12" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v("Add Image Category")
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary btn-round ml-auto",
                    on: {
                      click: function($event) {
                        return _vm.addModal()
                      }
                    }
                  },
                  [
                    _c("i", { staticClass: "fa fa-plus" }),
                    _vm._v(
                      "\n                               Add Image Category\n                           "
                    )
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-body" }, [
              _c("div", { staticClass: "table-responsive" }, [
                _c(
                  "table",
                  {
                    staticClass: "display table table-striped table-hover",
                    attrs: { id: "multi-filter-select" }
                  },
                  [
                    _vm._m(1),
                    _vm._v(" "),
                    _vm._m(2),
                    _vm._v(" "),
                    _c(
                      "tbody",
                      _vm._l(_vm.img_categories.data, function(img_category) {
                        return _c("tr", { key: img_category.id }, [
                          _c("td", [
                            _vm._v(_vm._s(_vm._f("upText")(img_category.name)))
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _c(
                              "div",
                              { staticClass: "list-group-item-figure" },
                              [
                                _c("div", { staticClass: "dropdown" }, [
                                  _vm._m(3, true),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "dropdown-arrow" }),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "dropdown-menu dropdown-menu-right"
                                    },
                                    [
                                      _c(
                                        "a",
                                        {
                                          staticClass: "dropdown-item",
                                          on: {
                                            click: function($event) {
                                              return _vm.editModal(img_category)
                                            }
                                          }
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fa fa-edit"
                                          }),
                                          _vm._v(
                                            " Edit\n                                                       "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "a",
                                        {
                                          staticClass: "dropdown-item",
                                          on: {
                                            click: function($event) {
                                              return _vm.showModal(img_category)
                                            }
                                          }
                                        },
                                        [
                                          _c("i", { staticClass: "fa fa-eye" }),
                                          _vm._v(
                                            " show\n                                                       "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "a",
                                        {
                                          staticClass: "dropdown-item",
                                          on: {
                                            click: function($event) {
                                              return _vm.deleteimg_category(
                                                img_category.id,
                                                img_category.name
                                              )
                                            }
                                          }
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fa fa-trash"
                                          }),
                                          _vm._v(
                                            " Delete\n                                                       "
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                ])
                              ]
                            )
                          ])
                        ])
                      }),
                      0
                    )
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "card-footer" },
              [
                _c("pagination", {
                  attrs: { data: _vm.img_categories },
                  on: { "pagination-change-page": _vm.getResults }
                })
              ],
              1
            )
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "addDataModal",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "addDataModalLabel",
          "aria-hidden": "true"
        }
      },
      [
        _c(
          "div",
          { staticClass: "modal-dialog", attrs: { role: "document" } },
          [
            _c("div", { staticClass: "modal-content" }, [
              _c("div", { staticClass: "modal-header" }, [
                _c(
                  "h5",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !_vm.editMode,
                        expression: "!editMode"
                      }
                    ],
                    staticClass: "modal-title",
                    attrs: { id: "addDataModalLabel" }
                  },
                  [_vm._v("Add Image Category")]
                ),
                _vm._v(" "),
                _c(
                  "h5",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.editMode,
                        expression: "editMode"
                      }
                    ],
                    staticClass: "modal-title",
                    attrs: { id: "addDataModalLabel" }
                  },
                  [_vm._v("Update Image Category")]
                ),
                _vm._v(" "),
                _vm._m(4)
              ]),
              _vm._v(" "),
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      _vm.editMode ? _vm.updateData() : _vm.createData()
                    }
                  }
                },
                [
                  _c("div", { staticClass: "modal-body" }, [
                    _c(
                      "div",
                      { staticClass: "form-group" },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.form.name,
                              expression: "form.name"
                            }
                          ],
                          staticClass: "form-control",
                          class: { "is-invalid": _vm.form.errors.has("name") },
                          attrs: {
                            placeholder: "Enter img_category Name",
                            id: "name",
                            type: "text",
                            name: "name"
                          },
                          domProps: { value: _vm.form.name },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(_vm.form, "name", $event.target.value)
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("has-error", {
                          attrs: { form: _vm.form, field: "name" }
                        })
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "modal-footer" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-danger",
                        attrs: { "data-dismiss": "modal" }
                      },
                      [_vm._v("Close")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.editMode,
                            expression: "editMode"
                          }
                        ],
                        staticClass: "btn btn-primary",
                        attrs: { type: "submit" }
                      },
                      [_vm._v("Update")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !_vm.editMode,
                            expression: "!editMode"
                          }
                        ],
                        staticClass: "btn btn-primary",
                        attrs: { type: "submit" }
                      },
                      [_vm._v("Save")]
                    )
                  ])
                ]
              )
            ])
          ]
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "showDataModal",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "showDataModalLabel",
          "aria-hidden": "true"
        }
      },
      [
        _c(
          "div",
          { staticClass: "modal-dialog", attrs: { role: "document" } },
          [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(5),
              _vm._v(" "),
              _c("form", [
                _c("div", { staticClass: "modal-body" }, [
                  _c("strong", [
                    _vm._v("Image Category Name: " + _vm._s(_vm.form.name))
                  ])
                ]),
                _vm._v(" "),
                _vm._m(6)
              ])
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "separator" }, [
      _c("i", { staticClass: "flaticon-right-arrow" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", { staticStyle: { width: "5%" } })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tfoot", [
      _c("tr", [
        _c("th", [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", { staticStyle: { width: "5%" } })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "btn btn-dropdown", attrs: { "data-toggle": "dropdown" } },
      [_c("i", { staticClass: "fa fa-ellipsis-v" })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: { "data-dismiss": "modal", "aria-label": "Close" }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h5",
        { staticClass: "modal-title", attrs: { id: "showDataModalLabel" } },
        [_vm._v("Show Image Category")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: { "data-dismiss": "modal", "aria-label": "Close" }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-footer" }, [
      _c(
        "button",
        { staticClass: "btn btn-danger", attrs: { "data-dismiss": "modal" } },
        [_vm._v("Close")]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Img_categories.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/Img_categories.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Img_categories_vue_vue_type_template_id_f2a55a12___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Img_categories.vue?vue&type=template&id=f2a55a12& */ "./resources/js/views/Img_categories.vue?vue&type=template&id=f2a55a12&");
/* harmony import */ var _Img_categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Img_categories.vue?vue&type=script&lang=js& */ "./resources/js/views/Img_categories.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Img_categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Img_categories_vue_vue_type_template_id_f2a55a12___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Img_categories_vue_vue_type_template_id_f2a55a12___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Img_categories.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Img_categories.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/views/Img_categories.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Img_categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Img_categories.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Img_categories.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Img_categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Img_categories.vue?vue&type=template&id=f2a55a12&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/Img_categories.vue?vue&type=template&id=f2a55a12& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Img_categories_vue_vue_type_template_id_f2a55a12___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Img_categories.vue?vue&type=template&id=f2a55a12& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Img_categories.vue?vue&type=template&id=f2a55a12&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Img_categories_vue_vue_type_template_id_f2a55a12___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Img_categories_vue_vue_type_template_id_f2a55a12___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);