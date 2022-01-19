# Blog Application Using MERN Stack
## SITE: www.test-app-jpj-prod.xyz (Since cost is invovled ,the site may be not available , please drop me a mail if live demo is needed)
    
## Approach
    This application is developed with the MERN Stack and implemented with a microservices architecture
    Implemented with TDD Approach
        
## CI/CD Implemented : 
    Development Tools:
        - Skaffold 
        - Docker
        - K8
        - Git Actions
            -   Used to testing the services before any pull requests
            -   Used to deploy the commited and approved changes into the targetted cloud environment

## Features Implemented:
    1. User should be able to register,login and logout to the application.
        - Implemented the above user story using jsonwebtoken and cookie sessions.
    2. User should be able to create/edit/delete posts only if they are are logged in to the application.
    3. User should be able to see the homepage and check out the posts without any user authetication.
    4. User should be able to upload post picture and update the contents of the post.
    5. User should be able to update their profile.


## Kubernetes Environment Secrets to be setup before deployment
    -   JWT_KEY
    -   CLOUDINARY_CLOUD_NAME
    -   CLOUDINARY_API_KEY
    -   CLOUDINARY_API_SECRET

## UI HomePage:

<img width="1440" alt="Screenshot 2022-01-04 at 2 09 53 PM" src="https://user-images.githubusercontent.com/81481787/148032488-0a71d6a9-0f74-4680-91e9-61c0cce3bdaa.png">
    
    
<img width="1440" alt="Screenshot 2022-01-04 at 2 15 30 PM" src="https://user-images.githubusercontent.com/81481787/148032665-a69d9ed4-841c-4ef5-aea4-5464aaab9757.png">

## Register Page:
    1.  For the Registration service we are using cookie based webtoken for authentication and mongo db to store the details
    2.  To have the project well rounded we are currently using mongodb container without any persistence(This will be acomodated in future release)

<img width="1440" alt="Screenshot 2022-01-04 at 2 20 01 PM" src="https://user-images.githubusercontent.com/81481787/148033195-24e05333-937c-4619-a39a-657f31c3cafe.png">

## Login Page:
    1.  For the Login service we are using cookie based webtoken for authentication and mongo db to store the details
    2.  To have the project well rounded we are currently using mongodb container without any persistence(This will be acomodated in future release)

<img width="1440" alt="Screenshot 2022-01-04 at 2 19 46 PM" src="https://user-images.githubusercontent.com/81481787/148033233-33ad6130-0a62-4806-b65b-5cb3ee4fd748.png">

## Settings Page:
    1. For the USer Update and delete services we are using cookie based webtoken for authentication and mongo db to store the details
    2. To have the project well rounded we are currently using mongodb container without any persistence(This will be acomodated in future release)

<img width="1440" alt="Screenshot 2022-01-04 at 2 29 32 PM" src="https://user-images.githubusercontent.com/81481787/148034418-0194466f-54a1-41c1-8ac8-5718fe02ae73.png">
