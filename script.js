function findAndReturnNextSeven(substring, mainString, limit) {
  const startIndex = mainString.indexOf(substring);
  if (startIndex === -1) {
    return "";
  }
  const nextCharsStartIndex = startIndex + substring.length;
  const nextSevenChars = mainString.slice(
    nextCharsStartIndex,
    nextCharsStartIndex + limit
  );
  return nextSevenChars;
}

document.getElementById("pdfFile").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file.type !== "application/pdf") {
    console.error("Por favor, selecione um arquivo PDF.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const typedArray = new Uint8Array(reader.result);
    pdfjsLib
      .getDocument({ data: typedArray })
      .promise.then(async function (pdf) {
        let textContent = "";
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContentPage = await page.getTextContent();
          const textItems = textContentPage.items;
          for (let i = 0; i < textItems.length; i++) {
            textContent += textItems[i].str + " ";
          }
        }

        function updateHTML(elementId, content) {
          document.getElementById(elementId).innerText = content;
        }

        console.log(textContent);

        updateHTML("ctps", findAndReturnNextSeven("CTPS", textContent, 20));
        updateHTML("nome", findAndReturnNextSeven("Practice", textContent, 29));
        updateHTML(
          "naturalidade",
          findAndReturnNextSeven("Naturalidade ", textContent, 12)
        );
        updateHTML(
          "identidade",
          findAndReturnNextSeven("Cédula de identidade ", textContent, 10)
        );
    
      });
  };
  reader.readAsArrayBuffer(file);
});
