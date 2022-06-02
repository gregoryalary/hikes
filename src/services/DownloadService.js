// Slugify
import slugify from "slugify";

const downloadFile = (content, name, extension, locale) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`
  );
  element.setAttribute(
    "download",
    `${slugify(name, {
      replacement: "_",
      lower: true,
      locale,
    })}.${extension}`
  );
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

// eslint-disable-next-line import/prefer-default-export
export { downloadFile };
