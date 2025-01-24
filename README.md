# TeamTrack: Employee Management Platform

TeamTrack is an advanced platform designed for managing employees effectively. It provides features such as user authentication, employee role management,HR role management,payment, salary adjustments, and firing functionality, ensuring streamlined operations and enhanced productivity for organizations.

## Live Website Link

https://team-track-2f762.web.app

## Features

### Navbar
Displays the website logo and navigation links to various sections.

Conditional rendering of login/register buttons based on user authentication status.

If logged in, shows the user's photo and name with a dropdown for additional options like logout.

### Login Page
Fields for Email and Password.

Google Authentication for seamless login.

Displays error messages using toast notifications for incorrect credentials.

### Register Page

Fields for Name, Email, Photo URL, and Password.

Password validation to ensure secure account creation.

Success and error messages displayed via toast notifications.

### Home Page

Highlights the platform's features and benefits.

Includes sections showcasing team management tools and organizational advantages.

### All Employees Page (Private Route)

Displays a list of all employees with details such as:

Name
Designation
Salary
Role (e.g., HR, Employee)

Includes options for:

Promoting an employee to HR.
Adjusting employee salary with validation to ensure increases.
Firing employees with a confirmation modal.

### Salary Adjustment Modal

Displays the selected employee's name and current salary.

Allows administrators to update the salary with validation to prevent decreases.

Success and error messages are displayed using toast notifications.

### Firing Confirmation Modal

Asks for confirmation before firing an employee.

Displays a success message upon successfully firing an employee.

### My Profile Page (Private Route)

Displays the logged-in user's profile information.

Option to update profile details.

### Footer

Displays the website name, copyright information, and contact details.

Links to social media platforms.

## Technologies Used

### Frontend

React: For building the user interface.

React Router: For navigation between pages.

React Query: For efficient data fetching and caching.

Tailwind CSS: For styling the application.

DaisyUI: For pre-designed UI components.

React Toastify: For displaying notifications.

### Backend

Firebase Authentication: For secure user authentication.

Node.js & Express.js: For building the server-side logic.

MongoDB: For storing user and employee data.

