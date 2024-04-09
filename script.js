let articles = []; // Array to hold article data
let selectedArticleIds = []; // Array to store IDs of selected articles

// Function to generate random index within range
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Function to display random articles with animation
function displayRandomArticles() {
  const index1 = getRandomIndex(articles.length);
  let index2 = getRandomIndex(articles.length);

  // Ensure index2 is different from index1
  while (index2 === index1) {
    index2 = getRandomIndex(articles.length);
  }

  const article1 = articles[index1];
  const article2 = articles[index2];

  // Fade out transition for article boxes
  const articleBox1 = document.getElementById('article1');
  const articleBox2 = document.getElementById('article2');

  articleBox1.style.opacity = 0;
  articleBox2.style.opacity = 0;

  // Delayed update of article content and fade in effect
  setTimeout(() => {
    articleBox1.textContent = article1.text;
    articleBox2.textContent = article2.text;
    articleBox1.style.opacity = 1;
    articleBox2.style.opacity = 1;
  }, 300); // Set transition delay to match the transition duration
}

// Function to handle user selection and update articles
function handleUserSelection(selectedArticleId, clickedElement) {
  // Add the selected article ID to the selectedArticleIds array
  selectedArticleIds.push(selectedArticleId);

  // Call displayRandomArticles() to show new random articles with animation
  displayRandomArticles();

  // Change background color of the clicked article box to orange temporarily
  const originalColor = clickedElement.style.backgroundColor; // Get original background color
  clickedElement.style.backgroundColor = '#ffa500'; // Set temporary color (orange)

  // Reset background color after a short delay (e.g., 500 milliseconds)
  setTimeout(() => {
    clickedElement.style.backgroundColor = originalColor; // Revert to original color
  }, 500); // Set timeout duration (in milliseconds)
}

// Event listener for article box 1 (article1)
document.getElementById('article1').addEventListener('click', (event) => {
  const selectedArticleId = articles[getRandomIndex(articles.length)].id;
  handleUserSelection(selectedArticleId, event.target);
});

// Event listener for article box 2 (article2)
document.getElementById('skipButton').addEventListener('click', (event) => {
  displayRandomArticles();
});

// Event listener for article box 2 (article2)
document.getElementById('article2').addEventListener('click', (event) => {
  const selectedArticleId = articles[getRandomIndex(articles.length)].id;
  handleUserSelection(selectedArticleId, event.target);
});

document.getElementById('submitButton').addEventListener('click', () => {
  // Prepare text content for download
  const textContent = selectedArticleIds.join(', '); // Join IDs with comma separator
  
  // Create a Blob with the text content
  const blob = new Blob([textContent], { type: 'text/plain' });
  
  // Create a temporary <a> element to trigger the download
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'selectedArticleIds.txt';
  
  // Append the <a> element to the document and trigger the click event
  document.body.appendChild(a);
  a.click();
  
  // Clean up by removing the <a> element
  document.body.removeChild(a);
});
// Fetch articles from JSON file and initialize
fetch('articles.json')
  .then(response => response.json())
  .then(data => {
    articles = data.articles; // Populate the articles array with data from 'articles.json'
    displayRandomArticles(); // Initial display of random articles
  })
  .catch(error => {
    console.error('Error fetching articles:', error);
  });
