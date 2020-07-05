(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Sponsors.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Sponsors.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
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
      sponsors: {},
      designations: {},
      form: new vform__WEBPACK_IMPORTED_MODULE_0___default.a({
        id: '',
        name: '',
        description: '',
        created_by: '',
        image: 'no_image.png'
      })
    };
  },
  methods: {
    getResults: function getResults() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('api/sponsor?page=' + page).then(function (response) {
        _this.sponsors = response.data;
      });
    },
    getUploadImage: function getUploadImage() {
      var image = this.form.image.length > 200 ? this.form.image : "img/sponsor/" + this.form.image;
      return image;
    },
    getImage: function getImage() {
      var prefix = this.form.image.match(/\//) ? '' : '/img/sponsor/';
      return prefix + this.form.image;
    },
    updateImage: function updateImage(e) {
      var _this2 = this;

      // console.log('uploading');
      var file = e.target.files[0];
      var reader = new FileReader(); // console.log(file);

      if (file['size'] < 2111775) {
        reader.onloadend = function (file) {
          _this2.form.image = reader.result;
        };

        reader.readAsDataURL(file);
      } else {
        this.notifyMe("error", "Image must be less than 2MB ");
      }
    },
    updateData: function updateData() {
      var _this3 = this;

      this.$Progress.start();
      this.form.put('api/sponsor/' + this.form.id).then(function () {
        Fire.$emit('AfterCreate');
        $('#addDataModal').modal('hide');
        var name = $("input[name='name']").val();
        name = '"' + name + '" updated successfull';

        _this3.notifyMe("success", name);

        _this3.$Progress.finish();
      })["catch"](function () {
        _this3.$Progress.fail();
      });
    },
    addModal: function addModal() {
      this.editMode = false;
      this.form.reset();
      $('#addDataModal').modal('show');
    },
    editModal: function editModal(sponsor) {
      this.editMode = true;
      this.form.reset();
      $('#addDataModal').modal('show');
      this.form.fill(sponsor);
    },
    showModal: function showModal(sponsor) {
      this.form.reset();
      $('#showDataModal').modal('show');
      this.form.fill(sponsor);
    },
    loadsponsors: function loadsponsors() {
      var _this4 = this;

      axios.get("api/sponsor").then(function (_ref) {
        var data = _ref.data;
        return _this4.sponsors = data;
      });
    },
    deletesponsor: function deletesponsor(id, name) {
      var _this5 = this;

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
          _this5.form["delete"]('api/sponsor/' + id).then(function () {
            name = '"' + name + '" deleted successfull';

            _this5.notifyMe("success", name);

            Fire.$emit('AfterCreate');
          })["catch"](function () {
            swal("Failed!", "There was something wrong", "warning");
          });
        }
      });
    },
    createData: function createData() {
      var _this6 = this;

      this.$Progress.start();
      this.form.post('api/sponsor').then(function () {
        Fire.$emit('AfterCreate');
        $('#addDataModal').modal('hide');
        var name = $("input[name='name']").val();
        name = '"' + name + '" added successfull';

        _this6.notifyMe("success", name);

        _this6.$Progress.finish();
      })["catch"](function () {
        _this6.$Progress.fail();
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
    var _this7 = this;

    this.loadsponsors();
    Fire.$on('AfterCreate', function () {
      _this7.loadsponsors();
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Sponsors.vue?vue&type=template&id=2f99bf90&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Sponsors.vue?vue&type=template&id=2f99bf90& ***!
  \******************************************************************************************************************************************************************************************************/
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
        _c("h4", { staticClass: "page-title" }, [_vm._v("Sponsors")]),
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
              _c("router-link", { attrs: { to: "/sponsors" } }, [
                _vm._v("Sponsors")
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
                  _vm._v("Add Sponsor")
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
                      "\n                               Add Sponsor\n                           "
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
                      _vm._l(_vm.sponsors.data, function(sponsor) {
                        return _c("tr", { key: sponsor.id }, [
                          _c("td", [
                            _vm._v(_vm._s(_vm._f("upText")(sponsor.name)))
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(sponsor.description))]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(_vm._s(_vm._f("myDate")(sponsor.created_at)))
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
                                              return _vm.editModal(sponsor)
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
                                              return _vm.showModal(sponsor)
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
                                              return _vm.deletesponsor(
                                                sponsor.id,
                                                sponsor.name
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
                  attrs: { data: _vm.sponsors },
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
                  [_vm._v("Add sponsor")]
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
                  [_vm._v("Update sponsor")]
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
                  _c(
                    "div",
                    { staticClass: "modal-body" },
                    [
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
                            class: {
                              "is-invalid": _vm.form.errors.has("name")
                            },
                            attrs: {
                              placeholder: "Enter sponsor Name",
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
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "form-group" },
                        [
                          _c("textarea", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.form.description,
                                expression: "form.description"
                              }
                            ],
                            staticClass: "form-control",
                            class: {
                              "is-invalid": _vm.form.errors.has("description")
                            },
                            attrs: {
                              placeholder: "Enter Description",
                              rows: "5",
                              id: "description",
                              type: "text",
                              name: "description"
                            },
                            domProps: { value: _vm.form.description },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.form,
                                  "description",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("has-error", {
                            attrs: { form: _vm.form, field: "description" }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "form-group" },
                        [
                          _c("input", {
                            staticClass: "form-control-file",
                            class: {
                              "is-invalid": _vm.form.errors.has("image")
                            },
                            attrs: {
                              type: "file",
                              id: "image",
                              name: "image",
                              accept: "image/*"
                            },
                            on: { change: _vm.updateImage }
                          }),
                          _vm._v(" "),
                          _c("has-error", {
                            attrs: { form: _vm.form, field: "image" }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("span"),
                      _vm._v(" "),
                      _c("center", [
                        _c("img", {
                          staticClass: "proImage",
                          attrs: {
                            id: "blah",
                            src: _vm.getUploadImage(),
                            height: "64",
                            width: "64",
                            alt: "your image"
                          }
                        })
                      ])
                    ],
                    1
                  ),
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
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                    }
                  }
                },
                [
                  _c(
                    "div",
                    { staticClass: "modal-body" },
                    [
                      _c("strong", [
                        _vm._v("Sponsor Name: " + _vm._s(_vm.form.name))
                      ]),
                      _vm._v(" "),
                      _c("hr"),
                      _vm._v(" "),
                      _c("strong", [
                        _vm._v("Description: " + _vm._s(_vm.form.description))
                      ]),
                      _vm._v(" "),
                      _c("hr"),
                      _vm._v(" "),
                      _c("center", [
                        _c("img", {
                          staticClass: "proImage",
                          attrs: {
                            id: "blah",
                            src: _vm.getImage(),
                            height: "64",
                            width: "64",
                            alt: "your image"
                          }
                        })
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._m(6)
                ]
              )
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
        _c("th", [_vm._v("Description")]),
        _vm._v(" "),
        _c("th", [_vm._v("Created At")]),
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
        _c("th", [_vm._v("Description")]),
        _vm._v(" "),
        _c("th", [_vm._v("Created At")]),
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
        [_vm._v("Show sponsor")]
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

/***/ "./resources/js/views/Sponsors.vue":
/*!*****************************************!*\
  !*** ./resources/js/views/Sponsors.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sponsors_vue_vue_type_template_id_2f99bf90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sponsors.vue?vue&type=template&id=2f99bf90& */ "./resources/js/views/Sponsors.vue?vue&type=template&id=2f99bf90&");
/* harmony import */ var _Sponsors_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sponsors.vue?vue&type=script&lang=js& */ "./resources/js/views/Sponsors.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sponsors_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sponsors_vue_vue_type_template_id_2f99bf90___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Sponsors_vue_vue_type_template_id_2f99bf90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Sponsors.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Sponsors.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/views/Sponsors.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sponsors_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Sponsors.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Sponsors.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sponsors_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Sponsors.vue?vue&type=template&id=2f99bf90&":
/*!************************************************************************!*\
  !*** ./resources/js/views/Sponsors.vue?vue&type=template&id=2f99bf90& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sponsors_vue_vue_type_template_id_2f99bf90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Sponsors.vue?vue&type=template&id=2f99bf90& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Sponsors.vue?vue&type=template&id=2f99bf90&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sponsors_vue_vue_type_template_id_2f99bf90___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sponsors_vue_vue_type_template_id_2f99bf90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);