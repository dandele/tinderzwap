// src/pages/api/submitEmail.ts

import type { APIRoute } from 'astro';
import { Client } from '@notionhq/client';

export const post: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email mancante' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Inizializza il client Notion
    const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });

    // Inserisci nel database Notion
    await notion.pages.create({
      parent: { database_id: import.meta.env.NOTION_DATABASE_ID },
      properties: {
        Email: {
          title: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
      },
    });

    return new Response(JSON.stringify({ message: 'Email salvata con successo' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Errore interno del server' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
