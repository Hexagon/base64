# Base64 - Agent Guide

## Project Overview

Base64 is a lightweight, zero-dependency base64 encoding/decoding library for JavaScript and TypeScript that works across Node.js, Deno, Bun, and browsers. It supports both regular base64 and base64url encoding with string and ArrayBuffer conversions.

## Project Structure

```
base64/
├── src/                  # Source code
│   └── base64.ts        # Main entry point with all base64 functions
├── tests/               # Test files
│   └── base64.test.ts   # Test suite
├── build/               # Build scripts
├── docs/                # Documentation (Jekyll site)
│   ├── index.md
│   ├── installation.md
│   ├── examples.md
│   └── contributing.md
└── deno.json            # Deno configuration and tasks
```

## Development Environment

The project uses **Deno** as the primary development runtime, with cross-runtime support for Node.js and Bun.

### Setup
```bash
# Install Deno dependencies
deno install
```

## Contribution Guidelines

### Pre-commit Checks

Before committing changes, always run:
```bash
deno fmt
deno lint
deno check src/base64.ts
```

This ensures:
- **Formatting**: Code follows style guidelines
- **Linting**: Code quality checks pass
- **Type checking**: TypeScript types are valid

### Testing

Run tests during development:
```bash
deno test
```

**Note**: The project uses CI workflows from `@cross-org/workflows` for cross-runtime testing (Node.js, Deno, and Bun). These workflows are imported in `.github/workflows/test.yml`.

### Bun testing equivalent to CI

```bash
# Prerequisites
bun x jsr add @cross/test @std/assert

# Run tests
bun test
```

### Node testing equivalent to CI

package.json must be created with `"type": "module"`

```bash
# Prerequisites
npx jsr add @cross/test @std/assert

# Run tests
npx --yes tsx --test tests/*.test.ts
```

### Full Build

Before submitting a PR, run the full build to ensure all checks pass:
```bash
deno task build
```

This runs all tests, builds distribution files for npm, and validates the entire codebase.

### Key Points

- Base work on the `main` or `dev` branch
- Add test cases for all changes
- Zero dependencies - do not add external dependencies
- Follow existing code style and patterns
- Update documentation if changing public APIs
- The library should work across Node.js, Deno, Bun, and browsers

For detailed contribution guidelines, see [docs/contributing.md](docs/contributing.md).

## API Overview

The library exports a single `base64` object with the following methods:

- `fromArrayBuffer(buffer, urlMode)` - Encodes ArrayBuffer to base64/base64url
- `toArrayBuffer(str, urlMode)` - Decodes base64/base64url to ArrayBuffer
- `fromString(str, urlMode)` - Encodes string to base64/base64url
- `toString(str, urlMode)` - Decodes base64/base64url to string
- `validate(str, urlMode)` - Validates base64/base64url strings

All methods support an optional `urlMode` parameter to switch between standard base64 and base64url encoding.
