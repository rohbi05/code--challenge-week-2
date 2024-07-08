//function ensures Java script code is executed when DOM is ready 
document.addEventListener('DOMContentLoaded', () => {
    // represnts a field where users can  input new Item
    const itemInput = document.getElementById('itemInput');
    //represents a field where users can add the item inputted to the list
    const addButton = document.getElementById('addButton');
    //  this function  enables users to  clear the list if they wish to
    const clearButton = document.getElementById('clearButton');
    //renders items into an unorderd list
    const shoppingList = document.getElementById('shoppingList');
    //retrives Items from shopping list
    let items = JSON.parse(localStorage.getItem('shoppingListItems')) || [];
    
// this functionsaves items stored in shopping list items
    const updateLocalStorage = () => {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
    };
// this function updates and displays the contents of the items 
    const renderList = () => {
        //prevents duplicates
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            //this function creats a li for each item
            const listItem = document.createElement('li');
            // function creates a text node to display name if the item
            const textNode = document.createElement('span');
            textNode.textContent = item.name;
            listItem.appendChild(textNode);

            listItem.classList.toggle('purchased', item.purchased);
//when button is clicked it prompts user to Edit item name
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            // function adds event listeners
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const newName = prompt('Edit item name:', item.name);
                if (newName) {
                    items[index].name = newName;
                    updateLocalStorage();
                    renderList();

                }
            });
//toogle items when clicked
            const markButton = document.createElement('button');
            markButton.textContent = 'Mark';
            markButton.addEventListener('click', (e) => {
                e.stopPropagation();
                items[index].purchased = !items[index].purchased;
                updateLocalStorage();
                renderList();
            });
//clears items when clicked
            const clearItemButton = document.createElement('button');
            clearItemButton.textContent = 'Clear';
            clearItemButton.addEventListener('click', (e) => {
                e.stopPropagation();
                items.splice(index, 1);
                updateLocalStorage();
                renderList();
            });
//enssures buttons execute functions
            listItem.appendChild(editButton);
            listItem.appendChild(markButton);
            listItem.appendChild(clearItemButton);
            shoppingList.appendChild(listItem);
        });
    };

    addButton.addEventListener('click', () => {
        const newItem = itemInput.value.trim();
        if (newItem) {
            items.push({ name: newItem, purchased: false });
            itemInput.value = '';
            updateLocalStorage();
            renderList();
        }
    });

    clearButton.addEventListener('click', () => {
        items = [];
        updateLocalStorage();
        renderList();
    });

    renderList();
});