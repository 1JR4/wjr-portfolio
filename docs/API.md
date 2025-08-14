# 🚀 API Documentation

> GraphQL API endpoints and REST fallbacks for Flying Nimbus

## Base URL

```
Development: http://localhost:3000/graphql
Staging: https://staging.flyingnimbustest.app/graphql
Production: https://api.flyingnimbustest.app/graphql
```

## Authentication

All authenticated requests require a JWT token in the Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## GraphQL Schema

### Authentication

#### Mutations

```graphql
# User Registration
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    user {
      id
      email
      createdAt
    }
    tokens {
      accessToken
      refreshToken
    }
  }
}

# User Login
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      email
      lastLoginAt
    }
    tokens {
      accessToken
      refreshToken
    }
  }
}

# Refresh Access Token
mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}

# Logout
mutation Logout {
  logout {
    success
    message
  }
}
```

#### Queries

```graphql
# Get Current User
query Me {
  me {
    id
    email
    profile {
      firstName
      lastName
      avatar
    }
    createdAt
    updatedAt
  }
}

# Verify Token
query VerifyToken {
  verifyToken {
    valid
    expiresAt
  }
}
```

### User Management

#### Queries

```graphql
# Get User by ID
query GetUser($id: ID!) {
  user(id: $id) {
    id
    email
    profile {
      firstName
      lastName
      bio
      avatar
    }
    createdAt
  }
}

# List Users (Admin only)
query ListUsers($limit: Int, $offset: Int) {
  users(limit: $limit, offset: $offset) {
    items {
      id
      email
      role
      status
    }
    totalCount
    hasMore
  }
}
```

#### Mutations

```graphql
# Update Profile
mutation UpdateProfile($input: ProfileInput!) {
  updateProfile(input: $input) {
    id
    profile {
      firstName
      lastName
      bio
      avatar
    }
  }
}

# Change Password
mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
  changePassword(
    currentPassword: $currentPassword
    newPassword: $newPassword
  ) {
    success
    message
  }
}

# Delete Account
mutation DeleteAccount($confirmation: String!) {
  deleteAccount(confirmation: $confirmation) {
    success
    message
  }
}
```

### Input Types

```graphql
input RegisterInput {
  email: String!
  password: String!
  firstName: String
  lastName: String
}

input ProfileInput {
  firstName: String
  lastName: String
  bio: String
  avatar: String
}
```

### Response Types

```graphql
type User {
  id: ID!
  email: String!
  role: UserRole!
  status: UserStatus!
  profile: Profile
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Profile {
  firstName: String
  lastName: String
  bio: String
  avatar: String
}

type AuthPayload {
  user: User!
  tokens: TokenPair!
}

type TokenPair {
  accessToken: String!
  refreshToken: String!
}

type OperationResult {
  success: Boolean!
  message: String
}

enum UserRole {
  ADMIN
  USER
  GUEST
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  DELETED
}
```

## REST Fallback Endpoints

For clients that cannot use GraphQL:

### Authentication

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "tokens": {
    "accessToken": "jwt...",
    "refreshToken": "jwt..."
  }
}
```

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "tokens": {
    "accessToken": "jwt...",
    "refreshToken": "jwt..."
  }
}
```

```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "jwt..."
}

Response: 200 OK
{
  "accessToken": "new-jwt...",
  "refreshToken": "new-refresh-jwt..."
}
```

```http
POST /api/v1/auth/logout
Authorization: Bearer jwt...

Response: 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

### User Management

```http
GET /api/v1/users/me
Authorization: Bearer jwt...

Response: 200 OK
{
  "id": "uuid",
  "email": "user@example.com",
  "profile": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

```http
PUT /api/v1/users/profile
Authorization: Bearer jwt...
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "bio": "Software Developer"
}

Response: 200 OK
{
  "id": "uuid",
  "profile": {
    "firstName": "Jane",
    "lastName": "Smith",
    "bio": "Software Developer"
  }
}
```

```http
POST /api/v1/users/change-password
Authorization: Bearer jwt...
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass456!"
}

Response: 200 OK
{
  "success": true,
  "message": "Password changed successfully"
}
```

## Error Responses

### GraphQL Errors

```json
{
  "errors": [
    {
      "message": "Authentication required",
      "extensions": {
        "code": "UNAUTHENTICATED",
        "statusCode": 401
      }
    }
  ]
}
```

### REST Errors

```http
400 Bad Request
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}

401 Unauthorized
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}

403 Forbidden
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}

404 Not Found
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}

429 Too Many Requests
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests",
    "retryAfter": 60
  }
}

500 Internal Server Error
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## Rate Limiting

Default rate limits:
- **Anonymous**: 100 requests per 15 minutes
- **Authenticated**: 1000 requests per 15 minutes
- **Admin**: 5000 requests per 15 minutes

Rate limit headers:
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1628082000
```

## Pagination

### GraphQL Pagination

```graphql
query ListItems($limit: Int!, $cursor: String) {
  items(limit: $limit, cursor: $cursor) {
    edges {
      node {
        id
        name
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      totalCount
    }
  }
}
```

### REST Pagination

```http
GET /api/v1/items?limit=20&offset=40

Response Headers:
X-Total-Count: 100
X-Page-Count: 5
Link: </api/v1/items?limit=20&offset=60>; rel="next",
      </api/v1/items?limit=20&offset=20>; rel="prev"
```

## Webhooks

Register webhooks for real-time events:

```http
POST /api/v1/webhooks
Authorization: Bearer jwt...
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["user.created", "user.updated"],
  "secret": "webhook-secret"
}
```

Webhook payload:
```json
{
  "id": "evt_uuid",
  "type": "user.created",
  "timestamp": "2025-08-08T10:00:00Z",
  "data": {
    "id": "user_uuid",
    "email": "user@example.com"
  }
}
```

Webhook signature verification:
```
X-Webhook-Signature: sha256=hash_of_payload_with_secret
```

## WebSocket Subscriptions

For real-time updates:

```javascript
// Connect to WebSocket
const ws = new WebSocket('wss://api.flyingnimbustest.app/graphql');

// Subscribe to user updates
ws.send(JSON.stringify({
  type: 'subscribe',
  payload: {
    query: `
      subscription OnUserUpdate($userId: ID!) {
        userUpdated(userId: $userId) {
          id
          email
          profile {
            firstName
            lastName
          }
        }
      }
    `,
    variables: { userId: 'user_uuid' }
  }
}));
```

## API Versioning

The API uses URL versioning for REST endpoints:
- Current: `/api/v1/`
- Legacy: `/api/v0/` (deprecated)

GraphQL endpoint remains unversioned but uses field deprecation:

```graphql
type User {
  id: ID!
  email: String!
  username: String @deprecated(reason: "Use email instead")
}
```

## Testing the API

### GraphQL Playground

Available in development at: http://localhost:3000/graphql

### cURL Examples

```bash
# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Pass123!"}'

# Get profile
curl -X GET http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# GraphQL query
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"query":"{ me { id email } }"}'
```

## SDK Support

Official SDKs available:
- JavaScript/TypeScript: `npm install @flyingnimbus/sdk`
- Python: `pip install flyingnimbus`
- Go: `go get github.com/flyingnimbus/sdk-go`

Example usage:

```typescript
import { FlyingNimbusClient } from '@flyingnimbus/sdk';

const client = new FlyingNimbusClient({
  endpoint: 'https://api.flyingnimbustest.app',
  apiKey: 'your-api-key'
});

const user = await client.auth.login({
  email: 'user@example.com',
  password: 'Pass123!'
});
```

---

**Note**: This documentation is auto-generated from the GraphQL schema. For the latest schema, query the introspection endpoint or check `src/api/schema/`.