/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createListItem, getListItems } from './fetch-utils.js';
import { renderListItem } from './render-utils.js';

/* Get DOM Elements */
const form = document.querySelector('.create-form');
const error = document.getElementById('error');
const listEl = document.querySelector('list');
/* State */

/* Events */
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const amount = data.get('amount');

    const newItem = await createListItem(item, amount);
    if (newItem) {
        // display that item
        // display the whole list (clear out old list, fetch it again)
    } else {
        error.textContent = 'Something went wrong';
    }
});
/* Display Functions */
async function fetchAndDisplayList() {
    listEl.textContent = '';
    //call our fetch to supabase 
    const list = await getListItems();

    if (list) {
        for(let item of list)
    }
}
