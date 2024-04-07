document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generateBtn");
    const generatedImage = document.getElementById("generatedImage");

    generateBtn.addEventListener("click", generateImage);

    function generateImage() {
        // For simplicity, using Unsplash's random image API
        const unsplashApiUrl = "https://source.unsplash.com/random";
        const imageSize = "800x600"; // Adjust as needed

        // Generate a new URL to avoid browser caching
        const imageUrl = `${unsplashApiUrl}/${imageSize}?${new Date().getTime()}`;

        // Update the image source
        generatedImage.src = imageUrl;
    }
});
