(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['org-file-parser-with-js'] = {}));
}(this, (function (exports) { 'use strict';

  function _wrapRegExp() {
    _wrapRegExp = function (re, groups) {
      return new BabelRegExp(re, void 0, groups);
    };

    var _super = RegExp.prototype,
        _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = new RegExp(re, flags);

      return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf(_this, BabelRegExp.prototype);
    }

    function buildGroups(result, re) {
      var g = _groups.get(re);

      return Object.keys(g).reduce(function (groups, name) {
        return groups[name] = result[g[name]], groups;
      }, Object.create(null));
    }

    return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) {
      var result = _super.exec.call(this, str);

      return result && (result.groups = buildGroups(result, this)), result;
    }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
      if ("string" == typeof substitution) {
        var groups = _groups.get(this);

        return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
          return "$" + groups[name];
        }));
      }

      if ("function" == typeof substitution) {
        var _this = this;

        return _super[Symbol.replace].call(this, str, function () {
          var args = arguments;
          return "object" != typeof args[args.length - 1] && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
        });
      }

      return _super[Symbol.replace].call(this, str, substitution);
    }, _wrapRegExp.apply(this, arguments);
  }

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };
    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  var toString = Object.prototype.toString;
  var assign = Object.assign;
  var isString = function isString(v) {
    return toString.call(v) === '[object String]';
  };
  var isArray = Array.isArray;
  function matchTimestamp(timestamp) {
    var re = /*#__PURE__*/_wrapRegExp(/((\d{4})\x2D(\d{2})\x2D(\d{2})|(\w{3})|(\d{2}:\d{2}(\x2D\d{2}:\d{2})?)|([-+]\d+[wydm]))/gi, {
      year: 2,
      month: 3,
      day: 4,
      week: 5,
      time: 6,
      dein: 8
    });

    var result = {
      year: '',
      month: '',
      day: ''
    };
    var matches = Array.from(timestamp.matchAll(re));

    var _loop = function _loop() {
      var match = _matches[_i];
      var gs = match.groups;

      if (gs) {
        Object.keys(gs).forEach(function (key) {
          if (gs[key]) result[key] = gs[key];
        });
      }
    };

    for (var _i = 0, _matches = matches; _i < _matches.length; _i++) {
      _loop();
    }

    var year = result.year,
        month = result.month,
        day = result.day;

    if (!year && !month && !day) {
      return timestamp.trim();
    }

    return result;
  }
  function findIndex(list, callback, fromIndex) {
    if (fromIndex === void 0) {
      fromIndex = 0;
    }

    return list.slice(fromIndex).findIndex(callback);
  }
  function traverse(root, cb) {
    var children = root.children;

    if (children != null && children.length) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        cb(child, root, i);
        traverse(child, cb);
      }
    }
  }
  function hasElement(arr, ele) {
    return arr.indexOf(ele) > -1;
  }

  (function (OrgStates) {
    OrgStates["DONE"] = "DONE";
    OrgStates["DOING"] = "DOING";
    OrgStates["WAITING"] = "WAITING";
    OrgStates["CANCELLED"] = "CANCELLED";
    OrgStates["SCHEDULED"] = "SCHEDULED";
  })(exports.OrgStates || (exports.OrgStates = {}));

  (function (OrgNodeTypes) {
    OrgNodeTypes[OrgNodeTypes["ROOT"] = 0] = "ROOT";
    OrgNodeTypes[OrgNodeTypes["TEXT"] = 1] = "TEXT";
    OrgNodeTypes[OrgNodeTypes["PROPERTY"] = 2] = "PROPERTY";
    OrgNodeTypes[OrgNodeTypes["HEADER"] = 3] = "HEADER";
    OrgNodeTypes[OrgNodeTypes["BLOCK"] = 4] = "BLOCK";
    OrgNodeTypes[OrgNodeTypes["EMPHASIS"] = 5] = "EMPHASIS";
    OrgNodeTypes[OrgNodeTypes["LIST"] = 6] = "LIST";
    OrgNodeTypes[OrgNodeTypes["LIST_ITEM"] = 7] = "LIST_ITEM";
    OrgNodeTypes[OrgNodeTypes["TIMESTAMP"] = 8] = "TIMESTAMP";
    OrgNodeTypes[OrgNodeTypes["LINK"] = 9] = "LINK";
    OrgNodeTypes[OrgNodeTypes["STATE"] = 10] = "STATE";
    OrgNodeTypes[OrgNodeTypes["SUB_SUP"] = 11] = "SUB_SUP";
    OrgNodeTypes[OrgNodeTypes["COLORFUL_TEXT"] = 12] = "COLORFUL_TEXT";
    OrgNodeTypes[OrgNodeTypes["TABLE"] = 13] = "TABLE";
  })(exports.OrgNodeTypes || (exports.OrgNodeTypes = {}));

  (function (InlineEmphasisSign) {
    InlineEmphasisSign["CODE_EQUAL"] = "=";
    InlineEmphasisSign["CODE_WAVE"] = "~";
    InlineEmphasisSign["LINE_THROUGH"] = "+";
    InlineEmphasisSign["UNDERLINE"] = "_";
    InlineEmphasisSign["ITALIC"] = "/";
    InlineEmphasisSign["BOLD"] = "*";
    InlineEmphasisSign["LATEX"] = "$";
    InlineEmphasisSign["ANGLE"] = "<";
  })(exports.InlineEmphasisSign || (exports.InlineEmphasisSign = {}));

  var SIGN_SUB = '_';
  var SIGN_SUP = '^';

  // 正则表达式
  var propertyRE = /^(\s*)#\+(?!begin|end)([\w-_]+)\s*:(.*)$/i;
  var headerRE = /^(\*+)\s+(.*)$/i;
  var blockRE = /^(\s*)#\+begin_([\w-]+)\s+([\w-]+)\s+(:[^\n]+\n)\s*(.*)#\+end_(\2)/i;
  var blockBeginRE = /^(\s*)#\+begin_([\w-]+)(\s+[\w-]+)?(\s+.*)?/;
  var blockEndRE = /^(\s*)#\+end_([\w-]+)$/;
  var blockOptionsRE = /-(\w)\s([^-]+)?/gi;
  var unorderListRE = /^(\s*)(-|\+|\s+\*)\s+(\[[-x ]\]\s+)?(.*)$/;
  var orderListRE = /^(\s*)([\d\w]+)(?:\.|\))\s+(\[[-x ]\]\s+)?(.*)$/;
  var extLinkRE = /\[\[([^[\]]+)](?:\[([^[\]]+)])?\]/g;
  var extLinkXRE = /^\[\[([^[\]]+)](?:\[([^[\]]+)])?\]/;
  var innerLinkRE = /<<([^<>]+)>>/g;
  var innerLinkXRE = /^<<([^<>]+)>>/;
  var emphasisRE = /([=~\+_/\$\*]|[!&%@][!&%@])(?=[^\s])([^\1]+?\S)(?:\1)/g;
  var timestampRE = /\<(\d{4}-\d{2}-\d{2}\s+[^>]+)>/gi; // check timestamp re

  var timestampXRE = /^\<(\d{4}-\d{2}-\d{2}\s+[^>]+)>/i; // check timestamp re
  // 增加支持emphasis,colorful 上下标

  var subSupRE = /([\w-]+)(\^|_){([<\w-=:~\+/*>]+)}/gi;
  var subSupXRE = /^([\w-]+)(\^|_){([<\w-=:~\+/*>]+)}/; // table regexp

  var tableRowRE = /^(\s*)\|(.*?)\|$/;
  var tableRowLineRE = /^(\s*)\|[+-]+\|$/;
  var colorNameREStr = "[a-zA-Z]+|#[0-9a-e]{3}|#[0-9a-e]{6}"; // shit????????????, global 用来遍历找出结果，无global的用来检查是否匹配正则

  var colorTextRE = {
    // 找出所有 <red:text> 文本时使用
    angleGlobal: /*#__PURE__*/new RegExp("<(" + colorNameREStr + "):([^<>]+)>", 'gi'),
    // 在检查是不是 `<red:text .. bala...>` 开头的文本
    angleBegin: /*#__PURE__*/new RegExp("^<(" + colorNameREStr + "):([^<>]+)>", 'i'),
    // 找出所有 `xxx red:text-...` 文本时使用
    bareGlobal: /*#__PURE__*/new RegExp("(\\s+" + colorNameREStr + "):([^\\s<>]+)\\s+", 'gi'),
    // 找出所有 `red:text...` 开头的文本
    bareBeginGlobal: /*#__PURE__*/new RegExp("^(" + colorNameREStr + "):([^\\s<>]+)\\s+", 'gi'),
    // 检查是不是 `red:text... text ...` 开头的文本
    bareBegin: /*#__PURE__*/new RegExp("^(" + colorNameREStr + "):([^\\s<>]+)\\s+", 'i')
  };
  var states = ['TODO', 'DONE', 'CANCELLED'];
  var stateRE = /*#__PURE__*/new RegExp("(" + /*#__PURE__*/states.join('|') + ")", 'g');
  var stateXRE = /*#__PURE__*/new RegExp("^(" + /*#__PURE__*/states.join('|') + ")");

  /**
   * 解析成对出现的特殊字体或格式，代码参考的是 vue3 的 compiler-core/src/parse.ts 中的
   * 对 SFC template 解析的代码。
   * 如：_underline_, +line through+, /italic/, *bold*
   * 或自定义的，如：!@%& 组件成不同字体文字，或 <color:text> color:text, 等等
   * 更丰富的文本。
   * @fileOverview
   * @name emphasis.ts
   * @author Zhicheng Lee <gccll.love@gmail.com>
   * @license MIT
   */
  var extraTags = ['!', '@', '%', '&'];
  var extraTagMap = /*#__PURE__*/extraTags.reduce(function (tags, tag) {
    for (var i = 0; i < extraTags.length; i++) {
      tags.push(tag + extraTags[i]);
    }

    return tags;
  }, []);
  var tagMap = {
    _: '_',
    '<': '>',
    '+': '+',
    '[': ']',
    '/': '/'
  };
  extraTagMap.forEach(function (tag) {
    return tagMap[tag] = tag;
  });
  var endTokens = /*#__PURE__*/['_', '>', '+', '<', '[', '/'].concat(extraTagMap);
  function last(xs) {
    return xs[xs.length - 1];
  }

  function isStartTag(ch) {
    return Object.keys(tagMap).includes(ch);
  }

  function isEndTag(ch) {
    return Object.values(tagMap).includes(ch);
  } // entry function


  function parseEmphasisNode(content, padSpaces) {
    if (padSpaces === void 0) {
      padSpaces = true;
    }

    content = padSpaces ? content + "   " : content;
    var context = {
      source: content
    };
    var root = {
      type: exports.OrgNodeTypes.TEXT,
      children: []
    };
    root.children = parseChildren(context, []);
    root.children = root.children.filter(function (child) {
      if (typeof child.content === 'string') {
        return child.content.trim() !== '';
      }

      return true;
    });
    return root;
  } // <2022-12-22 11:00>

  function parseTimeStamp(context) {
    var s = context.source;

    var _ref = timestampXRE.exec(s) || [],
        text = _ref[0],
        ts = _ref[1];

    context.source = s.slice(text.length);
    return {
      timestamp: matchTimestamp(ts),
      type: exports.OrgNodeTypes.TIMESTAMP
    };
  }

  function parseColorText(context) {
    var s = context.source;

    var _ref2 = colorTextRE.bareBegin.exec(s) || [],
        text = _ref2[0],
        color = _ref2[1],
        value = _ref2[2];

    context.source = s.slice(text.length);
    return {
      type: exports.OrgNodeTypes.COLORFUL_TEXT,
      color: color,
      content: value,
      indent: 0,
      // 颜色文本比较特殊，无法从正常的 parseChildren 流程中解析出其 children
      // 因此这里手动执行一次
      children: parseChildren({
        source: value
      }, [])
    };
  } // [[url:abbrev][description]]

  function parseExtLink(context) {
    var s = context.source;

    var _ref3 = extLinkXRE.exec(s) || [],
        text = _ref3[0],
        url = _ref3[1],
        description = _ref3[2];

    context.source = s.slice(text.length);
    var trimUrl = url.trim();
    var match = /:([\w_-]+)$/.exec(trimUrl);
    var abbrev = '';

    if (match) {
      abbrev = match[1] || '';
    }

    return {
      type: exports.OrgNodeTypes.LINK,
      linkType: 'external',
      url: trimUrl,
      description: description,
      abbrev: abbrev
    };
  } // <<meta-id>> 内部链接多是标题的 meta id


  function parseInnerLink(context) {
    var s = context.source;

    var _ref4 = innerLinkXRE.exec(s) || [],
        text = _ref4[0],
        url = _ref4[1];

    context.source = s.slice(text.length);
    return {
      type: exports.OrgNodeTypes.LINK,
      linkType: 'inner',
      url: url
    };
  }

  function parseStateKeyword(context) {
    var s = context.source;

    var _ref5 = stateXRE.exec(s) || [],
        text = _ref5[0],
        state = _ref5[1];

    context.source = s.slice(text.length);
    return {
      type: exports.OrgNodeTypes.STATE,
      state: state
    };
  }

  function parseChildren(context, ancestors) {
    var nodes = [];

    while (!isEnd(context, ancestors)) {
      advanceBy(context); // trim start spaces

      var s = context.source;
      var node = undefined;
      var ds = s.slice(0, 2); // 取头两个，可能是 !@%& 组合 !@,...

      if (stateXRE.test(s)) {
        node = parseStateKeyword(context);
      } else if (isStartTag(s[0]) && s[1] !== ' ' || isStartTag(ds) && s[2] !== '') {
        // 处理一些特殊的非嵌套文本
        var jumpOut = false;

        if (s[0] === '[') {
          if (s[1] === '[' && extLinkXRE.test(s)) {
            // external link
            node = parseExtLink(context);
            jumpOut = true;
          }
        } else if (s[0] === '<') {
          jumpOut = true;

          if (s[1] === '<' && innerLinkXRE.test(s)) {
            node = parseInnerLink(context);
          } else if (timestampXRE.test(s)) {
            node = parseTimeStamp(context);
          } else {
            jumpOut = false;
          }
        } // else if (hasElement(extraTags, s[0])) {
        // }


        if (!jumpOut) {
          node = parseElement(context, ancestors);
        }
      } else if (isEndTag(s[0]) || isEndTag(ds)) {
        context.source = context.source.slice(isEndTag(ds) ? ds.length : 1);
        continue;
      }

      if (!node) {
        node = parseNestText(context);
      }

      if (isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          pushNode(nodes, node[i]);
        }
      } else {
        pushNode(nodes, node);
      }
    }

    return nodes;
  }

  function advanceBy(context, nn) {
    var s = context.source;
    var n = s.length - s.trimStart().length;
    if (nn && nn > 0) n = nn;

    if (n > 0) {
      context.source = s.slice(n);
    }
  }

  function parseElement(context, ancestors) {
    var s = context.source;
    var tag = s[0];
    var extra = false;

    if (extraTags.indexOf(tag) > -1) {
      tag = s.substring(0, 2);
      extra = true;
    }

    context.source = s.trimStart().slice(tag.length);
    var element = {
      type: exports.OrgNodeTypes.EMPHASIS,
      sign: tag,
      children: [],
      extra: extra
    };
    ancestors.push(element);
    var children = parseChildren(context, ancestors);
    ancestors.pop();
    element.children = children;
    var endTag = tagMap[element.sign];

    if (startsWith(context.source, endTag)) {
      context.source = context.source.slice(endTag.length);
    }

    return element;
  }

  function parseNestText(context) {
    var s = context.source;
    var endIndex = s.length;

    for (var i = 0; i < endTokens.length; i++) {
      var token = endTokens[i];
      var index = s.indexOf(token);

      if (index !== -1 && endIndex > index) {
        endIndex = index;
      }
    }

    var content = s.slice(0, endIndex);
    context.source = s.slice(endIndex);
    return {
      type: exports.OrgNodeTypes.TEXT,
      content: content
    };
  }

  function pushNode(nodes, node) {
    nodes.push(node);
  }

  function isEnd(context, ancestors) {
    var s = context.source;
    var tags = Object.entries(tagMap);

    for (var i = 0; i < tags.length; i++) {
      var _tags$i = tags[i],
          start = _tags$i[0],
          _tags$i$ = _tags$i[1],
          end = _tags$i$ === void 0 ? start : _tags$i$;

      if (checkIsEnd(s, ancestors, start, end)) {
        return true;
      }
    }

    return !s;
  }

  function checkIsEnd(s, ancestors, startTag, endTag) {
    if (endTag === void 0) {
      endTag = startTag;
    }

    if (startsWith(s, endTag)) {
      for (var i = ancestors.length - 1; i >= 0; --i) {
        var c = ancestors[i];

        if ('sign' in c && c.sign === startTag) {
          return true;
        }
      }
    }

    return false;
  }

  function startsWith(s1, s2) {
    return s1.startsWith(s2);
  }

  function transformColorText(node) {
    if (node.type === exports.OrgNodeTypes.EMPHASIS && node.sign === '<') {
      var _ref = node.children || [],
          first = _ref[0];

      if (first && first.type === exports.OrgNodeTypes.TEXT) {
        var s = first.content;

        if (isString(s) && colorTextRE.bareBegin.test(s + ' ')) {
          var idx = s.indexOf(':');

          if (idx > 0) {
            var color = s.substring(0, idx);
            var value = s.substring(idx + 1);
            assign(node, {
              type: exports.OrgNodeTypes.COLORFUL_TEXT,
              color: color
            });
            first.content = value; // red:underline -> underline
            // 将值部分再解析

            first.children = parseEmphasisNode(value).children;
          }
        }
      }
    }
  }
  function transformList(node, parent, index) {
    var children = parent.children || [];
    var _node$indent = node.indent,
        indent = _node$indent === void 0 ? 0 : _node$indent,
        name = node.name,
        isOrder = node.isOrder;
    var toDeletions = [];
    var listNode = {
      type: exports.OrgNodeTypes.LIST,
      name: name,
      isOrder: isOrder,
      items: [node]
    };
    var current = node,
        prevNode = children[index - 1]; // 可以为该列表增加一些属性

    if ((prevNode == null ? void 0 : prevNode.type) === exports.OrgNodeTypes.PROPERTY && prevNode.name.toLowerCase() === 'list_attr') {
      var _prevNode$value = prevNode.value,
          value = _prevNode$value === void 0 ? '' : _prevNode$value;

      if (typeof value === 'string') {
        listNode.attrs = value.split(';').reduce(function (result, curr) {
          if (curr) {
            var _split = (curr || '').split('='),
                _name = _split[0],
                _value = _split[1];

            result[_name] = _value;
          }

          return result;
        }, {});
      }

      toDeletions.push({
        node: prevNode,
        children: children,
        index: index - 1
      });
    }

    var _loop = function _loop(i) {
      var child = children[i];

      if (child.type !== exports.OrgNodeTypes.LIST_ITEM) {
        // 不是列表时，通过检查 indent 决定是不是当前节点的子节点
        // 如果该节点的缩进小于或等于当前list item 说明该列表项结束了
        // 如：非父子关系
        // - list item 1
        // new line text
        // 如：父子关系
        // - list item 2
        //   new line text
        var _child$indent = child.indent,
            childIndent = _child$indent === void 0 ? 0 : _child$indent;

        if (childIndent <= indent) {
          return "break";
        } else {
          // 存在父子关系，将该节点存放到当前list item 节点的 children
          (current.children = current.children || []).push(child);
          toDeletions.push({
            node: child,
            children: children,
            index: i
          });
        }
      } else {
        current = child;

        var push = function push() {
          listNode.items.push(child);
          toDeletions.push({
            node: child,
            children: children,
            index: i
          });
        };

        if (isOrder) {
          // 有序列表的 name 是不同的，应该是递增的(a->b, 1->2, i->ii, ...)
          // 目前只支持 1. ... 和 a. 或 1) 和 a) 形式的列表
          if (/[0-9]+/.test(name) && /[0-9]+/.test(child.name)) {
            if (+child.name - +name >= 1) {
              // 1. xxx 2. yyy, 或 1. xxx 3. yyy
              push();
            } else {
              // 3. xxx 1.yyy -> 重新开始
              return "break";
            }
          } else if (/[a-zA-Z]/.test(name) && /[a-zA-Z]/.test(child.name)) {
            if (child.name > name) {
              // a) xxx b) yyy
              push();
            } else {
              return "break";
            }
          }
        } else {
          // 无序列表直接判断 name 就行，如： - xxx \n - yyy
          if (child.name === node.name) {
            // 同一类型的
            push();
          }
        }
      }
    };

    for (var i = index + 1; i < children.length; i++) {
      var _ret = _loop(i);

      if (_ret === "break") break;
    } // 将 list item 替换成 list 节点


    children.splice(index, 1, listNode); // 待删除的节点

    if (toDeletions.length) {
      toDeletions.forEach(function (deletion) {
        var _deletion$children = deletion.children,
            children = _deletion$children === void 0 ? [] : _deletion$children,
            node = deletion.node; // 可能索引发生的变化，不能直接使用缓存的 Index

        var index = children.indexOf(node);
        index > -1 && children.splice(index, 1);
      });
    }
  }

  function baseParse(source, options) {
    var _ref = options || {},
        extraTextBackground = _ref.extraTextBackground; // 按行分析，因为 file.org 文档中主要是按照行来区分文章内容的。


    var list = source.split(/\n+/);
    var nodes = []; // 文章开头可能包含一些全文的属性，比如：org-roam 的 ID

    var properties = parseHeadProperty(0, list);

    for (var i = 0; i < list.length; i++) {
      var node = parseNode(list[i], list, i);

      if (node) {
        nodes.push(node);
      }
    }

    nodes = nodes.filter(function (node) {
      return node && node.content !== '';
    });
    var root = {
      type: exports.OrgNodeTypes.ROOT,
      children: nodes,
      properties: properties,
      footnotes: [],
      options: options
    };
    traverse(root, function (node, parent, childIndex) {
      if (node.type === exports.OrgNodeTypes.EMPHASIS) {
        // 处理 content 中包含 red:text 的文本，因为 emphasis.ts 中会将
        // _u1 <red:underline ... /italic/ xxx> u2_ 这种复杂的文本中的 <red:underline 解析
        // 成 EMPHASIS 节点。
        transformColorText(node); // 控制 extra emphasis text(!@%&) 文本的背景显示

        if (node.extra && extraTextBackground) {
          node.background = extraTextBackground;
        }
      } else if (node.type === exports.OrgNodeTypes.BLOCK) {
        if (node.name === 'textbox' && isString(node.code)) {
          node.code = parseEmphasisNode(node.code);
        }
      } else if (node.type === exports.OrgNodeTypes.LIST_ITEM) {
        transformList(node, parent, childIndex);
      }
    });
    return root;
  }

  function parseNode(source, list, index) {
    var node;

    if (tableRowRE.test(source)) {
      node = parseTable(source, list, index);
    } else if (blockBeginRE.test(source)) {
      node = parseBlock(source, list, index);
    } else if (propertyRE.test(source)) {
      node = parseProperty(source);
    } else if (headerRE.test(source)) {
      node = parseHeader(source, list, index);
    } else if (unorderListRE.test(source)) {
      node = parseList(source, list, index, false);
    } else if (orderListRE.test(source)) {
      node = parseList(source, list, index, true);
    } else {
      node = undefined;
    }

    if (!node) {
      node = parseText(source);
    }

    return node;
  }

  function parseTable(source, list, index) {
    var nodes = [];
    var firstRow;
    var indent = source.length - source.trimStart().length;
    var start = index,
        end = index + 1;

    for (var i = index; i < list.length; i++) {
      var s = list[i].trim();

      if (s == '') {
        continue;
      } // 使用 tableRowRE 变量的话会存在正则记录 lastIndex 问题


      if (tableRowLineRE.test(s)) ; else if (tableRowRE.test(s)) {
        var ss = s.replace(/^\||\|$/g, '');
        var values = ss.split('|').map(function (s) {
          return s.trim();
        });

        if (!firstRow) {
          firstRow = values;
          continue;
        } // ['a', 'b', 'c'] => { '0': 'a', '1': 'b', '2': 'c' }
        // 与 columns 对应关系：[{ label: 'xxx', prop: '0' }, ...]


        nodes.push(values.reduce(function (o, val, index) {
          o[index + ''] = val;
          return o;
        }, {}));
      } else {
        end = i;
        break;
      }
    }

    var rows = end - start;
    list.splice(start, rows);
    return {
      type: exports.OrgNodeTypes.TABLE,
      nodes: nodes,
      columns: firstRow ? firstRow.map(function (val, i) {
        return {
          label: val,
          prop: i + ''
        };
      }) : [],
      rows: rows,
      indent: indent
    };
  }

  function parseList(source, list, index, isOrder) {
    var _re = isOrder ? orderListRE : unorderListRE;

    var _ref2 = _re.exec(source) || [],
        _ref2$ = _ref2[1],
        indent = _ref2$ === void 0 ? '' : _ref2$,
        _ref2$2 = _ref2[2],
        name = _ref2$2 === void 0 ? '' : _ref2$2,
        _ref2$3 = _ref2[3],
        state = _ref2$3 === void 0 ? '' : _ref2$3,
        _ref2$4 = _ref2[4],
        text = _ref2$4 === void 0 ? '' : _ref2$4;

    return {
      type: exports.OrgNodeTypes.LIST_ITEM,
      content: parseText(text),
      children: [],
      name: name,
      state: state,
      indent: indent.length,
      isOrder: isOrder
    };
  }

  function parseTextWithNode(node, keyOrAll) {
    var key = 'content',
        all = false;

    if (typeof keyOrAll === 'string') {
      key = keyOrAll;
    } else if (typeof keyOrAll === 'boolean') {
      all = keyOrAll;
    }

    var s = node[key];
    var reParserMap = [// parse state keywords(eg. TODO, DONE, CANCELLED)
    [stateRE, parseStateKeywords], // parse sub or sup text, 如：header_sub 或 header_{sub}
    [subSupRE, parseSubSupText], // parse colorful bare text, 如：red:red-text
    [colorTextRE.bareGlobal, parseColorfulBareText], [colorTextRE.bareBeginGlobal, parseColorfulBareText]]; // 需要递归进行解析，因此需要保证每个函数都能被执行到

    if (all) {
      reParserMap.forEach(function (_ref3) {
        var parser = _ref3[1];
        return parser(node);
      });
      return;
    } // 这里适合用于单个匹配情况下执行，满足一个正则就立即解析出结果
    // 如：标题上有上下标时(sub/sup)，而上下标又支持富文本情况(如：颜色，斜体等等)
    // 但不能多重嵌套(TODO)


    for (var i = 0; i < reParserMap.length; i++) {
      var _reParserMap$i = reParserMap[i],
          _re2 = _reParserMap$i[0],
          parser = _reParserMap$i[1];

      if (typeof s === 'string' && _re2.test(s)) {
        return parser(node);
      }
    }

    return;
  }

  function parseText(source, _, __) {
    var _node$children;

    var matched = source.match(/^(\s+)/);
    var indent = 0;

    if (matched) {
      indent = matched[1].length;
    }

    var node = {
      type: exports.OrgNodeTypes.TEXT,
      content: source.trim(),
      indent: indent,
      children: []
    }; // parseEmphasisNode(source.trim());
    // node.indent = indent

    parseTextWithNode(node, true);
    var children = [];

    if ((_node$children = node.children) != null && _node$children.length) {
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        if (!child) continue;

        if (child.type === exports.OrgNodeTypes.COLORFUL_TEXT || child.type === exports.OrgNodeTypes.STATE || child.type === exports.OrgNodeTypes.SUB_SUP) {
          // 简单文本已经处理过了，不需要再处理
          children.push(child);
          continue;
        } // 复杂，成对(_underline_, ...)，可能嵌套的富文本，解析出来合并


        var complexNode = parseEmphasisNode(child.content);
        children.push.apply(children, complexNode.children || []);
      }
    }

    node.children = children;
    return node;
  } // red:xxxx


  function parseColorfulBareText(node) {
    return parseTextExtra(node, colorTextRE.bareGlobal, function (values) {
      var color = values[1],
          text = values[2];
      return {
        type: exports.OrgNodeTypes.COLORFUL_TEXT,
        color: color.trim(),
        content: text,
        indent: 0
      };
    });
  }
  function parseSubSupText(node) {
    return parseTextExtra(node, subSupRE, function (values) {
      var target = values[1],
          sign = values[2],
          value = values[3];
      var o = {
        target: target,
        sign: sign,
        type: exports.OrgNodeTypes.SUB_SUP,
        value: value
      };

      if (sign === SIGN_SUB) {
        o.sub = true;
      } else {
        o.sup = true;
      }

      return o;
    });
  }
  function parseStateKeywords(node) {
    return parseTextExtra(node, stateRE, function (values) {
      return {
        type: exports.OrgNodeTypes.STATE,
        state: values[1]
      };
    });
  }

  function parseBlock(source, list, index) {
    var matched = blockBeginRE.exec(source);

    if (!matched) {
      return;
    }

    var i; // 找到最近的 end block
    // TODO 解决嵌套问题

    for (i = index + 1; i < list.length; i++) {
      var next = list[i];

      if (next != null && next.match(blockEndRE)) {
        break;
      }
    } // no end block


    if (i === list.length) {
      // TODO error
      return;
    }

    var attr = matched[4] || ''; // 找到选项中第一个 `:` 的索引

    var optionEndIndex = attr.indexOf(':');
    var options = [];
    var optionString = ''; // FIX: 解决 $+begin_src emacs-lisp -n -r 没有选项 :name value 的情况

    if (optionEndIndex === -1) {
      optionEndIndex = attr.length;
    }

    if (optionEndIndex > 0) {
      optionString = attr.slice(0, optionEndIndex);
      attr = attr.slice(optionEndIndex);
      options = parseCLIOption(optionString);
    }

    var attributes = [];

    if (attr) {
      var attrs = (" " + attr + " ").split(/\s+:/);

      for (var _i = 0; _i < attrs.length; _i++) {
        var attrVal = attrs[_i];

        if (attrVal) {
          var _attrVal$split = attrVal.split(/\s+/),
              name = _attrVal$split[0],
              _attrVal$split$ = _attrVal$split[1],
              value = _attrVal$split$ === void 0 ? '' : _attrVal$split$;

          if (name) {
            attributes.push({
              name: name.trim(),
              value: value === '' ? true : value.trim()
            });
          }
        }
      }
    }

    var node = {
      type: exports.OrgNodeTypes.BLOCK,
      indent: (matched[1] || '').length,
      name: (matched[2] || '').trim(),
      code: list.slice(index + 1, i).join('\n'),
      lang: (matched[3] || '').trim(),
      attributes: attributes,
      options: options
    }; // 将代码块从源 list 中删除，避免重复解析

    list.splice(index + 1, i - index);
    return node;
  }

  function parseCLIOption(s) {
    s = " " + s + " ";
    var result;
    var nodes = [];

    while (result = blockOptionsRE.exec(s)) {
      var _result = result,
          name = _result[1],
          _result$ = _result[2],
          value = _result$ === void 0 ? '' : _result$;

      if (name) {
        nodes.push({
          name: name.trim(),
          value: value === '' ? true : value.trim()
        });
      }
    }

    return nodes;
  }

  function parseProperty(source, _, __) {
    var matched = source.match(propertyRE);

    if (matched) {
      var name = matched[2],
          _matched$ = matched[3],
          value = _matched$ === void 0 ? '' : _matched$;
      return {
        type: exports.OrgNodeTypes.PROPERTY,
        name: name,
        value: value === '' ? true : value.trim()
      };
    }

    return;
  }

  function parseHeader(source, list, index) {
    var _parseTags = parseTags(source),
        content = _parseTags.content,
        tags = _parseTags.tags;

    var matched = content.match(headerRE);
    if (!matched) return;
    var stars = matched[1],
        title = matched[2];
    var properties = parseHeadProperty(index + 1, list);
    var titled = parseText(title);
    var _titled$children = titled.children,
        children = _titled$children === void 0 ? [] : _titled$children;

    if (children.length) {
      // 进一步解析 child.type 是 OrgNodeTypes.SUB_SUP 类型的节点
      // 因为它可能是富文本形式(colorful/emphasis)
      titled.children = children.map(function (child) {
        if (child.type === exports.OrgNodeTypes.SUB_SUP && typeof child.value === 'string') {
          child.value = parseText(child.value);
        }

        return child;
      });
    }

    return {
      type: exports.OrgNodeTypes.HEADER,
      title: titled,
      indent: 0,
      level: stars.length,
      properties: properties,
      tags: tags
    };
  } // PROPERTIES, LOGBOOK


  function parseHeadProperty(startIndex, list) {
    var properties = [];
    var singlePropertyRE = /\s*([A-Z]+):(.*)/; // CLOSED, DEADLINE

    var multiPropertyRE = /\s*:([A-Z]+):/; // LOGBOOK, PROPERTIES

    for (var i = startIndex; i < list.length; i++) {
      var next = list[i];
      if (headerRE.test(next)) break;
      var matched = void 0;

      if (multiPropertyRE.test(next)) {
        (function () {
          matched = next.match(multiPropertyRE);
          var endIdx = findIndex(list, function (ele) {
            return /^\s*:END:/.test(ele);
          }, i);

          var propList = list.slice(i + 1, endIdx + i); // remove from original list

          list.splice(i, propList.length + 2, '');

          var _ref4 = matched || [],
              _ref4$ = _ref4[1],
              category = _ref4$ === void 0 ? '' : _ref4$;

          propList.forEach(function (prop) {
            var _ref5 = prop.match(/^\s*:?([A-Z-_]+):(.*)/) || [],
                _ref5$ = _ref5[1],
                name = _ref5$ === void 0 ? '' : _ref5$,
                _ref5$2 = _ref5[2],
                value = _ref5$2 === void 0 ? '' : _ref5$2;

            value = value.trim();

            if (name === 'CLOCK') {
              value = parseClockValue(value);
            }

            properties.push({
              name: name,
              value: value,
              category: category
            });
          });
        })();
      } else if (singlePropertyRE.test(next)) {
        matched = next.match(singlePropertyRE);

        if (matched) {
          list[i] = '';
          var _matched = matched,
              _matched$2 = _matched[1],
              name = _matched$2 === void 0 ? '' : _matched$2,
              _matched$3 = _matched[2],
              value = _matched$3 === void 0 ? '' : _matched$3;
          properties.push({
            name: name,
            value: matchTimestamp(value.trim())
          });
        }
      }
    }

    return properties;
  }

  function parseTags(content) {
    // 标题上下标需要支持更多样式，如：颜色，因此需要过滤掉 ^{}, 或 _{} 情况
    var tagRE = /:[^{}]+:/gi;
    var matched = null;
    var tags = [];

    if (content == '') {
      matched = null;
    } else if (matched = content.match(tagRE)) {
      var value = matched[0]; // remove matched tags from header

      content = content.replace(value, '');
      tags = value.replace(/^:|:$/, '').split(':').filter(Boolean);
    }

    return {
      tags: tags,
      content: content
    };
  } // parse something in text node


  function parseTextExtra(node, re, parser) {
    var children = [];
    var count = node.children.length;

    if (count === 0) {
      if (typeof node.content === 'string') {
        node.children = [{
          type: exports.OrgNodeTypes.TEXT,
          content: node.content,
          children: []
        }];
      } else if (typeof node.content === 'object') {
        node.children = [_extends({}, node.content)];
      }
    }

    node.children.forEach(function (child) {
      var cursor = 0,
          result; // FIX: `red:text` 因为前后没有空格不能被正确解析

      var source = " " + child.content + " ";

      if (child.type === exports.OrgNodeTypes.TEXT && typeof source === 'string') {
        while (result = re.exec(source)) {
          var _result2 = result,
              matchText = _result2[0];
          var pureText = source.slice(cursor, result.index); // left text node

          children.push({
            type: exports.OrgNodeTypes.TEXT,
            content: pureText.trim(),
            indent: 0,
            children: []
          }); // current node, more value to outer fn

          var current = parser(result);

          if (current) {
            children.push(_extends({}, child, {
              content: matchText.trim()
            }, current));
          }

          cursor = result.index + matchText.length;
        }

        if (source) {
          // right text node
          children.push({
            type: exports.OrgNodeTypes.TEXT,
            content: source.slice(cursor).trim(),
            indent: 0,
            children: []
          });
        }
      } else {
        children.push(child);
      }
    });
    node.children = children.filter(function (child) {
      return child.content !== '';
    });
    return node;
  } //[2022-08-05 Fri 17:38]--[2022-08-05 Fri 17:39] =>  0:01
  // => { start: OrgTimeStamp, end: OrgTimestamp, duration: '0:01' }


  function parseClockValue(value) {
    var re = /\[(\d{4}-\d{2}-\d{2}\s+[\w\s\d:]+)]\s*--\s*\[(\d{4}-\d{2}-\d{2}\s+[\w\s\d:]+)]\s+=>\s+(.*)/;

    var _ref6 = value.match(re) || [],
        _ref6$ = _ref6[1],
        start = _ref6$ === void 0 ? '' : _ref6$,
        _ref6$2 = _ref6[2],
        end = _ref6$2 === void 0 ? '' : _ref6$2,
        _ref6$3 = _ref6[3],
        duration = _ref6$3 === void 0 ? '' : _ref6$3;

    if (start) {
      return {
        start: matchTimestamp(start),
        end: matchTimestamp(end),
        duration: duration
      };
    }

    return value;
  }

  exports.SIGN_SUB = SIGN_SUB;
  exports.SIGN_SUP = SIGN_SUP;
  exports.advanceBy = advanceBy;
  exports.assign = assign;
  exports.baseParse = baseParse;
  exports.blockBeginRE = blockBeginRE;
  exports.blockEndRE = blockEndRE;
  exports.blockOptionsRE = blockOptionsRE;
  exports.blockRE = blockRE;
  exports.colorTextRE = colorTextRE;
  exports.emphasisRE = emphasisRE;
  exports.extLinkRE = extLinkRE;
  exports.extLinkXRE = extLinkXRE;
  exports.extraTagMap = extraTagMap;
  exports.findIndex = findIndex;
  exports.hasElement = hasElement;
  exports.headerRE = headerRE;
  exports.innerLinkRE = innerLinkRE;
  exports.innerLinkXRE = innerLinkXRE;
  exports.isArray = isArray;
  exports.isString = isString;
  exports.last = last;
  exports.matchTimestamp = matchTimestamp;
  exports.orderListRE = orderListRE;
  exports.parseColorText = parseColorText;
  exports.parseColorfulBareText = parseColorfulBareText;
  exports.parseEmphasisNode = parseEmphasisNode;
  exports.parseStateKeywords = parseStateKeywords;
  exports.parseSubSupText = parseSubSupText;
  exports.parseTextWithNode = parseTextWithNode;
  exports.propertyRE = propertyRE;
  exports.stateRE = stateRE;
  exports.stateXRE = stateXRE;
  exports.subSupRE = subSupRE;
  exports.subSupXRE = subSupXRE;
  exports.tableRowLineRE = tableRowLineRE;
  exports.tableRowRE = tableRowRE;
  exports.timestampRE = timestampRE;
  exports.timestampXRE = timestampXRE;
  exports.traverse = traverse;
  exports.unorderListRE = unorderListRE;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=org-file-parser-with-js.umd.development.js.map
