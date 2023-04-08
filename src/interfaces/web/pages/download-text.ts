const downloadTextButton = document.getElementById('download-button');

if (downloadTextButton) {
  downloadTextButton.addEventListener('click', async () => {
    console.log('download-button clicked');
    const response = await fetch('api/download-text');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}