import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import FileSaver from "file-saver";
//import jsonpath-plus
import { JSONPath } from 'jsonpath-plus';
///// // Function to convert JSON data to HTML table
const allImages = [];
function getEleType(element) {
  if (element.type == "FRAME") {
    return createFrame(element);
  } else if (element.type == "INSTANCE") {
    return createInstance(element);
  } else if (element.type == "COMPONENT") {
    return createComponent(element);
  } else if (element.type == "TEXT") {
    return createText(element);
  } else if (element.type == "RECTANGLE") {
    return createRectangle(element);
  } else if (element.type == "COMPONENT_SET") {
    return createComponentSet(element);
  } else {
    return createDefault(element);
  }
}

function createFrame(element) {
  const table = document.createElement("table");
  table.style.border = 0;
  const row = document.createElement("tr");
  row.style.border = 0;
  const col = document.createElement("td");

  const inferredAutoLayout = JSONPath({ path: '$.inferredAutoLayout', json: element });
  
  if (element.inferredAutoLayout) {
    const layoutMode = element.inferredAutoLayout.layoutMode;
    if (layoutMode === "HORIZONTAL") {
      col.style.flexDirection = "row";
    } else if (layoutMode === "VERTICAL") {
      col.style.flexDirection = "column";
    }

    const PRIMARY_AXIS_ALIGN_ITEMS = {
      MIN: "start",
      MAX: "end",
      CENTER: "center",
      SPACE_BETWEEN: "space-between",
    };
    const COUNTER_AXIS_ALIGN_ITEMS = {
      MIN: "flex-start ",
      MAX: "flex-end",
      CENTER: "center",
      BASELINE: "baseline",
    };

    col.style.display = "flex";
    col.style.boxSizing = "border-box";
    col.style.justifyContent =
      PRIMARY_AXIS_ALIGN_ITEMS[
        element.inferredAutoLayout.primaryAxisAlignItems
      ];
    col.style.justifyItems =
      PRIMARY_AXIS_ALIGN_ITEMS[
        element.inferredAutoLayout.primaryAxisAlignItems
      ];
    col.style.alignItems =
      COUNTER_AXIS_ALIGN_ITEMS[
        element.inferredAutoLayout.counterAxisAlignItems
      ];
    col.style.alignContent =
      COUNTER_AXIS_ALIGN_ITEMS[
        element.inferredAutoLayout.counterAxisAlignItems
      ];
    col.style.paddingBottom = element.inferredAutoLayout.paddingBottom;
    col.style.gap = element.inferredAutoLayout.itemSpacing + "px";
    col.style.paddingLeft = element.inferredAutoLayout.paddingLeft;
    col.style.paddingRight = element.inferredAutoLayout.paddingRight;
    col.style.paddingTop = element.inferredAutoLayout.paddingTop;
  }

  col.style.border = 0;
  col.style.width = "100%";
  col.style.flexGrow = 1;
  col.style.borderTopLeftRadius = element.parentNode.topLeftRadius + "px";
  col.style.borderTopRightRadius = element.parentNode.topRightRadius + "px";
  col.style.borderBottomLeftRadius = element.parentNode.bottomLeftRadius + "px";
  col.style.borderBottomRightRadius = element.parentNode.bottomRightRadius + "px";

  if (
    element.parentNode.backgrounds &&
    element.parentNode.backgrounds.length &&
    element.parentNode.backgrounds[0].color
  ) {
    const { r, g, b } = element.parentNode.backgrounds[0].color;
    const rgb = `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
    col.style.background = rgb;
  }

  table.style.width = element.parentNode.width;
  row.appendChild(col);
  table.appendChild(row);

  return {
    parent: table,
    child: col,
  };
}

function createInstance(element) {
  const div = document.createElement("div");
  div.style.width = element.parentNode.width;
  div.style.height = element.parentNode.height;
  div.style.borderTopLeftRadius = element.parentNode.topLeftRadius + "px";
  div.style.borderTopRightRadius = element.parentNode.bottomRightRadius + "px";
  div.style.borderBottomLeftRadius = element.parentNode.bottomLeftRadius + "px";
  div.style.borderBottomRightRadius = element.parentNode.bottomLeftRadius + "px";
  if (element.inferredAutoLayout) {
    div.style.display = "flex";
    div.style.boxSizing = "border-box";
    div.style.flexGrow = 1;

    if (element.inferredAutoLayout.layoutMode === "HORIZONTAL") {
      div.style.flexDirection = "row";
    }
    if (element.inferredAutoLayout.layoutMode === "VERTICAL") {
      div.style.flexDirection = "column";
    }
    const PRIMARY_AXIS_ALIGN_ITEMS = {
      MIN: "start",
      MAX: "end",
      CENTER: "center",
      SPACE_BETWEEN: "space-between",
    };
    const COUNTER_AXIS_ALIGN_ITEMS = {
      MIN: "flex-start ",
      MAX: "flex-end",
      CENTER: "center",
      BASELINE: "baseline",
    };

    div.style.justifyContent =
      PRIMARY_AXIS_ALIGN_ITEMS[
      element.inferredAutoLayout.primaryAxisAlignItems
      ];
    div.style.alignContent =
      COUNTER_AXIS_ALIGN_ITEMS[
      element.inferredAutoLayout.counterAxisAlignItems
      ];
    div.style.alignItems =
      COUNTER_AXIS_ALIGN_ITEMS[
      element.inferredAutoLayout.primaryAxisAlignItems
      ];
    div.style.paddingBottom = element.inferredAutoLayout.paddingBottom;
    div.style.gap = element.inferredAutoLayout.itemSpacing + "px";
    div.style.paddingLeft = element.inferredAutoLayout.paddingLeft;
    div.style.paddingRight = element.inferredAutoLayout.paddingRight;
    div.style.paddingTop = element.inferredAutoLayout.paddingTop;
  }
  if (
    element.parentNode.backgrounds &&
    element.parentNode.backgrounds.length &&
    element.parentNode.backgrounds[0].color
  ) {
    const r = element.parentNode.backgrounds[0].color.r * 255;
    const g = element.parentNode.backgrounds[0].color.g * 255;
    const b = element.parentNode.backgrounds[0].color.b * 255;
    var rgb = "rgb(" + r + ", " + g + ",  " + b + ")";
    div.style.background = rgb;
  }

  return { parent: div, child: null };
}

function createComponent(element) {
  const div = document.createElement("div");
  div.style.width = element.parentNode.width;
  div.style.height = element.parentNode.height;
  div.style.borderTopLeftRadius = element.parentNode.topLeftRadius + "px";
  div.style.borderTopRightRadius = element.parentNode.bottomRightRadius + "px";
  div.style.borderBottomLeftRadius = element.parentNode.bottomLeftRadius + "px";
  div.style.borderBottomRightRadius = element.parentNode.bottomLeftRadius + "px";
  if (
    element.inferredAutoLayout &&
    element.inferredAutoLayout.layoutMode === "HORIZONTAL"
  ) {
    div.style.display = "flex";
    div.style.flexGrow = 1;
    div.style.justifyContent =
      element.inferredAutoLayout.counterAxisAlignItems;
    div.style.paddingBottom = element.inferredAutoLayout.paddingBottom;
    div.style.paddingLeft = element.inferredAutoLayout.paddingLeft;
    div.style.paddingRight = element.inferredAutoLayout.paddingRight;
    div.style.paddingTop = element.inferredAutoLayout.paddingTop;
  }

  return { parent: div, child: null };
}

function createText(element) {
  const pTag = document.createElement("p");
  pTag.style.fontFamily =
    element.styles &&
    element.styles.fontName &&
    element.styles.fontName.family;
  pTag.style.fontWeight = element.styles && element.styles.fontWeight;
  pTag.style.fontSize = element.styles && element.styles.fontSize;
  pTag.style.width = element.styles && element.styles.width;
  pTag.style.height = element.styles && element.styles.height;
  pTag.textContent = element.characters;
  if (element.fills && element.fills.length && element.fills[0].color) {
    const r = element.fills[0].color.r * 255;
    const g = element.fills[0].color.g * 255;
    const b = element.fills[0].color.b * 255;
    var rgb = "rgb(" + r + ", " + g + ",  " + b + ")";
    pTag.style.color = rgb;
  } else {
    pTag.style.color = "white";
  }

  return { parent: pTag, child: null };
}

function createRectangle(element) {
  const div = document.createElement("div");
  return { parent: div, child: null };
}

function createComponentSet(element) {
  const div = document.createElement("div");
  div.style.display = "flex";
  return { parent: div, child: null };
}

function createDefault(element) {
  const div = document.createElement("div");
  return { parent: div, child: null };
}

// const getImage = (element) => {
//   console.log("IMAGEIMAGEIMAGE", element);
//   const el = document.createElement("img");
//   try {
//     const imgUrl = URL.createObjectURL(
//       new Blob([element.image], { type: "image/png" })
//     );
//     // el.setAttribute("src", paint.imageHash + ".png");
//     el.setAttribute("src", imgUrl);
//     allImages.push({ url: imgUrl, name: paint.imageHash });
//   } catch (error) {
//     console.log("errorerrorerrorrr", error);
//   }
//   // el.style.width = element.parentNode.width;
//   // await getInnerEle(el, node.children);
//   return { parent: el, child: null };
// };

export function getNewEle(jsonData) {
  const { parent: element, child: innerElement } = getEleType(jsonData);

  if (jsonData.children && jsonData.children.length) {
    const children = jsonData["children"];
    if (children && children.length) {
      children.forEach((inner) => {
        let { element: childElement } = getNewEle(inner);

        //"blob:null/1b13423c-b07e-4a11-bc73-3030a329361c"

        if (inner.fills && inner.fills.length) {
          for (const paint of inner.fills) {
            // console.log("paintpaintpaint", paint);
            if (paint.type === "IMAGE" && paint.visible) {
              const el = document.createElement("img");
              try {
                const imgUrl = URL.createObjectURL(
                  new Blob([inner.image], { type: "image/png" })
                );
                // el.setAttribute("src", paint.imageHash + ".png");
                el.setAttribute("src", imgUrl);
                el.style.objectFit = "cover";
                el.style.width = inner.parentNode.width;
                el.style.height = inner.parentNode.height;
                allImages.push({ url: imgUrl, name: paint.imageHash });
              } catch (error) {
                console.log("errorerrorerror", error);
              }
              el.style.width = inner.parentNode.width;
              // await  getInnerEle(el, node.children);
              // await  getInnerEle(el, node.children);
              childElement.appendChild(el);
              if (paint.imageHash && paint.scaleMode == "FILL") {
                break;
              }
              if (paint.scaleMode == "CROP") {
                break;
              }
            }
          }
        }

        innerElement
          ? innerElement.appendChild(childElement)
          : element.appendChild(childElement);
      });
    }
  }
  return { element, images: allImages };
}

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
  htmlDocument.getElementById("containermain").appendChild(container);
  const existingHtmlContent = htmlDocument.documentElement.outerHTML;
  const blob = new Blob([existingHtmlContent], { type: "text/html" });
  return blob;
}

async function convert(jsonData) {
  // Get the container element where the table will be inserted
  let container = document.getElementById("container");
  console.log("jsonData", jsonData);

  // const jsonDataString = JSON.stringify(jsonData);
  // const jsonDataBlob = new Blob([jsonDataString], { type: "application/json" });
  // const jsonDataUrl = URL.createObjectURL(jsonDataBlob);
  // const jsonDataLink = document.createElement("a");
  // jsonDataLink.href = jsonDataUrl;
  // jsonDataLink.download = "data.json";
  // jsonDataLink.click();

  const childrenNames = JSONPath({ path: '$.children[*]', json: jsonData });
  //set the JSONPath ot get all the childrennames
  console.log("JSON path children ", childrenNames);

  // const element = await getElement(jsonData, container);
  const { element, images } = getNewEle(jsonData, container);
  console.log("elementelementelement", element);
  container.appendChild(element);
  // downloadZip(images, await createFile(element));
}

onmessage = (event) => {
  // debugger;
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
  // parent.postMessage({ pluginMessage: { type: 'export' } }, '*')
};

function doDL(s) {
  document.getElementById("htmlContent").innerText = s;

  function dataUrl(data) {
    return "data:x-application/text," + escape(data);
  }
  window.open(dataUrl(s));
}
