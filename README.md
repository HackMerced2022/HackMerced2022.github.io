# ProgramBase Web Application

### Introduction

The ProgramBase Web Application is a tool for beginner-level programmers to learn the basics of coding through interactive challenges and course material. Additionally, ProgramBase hosts leaderboard data ranking various users’ performances on the site to add a friendly competitive aspect to the learning process.

### Usage

**Document Structure**

The repo is designed with several HTML files in the main directory that make up the website. “Index.html” contains company descriptions as well as references to various learning tracks associated with learning to code in python and c++. “leaderboard.html” hosts a live leaderboard of current user rankings on the app consisting of score accuracy and total time spent on the app. The leaderboard also references the ProgramBase API querying user data. “api_connect_test.html” calls the ProgramBase API and receives various questions for the user to solve. “results.html” displays testing results and calls the ProgramBase API updating the user ranking.

**Interactive Web App**

The project has been deployed on an interactive web app hosted on github.io. The user can interact with the various learning tools and compete in the leaderboards. The application interacts with the ProgramBase Flask API to reference information stored in SQL databases

The interactive application is deployed [Here](https://hackmerced2022.github.io/)
