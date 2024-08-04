///// // Function to convert JSON data to HTML table// Function to convert JSON data to HTML table// Function to convert JSON data to HTML table// Function to convert JSON data to HTML table// Function to convert JSON data to HTML table
///// // Function to convert JSON data to HTML table// Function to convert JSON data to HTML table// Function to convert JSON data to HTML table// Function to convert JSON data to HTML table// Function to convert JSON data to HTML table
///// // Function to convert JSON data to HTML table// Function to convert JSON data to HTML table// Function to convert JSON data to HTML table// Function to convert JSON data to HTML table// Function to convert JSON data to HTML table
const allImages = [];
async function getEleType(element) {
  if (element.type == "FRAME") {
    const table = document.createElement("table");
    table.style.border = 0;
    const row = document.createElement("tr");
    row.style.border = 0;

    const col = document.createElement("td");
    if (
      element.inferredAutoLayout &&
      element.inferredAutoLayout.layoutMode === "HORIZONTAL"
    ) {
      col.style.display = "flex";
    }
    col.style.border = 0;
    col.style.width = element.parentNode.width;
    // col.style.height = element.parentNode.height;
    col.style.borderTopLeftRadius = element.parentNode.topLeftRadius + "px";
    col.style.borderTopRightRadius = element.parentNode.topRightRadius + "px";
    col.style.borderBottomLeftRadius =
      element.parentNode.bottomLeftRadius + "px";
    col.style.borderBottomRightRadius =
      element.parentNode.bottomRightRadius + "px";
    if (
      element.parentNode.backgrounds &&
      element.parentNode.backgrounds.length &&
      element.parentNode.backgrounds[0].color
    ) {
      const r = element.parentNode.backgrounds[0].color.r * 255;
      const g = element.parentNode.backgrounds[0].color.g * 255;
      const b = element.parentNode.backgrounds[0].color.b * 255;
      var rgb = "rgb(" + r + ", " + g + ",  " + b + ")";
      col.style.background = rgb;
    }

    row.appendChild(col);
    table.appendChild(row);
    // console.log("return FRAME", table);

    return {
      parent: table,
      child: col,
    };
  } else if (element.type == "INSTANCE") {
    const div = document.createElement("div");
    div.style.width = element.width;
    div.style.height = element.height;
    div.style.borderTopLeftRadius = element.parentNode.topLeftRadius + "px";
    div.style.borderTopRightRadius =
      element.parentNode.bottomRightRadius + "px";
    div.style.borderBottomLeftRadius =
      element.parentNode.bottomLeftRadius + "px";
    div.style.borderBottomRightRadius =
      element.parentNode.bottomLeftRadius + "px";
    if (
      element.inferredAutoLayout &&
      element.inferredAutoLayout.layoutMode === "HORIZONTAL"
    ) {
      div.style.display = "flex";
      div.style.justifyContent =
        element.inferredAutoLayout.counterAxisAlignItems;
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
    // console.log("return INSTANCE", div);

    return { parent: div, child: null };
  } else if (element.type == "COMPONENT") {
    const div = document.createElement("div");
    div.style.width = element.parentNode.width;
    div.style.height = element.parentNode.height;
    div.style.borderTopLeftRadius = element.parentNode.topLeftRadius + "px";
    div.style.borderTopRightRadius =
      element.parentNode.bottomRightRadius + "px";
    div.style.borderBottomLeftRadius =
      element.parentNode.bottomLeftRadius + "px";
    div.style.borderBottomRightRadius =
      element.parentNode.bottomLeftRadius + "px";
    if (
      element.inferredAutoLayout &&
      element.inferredAutoLayout.layoutMode === "HORIZONTAL"
    ) {
      div.style.display = "flex";
      div.style.justifyContent =
        element.inferredAutoLayout.counterAxisAlignItems;
      div.style.paddingBottom = element.inferredAutoLayout.paddingBottom;
      div.style.paddingLeft = element.inferredAutoLayout.paddingLeft;
      div.style.paddingRight = element.inferredAutoLayout.paddingRight;
      div.style.paddingTop = element.inferredAutoLayout.paddingTop;
    }

    return { parent: div, child: null };
  } else if (element.type == "TEXT") {
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
    // console.log("return pTag", pTag);
    return { parent: pTag, child: null };
  } else if (element.type == "RECTANGLE") {
    const div = document.createElement("div");
    return { parent: div, child: null };
  } else if (element.type == "COMPONENT_SET") {
    const div = document.createElement("div");
    div.style.display = "flex";
    return { parent: div, child: null };
  } else {
    const div = document.createElement("div");
    return { parent: div, child: null };
  }
}

const getImage = (element) => {
  console.log("IMAGEIMAGEIMAGE", element);
  const el = document.createElement("img");
  try {
    const imgUrl = URL.createObjectURL(
      new Blob([element.image], { type: "image/png" })
    );
    // el.setAttribute("src", paint.imageHash + ".png");
    el.setAttribute("src", imgUrl);
    allImages.push({ url: imgUrl, name: paint.imageHash });
  } catch (error) {
    console.log("errorerrorerrorrr", error);
  }
  // el.style.width = element.parentNode.width;
  // await getInnerEle(el, node.children);
  return { parent: el, child: null };
};

export async function getNewEle(jsonData) {
  const { parent: element, child: innerElement } = await getEleType(jsonData);
  if (jsonData.children && jsonData.children.length) {
    const children = jsonData["children"];
    if (children && children.length) {
      children.forEach(async (inner) => {
        let {element:childElement} = await getNewEle(inner);

        if (inner.fills && inner.fills.length) {
          for (const paint of inner.fills) {
            // console.log("paintpaintpaint", paint);
            if (paint.type === "IMAGE") {
              const el = document.createElement("img");
              try {
                const imgUrl = URL.createObjectURL(
                  new Blob([inner.image], { type: "image/png" })
                );
                // el.setAttribute("src", paint.imageHash + ".png");
                el.setAttribute("src", imgUrl);
                allImages.push({ url: imgUrl, name: paint.imageHash });
              } catch (error) {
                console.log("errorerrorerror", error);
              }
              el.style.width = inner.parentNode.width;
              // await  getInnerEle(el, node.children);
              childElement.appendChild(el);
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
