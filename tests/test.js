require("dotenv").config();

const mongoose = require("mongoose");
const request = require("supertest");

const id = "tt7286456";
const value = "Test comment";
const app = require("../server");
const server = app.server;

async function createFilm() {
    const film = await request(server)
        .post(`/movies/${id}`)
        .set("Accept", "application/json");

    return { film };
}

async function createComment() {
    const { film } = await createFilm();

    const comment = await request(server)
        .post(`/comments/${id}`)
        .set("Accept", "application/json")
        .send({
            value
        });
    return { film, comment };
}

describe("Movies Endpoints", () => {
    describe("Post Endpoints", () => {
        it("should be able to create a movie", async() => {
            const { film } = await createFilm();
            expect(film.status).toBe(200);
        });
    });

    describe("Get Endpoints", () => {
        it("should be able to get a movie", async() => {
            const { film } = await createFilm();
            const getFilms = await request(server).get(`/movies`);
            expect(getFilms.body).toContainEqual(film.body);
        });
    });
});

describe("Comments Endpoints", () => {
    describe("Post Endpoints", () => {
        it("should be able to create a comment", async() => {
            const { film, comment } = await createComment();
            expect(film.status).toBe(200);
            expect(comment.status).toBe(200);
        });
    });

    describe("Get Endpoints", () => {
        it("should be able to get a comment", async() => {
            const { comment } = await createComment();
            const getComments = await request(server).get(`/comments`);
            expect(getComments.body).toContainEqual(comment.body);
        });
    });
});

afterAll(async done => {
    await app.db.close();
    //await app.server.close(); // that's method is deprecated
    done();
    // unfortunately I don't know how to gently disable/close server, that's why tests aren't ended :(
});