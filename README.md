## Exercise - Routing, Authentication and Authorization

## RoutesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.2.

## Deployment in Netlify

https://peaceful-melomakarona-b889ca.netlify.app/
I faced a problem: Browser block request to server because it is an non-https web.

### **Objective:**

Create a login and logout workflow for a store using Angular Material along with Routing, Authentication and Authorization.

1. Create a login page
    1. Create a form with 2 inputs: Username and Password
    2. Validate form (Don’t allow submit without data)
    3. Add 2 buttons: Login and Register
    4. Create logic for login when user click on button
    5. Connect with API and receive information to successful login or error.
    6. Display errors.
    7. If login is successful send the user to home page
    8. Persist token in LocalStorage
    9. Button Register send the user to Register page
2. Register page
    1. Create a form with next fields: Firstname, Last Name, Username, Email, Password, Confirm password
    2. Validate all registration fields, all are required
    3. Submit registration information to API
    4. User redirected to login after registration
3. Home page
    1. Only user with login successfully can see this page (redirected to login if not)
    2. Create a main layout, a header and content for application
    3. In content for home only display word Home, center this word horizontally and vertically
    4. When user clicks the profile image, display a dropdown with user's information and logout button.


## **Additional Information:**

-[x] Don’t use CSS framework like bootstrap
-[x] Use Angular Material
-[x] Create your own CSS
-[x] Use flexbox and/or CSS grid if necessary
-[x] Create the design for warnings and fields
-[x] Use Angular Material's toast to display errors.
-[x] Use [`http://sheltered-oasis-97086.herokuapp.com/reference/`](http://sheltered-oasis-97086.herokuapp.com/reference/) ****as mock api

## **Extra Credits:**

-[x] Upload app on a free hosting service
-[x] Lazy load modules
-[x] Add a list of records from the API in the home view
-[x] Implement Refresh token functionality