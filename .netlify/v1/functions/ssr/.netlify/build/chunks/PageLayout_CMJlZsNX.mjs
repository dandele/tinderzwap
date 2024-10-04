import { d as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, e as renderSlot, s as spreadAttributes, a as renderComponent, u as unescapeHTML, F as Fragment } from './astro/server_CNq7f-vl.mjs';
import 'kleur/colors';
import { $ as $$Layout } from './Layout_sIkFj3ji.mjs';
import { $ as $$Logo } from './Logo_CA9GfcmK.mjs';
import 'clsx';
import { t as trimSlash, g as getHomePermalink, S as SITE, a as getPermalink, c as getBlogPermalink, f as getAsset } from './permalinks_Dg4XypGM.mjs';
import { $ as $$Icon } from './Icon_CQBtO9yJ.mjs';

const $$Astro$3 = createAstro("https://astrowind.vercel.app");
const $$ToggleMenu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ToggleMenu;
  const {
    label = "Toggle Menu",
    class: className = "flex flex-col h-12 w-12 rounded justify-center items-center cursor-pointer group"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button type="button"${addAttribute(className, "class")}${addAttribute(label, "aria-label")} data-aw-toggle-menu> <span class="sr-only">${label}</span> ${renderSlot($$result, $$slots["default"], renderTemplate` <span aria-hidden="true" class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:rotate-45 group-[.expanded]:translate-y-2.5"></span> <span aria-hidden="true" class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:opacity-0"></span> <span aria-hidden="true" class="h-0.5 w-6 my-1 rounded-full bg-black dark:bg-white transition ease transform duration-200 opacity-80 group-[.expanded]:-rotate-45 group-[.expanded]:-translate-y-2.5"></span> `)} </button>`;
}, "/Users/dandele/Desktop/astroship/astrowind/src/components/common/ToggleMenu.astro", void 0);

const $$Astro$2 = createAstro("https://astrowind.vercel.app");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const {
    id = "header",
    links = [],
    actions = [],
    isSticky = false,
    isDark = false,
    isFullWidth = false,
    showToggleTheme = false,
    showRssFeed = false,
    position = "center"
  } = Astro2.props;
  `/${trimSlash(new URL(Astro2.url).pathname)}`;
  return renderTemplate`${maybeRenderHead()}<header${addAttribute([
    { sticky: isSticky, relative: !isSticky, dark: isDark },
    "top-0 z-40 flex-none mx-auto w-full border-b border-gray-50/0 transition-[opacity] ease-in-out"
  ], "class:list")}${spreadAttributes(isSticky ? { "data-aw-sticky-header": true } : {})}${spreadAttributes(id ? { id } : {})}> <div class="absolute inset-0"></div> <div${addAttribute([
    "relative py-3 px-3 md:px-6 mx-auto w-full grid grid-cols-3 items-center",
    {
      "max-w-7xl": !isFullWidth
    }
  ], "class:list")}> <!-- Colonna Sinistra --> <div class="flex justify-start"> <!-- Puoi lasciare vuoto o aggiungere un elemento futuro --> </div> <!-- Colonna Centrale - Logo --> <div class="flex justify-center"> <a class="flex items-center"${addAttribute(getHomePermalink(), "href")}> ${renderComponent($$result, "Logo", $$Logo, {})} </a> </div> <!-- Colonna Destra --> <div class="flex justify-end"> <div class="flex items-center md:hidden"> ${renderComponent($$result, "ToggleMenu", $$ToggleMenu, {})} </div> </div> <!-- <nav
      class="items-center w-full md:w-auto hidden md:flex md:mx-5 text-default overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:justify-self-center"
      aria-label="Main navigation"
    >
      <ul
        class="flex flex-col md:flex-row md:self-center w-full md:w-auto text-xl md:text-[0.9375rem] tracking-[0.01rem] font-medium md:justify-center"
      >
        {
          links.map(({ text, href, links }) => (
            <li class={links?.length ? 'dropdown' : ''}>
              {links?.length ? (
                <>
                  <button type="button" class="hover:text-link dark:hover:text-white px-4 py-3 flex items-center">
                    {text}{' '}
                    <Icon name="tabler:chevron-down" class="w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden md:inline" />
                  </button>
                  <ul class="dropdown-menu md:backdrop-blur-md dark:md:bg-dark rounded md:absolute pl-4 md:pl-0 md:hidden font-medium md:bg-white/90 md:min-w-[200px] drop-shadow-xl">
                    {links.map(({ text: text2, href: href2 }) => (
                      <li>
                        <a
                          class:list={[
                            'first:rounded-t last:rounded-b md:hover:bg-gray-100 hover:text-link dark:hover:text-white dark:hover:bg-gray-700 py-2 px-5 block whitespace-no-wrap',
                            { 'aw-link-active': href2 === currentPath },
                          ]}
                          href={href2}
                        >
                          {text2}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a
                  class:list={[
                    'hover:text-link dark:hover:text-white px-4 py-3 flex items-center',
                    { 'aw-link-active': href === currentPath },
                  ]}
                  href={href}
                >
                  {text}
                </a>
              )}
            </li>
          ))
        }
      </ul>
    </nav> 
    
    <div
      class:list={[
        { 'ml-auto rtl:ml-0 rtl:mr-auto': position === 'left' },
        'hidden md:self-center md:flex items-center md:mb-0 fixed w-full md:w-auto md:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 md:p-0 md:justify-self-end',
      ]}
    >
      <div class="items-center flex justify-between w-full md:w-auto">
        <div class="flex">
          {showToggleTheme && <ToggleTheme iconClass="w-6 h-6 md:w-5 md:h-5 md:inline-block" />}
          {
            showRssFeed && (
              <a
                class="text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
                aria-label="RSS Feed"
                href={getAsset('/rss.xml')}
              >
                <Icon name="tabler:rss" class="w-5 h-5" />
              </a>
            )
          }
        </div>
        {
          actions?.length ? (
            <span class="ml-4 rtl:ml-0 rtl:mr-4">
              {actions.map((btnProps) => (
                <Button {...btnProps} class="ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto" />
              ))}
            </span>
          ) : (
            ''
          )
        }
      </div>
    </div> --> </div> </header>`;
}, "/Users/dandele/Desktop/astroship/astrowind/src/components/widgets/Header.astro", void 0);

const $$Astro$1 = createAstro("https://astrowind.vercel.app");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const { socialLinks = [], secondaryLinks = [], links = [], footNote = "", theme = "light" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer${addAttribute([{ dark: theme === "dark" }, "relative border-t border-gray-200 dark:border-slate-800 not-prose"], "class:list")}> <div class="dark:bg-dark absolute inset-0 pointer-events-none" aria-hidden="true"></div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6 dark:text-slate-300"> <div class="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12"> <div class="col-span-12 lg:col-span-4"> <div class="mb-2"> <a class="inline-block font-bold text-xl"${addAttribute(getHomePermalink(), "href")}>${SITE?.name}</a> </div> <div class="text-sm text-muted flex gap-1"> ${secondaryLinks.map(({ text, href }, index) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${index !== 0 ? " \xB7 " : ""}<a class="text-muted hover:text-gray-700 dark:text-gray-400 hover:underline transition duration-150 ease-in-out"${addAttribute(href, "href")}>${unescapeHTML(text)}</a> ` })}`)} </div> </div> ${links.map(({ title, links: links2 }) => renderTemplate`<div class="col-span-6 md:col-span-3 lg:col-span-2"> <div class="dark:text-gray-300 font-medium mb-2">${title}</div> ${links2 && Array.isArray(links2) && links2.length > 0 && renderTemplate`<ul class="text-sm"> ${links2.map(({ text, href, ariaLabel }) => renderTemplate`<li class="mb-2"> <a class="text-muted hover:text-gray-700 hover:underline dark:text-gray-400 transition duration-150 ease-in-out"${addAttribute(href, "href")}${addAttribute(ariaLabel, "aria-label")}> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })} </a> </li>`)} </ul>`} </div>`)} </div> <div class="md:flex md:items-center md:justify-between py-6 md:py-8"> ${socialLinks?.length ? renderTemplate`<ul class="flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0 rtl:ml-0 rtl:-mr-2 rtl:md:ml-0 rtl:md:mr-4"> ${socialLinks.map(({ ariaLabel, href, text, icon }) => renderTemplate`<li> <a class="text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"${addAttribute(ariaLabel, "aria-label")}${addAttribute(href, "href")}> ${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-5 h-5" })}`} ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })} </a> </li>`)} </ul>` : ""} <div class="text-sm mr-4 dark:text-muted"> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(footNote)}` })} </div> </div> </div> </footer>`;
}, "/Users/dandele/Desktop/astroship/astrowind/src/components/widgets/Footer.astro", void 0);

const headerData = {
  links: [
    {
      text: "Homes",
      links: [
        {
          text: "SaaS",
          href: getPermalink("/homes/saas")
        },
        {
          text: "Startup",
          href: getPermalink("/homes/startup")
        },
        {
          text: "Mobile App",
          href: getPermalink("/homes/mobile-app")
        },
        {
          text: "Personal",
          href: getPermalink("/homes/personal")
        }
      ]
    },
    {
      text: "Pages",
      links: [
        {
          text: "Features (Anchor Link)",
          href: getPermalink("/#features")
        },
        {
          text: "Services",
          href: getPermalink("/services")
        },
        {
          text: "Pricing",
          href: getPermalink("/pricing")
        },
        {
          text: "About us",
          href: getPermalink("/about")
        },
        {
          text: "Contact",
          href: getPermalink("/contact")
        },
        {
          text: "Terms",
          href: getPermalink("/terms")
        },
        {
          text: "Privacy policy",
          href: getPermalink("/privacy")
        }
      ]
    },
    {
      text: "Landing",
      links: [
        {
          text: "Lead Generation",
          href: getPermalink("/landing/lead-generation")
        },
        {
          text: "Long-form Sales",
          href: getPermalink("/landing/sales")
        },
        {
          text: "Click-Through",
          href: getPermalink("/landing/click-through")
        },
        {
          text: "Product Details (or Services)",
          href: getPermalink("/landing/product")
        },
        {
          text: "Coming Soon or Pre-Launch",
          href: getPermalink("/landing/pre-launch")
        },
        {
          text: "Subscription",
          href: getPermalink("/landing/subscription")
        }
      ]
    },
    {
      text: "Blog",
      links: [
        {
          text: "Blog List",
          href: getBlogPermalink()
        },
        {
          text: "Article",
          href: getPermalink("get-started-website-with-astro-tailwind-css", "post")
        },
        {
          text: "Article (with MDX)",
          href: getPermalink("markdown-elements-demo-post", "post")
        },
        {
          text: "Category Page",
          href: getPermalink("tutorials", "category")
        },
        {
          text: "Tag Page",
          href: getPermalink("astro", "tag")
        }
      ]
    },
    {
      text: "Widgets",
      href: "#"
    }
  ],
  actions: [{ text: "Download", href: "https://github.com/onwidget/astrowind", target: "_blank" }]
};
const footerData = {
  links: [
    {
      title: "Product",
      links: [
        { text: "Features", href: "#" },
        { text: "Security", href: "#" },
        { text: "Team", href: "#" },
        { text: "Enterprise", href: "#" },
        { text: "Customer stories", href: "#" },
        { text: "Pricing", href: "#" },
        { text: "Resources", href: "#" }
      ]
    },
    {
      title: "Platform",
      links: [
        { text: "Developer API", href: "#" },
        { text: "Partners", href: "#" },
        { text: "Atom", href: "#" },
        { text: "Electron", href: "#" },
        { text: "AstroWind Desktop", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { text: "Docs", href: "#" },
        { text: "Community Forum", href: "#" },
        { text: "Professional Services", href: "#" },
        { text: "Skills", href: "#" },
        { text: "Status", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Press", href: "#" },
        { text: "Inclusion", href: "#" },
        { text: "Social Impact", href: "#" },
        { text: "Shop", href: "#" }
      ]
    }
  ],
  secondaryLinks: [
    { text: "Terms", href: getPermalink("/terms") },
    { text: "Privacy Policy", href: getPermalink("/privacy") }
  ],
  socialLinks: [
    { ariaLabel: "X", icon: "tabler:brand-x", href: "#" },
    { ariaLabel: "Instagram", icon: "tabler:brand-instagram", href: "#" },
    { ariaLabel: "Facebook", icon: "tabler:brand-facebook", href: "#" },
    { ariaLabel: "RSS", icon: "tabler:rss", href: getAsset("/rss.xml") },
    { ariaLabel: "Github", icon: "tabler:brand-github", href: "https://github.com/onwidget/astrowind" }
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://onwidget.com/favicon/favicon-32x32.png" alt="onWidget logo" loading="lazy"></img>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `
};

const $$Astro = createAstro("https://astrowind.vercel.app");
const $$PageLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const { metadata } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["header"], renderTemplate` ${renderComponent($$result2, "Header", $$Header, { ...headerData, "isSticky": true, "showRssFeed": true, "showToggleTheme": true })} `)} ${maybeRenderHead()}<main> ${renderSlot($$result2, $$slots["default"])} </main> ${renderSlot($$result2, $$slots["footer"], renderTemplate` ${renderComponent($$result2, "Footer", $$Footer, { ...footerData })} `)} ` })}`;
}, "/Users/dandele/Desktop/astroship/astrowind/src/layouts/PageLayout.astro", void 0);

export { $$PageLayout as $, $$Header as a, headerData as h };
