---
title: "REST Basics"
date: "2025-03-22"
tags: ["REST", "API", "HTTP"]
author: "Alexander"
---

# REST Principles

REST stands for Representational State Transfer. It is an architectural style for designing networked applications called APIs (Application Programming Interfaces). RESTful applications use HTTP requests to perform CRUD (Create, Read, Update, Delete) operations. REST is stateless, meaning the server does not store any state about the client session on the server side. The client must include all information for the server to fulfil the request. REST is a set of constraints that must be followed when designing an API. The main principles of REST are:

1. Uniform Interface: The interface between client and server should be the same for all resources. Most APIS meet the following criteria:
   1. Resources are identified by URIs (Uniform Resource Identifiers).
   2. API resources should have the same type eg. JSON, XML, etc.
   3. Use HTTP methods explicitly such as:
      - GET: Retrieve a resource.
      - POST: Create a resource.
      - PUT: Update a resource.
      - DELETE: Delete a resource.
      - PATCH: Partially update a resource.
   4. Use HTTP status codes to indicate the status of the request, such as:
      - **1xx (Informational): These codes indicate that the request has been received and is being processed.**
      - **2xx (Success): These codes indicate that the request was successful.**
      - 200: OK - The request was successful.
      - 201: Created - The request was successful and a new resource was created.
      - 204: No Content - The request was successful but there is no content to return.
      - **3xx (Redirection): These codes indicate that the client must take additional action to complete the request.**
      - 301: Moved Permanently - The resource has been moved to a different URI.
      - 304: Not Modified - The resource has not been modified since the last request.
      - **4xx (Client Error): These codes indicate that there was an error with the request.**
      - 400: Bad Request - The request was invalid.
      - 401: Unauthorized - The request requires user authentication.
      - 403: Forbidden - The server understood the request but refused to fulfil it.
      - 404: Not Found - The resource was not found.
      - 405: Method Not Allowed - The request method is not allowed.
      - **5xx (Server Error): These codes indicate that there was an error on the server side.**
      - 500: Internal Server Error - The server encountered an error.
      - 501: Not Implemented - The server does not support the functionality required to fulfil the request.
2. Stateless: The communication from the client must contain all the information necessary to understand the request. The server does not store any state about the client session on the server side.
3. Cacheable: The server must indicate whether the response can be cached or not, to prevent the client from sending unnecessary requests. This can be done using the Cache-Control header. The server can also include an ETag header in the response to indicate the version of the resource.
4. Client-Server: The client and server should be separate from each other. This allows the client and server to evolve independently.
5. Layered System: API can have many layers such as load balancers, caches, etc. The client should not be able to tell how many layers are there between the client and the server. These layers can be added or removed without affecting the client.
6. Code on Demand (Optional): The server can send executable code to the client to extend the functionality of the client. This is optional and not used in most APIs.

# Architecture of RESTful APIs

THe typical architecture of a RESTful API consists of the following components:

1. Client: The client is the application that sends requests to the server.
2. Uniform Interface: The interface between the client and server should be the same for all resources.
3. The layered system could be simply a server and database or for example:
   - Authentication: Verify the identity of the client.
   - Load balancers: Distribute the incoming requests to multiple servers.
   - Caches: Store the response of the server to prevent the client from sending unnecessary requests.
   - Servers: The server that processes the request and sends the response.
   - Database: Store the data of the application.

Clients: these are typically web applications, mobile applications, or other servers that consume the API. Clients send a HTTP requests to the server to perform CRUD operations. We can use applications such as Postman to test and even document the API.

If a applications requires authentication, the client is typically required to send an API key or a token in the request header. Alternatively a client can login to the server to receive a token to use in subsequent requests this is called token-based authentication and most commonly uses JWT (JSON Web Tokens). The server then verifies this token which needs to be included in all subsequent requests.

The server: The server is responsible for processing the request and sending the response. The server can be a simple server that processes the request and sends the response or a more complex server that includes multiple layers such as authentication, load balancers, caches, etc.

# REST Endpoints

In a RESTful API, an endpoint is a URL that represents an object or a collection of objects. The endpoint consists of the following components:

1. Base URL: The base URL of the API.
2. Path: The path to the resource.
3. Query Parameters: Optional parameters that can be used to filter the response.

For POST/PUT requests, the client sends the data in the body of the request. The server then processes the request and sends the response.

Examples of REST endpoints:

- GET /api/users: Get all users.
- GET /api/users/1: Get user with ID 1.
- POST /api/users: Create a new user.
- PUT /api/users/1: Update user with ID 1.
- DELETE /api/users/1: Delete user with ID 1.

Additionally we might add query strings to support filtering, sorting, and pagination. For example:

- GET /api/users?sort=desc: Get all users sorted in descending order.
- GET /api/users?limit=10: Get the first 10 users.
- GET /api/users?limit=10&offset=10: Get the second page of 10 users.
- GET /api/users?filter=active: Get all active users.

When it comes to pagination a common approach is to use the limit and offset query parameters. The limit parameter specifies the number of items to return and the offset parameter specifies the number of items to skip. The response should also include the total number of items to allow the client to calculate the number of pages.

Naming endpoints is important and should be consistent across the API. The endpoint should be named after the resource it represents. The endpoint should be plural and use lowercase letters. Avoid using verbs in the endpoint name. For example, use /api/users instead of /api/getUsers.
