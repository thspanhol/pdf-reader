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
        updateHTML("pis", findAndReturnNextSeven("PIS", textContent, 15));
        updateHTML("nome", findAndReturnNextSeven("Practice", textContent, 29));
        updateHTML(
          "email",
          findAndReturnNextSeven("Endereço eletrônico", textContent, 32)
        );
        updateHTML(
          "celular",
          findAndReturnNextSeven("Telefone Celular ", textContent, 15)
        );
        updateHTML(
          "naturalidade",
          findAndReturnNextSeven("Naturalidade ", textContent, 12)
        );
        updateHTML(
          "nascimento",
          findAndReturnNextSeven("Data de nascimento ", textContent, 10)
        );
        updateHTML(
          "identidade",
          findAndReturnNextSeven("Cédula de identidade ", textContent, 10)
        );
        updateHTML(
          "admissao",
          findAndReturnNextSeven("Data de admissão ", textContent, 10)
        );
        updateHTML("cargo", findAndReturnNextSeven("Função ", textContent, 26));
        updateHTML("cpf", findAndReturnNextSeven("CPF ", textContent, 14));
        updateHTML(
          "salario",
          findAndReturnNextSeven("Salário Inicial ", textContent, 11)
        );
        updateHTML(
          "estadoCivil",
          findAndReturnNextSeven("Estado Civil ", textContent, 8)
        );
      });
  };
  reader.readAsArrayBuffer(file);
});
