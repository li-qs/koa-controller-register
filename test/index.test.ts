import app from "./app";
const request = require('supertest');

describe('PingController', () => {
    it('should return "pong" for /ping', async () => {
        const response = await request(app.callback()).get('/ping');
        expect(response.status).toBe(200);
        expect(response.type).toBe('text/plain');
        expect(response.text).toBe('pong');
    });
})
