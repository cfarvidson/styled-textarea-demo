import * as Cheerio from "cheerio";

export const validateRow = (text: string) => {
  if (text?.toLocaleLowerCase().includes("good")) {
    return true;
  }

  return false;
};

export const validateHtml = (html: string) => {
  const $ = Cheerio.load(html);
  $("p").each((index, element) => {
    const content = $(element).text();
    if (!content) {
      return;
    }

    // Add your validation logic here
    const isValid = validateRow(content);

    // Start by clearing the classes
    $(element).removeAttr("class");
    if (isValid) {
      $(element).addClass("bg-green-200");
    } else {
      $(element).addClass("bg-red-200");
    }
  });

  // Now, you can access the modified HTML using $.html()
  const modifiedHTML = $.html();
  return modifiedHTML;
};

export const convertToText = (html: string) => {
  const $ = Cheerio.load(html);
  let plain = "";
  $("p").each((index, element) => {
    const content = $(element).text();
    if (content) {
      plain += `\n${content}`;
    }
  });
  return plain;
};
