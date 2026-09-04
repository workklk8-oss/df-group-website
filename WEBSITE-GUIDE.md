# DF Group website — how to update it

**Read this first if you have just been asked to look after diligentfaith.com.**

You do not need to know how to code. You do not need to install anything.
Everything in Parts 1 to 6 is done in a normal web browser.

---

## Contents

1. [What you need before you start](#part-1--what-you-need-before-you-start)
2. [How the website works (please read, it is short)](#part-2--how-the-website-works)
3. [Making your first change](#part-3--making-your-first-change)
4. [What you can change, and where](#part-4--what-you-can-change-and-where)
5. [Adding photos](#part-5--adding-photos)
6. [Where enquiries from the website go](#part-6--where-enquiries-go)
7. [When something looks wrong](#part-7--when-something-looks-wrong)
8. [What needs a web developer](#part-8--what-needs-a-web-developer)
9. [Key facts to keep](#part-9--key-facts-to-keep)

---

## Part 1 — What you need before you start

You need **one thing**: access to the company's GitHub account.

Ask whoever manages the website (currently the DF Group owner) to do this:

1. Go to `https://github.com/workklk8-oss/df-group-website/settings/access`
2. Click **Add people**
3. Enter your GitHub username
4. Choose **Write** access

If you do not have a GitHub account yet, create a free one first at
**https://github.com/signup**, then send them your username.

You will get an email invitation. Click **Accept**. That is all the access you
need to edit every word and picture on the website.

---

## Part 2 — How the website works

Three services work together. You will normally only ever touch the first one.

| Service | What it does | Do you use it? |
|---|---|---|
| **Pages CMS** (pagescms.org) | The editor. Simple forms where you type the new text. | **Yes, daily** |
| **GitHub** | Where the website's content and files are stored. | Only to get access |
| **Netlify** | Takes the content and publishes the live website. | Rarely |

When you save a change in the editor, this happens automatically:

```
You click Save  ->  saved to GitHub  ->  Netlify rebuilds  ->  live website updates
                                            (takes 1-2 minutes)
```

**You do not need to "upload" or "publish" anything separately.** Saving is
enough. Just wait a minute or two and refresh the website.

---

## Part 3 — Making your first change

Do this once so you can see how it works. It is safe.

1. Go to **https://pagescms.org**
2. Click **Sign in with GitHub** and log in
3. Choose the repository called **df-group-website**
4. In the left sidebar, click **Home page**
5. Find the box called **Hero** and then **Intro paragraph**
6. Change one word
7. Click the green **Save** button in the top right corner
8. Wait about 2 minutes
9. Open **https://diligentfaith.com** and refresh — your change is there

If you want, change it back the same way.

**That is the entire process for everything on the website.**

---

## Part 4 — What you can change, and where

In the left sidebar of Pages CMS you will see these sections.

### Home page
Everything on the front page:
- **Hero** — the big headline, the paragraph under it, the button labels
- **Three figures under the hero** — e.g. "100+ Advisors in our network"
- **Heading above the partner logo strip**
- **Section: Who we are** — the large statement and the two paragraphs
- **Section: What we do** — the list of practices (add, remove, reorder, reword)
- **Section: Our approach** — statement and paragraphs
- **Section: Closing call to action** — the dark band at the bottom

### Partner logos (moving strip)
The logos that scroll across the home page. You can add a new one, remove one,
reorder them, or upload a different image.

### Gallery photos
The photos on the Gallery page, each with an optional caption.

### Team
Two lists: **Leadership** and **Investment team (analysts)**.
For each person: photo, initials, name, role, and a short bio.

### News
The list of news items. Each has a date, a category, a headline, a summary,
and a link (usually to LinkedIn).

### Contact page
The heading, the contact details shown on the left, and the list of options in
the "I'm reaching out about" dropdown.

### Other pages & footer
The wording on the Team, News and Gallery page headers, plus the footer text.

### The Chinese version
The website exists in **English and Traditional Chinese**. Visitors switch with
the **EN / 中文** link in the top corner.

- English pages are at `diligentfaith.com`
- Chinese pages are at `diligentfaith.com/cn`

In the editor every section appears **twice**: once marked **(English)** and
once marked **(中文)**. They are separate — editing the English text does not
change the Chinese, and vice versa.

**If you change something in English, remember to change the Chinese too**,
otherwise the two versions drift apart.

---

### How to add, remove, or reorder items

Anywhere you see a list (team members, news items, photos, logos):

- **Add** — scroll to the bottom of the list and click **+ Add an item**
- **Remove** — click the bin icon on that item
- **Reorder** — drag the handle (the dotted grip) up or down
- **Save** — always click the green **Save** button when you are finished

### One special rule: italic highlighted words

In the big headline fields you may see square brackets, like this:

```
We build and back companies for the [long view].
```

Whatever is inside `[ ]` appears in *italic orange* on the website. Move the
brackets to highlight different words. Do not use brackets for anything else.

---

## Part 5 — Adding photos

1. In the editor, open **Gallery photos** (or **Team**, or **Partner logos**)
2. Click **+ Add an item**
3. Click the **Photo** field, then upload the picture from your computer
4. Type a caption if you want one
5. Click **Save**

**Tips**
- Team photos look best **square**, about 600 x 600 pixels
- Gallery photos can be any shape; they are cropped to a neat rectangle
- JPG and PNG both work
- If a team member has no photo, their initials show instead — that is normal
  and looks fine, so you can add photos one person at a time

---

## Part 6 — Where enquiries go

When a visitor fills in the form on the Contact page, the message is saved in
**Netlify**, not sent as a normal email by the website.

**To read enquiries:** log in to Netlify, open the site
**calm-kleicha-1c8872**, and click **Forms** in the left sidebar.

**To get an email every time someone writes in** (set this up once):

1. Netlify -> the site -> **Site configuration** -> **Notifications**
2. **Add notification** -> **Form submission notification**
3. Form: `contact`
4. Email: `admin@diligentfaith.com`
5. Save

Even if the email does not arrive, **every enquiry is still saved in the Forms
list**. Check there before assuming a message was lost.

---

## Part 7 — When something looks wrong

### "I saved but the website has not changed"
Wait 2 to 3 minutes and refresh. If it still has not changed, open the site in
a **private/incognito window** — normal browsers hold on to old copies.

### "I saved but nothing happened at all"
Check the green **Save** button. If it is still bright green, your change was
never saved. Click it.

### A picture shows as broken text instead of an image
The photo was removed or its file is missing. Open that item in the editor,
upload the picture again, and save.

### "Resource not accessible by integration" when saving
The editor is open on an out-of-date web address, or it has lost permission.

1. Go to **https://app.pagescms.org** (the plain address, not a bookmark)
2. Open **df-group-website** from the list
3. Check the address bar reads `app.pagescms.org/workklk8-oss/df-group-website`

If the address is already correct, the editor app has not been given access to
the repository. **Only the owner of the `workklk8-oss` GitHub account can fix
this** — being a collaborator is not enough, because this is an account-level
app installation.

Ask the account owner to:

1. Log in to GitHub as **workklk8-oss**
2. Go to `https://github.com/apps/pages-cms`
3. Click **Install** (or **Configure** if it is already installed)
4. Choose **Only select repositories** and tick **df-group-website**
5. Save

This only needs doing once. After that, everyone with Write access to the
repository can use the editor.

### The website is completely down
1. Go to Netlify -> the site -> **Deploys**
2. If the newest deploy says **Failed**, click it to see why
3. Click **Trigger deploy** -> **Clear cache and deploy site**
4. If it still fails, a web developer needs to look at it

### I made a mistake and want to undo it
In Pages CMS, open the item and click the **history icon** (a clock arrow) at
the top. You can see and restore earlier versions.

---

## Part 8 — What needs a web developer

You can change **all the words and all the pictures** yourself.

A web developer is needed for:
- Adding a brand new page or a new type of section
- Changing the layout, colours or fonts
- Anything to do with the domain, hosting or email settings

**Important:** this website is built with **Next.js**, which is a common,
standard technology. Any professional web developer can work on it. You are not
tied to one person or agency. The technical notes are in `README.md` in the
same folder as this guide.

---

## Part 9 — Key facts to keep

| Item | Value |
|---|---|
| Live website | https://diligentfaith.com |
| Editor | https://pagescms.org |
| Code and content | https://github.com/workklk8-oss/df-group-website |
| Hosting | Netlify, site name `calm-kleicha-1c8872` |
| Domain registrar | GoDaddy |
| Company email | Microsoft 365 (separate from the website) |

### Warnings

- **Never change the MX or TXT records** in GoDaddy's DNS settings. Those run
  the company email. Changing them stops email arriving.
- The domain must be **renewed every year** at GoDaddy. If it expires the
  website and email both stop. Keep auto-renew switched on.
- Hosting on Netlify is **free** at the current level of traffic.

---

*If you are handing this website to someone else, point them to this file
first. It is stored with the website itself, so it cannot get lost.*
