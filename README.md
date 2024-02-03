<p align="center">
  This repository is about a simple REST API using NestJS and Mongoose. It's about CRUD operations for users and courses. Users can be created, updated, deleted and listed. Courses can be created, updated, deleted and listed. The user can also be associated with a course.
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
I have not yet prepared the tests for this project. I will do it soon.


## API Documentation

### Users

#### Create User
```bash
POST /users
```
```json
{
    "name":"shameel uddin",
    "email":"user1@uddin.com",
    "password":"hello123"
}
```

#### Get All Users
```bash
GET /users
```

#### Get User By Id
```bash
GET /users/:id
```

#### Update User
```bash
PUT /users/:id
```
```json
{
    "email": "shameel@uddin.com",
    "password": "heyshameel"
}
```

#### Delete User
```bash
DELETE /users/:id
```

### Courses

#### Create Course
```bash
POST /courses
```
```json
{
    "title":"Learning Nest.js",
    "description":"The course is about nest.js fundamentals with Mongoose.",
    "instructor": "65bcfdb9f35e5201d070deed"
}
```
Please provide correct instructor id in the instructor field.

#### Get All Courses
```bash
GET /courses
```

#### Get Course By Id
```bash
GET /courses/:id
```

#### Update Course
```bash
PUT /courses/:id
```
```json
{
    "title":"Learning Nest.js with Shameel",
    "description":"The course is about nest.js fundamentals with Mongoose."
}
```

#### Delete Course
```bash
DELETE /courses/:id
```

#### Enroll User in Course
```bash
POST /courses/enroll/:courseId
```
```json
{
    "userId":"65bcfdb9f35e5201d070deed"
}
```
Please provide correct user id in the userId field and correct course id in the courseId parameter.

