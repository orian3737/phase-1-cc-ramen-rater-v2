
//  URL for the API
const baseUrl = 'http://localhost:3000';

// DOM
const ramenMenu = document.getElementById('ramen-menu');
const ramenDetail = document.getElementById('ramen-detail');
const newRamenForm = document.getElementById('new-ramen');
const editRamenForm = document.getElementById('edit-ramen');

// functions

// function to display all of the ramen pics
const displayRamens = async () => {
  try {
        console.log('fetching ramens!');
    const response = await fetch(`${baseUrl}/ramens`);
    if (!response.ok) {
      throw new Error('failed to fetch ramens!');
    }

    const ramens = await response.json();
        console.log('fetched ramens:', ramens);

    ramenMenu.innerHTML = ''; // clearing the used used content

    ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen)); // Add click event listener
      ramenMenu.appendChild(img);
    });
        console.log('Ramens diplayed!');
  } catch (error) {
        console.error('Error fetching ramens:', error);
  }
};

// function to handle click on a ramen image
const handleClick = (ramen) => {
      console.log('Ramen clicked:', ramen);

  ramenDetail.innerHTML = `
    <img src="${ramen.image}" alt="${ramen.name}" />
    <h2>${ramen.name}</h2>
    <h3>Restaurant: ${ramen.restaurant}</h3>
    <p>Rating: ${ramen.rating}</p>
    <p>Comment: ${ramen.comment}</p>
  `;
      console.log('ramen details displayed.');

  ramenMenu.removeEventListener('click', handleClick);

  ramenDetail.querySelector('img').addEventListener('click', () => handleClick(ramen));
};

const addSubmitListener = () => {
  newRamenForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(newRamenForm);
    const newRamen = Object.fromEntries(formData.entries());
        console.log('New ramen submitted:', newRamen);

    // add new ramen to the DOM (no need to persist)
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen)); // Add click event listener
    ramenMenu.appendChild(img);
        console.log('New ramen added to the menu!');

    // clearing the form 
    newRamenForm.reset();
        console.log('New ramen form cleared!');
  });
};

//the main function to start the program
const main = () => {
      console.log('Starting program!');
  displayRamens().catch(error => console.error('Error in displayRamens:', error));
  addSubmitListener();
      console.log('Program started!');
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
