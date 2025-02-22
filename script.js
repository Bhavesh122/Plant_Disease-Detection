document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("imageUpload");
    const predictButton = document.getElementById("predictButton");

    if (predictButton) {
        predictButton.addEventListener("click", async function(event) {
            event.preventDefault();

            const file = fileInput.files[0];
            if (!file) {
                alert("Please upload an image first.");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("/predict", {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) throw new Error("Prediction failed");

                const data = await response.json();
                window.location.href = `/result?plant_type=${encodeURIComponent(data.plant_type)}&disease_type=${encodeURIComponent(data.disease_type)}&precautions=${encodeURIComponent(data.precautions.join(','))}&fertilizers=${encodeURIComponent(data.fertilizers.join(','))}`;
            } catch (error) {
                alert("Error: " + error.message);
            }
        });
    }

    const speakButton = document.getElementById("speakButton");
    if (speakButton) {
        speakButton.addEventListener("click", function() {
            const plantType = document.getElementById("plantType").textContent;
            const diseaseType = document.getElementById("diseaseType").textContent;
            const precautions = Array.from(document.querySelectorAll("#precautionsList li"))
                .map(li => li.textContent).join(", ");
            const fertilizers = Array.from(document.querySelectorAll("#fertilizerList li"))
                .map(li => li.textContent).join(", ");

            const utterance = new SpeechSynthesisUtterance(
                `The plant is ${plantType}. The disease identified is ${diseaseType}. ` +
                `Recommended precautions include: ${precautions}. Suggested fertilizers are: ${fertilizers}.`
            );
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;
            speechSynthesis.speak(utterance);
        });
    }

    // Adjusting layout for home page
    const predictSection = document.getElementById("predictSection");
    if (predictSection) {
        predictSection.style.display = "flex";
        predictSection.style.flexDirection = "column";
        predictSection.style.alignItems = "center";
        predictSection.style.gap = "30px";
        predictSection.style.padding = "60px";
    }

    const fileUploadContainer = document.getElementById("fileUploadContainer");
    if (fileUploadContainer) {
        fileUploadContainer.style.display = "flex";
        fileUploadContainer.style.flexDirection = "column";
        fileUploadContainer.style.alignItems = "center";
        fileUploadContainer.style.gap = "20px";
    }

    // Adjusting layout for result page
    const resultSection = document.getElementById("resultSection");
    if (resultSection) {
        resultSection.style.display = "flex";
        resultSection.style.flexDirection = "column";
        resultSection.style.alignItems = "center";
        resultSection.style.gap = "40px";
        resultSection.style.fontSize = "1.8rem";
        resultSection.style.padding = "50px";
        resultSection.style.width = "80%";
        resultSection.style.margin = "auto";
        resultSection.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        resultSection.style.borderRadius = "20px";
        resultSection.style.color = "#fff";
    }

    const headings = document.querySelectorAll("#resultSection h2, #resultSection h3");
    headings.forEach(heading => {
        heading.style.fontSize = "2.5rem";
        heading.style.fontWeight = "bold";
        heading.style.textAlign = "center";
    });

    const lists = document.querySelectorAll("#resultSection ul");
    lists.forEach(list => {
        list.style.fontSize = "1.5rem";
        list.style.lineHeight = "2";
        list.style.listStyleType = "disc";
        list.style.paddingLeft = "40px";
    });

    const resultDetails = document.querySelectorAll("#resultSection p");
    resultDetails.forEach(detail => {
        detail.style.fontSize = "1.8rem";
        detail.style.textAlign = "center";
    });

    const speakButtonStyle = document.getElementById("speakButton");
    if (speakButtonStyle) {
        speakButtonStyle.style.padding = "15px 40px";
        speakButtonStyle.style.fontSize = "1.5rem";
        speakButtonStyle.style.borderRadius = "10px";
    }

    const goBackLink = document.getElementById("goBack");
    if (goBackLink) {
        goBackLink.style.fontSize = "1.5rem";
    }
});
