//create a test for the route /pkm with jest
const request = require('supertest');
const app = require('../cour_node/index');

describe('Test the /pkm path', () => {
    test('It should respond with status code 200', async () => {
        const response = await request(app).get('/pkm');
        expect(response.statusCode).toBe(200);
    });
});



