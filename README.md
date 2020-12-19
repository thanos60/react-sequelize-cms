# CMS

Front end: React / Redux / Bootstrap

Back end: MySQL / Node / Sequelize / Passport / Bcrypt

This app uses Passport and Bcrypt for authentication and hashing passwords. New users can register, but allowing new users can be stopped just by uncommenting out a bit of code.

By "dangerously setting" HTML with React I was able to use a standard input field and text area as HTML editors. Editing is handled purely on the front end with Javascript, and the user simply creates a new entry, while maintaining a history of edits. A warning pops up when a user attempts to delete a post where they have to click 'delete' again to finalize it.

## Potential customizations for the future: 

This CMS currently works perfectly for single page apps or feeds, but new React components would have to be created for additional pages. Setting up roles in MySQL would allow for different permission levels. And dates or timestamps should be implemented for a blog feed.

Has this project helped you out in some way?

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M71F28S)
