import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import FileSaver from "file-saver";

const allImages = [];

const downloadZip = async (urls, htmlBinary) => {
  const urlToPromise = (url) => {
    return new Promise((resolve, reject) => {
      JSZipUtils.getBinaryContent(url, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };

  const getExtension = (binary) => {
    const arr = new Uint8Array(binary).subarray(0, 4);
    let hex = "";
    for (var i = 0; i < arr.length; i++) {
      hex += arr[i].toString(16);
    }
    switch (hex) {
      case "89504e47":
        return "png";
      case "47494638":
        return "gif";
      case "ffd8ffe0":
      case "ffd8ffe1":
      case "ffd8ffe2":
      case "ffd8ffe3":
      case "ffd8ffe8":
        return "jpg";
      default:
        return "";
    }
  };

  this.progress = true;

  const zip = new JSZip();
  for (const index in urls) {
    const url = urls[index];
    const binary = await urlToPromise(url.url);
    // const extension = getExtension(binary) || url.split('.').pop().split(/#|\?/)[0]
    const filename = `${url.name}.${"png"}`;
    zip.file(filename, binary, { binary: true });
  }
  zip.file("indexdo.html", htmlBinary, { binary: true });
  await zip.generateAsync({ type: "blob" }).then((blob) => {
    FileSaver.saveAs(blob, "download.zip");
  });
};

async function getInnerEle(el, ch) {
  if (ch && ch.length) {
    ch.map(async (ele) => {
      await getElement(ele, el);
    });
  }
}

function getFrame(node, rootElement) {
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
  getInnerEle(frameElement, node.children);
  rootElement.appendChild(frameElement);

  for (const paint of node.fills) {
    if (paint.type === "IMAGE") {
      const el = document.createElement("img");
      try {
        const imgUrl = URL.createObjectURL(
          new Blob([node.image], { type: "image/png" })
        );
        el.setAttribute("src", paint.imageHash + ".png");
        allImages.push({ url: imgUrl, name: paint.imageHash });
      } catch (error) {
        console.log("errorerrorerror", error);
      }
      el.style.width = node.parentNode.width;
      getInnerEle(el, node.children);
      rootElement.appendChild(el);
    }
  }
}

function getComponent(node, rootElement) {
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
  getInnerEle(frameElement, node.children);
  rootElement.appendChild(frameElement);
}

function getText(node, rootElement) {
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
    getInnerEle(el, node.children);

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
    getInnerEle(el, node.children);
    rootElement.appendChild(el);
  }
}

function getRectangle(node, rootElement) {
  for (const paint of node.fills) {
    if (paint.type === "IMAGE") {
      const el = document.createElement("img");
      try {
        const imgUrl = URL.createObjectURL(
          new Blob([node.image], { type: "image/png" })
        );
        el.setAttribute("src", paint.imageHash + ".png");
        allImages.push({ url: imgUrl, name: paint.imageHash });
      } catch (error) {
        console.log("errorerrorerrorrr", error);
      }
      el.style.width = node.parentNode.width;
      getInnerEle(el, node.children);
      rootElement.appendChild(el);
    } else {
      const el = document.createElement("div");
      getInnerEle(el, node.children);
      rootElement.appendChild(el);
    }
  }
}

async function getElement(node, rootElement) {
  if (node.type == "FRAME" || node.type == "INSTANCE") {
    getFrame(node, rootElement);
  } else if (node.type == "COMPONENT") {
    getComponent(node, rootElement);
  } else if (node.type == "TEXT") {
    getText(node, rootElement);
  } else if (node.type == "RECTANGLE") {
    getRectangle(node, rootElement);
  } else {
    const el = document.createElement("div");
    getInnerEle(el, node.children);
    rootElement.appendChild(el);
  }
  return rootElement;
}

async function createFile(container) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Downloaded HTML File</title>
</head>
<body>
<div id="containermain"></div>

</body>
</html>`;
  const parser = new DOMParser();
  const htmlDocument = parser.parseFromString(htmlContent, "text/html");
  htmlDocument.body.appendChild(container.firstChild);
  const existingHtmlContent = htmlDocument.documentElement.outerHTML;
  const blob = new Blob([existingHtmlContent], { type: "text/html" });
  return blob;
}

// Function to convert JSON data to HTML table
async function convert(jsonData) {
  // Get the container element where the table will be inserted
  let container = document.getElementById("container");
  const element = await getElement(jsonData, container);
  downloadZip(allImages, await createFile(element));
}

onmessage = (event) => {
  document.getElementById("htmlText").innerText = event.data.pluginMessage.name;
  convert(event.data.pluginMessage);
};

document.getElementById("show").onclick = () => {
  try {

    parent.postMessage({ pluginMessage: { type: "show" } }, "*");
  } catch (error) {
    console.log("errorerrorerrorerrorerrorerrorerrorerrorerror", error);
  }
};

document.getElementById("export").onclick = () => {
  doDL(document.getElementById("container").innerHTML);
  parent.postMessage({ pluginMessage: { type: 'export' } }, '*')
};

function doDL(s) {
  document.getElementById("htmlContent").innerText = s;

  function dataUrl(data) {
    return "data:x-application/text," + escape(data);
  }
  window.open(dataUrl(s));
}
