import { d as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, e as renderSlot, a as renderComponent, u as unescapeHTML, F as Fragment } from './astro/server_CNq7f-vl.mjs';
import { $ as $$Image } from './Image_i8ppNBIW.mjs';

const $$Astro = createAstro("https://astrowind.vercel.app");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Hero;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline,
    content = await Astro2.slots.render("content"),
    image = await Astro2.slots.render("image"),
    id,
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  const errors = { email: "" };
  let successMessage = "";
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const email = formData.get("email");
      if (!email || typeof email !== "string") {
        errors.email = "Inserisci un indirizzo email valido.";
      } else {
        console.log(email);
        const webhookUrl = "https://hook.eu1.make.com/fzfvtc2bvjkrzwusrp0oe4z28f7qbg31";
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });
        if (!response.ok) {
          throw new Error(`Errore nel webhook: ${response.statusText}`);
        }
        successMessage = "Email inviata con successo!";
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        errors.email = "Si è verificato un errore nell'invio dell'email.";
      }
    }
  }
  return renderTemplate`${maybeRenderHead()}<section class="relative md:-mt-[76px] not-prose"${spreadAttributes(id ? { id } : {})}> <div class="absolute inset-0 pointer-events-none" aria-hidden="true"> ${renderSlot($$result, $$slots["bg"], renderTemplate` ${bg ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(bg)}` })}` : null} `)} </div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6"> <div class="py-12 md:py-20"> <div class="text-center pb-10 md:pb-16 max-w-5xl mx-auto"> ${tagline && renderTemplate`<p class="text-base text-secondary dark:text-blue-200 font-bold tracking-wide uppercase">${unescapeHTML(tagline)}</p>`} ${title && renderTemplate`<h1 class="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-200">${unescapeHTML(title)}</h1>`} <div class="max-w-3xl mx-auto"> ${subtitle && renderTemplate`<p class="text-xl text-muted mb-6 dark:text-slate-300">${unescapeHTML(subtitle)}</p>`} </div> ${content && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}`} </div> <form method="POST" class="flex flex-col items-center"> <label class="mb-4"> <span class="block text-sm font-medium text-gray-700">Email:</span> <input type="email" name="email" required class="mt-1 p-2 border border-gray-300 rounded w-full" placeholder="Inserisci la tua email"> </label> ${errors.email && renderTemplate`<p class="text-red-500 mb-2">${errors.email}</p>`} ${successMessage && renderTemplate`<p class="text-green-500 mb-2">${successMessage}</p>`} <button type="submit" class="p-2 bg-blue-600 text-white rounded">
Iscriviti
</button> </form> <div> ${image && renderTemplate`<div class="relative m-auto max-w-5xl"> ${typeof image === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result, "Image", $$Image, { "class": "mx-auto rounded-md w-full", "widths": [400, 768, 1024, 2040], "sizes": "(max-width: 767px) 400px, (max-width: 1023px) 768px, (max-width: 2039px) 1024px, 2040px", "loading": "eager", "width": 1024, "height": 576, ...image })}`} </div>`} </div> </div> </div> </section> `;
}, "/Users/dandele/Desktop/ 1 - Roles/ZwapAlternative/zwapalternative/astroship/astrowind/src/components/widgets/Hero.astro", void 0);

export { $$Hero as $ };
