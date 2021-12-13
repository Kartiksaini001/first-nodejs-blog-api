# NodeJs Blog API

## Setup

- Clone the repository on your local machine
- Open a command/terminal window in the root folder of the project
- Run `npm install` to install all the dependencies

## Usage

- Open a command/terminal window in the root folder of the project
- Run `npm start` in the command/terminal window to start the server
- The server will start on PORT 3001
- To test, send request to http://localhost:3001

## Routes

Following routes are present in the project

- `/`: **GET** request to handle the request for root route

- `/posts`:

  - **GET**: To fetch all the posts
  - **POST**: To create a new post

- `/posts/:id`:

  - **GET**: To fetch a particular post with given id
  - **PATCH**: To update a post with given id
  - **DELETE**: To delete a post with given id
