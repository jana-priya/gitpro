// Element Selectors
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const BASE_URL = "https://api.github.com/users/";
const githubProfileDetails = document.querySelector(".github-profile-details");
const loader = document.querySelector(".loading-text");

// Loader Functions
function showLoader() {
  loader.classList.add("show");
  githubProfileDetails.classList.add("hide");
}

function removeLoader() {
  loader.classList.remove("show");
  githubProfileDetails.classList.remove("hide");
}

// Fetch GitHub Profile Details
async function fetchGithubProfileDetails() {
  const username = searchInput.value.trim();
  console.log("Username:", username);  // Debugging line
  
  if (!username) {
    alert("Please enter a GitHub username.");
    return;
  }

  showLoader();
  
  try {
    const response = await fetch(`${BASE_URL}${username}`);
    console.log("Response Status:", response.status);  // Debugging line
    
    if (!response.ok) {
      throw new Error("User not found");
    }
    
    const result = await response.json();
    console.log("Profile Result:", result);  // Debugging line
    
    if (result) {
      removeLoader();
      displayProfileDetails(result);
    }
  } catch (error) {
    console.error("Error:", error);  // Debugging line
    removeLoader();
    displayErrorMessage(error.message);
  }
}

// Display Profile Details
function displayProfileDetails(profile) {
  const { login, avatar_url, bio, public_repos, followers, following, company, location, html_url } = profile;
  
  githubProfileDetails.innerHTML = `
    <div class="text-center mb-4 text-white">
      <img src="${avatar_url}" alt="${login}" class="mx-auto mb-4 w-24 h-24 rounded-full object-cover">
      <p class="text-xl font-semibold">${login}</p>
    </div>
    <p class="bio text-gray-200"><strong>Bio:</strong> ${bio || "No bio available"}</p>
    <p class="text-gray-200"><strong>Repos:</strong> ${public_repos}</p>
    <p class="text-gray-200"><strong>Followers:</strong> ${followers}</p>
    <p class="text-gray-200"><strong>Following:</strong> ${following}</p>
    <p class="text-gray-200"><strong>Company:</strong> ${company || "Not available"}</p>
    <p class="text-gray-200"><strong>Location:</strong> ${location || "Not available"}</p>
    <p class="Url text-gray-200"><strong>Profile URL:</strong> <a href="${html_url}" target="_blank" rel="noopener noreferrer">${html_url}</a></p>
  `;
}

// Display Error Message
function displayErrorMessage(message) {
  githubProfileDetails.innerHTML = `
    <p class="text-red-500 text-center">${message}</p>
  `;
}


// Event Listener for Enter Key Press
searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    console.log("Enter key pressed");  // Debugging line
    fetchGithubProfileDetails();
  }
});
