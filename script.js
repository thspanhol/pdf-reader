function findAndReturnNextSeven(substring, mainString, limit) {
  // Encontra o índice da primeira ocorrência da substring
  const startIndex = mainString.indexOf(substring);

  // Se a substring não for encontrada, retorna uma string vazia
  if (startIndex === -1) {
    return "";
  }

  // Calcula o índice inicial dos caracteres seguintes à substring
  const nextCharsStartIndex = startIndex + substring.length;

  // Pega os 7 caracteres seguintes, garantindo que não ultrapasse o tamanho da string principal
  const nextSevenChars = mainString.slice(
    nextCharsStartIndex,
    nextCharsStartIndex + limit
  );

  //console.log(nextSevenChars);
  return nextSevenChars;
}

// Exemplo de uso
const substring = "buscar";
const mainString =
  "Aqui está uma frase onde vamos buscar a substring e pegar os caracteres seguintes.";
const result = findAndReturnNextSeven(substring, mainString);
//console.log(result); // Saída esperada: " a sub"

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

        console.log("Conteúdo do PDF:", textContent);

        const ctps = findAndReturnNextSeven("CTPS", textContent, 8);
        console.log(ctps);

        const pis = findAndReturnNextSeven("PIS", textContent, 15);
        console.log(pis);

        const nome = findAndReturnNextSeven("Practice", textContent, 40);
        console.log(nome);

        const email = findAndReturnNextSeven(
          "Endereço eletrônico",
          textContent,
          20
        );
        console.log(email);

        const celular = findAndReturnNextSeven(
          "Telefone Celular ",
          textContent,
          15
        );
        console.log(celular);

        const naturalidade = findAndReturnNextSeven(
          "Naturalidade ",
          textContent,
          12
        );
        console.log(naturalidade);

        const nascimento = findAndReturnNextSeven(
          "Data de nascimento ",
          textContent,
          10
        );
        console.log(nascimento);

        const identidade = findAndReturnNextSeven(
          "Cédula de identidade ",
          textContent,
          10
        );
        console.log(identidade);

        const admissao = findAndReturnNextSeven(
          "Data de admissão ",
          textContent,
          10
        );
        console.log(admissao);

        const cargo = findAndReturnNextSeven("Função ", textContent, 26);
        console.log(cargo);

        const cpf = findAndReturnNextSeven("CPF ", textContent, 14);
        console.log(cpf);

        const salario = findAndReturnNextSeven(
          "Salário Inicial ",
          textContent,
          11
        );
        console.log(salario);

        const registro = findAndReturnNextSeven(
          "Registro profissional ",
          textContent,
          12
        );
        console.log(registro);

        const eleitor = findAndReturnNextSeven(
          "título de eleitor ",
          textContent,
          26
        );
        console.log(eleitor);

        const estadoCivil = findAndReturnNextSeven(
          "Estado Civil ",
          textContent,
          8
        );
        console.log(estadoCivil);

        const educacao = findAndReturnNextSeven(
          "- Educação ",
          textContent,
          19
        );
        console.log(educacao);
      });
  };
  reader.readAsArrayBuffer(file);
});
