/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createListItem, getListItems, editListItem, deleteList } from './fetch-utils.js';
import { renderListItem } from './render-utils.js';

/* Get DOM Elements */
const form = document.querySelector('.create-form');
const error = document.getElementById('error');
const listEl = document.querySelector('.list');
const deleteButton = document.querySelector('.delete');
/* State */

/* Events */
window.addEventListener('load', async () => {
    await fetchAndDisplayList();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const amount = data.get('amount');
    form.reset;

    const newItem = await createListItem(item, amount);
    if (newItem) {
        fetchAndDisplayList();
    } else {
        error.textContent = 'Something went wrong';
    }
});

deleteButton.addEventListener('click', async () => {
    await deleteList();
    await fetchAndDisplayList();
});

/* Display Functions */
async function fetchAndDisplayList() {
    listEl.textContent = '';

    const list = await getListItems();

    if (list) {
        for (let item of list) {
            const listItemEl = renderListItem(item);
            listItemEl.addEventListener('click', async () => {
                await editListItem(item);
                await fetchAndDisplayList();
            });
            if (item.bought) {
                listItemEl.classList.add('cross-out-true');
            }

            listEl.append(listItemEl);
        }
    }
}
