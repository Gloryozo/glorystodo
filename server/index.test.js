import { initializeTestDatabase } from "./helper/test";
import { expect } from "chai"; // Import the 'expect' assertion style from Chai

const base_url = 'http://localhost:3001/'; // Define the base URL for the API
// Describe the test suite for the GET tasks functionality
/*describe('Tasks API', () => {
    let taskId; // Variable to store the ID of the created task*/

describe('GET task', () => {
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

describe('POST task', () => {
    // Define a test case to create a new task
    it('should create a new task', async () => {
        // Define the task data
        const taskData = {
            description: 'Unit test task'
        };

        // Make a POST request to the server
        const response = await fetch(base_url + 'create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        // Parse the JSON response
        const data = await response.json();

        // Assert that the response status is 201 (Created)
        expect(response.status).to.equal(201);

        // Assert that the data is an object
        expect(data).to.be.an('object');

        // Assert that the data includes the keys 'id' and 'description'
        expect(data).to.include.all.keys('id');
    });
});
//Negetive test case for POST task
describe('POST task negative cases', () => {
  
it('should not create a new task without a description', async () => {
    const response = await fetch(base_url + 'create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Sending an empty object
    });

    const data = await response.json();

    // Assert that the response status is 400
    expect(response.status).to.equal(500);
    expect(data).to.be.an('object');
    expect(data).to.include.all.keys('error'); // Check for the error key
});
});

describe('DELETE task', () => {
    // Define a test case to delete a task
    it('should delete a task', async () => {
    
        // Make a DELETE request to the server
        const response = await fetch(base_url + 'delete/1', {
            method: 'DELETE'
        });

        // Parse the JSON response
        const data = await response.json();
        
        // Assert that the response status is 200 (OK)
        expect(response.status).to.equal(200);

        // Assert that the data is an object
        expect(data).to.be.an('object');

        // Assert that the data includes the key 'id' with the value '1'
        expect(data).to.include.all.keys({ id: '1' });
    });
// negetive test case for DELETE task
it ('should not delete a task with SQL injection', async () => {
    const response = await fetch(base_url + 'delete/is=0 or id > 0', {
        method: 'DELETE'
    });

    const data = await response.json();

    // Assert that the response status is 404
    expect(response.status).to.equal(500);
    expect(data).to.be.an('object');
    expect(data).to.include.all.keys('error');
    });
    });
    describe ('POST register', () => {
        const email = 'testing@example.com';
        const password = 'test123';
        it ('should register a new user with valid email and password', async () => {
            const response = await fetch(base_url + 'user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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