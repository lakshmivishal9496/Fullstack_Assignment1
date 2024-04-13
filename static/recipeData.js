document.addEventListener('DOMContentLoaded', fetchRecipes);
    
async function fetchRecipes() {
    const response = await fetch('/api/recipes');
    const recipes = await response.json();
    const tableBody = document.getElementById('recipesTable').getElementsByTagName('tbody')[0];

    recipes.forEach(recipe => {
        let row = tableBody.insertRow();
        let titleCell = row.insertCell(0);
        let ingredientsCell = row.insertCell(1);
        let instructionsCell = row.insertCell(2);
        let cookingTimeCell = row.insertCell(3);
        let actionsCell = row.insertCell(4);

        titleCell.textContent = recipe.title;
        ingredientsCell.textContent = recipe.ingredients.join(', ');
        instructionsCell.textContent = recipe.instructions;
        cookingTimeCell.textContent = recipe.cookingTime;

        // Correctly set up Delete button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        // Pass the correct row and recipe ID when setting up the onclick event
        deleteButton.onclick = function() { deleteRecipe(recipe._id, row); };


        actionsCell.appendChild(deleteButton);

        // Update button setup remains unchanged
        let updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = () => {
            window.location.href = `index.html?id=${recipe._id}&title=${encodeURIComponent(recipe.title)}&ingredients=${encodeURIComponent(recipe.ingredients.join(','))}&instructions=${encodeURIComponent(recipe.instructions)}&cookingTime=${encodeURIComponent(recipe.cookingTime)}`;
        };
        actionsCell.appendChild(updateButton);
    });
}

// Correct function to delete a recipe and remove its row from the table
async function deleteRecipe(id, row) {
if (confirm('Are you sure you want to delete this recipe?')) {
    try {
        const response = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
        if (response.ok) {
            row.remove(); // Correctly removes the row
        } else {
            alert('Failed to delete recipe.');
        }
    } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Failed to delete recipe.');
    }
}
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    
    // Populate form in case of update
    if (recipeId) {
        populateFormForUpdate(recipeId);
    }
    
    document.getElementById('recipeForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const formData = {
            title: document.getElementById('title').value,
            ingredients: document.getElementById('ingredients').value.split(',').map(ingredient => ingredient.trim()),
            instructions: document.getElementById('instructions').value,
            cookingTime: document.getElementById('cookingTime').value,
        };

        if (recipeId) {
            await updateRecipe(recipeId, formData);
        } else {
            await createRecipe(formData);
        }
    });
});

async function populateFormForUpdate(recipeId) {
    const response = await fetch(`/api/recipes/${recipeId}`);
    if (!response.ok) {
        console.error('Failed to fetch recipe for update');
        return;
    }
    const recipe = await response.json();
    document.getElementById('title').value = recipe.title;
    document.getElementById('ingredients').value = recipe.ingredients.join(', ');
    document.getElementById('instructions').value = recipe.instructions;
    document.getElementById('cookingTime').value = recipe.cookingTime;
    // Change form header or button text if needed
}

async function updateRecipe(recipeId, data) {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        alert('Failed to update recipe');
        console.error('Failed to update recipe:', response.statusText);
        return;
    }
    alert('Recipe updated successfully');
    window.location.href = 'index.html'; // Redirect or handle as needed
}

async function createRecipe(data) {
    const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        alert('Failed to create recipe');
        console.error('Failed to create recipe:', response.statusText);
        return;
    }
    alert('Recipe added successfully');
    window.location.href = 'index.html'; // Redirect or handle as needed
}