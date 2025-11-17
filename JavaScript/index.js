function generateQRCode() {
    const text = document.getElementById('qrText').value.trim();
    const qrcodePreview = document.getElementById('qrcodePreview');
    const qrcodeContainer = document.getElementById('qrcode');
    const qrcodeUrl = document.getElementById('qrcodeUrl');
    const printBtn = document.getElementById('printBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    if (!text) {
        alert('Por favor, digite uma URL ou texto!');
        return;
    }

    // Limpa QR code anterior
    qrcodeContainer.innerHTML = '';

    // Pequeno delay para garantir que o container foi limpo
    setTimeout(() => {
        // Gera o QR code
        try {
            new QRCode(qrcodeContainer, {
                text: text,
                width: 256,
                height: 256,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            // Atualiza a URL exibida
            qrcodeUrl.textContent = text;

            // Mostra o preview e botões
            qrcodePreview.classList.add('active');
            printBtn.style.display = 'inline-block';
            downloadBtn.style.display = 'inline-block';

            // Scroll suave até o QR code
            setTimeout(() => {
                qrcodePreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } catch (error) {
            console.error('Erro ao gerar QR Code:', error);
            alert('Erro ao gerar QR Code. Tente novamente.');
        }
    }, 50);
}

function downloadQRCode() {
    const qrcodeContainer = document.getElementById('qrcode');
    const canvas = qrcodeContainer.querySelector('canvas');

    if (canvas) {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = url;
        link.click();
    } else {
        alert('Erro ao baixar o QR Code. Por favor, gere novamente.');
    }
}

// Permite gerar com Enter
document.getElementById('qrText').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        generateQRCode();
    }
});