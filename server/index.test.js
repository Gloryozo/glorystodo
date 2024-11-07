import { initializeTestDatabase, insertTestUser, getToken } from "./helper/test.js";
import { expect } from "chai"; // Import the 'expect' assertion style from Chai
import dotenv from 'dotenv';
import { before } from 'mocha';
dotenv.config();

const base_url = 'http://localhost:3001/'; // Define the base URL for the API
// Describe the test suite for the GET tasks functionality
/*describe('Tasks API', () => {
    let taskId; // Variable to store the ID of the created task*/

describe('GET tasks', () => {
    // Initialize the test database before running the tests
    before(() => {
         initializeTestDatabase();
       
        });
    

    // Define a test case to check if it returns a list of all tasks
    it('should return a list of all tasks', async () => {
        // Make a GET request to the server
        const response = await fetch(base_url);
        
        // Parse the JSON response
        const data = await response.json(); 

        // Assert that the response status is 200 (OK)
        expect(response.status).to.equal(200);
        
        // Assert that the data is an array and is not empty
        expect(data).to.be.an('array').that.is.not.empty;
        
        // Assert that the first task includes the keys 'id' and 'description'
        expect(data[0]).to.include.all.keys('id', 'description');
    });
});


// Positive test case for POST task

describe('POST mytask', () => {

    const email = 'post@foo.com'
    const password = 'post123'
    insertTestUser(email, password)
    it('should post a task', async () => {
        const token = `Bearer ${getToken(email)}`;
        const response = await fetch(base_url + 'create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ 'description': 'Task from unit test' })
        })
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })

    it('should not post a task without description', async () => {
        const token = `Bearer ${getToken(email)}`;
        const response = await fetch(base_url + 'create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ 'description': null })
        })
        const data = await response.json()

        expect(response.status).to.equal(500)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
})


describe('DELETE mytask', () => {
    const email = 'delete@foo.com';
    const password = 'delete123';
    insertTestUser(email, password);

    it('should delete a task', async () => {
        const token = `Bearer ${getToken(email)}`;
        const response = await fetch(base_url + 'delete/1', {
            method: 'delete',
            headers: { 'Authorization': token }
        });
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })

    it('should not delete a task with SQL injection', async () => {
        const token = `Bearer ${getToken(email)}`;
        const response = await fetch(base_url + 'delete/id=0 or id > 0', {
            method: 'delete',
            headers: {
                'Authorization': token
            }
        })
        const data = await response.json()

        expect(response.status).to.equal(500, data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
})


describe ('POST register', () => {
    const email = 'testingg@example.com';
    const password = 'testigg123';
    insertTestUser(email, password);
    const token = getToken(email);

        it ('should register a new user with valid email and password', async () => {
            const response = await fetch(base_url + 'user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': token
                },
                body: JSON.stringify({ 'email': email, 'password':password })
            });
    
            const data = await response.json();
    
            // Assert that the response status is 201 (OK)
            expect(response.status).to.equal(201, data.error);
    
            // Assert that the data is an object
            expect(data).to.be.an('object');
    
            // Assert that the data includes the key 'id'
            expect(data).to.include.all.keys('id', 'email');
        });
    });

describe ('POST login', () => {
    const email = 'testingg@example.com';
    const password = 'testigg123';
    insertTestUser(email, password);
    const token = getToken(email);

        it ('should login a user with valid email and password', async () => {
            const response = await fetch(base_url + 'user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ 'email': email, 'password':password })
            });

            const data = await response.json();

            // Assert that the response status is 200 (OK)
            expect(response.status).to.equal(200, data.error);

            // Assert that the data is an object
            expect(data).to.be.an('object');

            // Assert that the data includes the key 'id'
            expect(data).to.include.all.keys('id', 'email', 'token');
        });
    });
