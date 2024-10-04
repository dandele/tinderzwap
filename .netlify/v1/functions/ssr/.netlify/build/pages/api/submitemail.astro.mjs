import { Client } from '@notionhq/client';
export { renderers } from '../../renderers.mjs';

const post = async ({ request }) => {
  try {
    const { email } = await request.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Email mancante" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const notion = new Client({ auth: undefined                               });
    await notion.pages.create({
      parent: { database_id: undefined                                   },
      properties: {
        Email: {
          title: [
            {
              text: {
                content: email
              }
            }
          ]
        }
      }
    });
    return new Response(JSON.stringify({ message: "Email salvata con successo" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Errore interno del server" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  post
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
