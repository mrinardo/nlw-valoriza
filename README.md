# nlw-valoriza

API that allows users to send compliments to other users.

Sample project developed during [Rocketseat's](https://rocketseat.com.br/) NLW with Nodejs.

## Running it

```shell
yarn typeorm migration:run
yarn dev
```

## Endpoints

These are the API endpoints available under http://localhost:3000.

You can use an HTTP client like Postman or Insomnia to test them:


### **/users** [POST]

Creates new user.

User data must be passed in HTTP body.
```json
{
	"name":"Mauricio",
	"email": "mauricio@server.com",
	"password": "9$30a5Aá!",
	"admin":true
}
```
***
### **/login** [POST]

Logins an user.

User data must be passed in HTTP body.
```json
{
	"email": "mauricio@server.com",
	"password": "9$30a5Aá!"
}
```
If authentication is successful, it returns a Bearer token to be used in other calls to the API.
***
### **/tags** [GET]

Shows a list of compliment tags available in the database.

The Bearer token must be used for authentication.
***
### **/users** [GET]

Shows a list of users available in the database.

The Bearer token must be used for authentication.
***
### **/tags** [POST]

Creates a new compliment tag.

Tag data must be passed in HTTP body and the Bearer token must be used for authentication.
```json
{
	"name":"Otimista"
}
```
***
### **/compliments** [POST]

Sends a compliment to another user.

Compliment data must be passed in HTTP body and the Bearer token must be used for authentication.
```json
{
	"tag_id": "78663d08-bdb3-4e06-a229-9a1e1c17efa3",
	"user_receiver": "2d2556a8-0e97-48b3-9e0e-22d7097419b9",
	"message": "Você é demais!"
}
```
An fake e-mail will be sent to the user using Nodemailer/Ethereal. Check the console log for the link of the e-mail.
***
### **/forgot_password** [POST]

Asks for a token for password reset.

User data must be passed in HTTP body.

```json
{
	"email": "mauricio@server.com"
}
```
An fake e-mail with a password reset token the will be sent to the user using Nodemailer/Ethereal. Check the console log for the link of the e-mail.
***
### **/reset_password/:resetToken** [POST]

Allows the user to change his/her password.

The password reset token must be passed in the URL and the new password in HTTP body.

```json
{
	"email": "mauricio@server.com",
	"password": "123456Aa!ç"
}
```
***
### **/users/compliments/sent** [GET]

Shows a list of compliments sent by the current user.

The Bearer token must be used for authentication.
***
### **/users/compliments/received** [GET]

Shows a list of compliments received by the current user.

The Bearer token must be used for authentication.
***

## Notes
This is my first project using Nodejs and there are lots of TODO items pending and plenty of room for improvement. :)



