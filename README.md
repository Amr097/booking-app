<h3 align="center">
  Voayges en vue
</h3>

<p align="center"></p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Amr097/booking-app">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Amr097/booking-app">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Amr097/booking-app">

  <img alt="GitHub issues" src="https://img.shields.io/github/issues/Amr097/booking-app">

  <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/52a12327-6ea4-4a38-ba1c-7befa180c1cb/deploy-status">
</p>

<p align="center">
  <a href="#-about-the-project">About The Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
   <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;
   <a href="#-what-i-learned">Problems I Have Solved</a>&nbsp;&nbsp;&nbsp;|&nbsp;
  <a href="#-getting-started">Getting Started</a>
  
</p>

## 👨🏻‍💻 About The Project

<p align="center">
  <button><a href="https://my-dream-place.netlify.app/https://my-dream-place.netlify.app/"><img alt="Demo" src="https://amr-blogging-app.s3.eu-central-1.amazonaws.com/demo.png" target="_blank"></img></a></button>
    
 Voayges en vue is my graduation project for [Algoriza](https://www.linkedin.com/company/algoriza/) Internship/Mentorship program, It represents a Hotels Booking Web Application that enables users to search for available properties in their desired destinations, access comprehensive property information, complete reservations, and conveniently view their checked-out bookings.

Built using Vue, styled with Tailwind/custom CSS and Integrated with Firebase for Database and Authentication. [Design link](https://www.figma.com/file/BQHVuw93nxwUFEnNuyPDdd/Untitled?mode=dev).

## 🚀 Technologies

- [ [Vue](), [Pinia](), [Vue-Router](), [Vee-Validate]() ]
- [[Tailwind](), [CSS]()]
- [[Firebase](), [Firestore](), [Firebase-Auth]()]
- [[vue-datepicker](), [vue-tel-input]()]

## 📜 Features

- Responsive & Adaptive on all screen sizes.

- Explore available properties open for reservation in your desired destination area.

- Efficiently retrieving and presenting paginated data from Firestore.

- Pagination for property search results on the Front end.

- User Authentication with FirebaseAuth and securely storing both user data and trip details in FireStore.

- Enabling users to effortlessly navigate the results page by customizing filters and sorting options according to their preferences by utilizing Fast and reliable filtration/sorting algorithms in property search results on the Front end.

- Navigation gaurds to secure authorized routes exclusively and to redirect users to a 404 page when accessing non-existent routes.

- Validated Login, Register, Search and Checkout forms.

- Loading screens between data fetching processes and filteration/sorting computations.

- Error handling and informational/guiding error messages for the users to improve UX.

## ✍🏻 Notable Problems I Have Solved

### Development wise

- To streamline overlapping filtration and sorting computations, I created an object within the Pinia store to maintain references for each query. Then, I passed these references as arguments to a function that checks for existing queries, executes computations, and returns the updated results array encompassing all processed queries.

- Manipulated string data structures to extract necessary data from route strings and abbreviate FirebaseAuth error message to make it user friendly.

### Production wise

- Fixed Netlify Vue bug which caused a 404 error if the page is refreshed on any url other than ‘/’, Fixed this issue by creating a file called \_redirects in the /public folder and added this line of code:

```
 /* /index.html 200
```

The line of code typically configures redirection rules for a web server or a static site hosting service like Netlify.

In this context:

-/\* specifies a wildcard path, indicating that any path requested on the server will be redirected.

-/index.html denotes the destination where the incoming requests will be redirected to.

-200 is the status code indicating that the redirection should respond with a "OK" status.

-This rule specifically redirects any incoming request to the /index.html page while returning a status code of 200, effectively serving the index.html page for any requested path on the server.

## 🐢 Getting started

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)

**Clone the project and access the folder**

```bash
$ git clone https://github.com/Amr097/booking-app.git

$ cd booking-app

```

**Follow the steps below**

```bash
# Install the dependencies
$ npm install

# Run the web app
$ npx vite
```
