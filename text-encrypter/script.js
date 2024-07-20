document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("encryptButton").addEventListener("click", encryptText);
    document.getElementById("decryptButton").addEventListener("click", decryptText);
    document.getElementById("copyButton").addEventListener("click", copyText);
    document.getElementById("inputText").addEventListener("input", clearResult);

    function encryptText() {
        let text = document.getElementById("inputText").value.trim();

        if (text === "") {
            showTemporaryAlert("¡Vamos! Cuéntame un secreto para cifrar, solo lo sabremos tú y yo");
            return;
        }

        if (!/^[a-zñ\s.,¿?]+$/.test(text)) {
            showTemporaryAlert("No se admiten mayúsculas, caracteres especiales o números");
            return;
        }

        let encryptedText = text.replace(/e/g, "enter")
                                .replace(/i/g, "imes")
                                .replace(/a/g, "ai")
                                .replace(/o/g, "ober")
                                .replace(/u/g, "ufat");

        let resultDiv = document.getElementById("resultText");
        resultDiv.textContent = encryptedText;
        resultDiv.classList.add("fade-in");

        updateResultDisplay();
    }

    function decryptText() {
        let text = document.getElementById("inputText").value.trim();

        if (text === "") {
            showTemporaryAlert("Escribe el mensaje oculto, yo lo descifro para ti");
            return;
        }

        if (!/^[a-zñ\s.,!?¿¡]+$/.test(text)) {
            showTemporaryAlert("No se admiten caracteres especiales no permitidos");
            return;
        }

        let decryptedText = text.replace(/enter/g, "e")
                                .replace(/imes/g, "i")
                                .replace(/ai/g, "a")
                                .replace(/ober/g, "o")
                                .replace(/ufat/g, "u");

        let resultDiv = document.getElementById("resultText");
        resultDiv.textContent = decryptedText;
        resultDiv.classList.add("fade-in");

        updateResultDisplay();
    }

    function copyText() {
        let resultText = document.getElementById("resultText").textContent;
        navigator.clipboard.writeText(resultText).then(() => {
            showTemporaryAlert("Texto copiado al portapapeles");
        }).catch(err => {
            console.error("Error al copiar el texto: ", err);
        });
    }

    function showTemporaryAlert(message) {
        let alertDiv = document.createElement("div");
        alertDiv.className = "temporary-alert";
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.classList.add("show");
        }, 10);

        setTimeout(() => {
            alertDiv.classList.remove("show");
            setTimeout(() => {
                alertDiv.remove();
            }, 500);
        }, 5000);
    }

    function clearResult() {
        let inputText = document.getElementById("inputText").value;
        if (inputText === "") {
            document.getElementById("resultText").textContent = "";
            updateResultDisplay();
        }
    }

    function updateResultDisplay() {
        let resultDiv = document.getElementById("resultText");
        let resultImage = document.getElementById("resultImage");
        let parrafoResultado = document.querySelector(".parrafoResultado");

        if (resultDiv.textContent.trim() === "") {
            resultImage.style.display = "block";
            parrafoResultado.style.display = "block";
        } else {
            resultImage.style.display = "none";
            parrafoResultado.style.display = "none";
        }
    }
});
