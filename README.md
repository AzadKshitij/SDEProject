
# Just Blog

Is a blogging solution for communities of different sizes or to manage personal stuff where you can read, create and search for different articles.



## Features

- Search Posts
- Rich Text Editing Support
- Customizable


## Demo

Insert gif or link to demo


## Tech Stack

**Client:** React, TailwindCSS, Axios, Firebase, Material UI, React Router

**Server:** Python, Flask, MongoDB, Docker, Nginx, Waitress


## Run Locally

Clone the project

```bash
  git clone https://github.com/AzadKshitij/SDEProject
```

Go to the project directory

```bash
  cd SDEProject
```
### Frontend

Go to the Frontend directory

```bash
  cd Frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

### Backend

Go to the Backend directory

```bash
  cd Backend
```
> before installing the dependencies make sure to create a saperate environment to manage the project.

Create environment

```bash
pip install virtualenv
python -m vertualenv venv
# Activate Environment
# For windows
venv\Scripts\activate 
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the server

```bash
  Python run.py
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```env
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_DISCOVERY_URL
S3_BUCKET
S3_KEY
S3_SECRET
```



## Deployment

To deploy this project run `script.bat`. It will start the backend server with docker and setup Nginx and MongoDB. 



## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Authors

- [@AzadKshitij](https://github.com/AzadKshitij)
- [@sandypswami](https://github.com/sandypswami)



