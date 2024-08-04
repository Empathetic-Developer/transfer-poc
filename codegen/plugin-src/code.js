import { nodeToObject } from "@figma-plugin/helpers";

figma.showUI(__html__, { visible: true, height : 600, width : 600 , title : "Kenny is testing"});
const isSymbol = (val) => typeof val === "symbol";
async function traverse(node) {
  let styles = {};
  let image = null;
  if (node.type == "FRAME") {
    if (isSymbol(node.fills)) {
    } else {
      for (const paint of node.fills) {
        if (paint.type === "IMAGE") {
          // Get the (encoded) bytes for this image.
          const im = figma.getImageByHash(paint.imageHash);
          const bytes = await im.getBytesAsync();
          // TODO: Do something with the bytes!
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
          // Get the (encoded) bytes for this image.
          const im = figma.getImageByHash(paint.imageHash);
          const bytes = await im.getBytesAsync();
          // TODO: Do something with the bytes!
          image = bytes;
        }
      }
    }
  }
  if (node.type == "TEXT") {
    if (
      isSymbol(node.fontName) ||
      isSymbol(node.fontSize) ||
      isSymbol(node.fontWeight) ||
      isSymbol(node.fills)
    ) {
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
          // Get the (encoded) bytes for this image.
          const im = figma.getImageByHash(paint.imageHash);
          const bytes = await im.getBytesAsync();
          // TODO: Do something with the bytes!
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
          // Get the (encoded) bytes for this image.
          const im = figma.getImageByHash(paint.imageHash);
          const bytes = await im.getBytesAsync();
          // TODO: Do something with the bytes!
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
      backgrounds: node.backgrounds,
    },
    image: image,
    parent: node.parent,
    type: node.type,
    id: node.id,
    inferredAutoLayout: node.inferredAutoLayout,
    styles: styles,
    characters: node.characters,
    fills: isSymbol(node.fills) ? node.fills.description : node.fills,
    children:
      node.children && node.children.length && (await innerEle(node.children)),
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
      const jsonformat = nodeToObject(node);
      // console.log("jsonformat", jsonformat);
      const json = await traverse(jsonformat);
      // console.log("jsonjson", JSON.stringify(json));
      figma.ui.postMessage(json);
    }
  } catch (error) {
    console.log("errorerrorerror", error);
  }
};
