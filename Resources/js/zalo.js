const svg = document.getElementById('svg-container')
svg.addEventListener('click', function() {
    const textToCopy = "0909804696";
    navigator.clipboard.writeText(textToCopy).then(function() {
        const message = document.getElementById('copy-message');
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 1000);
    }).catch(function(err) {
        console.error('Không thể sao chép văn bản: ', err);
    });
});