const axios = require('axios');

describe('POST /sign-in', () => {

    test('sucess login', async () => {
        const body = {
            email: "plazzinga@gmail.com",
            password: "motorola1*"
        };

        const response = await axios.post("http://localhost:3000/mywallet/sign-in", body);

        expect(response.status).toBe(200);
    })
});

describe('POST /sign-up', () => {

    test('successful registration', async () => {
        const body = {
            username: "plazzinga",
            email: "plazzinga@gmail.com",
            password: "motorola*1"
        };

        const response = await axios.post("http://localhost:3000/mywallet/sign-up", body);

        expect(response.status).toBe(200);
    })
})