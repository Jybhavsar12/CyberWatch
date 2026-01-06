# 🔒 Security Documentation

CyberWatch is built with security as a top priority. This document outlines the security measures implemented in the platform.

## Security Features

### 1. API Security

#### Rate Limiting
- **Implementation**: In-memory rate limiter (production: use Redis/Upstash)
- **Limits**:
  - News API: 30 requests/minute
  - Search API: 20 requests/minute
  - Save/Delete: 10 requests/minute
- **Location**: `lib/middleware/rate-limit.ts`

#### API Key Authentication (Optional)
- Set `API_SECRET_KEY` in environment variables
- Include `x-api-key` header in requests
- Validates against server-side secret

#### Input Validation
- **Library**: Zod
- **Validation Points**:
  - All API request bodies
  - Query parameters
  - User inputs
- **Location**: `lib/validations/`

### 2. HTTP Security Headers

All responses include comprehensive security headers:

```typescript
Content-Security-Policy: default-src 'self'; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-XSS-Protection: 1; mode=block
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**Configuration**: `next.config.ts` and `lib/middleware/security.ts`

### 3. Database Security

#### Row Level Security (RLS)
All tables have RLS enabled with policies:

**Articles Table**:
- Public read access
- No public write access

**Saved Articles Table**:
- Users can only view their own saved articles
- Users can only insert/delete their own saves

**User Preferences Table**:
- Users can only access their own preferences

#### SQL Injection Prevention
- Supabase client uses parameterized queries
- All inputs validated before database operations

### 4. Authentication & Authorization

#### Supabase Auth
- JWT-based authentication
- Secure session management
- Support for multiple providers:
  - Email/Password
  - OAuth (Google, GitHub, etc.)
  - Magic Links

#### Session Security
- HTTP-only cookies
- Secure flag enabled in production
- Automatic session refresh
- Session timeout handling

### 5. CORS Protection

- Whitelist-based origin validation
- Configurable allowed origins
- Proper preflight handling
- **Location**: `lib/middleware/security.ts`

### 6. XSS Protection

- React's built-in XSS protection
- Content Security Policy headers
- Input sanitization
- Output encoding

### 7. CSRF Protection

- SameSite cookie attribute
- Origin validation
- Supabase built-in CSRF protection

## Security Best Practices

### Environment Variables

✅ **DO**:
- Store secrets in `.env.local`
- Use Vercel environment variables for production
- Rotate keys regularly
- Use strong, random values

❌ **DON'T**:
- Commit `.env.local` to Git
- Share secrets in code or documentation
- Use weak or predictable secrets
- Expose service role keys client-side

### API Routes

✅ **DO**:
- Validate all inputs
- Use rate limiting
- Return appropriate error codes
- Log security events

❌ **DON'T**:
- Expose sensitive data in errors
- Trust client-side data
- Skip authentication checks
- Return detailed error messages to clients

### Database

✅ **DO**:
- Use Row Level Security
- Validate data before insertion
- Use transactions for related operations
- Regularly backup data

❌ **DON'T**:
- Disable RLS policies
- Store sensitive data unencrypted
- Use service role key client-side
- Trust user input

## Vulnerability Reporting

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security concerns to: [your-email]
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Checklist

### Development
- [ ] All dependencies up to date
- [ ] No secrets in code
- [ ] Input validation on all endpoints
- [ ] Error handling doesn't leak info
- [ ] HTTPS enforced

### Deployment
- [ ] Environment variables configured
- [ ] Security headers enabled
- [ ] Rate limiting active
- [ ] RLS policies applied
- [ ] CORS properly configured
- [ ] Monitoring enabled

### Maintenance
- [ ] Regular dependency updates
- [ ] Security patch monitoring
- [ ] Log review
- [ ] Access audit
- [ ] Key rotation schedule

## Security Updates

### Dependency Management

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

### Monitoring

- Enable Vercel Analytics
- Monitor error logs
- Track failed authentication attempts
- Review rate limit hits

## Compliance

### Data Protection
- User data encrypted at rest (Supabase)
- Secure data transmission (HTTPS)
- User data deletion support
- Privacy-focused design

### GDPR Considerations
- User consent for data collection
- Right to data deletion
- Data portability
- Privacy policy required

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Supabase Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Vercel Security](https://vercel.com/docs/security)

---

Last Updated: 2026-01-06

