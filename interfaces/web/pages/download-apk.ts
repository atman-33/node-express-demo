const downloadButton = document.getElementById('download-button');

if (downloadButton) {
  downloadButton.addEventListener('click', async () => {
    console.log('download-button clicked');
    const response = await fetch('api/download-apk');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'fake-apk.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}