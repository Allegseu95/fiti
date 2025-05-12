(() => {
  document.addEventListener('DOMContentLoaded', async () => {
    console.log('Shellcatch script loaded');

    const container = document.getElementById('shellcatch_container');

    if (!container) {
      console.warn(
        'Container not found. Make sure the element with id "shellcatch_container" exists in the HTML document.'
      );
      return;
    }

    const URL = 'https://web.shellcatch.com';

    const iframe = document.createElement('iframe');
    iframe.src = URL;
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.transition = 'height 0.3s ease';

    try {
      const sendData = {
        url: URL,
        height: window.innerHeight,
        width: window.innerWidth,
        userAgent: navigator.userAgent,
      };

      const response = await fetch('http://localhost:3000/get-height-of-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sendData),
      });

      const data = await response.json();

      if (data.success) {
        iframe.style.height = `${data.height + 20}px`;
      } else {
        console.warn('Failed to fetch height');
        iframe.style.height = '600px';
      }
    } catch (err) {
      console.warn('Error fetching height:', err);
      iframe.style.height = '600px';
    }

    container.appendChild(iframe);
  });
})();
