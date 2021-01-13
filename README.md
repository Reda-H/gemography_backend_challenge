# gemography_backend_challenge

A REST Api to retrieve 100 trending Repositories from the last 30 days, count the occurrences of languages used and repositories that use them.

By accessing the endpoint: http://127.0.0.1:3000/, you can receive the reponse in the following format:

```json
{
    "endDate": "YYYY-MM-DD",   
    "startDate": "YYYY-MM-DD",
    "result": [
        {  
            "language": "JavaScript",
            "occurrences": 22,
            "repositories": [...]
        },{..}],
}
```

## For the reviewer

- I did now know what to do for repositories that contain the value 'null' as language and have considered it the same as for a language.

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

## Install

    $ git clone https://github.com/Reda-H/gemography_backend_challenge
    $ cd gemography_backend_challenge
    $ yarn install

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build
