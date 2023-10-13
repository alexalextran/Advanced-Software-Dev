# Clarichat

Clarichat is a web application developed by Group 5 Advanced Software Development as a means to prepare for interview questions in an authentic environment. The application is designed to give analyzed feedback by reading in audio input from the user and providing critique and feedback based on various factors.

## Authors

- Alex Tran
- Jason Vu
- Joshua Nguyen
- Wei Ming Edward Ong
- Daweon Kang

## Demo

To run and test the demo, please follow these steps:

1. Install all required packages using npm:
    ```bash
    npm i
    ```

2. Run the application:
    ```bash
    npm run dev
    ```

## Environment Variables

To run this project, you will need to add the following environment variable to your .env file:

- `OPEN_AI_API_KEY`

## Structure

The project's structure is organized as follows:

- `__tests__` : Folder for tests
- `src/pages` : Folder for all accessible pages
- `src/components` : Folder for all components used in pages
- `src/styles` : Folder for styling files
- `context/authcontext` : Database management, which handles all functions for reading and writing data to the DB

## Features

The project features are divided among the team members:

- **Log on, signup, Account Management** (Edward)
- **Dashboard, jobs, admin, database management** (Alex)
- **Chatscreen, OpenAI integration, Whisper integration** (Jason)
- **History, user chat logs** (Josh)
- **Analytics, analytics algorithm** (Louis)
