# WhatsApp Web Checker

A small, dependency-free page that creates a WhatsApp chat link from an international phone number. Start a conversation without adding a contact first.

**[Open the web app](https://redoudou.github.io/whatsapp-web-checker/)** · [Audit](docs/AUDIT.md) · [Release history](CHANGELOG.md)

> Despite the original repository name, this is a **chat-link generator**, not an account lookup service. It cannot independently determine whether a number is registered on WhatsApp. WhatsApp handles that after you open the link.

## Use

1. Enter the country code and phone number, for example `+1 202 555 0123`.
2. Select **Create link** (or press Enter).
3. Select **Open WhatsApp** to continue in WhatsApp Web or the app, depending on your device and setup.

Spaces, parentheses, dots, and hyphens are accepted. A leading `+` or international `00` prefix is removed. Omit the domestic trunk prefix (the local leading zero) after the country code. The page checks for 7–15 digits starting with a nonzero digit; it does not validate country codes, national numbering plans, ownership, or account registration. Extensions and letters are rejected.

Creating a link does not send a message. Example numbers are illustrative and should not be contacted.

## Privacy

Phone numbers are processed locally in your browser. The app has no backend, analytics, cookies, third-party assets, or persistent phone-number storage. Nothing is sent to WhatsApp while generating the link. Opening it sends the number in the URL to WhatsApp; that URL may appear in browser history. The hosting provider still receives ordinary page requests and may retain access logs.

This is an independent project, unaffiliated with WhatsApp or Meta.

## Run locally

Open `index.html` directly in a modern browser. No installation or build is required. Alternatively, with Python 3:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Development and checks

- `index.html` — accessible form, explanatory copy, and page metadata.
- `styles.css` — responsive layout using system fonts.
- `app.js` — input normalization, validation, and safe link creation.
- `tests/phone.test.cjs` — validation and injection regression tests.
- `.github/workflows/check.yml` — automated checks on pushes and pull requests.

With Node.js 24 (no packages to install):

```sh
node --check app.js
node --test
```

Before publishing, also check keyboard submission, invalid input, editing after generation, and the layout on a narrow screen. Do not use real people's numbers in automated tests.

## Deployment

Hosted on GitHub Pages from **`main` / repository root**. In **Settings → Pages**, select **Deploy from a branch**, then `main` and `/ (root)`. Keep HTTPS enabled when available. Changes pushed to `main` are published automatically; check the repository's Actions and Pages settings for deployment status.

The default Pages address is `https://redoudou.github.io/whatsapp-web-checker/`. An account-level custom domain can redirect that address; GitHub reports the current canonical address in Settings → Pages. This repository does not set its own custom domain.

For another static host, publish only `index.html`, `styles.css`, `app.js`, and `LICENSE`. No build command, secrets, API keys, or server are needed.

## Contributing

Keep the app small and dependency-free. Describe the problem and validation in your pull request, run the checks above, and preserve the distinction between link generation and account verification. For security reports, see [SECURITY.md](SECURITY.md).

## License

[GNU GPL v3.0](LICENSE). The existing license is preserved. The project is provided without warranty.
