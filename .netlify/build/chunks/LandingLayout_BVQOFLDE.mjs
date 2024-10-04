import { d as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, F as Fragment, e as renderSlot } from './astro/server_CNq7f-vl.mjs';
import 'kleur/colors';
import { a as $$Header, h as headerData, $ as $$PageLayout } from './PageLayout_CMJlZsNX.mjs';

const $$Astro = createAstro("https://astrowind.vercel.app");
const $$LandingLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LandingLayout;
  const { metadata } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "metadata": metadata }, { "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result3) => renderTemplate` ${renderSlot($$result3, $$slots["header"], renderTemplate` ${renderComponent($$result3, "Header", $$Header, { "links": headerData?.links[2] ? [headerData.links[2]] : void 0, "actions": [
    {
      text: "Download",
      href: "https://github.com/onwidget/astrowind"
    }
  ], "showToggleTheme": true, "position": "right" })} `)} ` })}` })}`;
}, "/Users/dandele/Desktop/astroship/astrowind/src/layouts/LandingLayout.astro", void 0);

export { $$LandingLayout as $ };
