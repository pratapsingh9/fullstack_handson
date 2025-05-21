const request = require('supertest');
const app = require('../app');

describe('Express App', () => {
  // Health check endpoint
  describe('GET /api/health', () => {
    it('should return 200 and OK status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe("User Api App" , () => {
    it('should return all users', async() => {
      const  res = await request(app).get('/api/users');
      expect(res.statusCode).toEqual(200);
    })
  })
  // User endpoints
  describe('User API', () => {
    describe('GET /api/users', () => {
      it('should return all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
      });
    });

    describe('GET /api/users/:id', () => {
      it('should return a single user', async () => {
        const userId = 1;
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', userId);
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('email');
      });

      it('should return 404 for non-existent user', async () => {
        const res = await request(app).get('/api/users/999');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'User not found');
      });
    });

    describe('POST /api/users', () => {
      it('should create a new user', async () => {
        const newUser = {
          name: 'Test User',
          email: 'test@example.com'
        };

        const res = await request(app)
          .post('/api/users')
          .send(newUser);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name', newUser.name);
        expect(res.body).toHaveProperty('email', newUser.email);
      });

      it('should return 400 for invalid input', async () => {
        const invalidUser = { name: 'No Email' };
        const res = await request(app)
          .post('/api/users')
          .send(invalidUser);

      });
    });
  });

  // Product endpoints
  describe('Product API', () => {
    describe('GET /api/products', () => {
      it('should return all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
      });
    });

    describe('GET /api/products/:id', () => {
      it('should return a single product', async () => {
        const productId = 1;
        const res = await request(app).get(`/api/products/${productId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', productId);
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('price');
      });

      it('should return 404 for non-existent product', async () => {
        const res = await request(app).get('/api/products/999');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Product not found');
      });
    });
  });
});