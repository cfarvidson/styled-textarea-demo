import * as Cheerio from "cheerio";

export const validateRow = (text: string) => {
  if (text?.toLocaleLowerCase().includes("good")) {
    return true;
  }

  if (text?.toLocaleLowerCase().includes("bad")) {
    return false;
  }

  return null;
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
    // Skip formatting if the valid is null
    if (isValid === null) {
      return;
    }
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

export const convertTextToHtml = (text: string) => {
  const $ = Cheerio.load("<div></div>");
  const lines = text.split("\n");
  lines.forEach((line) => {
    const pElement = $("<p>").text(line);
    $("div").append(pElement);
  });

  return $("div").html();
};
