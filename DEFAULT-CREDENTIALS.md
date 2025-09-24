# Default Seeded Credentials

The application comes with pre-seeded user accounts for immediate testing. These credentials are automatically created when you run the database seed command.

## Available Test Accounts

| Role       | Email                    | Password     | Description                                   |
| ---------- | ------------------------ | ------------ | --------------------------------------------- |
| **ADMIN**  | `admin@clickup-api.com`  | `Admin123!`  | Full system access - can manage all resources |
| **EDITOR** | `editor@clickup-api.com` | `Editor123!` | Can create, read, update resources            |
| **VIEWER** | `viewer@clickup-api.com` | `Viewer123!` | Read-only access to resources                 |

## How to Use

1. **Start the Application**:

   ```bash
   npm run start:dev
   ```

2. **Seed the Database** (if not done already):

   ```bash
   npm run db:seed
   ```

3. **Login via API**:

   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@clickup-api.com","password":"Admin123!"}'
   ```

4. **Access Swagger UI**:
   - Open: http://localhost:3000/api/docs
   - Click "Authorize" button
   - Use the JWT token from step 3

## Security Notes

⚠️ **IMPORTANT**: These are development credentials only. In production:

- Change all default passwords immediately
- Use strong, unique passwords
- Consider implementing OAuth2 or SAML for enterprise authentication
- Regularly rotate authentication secrets

## Password Requirements

All passwords must meet these criteria:

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&\*)
