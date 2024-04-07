const generateForm = document.querySelector(".generated-form");
const imageGallary = document.querySelector(".image-gallery")




const OPENAI_API_KEY="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";

//  let isImageGenerating = false;

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
        const imgCard = imageGallary.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");
       
        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;
        
        //When the emage is loaded , remove the loading class
        
        imgElement.onload = () =>{
            imgCard.classList.remove("loading");
        }
    });
}

const generateAiImages = async(userPrompt,userImgQuantity) =>{
    try {
        //send request to the openAi API to generate images based on user inputs
        const response = await fetch("https://api.openai.com/v1/images/generations",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body:JSON.stringify({
            
                prompt: userPrompt,
                n: parseInt(userImgQuantity),
                size: "512x512" ,
                response_format: "b64_json"
            })
        });

        if(!response.ok) throw new Error("Failed to generate images! Please try again.")

        const { data} = await response.json(); //Get data from the response
        updateImageCard([...data]);

    } catch (error) {
        alert(error.message);
    }
}
const handleFormSubmission = (e) => {
    e.preventDefault();

    //get image input from the user and the img quantity
    
    const userPrompt= e.srcElement[0].value;
    const userImgQuantity= e.srcElement[1].value;

//creating HTML makup for image card with loading state

   const imgCardMarkup= Array.from({length: userImgQuantity}, () =>
   `<div class="img-card loading">
   <img src="image/ai-image-generator-website-images/loader.svg" alt="image">
   <a href="#" class="download-btn">
       <img src="image/ai-image-generator-website-images/download.svg" alt="download icon">
   </a>
</div>`
   ).join("");
   imageGallary.innerHTML = imgCardMarkup;
   generateAiImages(userPrompt,userImgQuantity);
}

generateForm.addEventListener("submit", handleFormSubmission);
