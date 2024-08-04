async function getInnerEle(el, ch) {
  if (ch && ch.length) {
    ch.map(async (ele) => {
      await getElement(ele, el);
    });
  }
}

async function getFrame(node, rootElement) {
  const frameElement = document.createElement("table");
  frameElement.style.width = node.parentNode.width;
  frameElement.style.height = node.parentNode.height;
  frameElement.style.borderTopLeftRadius = node.parentNode.topLeftRadius + "px";
  frameElement.style.borderTopRightRadius =
    node.parentNode.topRightRadius + "px";
  frameElement.style.borderBottomLeftRadius =
    node.parentNode.bottomLeftRadius + "px";
  frameElement.style.borderBottomRightRadius =
    node.parentNode.bottomRightRadius + "px";
  if (
    node.parentNode.backgrounds &&
    node.parentNode.backgrounds.length &&
    node.parentNode.backgrounds[0].color
  ) {
    const r = node.parentNode.backgrounds[0].color.r * 255;
    const g = node.parentNode.backgrounds[0].color.g * 255;
    const b = node.parentNode.backgrounds[0].color.b * 255;
    var rgb = "rgb(" + r + ", " + g + ",  " + b + ")";
    frameElement.style.background = rgb;
  }
  if (node.parent.type == "FRAME") {
    const col = document.createElement("td");
    col.appendChild(frameElement);
    // const row = document.createElement("tr");
    // row.style.border=0

    await getInnerEle(col, node.children);
    rootElement.appendChild(col);
  } else {
    if (rootElement) {
      await getInnerEle(frameElement, node.children);
      rootElement.appendChild(frameElement);
    }
  }

  for (const paint of node.fills) {
    if (paint.type === "IMAGE") {
      const el = document.createElement("img");
      try {
        const imgUrl = URL.createObjectURL(
          new Blob([node.image], { type: "image/png" })
        );
        el.setAttribute("src", paint.imageHash + ".png");
        // el.setAttribute("src", imgUrl);
        allImages.push({ url: imgUrl, name: paint.imageHash });
      } catch (error) {
        console.log("errorerrorerror", error);
      }
      el.style.width = node.parentNode.width;
      rootElement.appendChild(el);
    }
  }
}

async function getInstance(node, rootElement) {
  const frameElement = document.createElement("div");
  frameElement.style.width = node.width;
  frameElement.style.height = node.height;
  frameElement.style.borderTopLeftRadius = node.parentNode.topLeftRadius + "px";
  frameElement.style.borderTopRightRadius =
    node.parentNode.bottomRightRadius + "px";
  frameElement.style.borderBottomLeftRadius =
    node.parentNode.bottomLeftRadius + "px";
  frameElement.style.borderBottomRightRadius =
    node.parentNode.bottomLeftRadius + "px";

  if (
    node.parentNode.backgrounds &&
    node.parentNode.backgrounds.length &&
    node.parentNode.backgrounds[0].color
  ) {
    const r = node.parentNode.backgrounds[0].color.r * 255;
    const g = node.parentNode.backgrounds[0].color.g * 255;
    const b = node.parentNode.backgrounds[0].color.b * 255;
    var rgb = "rgb(" + r + ", " + g + ",  " + b + ")";
    frameElement.style.background = rgb;
  }
  await getInnerEle(frameElement, node.children);
  rootElement.appendChild(frameElement);
}

async function getComponent(node, rootElement) {
  const frameElement = document.createElement("div");
  frameElement.style.width = node.parentNode.width;
  frameElement.style.height = node.parentNode.height;
  frameElement.style.borderTopLeftRadius = node.parentNode.topLeftRadius + "px";
  frameElement.style.borderTopRightRadius =
    node.parentNode.bottomRightRadius + "px";
  frameElement.style.borderBottomLeftRadius =
    node.parentNode.bottomLeftRadius + "px";
  frameElement.style.borderBottomRightRadius =
    node.parentNode.bottomLeftRadius + "px";
  if (
    node.inferredAutoLayout &&
    node.inferredAutoLayout.layoutMode === "HORIZONTAL"
  ) {
    frameElement.style.display = "flex";
    frameElement.style.justifyContent =
      node.inferredAutoLayout.counterAxisAlignItems;
    frameElement.style.paddingBottom = node.inferredAutoLayout.paddingBottom;
    frameElement.style.paddingLeft = node.inferredAutoLayout.paddingLeft;
    frameElement.style.paddingRight = node.inferredAutoLayout.paddingRight;
    frameElement.style.paddingTop = node.inferredAutoLayout.paddingTop;
  }
  await getInnerEle(frameElement, node.children);
  rootElement.appendChild(frameElement);
}

async function getText(node, rootElement) {
  if (node.parent.type === "FRAME") {
    const row = document.createElement("tr");
    // row.style.border=0
    const col = document.createElement("td");
    // col.style.border=0
    const el = document.createElement("p");
    el.style.fontFamily =
      node.styles && node.styles.fontName && node.styles.fontName.family;
    el.style.fontWeight = node.styles && node.styles.fontWeight;
    el.style.fontSize = node.styles && node.styles.fontSize;
    el.style.width = node.styles && node.styles.width;
    el.style.height = node.styles && node.styles.height;
    el.textContent = node.characters;
    await getInnerEle(el, node.children);

    col.appendChild(el);
    row.appendChild(col);
    rootElement.appendChild(row);
  } else {
    const el = document.createElement("p");
    el.style.fontFamily =
      node.styles && node.styles.fontName && node.styles.fontName.family;
    el.style.fontWeight = node.styles && node.styles.fontWeight;
    el.style.fontSize = node.styles && node.styles.fontSize;
    el.style.width = node.styles && node.styles.width;
    el.style.height = node.styles && node.styles.height;
    el.textContent = node.characters;
    if (node.fills && node.fills.length && node.fills[0].color) {
      const r = node.fills[0].color.r * 255;
      const g = node.fills[0].color.g * 255;
      const b = node.fills[0].color.b * 255;
      var rgb = "rgb(" + r + ", " + g + ",  " + b + ")";
      el.style.color = rgb;
    } else {
      el.style.color = "white";
    }
    await getInnerEle(el, node.children);
    rootElement.appendChild(el);
  }
}

async function getRectangle(node, rootElement) {
  for (const paint of node.fills) {
    if (paint.type === "IMAGE") {
      const el = document.createElement("img");
      try {
        const imgUrl = URL.createObjectURL(
          new Blob([node.image], { type: "image/png" })
        );
        // el.setAttribute("src", paint.imageHash + ".png");
        el.setAttribute("src", imgUrl);
        allImages.push({ url: imgUrl, name: paint.imageHash });
      } catch (error) {
        console.log("errorerrorerrorrr", error);
      }
      el.style.width = node.parentNode.width;
      // await getInnerEle(el, node.children);
      rootElement.appendChild(el);
    }
  }
}

async function getElement(node, rootElement) {
  if (node.type == "FRAME") {
    await getFrame(node, rootElement);
  } else if (node.type == "INSTANCE") {
    await getInstance(node, rootElement);
  } else if (node.type == "COMPONENT") {
    await getComponent(node, rootElement);
  } else if (node.type == "TEXT") {
    await getText(node, rootElement);
  } else if (node.type == "RECTANGLE") {
    await getRectangle(node, rootElement);
  } else {
    const el = document.createElement("div");
    await getInnerEle(el, node.children);
    rootElement.appendChild(el);
  }
  return rootElement;
}

counterAxisAlignItems: "CENTER";
counterAxisSizingMode: "AUTO";
itemSpacing: 0;
layoutAlign: "MIN";
layoutGrow: 0;
layoutMode: "HORIZONTAL";
layoutPositioning: "AUTO";
paddingBottom: 0;
paddingLeft: 0;
paddingRight: 246;
paddingTop: 0;
primaryAxisAlignItems: "MIN";
primaryAxisSizingMode: "AUTO";

counterAxisAlignItems: "MIN";
counterAxisSizingMode: "AUTO";
itemSpacing: 8;
layoutAlign: "INHERIT";
layoutGrow: 0;
layoutMode: "VERTICAL";
layoutPositioning: "AUTO";
paddingBottom: 0;
paddingLeft: 0;
paddingRight: 0;
paddingTop: 0;
primaryAxisAlignItems: "MIN";
primaryAxisSizingMode: "AUTO";
