/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createListItem, getListItems } from './fetch-utils.js';
import { renderListItem } from './render-utils.js';

/* Get DOM Elements */
const form = document.querySelector('.create-form');
const error = document.getElementById('error');
const listEl = document.getElementById('list');
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

    const newItem = await createListItem(item, amount);
    if (newItem) {
        fetchAndDisplayList();
    } else {
        error.textContent = 'Something went wrong';
    }
});

/* Display Functions */
async function fetchAndDisplayList() {
    listEl.textContent = '';

    const list = await getListItems();

    for (let item of list) {
        const listItemEl = renderListItem(item);
        listItemEl.addEventListener('click', async () => {
            await fetchAndDisplayList();
        });
        listEl.append(listItemEl);
    }
}
