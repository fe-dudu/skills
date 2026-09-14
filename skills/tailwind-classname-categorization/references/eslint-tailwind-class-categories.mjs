const modifierToken =
  "(?:[A-Za-z0-9_@*/-]+(?:\\[[^ ]+\\])?|\\[[^ ]+\\])";

const responsiveVariants = [
  "sm|md|lg|xl|2xl",
  "min-\\[[^ ]+\\]|max-\\[[^ ]+\\]",
  "max-(?:sm|md|lg|xl|2xl)",
  "@(?:max-)?(?:3xs|2xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)(?:/[^ :]+)?",
  "@(?:min|max)-\\[[^ ]+\\](?:/[^ :]+)?",
  "\\[@media[^ ]*(?:width|height|aspect-ratio)[^ ]*\\]",
  "\\[@container[^ ]+\\]",
].join("|");

const modifierPrefix = "(?:" + modifierToken + ":)*";
const responsiveClass =
  modifierPrefix +
  "(?:" +
  responsiveVariants +
  "):" +
  modifierPrefix +
  "[^ ]+";
const allResponsiveClasses = new RegExp(
  "^" + responsiveClass + "(?: " + responsiveClass + ")*$",
);
const containsResponsiveClass = new RegExp(
  ".*(?:^| )" +
    modifierPrefix +
    "(?:" +
    responsiveVariants +
    "):[^ ]+.*",
);
const stateClass = "(?:" + modifierToken + ":)+[^ ]+";
const allStateClasses = new RegExp("^" + stateClass + "(?: " + stateClass + ")*$");

const categoryUtilities = [
  [
    "tables",
    [
      "border-(?:collapse|separate|spacing(?:-[xy])?-[^ ]+)",
      "table-(?:auto|fixed)|caption-(?:top|bottom)",
    ],
  ],
  [
    "effects",
    [
      "shadow(?:-[^ ]+)?|inset-shadow-[^ ]+|text-shadow-[^ ]+",
      "opacity-[^ ]+|mix-blend-[^ ]+|bg-blend-[^ ]+|mask(?:-[^ ]+)?",
    ],
  ],
  [
    "borders",
    [
      "rounded(?:-[^ ]+)?|border(?:-[^ ]+)?|divide-[^ ]+",
      "ring(?:-[^ ]+)?|inset-ring(?:-[^ ]+)?|outline(?:-[^ ]+)?",
    ],
  ],
  [
    "typography",
    [
      "font-[^ ]+|text-[^ ]+|antialiased|subpixel-antialiased",
      "italic|not-italic|normal-nums|ordinal|slashed-zero",
      "lining-nums|oldstyle-nums|proportional-nums|tabular-nums",
      "diagonal-fractions|stacked-fractions|font-feature-[^ ]+",
      "tracking-[^ ]+|leading-[^ ]+|indent-[^ ]+|tab-[^ ]+",
      "align-(?:baseline|top|middle|bottom|text-top|text-bottom|sub|super)",
      "whitespace-[^ ]+|text-(?:wrap|nowrap|balance|pretty|ellipsis|clip)",
      "wrap-[^ ]+|break-(?:normal|words|all|keep)|overflow-wrap-[^ ]+",
      "hyphens-[^ ]+|truncate|line-clamp-[^ ]+",
      "list-(?:image-[^ ]+|inside|outside|none|disc|decimal)",
      "uppercase|lowercase|capitalize|normal-case",
      "underline|overline|line-through|no-underline",
      "decoration-[^ ]+|underline-offset-[^ ]+|content-\\[[^ ]+\\]",
    ],
  ],
  [
    "layout",
    [
      "aspect-[^ ]+|columns-[^ ]+",
      "break-(?:before|after|inside)-[^ ]+|box-decoration-[^ ]+",
      "box-(?:border|content)|block|inline|inline-block|flow-root",
      "inline-flex|inline-grid|inline-table|contents|flex|grid|hidden",
      "list-item|table|table-(?:caption|cell|column|row|header-group|footer-group|row-group)",
      "float-[^ ]+|clear-[^ ]+|isolate|isolation-auto",
      "object-[^ ]+",
      "overflow-(?:auto|hidden|clip|visible|scroll|x-(?:auto|hidden|clip|visible|scroll)|y-(?:auto|hidden|clip|visible|scroll)|\\[[^ ]+\\]|x-\\[[^ ]+\\]|y-\\[[^ ]+\\])",
      "overscroll-[^ ]+",
      "static|fixed|absolute|relative|sticky",
      "inset(?:-[xyse])?-[^ ]+",
      "(?:top|right|bottom|left|start|end)-[^ ]+",
      "visible|invisible|collapse|z-[^ ]+|container",
      "@container(?:/[^ ]+)?|@container-size(?:/[^ ]+)?",
    ],
  ],
  [
    "flex-grid",
    [
      "basis-[^ ]+|flex-[^ ]+|grow(?:-[^ ]+)?|shrink(?:-[^ ]+)?",
      "order-[^ ]+|grid-(?:cols|rows|flow)-[^ ]+",
      "auto-(?:cols|rows)-[^ ]+|col-[^ ]+|row-[^ ]+",
      "gap(?:-[xy])?-[^ ]+|justify-[^ ]+|items-[^ ]+",
      "content-(?:center|between|around|evenly|start|end|stretch|baseline)",
      "self-[^ ]+|place-(?:content|items|self)-[^ ]+",
    ],
  ],
  [
    "spacing",
    [
      "(?:m(?:[xyse])?|mbs|mbe|mt|mr|mb|ml|p(?:[xyse])?|pbs|pbe|pt|pr|pb|pl|space-[xy])-[^ ]+",
      "space-[xy]-reverse",
    ],
  ],
  [
    "sizing",
    [
      "size-[^ ]+",
      "(?:min-|max-)?(?:w|h)-[^ ]+",
      "(?:min-|max-)?(?:inline-size|block-size)-[^ ]+",
    ],
  ],
  [
    "backgrounds",
    [
      "bg-(?:fixed|local|scroll|clip-[^ ]+|origin-[^ ]+|none)",
      "bg-(?:linear-[^ ]+|radial(?:-[^ ]+)?|conic(?:-[^ ]+)?)",
      "bg-(?:position|repeat|size)-[^ ]+|bg-[^ ]+",
      "from-[^ ]+|via-[^ ]+|to-[^ ]+",
    ],
  ],
  [
    "filters",
    [
      "filter|blur-[^ ]+|brightness-[^ ]+|contrast-[^ ]+",
      "drop-shadow-[^ ]+|grayscale-[^ ]+|hue-rotate-[^ ]+",
      "invert-[^ ]+|saturate-[^ ]+|sepia-[^ ]+",
      "backdrop-(?:filter|blur-[^ ]+|brightness-[^ ]+|contrast-[^ ]+)",
      "backdrop-(?:grayscale|hue-rotate|invert|opacity|saturate|sepia)-[^ ]+",
    ],
  ],
  [
    "transitions-animation",
    [
      "transition(?:-[^ ]+)?|transition-behavior-[^ ]+",
      "duration-[^ ]+|ease-[^ ]+|delay-[^ ]+|animate-[^ ]+",
    ],
  ],
  [
    "transforms",
    [
      "backface-[^ ]+|perspective(?:-[^ ]+)?|rotate-[^ ]+",
      "scale-[^ ]+|skew-[^ ]+|translate-[^ ]+|zoom-[^ ]+",
      "transform(?:-[^ ]+)?|origin-[^ ]+",
    ],
  ],
  [
    "interactivity",
    [
      "accent-[^ ]+|appearance-[^ ]+|caret-[^ ]+",
      "color-scheme-[^ ]+|scheme-[^ ]+|cursor-[^ ]+",
      "field-sizing-[^ ]+|pointer-events-[^ ]+|resize(?:-[^ ]+)?",
      "select-[^ ]+|touch-[^ ]+",
      "scroll-(?:auto|smooth|m[xyse]?-[^ ]+|p[xyse]?-[^ ]+)",
      "scrollbar(?:-[^ ]+)?|snap-[^ ]+|will-change-[^ ]+",
    ],
  ],
  ["svg", ["fill-[^ ]+|stroke-[^ ]+"]],
  ["accessibility", ["sr-only|not-sr-only|forced-color-adjust-[^ ]+"]],
];

function compileCategoryGroup(utilities) {
  const categoryUtility = utilities.join("|");
  const classGroup = "(?:!?-?(?:" + categoryUtility + ")(?:!)?)";
  return new RegExp("^" + classGroup + "(?: " + classGroup + ")*$");
}

const categoryRules = categoryUtilities.map(([name, utilities]) => [
  name,
  compileCategoryGroup(utilities),
]);

const knownUtilityNames = [
  "block|inline|inline-block|flow-root|inline-flex|inline-grid|inline-table",
  "contents|flex|grid|hidden|list-item|table|isolate|isolation-auto",
  "static|fixed|absolute|relative|sticky|visible|invisible|collapse|container",
  "grow|shrink|antialiased|subpixel-antialiased|italic|not-italic",
  "normal-nums|ordinal|slashed-zero|lining-nums|oldstyle-nums",
  "proportional-nums|tabular-nums|diagonal-fractions|stacked-fractions",
  "truncate|text-ellipsis|text-clip|uppercase|lowercase|capitalize|normal-case",
  "underline|overline|line-through|no-underline",
  "rounded|border|ring|outline|filter|transition|transform",
  "sr-only|not-sr-only|scroll-auto|scroll-smooth|space-x-reverse|space-y-reverse",
].join("|");

const knownUtilityPrefixes = [
  "aspect-|columns-|break-(?:before|after|inside)-|box-decoration-|box-",
  "float-|clear-|object-|overflow-|overscroll-|inset(?:-[xyse])?-",
  "(?:top|right|bottom|left|start|end)-|z-",
  "basis-|flex-|grid-(?:cols|rows|flow)-|auto-(?:cols|rows)-",
  "col-|row-|gap-|justify-|items-|content-|self-|place-",
  "m(?:[xyse])?s?-|m(?:[xyse])?-|mbs-|mbe-",
  "p(?:[xyse])?s?-|p(?:[xyse])?-|pbs-|pbe-|space-[xy]-",
  "size-|(?:min-|max-)?(?:w|h)-|(?:min-|max-)?(?:inline-size|block-size)-",
  "font-|text-|font-feature-|tracking-|leading-|indent-|tab-",
  "align-(?:baseline|top|middle|bottom|text-top|text-bottom|sub|super)-",
  "whitespace-|text-(?:wrap|nowrap|balance|pretty)-|wrap-",
  "break-(?:normal|words|all|keep)-|overflow-wrap-|hyphens-|line-clamp-",
  "list-(?:image-|inside|outside|none|disc|decimal)-",
  "decoration-|underline-offset-|bg-|from-|via-|to-|divide-|rounded-|border-",
  "ring-|inset-ring-|outline-|shadow-|inset-shadow-|text-shadow-",
  "opacity-|mix-blend-|bg-blend-|mask-|blur-|brightness-|contrast-",
  "drop-shadow-|grayscale-|hue-rotate-|invert-|saturate-|sepia-|backdrop-",
  "table-(?:auto|fixed|caption|cell|column|row|header-group|footer-group|row-group)-",
  "caption-(?:top|bottom)-|transition-|transition-behavior-",
  "duration-|ease-|delay-|animate-|backface-|perspective-",
  "rotate-|scale-|skew-|translate-|zoom-|transform-|origin-",
  "accent-|appearance-|caret-|color-scheme-|scheme-|cursor-|field-sizing-",
  "pointer-events-|resize-|select-|touch-|scroll-(?:auto|smooth|m|p)",
  "scrollbar-|snap-|will-change-|fill-|stroke-|forced-color-adjust-",
].join("|");

const hasKnownUtilityName = new RegExp(
  ".*(?:^| )!?-?(?:" + knownUtilityNames + ")!?(?: |$).*",
);
const hasKnownUtilityPrefix = new RegExp(
  ".*(?:^| )!?-?(?:" + knownUtilityPrefixes + ")[^ ]+!?(?: |$).*",
);
const hasGeneratedContent = /.*(?:^| )!?-?content-\[[^ ]+!?(?: |$).*/;

const categoryOrder = [
  "custom",
  "layout",
  "flex-grid",
  "spacing",
  "sizing",
  "typography",
  "backgrounds",
  "borders",
  "effects",
  "filters",
  "tables",
  "transitions-animation",
  "transforms",
  "interactivity",
  "svg",
  "accessibility",
  "state",
  "responsive",
  "override",
];

function modifierCategory(classGroup) {
  if (allResponsiveClasses.test(classGroup)) return "responsive";
  if (containsResponsiveClass.test(classGroup)) return "mixed";
  if (allStateClasses.test(classGroup)) return "state";
  return "none";
}

function mixedUtilityGroup(classGroup) {
  if (/^[^ ]+$/.test(classGroup)) return "none";
  if (
    hasKnownUtilityName.test(classGroup) ||
    hasKnownUtilityPrefix.test(classGroup) ||
    hasGeneratedContent.test(classGroup)
  ) {
    return "mixed";
  }
  return "none";
}

function baseCategory(classGroup) {
  for (const [name, pattern] of categoryRules) {
    if (pattern.test(classGroup)) return name;
  }

  if (mixedUtilityGroup(classGroup) === "mixed") return "mixed";
  return "custom";
}

function category(classGroup) {
  if (classGroup === "") return "empty";

  const modifier = modifierCategory(classGroup);
  if (modifier !== "none") return modifier;
  return baseCategory(classGroup);
}

function priorityInversion(firstGroup, secondGroup) {
  const firstPriority = categoryOrder.indexOf(category(firstGroup));
  const secondPriority = categoryOrder.indexOf(category(secondGroup));
  return firstPriority >= 0 && secondPriority >= 0 && firstPriority > secondPriority;
}

function helperName(callExpression) {
  if (callExpression.callee.type !== "Identifier") return null;
  if (callExpression.callee.name === "cn" || callExpression.callee.name === "cva") {
    return callExpression.callee.name;
  }
  return null;
}

function enclosingClassHelper(node) {
  for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
    if (ancestor.type === "CallExpression" && helperName(ancestor)) return ancestor;
  }
  return null;
}

function staticClassGroup(node) {
  if (node?.type === "Literal" && typeof node.value === "string") return node.value;
  if (node?.type === "LogicalExpression" && node.operator === "&&") {
    return staticClassGroup(node.right);
  }
  return null;
}

function reportPriorityInversions(context, node, groups, messageId) {
  for (let first = 0; first < groups.length; first += 1) {
    for (let second = first + 1; second < groups.length; second += 1) {
      if (priorityInversion(groups[first], groups[second])) {
        context.report({ node, messageId });
      }
    }
  }
}

function reportMixedGroup(context, node) {
  if (typeof node.value !== "string" || !enclosingClassHelper(node)) return;
  if (category(node.value) === "mixed") {
    context.report({ node, messageId: "mixed" });
  }
}

function reportArrayOrder(context, node) {
  if (!enclosingClassHelper(node)) return;
  const groups = node.elements.map(staticClassGroup).filter((value) => value !== null);
  reportPriorityInversions(context, node, groups, "arrayPriority");
}

function reportCn(context, node) {
  if (helperName(node) !== "cn") return;

  const groups = node.arguments.map(staticClassGroup).filter((value) => value !== null);
  reportPriorityInversions(context, node, groups, "cnPriority");

  const classNameIndex = node.arguments.findIndex(
    (argument) => argument.type === "Identifier" && argument.name === "className",
  );
  if (classNameIndex >= 0 && classNameIndex < node.arguments.length - 1) {
    context.report({ node, messageId: "override" });
  }
}

function reportLongClassName(context, node, sourceCode, lineWidth) {
  if (
    node.name.name !== "className" ||
    node.value?.type !== "Literal" ||
    typeof node.value.value !== "string"
  ) {
    return;
  }

  const sourceText = sourceCode.getText(node);
  if (!/^className="[^"]+"$/.test(sourceText) || sourceText.length <= lineWidth) {
    return;
  }

  if (category(node.value.value) === "mixed") {
    context.report({
      node,
      messageId: "longClassName",
      data: { lineWidth },
    });
  }
}

const classCategoryRule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce Tailwind category grouping and priority in class helpers",
    },
    schema: [
      {
        type: "object",
        properties: { lineWidth: { type: "integer", minimum: 1 } },
        additionalProperties: false,
      },
    ],
    messages: {
      mixed: "This class group spans categories; split it into category groups.",
      arrayPriority: "Category groups are not in priority order.",
      cnPriority: "cn() class groups are not in priority order.",
      override: "Caller className override must follow categorized class groups.",
      longClassName:
        "This className attribute exceeds the {{lineWidth}}-character line width; use cn() with category string arrays.",
    },
  },
  create(context) {
    const lineWidth = context.options[0]?.lineWidth ?? 120;
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    return {
      Literal(node) {
        reportMixedGroup(context, node);
      },
      "ArrayExpression:exit"(node) { reportArrayOrder(context, node); },
      "CallExpression:exit"(node) { reportCn(context, node); },
      JSXAttribute(node) { reportLongClassName(context, node, sourceCode, lineWidth); },
    };
  },
};

const tailwindClassCategories = {
  meta: { name: "eslint-plugin-tailwind-class-categories" },
  rules: { "class-categories": classCategoryRule },
};

export default tailwindClassCategories;
