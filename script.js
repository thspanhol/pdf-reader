function findAndReturnNextSeven(substring, mainString, limit) {
    // Encontra o índice da primeira ocorrência da substring
    const startIndex = mainString.indexOf(substring);
    
    // Se a substring não for encontrada, retorna uma string vazia
    if (startIndex === -1) {
        return '';
    }
    
    // Calcula o índice inicial dos caracteres seguintes à substring
    const nextCharsStartIndex = startIndex + substring.length;
    
    // Pega os 7 caracteres seguintes, garantindo que não ultrapasse o tamanho da string principal
    const nextSevenChars = mainString.slice(nextCharsStartIndex, nextCharsStartIndex + limit);
    
    //console.log(nextSevenChars);
    return nextSevenChars;
}

// Exemplo de uso
const substring = 'buscar';
const mainString = 'Aqui está uma frase onde vamos buscar a substring e pegar os caracteres seguintes.';
const result = findAndReturnNextSeven(substring, mainString);
//console.log(result); // Saída esperada: " a sub"


document.getElementById('pdfFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file.type !== 'application/pdf') {
        console.error('Por favor, selecione um arquivo PDF.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function() {
        const typedArray = new Uint8Array(reader.result);
        pdfjsLib.getDocument({ data: typedArray }).promise.then(async function(pdf) {
            let textContent = '';
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContentPage = await page.getTextContent();
                const textItems = textContentPage.items;
                for (let i = 0; i < textItems.length; i++) {
                    textContent += textItems[i].str + ' ';
                }
            }

            console.log('Conteúdo do PDF:', textContent);

            const ctps = findAndReturnNextSeven('CTPS', textContent, 8);
            console.log(ctps);

            const pis = findAndReturnNextSeven('PIS', textContent, 14);
            console.log(ctps);
        });
    };
    reader.readAsArrayBuffer(file);
});
