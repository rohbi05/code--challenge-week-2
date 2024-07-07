
document.addEventListener('DOMContentLoaded', () => {
    //provides a space for users to input new Items
    const itemInput = document.getElementById('Input');
    const addButton = document.getElementById('addittionButton');

    //this functions makes sure the clear button is functional
    const clearButton = document.getElementById('clearButton');
    const shoppingList = document.getElementById('shoppingList');
    let items = JSON.parse(localStorage.getItem('shoppingListItems')) || [];

    //this function saves the state of items in an array
    const updateLocalStorage = () => {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
    };

    //updates the browser to displat the current contents of items in an array
    const renderList = () => {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            const textNode = document.createElement('span');
            textNode.textContent = item.name;

            //appends text to list item in an unorderd list
            listItem.appendChild(textNode);

            //toggles the purchased property of the item
            listItem.classList.toggle('purchased', item.purchased);
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            //enables user to enter a new name for the item
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const newName = prompt('Edit item name:', item.name);
                if (newName) {
                    items[index].name = newName;
                    updateLocalStorage();
                    renderList();
                }
            });
            // function toggles the purchased property of the item
            const markButton = document.createElement('button');
            markButton.textContent = 'Mark';
            markButton.addEventListener('click', (e) => {
                e.stopPropagation();
                items[index].purchased = !items[index].purchased;
                updateLocalStorage();
                renderList();
            });
            //  function removes array item by using splice 
            const clearItemButton = document.createElement('button');
            clearItemButton.textContent = 'Clear';
            clearItemButton.addEventListener('click', (e) => {
                e.stopPropagation();
                items.splice(index, 1);

                // function updates the list
                updateLocalStorage();
                renderList();
            listItem.appendChild(editButton);
            listItem.appendChild(markButton);
            listItem.appendChild(clearItemButton);
            shoppingList.appendChild(listItem);
        });
    };
//function adds event listeners  wich increase user interactivity
    addButton.addEventListener('click', () => {
        const newItem = itemInput.value.trim();
        if (newItem) {
            items.push({ name: newItem, purchased: false });
            itemInput.value = '';
            updateLocalStorage();
            renderList();
        }
    });
//when the clear button is clicked it emties the items in the array
    clearButton.addEventListener('click', () => {
        items = [];
        updateLocalStorage();
        renderList();
    });

    renderList();
});