# Backend - Cantant API

## Setting up the Backend

### Install Dependencies


```bash
npm install
```


create  MONGODB_URI=mongodb://localhost:27017/CantantApi



### Run the Server

From within the root directory first ensure you are have nodejs install .

To run the server, execute:

```bash
npm start
```



## Endpoints Documentation


POST `/api/users`
Add a new question to the data availabe questions
- *Request body:* {firstName:string, lastName:string, email:string, password:string}
- *Example response:* 
```
{
    "success": true,
    "message": "user successfully created",
    "data": {
        "userId": "6321bb37652d29f3700a543d",
        "firstName": "victory",
        "lastName": "wilson",
        "accountId": "6321bb37652d29f3700a543e"
    }
}
```

GET `/api/users/` 
Fetches all users
- *Example response:*  
 ``` {
    "success": true,
    "message": "all users found",
    "data": [
        {
            "userId": "6321bb37652d29f3700a543d",
            "firstName": "victory",
            "lastName": "wilson",
            "accountId": "6321bb37652d29f3700a543e"
        },
        {
            "userId": "6321bc23652d29f3700a5441",
            "firstName": "drake",
            "lastName": "josh",
            "accountId": "6321bc23652d29f3700a5442"
        },
        {
            "userId": "6321bc5d652d29f3700a5449",
            "firstName": "seyi",
            "lastName": "onaks",
            "accountId": "6321bc5d652d29f3700a544a"
        }
    ]
}
```

GET `/api/users/:id` 
Fetches an available user using a valid userId
- *Request arguments:* id:int 
- *Example response:*  
 ``` {
    "success": true,
    "message": "user found",
    "data": [
        {
            "userId": "6321bc5d652d29f3700a5449",
            "firstName": "seyi",
            "lastName": "onaks",
            "accountId": "6321bc5d652d29f3700a544a"
        }
    ]
}
```


PUT `/api/users/:id/edit`
Update the profile of an available user
- *Request arguments:* id:int 
- *Request body:* {lastName:string}
- *Example response:*
```
{
    "success": true,
    "message": "user updated successfully",
    "data": {
        "userId": "6321bcc6652d29f3700a544e",
        "firstName": "user1",
        "lastName": "anthony",
        "accountId": "6321bcc6652d29f3700a544f"
    }
}
```

DELETE `/api/users/:id/delete`
Delete an existing user from those available
- *Request arguments:* id:int 
- *Example response:* 
```
{
    "success": true,
    "message": "user successfully deleted"
}
```


## Testing


To deploy the tests, run

```bash
npm test
```
