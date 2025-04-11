function generateRecipe() {
    const fileInput = document.getElementById('imageUpload');
    const recipeResult = document.getElementById('recipeResult');
    
    if (fileInput.files.length === 0) {
        alert('Please upload an image first.');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    // Send the image to the Flask API
    fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Display the result
        if (data.error) {
            recipeResult.innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
            recipeResult.innerHTML = `
                <h2>Generated Recipe:</h2>
                <div class="recipe-image">
                    <img src="${URL.createObjectURL(fileInput.files[0])}" alt="Food Image" style="width: 200px; height: auto; margin-bottom: 20px;">
                </div>
                <p><strong>Predicted Food:</strong> ${data.predicted_class}</p>
                <p><strong>Confidence:</strong> ${data.confidence.toFixed(2)}</p>
                <h3>Recipe:</h3>
                <p><strong>Title:</strong> ${data.recipe.title}</p>
                <p><strong>Ingredients:</strong> ${data.recipe.ingredients.join(', ')}</p>
                <p><strong>Instructions:</strong> ${data.recipe.instructions}</p>
            `;
        }
    })
    .catch(error => {
        recipeResult.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
