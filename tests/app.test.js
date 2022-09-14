const expect = require("expect").expect;
const request = require("supertest");
const {ObjectId} = require("mongodb")
const app = require("../app");
const User = require("../models/User");

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const userThreeId = new ObjectId();

const users = [
    {
        _id: userOneId,
        userId: new ObjectId(),
        firstName: "john",
        lastName: "vom",
        email: "vomjohn@gmail.com",
        password: "testpassword1",
    },
    {
        userId: new ObjectId(),
        _id: userTwoId,
        firstName: "maria",
        lastName: "maria",
        email: "mariagrey@gmail.com",
        password: "testpassword2",

    },
    {
        userId: new ObjectId(),
        _id: userThreeId,
        firstName: "tobi",
        lastName: "steve",
        email: "tobisteve@gmail.com",
        password: "testpassword3",

    },
]


beforeEach((done) => {
    User.deleteMany().then(() => {
        return User.insertMany(users).then(() => done());
    });
});


describe("POST /api/users",() => {
    it("should create a new user",(done) => {
        let newUser = {
            _id: new ObjectId(),
            firstName: "user1",
            lastName: "test1",
            email: "testuser1@gmail.com",
            password: "mypassword",          
        }
        request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect((res) => {
            expect(res.body.success).toBe(true);
            expect(res.body.data.firstName).toBe(newUser.firstName)
        })
        .end((err,res) => {
            if(err) return done(err);
            User.findById(newUser._id).then((user) => {
                expect(user.firstName).toBe(newUser.firstName);
                expect(user.email).toBe(newUser.email);
                expect(user.password).not.toBe(newUser.password)
                done();
            }).catch((err) => {
                done(err)
            })
        })
    });

    it("should return 400 as bad request if user already exist with username",(done) => {
        let newUser = {
            _id: new ObjectId(),
            firstName: "john",
            lastName: "vom",
            email: "vomjohn@gmail.com",
            password: "testpassword",
        }
        request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .end(done)
    });
});

describe("GET /api/users/:id",() => {
    it("should return the user that has that id",(done) => {
        let user = users[0].userId.toHexString();
        request(app)
        .get(`/api/users/${user}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.success).toBe(true);
            expect(res.body.data.firstName).toBe(users[0].firstName);
        })
        .end(done)
    });

    it("should return 404 if user not found with that id",(done) => {
        let id = new ObjectId()
        request(app)
        .get(`/api/users/${id}`)
        .expect(404)
        .expect((res) => {
            expect(res.body.success).toBe(false)
        })
        .end(done)
    })
});

describe("GET /api/users/",() => {
    it("should return all the users",(done) => {

        request(app)
        .get(`/api/users/`)
        .expect(200)
        .expect((res) => {
            expect(res.body.success).toBe(true);
            expect(res.body.data.length).toEqual(3);
        })
        .end(done)
    });


});

describe("PUT /api/users/:id/edit",() => {
    it("should update a user",(done) => {
        let id = users[1].userId.toHexString();
        let updateUser = {
            lastName: "josh"
        }

        request(app)
        .put(`/api/users/${id}/edit`)
        .send(updateUser)
        .expect(200)
        .expect((res) => {
            expect(res.body.success).toBe(true);
            expect(res.body.data.lastName).toBe(updateUser.lastName);
        })
        .end(done)
    });

    it("should return 404 if credentials does not match",(done) => {
        let id = users[2]._id.toHexString();
        let updateUser = {
            email: "user3@tmail.com"
        }
        request(app)
        .put(`/api/users/${id}/edit`)
        .send(updateUser)
        .expect(404)
        .end(done)
    })
});

describe("DELETE /api/users/id/delete",()=> {
    it("should delete a user",(done) => {
        let id = users[1].userId.toHexString();

        request(app)
        .delete(`/api/users/${id}/delete`)
        .expect(200)
        .expect((res) => {
            expect(res.body.success).toBe(true);

        })
        .end((err,res) => {
            if(err) return done(err);
            User.findById(id).then((user) => {
                expect(user).toBeNull();
                done();
            }).catch((err) => done(err))
        });
    });

    it("should return 404 if user does not exist with the id",(done) => {
        let id = new ObjectId().toHexString()


        request(app)
        .delete(`/api/users/${id}/delete`)
        .expect(404)
        .end(done)
    })
});

