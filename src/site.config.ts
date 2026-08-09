/** Identity and links. The one place to edit who this site is about. */

export const site = {
  name: 'Thomas Joyeux',
  role: 'Software Engineer — backend, systems, cloud',
  location: 'Paris, France',
  availability: 'Open to internships and full-time engineering roles.',

  /** Small, restrained identity element in the sidebar. Not a hero portrait. DIRECTION.md 4.2. */
  portrait: '/images/profile/thomas.jpg',

  /** Primary action. Everything else on the page is secondary to this. */
  cv: '/thomas-joyeux-cv.pdf',

  links: {
    github: 'https://github.com/tomjoy75',
    linkedin: 'https://www.linkedin.com/in/thomas-joyeux-16a218135/',
    email: 'mailto:hello@thomasjoyeux.dev',
  },

  meta: {
    title: 'Thomas Joyeux — Software Engineer',
    description:
      'Software engineer working close to the machine and close to the product. C and systems programming, production backends, cloud infrastructure.',
  },
} as const;
