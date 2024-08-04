(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@figma-plugin/helpers/dist/helpers/clone.js
  var require_clone = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/clone.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = clone;
      function clone(val) {
        const type = typeof val;
        if (type === "undefined" || type === "number" || type === "string" || type === "boolean" || type === "symbol" || val === null) {
          return val;
        } else if (type === "object") {
          if (val instanceof Array) {
            return val.map(clone);
          } else if (val instanceof Uint8Array) {
            return new Uint8Array(val);
          } else {
            const o = {};
            for (const key in val) {
              o[key] = clone(val[key]);
            }
            return o;
          }
        }
        throw "unknown";
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/getAllFonts.js
  var require_getAllFonts = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/getAllFonts.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = getAllFonts;
      function getAllFonts(textNodes) {
        const fonts = [];
        const pushUnique = (font) => {
          if (!fonts.some((item) => item.family === font.family && item.style === font.style)) {
            fonts.push(font);
          }
        };
        for (const node of textNodes) {
          if (node.fontName === figma.mixed) {
            const len = node.characters.length;
            for (let i = 0; i < len; i++) {
              const font = node.getRangeFontName(i, i + 1);
              pushUnique(font);
            }
          } else {
            pushUnique(node.fontName);
          }
        }
        return fonts;
      }
    }
  });

  // node_modules/lodash/isUndefined.js
  var require_isUndefined = __commonJS({
    "node_modules/lodash/isUndefined.js"(exports, module) {
      function isUndefined(value) {
        return value === void 0;
      }
      module.exports = isUndefined;
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/applyMatrixToPoint.js
  var require_applyMatrixToPoint = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/applyMatrixToPoint.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.applyMatrixToPoint = applyMatrixToPoint;
      function applyMatrixToPoint(matrix, point) {
        return [point[0] * matrix[0][0] + point[1] * matrix[0][1] + matrix[0][2], point[0] * matrix[1][0] + point[1] * matrix[1][1] + matrix[1][2]];
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/getBoundingRect.js
  var require_getBoundingRect = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/getBoundingRect.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = getBoundingRect;
      var _isUndefined2 = _interopRequireDefault(require_isUndefined());
      var _applyMatrixToPoint = require_applyMatrixToPoint();
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function getBoundingRect(nodes) {
        const boundingRect = {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0,
          height: 0,
          width: 0
        };
        if (nodes.length) {
          const xy = nodes.reduce((rez, node) => {
            if (!node.absoluteTransform) {
              console.warn(`Provided node haven't "absoluteTransform" property, but it's required for calculations.`);
              return rez;
            }
            if ((0, _isUndefined2.default)(node.height) || (0, _isUndefined2.default)(node.width)) {
              console.warn(`Provided node haven't "width/height" property, but it's required for calculations.`);
              return rez;
            }
            const halfHeight = node.height / 2;
            const halfWidth = node.width / 2;
            const [[c0, s0, x], [s1, c1, y]] = node.absoluteTransform;
            const matrix = [[c0, s0, x + halfWidth * c0 + halfHeight * s0], [s1, c1, y + halfWidth * s1 + halfHeight * c1]];
            const XY = {
              x: [1, -1, 1, -1],
              y: [1, -1, -1, 1]
            };
            for (let i = 0; i <= 3; i++) {
              const a = (0, _applyMatrixToPoint.applyMatrixToPoint)(matrix, [XY.x[i] * halfWidth, XY.y[i] * halfHeight]);
              XY.x[i] = a[0];
              XY.y[i] = a[1];
            }
            XY.x.sort((a, b) => a - b);
            XY.y.sort((a, b) => a - b);
            rez.x.push(XY.x[0]);
            rez.y.push(XY.y[0]);
            rez.x2.push(XY.x[3]);
            rez.y2.push(XY.y[3]);
            return rez;
          }, {
            x: [],
            y: [],
            x2: [],
            y2: []
          });
          const rect = {
            x: Math.min(...xy.x),
            y: Math.min(...xy.y),
            x2: Math.max(...xy.x2),
            y2: Math.max(...xy.y2)
          };
          boundingRect.x = rect.x;
          boundingRect.y = rect.y;
          boundingRect.x2 = rect.x2;
          boundingRect.y2 = rect.y2;
          boundingRect.width = rect.x2 - rect.x;
          boundingRect.height = rect.y2 - rect.y;
        }
        return boundingRect;
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/getNodeIndex.js
  var require_getNodeIndex = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/getNodeIndex.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = getNodeIndex;
      function getNodeIndex(node) {
        return node.parent.children.indexOf(node);
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/isTypeNode.js
  var require_isTypeNode = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/isTypeNode.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.isOneOfNodeType = exports.isComponentNode = exports.isInstanceNode = exports.isTextNode = exports.isFrameNode = exports.isGroupNode = exports.isPageNode = void 0;
      var isPageNode = (node) => {
        return node.type === "PAGE";
      };
      exports.isPageNode = isPageNode;
      var isGroupNode = (node) => {
        return node.type === "GROUP";
      };
      exports.isGroupNode = isGroupNode;
      var isFrameNode = (node) => {
        return node.type === "FRAME";
      };
      exports.isFrameNode = isFrameNode;
      var isTextNode = (node) => {
        return node.type === "TEXT";
      };
      exports.isTextNode = isTextNode;
      var isInstanceNode = (node) => {
        return node.type === "INSTANCE";
      };
      exports.isInstanceNode = isInstanceNode;
      var isComponentNode = (node) => {
        return node.type === "COMPONENT";
      };
      exports.isComponentNode = isComponentNode;
      var isOneOfNodeType = (node, typeList) => {
        return typeList.includes(node.type);
      };
      exports.isOneOfNodeType = isOneOfNodeType;
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/getPage.js
  var require_getPage = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/getPage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = getPage;
      var _isTypeNode = require_isTypeNode();
      function getPage(node) {
        if (!(0, _isTypeNode.isPageNode)(node)) {
          return getPage(node.parent);
        } else {
          return node;
        }
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/hasChildren.js
  var require_hasChildren = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/hasChildren.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.hasChildren = void 0;
      var hasChildren = (node) => Boolean(node["children"]);
      exports.hasChildren = hasChildren;
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/isPartOfInstance.js
  var require_isPartOfInstance = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/isPartOfInstance.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isPartOfInstance;
      function isPartOfInstance(node) {
        const parent = node.parent;
        if (parent.type === "INSTANCE") {
          return true;
        } else if (parent.type === "PAGE") {
          return false;
        } else {
          return isPartOfInstance(parent);
        }
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/isPartOfNode.js
  var require_isPartOfNode = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/isPartOfNode.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isPartOfNode;
      function isPartOfNode(part, rootNode) {
        const parent = part.parent;
        if (parent === rootNode) {
          return true;
        } else if (parent.type === "PAGE") {
          return false;
        } else {
          return isPartOfNode(parent, rootNode);
        }
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/isVisibleNode.js
  var require_isVisibleNode = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/isVisibleNode.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = isVisibleNode;
      function isVisibleNode(node) {
        if (node && node.parent) {
          if (node.visible && node.parent.type !== "PAGE") {
            return isVisibleNode(node.parent);
          } else {
            return node.visible;
          }
        } else {
          return false;
        }
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/loadFonts.js
  var require_loadFonts = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/loadFonts.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = loadFonts;
      async function loadFonts(fonts) {
        const promises = fonts.map((font) => figma.loadFontAsync(font));
        await Promise.all(promises);
        return fonts;
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/loadUniqueFonts.js
  var require_loadUniqueFonts = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/loadUniqueFonts.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = loadUniqueFonts;
      var _getAllFonts = _interopRequireDefault(require_getAllFonts());
      var _loadFonts = _interopRequireDefault(require_loadFonts());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      async function loadUniqueFonts(textNodes) {
        const fonts = (0, _getAllFonts.default)(textNodes);
        return (0, _loadFonts.default)(fonts);
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/nodeToObject.js
  var require_nodeToObject = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/nodeToObject.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.nodeToObject = void 0;
      var nodeToObject2 = (node, withoutRelations) => {
        const props = Object.entries(Object.getOwnPropertyDescriptors(node.__proto__));
        const blacklist = ["parent", "children", "removed", "masterComponent"];
        const obj = {
          id: node.id,
          type: node.type
        };
        for (const [name, prop] of props) {
          if (prop.get && !blacklist.includes(name)) {
            try {
              if (typeof obj[name] === "symbol") {
                obj[name] = "Mixed";
              } else {
                obj[name] = prop.get.call(node);
              }
            } catch (err) {
              obj[name] = void 0;
            }
          }
        }
        if (node.parent && !withoutRelations) {
          obj.parent = {
            id: node.parent.id,
            type: node.parent.type
          };
        }
        if (node.children && !withoutRelations) {
          obj.children = node.children.map((child) => nodeToObject2(child, withoutRelations));
        }
        if (node.masterComponent && !withoutRelations) {
          obj.masterComponent = nodeToObject2(node.masterComponent, withoutRelations);
        }
        return obj;
      };
      exports.nodeToObject = nodeToObject2;
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/topLevelFrames.js
  var require_topLevelFrames = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/topLevelFrames.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = topLevelFrames;
      function topLevelFrames(page = figma.currentPage) {
        return page.children.filter((node) => node.type === "FRAME");
      }
    }
  });

  // node_modules/lodash/isArray.js
  var require_isArray = __commonJS({
    "node_modules/lodash/isArray.js"(exports, module) {
      var isArray = Array.isArray;
      module.exports = isArray;
    }
  });

  // node_modules/lodash/_freeGlobal.js
  var require_freeGlobal = __commonJS({
    "node_modules/lodash/_freeGlobal.js"(exports, module) {
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      module.exports = freeGlobal;
    }
  });

  // node_modules/lodash/_root.js
  var require_root = __commonJS({
    "node_modules/lodash/_root.js"(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      module.exports = root;
    }
  });

  // node_modules/lodash/_Symbol.js
  var require_Symbol = __commonJS({
    "node_modules/lodash/_Symbol.js"(exports, module) {
      var root = require_root();
      var Symbol2 = root.Symbol;
      module.exports = Symbol2;
    }
  });

  // node_modules/lodash/_getRawTag.js
  var require_getRawTag = __commonJS({
    "node_modules/lodash/_getRawTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      module.exports = getRawTag;
    }
  });

  // node_modules/lodash/_objectToString.js
  var require_objectToString = __commonJS({
    "node_modules/lodash/_objectToString.js"(exports, module) {
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      module.exports = objectToString;
    }
  });

  // node_modules/lodash/_baseGetTag.js
  var require_baseGetTag = __commonJS({
    "node_modules/lodash/_baseGetTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var getRawTag = require_getRawTag();
      var objectToString = require_objectToString();
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      module.exports = baseGetTag;
    }
  });

  // node_modules/lodash/isObjectLike.js
  var require_isObjectLike = __commonJS({
    "node_modules/lodash/isObjectLike.js"(exports, module) {
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      module.exports = isObjectLike;
    }
  });

  // node_modules/lodash/isSymbol.js
  var require_isSymbol = __commonJS({
    "node_modules/lodash/isSymbol.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var symbolTag = "[object Symbol]";
      function isSymbol2(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      module.exports = isSymbol2;
    }
  });

  // node_modules/lodash/_isKey.js
  var require_isKey = __commonJS({
    "node_modules/lodash/_isKey.js"(exports, module) {
      var isArray = require_isArray();
      var isSymbol2 = require_isSymbol();
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
      var reIsPlainProp = /^\w*$/;
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol2(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      module.exports = isKey;
    }
  });

  // node_modules/lodash/isObject.js
  var require_isObject = __commonJS({
    "node_modules/lodash/isObject.js"(exports, module) {
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      module.exports = isObject;
    }
  });

  // node_modules/lodash/isFunction.js
  var require_isFunction = __commonJS({
    "node_modules/lodash/isFunction.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObject = require_isObject();
      var asyncTag = "[object AsyncFunction]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var proxyTag = "[object Proxy]";
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      module.exports = isFunction;
    }
  });

  // node_modules/lodash/_coreJsData.js
  var require_coreJsData = __commonJS({
    "node_modules/lodash/_coreJsData.js"(exports, module) {
      var root = require_root();
      var coreJsData = root["__core-js_shared__"];
      module.exports = coreJsData;
    }
  });

  // node_modules/lodash/_isMasked.js
  var require_isMasked = __commonJS({
    "node_modules/lodash/_isMasked.js"(exports, module) {
      var coreJsData = require_coreJsData();
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      module.exports = isMasked;
    }
  });

  // node_modules/lodash/_toSource.js
  var require_toSource = __commonJS({
    "node_modules/lodash/_toSource.js"(exports, module) {
      var funcProto = Function.prototype;
      var funcToString = funcProto.toString;
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      module.exports = toSource;
    }
  });

  // node_modules/lodash/_baseIsNative.js
  var require_baseIsNative = __commonJS({
    "node_modules/lodash/_baseIsNative.js"(exports, module) {
      var isFunction = require_isFunction();
      var isMasked = require_isMasked();
      var isObject = require_isObject();
      var toSource = require_toSource();
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var reIsNative = RegExp(
        "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      module.exports = baseIsNative;
    }
  });

  // node_modules/lodash/_getValue.js
  var require_getValue = __commonJS({
    "node_modules/lodash/_getValue.js"(exports, module) {
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      module.exports = getValue;
    }
  });

  // node_modules/lodash/_getNative.js
  var require_getNative = __commonJS({
    "node_modules/lodash/_getNative.js"(exports, module) {
      var baseIsNative = require_baseIsNative();
      var getValue = require_getValue();
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      module.exports = getNative;
    }
  });

  // node_modules/lodash/_nativeCreate.js
  var require_nativeCreate = __commonJS({
    "node_modules/lodash/_nativeCreate.js"(exports, module) {
      var getNative = require_getNative();
      var nativeCreate = getNative(Object, "create");
      module.exports = nativeCreate;
    }
  });

  // node_modules/lodash/_hashClear.js
  var require_hashClear = __commonJS({
    "node_modules/lodash/_hashClear.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      module.exports = hashClear;
    }
  });

  // node_modules/lodash/_hashDelete.js
  var require_hashDelete = __commonJS({
    "node_modules/lodash/_hashDelete.js"(exports, module) {
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      module.exports = hashDelete;
    }
  });

  // node_modules/lodash/_hashGet.js
  var require_hashGet = __commonJS({
    "node_modules/lodash/_hashGet.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
      }
      module.exports = hashGet;
    }
  });

  // node_modules/lodash/_hashHas.js
  var require_hashHas = __commonJS({
    "node_modules/lodash/_hashHas.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
      }
      module.exports = hashHas;
    }
  });

  // node_modules/lodash/_hashSet.js
  var require_hashSet = __commonJS({
    "node_modules/lodash/_hashSet.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
      }
      module.exports = hashSet;
    }
  });

  // node_modules/lodash/_Hash.js
  var require_Hash = __commonJS({
    "node_modules/lodash/_Hash.js"(exports, module) {
      var hashClear = require_hashClear();
      var hashDelete = require_hashDelete();
      var hashGet = require_hashGet();
      var hashHas = require_hashHas();
      var hashSet = require_hashSet();
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      module.exports = Hash;
    }
  });

  // node_modules/lodash/_listCacheClear.js
  var require_listCacheClear = __commonJS({
    "node_modules/lodash/_listCacheClear.js"(exports, module) {
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      module.exports = listCacheClear;
    }
  });

  // node_modules/lodash/eq.js
  var require_eq = __commonJS({
    "node_modules/lodash/eq.js"(exports, module) {
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      module.exports = eq;
    }
  });

  // node_modules/lodash/_assocIndexOf.js
  var require_assocIndexOf = __commonJS({
    "node_modules/lodash/_assocIndexOf.js"(exports, module) {
      var eq = require_eq();
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      module.exports = assocIndexOf;
    }
  });

  // node_modules/lodash/_listCacheDelete.js
  var require_listCacheDelete = __commonJS({
    "node_modules/lodash/_listCacheDelete.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      var arrayProto = Array.prototype;
      var splice = arrayProto.splice;
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      module.exports = listCacheDelete;
    }
  });

  // node_modules/lodash/_listCacheGet.js
  var require_listCacheGet = __commonJS({
    "node_modules/lodash/_listCacheGet.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      module.exports = listCacheGet;
    }
  });

  // node_modules/lodash/_listCacheHas.js
  var require_listCacheHas = __commonJS({
    "node_modules/lodash/_listCacheHas.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      module.exports = listCacheHas;
    }
  });

  // node_modules/lodash/_listCacheSet.js
  var require_listCacheSet = __commonJS({
    "node_modules/lodash/_listCacheSet.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      module.exports = listCacheSet;
    }
  });

  // node_modules/lodash/_ListCache.js
  var require_ListCache = __commonJS({
    "node_modules/lodash/_ListCache.js"(exports, module) {
      var listCacheClear = require_listCacheClear();
      var listCacheDelete = require_listCacheDelete();
      var listCacheGet = require_listCacheGet();
      var listCacheHas = require_listCacheHas();
      var listCacheSet = require_listCacheSet();
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      module.exports = ListCache;
    }
  });

  // node_modules/lodash/_Map.js
  var require_Map = __commonJS({
    "node_modules/lodash/_Map.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var Map = getNative(root, "Map");
      module.exports = Map;
    }
  });

  // node_modules/lodash/_mapCacheClear.js
  var require_mapCacheClear = __commonJS({
    "node_modules/lodash/_mapCacheClear.js"(exports, module) {
      var Hash = require_Hash();
      var ListCache = require_ListCache();
      var Map = require_Map();
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map || ListCache)(),
          "string": new Hash()
        };
      }
      module.exports = mapCacheClear;
    }
  });

  // node_modules/lodash/_isKeyable.js
  var require_isKeyable = __commonJS({
    "node_modules/lodash/_isKeyable.js"(exports, module) {
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      module.exports = isKeyable;
    }
  });

  // node_modules/lodash/_getMapData.js
  var require_getMapData = __commonJS({
    "node_modules/lodash/_getMapData.js"(exports, module) {
      var isKeyable = require_isKeyable();
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      module.exports = getMapData;
    }
  });

  // node_modules/lodash/_mapCacheDelete.js
  var require_mapCacheDelete = __commonJS({
    "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheDelete(key) {
        var result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      module.exports = mapCacheDelete;
    }
  });

  // node_modules/lodash/_mapCacheGet.js
  var require_mapCacheGet = __commonJS({
    "node_modules/lodash/_mapCacheGet.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      module.exports = mapCacheGet;
    }
  });

  // node_modules/lodash/_mapCacheHas.js
  var require_mapCacheHas = __commonJS({
    "node_modules/lodash/_mapCacheHas.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      module.exports = mapCacheHas;
    }
  });

  // node_modules/lodash/_mapCacheSet.js
  var require_mapCacheSet = __commonJS({
    "node_modules/lodash/_mapCacheSet.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
      }
      module.exports = mapCacheSet;
    }
  });

  // node_modules/lodash/_MapCache.js
  var require_MapCache = __commonJS({
    "node_modules/lodash/_MapCache.js"(exports, module) {
      var mapCacheClear = require_mapCacheClear();
      var mapCacheDelete = require_mapCacheDelete();
      var mapCacheGet = require_mapCacheGet();
      var mapCacheHas = require_mapCacheHas();
      var mapCacheSet = require_mapCacheSet();
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      module.exports = MapCache;
    }
  });

  // node_modules/lodash/memoize.js
  var require_memoize = __commonJS({
    "node_modules/lodash/memoize.js"(exports, module) {
      var MapCache = require_MapCache();
      var FUNC_ERROR_TEXT = "Expected a function";
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result) || cache;
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      module.exports = memoize;
    }
  });

  // node_modules/lodash/_memoizeCapped.js
  var require_memoizeCapped = __commonJS({
    "node_modules/lodash/_memoizeCapped.js"(exports, module) {
      var memoize = require_memoize();
      var MAX_MEMOIZE_SIZE = 500;
      function memoizeCapped(func) {
        var result = memoize(func, function(key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }
          return key;
        });
        var cache = result.cache;
        return result;
      }
      module.exports = memoizeCapped;
    }
  });

  // node_modules/lodash/_stringToPath.js
  var require_stringToPath = __commonJS({
    "node_modules/lodash/_stringToPath.js"(exports, module) {
      var memoizeCapped = require_memoizeCapped();
      var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = memoizeCapped(function(string) {
        var result = [];
        if (string.charCodeAt(0) === 46) {
          result.push("");
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        });
        return result;
      });
      module.exports = stringToPath;
    }
  });

  // node_modules/lodash/_arrayMap.js
  var require_arrayMap = __commonJS({
    "node_modules/lodash/_arrayMap.js"(exports, module) {
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      module.exports = arrayMap;
    }
  });

  // node_modules/lodash/_baseToString.js
  var require_baseToString = __commonJS({
    "node_modules/lodash/_baseToString.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var arrayMap = require_arrayMap();
      var isArray = require_isArray();
      var isSymbol2 = require_isSymbol();
      var INFINITY = 1 / 0;
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol2(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      module.exports = baseToString;
    }
  });

  // node_modules/lodash/toString.js
  var require_toString = __commonJS({
    "node_modules/lodash/toString.js"(exports, module) {
      var baseToString = require_baseToString();
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      module.exports = toString;
    }
  });

  // node_modules/lodash/_castPath.js
  var require_castPath = __commonJS({
    "node_modules/lodash/_castPath.js"(exports, module) {
      var isArray = require_isArray();
      var isKey = require_isKey();
      var stringToPath = require_stringToPath();
      var toString = require_toString();
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      module.exports = castPath;
    }
  });

  // node_modules/lodash/_toKey.js
  var require_toKey = __commonJS({
    "node_modules/lodash/_toKey.js"(exports, module) {
      var isSymbol2 = require_isSymbol();
      var INFINITY = 1 / 0;
      function toKey(value) {
        if (typeof value == "string" || isSymbol2(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      module.exports = toKey;
    }
  });

  // node_modules/lodash/_baseGet.js
  var require_baseGet = __commonJS({
    "node_modules/lodash/_baseGet.js"(exports, module) {
      var castPath = require_castPath();
      var toKey = require_toKey();
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : void 0;
      }
      module.exports = baseGet;
    }
  });

  // node_modules/lodash/get.js
  var require_get = __commonJS({
    "node_modules/lodash/get.js"(exports, module) {
      var baseGet = require_baseGet();
      function get(object, path, defaultValue) {
        var result = object == null ? void 0 : baseGet(object, path);
        return result === void 0 ? defaultValue : result;
      }
      module.exports = get;
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/getCSSStyles.js
  var require_getCSSStyles = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/getCSSStyles.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getTextNodeCSS = void 0;
      var _get2 = _interopRequireDefault(require_get());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var stringValueToCss = (value) => {
        if (/right|bottom/i.test(value)) {
          return "flex-end";
        } else if (/left|top/i.test(value)) {
          return "flex-start";
        } else if (/center/i.test(value)) {
          return "center";
        } else if (/lower/i.test(value)) {
          return "lowercase";
        } else if (/upper/i.test(value)) {
          return "uppercase";
        } else if (/title/i.test(value)) {
          return "capitalize";
        } else {
          return "none";
        }
      };
      var unitValueToCss = ({
        unit,
        value
      }) => {
        if (unit === "PERCENT") {
          return `${value}%`;
        } else if (unit === "PIXELS") {
          return `${value}px`;
        } else {
          return "auto";
        }
      };
      var isUnitValue = (obj) => {
        return obj.hasOwnProperty("unit");
      };
      var getStyleValue = (node, key, exactString) => {
        const value = (0, _get2.default)(node, key);
        if (value === void 0) {
          return null;
        } else if (typeof value === "string") {
          return exactString ? value.toLowerCase().trim() : stringValueToCss(value.toLowerCase().trim());
        } else if (typeof value === "number") {
          return `${value}px`;
        } else if (isUnitValue(value)) {
          return unitValueToCss(value);
        } else {
          console.warn("Unexpected value: ", value);
        }
      };
      var getTextNodeCSS = (node) => {
        return {
          position: "absolute",
          top: getStyleValue(node, "y"),
          left: getStyleValue(node, "x"),
          width: getStyleValue(node, "width"),
          height: getStyleValue(node, "height"),
          display: "flex",
          "justify-content": getStyleValue(node, "textAlignHorizontal"),
          "align-items": getStyleValue(node, "textAlignVertical"),
          "text-indent": getStyleValue(node, "paragraphIndent"),
          "letter-spacing": getStyleValue(node, "letterSpacing"),
          "line-height": getStyleValue(node, "lineHeight"),
          "font-size": getStyleValue(node, "fontSize"),
          "font-style": getStyleValue(node, "fontName.style", true),
          "font-weight": getStyleValue(node, "fontName.style", true),
          "text-decoration": getStyleValue(node, "textDecoration", true),
          "text-transform": getStyleValue(node, "textCase"),
          "font-family": `${getStyleValue(node, "fontName.family", true)} ${getStyleValue(node, "fontName.style", true)}`
        };
      };
      exports.getTextNodeCSS = getTextNodeCSS;
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/findMethods.js
  var require_findMethods = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/findMethods.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.findAll = void 0;
      var _ = require_dist();
      var findAll = (nodes, iteratee) => {
        const result = [];
        for (let i = 0; i < nodes.length; i++) {
          if (iteratee(nodes[i], i, nodes)) {
            result.push(nodes[i]);
          } else if ((0, _.hasChildren)(nodes[i])) {
            result.push(...findAll(nodes[i]["children"], iteratee));
          }
        }
        return result;
      };
      exports.findAll = findAll;
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/getRelativePosition.js
  var require_getRelativePosition = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/getRelativePosition.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getRelativePosition = exports.getTopLevelParent = void 0;
      var _ = require_dist();
      var getTopLevelParent = (node) => {
        if (node && node.parent && !(0, _.isPageNode)(node.parent)) {
          return getTopLevelParent(node.parent);
        } else {
          return node;
        }
      };
      exports.getTopLevelParent = getTopLevelParent;
      var getRelativePosition = (node, relativeNode) => {
        relativeNode = relativeNode || getTopLevelParent(node);
        return {
          x: Math.abs(Math.round(relativeNode.absoluteTransform[0][2] - node.absoluteTransform[0][2])),
          y: Math.abs(Math.round(relativeNode.absoluteTransform[1][2] - node.absoluteTransform[1][2]))
        };
      };
      exports.getRelativePosition = getRelativePosition;
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/convertColor.js
  var require_convertColor = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/convertColor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.figmaRGBToWebRGB = figmaRGBToWebRGB;
      exports.webRGBToFigmaRGB = webRGBToFigmaRGB;
      exports.figmaRGBToHex = figmaRGBToHex;
      exports.hexToFigmaRGB = hexToFigmaRGB;
      var namesRGB = ["r", "g", "b"];
      function figmaRGBToWebRGB(color) {
        const rgb = [];
        namesRGB.forEach((e, i) => {
          rgb[i] = Math.round(color[e] * 255);
        });
        if (color["a"] !== void 0)
          rgb[3] = Math.round(color["a"] * 100) / 100;
        return rgb;
      }
      function webRGBToFigmaRGB(color) {
        const rgb = {};
        namesRGB.forEach((e, i) => {
          rgb[e] = color[i] / 255;
        });
        if (color[3] !== void 0)
          rgb["a"] = color[3];
        return rgb;
      }
      function figmaRGBToHex(color) {
        let hex = "#";
        const rgb = figmaRGBToWebRGB(color);
        hex += ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
        if (rgb[3] !== void 0) {
          const a = Math.round(rgb[3] * 255).toString(16);
          if (a.length == 1) {
            hex += "0" + a;
          } else {
            if (a !== "ff")
              hex += a;
          }
        }
        return hex;
      }
      function hexToFigmaRGB(color) {
        let opacity = "";
        color = color.toLowerCase();
        if (color[0] === "#")
          color = color.slice(1);
        if (color.length === 3) {
          color = color.replace(/(.)(.)(.)?/g, "$1$1$2$2$3$3");
        } else if (color.length === 8) {
          const arr = color.match(/(.{6})(.{2})/);
          color = arr[1];
          opacity = arr[2];
        }
        const num = parseInt(color, 16);
        const rgb = [num >> 16, num >> 8 & 255, num & 255];
        if (opacity) {
          rgb.push(parseInt(opacity, 16) / 255);
          return webRGBToFigmaRGB(rgb);
        } else {
          return webRGBToFigmaRGB(rgb);
        }
      }
    }
  });

  // node_modules/matrix-inverse/matrix-inverse.js
  var require_matrix_inverse = __commonJS({
    "node_modules/matrix-inverse/matrix-inverse.js"(exports, module) {
      var Sylvester = {};
      Sylvester.Matrix = function() {
      };
      Sylvester.Matrix.create = function(elements) {
        var M = new Sylvester.Matrix();
        return M.setElements(elements);
      };
      Sylvester.Matrix.I = function(n) {
        var els = [], i = n, j;
        while (i--) {
          j = n;
          els[i] = [];
          while (j--) {
            els[i][j] = i === j ? 1 : 0;
          }
        }
        return Sylvester.Matrix.create(els);
      };
      Sylvester.Matrix.prototype = {
        dup: function() {
          return Sylvester.Matrix.create(this.elements);
        },
        isSquare: function() {
          var cols = this.elements.length === 0 ? 0 : this.elements[0].length;
          return this.elements.length === cols;
        },
        toRightTriangular: function() {
          if (this.elements.length === 0)
            return Sylvester.Matrix.create([]);
          var M = this.dup(), els;
          var n = this.elements.length, i, j, np = this.elements[0].length, p;
          for (i = 0; i < n; i++) {
            if (M.elements[i][i] === 0) {
              for (j = i + 1; j < n; j++) {
                if (M.elements[j][i] !== 0) {
                  els = [];
                  for (p = 0; p < np; p++) {
                    els.push(M.elements[i][p] + M.elements[j][p]);
                  }
                  M.elements[i] = els;
                  break;
                }
              }
            }
            if (M.elements[i][i] !== 0) {
              for (j = i + 1; j < n; j++) {
                var multiplier = M.elements[j][i] / M.elements[i][i];
                els = [];
                for (p = 0; p < np; p++) {
                  els.push(
                    p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * multiplier
                  );
                }
                M.elements[j] = els;
              }
            }
          }
          return M;
        },
        determinant: function() {
          if (this.elements.length === 0) {
            return 1;
          }
          if (!this.isSquare()) {
            return null;
          }
          var M = this.toRightTriangular();
          var det = M.elements[0][0], n = M.elements.length;
          for (var i = 1; i < n; i++) {
            det = det * M.elements[i][i];
          }
          return det;
        },
        isSingular: function() {
          return this.isSquare() && this.determinant() === 0;
        },
        augment: function(matrix) {
          if (this.elements.length === 0) {
            return this.dup();
          }
          var M = matrix.elements || matrix;
          if (typeof M[0][0] === "undefined") {
            M = Sylvester.Matrix.create(M).elements;
          }
          var T = this.dup(), cols = T.elements[0].length;
          var i = T.elements.length, nj = M[0].length, j;
          if (i !== M.length) {
            return null;
          }
          while (i--) {
            j = nj;
            while (j--) {
              T.elements[i][cols + j] = M[i][j];
            }
          }
          return T;
        },
        inverse: function() {
          if (this.elements.length === 0) {
            return null;
          }
          if (!this.isSquare() || this.isSingular()) {
            return null;
          }
          var n = this.elements.length, i = n, j;
          var M = this.augment(Sylvester.Matrix.I(n)).toRightTriangular();
          var np = M.elements[0].length, p, els, divisor;
          var inverse_elements = [], new_element;
          while (i--) {
            els = [];
            inverse_elements[i] = [];
            divisor = M.elements[i][i];
            for (p = 0; p < np; p++) {
              new_element = M.elements[i][p] / divisor;
              els.push(new_element);
              if (p >= n) {
                inverse_elements[i].push(new_element);
              }
            }
            M.elements[i] = els;
            j = i;
            while (j--) {
              els = [];
              for (p = 0; p < np; p++) {
                els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i]);
              }
              M.elements[j] = els;
            }
          }
          return Sylvester.Matrix.create(inverse_elements);
        },
        setElements: function(els) {
          var i, j, elements = els.elements || els;
          if (elements[0] && typeof elements[0][0] !== "undefined") {
            i = elements.length;
            this.elements = [];
            while (i--) {
              j = elements[i].length;
              this.elements[i] = [];
              while (j--) {
                this.elements[i][j] = elements[i][j];
              }
            }
            return this;
          }
          var n = elements.length;
          this.elements = [];
          for (i = 0; i < n; i++) {
            this.elements.push([elements[i]]);
          }
          return this;
        }
      };
      module.exports = function(elements) {
        return Sylvester.Matrix.create(elements).inverse().elements;
      };
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/extractImageCropParams.js
  var require_extractImageCropParams = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/extractImageCropParams.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.extractImageCropParams = extractImageCropParams;
      var _matrixInverse = _interopRequireDefault(require_matrix_inverse());
      var _applyMatrixToPoint = require_applyMatrixToPoint();
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function extractImageCropParams(shapeWidth, shapeHeight, t) {
        const transform = t.length === 2 ? [...t, [0, 0, 1]] : [...t];
        const mxInv = (0, _matrixInverse.default)(transform);
        const points = [[0, 0], [1, 0], [1, 1], [0, 1]].map((p) => (0, _applyMatrixToPoint.applyMatrixToPoint)(mxInv, p));
        const angle = Math.atan2(points[1][1] - points[0][1], points[1][0] - points[0][0]);
        const sx = Math.sqrt(Math.pow(points[1][0] - points[0][0], 2) + Math.pow(points[1][1] - points[0][1], 2));
        const sy = Math.sqrt(Math.pow(points[2][0] - points[1][0], 2) + Math.pow(points[2][1] - points[1][1], 2));
        return {
          rotation: angle * (180 / Math.PI),
          scale: [sx, sy],
          size: [sx * shapeWidth, sy * shapeHeight],
          position: [-points[0][0] * shapeWidth, -points[0][1] * shapeHeight]
        };
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/extractLinearGradientStartEnd.js
  var require_extractLinearGradientStartEnd = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/extractLinearGradientStartEnd.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.extractLinearGradientParamsFromTransform = extractLinearGradientParamsFromTransform;
      var _matrixInverse = _interopRequireDefault(require_matrix_inverse());
      var _applyMatrixToPoint = require_applyMatrixToPoint();
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function extractLinearGradientParamsFromTransform(shapeWidth, shapeHeight, t) {
        const transform = t.length === 2 ? [...t, [0, 0, 1]] : [...t];
        const mxInv = (0, _matrixInverse.default)(transform);
        const startEnd = [[0, 0.5], [1, 0.5]].map((p) => (0, _applyMatrixToPoint.applyMatrixToPoint)(mxInv, p));
        return {
          start: [startEnd[0][0] * shapeWidth, startEnd[0][1] * shapeHeight],
          end: [startEnd[1][0] * shapeWidth, startEnd[1][1] * shapeHeight]
        };
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/extractRadialOrDiamondGradientParams.js
  var require_extractRadialOrDiamondGradientParams = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/extractRadialOrDiamondGradientParams.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.extractRadialOrDiamondGradientParams = extractRadialOrDiamondGradientParams;
      var _matrixInverse = _interopRequireDefault(require_matrix_inverse());
      var _applyMatrixToPoint = require_applyMatrixToPoint();
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function extractRadialOrDiamondGradientParams(shapeWidth, shapeHeight, t) {
        const transform = t.length === 2 ? [...t, [0, 0, 1]] : [...t];
        const mxInv = (0, _matrixInverse.default)(transform);
        const centerPoint = (0, _applyMatrixToPoint.applyMatrixToPoint)(mxInv, [0.5, 0.5]);
        const rxPoint = (0, _applyMatrixToPoint.applyMatrixToPoint)(mxInv, [1, 0.5]);
        const ryPoint = (0, _applyMatrixToPoint.applyMatrixToPoint)(mxInv, [0.5, 1]);
        const rx = Math.sqrt(Math.pow(rxPoint[0] - centerPoint[0], 2) + Math.pow(rxPoint[1] - centerPoint[1], 2));
        const ry = Math.sqrt(Math.pow(ryPoint[0] - centerPoint[0], 2) + Math.pow(ryPoint[1] - centerPoint[1], 2));
        const angle = Math.atan((rxPoint[1] - centerPoint[1]) / (rxPoint[0] - centerPoint[0])) * (180 / Math.PI);
        return {
          rotation: angle,
          center: [centerPoint[0] * shapeWidth, centerPoint[1] * shapeHeight],
          radius: [rx * shapeWidth, ry * shapeHeight]
        };
      }
    }
  });

  // node_modules/lodash/_stackClear.js
  var require_stackClear = __commonJS({
    "node_modules/lodash/_stackClear.js"(exports, module) {
      var ListCache = require_ListCache();
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      module.exports = stackClear;
    }
  });

  // node_modules/lodash/_stackDelete.js
  var require_stackDelete = __commonJS({
    "node_modules/lodash/_stackDelete.js"(exports, module) {
      function stackDelete(key) {
        var data = this.__data__, result = data["delete"](key);
        this.size = data.size;
        return result;
      }
      module.exports = stackDelete;
    }
  });

  // node_modules/lodash/_stackGet.js
  var require_stackGet = __commonJS({
    "node_modules/lodash/_stackGet.js"(exports, module) {
      function stackGet(key) {
        return this.__data__.get(key);
      }
      module.exports = stackGet;
    }
  });

  // node_modules/lodash/_stackHas.js
  var require_stackHas = __commonJS({
    "node_modules/lodash/_stackHas.js"(exports, module) {
      function stackHas(key) {
        return this.__data__.has(key);
      }
      module.exports = stackHas;
    }
  });

  // node_modules/lodash/_stackSet.js
  var require_stackSet = __commonJS({
    "node_modules/lodash/_stackSet.js"(exports, module) {
      var ListCache = require_ListCache();
      var Map = require_Map();
      var MapCache = require_MapCache();
      var LARGE_ARRAY_SIZE = 200;
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      module.exports = stackSet;
    }
  });

  // node_modules/lodash/_Stack.js
  var require_Stack = __commonJS({
    "node_modules/lodash/_Stack.js"(exports, module) {
      var ListCache = require_ListCache();
      var stackClear = require_stackClear();
      var stackDelete = require_stackDelete();
      var stackGet = require_stackGet();
      var stackHas = require_stackHas();
      var stackSet = require_stackSet();
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      module.exports = Stack;
    }
  });

  // node_modules/lodash/_setCacheAdd.js
  var require_setCacheAdd = __commonJS({
    "node_modules/lodash/_setCacheAdd.js"(exports, module) {
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      module.exports = setCacheAdd;
    }
  });

  // node_modules/lodash/_setCacheHas.js
  var require_setCacheHas = __commonJS({
    "node_modules/lodash/_setCacheHas.js"(exports, module) {
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      module.exports = setCacheHas;
    }
  });

  // node_modules/lodash/_SetCache.js
  var require_SetCache = __commonJS({
    "node_modules/lodash/_SetCache.js"(exports, module) {
      var MapCache = require_MapCache();
      var setCacheAdd = require_setCacheAdd();
      var setCacheHas = require_setCacheHas();
      function SetCache(values) {
        var index = -1, length = values == null ? 0 : values.length;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values[index]);
        }
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      module.exports = SetCache;
    }
  });

  // node_modules/lodash/_arraySome.js
  var require_arraySome = __commonJS({
    "node_modules/lodash/_arraySome.js"(exports, module) {
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      module.exports = arraySome;
    }
  });

  // node_modules/lodash/_cacheHas.js
  var require_cacheHas = __commonJS({
    "node_modules/lodash/_cacheHas.js"(exports, module) {
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      module.exports = cacheHas;
    }
  });

  // node_modules/lodash/_equalArrays.js
  var require_equalArrays = __commonJS({
    "node_modules/lodash/_equalArrays.js"(exports, module) {
      var SetCache = require_SetCache();
      var arraySome = require_arraySome();
      var cacheHas = require_cacheHas();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== void 0) {
            if (compared) {
              continue;
            }
            result = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result;
      }
      module.exports = equalArrays;
    }
  });

  // node_modules/lodash/_Uint8Array.js
  var require_Uint8Array = __commonJS({
    "node_modules/lodash/_Uint8Array.js"(exports, module) {
      var root = require_root();
      var Uint8Array2 = root.Uint8Array;
      module.exports = Uint8Array2;
    }
  });

  // node_modules/lodash/_mapToArray.js
  var require_mapToArray = __commonJS({
    "node_modules/lodash/_mapToArray.js"(exports, module) {
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      module.exports = mapToArray;
    }
  });

  // node_modules/lodash/_setToArray.js
  var require_setToArray = __commonJS({
    "node_modules/lodash/_setToArray.js"(exports, module) {
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      module.exports = setToArray;
    }
  });

  // node_modules/lodash/_equalByTag.js
  var require_equalByTag = __commonJS({
    "node_modules/lodash/_equalByTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var Uint8Array2 = require_Uint8Array();
      var eq = require_eq();
      var equalArrays = require_equalArrays();
      var mapToArray = require_mapToArray();
      var setToArray = require_setToArray();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var symbolTag = "[object Symbol]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      module.exports = equalByTag;
    }
  });

  // node_modules/lodash/_arrayPush.js
  var require_arrayPush = __commonJS({
    "node_modules/lodash/_arrayPush.js"(exports, module) {
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      module.exports = arrayPush;
    }
  });

  // node_modules/lodash/_baseGetAllKeys.js
  var require_baseGetAllKeys = __commonJS({
    "node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
      var arrayPush = require_arrayPush();
      var isArray = require_isArray();
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      module.exports = baseGetAllKeys;
    }
  });

  // node_modules/lodash/_arrayFilter.js
  var require_arrayFilter = __commonJS({
    "node_modules/lodash/_arrayFilter.js"(exports, module) {
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      module.exports = arrayFilter;
    }
  });

  // node_modules/lodash/stubArray.js
  var require_stubArray = __commonJS({
    "node_modules/lodash/stubArray.js"(exports, module) {
      function stubArray() {
        return [];
      }
      module.exports = stubArray;
    }
  });

  // node_modules/lodash/_getSymbols.js
  var require_getSymbols = __commonJS({
    "node_modules/lodash/_getSymbols.js"(exports, module) {
      var arrayFilter = require_arrayFilter();
      var stubArray = require_stubArray();
      var objectProto = Object.prototype;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var nativeGetSymbols = Object.getOwnPropertySymbols;
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      module.exports = getSymbols;
    }
  });

  // node_modules/lodash/_baseTimes.js
  var require_baseTimes = __commonJS({
    "node_modules/lodash/_baseTimes.js"(exports, module) {
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      module.exports = baseTimes;
    }
  });

  // node_modules/lodash/_baseIsArguments.js
  var require_baseIsArguments = __commonJS({
    "node_modules/lodash/_baseIsArguments.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var argsTag = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      module.exports = baseIsArguments;
    }
  });

  // node_modules/lodash/isArguments.js
  var require_isArguments = __commonJS({
    "node_modules/lodash/isArguments.js"(exports, module) {
      var baseIsArguments = require_baseIsArguments();
      var isObjectLike = require_isObjectLike();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      module.exports = isArguments;
    }
  });

  // node_modules/lodash/stubFalse.js
  var require_stubFalse = __commonJS({
    "node_modules/lodash/stubFalse.js"(exports, module) {
      function stubFalse() {
        return false;
      }
      module.exports = stubFalse;
    }
  });

  // node_modules/lodash/isBuffer.js
  var require_isBuffer = __commonJS({
    "node_modules/lodash/isBuffer.js"(exports, module) {
      var root = require_root();
      var stubFalse = require_stubFalse();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var isBuffer = nativeIsBuffer || stubFalse;
      module.exports = isBuffer;
    }
  });

  // node_modules/lodash/_isIndex.js
  var require_isIndex = __commonJS({
    "node_modules/lodash/_isIndex.js"(exports, module) {
      var MAX_SAFE_INTEGER = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      module.exports = isIndex;
    }
  });

  // node_modules/lodash/isLength.js
  var require_isLength = __commonJS({
    "node_modules/lodash/isLength.js"(exports, module) {
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      module.exports = isLength;
    }
  });

  // node_modules/lodash/_baseIsTypedArray.js
  var require_baseIsTypedArray = __commonJS({
    "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isLength = require_isLength();
      var isObjectLike = require_isObjectLike();
      var argsTag = "[object Arguments]";
      var arrayTag = "[object Array]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var funcTag = "[object Function]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var objectTag = "[object Object]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      module.exports = baseIsTypedArray;
    }
  });

  // node_modules/lodash/_baseUnary.js
  var require_baseUnary = __commonJS({
    "node_modules/lodash/_baseUnary.js"(exports, module) {
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      module.exports = baseUnary;
    }
  });

  // node_modules/lodash/_nodeUtil.js
  var require_nodeUtil = __commonJS({
    "node_modules/lodash/_nodeUtil.js"(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      module.exports = nodeUtil;
    }
  });

  // node_modules/lodash/isTypedArray.js
  var require_isTypedArray = __commonJS({
    "node_modules/lodash/isTypedArray.js"(exports, module) {
      var baseIsTypedArray = require_baseIsTypedArray();
      var baseUnary = require_baseUnary();
      var nodeUtil = require_nodeUtil();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      module.exports = isTypedArray;
    }
  });

  // node_modules/lodash/_arrayLikeKeys.js
  var require_arrayLikeKeys = __commonJS({
    "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
      var baseTimes = require_baseTimes();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var isBuffer = require_isBuffer();
      var isIndex = require_isIndex();
      var isTypedArray = require_isTypedArray();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = arrayLikeKeys;
    }
  });

  // node_modules/lodash/_isPrototype.js
  var require_isPrototype = __commonJS({
    "node_modules/lodash/_isPrototype.js"(exports, module) {
      var objectProto = Object.prototype;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      module.exports = isPrototype;
    }
  });

  // node_modules/lodash/_overArg.js
  var require_overArg = __commonJS({
    "node_modules/lodash/_overArg.js"(exports, module) {
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      module.exports = overArg;
    }
  });

  // node_modules/lodash/_nativeKeys.js
  var require_nativeKeys = __commonJS({
    "node_modules/lodash/_nativeKeys.js"(exports, module) {
      var overArg = require_overArg();
      var nativeKeys = overArg(Object.keys, Object);
      module.exports = nativeKeys;
    }
  });

  // node_modules/lodash/_baseKeys.js
  var require_baseKeys = __commonJS({
    "node_modules/lodash/_baseKeys.js"(exports, module) {
      var isPrototype = require_isPrototype();
      var nativeKeys = require_nativeKeys();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = baseKeys;
    }
  });

  // node_modules/lodash/isArrayLike.js
  var require_isArrayLike = __commonJS({
    "node_modules/lodash/isArrayLike.js"(exports, module) {
      var isFunction = require_isFunction();
      var isLength = require_isLength();
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      module.exports = isArrayLike;
    }
  });

  // node_modules/lodash/keys.js
  var require_keys = __commonJS({
    "node_modules/lodash/keys.js"(exports, module) {
      var arrayLikeKeys = require_arrayLikeKeys();
      var baseKeys = require_baseKeys();
      var isArrayLike = require_isArrayLike();
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      module.exports = keys;
    }
  });

  // node_modules/lodash/_getAllKeys.js
  var require_getAllKeys = __commonJS({
    "node_modules/lodash/_getAllKeys.js"(exports, module) {
      var baseGetAllKeys = require_baseGetAllKeys();
      var getSymbols = require_getSymbols();
      var keys = require_keys();
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      module.exports = getAllKeys;
    }
  });

  // node_modules/lodash/_equalObjects.js
  var require_equalObjects = __commonJS({
    "node_modules/lodash/_equalObjects.js"(exports, module) {
      var getAllKeys = require_getAllKeys();
      var COMPARE_PARTIAL_FLAG = 1;
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result;
      }
      module.exports = equalObjects;
    }
  });

  // node_modules/lodash/_DataView.js
  var require_DataView = __commonJS({
    "node_modules/lodash/_DataView.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var DataView = getNative(root, "DataView");
      module.exports = DataView;
    }
  });

  // node_modules/lodash/_Promise.js
  var require_Promise = __commonJS({
    "node_modules/lodash/_Promise.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var Promise2 = getNative(root, "Promise");
      module.exports = Promise2;
    }
  });

  // node_modules/lodash/_Set.js
  var require_Set = __commonJS({
    "node_modules/lodash/_Set.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var Set = getNative(root, "Set");
      module.exports = Set;
    }
  });

  // node_modules/lodash/_WeakMap.js
  var require_WeakMap = __commonJS({
    "node_modules/lodash/_WeakMap.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var WeakMap = getNative(root, "WeakMap");
      module.exports = WeakMap;
    }
  });

  // node_modules/lodash/_getTag.js
  var require_getTag = __commonJS({
    "node_modules/lodash/_getTag.js"(exports, module) {
      var DataView = require_DataView();
      var Map = require_Map();
      var Promise2 = require_Promise();
      var Set = require_Set();
      var WeakMap = require_WeakMap();
      var baseGetTag = require_baseGetTag();
      var toSource = require_toSource();
      var mapTag = "[object Map]";
      var objectTag = "[object Object]";
      var promiseTag = "[object Promise]";
      var setTag = "[object Set]";
      var weakMapTag = "[object WeakMap]";
      var dataViewTag = "[object DataView]";
      var dataViewCtorString = toSource(DataView);
      var mapCtorString = toSource(Map);
      var promiseCtorString = toSource(Promise2);
      var setCtorString = toSource(Set);
      var weakMapCtorString = toSource(WeakMap);
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
        getTag = function(value) {
          var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result;
        };
      }
      module.exports = getTag;
    }
  });

  // node_modules/lodash/_baseIsEqualDeep.js
  var require_baseIsEqualDeep = __commonJS({
    "node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
      var Stack = require_Stack();
      var equalArrays = require_equalArrays();
      var equalByTag = require_equalByTag();
      var equalObjects = require_equalObjects();
      var getTag = require_getTag();
      var isArray = require_isArray();
      var isBuffer = require_isBuffer();
      var isTypedArray = require_isTypedArray();
      var COMPARE_PARTIAL_FLAG = 1;
      var argsTag = "[object Arguments]";
      var arrayTag = "[object Array]";
      var objectTag = "[object Object]";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      module.exports = baseIsEqualDeep;
    }
  });

  // node_modules/lodash/_baseIsEqual.js
  var require_baseIsEqual = __commonJS({
    "node_modules/lodash/_baseIsEqual.js"(exports, module) {
      var baseIsEqualDeep = require_baseIsEqualDeep();
      var isObjectLike = require_isObjectLike();
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      module.exports = baseIsEqual;
    }
  });

  // node_modules/lodash/_baseIsMatch.js
  var require_baseIsMatch = __commonJS({
    "node_modules/lodash/_baseIsMatch.js"(exports, module) {
      var Stack = require_Stack();
      var baseIsEqual = require_baseIsEqual();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index, noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === void 0 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();
            if (customizer) {
              var result = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
              return false;
            }
          }
        }
        return true;
      }
      module.exports = baseIsMatch;
    }
  });

  // node_modules/lodash/_isStrictComparable.js
  var require_isStrictComparable = __commonJS({
    "node_modules/lodash/_isStrictComparable.js"(exports, module) {
      var isObject = require_isObject();
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      module.exports = isStrictComparable;
    }
  });

  // node_modules/lodash/_getMatchData.js
  var require_getMatchData = __commonJS({
    "node_modules/lodash/_getMatchData.js"(exports, module) {
      var isStrictComparable = require_isStrictComparable();
      var keys = require_keys();
      function getMatchData(object) {
        var result = keys(object), length = result.length;
        while (length--) {
          var key = result[length], value = object[key];
          result[length] = [key, value, isStrictComparable(value)];
        }
        return result;
      }
      module.exports = getMatchData;
    }
  });

  // node_modules/lodash/_matchesStrictComparable.js
  var require_matchesStrictComparable = __commonJS({
    "node_modules/lodash/_matchesStrictComparable.js"(exports, module) {
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
        };
      }
      module.exports = matchesStrictComparable;
    }
  });

  // node_modules/lodash/_baseMatches.js
  var require_baseMatches = __commonJS({
    "node_modules/lodash/_baseMatches.js"(exports, module) {
      var baseIsMatch = require_baseIsMatch();
      var getMatchData = require_getMatchData();
      var matchesStrictComparable = require_matchesStrictComparable();
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      module.exports = baseMatches;
    }
  });

  // node_modules/lodash/_baseHasIn.js
  var require_baseHasIn = __commonJS({
    "node_modules/lodash/_baseHasIn.js"(exports, module) {
      function baseHasIn(object, key) {
        return object != null && key in Object(object);
      }
      module.exports = baseHasIn;
    }
  });

  // node_modules/lodash/_hasPath.js
  var require_hasPath = __commonJS({
    "node_modules/lodash/_hasPath.js"(exports, module) {
      var castPath = require_castPath();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var isIndex = require_isIndex();
      var isLength = require_isLength();
      var toKey = require_toKey();
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1, length = path.length, result = false;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result || ++index != length) {
          return result;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      module.exports = hasPath;
    }
  });

  // node_modules/lodash/hasIn.js
  var require_hasIn = __commonJS({
    "node_modules/lodash/hasIn.js"(exports, module) {
      var baseHasIn = require_baseHasIn();
      var hasPath = require_hasPath();
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      module.exports = hasIn;
    }
  });

  // node_modules/lodash/_baseMatchesProperty.js
  var require_baseMatchesProperty = __commonJS({
    "node_modules/lodash/_baseMatchesProperty.js"(exports, module) {
      var baseIsEqual = require_baseIsEqual();
      var get = require_get();
      var hasIn = require_hasIn();
      var isKey = require_isKey();
      var isStrictComparable = require_isStrictComparable();
      var matchesStrictComparable = require_matchesStrictComparable();
      var toKey = require_toKey();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get(object, path);
          return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      module.exports = baseMatchesProperty;
    }
  });

  // node_modules/lodash/identity.js
  var require_identity = __commonJS({
    "node_modules/lodash/identity.js"(exports, module) {
      function identity(value) {
        return value;
      }
      module.exports = identity;
    }
  });

  // node_modules/lodash/_baseProperty.js
  var require_baseProperty = __commonJS({
    "node_modules/lodash/_baseProperty.js"(exports, module) {
      function baseProperty(key) {
        return function(object) {
          return object == null ? void 0 : object[key];
        };
      }
      module.exports = baseProperty;
    }
  });

  // node_modules/lodash/_basePropertyDeep.js
  var require_basePropertyDeep = __commonJS({
    "node_modules/lodash/_basePropertyDeep.js"(exports, module) {
      var baseGet = require_baseGet();
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      module.exports = basePropertyDeep;
    }
  });

  // node_modules/lodash/property.js
  var require_property = __commonJS({
    "node_modules/lodash/property.js"(exports, module) {
      var baseProperty = require_baseProperty();
      var basePropertyDeep = require_basePropertyDeep();
      var isKey = require_isKey();
      var toKey = require_toKey();
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      module.exports = property;
    }
  });

  // node_modules/lodash/_baseIteratee.js
  var require_baseIteratee = __commonJS({
    "node_modules/lodash/_baseIteratee.js"(exports, module) {
      var baseMatches = require_baseMatches();
      var baseMatchesProperty = require_baseMatchesProperty();
      var identity = require_identity();
      var isArray = require_isArray();
      var property = require_property();
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      module.exports = baseIteratee;
    }
  });

  // node_modules/lodash/_baseFindIndex.js
  var require_baseFindIndex = __commonJS({
    "node_modules/lodash/_baseFindIndex.js"(exports, module) {
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      module.exports = baseFindIndex;
    }
  });

  // node_modules/lodash/_baseIsNaN.js
  var require_baseIsNaN = __commonJS({
    "node_modules/lodash/_baseIsNaN.js"(exports, module) {
      function baseIsNaN(value) {
        return value !== value;
      }
      module.exports = baseIsNaN;
    }
  });

  // node_modules/lodash/_strictIndexOf.js
  var require_strictIndexOf = __commonJS({
    "node_modules/lodash/_strictIndexOf.js"(exports, module) {
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      module.exports = strictIndexOf;
    }
  });

  // node_modules/lodash/_baseIndexOf.js
  var require_baseIndexOf = __commonJS({
    "node_modules/lodash/_baseIndexOf.js"(exports, module) {
      var baseFindIndex = require_baseFindIndex();
      var baseIsNaN = require_baseIsNaN();
      var strictIndexOf = require_strictIndexOf();
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      module.exports = baseIndexOf;
    }
  });

  // node_modules/lodash/_arrayIncludes.js
  var require_arrayIncludes = __commonJS({
    "node_modules/lodash/_arrayIncludes.js"(exports, module) {
      var baseIndexOf = require_baseIndexOf();
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      module.exports = arrayIncludes;
    }
  });

  // node_modules/lodash/_arrayIncludesWith.js
  var require_arrayIncludesWith = __commonJS({
    "node_modules/lodash/_arrayIncludesWith.js"(exports, module) {
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      module.exports = arrayIncludesWith;
    }
  });

  // node_modules/lodash/noop.js
  var require_noop = __commonJS({
    "node_modules/lodash/noop.js"(exports, module) {
      function noop() {
      }
      module.exports = noop;
    }
  });

  // node_modules/lodash/_createSet.js
  var require_createSet = __commonJS({
    "node_modules/lodash/_createSet.js"(exports, module) {
      var Set = require_Set();
      var noop = require_noop();
      var setToArray = require_setToArray();
      var INFINITY = 1 / 0;
      var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values) {
        return new Set(values);
      };
      module.exports = createSet;
    }
  });

  // node_modules/lodash/_baseUniq.js
  var require_baseUniq = __commonJS({
    "node_modules/lodash/_baseUniq.js"(exports, module) {
      var SetCache = require_SetCache();
      var arrayIncludes = require_arrayIncludes();
      var arrayIncludesWith = require_arrayIncludesWith();
      var cacheHas = require_cacheHas();
      var createSet = require_createSet();
      var setToArray = require_setToArray();
      var LARGE_ARRAY_SIZE = 200;
      function baseUniq(array, iteratee, comparator) {
        var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
        if (comparator) {
          isCommon = false;
          includes = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set = iteratee ? null : createSet(array);
          if (set) {
            return setToArray(set);
          }
          isCommon = false;
          includes = cacheHas;
          seen = new SetCache();
        } else {
          seen = iteratee ? [] : result;
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee ? iteratee(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee) {
                seen.push(computed);
              }
              result.push(value);
            } else if (!includes(seen, computed, comparator)) {
              if (seen !== result) {
                seen.push(computed);
              }
              result.push(value);
            }
          }
        return result;
      }
      module.exports = baseUniq;
    }
  });

  // node_modules/lodash/uniqBy.js
  var require_uniqBy = __commonJS({
    "node_modules/lodash/uniqBy.js"(exports, module) {
      var baseIteratee = require_baseIteratee();
      var baseUniq = require_baseUniq();
      function uniqBy(array, iteratee) {
        return array && array.length ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
      }
      module.exports = uniqBy;
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/setCharacters.js
  var require_setCharacters = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/setCharacters.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.setCharacters = void 0;
      var _uniqBy2 = _interopRequireDefault(require_uniqBy());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var setCharacters = async (node, characters, options) => {
        const fallbackFont = (options === null || options === void 0 ? void 0 : options.fallbackFont) || {
          family: "Roboto",
          style: "Regular"
        };
        try {
          if (node.fontName === figma.mixed) {
            if ((options === null || options === void 0 ? void 0 : options.smartStrategy) === "prevail") {
              const fontHashTree = {};
              for (let i = 1; i < node.characters.length; i++) {
                const charFont = node.getRangeFontName(i - 1, i);
                const key = `${charFont.family}::${charFont.style}`;
                fontHashTree[key] = fontHashTree[key] ? fontHashTree[key] + 1 : 1;
              }
              const prevailedTreeItem = Object.entries(fontHashTree).sort((a, b) => b[1] - a[1])[0];
              const [family, style] = prevailedTreeItem[0].split("::");
              const prevailedFont = {
                family,
                style
              };
              await figma.loadFontAsync(prevailedFont);
              node.fontName = prevailedFont;
            } else if ((options === null || options === void 0 ? void 0 : options.smartStrategy) === "strict") {
              return setCharactersWithStrictMatchFont(node, characters, fallbackFont);
            } else if ((options === null || options === void 0 ? void 0 : options.smartStrategy) === "experimental") {
              return setCharactersWithSmartMatchFont(node, characters, fallbackFont);
            } else {
              const firstCharFont = node.getRangeFontName(0, 1);
              await figma.loadFontAsync(firstCharFont);
              node.fontName = firstCharFont;
            }
          } else {
            await figma.loadFontAsync({
              family: node.fontName.family,
              style: node.fontName.style
            });
          }
        } catch (err) {
          console.warn(`Failed to load "${node.fontName["family"]} ${node.fontName["style"]}" font and replaced with fallback "${fallbackFont.family} ${fallbackFont.style}"`, err);
          await figma.loadFontAsync(fallbackFont);
          node.fontName = fallbackFont;
        }
        try {
          node.characters = characters;
          return true;
        } catch (err) {
          console.warn(`Failed to set characters. Skipped.`, err);
          return false;
        }
      };
      exports.setCharacters = setCharacters;
      var setCharactersWithStrictMatchFont = async (node, characters, fallbackFont) => {
        const fontHashTree = {};
        for (let i = 1; i < node.characters.length; i++) {
          const startIdx = i - 1;
          const startCharFont = node.getRangeFontName(startIdx, i);
          const startCharFontVal = `${startCharFont.family}::${startCharFont.style}`;
          while (i < node.characters.length) {
            i++;
            const charFont = node.getRangeFontName(i - 1, i);
            if (startCharFontVal !== `${charFont.family}::${charFont.style}`) {
              break;
            }
          }
          fontHashTree[`${startIdx}_${i}`] = startCharFontVal;
        }
        await figma.loadFontAsync(fallbackFont);
        node.fontName = fallbackFont;
        node.characters = characters;
        console.log(fontHashTree);
        await Promise.all(Object.keys(fontHashTree).map(async (range) => {
          console.log(range, fontHashTree[range]);
          const [start, end] = range.split("_");
          const [family, style] = fontHashTree[range].split("::");
          const matchedFont = {
            family,
            style
          };
          await figma.loadFontAsync(matchedFont);
          return node.setRangeFontName(Number(start), Number(end), matchedFont);
        }));
        return true;
      };
      var getDelimiterPos = (str, delimiter, startIdx = 0, endIdx = str.length) => {
        const indices = [];
        let temp = startIdx;
        for (let i = startIdx; i < endIdx; i++) {
          if (str[i] === delimiter && i + startIdx !== endIdx && temp !== i + startIdx) {
            indices.push([temp, i + startIdx]);
            temp = i + startIdx + 1;
          }
        }
        temp !== endIdx && indices.push([temp, endIdx]);
        return indices.filter(Boolean);
      };
      var buildLinearOrder = (node) => {
        const fontTree = [];
        const newLinesPos = getDelimiterPos(node.characters, "\n");
        newLinesPos.forEach(([newLinesRangeStart, newLinesRangeEnd], n) => {
          const newLinesRangeFont = node.getRangeFontName(newLinesRangeStart, newLinesRangeEnd);
          if (newLinesRangeFont === figma.mixed) {
            const spacesPos = getDelimiterPos(node.characters, " ", newLinesRangeStart, newLinesRangeEnd);
            spacesPos.forEach(([spacesRangeStart, spacesRangeEnd], s) => {
              const spacesRangeFont = node.getRangeFontName(spacesRangeStart, spacesRangeEnd);
              if (spacesRangeFont === figma.mixed) {
                const spacesRangeFont2 = node.getRangeFontName(spacesRangeStart, spacesRangeStart[0]);
                fontTree.push({
                  start: spacesRangeStart,
                  delimiter: " ",
                  family: spacesRangeFont2.family,
                  style: spacesRangeFont2.style
                });
              } else {
                fontTree.push({
                  start: spacesRangeStart,
                  delimiter: " ",
                  family: spacesRangeFont.family,
                  style: spacesRangeFont.style
                });
              }
            });
          } else {
            fontTree.push({
              start: newLinesRangeStart,
              delimiter: "\n",
              family: newLinesRangeFont.family,
              style: newLinesRangeFont.style
            });
          }
        });
        return fontTree.sort((a, b) => +a.start - +b.start).map(({
          family,
          style,
          delimiter
        }) => ({
          family,
          style,
          delimiter
        }));
      };
      var setCharactersWithSmartMatchFont = async (node, characters, fallbackFont) => {
        const rangeTree = buildLinearOrder(node);
        const fontsToLoad = (0, _uniqBy2.default)(rangeTree, ({
          family,
          style
        }) => `${family}::${style}`).map(({
          family,
          style
        }) => ({
          family,
          style
        }));
        await Promise.all([...fontsToLoad, fallbackFont].map(figma.loadFontAsync));
        node.fontName = fallbackFont;
        node.characters = characters;
        let prevPos = 0;
        rangeTree.forEach(({
          family,
          style,
          delimiter
        }) => {
          if (prevPos < node.characters.length) {
            const delimeterPos = node.characters.indexOf(delimiter, prevPos);
            const endPos = delimeterPos > prevPos ? delimeterPos : node.characters.length;
            const matchedFont = {
              family,
              style
            };
            node.setRangeFontName(prevPos, endPos, matchedFont);
            prevPos = endPos + 1;
          }
        });
        return true;
      };
    }
  });

  // node_modules/lodash/uniqWith.js
  var require_uniqWith = __commonJS({
    "node_modules/lodash/uniqWith.js"(exports, module) {
      var baseUniq = require_baseUniq();
      function uniqWith(array, comparator) {
        comparator = typeof comparator == "function" ? comparator : void 0;
        return array && array.length ? baseUniq(array, void 0, comparator) : [];
      }
      module.exports = uniqWith;
    }
  });

  // node_modules/lodash/_arrayEach.js
  var require_arrayEach = __commonJS({
    "node_modules/lodash/_arrayEach.js"(exports, module) {
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      module.exports = arrayEach;
    }
  });

  // node_modules/lodash/_defineProperty.js
  var require_defineProperty = __commonJS({
    "node_modules/lodash/_defineProperty.js"(exports, module) {
      var getNative = require_getNative();
      var defineProperty = function() {
        try {
          var func = getNative(Object, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      module.exports = defineProperty;
    }
  });

  // node_modules/lodash/_baseAssignValue.js
  var require_baseAssignValue = __commonJS({
    "node_modules/lodash/_baseAssignValue.js"(exports, module) {
      var defineProperty = require_defineProperty();
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      module.exports = baseAssignValue;
    }
  });

  // node_modules/lodash/_assignValue.js
  var require_assignValue = __commonJS({
    "node_modules/lodash/_assignValue.js"(exports, module) {
      var baseAssignValue = require_baseAssignValue();
      var eq = require_eq();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      module.exports = assignValue;
    }
  });

  // node_modules/lodash/_copyObject.js
  var require_copyObject = __commonJS({
    "node_modules/lodash/_copyObject.js"(exports, module) {
      var assignValue = require_assignValue();
      var baseAssignValue = require_baseAssignValue();
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
          if (newValue === void 0) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      module.exports = copyObject;
    }
  });

  // node_modules/lodash/_baseAssign.js
  var require_baseAssign = __commonJS({
    "node_modules/lodash/_baseAssign.js"(exports, module) {
      var copyObject = require_copyObject();
      var keys = require_keys();
      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }
      module.exports = baseAssign;
    }
  });

  // node_modules/lodash/_nativeKeysIn.js
  var require_nativeKeysIn = __commonJS({
    "node_modules/lodash/_nativeKeysIn.js"(exports, module) {
      function nativeKeysIn(object) {
        var result = [];
        if (object != null) {
          for (var key in Object(object)) {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = nativeKeysIn;
    }
  });

  // node_modules/lodash/_baseKeysIn.js
  var require_baseKeysIn = __commonJS({
    "node_modules/lodash/_baseKeysIn.js"(exports, module) {
      var isObject = require_isObject();
      var isPrototype = require_isPrototype();
      var nativeKeysIn = require_nativeKeysIn();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = baseKeysIn;
    }
  });

  // node_modules/lodash/keysIn.js
  var require_keysIn = __commonJS({
    "node_modules/lodash/keysIn.js"(exports, module) {
      var arrayLikeKeys = require_arrayLikeKeys();
      var baseKeysIn = require_baseKeysIn();
      var isArrayLike = require_isArrayLike();
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      module.exports = keysIn;
    }
  });

  // node_modules/lodash/_baseAssignIn.js
  var require_baseAssignIn = __commonJS({
    "node_modules/lodash/_baseAssignIn.js"(exports, module) {
      var copyObject = require_copyObject();
      var keysIn = require_keysIn();
      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }
      module.exports = baseAssignIn;
    }
  });

  // node_modules/lodash/_cloneBuffer.js
  var require_cloneBuffer = __commonJS({
    "node_modules/lodash/_cloneBuffer.js"(exports, module) {
      var root = require_root();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result);
        return result;
      }
      module.exports = cloneBuffer;
    }
  });

  // node_modules/lodash/_copyArray.js
  var require_copyArray = __commonJS({
    "node_modules/lodash/_copyArray.js"(exports, module) {
      function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      module.exports = copyArray;
    }
  });

  // node_modules/lodash/_copySymbols.js
  var require_copySymbols = __commonJS({
    "node_modules/lodash/_copySymbols.js"(exports, module) {
      var copyObject = require_copyObject();
      var getSymbols = require_getSymbols();
      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }
      module.exports = copySymbols;
    }
  });

  // node_modules/lodash/_getPrototype.js
  var require_getPrototype = __commonJS({
    "node_modules/lodash/_getPrototype.js"(exports, module) {
      var overArg = require_overArg();
      var getPrototype = overArg(Object.getPrototypeOf, Object);
      module.exports = getPrototype;
    }
  });

  // node_modules/lodash/_getSymbolsIn.js
  var require_getSymbolsIn = __commonJS({
    "node_modules/lodash/_getSymbolsIn.js"(exports, module) {
      var arrayPush = require_arrayPush();
      var getPrototype = require_getPrototype();
      var getSymbols = require_getSymbols();
      var stubArray = require_stubArray();
      var nativeGetSymbols = Object.getOwnPropertySymbols;
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
        var result = [];
        while (object) {
          arrayPush(result, getSymbols(object));
          object = getPrototype(object);
        }
        return result;
      };
      module.exports = getSymbolsIn;
    }
  });

  // node_modules/lodash/_copySymbolsIn.js
  var require_copySymbolsIn = __commonJS({
    "node_modules/lodash/_copySymbolsIn.js"(exports, module) {
      var copyObject = require_copyObject();
      var getSymbolsIn = require_getSymbolsIn();
      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }
      module.exports = copySymbolsIn;
    }
  });

  // node_modules/lodash/_getAllKeysIn.js
  var require_getAllKeysIn = __commonJS({
    "node_modules/lodash/_getAllKeysIn.js"(exports, module) {
      var baseGetAllKeys = require_baseGetAllKeys();
      var getSymbolsIn = require_getSymbolsIn();
      var keysIn = require_keysIn();
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      module.exports = getAllKeysIn;
    }
  });

  // node_modules/lodash/_initCloneArray.js
  var require_initCloneArray = __commonJS({
    "node_modules/lodash/_initCloneArray.js"(exports, module) {
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function initCloneArray(array) {
        var length = array.length, result = new array.constructor(length);
        if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
          result.index = array.index;
          result.input = array.input;
        }
        return result;
      }
      module.exports = initCloneArray;
    }
  });

  // node_modules/lodash/_cloneArrayBuffer.js
  var require_cloneArrayBuffer = __commonJS({
    "node_modules/lodash/_cloneArrayBuffer.js"(exports, module) {
      var Uint8Array2 = require_Uint8Array();
      function cloneArrayBuffer(arrayBuffer) {
        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
        return result;
      }
      module.exports = cloneArrayBuffer;
    }
  });

  // node_modules/lodash/_cloneDataView.js
  var require_cloneDataView = __commonJS({
    "node_modules/lodash/_cloneDataView.js"(exports, module) {
      var cloneArrayBuffer = require_cloneArrayBuffer();
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      module.exports = cloneDataView;
    }
  });

  // node_modules/lodash/_cloneRegExp.js
  var require_cloneRegExp = __commonJS({
    "node_modules/lodash/_cloneRegExp.js"(exports, module) {
      var reFlags = /\w*$/;
      function cloneRegExp(regexp) {
        var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result.lastIndex = regexp.lastIndex;
        return result;
      }
      module.exports = cloneRegExp;
    }
  });

  // node_modules/lodash/_cloneSymbol.js
  var require_cloneSymbol = __commonJS({
    "node_modules/lodash/_cloneSymbol.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
      }
      module.exports = cloneSymbol;
    }
  });

  // node_modules/lodash/_cloneTypedArray.js
  var require_cloneTypedArray = __commonJS({
    "node_modules/lodash/_cloneTypedArray.js"(exports, module) {
      var cloneArrayBuffer = require_cloneArrayBuffer();
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      module.exports = cloneTypedArray;
    }
  });

  // node_modules/lodash/_initCloneByTag.js
  var require_initCloneByTag = __commonJS({
    "node_modules/lodash/_initCloneByTag.js"(exports, module) {
      var cloneArrayBuffer = require_cloneArrayBuffer();
      var cloneDataView = require_cloneDataView();
      var cloneRegExp = require_cloneRegExp();
      var cloneSymbol = require_cloneSymbol();
      var cloneTypedArray = require_cloneTypedArray();
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var symbolTag = "[object Symbol]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);
          case boolTag:
          case dateTag:
            return new Ctor(+object);
          case dataViewTag:
            return cloneDataView(object, isDeep);
          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            return cloneTypedArray(object, isDeep);
          case mapTag:
            return new Ctor();
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            return cloneRegExp(object);
          case setTag:
            return new Ctor();
          case symbolTag:
            return cloneSymbol(object);
        }
      }
      module.exports = initCloneByTag;
    }
  });

  // node_modules/lodash/_baseCreate.js
  var require_baseCreate = __commonJS({
    "node_modules/lodash/_baseCreate.js"(exports, module) {
      var isObject = require_isObject();
      var objectCreate = Object.create;
      var baseCreate = function() {
        function object() {
        }
        return function(proto) {
          if (!isObject(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result = new object();
          object.prototype = void 0;
          return result;
        };
      }();
      module.exports = baseCreate;
    }
  });

  // node_modules/lodash/_initCloneObject.js
  var require_initCloneObject = __commonJS({
    "node_modules/lodash/_initCloneObject.js"(exports, module) {
      var baseCreate = require_baseCreate();
      var getPrototype = require_getPrototype();
      var isPrototype = require_isPrototype();
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      module.exports = initCloneObject;
    }
  });

  // node_modules/lodash/_baseIsMap.js
  var require_baseIsMap = __commonJS({
    "node_modules/lodash/_baseIsMap.js"(exports, module) {
      var getTag = require_getTag();
      var isObjectLike = require_isObjectLike();
      var mapTag = "[object Map]";
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      module.exports = baseIsMap;
    }
  });

  // node_modules/lodash/isMap.js
  var require_isMap = __commonJS({
    "node_modules/lodash/isMap.js"(exports, module) {
      var baseIsMap = require_baseIsMap();
      var baseUnary = require_baseUnary();
      var nodeUtil = require_nodeUtil();
      var nodeIsMap = nodeUtil && nodeUtil.isMap;
      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      module.exports = isMap;
    }
  });

  // node_modules/lodash/_baseIsSet.js
  var require_baseIsSet = __commonJS({
    "node_modules/lodash/_baseIsSet.js"(exports, module) {
      var getTag = require_getTag();
      var isObjectLike = require_isObjectLike();
      var setTag = "[object Set]";
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      module.exports = baseIsSet;
    }
  });

  // node_modules/lodash/isSet.js
  var require_isSet = __commonJS({
    "node_modules/lodash/isSet.js"(exports, module) {
      var baseIsSet = require_baseIsSet();
      var baseUnary = require_baseUnary();
      var nodeUtil = require_nodeUtil();
      var nodeIsSet = nodeUtil && nodeUtil.isSet;
      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      module.exports = isSet;
    }
  });

  // node_modules/lodash/_baseClone.js
  var require_baseClone = __commonJS({
    "node_modules/lodash/_baseClone.js"(exports, module) {
      var Stack = require_Stack();
      var arrayEach = require_arrayEach();
      var assignValue = require_assignValue();
      var baseAssign = require_baseAssign();
      var baseAssignIn = require_baseAssignIn();
      var cloneBuffer = require_cloneBuffer();
      var copyArray = require_copyArray();
      var copySymbols = require_copySymbols();
      var copySymbolsIn = require_copySymbolsIn();
      var getAllKeys = require_getAllKeys();
      var getAllKeysIn = require_getAllKeysIn();
      var getTag = require_getTag();
      var initCloneArray = require_initCloneArray();
      var initCloneByTag = require_initCloneByTag();
      var initCloneObject = require_initCloneObject();
      var isArray = require_isArray();
      var isBuffer = require_isBuffer();
      var isMap = require_isMap();
      var isObject = require_isObject();
      var isSet = require_isSet();
      var keys = require_keys();
      var keysIn = require_keysIn();
      var CLONE_DEEP_FLAG = 1;
      var CLONE_FLAT_FLAG = 2;
      var CLONE_SYMBOLS_FLAG = 4;
      var argsTag = "[object Arguments]";
      var arrayTag = "[object Array]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var objectTag = "[object Object]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var symbolTag = "[object Symbol]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result !== void 0) {
          return result;
        }
        if (!isObject(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result);
          }
        } else {
          var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
          if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag || tag == argsTag || isFunc && !object) {
            result = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }
            result = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result);
        if (isSet(value)) {
          value.forEach(function(subValue) {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key2) {
            result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
        var props = isArr ? void 0 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
        return result;
      }
      module.exports = baseClone;
    }
  });

  // node_modules/lodash/cloneDeep.js
  var require_cloneDeep = __commonJS({
    "node_modules/lodash/cloneDeep.js"(exports, module) {
      var baseClone = require_baseClone();
      var CLONE_DEEP_FLAG = 1;
      var CLONE_SYMBOLS_FLAG = 4;
      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      module.exports = cloneDeep;
    }
  });

  // node_modules/lodash/isEqual.js
  var require_isEqual = __commonJS({
    "node_modules/lodash/isEqual.js"(exports, module) {
      var baseIsEqual = require_baseIsEqual();
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      module.exports = isEqual;
    }
  });

  // node_modules/@figma-plugin/helpers/dist/helpers/parseTextStyle.js
  var require_parseTextStyle = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/helpers/parseTextStyle.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.parseTextStyle = parseTextStyle;
      exports.splitTextStyleIntoLines = splitTextStyleIntoLines;
      exports.joinTextLinesStyles = joinTextLinesStyles;
      exports.applyTextStyleToTextNode = applyTextStyleToTextNode;
      exports.changeCharactersTextStyle = changeCharactersTextStyle;
      exports.changeTextStyle = changeTextStyle;
      var _uniqWith2 = _interopRequireDefault(require_uniqWith());
      var _cloneDeep2 = _interopRequireDefault(require_cloneDeep());
      var _isEqual2 = _interopRequireDefault(require_isEqual());
      var _getAllFonts = _interopRequireDefault(require_getAllFonts());
      var _loadFonts = _interopRequireDefault(require_loadFonts());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var styleFonts = ["fontSize", "fontName", "textCase", "textDecoration", "letterSpacing", "lineHeight", "fills", "textStyleId", "fillStyleId"];
      function parseTextStyle(node, start = 0, end, styleName) {
        if (!end)
          end = node.characters.length;
        if (!styleName)
          styleName = styleFonts;
        if (end <= start) {
          console.error("Start must be greater than end");
          return [];
        }
        const styleMap = [];
        let textStyle;
        const names = styleName.map((name) => {
          return name.replace(/^(.)/g, ($1) => $1.toUpperCase());
        });
        for (let startIndex = start; startIndex < end; startIndex++) {
          const endIndex = startIndex + 1;
          const letter = {
            characters: node.characters[startIndex]
          };
          names.forEach((n, i) => {
            letter[styleName[i]] = node["getRange" + n](startIndex, endIndex);
          });
          if (textStyle) {
            if (isEqualLetterStyle(letter, textStyle)) {
              textStyle.characters += letter.characters;
            } else {
              styleMap.push(textStyle);
              textStyle = letter;
            }
          } else {
            textStyle = letter;
          }
        }
        styleMap.push(textStyle);
        return styleMap;
      }
      function splitTextStyleIntoLines(textStyle, removeNewlineCharacters = false, removeEmptylines = false) {
        let line = [];
        let lines = [];
        const re = new RegExp("(.+|(?<=\n)(.?)(?=$))(\n|\u2028)?|(\n|\u2028)", "g");
        const re2 = new RegExp("\n|\u2028");
        textStyle.forEach((style, index) => {
          if (re2.test(style.characters)) {
            const ls = style.characters.match(re);
            if (ls === null) {
              line.push(style);
            } else if (ls.length === 1) {
              line.push(style);
              lines.push(line);
              line = [];
            } else {
              style = (0, _cloneDeep2.default)(style);
              style.characters = ls.shift();
              line.push(style);
              lines.push(line);
              line = [];
              const last = ls.pop();
              lines.push(...ls.map((e) => {
                style = (0, _cloneDeep2.default)(style);
                style.characters = e;
                return [style];
              }));
              style = (0, _cloneDeep2.default)(style);
              style.characters = last;
              if (last === "") {
                if (!textStyle[index + 1]) {
                  lines.push([style]);
                }
              } else {
                line.push(style);
              }
            }
          } else {
            line.push(style);
          }
        });
        if (line.length)
          lines.push(line);
        if (removeNewlineCharacters) {
          lines.forEach((l) => {
            const style = l[l.length - 1];
            style.characters = style.characters.replace(re2, "");
          });
        }
        if (removeEmptylines) {
          lines = lines.filter((l) => l.filter((l2) => l2.characters.replace(re2, "") !== "").length !== 0);
        }
        return lines;
      }
      function joinTextLinesStyles(textStyle, addNewlineCharacters = false) {
        const tStyle = (0, _cloneDeep2.default)(textStyle);
        let newline = "";
        switch (typeof addNewlineCharacters) {
          case "boolean":
            if (addNewlineCharacters)
              newline = "\n";
            break;
          case "string":
            newline = addNewlineCharacters;
            break;
        }
        if (addNewlineCharacters && newline) {
          tStyle.forEach((style, i) => {
            if (i !== tStyle.length - 1)
              style[style.length - 1].characters += newline;
          });
        }
        const line = tStyle.shift();
        tStyle.forEach((style) => {
          const fitst = style.shift();
          if (isEqualLetterStyle(fitst, line[line.length - 1])) {
            line[line.length - 1].characters += fitst.characters;
          } else {
            line.push(fitst);
          }
          if (style.length)
            line.push(...style);
        });
        return line;
      }
      async function applyTextStyleToTextNode(textStyle, textNode, isLoadFonts = true) {
        if (isLoadFonts) {
          let fonts = [{
            family: "Roboto",
            style: "Regular"
          }];
          if (textStyle[0].fontName) {
            fonts.push(...textStyle.map((e) => e.fontName));
          }
          if (textNode) {
            fonts.push(...(0, _getAllFonts.default)([textNode]));
          }
          fonts = (0, _uniqWith2.default)(fonts, _isEqual2.default);
          await (0, _loadFonts.default)(fonts);
        }
        if (!textNode)
          textNode = figma.createText();
        textNode.characters = textStyle.reduce((str, style) => {
          return str + style.characters;
        }, "");
        let n = 0;
        textStyle.forEach((style) => {
          const L = style.characters.length;
          if (L) {
            for (const key in style) {
              if (key !== "characters") {
                const name = key.replace(/^(.)/g, ($1) => $1.toUpperCase());
                textNode["setRange" + name](n, n + L, style[key]);
              }
            }
            n += L;
          }
        });
        return textNode;
      }
      function changeCharactersTextStyle(textStyle, characters) {
        textStyle = (0, _cloneDeep2.default)(textStyle);
        let n = 0;
        const length = textStyle.length - 1;
        const charactersLength = characters.length;
        for (let i = 0; i <= length; i++) {
          const s = textStyle[i];
          let l = s.characters.length;
          if (i == length)
            l = charactersLength;
          s.characters = characters.slice(n, n + l);
          n += l;
          if (n > charactersLength) {
            textStyle = textStyle.splice(0, i + 1);
            continue;
          }
        }
        return textStyle;
      }
      function changeTextStyle(textStyle, styleName, newValue, beforeValue) {
        textStyle = (0, _cloneDeep2.default)(textStyle);
        textStyle.forEach((style) => {
          if (beforeValue === void 0 || beforeValue !== void 0 && (0, _isEqual2.default)(style[styleName], beforeValue)) {
            ;
            style[styleName] = newValue;
          }
        });
        return textStyle;
      }
      function isEqualLetterStyle(letter, textStyle) {
        let is = true;
        for (const key in letter) {
          if (key !== "characters") {
            if (!(0, _isEqual2.default)(letter[key], textStyle[key])) {
              is = false;
              break;
            }
          }
        }
        return is;
      }
    }
  });

  // node_modules/@figma-plugin/helpers/dist/index.js
  var require_dist = __commonJS({
    "node_modules/@figma-plugin/helpers/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "clone", {
        enumerable: true,
        get: function() {
          return _clone.default;
        }
      });
      Object.defineProperty(exports, "getAllFonts", {
        enumerable: true,
        get: function() {
          return _getAllFonts.default;
        }
      });
      Object.defineProperty(exports, "getBoundingRect", {
        enumerable: true,
        get: function() {
          return _getBoundingRect.default;
        }
      });
      Object.defineProperty(exports, "getNodeIndex", {
        enumerable: true,
        get: function() {
          return _getNodeIndex.default;
        }
      });
      Object.defineProperty(exports, "getPage", {
        enumerable: true,
        get: function() {
          return _getPage.default;
        }
      });
      Object.defineProperty(exports, "hasChildren", {
        enumerable: true,
        get: function() {
          return _hasChildren.hasChildren;
        }
      });
      Object.defineProperty(exports, "isPartOfInstance", {
        enumerable: true,
        get: function() {
          return _isPartOfInstance.default;
        }
      });
      Object.defineProperty(exports, "isPartOfNode", {
        enumerable: true,
        get: function() {
          return _isPartOfNode.default;
        }
      });
      Object.defineProperty(exports, "isVisibleNode", {
        enumerable: true,
        get: function() {
          return _isVisibleNode.default;
        }
      });
      Object.defineProperty(exports, "loadUniqueFonts", {
        enumerable: true,
        get: function() {
          return _loadUniqueFonts.default;
        }
      });
      Object.defineProperty(exports, "loadFonts", {
        enumerable: true,
        get: function() {
          return _loadFonts.default;
        }
      });
      Object.defineProperty(exports, "nodeToObject", {
        enumerable: true,
        get: function() {
          return _nodeToObject.nodeToObject;
        }
      });
      Object.defineProperty(exports, "topLevelFrames", {
        enumerable: true,
        get: function() {
          return _topLevelFrames.default;
        }
      });
      Object.defineProperty(exports, "getTextNodeCSS", {
        enumerable: true,
        get: function() {
          return _getCSSStyles.getTextNodeCSS;
        }
      });
      Object.defineProperty(exports, "findAll", {
        enumerable: true,
        get: function() {
          return _findMethods.findAll;
        }
      });
      Object.defineProperty(exports, "getRelativePosition", {
        enumerable: true,
        get: function() {
          return _getRelativePosition.getRelativePosition;
        }
      });
      Object.defineProperty(exports, "getTopLevelParent", {
        enumerable: true,
        get: function() {
          return _getRelativePosition.getTopLevelParent;
        }
      });
      Object.defineProperty(exports, "figmaRGBToWebRGB", {
        enumerable: true,
        get: function() {
          return _convertColor.figmaRGBToWebRGB;
        }
      });
      Object.defineProperty(exports, "webRGBToFigmaRGB", {
        enumerable: true,
        get: function() {
          return _convertColor.webRGBToFigmaRGB;
        }
      });
      Object.defineProperty(exports, "figmaRGBToHex", {
        enumerable: true,
        get: function() {
          return _convertColor.figmaRGBToHex;
        }
      });
      Object.defineProperty(exports, "hexToFigmaRGB", {
        enumerable: true,
        get: function() {
          return _convertColor.hexToFigmaRGB;
        }
      });
      Object.defineProperty(exports, "isComponentNode", {
        enumerable: true,
        get: function() {
          return _isTypeNode.isComponentNode;
        }
      });
      Object.defineProperty(exports, "isFrameNode", {
        enumerable: true,
        get: function() {
          return _isTypeNode.isFrameNode;
        }
      });
      Object.defineProperty(exports, "isGroupNode", {
        enumerable: true,
        get: function() {
          return _isTypeNode.isGroupNode;
        }
      });
      Object.defineProperty(exports, "isInstanceNode", {
        enumerable: true,
        get: function() {
          return _isTypeNode.isInstanceNode;
        }
      });
      Object.defineProperty(exports, "isPageNode", {
        enumerable: true,
        get: function() {
          return _isTypeNode.isPageNode;
        }
      });
      Object.defineProperty(exports, "isTextNode", {
        enumerable: true,
        get: function() {
          return _isTypeNode.isTextNode;
        }
      });
      Object.defineProperty(exports, "isOneOfNodeType", {
        enumerable: true,
        get: function() {
          return _isTypeNode.isOneOfNodeType;
        }
      });
      Object.defineProperty(exports, "extractImageCropParams", {
        enumerable: true,
        get: function() {
          return _extractImageCropParams.extractImageCropParams;
        }
      });
      Object.defineProperty(exports, "extractLinearGradientParamsFromTransform", {
        enumerable: true,
        get: function() {
          return _extractLinearGradientStartEnd.extractLinearGradientParamsFromTransform;
        }
      });
      Object.defineProperty(exports, "extractRadialOrDiamondGradientParams", {
        enumerable: true,
        get: function() {
          return _extractRadialOrDiamondGradientParams.extractRadialOrDiamondGradientParams;
        }
      });
      Object.defineProperty(exports, "setCharacters", {
        enumerable: true,
        get: function() {
          return _setCharacters.setCharacters;
        }
      });
      Object.defineProperty(exports, "parseTextStyle", {
        enumerable: true,
        get: function() {
          return _parseTextStyle.parseTextStyle;
        }
      });
      Object.defineProperty(exports, "splitTextStyleIntoLines", {
        enumerable: true,
        get: function() {
          return _parseTextStyle.splitTextStyleIntoLines;
        }
      });
      Object.defineProperty(exports, "joinTextLinesStyles", {
        enumerable: true,
        get: function() {
          return _parseTextStyle.joinTextLinesStyles;
        }
      });
      Object.defineProperty(exports, "applyTextStyleToTextNode", {
        enumerable: true,
        get: function() {
          return _parseTextStyle.applyTextStyleToTextNode;
        }
      });
      Object.defineProperty(exports, "changeCharactersTextStyle", {
        enumerable: true,
        get: function() {
          return _parseTextStyle.changeCharactersTextStyle;
        }
      });
      Object.defineProperty(exports, "changeTextStyle", {
        enumerable: true,
        get: function() {
          return _parseTextStyle.changeTextStyle;
        }
      });
      var _clone = _interopRequireDefault(require_clone());
      var _getAllFonts = _interopRequireDefault(require_getAllFonts());
      var _getBoundingRect = _interopRequireDefault(require_getBoundingRect());
      var _getNodeIndex = _interopRequireDefault(require_getNodeIndex());
      var _getPage = _interopRequireDefault(require_getPage());
      var _hasChildren = require_hasChildren();
      var _isPartOfInstance = _interopRequireDefault(require_isPartOfInstance());
      var _isPartOfNode = _interopRequireDefault(require_isPartOfNode());
      var _isVisibleNode = _interopRequireDefault(require_isVisibleNode());
      var _loadUniqueFonts = _interopRequireDefault(require_loadUniqueFonts());
      var _loadFonts = _interopRequireDefault(require_loadFonts());
      var _nodeToObject = require_nodeToObject();
      var _topLevelFrames = _interopRequireDefault(require_topLevelFrames());
      var _getCSSStyles = require_getCSSStyles();
      var _findMethods = require_findMethods();
      var _getRelativePosition = require_getRelativePosition();
      var _convertColor = require_convertColor();
      var _isTypeNode = require_isTypeNode();
      var _extractImageCropParams = require_extractImageCropParams();
      var _extractLinearGradientStartEnd = require_extractLinearGradientStartEnd();
      var _extractRadialOrDiamondGradientParams = require_extractRadialOrDiamondGradientParams();
      var _setCharacters = require_setCharacters();
      var _parseTextStyle = require_parseTextStyle();
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
    }
  });

  // plugin-src/code.js
  var import_helpers = __toESM(require_dist());
  figma.showUI(__html__, { visible: true, height: 600, width: 600, title: "Kenny is testing" });
  var isSymbol = (val) => typeof val === "symbol";
  async function traverse(node) {
    let styles = {};
    let image = null;
    if (node.type == "FRAME") {
      if (isSymbol(node.fills)) {
      } else {
        for (const paint of node.fills) {
          if (paint.type === "IMAGE") {
            const im = figma.getImageByHash(paint.imageHash);
            const bytes = await im.getBytesAsync();
            image = bytes;
          }
        }
      }
    }
    if (node.type == "COMPONENT") {
      if (isSymbol(node.fills)) {
      } else {
        for (const paint of node.fills) {
          if (paint.type === "IMAGE") {
            const im = figma.getImageByHash(paint.imageHash);
            const bytes = await im.getBytesAsync();
            image = bytes;
          }
        }
      }
    }
    if (node.type == "TEXT") {
      if (isSymbol(node.fontName) || isSymbol(node.fontSize) || isSymbol(node.fontWeight) || isSymbol(node.fills)) {
        styles.fontName = node.fontName.description;
        styles.fontSize = node.fontSize.description;
        styles.fontWeight = node.fontWeight.description;
      } else {
        styles.fontName = node.fontName;
        styles.fontSize = node.fontSize;
        styles.fontWeight = node.fontWeight;
      }
    }
    if (node.type == "RECTANGLE") {
      if (isSymbol(node.fills)) {
      } else {
        for (const paint of node.fills) {
          if (paint.type === "IMAGE") {
            const im = figma.getImageByHash(paint.imageHash);
            const bytes = await im.getBytesAsync();
            image = bytes;
          }
        }
      }
    }
    if (node.type == "INSTANCE") {
      if (isSymbol(node.fills)) {
      } else {
        for (const paint of node.fills) {
          if (paint.type === "IMAGE") {
            const im = figma.getImageByHash(paint.imageHash);
            const bytes = await im.getBytesAsync();
            image = bytes;
          }
        }
      }
    }
    const json = {
      name: node.name,
      parentNode: {
        width: node.width,
        height: node.height,
        topLeftRadius: node.topLeftRadius,
        topRightRadius: node.topRightRadius,
        bottomLeftRadius: node.bottomLeftRadius,
        bottomRightRadius: node.bottomRightRadius,
        bottomRightRadius: node.bottomRightRadius,
        backgrounds: node.backgrounds
      },
      image,
      parent: node.parent,
      type: node.type,
      id: node.id,
      inferredAutoLayout: node.inferredAutoLayout,
      styles,
      characters: node.characters,
      fills: isSymbol(node.fills) ? node.fills.description : node.fills,
      children: node.children && node.children.length && await innerEle(node.children)
    };
    return json;
  }
  async function innerEle(ch) {
    const allCh = await Promise.all(
      ch.map(async (el) => {
        const nest = await traverse(el);
        return nest;
      })
    );
    return allCh;
  }
  figma.ui.onmessage = async (message) => {
    try {
      for (const node of figma.currentPage.selection) {
        const jsonformat = (0, import_helpers.nodeToObject)(node);
        const json = await traverse(jsonformat);
        figma.ui.postMessage(json);
      }
    } catch (error) {
      console.log("errorerrorerror", error);
    }
  };
})();
